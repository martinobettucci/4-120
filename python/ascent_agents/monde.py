"""Environnement simule : un entrepot logistique sur grille.

Convention : x vers la droite (est), y vers le bas (sud). Une cellule est un couple (x, y).
"""

from __future__ import annotations

from collections import deque
from dataclasses import dataclass, field

import numpy as np

ACTIONS: dict[str, tuple[int, int]] = {
    "N": (0, -1),
    "E": (1, 0),
    "S": (0, 1),
    "O": (-1, 0),
    "ATTENDRE": (0, 0),
}
DEPLACEMENTS = ["N", "E", "S", "O"]
# Les 8 rayons du lidar, dans le sens horaire a partir du nord.
RAYONS: dict[str, tuple[int, int]] = {
    "N": (0, -1),
    "NE": (1, -1),
    "E": (1, 0),
    "SE": (1, 1),
    "S": (0, 1),
    "SO": (-1, 1),
    "O": (-1, 0),
    "NO": (-1, -1),
}

CARTES: dict[str, dict] = {
    # Entrepot de reference du fil rouge.
    "entrepot": {
        "titre": "Entrepot de reference",
        "plan": [
            "####################",
            "#D.....#...........#",
            "#......#..RR..RR...#",
            "#..RR.....RR..RR...#",
            "#..RR..#..RR..RR...#",
            "#..RR..#...........#",
            "#......###..######.#",
            "#..................#",
            "#..RR..RR..#..RR...#",
            "#..RR..RR..#..RR...#",
            "#..RR..RR..#..RR..A#",
            "#..........#.......#",
            "#..................#",
            "####################",
        ],
        "chariots": [
            {"de": (8, 7), "a": (17, 7), "periode": 2},
            {"de": (12, 1), "a": (12, 5), "periode": 3},
        ],
    },
    # Zone degagee : meme un agent purement reactif y reussit.
    "ouvert": {
        "titre": "Zone degagee",
        "plan": [
            "####################",
            "#D.................#",
            "#..................#",
            "#....RR............#",
            "#....RR.....RR.....#",
            "#...........RR.....#",
            "#..................#",
            "#.......RR.........#",
            "#.......RR.....RR..#",
            "#..............RR..#",
            "#.................A#",
            "#..................#",
            "#..................#",
            "####################",
        ],
        "chariots": [],
    },
    # Cul-de-sac en U entre le depart et l'objectif : minimum local pour un agent reactif.
    "piege": {
        "titre": "Cul-de-sac en U",
        "plan": [
            "####################",
            "#..................#",
            "#..........####....#",
            "#.............#....#",
            "#.............#....#",
            "#D............#...A#",
            "#.............#....#",
            "#.............#....#",
            "#..........####....#",
            "#..................#",
            "#..................#",
            "#..................#",
            "#..................#",
            "####################",
        ],
        "chariots": [],
    },
}


def lister_scenarios() -> dict[str, str]:
    """Retourne les scenarios disponibles : identifiant vers titre."""
    return {cle: valeur["titre"] for cle, valeur in CARTES.items()}


@dataclass
class Chariot:
    """Obstacle dynamique : un chariot qui fait des allers-retours entre deux cellules alignees."""

    de: tuple[int, int]
    a: tuple[int, int]
    periode: int = 2
    position: tuple[int, int] = (0, 0)
    sens: int = 1

    def __post_init__(self) -> None:
        self.position = tuple(self.de)

    def cible(self) -> tuple[int, int]:
        but = self.a if self.sens == 1 else self.de
        dx = int(np.sign(but[0] - self.position[0]))
        dy = int(np.sign(but[1] - self.position[1]))
        return (self.position[0] + dx, self.position[1] + dy)


@dataclass
class Evenement:
    """Evenement imprevu : une palette deposee sur une cellule a partir d'une etape donnee."""

    etape: int
    cellule: tuple[int, int]
    type: str = "palette"


