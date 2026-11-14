"""Tests du noyau : monde, agents, traces, incertitude, simulations par lots."""

import json

import numpy as np
import pytest

from ascent_agents import creer_scenario, simuler
from ascent_agents.agents import AgentDeliberatif, AgentHybride, AgentReactif, a_etoile
from ascent_agents.incertitude import AgentNaif, AgentRobuste, FiltreHistogramme
from ascent_agents.monde import Evenement, entrepot_aleatoire
from ascent_agents.traces import valider_trace


def test_plan_coherent():
    m = creer_scenario("entrepot")
    assert m.largeur == 20 and m.hauteur == 14
    assert m.est_libre_statique(m.depart) and m.est_libre_statique(m.objectif)
    assert np.isfinite(m.champ_distance()[m.depart[1], m.depart[0]])


def test_a_etoile_optimal():
    m = creer_scenario("entrepot", chariots=False)
    chemin, _ = a_etoile(m, m.depart, m.objectif)
    assert len(chemin) - 1 == m.champ_distance()[m.depart[1], m.depart[0]]


def test_reproductible():
    def run():
        return simuler(creer_scenario("entrepot", glissement=0.2, bruit_lidar=0.5, graine=7), AgentHybride()).vers_dict()

    a, b = run(), run()
    for t in (a, b):
        for e in t["etapes"]:
            e["metriques"].pop("temps_decision_ms")
        for k in ("temps_decision_moyen_ms", "temps_decision_max_ms"):
            t["bilan"].pop(k)
    assert a == b


def test_reactif_echoue_dans_le_piege():
    assert simuler(creer_scenario("ouvert"), AgentReactif()).bilan["succes"]
    assert not simuler(creer_scenario("piege"), AgentReactif()).bilan["succes"]
    assert simuler(creer_scenario("piege"), AgentHybride()).bilan["succes"]


def test_hybride_gere_l_imprevu():
    ev = [Evenement(6, (6, 7))]
    d = simuler(creer_scenario("entrepot", evenements=ev), AgentDeliberatif()).bilan
    h = simuler(creer_scenario("entrepot", evenements=[Evenement(6, (6, 7))]), AgentHybride()).bilan
    assert h["succes"] and h["collisions"] == 0
    assert d["collisions"] > 0


def test_trace_valide_et_serialisable(tmp_path):
    t = simuler(creer_scenario("entrepot"), AgentHybride(), module=3)
    chemin = t.enregistrer(tmp_path / "t.json")
    donnees = json.loads(chemin.read_text(encoding="utf-8"))
    valider_trace(donnees)
    assert donnees["etapes"][0]["etat"]["robot"] == [1, 1]
    with pytest.raises(ValueError):
        valider_trace({"schema": "autre"})


def test_filtre_localise():
    m = creer_scenario("entrepot", chariots=False)
    f = FiltreHistogramme(m, glissement=0.0, bruit_lidar=0.3)
    f.initialiser()  # position inconnue
    e0 = f.entropie()
    obs = m.reinitialiser()
    for a in ["E", "E", "S", "S", "E", "E"]:
        f.corriger(obs["lidar"])
        m.avancer(a)
        f.predire(a)
        obs = m.observer()
    f.corriger(obs["lidar"])
    assert f.entropie() < e0 / 2
    assert f.estimation() == m.robot


def test_robuste_meilleur_que_naif():
    def etapes(agent):
        return np.mean(
            [
                simuler(creer_scenario("entrepot", bruit_position=0.8, bruit_lidar=0.4, glissement=0.15, graine=g), agent(), max_etapes=200).bilan["etapes"]
                for g in range(1, 5)
            ]
        )

    assert etapes(AgentRobuste) < etapes(AgentNaif)


def test_entrepot_aleatoire_connexe():
    m = entrepot_aleatoire(3)
    assert np.isfinite(m.champ_distance()[1, 1])


def test_lot_et_apprentissage():
    torch = pytest.importorskip("torch")
    from ascent_agents.lot import AgentAppris, SimulationLot, q_learning_lot

    m = creer_scenario("entrepot", chariots=False)
    calme = SimulationLot(m, lot=256, n_obstacles=0).executer()
    assert calme["taux_succes"] == 1.0 and calme["collisions_moyennes"] == 0.0
    dur = SimulationLot(m, lot=256, n_obstacles=10, glissement=0.3, rate_perception=0.5).executer(max_etapes=60)
    assert dur["collisions_moyennes"] > 0
    q = q_learning_lot(m, episodes=120, lot=256)
    assert q["courbe"][-1]["taux_arrivee"] > q["courbe"][0]["taux_arrivee"]
    assert simuler(creer_scenario("entrepot", chariots=False), AgentAppris(q["Q"])).bilan["succes"]
