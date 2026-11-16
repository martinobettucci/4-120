import { baseTableau as b } from './scenes.js';

export const COMPLEMENTS_AGENTIQUES = {
  composantes: [
    b('État interne, mémoire et outil', 'L’état interne représente la situation connue ; la mémoire en conserve des éléments ; un outil lit ou modifie un système extérieur.', ['Élément', 'Contenu', 'Où ?'], [
      ['Représenter la situation', 'Un assistant de réservation reçoit une demande pour mardi. Son état interne contient le jour demandé et le statut « à traiter ». Aucune réservation n’existe encore.', [['État interne', 'mardi demandé', 'assistant']], ['0-1'], 'Représenter une demande ne change pas encore le calendrier.'],
      ['Utiliser une mémoire', 'L’assistant retrouve aussi une préférence enregistrée : le matin. Cette information vient d’une interaction passée ; elle enrichit l’état utilisé pour la décision présente.', [['Demande', 'mardi', 'présent'], ['Mémoire', 'matin', 'passé']], ['1-1'], 'La mémoire apporte une information conservée d’un moment précédent.', ['Élément', 'Contenu', 'Origine']],
      ['Appeler un outil', 'L’outil de calendrier consulte les places puis, si cela est autorisé, crée une réservation. Son résultat revient dans l’état interne. La réservation extérieure et sa représentation doivent rester cohérentes.', [['Outil', 'réserver', 'calendrier'], ['Retour', 'identifiant', 'état interne']], ['0-2'], 'Un outil donne accès à un autre système ; son appel peut avoir un effet réel.'],
    ]),
  ],
  autonomie: [
    b('Score et fréquence observée', 'Un score de confiance doit être confronté à des résultats observés ; la valeur annoncée ne prouve pas à elle seule la fiabilité.', ['Groupe', 'Annonce', 'Résultat'], [
      ['Lire une annonce', 'Un système attribue un score de 0,9 à cent décisions comparables. Si ce score prétend représenter une probabilité de justesse, il annonce environ 90 décisions correctes sur cent à long terme.', [['100 décisions', 'score 0,9', 'à vérifier']], ['0-1'], 'Un score n’est pas sa propre validation.'],
      ['Comparer à la réalité', 'Une référence indépendante montre que seulement 60 décisions de ce groupe sont correctes. Dans cet échantillon, la fréquence de 60 % est bien inférieure aux 90 % annoncés.', [['100 décisions', '90 % annoncé', '60 % juste']], ['0-2'], 'La calibration compare des probabilités annoncées et des fréquences observées.'],
      ['Définir une permission séparément', 'Même une probabilité bien calibrée ne donne pas automatiquement le droit d’agir. La politique d’autonomie combine la fiabilité, les conséquences de l’erreur et les permissions du service.', [['Fiabilité', 'mesurée', 'information'], ['Permission', 'règle métier', 'décision']], ['1-2'], 'La mesure de confiance éclaire une autorisation ; elle ne la remplace pas.', ['Élément', 'Origine', 'Rôle']],
    ]),
  ],
  familles: [
    b('Composition et réussite de toute la chaîne', 'La réussite finale demande que toutes les étapes nécessaires réussissent ; des probabilités conditionnelles permettent de calculer cette réussite.', ['Étape', 'Cas reçus', 'Cas corrects'], [
      ['Compter les réussites de la première étape', 'Sur cent formulaires d’exemple, le lecteur extrait correctement 90 contenus. Les dix autres sont déjà erronés pour la chaîne qui exige une lecture correcte.', [['Lecture', '100', '90']], ['0-2'], 'Une première étape peut déjà limiter la réussite finale.'],
      ['Appliquer le taux dans le bon groupe', 'Le classement est correct pour 80 % des 90 contenus correctement lus. Cela donne 72 cas à la fois correctement lus et classés. Le second taux est défini conditionnellement au succès de la lecture.', [['Lecture', '100', '90'], ['Classement', '90', '72']], ['1-2'], 'Réussite conjointe : 0,90 × 0,80 = 0,72.'],
      ['Interpréter le résultat global', 'La chaîne complète réussit sur 72 cas sur cent. Une moyenne des deux taux, 85 %, ne décrirait pas cette exigence. Multiplier deux taux globaux non conditionnels demanderait une hypothèse supplémentaire d’indépendance.', [['Chaîne', '100', '72']], ['0-2'], 'Composer de bons composants exige de mesurer leurs dépendances.'],
    ]),
  ],
  nonllm: [
    b('Critères, unités et somme pondérée', 'Un score combine des critères selon une règle choisie ; ses poids dépendent de leurs unités et expriment un compromis.', ['Objet', 'Urgence', 'Attente'], [
      ['Identifier les critères', 'Deux réparations sont classées par urgence et attente. A a une urgence 3 et attend 1 jour ; B a une urgence 1 et attend 4 jours. Ces colonnes décrivent deux propriétés différentes.', [['A', '3', '1 jour'], ['B', '1', '4 jours']], ['0-1', '0-2'], 'Un critère doit avoir un sens, une échelle et éventuellement une unité.'],
      ['Choisir la règle de classement', 'Avec score = 2 × urgence + attente en jours, A obtient 7 et B obtient 6. A passe devant. Le poids 2 exprime le compromis choisi pour ce score.', [['A', '2 × 3 + 1', '7'], ['B', '2 × 1 + 4', '6']], ['0-2'], 'Une pondération transforme plusieurs critères en un classement.', ['Objet', 'Calcul', 'Score']],
      ['Conserver le sens lors d’un changement d’unité', 'Si l’attente est exprimée en heures, on doit la diviser par 24 pour conserver ce même score. Additionner directement 24 et 96 changerait le compromis, alors que les dossiers seraient identiques.', [['A', '2 × 3 + 24/24', '7'], ['B', '2 × 1 + 96/24', '6']], ['1-1'], 'Changer l’unité d’une entrée peut imposer de changer son poids.', ['Objet', 'Calcul', 'Score']],
    ]),
  ],
  llm: [
    b('Texte plausible et fait vérifié', 'La probabilité d’une suite de texte décrit la génération ; la vérité de l’affirmation exige une vérification portant sur le monde ou une source.', ['Élément', 'Contenu', 'Statut'], [
      ['Produire une phrase plausible', 'À la question sur l’horaire d’une bibliothèque fictive, le modèle complète « Elle ferme à 18 heures ». Cette phrase ressemble à une réponse habituelle, mais aucun horaire n’a été consulté.', [['Génération', '18 h', 'plausible']], ['0-2'], 'Une suite de mots plausible peut exprimer un fait faux.'],
      ['Chercher une preuve adaptée', 'Le document actuel de cette bibliothèque indique 17 heures le samedi. L’horaire dépend du jour et de la version du document : ce sont des informations à apporter au raisonnement.', [['Source datée', 'samedi : 17 h', 'à appliquer']], ['0-1'], 'La preuve doit correspondre au lieu, au jour et à la période concernés.'],
      ['Relier la réponse à la source', 'La réponse correcte pour ce samedi reprend 17 heures et sa référence. La vérification a porté sur le sens de l’affirmation, pas seulement sur sa grammaire ou son assurance.', [['Réponse', 'samedi : 17 h', 'référencée']], ['0-2'], 'La probabilité d’un token ne constitue pas une probabilité calibrée de vérité de la phrase.'],
    ]),
  ],
  complexite: [
    b('Séquence, parallèle et durée totale', 'Des tâches dépendantes s’attendent ; des tâches indépendantes peuvent se chevaucher, avec un coût de coordination.', ['Organisation', 'Durées', 'Total'], [
      ['Attendre le résultat précédent', 'Une lecture prend 2 secondes, puis un calcul qui dépend de cette lecture prend 3 secondes. Les durées s’additionnent : 5 secondes, hors transmission.', [['Séquence', '2 + 3', '5 s']], ['0-2'], 'En séquence, la tâche suivante attend le résultat précédent.'],
      ['Chevaucher deux tâches indépendantes', 'Deux contrôles indépendants prennent 2 et 3 secondes et commencent ensemble. Si l’on attend les deux, la durée idéale est celle du plus long : 3 secondes.', [['Deux contrôles', 'max(2, 3)', '3 s']], ['0-1'], 'En parallèle, la fin dépend du plus long travail nécessaire.'],
      ['Ajouter la coordination', 'Si rassembler les résultats prend encore 1 seconde, le total parallèle devient 4 secondes. Créer plusieurs agents n’accélère donc pas automatiquement toute chaîne.', [['Contrôles', '3 s', ''], ['Coordination', '1 s', ''], ['Total', '3 + 1', '4 s']], ['2-2'], 'Le gain dépend des dépendances, des ressources et des échanges.'],
    ]),
  ],
  risque: [
    b('Majorité et erreurs communes', 'Un vote majoritaire compte des avis ; son gain dépend des cas sur lesquels les votants se trompent ensemble.', ['Cas', 'Avis A / B / C', 'Majorité'], [
      ['Compter les avis', 'Trois classifieurs rendent un avis oui ou non. Pour un cas dont la référence est non, deux oui et un non forment une majorité oui : le vote final est faux.', [['Référence non', 'oui / oui / non', 'oui']], ['0-2'], 'Un accord majoritaire n’est pas une preuve de justesse.'],
      ['Diversifier les erreurs', 'Sur un autre cas, seul A se trompe. B et C répondent correctement : la majorité corrige cette erreur isolée. C’est le bénéfice recherché.', [['Référence non', 'oui / non / non', 'non']], ['0-1'], 'Une majorité peut corriger une erreur quand les autres avis sont corrects.'],
      ['Reconnaître une cause commune', 'Si les trois systèmes lisent la même pièce erronée, ils peuvent tous répondre oui à tort. Leur nombre n’apporte alors pas trois preuves indépendantes.', [['Source fausse', 'oui / oui / oui', 'oui']], ['0-0'], 'Avant de compter les avis, examiner les informations et erreurs qu’ils partagent.'],
    ]),
  ],
  routage: [
    b('Majorité simple et vote pondéré', 'Une majorité simple compte les avis ; un vote pondéré additionne des poids fixés selon une politique.', ['Avis', 'Choix', 'Poids'], [
      ['Compter les personnes', 'Trois avis portent sur une proposition : A et B approuvent, C refuse. En majorité simple, deux voix sur trois l’emportent pour approuver.', [['A', 'oui', '1'], ['B', 'oui', '1'], ['C', 'non', '1']], ['0-1', '1-1'], 'Majorité simple : chaque voix compte de la même façon.'],
      ['Changer la règle de poids', 'Supposons que la politique donne un poids 3 à C et 1 aux deux autres. Le oui totalise 2 et le non 3 : la décision pondérée devient non.', [['A', 'oui', '1'], ['B', 'oui', '1'], ['C', 'non', '3']], ['2-2'], 'Les poids peuvent inverser la décision d’une majorité simple.'],
      ['Lire une part de poids', 'Le refus reçoit 3 sur un poids total de 5, soit 60 %. Ce nombre décrit le vote selon la politique ; il ne démontre pas 60 % de probabilité que le refus soit correct.', [['Oui', 'poids 2', '40 %'], ['Non', 'poids 3', '60 %']], ['1-2'], 'Une part de votes et une probabilité de vérité sont deux mesures différentes.', ['Choix', 'Poids total', 'Part des poids']],
    ]),
  ],
  rag: [
    b('Pertinence, précision et rappel de recherche', 'La précision regarde les résultats renvoyés ; le rappel regarde les documents utiles qui existaient dans le corpus.', ['Documents', 'Utiles', 'Inutiles'], [
      ['Définir ce que l’on cherche', 'Un corpus contient dix documents, dont quatre répondent réellement à la question. Cette pertinence est définie par une référence indépendante du classement.', [['Corpus', '4', '6']], ['0-1'], 'Un document utile contient une information qui répond à la question.'],
      ['Regarder ce qui a été renvoyé', 'Le moteur renvoie trois documents : deux utiles et un inutile. Parmi les résultats renvoyés, la précision vaut 2 / 3, environ 67 %.', [['Renvoyés', '2', '1'], ['Non renvoyés', '2', '5']], ['0-1', '0-2'], 'Précision : documents utiles renvoyés / tous les documents renvoyés.'],
      ['Regarder ce qui manque', 'Sur les quatre documents utiles du corpus, seuls deux ont été renvoyés : le rappel vaut 2 / 4 = 50 %. Le générateur n’aura pas accès aux deux autres si aucun autre passage ne les apporte.', [['Renvoyés', '2', '1'], ['Non renvoyés', '2', '5']], ['1-1'], 'Rappel : documents utiles renvoyés / tous les documents utiles du corpus.'],
    ]),
  ],
  patterns: [
    b('Accord, désaccord et référence', 'Deux contrôles peuvent être d’accord ou non ; pour savoir si cet accord est juste, il faut une référence extérieure aux avis.', ['Contrôle A', 'Contrôle B', 'Traitement'], [
      ['Énumérer les combinaisons', 'Chaque contrôle peut répondre oui ou non. Il existe donc quatre combinaisons : oui/oui, oui/non, non/oui, non/non.', [['oui', 'oui', '?'], ['oui', 'non', '?'], ['non', 'oui', '?'], ['non', 'non', '?']], ['0-0', '3-1'], 'Deux avis binaires donnent quatre combinaisons, pas seulement deux.'],
      ['Attribuer une suite', 'La double validation fictive accepte les deux oui, refuse les deux non et demande une revue pour les deux désaccords. L’organisation transforme les combinaisons en actions.', [['oui', 'oui', 'accepter'], ['oui', 'non', 'revoir'], ['non', 'oui', 'revoir'], ['non', 'non', 'refuser']], ['1-2', '2-2'], 'Le pattern définit un traitement pour chaque combinaison.'],
      ['Contrôler aussi les accords', 'Un oui/oui peut porter sur un dossier réellement non admissible. Réviser seulement les désaccords laisserait cette erreur invisible ; il faut aussi contrôler un échantillon d’accords.', [['Avis', 'oui / oui', 'accord'], ['Référence', 'non', 'erreur']], ['1-2'], 'Accord entre systèmes et conformité à la réalité sont deux questions distinctes.', ['Élément', 'Réponse', 'Interprétation']],
    ]),
  ],
  implementation: [
    b('Valeur retournée, effet et reprise', 'Une fonction peut renvoyer une information ou provoquer un effet ; répéter son appel doit être raisonné selon cet effet.', ['Opération', 'Résultat', 'Effet externe'], [
      ['Calculer une valeur', 'La fonction de calcul reçoit 20 et 5, puis renvoie 25. Refaire ce calcul avec les mêmes entrées ne crée pas un second dossier.', [['additionner', '25', 'aucun']], ['0-1'], 'Un résultat de calcul peut exister sans effet sur un système extérieur.'],
      ['Exécuter une action', 'La fonction de création reçoit une demande et écrit une réservation. Elle renvoie son identifiant. Un nouvel appel mal conçu pourrait créer une deuxième réservation.', [['créer', 'ID R42', 'réservation']], ['0-2'], 'Un effet externe peut se répéter, même si l’intention reste la même.'],
      ['Prévoir une reprise sûre', 'Si la réponse se perd après l’écriture, on ne sait pas forcément si l’action a réussi. Une clé de demande stable permet ici de retrouver R42 au lieu de recréer la réservation.', [['clé D17', 'retrouver R42', 'une seule'], ['reprise D17', 'même résultat', 'pas de doublon']], ['1-2'], 'L’idempotence permet de répéter une opération sans répéter son effet prévu.', ['Demande', 'Résultat', 'Effet externe']],
    ]),
  ],
  evaluation: [
    b('Réalité et décision : les quatre cases', 'Une décision de blocage peut être juste ou erronée ; croiser la réalité et la décision distingue les deux réussites et les deux erreurs.', ['Réalité', 'Bloqué', 'Laissé passer'], [
      ['Séparer les deux axes', 'On évalue cent dossiers : vingt sont réellement non conformes et quatre-vingts conformes. Le contrôle peut bloquer ou laisser passer chacun ; la décision n’est pas la réalité.', [['Non conforme', '?', '?'], ['Conforme', '?', '?']], ['0-0', '1-0'], 'Ici, « positif » signifie que le contrôle bloque le dossier.'],
      ['Classer les non conformes', 'Le contrôle bloque quinze dossiers non conformes et en laisse passer cinq. Les quinze sont des vrais positifs ; les cinq des faux négatifs.', [['Non conforme', '15 : VP', '5 : FN'], ['Conforme', '?', '?']], ['0-1', '0-2'], 'Vrai/faux indique la justesse ; positif/négatif indique la décision du contrôle.'],
      ['Classer les conformes', 'Il bloque aussi huit dossiers conformes et en laisse passer soixante-douze. Les huit sont des faux positifs ; les soixante-douze des vrais négatifs. Toutes les cent décisions ont maintenant une case.', [['Non conforme', '15 : VP', '5 : FN'], ['Conforme', '8 : FP', '72 : VN']], ['1-1', '1-2'], 'VP + FN + FP + VN = 15 + 5 + 8 + 72 = 100.'],
    ]),
    b('Dénominateur et question mesurée', 'Le dénominateur définit le groupe dont on parle ; un même numérateur produit des indicateurs différents selon ce groupe.', ['Question', 'Calcul', 'Résultat'], [
      ['Mesurer les blocages inutiles parmi les conformes', 'Dans les mêmes cent dossiers, huit des quatre-vingts conformes sont bloqués. Le taux de faux positifs vaut 8 / 80 = 10 %.', [['Conformes bloqués', '8 / 80', '10 %']], ['0-1'], 'Taux de faux positifs : FP / (FP + VN).'],
      ['Mesurer les erreurs parmi les blocages', 'Le contrôle bloque quinze non conformes et huit conformes, soit vingt-trois dossiers. Parmi ces blocages, 8 / 23, environ 35 %, sont inutiles. Ce n’est pas le même taux que 8 / 80.', [['Conformes bloqués', '8 / 80', '10 %'], ['Blocages inutiles', '8 / 23', '≈ 35 %']], ['1-1'], 'Part de blocages inutiles : FP / (VP + FP).'],
      ['Mesurer les problèmes détectés', 'Parmi les vingt dossiers non conformes, quinze sont bloqués : la sensibilité vaut 15 / 20 = 75 %. Chaque indicateur répond à une question et nomme sa population de référence.', [['Conformes bloqués', '8 / 80', '10 %'], ['Blocages inutiles', '8 / 23', '≈ 35 %'], ['Problèmes bloqués', '15 / 20', '75 %']], ['2-1'], 'Sensibilité : VP / (VP + FN). Toujours annoncer le groupe compté.'],
    ]),
  ],
  gouvernance: [
    b('Chronologie, version et preuve', 'Pour expliquer une décision passée, il faut retrouver les faits et les règles disponibles au moment où elle a été prise.', ['Moment', 'Règle', 'Donnée'], [
      ['Situer la décision dans le temps', 'Lundi, une demande est examinée avec la règle version 1 : plafond fictif de 100 unités. Son montant de 90 respecte ce plafond.', [['Lundi', 'v1 : 100', 'montant 90']], ['0-0'], 'Une décision se situe à une date avec un état des informations.'],
      ['Observer un changement de règle', 'Mardi, le plafond passe à 80 dans la version 2. Rejouer la demande de lundi avec cette nouvelle règle donnerait un autre résultat, sans expliquer celui pris lundi.', [['Lundi', 'v1 : 100', 'montant 90'], ['Mardi', 'v2 : 80', 'montant 90']], ['1-1'], 'La règle actuelle ne suffit pas à expliquer une décision ancienne.'],
      ['Conserver la version utilisée', 'Le journal de lundi garde la version 1, la pièce donnant le montant 90 et l’acteur responsable. Une empreinte peut aider à vérifier que la pièce n’a pas changé ; elle ne prouve pas à elle seule la vérité de son contenu.', [['Décision lundi', 'version 1', 'pièce archivée'], ['Responsable', 'identifié', 'trace liée']], ['0-2'], 'Une preuve exploitable relie date, version, faits et responsabilité.', ['Élément', 'Identification', 'Preuve']],
    ]),
  ],
  casusage: [
    b('Référence simple et bénéfice mesuré', 'Une architecture se justifie par un bénéfice observé face à une référence, sur les mêmes cas et avec ses coûts supplémentaires.', ['Méthode', 'Erreurs', 'Coût'], [
      ['Définir un point de comparaison', 'Un service traite cent demandes avec une règle simple. Il commet dix erreurs pour un coût total de 20 unités. Cette méthode constitue la référence de comparaison.', [['Règle simple', '10 / 100', '20']], ['0-0'], 'Une référence donne un sens concret à la notion d’amélioration.'],
      ['Comparer sur les mêmes demandes', 'Une architecture plus complexe traite les mêmes cent demandes, avec la même référence de justesse. Elle fait six erreurs pour un coût de 32. Elle évite quatre erreurs et coûte douze unités de plus.', [['Règle simple', '10 / 100', '20'], ['Architecture', '6 / 100', '32']], ['1-1'], 'Comparer les mêmes cas permet d’attribuer les différences plus clairement.'],
      ['Relier gain et surcoût', 'Le surcoût par erreur évitée vaut 12 / 4 = 3 unités dans cette campagne. La décision dépend aussi de la gravité des erreurs restantes et du domaine d’utilisation.', [['Gain', '4 erreurs', 'évitées'], ['Surcoût', '12 unités', ''], ['Ratio', '12 / 4', '3 par erreur']], ['2-2'], 'Ajouter des composants doit répondre à un bénéfice et à des contraintes explicites.', ['Élément', 'Valeur', 'Interprétation']],
    ]),
  ],
};
