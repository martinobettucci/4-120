"""Solutions IA pour la prise de decision : regles, reseau bayesien, apprentissage supervise.

Probleme commun du module 1 : a partir des mesures de bord du robot, choisir entre
CONTINUER, RALENTIR, ARRET et MAINTENANCE. Les donnees sont 100 % synthetiques.
Le module fournit aussi les generateurs des deux etudes de cas du syllabus :
diagnostic medical et systeme de recommandation.
"""

from __future__ import annotations

import itertools
from dataclasses import dataclass
from typing import Callable

import numpy as np

DECISIONS = ["CONTINUER", "RALENTIR", "ARRET", "MAINTENANCE"]

VARIABLES = [
    {"nom": "batterie", "libelle": "Batterie", "unite": "%", "min": 0, "max": 100},
    {"nom": "temperature", "libelle": "Température moteur", "unite": "°C", "min": 30, "max": 100},
    {"nom": "vibration", "libelle": "Vibration", "unite": "mm/s", "min": 0, "max": 8},
    {"nom": "distance_obstacle", "libelle": "Distance obstacle mesurée", "unite": "m", "min": 0, "max": 6},
    {"nom": "charge", "libelle": "Charge transportée", "unite": "kg", "min": 0, "max": 100},
    {"nom": "bruit_capteur", "libelle": "Écart entre deux mesures lidar", "unite": "m", "min": 0, "max": 1.5},
]
NOMS_VARIABLES = [v["nom"] for v in VARIABLES]

# Seuils partages par les regles, la discretisation bayesienne et le generateur.
SEUILS = {
    "distance_arret": 0.6,
    "distance_ralentir": 1.5,
    "temperature_arret": 85.0,
    "temperature_chaude": 70.0,
    "vibration_forte": 3.5,
    "bruit_capteur": 0.5,
    "batterie_faible": 20.0,
    "charge_lourde": 80.0,
}


# --------------------------------------------------------------------------- donnees
def generer_etats_robot(n: int = 2000, graine: int = 4130, bruit_etiquettes: float = 0.04) -> dict:
    """Genere n etats synthetiques du robot.

    Retourne un dictionnaire :
    - "X" : matrice (n, 6) des mesures, colonnes dans l'ordre de NOMS_VARIABLES ;
    - "y" : indices de la decision de reference dans DECISIONS ;
    - "latents" : variables cachees (usure, encrasse, panne, distance_vraie), invisibles pour les approches ;
    - "colonnes" : noms des colonnes de X.

    La decision de reference est celle d'un expert qui connaitrait les variables cachees.
    Une petite part des etiquettes est tiree au hasard : aucune approche ne peut etre parfaite.
    """
    rng = np.random.default_rng(graine)
    usure = rng.random(n) < 0.25
    encrasse = rng.random(n) < 0.15
    batterie = rng.uniform(5, 100, n)
    charge = rng.uniform(0, 100, n)
    temperature = rng.normal(55, 7, n) + 16 * usure + 0.12 * charge + rng.normal(0, 3, n) * usure
    vibration = np.clip(rng.normal(2.0, 0.6, n) + 2.4 * usure * rng.uniform(0.4, 1.3, n), 0, None)
    distance_vraie = np.clip(rng.gamma(2.2, 1.3, n), 0.15, 6.0)
    # Un capteur encrasse deforme la mesure de distance et devient instable.
    facteur = np.where(encrasse, rng.uniform(0.4, 1.7, n), rng.normal(1.0, 0.03, n))
    distance = np.clip(distance_vraie * facteur, 0.1, 6.0)
    bruit_capteur = np.where(encrasse, rng.gamma(4.0, 0.2, n), rng.gamma(2.0, 0.08, n))
    surchauffe = temperature > SEUILS["temperature_chaude"]
    p_panne = 0.02 + 0.33 * usure + 0.15 * surchauffe + 0.35 * (usure & surchauffe)
    panne = rng.random(n) < p_panne

    y = np.zeros(n, dtype=np.int64)  # CONTINUER
    ralentir = (
        (batterie < SEUILS["batterie_faible"])
        | (distance_vraie < SEUILS["distance_ralentir"])
        | ((charge > SEUILS["charge_lourde"]) & (temperature > 65))
    )
    y[ralentir] = 1
    y[panne | encrasse] = 3
    y[(distance_vraie < SEUILS["distance_arret"]) | (temperature > SEUILS["temperature_arret"])] = 2
    hasard = rng.random(n) < bruit_etiquettes
    y[hasard] = rng.integers(0, 4, hasard.sum())

    X = np.column_stack([batterie, temperature, vibration, distance, charge, bruit_capteur]).astype(np.float32)
    return {
        "X": X,
        "y": y,
        "colonnes": list(NOMS_VARIABLES),
        "latents": {"usure": usure, "encrasse": encrasse, "panne": panne, "distance_vraie": distance_vraie},
    }


