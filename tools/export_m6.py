#!/usr/bin/env python3
"""Exporte les resultats de la campagne de validation du module 6 pour le site.

Campagne par lots (SimulationLot) sur cinq niveaux de perturbation, avec et sans
la couche de prudence (evitement des obstacles percus).
Sortie : web/public/data/m6_validation.json. Usage : python tools/export_m6.py
"""

from __future__ import annotations

import json
import math
from pathlib import Path

import numpy as np

from ascent_agents import creer_scenario
from ascent_agents.lot import SimulationLot

RACINE = Path(__file__).resolve().parent.parent
SORTIE = RACINE / "web" / "public" / "data" / "m6_validation.json"
LOT, MAX_ETAPES, GRAINE = 4000, 45, 4130
NIVEAUX = [
    {"nom": "nominal", "glissement": 0.0, "rate_perception": 0.0, "n_obstacles": 0},
    {"nom": "leger", "glissement": 0.05, "rate_perception": 0.05, "n_obstacles": 2},
    {"nom": "degrade", "glissement": 0.15, "rate_perception": 0.2, "n_obstacles": 6},
    {"nom": "severe", "glissement": 0.3, "rate_perception": 0.4, "n_obstacles": 10},
    {"nom": "limite", "glissement": 0.45, "rate_perception": 0.6, "n_obstacles": 16},
]


def wilson(succes: int, n: int, z: float = 1.96) -> list[float]:
    """Intervalle de confiance de Wilson a 95 % pour une proportion."""
    p = succes / n
    centre = (p + z * z / (2 * n)) / (1 + z * z / n)
    demi = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / (1 + z * z / n)
    return [round(max(0.0, centre - demi), 4), round(min(1.0, centre + demi), 4)]


def main() -> None:
    monde = creer_scenario("entrepot", chariots=False)
    bords = list(range(24, MAX_ETAPES + 2, 3))
    resultats = []
    for niveau in NIVEAUX:
        for prudence in (False, True):
            parametres = {k: v for k, v in niveau.items() if k != "nom"}
            r = SimulationLot(monde, lot=LOT, prudence=prudence, graine=GRAINE, **parametres).executer(max_etapes=MAX_ETAPES)
            effectifs, _ = np.histogram(r["etapes"][r["succes"]], bins=bords)
            resultats.append(
                {
                    "niveau": niveau["nom"],
                    "prudence": prudence,
                    "taux_succes": round(r["taux_succes"], 4),
                    "ic": wilson(int(r["succes"].sum()), LOT),
                    "taux_sans_collision": round(r["taux_sans_collision"], 4),
                    "collisions_moyennes": round(r["collisions_moyennes"], 3),
                    "etapes_mediane": float(np.median(r["etapes"])),
                    "histogramme_etapes": {"bords": bords, "effectifs": effectifs.tolist()},
                }
            )
    donnees = {"niveaux": NIVEAUX, "resultats": resultats, "lot": LOT, "max_etapes": MAX_ETAPES, "graine": GRAINE}
    SORTIE.parent.mkdir(parents=True, exist_ok=True)
    SORTIE.write_text(json.dumps(donnees, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    for r in resultats:
        print(f"{r['niveau']:8s} prudence={str(r['prudence']):5s} succes {r['taux_succes']:.3f} IC {r['ic']} collisions {r['collisions_moyennes']}")
    print(SORTIE.relative_to(RACINE))


if __name__ == "__main__":
    main()
