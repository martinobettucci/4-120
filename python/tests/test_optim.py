"""Tests du module d'optimisation : CP-SAT, recuit simule, recuit par lots."""

import pytest

from ascent_agents.optim import (
    chemin_complet,
    creer_probleme,
    plus_proche_voisin,
    recuit_simule,
)


def test_probleme_reproductible_et_realisable():
    a, b = creer_probleme(8), creer_probleme(8)
    assert a.stations == b.stations and a.fenetres == b.fenetres and a.precedences == b.precedences
    assert a.distances.shape == (9, 9)
    assert (a.distances == a.distances.T).all()


def test_evaluer_compte_les_contraintes():
    p = creer_probleme(8)
    libre = p.sans_contraintes()
    ordre = plus_proche_voisin(p)
    assert libre.evaluer(ordre)["non_respectees"] == 0
    assert p.evaluer(ordre)["cout"] == libre.evaluer(ordre)["cout"]
    i, j = p.precedences[0]
    inverse = [j, i] + [s for s in range(1, 9) if s not in (i, j)]
    assert p.evaluer(inverse)["non_respectees"] >= 1


def test_cp_sat_respecte_les_contraintes():
    pytest.importorskip("ortools")
    from ascent_agents.optim import resoudre_cp_sat

    p = creer_probleme(9)
    r = resoudre_cp_sat(p, limite_s=10)
    assert r["statut"] == "OPTIMAL"
    assert sorted(r["ordre"]) == list(range(1, 10))
    ev = p.evaluer(r["ordre"])
    assert ev["faisable"] and ev["cout"] == r["cout"]


def test_recuit_borne_par_l_optimum_et_reproductible():
    pytest.importorskip("ortools")
    from ascent_agents.optim import resoudre_cp_sat

    p = creer_probleme(9)
    optimum = resoudre_cp_sat(p, limite_s=10)["cout"]
    a = recuit_simule(p, iterations=2000, graine=1)
    b = recuit_simule(p, iterations=2000, graine=1)
    assert a["ordre"] == b["ordre"] and a["cout"] == b["cout"]
    if a["faisable"]:
        assert a["cout"] >= optimum
    assert len(a["historique"]) == 2000
    assert a["historique"][-1]["meilleur_cout"] <= a["historique"][0]["meilleur_cout"]


def test_recuit_lot():
    pytest.importorskip("torch")
    from ascent_agents.optim import recuit_lot

    p = creer_probleme(8)
    r = recuit_lot(p, chaines=128, iterations=300)
    assert sorted(r["ordre"]) == list(range(1, 9))
    assert abs(r["energie"] - p.energie(r["ordre"])) < 1e-3
    assert r["energies_finales"].shape == (128,)


def test_chemin_complet_boucle():
    p = creer_probleme(6)
    ordre = plus_proche_voisin(p)
    chemin = chemin_complet(p, ordre)
    assert chemin[0] == list(p.depot) == chemin[-1]
    assert len(chemin) - 1 == p.evaluer(ordre)["cout"]
