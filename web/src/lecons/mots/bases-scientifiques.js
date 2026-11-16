import { pas, tableau, barres, jetons, grille, scene, carte, rond, trait, texte } from './scenes.js';

const b = (nom, definition, etapes) => [{ nom, definition, etapes }];
const tab = (entetes, lignes, actifs, bilan) => tableau(entetes, lignes, actifs, bilan);
const compte = (n, groupe, phase, bilan) => jetons(n, Array.from({ length: n }, (_, i) => groupe.includes(i) ? '✓' : '·'), groupe, phase, bilan);

function graphe(phase) {
  const dessin = (petit) => {
    const xs = petit ? [55, 170, 285] : [100, 320, 540];
    return [
      ...(phase ? [trait('ab', xs[0] + 22, 110, xs[1] - 22, 110, 'bleu'), trait('bc', xs[1] + 22, 110, xs[2] - 22, 110, 'bleu')] : []),
      ...['A', 'B', 'C'].map((n, i) => rond(`sommet-${n}`, xs[i], 110, n, 'bleu', 22)),
      ...(phase ? [texte('cout-ab', (xs[0] + xs[1]) / 2, 80, '2 m', 80), texte('cout-bc', (xs[1] + xs[2]) / 2, 80, '3 m', 80)] : []),
      rond('voyageur', xs[phase === 2 ? 2 : 0], 165, 'R', 'orange', 15),
      texte('lecture', petit ? 170 : 320, 230, ['Trois lieux : les sommets', 'Les liaisons : les arêtes', 'Chemin A → B → C : 2 + 3 = 5 m'][phase], petit ? 310 : 590, 17),
    ];
  };
  return scene(dessin(false), dessin(true), ['Un sommet représente un lieu ou une situation.', 'Une arête représente un passage possible.', 'Un chemin est une suite d’arêtes ; on additionne leurs coûts.'][phase]);
}