def vers_entree(ligne) -> dict:
    """Convertit une ligne de X en dictionnaire {variable: valeur}."""
    return {nom: float(v) for nom, v in zip(NOMS_VARIABLES, ligne)}


# ---------------------------------------------------------------------------- regles
@dataclass
class Regle:
    """Une regle : si la condition est vraie, alors la decision s'applique."""

    id: str
    condition: str  # texte lisible, affiche dans les explications
    test: Callable[[dict], bool]
    decision: str


class SystemeRegles:
    """Systeme a regles ordonnees : la premiere regle declenchee l'emporte.

    `decider` retourne la decision et la liste de toutes les regles declenchees,
    ce qui rend chaque decision explicable.
    """

    def __init__(self, regles: list[Regle], defaut: str = "CONTINUER") -> None:
        self.regles = regles
        self.defaut = defaut

    def decider(self, entree: dict) -> tuple[str, list[str]]:
        declenchees = [r for r in self.regles if r.test(entree)]
        if not declenchees:
            return self.defaut, []
        return declenchees[0].decision, [r.id for r in declenchees]

    def predire(self, X) -> np.ndarray:
        """Indices des decisions pour chaque ligne de X."""
        return np.array([DECISIONS.index(self.decider(vers_entree(x))[0]) for x in X])

    def expliquer(self, entree: dict) -> str:
        decision, ids = self.decider(entree)
        if not ids:
            return f"{decision} : aucune règle déclenchée, décision par défaut."
        index = {r.id: r for r in self.regles}
        lignes = [f"{decision} : règle {ids[0]} (si {index[ids[0]].condition})."]
        for i in ids[1:]:
            lignes.append(f"  Également déclenchée, mais moins prioritaire : {i} (si {index[i].condition}).")
        return "\n".join(lignes)


def regles_robot() -> SystemeRegles:
    """Jeu de regles de reference, ecrit par un expert qui ne voit que les mesures."""
    s = SEUILS
    return SystemeRegles(
        [
            Regle("R1", f"distance obstacle < {s['distance_arret']} m", lambda e: e["distance_obstacle"] < s["distance_arret"], "ARRET"),
            Regle("R2", f"température > {s['temperature_arret']:.0f} °C", lambda e: e["temperature"] > s["temperature_arret"], "ARRET"),
            Regle(
                "R3",
                f"vibration > {s['vibration_forte']} mm/s et température > {s['temperature_chaude']:.0f} °C",
                lambda e: e["vibration"] > s["vibration_forte"] and e["temperature"] > s["temperature_chaude"],
                "MAINTENANCE",
            ),
            Regle("R4", f"écart lidar > {s['bruit_capteur']} m", lambda e: e["bruit_capteur"] > s["bruit_capteur"], "MAINTENANCE"),
            Regle("R5", f"batterie < {s['batterie_faible']:.0f} %", lambda e: e["batterie"] < s["batterie_faible"], "RALENTIR"),
            Regle("R6", f"distance obstacle < {s['distance_ralentir']} m", lambda e: e["distance_obstacle"] < s["distance_ralentir"], "RALENTIR"),
            Regle(
                "R7",
                f"charge > {s['charge_lourde']:.0f} kg et température > 65 °C",
                lambda e: e["charge"] > s["charge_lourde"] and e["temperature"] > 65,
                "RALENTIR",
            ),
        ]
    )


