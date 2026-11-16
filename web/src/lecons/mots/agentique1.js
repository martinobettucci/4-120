import { mot, pas, histoire, comparer, jetons, tableau } from './scenes.js';
export const AGENTIQUE1 = {
  composantes: [
    histoire('Agent', ['Percevoir\nDemande de congé', 'Décider\nVérifier le solde', 'Agir\nInscrire au planning'], [
      ['Recevoir une demande', 'Un salarié demande un jour de congé. Le logiciel lit la demande et le solde disponible.', 'L’environnement peut être un dossier numérique.'],
      ['Choisir selon un objectif', 'Le logiciel vérifie les règles pour préparer un planning cohérent et respecter les droits du salarié.', 'L’agent utilise une représentation de la situation.'],
      ['Produire un effet', 'Si les règles l’autorisent, il inscrit le congé. Il ne fait pas que parler : il agit dans les limites de ses droits.', 'Un agent perçoit, décide et agit vers un objectif.'],
    ]),
    histoire('Système agentique', ['Agent A\nLire la demande', 'Agent B\nVérifier les règles', 'Contrôle\nAutoriser l’action'], [
      ['Partager le travail', 'Un premier agent extrait les informations utiles d’une demande de congé.', 'Un agent porte une partie du travail.'],
      ['Organiser la coopération', 'Un autre vérifie les règles et le planning. Il reçoit les informations du premier.', 'Le système organise les échanges entre agents.'],
      ['Encadrer les actions', 'Un contrôle décide si l’inscription est autorisée ou doit être validée par une personne. L’ensemble forme le système agentique.', 'Agents + coordination + contrôles = système agentique.'],
    ]),
    histoire('Politique de décision', ['État\nSolde : 1 jour', 'Demande\n3 jours', 'Choix prévu\nRefuser'], [
      ['Connaître la situation', 'Le salarié ne dispose plus que d’un jour de congé. L’agent conserve cette information.', 'L’état sert à choisir.'],
      ['Appliquer la logique', 'La demande porte sur trois jours. La politique dit de refuser si la demande dépasse le solde.', 'Une politique relie des informations à une action.'],
      ['Obtenir une décision', 'L’agent refuse cette demande. Avec un autre état, la même politique pourrait produire une autre décision.', 'La politique est la règle de choix, pas le résultat seul.'],
    ]),
    histoire('Chatbot', ['Question\n« Quel est mon solde ? »', 'Réponse\n« Il reste 1 jour »', 'Planning\nAucun changement'], [
      ['Dialoguer', 'Une personne pose une question dans une conversation.', 'Chatbot signifie assistant conversationnel.'],
      ['Répondre', 'Le chatbot fournit une réponse. Dans cet exemple, il explique le solde sans effectuer de démarche.', 'Répondre est différent d’inscrire un congé.'],
      ['Distinguer dialogue et action', 'Le planning n’a pas changé. Certains chatbots sont reliés à des outils et peuvent aussi agir ; le dialogue seul ne prouve donc pas l’autonomie.', 'L’interface de conversation ne dit pas quels droits le système possède.'],
    ]),
  ],
  autonomie: [
    histoire('Niveau d’autonomie', ['Proposer\nUne personne agit', 'Faire valider\nAvant d’agir', 'Agir seul\nDans un périmètre'], [
      ['Conseiller seulement', 'Le système propose une réponse, mais une personne effectue toute action. Sa marge d’action est faible.', 'On commence par définir ce qu’il peut faire.'],
      ['Agir après accord', 'Le système prépare l’action puis attend l’approbation humaine. L’autonomie augmente, mais la décision reste contrôlée.', 'Préparer n’est pas encore exécuter seul.'],
      ['Déléguer un périmètre', 'On peut l’autoriser à exécuter seul les cas simples et à transmettre les autres. Le cours utilise une échelle de 0 à 5 pour discuter ces délégations.', 'L’autonomie porte sur des droits précis, pas sur un sentiment d’intelligence.'],
    ]),
    histoire('Validation humaine', ['Proposition\nAccorder un congé', 'Personne\nVérifier et approuver', 'Action autorisée\nInscrire le congé'], [
      ['Préparer sans exécuter', 'Le système prépare une décision et les informations qui la justifient. Il attend.', 'L’action est encore en attente.'],
      ['Faire examiner le cas', 'Une responsable vérifie la proposition. Elle peut approuver, corriger ou refuser.', 'Une validation est un vrai pouvoir de décision.'],
      ['Appliquer l’accord', 'Le congé est inscrit seulement après approbation. Si la personne refuse, l’inscription ne doit pas avoir lieu.', 'Le contrôle humain précède l’effet autorisé.'],
    ]),
    mot('Confiance calibrée', [
      pas('Annoncer une confiance', 'Le modèle annonce 90 % de confiance sur chacun de ces dix dossiers. Ce nombre est une prévision de fiabilité.', jetons(10, ['✓', '✓', '✓', '×', '✓', '✓', '✓', '✓', '✓', '✓'], [3], 0, 'Même confiance annoncée : 90 % pour chaque dossier.')),
      pas('Comparer à la réalité', 'Dans cette illustration, neuf réponses sont justes et une est fausse. On vérifie la justesse avec une référence indépendante.', jetons(10, ['✓', '✓', '✓', '×', '✓', '✓', '✓', '✓', '✓', '✓'], [3], 1, '✓ = réponse juste · × = réponse fausse')),
      pas('Vérifier sur beaucoup de cas', 'Une confiance de 90 % est calibrée si, sur de nombreux cas comparables, environ neuf réponses sur dix sont justes. Dix cas seuls ne suffisent pas à le démontrer.', jetons(10, ['✓', '✓', '✓', '×', '✓', '✓', '✓', '✓', '✓', '✓'], [3], 2, 'Le pourcentage annoncé doit correspondre aux fréquences observées.')),
    ]),
    histoire('Réversibilité', ['Brouillon\nModifiable', 'Message envoyé\nDéjà lu', 'Annuler ?\nPas le même effort'], [
      ['Une action facile à défaire', 'Modifier un brouillon puis revenir au texte initial est simple. L’action est facilement réversible.', 'On peut retrouver l’état précédent.'],
      ['Une action difficile à défaire', 'Une fois le message envoyé et lu, le supprimer chez soi n’efface pas ce que le destinataire a appris.', 'Certaines conséquences ne s’annulent pas.'],
      ['Adapter le contrôle', 'On peut déléguer plus librement la préparation que l’envoi. La réversibilité décrit si l’on peut revenir en arrière, et à quel prix.', 'Plus une action est difficile à défaire, plus l’accord préalable compte.'],
    ], 'orange'),
  ],
  familles: [
    histoire('Régime de décision', ['Même dossier\nDonnées disponibles', 'Méthode choisie\nRègles ou score', 'Décision produite\nAvec sa justification'], [
      ['Partir du besoin', 'On veut décider si un dossier est recevable. On regarde d’abord les données et les exigences.', 'Le problème précède le choix de la méthode.'],
      ['Identifier ce qui tranche', 'Une règle peut comparer un revenu à un plafond. Un modèle statistique peut plutôt estimer un risque à partir d’exemples.', 'Le régime est le mécanisme qui produit le choix.'],
      ['Comprendre le résultat', 'Le choix de méthode change la manière d’expliquer et de vérifier la décision. Règles, scores, optimisation et langage n’apportent pas les mêmes garanties.', 'Nommer le régime aide à comprendre comment la décision est faite.'],
    ]),
    histoire('Auditabilité', ['Décision ancienne\nDossier refusé', 'Traces conservées\nRègle, données, version', 'Reconstitution\nPourquoi ce refus ?'], [
      ['Revenir sur une décision', 'Un usager demande pourquoi son dossier a été refusé le mois dernier.', 'Le résultat seul ne suffit pas.'],
      ['Retrouver les éléments', 'On retrouve la règle appliquée, les données examinées et la version en vigueur à cette date.', 'Les traces doivent expliquer ce qui a réellement été utilisé.'],
      ['Rendre le raisonnement vérifiable', 'On peut reconstituer la décision et vérifier qu’elle suivait la règle. Cette possibilité est l’auditabilité.', 'Auditable = contrôlable après coup avec des preuves.'],
    ]),
    comparer('Latence', 5, [
      ['Envoyer la demande', 'La demande part à la seconde zéro. Le résultat n’est pas encore disponible.', [['Temps écoulé', 0]], 'Début de l’attente.'],
      ['Attendre le traitement', 'Le système calcule et interroge un outil. Deux secondes se sont écoulées.', [['Temps écoulé', 2, 'orange']], 'Le délai inclut les attentes nécessaires.'],
      ['Recevoir la décision', 'La réponse arrive à la troisième seconde. La latence de cette demande est donc de trois secondes.', [['Temps écoulé', 3, 'vert']], 'Latence = durée entre demande et résultat.'],
    ], ' s'),
    histoire('Agent hybride', ['Lire un courrier\nModèle de langage', 'Vérifier le droit\nRègles explicites', 'Préparer un rendez-vous\nOptimisation'], [
      ['Adapter la première méthode', 'Un modèle de langage extrait les informations d’un courrier aux formulations variées.', 'On utilise sa capacité à traiter le texte.'],
      ['Changer de méthode pour décider', 'Des règles explicites vérifient les conditions d’éligibilité. Le texte extrait ne crée pas une autorisation.', 'La décision utilise une autre logique.'],
      ['Combiner les forces utiles', 'Un calcul d’optimisation cherche ensuite un rendez-vous compatible avec les agendas. L’agent combine plusieurs régimes : il est hybride.', 'Hybride = plusieurs méthodes assemblées pour un même service.'],
    ]),
  ],
  nonllm: [
    histoire('Moteur d’éligibilité', ['Dossier\nRevenu : 18 000 €', 'Règle\nPlafond : 20 000 €', 'Résultat du critère\nRespecté'], [
      ['Lire les faits', 'Le dossier indique un revenu de 18 000 €. Le moteur utilise ce fait comme entrée.', 'Les données du dossier sont explicites.'],
      ['Appliquer un critère', 'La règle exige un revenu au plus égal à 20 000 €. Elle compare donc 18 000 à 20 000.', 'Le critère est écrit avant le traitement.'],
      ['Combiner les critères', 'Ce critère est respecté. L’éligibilité complète demande encore de vérifier toutes les autres règles, par exemple les pièces obligatoires.', 'Un moteur d’éligibilité applique un ensemble de règles métier.'],
    ]),
    histoire('Heuristique', ['10 tickets\nÀ traiter', 'Raccourci\nLe plus ancien d’abord', 'Choix rapide\nSans tout optimiser'], [
      ['Avoir trop de choix', 'Le service doit décider quel ticket traiter d’abord. Comparer tous les ordres possibles peut être long.', 'On cherche une méthode simple.'],
      ['Utiliser une règle pratique', 'On choisit le ticket le plus ancien. C’est facile à calculer et souvent utile pour éviter une attente excessive.', 'Une heuristique est un raccourci de décision.'],
      ['Connaître sa limite', 'Un ticket plus récent peut être beaucoup plus urgent. Le raccourci ne garantit donc pas le meilleur ordre dans tous les cas.', 'Rapide et utile ne signifie pas optimal partout.'],
    ]),
    histoire('Politique d’action', ['Score de risque\n0,72', 'Seuil choisi\nSi score ≥ 0,70', 'Action\nRevue humaine'], [
      ['Recevoir un score', 'Un modèle donne 0,72 au dossier. Ce nombre ne dit pas encore quoi faire.', 'Un score décrit ; une politique décide.'],
      ['Appliquer une règle d’usage', 'Le service a décidé d’envoyer en revue les scores au moins égaux à 0,70. Le dossier dépasse ce seuil.', 'Le seuil traduit une politique métier.'],
      ['Déclencher une action', 'Le dossier part en revue humaine. Avec un autre seuil, le même score pourrait mener à une autre action.', 'Politique d’action = seuils et actions associées.'],
    ]),
    comparer('Dérive', 100, [
      ['Tester dans les conditions connues', 'Le modèle a été entraîné sur les anciens formulaires et y reconnaît correctement 95 % des champs.', [['Champs corrects', 95, 'vert']], 'La mesure de départ concerne les formulaires connus.'],
      ['Changer les données reçues', 'Un nouveau formulaire déplace les rubriques. Sans adaptation, le même modèle ne reconnaît plus que 70 % des champs.', [['Champs corrects', 70, 'orange']], 'Le monde a changé, le modèle est resté identique.'],
      ['Détecter le décalage', 'Ce suivi révèle une dérive de performance liée aux nouvelles données. Il faut analyser le changement avant de corriger ou réentraîner.', [['Champs corrects', 70, 'rouge']], 'Une bonne performance passée n’est pas une garantie durable.'],
    ], ' %'),
  ],
};
