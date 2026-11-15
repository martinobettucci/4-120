// Bloc 0 de chaque leçon : la notion en bref, avant toute mise en situation.
// Deux paragraphes (ce que c'est, puis d'où cela vient et à quoi cela sert) et un ou plusieurs liens Wikipédia
// pour en savoir plus : en français quand la page existe, en anglais sinon ou quand la page anglaise est plus précise.
// Les textes sont rédigés pour la formation. L'existence de chaque page se contrôle par « node tools/verifier_contenu.cjs --liens ».
const W = (titre, langue = 'fr') => ({ titre, langue, url: `https://${langue}.wikipedia.org/wiki/${encodeURIComponent(titre.replace(/ /g, '_'))}` });

export const DEFINITIONS = {
  // ------------------------------------------------------------------ Module 1
  regles: {
    texte: [
      "Un système expert, ou système à base de règles, est un logiciel qui reproduit le raisonnement d'un spécialiste dans un domaine précis. Il sépare une base de connaissances, faite de faits et de règles de la forme « si condition alors conclusion », et un moteur d'inférence qui applique ces règles aux faits observés pour en tirer une décision.",
      "C'est l'une des plus anciennes voies de l'intelligence artificielle. Dendral, conçu à l'université Stanford à partir de 1965, aidait les chimistes à identifier des molécules. Mycin, dans les années 1970, proposait des diagnostics d'infections. Ces systèmes restent utilisés partout où une décision doit pouvoir être expliquée règle par règle.",
    ],
    liens: [W('Système expert')],
  },
  bayes: {
    texte: [
      "Le théorème de Bayes est une formule de la théorie des probabilités qui indique comment réviser une probabilité à la lumière d'une observation. Il relie la probabilité d'une cause, sachant qu'un effet a été observé, à la probabilité de cet effet sachant la cause, en tenant compte de la fréquence de la cause avant toute observation.",
      "Il doit son nom au pasteur anglais Thomas Bayes, dont le mémoire a été publié en 1763, après sa mort. Pierre-Simon Laplace lui a donné sa forme générale. On s'en sert dès qu'il faut interpréter un test, un capteur ou une alerte : diagnostic médical, filtrage des courriers indésirables, maintenance.",
    ],
    liens: [W('Théorème de Bayes'), W('Sensibilité et spécificité')],
  },
  reseau: {
    texte: [
      "Un réseau bayésien est un modèle probabiliste représenté par un graphe orienté sans cycle. Chaque nœud est une variable, chaque flèche une dépendance directe, et chaque nœud porte la table de ses probabilités selon l'état de ses parents.",
      "Formalisés par Judea Pearl dans les années 1980, les réseaux bayésiens permettent de raisonner dans les deux sens : prévoir les effets d'une cause, ou remonter d'un effet observé à ses causes probables. On les emploie pour le diagnostic, l'analyse de risques et l'aide à la décision.",
    ],
    liens: [W('Réseau bayésien'), W('Indépendance conditionnelle')],
  },
  utilite: {
    texte: [
      "La théorie de l'utilité espérée décrit comment choisir entre des actions dont les conséquences sont incertaines. On attribue une valeur à chaque conséquence, on la pondère par sa probabilité, et l'on retient l'action dont la valeur moyenne est la meilleure. Quand les conséquences sont des pertes, on parle de coût espéré, que l'on cherche à rendre minimal.",
      "L'idée remonte à Daniel Bernoulli, en 1738. John von Neumann et Oskar Morgenstern en ont donné les fondements en 1944. Elle fait le lien entre une probabilité, qui décrit ce que l'on sait, et une décision, qui dépend aussi de ce que coûte chaque erreur.",
    ],
    liens: [W("Théorie de l'utilité espérée"), W('Théorie de la décision')],
  },
  supervise: {
    texte: [
      "L'apprentissage supervisé est une branche de l'apprentissage automatique dans laquelle un modèle apprend une fonction de prédiction à partir d'exemples étiquetés : pour chaque situation d'exemple, la bonne réponse est fournie. Le modèle ajuste ses paramètres pour reproduire ces réponses, puis il est appliqué à des situations nouvelles.",
      "On parle de classification quand la réponse est une catégorie, de régression quand c'est un nombre. La qualité d'un tel modèle dépend d'abord de ses données, et elle se mesure toujours sur des exemples qu'il n'a pas vus pendant l'entraînement.",
    ],
    liens: [W('Apprentissage supervisé'), W("Jeux d'entrainement, de validation et de test")],
  },
  neurone: {
    texte: [
      "Un neurone formel est un modèle mathématique simplifié du neurone biologique. Il additionne ses entrées, chacune multipliée par un poids, ajoute un biais, puis applique une fonction d'activation qui donne sa sortie. Un réseau de neurones artificiels assemble de tels neurones en couches successives.",
      "Le neurone formel a été proposé par Warren McCulloch et Walter Pitts en 1943. Frank Rosenblatt l'a rendu capable d'apprendre en inventant le perceptron, en 1957. Les réseaux actuels en comptent des millions, voire des milliards, et leurs poids sont réglés automatiquement à partir d'exemples.",
    ],
    liens: [W('Neurone formel'), W('Perceptron'), W('Réseau de neurones artificiels')],
  },
  gradient: {
    texte: [
      "La descente de gradient est une méthode d'optimisation itérative. Pour rendre minimale une fonction, on part d'un point quelconque et l'on avance par petits pas dans la direction où la fonction diminue le plus vite, donnée par l'opposé de son gradient. La longueur du pas est réglée par le taux d'apprentissage.",
      "Décrite par Augustin-Louis Cauchy en 1847, elle est aujourd'hui la méthode d'entraînement de presque tous les réseaux de neurones, où le gradient de l'erreur est calculé par rétropropagation.",
    ],
    liens: [W('Algorithme du gradient'), W('Rétropropagation du gradient')],
  },
  recommandation: {
    texte: [
      "Un système de recommandation est un logiciel qui sélectionne, dans un grand catalogue, les éléments susceptibles d'intéresser une personne donnée. Le filtrage collaboratif, sa famille la plus répandue, s'appuie sur les avis des autres utilisateurs : il prédit ce qu'une personne pensera d'un article d'après les notes de celles qui ont des goûts proches.",
      "Les premiers systèmes de ce type datent du début des années 1990, avec Tapestry puis GroupLens. Ils équipent aujourd'hui le commerce en ligne et les plateformes de vidéo et de musique.",
    ],
    liens: [W('Système de recommandation'), W('Filtrage collaboratif')],
  },
  // ------------------------------------------------------------------ Module 2
  agent: {
    texte: [
      "En intelligence artificielle, un agent est une entité qui perçoit son environnement par des capteurs et agit sur lui par des effecteurs, de façon autonome, pour atteindre un objectif. Un robot, un thermostat ou un logiciel de négociation répondent à cette définition.",
      "Cette notion organise tout le domaine depuis le manuel de Stuart Russell et Peter Norvig, paru en 1995. Concevoir un système intelligent revient à décrire son environnement, ce qu'il en perçoit, ce qu'il peut y faire et la mesure de sa réussite.",
    ],
    liens: [W('Agent intelligent')],
  },
  lidar: {
    texte: [
      "Le lidar, de l'anglais « light detection and ranging », est une technique de mesure de distance par laser. L'appareil émet une impulsion lumineuse et mesure le temps qu'elle met à lui revenir après avoir touché un obstacle. En balayant de nombreuses directions, il dresse une carte des distances qui l'entourent.",
      "Apparu au début des années 1960, peu après l'invention du laser, il sert à la topographie, à la météorologie et, en robotique, à la détection d'obstacles et à la cartographie.",
    ],
    liens: [W('Lidar')],
  },
  etat: {
    texte: [
      "L'état d'un système est l'ensemble des grandeurs qui le décrivent complètement à un instant donné. Une observation est ce qu'un capteur en rapporte : une mesure partielle, entachée d'une erreur. On parle d'observabilité partielle quand les observations ne suffisent pas à connaître l'état.",
      "La distinction vient de l'automatique et de la science de la mesure. Elle fonde les modèles de décision sous observation partielle, dans lesquels un agent raisonne sur ce qu'il mesure, jamais sur le monde lui-même.",
    ],
    liens: [W('Erreur de mesure'), W('Partially observable Markov decision process', 'en')],
  },
  boucle: {
    texte: [
      "La boucle perception, décision, action est le cycle de fonctionnement d'un agent : il mesure son environnement, choisit une action, l'exécute, puis recommence. Quand chaque nouvelle mesure rend compte de l'effet de l'action précédente et influence la suivante, on parle de boucle fermée, ou de rétroaction.",
      "Le principe de rétroaction est au cœur de l'automatique et de la cybernétique, discipline fondée par Norbert Wiener en 1948. Il explique qu'un régulateur de vitesse, un thermostat ou un robot corrigent d'eux-mêmes leurs écarts.",
    ],
    liens: [W('Rétroaction'), W('Asservissement (automatique)')],
  },
  // ------------------------------------------------------------------ Module 3
  reactif: {
    texte: [
      "Une architecture réactive fait choisir à l'agent son action directement d'après ce qu'il perçoit à l'instant, par des règles de la forme « si telle perception alors telle action ». L'agent n'a ni carte, ni mémoire, ni plan.",
      "Rodney Brooks a défendu cette approche en 1986 avec l'architecture de subsomption, qui empile des comportements simples dont les plus prioritaires prennent le pas sur les autres. Un agent réactif est rapide et peu coûteux, mais il peut tourner en rond ou rester pris dans un cul-de-sac, faute de voir plus loin que ses capteurs.",
    ],
    liens: [W('Subsumption architecture', 'en'), W('Robotic paradigm', 'en')],
  },
  astar: {
    texte: [
      "A*, prononcé « A étoile », est un algorithme de recherche du plus court chemin dans un graphe, entre un point de départ et un objectif. Il explore en priorité les positions pour lesquelles la somme du coût déjà parcouru et d'une estimation du coût restant, appelée heuristique, est la plus faible.",
      "Publié en 1968 par Peter Hart, Nils Nilsson et Bertram Raphael, du Stanford Research Institute, pour le robot Shakey, il reste la référence de la planification de trajet en robotique, dans les jeux vidéo et dans les calculateurs d'itinéraire.",
    ],
    liens: [W('Algorithme A*'), W('Recherche de chemin')],
  },
  hybride: {
    texte: [
      "Une architecture hybride associe dans un même agent une couche délibérative, qui planifie à partir d'un modèle du monde, et une couche réactive, qui répond immédiatement à ce que perçoivent les capteurs. Le plan donne la direction, les réflexes assurent la sécurité.",
      "Ces architectures se sont imposées en robotique dans les années 1990, souvent en trois couches, pour réunir les qualités des deux approches précédentes : la vision à long terme de la planification et la rapidité des comportements réactifs.",
    ],
    liens: [W('Three-layer architecture', 'en'), W('Robotic paradigm', 'en')],
  },
  // ------------------------------------------------------------------ Module 4
  espace: {
    texte: [
      "Un problème d'optimisation consiste à chercher, dans un ensemble de solutions possibles appelé espace de recherche, celle qui rend minimale une fonction de coût. En optimisation combinatoire, les solutions sont des arrangements d'objets, par exemple des ordres de visite, et leur nombre croît très vite avec la taille du problème.",
      "L'exemple le plus étudié est le problème du voyageur de commerce : trouver la tournée la plus courte passant par un ensemble de villes. Tout le travail de modélisation tient dans la fonction de coût, qui doit traduire ce que l'on veut vraiment obtenir.",
    ],
    liens: [W('Optimisation combinatoire'), W('Fonction objectif'), W('Problème du voyageur de commerce')],
  },
  contraintes: {
    texte: [
      "La programmation par contraintes est une manière de résoudre un problème en le décrivant plutôt qu'en programmant sa résolution. On déclare des variables, les valeurs qu'elles peuvent prendre et les contraintes qu'elles doivent respecter, et un solveur cherche les affectations qui les satisfont toutes.",
      "Apparue dans les années 1970 et 1980, elle sert à construire des emplois du temps, à planifier une production, à affecter des ressources. Le solveur élimine les valeurs impossibles par propagation, puis explore ce qui reste.",
    ],
    liens: [W('Programmation par contraintes'), W('Problème de satisfaction de contraintes')],
  },
  recuit: {
    texte: [
      "Le recuit simulé est une méthode d'optimisation approchée inspirée du recuit en métallurgie, où un métal chauffé puis refroidi lentement atteint un état de faible énergie. L'algorithme modifie la solution courante au hasard, accepte toujours les améliorations, et accepte parfois les dégradations, d'autant plus souvent que la « température » est élevée.",
      "Proposé en 1983 par Scott Kirkpatrick, Daniel Gelatt et Mario Vecchi, il sait sortir des minimums locaux où une simple descente resterait prise. Sa qualité dépend de deux réglages : la température initiale et la vitesse de refroidissement.",
    ],
    liens: [W('Recuit simulé')],
  },
  // ------------------------------------------------------------------ Module 5
  croyance: {
    texte: [
      "Un filtre bayésien est une méthode d'estimation qui maintient, à chaque instant, une distribution de probabilité sur l'état d'un système que l'on ne peut pas observer directement. Cette distribution, appelée croyance, est mise à jour en deux temps : une prédiction après chaque action, puis une correction après chaque mesure, par le théorème de Bayes.",
      "Le filtre de Kalman, publié par Rudolf Kalman en 1960, en est le cas particulier le plus connu. Ces filtres permettent à un robot de se localiser, à un récepteur de navigation d'affiner sa position, à un radar de suivre une cible.",
    ],
    liens: [W('Recursive Bayesian estimation', 'en'), W('Filtre de Kalman'), W('Filtre particulaire')],
  },
  mdp: {
    texte: [
      "Un processus de décision markovien est un modèle mathématique de décision séquentielle dans l'incertain. Il décrit un agent qui passe d'état en état : à chaque pas, il choisit une action, le résultat dépend en partie du hasard, et il reçoit une récompense. Une politique indique quelle action choisir dans chaque état.",
      "Formalisé par Richard Bellman dans les années 1950, avec la programmation dynamique, ce modèle est le cadre théorique de l'apprentissage par renforcement et de la planification sous incertitude.",
    ],
    liens: [W('Processus de décision markovien'), W('Programmation dynamique')],
  },
  qlearning: {
    texte: [
      "L'apprentissage par renforcement est une forme d'apprentissage automatique dans laquelle un agent apprend à se comporter par essais et erreurs. Il agit, reçoit une récompense ou une pénalité, et ajuste peu à peu son comportement pour obtenir le plus de récompenses possible à long terme.",
      "Le Q-learning, proposé par Christopher Watkins en 1989, en est l'algorithme le plus connu : l'agent apprend la valeur de chaque action dans chaque état, sans modèle de son environnement. Associé à des réseaux de neurones profonds, l'apprentissage par renforcement a permis à des programmes d'apprendre à jouer à des jeux vidéo, puis de battre les meilleurs joueurs de go.",
    ],
    liens: [W('Apprentissage par renforcement'), W('Q-learning')],
  },
  exploration: {
    texte: [
      "Le dilemme entre exploration et exploitation se pose à tout agent qui apprend en agissant : doit-il choisir l'action qu'il estime la meilleure, ou en essayer une autre pour mieux la connaître ? Trop exploiter l'enferme dans ses premières impressions, trop explorer lui fait perdre le bénéfice de ce qu'il a appris.",
      "Sa forme mathématique est le problème du bandit manchot, étudié par Herbert Robbins en 1952 : un joueur face à plusieurs machines à sous aux gains inconnus. On le retrouve dans les essais cliniques, la publicité en ligne et les systèmes de recommandation.",
    ],
    liens: [W('Problème du bandit manchot'), W('Exploration-exploitation dilemma', 'en')],
  },
  // ------------------------------------------------------------------ Module 6
  confiance: {
    texte: [
      "Un intervalle de confiance est une plage de valeurs, calculée à partir d'un échantillon, qui encadre une grandeur inconnue avec un niveau de confiance choisi, souvent 95 %. Il dit avec quelle précision une mesure faite sur quelques cas renseigne sur l'ensemble.",
      "La notion a été introduite par le statisticien Jerzy Neyman en 1937. La largeur de l'intervalle diminue quand le nombre d'observations augmente : c'est ce qui permet de dimensionner un sondage, un essai clinique ou une campagne de tests.",
    ],
    liens: [W('Intervalle de confiance')],
  },
  robustesse: {
    texte: [
      "En ingénierie, la robustesse est la capacité d'un système à conserver des performances acceptables quand les conditions s'écartent de celles pour lesquelles il a été conçu : mesures bruitées, pannes partielles, situations imprévues.",
      "Elle ne se constate pas en conditions normales. On la mesure en dégradant volontairement les conditions, par niveaux croissants, pour connaître le domaine dans lequel le système reste sûr. C'est une exigence centrale de la validation des systèmes autonomes.",
    ],
    liens: [W('Robustesse (ingénierie)'), W('Robustness (computer science)', 'en')],
  },
  graine: {
    texte: [
      "Une graine aléatoire est le nombre qui initialise un générateur de nombres pseudo-aléatoires. Ce générateur est un algorithme : il produit une suite qui a l'apparence du hasard, mais qui est entièrement déterminée par sa graine. La même graine redonne exactement la même suite.",
      "Cette propriété rend les simulations reproductibles. En conservant la graine et les paramètres d'une expérience, on peut la rejouer à l'identique, pour comprendre un échec ou pour permettre à un tiers de vérifier un résultat.",
    ],
    liens: [W('Graine aléatoire'), W('Générateur de nombres pseudo-aléatoires'), W('Reproductibilité')],
  },
  // ------------------------------------------------------------------ Module 7
  composantes: {
    texte: [
      "Un agent est un système logiciel qui perçoit sa situation, s'en fait une représentation, choisit une action et l'exécute, de façon autonome, pour remplir une mission. Un système agentique organise un ou plusieurs agents, avec les composants qui les coordonnent et les contrôlent.",
      "La notion est bien antérieure aux grands modèles de langage : systèmes experts, agents réactifs et systèmes multi-agents en sont des formes anciennes. Ce qui distingue un agent d'un chatbot est sa capacité à agir, pas à converser.",
    ],
    liens: [W('Intelligence artificielle agentique'), W('Système multi-agents'), W('Agent conversationnel')],
  },
  autonomie: {
    texte: [
      "Le niveau d'autonomie d'un système indique la part des décisions qu'il prend et exécute seul, et celle qui reste soumise à un humain. On le gradue sur une échelle, ici de 0, pour un outil qui se borne à répondre aux commandes, à 5, pour un système qui agit et s'ajuste seul et n'est suivi que de loin.",
      "Ces échelles viennent de l'automatisation et de l'automobile, où la norme SAE J3016, publiée en 2014, distingue six niveaux de conduite automatisée, numérotés de 0 à 5. Choisir un niveau, c'est décider où placer l'humain : avant l'action, pour la valider, ou après, pour la contrôler.",
    ],
    liens: [W('Véhicule autonome'), W('Human-in-the-loop', 'en')],
  },
  familles: {
    texte: [
      "Les agents se rangent en familles selon le mécanisme qui produit leur décision : des règles écrites par un expert, une heuristique, un modèle statistique appris sur des données, un raisonnement symbolique, un calcul d'optimisation, ou un modèle de langage.",
      "Chaque famille a ses forces et ses limites : explicabilité, souplesse, coût, délai, besoin de données. Concevoir un système agentique consiste à confier chaque tâche à la famille qui lui convient, plutôt qu'à tout demander à un seul type d'agent.",
    ],
    liens: [W('Agent logiciel'), W('Intelligent agent', 'en')],
  },
  nonllm: {
    texte: [
      "Une heuristique est une règle de décision simple et rapide, qui donne une réponse acceptable sans garantir qu'elle soit la meilleure. Avec les règles métier et les modèles statistiques, elle forme la famille des agents qui n'utilisent pas de modèle de langage.",
      "Ces agents sont les plus anciens et restent les plus répandus. Ils sont rapides, peu coûteux, et leurs décisions se justifient ligne à ligne. On leur confie ce qui engage : contrôles, scores, priorités.",
    ],
    liens: [W('Heuristique (mathématiques)'), W('Système expert')],
  },
  llm: {
    texte: [
      "Un grand modèle de langage, ou LLM, est un réseau de neurones entraîné, sur de très grandes quantités de texte, à prédire la suite d'une phrase. Cette capacité lui permet de comprendre une demande en langage naturel, d'en extraire des informations et de rédiger une réponse.",
      "Ces modèles reposent sur l'architecture « transformeur », présentée en 2017. Ils sont souples, mais ils peuvent produire des affirmations fausses et plausibles, appelées hallucinations. Dans un système agentique, on les encadre donc par des contrôles déterministes.",
    ],
    liens: [W('Grand modèle de langage'), W('Hallucination (intelligence artificielle)')],
  },
  complexite: {
    texte: [
      "Diffuser la complexité, c'est découper un traitement trop complexe pour un seul agent en étapes simples, confiées chacune à un agent spécialisé. C'est l'application aux systèmes agentiques d'un principe classique du génie logiciel, la séparation des préoccupations.",
      "L'expression a été introduite par Edsger Dijkstra en 1974. Le découpage rend chaque partie plus simple à écrire, à tester et à corriger. Il a un prix : les erreurs de chaque étape se cumulent le long de la chaîne, ce qui impose des contrôles intermédiaires.",
    ],
    liens: [W('Séparation des préoccupations')],
  },
  risque: {
    texte: [
      "Diffuser le risque, c'est confier une même décision à plusieurs agents indépendants, puis confronter leurs avis par un vote ou par un arbitre. L'erreur de l'un a de bonnes chances d'être rattrapée par les autres.",
      "Le principe est ancien. Le théorème du jury, énoncé par Condorcet en 1785, établit qu'un groupe de votants indépendants, chacun plus souvent juste que faux, se trompe moins qu'un seul. L'ingénierie l'applique sous le nom de redondance, l'apprentissage automatique sous celui de méthodes d'ensemble. Tout repose sur l'indépendance des avis.",
    ],
    liens: [W('Théorème du jury'), W('Redondance (ingénierie)'), W('Apprentissage ensembliste')],
  },
  routage: {
    texte: [
      "Dans un système agentique, trois fonctions organisent le travail des agents. Le routage oriente chaque demande vers l'agent ou la file capable de la traiter. L'arbitrage tranche quand plusieurs agents rendent des avis différents. La modération contrôle ce qui sort du système, avant qu'une action soit exécutée ou une réponse envoyée.",
      "Ces fonctions prolongent des pratiques connues : l'aiguillage des demandes dans un centre de service, la décision collégiale, la modération des contenus en ligne. Elles sont de préférence déterministes, pour que leurs décisions restent explicables.",
    ],
    liens: [W('Système multi-agents'), W("Modération d'informations")],
  },
  rag: {
    texte: [
      "La génération augmentée par récupération, ou RAG (de l'anglais « retrieval-augmented generation »), consiste à fournir à un modèle de langage, avant qu'il réponde, des passages recherchés dans une base documentaire. Le modèle s'appuie sur ces passages au lieu de sa seule mémoire, ce qui réduit les erreurs et permet de citer des sources.",
      "La technique a été présentée en 2020 par Patrick Lewis et ses collègues. La qualité de la réponse dépend d'abord de l'étage de recherche : découpage des documents, nombre de passages retenus, méthode de classement.",
    ],
    liens: [W('Génération à enrichissement contextuel'), W('Retrieval-augmented generation', 'en')],
  },
  patterns: {
    texte: [
      "Un patron de conception, ou design pattern, est une solution éprouvée à un problème de conception qui revient souvent, décrite de façon à pouvoir être réutilisée. Il ne fournit pas de code, mais un arrangement de composants et de responsabilités, et un nom pour en parler.",
      "La notion vient de l'architecte Christopher Alexander, en 1977. Elle a été popularisée en informatique par l'ouvrage « Design Patterns », paru en 1994. Les systèmes agentiques ont leurs propres patrons : pipeline linéaire, superviseur central, contradicteur dédié, double validation, arbitre final.",
    ],
    liens: [W('Patron de conception')],
  },
  implementation: {
    texte: [
      "Implémenter un système agentique, c'est traduire son architecture en code : une couche par responsabilité, des interfaces claires entre les couches, et une fonction centrale qui fait traverser le système à chaque dossier, du routage à la journalisation.",
      "Cette organisation applique l'architecture en couches du génie logiciel. Elle permet de tester chaque agent séparément, de remplacer l'un d'eux sans toucher aux autres, et de savoir, grâce au journal, ce qui s'est passé à chaque étape.",
    ],
    liens: [W('Architecture en couches'), W('Architecture logicielle')],
  },
  evaluation: {
    texte: [
      "Évaluer un système agentique, c'est mesurer par des indicateurs s'il remplit sa mission : justesse des décisions, coût, délai, sécurité. Chaque composant a les siens. Le routeur se juge sur ses orientations, l'arbitre sur les erreurs qu'il évite, le modérateur sur ce qu'il bloque à raison ou à tort.",
      "Ces mesures reprennent les outils de l'évaluation des classifieurs, comme la précision et le rappel. Elles exigent une vérité de référence : des cas dont la bonne réponse est connue, établie en dehors du système.",
    ],
    liens: [W('Précision et rappel'), W('Matrice de confusion')],
  },
  gouvernance: {
    texte: [
      "La gouvernance d'un système d'IA réunit les règles qui encadrent son usage : qui répond de ses décisions, ce qu'il a le droit de faire seul, comment on le contrôle. La journalisation en est l'outil principal : l'enregistrement, étape par étape, de ce que le système a reçu, décidé et fait.",
      "Un journal bien conçu permet de reconstituer une décision après coup et d'en répondre, sans conserver plus de données personnelles que nécessaire. Le règlement européen sur l'intelligence artificielle, adopté en 2024, impose cet enregistrement aux systèmes à haut risque.",
    ],
    liens: [W('Historique (informatique)'), W("Règlement sur l'intelligence artificielle"), W('Audit trail', 'en')],
  },
  casusage: {
    texte: [
      "Un cas d'usage décrit une situation concrète dans laquelle un système est employé : qui s'en sert, pour faire quoi, avec quel résultat attendu. Concevoir un système agentique complet, c'est partir d'un cas d'usage et décider, étape par étape, quel agent intervient, où placer les contrôles et ce qui reste à l'humain.",
      "La notion vient du génie logiciel, où Ivar Jacobson l'a introduite en 1987. Les cas d'usage montrent que les mêmes briques se réassemblent d'un domaine à l'autre : seuls changent l'agent dominant et l'endroit où le risque justifie plusieurs avis.",
    ],
    liens: [W("Cas d'utilisation"), W('Aide à la décision')],
  },
};
