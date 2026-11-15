# Développement, données de départ et tests

## Lancer le projet en développement

Prérequis : Docker (avec Compose). Rien d'autre à installer.

```bash
./runDev.sh
```

| Service | Adresse | Rôle |
| --- | --- | --- |
| `seed` | (tâche ponctuelle) | Régénère toutes les données de départ, puis s'arrête |
| `web` | http://localhost:5173 | Site avec rechargement à chaud |
| `jupyter` | http://localhost:8888 | JupyterLab, sans jeton, sur le dossier `notebooks/` |

Les ports se changent dans `.env.dev`. Avec un GPU NVIDIA : `./runDev.sh --gpu`.

## Données de départ (seed)

Le développement est autonome : aucune donnée externe, aucun secret. Tout ce que le site affiche est régénéré par `tools/seed.py`, à partir de graines aléatoires fixées (4130 par défaut).

| Étape | Script | Sortie |
| --- | --- | --- |
| Traces des scènes 3D | `tools/export_traces.py` | `web/public/traces/*.json` et `index.json` |
| Données de l'animation du module 1 | `tools/export_m1.py` | `web/public/data/m1_decision.json` |
| Données de l'animation du module 4 | `tools/export_m4.py` | `web/public/data/m4_optimisation.json` |
| Données de l'animation du module 6 | `tools/export_m6.py` | `web/public/data/m6_validation.json` |
| Notebooks | `tools/build_notebooks.py` | `notebooks/*.ipynb` exécutés, rendus HTML dans `web/public/notebooks/` |
| Paquet Python | `python -m build` | `web/public/dist/ascent_agents-1.0.0-py3-none-any.whl` |

```bash
python tools/seed.py                    # tout régénérer, notebooks exécutés (quelques minutes)
python tools/seed.py --sans-execution   # reprendre les notebooks exécutés du dépôt
python tools/build_notebooks.py 04      # reconstruire un seul notebook
```

Toutes les données sont synthétiques : aucune donnée réelle, médicale ou personnelle.

## Modifier un notebook

Les sources sont les fichiers `notebooks/src/NN_nom.py`, au format « percent » (`# %%` pour une cellule de code, `# %% [markdown]` pour une cellule de texte). Ce format se relit et se compare facilement dans Git. Les fichiers `.ipynb` sont générés : ne pas les modifier à la main.

## Tests

```bash
./runDev.sh tests   # pytest : noyau, décision, optimisation, dossiers
./runDev.sh e2e     # Playwright : navigation, animations, scènes 3D, notebooks
```

Le parcours de bout en bout (`tools/e2e.cjs`) vérifie les sept modules, ouvre la notion en bref de chaque leçon, résout l'atelier de chacune des 39 leçons (conceptions insuffisantes refusées, puis conception correcte validée), rejoue sur chacun le parcours « trois échecs, Voir la solution, vérification », contrôle que les ateliers de conception expliquent alors leur solution ligne par ligne, fait avancer chaque animation et chaque scène 3D, contrôle la présence des notebooks, puis enregistre des captures JPEG et une vidéo WebM dans `docs/captures/`.

Contrôle complet du contenu pédagogique, à lancer après toute modification d'une leçon :

```bash
cd web && npm ci && cd ..
node tools/verifier_contenu.cjs --planches   # structure, questions, animations, explications, planches de relecture
```

Écrire ou modifier un atelier : un composant `({ surReussite })` dans `web/src/ateliers/`, dont l'évaluation est une fonction pure exportée (`evaluerXxx(conception)`), reproductible (générateur `alea`, jamais `Math.random`). L'atelier appelle `sol.noter(reussi)` à chaque vérification et place `sol.bouton(appliquer)` à côté du bouton de vérification (`useSolution`, dans `Solution.jsx`). Sa recette de bout en bout va dans `tools/e2e_conception_*.cjs` ou `tools/e2e_agentique_*.cjs`. Avant de publier, énumérer les conceptions possibles avec la fonction d'évaluation : l'état de départ et l'essai tentant doivent échouer, et les conceptions valides rester rares.

Les planches écrites dans `docs/captures/planches` montrent chaque étape de chaque leçon à côté de son commentaire : elles sont à relire en entier avant publication.

Sans Docker :

```bash
python -m venv .venv && . .venv/bin/activate
pip install --index-url https://download.pytorch.org/whl/cpu torch
pip install -r docker/requirements.txt && pip install -e python
python tools/seed.py --sans-execution
cd web && npm ci && npm run dev
```

## Recette et production

```bash
./runStaging.sh     # variables : .env.staging
./runProd.sh        # variables : .env.prod
```

Les deux profils construisent l'image `docker/Dockerfile.site` (données générées par Python, site compilé par Vite, service par nginx). Les variables à valoriser sont commentées dans chaque fichier `.env`. La publication de référence reste GitHub Pages.
