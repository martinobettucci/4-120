#!/usr/bin/env python3
"""Construit les notebooks Jupyter a partir des sources au format "percent".

Sources : notebooks/src/NN_nom.py, avec des cellules delimitees par `# %%` (code)
et `# %% [markdown]` (texte, chaque ligne prefixee par `# `).
Sorties : notebooks/NN_nom.ipynb executes (les resultats pre-calcules restent visibles
sans rien relancer), et leur rendu HTML dans web/public/notebooks/.

Usage : python tools/build_notebooks.py [--sans-execution] [filtre]
"""

from __future__ import annotations

import argparse
import shutil
import sys
import time
from pathlib import Path

import nbformat

sys.path.insert(0, str(Path(__file__).resolve().parent))
import pedagogie_notebooks as pedagogie  # noqa: E402
from nbclient import NotebookClient
from nbconvert import HTMLExporter

RACINE = Path(__file__).resolve().parent.parent
SOURCES = RACINE / "notebooks" / "src"
SORTIE = RACINE / "notebooks"
PUBLIC = RACINE / "web" / "public" / "notebooks"


def convertir(source: Path) -> nbformat.NotebookNode:
    cellules, type_courant, lignes = [], None, []

    def fermer():
        if type_courant is None:
            return
        texte = "\n".join(lignes).strip("\n")
        if not texte.strip():
            return
        if type_courant == "markdown":
            texte = "\n".join(l[2:] if l.startswith("# ") else l.lstrip("#") for l in texte.split("\n"))
            cellules.append(nbformat.v4.new_markdown_cell(texte))
        else:
            cellules.append(nbformat.v4.new_code_cell(texte))

    for ligne in source.read_text(encoding="utf-8").split("\n"):
        if ligne.startswith("# %%"):
            fermer()
            type_courant = "markdown" if "[markdown]" in ligne else "code"
            lignes = []
        elif type_courant is not None:
            lignes.append(ligne)
    fermer()
    # Cellules pedagogiques communes : ouverture apres le titre, auto-evaluation a la fin.
    numero = source.name[:2]
    if numero in pedagogie.NOTEBOOKS:
        cellules.insert(1, nbformat.v4.new_markdown_cell(pedagogie.ouverture(numero)))
        cellules.append(nbformat.v4.new_markdown_cell(pedagogie.cloture(numero)))
    nb = nbformat.v4.new_notebook(cells=cellules)
    nb.metadata["kernelspec"] = {"display_name": "Python 3", "language": "python", "name": "python3"}
    nb.metadata["language_info"] = {"name": "python"}
    nb.metadata["accelerator"] = "GPU"  # Colab : demande un GPU si disponible
    for i, c in enumerate(nb.cells):
        c["id"] = f"c{i:03d}"
    return nb


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("filtre", nargs="?", default="")
    p.add_argument("--sans-execution", action="store_true")
    args = p.parse_args()
    PUBLIC.mkdir(parents=True, exist_ok=True)
    echecs = 0
    for source in sorted(SOURCES.glob("[0-9]*.py")):
        if args.filtre and args.filtre not in source.name:
            continue
        nb = convertir(source)
        cible = SORTIE / (source.stem + ".ipynb")
        debut = time.time()
        if not args.sans_execution:
            try:
                NotebookClient(nb, timeout=900, kernel_name="python3", resources={"metadata": {"path": str(SORTIE)}}).execute()
            except Exception as erreur:  # noqa: BLE001
                echecs += 1
                print(f"ECHEC {source.name} : {str(erreur)[-1500:]}", file=sys.stderr)
        nbformat.write(nb, cible)
        html, _ = HTMLExporter(template_name="lab").from_notebook_node(nb)
        (PUBLIC / (source.stem + ".html")).write_text(html, encoding="utf-8")
        shutil.copy(cible, PUBLIC / cible.name)
        print(f"{cible.name} : {len(nb.cells)} cellules, {time.time() - debut:.1f} s")
    return 1 if echecs else 0


if __name__ == "__main__":
    sys.exit(main())
