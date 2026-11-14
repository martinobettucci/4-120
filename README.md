# ASCENT 4-130, Les agents autonomes et aide à la décision

Supports de la formation ASCENT (Lot 4, référence 4-130) des 16 et 17 novembre 2026, conçue et animée par Martino Bettucci (P2Enjoy SAS, https://p2enjoy.studio) pour le ministère de la Transition écologique.

12 heures, 6 modules de 2 heures, 62,5 % de travaux pratiques. Fil rouge : un robot autonome dans un entrepôt logistique simulé.

Site publié : https://martinobettucci.github.io/4-120/

## Contenu

| Support | Emplacement | Rôle |
| --- | --- | --- |
| Site interactif | `web/` | Animations explicatives (motion design), scènes 3D rejouables, syllabus, accès aux notebooks |
| Notebooks | `notebooks/` | Un notebook par module, exécutable sur GPU ou CPU, livré exécuté |
| Bibliothèque Python | `python/ascent_agents/` | Simulateur d'entrepôt, agents, optimisation, incertitude, traces |
| Documentation | `docs/` | Syllabus, consignes de production, dossier d'architecture, journal |

Les trois supports partagent les mêmes exemples et un format commun de traces (`ascent-4130-trace/1`) : une expérience lancée dans un notebook se rejoue dans la scène 3D du site.

## Démarrage rapide

Prérequis : Docker.

```bash
./runDev.sh          # site sur http://localhost:5173, JupyterLab sur http://localhost:8888
./runDev.sh --gpu    # idem, avec PyTorch CUDA (pilote NVIDIA et NVIDIA Container Toolkit requis)
./runDev.sh tests    # tests unitaires Python
./runDev.sh e2e      # parcours Playwright, captures JPEG et vidéo WebM dans docs/captures
./runDev.sh stop
```

L'environnement de développement est autonome : au démarrage, le service `seed` régénère les traces, les données des animations, les rendus des notebooks et le paquet Python. Aucune variable n'est à renseigner.

| Profil | Lanceur | Variables | Service |
| --- | --- | --- | --- |
| Développement | `./runDev.sh` | `.env.dev` | Vite avec rechargement à chaud, JupyterLab |
| Recette | `./runStaging.sh` | `.env.staging` | Site compilé servi par nginx (port 8080 par défaut) |
| Production | `./runProd.sh` | `.env.prod` | Site compilé servi par nginx (port 80 par défaut) |

Instructions détaillées : [docs/DEVELOPPEMENT.md](docs/DEVELOPPEMENT.md).

## Publication sur GitHub Pages

Le site est compilé en local puis versionné dans `site/` :

```bash
tools/build_site.sh             # reprend les notebooks exécutés du dépôt
tools/build_site.sh --executer  # relance aussi les six notebooks
```

Le workflow `.github/workflows/pages.yml` publie ce dossier tel quel. Les vérifications (tests, exécution des notebooks, parcours Playwright) tournent en parallèle et ne bloquent pas la publication.

Réglage à faire une seule fois dans le dépôt : **Settings, Pages, Build and deployment, Source : GitHub Actions**. La publication part ensuite à chaque poussée sur la branche par défaut.

## Programme

| Jour | Module | Notebook |
| --- | --- | --- |
| 1 | 1. Solutions IA pour la prise de décision | `01_solutions_ia_decision.ipynb` |
| 1 | 2. Concept des agents intelligents et interactions avec l'environnement | `02_agent_environnement.ipynb` |
| 1 | 3. Architecture des agents intelligents | `03_architectures_agents.ipynb` |
| 2 | 4. Techniques d'optimisation pour les agents | `04_optimisation.ipynb` |
| 2 | 5. Autonomie des systèmes robotisés | `05_autonomie_robotique.ipynb` |
| 2 | 6. Tests et validation des systèmes | `06_tests_validation.ipynb` |

## Documentation

- [Syllabus officiel 4-130](docs/syllabus-4-130.md)
- [Consignes de production pédagogique](docs/consignes-production.md)
- [Dossier d'architecture technique](docs/DAT.md)
- [Développement, données de départ et tests](docs/DEVELOPPEMENT.md)
- [Journal de conception](docs/journal.md)
- [Journal des changements](CHANGELOG.md)
