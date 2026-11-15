# Journal des changements

Format inspiré de Keep a Changelog. Les versions suivent le versionnage sémantique.

## [1.4.0] 2026-11-15

### Ajouté

- Module 7, « Systèmes agentiques », en prolongement du programme. Il reprend le support de l'autrice « Systèmes agentiques : une exploration approfondie » (`docs/sources/`), refait au format du site. Rien n'est retiré du programme existant.
- Quatorze leçons en six temps, chacune avec son cours, son exemple résolu et son atelier : composantes et vocabulaire, niveaux d'autonomie, familles d'agents, agents à règles, heuristiques et statistiques, agent LLM et hybridation, diffusion de la complexité, diffusion du risque, routage, arbitrage et modération, RAG et mémoire, design patterns, implémentation en Python, évaluation, gouvernance et journalisation, cas d'usage et conception complète. Le module 0 compte 39 leçons.
- Dix ateliers de construction propres au module 7 (composition d'un agent, contrôles d'un LLM, contrôles d'une chaîne, arbitre, seuils de délégation, routeur, étage de recherche d'un RAG, schéma de journal, heuristique de priorité, architecture par design patterns), et quatre ateliers de calcul ou d'assemblage de programme.
- Notebook `07_systemes_agentiques` : un système de traitement de dossiers construit brique par brique, avec une mesure après chaque ajout. La lecture du courrier est confiée à `Qwen/Qwen3.5-0.8B` quand il est disponible, à un extracteur simulé sinon, et le mode utilisé est affiché.
- Bibliothèque : module `ascent_agents.dossiers` (dossiers synthétiques, routeur, agent à règles, score d'anomalie, extracteur, arbitre, modérateur, mini-RAG, journal) et ses tests.
- Page du module 7 et son animation en cinq étapes. Carte « Pour aller plus loin » sur les modules 1, 2, 3, 5 et 6, qui renvoie vers les leçons du module 7.
- Parcours automatisé : les 39 ateliers sont résolus de bout en bout, le module 7 est vérifié comme les autres (`tools/e2e_agentique_a.cjs`, `_b.cjs`, `_c.cjs`).

### Modifié

- Accueil, page des notebooks et panorama : compteurs et textes mis à jour (39 leçons, 7 notebooks). Les mentions du programme de 12 heures en 6 modules sont inchangées.

## [1.3.1] 2026-11-14

### Corrigé

Défauts relevés par une vérification complète des 25 leçons (78 étapes de démonstration, 68 questions, 25 ateliers), des 6 animations de module (30 étapes), des missions d'observation et des 6 notebooks.

- Recuit simulé (leçon et module 4) : la courbe de coût était tracée à l'envers et la bille finissait sur une bosse. Un coût faible est maintenant en bas, et la bille finit dans le creux le plus profond.
- Croyance et filtre bayésien : le scénario du couloir laissait deux positions plausibles alors que le commentaire en annonçait une seule. Portes déplacées, valeurs recalculées avec le modèle de la leçon (62 % et 28 %).
- Robustesse : la fin de l'étape « conditions nominales » affichait 89 % contre 99 %. Courbe et positions d'arrêt revues (98 % et 99 %, puis 87 % et 39 %, puis 69 % et 5 %).
- Architecture hybride : l'animation était en avance sur son commentaire. Trois phases alignées : plan initial, palette et détection par le lidar, nouveau plan.
- Planifier avec A* : l'exemple ne montrait aucune exploration au-delà du chemin. L'objectif est maintenant derrière un obstacle (15 cases explorées pour un chemin de 11 pas).
- État réel et observation : deux mesures censées différer tombaient au même endroit.
- Processus de décision markovien : la fosse n'était pas au sud du robot, contrairement au texte.
- Réseau bayésien : le commentaire annonçait 72 % et 22 %, l'animation affichait 73 % et 23 %.
- Apprentissage supervisé : l'erreur affichée était une valeur arbitraire. Elle est maintenant comptée sur les points réellement mal classés (54 %, puis 15 %, puis 7 %).
- Espace de recherche, architecture réactive, intervalle de confiance, boucle perception, décision, action : commentaires et positions d'arrêt alignés sur ce que l'animation montre.
- Cours sur le réseau de neurones : l'architecture citée ne correspondait pas à celle du notebook 01 (6 entrées, deux couches de 32 neurones, 4 sorties).
- Trois cours sans formule (apprentissage supervisé, agent, robustesse) complétés.
- Animation du module 4 : plantage introduit pendant la mise au format français des nombres, détecté par le contrôle de toutes les étapes et corrigé.
- Légendes tronquées ou recouvertes, décimales au format anglais, « ARRET » sans accent.

### Ajouté

- `tools/verifier_contenu.cjs` : contrôle de la totalité du contenu (structure de chaque leçon, cohérence de chaque question, exécution de chaque animation) et génération des planches `docs/captures/planches`, qui montrent chaque étape de chaque leçon à côté de son commentaire.
- Parcours automatisé : résolution de l'atelier de chacune des 25 leçons, avec un essai refusé puis une construction validée.

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
