#!/usr/bin/env bash
# Construit et lance le site en staging (nginx). Variables : .env.staging
#   ./runStaging.sh        demarrage en arriere-plan
#   ./runStaging.sh stop   arret
set -euo pipefail
cd "$(dirname "$0")"
DC=(docker compose --env-file .env.staging -f docker/docker-compose.staging.yml)
if [[ "${1:-up}" == "stop" ]]; then "${DC[@]}" down; else "${DC[@]}" up --build -d && "${DC[@]}" ps; fi
