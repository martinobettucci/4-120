#!/usr/bin/env bash
# Construit et lance le site en prod (nginx). Variables : .env.prod
#   ./runProd.sh        demarrage en arriere-plan
#   ./runProd.sh stop   arret
set -euo pipefail
cd "$(dirname "$0")"
DC=(docker compose --env-file .env.prod -f docker/docker-compose.prod.yml)
if [[ "${1:-up}" == "stop" ]]; then "${DC[@]}" down; else "${DC[@]}" up --build -d && "${DC[@]}" ps; fi
