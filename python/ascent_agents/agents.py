"""Architectures d'agents : reactive, deliberative, hybride.

Chaque agent expose `reinitialiser(monde)` puis `decider(observation)`, qui retourne
un couple (action, informations). Les informations expliquent la decision : regle
declenchee, plan courant, couche active. Elles alimentent les traces et le rejeu 3D.
"""

from __future__ import annotations

import heapq

from .monde import ACTIONS, DEPLACEMENTS, Entrepot

OPPOSE = {"N": "S", "S": "N", "E": "O", "O": "E"}


def a_etoile(monde: Entrepot, depart, arrivee, bloques: set | None = None):
    """Plus court chemin A* sur la carte statique. Retourne (chemin, noeuds explores) ou (None, n)."""
    bloques = bloques or set()
    depart, arrivee = tuple(depart), tuple(arrivee)

    def h(c):
        return abs(c[0] - arrivee[0]) + abs(c[1] - arrivee[1])

    ouverts = [(h(depart), 0, depart)]
    parents = {depart: None}
    couts = {depart: 0}
    explores = 0
    while ouverts:
        _, g, courant = heapq.heappop(ouverts)
        if g > couts.get(courant, float("inf")):
            continue
        explores += 1
        if courant == arrivee:
            chemin = []
            while courant is not None:
                chemin.append(courant)
                courant = parents[courant]
            return chemin[::-1], explores
        for nom in DEPLACEMENTS:
            dx, dy = ACTIONS[nom]
            voisin = (courant[0] + dx, courant[1] + dy)
            if not monde.est_libre_statique(voisin) or voisin in bloques:
                continue
            ng = g + 1
            if ng < couts.get(voisin, float("inf")):
                couts[voisin] = ng
                parents[voisin] = courant
                heapq.heappush(ouverts, (ng + h(voisin), ng, voisin))
    return None, explores


def action_vers(depuis, vers) -> str:
    """Action elementaire qui mene d'une cellule a une cellule voisine."""
    d = (vers[0] - depuis[0], vers[1] - depuis[1])
    for nom, delta in ACTIONS.items():
        if delta == d:
            return nom
    raise ValueError(f"Cellules non voisines : {depuis} et {vers}")


class Agent:
    """Interface commune des agents."""

    nom = "agent"
    architecture = "abstraite"

    def reinitialiser(self, monde: Entrepot) -> None:
        self.monde = monde

    def decider(self, observation: dict):
        raise NotImplementedError


class AgentReactif(Agent):
    """Architecture reactive : des regles stimulus vers reponse, sans carte ni plan.

    L'agent ne connait que son lidar et la direction de l'objectif.
    Sa seule memoire est sa derniere action, pour eviter un demi-tour immediat.
    """

    nom = "reactif"
    architecture = "reactive"

    def reinitialiser(self, monde: Entrepot) -> None:
        super().reinitialiser(monde)
        self.derniere = None

    def decider(self, observation: dict):
        lidar = observation["lidar"]
        dx, dy = observation["cap_objectif"]
        # Regle 1 : classer les directions selon le rapprochement de l'objectif.
        preferees = []
        if abs(dx) >= abs(dy):
            preferees += ["E" if dx > 0 else "O"] if dx != 0 else []
            preferees += ["S" if dy > 0 else "N"] if dy != 0 else []
        else:
            preferees += ["S" if dy > 0 else "N"] if dy != 0 else []
            preferees += ["E" if dx > 0 else "O"] if dx != 0 else []
        libres = [a for a in DEPLACEMENTS if lidar[a] > 1]
        for a in preferees:
            if a in libres:
                self.derniere = a
                return a, {"couche": "reactive", "regle": "R1", "raison": f"Voie libre vers l'objectif : {a}"}
        # Regle 2 : contourner sans faire demi-tour.
        autres = [a for a in libres if a not in preferees and a != OPPOSE.get(self.derniere)]
        if autres:
            a = self.derniere if self.derniere in autres else autres[0]
            self.derniere = a
            return a, {"couche": "reactive", "regle": "R2", "raison": f"Obstacle devant : contournement par {a}"}
        # Regle 3 : demi-tour en dernier recours.
        if libres:
            a = libres[0]
            self.derniere = a
            return a, {"couche": "reactive", "regle": "R3", "raison": f"Impasse : demi-tour par {a}"}
        return "ATTENDRE", {"couche": "reactive", "regle": "R4", "raison": "Encercle : attente"}


