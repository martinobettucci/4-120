"""Tests du module dossiers : generateur, regles, routeur, extracteurs, arbitre, moderation, RAG, journal."""

import math

import numpy as np
import pytest

from ascent_agents.dossiers import (
    BASE_CONNAISSANCES,
    CHAMPS,
    COUTS,
    PLAFONDS,
    QUESTIONS,
    ROUTEUR_NAIF,
    ROUTEUR_ORDONNE,
    ExtracteurSimule,
    IndexLexical,
    Journal,
    Routeur,
    ScoreAnomalie,
    analyser_reponse,
    arbitrer,
    bilan,
    controler_fiche,
    cout_decision,
    erreur_majorite,
    erreurs_extraction,
    fiabilite_chaine,
    generer_dossiers,
    plafonds_depuis_base,
    poids_fiabilite,
    seuil_optimal,
    simuler_votes,
    traiter_lot,
    verdict_regles,
)


@pytest.fixture(scope="module")
def lot():
    return generer_dossiers(600, 4130)


def test_generateur_reproductible(lot):
    autre = generer_dossiers(600, 4130)
    assert [d["texte"] for d in lot] == [d["texte"] for d in autre]
    assert {d["classe"] for d in lot} == {"CONFORME", "NON_CONFORME", "A_INSTRUIRE"}
    assert generer_dossiers(50, 1)[0]["texte"] != generer_dossiers(50, 2)[0]["texte"]


def test_verite_coherente_avec_les_regles(lot):
    for d in lot:
        conforme, refus = verdict_regles(d["vrai"], d, d["type_travaux"])
        if d["classe"] == "CONFORME":
            assert conforme and not refus and d["attendu"] == "ACCEPTER"
        if d["classe"] == "NON_CONFORME":
            assert not conforme and refus and d["attendu"] == "REJETER"
        if d["classe"] == "A_INSTRUIRE":
            assert d["attendu"] == "HUMAIN" and (d["anomalie"] or not d["pieces_completes"] or d["file_vraie"] == "humain")


def test_regles_explicables(lot):
    d = dict(lot[0], revenu=30000)
    fiche = {"montant": PLAFONDS["isolation"] + 1, "annee": 2020, "certifie": False}
    conforme, refus = verdict_regles(fiche, d, "isolation")
    assert not conforme and refus == ["R1", "R2", "R3"]
    assert verdict_regles({"montant": 5000, "annee": 1980, "certifie": True}, d, "isolation") == (True, [])
    assert verdict_regles({"montant": None, "annee": None, "certifie": None}, d, "isolation")[0] is False


def test_routeur_ordre_des_regles(lot):
    naif, ordonne = Routeur(ROUTEUR_NAIF), Routeur(ROUTEUR_ORDONNE)
    assert naif.exactitude(lot) < 0.9
    assert ordonne.exactitude(lot) > 0.98
    assert len(naif.erreurs(lot)) > len(ordonne.erreurs(lot))
    assert Routeur([(["introuvable"], "isolation")], defaut="humain").router("Bonjour")[0] == "humain"
    assert ordonne.router("Je CONTESTE le rejet de mon dossier d'isolation des combles")[0] == "humain"


def test_extracteur_simule(lot):
    juste = ExtracteurSimule(0.0)
    assert all(juste.extraire(d) == d["vrai"] for d in lot)
    ex = ExtracteurSimule(0.08, correlation=0.8, graine=4130)
    assert ex.extraire(lot[5]) == ex.extraire(lot[5])
    taux = erreurs_extraction(ex, lot)
    assert all(0.02 < taux[c] < 0.16 for c in CHAMPS) and taux["fiche"] > max(taux[c] for c in CHAMPS)
    faux1 = np.array([ex.extraire(d, 0) != d["vrai"] for d in lot])
    faux2 = np.array([ex.extraire(d, 1) != d["vrai"] for d in lot])
    independant = np.array([ExtracteurSimule(0.08, 0.0, 4130).extraire(d, 1) != d["vrai"] for d in lot])
    assert np.corrcoef(faux1, faux2)[0, 1] > 0.6 > np.corrcoef(faux1, independant)[0, 1]


def test_analyse_de_la_reponse_d_un_llm():
    assert analyser_reponse('Voici : {"montant": 11450, "annee": 1987, "certifie": true}') == {"montant": 11450, "annee": 1987, "certifie": True}
    assert analyser_reponse('{"montant": "11 450 €", "annee": "1987", "certifie": "non"}') == {"montant": 11450, "annee": 1987, "certifie": False}
    assert analyser_reponse("Je ne sais pas.") == {"montant": None, "annee": None, "certifie": None}
    assert controler_fiche({"montant": 950, "annee": None, "certifie": True}) == ["montant absent ou invraisemblable", "année absente ou invraisemblable"]
    assert controler_fiche({"montant": 9500, "annee": 1990, "certifie": False}) == []


