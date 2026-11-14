"""Visualisations Matplotlib partagees par les notebooks, aux couleurs P2Enjoy."""

from __future__ import annotations

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Rectangle

from .monde import RAYONS

BLEU, VERT, JAUNE, ROUGE, NOIR = "#23468C", "#238C33", "#D9CF4A", "#F24141", "#0D0D0D"
GRIS = "#8A93A6"
PALETTE = [BLEU, ROUGE, VERT, "#B8860B", "#7A4FBF", "#1B9AAA"]


def style() -> None:
    """Applique un style sobre et lisible en projection."""
    plt.rcParams.update(
        {
            "figure.dpi": 110,
            "axes.spines.top": False,
            "axes.spines.right": False,
            "axes.grid": True,
            "grid.alpha": 0.25,
            "axes.titleweight": "bold",
            "font.size": 10,
            "axes.prop_cycle": plt.cycler(color=PALETTE),
        }
    )


def dessiner_monde(
    monde,
    ax=None,
    *,
    trajectoires: dict | None = None,
    robot=None,
    obstacles=None,
    lidar: dict | None = None,
    croyance=None,
    plan=None,
    champ=None,
    titre: str | None = None,
):
    """Dessine l'entrepot vu de dessus.

    `monde` est un Entrepot ou la description d'une trace (dictionnaire "monde").
    trajectoires : {nom: [(x, y), ...]}. lidar : mesures a tracer depuis `robot`.
    croyance : matrice (hauteur, largeur) ou liste [x, y, p]. champ : matrice de distances.
    """
    d = monde.description() if hasattr(monde, "description") else monde
    if ax is None:
        _, ax = plt.subplots(figsize=(8, 5.6))
    L, H = d["largeur"], d["hauteur"]
    ax.set_xlim(0, L)
    ax.set_ylim(H, 0)
    ax.set_aspect("equal")
    ax.set_xticks([])
    ax.set_yticks([])
    ax.grid(False)
    for s in ax.spines.values():
        s.set_visible(False)
    ax.add_patch(Rectangle((0, 0), L, H, color="#F4F5F8", zorder=0))
    if champ is not None:
        c = np.array(champ, dtype=float)
        c[~np.isfinite(c) | (c > 1e5)] = np.nan
        ax.imshow(c, extent=(0, L, H, 0), cmap="Blues_r", alpha=0.75, zorder=1)
    if croyance is not None:
        if isinstance(croyance, list):
            m = np.zeros((H, L))
            for x, y, p in croyance:
                m[y, x] = p
            croyance = m
        masque = np.ma.masked_less(np.asarray(croyance), 1e-3)
        ax.imshow(masque, extent=(0, L, H, 0), cmap="YlOrRd", alpha=0.8, zorder=1, vmin=0)
    for x, y in d["murs"]:
        ax.add_patch(Rectangle((x, y), 1, 1, color=NOIR, zorder=2))
    for x, y in d["rayonnages"]:
        ax.add_patch(Rectangle((x + 0.06, y + 0.06), 0.88, 0.88, color=GRIS, zorder=2))
    dx, dy = d["depart"]
    ox, oy = d["objectif"]
    ax.add_patch(Rectangle((dx + 0.1, dy + 0.1), 0.8, 0.8, fill=False, ec=BLEU, lw=2, zorder=3))
    ax.add_patch(Rectangle((ox + 0.1, oy + 0.1), 0.8, 0.8, color=VERT, alpha=0.85, zorder=3))
    ax.text(ox + 0.5, oy + 0.5, "A", color="white", ha="center", va="center", weight="bold", zorder=4)
    ax.text(dx + 0.5, dy + 0.5, "D", color=BLEU, ha="center", va="center", weight="bold", zorder=4)
    if plan:
        px = [p[0] + 0.5 for p in plan]
        py = [p[1] + 0.5 for p in plan]
        ax.plot(px, py, ls=":", color=VERT, lw=2, zorder=4)
    for i, (nom, points) in enumerate((trajectoires or {}).items()):
        if not points:
            continue
        decal = (i - (len(trajectoires) - 1) / 2) * 0.12
        ax.plot(
            [p[0] + 0.5 + decal for p in points],
            [p[1] + 0.5 + decal for p in points],
            color=PALETTE[i % len(PALETTE)],
            lw=2.2,
            label=nom,
            zorder=5,
            alpha=0.9,
        )
        ax.scatter([points[-1][0] + 0.5 + decal], [points[-1][1] + 0.5 + decal], color=PALETTE[i % len(PALETTE)], s=40, zorder=6)
    for x, y in obstacles or []:
        ax.add_patch(Rectangle((x + 0.15, y + 0.15), 0.7, 0.7, color=ROUGE, zorder=5))
    if robot is not None:
        rx, ry = robot
        if lidar:
            for nom, (ex, ey) in RAYONS.items():
                k = lidar[nom]
                ax.plot([rx + 0.5, rx + 0.5 + ex * k], [ry + 0.5, ry + 0.5 + ey * k], color=JAUNE, lw=1.6, zorder=6)
        ax.scatter([rx + 0.5], [ry + 0.5], s=170, color=BLEU, edgecolor="white", lw=1.5, zorder=7)
    if trajectoires:
        ax.legend(loc="upper center", bbox_to_anchor=(0.5, -0.02), ncol=4, frameon=False)
    if titre:
        ax.set_title(titre)
    return ax


def dessiner_trace(trace, etape: int | None = None, ax=None, **options):
    """Dessine une trace (objet Trace ou dictionnaire) : trajectoire jusqu'a l'etape donnee."""
    d = trace.vers_dict() if hasattr(trace, "vers_dict") else trace
    etapes = d["etapes"]
    n = len(etapes) - 1 if etape is None else min(etape, len(etapes) - 1)
    e = etapes[n]
    points = [tuple(x["etat"]["robot"]) for x in etapes[: n + 1]]
    return dessiner_monde(
        d["monde"],
        ax,
        trajectoires={d["meta"]["agent"]: points},
        robot=e["etat"]["robot"],
        obstacles=e["etat"]["chariots"] + e["etat"]["palettes"],
        lidar=e["observation"]["lidar"],
        croyance=e["observation"].get("croyance"),
        plan=e["decision"].get("plan"),
        titre=options.pop("titre", f"{d['meta']['titre']} (etape {e['t']})"),
        **options,
    )
