"""Format commun de traces : le lien entre notebooks, animations et scenes 3D.

Une trace decrit une execution, etape par etape :
numero d'etape, etat de l'environnement, observations, decision de l'agent,
action executee, resultat et metriques de performance.
Le meme fichier JSON est produit par les notebooks et rejoue par le site.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path

SCHEMA = "ascent-4130-trace/1"


def _natif(valeur):
    """Convertit recursivement les types NumPy et les tuples en types JSON natifs."""
    import numpy as np

    if isinstance(valeur, dict):
        return {str(k): _natif(v) for k, v in valeur.items()}
    if isinstance(valeur, (list, tuple, set)):
        return [_natif(v) for v in valeur]
    if isinstance(valeur, np.generic):
        return valeur.item()
    if isinstance(valeur, np.ndarray):
        return valeur.tolist()
    if isinstance(valeur, float):
        return round(valeur, 5)
    return valeur


@dataclass
class Trace:
    """Trace d'execution d'un agent dans un environnement."""

    identifiant: str
    module: int
    titre: str
    agent: str
    monde: dict
    parametres: dict = field(default_factory=dict)
    etapes: list[dict] = field(default_factory=list)
    bilan: dict = field(default_factory=dict)

    def ajouter(self, *, t, etat, observation, decision, action, resultat, metriques) -> None:
        self.etapes.append(
            {
                "t": t,
                "etat": etat,
                "observation": observation,
                "decision": decision,
                "action": action,
                "resultat": resultat,
                "metriques": metriques,
            }
        )

    def vers_dict(self) -> dict:
        return _natif(
            {
                "schema": SCHEMA,
                "meta": {
                    "id": self.identifiant,
                    "module": self.module,
                    "titre": self.titre,
                    "agent": self.agent,
                    "parametres": self.parametres,
                },
                "monde": self.monde,
                "etapes": self.etapes,
                "bilan": self.bilan,
            }
        )

    def enregistrer(self, chemin: str | Path) -> Path:
        chemin = Path(chemin)
        chemin.parent.mkdir(parents=True, exist_ok=True)
        chemin.write_text(json.dumps(self.vers_dict(), ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        return chemin

    def trajectoire(self) -> list[tuple[int, int]]:
        """Positions reelles successives du robot (etat initial compris)."""
        return [tuple(e["etat"]["robot"]) for e in self.etapes] + (
            [tuple(self.bilan["position_finale"])] if "position_finale" in self.bilan else []
        )


def charger_trace(chemin: str | Path) -> dict:
    """Charge une trace JSON et verifie son schema."""
    donnees = json.loads(Path(chemin).read_text(encoding="utf-8"))
    valider_trace(donnees)
    return donnees


def valider_trace(donnees: dict) -> None:
    """Leve une ValueError si la trace ne respecte pas le format commun."""
    if donnees.get("schema") != SCHEMA:
        raise ValueError(f"Schema inattendu : {donnees.get('schema')}")
    for cle in ("meta", "monde", "etapes", "bilan"):
        if cle not in donnees:
            raise ValueError(f"Champ manquant : {cle}")
    for etape in donnees["etapes"]:
        for cle in ("t", "etat", "observation", "decision", "action", "resultat", "metriques"):
            if cle not in etape:
                raise ValueError(f"Etape {etape.get('t')} : champ manquant {cle}")
