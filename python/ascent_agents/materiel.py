"""Detection du materiel (GPU ou CPU) et reproductibilite."""

from __future__ import annotations

import os
import random

import numpy as np


def detecter_appareil(verbeux: bool = True):
    """Retourne l'appareil de calcul PyTorch : CUDA si disponible, sinon CPU.

    Le GPU n'accelere que les calculs tensoriels (apprentissage, inference,
    simulations paralleles). Les algorithmes sequentiels (A*, CP-SAT) restent sur CPU.
    Si PyTorch est absent, la fonction retourne la chaine "cpu".
    """
    try:
        import torch
    except ImportError:
        if verbeux:
            print("PyTorch absent : execution sur CPU avec NumPy uniquement.")
        return "cpu"
    if os.environ.get("ASCENT_FORCER_CPU") == "1":
        appareil = torch.device("cpu")
    elif torch.cuda.is_available():
        appareil = torch.device("cuda")
    else:
        appareil = torch.device("cpu")
    if verbeux:
        if appareil.type == "cuda":
            nom = torch.cuda.get_device_name(0)
            memoire = torch.cuda.get_device_properties(0).total_memory / 2**30
            print(f"GPU detecte : {nom} ({memoire:.1f} Go), calculs tensoriels sur CUDA.")
        else:
            print("Aucun GPU CUDA detecte : repli sur CPU (tous les notebooks restent executables).")
        print(f"PyTorch {torch.__version__}")
    return appareil


def fixer_graines(graine: int = 4130) -> int:
    """Fixe les graines aleatoires (random, NumPy, PyTorch) pour des demonstrations reproductibles."""
    random.seed(graine)
    np.random.seed(graine)
    try:
        import torch

        torch.manual_seed(graine)
        if torch.cuda.is_available():
            torch.cuda.manual_seed_all(graine)
    except ImportError:
        pass
    return graine
