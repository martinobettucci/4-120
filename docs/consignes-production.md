# Consignes de production pédagogique

**ASCENT 4-130, Les agents autonomes et aide à la décision**

## 1. Objectif

Concevoir une expérience pédagogique de 12 heures sur deux jours, fidèle au syllabus officiel 4-130. La formation articule :

1. des présentations techniques animées en motion design ;
2. des visualisations 3D interactives et décomposables ;
3. des notebooks Python exécutables, compatibles GPU ;
4. des simulations d'agents et d'environnements dynamiques ;
5. des travaux pratiques avec paramètres modifiables ;
6. des comparaisons expérimentales et des mesures de performance.

L'approche est démonstrative, interactive, reproductible et techniquement rigoureuse.

## 2. Principe narratif

Un même scénario de référence sert sur les deux jours : un robot autonome évoluant dans un environnement logistique simulé. Il doit observer son environnement, identifier les obstacles, estimer son état et les incertitudes, choisir ses actions, planifier ses déplacements, optimiser son parcours, réagir à des événements imprévus et mesurer sa performance.

Ce scénario évolue à mesure que les apprenants découvrent les concepts. Les cas du diagnostic médical et des systèmes de recommandation, mentionnés dans le syllabus, sont traités comme exemples de comparaison des approches décisionnelles (module 1).

## 3. Structure de chaque module

Chaque module du syllabus dure 2 heures.

| Phase | Durée | Contenu |
| --- | --- | --- |
| Explications | 45 minutes | Motion design, démonstrations 3D, commentaires techniques |
| Travaux pratiques | 75 minutes | Notebooks, simulations, modification des paramètres, analyse des résultats |

Pour six modules : 4 h 30 de théorie et de démonstrations, 7 h 30 de travaux pratiques, soit 62,5 % de pratique. Le minimum contractuel de 60 % est respecté.

Chaque module suit le même cycle : problème, animation explicative, décomposition visuelle 3D, algorithme et code Python, exécution en notebook, simulation, modification des paramètres, observation des résultats, synthèse.

## 3 bis. Module 0, les fondamentaux pas à pas

Un prélude, hors des 12 heures du syllabus, enseigne à un public qui les découvre les notions de la formation et celles qui les rendent compréhensibles : 39 leçons, dont 5 au-delà du syllabus et 14 pour le module 7. Chaque leçon s'ouvre sur la notion en bref (deux paragraphes de définition et des liens Wikipédia), puis suit six temps : situer, prédire, observer une démonstration commentée, étudier le cours (théorie et exemple résolu), construire, retenir. Une leçon se valide par un atelier où l'apprenant conçoit l'objet étudié (base de règles, neurone, modèle de contraintes, politique, récompenses, réseau de dépendances, jeux de données d'entraînement, boucle d'un agent, plan de test) et où le système exécute sa conception puis la confronte à un cahier des charges. Aucun atelier ne demande de recopier un calcul, de ranger des éléments dans des rubriques ou de remettre des lignes en ordre. Après trois vérifications infructueuses, un bouton « Voir la solution » applique une conception correcte, que l'apprenant vérifie lui-même ; la vérification réussie affiche alors la raison de chaque ligne de la solution. Les principes appliqués et leurs sources sont décrits dans `docs/pedagogie.md`.

## 3 ter. Module 7, les systèmes agentiques

Un prolongement, ajouté au programme sans rien en retirer, reprend le support de l'autrice « Systèmes agentiques : une exploration approfondie » (`docs/sources/`). Il en garde la structure et le vocabulaire : familles d'agents, diffusion de la complexité, diffusion du risque, routage, arbitrage, modération, niveaux d'autonomie de 0 à 5, design patterns. Le contenu est refait au format du site : 14 leçons en six temps, chacune avec son cours, son exemple résolu et son atelier de construction, une animation de module, et le notebook 07. Le fil rouge est le traitement d'un dossier, à côté du robot d'entrepôt. Dans le notebook, la lecture du courrier est confiée à un petit modèle de langage ouvert (`Qwen/Qwen3.5-0.8B`) quand il est disponible, notamment sur Colab, et à un extracteur simulé, annoncé comme tel, dans les autres cas.

## 4. Jour 1, agents et décision

**Module 1, Solutions IA pour la décision.** Motion design : une décision prise par un système de règles, la circulation des probabilités dans un réseau bayésien, le fonctionnement d'un modèle supervisé, la comparaison des trois approches sur un même problème. Notebook 01 : système à règles, inférence bayésienne, petit modèle supervisé, modification des données d'entrée, visualisation des décisions, probabilités et erreurs, comparaison des résultats.

**Module 2, Interactions agent et environnement.** Motion design : la boucle perception, décision, action, puis capteurs, observations, décisions et effecteurs, enfin la différence entre état réel et état observé. Scène 3D : le robot dans son environnement, ses capteurs isolés, leurs champs de perception, les obstacles et le cycle complet d'une action. Notebook 02 : environnement simulé, agent simple, observations et actions, exécution étape par étape, modification des obstacles, trajectoires.

**Module 3, Architectures d'agents intelligents.** Motion design : architectures réactive, délibérative et hybride, comparaison des flux de traitement. Scène 3D : le même robot contrôlé successivement par les trois architectures, décisions et trajectoires. Notebook 03 : trois contrôleurs simples, mêmes scénarios, comparaison des trajectoires, délais, collisions et réussite, variation de la complexité, limites de chaque architecture.

