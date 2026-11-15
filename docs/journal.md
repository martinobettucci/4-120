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

**Comparer ce qui est comparable.** Le lecteur 3D laissait superposer deux traces issues de cartes différentes : le second robot traversait les murs du premier entrepôt. Le catalogue porte désormais le nom du monde et la liste de comparaison se limite au même entrepôt.

**Un module 0.** Les modules supposaient le vocabulaire acquis. Le panorama installe les 20 notions avant d'entrer dans les algorithmes : une animation courte par notion, calculée en direct quand c'est possible (A*, retour arrière, itération de valeur), et un exercice dont la correction explique le pourquoi.

**Du démonstrateur à la leçon.** Retour reçu sur le module 0 : des animations qui montrent, mais qui n'enseignent pas à quelqu'un qui découvre le sujet. Le diagnostic est juste. Une boucle d'animation suppose que l'on sait déjà quoi regarder. Après lecture des cadres de conception pédagogique (Merrill, Gagné, Mayer, charge cognitive, récupération en mémoire), chaque notion est devenue une leçon en six temps. Trois changements pèsent plus que les autres : l'animation s'arrête à chaque étape et dit où regarder, un exemple chiffré est résolu pas à pas avec les mêmes nombres que l'animation, et chaque réponse à un exercice reçoit une explication, y compris les mauvaises.

**Faire prédire avant de montrer.** La démonstration ne se lance qu'après une prédiction. L'apprenant qui s'est engagé sur « 90 % » pour le test de panne regarde autrement les 28 alertes dont 9 seulement sont fondées.

**Ce qui reste à valider.** Rien de cela n'a été mesuré sur de vrais apprenants. La première session dira quelles questions sont trop faciles et quelles étapes sont trop longues.

**Savoir exécuter n'est pas savoir concevoir.** Second retour : les exercices vérifiaient que l'apprenant donnait la même réponse que la machine, pas qu'il saurait écrire un système à règles ou une politique. C'est un défaut d'alignement entre objectif et évaluation. Chaque leçon se valide maintenant par une construction, exécutée par le système. L'atelier de règles en donne le ton : un cahier des charges, des règles à écrire, un banc de huit cas dont deux ne passent que si l'ordre de priorité est bon.

**Des ateliers étalonnés.** Un atelier trop facile ne mesure rien. Le recuit a été étalonné par simulation : mal réglé, il finit à 15 à 38 % de la meilleure tournée, bien réglé à 3 à 8 %, et le seuil est à 8 %. Pour la politique, le trajet le plus court longe la zone interdite et tombe à 75 % de réussite avec les déviations, contre 99 % pour le trajet prudent : le seuil de 90 % oblige à raisonner sur les transitions.

**La théorie manquait.** Montrer un mécanisme ne le définit pas. Chaque leçon expose maintenant le modèle, la formule, l'algorithme et les limites. Et le périmètre a été élargi là où le syllabus cite une notion sans ses fondations : on ne peut pas « utiliser un réseau de neurones » sans avoir vu un neurone, ni « apprendre une politique » sans savoir ce qu'est une politique.

**Vérifier tout, pas un échantillon.** J'avais contrôlé à l'œil une seule leçon et rapporté le reste comme « non vérifié ». Remarque reçue, à juste titre : une vérification porte sur la totalité. Le contrôle complet (une planche par leçon, chaque étape à côté de son commentaire, tous les nombres recalculés, tous les ateliers résolus) a relevé une quinzaine de défauts qu'aucun test automatique ne signalait, dont trois sérieux : une courbe de coût tracée à l'envers, un scénario de localisation qui ne démontrait pas ce que son texte affirmait, et une animation en avance sur son commentaire. Un test qui passe prouve que la page s'affiche, pas qu'elle dit vrai. L'outil `tools/verifier_contenu.cjs` et ses planches rendent ce contrôle reproductible sur l'ensemble des leçons.

**Une correction peut casser.** La mise au format français des nombres, faite par remplacement automatique, a fait planter l'animation du module 4. C'est le passage en revue de toutes les étapes de toutes les animations qui l'a révélé, pas le remplacement lui-même. Toute modification en série est suivie du contrôle complet.

**Du robot seul au système d'agents.** Le syllabus était un point de départ, pas une limite. Le support de l'autrice sur les systèmes agentiques a été ajouté au programme, sans rien retirer de l'existant, sous la forme d'un module 7 : 14 leçons, leurs ateliers et un septième notebook. Le fond du support est repris, la forme est refaite : là où le support affirme qu'un vote réduit le risque, la leçon le calcule (2,8 % d'erreurs au lieu de 10 %) et montre le cas où le calcul ne tient plus, quand deux agents se trompent ensemble.

**Vérifier contre la source.** Une première version avait été écrite sans le support sous les yeux. La relecture face au texte a montré des listes amputées (cinq rôles humains au lieu de six, quatre méthodes d'arbitrage au lieu de neuf), des types de mémoire renommés, et des parties entières absentes : fondements, agents non LLM, design patterns, implémentation, évaluation, cas d'usage. Elles ont été ajoutées. La source est maintenant dans le dépôt, `docs/sources/`, pour que la comparaison puisse être refaite.

**Un LLM mesuré, pas supposé.** Le notebook 07 lit les courriers avec un petit modèle ouvert quand il est disponible. Exécuté de bout en bout avec ce modèle, il donne des taux d'erreur de lecture plus élevés que le simulateur réglé par défaut (40 % de fiches avec au moins un champ faux, contre 23 %), et les conclusions tiennent : chaque brique ajoutée fait baisser le coût, et le système final reste sous le coût d'un service entièrement humain.

**De bons robots, ou de bons concepteurs ?** Troisième retour de l'autrice sur les ateliers : plus de la moitié mesuraient encore si l'apprenant sait faire ce qu'une machine ferait. Calculer 19, 49, 68 puis 28 %, ranger sept phrases dans sept rubriques, remettre dix lignes dans l'ordre. Sa question : saurais-je faire les bonnes règles, composer les bonnes dépendances bayésiennes, choisir les bons jeux de données pour un entraînement ? Les vingt et un ateliers concernés ont été remplacés par des ateliers de conception. L'apprenant décide, le système exécute sa décision pour de bon et la confronte à un cahier des charges. Pour le réseau bayésien, il trace les flèches et un test de séparation dit, constat par constat, ce que son graphe prédit. Pour l'apprentissage supervisé, il affecte des lots de données et un classifieur est réellement entraîné : mettre des doublons de l'entraînement dans le test donne 100 % annoncés et bien moins sur le terrain.

**Une aide qui ne court-circuite pas l'effort.** Demande associée : un bouton « Voir la solution », mais seulement après trois échecs, et qui applique la solution au lieu de valider l'atelier. L'apprenant la vérifie comme s'il l'avait saisie, et voit pourquoi elle tient.

**Finir ce qui est commencé.** L'écriture des ateliers avait été répartie entre cinq agents, tous interrompus avant leur compte rendu. Deux groupes n'avaient ni fiches ni recettes de test. Le travail a été repris à partir des fichiers trouvés, sans rien tenir pour acquis : chaque atelier étalonné de nouveau par énumération, rejoué dans un navigateur, relu sur capture. Deux défauts d'affichage ont été corrigés à cette occasion (titres de scènes qui se chevauchaient, ligne de programme coupée).

## Pistes ouvertes

- Mesurer les gains GPU sur la machine de formation et les reporter dans les notebooks.
- Ajouter un mode continu (positions réelles, vitesses) pour un module avancé.
- Exporter les animations en vidéo pour une diffusion hors ligne.
