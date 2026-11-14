// Habillage pédagogique des modules 1 à 6 : objectifs observables, prérequis (leçons du module 0),
// mission d'observation de la scène 3D (prédire, observer, expliquer), erreurs fréquentes et quiz de fin.
export const PEDAGOGIE = {
  1: {
    objectifs: ["Écrire un petit système à règles et expliquer la décision qu'il rend", "Calculer une probabilité a posteriori et la relier à la prévalence", "Entraîner un classifieur et l'évaluer sur des données jamais vues", "Choisir, pour un problème donné, l'approche la plus adaptée et justifier ce choix"],
    prerequis: ['regles', 'bayes', 'reseau', 'supervise'],
    avant: "Choisissez le cas « Vibration forte, moteur tiède » dans la liste. Avant de lancer l'animation, notez la décision que vous prendriez vous-même. Vous la comparerez aux trois approches.",
    pieges: ["Chercher « la meilleure approche » dans l'absolu. Le bon choix dépend des données disponibles, du besoin d'explication et du coût d'une erreur.", "Comparer des exactitudes sans regarder quelles erreurs sont commises : arrêter un robot sain coûte moins cher que laisser rouler un robot dangereux."],
    quiz: [
      { q: "Vous devez justifier chaque décision devant un auditeur de sécurité, et vous n'avez aucune donnée historique. Quelle approche privilégier ?", ok: 0, choix: [['Un système à règles', "Exact : il ne demande aucune donnée et chaque décision se justifie par la règle déclenchée."], ['Un réseau de neurones', "Sans données d'entraînement, il n'a rien à apprendre, et ses décisions sont difficiles à justifier."], ['Peu importe', "Les deux contraintes (explication, absence de données) orientent nettement le choix."]] },
      { q: "Un capteur de panne sonne. Les pannes sont très rares. Que vaut cette alerte ?", ok: 1, choix: [['Elle est presque sûrement fondée', "Quand le problème est rare, les fausses alertes dominent."], ['Elle justifie une vérification, pas une conclusion', "Exact : la probabilité a augmenté, mais reste loin de la certitude."], ['Elle est sans valeur', "Elle a fait monter la probabilité de panne : c'est une information utile."]] },
      { q: "Votre modèle supervisé atteint 98 % sur ses données d'entraînement. Que faut-il vérifier avant de s'en réjouir ?", ok: 2, choix: [["Le temps d'entraînement", "Il ne dit rien de la qualité des décisions."], ['Le nombre de neurones', "Ce n'est pas un indicateur de qualité."], ['Son exactitude sur des données jamais vues', "Exact : c'est la seule mesure de sa capacité à généraliser."]] },
    ],
  },
  2: {
    objectifs: ["Décrire un agent par son environnement, ses capteurs, ses effecteurs et son objectif", "Lire une observation de lidar et en déduire les mouvements possibles", "Programmer une boucle perception, décision, action et l'exécuter pas à pas", "Mettre en évidence l'écart entre état réel et observation, et ses conséquences"],
    prerequis: ['agent', 'lidar', 'etat', 'boucle'],
    avant: "Avant de lancer l'animation, dessinez de mémoire le schéma d'un agent avec ses deux flux. Vous le comparerez à l'étape 1.",
    mission: [
      { faire: "Chargez « Agent complet, entrepôt de référence », cochez « Vue éclatée du robot » puis cliquez sur « Près du robot ».", question: "Quels composants du robot correspondent aux capteurs, à la décision et aux effecteurs ?", reponse: "Le lidar jaune au sommet est le capteur, le calculateur blanc porte la décision, les roues sont les effecteurs. La batterie fournit l'énergie." },
      { faire: "Revenez à la « Vue d'ensemble », décochez la vue éclatée et avancez de trois étapes avec le bouton « Étape ».", question: "Dans le panneau de droite, que valent les quatre distances du lidar ? Vérifiez-les en comptant les cases sur la scène.", reponse: "Chaque valeur est le nombre de cases jusqu'au premier obstacle. Une valeur de 6 signifie « rien dans la portée de 5 cases »." },
      { faire: "Chargez « Agent réactif, lidar bruité » et avancez étape par étape.", question: "Prédisez d'abord : le robot va-t-il suivre exactement la même trajectoire qu'avec un lidar parfait ? Puis observez.", reponse: "Non. Les rayons s'arrêtent parfois avant ou après l'obstacle réel. Le robot décide sur ces mesures faussées, ce qui peut provoquer une collision (le châssis devient rouge)." },
    ],
    pieges: ["Programmer l'agent en lisant directement la position des obstacles dans le simulateur. Un vrai robot n'a que ses capteurs.", "Oublier que l'action peut échouer : commander « avancer » ne garantit pas que le robot a avancé."],
    quiz: [
      { q: "Le lidar indique : nord 1, est 3, sud 1, ouest 2. Combien de mouvements sont possibles ?", ok: 1, choix: [['1', "Est (3) et ouest (2) sont tous deux supérieurs à 1."], ['2', "Exact : est et ouest. Nord et sud sont bloqués (distance 1)."], ['4', "Une distance de 1 signale une case voisine occupée."]] },
      { q: "Pourquoi une trace enregistre-t-elle à la fois l'état réel et l'observation ?", ok: 0, choix: [["Pour pouvoir expliquer une décision prise sur une mesure erronée", "Exact : comparer les deux montre si l'erreur vient du capteur ou de la décision."], ["Parce que l'agent utilise les deux", "L'agent n'a accès qu'à l'observation."], ['Pour occuper plus de place', "La raison est l'analyse du comportement."]] },
      { q: "Dans un système de chauffage, la sonde tombe en panne et indique toujours 15 °C. Que fait le thermostat ?", ok: 2, choix: [['Il détecte la panne', "Rien dans sa boucle ne lui permet de douter de son capteur."], ['Il s\'arrête', "Il continue d'appliquer sa règle."], ['Il chauffe sans fin', "Exact : il décide sur son observation, pas sur la température réelle."]] },
    ],
  },
  3: {
    objectifs: ["Programmer un contrôleur réactif, un contrôleur délibératif (A*) et un contrôleur hybride", "Prévoir lequel échoue dans un scénario donné et expliquer pourquoi", "Comparer des architectures sur des mesures : réussite, collisions, temps de décision", "Proposer une architecture adaptée à un cas pratique"],
    prerequis: ['boucle', 'reactif', 'astar', 'hybride'],
    avant: "Avant l'étape 4 de l'animation, remplissez mentalement le tableau : pour chaque architecture, réussite ou échec dans le cul-de-sac, puis face à la palette imprévue.",
    mission: [
      { faire: "Laissez « Agent hybride » en A et « Agent délibératif » en B. Avant de lancer la lecture, lisez la question.", question: "Prédisez : à l'étape 6, une palette tombe sur le trajet. Que fera chacun des deux robots ?", reponse: "L'hybride détecte la palette au lidar et replanifie. Le délibératif suit son plan initial sans regarder ses capteurs : il heurte la palette, puis reste décalé par rapport à son plan." },
      { faire: "Lancez la lecture, mettez en pause vers l'étape 8, puis avancez étape par étape.", question: "Dans le panneau de droite, quelle « couche active » s'affiche pour l'hybride au moment où il rencontre la palette ?", reponse: "La couche réactive : c'est elle qui bloque le mouvement prévu et déclenche la replanification. Le reste du temps, la couche délibérative suit le plan." },
      { faire: "Choisissez « Agent réactif, cul-de-sac en U » en A. La liste B ne propose plus que les exécutions du même entrepôt : prenez l'hybride.", question: "À partir de quelle étape le robot réactif cesse-t-il de progresser, et que fait-il ensuite ?", reponse: "Une fois au fond du U, il oscille entre les mêmes cases jusqu'à la fin. L'hybride, lui, contourne le mur dès le départ grâce à son plan." },
    ],
    pieges: ["Juger une architecture sur un seul scénario. Le réactif brille en zone dégagée, le délibératif dans un monde figé.", "Regarder le temps de décision moyen. Pour un système embarqué, c'est le temps maximal qui compte."],
    quiz: [
      { q: "Quelle architecture échoue dans le cul-de-sac en U, et pourquoi ?", ok: 0, choix: [['La réactive, faute de mémoire et de plan', "Exact : elle retombe indéfiniment dans le même minimum local."], ['La délibérative, faute de capteurs', "Elle connaît la carte et calcule un chemin qui contourne le U."], ["L'hybride, trop lente", "Elle dispose d'un plan et sort du piège."]] },
      { q: "Pourquoi l'agent délibératif heurte-t-il la palette ?", ok: 1, choix: [['Son algorithme A* est faux', "A* a trouvé le plus court chemin sur la carte qu'on lui a donnée."], ["Son plan repose sur une carte où la palette n'existe pas", "Exact : il exécute son plan sans le confronter à ses capteurs."], ['Il est trop rapide', "La vitesse n'est pas en cause."]] },
      { q: "Vous concevez un robot de livraison en zone piétonne. Quelle architecture proposer ?", ok: 2, choix: [['Réactive, pour la rapidité', "Sans plan, il ne trouvera pas son chemin jusqu'à une adresse."], ['Délibérative, pour l\'optimalité', "Les piétons ne sont sur aucune carte : il les heurterait."], ['Hybride : itinéraire planifié et évitement réactif', "Exact : un plan pour la destination, une garde réactive pour les imprévus."]] },
    ],
  },
  4: {
    objectifs: ["Modéliser un problème par ses variables, ses domaines, ses contraintes et son objectif", "Résoudre ce modèle avec un solveur sous contraintes", "Programmer un recuit simulé et régler sa température", "Comparer les deux approches en qualité de solution et en temps de calcul"],
    prerequis: ['espace', 'contraintes', 'recuit'],
    avant: "À l'étape 1, estimez à l'œil l'ordre de visite qui vous semble le plus court. Vous le comparerez à la solution optimale de l'étape 5.",
    pieges: ["Oublier une contrainte dans le coût du recuit : il trouvera une tournée courte mais inutilisable.", "Conclure qu'une méthode est « meilleure » sur une seule taille de problème. Les classements s'inversent quand le problème grossit."],
    quiz: [
      { q: "Le solveur CP-SAT annonce le statut OPTIMAL. Que garantit-il ?", ok: 0, choix: [["Qu'aucune meilleure solution n'existe", "Exact : il a prouvé l'optimalité en éliminant toutes les autres possibilités."], ['Que la solution est bonne, sans plus', "OPTIMAL est une preuve. Le statut FAISABLE, lui, ne garantit que le respect des contraintes."], ['Que le calcul a été rapide', "Le statut ne dit rien de la durée."]] },
      { q: "Votre recuit rend toujours la même solution médiocre. Quel réglage essayer en premier ?", ok: 1, choix: [['Baisser la température initiale', "Cela réduirait encore l'exploration."], ['Augmenter la température initiale ou ralentir le refroidissement', "Exact : il faut laisser plus de place à l'exploration avant le gel."], ['Changer de graine', "Cela donnera une autre exécution, pas une meilleure méthode."]] },
      { q: "Il faut planifier 200 collectes en moins d'une seconde, et une solution correcte suffit. Quelle méthode ?", ok: 2, choix: [['Énumérer tous les ordres', "Leur nombre dépasse tout ce qu'un ordinateur peut parcourir."], ['Exiger une preuve d\'optimalité', "À cette taille, la preuve peut demander bien plus d'une seconde."], ['Une méthode approchée comme le recuit simulé', "Exact : elle fournit vite une bonne solution, sans garantie d'optimalité."]] },
    ],
  },
  5: {
    objectifs: ["Programmer une boucle d'autonomie qui tient compte de l'incertitude", "Mettre à jour une croyance après une mesure et après un déplacement", "Comparer une politique naïve et une politique filtrée sur plusieurs graines", "Entraîner une politique par Q-learning et l'encadrer par une garde de sécurité"],
    prerequis: ['etat', 'croyance', 'qlearning', 'exploration'],
    avant: "Avant l'étape 3 de l'animation, prédisez : après un déplacement, la croyance sera-t-elle plus nette ou plus étalée ?",
    mission: [
      { faire: "Laissez « Politique améliorée » en A (bleu) et « Politique simple » en B (orange). Avancez de cinq étapes.", question: "Repérez l'anneau rouge (position mesurée) et l'anneau vert (position estimée par le filtre). Lequel est le plus proche du robot bleu ?", reponse: "L'anneau vert. La mesure brute saute d'une case à l'autre, l'estimation filtrée reste collée à la position réelle." },
      { faire: "Lancez la lecture jusqu'à la fin.", question: "Prédisez d'abord : quel robot arrivera le premier ? Puis comparez le nombre d'étapes.", reponse: "Le robot bleu arrive en beaucoup moins d'étapes. Le robot orange croit sans cesse avoir quitté son chemin et replanifie pour rien." },
      { faire: "Revenez à l'étape où la palette apparaît et lisez la décision du robot bleu.", question: "Comment le robot bleu réagit-il à l'obstacle imprévu, et sur quelle information s'appuie-t-il ?", reponse: "Le lidar signale la case occupée, la couche réactive bloque le mouvement et un détour est calculé depuis la position estimée par le filtre." },
    ],
    pieges: ["Faire confiance à la dernière mesure. Une mesure isolée est bruitée : c'est leur accumulation qui informe.", "Déployer une politique apprise sans garde de sécurité. Elle n'a appris que les situations rencontrées pendant l'entraînement."],
    quiz: [
      { q: "Dans le filtre bayésien, quelle étape utilise le modèle de déplacement du robot ?", ok: 0, choix: [['La prédiction', "Exact : elle décale la croyance selon l'action, en tenant compte du glissement."], ['La correction', "La correction utilise le modèle du capteur, pas celui du déplacement."], ['Aucune', "Le filtre repose sur deux modèles : déplacement et capteur."]] },
      { q: "Pourquoi l'agent naïf met-il plus de temps à arriver ?", ok: 1, choix: [['Il roule moins vite', "Les deux robots ont la même vitesse."], ['Il replanifie sans cesse à cause de mesures de position erronées', "Exact : chaque saut de la mesure lui fait croire qu'il a quitté son chemin."], ['Son lidar est moins bon', "Les capteurs sont identiques, c'est l'usage des mesures qui diffère."]] },
      { q: "Un agent entraîné par renforcement dans un entrepôt vide est mis en service au milieu de chariots. Que prévoir ?", ok: 2, choix: [['Rien, il a appris', "Il n'a jamais rencontré de chariot pendant son apprentissage."], ['Un nouvel entraînement suffit toujours', "Utile, mais insuffisant : aucune garantie sur les cas non rencontrés."], ['Une garde réactive qui bloque les mouvements dangereux', "Exact : la politique apprise propose, la garde de sécurité vérifie."]] },
    ],
  },
  6: {
    objectifs: ["Concevoir une grille de scénarios de test, du nominal aux limites", "Lancer une campagne de simulations et en mesurer les résultats", "Présenter un taux de réussite avec son intervalle de confiance", "Rejouer un échec et rédiger un rapport de validation"],
    prerequis: ['confiance', 'robustesse', 'graine'],
    avant: "Avant l'étape 4, tracez à main levée la courbe du taux de réussite que vous attendez quand les perturbations augmentent : droite, courbe douce ou chute brutale ?",
    mission: [
      { faire: "Laissez « Scénario limite, après correction » en A et « avant correction » en B. Lancez la lecture.", question: "Prédisez d'abord : lequel des deux robots aura des collisions ? Repérez-les : le châssis devient rouge.", reponse: "Le robot orange (avant correction) subit plusieurs collisions et met environ deux fois plus d'étapes. Le robot bleu arrive sans collision." },
      { faire: "Revenez sur une collision du robot orange avec le curseur, puis avancez étape par étape.", question: "Comparez sa « position réelle » et sa « position observée » dans le panneau. Qu'est-ce qui explique la collision ?", reponse: "Il se croit sur une autre case que celle où il se trouve. Sa décision est cohérente avec sa mesure, mais la mesure est fausse." },
      { faire: "Chargez le « Scénario nominal », avant et après correction.", question: "Les deux robots se distinguent-ils ? Qu'en concluez-vous sur la façon de tester ?", reponse: "Non : en conditions nominales, ils font exactement le même trajet. Seuls les scénarios dégradés révèlent la différence." },
    ],
    pieges: ["Présenter une démonstration réussie comme une validation. Une exécution n'est qu'un tirage parmi d'autres.", "Corriger un échec sans pouvoir le rejouer. Sans graine ni trace, impossible de vérifier que la correction agit."],
    quiz: [
      { q: "Votre agent réussit 19 simulations sur 20. Que pouvez-vous affirmer ?", ok: 1, choix: [['Son taux de réussite est de 95 %', "C'est le taux mesuré, mais avec 20 essais l'incertitude est très large."], ["Trop peu d'essais pour conclure : il faut une campagne plus large", "Exact : avec 20 essais, le vrai taux peut être très inférieur à 95 %."], ['Il est validé', "Aucune validation ne repose sur 20 essais en conditions nominales."]] },
      { q: "Que doit contenir un scénario de test de niveau « limite » ?", ok: 2, choix: [['Les conditions habituelles', "Ce sont les conditions nominales."], ['Des conditions impossibles', "Un test irréaliste n'apprend rien sur le comportement en service."], ['Les pires conditions réalistes : bruit fort, glissement, obstacles nombreux', "Exact : on cherche le point où les performances se dégradent."]] },
      { q: "Après une correction, comment vérifier qu'elle n'a rien cassé ?", ok: 0, choix: [['Relancer toute la campagne avec les mêmes graines et comparer aux seuils', "Exact : c'est un test de non-régression, rendu possible par la reproductibilité."], ["Tester seulement le cas qui échouait", "La correction peut dégrader d'autres scénarios."], ['Faire confiance à la correction', "Seule la mesure permet de l'affirmer."]] },
    ],
  },
};
