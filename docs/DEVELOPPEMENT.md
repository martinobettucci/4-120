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

Le parcours de bout en bout (`tools/e2e.cjs`) vérifie les sept modules, ouvre la notion en bref de chaque leçon, résout l'atelier de chacune des 39 leçons (conceptions insuffisantes refusées, puis conception correcte validée), rejoue sur chacun le parcours « trois échecs, Voir la solution, vérification », contrôle que les 39 ateliers expliquent alors leur solution ligne par ligne, fait avancer chaque animation et chaque scène 3D, contrôle la présence des notebooks, puis enregistre des captures JPEG et une vidéo WebM dans `docs/captures/`.

Il lance ensuite, successivement, les deux contrôles des prérequis et du vocabulaire animé du bloc 0 : présence de bases dans les 39 leçons, couverture des 224 concepts, rendu de leurs 675 étapes sur ordinateur et mobile, commandes de lecture, clavier et réduction des mouvements. Le parcours vérifie aussi les vingt robots de Bayes, leur classement progressif dans les quatre cases, puis les groupes effectivement encadrés pour les quatre proportions. Pour une vérification ciblée (Playwright disponible dans `NODE_PATH`, comme dans le conteneur de test) :

```bash
node tools/verifier_mots.cjs --planches   # tous les dessins, textes, débordements et planches de relecture
node tools/verifier_mots.cjs --planches --bases # mêmes contrôles, planches limitées aux 91 bases
node tools/verifier_mots.cjs --planches --complements # planches des 47 séquences ajoutées lors de l'audit de toutes les leçons
node tools/e2e_mots.cjs http://localhost:5173  # toutes les étapes dans l'application de développement
node tools/e2e_mots.cjs http://localhost:5173 --complements # les 47 ajouts, avec contrôles de Bayes et des commandes de lecture
```

Les résultats et captures sont écrits dans `.tmp/situer/verification` et `.tmp/situer/parcours` ; `MOTS_SORTIE` permet de choisir un autre dossier. Les scénarios sont dans `web/src/lecons/mots/`, en correspondance exacte avec le vocabulaire des leçons. `bases.js` assemble les prérequis scientifiques, agentiques, leurs compléments et le parcours continu de Bayes ; ils précèdent le vocabulaire spécialisé. La carte de couverture pédagogique est dans `docs/prerequis-lecons.md`. Chaque concept doit avoir un exemple concret, au moins trois étapes commentées et une évolution visuelle ; les dessins possèdent une disposition spécifique aux petits écrans. Les tableaux des compléments deviennent des groupes de champs nommés sur téléphone pour conserver une taille de caractères lisible. Ajouter des explications de corrigé ne remplace pas l'introduction des prérequis.

Contrôle complet du contenu pédagogique, à lancer après toute modification d'une leçon :

```bash
cd web && npm ci && cd ..
node tools/verifier_contenu.cjs --planches   # structure, questions, animations, explications, planches de relecture
```

Écrire ou modifier un atelier : un composant `({ surReussite })` dans `web/src/ateliers/`, dont l'évaluation est une fonction pure exportée (`evaluerXxx(conception)`), reproductible (générateur `alea`, jamais `Math.random`). L'atelier appelle `sol.noter(reussi)` à chaque vérification et place `sol.bouton(appliquer)` à côté du bouton de vérification (`useSolution`, dans `Solution.jsx`). Sa recette de bout en bout va dans `tools/e2e_conception_*.cjs` ou `tools/e2e_agentique_*.cjs`. Avant de publier, énumérer les conceptions possibles avec la fonction d'évaluation : l'état de départ et l'essai tentant doivent échouer, et les conceptions valides rester rares.

Pour conserver les captures d’un contrôle local hors des fichiers versionnés, définir `E2E_SORTIE=.tmp/captures`. Pour les planches du contrôle pédagogique, définir `CONTENU_SORTIE=.tmp/planches`.

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
