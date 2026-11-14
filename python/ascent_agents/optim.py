"""Optimisation pour les agents : tournee de collecte du robot dans l'entrepot.

Le robot part du depot, visite n stations de collecte puis revient au depot.
Objectif : minimiser la distance parcourue, sous contraintes de fenetres de temps
et de precedences. Deux familles de methodes sont proposees :
programmation sous contraintes (CP-SAT, exacte) et recuit simule (metaheuristique),
ce dernier existant aussi en version par lots sur tenseurs PyTorch.
"""

from __future__ import annotations

import math
import time
from dataclasses import dataclass, field

import numpy as np

from .agents import a_etoile
from .monde import Entrepot, creer_scenario


@dataclass
class ProblemeTournee:
    """Tournee de collecte. L'indice 0 designe le depot, les stations portent les numeros 1 a n."""

    monde: Entrepot
    depot: tuple[int, int]
    stations: list[tuple[int, int]]
    distances: np.ndarray  # matrice (n + 1, n + 1) des distances reelles, en pas
    fenetres: dict[int, tuple[int, int]] = field(default_factory=dict)  # station : (debut, fin)
    precedences: list[tuple[int, int]] = field(default_factory=list)  # (i, j) : i avant j
    service: int = 2  # duree de collecte sur une station, en pas de temps

    @property
    def n(self) -> int:
        return len(self.stations)

    def points(self) -> list[tuple[int, int]]:
        return [self.depot] + list(self.stations)

    def evaluer(self, ordre) -> dict:
        """Evalue un ordre de visite (permutation des numeros 1 a n).

        Retourne le cout (distance totale, retour au depot compris), le retard cumule,
        le nombre de contraintes non respectees et les heures de debut de service.
        Le robot attend sur place s'il arrive avant l'ouverture d'une fenetre.
        """
        ordre = [int(s) for s in ordre]
        d = self.distances
        cout, t, retard, non_respectees = 0, 0, 0, 0
        debuts = {}
        precedent = 0
        for s in ordre:
            cout += int(d[precedent, s])
            t += int(d[precedent, s])
            if s in self.fenetres:
                ouverture, fermeture = self.fenetres[s]
                t = max(t, ouverture)
                if t > fermeture:
                    retard += t - fermeture
                    non_respectees += 1
            debuts[s] = t
            t += self.service
            precedent = s
        cout += int(d[precedent, 0])
        rang = {s: k for k, s in enumerate(ordre)}
        for i, j in self.precedences:
            if rang[i] > rang[j]:
                non_respectees += 1
        return {
            "cout": cout,
            "retard": retard,
            "non_respectees": non_respectees,
            "faisable": non_respectees == 0,
            "duree_totale": t + int(d[precedent, 0]),
            "debuts": debuts,
        }

    def energie(self, ordre, poids_penalite: float = 30.0) -> float:
        """Fonction minimisee par le recuit : cout, plus penalites des contraintes non respectees."""
        e = self.evaluer(ordre)
        return e["cout"] + poids_penalite * e["non_respectees"] + e["retard"]

    def sans_contraintes(self) -> "ProblemeTournee":
        """Copie du probleme sans fenetres ni precedences."""
        return ProblemeTournee(self.monde, self.depot, list(self.stations), self.distances.copy(), {}, [], self.service)

    def vers_dict(self) -> dict:
        return {
            "depot": list(self.depot),
            "stations": [
                {"id": k + 1, "pos": list(c), "fenetre": list(self.fenetres[k + 1]) if k + 1 in self.fenetres else None}
                for k, c in enumerate(self.stations)
            ],
            "precedences": [list(p) for p in self.precedences],
            "distances": self.distances.astype(int).tolist(),
            "service": self.service,
        }


def matrice_distances(monde: Entrepot, points: list[tuple[int, int]]) -> np.ndarray:
    """Distances reelles entre points (parcours en largeur sur la carte statique)."""
    n = len(points)
    d = np.zeros((n, n))
    for i, p in enumerate(points):
        champ = monde.champ_distance(p)
        for j, q in enumerate(points):
            d[i, j] = champ[q[1], q[0]]
    if not np.isfinite(d).all():
        raise ValueError("Au moins un point est inaccessible.")
    return d.astype(int)


