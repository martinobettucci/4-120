# Démarche pédagogique

**ASCENT 4-130, Les agents autonomes et aide à la décision**

## 1. Le constat

La première version du site montrait des algorithmes en mouvement. Une animation qui tourne démontre qu'un mécanisme existe, elle n'apprend pas à s'en servir. Un apprenant qui découvre le sujet a besoin de savoir ce qu'il doit regarder, pourquoi, avec quels mots, et de vérifier qu'il a compris. Ce document décrit les méthodes retenues pour passer du démonstrateur à la leçon, et la façon dont chacune est appliquée dans le dépôt.

## 2. Les cadres de référence

### Principes d'instruction de Merrill

M. David Merrill (« First Principles of Instruction », Educational Technology Research and Development, 2002) dégage cinq principes communs aux méthodes efficaces : partir d'un problème réel, activer les connaissances existantes, démontrer, faire appliquer avec un retour, puis faire intégrer dans d'autres contextes.

https://edutechwiki.unige.ch/en/First_principles_of_instruction

### Les neuf événements de Gagné

Robert Gagné (« The Conditions of Learning », 1965) décrit une séquence : capter l'attention, annoncer l'objectif, rappeler les acquis, présenter le contenu, guider, faire pratiquer, donner un retour, évaluer, favoriser la rétention et le transfert.

https://www.learningguild.com/articles/gagns-nine-events-of-instruction-offer-a-blueprint-for-elearning-design

### Principes de l'apprentissage multimédia de Mayer

Richard Mayer (« Multimedia Learning », 3e édition, 2020, et « Using multimedia for e-learning », Journal of Computer Assisted Learning, 2017) fonde sur des expériences contrôlées une série de principes de conception. Ceux qui concernent directement des animations sont :

- **segmentation** : découper la leçon en parties que l'apprenant fait avancer lui-même ;
- **signalement** : mettre en évidence ce qu'il faut regarder ;
- **pré-apprentissage** : donner le nom et le sens des notions clés avant la leçon ;
- **contiguïté** : placer le texte à côté de l'image qu'il commente, et au même moment ;
- **cohérence** : retirer ce qui ne sert pas l'objectif.

https://ugc.futurelearn.com/uploads/files/7d/d6/7dd6188d-c343-4311-b064-ac98d2c95abc/Multimedia_Principles._R._E._Mayer__2020.pdf

https://zendy.io/title/10.1111/jcal.12197

### Exemple résolu et guidage dégressif

La théorie de la charge cognitive (John Sweller) établit qu'un débutant apprend mieux en étudiant des exemples résolus qu'en cherchant seul. Le guidage se retire ensuite par étapes : exemple complet, exemple à compléter, problème autonome. Cet avantage disparaît chez l'apprenant avancé, pour qui la pratique directe redevient préférable.

https://en.wikipedia.org/wiki/Worked-example_effect

### Récupération en mémoire et retour explicatif

Retrouver une réponse de mémoire consolide davantage l'apprentissage que relire. La méta-analyse de Pan et Rickard (Psychological Bulletin, 2018) montre que cet effet se transfère à de nouvelles situations, et qu'un retour qui explique (et non un simple « juste » ou « faux ») le renforce.

https://sc-pan.github.io/pdf/PR_2018.pdf

### Prédire, observer, expliquer

Avec une simulation, demander une prédiction avant l'observation fait émerger les idées initiales de l'apprenant et les confronte au résultat. Les études disponibles portent surtout sur l'enseignement des sciences, avec des effectifs modestes : la méthode est prometteuse, sans être aussi solidement établie que les précédentes.

https://link.springer.com/article/10.1007/s10956-013-9482-4

https://www.edutoolbox.org/rasp/838

### Alignement entre objectifs, activités et évaluation

John Biggs (« Enhancing teaching through constructive alignment », Higher Education, 1996) pose une règle simple : l'évaluation doit demander exactement ce que l'objectif annonce. Si l'objectif est « savoir construire un système à règles », demander de prédire la sortie d'un système déjà écrit n'évalue pas cet objectif. La taxonomie de Bloom révisée par Anderson et Krathwohl (2001) aide à situer le niveau visé : se souvenir, comprendre, appliquer, analyser, évaluer, créer. Le syllabus vise le niveau « Application » : les activités doivent donc faire produire, pas seulement reconnaître.

