# Journal des changements

Format inspiré de Keep a Changelog. Les versions suivent le versionnage sémantique.

## [1.3.0] 2026-11-14

### Ajouté

- Cours théorique dans chaque leçon : définition, modèle, formules, algorithme en pseudo-code, propriétés et limites. Repris à déplier sur la page de chaque module.
- Cinq leçons au-delà du syllabus : décision par coût espéré, neurone et réseau de neurones, descente de gradient, système de recommandation, processus de décision markovien et politique. Le module 0 compte 25 leçons.
- Ateliers de construction, un par leçon : base de règles exécutée sur un banc de test, réglage d'un neurone, taux d'apprentissage, conception d'un scénario qui met un agent en défaut, modèle de contraintes vérifié par un solveur, réglage d'un recuit simulé, politique définie case par case et testée avec aléas, conception de récompenses, assemblage de programmes, calculs complets.

### Modifié

- Une leçon se valide par son atelier de construction, et non plus par des questions à choix. Les questions restent disponibles en complément.

## [1.2.0] 2026-11-14

### Modifié

- Module 0 entièrement repensé comme un parcours d'apprentissage : vingt leçons d'une page, en six temps (situer, prédire, observer, comprendre, s'exercer, retenir). L'animation ne tourne plus en boucle : elle avance par étapes commentées, avec une consigne d'observation à chaque étape.
- Modules 1 à 6 : objectifs observables, prérequis reliés aux leçons, consigne de prédiction avant l'animation, mission d'observation guidée de la scène 3D, quiz de fin et erreurs fréquentes.
- Notebooks : cellule « Avant de commencer » (prérequis, méthode lire, prédire, exécuter, modifier) et cellule « Auto-évaluation ».

### Ajouté

- Exemple résolu pas à pas, erreur fréquente, question d'application avec indice et question de transfert pour chaque leçon, avec une explication pour chaque réponse possible.
- Rappel espacé d'une leçon antérieure en début de leçon, suivi de progression dans le navigateur, glossaire, mode formateur.
- `docs/pedagogie.md` : cadres de référence (Merrill, Gagné, Mayer, charge cognitive, récupération en mémoire, prédire, observer, expliquer), sources et application dans le dépôt. Page « Méthodes et sources » sur le site.

## [1.1.0] 2026-11-14

### Ajouté

- Module 0, « Panorama des concepts » : les 20 notions des modules 1 à 6, chacune avec une animation en boucle pilotable (pause, curseur), une explication, un exemple du fil rouge, un commentaire pour la salle et un exercice à correction immédiate, avec suivi de progression.

### Corrigé

- Scène 3D : la comparaison de deux exécutions n'est proposée qu'entre traces du même entrepôt. Auparavant, deux scénarios aux cartes différentes pouvaient être superposés et un robot traversait les murs de l'autre.
- Symboles des boutons de lecture remplacés par des caractères présents dans toutes les polices.

## [1.0.0] 2026-11-14

### Ajouté

- Bibliothèque Python `ascent_agents` : simulateur d'entrepôt sur grille (lidar à 8 rayons, bruit, glissement, chariots mobiles, événements imprévus), agents réactif, délibératif et hybride, filtre bayésien discret, agent robuste, simulations par lots et Q-learning vectorisé en PyTorch, optimisation de tournée (CP-SAT et recuit simulé), approches de décision (règles, réseau bayésien, apprentissage supervisé).
- Format commun de traces `ascent-4130-trace/1`, produit par les notebooks et rejoué par le site.
- Six notebooks Jupyter, un par module du syllabus, exécutables sur GPU ou CPU, livrés exécutés avec leurs résultats pré-calculés.
- Site React, Vite et Three.js : accueil, syllabus, six pages de module (animation explicative, scène 3D, notebook, synthèse), atelier 3D avec import de traces, consignes de production.
- Scène 3D explicative : lecture, pause, étape par étape, retour à l'état initial, comparaison de deux exécutions, couches (capteurs, plan, trajectoire, croyance, position observée), vue éclatée du robot.
- Six animations explicatives pilotables étape par étape, alimentées par les données des notebooks.
- Environnements Docker de développement (autonome et auto-alimenté), de recette et de production, avec les lanceurs `runDev.sh`, `runStaging.sh` et `runProd.sh`.
- Site compilé versionné dans `site/` (`tools/build_site.sh`) et workflow GitHub Actions qui le publie sur GitHub Pages, avec vérifications non bloquantes en parallèle (tests, notebooks, parcours Playwright).
- Message de repli lorsque WebGL est indisponible dans le navigateur.
- Documentation : dossier d'architecture technique, guide de développement, journal de conception, syllabus et consignes de production.
