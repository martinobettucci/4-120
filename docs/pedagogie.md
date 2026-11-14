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

## 3. Application dans le dépôt

### Une leçon du module 0 : six temps

Chaque notion est une page, structurée de la même façon. Les données sont dans `web/src/lecons/notions.js`, le déroulé dans `web/src/pages/Lecon.jsx`.

| Temps | Contenu | Principes appliqués |
| --- | --- | --- |
| 1. Situer | Situation concrète, objectif formulé en « vous saurez… », vocabulaire défini, rappel d'une leçon antérieure | Problème (Merrill), attention, objectif et rappel (Gagné), pré-apprentissage (Mayer), récupération espacée |
| 2. Prédire | Une question à laquelle l'apprenant répond avant de voir | Prédire, observer, expliquer |
| 3. Observer | Animation découpée en étapes qui s'arrêtent, commentaire à côté de l'image, consigne « Regardez : … » | Démonstration (Merrill), segmentation, signalement, contiguïté (Mayer) |
| 4. Comprendre | Retour sur la prédiction, exemple chiffré révélé pas à pas, erreur fréquente nommée | Exemple résolu, guidage (Gagné) |
| 5. S'exercer | Une question d'application avec indice, une question de transfert dans un autre domaine, explication pour chaque réponse | Application et retour (Merrill, Gagné), retour explicatif, guidage dégressif |
| 6. Retenir | L'idée en une phrase, autres domaines d'usage, renvoi vers le module et le notebook | Intégration (Merrill), rétention et transfert (Gagné) |

Choix de conception :

- **L'animation ne tourne plus en boucle.** Elle joue une étape, s'arrête, et attend l'apprenant.
- **Les chiffres de l'animation sont ceux de l'exemple résolu.** L'apprenant peut refaire le calcul et retrouver ce qu'il a vu.
- **La démonstration attend une prédiction**, et la suite attend que toutes les étapes aient été vues. Les six temps restent accessibles par leurs onglets : le guidage oriente sans enfermer.
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

- Les questions à choix vérifient la compréhension, pas la capacité à produire. La production est évaluée dans les notebooks.
- Aucune mesure d'efficacité n'a été faite sur de vrais apprenants. Les retours de la première session serviront à ajuster les leçons : questions trop faciles, étapes trop longues, vocabulaire manquant.
- La narration est écrite. Mayer recommande la voix pour accompagner une animation (principe de modalité) : c'est le rôle du formateur en salle, et une piste d'évolution pour l'usage en autonomie.
