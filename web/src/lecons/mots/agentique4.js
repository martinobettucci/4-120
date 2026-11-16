import { mot, pas, histoire, jetons, tableau } from './scenes.js';
export const AGENTIQUE4 = {
  implementation: [
    histoire('Couche', ['Entrée\nLire le formulaire', 'Métier\nAppliquer les règles', 'Journal\nEnregistrer la décision'], [
      ['Séparer la lecture', 'Une partie du code transforme le formulaire en données utilisables.', 'Elle s’occupe de la réception des données.'],
      ['Séparer la décision', 'Une autre partie applique les critères métier. Changer la présentation du formulaire ne devrait pas changer ces règles.', 'Chaque couche porte une responsabilité distincte.'],
      ['Séparer l’enregistrement', 'La couche de journalisation garde les événements. Cette séparation aide à comprendre, modifier et tester chaque partie.', 'Ici, « couche » désigne une organisation du code.'],
    ]),
    histoire('Contrat', ['Entrée prévue\nmontant : un nombre', 'Composant\nVérifie le plafond', 'Sortie prévue\nautorisé : oui / non'], [
      ['Écrire ce qui est reçu', 'Le composant attend un champ montant contenant un nombre en euros. Cette attente doit être explicite.', 'Le contrat fixe le format d’entrée.'],
      ['Définir le travail attendu', 'Le composant vérifie ce montant et prévoit quoi faire si le champ manque ou n’est pas un nombre.', 'Les cas d’erreur font aussi partie du contrat.'],
      ['Écrire ce qui est rendu', 'Il rend une réponse oui ou non dans le champ autorisé. Le composant suivant sait alors comment utiliser ce résultat.', 'Un contrat décrit les entrées, les sorties et le comportement attendu.'],
    ]),
    histoire('Test unitaire', ['Entrée choisie\nmontant = 6 000', 'Une fonction isolée\nPlafond = 5 000', 'Résultat attendu\nRefus'], [
      ['Préparer un cas précis', 'On fournit 6 000 à la fonction qui vérifie un plafond de 5 000. Aucun vrai versement n’est nécessaire.', 'Le test choisit une entrée contrôlée.'],
      ['Isoler le composant', 'On appelle uniquement cette fonction, sans le formulaire, la base de données ni les autres agents.', 'Un test unitaire vise une petite unité.'],
      ['Comparer au résultat attendu', 'Le test attend un refus. S’il reçoit une autorisation, il signale une erreur dans ce comportement précis.', 'Un test qui passe ne prouve que les cas qu’il vérifie.'],
    ]),
    histoire('Test d’intégration', ['Formulaire\nmontant = « 300 »', 'Lecture + règle\nConvertir puis vérifier', 'Résultat final\nAutorisé'], [
      ['Entrer comme dans le système', 'Le formulaire fournit le texte « 300 ». Le composant de lecture doit le convertir en nombre.', 'Plusieurs composants vont coopérer.'],
      ['Vérifier leur échange', 'Le nombre obtenu passe à la règle de plafond. On vérifie que le format transmis est compris par le composant suivant.', 'Chaque composant peut marcher seul mais mal communiquer.'],
      ['Contrôler l’enchaînement', 'Le système retourne l’autorisation attendue. Le test d’intégration vérifie que ces éléments fonctionnent ensemble.', 'Intégration = vérifier la coopération entre composants.'],
    ]),
  ],
  evaluation: [
    mot('Taux de retour', [
      pas('Envoyer cinq demandes', 'Cinq demandes arrivent dans une file de traitement. On veut savoir si elles ont été bien orientées.', jetons(5, ['✓', '↩', '✓', '↩', '✓'], [1, 3], 0, 'Chaque jeton est une demande adressée à la file.')),
      pas('Compter les renvois', 'La file renvoie les demandes 2 et 4, car elles ne relèvent pas de son service.', jetons(5, ['✓', '↩', '✓', '↩', '✓'], [1, 3], 1, '↩ = renvoi pour mauvaise orientation · ✓ = conservée')),
      pas('Faire le rapport', 'Deux retours sur cinq demandes donnent 40 %. Ce taux repère certains mauvais routages, mais pas toutes les erreurs silencieuses.', jetons(5, ['✓', '↩', '✓', '↩', '✓'], [1, 3], 2, 'Taux de retour = 2 / 5 = 40 %.')),
    ]),
    histoire('Accord trompeur', ['Agents A et B\n« Oui » tous les deux', 'Règle réelle\nPièce obligatoire absente', 'Conclusion\nAccord, mais erreur'], [
      ['Constater un accord', 'Deux agents disent que le dossier est complet. Leur accord semble rassurant.', 'Ils peuvent avoir lu les mêmes données incomplètes.'],
      ['Comparer à une référence', 'Une vérification montre qu’une pièce obligatoire manque. La bonne réponse était donc « incomplet ».', 'On vérifie la vérité, pas seulement la concordance.'],
      ['Reconnaître la fausse assurance', 'Les agents sont d’accord, mais tous deux ont tort. C’est un accord trompeur.', 'Accord entre agents ≠ exactitude de la décision.'],
    ], 'orange'),
    histoire('Faux positif de blocage', ['Action légitime\nEnvoyer un reçu', 'Contrôle trop strict\nBloque le message', 'Erreur constatée\nBlocage injustifié'], [
      ['Partir d’une action autorisée', 'L’envoi du reçu respecte les règles : il ne contient ici aucune information interdite.', 'La référence dit : action légitime.'],
      ['Observer le contrôle', 'Le filtre prend à tort un mot du reçu pour un signal interdit et bloque l’envoi.', 'Le contrôle annonce un problème inexistant.'],
      ['Mesurer la mauvaise interdiction', 'Le service a empêché une action correcte. Ce faux positif peut gêner les usagers, même si le système semble prudent.', 'Action légitime + blocage = faux positif de blocage.'],
    ], 'orange'),
    histoire('Escalade utile', ['Doute détecté\nDeux montants différents', 'Revue humaine\nVérifier le devis', 'Erreur évitée\nCorriger avant paiement'], [
      ['Repérer un cas incertain', 'Le formulaire et le devis indiquent des montants différents. Le système suspend le paiement.', 'La transmission répond à un doute concret.'],
      ['Faire vérifier la source', 'La personne relit le devis et découvre une erreur de saisie dans le formulaire.', 'La revue apporte une information utile.'],
      ['Constater le bénéfice', 'Le montant est corrigé avant le paiement. L’escalade a évité une erreur : elle était utile.', 'Transmettre beaucoup n’est pas forcément transmettre utilement.'],
    ]),
  ],
  gouvernance: [
    histoire('Gouvernance', ['Qui peut agir ?\nAgent : cas simples', 'Qui peut changer ?\nResponsable des règles', 'Qui répond ?\nResponsable du service'], [
      ['Fixer les autorisations', 'On écrit quelles décisions l’agent peut prendre seul et lesquelles exigent un accord humain.', 'Les droits d’action sont explicites.'],
      ['Fixer les droits de modification', 'On précise aussi qui peut changer les règles et comment ces changements sont validés.', 'Changer la règle est lui-même un pouvoir.'],
      ['Attribuer la responsabilité', 'Une instance désignée répond du fonctionnement du service. Cet ensemble de rôles, règles et contrôles constitue la gouvernance.', 'Gouverner = organiser les pouvoirs, les contrôles et les responsabilités.'],
    ]),
    histoire('Imputabilité', ['Décision\nDossier refusé', 'Auteur enregistré\nService / validateur', 'Responsable identifié\nPeut rendre compte'], [
      ['Partir d’une décision', 'Un dossier a été refusé. Pour demander des explications, il faut savoir à qui s’adresser.', '« Le logiciel l’a fait » ne suffit pas.'],
      ['Rattacher la décision', 'Les traces indiquent le service responsable et, si nécessaire, la personne qui a validé.', 'On garde un lien clair entre décision et responsabilité.'],
      ['Pouvoir demander des comptes', 'Le responsable peut expliquer, faire corriger ou réexaminer la décision. C’est le principe d’imputabilité.', 'Imputable = rattachable à une autorité qui en répond.'],
    ]),
    mot('Journal structuré', [
      pas('Nommer les champs', 'Au lieu d’une phrase libre, on prévoit des champs nommés : dossier, étape et résultat.', tableau(['Dossier', 'Étape', 'Résultat'], [['2417', 'lecture', 'OK']], ['0-0'], 'Chaque colonne a une signification stable.')),
      pas('Ajouter un événement', 'La vérification du dossier ajoute sa propre ligne. Un programme peut retrouver les événements du même dossier.', tableau(['Dossier', 'Étape', 'Résultat'], [['2417', 'lecture', 'OK'], ['2417', 'contrôle', 'refus']], ['1-1'], 'Une ligne décrit un événement identifiable.')),
      pas('Exploiter les traces', 'On peut filtrer les refus, compter les erreurs et reconstituer l’ordre avec des champs d’heure. La structure rend le journal exploitable automatiquement.', tableau(['Dossier', 'Étape', 'Résultat'], [['2417', 'lecture', 'OK'], ['2417', 'contrôle', 'refus'], ['2417', 'réponse', 'envoyée']], ['0-2', '1-2', '2-2'], 'Des champs réguliers permettent de chercher et de comparer.')),
    ]),
    histoire('Auditabilité', ['Question d’audit\nPourquoi ce refus ?', 'Reconstituer\nDonnées + règles + date', 'Vérifier\nDécision conforme ?'], [
      ['Recevoir une question', 'L’auditeur veut comprendre une décision ancienne sans se fier à un souvenir.', 'Il lui faut des éléments conservés.'],
      ['Retrouver le contexte exact', 'Le journal indique les données utilisées et la version des règles en vigueur lors de la décision.', 'On ne juge pas une ancienne décision avec une règle nouvelle.'],
      ['Contrôler le chemin suivi', 'On peut vérifier les étapes et expliquer le refus. L’auditabilité repose sur des traces suffisamment complètes et fiables.', 'Une décision est auditable si son chemin peut être reconstitué.'],
    ]),
    histoire('Empreinte numérique', ['Fichier A\n« montant : 300 »', 'Calcul de hachage\nCode de taille fixe', 'Comparer après modification\nCode différent'], [
      ['Choisir le fichier à suivre', 'On veut reconnaître le document examiné, sans en recopier tout le contenu dans le journal.', 'On calcule une empreinte à partir de ses octets.'],
      ['Conserver le code calculé', 'Une fonction de hachage transforme le fichier en un code de taille fixe. Ce n’est pas un résumé lisible du document.', 'Même fichier + même fonction = même empreinte.'],
      ['Détecter un changement', 'Si le montant passe de 300 à 301, une bonne fonction cryptographique donne une empreinte différente avec une très forte probabilité.', 'Comparer les empreintes détecte une différence ; cela ne prouve pas l’identité de l’auteur.'],
    ]),
  ],
  casusage: [
    histoire('Agent dominant', ['Besoin principal\nAppliquer un règlement', 'Décision principale\nMoteur de règles', 'Aide périphérique\nLLM pour expliquer'], [
      ['Trouver ce qui tranche', 'Le cas d’usage consiste surtout à appliquer des critères d’éligibilité écrits.', 'On identifie le cœur de la décision.'],
      ['Choisir le moteur principal', 'Un agent à règles décide de l’éligibilité. C’est la famille dominante pour ce besoin.', 'Dominant signifie responsable du choix principal.'],
      ['Ajouter des aides adaptées', 'Un modèle de langage peut reformuler l’explication pour l’usager. Il n’en devient pas pour autant le décideur principal.', 'Le rôle dominant dépend du besoin, pas de la visibilité de l’interface.'],
    ]),
    histoire('Déterminisme', ['Entrée\nMontant : 300', 'Même règle\nPlafond : 500', 'Même résultat\nAutorisé'], [
      ['Fixer une entrée', 'On soumet le montant 300 à une règle de plafond. Les paramètres et la version du code sont fixés.', 'Il faut conserver toutes les conditions pertinentes.'],
      ['Exécuter sans tirage', 'La règle compare 300 à 500. Elle ne choisit rien au hasard.', 'Le calcul est déterministe.'],
      ['Relancer à l’identique', 'Avec les mêmes entrées et conditions, elle rend toujours le même résultat. Cela ne garantit pas que la règle choisie soit juste.', 'Déterministe = même entrée et même état donnent même sortie.'],
    ]),
    histoire('Flexibilité', ['Phrase A\n« Je veux un rendez-vous »', 'Phrase B\n« On peut se voir ? »', 'Même intention\nDemande de rencontre'], [
      ['Recevoir une formulation', 'Une personne formule clairement une demande de rendez-vous.', 'Le langage n’utilise pas toujours des cases fixes.'],
      ['Recevoir une variante', 'Une autre dit « On peut se voir ? ». Les mots changent, mais l’intention peut être la même.', 'Traiter plusieurs formulations demande de la souplesse.'],
      ['Adapter l’interprétation', 'Un système flexible reconnaît ces variations et demande une précision si le contexte reste ambigu.', 'Flexibilité = s’adapter aux formulations et aux situations.'],
    ]),
    histoire('Escalade humaine', ['Cas hors périmètre\nDemande exceptionnelle', 'Dossier préparé\nMotifs et pièces', 'Personne habilitée\nDécision finale'], [
      ['Atteindre une limite', 'La demande sort des cas que l’agent est autorisé à traiter seul.', 'La limite vient des droits et des règles définis.'],
      ['Préparer une reprise utile', 'L’agent transmet le dossier, ce qu’il a vérifié et la raison de son doute. La personne peut reprendre sans tout deviner.', 'L’escalade doit conserver le contexte.'],
      ['Redonner le pouvoir de décision', 'La personne habilitée accepte, refuse ou demande un complément. Le système ne poursuit pas l’action en attendant cet accord.', 'Une escalade humaine transfère la décision à une personne autorisée.'],
    ]),
  ],
};