@dataclass
class Entrepot:
    """Entrepot simule : carte statique, obstacles dynamiques, capteurs bruites, glissement des roues."""

    plan: list[str]
    nom: str = "entrepot"
    chariots: list[Chariot] = field(default_factory=list)
    evenements: list[Evenement] = field(default_factory=list)
    portee_lidar: int = 5
    bruit_lidar: float = 0.0  # ecart type du bruit de distance, en cellules
    perte_lidar: float = 0.0  # probabilite qu'un rayon ne retourne rien (portee maximale)
    bruit_position: float = 0.0  # ecart type du bruit de localisation, en cellules
    glissement: float = 0.0  # probabilite qu'un deplacement ne s'execute pas
    graine: int = 4130

    def __post_init__(self) -> None:
        self.hauteur = len(self.plan)
        self.largeur = len(self.plan[0])
        self.murs: set[tuple[int, int]] = set()
        self.rayonnages: set[tuple[int, int]] = set()
        self.depart = (1, 1)
        self.objectif = (self.largeur - 2, self.hauteur - 2)
        for y, ligne in enumerate(self.plan):
            if len(ligne) != self.largeur:
                raise ValueError("Toutes les lignes du plan doivent avoir la meme longueur.")
            for x, c in enumerate(ligne):
                if c == "#":
                    self.murs.add((x, y))
                elif c == "R":
                    self.rayonnages.add((x, y))
                elif c == "D":
                    self.depart = (x, y)
                elif c == "A":
                    self.objectif = (x, y)
        self.statique = self.murs | self.rayonnages
        self.reinitialiser()

    # ------------------------------------------------------------------ etat
    def reinitialiser(self, graine: int | None = None) -> dict:
        """Remet l'environnement dans son etat initial et retourne la premiere observation."""
        if graine is not None:
            self.graine = graine
        self.rng = np.random.default_rng(self.graine)
        self.robot = tuple(self.depart)
        self.t = 0
        self.palettes: set[tuple[int, int]] = set()
        for chariot in self.chariots:
            chariot.position = tuple(chariot.de)
            chariot.sens = 1
        self.collisions = 0
        self.distance = 0
        self._appliquer_evenements()
        return self.observer()

    def est_libre_statique(self, cellule: tuple[int, int]) -> bool:
        x, y = cellule
        return 0 <= x < self.largeur and 0 <= y < self.hauteur and cellule not in self.statique

    def obstacles_dynamiques(self) -> list[tuple[int, int]]:
        return [c.position for c in self.chariots] + sorted(self.palettes)

    def est_occupee(self, cellule: tuple[int, int]) -> bool:
        return not self.est_libre_statique(cellule) or cellule in self.palettes or any(
            c.position == cellule for c in self.chariots
        )

    def cellules_libres(self) -> list[tuple[int, int]]:
        return [
            (x, y)
            for y in range(self.hauteur)
            for x in range(self.largeur)
            if (x, y) not in self.statique
        ]

    def grille_statique(self) -> np.ndarray:
        """Matrice (hauteur, largeur) : 1 pour un mur ou un rayonnage, 0 pour une cellule libre."""
        grille = np.zeros((self.hauteur, self.largeur), dtype=np.int8)
        for x, y in self.statique:
            grille[y, x] = 1
        return grille

    # -------------------------------------------------------------- capteurs
    def lidar_exact(self, cellule: tuple[int, int], statique_seul: bool = False) -> dict[str, int]:
        """Distance (en cellules) au premier obstacle sur chacun des 8 rayons, plafonnee a la portee."""
        mesures = {}
        for nom, (dx, dy) in RAYONS.items():
            d = self.portee_lidar
            for k in range(1, self.portee_lidar + 1):
                c = (cellule[0] + k * dx, cellule[1] + k * dy)
                occupee = (not self.est_libre_statique(c)) if statique_seul else self.est_occupee(c)
                if occupee:
                    d = k
                    break
            else:
                d = self.portee_lidar + 1  # rien dans la portee
            mesures[nom] = d
        return mesures

    def observer(self) -> dict:
        """Observation de l'agent : ce que ses capteurs lui donnent, pas l'etat reel."""
        exact = self.lidar_exact(self.robot)
        lidar = {}
        for nom, d in exact.items():
            if self.perte_lidar > 0 and self.rng.random() < self.perte_lidar:
                lidar[nom] = self.portee_lidar + 1
                continue
            if self.bruit_lidar > 0:
                d = int(round(d + self.rng.normal(0.0, self.bruit_lidar)))
            lidar[nom] = int(np.clip(d, 1, self.portee_lidar + 1))
        if self.bruit_position > 0:
            bx = int(round(self.rng.normal(0.0, self.bruit_position)))
            by = int(round(self.rng.normal(0.0, self.bruit_position)))
            position = (
                int(np.clip(self.robot[0] + bx, 0, self.largeur - 1)),
                int(np.clip(self.robot[1] + by, 0, self.hauteur - 1)),
            )
        else:
            position = self.robot
        return {
            "etape": self.t,
            "lidar": lidar,
            "position": position,
            "objectif": self.objectif,
            "cap_objectif": (self.objectif[0] - position[0], self.objectif[1] - position[1]),
        }

    # ------------------------------------------------------------- dynamique
    def _appliquer_evenements(self) -> list[dict]:
        declenches = []
        for ev in self.evenements:
            if ev.etape == self.t and ev.cellule != self.robot and self.est_libre_statique(ev.cellule):
                self.palettes.add(tuple(ev.cellule))
                declenches.append({"type": ev.type, "cellule": list(ev.cellule)})
        return declenches

    def avancer(self, action: str) -> dict:
        """Execute une action et fait evoluer l'environnement d'une etape. Retourne le resultat."""
        if action not in ACTIONS:
            raise ValueError(f"Action inconnue : {action}")
        executee = action
        glisse = False
        if action != "ATTENDRE" and self.glissement > 0 and self.rng.random() < self.glissement:
            executee = "ATTENDRE"
            glisse = True
        dx, dy = ACTIONS[executee]
        cible = (self.robot[0] + dx, self.robot[1] + dy)
        collision = False
        if executee != "ATTENDRE":
            if self.est_occupee(cible):
                collision = True
                self.collisions += 1
            else:
                self.robot = cible
                self.distance += 1
        # Les chariots avancent ensuite, et cedent le passage si la cellule visee est prise.
        for chariot in self.chariots:
            if (self.t + 1) % chariot.periode != 0:
                continue
            if chariot.position == chariot.a:
                chariot.sens = -1
            elif chariot.position == chariot.de:
                chariot.sens = 1
            cible_c = chariot.cible()
            autres = {c.position for c in self.chariots if c is not chariot}
            if (
                self.est_libre_statique(cible_c)
                and cible_c != self.robot
                and cible_c not in self.palettes
                and cible_c not in autres
            ):
                chariot.position = cible_c
        self.t += 1
        evenements = self._appliquer_evenements()
        return {
            "action_executee": executee,
            "glissement": glisse,
            "collision": collision,
            "arrive": self.robot == self.objectif,
            "evenements": evenements,
        }

    # --------------------------------------------------------- planification
    def champ_distance(self, cible: tuple[int, int] | None = None, bloques: set | None = None) -> np.ndarray:
        """Distance en nombre de pas de chaque cellule libre vers la cible (parcours en largeur).

        Les cellules inaccessibles valent l'infini.
        """
        cible = cible or self.objectif
        bloques = bloques or set()
        champ = np.full((self.hauteur, self.largeur), np.inf)
        champ[cible[1], cible[0]] = 0
        file = deque([cible])
        while file:
            x, y = file.popleft()
            for dx, dy in (ACTIONS[a] for a in DEPLACEMENTS):
                v = (x + dx, y + dy)
                if self.est_libre_statique(v) and v not in bloques and np.isinf(champ[v[1], v[0]]):
                    champ[v[1], v[0]] = champ[y, x] + 1
                    file.append(v)
        return champ

    def description(self) -> dict:
        """Description statique du monde, embarquee dans les traces pour le rejeu visuel."""
        return {
            "nom": self.nom,
            "largeur": self.largeur,
            "hauteur": self.hauteur,
            "murs": sorted([list(c) for c in self.murs]),
            "rayonnages": sorted([list(c) for c in self.rayonnages]),
            "depart": list(self.depart),
            "objectif": list(self.objectif),
            "portee_lidar": self.portee_lidar,
        }


