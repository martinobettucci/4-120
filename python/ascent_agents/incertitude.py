"""Gestion des incertitudes : filtre bayesien discret (filtre a histogramme) et agent robuste.

Le robot ne connait pas sa position exacte. Il maintient une croyance, c'est a dire une
distribution de probabilite sur les cellules libres, mise a jour en deux temps :
prediction (modele de mouvement avec glissement) puis correction (vraisemblance du lidar).
"""

from __future__ import annotations

import numpy as np

from .agents import AgentHybride
from .monde import ACTIONS, RAYONS, Entrepot


class FiltreHistogramme:
    """Filtre bayesien discret sur la grille de l'entrepot."""

    def __init__(self, monde: Entrepot, glissement: float = 0.1, bruit_lidar: float = 0.6, plancher: float = 0.05):
        self.monde = monde
        self.glissement = glissement
        self.bruit_lidar = max(bruit_lidar, 0.3)
        self.plancher = plancher  # probabilite qu'une mesure soit aberrante (obstacle mobile, rayon perdu)
        self.libre = monde.grille_statique() == 0
        # Lidar attendu dans chaque cellule, calcule une fois sur la carte statique.
        self.attendu = np.zeros((len(RAYONS), monde.hauteur, monde.largeur))
        for y in range(monde.hauteur):
            for x in range(monde.largeur):
                if self.libre[y, x]:
                    mesures = monde.lidar_exact((x, y), statique_seul=True)
                    for k, nom in enumerate(RAYONS):
                        self.attendu[k, y, x] = mesures[nom]
        self.initialiser()

    def initialiser(self, position: tuple[int, int] | None = None) -> None:
        """Croyance initiale : certaine si la position est donnee, uniforme sinon."""
        self.croyance = np.zeros((self.monde.hauteur, self.monde.largeur))
        if position is None:
            self.croyance[self.libre] = 1.0
        else:
            self.croyance[position[1], position[0]] = 1.0
        self.croyance /= self.croyance.sum()

    def predire(self, action: str) -> None:
        """Prediction : la masse de probabilite se deplace selon l'action, sauf en cas de glissement."""
        if action == "ATTENDRE":
            return
        dx, dy = ACTIONS[action]
        deplacee = np.zeros_like(self.croyance)
        src = self.croyance
        h, w = src.shape
        ys, xs = np.nonzero(src > 0)
        for y, x in zip(ys, xs):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and self.libre[ny, nx]:
                deplacee[ny, nx] += src[y, x] * (1 - self.glissement)
                deplacee[y, x] += src[y, x] * self.glissement
            else:
                deplacee[y, x] += src[y, x]  # mouvement impossible : le robot reste sur place
        self.croyance = deplacee

    def corriger(self, lidar: dict[str, int]) -> None:
        """Correction : chaque cellule est ponderee par la vraisemblance des mesures du lidar."""
        vraisemblance = np.ones_like(self.croyance)
        for k, nom in enumerate(RAYONS):
            ecart = lidar[nom] - self.attendu[k]
            gauss = np.exp(-0.5 * (ecart / self.bruit_lidar) ** 2)
            vraisemblance *= (1 - self.plancher) * gauss + self.plancher
        posterieure = self.croyance * vraisemblance * self.libre
        total = posterieure.sum()
        if total < 1e-12:  # croyance incompatible avec la mesure : on repart de la vraisemblance seule
            posterieure = vraisemblance * self.libre
            total = posterieure.sum()
        self.croyance = posterieure / total

    def estimation(self) -> tuple[int, int]:
        """Cellule la plus probable."""
        y, x = np.unravel_index(int(np.argmax(self.croyance)), self.croyance.shape)
        return (int(x), int(y))

    def entropie(self) -> float:
        """Entropie de la croyance en bits : 0 signifie une certitude totale."""
        p = self.croyance[self.croyance > 0]
        return float(-(p * np.log2(p)).sum())

    def resume(self, seuil: float = 0.01) -> list[list]:
        """Cellules significatives de la croyance, sous la forme [x, y, probabilite]."""
        ys, xs = np.nonzero(self.croyance >= seuil)
        return [[int(x), int(y), round(float(self.croyance[y, x]), 3)] for y, x in zip(ys, xs)]


class AgentNaif(AgentHybride):
    """Politique simple : agent hybride qui fait confiance a la position brute, bruitee."""

    nom = "naif"
    architecture = "hybride sans filtrage"


class AgentRobuste(AgentHybride):
    """Politique amelioree : agent hybride dont la position vient d'un filtre bayesien.

    La decision repose sur la croyance et non sur la mesure brute. Si la croyance est
    trop dispersee, l'agent attend une etape pour accumuler des mesures.
    """

    nom = "robuste"
    architecture = "hybride avec filtre bayesien"

    def __init__(self, glissement: float = 0.1, bruit_lidar: float = 0.6, entropie_max: float = 2.5, **kw):
        super().__init__(**kw)
        self.glissement_modele = glissement
        self.bruit_modele = bruit_lidar
        self.entropie_max = entropie_max

    def reinitialiser(self, monde: Entrepot) -> None:
        super().reinitialiser(monde)
        self.filtre = FiltreHistogramme(monde, self.glissement_modele, self.bruit_modele)
        self.filtre.initialiser(monde.depart)
        self.action_precedente = None

    def position(self, observation: dict) -> tuple[int, int]:
        return self.filtre.estimation()

    def decider(self, observation: dict):
        if self.action_precedente is not None:
            self.filtre.predire(self.action_precedente)
        self.filtre.corriger(observation["lidar"])
        entropie = self.filtre.entropie()
        if entropie > self.entropie_max:
            action, infos = "ATTENDRE", {
                "couche": "reactive",
                "raison": f"Croyance trop dispersée ({entropie:.1f} bits) : attente pour relocalisation",
                "plan": [],
            }
        else:
            action, infos = super().decider(observation)
        infos["position_estimee"] = list(self.filtre.estimation())
        infos["croyance"] = self.filtre.resume()
        infos["entropie_bits"] = round(entropie, 3)
        self.action_precedente = action
        return action, infos
