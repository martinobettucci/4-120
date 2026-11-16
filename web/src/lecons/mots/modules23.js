import { mot, pas, histoire, comparer, circuit, grille, scene, carte, trait, rond, texte } from './scenes.js';
const U = [[4, 1], [4, 2], [4, 3], [3, 1], [3, 3], [2, 1], [2, 3]];
const couloir = (x, bilan, murs = [], chemin = []) => grille([x, 2], [5, 2], murs, chemin, bilan);
function echo(x, bilan) {
  const dessiner = (petit) => {
    const debut = petit ? 40 : 90; const fin = petit ? 285 : 550;
    return [trait('trajet', debut, 112, fin, 112, 'gris'),
      carte('capteur', debut + 15, 190, 'Lidar', 'bleu', petit ? 80 : 130),
      carte('mur', fin - 10, 190, 'Mur', 'gris', petit ? 65 : 110),
      trait('mur-haut', fin, 70, fin, 140, 'gris'),
      rond('lumiere', debut + x * (fin - debut), 112, '●', 'orange', 14),
      texte('lumiere-label', petit ? 160 : 320, 40, 'Une impulsion lumineuse', petit ? 290 : 590, 17)];
  };
  return scene(dessiner(false), dessiner(true), bilan);
}
export const MODULES23 = {
  agent: [
    histoire('Agent', ['Percevoir\nUn obstacle', 'Choisir\nTourner', 'Agir\nLes roues tournent'], [
      ['Recevoir une information', 'Un robot doit rejoindre le quai. Son capteur lui signale une caisse devant lui.', 'Il perçoit son environnement.'],
      ['Choisir une action', 'Pour rejoindre le quai sans heurter la caisse, il choisit de tourner.', 'Son choix sert un objectif.'],
      ['Changer le monde', 'Il commande ses roues et se déplace. Un agent relie ainsi perception, choix et action.', 'Percevoir + décider + agir vers un objectif.'],
    ]),
    histoire('Capteur', ['Dans le monde\nObstacle à 2 m', 'Capteur\nMesurer', 'Information\n« 2 m »'], [
      ['Une chose à connaître', 'Une caisse se trouve devant le robot. Le programme ne voit pas directement le monde réel.', 'Il lui faut une information.'],
      ['Mesurer le monde', 'Le capteur mesure la distance jusqu’à la caisse.', 'Le capteur joue le rôle d’un sens.'],
      ['Transmettre la mesure', 'Il fournit « 2 m » au programme. Un thermomètre, une caméra ou un microphone sont aussi des capteurs.', 'Le capteur renseigne ; il ne déplace pas la caisse.'],
    ]),
    histoire('Effecteur', ['Ordre\nAvancer', 'Moteur\nTourner les roues', 'Effet\nLe robot avance'], [
      ['Préparer une action', 'Le programme décide d’avancer. Pour l’instant, ce n’est qu’un ordre.', 'Décider ne suffit pas à bouger.'],
      ['Exécuter l’ordre', 'Le moteur transforme l’ordre en rotation des roues. C’est l’effecteur.', 'L’effecteur rend l’action possible.'],
      ['Modifier l’environnement', 'Le robot change de place. Une pince qui saisit un colis est un autre exemple d’effecteur.', 'L’effecteur agit ; le capteur mesure.'],
    ]),
  ],
  lidar: [
    mot('Lidar', [
      pas('Envoyer de la lumière', 'Le lidar envoie une très courte impulsion lumineuse vers le mur. Le point orange représente cette lumière, très ralentie ici.', echo(0, 'Départ de l’impulsion : le chronomètre démarre.')),
      pas('Toucher un obstacle', 'L’impulsion atteint le mur. Une partie de la lumière est renvoyée vers le capteur.', echo(1, 'La lumière fait demi-tour sur l’obstacle.')),
      pas('Mesurer le retour', 'Le capteur reçoit l’écho. Plus l’aller-retour est long, plus l’obstacle est loin. Il divise la distance parcourue par deux.', echo(0, 'Distance au mur = vitesse de la lumière × durée / 2.')),
    ]),
    mot('Portée', [
      pas('Une limite de mesure', 'Ce capteur ne voit qu’à trois cases devant lui. Le rayon orange s’arrête à cette limite.', grille([0, 2], null, [], [], 'Portée du capteur : 3 cases.', [[3, 2]])),
      pas('Un obstacle trop loin', 'On place un obstacle à quatre cases. Il est au-delà de la portée : l’absence de détection ne signifie pas que la voie est vide.', grille([0, 2], null, [[4, 2]], [], '4 cases > 3 cases : obstacle hors de portée.', [[3, 2]])),
      pas('Se rapprocher', 'Le robot avance d’une case. L’obstacle est maintenant à trois cases, donc à portée dans ce modèle simplifié.', grille([1, 2], null, [[4, 2]], [], 'La portée reste 3 ; c’est le robot qui s’est rapproché.', [[4, 2]])),
    ]),
    mot('Rayon', [
      pas('Regarder dans une direction', 'Un rayon correspond ici à une direction de mesure : vers la droite. Il ne renseigne pas sur ce qui est derrière le robot.', grille([2, 2], null, [], [], 'Un rayon = une direction observée.', [[5, 2]])),
      pas('Changer de direction', 'On oriente la mesure vers le haut. Le capteur regarde maintenant une autre partie du monde.', grille([2, 2], null, [], [], 'Changer la direction change ce qui est vu.', [[2, 0]])),
      pas('Répartir les directions', 'Avec huit directions, le robot regarde autour de lui. Entre deux rayons, un petit obstacle peut encore ne pas être vu.', grille([2, 2], null, [], [], 'Huit rayons couvrent plusieurs directions, pas toute la surface.', [[4, 2], [4, 0], [2, 0], [0, 0], [0, 2], [1, 3], [2, 3], [3, 3]])),
    ]),
  ],
  etat: [
    histoire('État réel', ['Dans le monde\nDistance : 2 m', 'Capteur\nAffiche 2,1 m', 'Réalité\nToujours 2 m'], [
      ['Décrire la situation exacte', 'À cet instant, le mur est exactement à deux mètres du robot. C’est une partie de l’état réel du monde.', 'L’état réel existe avant la mesure.'],
      ['Recevoir une mesure imparfaite', 'Le capteur affiche 2,1 m. Cette petite erreur ne déplace pas le mur.', 'La mesure et la réalité peuvent différer.'],
      ['Distinguer les deux', 'La distance réelle reste 2 m. L’agent ne connaît souvent qu’une partie de cet état, à travers ses observations.', 'L’état réel n’est pas l’affichage du capteur.'],
    ]),
    histoire('Observation', ['Mur réel\n2 m', 'Mesure\nCapteur', 'Observation reçue\n2,1 m'], [
      ['Une réalité extérieure', 'Le robot cherche la distance du mur. Il ne peut pas lire directement la valeur réelle.', 'Le programme reçoit des mesures.'],
      ['Passer par un capteur', 'Le capteur transforme le monde physique en une information numérique.', 'Mesurer peut introduire une erreur.'],
      ['Utiliser ce qui est reçu', 'Le programme reçoit 2,1 m : c’est son observation. Il décide à partir de cette information, même si le mur est réellement à 2 m.', 'Observation = ce que le capteur rapporte.'],
    ]),
    comparer('Bruit', 3, [
      ['Mesurer une première fois', 'Le mur reste à 2 m, mais une première mesure donne 1,9 m.', [['Distance réelle', 2, 'vert'], ['Mesure', 1.9]], 'L’écart de mesure est ici −0,1 m.'],
      ['Mesurer encore', 'Sans déplacer le mur, on mesure 2,1 m. La mesure fluctue à cause de petites variations aléatoires.', [['Distance réelle', 2, 'vert'], ['Mesure', 2.1]], 'L’écart devient +0,1 m.'],
      ['Reconnaître le bruit', 'Une troisième mesure donne 2 m. Ces fluctuations constituent le bruit ; elles ne prouvent pas que le mur bouge.', [['Distance réelle', 2, 'vert'], ['Mesure', 2]], 'La réalité reste fixe, les mesures peuvent varier.'],
    ], ' m'),
  ],
  boucle: [
    histoire('Pas de temps', ['Observer\nà 0,0 s', 'Décider\npuis agir', 'Tour suivant\nà 0,2 s'], [
      ['Commencer un tour', 'Le robot lit ses capteurs au début du tour de boucle.', 'On démarre à 0,0 seconde.'],
      ['Faire évoluer le système', 'Il choisit puis applique une action. Le temps simulé avance pendant ce pas.', 'Ici, un pas représente 0,2 seconde.'],
      ['Passer au tour suivant', 'À 0,2 seconde, le robot observe de nouveau. Un pas de temps est l’intervalle entre deux tours successifs.', 'Une nouvelle observation ouvre le pas suivant.'],
    ]),
    histoire('Boucle fermée', ['But : avancer 1 m', 'Mesure : 0,8 m\nIl manque 0,2 m', 'Corriger\nAvancer encore'], [
      ['Donner un ordre', 'Le robot commande un déplacement d’un mètre.', 'Un ordre prévoit un effet.'],
      ['Vérifier l’effet réel', 'Les roues ont glissé : la nouvelle mesure indique seulement 0,8 m parcouru.', 'Le résultat revient au décideur.'],
      ['Corriger l’écart', 'Le robot avance encore de 0,2 m. La boucle est fermée parce qu’une nouvelle mesure corrige l’action suivante.', 'Agir → mesurer le résultat → corriger.'],
    ]),
    histoire('Boucle ouverte', ['But : avancer 1 m', 'Commande envoyée\nRoues en mouvement', 'Pas de mesure\nArrêt supposé au but'], [
      ['Prévoir un mouvement', 'Le robot commande un mouvement censé lui faire parcourir un mètre.', 'Le calcul suppose un sol normal.'],
      ['Agir sans retour', 'Les roues glissent et il n’avance que de 0,8 m. Mais le programme ne prend aucune nouvelle mesure.', 'La glissade reste inconnue du programme.'],
      ['Garder son erreur', 'Le robot s’arrête en pensant être arrivé. Une boucle ouverte n’utilise pas le résultat réel pour corriger l’action.', 'Sans retour de mesure, l’écart peut rester.'],
    ], 'orange'),
  ],
  reactif: [
    histoire('Réactif', ['Voir\nObstacle à gauche', 'Règle immédiate\nTourner à droite', 'Agir\nSans calcul de trajet'], [
      ['Lire le présent', 'Un obstacle apparaît à gauche. L’agent utilise ce qu’il voit maintenant.', 'La perception actuelle déclenche le comportement.'],
      ['Appliquer le réflexe', 'Sa règle dit « obstacle à gauche : tourner à droite ». Il ne compare pas des trajets complets.', 'Une réponse directe, comme un réflexe.'],
      ['Bouger tout de suite', 'Il tourne. Ce mécanisme est rapide, mais il peut ignorer qu’un peu plus loin le passage est fermé.', 'Réagir vite ne suffit pas à prévoir un détour.'],
    ]),
    mot('Minimum local', [
      pas('Se rapprocher du but', 'Le robot avance vers l’étoile en cherchant à réduire la distance à chaque pas.', couloir(1, 'La cible attire le robot vers la droite.', U)),
      pas('Atteindre un creux', 'Dans le fond du U, avancer, monter ou descendre est bloqué. La seule sortie commence par un pas vers la gauche, plus loin du but.', couloir(3, 'Aucun pas autorisé ne rapproche immédiatement du but.', U)),
      pas('Accepter de s’éloigner un peu', 'Reculer paraît moins bon à court terme, mais permet de sortir. Le minimum est local : le robot n’a pas atteint son objectif.', couloir(2, 'Il faut parfois perdre du terrain avant de progresser.', U)),
    ]),
    mot('Cul-de-sac', [
      pas('Entrer dans un passage', 'Le passage semble conduire vers l’étoile. Le robot y entre par la gauche.', couloir(1, 'Le passage possède une entrée.', U)),
      pas('Trouver le fond fermé', 'Les murs ferment le fond et les deux côtés. La cible est proche, mais inaccessible en avançant tout droit.', couloir(3, 'Le passage se termine : c’est un cul-de-sac.', U)),
      pas('Revenir vers l’entrée', 'Pour continuer, le robot doit ressortir par où il est entré, puis chercher un détour autour des murs.', couloir(1, 'Sortir exige un retour en arrière.', U)),
    ]),
  ],
  astar: [
    mot('Coût parcouru', [
      pas('Partir de zéro', 'Au départ, on n’a encore parcouru aucune arête du trajet envisagé. Chaque déplacement d’une case coûtera 1.', couloir(0, 'Coût depuis le départ : 0.')),
      pas('Ajouter un déplacement', 'Le chemin atteint la case suivante. Son coût depuis le départ vaut maintenant 1.', couloir(1, 'Coût parcouru : 1.', [], [[0, 2], [1, 2]])),
      pas('Additionner les pas', 'Cette position est atteinte en trois déplacements. A* conserve ce coût pour comparer les chemins candidats.', couloir(3, 'Coût parcouru : 3, souvent noté g.', [], [[0, 2], [1, 2], [2, 2], [3, 2]])),
    ]),
    mot('Heuristique', [
      pas('Estimer avant d’explorer', 'Le robot est à gauche et l’objectif à droite. On estime d’abord la distance directe : cinq cases.', couloir(0, 'Estimation restante : 5.', [], [])),
      pas('Rencontrer un obstacle', 'Un mur apparaît sur la route. La distance directe reste cinq, mais le vrai trajet devra faire un détour.', couloir(0, 'L’estimation ne voit pas encore tout le détour.', [[3, 2]], [])),
      pas('Comparer estimation et trajet', 'Le chemin vert contourne le mur en sept pas. L’estimation de cinq guide la recherche sans être la longueur exacte du trajet.', couloir(0, 'Heuristique : 5. Trajet trouvé : 7.', [[3, 2]], [[0, 2], [1, 2], [2, 2], [2, 1], [3, 1], [4, 1], [4, 2], [5, 2]])),
    ]),
    comparer('Score', 10, [
      ['Ce qui est déjà parcouru', 'Pour atteindre une case candidate, le chemin coûte déjà 3. Ce nombre seul ne dit pas si le but est proche.', [['Déjà parcouru', 3], ['Reste estimé', 0], ['Score', 3]], 'On connaît le début du trajet.'],
      ['Ajouter ce qui semble rester', 'L’heuristique estime encore 4 jusqu’au but. On ajoute les deux informations.', [['Déjà parcouru', 3], ['Reste estimé', 4, 'orange'], ['Score', 7]], '3 + 4 = 7.'],
      ['Comparer les candidats', 'Le score total vaut 7. A* explore en priorité les candidats de plus petit score ; ce total comprend une estimation.', [['Déjà parcouru', 3], ['Reste estimé', 4, 'orange'], ['Score', 7, 'vert']], 'Score = coût parcouru + coût restant estimé.'],
    ]),
  ],
  hybride: [
    mot('Couche délibérative', [
      pas('Connaître la carte', 'Le robot sait où sont les murs et l’objectif. Il veut prévoir plusieurs déplacements à l’avance.', grille([0, 2], [5, 2], [[3, 2]], [], 'La carte sert à réfléchir au trajet.')),
      pas('Préparer un détour', 'Le planificateur calcule un chemin qui contourne le mur. Le trajet vert décrit les futurs pas.', grille([0, 2], [5, 2], [[3, 2]], [[0, 2], [1, 2], [2, 2], [2, 1], [3, 1], [4, 1], [4, 2], [5, 2]], 'Un plan relie la position actuelle au but.')),
      pas('Suivre une direction', 'Le robot peut commencer à suivre ce plan. La couche délibérative s’occupe de cette vue d’ensemble.', grille([2, 1], [5, 2], [[3, 2]], [[0, 2], [1, 2], [2, 2], [2, 1], [3, 1], [4, 1], [4, 2], [5, 2]], 'Délibérer = préparer les actions à venir.')),
    ]),
    histoire('Couche réactive', ['Plan\nAvancer', 'Capteur\nUn chariot arrive !', 'Réflexe\nSTOP'], [
      ['Avoir une intention', 'Le trajet prévu demande d’avancer. La carte semblait libre.', 'Le plan donne une direction.'],
      ['Détecter une nouveauté', 'Un chariot passe soudain devant le robot. Le capteur reçoit une information plus récente que la carte.', 'Il faut réagir sans attendre un nouveau plan.'],
      ['Protéger immédiatement', 'La couche réactive commande l’arrêt. Elle assure la réaction rapide pendant que la planification prépare la suite.', 'Le réflexe peut suspendre le plan.'],
    ], 'orange'),
    mot('Replanification', [
      pas('Avoir un premier plan', 'Le robot a déjà avancé de deux cases sur un trajet direct vers l’étoile.', grille([2, 2], [5, 2], [], [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2]], 'Le premier plan passait tout droit.')),
      pas('Découvrir un blocage', 'Une palette bloque maintenant la prochaine case. Le trajet prévu n’est plus utilisable.', grille([2, 2], [5, 2], [[3, 2]], [[0, 2], [1, 2], [2, 2]], 'La carte est mise à jour avec l’obstacle.')),
      pas('Recalculer depuis ici', 'Le nouveau plan part de la position actuelle et contourne la palette. Il ne recommence pas forcément au point de départ initial.', grille([2, 2], [5, 2], [[3, 2]], [[2, 2], [2, 1], [3, 1], [4, 1], [4, 2], [5, 2]], 'Replanifier = recalculer le plan avec les nouvelles informations.')),
    ]),
  ],
};
