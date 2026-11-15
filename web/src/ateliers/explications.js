// Pourquoi la solution, ligne par ligne. Chaque entrée est affichée dans l'atelier dès que la construction
// est validée, que l'apprenant l'ait devinée ou qu'il ait utilisé le bouton « Voir la solution ».
// Une ligne = une décision de la solution de référence, avec la raison qui la rend exacte.
// Les textes n'utilisent ni tiret cadratin ni tiret demi-cadratin (contrôle du contenu).
export const EXPLICATIONS = {
  // ------------------------------------------------------------------ Module 1
  bayes: {
    intro: "La solution de référence, décision par décision. D'autres dispositifs peuvent tenir le cahier des charges : ce qui compte est la raison de chaque choix.",
    lignes: [
      {
        choix: "Caméra simple : 0,02 € par colis",
        pourquoi: "Elle détecte 95 % des défauts et ne signale à tort que 5 % des colis conformes au réglage intermédiaire. C'est le détecteur le moins cher : à 2 centimes par colis, il reste de quoi payer la confirmation des seuls colis signalés.",
      },
      {
        choix: "Réglage intermédiaire",
        pourquoi: "C'est le meilleur compromis de cette caméra : le réglage sensible signalerait 10 % des colis conformes, le réglage strict laisserait passer 15 % des défauts. Or un défaut que le détecteur ne signale pas n'est jamais rattrapé ensuite.",
      },
      {
        choix: "Pesée de contrôle des colis signalés",
        pourquoi: "Elle ne dépend pas de ce que la caméra a vu : elle confirme 96 % des colis défectueux et n'accepte que 3 % des conformes. C'est cette indépendance qui fait passer la part d'alertes fondées au-dessus de 90 %, pour 0,40 € par colis signalé. Un second passage devant le même détecteur ne servirait à rien : il se tromperait de la même façon.",
      },
    ],
  },
  reseau: {
    intro: "Les huit flèches possibles, et la raison de chaque choix. Le réseau doit prédire les neuf constats avec le moins de probabilités possible.",
    lignes: [
      {
        choix: "Sol humide vers patinage",
        pourquoi: "Le sol humide est une cause directe du patinage : les mesures le montrent, et sur site, arroser le sol fait patiner le robot. La flèche va de la cause vers l'effet.",
      },
      {
        choix: "Sol humide vers détecteur actif",
        pourquoi: "Le sol humide déclenche aussi le détecteur actif. Déclencher le détecteur à la main ne change pas l'humidité du sol : c'est bien l'humidité qui active le détecteur, et non l'inverse.",
      },
      {
        choix: "Patinage et détecteur : aucun lien direct",
        pourquoi: "Ce sont deux effets d'une même cause, le sol humide. Les relier prédirait qu'ils restent liés sur sol humide, alors que le constat 2 les dit indépendants une fois le sol connu. Cette flèche ferait aussi grimper le nombre de probabilités.",
      },
      {
        choix: "Sol humide et retard : aucun lien direct",
        pourquoi: "L'humidité agit sur le retard par le patinage. Une flèche directe doublerait la table du retard et ferait croire à une cause directe qui n'existe pas.",
      },
      {
        choix: "Patinage vers retard",
        pourquoi: "Parmi les trajets avec patinage, le retard est plus fréquent, et le patinage précède le retard. C'est la cause directe du retard.",
      },
      {
        choix: "Détecteur et retard : aucun lien direct",
        pourquoi: "Le détecteur n'agit pas sur le retard. Leur lien apparent vient du sol humide, qui active l'un et provoque l'autre. Une fois le sol connu, le constat 5 les dit indépendants.",
      },
      {
        choix: "Batterie faible vers retard",
        pourquoi: "Une batterie faible pousse le robot à ralentir ou à s'arrêter pour économiser son énergie : c'est une cause directe du retard, vérifiée par le constat 6.",
      },
      {
        choix: "Batterie et patinage : aucun lien direct",
        pourquoi: "Les mesures ne montrent aucun lien entre la batterie et le patinage. Les relier ajouterait une dépendance fausse et une table inutile.",
      },
    ],
  },
  utilite: {
    intro: "Un seuil par chargement, calculé à partir du coût des deux erreurs. Le seuil d'équilibre est le prix d'un arrêt inutile divisé par la somme des deux prix.",
    lignes: [
      {
        choix: "Produits fragiles : seuil 5 %",
        pourquoi: "Un arrêt inutile coûte 5 €, une défaillance non arrêtée 95 €. Le seuil où les deux décisions coûtent autant est 5 / (5 + 95) = 5 %. En dessous, on arrête trop ; au-dessus, on laisse passer des casses qui coûtent dix-neuf fois plus cher qu'un arrêt.",
      },
      {
        choix: "Cartons de vêtements : seuil 50 %",
        pourquoi: "Arrêt inutile et défaillance coûtent tous deux 20 €. Le seuil d'équilibre est 20 / (20 + 20) = 50 % : aucune raison de pencher d'un côté plutôt que de l'autre.",
      },
      {
        choix: "Produits frais urgents : seuil 75 %",
        pourquoi: "Un arrêt inutile coûte 60 €, une défaillance 20 € : il vaut mieux laisser passer une alerte douteuse que d'arrêter à tort. Le seuil est 60 / (60 + 20) = 75 %.",
      },
    ],
  },
  supervise: {
    intro: "Chaque lot, son rôle et la raison de ce rôle. Les sept lignes forment un jeu d'entraînement qui couvre le terrain et un test que le modèle n'a jamais vu.",
    lignes: [
      {
        choix: "Tournées de jour : entraînement",
        pourquoi: "Des situations de jour, étiquetées par la cheffe de quai : c'est la condition majoritaire du terrain, et les étiquettes font autorité. Elles apprennent au modèle ce qu'est un robot qui doit s'arrêter.",
      },
      {
        choix: "Export du 2 juillet : écarté",
        pourquoi: "400 situations, 78 % étiquetées « arrêter » : la base des tournées de jour, exportée une seconde fois, avec les mêmes robots, les mêmes dates et les mêmes mesures. Inutile de répéter les mêmes lignes : statistiquement, elles n'apprennent rien de plus que les premières et donnent un poids indu au jour.",
      },
      {
        choix: "Tournées de nuit : entraînement",
        pourquoi: "Le terrain comprend des tournées de nuit, plus froides. Sans exemples nocturnes, le modèle ne saurait pas reconnaître les situations de nuit et se tromperait sur une partie du terrain.",
      },
      {
        choix: "Semaine calme : écarté",
        pourquoi: "Une semaine sans incident ne contient presque que des « continuer » : le modèle y apprendrait à ne jamais arrêter. Ses étiquettes ne représentent pas les journées ordinaires.",
      },
      {
        choix: "Saisie rapide : écarté",
        pourquoi: "Un tiers des « arrêter » y sont saisis « continuer ». Ces étiquettes fausses enseigneraient au modèle à laisser passer des situations dangereuses.",
      },
      {
        choix: "Entrepôt voisin : écarté",
        pourquoi: "Les étiquettes viennent d'un autre entrepôt, au sol plus glissant, où l'on n'arrête pas les robots au même seuil. Elles ne valent pas pour celui-ci.",
      },
      {
        choix: "Échantillon de contrôle : test",
        pourquoi: "Tiré au hasard sur toute l'année, jour et nuit, et étiqueté séparément par deux expertes : jamais montré à l'entraînement, il mesure ce que le modèle vaut sur des situations qu'il n'a pas vues. C'est le juge honnête de l'exactitude.",
      },
    ],
  },
  recommandation: {
    intro: "Trois réglages, du plus structurant au plus fin. Le recommandeur compare des goûts, pas des sévérités de notation.",
    lignes: [
      {
        choix: "Notes centrées sur la moyenne de chacun",
        pourquoi: "Deux utilisateurs aux mêmes goûts, l'un sévère et l'autre généreux, ne se ressemblent pas si l'on compare leurs notes brutes. Centrer chaque note sur la moyenne de son auteur compare les goûts, pas la sévérité.",
      },
      {
        choix: "3 voisins retenus",
        pourquoi: "Un seul voisin recopie son humeur du jour ; trop de voisins mélangent des goûts opposés. Trois suffisent à moyenner sans noyer les ressemblances, et c'est le réglage qui donne ici l'erreur la plus faible.",
      },
      {
        choix: "2 séries communes exigées",
        pourquoi: "Avec une seule série en commun, deux personnes peuvent se ressembler par hasard. Deux séries suffisent à vérifier la ressemblance sans écarter ceux qui ont peu noté ; exiger davantage laisse des notes sans prédiction.",
      },
    ],
  },

  // ------------------------------------------------------------------ Module 2
  agent: {
    intro: "Dix équipements, chacun parce qu'une des six situations l'exige. Ce qui n'est pas embarqué ne sert aucune situation.",
    lignes: [
      {
        choix: "Récepteur GPS",
        pourquoi: "La croisière vers le client et le retour à la base exigent de savoir où l'on est : sans position, le drone s'égare.",
      },
      {
        choix: "Caméra couleur",
        pourquoi: "Elle perçoit l'image du sol le jour, nécessaire pour trouver la zone de dépose sous le drone.",
      },
      {
        choix: "Lidar",
        pourquoi: "Il mesure la distance aux obstacles : sans lui, la grue imprévue sur la route est invisible et le drone la heurte.",
      },
      {
        choix: "Télémètre pointé vers le sol",
        pourquoi: "Il donne la hauteur au-dessus du sol : sans lui, le colis est lâché de trop haut.",
      },
      {
        choix: "Centrale inertielle",
        pourquoi: "Elle perçoit l'inclinaison : sans elle, la rafale de vent de travers renverse le drone.",
      },
      {
        choix: "Jauge de batterie",
        pourquoi: "Elle donne l'énergie restante : sans elle, le drone ne sait pas s'il peut rentrer à la base.",
      },
      {
        choix: "Quatre hélices motorisées",
        pourquoi: "Elles permettent de voler et de se diriger : c'est l'effecteur présent dans toutes les situations de la mission.",
      },
      {
        choix: "Moteurs à réserve de poussée",
        pourquoi: "Ils permettent de se redresser dans une rafale : les hélices seules ne suffisent pas à contrer la bourrasque.",
      },
      {
        choix: "Pince de largage",
        pourquoi: "Elle permet de lâcher le colis à destination, une fois la hauteur et la zone vérifiées.",
      },
      {
        choix: "Projecteur",
        pourquoi: "Il éclaire le sol la nuit : avec la caméra, il donne la vision nocturne. La caméra thermique ferait aussi l'affaire, mais elle coûte 240 € contre 90 € pour la caméra et le projecteur, et pèse 20 g de moins.",
      },
    ],
  },
  lidar: {
    intro: "Trois réglages liés : le nombre de rayons décide de ce que l'on voit, la portée de la distance à laquelle on le voit, la vitesse de la distance nécessaire pour s'arrêter.",
    lignes: [
      {
        choix: "16 rayons",
        pourquoi: "Un rayon tous les 22,5° : l'obstacle qui arrive en diagonale est vu avant le contact. Avec 4 rayons, il passe entre deux faisceaux ; avec 32, on double le coût de calcul sans gagner sur ces scènes.",
      },
      {
        choix: "Portée de 5 cases",
        pourquoi: "À 2 cases par seconde, la distance d'arrêt est de 3 cases : 5 cases laissent le temps de voir et de freiner. Une portée plus courte ne voit l'obstacle qu'au dernier moment ; une portée plus grande multiplie les points par rayon et rapproche le calculateur de sa limite.",
      },
      {
        choix: "Vitesse de 2 cases par seconde",
        pourquoi: "C'est la cadence minimale de l'entrepôt. À 3 cases par seconde, la distance d'arrêt passe à 6 cases : il faudrait une portée plus grande, donc plus de points, et le calculateur sature. À 1 case par seconde, la cadence n'est pas tenue.",
      },
    ],
  },
  etat: {
    intro: "Deux réglages qui se répondent : le nombre de mesures ramène le bruit, la marge couvre ce qui reste et le trajet parcouru pendant le lot.",
    lignes: [
      {
        choix: "5 mesures moyennées",
        pourquoi: "La moyenne de 5 mesures ramène le bruit de 0,20 m à 0,09 m, tout en ne faisant avancer le robot que de 0,125 m entre deux décisions. Moins de mesures laisse trop d'incertitude ; plus de mesures allonge le trajet à l'aveugle et décale la moyenne derrière la position réelle.",
      },
      {
        choix: "Marge de sécurité de 0,32 m",
        pourquoi: "Elle couvre l'incertitude restante, environ 0,09 m, et les 0,125 m parcourus pendant le lot, avec un peu de réserve. Sans marge, les collisions dépassent le plafond ; avec une marge plus grande, trop d'arrêts se font hors de portée du bras.",
      },
    ],
  },
  boucle: {
    intro: "Quatre choix de programmation. Le programme obtenu est réellement exécuté sur le couloir libre, le sol glissant et le chariot qui traverse.",
    lignes: [
      {
        choix: "Percevoir à chaque tour",
        pourquoi: "Le monde change : le sol glisse, un chariot débouche. Une perception unique au départ laisse le robot conduire sur une image périmée.",
      },
      {
        choix: "Décider sur la dernière observation",
        pourquoi: "Le plan calculé au départ ignore le chariot. Décider sur ce que le robot voit lui permet de s'arrêter à temps, au lieu de suivre une trajectoire devenue fausse.",
      },
      {
        choix: "S'arrêter quand l'observation indique le quai",
        pourquoi: "Un compte de tours ou une distance commandée suppose que les roues avancent exactement comme prévu. Sur sol glissant, seul « le quai est là » dit la vérité.",
      },
      {
        choix: "Période de 0,2 s",
        pourquoi: "À 1 m par seconde, le robot avance de 0,2 m par tour. Le chariot débouche 0,4 s avant le contact : la boucle dispose de deux décisions pour réagir. À 1 s, elle agit un mètre plus loin, après le choc.",
      },
    ],
  },

  // ------------------------------------------------------------------ Modules 3, 4 et 5
  astar: {
    intro: "Trois réglages de la recherche. Le chemin doit rester le plus court, la garantie doit tenir partout, et l'exploration doit rester sous le plafond.",
    lignes: [
      {
        choix: "Heuristique de Manhattan",
        pourquoi: "Sur une grille où l'on avance case par case, la distance de Manhattan compte exactement les pas restants quand aucun mur ne gêne. Elle ne dépasse jamais la distance réelle : A* reste optimal. La distance à vol d'oiseau est admissible mais trop optimiste ; l'écart de colonnes ignore les changements de ligne.",
      },
      {
        choix: "Facteur 1",
        pourquoi: "Multiplier l'estimation par plus de 1 peut faire paraître une case plus coûteuse qu'elle ne l'est et faire rendre un chemin plus long : la garantie tombe. Le facteur 1 garde l'estimation sous la distance réelle.",
      },
      {
        choix: "Départager par l'estimation la plus faible",
        pourquoi: "À score égal, la case la plus proche de l'objectif a le plus de chances de mener au but. La sortir d'abord évite d'explorer les culs-de-sac ; sortir la plus ancienne ou la plus proche du départ disperse la recherche.",
      },
    ],
  },
  hybride: {
    intro: "Cinq choix d'arbitrage entre le plan et la garde réactive. Le plan propose, la mesure la plus récente décide.",
    lignes: [
      {
        choix: "Priorité à la garde réactive",
        pourquoi: "Le lidar voit l'obstacle maintenant ; le plan vient d'une carte qui peut être périmée. Pour éviter la collision, c'est la mesure la plus récente qui doit avoir le dernier mot.",
      },
      {
        choix: "Distance de garde de 1 case",
        pourquoi: "Un obstacle à une case est exactement celui qui bloque le prochain pas. À 2 cases ou plus, le robot s'arrête devant un couloir encore libre et n'atteint jamais le quai.",
      },
      {
        choix: "Après un blocage : attendre un peu, puis replanifier",
        pourquoi: "Un chariot traverse en 2 pas : attendre un peu évite un détour inutile. Attendre sans fin ne résout ni la palette tombée ni le cul-de-sac, qui ne bougeront pas.",
      },
      {
        choix: "Patience de 2 pas",
        pourquoi: "Deux pas laissent passer le chariot ; au-delà, le robot perd du temps devant un obstacle fixe. C'est le plus petit délai qui suffit au scénario.",
      },
      {
        choix: "Mémoire de l'obstacle jusqu'à la fin",
        pourquoi: "Une fois l'obstacle vu, il faut le garder sur la carte : sans mémoire, A* rend le même plan et le robot bute indéfiniment. L'oublier au bout de 3 pas le ramène dans le cul-de-sac.",
      },
    ],
  },
  espace: {
    intro: "Quatre poids dans la fonction de coût. Chacun traduit une exigence de l'exploitant, et aucun ne doit déplacer la tournée au-delà de ce qu'il demande.",
    lignes: [
      {
        choix: "Distance : poids 1",
        pourquoi: "Chaque mètre parcouru coûte 1 : c'est le terme de base, qui départage les tournées autrement égales et évite les détours gratuits.",
      },
      {
        choix: "Retard : poids 5",
        pourquoi: "Une seconde de retard vaut 5 m de détour : assez pour servir la station U à l'heure, sans imposer n'importe quel détour. Sans ce terme, la tournée la moins chère ignore l'urgence.",
      },
      {
        choix: "Passages : poids 20",
        pourquoi: "Un passage en zone piétonne vaut 20 m : plus cher qu'un détour raisonnable, moins qu'un retard. La tournée n'y passe qu'une fois, le strict nécessaire.",
      },
      {
        choix: "Énergie : poids 0",
        pourquoi: "L'exploitant ne demande rien sur l'énergie. En ajoutant un poids, on déplace la tournée vers un autre compromis sans nécessité : la solution retenue laisse l'énergie hors du coût.",
      },
    ],
  },
  croyance: {
    intro: "Un couloir aménagé et un réglage de confiance. Les portes doivent rendre chaque départ reconnaissable, le filtre doit croire le capteur à sa vraie fiabilité.",
    lignes: [
      {
        choix: "Portes aux cases 1, 5 et 6, murs ailleurs",
        pourquoi: "Trois portes irrégulièrement espacées suffisent à donner à chaque case de départ une suite de lectures qui n'appartient qu'à elle. Espacées régulièrement, deux départs décalés d'un même intervalle liraient la même chose ; en poser davantage coûte sans lever d'ambiguïté.",
      },
      {
        choix: "Confiance de 90 % dans le capteur",
        pourquoi: "Le capteur lit juste 9 fois sur 10 : c'est sa fiabilité réelle. À 50 %, le filtre tient chaque lecture pour un tirage à pile ou face et ignore les mesures ; à 100 %, une seule lecture fausse suffit à exclure la vraie case, ce que le cahier des charges interdit.",
      },
    ],
  },

  // ------------------------------------------------------------------ Module 6
  exploration: {
    intro: "Trois réglages de la stratégie ε-glouton. Il faut beaucoup explorer au début, exploiter ensuite, et garder assez de curiosité pour remarquer un changement.",
    lignes: [
      {
        choix: "ε initial de 1",
        pourquoi: "Au départ, l'agent ne connaît la valeur d'aucun couloir : il doit tous les essayer. Commencer à 1 garantit que chacun est tiré, et que le couloir B est découvert pendant la période d'essai.",
      },
      {
        choix: "Décroissance de 0,98",
        pourquoi: "Elle réduit la part d'exploration progressivement : encore 13 % au trajet 100, puis le plancher prend le relais. Une décroissance plus rapide fige l'agent sur le premier couloir venu ; plus lente, il explore trop pendant le service.",
      },
      {
        choix: "Plancher de 0,08",
        pourquoi: "Il reste 8 % de trajets au hasard : assez pour remarquer que le couloir C a été dégagé après le trajet 400, sans sacrifier la récompense des 100 derniers trajets. Sans plancher, l'agent ne redécouvre jamais le changement.",
      },
    ],
  },
  confiance: {
    intro: "Une taille de campagne et une règle d'acceptation. Le taux mesuré sur un échantillon varie : la règle doit en tenir compte.",
    lignes: [
      {
        choix: "200 simulations par campagne",
        pourquoi: "Avec 200 essais, la demi-largeur de l'intervalle à 95 % vaut environ 3,8 points pour un agent à 92 % : assez pour séparer 92 % de 84 %, sans dépasser le budget de 250 simulations.",
      },
      {
        choix: "Accepter sur la borne basse de l'intervalle",
        pourquoi: "Le taux mesuré sur 200 essais varie de plusieurs points d'une campagne à l'autre. La borne basse retranche cette incertitude : un agent à 84 % ne passe plus grâce à un bon tirage. Le taux seul accepte trop souvent l'agent insuffisant.",
      },
      {
        choix: "Seuil de 85 %",
        pourquoi: "Il place la borne basse à 85 % : un agent vraiment à 92 % la dépasse dans la grande majorité des campagnes, un agent à 84 % la dépasse rarement. Exiger 90 % sur la borne serait trop sévère et refuserait le bon agent.",
      },
    ],
  },
  robustesse: {
    intro: "Trois niveaux, du plus doux au pire cas réaliste. Chaque niveau doit apprendre quelque chose que les autres ne montrent pas.",
    lignes: [
      {
        choix: "Nominal : 0 cm, 0 %, 0 chariot, seuil 95 %",
        pourquoi: "Conditions de conception : aucun bruit, sol sec, aucun chariot. C'est la référence ; on y exige 95 %, car un agent qui échoue déjà ici ne mérite pas d'aller plus loin.",
      },
      {
        choix: "Dégradé : 5 cm, 15 %, 4 chariots, seuil 80 %",
        pourquoi: "Sévérité intermédiaire de 36 % : les deux agents se séparent déjà, 87 % pour le robuste et 39 % pour le naïf. Le seuil de 80 % accepte le premier et refuse le second.",
      },
      {
        choix: "Limite : 10 cm, 45 %, 16 chariots, seuil 60 %",
        pourquoi: "Pires valeurs réalistes, sévérité 100 % : le robuste tient encore 69 %, le naïf s'effondre à 5 %. Exiger 60 % laisse passer le robuste et arrête le naïf.",
      },
    ],
  },
  graine: {
    intro: "Une graine fixée au bon endroit et quatre informations conservées. La trace complète n'est pas stockée : elle se régénère.",
    lignes: [
      {
        choix: "Graine fixée avant la création du scénario",
        pourquoi: "La première opération qui utilise le hasard est la création du scénario, qui place les chariots. Fixer la graine avant elle rend reproductibles à la fois le scénario et la simulation.",
      },
      {
        choix: "Conserver la graine de l'essai",
        pourquoi: "C'est elle qui permet de retrouver les mêmes tirages. Sans elle, le rejeu part d'une autre suite de nombres et raconte une autre histoire.",
      },
      {
        choix: "Conserver les paramètres du scénario",
        pourquoi: "Le niveau de test, bruit, glissement et chariots, change le déroulement. Sans eux, le rejeu prend le niveau par défaut et ne reproduit pas l'échec.",
      },
      {
        choix: "Conserver la version de l'agent",
        pourquoi: "La campagne a été menée avec l'agent v1.3 ; l'équipe livre v1.4. Rejouer avec la version actuelle ne dit pas pourquoi l'essai a échoué à l'époque.",
      },
      {
        choix: "Conserver le bilan, pas la trace complète",
        pourquoi: "Le bilan suffit à repérer l'essai en échec ; la trace se régénère à l'identique lors du rejeu. La stocker coûterait 2 400 octets par essai, au-delà du plafond de 150.",
      },
    ],
  },

  // ------------------------------------------------------------------ Module 7
  composantes: {
    intro: "Cinq composantes, et pour chacune ce qui serait perdu sans elle. Retirez une seule ligne, et l'agent se trompe ou cesse d'agir.",
    lignes: [
      {
        choix: "Perçoit : formulaire et retours de la responsable",
        pourquoi: "Le formulaire porte la demande ; les retours de la responsable permettent de tenir le planning à jour après une validation. Sans eux, l'agent croit que les congés validés n'existent pas.",
      },
      {
        choix: "Tient à jour : soldes et planning",
        pourquoi: "Les deux règles du cahier des charges lisent le solde et le nombre de présents. Sans ces deux états, l'agent ne peut ni refuser un solde insuffisant ni éviter de passer sous 3 présents.",
      },
      {
        choix: "Règles : solde insuffisant et moins de 3 présents",
        pourquoi: "Ce sont les deux seules règles exigées. La règle « un collègue déjà absent » est plus stricte que le cahier des charges et refuserait des congés autorisés.",
      },
      {
        choix: "Actions : répondre, inscrire, transmettre",
        pourquoi: "Répondre clôt la demande, inscrire met le planning et le solde à jour, transmettre passe la main pour les congés longs. Sans l'une des trois, une demande reste sans effet ou sans réponse.",
      },
      {
        choix: "Exécute seul : les refus et les congés de 2 jours au plus",
        pourquoi: "L'agent accorde seul les congés courts et soumet les plus longs. Il traite ainsi 9 demandes sur 12, laisse 3 validations à la responsable pour un maximum de 4, et aucun congé long n'est inscrit sans elle.",
      },
    ],
  },
  implementation: {
    intro: "Cinq choix d'écriture de la fonction traiter. Chaque dossier doit recevoir une décision, et le journal doit dire ce qui s'est passé même si le traitement s'interrompt.",
    lignes: [
      {
        choix: "Dossier inconnu : l'orienter vers la file humaine",
        pourquoi: "Un dossier qu'aucune règle ne reconnaît ne peut pas être routé avec certitude. L'envoyer à la file humaine est la seule issue qui ne décide pas au hasard et ne s'arrête pas sur une exception.",
      },
      {
        choix: "Journal : une ligne après chaque étape",
        pourquoi: "Si la fonction s'interrompt sur une panne, une ligne écrite à la fin ne verrait jamais le jour. Une ligne après chaque étape laisse une trace exploitable quoi qu'il arrive ensuite.",
      },
      {
        choix: "Agent en panne : escalader vers un humain",
        pourquoi: "Un agent en panne ne rend pas d'avis. Continuer avec les autres ferait décider sur deux avis au lieu de trois, sans que personne le sache ; transmettre à un humain est la réponse prévue au doute.",
      },
      {
        choix: "Désaccord : escalader vers un humain",
        pourquoi: "Deux avis sur trois ne font pas une certitude. Un désaccord est précisément le cas où le système ne sait pas trancher : il doit passer la main.",
      },
      {
        choix: "Modération : après l'arbitrage, sur la décision rédigée",
        pourquoi: "C'est la décision rédigée qui sort du système, et c'est elle qui peut contenir une donnée personnelle ou dépasser le plafond. Contrôler les avis avant l'arbitrage ne voit ni la réponse finale ni la fuite.",
      },
    ],
  },
  evaluation: {
    intro: "Cinq instruments pour 15 jours sur 16. Chacun révèle un défaut qu'aucun autre ne voit.",
    lignes: [
      {
        choix: "Suivi du délai de traitement, 1 jour",
        pourquoi: "Le délai moyen ne laisse aucune trace dans le journal des files ; seul un suivi dédié révèle que les trois avis successifs ralentissent le traitement.",
      },
      {
        choix: "Banc de 1 000 messages étiquetés, 4 jours",
        pourquoi: "Des messages dont la bonne file est connue disent si le routeur choisit la bonne, y compris quand un message est traité sans être renvoyé : le journal seul ne voit pas cette erreur silencieuse.",
      },
      {
        choix: "Sondage de 200 accords unanimes, 4 jours",
        pourquoi: "Quand les trois agents apprennent sur les mêmes données, ils se trompent ensemble et le désaccord ne se déclenche jamais. Un humain qui recontrôle un échantillon d'accords unanimes révèle ces erreurs corrélées.",
      },
      {
        choix: "Revue humaine des actions bloquées, 3 jours",
        pourquoi: "Le comptage des blocages ne dit pas s'ils sont justifiés. La revue humaine distingue les actions légitimes bloquées des actions à risque réellement arrêtées.",
      },
      {
        choix: "Banc de 100 actions à risque connues, 3 jours",
        pourquoi: "Ces actions mesurent ce que le modérateur laisse passer. Sans elles, un modérateur trop permissif ne produit aucun blocage et paraît irréprochable.",
      },
    ],
  },
  casusage: {
    intro: "Six décisions pour un système complet. Chacune place le contrôle ou l'humain là où il coûte moins que l'erreur qu'il évite.",
    lignes: [
      {
        choix: "Diffusion du risque : trois avis pour les dossiers à risque",
        pourquoi: "Le vote réduit l'erreur là où elle coûte le plus cher : 250 dossiers à risque par jour. Le réserver à ces dossiers coûte 750 avis au lieu de 3 000, et laisse les 750 dossiers ordinaires à un seul avis.",
      },
      {
        choix: "Contrôle après l'extraction",
        pourquoi: "L'extraction du texte libre est l'étape la plus fragile, fiable à 95 %. Un contrôle humain y rattrape 9 erreurs sur 10 pour 300 € par jour, moins que les erreurs qu'il évite.",
      },
      {
        choix: "Contrôle après le scoring",
        pourquoi: "Le scoring est fiable à 98 %, mais ses erreurs pèsent lourd sur les dossiers à risque. Le contrôle y est rentable, alors qu'après l'enrichissement ou la validation, fiables à plus de 99 %, il coûte plus qu'il n'évite.",
      },
      {
        choix: "Seuil de confiance de 95 %",
        pourquoi: "Au-dessus de 95 % de confiance, le système exécute ; en dessous, un humain valide. Une erreur coûte 60 €, une validation 3 € : le seuil place la frontière là où la validation devient moins chère que le risque.",
      },
      {
        choix: "LLM en interface, pas en décideur",
        pourquoi: "Le LLM lit le texte libre et explique la décision, mais ne décide pas. Les règles et le score restent la source de la décision, ce qui la rend justifiable devant l'usager.",
      },
      {
        choix: "Modération des données personnelles",
        pourquoi: "Le masquage automatique supprime les données personnelles de chaque réponse pour 20 € par jour. La relecture humaine coûterait 1 000 validations de plus et saturerait l'équipe ; ne rien faire laisserait 20 fuites par jour.",
      },
    ],
  },
};