# ------------------------------------------------------------------ reseau bayesien
class ReseauBayesien:
    """Reseau bayesien discret, inference exacte par enumeration.

    Chaque noeud a une liste de valeurs possibles, des parents et une table de
    probabilites conditionnelles : {tuple des valeurs des parents: {valeur: probabilite}}.
    Pour un noeud binaire (valeurs True et False), la table peut donner directement P(noeud = True).
    L'enumeration somme sur toutes les combinaisons des variables cachees : exacte mais
    de cout exponentiel, donc reservee aux petits reseaux.
    """

    def __init__(self) -> None:
        self.noeuds: dict[str, dict] = {}

    def ajouter(self, nom: str, parents: list[str] | None = None, table=None, valeurs=(True, False), libelle: str | None = None) -> "ReseauBayesien":
        parents = parents or []
        for p in parents:
            if p not in self.noeuds:
                raise ValueError(f"Parent inconnu : {p}. Ajouter les parents avant leurs enfants.")
        if not parents and not isinstance(table, dict):
            table = {(): table}
        elif not parents and isinstance(table, dict) and () not in table:
            table = {(): table}
        normalisee = {}
        for cle, p in table.items():
            cle = cle if isinstance(cle, tuple) else (cle,)
            if not isinstance(p, dict):
                p = {True: float(p), False: 1.0 - float(p)}
            if abs(sum(p.values()) - 1.0) > 1e-6:
                raise ValueError(f"La table de {nom} pour {cle} ne somme pas a 1.")
            normalisee[cle] = p
        self.noeuds[nom] = {"parents": parents, "table": normalisee, "valeurs": list(valeurs), "libelle": libelle or nom}
        return self

    def arcs(self) -> list[list[str]]:
        return [[p, nom] for nom, n in self.noeuds.items() for p in n["parents"]]

    def probabilite_jointe(self, affectation: dict) -> float:
        """P(affectation complete) = produit des P(noeud | parents)."""
        p = 1.0
        for nom, n in self.noeuds.items():
            cle = tuple(affectation[parent] for parent in n["parents"])
            p *= n["table"][cle][affectation[nom]]
        return p

    def posterieur(self, requete: str, evidences: dict | None = None) -> dict:
        """P(requete | evidences), sous la forme {valeur: probabilite}."""
        evidences = evidences or {}
        cachees = [n for n in self.noeuds if n != requete and n not in evidences]
        scores = {}
        for valeur in self.noeuds[requete]["valeurs"]:
            total = 0.0
            for combinaison in itertools.product(*(self.noeuds[c]["valeurs"] for c in cachees)):
                affectation = {**evidences, requete: valeur, **dict(zip(cachees, combinaison))}
                total += self.probabilite_jointe(affectation)
            scores[valeur] = total
        z = sum(scores.values())
        if z <= 0:
            raise ValueError("Evidences de probabilite nulle.")
        return {v: s / z for v, s in scores.items()}

    def echantillonner(self, n: int, graine: int = 4130) -> list[dict]:
        """Tire n affectations completes selon le reseau (echantillonnage ancestral)."""
        rng = np.random.default_rng(graine)
        tirages = []
        for _ in range(n):
            a: dict = {}
            for nom, noeud in self.noeuds.items():
                loi = noeud["table"][tuple(a[p] for p in noeud["parents"])]
                valeurs = list(loi)
                a[nom] = valeurs[int(rng.choice(len(valeurs), p=[loi[v] for v in valeurs]))]
            tirages.append(a)
        return tirages