https://en.wikipedia.org/wiki/Constructive_alignment

https://en.wikipedia.org/wiki/Bloom%27s_taxonomy

### Problèmes de Parsons

Pour apprendre à programmer, Dale Parsons et Patricia Haden (2006) proposent de donner les lignes d'un programme dans le désordre et de les faire remettre en ordre. L'apprenant construit la logique du programme sans buter sur la syntaxe. C'est une étape intermédiaire entre lire du code et en écrire.

https://en.wikipedia.org/wiki/Parsons_problems

## 3. Application dans le dépôt

### Une leçon du module 0 : six temps

Chaque notion est une page, structurée de la même façon. Les données sont dans `web/src/lecons/notions.js`, le déroulé dans `web/src/pages/Lecon.jsx`.

| Temps | Contenu | Principes appliqués |
| --- | --- | --- |
| 1. Situer | Situation concrète, objectif formulé en « vous saurez… », vocabulaire défini, rappel d'une leçon antérieure | Problème (Merrill), attention, objectif et rappel (Gagné), pré-apprentissage (Mayer), récupération espacée |
| 2. Prédire | Une question à laquelle l'apprenant répond avant de voir | Prédire, observer, expliquer |
| 3. Observer | Animation découpée en étapes qui s'arrêtent, commentaire à côté de l'image, consigne « Regardez : … » | Démonstration (Merrill), segmentation, signalement, contiguïté (Mayer) |
| 4. Le cours | Retour sur la prédiction, théorie (définition, modèle, formule, algorithme, propriétés, limites), exemple chiffré révélé pas à pas, erreur fréquente | Présentation du contenu et guidage (Gagné), exemple résolu |
| 5. Construire | Atelier où l'apprenant fabrique l'objet étudié, mis à l'épreuve par le système avec un diagnostic. Deux questions rapides en complément | Application (Merrill), alignement objectif et évaluation (Biggs), retour explicatif |
| 6. Retenir | L'idée en une phrase, autres domaines d'usage, renvoi vers le module et le notebook | Intégration (Merrill), rétention et transfert (Gagné) |

### Le cours : la théorie exposée

Voir un mécanisme fonctionner ne dit pas ce qu'il est. Chaque leçon comporte donc un cours en trois ou quatre blocs (`web/src/lecons/cours.js`) : la définition et le modèle, la formule ou l'algorithme en pseudo-code, ce que la méthode garantit, ses limites et son domaine d'emploi. Les formules sont écrites en typographie simple. Le même cours est repris, à déplier, sur la page de chaque module.

### Un périmètre élargi

Le syllabus cite des notions sans toujours nommer ce qu'il faut savoir pour les comprendre. Cinq leçons ont été ajoutées (`web/src/lecons/nouvelles.js`) :

| Leçon ajoutée | Pourquoi |
| --- | --- |
| Décider sous incertitude : le coût espéré | Relie une probabilité (Bayes, réseau, classifieur) à une décision |
| Du neurone au réseau de neurones | Ouvre la « boîte noire » de l'apprentissage supervisé |
| Entraîner : la descente de gradient | Explique ce que signifie « apprendre » pour un modèle |
| Système de recommandation | Étude de cas du syllabus, traitée comme une notion à part entière |
| Processus de décision markovien et politique | Donne le cadre sans lequel le Q-learning reste une recette |

### Les ateliers : évaluer la capacité à construire

Une question à choix sur la sortie d'un système vérifie que l'on sait l'exécuter, comme le ferait la machine. L'objectif est ailleurs : savoir le concevoir. Chaque leçon se valide donc par un atelier de construction (`web/src/ateliers/Ateliers.jsx`), où le système exécute ce que l'apprenant a construit et lui retourne un diagnostic.

