# Journal des changements

Format inspiré de Keep a Changelog. Les versions suivent le versionnage sémantique.

## [1.0.0] 2026-11-14

### Ajouté

- Bibliothèque Python `ascent_agents` : simulateur d'entrepôt sur grille (lidar à 8 rayons, bruit, glissement, chariots mobiles, événements imprévus), agents réactif, délibératif et hybride, filtre bayésien discret, agent robuste, simulations par lots et Q-learning vectorisé en PyTorch, optimisation de tournée (CP-SAT et recuit simulé), approches de décision (règles, réseau bayésien, apprentissage supervisé).
- Format commun de traces `ascent-4130-trace/1`, produit par les notebooks et rejoué par le site.
- Six notebooks Jupyter, un par module du syllabus, exécutables sur GPU ou CPU, livrés exécutés avec leurs résultats pré-calculés.
- Site React, Vite et Three.js : accueil, syllabus, six pages de module (animation explicative, scène 3D, notebook, synthèse), atelier 3D avec import de traces, consignes de production.
- Scène 3D explicative : lecture, pause, étape par étape, retour à l'état initial, comparaison de deux exécutions, couches (capteurs, plan, trajectoire, croyance, position observée), vue éclatée du robot.
- Six animations explicatives pilotables étape par étape, alimentées par les données des notebooks.
- Environnements Docker de développement (autonome et auto-alimenté), de recette et de production, avec les lanceurs `runDev.sh`, `runStaging.sh` et `runProd.sh`.
- Workflow GitHub Actions : tests, exécution des notebooks, compilation, parcours Playwright, publication sur GitHub Pages.
- Documentation : dossier d'architecture technique, guide de développement, journal de conception, syllabus et consignes de production.
