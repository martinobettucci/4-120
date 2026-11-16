import { mot, pas, histoire, comparer, circuit, jetons, relief, tableau, grille, scene, carte, rond, trait, texte } from './scenes.js';
const ordres = [['A → B → C', '8 m'], ['A → C → B', '6 m'], ['B → A → C', '9 m']];
export const MODULES456 = {
  espace: [
    histoire('Solution candidate', ['À visiter\nA, B, C', 'Un ordre proposé\nA → B → C', 'À évaluer\nCombien de mètres ?'], [
      ['Poser le problème', 'Le robot doit visiter trois quais. Plusieurs ordres de visite sont possibles.', 'Une question peut avoir plusieurs réponses possibles.'],
      ['Proposer une réponse', 'On propose de visiter A, puis B, puis C. C’est une solution candidate : une possibilité à examiner.', 'Candidate ne veut pas dire meilleure.'],
      ['La mettre à l’épreuve', 'On calcule la distance de cette tournée et on vérifie les contraintes. On pourra ensuite la comparer à d’autres ordres.', 'Proposer → vérifier → comparer.'],
    ]),
    comparer('Coût', 10, [
      ['Mesurer un premier choix', 'La tournée A → B → C fait 8 mètres. Si l’objectif est d’économiser la distance, son coût vaut 8.', [['A → B → C', 8]], 'Le coût mesure ce qu’on cherche à réduire.'],
      ['Mesurer une alternative', 'La tournée A → C → B ne fait que 6 mètres. On utilise la même unité et la même règle de calcul.', [['A → B → C', 8], ['A → C → B', 6, 'vert']], 'Les deux solutions deviennent comparables.'],
      ['Choisir avec ce critère', 'Avec la distance comme seul critère, 6 est meilleur que 8. Si le retard compte aussi, il faut l’ajouter explicitement au coût.', [['A → B → C', 8], ['A → C → B', 6, 'vert']], 'Le meilleur choix dépend du coût choisi.'],
    ], ' m'),
    mot('Espace de recherche', [
      pas('Commencer par une possibilité', 'Avec trois quais, A → B → C est un premier ordre possible. Ce n’est qu’un élément de l’ensemble à explorer.', tableau(['Tournée', 'Ordre', 'Distance'], [['1', 'ABC', '8 m'], ['2', 'ACB', '6 m'], ['3', 'BAC', '9 m']], ['0-1'], 'Chaque ordre est une solution candidate.')),
      pas('Regarder les alternatives', 'Changer l’ordre donne une autre tournée. Ici, A → C → B est une deuxième possibilité.', tableau(['Tournée', 'Ordre', 'Distance'], [['1', 'ABC', '8 m'], ['2', 'ACB', '6 m'], ['3', 'BAC', '9 m']], ['1-1'], 'La recherche se déplace d’une candidate à l’autre.')),
      pas('Penser à l’ensemble', 'Trois quais distincts donnent six ordres : ABC, ACB, BAC, BCA, CAB, CBA. L’espace de recherche les rassemble tous.', tableau(['Début A', 'Début B', 'Début C'], [['ABC', 'BAC', 'CAB'], ['ACB', 'BCA', 'CBA']], ['0-0', '0-1', '0-2', '1-0', '1-1', '1-2'], 'L’espace de recherche contient toutes les candidates.')),
    ]),
  ],
  contraintes: [
    histoire('Variable', ['Question\nOù mettre A ?', 'Nommer l’inconnue\nx = ?', 'Essayer une valeur\nx = 2'], [
      ['Une place à choisir', 'Il faut installer une borne dans une colonne. On ne sait pas encore laquelle.', 'La position est inconnue.'],
      ['Donner un nom à l’inconnue', 'On appelle x le numéro de cette colonne. x est une variable du problème.', 'Une variable représente ce qu’on doit déterminer.'],
      ['Faire une proposition', 'Essayer x = 2 revient à proposer la colonne 2. Il reste à vérifier si ce choix respecte les règles.', 'Donner une valeur n’assure pas qu’elle est autorisée.'],
    ]),
    mot('Domaine', [
      pas('Lister les choix possibles', 'La borne peut être placée dans l’une des colonnes 1, 2 ou 3. Ce sont ses valeurs possibles au départ.', tableau(['Choix 1', 'Choix 2', 'Choix 3'], [['1', '2', '3']], [], 'Domaine initial : {1, 2, 3}.')),
      pas('Retirer une valeur impossible', 'La colonne 1 est condamnée. On la retire des choix encore possibles.', tableau(['Choix 1', 'Choix 2', 'Choix 3'], [['interdit', '2', '3']], ['0-1', '0-2'], 'Domaine restant : {2, 3}.')),
      pas('Choisir dans le domaine', 'On peut maintenant essayer 2 ou 3, mais pas 1. Le domaine regroupe les valeurs que la variable peut encore prendre.', tableau(['Choix 1', 'Choix 2', 'Choix 3'], [['interdit', '2 choisi', '3 possible']], ['0-1'], 'Le domaine est une liste de possibilités.')),
    ]),
    histoire('Contrainte', ['Proposition\nA = 2, B = 2', 'Règle\nA doit différer de B', 'À corriger\nA = 2, B = 3'], [
      ['Proposer deux positions', 'Deux bornes sont proposées dans la colonne 2. Elles se gêneraient.', 'Une candidate peut être impossible.'],
      ['Vérifier une exigence', 'La contrainte A ≠ B interdit qu’elles occupent la même colonne.', 'Une contrainte sépare l’autorisé de l’interdit.'],
      ['Respecter la règle', 'Déplacer B en colonne 3 respecte cette contrainte. Les autres contraintes doivent encore être vérifiées.', 'Toutes les contraintes doivent être respectées ensemble.'],
    ]),
    histoire('Retour arrière', ['Essai\nA = 2', 'Impasse\nB n’a plus de place', 'Annuler cet essai\nEssayer A = 3'], [
      ['Faire un premier choix', 'On place A en colonne 2, puis on essaie de placer B.', 'Le choix est provisoire.'],
      ['Découvrir une impasse', 'Dans cet exemple, B ne peut aller qu’en colonne 2. Le choix précédent l’empêche donc d’être placé.', 'Continuer dans cette branche est impossible.'],
      ['Revenir au choix précédent', 'On annule A = 2 et on essaie A = 3. B peut alors prendre la colonne 2. C’est le retour arrière.', 'Annuler un choix permet d’essayer une autre branche.'],
    ], 'orange'),
  ],
  recuit: [
    mot('Minimum local', [
      pas('Descendre dans un creux', 'On cherche un coût aussi faible que possible. Le point R descend dans un premier creux.', relief([0, 0], 'Le point représente la solution en cours.')),
      pas('Être mieux que ses voisins', 'Dans ce creux, les petits déplacements voisins remontent. R est donc dans un minimum local.', relief([1, 3], 'Autour de R, toutes les petites corrections coûtent plus.')),
      pas('Repérer un meilleur creux', 'Plus loin, un autre creux est encore plus bas. Pour l’atteindre, il faut d’abord remonter : le minimum local n’est pas le meilleur de tous.', relief([4, 5], 'Local : meilleur autour de soi. Global : meilleur dans tout l’espace.')),
    ]),
    comparer('Température', 100, [
      ['Tolérer un mauvais détour', 'Le nouveau trajet coûte 2 unités de plus. À température 10, le recuit l’accepte avec environ 82 % de probabilité.', [['Chance d’accepter', 82, 'orange']], 'Température élevée : exploration plus facile.'],
      ['Refroidir', 'Pour le même surcoût de 2, à température 2, la chance d’accepter tombe à environ 37 %. On devient plus exigeant.', [['Chance d’accepter', 37]], 'Le coût proposé est identique ; la tolérance diminue.'],
      ['Se stabiliser', 'À température 0,5, la chance n’est plus qu’environ 2 %. Les détours défavorables deviennent rares.', [['Chance d’accepter', 2, 'vert']], 'La température est un réglage, pas une chaleur physique.'],
    ], ' %'),
    comparer('Dégradation', 15, [
      ['Connaître le coût actuel', 'La tournée actuelle mesure 8 mètres. Un coût plus petit serait préférable.', [['Tournée actuelle', 8]], 'Le coût de référence vaut 8.'],
      ['Proposer une tournée moins bonne', 'La nouvelle tournée mesure 11 mètres. Elle est donc plus coûteuse que celle qu’on avait.', [['Tournée actuelle', 8], ['Nouvelle tournée', 11, 'orange']], 'La proposition est plus longue de 3 mètres.'],
      ['Calculer la différence', 'La dégradation vaut 11 − 8 = 3. Le recuit utilise ce surcoût et la température pour décider s’il accepte le détour.', [['Tournée actuelle', 8], ['Nouvelle tournée', 11, 'orange'], ['Dégradation', 3, 'rouge']], 'Dégradation Δ = nouveau coût − ancien coût.'],
    ], ' m'),
  ],
  croyance: [
    comparer('Croyance', 100, [
      ['Ne pas savoir où l’on est', 'Le robot hésite entre deux positions A et B. Il n’en choisit pas une comme vérité certaine.', [['Position A', 50], ['Position B', 50]], 'Deux possibilités : 50 % + 50 % = 100 %.'],
      ['Donner plus de poids à une piste', 'Un indice rend A plus plausible. L’estimation devient 80 % pour A et 20 % pour B.', [['Position A', 80, 'vert'], ['Position B', 20]], 'La croyance répartit les probabilités entre les positions.'],
      ['Garder l’incertitude visible', 'A est la piste favorite, mais B reste possible. La position réelle du robot n’est pas changée par cette estimation.', [['Position A', 80, 'vert'], ['Position B', 20]], 'Croire à 80 % n’est pas savoir avec certitude.'],
    ], ' %'),
    comparer('Correction', 100, [
      ['Avant la mesure', 'Le robot hésite également entre A et B. Il pense que chaque position a une chance sur deux.', [['Position A', 50], ['Position B', 50]], 'Croyance avant observation : 50 % / 50 %.'],
      ['Observer une porte', 'Le capteur voit une porte. Dans cet exemple, cette lecture arrive neuf fois plus souvent en A qu’en B.', [['Position A', 50], ['Position B', 50]], 'La mesure favorise A sans exclure B.'],
      ['Mettre à jour', 'Avec ces probabilités de départ égales et ce rapport de neuf, la nouvelle croyance devient 90 % pour A, 10 % pour B.', [['Position A', 90, 'vert'], ['Position B', 10]], 'Corriger = réviser l’estimation à partir d’une mesure.'],
    ], ' %'),
    comparer('Prédiction', 100, [
      ['Avant le déplacement', 'On situe le robot en A avec certitude dans cet exemple. On commande un pas vers B.', [['A', 100], ['B', 0], ['C', 0]], 'On part de la croyance actuelle.'],
      ['Prévoir le mouvement', 'La commande réussit quatre fois sur cinq. Une fois sur cinq, le robot reste en A à cause d’un glissement.', [['A', 20, 'orange'], ['B', 80], ['C', 0]], 'Le mouvement prévu comporte une incertitude.'],
      ['Préparer la croyance suivante', 'Avant même une nouvelle mesure, on prévoit 80 % en B et 20 % en A. La prochaine observation permettra de corriger cette prévision.', [['A', 20, 'orange'], ['B', 80, 'vert'], ['C', 0]], 'Prédire = déplacer les probabilités selon l’action et ses aléas.'],
    ], ' %'),
  ],
  mdp: [
    histoire('État', ['Situation\nAu quai, batterie 10 %', 'Informations utiles\nPosition + énergie', 'Décision\nAller recharger'], [
      ['Décrire le présent', 'Le robot est au quai avec une batterie presque vide. La position seule ne suffit pas à choisir une action.', 'L’état doit contenir les informations utiles.'],
      ['Garder ce qui influence la suite', 'Avec la position et l’énergie, le programme peut évaluer la livraison et la recharge.', 'Le modèle choisit ce que l’état décrit.'],
      ['Décider avec cet état', 'Le robot va recharger. Dans un modèle markovien, l’état doit résumer les informations nécessaires pour prévoir la suite d’une action.', 'Un bon état évite d’avoir à relire tout le passé.'],
    ]),
    comparer('Transition', 100, [
      ['Choisir une action', 'Le robot est en A et commande « avancer ». On décrit les positions possibles juste après cette action.', [['Rester en A', 100], ['Arriver en B', 0]], 'Avant l’action : le robot est en A.'],
      ['Prévoir plusieurs issues', 'Les roues peuvent glisser. Le modèle prévoit 80 % de chances d’arriver en B et 20 % de rester en A.', [['Rester en A', 20, 'orange'], ['Arriver en B', 80]], 'La transition donne des probabilités, pas deux robots.'],
      ['Observer une issue', 'Lors d’un essai, le robot arrive effectivement en B. Un autre essai pourrait rester en A : les probabilités décrivent l’ensemble des possibilités.', [['Rester en A', 0], ['Arriver en B', 100, 'vert']], 'Une seule issue se réalise à chaque essai.'],
    ], ' %'),
    histoire('Récompense', ['Action\nLivrer le colis', 'Résultat\nColis au bon quai', 'Signal\n+10'], [
      ['Faire quelque chose', 'Le robot exécute une livraison. Le programme devra lui indiquer si le résultat est souhaité.', 'La récompense vient après une action ou une transition.'],
      ['Constater le résultat', 'Le colis arrive au bon quai. C’est un résultat que le concepteur veut encourager.', 'L’environnement évalue ce qui vient de se passer.'],
      ['Envoyer un nombre', 'L’agent reçoit +10. Ce nombre est la récompense immédiate ; il sert à comparer les actions, ce n’est pas une émotion.', 'Récompense = signal numérique choisi pour guider l’agent.'],
    ]),
    histoire('Politique', ['État\nBatterie faible', 'Règle de choix\nSi faible → recharge', 'Action\nRecharger'], [
      ['Reconnaître la situation', 'Le robot constate que sa batterie est faible.', 'Une politique prend l’état comme point de départ.'],
      ['Consulter le choix prévu', 'La politique associe cet état à l’action « recharger ». Pour une batterie pleine, elle pourrait choisir « livrer ».', 'Chaque situation appelle un choix.'],
      ['Exécuter ce choix', 'Le robot se dirige vers la recharge. La politique est la manière de choisir, pas seulement un trajet calculé une fois.', 'Politique = règle qui associe des actions aux états.'],
    ]),
  ],
  qlearning: [
    histoire('Récompense', ['Avancer', 'Heurter une caisse', 'Signal reçu\n−5'], [
      ['Essayer une action', 'Le robot avance d’une case pendant son apprentissage.', 'Il va recevoir un retour de l’environnement.'],
      ['Constater une collision', 'Il heurte une caisse. Ce résultat doit être découragé.', 'Le signal dépend de la conséquence.'],
      ['Associer un nombre', 'Il reçoit −5. Une arrivée à destination pourrait donner +10. L’agent apprend à rechercher des suites d’actions mieux récompensées.', 'Une récompense peut être négative : c’est une pénalité.'],
    ], 'orange'),
    comparer('Valeur', 10, [
      ['Une situation prometteuse', 'Le robot est à un pas du quai. Le prochain pas devrait rapporter +10 avec certitude dans ce petit exemple.', [['Gain futur espéré', 10]], 'La valeur décrit ce que la situation promet.'],
      ['Tenir compte de l’incertitude', 'Si le robot n’a qu’une chance sur deux de réussir, avec zéro sinon, le gain moyen prévu tombe à 5.', [['Gain futur espéré', 5, 'orange']], '0,5 × 10 + 0,5 × 0 = 5.'],
      ['Comparer avant d’agir', 'Cette valeur de 5 peut être comparée à celle d’un détour sûr. Elle estime les récompenses futures, au lieu de raconter seulement le dernier gain.', [['Gain futur espéré', 5, 'vert']], 'Valeur = estimation du cumul des récompenses à venir.'],
    ]),
    histoire('Politique', ['Situation\nMur devant', 'Choix appris\nTourner à gauche', 'Action exécutée\nTourner'], [
      ['Observer l’état', 'Le robot se retrouve devant un mur. Il pourrait avancer, tourner ou reculer.', 'Plusieurs actions sont possibles.'],
      ['Sélectionner une action', 'Après apprentissage, sa politique préfère tourner à gauche dans cette situation.', 'La politique indique quoi faire maintenant.'],
      ['Agir puis recommencer', 'Après avoir tourné, le robot applique sa politique à la nouvelle situation. Les valeurs apprises peuvent servir à construire cette politique.', 'Apprendre des valeurs aide à choisir les actions.'],
    ]),
  ],
  exploration: [
    histoire('Exploiter', ['Gains connus\nA : 5, B : 2', 'Choisir le meilleur\nA', 'Utiliser ce savoir\nPasser par A'], [
      ['Utiliser l’expérience', 'Le couloir A a rapporté en moyenne 5 points, B seulement 2.', 'On possède déjà des estimations.'],
      ['Préférer le meilleur connu', 'Le robot choisit A, car son estimation actuelle est la meilleure.', 'Il exploite ce qu’il a appris.'],
      ['Comprendre la limite', 'Ce choix cherche à bien réussir maintenant. Mais si B a changé, le robot ne le découvrira pas en prenant toujours A.', 'Meilleur connu ne veut pas dire meilleur pour toujours.'],
    ]),
    histoire('Explorer', ['Savoir incomplet\nB peu essayé', 'Essayer B\nMême si A semble mieux', 'Apprendre\nNouveau gain observé'], [
      ['Repérer une incertitude', 'Le robot connaît bien A, mais a très peu essayé B. L’estimation de B est donc fragile.', 'Il manque de l’expérience.'],
      ['Faire un essai informatif', 'Il choisit B pour mieux connaître ce couloir. Il peut obtenir moins de points sur cet essai.', 'Explorer accepte parfois un sacrifice immédiat.'],
      ['Améliorer le choix futur', 'Le résultat permet de mettre à jour l’estimation de B. Les décisions suivantes disposent de plus d’information.', 'Explorer = essayer pour apprendre.'],
    ], 'orange'),
    comparer('ε (epsilon)', 100, [
      ['Tout essayer au hasard', 'Avec epsilon égal à 1, chaque choix passe par le tirage au hasard. Cela ne garantit pas de visiter chaque option sur quelques essais.', [['Part aléatoire', 100, 'orange'], ['Meilleur choix connu', 0]], 'ε = 1 : 100 % de choix aléatoires.'],
      ['Mélanger les deux stratégies', 'Avec epsilon égal à 0,2, chaque décision a 20 % de chances de choisir au hasard et 80 % de suivre le meilleur choix connu.', [['Part aléatoire', 20, 'orange'], ['Meilleur choix connu', 80, 'vert']], 'ε = 0,2 : une probabilité, pas un quota exact.'],
      ['Exploiter uniquement', 'Avec epsilon égal à 0, il n’y a plus de choix aléatoire. On suit uniquement le meilleur choix connu, au risque de rater une nouveauté.', [['Part aléatoire', 0], ['Meilleur choix connu', 100, 'vert']], 'ε règle la part d’exploration au hasard.'],
    ], ' %'),
  ],
  confiance: [
    mot('Distribution', [
      pas('Faire un premier essai', 'Une livraison prend deux minutes. Une seule durée ne raconte pas toute la variabilité.', tableau(['Durée', 'Nombre', 'Essais'], [['2 min', '1', '●'], ['3 min', '0', ''], ['4 min', '0', '']], ['0-1'], 'On compte combien de fois chaque résultat apparaît.')),
      pas('Répéter cinq fois', 'Les cinq durées obtenues sont 2, 3, 3, 4 et 3 minutes. On les regroupe par durée.', tableau(['Durée', 'Nombre', 'Essais'], [['2 min', '1', '●'], ['3 min', '3', '● ● ●'], ['4 min', '1', '●']], ['1-1'], 'La durée de 3 minutes apparaît trois fois.')),
      pas('Lire la répartition', 'La distribution montre un résultat fréquent autour de trois minutes, mais aussi des essais plus courts ou plus longs.', tableau(['Durée', 'Nombre', 'Part'], [['2 min', '1', '20 %'], ['3 min', '3', '60 %'], ['4 min', '1', '20 %']], ['0-2', '1-2', '2-2'], 'Une distribution montre les résultats et leur fréquence.')),
    ]),
    mot('Intervalle de confiance', [
      pas('Estimer avec quelques essais', 'Un échantillon donne un taux de réussite de 80 %. Un autre échantillon donnerait probablement un nombre un peu différent.', tableau(['Campagne', 'Estimation', 'Intervalle'], [['A', '80 %', '72 à 88 %']], ['0-1'], 'Un taux mesuré n’est pas la valeur exacte de toute la population.')),
      pas('Afficher une fourchette', 'La méthode fournit ici l’intervalle de 72 % à 88 %. Sa largeur rend visible l’incertitude due à l’échantillon.', tableau(['Campagne', 'Estimation', 'Intervalle'], [['A', '80 %', '72 à 88 %'], ['B', '83 %', '76 à 90 %']], ['0-2', '1-2'], 'Les échantillons donnent des fourchettes différentes.')),
      pas('Comprendre le 95 %', 'Une méthode à 95 % construit des intervalles qui contiennent la vraie valeur dans environ 95 % des campagnes répétées, si ses conditions sont respectées.', tableau(['Séries', 'Couvrent', 'Ratent'], [['100 environ', '95 environ', '5 environ']], ['0-1'], '95 % décrit la fiabilité de la méthode, pas une certitude pour cet intervalle.')),
    ]),
    mot('Taille d’échantillon', [
      pas('Compter les observations', 'On effectue cinq essais distincts. La taille de l’échantillon, appelée n, vaut 5.', jetons(5, Array(5).fill('✓'), [], 0, 'n = 5 essais.')),
      pas('Ajouter de nouveaux essais', 'On réalise cinq essais supplémentaires, dans les mêmes conditions. On dispose maintenant de dix observations.', jetons(10, Array(10).fill('✓'), [], 0, 'n = 10 essais distincts.')),
      pas('Améliorer la précision', 'Avec vingt essais, une mesure isolée pèse moins. Davantage d’essais bien choisis réduisent l’incertitude ; recopier les mêmes résultats ne fait pas de nouveaux essais.', jetons(20, Array(20).fill('✓'), [], 0, 'n = 20. Plus de données ne corrige pas un échantillon biaisé.')),
    ]),
  ],
  robustesse: [
    histoire('Conditions nominales', ['Sol sec', 'Capteur propre', 'Passage libre'], [
      ['Définir le fonctionnement habituel', 'Le robot a été conçu pour rouler sur ce sol sec, à l’intérieur d’un entrepôt.', 'On précise les conditions prévues.'],
      ['Décrire les autres conditions', 'Les capteurs sont propres et fonctionnent comme attendu. On mesure la réussite dans cette situation de référence.', 'Le nominal sert de point de comparaison.'],
      ['Ne pas généraliser trop vite', 'Réussir sur ce passage libre ne prouve pas qu’on réussira avec de la poussière ou du glissement.', 'Nominal = conditions prévues, pas toutes les situations.'],
    ]),
    mot('Perturbation', [
      pas('Prévoir un déplacement', 'Le robot doit suivre le trajet vert sur un sol normal.', grille([0, 2], [5, 2], [], [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2]], 'Trajet prévu : tout droit.')),
      pas('Subir un écart', 'Une zone glissante dévie le robot vers le bas. C’est un événement qui écarte le système de ses conditions habituelles.', grille([2, 3], [5, 2], [], [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2]], 'Le glissement perturbe le déplacement.')),
      pas('Réagir à cet écart', 'Le robot mesure sa position et rejoint le trajet. La robustesse dépend de sa capacité à supporter ces perturbations.', grille([3, 2], [5, 2], [], [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2]], 'Bruit, obstacles imprévus ou glissement : plusieurs perturbations possibles.')),
    ]),
    comparer('Dégradation progressive', 100, [
      ['Sans difficulté', 'Deux agents réussissent chacun 95 % des missions dans les conditions normales.', [['Agent robuste', 95, 'vert'], ['Agent fragile', 95, 'orange']], 'Au nominal, ils semblent équivalents.'],
      ['Avec une difficulté modérée', 'Quand le sol glisse un peu, le robuste garde 85 % de réussite. Le fragile tombe à 40 %.', [['Agent robuste', 85, 'vert'], ['Agent fragile', 40, 'orange']], 'Le robuste perd progressivement de la performance.'],
      ['Avec une difficulté forte', 'Le robuste conserve 70 %, le fragile seulement 5 %. Ces nombres illustrent une baisse graduelle comparée à un effondrement.', [['Agent robuste', 70, 'vert'], ['Agent fragile', 5, 'rouge']], 'On cherche une baisse maîtrisée, pas une rupture soudaine.'],
    ], ' %'),
  ],
  graine: [
    histoire('Graine', ['Point de départ\nGraine 7', 'Même générateur\nMême calcul', 'Même suite\n4, 1, 6…'], [
      ['Choisir un départ', 'Un générateur pseudo-aléatoire utilise un nombre initial. On l’appelle la graine.', 'Exemple illustratif : graine 7.'],
      ['Calculer la suite', 'À partir de cette graine, un même algorithme produit toujours la même suite de tirages.', 'Le hasard simulé est calculé.'],
      ['Recommencer à l’identique', 'Si l’on remet la même graine au même générateur, on retrouve la suite. Une autre graine produit généralement une autre suite.', 'Même graine + même générateur = même suite.'],
    ]),
    histoire('Reproductible', ['Garder\nCode, données, réglages', 'Relancer\nMême graine', 'Comparer\nMême résultat'], [
      ['Conserver les conditions', 'On garde la version du code, les données, les réglages et la graine utilisés pendant l’essai.', 'Le résultat dépend de toutes ces conditions.'],
      ['Refaire la même expérience', 'On relance dans le même environnement de calcul, avec ces éléments. La graine seule ne suffit pas si le programme a changé.', 'On reproduit la recette complète.'],
      ['Retrouver le résultat', 'Dans cette simulation déterministe, le même échec réapparaît. On peut alors l’étudier et vérifier une correction.', 'Reproductible = retrouvable dans des conditions précises.'],
    ]),
    histoire('Trace', ['0,0 s\nObstacle vu', '0,2 s\nOrdre : arrêter', '0,4 s\nRobot immobile'], [
      ['Garder le premier événement', 'Le système enregistre la mesure et son heure. C’est la première ligne de la trace.', 'On sait ce que le robot a perçu.'],
      ['Garder la décision', 'Il enregistre ensuite l’ordre d’arrêt. On peut relier ce choix à la mesure précédente.', 'On sait ce que le robot a décidé.'],
      ['Garder le résultat', 'La trace note que le robot est immobile. L’enchaînement permet de comprendre l’exécution, étape par étape.', 'Une trace raconte les événements dans leur ordre.'],
    ]),
  ],
};
