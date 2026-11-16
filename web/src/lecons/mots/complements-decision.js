import { baseTableau as b } from './scenes.js';

// Cas d'introduction autonomes : ils enseignent les outils nécessaires avant le cours.
export const COMPLEMENTS_DECISION = {
  regles: [
    b('Fait, règle et déduction', 'Un fait décrit le cas présent ; une règle décrit une relation générale ; la déduction applique cette relation au cas.', ['Élément', 'Contenu', 'Nature'], [
      ['Observer le cas', 'Le badge de Léa est valide. C’est une information sur une personne, à cet instant. Ce fait ne dit pas encore quelle action effectuer.', [['Léa', 'badge valide', 'fait']], ['0-2'], 'Un fait décrit ce que l’on sait du cas.'],
      ['Ajouter une connaissance', 'La consigne « si le badge est valide, autoriser l’entrée » concerne tous les visiteurs. Elle est stockée séparément des faits du jour.', [['Léa', 'badge valide', 'fait'], ['Si valide', 'autoriser', 'règle']], ['1-2'], 'Une règle associe une condition à une conclusion.'],
      ['Déduire la conclusion', 'Le moteur compare le fait à la condition. Le badge de Léa satisfait la règle : il déduit l’autorisation. Une autre personne pourrait ne pas satisfaire cette même règle.', [['Léa', 'badge valide', 'fait'], ['Si valide', 'autoriser', 'règle'], ['Pour Léa', 'autorisation', 'déduction']], ['2-2'], 'Le moteur d’inférence relie les faits aux règles.'],
    ]),
    b('Conflit et priorité', 'Deux conditions peuvent être vraies en même temps ; une politique explicite choisit alors la règle qui décide.', ['Ordre', 'Condition', 'Action'], [
      ['Deux règles applicables', 'Un ascenseur est occupé et en maintenance. « Occupé » demande d’attendre ; « maintenance » demande de fermer le service. Les deux faits sont vrais.', [['?', 'occupé : oui', 'attendre'], ['?', 'maintenance', 'fermer']], ['0-1', '1-1'], 'Plusieurs règles vraies peuvent proposer des actions différentes.'],
      ['Fixer la priorité', 'On place la maintenance en premier. Dans ce moteur, la première condition vraie gagne ; l’ordre fait donc partie du comportement.', [['1', 'maintenance', 'fermer'], ['2', 'occupé : oui', 'attendre']], ['0-0'], 'Une priorité tranche entre les règles applicables.'],
      ['Suivre la décision', 'La maintenance étant vraie, le moteur ferme le service sans utiliser la seconde action. Changer l’ordre aurait changé le résultat dans ce cas.', [['1', 'maintenance', 'FERMER'], ['2', 'occupé : oui', 'non utilisée']], ['0-2'], 'Il faut tester les cas où plusieurs conditions se recouvrent.'],
    ]),
  ],
  reseau: [
    b('Probabilité conjointe et total', 'Une probabilité conjointe concerne deux faits ensemble ; des cas exclusifs se combinent par addition.', ['Groupe', 'Passages', 'Patinages'], [
      ['Séparer les cas possibles', 'Dans une population fictive de vingt passages, dix se font sur sol sec et dix sur sol humide. Chaque passage appartient à un seul de ces deux groupes.', [['Sec', '10', '2'], ['Humide', '10', '6']], ['0-1', '1-1'], 'Les groupes couvrent vingt passages sans les compter deux fois.'],
      ['Compter deux faits ensemble', 'Six passages sont à la fois humides et avec patinage. Leur part dans la population est 6 / 20 = 30 %. On retrouve ce nombre par 50 % de passages humides × 60 % de patinages parmi eux.', [['Sec', '10', '2'], ['Humide', '10', '6']], ['1-2'], 'P(humide ET patine) = P(humide) × P(patine sachant humide).'],
      ['Additionner les branches', 'Les deux patinages sur sol sec s’ajoutent aux six sur sol humide. Au total, 8 / 20 = 40 % des passages patinent. On a sommé deux groupes qui ne se recouvrent pas.', [['Sec', '10', '2'], ['Humide', '10', '6'], ['Total', '20', '8']], ['2-2'], 'Le total se calcule en réunissant les branches exclusives.'],
    ]),
    b('Indépendance conditionnelle', 'Deux informations peuvent devenir indépendantes une fois une troisième connue ; cette hypothèse doit être justifiée.', ['Sol connu', 'Autre indice', 'P(patine)'], [
      ['Fixer l’information commune', 'Dans notre modèle fictif, on connaît déjà l’état humide du sol. La probabilité de patiner est alors de 60 %. On se demande si connaître aussi la pluie apporte quelque chose.', [['Humide', 'non observé', '60 %']], ['0-0'], 'On raisonne à état du sol fixé.'],
      ['Ajouter l’autre indice', 'Le modèle suppose 60 % de patinage sur sol humide, qu’il pleuve ou non. Dans ce modèle, la pluie n’apporte plus d’information une fois l’humidité connue.', [['Humide', 'pluie : oui', '60 %'], ['Humide', 'pluie : non', '60 %']], ['1-2'], 'Indépendance conditionnelle : l’indice supplémentaire ne change plus la distribution.'],
      ['Comprendre la limite', 'Sans connaître le sol, la pluie peut informer sur son humidité et donc sur le patinage. L’indépendance était conditionnelle à une information précise, pas valable dans tous les groupes.', [['Humide', 'sol fixé', '60 %'], ['Inconnu', 'pluie connue', 'à recalculer']], ['1-0'], 'Le graphe encode des hypothèses d’indépendance, à confronter aux données.'],
    ]),
  ],
  utilite: [
    b('Action, issue et tableau des coûts', 'On choisit une action ; on ne choisit pas l’état du monde. Un coût doit être indiqué pour chaque combinaison.', ['Action', 'Pluie', 'Temps sec'], [
      ['Séparer choix et événement', 'Pour une exposition, on peut installer un auvent ou garder le jardin ouvert. La pluie ou le temps sec sont des issues possibles, pas des actions disponibles.', [['Auvent', '?', '?'], ['Sans auvent', '?', '?']], ['0-0', '1-0'], 'Les lignes sont les actions ; les colonnes sont les issues.'],
      ['Renseigner chaque conséquence', 'L’auvent coûte 12 € quel que soit le temps. Sans auvent, la pluie causerait 80 € de perte et le temps sec ne coûterait rien. Les quatre cases décrivent les conséquences du choix.', [['Auvent', '12 €', '12 €'], ['Sans auvent', '80 €', '0 €']], ['1-1'], 'Un coût dépend à la fois de l’action et de ce qui arrive.'],
      ['Utiliser les probabilités', 'Avec une probabilité de pluie de 10 %, le coût moyen sans auvent est 0,10 × 80 + 0,90 × 0 = 8 €. L’auvent reste à 12 €. Le critère du coût moyen favorise donc l’absence d’auvent dans ce modèle.', [['Auvent', 'moyenne', '12 €'], ['Sans auvent', 'moyenne', '8 €']], ['1-2'], 'Comparer les actions sur le même ensemble d’issues.', ['Action', 'Critère', 'Coût']],
    ]),
  ],
  supervise: [
    b('Apprentissage, validation et test', 'Apprendre les paramètres, choisir les réglages et mesurer le résultat final sont trois usages distincts des données.', ['Jeu', 'Nombre', 'Usage'], [
      ['Apprendre les paramètres', 'On dispose de cent photos distinctes et indépendantes dans ce petit exemple. Soixante servent à ajuster les paramètres du modèle. Les quarante autres restent à part.', [['Apprendre', '60', 'ajuster'], ['Validation', '20', 'réserver'], ['Test', '20', 'réserver']], ['0-2'], 'L’apprentissage ajuste le modèle sur son propre jeu.'],
      ['Choisir les réglages', 'Vingt photos de validation permettent de comparer deux réglages. On retient celui qui généralise le mieux sur ce jeu. Le test final n’est pas consulté pour ce choix.', [['Apprendre', '60', 'ajuster'], ['Validation', '20', 'choisir'], ['Test', '20', 'réserver']], ['1-2'], 'La validation sert aux choix de conception.'],
      ['Évaluer le choix final', 'On mesure une fois la version retenue sur les vingt photos de test. Si ce résultat sert ensuite à régler le modèle, ce jeu n’est plus un test final indépendant de ces choix.', [['Apprendre', '60', 'ajuster'], ['Validation', '20', 'choisir'], ['Test', '20', 'évaluer']], ['2-2'], 'Le test estime la performance après les choix, sur des cas réservés.'],
    ]),
    b('Doublon et fuite de données', 'Deux lignes issues du même cas ne donnent pas forcément deux informations indépendantes ; leur séparation peut fausser le test.', ['Image', 'Origine', 'Jeu'], [
      ['Reconnaître le même cas', 'A et A’ sont deux recadrages de la même feuille. B montre une autre plante. Trois fichiers ne signifient donc pas trois observations indépendantes.', [['A', 'plante 1', '?'], ['A’', 'plante 1', '?'], ['B', 'plante 2', '?']], ['0-1', '1-1'], 'L’unité utile est le cas observé, pas seulement le nombre de fichiers.'],
      ['Repérer la fuite', 'Si A sert à apprendre et A’ à tester, le modèle retrouve presque la même image. Ce succès peut surestimer sa capacité à reconnaître une nouvelle plante.', [['A', 'plante 1', 'apprendre'], ['A’', 'plante 1', 'tester'], ['B', 'plante 2', 'tester']], ['1-2'], 'Le jeu de test peut contenir indirectement de l’information déjà apprise.'],
      ['Séparer les groupes', 'On place les deux images de la plante 1 dans le même jeu et réserve la plante 2. Selon le besoin réel, le groupe à isoler peut être une plante, une machine, une personne ou une période.', [['A', 'plante 1', 'apprendre'], ['A’', 'plante 1', 'apprendre'], ['B', 'plante 2', 'tester']], ['2-2'], 'Une séparation pertinente suit l’origine des données.'],
    ]),
  ],
  neurone: [
    b('Échelle des entrées', 'Les nombres représentant des grandeurs doivent être interprétés avec leur échelle ; une grande valeur brute ne signifie pas une grande importance.', ['Entrée', 'Valeur brute', 'Échelle 0 à 1'], [
      ['Identifier les échelles', 'Un exemple contient une température de 40 °C, sur une échelle choisie de 0 à 100 °C, et une humidité de 0,8, déjà exprimée entre 0 et 1.', [['Température', '40', '?'], ['Humidité', '0,8', '0,8']], ['0-1', '1-1'], 'Les valeurs brutes utilisent des conventions différentes.'],
      ['Transformer l’entrée', 'Pour cette échelle fixée, on divise la température par 100 : elle devient 0,4. On a changé la représentation du nombre, pas la température réelle.', [['Température', '40 / 100', '0,4'], ['Humidité', '0,8', '0,8']], ['0-2'], 'Une normalisation explicite rend les échelles comparables.', ['Entrée', 'Conversion', 'Échelle 0 à 1']],
      ['Appliquer les poids ensuite', 'Avec un poids égal à 1 pour chaque entrée normalisée, la somme vaut 0,4 + 0,8 = 1,2. Les poids du modèle doivent correspondre à la représentation utilisée.', [['Température', '1 × 0,4', '0,4'], ['Humidité', '1 × 0,8', '0,8'], ['Somme', '0,4 + 0,8', '1,2']], ['2-2'], 'Le sens d’un poids dépend aussi de l’échelle de son entrée.', ['Entrée', 'Calcul', 'Contribution']],
    ]),
    b('Contribution positive ou négative', 'Un poids positif fait monter la somme quand l’entrée augmente ; un poids négatif la fait baisser.', ['Entrée x', 'Poids', 'Contribution'], [
      ['Multiplier par un nombre positif', 'L’entrée vaut 2 et son poids vaut 3. La contribution à la somme est 6. Cette contribution pousse la somme vers le haut.', [['2', '+3', '+6']], ['0-2'], '2 × 3 = 6.'],
      ['Changer le signe du poids', 'On garde l’entrée 2 mais on prend le poids −3. La contribution devient −6. Cette contribution négative diminue la somme des contributions positives.', [['2', '−3', '−6']], ['0-1'], '2 × (−3) = −6.'],
      ['Augmenter la même entrée', 'Avec ce poids négatif, passer l’entrée de 2 à 3 fait passer la contribution de −6 à −9. Une plus grande entrée fait donc baisser la somme.', [['2', '−3', '−6'], ['3', '−3', '−9']], ['1-2'], 'Le poids indique une importance et un sens d’influence.'],
    ]),
  ],
  gradient: [
    b('Paramètre et prédiction', 'Le paramètre est le réglage que l’on apprend ; la prédiction est le résultat du modèle pour une entrée donnée.', ['Élément', 'Valeur', 'Rôle'], [
      ['Écrire un petit modèle', 'Notre modèle calcule w × x. Pour l’entrée x = 2, le poids w = 1 donne une prédiction de 2. L’entrée décrit le cas ; le poids est le réglage.', [['Entrée', '2', 'donnée'], ['Poids', '1', 'réglage'], ['Prédiction', '2', '1 × 2']], ['1-1'], 'On ajuste le paramètre, pas la réponse de référence.'],
      ['Comparer à la cible', 'La référence de cet exemple vaut 6. Avec une prédiction de 2, l’erreur vaut −4 et la perte quadratique vaut 16.', [['Prédiction', '2', 'calcul'], ['Référence', '6', 'cible'], ['Perte', '16', '(2 − 6)²']], ['2-1'], 'La perte transforme l’écart en quantité à réduire.'],
      ['Modifier le réglage', 'En passant w à 2, la prédiction devient 4, toujours sur l’entrée 2. La perte descend à (4 − 6)² = 4. Le gradient choisira comment modifier ce poids.', [['Entrée', '2', 'inchangée'], ['Poids', '2', 'modifié'], ['Prédiction', '4', '2 × 2'], ['Perte', '4', '(4 − 6)²']], ['3-1'], 'Apprendre modifie les paramètres qui produisent les prédictions.'],
    ]),
    b('Pente et sens de la correction', 'La pente indique comment la perte varie avec le paramètre ; soustraire une pente négative fait augmenter ce paramètre.', ['Réglage x', 'Pente', 'Nouveau x'], [
      ['Se placer à gauche du minimum', 'Pour la perte (x − 3)², la pente vaut 2(x − 3). À x = 1, elle vaut −4 : augmenter x un peu fait baisser la perte.', [['1', '−4', '?']], ['0-1'], 'Pente négative : la perte diminue quand x augmente localement.'],
      ['Appliquer une petite correction', 'Avec un taux de 0,25, on calcule x suivant = 1 − 0,25 × (−4) = 2. Soustraire un nombre négatif ajoute ici 1.', [['1', '−4', '2']], ['0-2'], 'La correction suit le sens opposé à la pente.'],
      ['Recalculer au nouvel endroit', 'À x = 2, la pente vaut désormais −2. Le même taux donne 2 − 0,25 × (−2) = 2,5. On recalcule la pente à chaque étape.', [['1', '−4', '2'], ['2', '−2', '2,5']], ['1-2'], 'La direction et l’amplitude viennent de la pente actuelle.'],
    ]),
  ],
  recommandation: [
    b('Ressemblance sur des notes communes', 'Une mesure de ressemblance compare les mêmes contenus ; une note absente ne doit pas être traitée comme un zéro.', ['Personne', 'Film A', 'Film B'], [
      ['Trouver les cases comparables', 'Ana note A à 5 et B à 2. Ben donne 4 et 2 ; Chloé donne 1 et 5. Ces deux films sont communs aux trois personnes : on peut comparer leurs notes.', [['Ana', '5', '2'], ['Ben', '4', '2'], ['Chloé', '1', '5']], ['0-1', '0-2'], 'Comparer les préférences sur les mêmes contenus.'],
      ['Calculer un écart', 'Avec la somme des écarts absolus, Ben est à |5 − 4| + |2 − 2| = 1 d’Ana. Chloé est à |5 − 1| + |2 − 5| = 7. Dans cette mesure, un petit écart indique plus de ressemblance.', [['Ana / Ben', '1 + 0', 'écart 1'], ['Ana / Chloé', '4 + 3', 'écart 7']], ['0-2'], 'La ressemblance dépend de la mesure choisie.', ['Comparaison', 'Calcul', 'Écart']],
      ['Limiter l’interprétation', 'Ben est le voisin le plus proche sur ces deux films. Cela donne un indice pour un autre film, mais pas une certitude : deux notes communes restent peu d’information.', [['Voisin', 'Ben', 'écart 1'], ['Comparaison', '2 films', 'indice limité']], ['1-1'], 'Une ressemblance observée n’est pas une identité de goûts.', ['Élément', 'Valeur', 'Interprétation']],
    ]),
  ],
};