def creer_scenario(
    nom: str = "entrepot",
    *,
    chariots: bool = True,
    evenements: list[Evenement] | None = None,
    **parametres,
) -> Entrepot:
    """Construit un scenario predefini. Les parametres de bruit se passent par mots cles."""
    if nom not in CARTES:
        raise KeyError(f"Scenario inconnu : {nom}. Disponibles : {list(CARTES)}")
    carte = CARTES[nom]
    liste = [Chariot(**c) for c in carte["chariots"]] if chariots else []
    return Entrepot(plan=carte["plan"], nom=nom, chariots=liste, evenements=evenements or [], **parametres)


def entrepot_aleatoire(
    graine: int, largeur: int = 20, hauteur: int = 14, densite: float = 0.12, **parametres
) -> Entrepot:
    """Genere un entrepot aleatoire dont l'objectif reste accessible depuis le depart."""
    rng = np.random.default_rng(graine)
    for _ in range(200):
        lignes = []
        for y in range(hauteur):
            ligne = ""
            for x in range(largeur):
                bord = x in (0, largeur - 1) or y in (0, hauteur - 1)
                if bord:
                    ligne += "#"
                elif (x, y) == (1, 1):
                    ligne += "D"
                elif (x, y) == (largeur - 2, hauteur - 2):
                    ligne += "A"
                else:
                    ligne += "R" if rng.random() < densite else "."
            lignes.append(ligne)
        monde = Entrepot(plan=lignes, nom=f"aleatoire-{graine}", graine=graine, **parametres)
        if np.isfinite(monde.champ_distance()[1, 1]):
            return monde
    raise RuntimeError("Impossible de generer un entrepot connexe.")