def reseau_panne() -> ReseauBayesien:
    """Reseau causal du robot : causes cachees (usure, encrassement, panne) et symptomes observes."""
    r = ReseauBayesien()
    r.ajouter("usure", table=0.25, libelle="Usure mécanique")
    r.ajouter("charge_lourde", table=0.20, libelle="Charge lourde")
    r.ajouter("encrasse", table=0.15, libelle="Capteur encrassé")
    r.ajouter("vibration_forte", ["usure"], {True: 0.62, False: 0.01}, libelle="Vibration forte")
    r.ajouter(
        "surchauffe",
        ["usure", "charge_lourde"],
        {(True, True): 0.92, (True, False): 0.72, (False, True): 0.22, (False, False): 0.04},
        libelle="Surchauffe",
    )
    r.ajouter("bruit_capteur", ["encrasse"], {True: 0.80, False: 0.04}, libelle="Lidar instable")
    r.ajouter(
        "panne",
        ["usure", "surchauffe"],
        {(True, True): 0.85, (True, False): 0.35, (False, True): 0.17, (False, False): 0.02},
        libelle="Panne imminente",
    )
    return r


def discretiser(entree: dict) -> dict:
    """Transforme les mesures continues en evidences binaires pour le reseau bayesien."""
    return {
        "vibration_forte": entree["vibration"] > SEUILS["vibration_forte"],
        "surchauffe": entree["temperature"] > SEUILS["temperature_chaude"],
        "bruit_capteur": entree["bruit_capteur"] > SEUILS["bruit_capteur"],
        "charge_lourde": entree["charge"] > SEUILS["charge_lourde"],
    }


class DecideurBayesien:
    """Decision a partir des probabilites des causes cachees.

    Le reseau estime P(panne) et P(capteur encrasse) ; une politique a seuils transforme
    ces probabilites en decision. Les reponses sont memorisees par combinaison d'evidences.
    """

    def __init__(self, reseau: ReseauBayesien | None = None, seuil_maintenance: float = 0.5, seuil_prudence: float = 0.25) -> None:
        self.reseau = reseau or reseau_panne()
        self.seuil_maintenance = seuil_maintenance
        self.seuil_prudence = seuil_prudence
        self._cache: dict = {}

    def posterieurs(self, entree: dict) -> dict:
        ev = discretiser(entree)
        cle = tuple(sorted(ev.items()))
        if cle not in self._cache:
            self._cache[cle] = {
                n: self.reseau.posterieur(n, ev)[True] for n in ("panne", "encrasse", "usure")
            }
        return self._cache[cle]

    def decider(self, entree: dict) -> tuple[str, dict]:
        p = self.posterieurs(entree)
        s = SEUILS
        if entree["distance_obstacle"] < s["distance_arret"] or entree["temperature"] > s["temperature_arret"]:
            return "ARRET", p
        if max(p["panne"], p["encrasse"]) > self.seuil_maintenance:
            return "MAINTENANCE", p
        if (
            entree["batterie"] < s["batterie_faible"]
            or entree["distance_obstacle"] < s["distance_ralentir"]
            or p["panne"] > self.seuil_prudence
        ):
            return "RALENTIR", p
        return "CONTINUER", p

    def predire(self, X) -> np.ndarray:
        return np.array([DECISIONS.index(self.decider(vers_entree(x))[0]) for x in X])


# ----------------------------------------------------------- apprentissage supervise
def entrainer_classifieur(
    X,
    y,
    appareil="cpu",
    *,
    epoques: int = 150,
    cachees: int = 32,
    taux: float = 0.01,
    n_classes: int | None = None,
    graine: int = 4130,
) -> dict:
    """Entraine un petit perceptron multicouche PyTorch (descente de gradient par lot complet).

    Retourne {"modele", "pertes", "moyenne", "ecart_type", "appareil", "duree_s"}.
    Les entrees sont centrees et reduites avec les statistiques du jeu d'entrainement.
    """
    import time

    import torch
    from torch import nn

    torch.manual_seed(graine)
    appareil = torch.device(appareil)
    X = torch.as_tensor(np.asarray(X), dtype=torch.float32, device=appareil)
    y = torch.as_tensor(np.asarray(y), dtype=torch.long, device=appareil)
    n_classes = n_classes or int(y.max().item()) + 1
    moyenne, ecart = X.mean(0), X.std(0).clamp(min=1e-6)
    modele = nn.Sequential(
        nn.Linear(X.shape[1], cachees), nn.ReLU(), nn.Linear(cachees, cachees), nn.ReLU(), nn.Linear(cachees, n_classes)
    ).to(appareil)
    optimiseur = torch.optim.Adam(modele.parameters(), lr=taux)
    critere = nn.CrossEntropyLoss()
    pertes = []
    debut = time.perf_counter()
    Xn = (X - moyenne) / ecart
    for _ in range(epoques):
        optimiseur.zero_grad()
        perte = critere(modele(Xn), y)
        perte.backward()
        optimiseur.step()
        pertes.append(float(perte.item()))
    return {
        "modele": modele.eval(),
        "pertes": pertes,
        "moyenne": moyenne,
        "ecart_type": ecart,
        "appareil": str(appareil),
        "duree_s": round(time.perf_counter() - debut, 3),
    }


