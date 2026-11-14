"""Boucle perception, decision, action : execution d'un agent et production d'une trace."""

from __future__ import annotations

import time

from .monde import Entrepot
from .traces import Trace


def simuler(
    monde: Entrepot,
    agent,
    *,
    max_etapes: int = 120,
    identifiant: str | None = None,
    module: int = 0,
    titre: str | None = None,
    graine: int | None = None,
) -> Trace:
    """Execute la boucle perception, decision, action jusqu'a l'objectif ou la limite d'etapes."""
    observation = monde.reinitialiser(graine)
    agent.reinitialiser(monde)
    trace = Trace(
        identifiant=identifiant or f"{monde.nom}-{agent.nom}",
        module=module,
        titre=titre or f"{agent.nom} dans {monde.nom}",
        agent=agent.nom,
        monde=monde.description(),
        parametres={
            "graine": monde.graine,
            "bruit_lidar": monde.bruit_lidar,
            "perte_lidar": monde.perte_lidar,
            "bruit_position": monde.bruit_position,
            "glissement": monde.glissement,
            "max_etapes": max_etapes,
        },
    )
    temps_decision = []
    arrive = False
    for _ in range(max_etapes):
        etat = {
            "robot": list(monde.robot),
            "chariots": [list(c.position) for c in monde.chariots],
            "palettes": [list(c) for c in sorted(monde.palettes)],
        }
        debut = time.perf_counter()
        action, infos = agent.decider(observation)
        duree_ms = (time.perf_counter() - debut) * 1000
        temps_decision.append(duree_ms)
        resultat = monde.avancer(action)
        obs_trace = {
            "lidar": observation["lidar"],
            "position": list(observation["position"]),
        }
        if "croyance" in infos:
            obs_trace["croyance"] = infos.pop("croyance")
        if "position_estimee" in infos:
            obs_trace["position_estimee"] = infos.pop("position_estimee")
        trace.ajouter(
            t=observation["etape"],
            etat=etat,
            observation=obs_trace,
            decision=infos,
            action=action,
            resultat=resultat,
            metriques={
                "distance": monde.distance,
                "collisions": monde.collisions,
                "temps_decision_ms": round(duree_ms, 4),
                "distance_objectif": abs(monde.robot[0] - monde.objectif[0]) + abs(monde.robot[1] - monde.objectif[1]),
            },
        )
        observation = monde.observer()
        if resultat["arrive"]:
            arrive = True
            break
    trace.bilan = {
        "succes": arrive,
        "etapes": len(trace.etapes),
        "distance": monde.distance,
        "collisions": monde.collisions,
        "temps_decision_moyen_ms": round(sum(temps_decision) / max(len(temps_decision), 1), 4),
        "temps_decision_max_ms": round(max(temps_decision, default=0.0), 4),
        "position_finale": list(monde.robot),
        "chariots_finaux": [list(c.position) for c in monde.chariots],
        "palettes_finales": [list(c) for c in sorted(monde.palettes)],
    }
    return trace


def comparer(monde_fabrique, agents: dict, **options) -> dict[str, Trace]:
    """Execute plusieurs agents sur des copies identiques du meme scenario."""
    return {nom: simuler(monde_fabrique(), agent, **options) for nom, agent in agents.items()}


def tableau_bilans(traces: dict[str, Trace]) -> list[dict]:
    """Bilan comparatif, pret pour un DataFrame pandas."""
    return [
        {
            "agent": nom,
            "succes": t.bilan["succes"],
            "etapes": t.bilan["etapes"],
            "distance": t.bilan["distance"],
            "collisions": t.bilan["collisions"],
            "decision_moy_ms": t.bilan["temps_decision_moyen_ms"],
        }
        for nom, t in traces.items()
    ]
