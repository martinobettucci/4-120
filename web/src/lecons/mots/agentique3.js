import { mot, pas, histoire, jetons, tableau } from './scenes.js';
export const AGENTIQUE3 = {
  routage: [
    histoire('Routage', ['Message reçu\n« Erreur de facture »', 'Identifier le sujet\nFacturation', 'Bonne file\nService comptable'], [
      ['Recevoir une demande', 'Le service reçoit un message qui signale une erreur sur une facture.', 'Plusieurs équipes pourraient recevoir les demandes.'],
      ['Reconnaître le destinataire', 'Le routeur identifie le sujet et choisit la file spécialisée en facturation.', 'Router = choisir où la demande doit aller.'],
      ['Transmettre à une seule file', 'Le service comptable reçoit le message. Le routeur n’a pas encore résolu l’erreur de facture : il a orienté le travail.', 'Bien orienter évite les renvois entre services.'],
    ]),
    histoire('Arbitrage', ['Deux avis\nAccepter / refuser', 'Règle de priorité\nVérifier le droit', 'Décision finale\nRefus justifié'], [
      ['Rassembler les avis', 'Un modèle propose d’accepter, mais les règles signalent une pièce obligatoire manquante.', 'Les deux avis portent sur le même dossier.'],
      ['Appliquer la priorité prévue', 'La politique donne priorité à cette exigence explicite. Le score du modèle ne la remplace pas.', 'L’arbitrage suit une règle décidée à l’avance.'],
      ['Trancher et expliquer', 'Le dossier est refusé ou renvoyé pour complément selon la procédure. La décision finale cite l’exigence manquante.', 'Arbitrer = résoudre la concurrence entre des avis.'],
    ]),
    histoire('Modération', ['Réponse préparée\nAvec un nom privé', 'Contrôle\nDonnée à masquer', 'Réponse autorisée\nNom retiré'], [
      ['Examiner avant de sortir', 'Le système prépare une réponse destinée à un canal public. Elle contient un nom qui ne doit pas être diffusé.', 'La réponse n’est pas encore envoyée.'],
      ['Appliquer la règle de protection', 'Le contrôle repère le champ interdit. Il peut bloquer la réponse ou demander une version corrigée.', 'La modération protège une règle d’entrée, de sortie ou d’action.'],
      ['Laisser passer ce qui est autorisé', 'Une réponse sans ce nom est envoyée. Le contrôle du nom ne garantit pas que tout le reste du texte est exact.', 'Autoriser un contenu exige les contrôles adaptés au risque.'],
    ], 'orange'),
    histoire('Escalade', ['Avis insuffisant\nCas inconnu', 'Suspendre l’action\nPréparer les éléments', 'Niveau supérieur\nResponsable métier'], [
      ['Repérer une limite', 'Le dossier ne correspond à aucun cas que le système sait traiter avec les règles prévues.', 'Le système reconnaît sa limite.'],
      ['Transmettre sans agir à l’aveugle', 'Il garde les éléments utiles et suspend l’action. Le dossier doit être compréhensible pour la personne qui le reprend.', 'Escalader ne signifie pas simplement afficher une erreur.'],
      ['Faire décider au bon niveau', 'Une responsable examine le dossier et tranche. L’escalade confie la décision à une autorité supérieure.', 'Le contrôle passe à quelqu’un qui peut décider.'],
    ]),
  ],
  rag: [
    histoire('RAG', ['Question\n« Quel délai ? »', 'Chercher la source\n« Dépôt sous 30 jours »', 'Répondre\nAvec ce passage'], [
      ['Partir d’une question', 'La personne demande le délai de dépôt. Le modèle ne doit pas inventer le règlement.', 'On commence par chercher une information pertinente.'],
      ['Retrouver un passage', 'La recherche retrouve, dans notre règlement fictif, la phrase « Le dépôt se fait sous 30 jours ».', 'Le passage trouvé est fourni au modèle.'],
      ['Rédiger à partir de la source', 'Le modèle répond en s’appuyant sur ce passage et sa référence. Il faut encore vérifier qu’il l’a correctement compris.', 'RAG = chercher des passages, puis générer une réponse avec eux.'],
    ]),
    histoire('Morceau', ['Document long\nPlusieurs pages', 'Découpage\nQuelques phrases', 'Recherche\nUn extrait à la fois'], [
      ['Avoir un grand document', 'Le règlement contient beaucoup de sujets. Envoyer tout le document à chaque question serait peu précis.', 'On veut retrouver seulement ce qui aide à répondre.'],
      ['Créer des extraits', 'On découpe le document en petits passages, appelés morceaux ou chunks, en essayant de conserver leur sens.', 'Un morceau doit rester compréhensible.'],
      ['Chercher le bon extrait', 'Chaque morceau est repérable séparément. La recherche peut ainsi retrouver le passage sur les délais sans transmettre toutes les autres pages.', 'Le découpage influence la qualité de la recherche.'],
    ]),
    mot('Rappel', [
      pas('Préparer cinq questions', 'Pour chacune de ces cinq questions, on connaît le passage qui permet de répondre. On teste uniquement l’étage de recherche.', jetons(5, ['✓', '×', '✓', '✓', '✓'], [0, 2, 3, 4], 0, 'Chaque jeton représente une question du banc.')),
      pas('Chercher les bons passages', 'Pour quatre questions, le bon passage figure parmi ceux transmis au modèle. Pour la question 2, il manque.', jetons(5, ['✓', '×', '✓', '✓', '✓'], [0, 2, 3, 4], 1, '✓ = passage utile transmis · × = passage utile absent')),
      pas('Mesurer cette couverture', 'Dans cet atelier, le rappel vaut 4 ÷ 5 = 80 %. Cela mesure la présence de la source utile, pas encore la justesse du texte rédigé.', jetons(5, ['✓', '×', '✓', '✓', '✓'], [0, 2, 3, 4], 2, 'Rappel du banc = questions couvertes / questions testées.')),
    ]),
    histoire('Contexte', ['Question\n« Quel délai ? »', 'Texte ajouté\nExtrait du règlement', 'Entrée du modèle\nQuestion + extrait'], [
      ['Poser une question', 'La question ne contient pas forcément la réponse. Le système cherche une information utile.', 'La question est une partie de l’entrée.'],
      ['Joindre un passage', 'Il ajoute le passage du règlement sur le délai. Ce texte supplémentaire est le contexte fourni pour cette réponse.', 'Le contexte apporte des informations à utiliser maintenant.'],
      ['Répondre avec les éléments reçus', 'Le modèle reçoit la question et ce contexte ensemble. Si l’extrait est hors sujet ou incomplet, il peut encore se tromper.', 'Plus de contexte n’est utile que s’il est pertinent.'],
    ]),
  ],
  patterns: [
    histoire('Design pattern', ['Problème récurrent\nCoordonner des tâches', 'Organisation connue\nUn superviseur', 'Réutilisation\nAdapter au nouveau cas'], [
      ['Reconnaître un problème familier', 'Plusieurs agents doivent travailler dans le bon ordre et signaler leurs échecs. Ce besoin revient souvent.', 'On ne repart pas forcément de zéro.'],
      ['Nommer une organisation', 'On peut utiliser un superviseur central pour distribuer et contrôler les tâches. C’est un exemple de design pattern, ou patron d’architecture.', 'Le nom désigne une organisation réutilisable.'],
      ['Adapter plutôt que copier aveuglément', 'On reprend cette organisation dans un nouveau service, en adaptant ses règles. Un patron n’est pas une solution universelle.', 'Un pattern aide à discuter et à réutiliser une architecture.'],
    ]),
    histoire('Superviseur', ['Distribuer\nTâche à l’agent A', 'Collecter\nRésultat de A', 'Contrôler\nContinuer ou reprendre'], [
      ['Donner une mission', 'L’agent central envoie une tâche de lecture à un agent spécialisé.', 'Le superviseur organise le travail.'],
      ['Recevoir le résultat', 'Il récupère les informations extraites et vérifie si le format et les champs attendus sont présents.', 'Les résultats repassent par un point de contrôle.'],
      ['Décider de la suite', 'Si tout est complet, il lance la vérification métier ; sinon il organise la reprise. Il ne fait pas forcément lui-même chaque tâche.', 'Superviser = distribuer, collecter et contrôler.'],
    ]),
    histoire('Contradicteur', ['Proposition\n« Dossier complet »', 'Contre-examen\n« Signature absente »', 'Correction\nDemander la signature'], [
      ['Recevoir une proposition', 'Un premier agent estime que le dossier est complet.', 'Une première réponse peut comporter une erreur.'],
      ['Chercher ce qui ne va pas', 'Le contradicteur cherche activement une raison de contester. Il remarque qu’une signature manque.', 'Son rôle est de mettre la proposition à l’épreuve.'],
      ['Utiliser la critique', 'La proposition est corrigée avant exécution. Le contradicteur peut lui aussi se tromper : ses objections doivent être vérifiables.', 'Contredire utilement exige des raisons, pas une opposition automatique.'],
    ], 'orange'),
    histoire('Double validation', ['Avis A\nOui', 'Avis B\nOui', 'Accord des deux\nAction autorisée'], [
      ['Obtenir un premier accord', 'L’agent A valide le dossier. L’action attend encore une deuxième validation.', 'Un seul oui ne suffit pas.'],
      ['Demander un second examen', 'L’agent B valide aussi. S’il refusait, l’action resterait suspendue selon le mécanisme prévu.', 'Les deux validations sont nécessaires.'],
      ['Exécuter sous la règle commune', 'L’action est autorisée parce que les deux agents approuvent. Ce mécanisme reste fragile s’ils partagent les mêmes erreurs.', 'Deux accords ne constituent pas une preuve infaillible.'],
    ]),
  ],
};
