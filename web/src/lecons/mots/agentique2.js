import { mot, pas, histoire, comparer, tableau } from './scenes.js';
export const AGENTIQUE2 = {
  llm: [
    histoire('LLM', ['Texte reçu\n« Le chat dort sur… »', 'Suites plausibles\nle tapis / le canapé', 'Texte produit\n« le tapis »'], [
      ['Recevoir du texte', 'Un grand modèle de langage reçoit un début de texte. Il a appris des régularités sur beaucoup d’exemples.', 'LLM signifie grand modèle de langage.'],
      ['Prévoir une suite', 'Il attribue des probabilités à différentes suites possibles. Il peut ensuite choisir un élément de texte à ajouter.', 'Il prédit des éléments de texte, appelés tokens.'],
      ['Continuer progressivement', 'Il ajoute une suite, puis recommence avec le texte enrichi. Une phrase plausible n’est pas automatiquement un fait vérifié.', 'Produire du langage ne suffit pas à garantir sa vérité.'],
    ]),
    histoire('Hallucination', ['Question\n« Quel article le dit ? »', 'Réponse inventée\n« Article 42 »', 'Source vérifiée\nAucun article 42'], [
      ['Demander une référence', 'Dans cet exemple fictif, on demande quel article du règlement autorise une action.', 'Une référence doit pouvoir être vérifiée.'],
      ['Obtenir une réponse convaincante', 'Le modèle écrit « article 42 » avec assurance. La formulation semble précise, mais la référence est inventée.', 'Une réponse précise peut être fausse.'],
      ['Comparer au document', 'Le règlement ne contient aucun article 42. Cette information fabriquée, présentée comme un fait, est une hallucination.', 'Vérifier la source permet de repérer l’invention.'],
    ], 'orange'),
    histoire('Extraction', ['Texte libre\n« Devis de 300 euros »', 'Repérer le montant\n300 euros', 'Champ structuré\nmontant = 300'], [
      ['Partir d’une phrase', 'Le courrier contient « Mon devis est de 300 euros ». Le système reçoit une phrase, pas encore un champ de formulaire.', 'Le texte libre peut prendre différentes formes.'],
      ['Identifier une information', 'L’extraction repère que 300 euros désigne le montant du devis.', 'On associe une valeur à son sens.'],
      ['Ranger dans un format', 'On obtient le champ montant = 300 et l’unité euro. Un programme peut ensuite vérifier ou calculer avec cette valeur.', 'Extraire transforme le texte en données structurées.'],
    ]),
    histoire('Garde-fou', ['Montant extrait\n6 000 €', 'Contrôle\nPlafond : 5 000 €', 'Exécution bloquée\nRevue nécessaire'], [
      ['Recevoir une proposition', 'Le modèle a extrait un montant de 6 000 €. Le versement n’a pas encore lieu.', 'Une sortie de modèle n’est pas une autorisation.'],
      ['Appliquer un contrôle', 'Une règle compare le montant au plafond autorisé de 5 000 €. Le montant dépasse le plafond.', 'Le contrôle donne un résultat reproductible.'],
      ['Empêcher l’effet interdit', 'L’exécution est bloquée et le dossier part en revue. Ce garde-fou ne vérifie que le plafond ; d’autres contrôles peuvent être nécessaires.', 'Un garde-fou protège une exigence précise avant l’action.'],
    ], 'orange'),
  ],
  complexite: [
    histoire('Diffusion de la complexité', ['Lire les pièces\nAgent A', 'Vérifier les critères\nAgent B', 'Préparer la réponse\nAgent C'], [
      ['Découper une grande tâche', 'Traiter tout un dossier contient plusieurs tâches différentes. On confie d’abord la lecture des pièces à un agent.', 'Chaque sous-problème devient plus limité.'],
      ['Passer un résultat exploitable', 'L’agent de vérification reçoit les faits extraits et applique les critères. Il n’a pas à refaire toute la lecture.', 'La séparation dépend d’échanges bien définis.'],
      ['Assembler le résultat final', 'Un troisième agent prépare la réponse à partir de la décision. Répartir la complexité facilite les spécialités, mais ajoute de la coordination.', 'Des petites tâches organisées forment le traitement complet.'],
    ]),
    histoire('Interface', ['Agent lecteur\nTrouve 300 €', 'Format transmis\nmontant : 300', 'Agent calculateur\nUtilise le nombre'], [
      ['Produire une information', 'L’agent lecteur extrait un montant. Un autre agent doit pouvoir le réutiliser.', 'Une information doit sortir sous une forme prévue.'],
      ['Définir le passage', 'L’interface précise le champ montant, son type numérique et son unité. « Trois cents environ » ne respecterait pas ce format.', 'L’interface décrit ce qui circule entre composants.'],
      ['Vérifier la réception', 'Le calculateur lit le nombre 300 sans devoir deviner ce qu’il signifie. Si le champ manque, le système doit le signaler.', 'Un bon échange réduit les malentendus entre agents.'],
    ]),
    comparer('Fiabilité de bout en bout', 100, [
      ['Passer une première étape', 'Sur 100 dossiers, la première étape en traite correctement 90. Dix sont déjà en erreur.', [['Dossiers encore sans erreur', 90]], 'Après la première étape : 90 sur 100.'],
      ['Passer la seconde', 'Supposons que la seconde étape réussisse sur 90 % de ces 90 dossiers. Il en reste 81 correctement traités de bout en bout.', [['Dossiers encore sans erreur', 81, 'orange']], '90 % de 90 = 81.'],
      ['Mesurer toute la chaîne', 'La fiabilité complète vaut donc 81 %, pas 90 %. Ce calcul suppose le taux de réussite annoncé sur les dossiers arrivant à la seconde étape.', [['Dossiers encore sans erreur', 81, 'vert']], 'Une chaîne réussit seulement si toutes ses étapes nécessaires réussissent.'],
    ], ' %'),
    histoire('Orchestration', ['Lancer la lecture', 'Attendre le résultat\nPuis vérifier', 'Erreur ?\nReprendre ou transmettre'], [
      ['Donner le départ', 'Le coordinateur lance d’abord la lecture du dossier. Il sait quelle tâche doit commencer.', 'Il organise l’ordre des opérations.'],
      ['Passer la main au bon moment', 'La vérification démarre quand les informations nécessaires sont disponibles. Elle ne doit pas utiliser un résultat incomplet.', 'La coordination relie les étapes et leurs dépendances.'],
      ['Gérer les imprévus', 'Si un agent échoue, le coordinateur prévoit une nouvelle tentative ou une transmission humaine. Cette gestion est l’orchestration.', 'Orchestrer = organiser qui agit, quand, et quoi faire en cas d’échec.'],
    ]),
  ],
  risque: [
    histoire('Diffusion du risque', ['Même dossier', 'Avis par règles\n+ avis statistique', 'Comparer\nPuis décider'], [
      ['Éviter une seule voie', 'Le dossier est important. On veut éviter de dépendre d’un seul mécanisme de décision.', 'Le même problème est examiné plusieurs fois.'],
      ['Diversifier les approches', 'Un agent utilise des règles explicites, un autre un modèle statistique. Leurs points faibles peuvent être différents.', 'Des approches différentes peuvent repérer des erreurs différentes.'],
      ['Organiser la décision finale', 'On compare les avis et on prévoit une revue en cas de doute. Multiplier les agents ne protège pas s’ils répètent tous les mêmes erreurs.', 'La diversité et l’arbitrage comptent autant que le nombre.'],
    ]),
    histoire('Arbitre', ['Avis reçus\nOui / non', 'Règle d’arbitrage\nDésaccord → humain', 'Résultat\nRevue humaine'], [
      ['Recevoir plusieurs avis', 'Deux agents examinent le même dossier et donnent des avis différents.', 'Un ensemble d’avis n’est pas encore une décision.'],
      ['Appliquer une règle explicite', 'L’arbitre suit la règle prévue : en cas de désaccord, demander une revue humaine.', 'L’arbitrage peut utiliser des poids, des priorités ou une transmission.'],
      ['Produire une issue', 'Le dossier est transmis, au lieu d’exécuter arbitrairement un des avis.', 'L’arbitre transforme les avis en une décision exploitable.'],
    ]),
    comparer('Indépendance', 100, [
      ['Connaître les erreurs de B', 'L’agent B se trompe sur 10 % des dossiers de la population étudiée.', [['Erreur de B en général', 10]], 'On mesure une fréquence de référence.'],
      ['Regarder quand A se trompe', 'Si les erreurs sont indépendantes, apprendre que A s’est trompé ne change pas la probabilité d’erreur de B : elle reste 10 %.', [['Erreur de B en général', 10], ['Erreur de B quand A a tort', 10, 'vert']], 'L’erreur de A n’apporte pas d’information sur celle de B.'],
      ['Calculer le risque commun', 'Si A se trompe à 20 % et B à 10 %, l’indépendance donne 20 % × 10 % = 2 % d’erreurs communes.', [['Erreur de A', 20], ['Erreur de B', 10], ['Erreurs communes', 2, 'orange']], 'Ce produit n’est valable que sous l’hypothèse d’indépendance.'],
    ], ' %'),
    mot('Corrélation des erreurs', [
      pas('Examiner les mêmes cas', 'Deux agents sont évalués sur trois mêmes dossiers. On connaît la bonne réponse pour chacun.', tableau(['Dossier', 'Agent A', 'Agent B'], [['1', 'juste', 'juste'], ['2', 'faux', '?'], ['3', 'juste', 'juste']], ['1-1'], 'A se trompe sur le dossier 2.')),
      pas('Repérer une erreur partagée', 'B se trompe lui aussi sur le dossier 2. Si ce comportement se répète souvent, leurs erreurs sont liées.', tableau(['Dossier', 'Agent A', 'Agent B'], [['1', 'juste', 'juste'], ['2', 'faux', 'faux'], ['3', 'juste', 'juste']], ['1-1', '1-2'], 'Les agents peuvent échouer ensemble sur les mêmes cas.')),
      pas('Ne pas compter deux preuves', 'Deux modèles entraînés sur les mêmes défauts de données peuvent partager ces erreurs. Leur accord ne constitue alors pas deux confirmations indépendantes.', tableau(['Dossier', 'Accord ?', 'Correct ?'], [['1', 'oui', 'oui'], ['2', 'oui', 'non'], ['3', 'oui', 'oui']], ['1-1', '1-2'], 'Cet exemple illustre le risque ; sa mesure demande de nombreux cas.')),
    ]),
  ],
};