def test_chaine_et_vote():
    assert fiabilite_chaine([0.95] * 5) == pytest.approx(0.7738, abs=1e-4)
    assert fiabilite_chaine([0.9, 0.9], [True, False], detection=0.9) == pytest.approx(0.99 * 0.9)
    assert erreur_majorite(0.10) == pytest.approx(0.028)
    assert erreur_majorite(0.10, 1.0) == pytest.approx(0.10)
    independants, correles = simuler_votes(100000, 0.10, 0.0), simuler_votes(100000, 0.10, 1.0)
    assert independants["majorite"] == pytest.approx(0.028, abs=0.003)
    assert correles["majorite"] == pytest.approx(0.10, abs=0.005)


def test_arbitre():
    v = {"a": True, "b": False, "c": False}
    assert arbitrer(v) is False
    assert arbitrer(v, "unanimite") is None
    assert arbitrer({"a": True, "b": True}, "unanimite") is True
    assert arbitrer(v, "priorite", priorite=["a", "b"]) is True
    assert arbitrer({"a": True, "b": False}) is None
    assert arbitrer(v, "pondere", poids={"a": 5.0, "b": 1.0, "c": 1.0}) is True
    assert arbitrer(v, "pondere", poids={"a": 5.0, "b": 1.0, "c": 1.0}, marge=3.0) is None
    poids = poids_fiabilite({"a": 0.1, "b": 0.02})
    assert poids["b"] > poids["a"] == pytest.approx(math.log(9))
    with pytest.raises(ValueError):
        arbitrer(v, "hasard")


def test_moderation_et_couts():
    assert seuil_optimal(12, 400) == pytest.approx(12 / 412)
    assert cout_decision("HUMAIN", "ACCEPTER") == COUTS["humain"]
    assert cout_decision("ACCEPTER", "ACCEPTER") == 0
    assert cout_decision("ACCEPTER", "HUMAIN") == COUTS["accepter_a_tort"]
    assert cout_decision("REJETER", "ACCEPTER") == COUTS["rejeter_a_tort"]


def test_score_anomalie(lot):
    score = ScoreAnomalie().entrainer(generer_dossiers(800, 7))
    p = score.probabilite(lot)
    anomalies = np.array([d["anomalie"] for d in lot])
    assert p[anomalies].mean() > 0.6 > 0.1 > p[~anomalies].mean()


def test_systeme_chaque_ajout_reduit_le_cout(lot):
    naif, ordonne, ex = Routeur(ROUTEUR_NAIF), Routeur(ROUTEUR_ORDONNE), ExtracteurSimule(0.08)
    p = ScoreAnomalie().entrainer(generer_dossiers(800, 7)).probabilite(lot)
    v1 = traiter_lot(lot, routeur=naif)
    v2 = traiter_lot(lot, routeur=ordonne, incomplets_vers_humain=True)
    v4 = traiter_lot(lot, routeur=ordonne, sources=("llm",), extracteur=ex, controles=True, incomplets_vers_humain=True)
    commun = dict(routeur=ordonne, sources=("declare", "llm", "registre"), extracteur=ex, controles=True, incomplets_vers_humain=True)
    journal = Journal()
    v5 = traiter_lot(lot, **commun)
    v6 = traiter_lot(lot, **commun, score=p, seuil_anomalie=seuil_optimal(12, 400), journal=journal)
    couts = [v["cout_moyen"] for v in (v1, v2, v4, v5, v6)]
    assert couts == sorted(couts, reverse=True)
    assert v1["cout_moyen"] > COUTS["humain"] > v6["cout_moyen"]
    assert v1["part_auto"] == 1.0 and v6["erreur_auto"] < 0.03
    assert bilan(lot, v6["decisions"])["cout_moyen"] == pytest.approx(v6["cout_moyen"])
    # Deux lectures par le meme modele apportent moins que des registres independants.
    meme_modele = traiter_lot(lot, **{**commun, "sources": ("declare", "llm", "llm2")})
    assert meme_modele["erreur_auto"] > v5["erreur_auto"]
    # Journal : une ligne par dossier, chaque decision s'explique.
    assert len(journal.lignes) == len(lot)
    rejet = journal.filtrer(decision="REJETER")[0]
    assert "règles non respectées" in journal.expliquer(rejet["dossier"])
    assert "Aucune trace" in journal.expliquer("D99999")


def test_mini_rag():
    index, brut = IndexLexical(BASE_CONNAISSANCES), IndexLexical(BASE_CONNAISSANCES, idf=False)
    rappels = [index.rappel(QUESTIONS, k) for k in (1, 2, 3, 5)]
    assert rappels == sorted(rappels) and rappels[0] < 1.0 and rappels[-1] == 1.0
    assert index.rappel(QUESTIONS, 1) >= brut.rappel(QUESTIONS, 1)
    assert index.chercher("Comment contester un rejet ?", 1)[0][0]["id"] == "P11"
    assert plafonds_depuis_base(index) == PLAFONDS
    modifiee = [dict(p, texte=p["texte"].replace("8 000", "10 000")) if p["id"] == "P04" else p for p in BASE_CONNAISSANCES]
    assert plafonds_depuis_base(IndexLexical(modifiee))["fenetres"] == 10000