export const BASES_SCIENTIFIQUES = {
  regles: b('Vrai, faux, ET et OU', 'Une condition est une question à réponse oui/non ; ET exige les deux conditions, OU en exige au moins une.', [
    pas('Transformer une mesure en oui ou non', 'La température vaut 90 °C. La question « dépasse-t-elle 85 °C ? » reçoit la réponse vrai. « Vrai » est une valeur logique, pas une note de fiabilité.', tab(['Mesure', 'Question', 'Réponse'], [['90 °C', '> 85 °C ?', 'vrai']], ['0-2'], '90 > 85 : la condition est vraie.')),
    pas('Comprendre ET', 'On demande maintenant « trop chaud ET batterie faible ». Il fait trop chaud, mais la batterie n’est pas faible. Les deux conditions ne sont pas réunies : ET donne faux.', tab(['Chaud ?', 'Faible ?', 'Avec ET'], [['vrai', 'faux', 'faux'], ['vrai', 'vrai', 'vrai']], ['0-2'], 'Avec ET, il faut deux oui.')),
    pas('Comprendre OU', 'Pour « trop chaud OU batterie faible », un seul oui suffit. Avec chaud = vrai et faible = faux, OU donne vrai. C’est la différence entre exiger les deux et accepter l’un des deux.', tab(['Chaud ?', 'Faible ?', 'Avec OU'], [['vrai', 'faux', 'vrai'], ['faux', 'faux', 'faux']], ['0-0', '0-2'], 'Avec OU, au moins un oui suffit, y compris quand les deux sont vrais.')),
  ]),
  reseau: b('Variable et groupe de comparaison', 'Une variable peut changer de valeur ; une probabilité conditionnelle se calcule dans le groupe défini par une information connue.', [
    pas('Nommer ce qui peut varier', 'Le sol peut être sec ou humide. Le robot peut patiner ou ne pas patiner. Ce sont deux variables différentes ; connaître l’une ne donne pas automatiquement l’autre.', tab(['Essai', 'Sol', 'Patine ?'], [['1', 'sec', 'non'], ['2', 'humide', 'oui']], ['0-1', '1-1'], 'Deux variables : état du sol et présence de patinage.')),
    pas('Regarder seulement un groupe', 'Sur dix passages sur sol sec, deux ont patiné. En ne regardant que ces dix passages, la proportion est 2 sur 10, soit 20 %.', tab(['Groupe', 'Passages', 'Patinages'], [['Sol sec', '10', '2'], ['Sol humide', '10', '6']], ['0-1', '0-2'], 'Patiner sachant sol sec : 2 / 10 = 20 %.')),
    pas('Changer l’information connue', 'Sur les dix passages sur sol humide, six ont patiné : 60 %. Le groupe choisi change la probabilité. Ce constat décrit un lien ; à lui seul, il ne prouve pas une cause.', tab(['Groupe', 'Passages', 'Patinages'], [['Sol sec', '10', '2'], ['Sol humide', '10', '6']], ['1-1', '1-2'], '« Sachant » veut dire : dans le groupe qui vérifie cette information.')),
  ]),
  utilite: b('Moyenne et poids des cas', 'Une moyenne partage un total entre les cas ; un cas fréquent pèse davantage qu’un cas rare.', [
    pas('Ne pas compter seulement les valeurs différentes', 'Sur dix tournées, neuf ne coûtent rien et une coûte 100 €. Les deux montants existent, mais ils n’arrivent pas aussi souvent.', tab(['Coût', 'Nombre', 'Sous-total'], [['0 €', '9', '0 €'], ['100 €', '1', '100 €']], ['0-1', '1-1'], 'Neuf cas à zéro et un seul cas à cent.')),
    pas('Additionner les contributions', 'Le total est 9 fois 0 € plus 1 fois 100 € : 100 €. Chaque montant contribue autant de fois qu’il apparaît.', barres([['9 × 0 €', 0], ['1 × 100 €', 100, 'orange'], ['Total', 100]], 100, 'Total : 9 × 0 + 1 × 100 = 100 €.', ' €')),
    pas('Partager entre les dix cas', 'On répartit ce total sur dix tournées : 100 € divisés par 10 donnent 10 € par tournée en moyenne. Cela ne signifie pas que chaque tournée coûte 10 €.', barres([['Total des 10 tournées', 100], ['Moyenne par tournée', 10, 'vert']], 100, 'Les fréquences servent de poids : 90 % × 0 + 10 % × 100 = 10 €.', ' €')),
  ]),
  supervise: b('Données, cible et cas nouveaux', 'Les données décrivent un exemple ; la cible est la réponse à apprendre ; les cas de test restent à part pendant cet apprentissage.', [
    pas('Distinguer entrée et réponse', 'Une ligne décrit un moteur par sa température et indique la décision donnée par l’experte. La température entre dans le modèle ; la décision est ce qu’il doit apprendre à prévoir.', tab(['Moteur', 'Entrée', 'Cible'], [['A', '60 °C', 'continuer'], ['B', '90 °C', 'arrêter']], ['0-1', '0-2'], 'Entrée : ce que l’on sait. Cible : ce que l’on veut prédire.')),
    pas('Réserver un exemple', 'On ajoute le moteur C, mais on le réserve au test. Le modèle apprend avec A et B. Pour vérifier qu’il généralise, on ne lui montre pas la réponse de C pendant cet apprentissage.', tab(['Moteur', 'Usage', 'Cible'], [['A', 'apprendre', 'continuer'], ['B', 'apprendre', 'arrêter'], ['C', 'tester', 'cachée']], ['2-1'], 'Le test contient des cas tenus à l’écart de l’apprentissage.')),
    pas('Comparer sur le cas nouveau', 'Après apprentissage, le modèle reçoit les mesures de C et propose « arrêter ». On compare ensuite cette proposition à la réponse experte conservée pour le test.', tab(['Moteur C', 'Modèle', 'Référence'], [['95 °C', 'arrêter', 'arrêter']], ['0-1', '0-2'], 'Réussir les exemples appris ne suffit pas : il faut aussi réussir sur de nouveaux cas.')),
  ]),
  neurone: b('Somme pondérée', 'Chaque entrée est multipliée par son poids, puis les contributions sont additionnées.', [
    pas('Lire deux entrées', 'On reçoit les nombres 2 et 3. Ils représentent deux mesures. Additionner directement donnerait 5, mais on peut choisir de leur donner des importances différentes.', barres([['Entrée A', 2], ['Entrée B', 3]], 12, 'Deux nombres entrent dans le calcul.')),
    pas('Multiplier chaque contribution', 'Le poids de A vaut 3 : sa contribution vaut 2 × 3 = 6. Le poids de B vaut 2 : sa contribution vaut 3 × 2 = 6. Une pondération est une multiplication.', barres([['A : 2 × 3', 6], ['B : 3 × 2', 6]], 12, 'Même contribution ici, obtenue avec des entrées et des poids différents.')),
    pas('Additionner les résultats', 'On additionne les contributions : 6 + 6 = 12. Le neurone pourra ensuite ajouter son biais et transformer ce résultat avec sa fonction d’activation.', barres([['A : 2 × 3', 6], ['B : 3 × 2', 6], ['Somme', 12, 'vert']], 12, 'Somme pondérée = entrée A × poids A + entrée B × poids B.')),
  ]),
  gradient: b('Fonction et variation', 'Une fonction relie un réglage à un résultat ; sa variation indique ce qui change quand on modifie ce réglage.', [
    pas('Associer une entrée à un résultat', 'On choisit un réglage x. Notre petite fonction calcule (x − 3) au carré. Avec x = 1, elle donne 4. Le tableau associe chaque réglage à son résultat.', tab(['Réglage x', 'Calcul', 'Résultat'], [['1', '(1 − 3)²', '4'], ['2', '(2 − 3)²', '1'], ['3', '(3 − 3)²', '0']], ['0-0', '0-2'], 'Une fonction est une règle qui transforme une entrée en résultat.')),
    pas('Faire varier le réglage', 'On passe de x = 1 à x = 2. Le résultat baisse de 4 à 1. Dans cette zone, avancer vers la droite diminue donc la valeur de la fonction.', tab(['Réglage x', 'Calcul', 'Résultat'], [['1', '(1 − 3)²', '4'], ['2', '(2 − 3)²', '1'], ['3', '(3 − 3)²', '0']], ['1-0', '1-2'], 'Variation du résultat : 1 − 4 = −3.')),
    pas('Chercher une petite valeur', 'À x = 3, le résultat vaut zéro. Aucun carré ne peut être négatif : c’est le minimum de cet exemple. Le gradient servira à choisir une direction sans essayer tous les réglages.', tab(['Réglage x', 'Calcul', 'Résultat'], [['1', '(1 − 3)²', '4'], ['2', '(2 − 3)²', '1'], ['3', '(3 − 3)²', '0']], ['2-0', '2-2'], 'Optimiser ici : changer le réglage pour diminuer le résultat.')),
  ]),
  recommandation: b('Lire un tableau à deux entrées', 'Une case est repérée par sa ligne et sa colonne ; une case vide signifie ici qu’aucune note n’a été donnée.', [
    pas('Choisir une ligne', 'Chaque ligne représente une personne. On commence par la ligne d’Ana : elle contient toutes les notes qu’Ana a données.', tab(['Personne', 'Film A', 'Film B'], [['Ana', '5', '?'], ['Sam', '5', '4']], ['0-0'], 'Ligne choisie : Ana.')),
    pas('Choisir une colonne', 'La colonne Film A contient les notes de ce film. À l’intersection de la ligne Ana et de la colonne Film A, on lit 5.', tab(['Personne', 'Film A', 'Film B'], [['Ana', '5', '?'], ['Sam', '5', '4']], ['0-1'], 'Une case = une personne + un film.')),
    pas('Reconnaître une donnée manquante', 'La case Ana / Film B est inconnue. Le point d’interrogation ne signifie ni zéro ni un mauvais avis. La recommandation cherchera à prévoir cette préférence manquante.', tab(['Personne', 'Film A', 'Film B'], [['Ana', '5', '?'], ['Sam', '5', '4']], ['0-2'], 'Inconnu n’est pas égal à zéro.')),
  ]),
  agent: b('But, action et effet', 'Un but décrit ce que l’on veut obtenir ; une action est ce que l’on fait ; l’effet est ce qui change réellement.', [
    pas('Fixer un but', 'Le robot R veut atteindre l’étoile. L’étoile indique le résultat souhaité ; elle ne lui donne pas encore le chemin.', grille([0, 2], [5, 2], [], [], 'But : rejoindre l’étoile.')),
    pas('Choisir une action', 'Le robot commande un pas vers la droite. Il passe dans la case suivante : cette action a changé sa position.', grille([1, 2], [5, 2], [], [[0, 2], [1, 2]], 'Action : avancer d’une case. Effet : une nouvelle position.')),
    pas('Comparer l’effet au but', 'Un autre pas le rapproche, mais il n’a pas encore atteint l’étoile. Un agent doit observer les effets de ses actions pour savoir s’il progresse.', grille([2, 2], [5, 2], [], [[0, 2], [1, 2], [2, 2]], 'Une action réussie n’est pas forcément un objectif déjà atteint.')),
  ]),
  lidar: b('Distance, durée et aller-retour', 'À vitesse constante, la distance parcourue est la vitesse multipliée par la durée ; un aller-retour compte deux trajets.', [
    pas('Relier temps et distance', 'Pour commencer sans la vitesse de la lumière, imaginons un mobile à 2 mètres par seconde. En une seconde, il parcourt 2 mètres.', barres([['Distance en 1 seconde', 2]], 8, 'Distance = vitesse × durée : 2 m/s × 1 s = 2 m.', ' m')),
    pas('Laisser passer deux secondes', 'À la même vitesse, deux secondes donnent 4 mètres. Deux fois plus de temps donne deux fois plus de distance, lorsque la vitesse reste constante.', barres([['Distance en 2 secondes', 4]], 8, '2 m/s × 2 s = 4 m.', ' m')),
    pas('Compter l’aller puis le retour', 'Si la cible est à 4 mètres, aller jusqu’à elle puis revenir fait parcourir 8 mètres. Pour retrouver la distance à la cible, on divise le trajet total par deux. Le lidar applique ce principe à la lumière.', barres([['Aller-retour parcouru', 8], ['Distance à la cible', 4, 'vert']], 8, 'Distance à la cible = trajet aller-retour / 2.', ' m')),
  ]),
  etat: b('Nombre et unité de mesure', 'Une mesure associe un nombre à une unité ; il faut des unités compatibles pour comparer des mesures.', [
    pas('Lire la grandeur complète', 'Un capteur annonce 80 centimètres. Le nombre 80 seul ne suffit pas : 80 mètres décrirait une distance très différente.', tab(['Capteur', 'Nombre', 'Unité'], [['A', '80', 'cm']], ['0-1', '0-2'], 'Une mesure = un nombre + une unité.')),
    pas('Changer d’unité sans déplacer le mur', 'Un autre capteur annonce 0,8 mètre. Comme un mètre vaut cent centimètres, il décrit la même distance de 80 centimètres.', tab(['Capteur', 'Affichage', 'En mètres'], [['A', '80 cm', '0,8 m'], ['B', '0,8 m', '0,8 m']], ['0-2', '1-2'], '80 cm = 0,8 m : deux écritures de la même grandeur.')),
    pas('Comparer après conversion', 'Si B annonce ensuite 0,9 mètre, l’écart avec A est de 0,1 mètre, soit 10 centimètres. On peut maintenant étudier une erreur de mesure sans confondre les unités.', tab(['Capteur', 'En mètres', 'Écart'], [['A', '0,8 m', 'référence'], ['B', '0,9 m', '+0,1 m']], ['1-2'], 'Comparer les valeurs dans une même unité.')),
  ]),
  boucle: b('Répétition et état qui change', 'Une boucle répète les mêmes opérations, mais elle repart des nouvelles informations à chaque tour.', [
    pas('Premier tour', 'Le robot est au départ. Il observe la case devant lui puis avance d’une case. Le premier tour modifie donc sa position.', grille([1, 2], [5, 2], [], [[0, 2], [1, 2]], 'Tour 1 terminé : position 1.')),
    pas('Repartir de la nouvelle position', 'Le deuxième tour recommence par une observation. Le robot repart de la position 1, pas de la position initiale, puis avance à la position 2.', grille([2, 2], [5, 2], [], [[0, 2], [1, 2], [2, 2]], 'Tour 2 : mêmes opérations, nouvel état de départ.')),
    pas('Adapter le résultat du tour', 'Une caisse bloque maintenant la prochaine case. Le troisième tour observe cette nouveauté et s’arrête. Répéter la boucle ne veut pas dire répéter aveuglément le même mouvement.', grille([2, 2], [5, 2], [[3, 2]], [[0, 2], [1, 2], [2, 2]], 'Le cycle se répète ; la décision dépend de la nouvelle observation.')),
  ]),
  reactif: b('Information locale et vue d’ensemble', 'Une information locale décrit le voisinage immédiat ; elle peut ignorer un obstacle situé plus loin.', [
    pas('Voir seulement la prochaine case', 'Le rayon orange montre la case que le robot peut vérifier. Elle est libre. Cela ne dit rien sur les cases encore plus loin.', grille([0, 2], [5, 2], [], [], 'Champ observé : une case devant le robot.', [[1, 2]])),
    pas('Découvrir un obstacle en avançant', 'Après deux pas, un mur entre dans le champ du capteur. Le robot ne pouvait pas le déduire du seul constat initial « la prochaine case est libre ».', grille([2, 2], [5, 2], [[3, 2]], [[0, 2], [1, 2], [2, 2]], 'Un passage libre ici ne garantit pas un trajet libre jusqu’au but.', [[3, 2]])),
    pas('Comparer avec une carte', 'Une carte révèle aussi les cases au-dessus du mur. Elle permet d’envisager un détour. Une réaction locale et une planification n’utilisent donc pas les mêmes informations.', grille([2, 2], [5, 2], [[3, 2]], [[2, 2], [2, 1], [3, 1], [4, 1], [4, 2], [5, 2]], 'La vue d’ensemble permet de comparer des suites de déplacements.')),
  ]),
  astar: b('Graphe, sommet, arête et chemin', 'Un graphe représente des lieux par des sommets et des passages possibles par des arêtes ; un chemin enchaîne ces passages.', [
    pas('Représenter les lieux', 'On remplace trois lieux par trois ronds nommés A, B et C. Ces ronds sont les sommets du graphe.', graphe(0)),
    pas('Ajouter les passages possibles', 'Un passage relie A à B et un autre B à C. Ces liaisons sont les arêtes. On note leur coût : 2 mètres puis 3 mètres.', graphe(1)),
    pas('Construire un chemin', 'Pour rejoindre C depuis A, le robot passe par B. Le chemin A → B → C coûte 2 + 3 = 5 mètres. A* comparera de tels chemins dans un graphe plus grand.', graphe(2)),
  ]),
  hybride: b('Prévision et information nouvelle', 'Un plan repose sur ce que l’on sait à un moment ; une observation plus récente peut obliger à suspendre l’action prévue.', [
    pas('Prévoir avec la carte actuelle', 'Le trajet vert a été calculé quand le passage était libre. C’est une prévision des déplacements à venir.', grille([0, 2], [5, 2], [], [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2]], 'Un plan utilise les informations disponibles au moment du calcul.')),
    pas('Recevoir une information plus récente', 'Le robot avance, puis un chariot apparaît juste devant lui. La carte qui a servi au plan ne contenait pas ce chariot.', grille([1, 2], [5, 2], [[2, 2]], [[0, 2], [1, 2]], 'Une nouvelle observation peut rendre le plan dangereux.')),
    pas('Protéger avant de recalculer', 'Le robot reste immobile pendant qu’un nouveau détour est préparé. S’arrêter immédiatement et réfléchir au nouveau trajet remplissent deux besoins complémentaires.', grille([1, 2], [5, 2], [[2, 2]], [[1, 2], [1, 1], [2, 1], [3, 1], [3, 2], [4, 2], [5, 2]], 'Réaction immédiate : arrêt. Prévision suivante : nouveau détour.')),
  ]),
  espace: b('Choix et combinaisons', 'Changer l’ordre de plusieurs objets crée des possibilités différentes, dont le nombre peut augmenter très vite.', [
    pas('Ordonner deux visites', 'Avec deux lieux distincts A et B, on peut visiter A puis B, ou B puis A. Ce sont deux ordres possibles.', tab(['Possibilité', 'Ordre', 'Nombre'], [['1', 'AB', ''], ['2', 'BA', '2 au total']], ['0-1', '1-1'], 'Deux lieux donnent deux ordres.')),
    pas('Ajouter un troisième lieu', 'Avec C, on a trois choix pour la première visite, puis deux pour la suivante et un dernier lieu. Cela fait 3 × 2 × 1 = 6 ordres.', tab(['Début A', 'Début B', 'Début C'], [['ABC', 'BAC', 'CAB'], ['ACB', 'BCA', 'CBA']], ['0-0', '0-1', '0-2'], 'Trois lieux donnent six ordres, pas seulement trois.')),
    pas('Voir la croissance', 'Avec quatre lieux distincts, il y a 4 × 3 × 2 × 1 = 24 ordres. L’espace de recherche grandit plus vite que le nombre de lieux à visiter.', barres([['2 lieux', 2], ['3 lieux', 6], ['4 lieux', 24, 'orange']], 24, 'Ajouter un choix peut multiplier les combinaisons.')),
  ]),
  contraintes: b('Possibilités et conditions simultanées', 'Une solution autorisée doit appartenir aux choix possibles et satisfaire toutes les conditions imposées.', [
    pas('Partir de toutes les places', 'Une borne peut d’abord être placée dans l’une des quatre colonnes numérotées. On n’a encore appliqué aucune restriction.', compte(4, [], 0, 'Choix de départ : colonnes 1, 2, 3 et 4.')),
    pas('Appliquer une première condition', 'La borne doit être dans une colonne paire. Il reste les colonnes 2 et 4. Les autres sont exclues par cette condition.', compte(4, [1, 3], 1, 'Condition 1 : colonne paire → {2, 4}.')),
    pas('Appliquer aussi la deuxième', 'La colonne doit aussi être inférieure à 4. Parmi les choix restants, seule 2 convient. Il faut respecter les deux conditions ensemble.', compte(4, [1], 2, 'Paire ET inférieure à 4 → seule la colonne 2 reste possible.')),
  ]),
  recuit: b('Comparer des solutions voisines', 'Une solution voisine s’obtient par une petite modification ; son coût permet de dire si cette modification améliore ou dégrade le résultat.', [
    pas('Garder une référence', 'La tournée actuelle mesure 8 mètres. Notre objectif est de raccourcir le trajet : une valeur plus petite sera meilleure.', barres([['Tournée actuelle', 8]], 12, 'Critère choisi : réduire la distance.', ' m')),
    pas('Essayer une petite modification', 'On échange deux visites. La nouvelle tournée fait 6 mètres : elle économise 2 mètres. Elle est meilleure selon le critère de distance.', barres([['Référence', 8], ['Voisine A', 6, 'vert']], 12, '8 → 6 : amélioration de 2 mètres.', ' m')),
    pas('Distinguer voisin et meilleur', 'Un autre échange donne 9 mètres. Cette tournée est aussi une voisine, mais elle est moins bonne. Le recuit devra décider s’il accepte parfois une telle dégradation pour explorer.', barres([['Référence', 8], ['Voisine B', 9, 'orange']], 12, 'Une petite modification peut améliorer ou dégrader le coût.', ' m')),
  ]),
  croyance: b('Possibilité et probabilité', 'Plusieurs états peuvent rester possibles ; les probabilités répartissent la confiance entre eux sans créer plusieurs réalités.', [
    pas('Hésiter entre deux positions', 'Il existe un seul robot, mais on ignore s’il est en A ou en B. Pour commencer, on attribue 50 % à chaque possibilité.', barres([['Hypothèse A', 50], ['Hypothèse B', 50]], 100, 'Les possibilités sont exclusives ici : 50 % + 50 % = 100 %.', ' %')),
    pas('Favoriser une hypothèse', 'Une mesure favorise A. Dans cet exemple, la confiance devient 80 % pour A et 20 % pour B. Ce sont des degrés de confiance, pas deux morceaux du robot.', barres([['Hypothèse A', 80, 'vert'], ['Hypothèse B', 20]], 100, 'Un seul robot ; deux positions encore possibles.', ' %')),
    pas('Garder la possibilité d’une erreur', 'Si une vérification directe révèle B, cela ne contredit pas une probabilité de 20 %. Un événement peu probable peut arriver. Seule cette vérification certaine ferme les autres possibilités dans notre exemple.', barres([['Hypothèse A', 0], ['Position B vérifiée', 100, 'vert']], 100, 'Probable ne veut pas dire certain.', ' %')),
  ]),
  mdp: b('Action choisie et résultat incertain', 'On choisit une action, mais l’état obtenu peut dépendre du hasard ou de perturbations.', [
    pas('Partir d’un état connu', 'Le robot est en A. Il choisit l’action « avancer ». L’état présent et l’action choisie sont deux informations différentes.', tab(['État', 'Action', 'Après'], [['A', 'avancer', '?']], ['0-0', '0-1'], 'On connaît le départ et la commande, pas encore l’arrivée.')),
    pas('Lister les issues possibles', 'Dans ce modèle, la commande réussit quatre fois sur cinq : arrivée en B. Une fois sur cinq, les roues glissent et le robot reste en A.', barres([['Arriver en B', 80], ['Rester en A', 20, 'orange']], 100, 'Deux issues possibles : 80 % et 20 %.', ' %')),
    pas('Observer une seule issue', 'Lors de cet essai, le robot reste en A. Il devra choisir sa prochaine action depuis A. Les probabilités décrivent plusieurs possibilités ; un seul résultat se réalise à chaque essai.', tab(['Avant', 'Commande', 'Après'], [['A', 'avancer', 'A']], ['0-2'], 'La décision suivante dépend de l’état réellement obtenu.')),
  ]),
  qlearning: b('Apprendre à partir de retours', 'Une estimation peut être corrigée à partir des résultats obtenus lors d’essais ; un retour isolé ne suffit pas à tout connaître.', [
    pas('Commencer sans estimation', 'Le robot n’a encore jamais essayé le couloir A. Le point d’interrogation signifie qu’il manque une expérience, pas que le gain vaut zéro.', tab(['Couloir', 'Essais', 'Gain'], [['A', '0', '?']], ['0-2'], 'Inconnu et zéro sont deux informations différentes.')),
    pas('Recevoir un premier retour', 'Un premier passage rapporte 2 points. Pour cet exemple introductif, on prend la moyenne des gains observés : avec un seul essai, elle vaut 2.', tab(['Couloir', 'Gains', 'Moyenne'], [['A', '2', '2']], ['0-1', '0-2'], 'L’expérience apporte une première estimation.')),
    pas('Corriger avec une autre expérience', 'Le passage suivant rapporte 6 points. La moyenne devient (2 + 6) / 2 = 4. Le Q-learning utilisera une mise à jour plus précise, avec aussi les récompenses futures.', barres([['Premier gain', 2], ['Deuxième gain', 6], ['Moyenne', 4, 'vert']], 8, 'Un retour modifie une estimation ; il ne révèle pas à lui seul la meilleure stratégie.', ' points')),
  ]),
  exploration: b('Expérience limitée et estimation', 'Un score obtenu sur très peu d’essais est une information fragile ; essayer de nouveau peut changer le classement.', [
    pas('Comparer ce que l’on connaît', 'Le couloir A a rapporté 10 points lors d’un seul essai. Le couloir B a une moyenne de 8 points sur dix essais. A paraît meilleur, mais on le connaît beaucoup moins.', tab(['Couloir', 'Essais', 'Moyenne'], [['A', '1', '10'], ['B', '10', '8']], ['0-1', '1-1'], 'Le nombre d’essais accompagne le score.')),
    pas('Faire un essai informatif', 'On essaie encore A. Cette fois, il rapporte zéro. Les deux résultats de A sont donc 10 et 0.', tab(['Couloir', 'Gains', 'Essais'], [['A', '10 puis 0', '2'], ['B', 'déjà observés', '10']], ['0-1'], 'Un nouvel essai peut contredire une première impression.')),
    pas('Réviser le classement', 'La moyenne de A devient 5, alors que celle de B reste 8. Explorer sert à réduire ce manque d’information avant les prochains choix.', tab(['Couloir', 'Essais', 'Moyenne'], [['A', '2', '5'], ['B', '10', '8']], ['1-2'], 'Choisir avec peu d’information comporte une incertitude.')),
  ]),
  confiance: b('Population et échantillon', 'La population est l’ensemble étudié ; un échantillon en est une partie observée pour estimer ce qui se passe dans l’ensemble.', [
    pas('Définir l’ensemble étudié', 'Ces vingt points représentent vingt missions possibles. On souhaite connaître les résultats de tout cet ensemble : c’est la population de notre petit exemple.', compte(20, [], 0, 'Population de l’exemple : les 20 missions.')),
    pas('N’en observer qu’une partie', 'On sélectionne quatre missions, marquées ✓. Elles constituent un échantillon. Le choix de ces missions doit être adapté à la population que l’on veut décrire.', compte(20, [0, 6, 12, 18], 1, 'Échantillon : 4 missions observées parmi les 20.')),
    pas('Comprendre pourquoi l’estimation varie', 'Une autre sélection de quatre missions pourrait contenir d’autres réussites et échecs. Deux échantillons d’une même population peuvent donc donner des résultats différents.', compte(20, [1, 7, 13, 19], 2, 'Un échantillon donne une estimation, pas la connaissance complète de la population.')),
  ]),
  robustesse: b('Comparer dans les mêmes conditions', 'Pour attribuer un écart à deux agents, on doit les confronter à des situations comparables et définir la même mesure.', [
    pas('Repérer une comparaison inéquitable', 'A est testé sur sol sec et B sur sol mouillé. Leurs taux de réussite diffèrent, mais on a changé à la fois l’agent et les conditions.', tab(['Agent', 'Sol', 'Réussite'], [['A', 'sec', '95 %'], ['B', 'mouillé', '60 %']], ['0-1', '1-1'], 'On ne sait pas encore quelle différence vient de l’agent.')),
    pas('Aligner les conditions', 'On teste maintenant A et B sur les mêmes missions avec un sol sec. Tous deux réussissent à 95 % dans ce petit exemple.', tab(['Agent', 'Sol', 'Réussite'], [['A', 'sec', '95 %'], ['B', 'sec', '95 %']], ['0-2', '1-2'], 'Même protocole et mêmes conditions pour les deux agents.')),
    pas('Changer une difficulté commune', 'On mouille le sol pour les deux agents. A garde 85 % de réussite, B tombe à 60 %. On peut comparer leurs baisses dans cette perturbation précise.', tab(['Agent', 'Sol', 'Réussite'], [['A', 'mouillé', '85 %'], ['B', 'mouillé', '60 %']], ['0-2', '1-2'], 'Une comparaison de robustesse exige des perturbations communes.')),
  ]),
  graine: b('Tirage et répétition possible', 'Un tirage choisit une issue parmi plusieurs ; le hasard peut produire la même issue plusieurs fois de suite.', [
    pas('Lister les issues d’un dé', 'Un dé équilibré a six faces possibles. Avant le lancer, chaque face a une chance sur six de sortir. On ne sait pas encore laquelle apparaîtra.', compte(6, [], 0, 'Six possibilités ; une seule se réalise à chaque lancer.')),
    pas('Observer un premier résultat', 'Le premier lancer donne 3. Cette observation ne retire pas la face 3 du dé : elle reste possible au lancer suivant.', tab(['Lancer', 'Résultat', 'Possibilités'], [['1', '3', '1 à 6']], ['0-1'], 'Un résultat observé ne supprime pas les autres issues.')),
    pas('Accepter une répétition', 'Le deuxième lancer donne encore 3. Deux résultats identiques ne prouvent pas que le dé est bloqué. Pour rejouer une simulation, on conservera la façon dont sa suite de tirages a été produite.', tab(['Lancer', 'Résultat', 'Possibilités'], [['1', '3', '1 à 6'], ['2', '3', '1 à 6']], ['1-1'], 'Le hasard peut répéter ; la graine permet de reproduire une suite calculée.')),
  ]),
};
