# Journal de conception

## 14 novembre 2026

**Point de départ.** Dépôt vide, syllabus 4-130 et cahier de consignes fournis. Formation dans deux jours : la priorité va à des supports exécutables et vérifiés plutôt qu'à l'exhaustivité.

**Le contrat d'abord.** Trois familles de supports doivent rester cohérentes. Plutôt que de les aligner à la main, le format de traces a été défini en premier, avec le simulateur. Tout le reste s'y raccroche : les notebooks produisent des traces, la scène 3D les rejoue. Une seule source de vérité pour les comportements.

**Un simulateur volontairement simple.** Grille, quatre actions, lidar à huit rayons. Un apprenant peut lire `monde.py` pendant un TP. Les phénomènes utiles à la formation y sont tous : observation partielle, bruit, glissement, obstacles mobiles, événements imprévus.

**Des échecs choisis.** Chaque architecture devait échouer quelque part de façon lisible. Le cul-de-sac en U piège l'agent réactif. La palette déposée à l'étape 6 désynchronise l'agent délibératif, qui avance à l'estime. L'agent hybride passe les deux. Ces scénarios sont figés par des tests.

**Un face à face imprévu.** L'agent appris par Q-learning restait bloqué devant un chariot : chacun attendait l'autre. La garde réactive préfère maintenant un déplacement libre à l'attente. Ce cas d'interblocage est repris comme famille d'échec dans le module 6.

**GPU : dire vrai.** A*, CP-SAT et le recuit séquentiel ne gagnent rien sur GPU. Les usages retenus sont ceux où le calcul est réellement tensoriel : entraînement, chaînes de recuit parallèles, Q-learning vectorisé, campagnes de milliers de simulations. L'environnement de construction n'a pas de GPU : les notebooks mesurent le débit sur la machine d'exécution au lieu d'afficher un chiffre d'avance.

**Animations dans le navigateur.** Manim était la piste initiale. Une vidéo ne se met pas en pause sur une étape avec ses données, et doit être régénérée à chaque retouche. Les animations sont donc des composants SVG pilotés par un cadre commun (étapes, lecture, clavier), alimentés par les fichiers JSON issus de Python.

**Un bug révélé par le parcours automatisé.** La première image d'une lecture pouvait recevoir un pas de temps négatif (l'horodatage de l'image précède l'appel à l'horloge), ce qui donnait un indice d'étape de -1 et faisait tomber la page. Le parcours Playwright l'a détecté dès le premier lancement. Les pas de temps sont maintenant bornés à zéro.

**Lisibilité de la scène 3D.** Les lignes WebGL font un pixel de large, illisible en projection. Rayons du lidar et trajectoires sont dessinés avec des cylindres fins. Les étiquettes ont été agrandies après examen des captures.

## Pistes ouvertes

- Mesurer les gains GPU sur la machine de formation et les reporter dans les notebooks.
- Ajouter un mode continu (positions réelles, vitesses) pour un module avancé.
- Exporter les animations en vidéo pour une diffusion hors ligne.
