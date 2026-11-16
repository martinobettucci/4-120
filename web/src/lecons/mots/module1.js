import { mot, pas, histoire, comparer, circuit, jetons, barres, relief, tableau, scene, carte, trait, rond, texte } from './scenes.js';
function dependance(phase) {
  const dessiner = (petit) => [
    carte('humidite', 160, petit ? 55 : 100, 'Sol humide\nOui / non', phase < 2 ? 'bleu' : 'gris', 220),
    carte('patinage', petit ? 160 : 480, petit ? 220 : 100, 'Patinage\nOui / non', phase === 2 ? 'orange' : 'gris', 220),
    ...(phase ? [petit ? trait('arc', 160, 93, 160, 182, 'bleu', true) : trait('arc', 275, 100, 365, 100, 'bleu', true),
      rond('indice', petit ? 160 : phase === 1 ? 290 : 350, petit ? phase === 1 ? 112 : 164 : 100, '', 'orange', 5)] : []),
    texte('lecture', petit ? 160 : 320, petit ? 305 : 220, ['Deux variables, pas encore reliées', 'Un arc relie les deux variables', 'L’humidité change la probabilité du patinage'][phase], petit ? 295 : 590, 16),
  ];
  return scene(dessiner(false), dessiner(true), ['Dans cet exemple, l’humidité est une cause.', 'Sol humide → Patinage', 'Une flèche probabiliste n’est pas une certitude.'][phase]);
}
export const MODULE1 = {
  regles: [
    histoire('Règle', ['Mesurer\n90 °C', 'Si plus de 85 °C', 'Alors\nARRÊT'], [
      ['Lire la mesure', 'Le thermomètre indique 90 °C. Le robot a besoin de savoir quoi faire avec ce nombre.', 'Une mesure, toute seule, ne décide pas.'],
      ['Vérifier la condition', 'La règle demande : « Est-ce plus de 85 °C ? » Oui, car 90 est plus grand que 85.', '90 > 85 : la condition est vraie.'],
      ['Appliquer la décision', 'La règle commande donc l’arrêt. Une règle relie une condition à une action précise.', 'Si la condition est vraie, alors on agit.'],
    ]),
    comparer('Seuil', 100, [
      ['Juste en dessous', 'Le robot s’arrête seulement au-dessus de 85 °C. À 84 °C, cette règle ne déclenche rien.', [['Mesure', 84], ['Seuil', 85, 'orange']], '84 ne dépasse pas 85.'],
      ['Exactement au seuil', 'À 85 °C, on est sur la limite. « Plus de 85 » exclut encore cette valeur.', [['Mesure', 85], ['Seuil', 85, 'orange']], 'Le signe > est strict : 85 ne suffit pas.'],
      ['Franchir la limite', 'À 86 °C, la limite est franchie : arrêt. Le seuil est la valeur qui sépare les deux cas.', [['Mesure', 86, 'rouge'], ['Seuil', 85, 'orange']], '86 > 85 : la règle déclenche l’arrêt.'],
    ], ' °C'),
    histoire('Règle par défaut', ['Danger ?\nNon', 'Batterie faible ?\nNon', 'Sinon\nCONTINUER'], [
      ['Essayer une règle', 'Le robot cherche un obstacle proche. Il n’en trouve pas : la règle d’arrêt ne s’applique pas.', 'Première condition : fausse.'],
      ['Essayer la suivante', 'La batterie est suffisamment chargée. La règle qui demande de ralentir ne s’applique pas non plus.', 'Aucune des deux règles ne décide.'],
      ['Utiliser le sinon', 'Il reste la décision prévue pour tous les autres cas : continuer. C’est la règle par défaut.', 'Le défaut s’applique après les autres règles.'],
    ]),
  ],
  bayes: [], // Le parcours continu est défini dans bayes.js, puis assemblé avec les bases.
  reseau: [
    histoire('Nœud', ['Une question\nSol humide ?', 'Deux états\nOui / non', 'Un nœud\n« Sol humide »'], [
      ['Choisir une question', 'Pour comprendre pourquoi le robot patine, on se demande si le sol est humide.', 'Le sol peut être sec ou humide.'],
      ['Lister les possibilités', 'La réponse peut varier : oui ou non. Cette question est donc une variable, une information qui peut changer.', 'Une variable peut prendre plusieurs valeurs.'],
      ['La représenter', 'On dessine une boîte portant le nom « Sol humide ». Cette boîte est un nœud du réseau.', 'Un nœud représente une variable, pas un robot.'],
    ]),
    mot('Arc', [
      pas('Deux informations', 'On veut relier l’humidité du sol et le patinage. Ici, on sait que mouiller le sol favorise le patinage.', dependance(0)),
      pas('Dessiner la flèche', 'La flèche part de « Sol humide » et pointe vers « Patinage ». Elle indique quelle information sert au calcul de l’autre.', dependance(1)),
      pas('Lire sans exagérer', 'L’humidité change la probabilité de patiner, sans garantir un patinage. En général, un arc décrit une dépendance ; la causalité demande des preuves.', dependance(2)),
    ]),
    comparer('A priori, a posteriori', 100, [
      ['Avant la mesure', 'Avant d’écouter le moteur, on estime à 10 % la probabilité d’une panne. Cette estimation de départ est l’a priori.', [['Probabilité de panne', 10]], 'Avant l’observation : 10 %.'],
      ['Recevoir un indice', 'Un bruit inhabituel apparaît. Dans cet exemple, il est plus fréquent en cas de panne : cette information va servir à réviser l’estimation.', [['Estimation avant révision', 10]], 'Un nouvel indice entre dans le calcul.'],
      ['Après la mesure', 'Après avoir tenu compte du bruit, l’estimation illustrée est 50 %. C’est l’a posteriori. Ce n’est toujours pas une certitude.', [['Probabilité de panne', 50, 'orange']], 'Après l’observation : 50 %. Valeurs d’illustration.'],
    ], ' %'),
  ],
  utilite: [
    comparer('Coût espéré', 100, [
      ['Deux issues possibles', 'Une panne coûterait 100 €. S’il n’y a pas de panne, la perte est 0 €. La panne a une chance sur dix d’arriver.', [['Avec panne', 100, 'rouge'], ['Sans panne', 0]], 'Probabilité de panne : 10 %.'],
      ['Pondérer chaque coût', 'On compte 100 € seulement dans un cas sur dix : 0,10 × 100 €. Les neuf autres cas contribuent 0 €.', [['Contribution de la panne', 10, 'orange'], ['Contribution sans panne', 0]], '0,10 × 100 + 0,90 × 0 = 10 €.'],
      ['Lire une moyenne', 'Le coût espéré vaut 10 €. Un cas particulier coûte ici 0 € ou 100 €, jamais 10 € : 10 € décrit une moyenne.', [['Coût espéré', 10, 'vert']], 'Comparer les décisions avec leur coût moyen.'],
    ], ' €'),
    histoire('Fausse alerte', ['Machine saine', 'Arrêt demandé', 'Temps perdu\nCoût : 5 €'], [
      ['Une machine qui marche', 'La machine n’a pas de problème. Elle pourrait continuer à produire.', 'Réalité : aucune panne.'],
      ['Une alerte erronée', 'Le détecteur annonce pourtant un danger. La politique choisie arrête la machine.', 'Une action est déclenchée à tort.'],
      ['Compter la conséquence', 'L’arrêt inutile coûte 5 € dans cet exemple. Une fausse alerte peut donc coûter du temps ou de l’argent.', 'Le prix d’une erreur influence la décision.'],
    ], 'orange'),
    histoire('Manque', ['Machine en panne', 'Aucune alerte', 'Pas d’arrêt\nDommage : 95 €'], [
      ['Un vrai problème', 'La machine a réellement un défaut. Il faudrait intervenir.', 'Réalité : une panne existe.'],
      ['Un test silencieux', 'Le détecteur ne signale rien. La panne n’est pas reconnue : c’est un manque, aussi appelé faux négatif.', 'Panne + absence d’alerte = manque.'],
      ['Voir la conséquence', 'La machine continue et le dommage coûte 95 € dans cet exemple. Une erreur silencieuse peut être plus chère qu’un arrêt inutile.', 'Il faut comparer le coût des deux erreurs.'],
    ], 'rouge'),
  ],
  supervise: [
    histoire('Exemple étiqueté', ['Mesures\n90 °C, vibration', 'Réponse experte\nARRÊTER', 'Exemple complet\nMesures + réponse'], [
      ['Décrire un cas', 'On mesure la température et la vibration d’un moteur. Ces données décrivent une situation.', 'Les mesures sont les entrées du modèle.'],
      ['Ajouter la bonne réponse', 'Une experte examine ce cas et indique « arrêter ». Cette réponse est son étiquette.', 'L’étiquette est la réponse à apprendre.'],
      ['Apprendre sur le couple', 'On fournit ensemble les mesures et la réponse. Le modèle peut comparer sa prédiction à cette réponse connue.', 'Un exemple étiqueté = un cas + sa bonne réponse.'],
    ]),
    comparer('Frontière de décision', 100, [
      ['Deux cas', 'Dans ce petit modèle, on utilise seulement la température. Le moteur A est à 60 °C et le moteur B à 90 °C.', [['Moteur A', 60], ['Moteur B', 90], ['Limite', 80, 'orange']], 'La limite du modèle est fixée à 80 °C.'],
      ['Séparer les réponses', 'La règle apprise répond « continuer » en dessous de 80 °C et « arrêter » à partir de 80 °C.', [['A : continuer', 60, 'vert'], ['B : arrêter', 90, 'rouge'], ['Limite', 80, 'orange']], 'La frontière sépare les deux réponses.'],
      ['Changer de côté', 'A chauffe jusqu’à 85 °C. Il traverse la frontière : sa réponse devient « arrêter ». Avec deux mesures, la frontière serait une ligne.', [['A : arrêter', 85, 'rouge'], ['B : arrêter', 90, 'rouge'], ['Limite', 80, 'orange']], 'Un côté → une réponse ; l’autre → une autre réponse.'],
    ], ' °C'),
    mot('Erreur d’entraînement', [
      pas('Reprendre les exemples appris', 'Voici cinq exemples déjà utilisés pour entraîner le modèle. Pour chacun, on connaît la bonne réponse.', jetons(5, ['✓', '×', '✓', '✓', '×'], [1, 4], 0, 'On évalue ici les exemples d’entraînement.')),
      pas('Comparer ses réponses', 'Le modèle se trompe sur les exemples 2 et 5, marqués ×. Il répond correctement aux trois autres.', jetons(5, ['✓', '×', '✓', '✓', '×'], [1, 4], 1, '× = erreur · ✓ = bonne réponse')),
      pas('Calculer la part d’erreurs', 'Deux erreurs sur cinq exemples : 2 ÷ 5 = 40 %. Ce résultat ne dit pas encore si le modèle réussira sur de nouveaux cas.', jetons(5, ['✓', '×', '✓', '✓', '×'], [1, 4], 2, 'Erreur d’entraînement : 40 %. Tester aussi des cas nouveaux.')),
    ]),
  ],
  neurone: [
    comparer('Poids', 6, [
      ['Une entrée', 'Le capteur fournit la valeur 2. Un poids indique combien cette entrée compte dans le calcul.', [['Entrée', 2], ['Contribution', 2]], 'Avec le poids 1 : 2 × 1 = 2.'],
      ['Multiplier son importance', 'On passe le poids de 1 à 3. La même entrée contribue désormais pour 6 : elle compte trois fois plus.', [['Entrée', 2], ['Contribution', 6, 'orange']], 'Avec le poids 3 : 2 × 3 = 6.'],
      ['Comprendre le sens', 'Le neurone additionne ensuite les contributions. Un poids négatif aurait l’effet inverse : augmenter l’entrée ferait diminuer la somme.', [['Entrée', 2], ['Contribution avec poids 3', 6, 'vert']], 'Le poids règle l’importance et le sens d’une entrée.'],
    ]),
    comparer('Biais', 10, [
      ['Additionner les entrées', 'Les entrées pondérées donnent une somme de 6. On va lui ajouter une constante.', [['Somme avant biais', 6], ['Somme finale', 6]], 'Sans biais : la somme reste 6.'],
      ['Ajouter le biais', 'On choisit le biais −4. La somme finale devient 6 − 4 = 2, même si les entrées n’ont pas changé.', [['Somme avant biais', 6], ['Somme finale', 2, 'orange']], 'Le biais décale le résultat de la somme.'],
      ['Déplacer le déclenchement', 'Si la sortie vaut 1 quand la somme finale est positive, il faut maintenant une somme d’entrées supérieure à 4 pour déclencher.', [['Somme avant biais', 6], ['Somme finale', 2, 'vert']], 'Avec biais −4 : déclencher exige une somme > 4.'],
    ]),
    histoire('Activation', ['Somme\n2', 'Fonction seuil\nEst-ce > 0 ?', 'Sortie\n1'], [
      ['Recevoir une somme', 'Le neurone a additionné ses entrées et son biais. Il obtient ici 2.', 'La somme peut prendre beaucoup de valeurs.'],
      ['Transformer ce nombre', 'Notre activation est une règle simple : si la somme est positive, répondre 1 ; sinon répondre 0.', 'Une activation transforme la somme en sortie.'],
      ['Produire la sortie', 'Comme 2 est positif, la sortie vaut 1. D’autres activations produisent des valeurs progressives au lieu de 0 ou 1.', 'Ici : 2 > 0, donc sortie 1.'],
    ]),
    histoire('Couche', ['Mêmes mesures\nTempérature, bruit', 'Neurones A, B, C\nCalculs différents', 'Trois sorties\nPour la suite'], [
      ['Partager les entrées', 'Les mêmes mesures sont envoyées à trois neurones.', 'Chaque neurone reçoit le même petit tableau.'],
      ['Calculer en parallèle', 'A, B et C ont chacun leurs poids. Ils ne donnent donc pas forcément la même réponse.', 'Ce groupe de neurones forme une couche.'],
      ['Transmettre le groupe de sorties', 'Leurs trois réponses peuvent alimenter une nouvelle couche. En reliant plusieurs couches, on obtient un réseau.', 'Une couche reçoit un ensemble d’entrées et produit des sorties.'],
    ]),
  ],
  gradient: [
    comparer('Perte', 16, [
      ['Faire une prédiction', 'La bonne réponse vaut 5, mais le modèle prédit 1. L’écart est de 4.', [['Perte : (1 − 5)²', 16, 'rouge']], 'On choisit ici le carré de l’écart comme perte.'],
      ['Se rapprocher', 'Après correction, le modèle prédit 3. L’écart vaut 2 ; son carré vaut 4.', [['Perte : (3 − 5)²', 4, 'orange']], 'Une meilleure prédiction fait baisser la perte.'],
      ['Atteindre la cible', 'Le modèle prédit maintenant 5. Il n’y a plus d’écart sur cet exemple, donc la perte vaut 0.', [['Perte : (5 − 5)²', 0, 'vert']], 'La perte mesure l’erreur avec une règle choisie.'],
    ]),
    mot('Gradient', [
      pas('Regarder la pente', 'Le point R représente un réglage du modèle. La courbe montre sa perte : plus on est bas, moins on se trompe.', relief([1, 2], 'Le réglage est sur le flanc gauche de la courbe.', true)),
      pas('Choisir le sens qui descend', 'Ici, aller vers la droite fait baisser la perte. Le gradient indique le sens de la montée ; on avance dans le sens opposé.', relief([2, 4], 'La descente suit le sens opposé au gradient.', true)),
      pas('Ralentir près du fond', 'Près du fond, la pente devient faible. Le gradient devient petit : le réglage a moins besoin d’être corrigé.', relief([3, 5], 'Au fond de cet exemple, la pente vaut zéro.', true)),
    ]),
    mot('Taux d’apprentissage', [
      pas('Un réglage à corriger', 'Le point R doit descendre vers le fond. La direction ne suffit pas : il faut aussi décider de la longueur du pas.', relief([0, 0], 'Le taux règle la taille de chaque correction.', true)),
      pas('Faire un petit pas', 'Avec un taux modéré, on avance un peu. La perte diminue et l’on peut recalculer la pente.', relief([1, 2], 'Un petit pas permet de corriger progressivement.', true)),
      pas('Ne pas sauter trop loin', 'On continue à se rapprocher. Un taux trop grand pourrait faire sauter de l’autre côté du creux et osciller.', relief([2, 4], 'Trop petit : lent. Trop grand : risque de dépasser.', true)),
    ]),
    histoire('Époque', ['Exemple A\nvu', 'Exemple B\nvu', 'Exemple C\nvu'], [
      ['Commencer un passage', 'Notre jeu d’entraînement contient trois exemples : A, B et C. On utilise d’abord A.', 'Un exemple traité ne fait pas encore une époque.'],
      ['Continuer le passage', 'On utilise ensuite B. Chaque exemple aide à corriger le modèle.', 'Deux exemples vus sur trois.'],
      ['Finir le passage', 'Après C, tous les exemples ont été vus une fois : une époque est terminée. Une nouvelle époque recommence un passage complet.', '1 époque = 1 passage sur tout le jeu d’entraînement.'],
    ]),
  ],
  recommandation: [
    mot('Matrice de notes', [
      pas('Une ligne par personne', 'Alice et Bob ont chacun une ligne. Les colonnes désignent les films A et B.', tableau(['Personne', 'Film A', 'Film B'], [['Alice', '5', '?'], ['Bob', '5', '4']], [], 'Un nombre est une note ; ? signifie « pas encore noté ».')),
      pas('Lire une case', 'À l’intersection de la ligne Bob et de la colonne Film B, on lit 4 : c’est la note de Bob pour ce film.', tableau(['Personne', 'Film A', 'Film B'], [['Alice', '5', '?'], ['Bob', '5', '4']], ['1-2'], 'Une case relie une personne à un article.')),
      pas('Repérer ce qui manque', 'Alice n’a pas noté B. Le système essaie de prévoir cette note manquante pour savoir quoi lui proposer.', tableau(['Personne', 'Film A', 'Film B'], [['Alice', '5', '?'], ['Bob', '5', '4']], ['0-2'], 'La matrice organise les goûts connus et les cases inconnues.')),
    ]),
    mot('Filtrage collaboratif', [
      pas('Chercher des goûts proches', 'Alice et Bob ont tous les deux beaucoup aimé le film A : ils lui donnent 5.', tableau(['Personne', 'Film A', 'Film B'], [['Alice', '5', '?'], ['Bob', '5', '4']], ['0-1', '1-1'], 'Une ressemblance de goûts donne un premier indice.')),
      pas('Regarder ce que l’autre aime', 'Bob a aussi aimé B, avec une note de 4. Alice ne l’a pas encore vu.', tableau(['Personne', 'Film A', 'Film B'], [['Alice', '5', '?'], ['Bob', '5', '4']], ['1-2'], 'On utilise l’expérience d’autres personnes.')),
      pas('Proposer, sans garantir', 'On propose B à Alice. Un vrai système compare davantage de notes : une seule ressemblance ne garantit pas les mêmes goûts.', tableau(['Personne', 'Film A', 'Film B'], [['Alice', '5', 'B proposé'], ['Bob', '5', '4']], ['0-2'], 'Les goûts des autres aident à recommander.')),
    ]),
    histoire('Démarrage à froid', ['Nouvelle personne\nAucune note', 'Goûts inconnus\nQui lui ressemble ?', 'Premiers indices\nChoisir des thèmes'], [
      ['Arriver sans historique', 'Une nouvelle personne ouvre le service. Elle n’a encore noté aucun film.', 'Le tableau de ses goûts est vide.'],
      ['Constater le manque', 'Le système ne sait pas quelles autres personnes lui ressemblent. Il manque d’indices pour personnaliser.', 'C’est le démarrage à froid.'],
      ['Recueillir un début d’information', 'On peut lui demander ses thèmes préférés. Un nouvel article sans avis rencontre le même type de difficulté.', 'Quelques préférences permettent de commencer.'],
    ]),
  ],
};
