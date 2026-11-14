#!/usr/bin/env bash
# Compile le site complet dans site/ (dossier versionne, publie tel quel sur GitHub Pages).
# Usage : tools/build_site.sh [--executer]   (--executer relance aussi les six notebooks)
set -euo pipefail
cd "$(dirname "$0")/.."
PY="${PYTHON:-python}"
if [[ "${1:-}" == "--executer" ]]; then "$PY" tools/seed.py; else "$PY" tools/seed.py --sans-execution; fi
export VITE_DEPOT="${VITE_DEPOT:-martinobettucci/4-120}"
export VITE_BRANCHE="${VITE_BRANCHE:-$(git rev-parse --abbrev-ref HEAD)}"
(cd web && npm ci --no-audit --no-fund && npm run build)
rm -rf site && cp -r web/dist site && touch site/.nojekyll && rm -f site/.gitkeep
echo "Site compile dans site/ ($(du -sh site | cut -f1))"