def predire_probabilites(classifieur: dict, X) -> np.ndarray:
    """Probabilites de chaque classe, matrice (n, n_classes)."""
    import torch

    with torch.no_grad():
        appareil = classifieur["moyenne"].device
        X = torch.as_tensor(np.atleast_2d(np.asarray(X)), dtype=torch.float32, device=appareil)
        logits = classifieur["modele"]((X - classifieur["moyenne"]) / classifieur["ecart_type"])
        return torch.softmax(logits, dim=1).cpu().numpy()


def matrice_confusion(y_vrai, y_predit, n_classes: int = 4) -> np.ndarray:
    """Matrice (reference en ligne, prediction en colonne)."""
    m = np.zeros((n_classes, n_classes), dtype=int)
    for v, p in zip(y_vrai, y_predit):
        m[int(v), int(p)] += 1
    return m


def exactitude(y_vrai, y_predit) -> float:
    return float(np.mean(np.asarray(y_vrai) == np.asarray(y_predit)))


# ------------------------------------------------------------------ etudes de cas
def valeur_predictive_positive(prevalence: float, sensibilite: float, specificite: float) -> float:
    """P(malade | test positif) par le theoreme de Bayes."""
    vrais = sensibilite * prevalence
    faux = (1 - specificite) * (1 - prevalence)
    return vrais / (vrais + faux)


def generer_diagnostic_medical(
    n: int = 10000, prevalence: float = 0.01, sensibilite: float = 0.95, specificite: float = 0.90, graine: int = 4130
) -> dict:
    """Population synthetique : statut reel et resultat d'un test de depistage imparfait."""
    rng = np.random.default_rng(graine)
    malade = rng.random(n) < prevalence
    test = np.where(malade, rng.random(n) < sensibilite, rng.random(n) > specificite)
    return {"malade": malade, "test_positif": test}


def generer_notes(
    n_utilisateurs: int = 200, n_articles: int = 60, rang: int = 3, densite: float = 0.25, bruit: float = 0.4, graine: int = 4130
) -> dict:
    """Notes synthetiques de 1 a 5, issues de gouts latents de faible rang.

    Retourne {"notes" (NaN si non note), "entrainement", "test" (masques booleens), "popularite"}.
    Certains articles sont intrinsequement mieux notes que d'autres (biais de popularite).
    """
    rng = np.random.default_rng(graine)
    gouts = rng.normal(0, 1, (n_utilisateurs, rang))
    profils = rng.normal(0, 1, (n_articles, rang))
    qualite = rng.normal(0, 0.6, n_articles)
    brut = 3.0 + 0.8 * gouts @ profils.T + qualite[None, :] + rng.normal(0, bruit, (n_utilisateurs, n_articles))
    notes = np.clip(np.round(brut), 1, 5)
    observe = rng.random((n_utilisateurs, n_articles)) < densite
    test = observe & (rng.random((n_utilisateurs, n_articles)) < 0.2)
    entrainement = observe & ~test
    notes = np.where(observe, notes, np.nan)
    return {"notes": notes, "entrainement": entrainement, "test": test, "popularite": qualite}
