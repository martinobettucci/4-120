#!/usr/bin/env python3
"""Exporte les donnees de l'animation du module 1 : web/public/data/m1_decision.json.

Neuf cas contrastes sont traites par les trois approches (regles, reseau bayesien,
apprentissage supervise). Reproductible : graines fixees, calcul sur CPU.

Usage : python tools/export_m1.py
"""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np

from ascent_agents import fixer_graines
from ascent_agents.decision import (
    DECISIONS,
    NOMS_VARIABLES,
    VARIABLES,
    DecideurBayesien,
    entrainer_classifieur,
    exactitude,
    generer_etats_robot,
    predire_probabilites,
    regles_robot,
    reseau_panne,
    valeur_predictive_positive,
)

SORTIE = Path(__file__).resolve().parent.parent / "web" / "public" / "data" / "m1_decision.json"

# (identifiant, libelle, mesures, decision de reference d'un expert)
CAS = [
    ("nominal", "Fonctionnement nominal", dict(batterie=82, temperature=54, vibration=1.8, distance_obstacle=4.2, charge=30, bruit_capteur=0.10), "CONTINUER"),
    ("obstacle_proche", "Obstacle à 40 cm", dict(batterie=75, temperature=56, vibration=2.0, distance_obstacle=0.4, charge=25, bruit_capteur=0.12), "ARRET"),
    ("batterie_faible", "Batterie faible", dict(batterie=12, temperature=52, vibration=1.9, distance_obstacle=3.5, charge=20, bruit_capteur=0.09), "RALENTIR"),
    ("usure_franche", "Vibration forte et surchauffe", dict(batterie=64, temperature=78, vibration=4.6, distance_obstacle=3.0, charge=35, bruit_capteur=0.15), "MAINTENANCE"),
    ("usure_discrete", "Vibration forte, moteur tiède", dict(batterie=70, temperature=66, vibration=4.0, distance_obstacle=3.8, charge=20, bruit_capteur=0.11), "MAINTENANCE"),
    ("charge_lourde", "Surchauffe expliquée par la charge", dict(batterie=68, temperature=73, vibration=2.1, distance_obstacle=3.2, charge=92, bruit_capteur=0.10), "RALENTIR"),
    ("surchauffe_inexpliquee", "Surchauffe sans charge ni vibration", dict(batterie=66, temperature=76, vibration=2.6, distance_obstacle=3.4, charge=15, bruit_capteur=0.12), "MAINTENANCE"),
    ("capteur_encrasse", "Lidar instable", dict(batterie=77, temperature=55, vibration=2.2, distance_obstacle=2.4, charge=40, bruit_capteur=0.85), "MAINTENANCE"),
    ("surchauffe_critique", "Surchauffe critique", dict(batterie=58, temperature=91, vibration=3.0, distance_obstacle=2.8, charge=60, bruit_capteur=0.14), "ARRET"),
]


def main() -> None:
    fixer_graines(4130)
    donnees = generer_etats_robot(3000, 4130)
    X, y = donnees["X"], donnees["y"]
    X_app, y_app, X_test, y_test = X[:2100], y[:2100], X[2100:], y[2100:]
    regles = regles_robot()
    reseau = reseau_panne()
    bayes = DecideurBayesien(reseau)
    classifieur = entrainer_classifieur(X_app, y_app, "cpu", epoques=200)

    cas = []
    for ident, libelle, entree, reference in CAS:
        d_regles, declenchees = regles.decider(entree)
        d_bayes, post = bayes.decider(entree)
        proba = predire_probabilites(classifieur, [[entree[n] for n in NOMS_VARIABLES]])[0]
        cas.append(
            {
                "id": ident,
                "libelle": libelle,
                "entree": entree,
                "regles": {"decision": d_regles, "declenchees": declenchees},
                "bayes": {"decision": d_bayes, "posterieurs": {k: round(v, 3) for k, v in post.items()}},
                "supervise": {
                    "decision": DECISIONS[int(np.argmax(proba))],
                    "probabilites": {d: round(float(p), 3) for d, p in zip(DECISIONS, proba)},
                },
                "reference": reference,
            }
        )

    prevalences = [0.001, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5]
    sortie = {
        "decisions": DECISIONS,
        "variables": [{"nom": v["nom"], "libelle": v["libelle"], "unite": v["unite"], "min": v["min"], "max": v["max"]} for v in VARIABLES],
        "regles": [{"id": r.id, "condition": r.condition, "decision": r.decision} for r in regles.regles],
        "reseau": {
            "noeuds": [{"id": nom, "libelle": n["libelle"], "a_priori": round(reseau.posterieur(nom)[True], 3)} for nom, n in reseau.noeuds.items()],
            "arcs": reseau.arcs(),
        },
        "cas": cas,
        "scores": {
            "regles": {"exactitude": round(exactitude(y_test, regles.predire(X_test)), 3)},
            "bayes": {"exactitude": round(exactitude(y_test, bayes.predire(X_test)), 3)},
            "supervise": {"exactitude": round(exactitude(y_test, predire_probabilites(classifieur, X_test).argmax(1)), 3)},
        },
        "medical": {
            "sensibilite": 0.95,
            "specificite": 0.90,
            "prevalences": prevalences,
            "vpp": [round(valeur_predictive_positive(p, 0.95, 0.90), 4) for p in prevalences],
        },
    }
    SORTIE.parent.mkdir(parents=True, exist_ok=True)
    SORTIE.write_text(json.dumps(sortie, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{SORTIE} : {len(cas)} cas, scores {sortie['scores']}")
    for c in cas:
        print(f"  {c['id']:20s} ref={c['reference']:11s} regles={c['regles']['decision']:11s} bayes={c['bayes']['decision']:11s} supervise={c['supervise']['decision']}")


if __name__ == "__main__":
    main()
