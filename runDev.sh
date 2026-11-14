#!/usr/bin/env bash
# Lance l'environnement de developpement complet (site + JupyterLab), autonome et auto-alimente.
#   ./runDev.sh           site sur http://localhost:5173, JupyterLab sur http://localhost:8888
#   ./runDev.sh --gpu     meme chose avec PyTorch CUDA dans JupyterLab
#   ./runDev.sh tests     tests unitaires Python
#   ./runDev.sh e2e       tests de bout en bout Playwright (captures et video dans docs/captures)
#   ./runDev.sh stop      arret
set -euo pipefail
cd "$(dirname "$0")"
FICHIERS=(-f docker/docker-compose.dev.yml)
if [[ "${1:-}" == "--gpu" ]]; then FICHIERS+=(-f docker/docker-compose.gpu.yml); shift; fi
DC=(docker compose --env-file .env.dev "${FICHIERS[@]}")
case "${1:-up}" in
  up) "${DC[@]}" up --build ;;
  tests) "${DC[@]}" --profile tests run --build --rm tests ;;
  e2e) "${DC[@]}" --profile e2e up --build --abort-on-container-exit --exit-code-from e2e e2e ;;
  stop) "${DC[@]}" --profile e2e --profile tests down ;;
  *) echo "Usage : $0 [--gpu] [up|tests|e2e|stop]"; exit 1 ;;
esac
