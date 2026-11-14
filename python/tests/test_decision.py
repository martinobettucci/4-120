"""Tests du module decision : regles, reseau bayesien, classifieur, etudes de cas."""

import numpy as np
import pytest

from ascent_agents.decision import (
    DECISIONS,
    DecideurBayesien,
    ReseauBayesien,
    exactitude,
    generer_diagnostic_medical,
    generer_etats_robot,
    generer_notes,
    matrice_confusion,
    regles_robot,
    reseau_panne,
    valeur_predictive_positive,
    vers_entree,
)


def test_donnees_reproductibles():
    a, b = generer_etats_robot(500, 1), generer_etats_robot(500, 1)
    assert np.array_equal(a["X"], b["X"]) and np.array_equal(a["y"], b["y"])
    assert a["X"].shape == (500, 6)
    assert set(np.unique(a["y"])) == {0, 1, 2, 3}


def test_regles_explicables():
    regles = regles_robot()
    entree = {"batterie": 10, "temperature": 50, "vibration": 1, "distance_obstacle": 0.3, "charge": 10, "bruit_capteur": 0.1}
    decision, ids = regles.decider(entree)
    assert decision == "ARRET" and ids == ["R1", "R5", "R6"]
    assert "R1" in regles.expliquer(entree)
    entree.update(batterie=90, distance_obstacle=4)
    assert regles.decider(entree) == ("CONTINUER", [])


def test_reseau_bayesien_exact():
    r = ReseauBayesien()
    r.ajouter("pluie", table=0.2)
    r.ajouter("sol_mouille", ["pluie"], {True: 0.9, False: 0.1})
    p = r.posterieur("pluie", {"sol_mouille": True})[True]
    assert p == pytest.approx(0.18 / (0.18 + 0.08))
    assert sum(r.posterieur("sol_mouille").values()) == pytest.approx(1.0)
    with pytest.raises(ValueError):
        r.ajouter("x", ["inconnu"], {True: 0.5, False: 0.5})


def test_reseau_panne_coherent():
    r = reseau_panne()
    base = r.posterieur("panne")[True]
    assert r.posterieur("panne", {"vibration_forte": True})[True] > base
    assert r.posterieur("panne", {"vibration_forte": True, "surchauffe": True})[True] > 0.5
    # Effet d'explication : une charge lourde explique la surchauffe et rend l'usure moins probable.
    assert r.posterieur("usure", {"surchauffe": True, "charge_lourde": True})[True] < r.posterieur("usure", {"surchauffe": True})[True]


def test_approches_utiles_mais_imparfaites():
    d = generer_etats_robot(1500, 3)
    for approche in (regles_robot(), DecideurBayesien()):
        score = exactitude(d["y"], approche.predire(d["X"]))
        assert 0.6 < score < 0.99
    m = matrice_confusion(d["y"], regles_robot().predire(d["X"]))
    assert m.sum() == 1500
    assert DecideurBayesien().decider(vers_entree(d["X"][0]))[0] in DECISIONS


def test_classifieur_apprend():
    pytest.importorskip("torch")
    from ascent_agents.decision import entrainer_classifieur, predire_probabilites

    d = generer_etats_robot(1500, 3)
    c = entrainer_classifieur(d["X"][:1000], d["y"][:1000], epoques=120)
    assert c["pertes"][-1] < c["pertes"][0]
    p = predire_probabilites(c, d["X"][1000:])
    assert p.shape == (500, 4) and np.allclose(p.sum(1), 1, atol=1e-5)
    assert exactitude(d["y"][1000:], p.argmax(1)) > 0.7


def test_etudes_de_cas():
    assert valeur_predictive_positive(0.01, 0.95, 0.90) == pytest.approx(0.0876, abs=1e-3)
    pop = generer_diagnostic_medical(50000, 0.01, 0.95, 0.90, graine=2)
    vpp = pop["malade"][pop["test_positif"]].mean()
    assert vpp == pytest.approx(0.0876, abs=0.02)
    n = generer_notes(50, 20)
    assert n["notes"].shape == (50, 20)
    assert not (n["entrainement"] & n["test"]).any()
    assert np.nanmin(n["notes"]) >= 1 and np.nanmax(n["notes"]) <= 5
