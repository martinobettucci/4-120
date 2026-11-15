// Fiches des ateliers de conception des modules 5 et 6 : titre et mission affichés au temps « Construire ».
// Les composants correspondants sont dans web/src/ateliers/AteliersConceptionM6.jsx.
export const FICHES_CONCEPTION_M6 = {
  exploration: {
    type: 'conception_exploration',
    titre: "Réglez la stratégie d'exploration d'un agent qui apprend",
    mission: "Trois couloirs mènent au quai, et le robot ne sait rien de leurs durées. Réglez ε initial, sa décroissance et son plancher. Le système lance 40 apprentissages de 800 trajets avec votre réglage, dégage un couloir en cours de route, et mesure ce que l'agent a trouvé et ce qu'il a gagné.",
  },
  confiance: {
    type: 'conception_confiance',
    titre: 'Concevez la campagne qui valide un agent',
    mission: "Fixez le nombre de simulations et la règle d'acceptation. Le système rejoue 2 000 campagnes pour un bon agent et pour un agent insuffisant, et compte combien de fois votre règle se trompe sur chacun.",
  },
  robustesse: {
    type: 'conception_robustesse',
    titre: 'Construisez le plan de test qui départage deux agents',
    mission: "Deux agents font jeu égal en conditions normales. Réglez les conditions et le seuil de réussite de trois niveaux de test. Le système fait passer 400 missions par niveau à chaque agent et vérifie que votre plan accepte le robuste et refuse le naïf, sans sortir du domaine d'emploi.",
  },
  graine: {
    type: 'conception_graine',
    titre: 'Rendez une campagne rejouable',
    mission: "Choisissez où le programme fixe la graine et ce qu'il conserve de chaque essai. Le système exécute la campagne de 60 essais, repère un échec, puis tente de le rejouer seul avec ce que vous avez gardé : il montre si l'échec se reproduit à l'identique et si sa cause peut être établie.",
  },
};
