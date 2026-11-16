import { pas, tableau, barres, scene, carte, texte, rond, trait } from './scenes.js';
const b = (nom, definition, etapes) => [{ nom, definition, etapes }];
const tab = (entetes, lignes, actifs, bilan) => tableau(entetes, lignes, actifs, bilan);

// Le document change de destinataire ; le contenu et les rôles restent identifiés.
function transmission(phase, noms, document, bilan) {
  const dessin = (petit) => {
    const positions = noms.map((_, i) => petit ? [125, 45 + i * 100] : [105 + i * 215, 80]);
    return [
      ...positions.slice(1).map(([x, y], i) => petit ? trait(`lien${i}`, x, y - 66, x, y - 37, 'gris', true) : trait(`lien${i}`, x - 122, y, x - 94, y, 'gris', true)),
      ...positions.map(([x, y], i) => carte(`role${i}`, x, y, noms[i], i === phase ? 'bleu' : 'gris', petit ? 200 : 174)),
      carte('document', petit ? 282 : positions[phase][0], petit ? positions[phase][1] : 175, document, 'orange', petit ? 90 : 140, 40),
      texte('legende', petit ? 170 : 320, petit ? 319 : 242, 'Le document passe à l’étape suivante', petit ? 300 : 600, 15),
    ];
  };
  return scene(dessin(false), dessin(true), bilan);
}