| Atelier | Ce que l'apprenant construit | Comment c'est vérifié |
| --- | --- | --- |
| Base de règles | Des règles, leurs seuils et leur ordre, à partir d'un cahier des charges | Exécution sur un banc de 8 cas, avec la règle responsable de chaque réponse |
| Neurone | Deux poids et un biais | Classement de 18 situations, avec le calcul détaillé d'un cas mal classé |
| Taux d'apprentissage | Le réglage d'une descente de gradient | Convergence en 20 pas, avec le diagnostic : trop lent, oscillation, divergence |
| Scénario de test | Un environnement soluble qui met l'agent réactif en défaut | Exécution de l'agent et recherche d'un chemin |
| Modèle de contraintes | Des contraintes traduisant des exigences | Un solveur énumère les solutions et produit un contre-exemple si le modèle est trop permissif ou trop strict |
| Recuit simulé | La température initiale et le refroidissement | Moyenne de 5 recuits comparée à la meilleure tournée connue |
| Politique | Une action pour chaque case | Test sans aléa depuis toutes les cases, puis 400 missions avec déviations |
| Récompenses | Les trois récompenses d'un agent | Calcul de la politique qui en découle et vérification du comportement obtenu |
| Programme | L'ordre des lignes d'un programme (problème de Parsons) | Position de chaque ligne |
| Calcul ou fiche | Un calcul complet, ou la description d'un système | Chaque valeur, avec une indication sur celles qui sont inexactes |

Trois principes ont guidé leur conception. La réussite ne s'obtient pas par élimination : il faut produire quelque chose. L'échec renseigne : chaque essai dit ce qui ne va pas, sans donner la solution. Et plusieurs constructions sont valables : il existe plus d'une base de règles, plus d'une politique, plus d'un réglage corrects.

Choix de conception :

- **L'animation ne tourne plus en boucle.** Elle joue une étape, s'arrête, et attend l'apprenant.
- **Les chiffres de l'animation sont ceux de l'exemple résolu.** L'apprenant peut refaire le calcul et retrouver ce qu'il a vu.
- **La démonstration attend une prédiction**, et la leçon n'est acquise qu'une fois l'atelier réussi. Les six temps restent accessibles par leurs onglets : le guidage oriente sans enfermer.
- **Le rappel de début de leçon** repose une question de l'avant-dernière leçon, pour espacer la récupération.
- **Le mode formateur** affiche les six temps d'un coup, pour la projection en salle.
- **La progression** est conservée dans le navigateur de l'apprenant, sans aucun envoi de données.

### Les modules 1 à 6

Chaque page de module (`web/src/lecons/modules-pedagogie.js`) comporte désormais :

- des **objectifs observables**, formulés avec des verbes d'action cohérents avec le niveau « Application » visé par le syllabus ;
- des **prérequis** qui renvoient vers les leçons du module 0 ;
- une consigne **« Avant de regarder »** qui demande une prédiction avant l'animation ;
- une **mission d'observation** pour la scène 3D : une manipulation à faire, une question, puis une explication à afficher après avoir observé ;
- un **quiz de fin** de trois questions, avec explication de chaque réponse ;
- les **erreurs fréquentes** du module.

### Les notebooks

`tools/pedagogie_notebooks.py` ajoute à chaque notebook, lors de la construction :

- une cellule **« Avant de commencer »** : prérequis reliés aux leçons, et méthode de travail en quatre temps (lire, prédire, exécuter, modifier) ;
- une aide graduée dans les exercices : essai, relecture de l'exemple, puis solution ;
- une cellule **« Auto-évaluation »** : une liste de savoir-faire à cocher, alignée sur les objectifs du module.

### Alignement d'ensemble

Objectifs, activités et évaluation portent sur les mêmes savoir-faire : l'objectif annoncé en tête de leçon est celui que l'exercice vérifie et que la dernière page reformule. La même chaîne relie la leçon (comprendre), le module (analyser un comportement) et le notebook (programmer).

## 4. Limites

- Les ateliers font construire dans un cadre guidé : les variables, les formes de règles ou les lignes de code sont fournies. Écrire un programme entier à partir d'une page blanche reste l'objet des notebooks.
- Aucune mesure d'efficacité n'a été faite sur de vrais apprenants. Les retours de la première session serviront à ajuster les leçons : questions trop faciles, étapes trop longues, vocabulaire manquant.
- La narration est écrite. Mayer recommande la voix pour accompagner une animation (principe de modalité) : c'est le rôle du formateur en salle, et une piste d'évolution pour l'usage en autonomie.
