import { baseTableau as b } from './scenes.js';

export const COMPLEMENTS_ROBOTIQUE = {
  agent: [
    b('Observation partielle', 'Un agent décide avec ce qu’il observe ; deux situations différentes peuvent produire la même observation.', ['Situation', 'Observation', 'Ce qui manque'], [
      ['Distinguer le monde et le capteur', 'Un robot voit seulement la case devant lui. Elle est libre. Le couloir peut pourtant être ouvert ou bouché trois cases plus loin.', [['Couloir libre', 'devant libre', 'suite'], ['Mur plus loin', 'devant libre', 'suite']], ['0-1', '1-1'], 'La même observation peut correspondre à plusieurs états réels.'],
      ['Acquérir de l’information', 'Le robot avance prudemment et mesure de nouveau. Le mur peut maintenant entrer dans la portée du capteur. L’information disponible change avec sa position.', [['Après mesure', 'mur détecté', 'détour ?']], ['0-1'], 'Observer de nouveau peut distinguer des situations jusque-là confondues.'],
      ['Évaluer avec les informations disponibles', 'Une décision se juge selon l’objectif et les informations disponibles au moment du choix. Un bon résultat isolé ne prouve pas que l’agent disposait d’une vue complète.', [['But', 'rejoindre', 'destination'], ['Information', 'locale', 'incomplète'], ['Décision', 'prudente', 'à réévaluer']], ['2-1'], 'Rationnel ne signifie ni omniscient ni assuré de réussir.', ['Élément', 'Contenu', 'Portée']],
    ]),
  ],
  lidar: [
    b('Unité de temps et nanoseconde', 'Une nanoseconde est un milliardième de seconde ; une vitesse et une durée doivent employer des unités compatibles.', ['Grandeur', 'En secondes', 'En ns'], [
      ['Lire une très petite durée', 'Une nanoseconde vaut 0,000 000 001 seconde. On utilise cette unité courte pour les temps de trajet de la lumière.', [['Durée', '0,000000001', '1']], ['0-2'], '1 ns = un milliardième de seconde.'],
      ['Exprimer la vitesse dans cette unité', 'Pour ce calcul arrondi, la lumière parcourt environ 300 millions de mètres en une seconde, soit 0,30 mètre en une nanoseconde.', [['Vitesse', '300 M m/s', '0,30 m/ns']], ['0-2'], 'Une même vitesse peut s’exprimer en m/s ou en m/ns.', ['Grandeur', 'Par seconde', 'Par ns']],
      ['Calculer le trajet puis la distance', 'Un écho reçu après 20 ns correspond à 0,30 × 20 = 6 mètres parcourus. Comme il s’agit de l’aller-retour, la cible est à 3 mètres.', [['Durée', '20 ns', ''], ['Trajet total', '6 m', 'aller-retour'], ['Cible', '3 m', 'aller seul']], ['2-1'], 'Distance à la cible ≈ 0,30 × durée en ns / 2, en mètres.', ['Grandeur', 'Valeur', 'Sens']],
    ]),
    b('Direction et couverture du capteur', 'Un rayon mesure dans une direction ; plusieurs directions couvrent davantage d’espace, sans garantir de tout voir.', ['Rayon', 'Direction', 'Mesure'], [
      ['Mesurer dans une direction', 'Le rayon central regarde droit devant. Il rencontre un mur à 3 mètres. Cette distance ne décrit pas ce qui se trouve à gauche ou à droite.', [['Central', '0°', '3 m']], ['0-1'], 'Une distance est liée à une direction de mesure.'],
      ['Balayer plusieurs directions', 'On ajoute un rayon à gauche à −30° et un à droite à +30°. Le capteur produit maintenant trois distances, une par direction.', [['Gauche', '−30°', '2 m'], ['Centre', '0°', '3 m'], ['Droite', '+30°', '4 m']], ['0-1', '2-1'], 'Un balayage associe des angles et des distances.'],
      ['Repérer les limites', 'Un objet fin situé entre deux rayons peut ne pas être rencontré. La portée limite la distance mesurable ; l’espacement angulaire limite la finesse du balayage.', [['Limite', 'Portée', 'distance'], ['Limite', 'Espacement', 'angles']], ['1-2'], 'Portée et résolution angulaire sont deux propriétés différentes.', ['Propriété', 'Nom', 'Limite']],
    ]),
  ],
  etat: [
    b('Dispersion, moyenne et décalage', 'Moyenner peut atténuer des variations aléatoires ; cela ne retire pas un décalage systématique du capteur.', ['Lecture', 'Sans décalage', 'Décalage +2'], [
      ['Observer plusieurs mesures', 'Une distance réelle de 10 cm produit ici les lectures 9, 10 et 11 cm. Les mesures varient autour de la même grandeur.', [['1', '9', ''], ['2', '10', ''], ['3', '11', '']], ['0-1', '2-1'], 'La dispersion décrit les variations entre mesures.'],
      ['Calculer la moyenne', 'La somme 9 + 10 + 11 vaut 30. Divisée par trois lectures, elle donne 10 cm. Ce petit exemple illustre la compensation possible du bruit ; elle n’est pas exacte dans chaque échantillon.', [['Somme', '30', ''], ['Moyenne', '10 cm', '']], ['1-1'], 'La moyenne partage le total entre les mesures.'],
      ['Ajouter un biais commun', 'Si le capteur ajoute toujours 2 cm, les mêmes lectures deviennent 11, 12 et 13. La moyenne vaut maintenant 12 cm. Répéter la mesure ne supprime pas ce décalage.', [['1', '9', '11'], ['2', '10', '12'], ['3', '11', '13'], ['Moyenne', '10 cm', '12 cm']], ['3-2'], 'Réduire le bruit ne corrige pas automatiquement le biais.'],
    ]),
  ],
  boucle: [
    b('Période, fréquence et délai', 'La période est le temps entre deux cycles ; la fréquence est leur nombre par seconde ; le délai mesure le temps avant une réaction.', ['Cadence', 'Période', 'Par seconde'], [
      ['Compter les cycles', 'Un contrôleur observe toutes les 0,5 seconde. En une seconde, il peut commencer deux cycles : sa fréquence vaut 2 hertz.', [['Contrôleur A', '0,5 s', '2 Hz']], ['0-2'], 'Fréquence = 1 / période, lorsque les cycles sont réguliers.'],
      ['Observer plus souvent', 'Un second contrôleur observe toutes les 0,1 seconde : dix cycles par seconde. À vitesse égale, le robot parcourt moins de distance entre deux observations.', [['Contrôleur A', '0,5 s', '2 Hz'], ['Contrôleur B', '0,1 s', '10 Hz']], ['1-1'], 'Une période plus courte donne des observations plus rapprochées.'],
      ['Compter le temps de réaction complet', 'Une mesure fréquente ne suffit pas si le calcul attend 0,4 seconde avant de commander le frein. Le délai comprend aussi calcul, transmission et réponse de l’actionneur.', [['Attente mesure', 'jusqu’à 0,1 s', ''], ['Calcul', '0,4 s', ''], ['Action', 'encore à faire', '']], ['1-1'], 'Cadence de mesure et délai de réaction ne sont pas la même chose.', ['Étape', 'Durée', 'Complément']],
    ]),
  ],
  reactif: [
    b('Même observation, mémoire différente', 'Une réaction sans mémoire dépend du présent ; un état interne peut conserver une information issue du passé.', ['Passage', 'Observation', 'Action'], [
      ['Réagir au présent', 'Le robot voit un obstacle devant lui et tourne à gauche. Son contrôleur n’utilise que cette observation.', [['Premier', 'obstacle', 'gauche']], ['0-1'], 'Une règle réactive associe une observation à une action.'],
      ['Retrouver la même situation', 'Après un détour, le robot retrouve la même observation. Sans mémoire et avec la même règle déterministe, il tourne encore à gauche et peut recommencer un cycle.', [['Premier', 'obstacle', 'gauche'], ['Deuxième', 'obstacle', 'gauche']], ['1-2'], 'Le passé ne change pas une règle qui ne le représente pas.'],
      ['Ajouter un état interne', 'Un bit « déjà passé ici » permettrait une autre action au deuxième passage. On a alors ajouté une mémoire ; ce contrôleur n’est plus une réaction fondée seulement sur le capteur courant.', [['Deuxième', 'déjà passé', 'autre choix']], ['0-1'], 'La mémoire est une information supplémentaire utilisée pour décider.', ['Passage', 'Mémoire', 'Action']],
    ]),
  ],
  astar: [
    b('Chemins candidats et estimation restante', 'Un chemin candidat a un coût déjà payé et une estimation de ce qui reste ; une estimation prudente ne dépasse pas le meilleur coût restant.', ['Candidat', 'Déjà payé', 'Restant estimé'], [
      ['Garder plusieurs possibilités', 'Deux chemins partiels rejoignent des lieux différents. A a coûté 2 et B a coûté 4. Le moins cher jusqu’ici n’est pas forcément celui qui finit le moins cher.', [['A', '2', '?'], ['B', '4', '?']], ['0-1', '1-1'], 'Comparer un trajet complet demande aussi de considérer la suite.'],
      ['Estimer la suite', 'On estime encore 7 unités depuis A et 3 depuis B. Les scores sont donc 2 + 7 = 9 pour A et 4 + 3 = 7 pour B. La recherche explore B en premier.', [['A', '2', '7'], ['B', '4', '3']], ['1-2'], 'Score = coût parcouru + estimation restante.'],
      ['Comprendre une estimation admissible', 'Supposons que le meilleur coût réel restant depuis B soit 5. L’estimation 3 est prudente ; une estimation 6 le surestimerait. A* a besoin d’une estimation adaptée et d’une gestion correcte des chemins pour garantir l’optimalité.', [['Prudente', '5', '3'], ['Trop haute', '5', '6']], ['0-2'], 'Admissible : ne pas surestimer le meilleur coût restant.', ['Estimation', 'Coût réel', 'Coût estimé']],
    ]),
  ],
  hybride: [
    b('Échelles de temps et priorité de sécurité', 'Un réflexe rapide et un plan plus lent peuvent fonctionner ensemble si la priorité entre leurs actions est définie.', ['Composant', 'Délai', 'Proposition'], [
      ['Préparer un trajet', 'Le planificateur propose de continuer dans l’allée. Il met 0,5 seconde à recalculer un trajet ; ce délai convient à la préparation, pas à un obstacle imminent.', [['Plan', '0,5 s', 'continuer']], ['0-1'], 'Planifier compare des suites d’actions, avec un certain délai.'],
      ['Réagir à un obstacle', 'Un capteur détecte un obstacle. La couche de sécurité peut proposer un arrêt en 0,02 seconde. Elle ne calcule pas encore le détour.', [['Plan', '0,5 s', 'continuer'], ['Sécurité', '0,02 s', 'arrêter']], ['1-1'], 'Un réflexe traite une urgence avant que le plan soit recalculé.'],
      ['Arbitrer explicitement', 'La règle d’arbitrage donne priorité à l’arrêt. Le robot reste arrêté pendant le nouveau calcul. Deux composants compétents ont besoin d’une règle commune pour commander le même effecteur.', [['Priorité 1', 'sécurité', 'arrêter'], ['Priorité 2', 'nouveau plan', 'attendre']], ['0-2'], 'La priorité de sécurité empêche deux ordres incompatibles d’être exécutés ensemble.', ['Ordre', 'Composant', 'Décision']],
    ]),
  ],
  espace: [
    b('Solution admissible et meilleure solution', 'Les contraintes décident si une solution est autorisée ; le coût classe ensuite les solutions autorisées.', ['Plan', 'Statut', 'Coût'], [
      ['Séparer les deux questions', 'Trois plans sont possibles sur le papier. A coûte 4 mais dépasse la capacité ; B coûte 7 et C coûte 9 sans dépasser la capacité.', [['A', 'non', '4'], ['B', 'oui', '7'], ['C', 'oui', '9']], ['0-1'], 'Un bon coût ne rend pas une solution admissible.'],
      ['Écarter ce qui ne respecte pas les contraintes', 'A est exclu, malgré son faible coût. On compare seulement B et C pour le problème formulé.', [['B', 'oui', '7'], ['C', 'oui', '9']], ['0-1', '1-1'], 'La faisabilité précède le classement par le coût.'],
      ['Comparer dans le bon ensemble', 'B est le meilleur des deux plans admissibles présentés. Pour le déclarer optimal dans tout le problème, il faudrait avoir écarté ou comparé tous les autres candidats pertinents.', [['B', 'retenu', '7'], ['C', 'plus coûteux', '9']], ['0-2'], 'Meilleur parmi les plans examinés ne prouve pas toujours un optimum global.'],
    ]),
  ],
  contraintes: [
    b('Affectation et propagation', 'Affecter fixe une valeur à une variable ; propager retire les valeurs devenues incompatibles dans les autres domaines.', ['Variable', 'Domaine', 'Condition'], [
      ['Lister les choix encore ouverts', 'Deux ateliers A et B doivent avoir des créneaux différents. Au départ, chacun peut commencer à 9 h ou à 10 h.', [['A', '{9, 10}', 'A ≠ B'], ['B', '{9, 10}', 'A ≠ B']], ['0-1', '1-1'], 'Un domaine contient les valeurs encore possibles.'],
      ['Fixer une valeur', 'On essaie A = 9. C’est une affectation : A n’a désormais qu’une valeur. Pour respecter A ≠ B, 9 ne peut plus rester dans le domaine de B.', [['A', '{9}', 'choisi'], ['B', '{9, 10}', 'à réduire']], ['0-1'], 'Choisir une valeur crée des conséquences pour les autres variables.', ['Variable', 'Domaine', 'Statut']],
      ['Propager sans tout réessayer', 'La propagation retire 9 du domaine de B, qui devient {10}. Si une autre contrainte retirait aussi 10, le domaine serait vide : il faudrait revenir sur un choix.', [['A', '{9}', 'fixé'], ['B', '{10}', 'déduit']], ['1-1'], 'Un domaine vide révèle une impasse ; un domaine réduit guide la suite.', ['Variable', 'Domaine', 'Statut']],
    ]),
  ],
  recuit: [
    b('Probabilité d’accepter et tirage', 'Accepter avec une probabilité donnée consiste à comparer un nombre aléatoire à un seuil ; cela ne veut pas dire accepter à coup sûr.', ['Essai', 'Nombre tiré', 'Accepter ?'], [
      ['Distinguer amélioration et dégradation', 'Un voisin augmente ici le coût de 2. On décide de l’accepter avec une probabilité d’environ 37 %, par exemple exp(−2 / 2). Cette chance est le seuil du tirage.', [['Voisin', 'coût +2', 'seuil 0,37']], ['0-2'], 'Le recuit peut autoriser une dégradation, selon une probabilité.', ['Voisin', 'Écart', 'Probabilité']],
      ['Tirer un nombre entre zéro et un', 'Le premier nombre uniforme tiré vaut 0,20. Il est inférieur à 0,37 : on accepte ce voisin. La dégradation reste de 2, mais le test probabiliste est favorable.', [['1', '0,20', 'oui']], ['0-2'], 'Nombre tiré < probabilité : accepter.'],
      ['Observer une autre issue possible', 'Avec le même voisin et la même température, un tirage de 0,80 donnerait un refus. En refroidissant, le seuil baisse : les dégradations deviennent moins souvent acceptées.', [['1', '0,20', 'oui'], ['2', '0,80', 'non']], ['1-2'], 'La température règle le seuil ; le tirage décide l’issue de cet essai.'],
    ]),
  ],
  croyance: [
    b('Vraisemblance et normalisation', 'Une observation donne un poids à chaque hypothèse ; normaliser transforme ces poids en probabilités qui totalisent 100 %.', ['Position', 'Avant', 'P(indice)'], [
      ['Pondérer les hypothèses', 'Le robot hésite entre A et B avec 50 % pour chacune. L’indice observé apparaît dans 80 % des cas en A, mais dans 20 % des cas en B.', [['A', '0,5', '0,8'], ['B', '0,5', '0,2']], ['0-2', '1-2'], 'La vraisemblance mesure combien l’indice est attendu sous une hypothèse.'],
      ['Calculer les poids compatibles', 'On multiplie chaque probabilité initiale par la vraisemblance de l’indice : A reçoit 0,5 × 0,8 = 0,4 et B reçoit 0,5 × 0,2 = 0,1.', [['A', '0,5 × 0,8', 'poids 0,4'], ['B', '0,5 × 0,2', 'poids 0,1']], ['0-1'], 'Ces poids ne totalisent que 0,5 : ce ne sont pas encore les probabilités finales.', ['Position', 'Calcul', 'Poids']],
      ['Ramener le total à un', 'Le total des poids vaut 0,5. On divise chaque poids par ce total : A vaut 0,8 et B vaut 0,2. Les probabilités finales font bien 100 %.', [['A', '0,4 / 0,5', '80 %'], ['B', '0,1 / 0,5', '20 %']], ['1-2'], 'Normaliser : diviser chaque poids par la somme des poids.', ['Position', 'Calcul', 'Probabilité']],
    ]),
  ],
  mdp: [
    b('État suffisant pour prévoir la suite', 'L’état doit contenir les informations nécessaires pour prévoir la transition après une action ; une position seule peut ne pas suffire.', ['Description', 'Action', 'Suite'], [
      ['Essayer une description trop pauvre', 'Deux robots sont dans la même case et reçoivent « avancer ». L’un a de la batterie, l’autre non. La position seule ne permet pas de décrire leur transition de la même façon.', [['Même case', 'avancer', '?']], ['0-0'], 'Un état mal choisi peut cacher une information qui change l’issue.'],
      ['Ajouter l’information manquante', 'On décrit maintenant l’état par la position et la batterie. Dans ce modèle simplifié, le robot chargé avance et le robot vide reste sur place.', [['Case + chargé', 'avancer', 'case suivante'], ['Case + vide', 'avancer', 'immobile']], ['1-0'], 'L’état est une représentation de la situation utile pour prévoir.'],
      ['Énoncer l’hypothèse markovienne', 'On suppose qu’avec cet état et l’action, le passé n’apporte plus d’information nécessaire pour la distribution de l’état suivant. Si la température cachée influence aussi la transition, cette représentation doit être enrichie.', [['État actuel', '+ action', 'prévoir suite'], ['Passé', 'si état suffit', 'non requis']], ['0-2'], 'L’hypothèse de Markov porte sur la qualité de la représentation de l’état.', ['Information', 'Condition', 'Usage']],
    ]),
    b('Récompenses futures et actualisation', 'Une valeur additionne les récompenses immédiates et futures ; un facteur entre zéro et un réduit le poids des récompenses éloignées.', ['Moment', 'Récompense', 'Poids'], [
      ['Suivre une suite de récompenses', 'Une action ne rapporte rien immédiatement, puis 10 au pas suivant. Une autre rapporte 6 immédiatement et rien ensuite. Il faut choisir comment comparer les deux moments.', [['Maintenant', '0 ou 6', '1'], ['Pas suivant', '10 ou 0', '?']], ['1-1'], 'La récompense immédiate ne résume pas toute une trajectoire.'],
      ['Appliquer le facteur futur', 'Avec gamma = 0,5, les 10 du pas suivant contribuent pour 5 aujourd’hui. La première trajectoire vaut 0 + 0,5 × 10 = 5 ; la seconde vaut 6.', [['Trajet A', '0 + 0,5 × 10', '5'], ['Trajet B', '6 + 0,5 × 0', '6']], ['0-2'], 'Actualiser : donner moins de poids à une récompense plus lointaine.', ['Trajectoire', 'Calcul', 'Valeur']],
      ['Changer l’horizon valorisé', 'Avec gamma = 0,9, la première trajectoire vaut 9 et dépasse 6. Le facteur futur change donc le compromis entre gain immédiat et gain différé.', [['Trajet A', '0 + 0,9 × 10', '9'], ['Trajet B', '6 + 0,9 × 0', '6']], ['1-2'], 'Le facteur d’actualisation participe à l’objectif du modèle.', ['Trajectoire', 'Calcul', 'Valeur']],
    ]),
  ],
  qlearning: [
    b('Estimation, cible et correction partielle', 'Une nouvelle expérience propose une cible ; le taux d’apprentissage fixe la part de l’écart utilisée pour corriger l’estimation.', ['Élément', 'Valeur', 'Rôle'], [
      ['Distinguer estimation et cible', 'La valeur estimée d’une action vaut 2. Une expérience donne une cible de 6, construite à partir de la récompense et de la suite estimée. La cible n’est pas une vérité définitive.', [['Estimation', '2', 'avant'], ['Cible', '6', 'expérience']], ['1-1'], 'Une expérience fournit un signal pour réviser une estimation.'],
      ['Prendre une partie de l’écart', 'L’écart vaut 6 − 2 = 4. Avec alpha = 0,25, on en prend un quart : la correction vaut 1.', [['Écart', '4', '6 − 2'], ['Correction', '1', '0,25 × 4']], ['1-1'], 'Le taux d’apprentissage règle la confiance accordée à cette correction.'],
      ['Mettre à jour sans tout remplacer', 'La nouvelle estimation vaut 2 + 1 = 3. Avec alpha = 1, on aurait repris la cible 6 entièrement ; avec alpha = 0, on n’aurait rien appris.', [['Avant', '2', ''], ['Ajout', '1', ''], ['Après', '3', '']], ['2-1'], 'Nouvelle valeur = ancienne valeur + alpha × (cible − ancienne valeur).'],
    ]),
  ],
  exploration: [
    b('Hasard uniforme et mélange de choix', 'Dans un tirage uniforme, chaque action a la même chance ; le mélange exploration/exploitation ajoute les chances de chemins qui mènent à la même action.', ['Voie', 'Part', 'Action A'], [
      ['Séparer les deux voies', 'Il existe deux actions A et B ; A a la meilleure estimation. Avec epsilon = 20 %, on explore dans 20 % des choix et on exploite A dans les 80 % restants.', [['Exploiter', '80 %', 'oui'], ['Explorer', '20 %', '?']], ['0-1', '1-1'], 'Epsilon est la part des choix confiés à l’exploration.'],
      ['Répartir la voie aléatoire', 'Lors de l’exploration, on tire uniformément entre A et B. Chacune reçoit la moitié de 20 %, soit 10 % de tous les choix.', [['Explorer A', '10 %', 'oui'], ['Explorer B', '10 %', 'non']], ['1-1'], 'Explorer peut aussi sélectionner la meilleure action connue.'],
      ['Réunir les chemins vers A', 'A reçoit les 80 % d’exploitation et les 10 % d’exploration, soit 90 %. B reçoit 10 %. Ces parts totalisent 100 %.', [['A', '80 % + 10 %', '90 %'], ['B', '10 %', '10 %']], ['0-2'], 'La meilleure action a ici une probabilité supérieure à 1 − epsilon.', ['Action', 'Composition', 'Part totale']],
    ]),
  ],
  confiance: [
    b('Fluctuation entre échantillons', 'Une même population peut produire des taux différents dans plusieurs échantillons ; cette fluctuation ne suffit pas à prouver un changement du système.', ['Échantillon', 'Succès', 'Taux'], [
      ['Mesurer une première fois', 'On observe dix essais et huit réussites, soit 80 %. C’est le taux de cet échantillon, pas une propriété connue exactement de tous les essais possibles.', [['A', '8 / 10', '80 %']], ['0-2'], 'Le taux observé est une estimation à partir de cas limités.'],
      ['Recommencer dans les mêmes conditions', 'Un deuxième échantillon de dix essais contient sept réussites, soit 70 %. Ce changement peut venir du hasard d’échantillonnage, même si le taux de réussite réel reste stable.', [['A', '8 / 10', '80 %'], ['B', '7 / 10', '70 %']], ['1-2'], 'Deux mesures différentes ne prouvent pas à elles seules une évolution.'],
      ['Réunir des essais indépendants', 'En réunissant ces deux groupes indépendants, on compte 15 réussites sur 20, soit 75 %. L’intervalle de confiance décrira l’incertitude liée à l’estimation, sous les hypothèses de la méthode.', [['A + B', '15 / 20', '75 %']], ['0-1'], 'Le nombre d’essais aide à interpréter la précision d’un taux.'],
    ]),
    b('Indépendance et représentativité', 'Davantage de lignes ne corrige ni les répétitions du même cas ni l’absence de certains types de situations.', ['Campagne', 'Contenu', 'Limite'], [
      ['Repérer les répétitions', 'Cent mesures prises sur une seule tournée peuvent partager la même météo et la même machine. Elles ne valent pas automatiquement cent tournées indépendantes.', [['100 mesures', '1 tournée', 'liées']], ['0-1'], 'Des observations liées peuvent apporter moins d’information que leur nombre ne le suggère.'],
      ['Chercher les cas absents', 'Une campagne de jour ne décrit pas à elle seule les performances de nuit. Même un très grand nombre de mesures diurnes ne remplit pas ce manque.', [['Jour', '100 tournées', 'observé'], ['Nuit', '0 tournée', 'absent']], ['1-1'], 'La précision dans un groupe ne garantit pas sa représentativité.'],
      ['Adapter la collecte', 'Pour une utilisation jour et nuit, on échantillonne les deux contextes et on conserve l’identité des tournées. La méthode d’incertitude doit ensuite tenir compte des dépendances restantes.', [['Jour / nuit', 'deux groupes', 'couverts'], ['Tournée', 'identifiée', 'à considérer']], ['1-2'], 'Un intervalle étroit ne corrige pas un échantillon biaisé.'],
    ]),
  ],
  robustesse: [
    b('Facteurs de test et domaine couvert', 'Un facteur est une condition que l’on fait varier ; les combinaisons effectivement testées définissent le domaine sur lequel on dispose de preuves.', ['Lumière', 'Sol', 'Testé ?'], [
      ['Nommer les facteurs', 'On veut tester un robot avec lumière forte ou faible et sol sec ou humide. Cela fait deux facteurs, chacun à deux niveaux.', [['Forte', 'Sec', '?'], ['Forte', 'Humide', '?'], ['Faible', 'Sec', '?'], ['Faible', 'Humide', '?']], ['0-0', '0-1'], 'Les facteurs décrivent les conditions de l’expérience.'],
      ['Croiser leurs niveaux', 'Deux niveaux de lumière × deux états du sol donnent quatre combinaisons. Tester seulement forte/sec et faible/humide ne permet pas de séparer l’effet de la lumière de celui du sol.', [['Forte', 'Sec', 'oui'], ['Forte', 'Humide', 'non'], ['Faible', 'Sec', 'non'], ['Faible', 'Humide', 'oui']], ['1-2', '2-2'], 'Un plan de test rend visibles les combinaisons manquantes.'],
      ['Limiter la conclusion', 'Après avoir testé les quatre combinaisons, on peut comparer ces conditions précises. La présence de poussière ou d’une pente reste hors de cette campagne.', [['4 combinaisons', 'lumière / sol', 'couvertes'], ['Poussière', 'non prévue', 'inconnue']], ['1-2'], 'La robustesse démontrée dépend du domaine réellement testé.', ['Ensemble', 'Contenu', 'Couverture']],
    ]),
  ],
  graine: [
    b('Suite pseudo-aléatoire et ordre des appels', 'Une graine initialise une suite déterministe ; pour retrouver le même scénario, les tirages doivent aussi être utilisés dans le même ordre.', ['Tirage', 'Nombre', 'Usage'], [
      ['Suivre une suite fixée', 'Un générateur de démonstration produit successivement 0,2 puis 0,8 avec une graine donnée. Le premier tirage règle un obstacle, le second une perturbation.', [['1', '0,2', 'obstacle'], ['2', '0,8', 'perturbation']], ['0-1'], 'La graine détermine une suite pour un générateur donné.'],
      ['Rejouer à l’identique', 'Avec le même générateur, la même graine et le même ordre d’appels, l’obstacle reprend 0,2 et la perturbation 0,8. Ce sont les mêmes nombres affectés aux mêmes usages.', [['1', '0,2', 'obstacle'], ['2', '0,8', 'perturbation']], ['1-1'], 'Rejouer demande aussi de conserver la façon de consommer les tirages.'],
      ['Insérer un appel supplémentaire', 'Si une nouvelle fonction consomme le premier tirage, l’obstacle reçoit désormais 0,8. La graine n’a pas changé, mais le scénario a changé car l’ordre d’usage a changé.', [['1', '0,2', 'nouvel appel'], ['2', '0,8', 'obstacle']], ['1-2'], 'Même graine ne signifie pas même scénario après une modification du programme.'],
    ]),
  ],
};
