#!/usr/bin/env python3
"""Exporte les donnees du module 4 (optimisation) pour l'animation du site.

Instance a 9 stations : solution exacte CP-SAT, puis un recuit simule avec son
historique echantillonne et des instantanes de la tournee.
Sortie : web/public/data/m4_optimisation.json. Usage : python tools/export_m4.py
"""

from __future__ import annotations

import json
from pathlib import Path

from ascent_agents import creer_scenario
from ascent_agents.optim import chemin_complet, creer_probleme, recuit_simule, resoudre_cp_sat

RACINE = Path(__file__).resolve().parent.parent
SORTIE = RACINE / "web" / "public" / "data" / "m4_optimisation.json"
PARAMETRES = {"T0": 20.0, "alpha": 0.9995, "iterations": 10000, "poids_penalite": 30.0}


def main() -> None:
    probleme = creer_probleme(n_stations=9, graine=4130)
    cp = resoudre_cp_sat(probleme, limite_s=20, travailleurs=1)
    # Graine du recuit : la premiere qui atteint l'optimum prouve, sinon la meilleure des 20 essayees.
    essais = []
    for graine in range(20):
        r = recuit_simule(probleme, graine=graine, instantanes=12, **PARAMETRES)
        essais.append(r)
        if r["faisable"] and r["cout"] == cp["cout"]:
            break
    recuit = min(essais, key=lambda r: (not r["faisable"], r["cout"]))
    pas = max(1, len(recuit["historique"]) // 300)
    historique = [
        {"it": h["it"], "temperature": round(h["temperature"], 4), "cout_courant": h["cout_courant"], "meilleur_cout": h["meilleur_cout"]}
        for h in recuit["historique"][::pas]
    ]
    donnees = {
        "monde": creer_scenario("entrepot").description(),
        "probleme": probleme.vers_dict(),
        "cp_sat": {
            "ordre": cp["ordre"],
            "cout": cp["cout"],
            "duree_s": cp["duree_s"],
            "statut": cp["statut"],
            "chemin": chemin_complet(probleme, cp["ordre"]),
        },
        "recuit": {
            "ordre": recuit["ordre"],
            "cout": recuit["cout"],
            "non_respectees": recuit["non_respectees"],
            "duree_s": recuit["duree_s"],
            "parametres": recuit["parametres"],
            "historique": historique,
            "instantanes": [dict(p, chemin=chemin_complet(probleme, p["ordre"])) for p in recuit["instantanes"]],
            "chemin": chemin_complet(probleme, recuit["ordre"]),
        },
    }
    SORTIE.parent.mkdir(parents=True, exist_ok=True)
    SORTIE.write_text(json.dumps(donnees, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"{SORTIE.relative_to(RACINE)} : CP-SAT {cp['cout']} ({cp['statut']}), recuit {recuit['cout']} "
          f"(graine {recuit['parametres']['graine']}, {recuit['non_respectees']} contrainte(s) non respectee(s)), "
          f"{len(historique)} points, {len(donnees['recuit']['instantanes'])} instantanes")


if __name__ == "__main__":
    main()
