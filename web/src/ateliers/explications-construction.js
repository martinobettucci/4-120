// Une solution commentée pour les ateliers de construction. Les valeurs sont celles
// du bouton « Voir la solution » ; d'autres constructions peuvent aussi réussir.
const fiche = (intro, lignes) => ({ intro, lignes: lignes.map(([choix, pourquoi]) => ({ choix, pourquoi })) });

export const EXPLICATIONS_CONSTRUCTION = {
  regles: fiche("Les règles sont lues de haut en bas : la première condition satisfaite décide. Les deux arrêts doivent donc précéder les ralentissements.", [
    ['Obstacle < 0,5 m : ARRÊT', "Un obstacle au contact impose l'arrêt, même si la batterie est faible. Placer cette règle avant le ralentissement empêche qu'une décision moins protectrice masque le danger."],
    ['Température > 85 °C : ARRÊT', "Le cahier des charges impose un arrêt en surchauffe. Le signe strict > conserve le seuil demandé ; cette règle doit, elle aussi, passer avant celles de ralentissement."],
    ['Batterie < 20 % : RALENTIR', "La batterie faible impose de ralentir, mais seulement si aucune condition d'arrêt n'est présente. C'est pourquoi cette règle vient après les deux règles de sécurité."],
    ['Obstacle < 1,5 m : RALENTIR', "Cette distance impose de ralentir. Les obstacles à moins de 0,5 m satisfont aussi cette condition, mais la règle d'arrêt placée plus haut a déjà pris la décision."],
    ['Sinon : CONTINUER', "Si aucune condition de danger ou de ralentissement n'est vraie, le cahier des charges autorise à continuer. Le défaut couvre tous ces cas sans ajouter de règle inutile."],
  ]),
  neurone: fiche("Ces trois paramètres définissent ensemble une frontière qui sépare les points du banc. Ils ne sont pas les seuls possibles : les multiplier par un même nombre positif conserve les décisions.", [
    ['Poids de la température w₁ = 0,9', "Une hausse de température augmente la somme du neurone : elle pousse vers l'arrêt. Le poids 0,9 contribue à l'inclinaison de la frontière, en combinaison avec le poids de vibration."],
    ['Poids de la vibration w₂ = 0,6', "La vibration contribue elle aussi positivement à l'arrêt. Avec w₁ = 0,9, ce poids sépare les deux groupes du banc sans demander qu'une seule mesure suffise toujours."],
    ['Biais b = −0,8', "Le neurone répond 1 lorsque 0,9 × x₁ + 0,6 × x₂ dépasse 0,8. Le biais place la frontière entre les groupes ; sans ce décalage, presque toutes les entrées positives déclencheraient l'arrêt."],
  ]),
  gradient: fiche("La perte est (w − 3)² : le minimum se trouve en 3. Le taux agit sur la vitesse de rapprochement, et plusieurs valeurs peuvent respecter la tolérance.", [
    ['Taux d’apprentissage = 0,3', "L'écart au minimum est multiplié par 1 − 2 × 0,3 = 0,4 à chaque pas. Il diminue sans changer de signe : on approche donc le minimum sans osciller ni diverger."],
    ['20 pas depuis w = −4', "L'écart initial vaut 7. Après 20 pas, il ne vaut plus que 7 × 0,4²⁰, bien moins que 0,05. Le taux choisi satisfait donc la précision demandée dans le nombre de pas disponible."],
  ]),
  piege: fiche("Le U reste ouvert du côté du départ. Il attire l'agent vers le fond, tout en laissant un détour possible à un agent qui planifie. Les coordonnées partent de 0.", [
    ...['6,2', '6,3', '6,4'].map((c) => [`Mur en (${c})`, "Cette case ferme le fond du U : l'agent ne peut pas poursuivre directement vers l'objectif. Le fond oblige à ressortir par la gauche, donc à s'éloigner d'abord de sa cible."]),
    ...['5,2', '4,2'].map((c) => [`Mur en (${c})`, "Cette case prolonge le bras supérieur du U et empêche de contourner le fond par un simple pas vers le haut. Il faut d'abord revenir vers l'ouverture du piège."]),
    ...['5,4', '4,4'].map((c) => [`Mur en (${c})`, "Cette case prolonge le bras inférieur du U et empêche de sortir directement vers le bas. L'ouverture à gauche reste libre, ce qui rend le scénario soluble par planification."]),
  ]),
  contraintes: fiche("Chaque contrainte traduit une exigence. Le solveur vérifie toutes les affectations et doit conserver exactement les plannings autorisés, sans en supprimer à tort.", [
    ['A ≠ B', "Les missions A et B ne peuvent pas occuper le même créneau. Cette contrainte interdit leur collision ; elle est aussi impliquée par A < B, mais rend l'exigence explicite."],
    ['A ≠ C', "Cette ligne empêche les missions A et C de partager un créneau. Interdire seulement la collision entre A et B ne suffit pas à garantir trois missions séparées."],
    ['B ≠ C', "Cette dernière paire complète la séparation des trois missions. Sans elle, B et C pourraient occuper ensemble le créneau 2 ou 3 tout en respectant les autres inégalités."],
    ['A < B', "Le numéro du créneau de A doit être plus petit que celui de B. Le signe < exprime une antériorité stricte, alors que ≠ imposerait seulement des créneaux différents."],
    ['C ≠ 1', "Le créneau 1 est indisponible pour C. Cette contrainte laisse C choisir entre 2 et 3, sans imposer un créneau précis qui supprimerait un planning pourtant autorisé."],
  ]),
  recuit: fiche("La température règle l'acceptation des détours défavorables. Le réglage est validé sur plusieurs graines : il faut explorer au début et se stabiliser avant la fin.", [
    ['Température initiale T₀ = 1', "Une température de 1 permet d'accepter certaines tournées plus longues au début, avec une probabilité exp(−dégradation / T). Cela aide la recherche à sortir des minima locaux."],
    ['Refroidissement α = 0,998', "La température est multipliée par 0,998 après chaque proposition de permutation. Elle tombe à quelques millièmes en fin de recherche : le début laisse explorer, puis les dégradations sont presque toujours refusées."],
  ]),
  politique: fiche("Une politique indique quoi faire dans chaque case libre, y compris après une déviation. Les coordonnées (x, y) partent de 0 en haut à gauche de la grille.", [
    ...['0,3', '1,3', '2,3', '3,3'].map((c) => [`Case (${c}) : est →`, "Avancer vers l'est par le bas éloigne le trajet principal des cases dangereuses de la deuxième ligne. Une déviation vers le bas heurte le bord ; une déviation vers le haut peut être rattrapée."]),
    ...['4,3', '4,2', '4,1'].map((c) => [`Case (${c}) : nord ↑`, "La colonne de droite mène à l'objectif sans traverser la zone interdite. Les déviations à droite heurtent le bord et celles à gauche retombent sur des cases avec une action de retour."]),
    ...['2,2', '3,2', '3,1'].map((c) => [`Case (${c}) : est →`, "Cette action ramène le robot vers la colonne de droite après une déviation. Elle évite de diriger le trajet nominal vers les cases rouges ou de créer une boucle sans issue."]),
    ...['0,2', '0,1'].map((c) => [`Case (${c}) : sud ↓`, "Depuis le bord gauche, descendre rejoint le passage inférieur. Aller vers la droite rencontrerait un mur ou une case dangereuse ; cette action donne une issue nominale sûre."]),
    ...['0,0', '1,0', '2,0', '3,0'].map((c) => [`Case (${c}) : est →`, "Depuis cette case de la ligne supérieure, l'objectif se trouve à droite et le trajet nominal est libre. Ces actions complètent la politique pour réussir aussi les départs depuis ces cases."]),
  ]),
  recompenses: fiche("L'agent maximise les récompenses futures actualisées. Les trois valeurs doivent rendre l'arrivée attractive et le passage dans la zone fragile moins intéressant que le détour.", [
    ['Arrivée à l’objectif : +10', "Une récompense positive donne une raison d'atteindre la cible. Avec l'actualisation des gains futurs, recevoir cette récompense plus tôt est préférable à tourner indéfiniment."],
    ['Passage dans la zone fragile : −6', "Cette pénalité rend le raccourci dangereux moins rentable que le détour sûr. Sans coût suffisant pour la zone fragile, l'agent choisirait le trajet qui rapporte le plus vite."],
    ['Chaque déplacement : 0', "On évite ici de pénaliser fortement les pas supplémentaires du détour. L'actualisation favorise déjà une arrivée rapide ; une forte pénalité par pas pourrait rendre le raccourci trop attractif."],
  ]),
  composition: fiche("Chaque étape reçoit la famille adaptée à ses données et à ses contraintes. Le résultat doit respecter ensemble la fiabilité, le délai, le coût et la justification métier.", [
    ['Extraire le courrier : LLM', "Le courrier est un texte libre aux formulations variées. Dans ce banc, le LLM atteint 96 % à cette étape ; on réserve son coût aux formulations que des règles fixes couvrent mal."],
    ['Conformité : règles', "Les critères sont écrits et la décision doit être justifiable. Les règles atteignent 99 % dans le banc et fournissent le chemin de décision exigé pour cette étape."],
    ['Risque de fraude : modèle statistique', "Les 20 000 dossiers étiquetés permettent d'apprendre des régularités. Le modèle statistique atteint ici 94 %, là où aucune règle exacte ne décrit tous les cas de fraude."],
    ['Rendez-vous : optimisation', "Agendas, durées et déplacements forment un problème de contraintes. L'optimisation cherche un planning compatible et atteint ici 99 %, tout en restant dans le délai total autorisé."],
  ]),
  controles: fiche("Le modèle extrait des champs, puis les contrôles autorisent ou bloquent leur usage. Chaque ligne protège une exigence métier distincte avant le versement.", [
    ['Bloquer si le montant dépasse 5 000 €', "Le plafond autorise exactement 5 000 €, mais pas davantage. Le signe > bloque les montants trop élevés sans rejeter le dossier valide situé exactement à la limite."],
    ['Bloquer si le total diffère des lignes de facture', "Une somme extraite peut sembler plausible tout en étant fausse. La comparer au total des lignes détecte notamment le dossier à 2 300 € dont la facture totalise 3 200 €."],
    ['Bloquer si le SIRET n’a pas 14 chiffres', "Ce contrôle de format repère une extraction tronquée, comme le numéro à 13 chiffres du banc. Il ne prouve pas à lui seul que l'entreprise existe : il vérifie l'exigence de cet exercice."],
    ['Bloquer si la date est future', "Une date de dépôt postérieure au traitement est incohérente dans ce scénario. Le contrôle empêche d'exécuter un dossier sur la seule foi d'une date extraite par le modèle."],
    ['Bloquer si la catégorie est hors liste', "La liste autorise rénovation, isolation et chauffage. Une formulation plausible comme « aide exceptionnelle » ne crée pas un droit supplémentaire et doit donc être bloquée."],
  ]),
  pipeline: fiche("Le délai de 13 secondes laisse trois contrôles au maximum. On les affecte aux étapes dont la correction améliore le plus la fiabilité totale de la chaîne.", [
    ['Ingestion et OCR : sans contrôle', "Cette étape est déjà fiable à 97 %. Un contrôle ne gagne que 2,4 points ici, moins que sur les trois étapes retenues : le budget de temps y serait moins bien utilisé."],
    ['Extraction : avec contrôle', "La fiabilité passe de 90 % à 98 % car le contrôle rattrape 80 % des 10 % d'erreurs. Le gain de 8 points est le plus grand des cinq étapes : c'est le premier contrôle à placer."],
    ['Validation métier : sans contrôle', "À 98 % de fiabilité initiale, cette étape ne gagnerait que 1,6 point. La contrôler à la place d'une étape plus fragile ferait baisser la fiabilité globale pour le même délai."],
    ['Scoring : avec contrôle', "Les 7 % d'erreurs sont réduits à 1,4 %, soit une fiabilité de 98,6 %. Ce gain de 5,6 points justifie d'y consacrer une des trois secondes de contrôle disponibles."],
    ['Synthèse : avec contrôle', "La fiabilité passe de 96 % à 99,2 %. Avec l'extraction et le scoring contrôlés, le produit des cinq fiabilités dépasse 90 %, pour un délai total de 10 + 3 = 13 secondes."],
  ]),
  arbitre: fiche("Le modèle statistique et le LLM commettent souvent les mêmes erreurs. Le vote doit tenir compte de cette dépendance et réserver l'humain aux désaccords les plus ambigus.", [
    ['Poids du moteur de règles : 2', "Les règles pèsent autant que les deux autres avis réunis. Elles ne peuvent ainsi être mises en minorité par deux modèles qui se trompent souvent sur les mêmes dossiers."],
    ['Poids du modèle statistique : 1', "Son avis reste utile lorsqu'il rejoint les règles, mais il ne constitue pas une confirmation indépendante du LLM. Un poids limité évite de compter deux fois leur information commune."],
    ['Poids du LLM : 1', "Le LLM complète les règles sans dominer la décision. Lui donner autant de poids qu'aux règles renforcerait artificiellement l'accord qu'il partage déjà avec le modèle statistique."],
    ['Accord exigé : 75 %', "Il faut 3 voix pondérées sur 4. Les règles accompagnées d'un modèle suffisent ; les règles opposées aux deux modèles donnent 2 contre 2 et déclenchent une revue humaine."],
  ]),
  delegation: fiche("On compare les coûts espérés des trois régimes, puis on vérifie le plafond d'erreurs sur le lot. Les seuils de référence sont arrondis à la grille de 1 %.", [
    ['Seuil bas : 80 %', "La validation coûte 2 + 0,25 × 80 × (1 − confiance), contre 6 € pour une décision humaine complète. Ces coûts s'égalisent à 80 % ; en dessous, refaire le dossier coûte moins cher."],
    ['Seuil haut : 97 %', "L'automatisation coûte 80 × (1 − confiance), contre 2 + 20 × (1 − confiance) pour valider. L'égalité se situe à 96,67 %, arrondie ici à 97 %, puis vérifiée avec le plafond d'erreurs."],
  ]),
  routeur: fiche("La première règle correspondante décide de la file. L'ordre ci-dessous résout les ambiguïtés du banc ; il doit être réévalué si de nouveaux messages métier apparaissent.", [
    ['facture → Facturation', "Le message sur une facture d'alarmes contient aussi « incendie ». Cette règle placée avant l'urgence évite de confondre le sujet d'une facture avec un incendie en cours dans le banc."],
    ['remboursement → Facturation', "Le remboursement d'un trop-perçu concerne un mouvement financier. Ce mot-clé couvre le cas qui ne contient pas « facture » et ne doit donc pas finir dans la file par défaut."],
    ['incendie → Urgence sécurité', "Le message de panne avec début d'incendie contient deux mots-clés. Placer l'incendie avant la panne donne la priorité à la sécurité pour cette situation dangereuse."],
    ['gaz → Urgence sécurité', "La fuite de gaz est une urgence du banc sans mention d'incendie. Une règle distincte est nécessaire pour qu'elle n'aboutisse pas à la file administrative par défaut."],
    ['panne → Technique', "Après les règles d'urgence, une panne sans danger signalé relève de l'équipe technique. Cet ordre évite que « panne » masque un incendie décrit dans le même message."],
    ['portail → Technique', "Les demandes de mot de passe et de portail inaccessible concernent toutes deux le service technique. Ce mot-clé couvre ces formulations sans ajouter une règle par message."],
    ['Sinon → Administratif', "Les attestations et demandes d'horaires du banc ne correspondent à aucun mot-clé spécialisé. La file administrative les reçoit sans qu'il faille énumérer tous les sujets courants."],
  ]),
  rag: fiche("Ces réglages doivent retrouver la phrase qui porte la réponse sans dépasser le budget de contexte. La réussite est mesurée sur les questions du corpus de l'exercice.", [
    ['Morceaux de 2 phrases', "Deux phrases gardent un peu de contexte autour de l'information tout en évitant de transmettre une fiche entière. Des blocs plus longs diluent les mots utiles et consomment davantage de contexte."],
    ['Transmettre k = 2 morceaux', "Le bon passage n'est pas toujours classé premier. Transmettre deux morceaux améliore le rappel tout en restant assez court pour respecter le budget moyen de 60 mots."],
    ['Pondérer les mots par leur rareté', "Les mots présents partout discriminent peu les fiches. La pondération log₂(N / fréquence) donne davantage de poids aux termes qui distinguent réellement le passage recherché."],
  ]),
  journal: fiche("Chaque champ retenu répond à une question d'audit. Les huit champs nécessaires occupent 11 unités sur les 12 disponibles : la dernière unité peut rester inutilisée.", [
    ['Identifiant du dossier : conservé', "Il relie les événements à la bonne décision. Sans cet identifiant, même un journal riche ne permettrait pas d'isoler les traces du dossier demandé par l'auditeur."],
    ['Horodatage : conservé', "L'heure de chaque étape permet de reconstituer l'ordre des événements et le moment du traitement. Une durée seule ne dit pas quand la décision a été prise."],
    ['Versions des règles, seuils et modèle : conservées', "Les paramètres changent au cours du temps. Leur version permet de comprendre la décision avec les conditions réellement utilisées, sans lui appliquer rétrospectivement les règles actuelles."],
    ['Règles déclenchées et scores : conservés', "Ces éléments expliquent le motif de la décision. Garder seulement son résultat ne permettrait pas de savoir quelle règle et quelle mesure ont entraîné le passage en commission."],
    ['Avis des agents et arbitrage : conservés', "Il faut pouvoir distinguer les propositions individuelles du choix final. Cette trace explique comment un désaccord a été résolu et quel avis a été suivi."],
    ['Validateur humain et décision : conservés', "Un identifiant interne permet d'attribuer la validation à son auteur et d'en connaître le résultat. Il répond au besoin d'audit sans recopier l'identité du demandeur."],
    ['Appels d’outils et réponses : conservés', "La décision dépend aussi des informations obtenues auprès des outils. Les conserver permet de vérifier ce que le système savait au moment où il a agi."],
    ['Empreintes des pièces : conservées', "L'empreinte permet de comparer les pièces reçues sans recopier leur texte dans le journal. Elle apporte une référence de contrôle tout en limitant la duplication des données."],
    ['Durées des étapes : facultatives', "Elles peuvent servir à mesurer les performances, mais aucune question de cet audit ne les exige. Les omettre économise une unité ; les conserver reste accepté dans le budget de 12 unités."],
    ['Texte intégral des pièces : écarté', "Le texte contient des données du demandeur et coûte six unités. L'audit de cet exercice utilise les références et les empreintes ; recopier toutes les pièces serait inutile ici."],
    ['Nom, adresse et coordonnées bancaires : écartés', "Aucune question du banc n'exige ces données en clair. L'identifiant du dossier suffit à rattacher les traces, sans exposer son contenu personnel aux lecteurs du journal."],
  ]),
  priorisation: fiche("Ces poids sont une politique possible parmi plusieurs. Leur validité tient aux comparaisons de tickets exigées, et non à une valeur universellement correcte de chaque poids.", [
    ['Gravité : 6', "Deux niveaux de gravité valent 12 points, plus que les 10 points supplémentaires de secteur, attente et bonus de T2. T1 reste ainsi prioritaire malgré les avantages cumulés de T2."],
    ['Secteur : 1', "Un poids positif départage T3 et T9, identiques sur les autres critères. Le garder modeste permet de favoriser le secteur prioritaire sans effacer l'effet de la gravité."],
    ['Jour d’attente : 1', "Dix jours ajoutent 10 points : assez pour que T4 dépasse T3, dont la gravité et le secteur n'apportent que 7 points supplémentaires. Cela limite l'attente sans masquer une urgence grave."],
    ['Délai dépassé : 2', "Le bonus est positif : à situation égale, T5 passe devant T6. Sa valeur reste assez faible pour qu'un ticket hors délai ne dépasse pas à lui seul une urgence beaucoup plus grave."],
    ['Client stratégique : 2', "Ce bonus place T7 devant T8 à situation égale. Il ne suffit pas à compenser les deux niveaux de gravité supplémentaires de T6, conformément à la politique demandée."],
  ]),
  patrons: fiche("L'architecture combine reprise centralisée et double validation. Chaque ajout a un coût : il faut tenir ensemble les cinq exigences du cahier des charges.", [
    ['Organisation : superviseur central', "Le superviseur voit chaque résultat, garde la trace et peut relancer une étape en échec. Le pipeline simple ne satisfait pas cette exigence de reprise ; le réseau ne garantit pas la trace complète."],
    ['Double validation : activée', "Dans ce modèle aux erreurs indépendantes, 200 × 20 % × 10 % = 4 mauvaises demandes sont acceptées. Les désaccords partent en revue : 132 dossiers, soit 13,2 %, sous le plafond de 15 %."],
    ['Contradicteur dédié : désactivé', "Après la double validation, les erreurs sont déjà sous le plafond. Le contradicteur ajouterait deux secondes et des revues : le délai dépasserait alors les cinq secondes autorisées."],
    ['Validation humaine au-dessus de 10 000 € : désactivée', "Ce mécanisme enverrait à lui seul environ la moitié des demandes à un humain. Il dépasserait largement la capacité de 15 %, alors que la double validation satisfait déjà les exigences."],
  ]),
};
