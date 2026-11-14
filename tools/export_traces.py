#!/usr/bin/env python3
"""Exporte les traces de reference rejouees par les scenes 3D du site.

Les memes traces peuvent etre regenerees depuis les notebooks : le format est commun.
Usage : python tools/export_traces.py
"""

from __future__ import annotations

import json
from pathlib import Path

from ascent_agents import creer_scenario, simuler
from ascent_agents.agents import AgentDeliberatif, AgentHybride, AgentReactif
from ascent_agents.incertitude import AgentNaif, AgentRobuste
from ascent_agents.monde import Evenement

SORTIE = Path(__file__).resolve().parent.parent / "web" / "public" / "traces"
PALETTE = lambda: [Evenement(6, (6, 7))]  # noqa: E731  palette deposee sur le trajet prevu
BRUIT = dict(bruit_position=0.8, bruit_lidar=0.4, glissement=0.15)


def main() -> None:
    SORTIE.mkdir(parents=True, exist_ok=True)
    catalogue = []

    def exporter(ident, module, titre, description, monde, agent, max_etapes=120):
        trace = simuler(monde, agent, identifiant=ident, module=module, titre=titre, max_etapes=max_etapes)
        trace.enregistrer(SORTIE / f"{ident}.json")
        b = trace.bilan
        catalogue.append(
            {
                "id": ident,
                "module": module,
                "titre": titre,
                "description": description,
                "agent": agent.nom,
                "succes": b["succes"],
                "etapes": b["etapes"],
                "collisions": b["collisions"],
            }
        )
        print(f"{ident:32s} succes={b['succes']!s:5s} etapes={b['etapes']:3d} collisions={b['collisions']}")

    # Module 2 : la boucle perception, decision, action et l'ecart entre etat reel et etat observe.
    exporter("m2_reactif_ouvert", 2, "Agent réactif, zone dégagée", "Capteurs parfaits : l'observation correspond à l'état réel.", creer_scenario("ouvert"), AgentReactif())
    exporter("m2_reactif_bruit", 2, "Agent réactif, lidar bruité", "Lidar bruité et rayons perdus : l'agent décide sur une observation imparfaite.", creer_scenario("ouvert", bruit_lidar=0.7, perte_lidar=0.1), AgentReactif())
    exporter("m2_hybride_entrepot", 2, "Agent complet, entrepôt de référence", "Le fil rouge : chariots mobiles et rayonnages.", creer_scenario("entrepot"), AgentHybride())
    # Module 3 : les memes scenarios pour trois architectures.
    for scenario, libelle, ev in (("piege", "cul-de-sac en U", None), ("entrepot", "palette imprévue", PALETTE)):
        for Classe, nom in ((AgentReactif, "réactif"), (AgentDeliberatif, "délibératif"), (AgentHybride, "hybride")):
            exporter(
                f"m3_{Classe.nom}_{scenario}",
                3,
                f"Agent {nom}, {libelle}",
                f"Architecture {Classe.architecture} dans le scénario « {libelle} ».",
                creer_scenario(scenario, evenements=ev() if ev else None),
                Classe(),
                max_etapes=70,
            )
    # Module 5 : incertitudes et obstacle imprevu.
    exporter("m5_naif", 5, "Politique simple, capteurs bruités", "L'agent fait confiance à la position brute : il replanifie sans cesse.", creer_scenario("entrepot", evenements=PALETTE(), graine=3, **BRUIT), AgentNaif(), 200)
    exporter("m5_robuste", 5, "Politique améliorée, filtre bayésien", "La position vient d'une croyance mise à jour à chaque étape.", creer_scenario("entrepot", evenements=PALETTE(), graine=3, **BRUIT), AgentRobuste(), 200)
    # Module 6 : scenarios de test a perturbation croissante, avant et apres correction.
    niveaux = {
        "nominal": dict(),
        "degrade": dict(bruit_position=0.6, bruit_lidar=0.4, glissement=0.15),
        "limite": dict(bruit_position=1.1, bruit_lidar=0.8, perte_lidar=0.1, glissement=0.3),
    }
    libelles = {"nominal": "nominal", "degrade": "dégradé", "limite": "limite"}
    for niveau, params in niveaux.items():
        for Classe, etat in ((AgentNaif, "avant correction"), (AgentRobuste, "après correction")):
            exporter(
                f"m6_{niveau}_{Classe.nom}",
                6,
                f"Scénario {libelles[niveau]}, {etat}",
                f"Niveau de perturbation {libelles[niveau]} ({etat}).",
                creer_scenario("entrepot", evenements=PALETTE(), graine=11, **params),
                Classe(),
                160,
            )
    (SORTIE / "index.json").write_text(json.dumps(catalogue, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(catalogue)} traces dans {SORTIE}")


if __name__ == "__main__":
    main()
