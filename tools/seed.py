#!/usr/bin/env python3
"""Alimente le projet a partir de zero : tout ce que le site publie est regenere ici.

1. Traces de reference des scenes 3D (web/public/traces)
2. Donnees des animations (web/public/data)
3. Notebooks .ipynb et leurs rendus HTML (notebooks/, web/public/notebooks)
4. Paquet Python installable (web/public/dist)

Usage : python tools/seed.py [--sans-execution]
Avec --sans-execution, les notebooks deja executes du depot sont repris tels quels.
"""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
OUTILS = RACINE / "tools"


def lancer(*commande: str, cwd: Path = RACINE) -> None:
    print(f"\n== {' '.join(commande)}", flush=True)
    subprocess.run(commande, cwd=cwd, check=True)


def main() -> int:
    sans_execution = "--sans-execution" in sys.argv
    py = sys.executable
    lancer(py, str(OUTILS / "export_traces.py"))
    for script in ("export_m1.py", "export_m4.py", "export_m6.py"):
        lancer(py, str(OUTILS / script))
    public = RACINE / "web" / "public" / "notebooks"
    if sans_execution:
        # Rendu HTML des notebooks executes versionnes, sans relancer les calculs.
        import nbformat
        from nbconvert import HTMLExporter

        public.mkdir(parents=True, exist_ok=True)
        for nb in sorted((RACINE / "notebooks").glob("[0-9]*.ipynb")):
            html, _ = HTMLExporter(template_name="lab").from_notebook_node(nbformat.read(nb, as_version=4))
            (public / (nb.stem + ".html")).write_text(html, encoding="utf-8")
            shutil.copy(nb, public / nb.name)
            print(f"rendu : {nb.name}")
    else:
        lancer(py, str(OUTILS / "build_notebooks.py"))
    dist = RACINE / "web" / "public" / "dist"
    shutil.rmtree(dist, ignore_errors=True)
    lancer(py, "-m", "build", "--wheel", "--outdir", str(dist), str(RACINE / "python"))
    shutil.rmtree(RACINE / "python" / "build", ignore_errors=True)
    print("\nAlimentation terminee.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