def creer_probleme(
    n_stations: int = 10,
    graine: int = 4130,
    *,
    n_fenetres: int = 4,
    n_precedences: int = 3,
    marge: int = 8,
    service: int = 2,
    monde: Entrepot | None = None,
) -> ProblemeTournee:
    """Genere une instance reproductible et toujours realisable.

    Les fenetres et les precedences sont construites autour d'une tournee de reference
    (plus proche voisin), ce qui garantit l'existence d'au moins une solution.
    """
    monde = monde or creer_scenario("entrepot", chariots=False)
    rng = np.random.default_rng(graine)
    libres = [c for c in monde.cellules_libres() if c not in (monde.depart, monde.objectif)]
    champ = monde.champ_distance(monde.depart)
    libres = [c for c in libres if np.isfinite(champ[c[1], c[0]])]
    choix = rng.choice(len(libres), size=n_stations, replace=False)
    stations = [libres[int(k)] for k in choix]
    d = matrice_distances(monde, [monde.depart] + stations)
    probleme = ProblemeTournee(monde, tuple(monde.depart), stations, d, service=service)
    # Tournee de reference : plus proche voisin, perturbe par deux echanges aleatoires,
    # pour que la solution gloutonne ne soit pas d'office la meilleure.
    reference = plus_proche_voisin(probleme)
    for _ in range(2):
        a, b = (int(k) for k in rng.choice(n_stations, size=2, replace=False))
        reference[a], reference[b] = reference[b], reference[a]
    debuts = probleme.evaluer(reference)["debuts"]
    avec_fenetre = rng.choice(n_stations, size=min(n_fenetres, n_stations), replace=False)
    for k in avec_fenetre:
        s = reference[int(k)]
        avance = int(rng.integers(0, marge // 2 + 1))
        probleme.fenetres[s] = (max(0, debuts[s] - avance), debuts[s] + marge - avance)
    essais = 0
    while len(probleme.precedences) < min(n_precedences, n_stations // 2) and essais < 100:
        essais += 1
        a, b = sorted(rng.choice(n_stations, size=2, replace=False))
        couple = (reference[int(a)], reference[int(b)])
        if couple not in probleme.precedences and b - a >= 2:
            probleme.precedences.append(couple)
    return probleme


def plus_proche_voisin(probleme: ProblemeTournee) -> list[int]:
    """Heuristique gloutonne : aller toujours a la station la plus proche. Ignore les contraintes."""
    restantes = set(range(1, probleme.n + 1))
    ordre, courant = [], 0
    while restantes:
        suivant = min(restantes, key=lambda s: (probleme.distances[courant, s], s))
        ordre.append(suivant)
        restantes.remove(suivant)
        courant = suivant
    return ordre


def chemin_complet(probleme: ProblemeTournee, ordre) -> list[list[int]]:
    """Cellules parcourues par la tournee complete (A* entre points consecutifs), pour l'affichage."""
    points = probleme.points()
    etapes = [0] + [int(s) for s in ordre] + [0]
    chemin: list[list[int]] = [list(points[0])]
    for a, b in zip(etapes[:-1], etapes[1:]):
        troncon, _ = a_etoile(probleme.monde, points[a], points[b])
        chemin.extend([list(c) for c in troncon[1:]])
    return chemin


# ------------------------------------------------------- programmation sous contraintes
def resoudre_cp_sat(probleme: ProblemeTournee, limite_s: float = 10.0, travailleurs: int = 4, graine: int = 4130) -> dict:
    """Resolution exacte avec OR-Tools CP-SAT.

    Modele : un booleen par arc (i vers j), une contrainte de circuit, une variable de temps
    par station, les fenetres comme bornes de domaine et les precedences comme inegalites.
    CP-SAT s'execute sur CPU : un GPU ne l'accelere pas.
    """
    from ortools.sat.python import cp_model

    n, d, service = probleme.n, probleme.distances, probleme.service
    horizon = int(d.max()) * (n + 1) + service * n + max([f[1] for f in probleme.fenetres.values()], default=0)
    modele = cp_model.CpModel()
    arcs, litteraux = [], {}
    for i in range(n + 1):
        for j in range(n + 1):
            if i != j:
                lit = modele.NewBoolVar(f"arc_{i}_{j}")
                litteraux[i, j] = lit
                arcs.append((i, j, lit))
    modele.AddCircuit(arcs)
    temps = {0: modele.NewConstant(0)}
    for s in range(1, n + 1):
        bas, haut = probleme.fenetres.get(s, (0, horizon))
        temps[s] = modele.NewIntVar(int(bas), int(haut), f"t_{s}")
    for (i, j), lit in litteraux.items():
        if j == 0:
            continue
        attente = service if i != 0 else 0
        modele.Add(temps[j] >= temps[i] + attente + int(d[i, j])).OnlyEnforceIf(lit)
    for i, j in probleme.precedences:
        modele.Add(temps[j] >= temps[i] + service + int(d[i, j]))
    modele.Minimize(sum(int(d[i, j]) * lit for (i, j), lit in litteraux.items()))
    solveur = cp_model.CpSolver()
    solveur.parameters.max_time_in_seconds = float(limite_s)
    solveur.parameters.num_search_workers = int(travailleurs)
    solveur.parameters.random_seed = int(graine)
    debut = time.perf_counter()
    statut = solveur.Solve(modele)
    duree = time.perf_counter() - debut
    noms = {cp_model.OPTIMAL: "OPTIMAL", cp_model.FEASIBLE: "FAISABLE", cp_model.INFEASIBLE: "IRREALISABLE"}
    resultat = {
        "statut": noms.get(statut, "INCONNU"),
        "duree_s": round(duree, 4),
        "ordre": None,
        "cout": None,
        "borne_inferieure": None,
        "branches": int(solveur.NumBranches()),
        "conflits": int(solveur.NumConflicts()),
    }
    if statut in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        ordre, courant = [], 0
        for _ in range(n):
            courant = next(j for j in range(n + 1) if j != courant and solveur.BooleanValue(litteraux[courant, j]))
            ordre.append(courant)
        resultat.update(
            ordre=ordre,
            cout=int(round(solveur.ObjectiveValue())),
            borne_inferieure=int(math.ceil(solveur.BestObjectiveBound() - 1e-6)),
            evaluation=probleme.evaluer(ordre),
        )
    return resultat


# --------------------------------------------------------------------- recuit simule
def voisin(ordre: list[int], rng: np.random.Generator) -> tuple[list[int], str]:
    """Tire un voisin : echange de deux stations, deplacement d'une station ou inversion d'un segment."""
    n = len(ordre)
    i, j = sorted(int(k) for k in rng.choice(n, size=2, replace=False))
    tirage = rng.random()
    nouveau = list(ordre)
    if tirage < 1 / 3:
        nouveau[i], nouveau[j] = nouveau[j], nouveau[i]
        return nouveau, "echange"
    if tirage < 2 / 3:
        nouveau.insert(j, nouveau.pop(i))
        return nouveau, "deplacement"
    nouveau[i : j + 1] = reversed(nouveau[i : j + 1])
    return nouveau, "inversion"


def recuit_simule(
    probleme: ProblemeTournee,
    T0: float = 20.0,
    alpha: float = 0.995,
    iterations: int = 4000,
    graine: int = 4130,
    poids_penalite: float = 30.0,
    instantanes: int = 12,
) -> dict:
    """Recuit simule sequentiel, lisible, avec historique complet.

    A chaque iteration : tirer un voisin, calculer Δ (variation d'energie), accepter si Δ <= 0
    ou avec la probabilite exp(-Δ / T), puis refroidir : T devient alpha × T.
    """
    rng = np.random.default_rng(graine)
    courant = [int(s) for s in rng.permutation(np.arange(1, probleme.n + 1))]
    e_courant = probleme.energie(courant, poids_penalite)
    meilleur, e_meilleur = list(courant), e_courant
    T = float(T0)
    historique, photos = [], []
    pas_photo = max(1, iterations // max(instantanes - 1, 1))
    debut = time.perf_counter()
    for it in range(iterations):
        if it % pas_photo == 0:
            ev = probleme.evaluer(courant)
            photos.append({"it": it, "ordre": list(courant), "cout": ev["cout"], "non_respectees": ev["non_respectees"]})
        candidat, mouvement = voisin(courant, rng)
        e_candidat = probleme.energie(candidat, poids_penalite)
        delta = e_candidat - e_courant
        accepte = delta <= 0 or rng.random() < math.exp(-delta / max(T, 1e-9))
        if accepte:
            courant, e_courant = candidat, e_candidat
            if e_courant < e_meilleur:
                meilleur, e_meilleur = list(courant), e_courant
        historique.append(
            {
                "it": it,
                "temperature": round(T, 5),
                "cout_courant": round(float(e_courant), 3),
                "meilleur_cout": round(float(e_meilleur), 3),
                "accepte": bool(accepte),
                "mouvement": mouvement,
            }
        )
        T *= alpha
    duree = time.perf_counter() - debut
    ev = probleme.evaluer(meilleur)
    photos.append({"it": iterations, "ordre": list(meilleur), "cout": ev["cout"], "non_respectees": ev["non_respectees"]})
    return {
        "ordre": meilleur,
        "cout": ev["cout"],
        "energie": round(float(e_meilleur), 3),
        "non_respectees": ev["non_respectees"],
        "retard": ev["retard"],
        "faisable": ev["faisable"],
        "duree_s": round(duree, 4),
        "iterations": iterations,
        "parametres": {"T0": T0, "alpha": alpha, "iterations": iterations, "graine": graine, "poids_penalite": poids_penalite},
        "historique": historique,
        "instantanes": photos,
    }


def recuit_lot(probleme: ProblemeTournee, chaines: int = 1024, iterations: int = 2000, *, appareil="cpu", **parametres) -> dict:
    """Recuit simule par lots (voir `_recuit_lot` pour les parametres : T0, alpha, poids_penalite, graine)."""
    from .lot import fils_limites

    with fils_limites(appareil):
        return _recuit_lot(probleme, chaines, iterations, appareil=appareil, **parametres)


def _recuit_lot(
    probleme: ProblemeTournee,
    chaines: int = 1024,
    iterations: int = 2000,
    *,
    T0: float = 20.0,
    alpha: float = 0.997,
    poids_penalite: float = 30.0,
    appareil="cpu",
    graine: int = 4130,
) -> dict:
    """Recuit simule par lots : `chaines` recuits independants avancent en parallele sur tenseurs.

    C'est ici que le GPU est utile : l'evaluation de milliers de tournees a la fois est
    une operation tensorielle. Sur CPU, le meme code fonctionne, avec un debit plus faible.
    """
    import torch

    appareil = torch.device(appareil)
    gen = torch.Generator(device=appareil).manual_seed(graine)
    n, B = probleme.n, chaines
    D = torch.tensor(probleme.distances, device=appareil, dtype=torch.float32)
    grand = 1e9
    ouverture = torch.zeros(n + 1, device=appareil)
    fermeture = torch.full((n + 1,), grand, device=appareil)
    for s, (a, b) in probleme.fenetres.items():
        ouverture[s], fermeture[s] = float(a), float(b)
    prec = torch.tensor(probleme.precedences, device=appareil, dtype=torch.long).reshape(-1, 2)
    rangs = torch.arange(n, device=appareil)

    def energie(perm: torch.Tensor) -> torch.Tensor:
        cout = torch.zeros(B, device=appareil)
        t = torch.zeros(B, device=appareil)
        penal = torch.zeros(B, device=appareil)
        precedent = torch.zeros(B, dtype=torch.long, device=appareil)
        for k in range(n):
            s = perm[:, k]
            trajet = D[precedent, s]
            cout += trajet
            t = torch.maximum(t + trajet, ouverture[s])
            hors = (t - fermeture[s]).clamp(min=0)
            penal += hors + poids_penalite * (hors > 0).float()
            t = t + probleme.service
            precedent = s
        cout += D[precedent, 0]
        if len(prec):
            position = torch.zeros((B, n + 1), dtype=torch.long, device=appareil)
            position.scatter_(1, perm, rangs.expand(B, n))
            penal += poids_penalite * (position[:, prec[:, 0]] > position[:, prec[:, 1]]).float().sum(1)
        return cout + penal

    perm = torch.rand(B, n, device=appareil, generator=gen).argsort(1) + 1
    e = energie(perm)
    meilleur, e_meilleur = perm.clone(), e.clone()
    T = float(T0)
    courbe = []
    pas = max(1, iterations // 200)
    debut = time.perf_counter()
    for it in range(iterations):
        ij = torch.rand(B, n, device=appareil, generator=gen).argsort(1)[:, :2]
        i, j = ij.min(1).values[:, None], ij.max(1).values[:, None]
        k = rangs[None, :]
        # Inversion du segment [i, j] pour une moitie des chaines, echange de i et j pour l'autre.
        source_inv = torch.where((k >= i) & (k <= j), i + j - k, k)
        source_ech = torch.where(k == i, j, torch.where(k == j, i, k))
        inversion = torch.rand(B, 1, device=appareil, generator=gen) < 0.5
        candidat = perm.gather(1, torch.where(inversion, source_inv, source_ech))
        e_candidat = energie(candidat)
        delta = e_candidat - e
        accepte = (delta <= 0) | (torch.rand(B, device=appareil, generator=gen) < torch.exp(-delta.clamp(min=0) / max(T, 1e-9)))
        perm = torch.where(accepte[:, None], candidat, perm)
        e = torch.where(accepte, e_candidat, e)
        mieux = e < e_meilleur
        meilleur = torch.where(mieux[:, None], perm, meilleur)
        e_meilleur = torch.where(mieux, e, e_meilleur)
        if it % pas == 0:
            courbe.append({"it": it, "temperature": round(T, 4), "meilleur": float(e_meilleur.min().item()), "mediane": float(e_meilleur.median().item())})
        T *= alpha
    if appareil.type == "cuda":
        torch.cuda.synchronize()
    duree = time.perf_counter() - debut
    gagnante = int(e_meilleur.argmin().item())
    ordre = [int(s) for s in meilleur[gagnante].tolist()]
    ev = probleme.evaluer(ordre)
    return {
        "ordre": ordre,
        "cout": ev["cout"],
        "non_respectees": ev["non_respectees"],
        "faisable": ev["faisable"],
        "energie": float(e_meilleur[gagnante].item()),
        "energies_finales": e_meilleur.cpu().numpy(),
        "courbe": courbe,
        "duree_s": round(duree, 4),
        "appareil": str(appareil),
        "chaines": B,
        "evaluations_par_seconde": round(B * iterations / max(duree, 1e-9)),
    }