export const BASES_AGENTIQUES = {
  composantes: b('Entrée, traitement et effet', 'Recevoir une information, la transformer et modifier un dossier sont trois opérations distinctes.', [
    pas('Recevoir une information', 'Une demande de congé entre dans le service. Le planning n’a pas encore changé. Recevoir le message est une entrée, pas une action sur le planning.', tab(['Moment', 'Demande', 'Planning'], [['Réception', '1 jour', 'inchangé']], ['0-1'], 'Une information arrive ; aucun congé n’est encore inscrit.')),
    pas('Transformer cette information', 'Le traitement lit le solde disponible et prépare une décision. Même si la proposition est « accepter », le planning est toujours inchangé.', tab(['Moment', 'Proposition', 'Planning'], [['Traitement', 'accepter', 'inchangé']], ['0-1'], 'Préparer une décision ne produit pas encore son effet.')),
    pas('Observer l’effet de l’action', 'Après les contrôles nécessaires, l’inscription est effectuée. Le planning contient maintenant le congé. C’est un changement observable de l’environnement numérique.', tab(['Moment', 'Action', 'Planning'], [['Exécution', 'inscrire', 'congé ajouté']], ['0-2'], 'Une action se reconnaît à son effet sur le système.')),
  ]),
  autonomie: b('Capacité et permission', 'Pouvoir techniquement effectuer une action ne signifie pas avoir le droit de l’effectuer sans validation.', [
    pas('Repérer une capacité', 'Le logiciel possède un outil capable d’envoyer un message. Cela décrit une possibilité technique. On n’a pas encore décidé dans quels cas il peut l’utiliser.', tab(['Action', 'Possible', 'Permis ?'], [['Lire', 'oui', 'oui'], ['Envoyer', 'oui', '?']], ['1-1'], 'Une capacité répond à : est-ce techniquement possible ?')),
    pas('Fixer une permission', 'La règle du service permet de lire, mais exige un accord humain avant l’envoi. L’outil existe toujours ; son utilisation reste limitée.', tab(['Action', 'Possible', 'Permis ?'], [['Lire', 'oui', 'oui'], ['Envoyer', 'oui', 'après accord']], ['1-2'], 'Une permission répond à : dans quelles conditions a-t-on le droit ?')),
    pas('Appliquer la limite', 'Le brouillon est prêt, mais l’accord n’est pas reçu. Le système garde donc le message en attente. C’est cette limite de pouvoir que l’on décrit en parlant d’autonomie.', tab(['Brouillon', 'Accord ?', 'Envoi'], [['prêt', 'non', 'en attente']], ['0-2'], 'L’autonomie se définit par les actions autorisées et leurs conditions.')),
  ]),
  familles: b('Règle explicite et score appris', 'Une règle vérifie une condition écrite ; un score appris résume des régularités issues d’exemples.', [
    pas('Appliquer une règle écrite', 'Dans ce service fictif, l’âge minimal est 18 ans. Pour un dossier de 17 ans, la comparaison donne faux. On sait exactement quelle condition a été testée.', tab(['Donnée', 'Règle', 'Résultat'], [['17 ans', 'au moins 18', 'non']], ['0-1', '0-2'], 'Une règle explicite peut être relue avant d’exécuter le calcul.')),
    pas('Lire un score appris', 'Un autre système a appris sur des exemples de dossiers et renvoie un score de risque de 0,8. Ce nombre résume son estimation ; ce n’est pas à lui seul une décision ni forcément une probabilité calibrée.', barres([['Score de risque', .8]], 1, 'Un score est un résultat de calcul à interpréter.')),
    pas('Relier le résultat à une action', 'Le service décide qu’un score au moins égal à 0,7 déclenche une revue humaine. Le score vient du modèle ; la règle d’usage définit l’action.', tab(['Score', 'Seuil', 'Action'], [['0,8', '≥ 0,7', 'faire relire']], ['0-2'], 'La famille de méthode et la politique d’action sont deux choix distincts.')),
  ]),
  nonllm: b('Catégorie, nombre et décision', 'Un modèle peut prévoir une catégorie ou un nombre ; il faut ensuite préciser ce que le service fait de cette prévision.', [
    pas('Prévoir une catégorie', 'Un courrier est classé dans « facturation ». Le résultat est une étiquette choisie parmi des catégories : c’est une classification.', tab(['Entrée', 'Sortie', 'Type'], [['Courrier', 'facturation', 'catégorie']], ['0-1'], 'Classer : répondre par une catégorie.')),
    pas('Prévoir un nombre', 'Un autre modèle estime que le traitement prendra 3 jours. Sa sortie est une quantité : c’est une régression, au sens de l’apprentissage automatique.', tab(['Entrée', 'Sortie', 'Type'], [['Dossier', '3 jours', 'nombre']], ['0-1', '0-2'], 'Estimer une quantité : répondre par un nombre.')),
    pas('Décider quoi faire de cette sortie', 'Le service peut envoyer les courriers « facturation » à la comptabilité ou prioriser les dossiers longs. Ces actions demandent une règle d’usage en plus de la prévision.', tab(['Prévision', 'Règle', 'Action'], [['facturation', 'file dédiée', 'compta']], ['0-2'], 'Prédire une catégorie ou un nombre ne suffit pas à définir une action.')),
  ]),
  llm: b('Morceau de texte et prédiction', 'Un modèle de langage traite des tokens, qui peuvent être des mots ou des morceaux de mots, puis prévoit une suite possible.', [
    pas('Découper un texte', 'Un token est une unité de texte. Selon le découpeur, un mot peut former un seul token ou plusieurs. Ici, le découpage illustratif de « robotique » donne « robot » et « ique ».', tab(['Texte', 'Morceau 1', 'Morceau 2'], [['robotique', 'robot', 'ique']], ['0-1', '0-2'], 'Ce découpage est illustratif : les tokens dépendent du modèle.')),
    pas('Attribuer des chances à la suite', 'Après « Le robot », imaginons trois suites possibles : avance, recule ou attend. Le modèle leur attribue des probabilités à partir du contexte et de son apprentissage.', barres([['avance', 60], ['recule', 30], ['attend', 10]], 100, 'Exemple simplifié : 60 % + 30 % + 10 % = 100 %.', ' %')),
    pas('Ajouter puis recommencer', 'La génération choisit « avance » dans cet exemple. Le texte devient « Le robot avance ». La suite sera calculée à partir de ce texte enrichi. Une suite plausible n’est pas forcément vraie dans le monde réel.', tab(['Avant', 'Ajout', 'Après'], [['Le robot', 'avance', 'Le robot avance']], ['0-2'], 'Générer : ajouter un élément, puis recalculer la suite.')),
  ]),
  complexite: b('Dépendance entre tâches', 'Une tâche dépend d’une autre lorsqu’elle a besoin de son résultat pour pouvoir commencer correctement.', [
    pas('Identifier les informations nécessaires', 'Pour calculer un total, il faut connaître le montant lu dans le formulaire. Sans lecture préalable, le calcul manque de données.', tab(['Tâche', 'Besoin', 'Prêt ?'], [['Calculer', 'montant', 'non']], ['0-2'], 'Une tâche ne peut pas utiliser un résultat qui n’existe pas encore.')),
    pas('Produire ce qui manque', 'La lecture extrait le montant 300. Cette information devient disponible pour le calcul suivant.', tab(['Tâche', 'Produit', 'Prêt ?'], [['Lire', 'montant 300', 'oui'], ['Calculer', 'total', 'pas encore']], ['0-1', '0-2'], 'Lire doit précéder le calcul dans cet exemple.')),
    pas('Passer à la tâche suivante', 'Le calcul reçoit 300, ajoute 20 de frais et produit 320. On peut maintenant préparer la réponse. L’organisation suit les besoins d’information de chaque tâche.', tab(['Tâche', 'Entrée', 'Sortie'], [['Calculer', '300 + 20', '320'], ['Répondre', '320', 'message']], ['1-0', '1-1'], 'Une dépendance impose un ordre, même avec plusieurs agents.')),
  ]),
  risque: b('Fréquence et gravité', 'Évaluer un risque demande à la fois de regarder combien de fois un problème arrive et ce que chaque problème provoque.', [
    pas('Compter les incidents', 'Sur cent dossiers, dix erreurs de mise en forme et une erreur de paiement apparaissent. L’erreur de paiement est moins fréquente.', barres([['Mise en forme', 10], ['Paiement', 1, 'orange']], 100, 'Fréquence observée : 10 sur 100 contre 1 sur 100.')),
    pas('Regarder les conséquences', 'Dans cet exemple fictif, corriger une mise en forme coûte 1 €, mais l’erreur de paiement coûte 500 €. La fréquence seule ne raconte pas cette différence.', tab(['Incident', 'Nombre', 'Coût'], [['Mise en forme', '10', '1 €'], ['Paiement', '1', '500 €']], ['0-2', '1-2'], 'Un événement rare peut avoir une conséquence importante.')),
    pas('Croiser les deux informations', 'Sur ces cent dossiers, les corrections de forme coûtent 10 € au total, contre 500 € pour le paiement. Le risque ne se résume pas à compter les erreurs.', barres([['10 erreurs × 1 €', 10], ['1 erreur × 500 €', 500, 'orange']], 500, 'Fréquence et gravité doivent être examinées ensemble.', ' €')),
  ]),
  routage: b('Reconnaître une catégorie et orienter', 'Une demande possède un sujet ; le routage associe ce sujet au service compétent sans résoudre lui-même la demande.', [
    pas('Recevoir une demande', 'Le message signale « une erreur sur ma facture ». Il entre par le point d’accueil commun. Son destinataire spécialisé reste à choisir.', transmission(0, ['Accueil', 'Identifier le sujet', 'Comptabilité'], 'Facture', 'Le message arrive au point d’entrée commun.')),
    pas('Reconnaître le sujet', 'Les informations du message indiquent un problème de facturation. Le sujet sert à choisir la file de traitement.', transmission(1, ['Accueil', 'Identifier le sujet', 'Comptabilité'], 'Facture', 'Catégorie reconnue : facturation.')),
    pas('Transmettre au bon service', 'Le message est transmis à la comptabilité. Le trajet du document change, mais l’erreur de facture n’est pas encore corrigée.', transmission(2, ['Accueil', 'Identifier le sujet', 'Comptabilité'], 'Facture', 'Orienter une demande et la résoudre sont deux opérations différentes.')),
  ]),
  rag: b('Source, extrait et affirmation', 'Une source contient une information ; un extrait en reprend un passage ; une affirmation doit être vérifiée contre ce passage.', [
    pas('Partir d’une question', 'On demande le délai de dépôt. Une réponse « 40 jours » est proposée, mais elle n’est pas encore vérifiée. Une phrase précise ne constitue pas sa propre preuve.', tab(['Question', 'Proposition', 'Vérifié'], [['Quel délai ?', '40 jours', 'non']], ['0-1'], 'Une affirmation et sa preuve sont deux choses différentes.')),
    pas('Retrouver le passage utile', 'Dans notre règlement fictif, le passage pertinent dit « dépôt sous 30 jours ». On conserve aussi la référence du document pour pouvoir le retrouver.', tab(['Source', 'Extrait', 'Délai'], [['Règlement A', 'sous 30 jours', '30 jours']], ['0-1', '0-2'], 'L’extrait vient d’un document identifiable.')),
    pas('Comparer avant de répondre', 'La proposition de 40 jours ne correspond pas à la source. La réponse est corrigée à 30 jours et reliée au passage. Un système RAG organise cette recherche et cette utilisation des sources.', tab(['Proposition', 'Source', 'Correction'], [['40 jours', '30 jours', '30 jours']], ['0-2'], 'Citer une source aide à vérifier ; il faut aussi respecter ce qu’elle dit.')),
  ]),
  patterns: b('Rôle et organisation du travail', 'Un rôle décrit une responsabilité ; une organisation précise comment les personnes ou composants se passent le travail.', [
    pas('Attribuer la lecture', 'Un dossier doit être lu, vérifié puis transmis. On commence par donner la lecture à un premier rôle. Un rôle décrit ce qu’il doit accomplir.', transmission(0, ['Lire les pièces', 'Vérifier le dossier', 'Transmettre'], 'Dossier', 'Premier rôle : transformer les pièces en informations utiles.')),
    pas('Passer une information exploitable', 'Le rôle de vérification reçoit les informations extraites. Il doit savoir ce qui lui est transmis et ce qu’il doit contrôler.', transmission(1, ['Lire les pièces', 'Vérifier le dossier', 'Transmettre'], 'Dossier', 'Deuxième rôle : contrôler les informations reçues.')),
    pas('Organiser la suite', 'Après vérification, le dossier passe au rôle qui prépare sa transmission. Un design pattern décrira une organisation réutilisable de ces responsabilités et échanges.', transmission(2, ['Lire les pièces', 'Vérifier le dossier', 'Transmettre'], 'Dossier', 'L’organisation décrit les rôles et les passages entre eux.')),
  ]),
  implementation: b('Donnée, type et transformation', 'Une donnée possède une forme ; une fonction doit recevoir la forme attendue pour effectuer le bon traitement.', [
    pas('Lire ce qui arrive', 'Le formulaire envoie les caractères « 300 ». Pour le programme, cette valeur est encore du texte, même si elle ressemble à un nombre.', tab(['Entrée', 'Type', 'Usage'], [['« 300 »', 'texte', 'à convertir']], ['0-1'], 'Une apparence numérique ne garantit pas un type numérique.')),
    pas('Convertir et contrôler', 'La fonction vérifie que le texte représente un montant valide puis le convertit en nombre. Un texte comme « demain » doit être refusé pour ce champ.', tab(['Entrée', 'Conversion', 'Sortie'], [['« 300 »', 'valide', '300'], ['« demain »', 'impossible', 'erreur']], ['0-2', '1-2'], 'Une transformation prévoit aussi les entrées invalides.')),
    pas('Utiliser la donnée transformée', 'Le calcul reçoit maintenant le nombre 300 et peut ajouter 20 : il obtient 320. Chaque composant doit connaître le format de son entrée et de sa sortie.', tab(['Nombre', 'Opération', 'Résultat'], [['300', '+ 20', '320']], ['0-2'], 'Des formats explicites permettent aux composants de travailler ensemble.')),
  ]),
  evaluation: b('Référence et résultat mesuré', 'Pour compter des réponses justes, il faut une référence connue indépendamment de ce que répond le système.', [
    pas('Préparer la référence', 'Pour trois dossiers, une vérification indépendante établit les bonnes réponses : oui, non, oui. Cette référence sert à mesurer la justesse du système.', tab(['Dossier', 'Référence', 'Système'], [['A', 'oui', '?'], ['B', 'non', '?'], ['C', 'oui', '?']], ['0-1', '1-1', '2-1'], 'La référence est fixée avant de noter les réponses du système.')),
    pas('Comparer chaque réponse', 'Le système répond oui aux trois dossiers. Il est correct sur A et C, mais se trompe sur B. Répéter la même réponse ne suffit pas à être fiable.', tab(['Dossier', 'Référence', 'Système'], [['A', 'oui', 'oui'], ['B', 'non', 'oui'], ['C', 'oui', 'oui']], ['1-1', '1-2'], 'Le désaccord sur B révèle une erreur.')),
    pas('Construire une mesure', 'On compte deux réponses justes sur trois, soit environ 67 %. Cette mesure décrit ces trois cas ; elle ne garantit pas la même performance sur tous les dossiers futurs.', barres([['Réponses justes', 2], ['Dossiers évalués', 3]], 3, 'Mesure = résultat observé selon un critère et sur un ensemble de cas définis.')),
  ]),
  gouvernance: b('Décision, acteur et preuve', 'Une décision doit pouvoir être reliée à l’acteur qui en répond et aux éléments qui permettent de la vérifier.', [
    pas('Constater un résultat sans contexte', 'Le dossier est marqué « refusé ». Ce mot seul ne dit ni qui en répond, ni quelle règle a été utilisée.', tab(['Dossier', 'Décision', 'Acteur'], [['2417', 'refusé', '?']], ['0-2'], 'Le résultat seul ne permet pas de demander une explication.')),
    pas('Identifier la responsabilité', 'On rattache la décision au service responsable et, lorsque cela s’applique, à la personne qui l’a validée. On sait maintenant à qui demander des comptes.', tab(['Dossier', 'Acteur', 'Validation'], [['2417', 'service A', 'personne B']], ['0-1'], 'Une responsabilité doit être attribuée explicitement.')),
    pas('Conserver les éléments vérifiables', 'On garde aussi la règle appliquée, sa version et la pièce qui justifie le refus. Ces éléments permettent de vérifier la décision après coup.', tab(['Dossier', 'Règle', 'Élément'], [['2417', 'R4 version 2', 'pièce absente']], ['0-1', '0-2'], 'Un acteur responsable et des preuves conservées rendent le contrôle possible.')),
  ]),
  casusage: b('Besoin, critère et contrainte', 'Le besoin décrit le résultat utile ; le critère sert à comparer les solutions ; la contrainte fixe ce qui doit être respecté.', [
    pas('Formuler le besoin concret', 'Le service veut répondre aux demandes de rendez-vous. Le besoin porte sur un résultat pour l’usager, avant le choix d’une technologie.', tab(['Usager', 'Besoin', 'Résultat'], [['Usager', 'RDV', 'créneau confirmé']], ['0-2'], 'On commence par le résultat utile à obtenir.')),
    pas('Choisir un critère de comparaison', 'On veut réduire le délai de réponse. Une solution répond en deux heures, une autre en quatre. Le délai permet de les comparer sur ce critère précis.', barres([['Solution A', 2], ['Solution B', 4]], 8, 'Critère : un délai de réponse plus court.', ' h')),
    pas('Appliquer aussi une contrainte', 'Un créneau ne doit jamais être attribué deux fois. Même rapide, une solution qui crée des doublons ne respecte pas cette contrainte. Il faut juger les deux aspects.', tab(['Solution', 'Délai', 'Unique ?'], [['A', '2 h', 'non'], ['B', '4 h', 'oui']], ['1-2'], 'Le meilleur score ne dispense pas de respecter les contraintes.')),
  ]),
};