## 5. Jour 2, optimisation et autonomie

**Module 4, Optimisation des décisions.** Motion design : espace de recherche, contraintes, fonctionnement du recuit simulé, recherche progressive d'une meilleure solution, évolution des scores. Notebook 04 : problème d'optimisation, programmation sous contraintes, recuit simulé, variation de la température, des itérations et des contraintes, convergence, comparaison de la qualité et du temps de calcul.

**Module 5, Autonomie robotique.** Motion design : incertitudes de perception, stratégies de correction, usage d'un modèle appris. Scène 3D : capteurs et effecteurs isolés, obstacle imprévu, pause, explication de chaque nouvelle décision, reprise. Notebook 05 : robot simulé, politique de navigation, obstacles dynamiques, bruit des capteurs, politique simple contre politique améliorée, conséquences sur la navigation.

**Module 6, Tests et validation.** Motion design : robustesse, validation d'un comportement autonome, principaux scénarios d'échec. Scène 3D : plusieurs scénarios de test, perturbations variables, rejeu des erreurs étape par étape, comparaison avant et après correction. Notebook 06 : campagne de simulations, taux de réussite, collisions, temps de décision, longueur des trajectoires, niveaux de perturbation, distribution des performances, rapport de validation.

## 6. Exigences des notebooks

Tous les notebooks :

- sont des fichiers Jupyter `.ipynb` qui fonctionnent du début à la fin ;
- détectent le GPU, utilisent CUDA lorsque le calcul s'y prête et gardent une alternative CPU fonctionnelle ;
- documentent leurs dépendances et leurs versions ;
- fixent les graines aléatoires pour des démonstrations reproductibles ;
- proposent des paramètres facilement modifiables et des visualisations interprétables ;
- séparent explications, code et exercices ;
- embarquent des résultats pré-calculés comme solution de repli.

Le GPU accélère les calculs qui s'y prêtent réellement : traitements tensoriels, inférences, apprentissage et simulations parallèles. Les algorithmes séquentiels (A*, CP-SAT, recuit simple) restent sur CPU, et les notebooks le disent.

## 7. Consignes de motion design

Les animations sont scientifiques et non décoratives. Chacune illustre un seul mécanisme principal, introduit les éléments progressivement, affiche les flux d'informations, distingue observations, décisions et actions, permet de s'arrêter sur les étapes importantes, présente des légendes lisibles et peut être commentée en direct. Les segments sont courts, de 30 à 90 secondes.

## 8. Consignes pour les scènes 3D

Les scènes sont explicatives et explorables : rotation et zoom de la caméra, isolation des composants, vue éclatée de l'architecture fonctionnelle du robot, affichage des capteurs, des plans et des trajectoires, états internes, pause, reprise et lecture étape par étape, retour à l'état initial, comparaison de deux exécutions. Elles permettent de comprendre pourquoi le robot prend une décision donnée, pas seulement de le voir bouger.

## 9. Synchronisation des supports

Notebooks, animations et simulations utilisent les mêmes exemples. Une même expérimentation peut être expliquée par une animation, exécutée dans un notebook, visualisée dans la scène 3D, modifiée par les apprenants, puis réexécutée et comparée.

Le format commun de traces (`ascent-4130-trace/1`) contient, pour chaque étape : le numéro d'étape, l'état de l'environnement, les observations, la décision de l'agent, l'action exécutée, le résultat et les métriques de performance. Une trace exportée depuis un notebook se rejoue dans l'atelier 3D du site.

## 10. Validation

Avant utilisation en formation, vérifier : l'exécution intégrale des notebooks, la compatibilité GPU et CPU, la stabilité des simulations, la reproductibilité des démonstrations, le fonctionnement des commandes 3D, la cohérence entre animations et algorithmes, l'exécution des supports sans dépendance réseau non maîtrisée, le respect des 12 heures et du minimum de 60 % de travaux pratiques, l'absence de données réelles sensibles, la conformité aux six modules du syllabus 4-130.

## 11. Technologies retenues

| Composant | Technologie | Fonction |
| --- | --- | --- |
| Notebooks | JupyterLab, PyTorch, CUDA avec repli CPU | Exécution des algorithmes, accélération tensorielle |
| Optimisation | OR-Tools (CP-SAT), recuit simulé écrit en Python et en PyTorch | Programmation sous contraintes, recuit simulé |
| Simulation | Simulateur d'entrepôt du paquet `ascent_agents`, version par lots en PyTorch | Environnements reproductibles, milliers de simulations parallèles |
| Motion design | Animations SVG programmées en React, pilotables étape par étape | Algorithmes, probabilités, architectures |
| Scènes 3D | Three.js (WebGL) | Exploration dans le navigateur, décomposition étape par étape |
| Graphiques | Matplotlib dans les notebooks, SVG sur le site | Métriques et distributions |
| Publication | Vite, GitHub Actions, GitHub Pages | Site statique, notebooks rendus en HTML |

Deux écarts assumés par rapport aux pistes initiales : les animations sont programmées dans le navigateur plutôt que rendues en vidéo avec Manim, afin de pouvoir être mises en pause, parcourues et alimentées par les données des notebooks ; le simulateur maison remplace NVIDIA Isaac Lab, dont l'environnement technique dédié ne s'installe pas sur un poste de formation standard ni sur un notebook hébergé.