class AgentDeliberatif(Agent):
    """Architecture deliberative : un modele du monde, un plan complet, une execution en boucle ouverte.

    L'agent planifie une fois avec A* sur la carte statique puis deroule son plan
    en supposant que chaque action reussit (navigation a l'estime). Il ne regarde plus ses capteurs.
    """

    nom = "deliberatif"
    architecture = "deliberative"

    def reinitialiser(self, monde: Entrepot) -> None:
        super().reinitialiser(monde)
        self.plan, self.explores = a_etoile(monde, monde.depart, monde.objectif)
        self.indice = 0

    def decider(self, observation: dict):
        if not self.plan:
            return "ATTENDRE", {"couche": "deliberative", "raison": "Aucun plan possible", "plan": []}
        if self.indice >= len(self.plan) - 1:
            return "ATTENDRE", {"couche": "deliberative", "raison": "Plan termine", "plan": []}
        action = action_vers(self.plan[self.indice], self.plan[self.indice + 1])
        reste = self.plan[self.indice :]
        self.indice += 1
        raison = f"Etape {self.indice} sur {len(self.plan) - 1} du plan initial"
        if self.indice == 1:
            raison = f"Plan A* calcule ({self.explores} noeuds explores), execution a l'estime"
        return action, {"couche": "deliberative", "raison": raison, "plan": reste, "noeuds_explores": self.explores}


class AgentHybride(Agent):
    """Architecture hybride : une couche deliberative (plan A*) supervisee par une couche reactive.

    Avant chaque mouvement, la couche reactive verifie le lidar. Si la cellule visee est
    occupee, l'obstacle est memorise temporairement et la couche deliberative replanifie.
    """

    nom = "hybride"
    architecture = "hybride"

    def __init__(self, memoire_obstacle: int = 6) -> None:
        self.memoire_obstacle = memoire_obstacle

    def reinitialiser(self, monde: Entrepot) -> None:
        super().reinitialiser(monde)
        self.temporaires: dict[tuple[int, int], int] = {}
        self.plan = None
        self.replanifications = 0

    def position(self, observation: dict) -> tuple[int, int]:
        """Position utilisee pour decider. Les classes derivees peuvent y brancher un filtre."""
        return tuple(observation["position"])

    def decider(self, observation: dict):
        t = observation["etape"]
        position = self.position(observation)
        if not self.monde.est_libre_statique(position):
            return "ATTENDRE", {"couche": "reactive", "raison": "Position estimee incoherente : attente", "plan": []}
        self.temporaires = {c: fin for c, fin in self.temporaires.items() if fin > t}
        infos: dict = {"couche": "deliberative"}
        if self.plan is None or position not in self.plan:
            self.plan, explores = a_etoile(self.monde, position, self.monde.objectif, set(self.temporaires))
            self.replanifications += 1
            infos.update(raison="Planification A* depuis la position courante", noeuds_explores=explores)
        if self.plan is None:
            return "ATTENDRE", {"couche": "reactive", "raison": "Passage bloque : attente", "plan": []}
        i = self.plan.index(position)
        if i >= len(self.plan) - 1:
            return "ATTENDRE", {"couche": "deliberative", "raison": "Objectif atteint", "plan": []}
        action = action_vers(position, self.plan[i + 1])
        # Couche reactive : le lidar a le dernier mot.
        if observation["lidar"][action] <= 1:
            self.temporaires[self.plan[i + 1]] = t + self.memoire_obstacle
            nouveau, explores = a_etoile(self.monde, position, self.monde.objectif, set(self.temporaires))
            self.replanifications += 1
            if nouveau is None or len(nouveau) < 2:
                self.plan = None
                return "ATTENDRE", {
                    "couche": "reactive",
                    "raison": f"Obstacle imprevu en {action}, aucun detour : attente",
                    "plan": [],
                    "obstacle_detecte": list(self.temporaires),
                }
            self.plan = nouveau
            action = action_vers(position, nouveau[1])
            if observation["lidar"][action] <= 1:
                self.temporaires[nouveau[1]] = t + self.memoire_obstacle
                self.plan = None
                return "ATTENDRE", {"couche": "reactive", "raison": "Detour egalement bloque : attente", "plan": []}
            return action, {
                "couche": "reactive",
                "raison": f"Obstacle imprevu : replanification, detour par {action}",
                "plan": nouveau,
                "noeuds_explores": explores,
                "obstacle_detecte": [list(c) for c in self.temporaires],
            }
        infos.setdefault("raison", f"Suivi du plan : {action}")
        infos["plan"] = self.plan[i:]
        return action, infos


AGENTS = {"reactif": AgentReactif, "deliberatif": AgentDeliberatif, "hybride": AgentHybride}
