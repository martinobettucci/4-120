// Fiches des ateliers de conception des modules 3, 4 et 5 : titre et mission affichés au temps « Construire ».
// Les composants correspondants sont dans web/src/ateliers/AteliersConceptionM3.jsx.
export const FICHES_CONCEPTION_M3 = {
  astar: {
    type: 'conception_astar',
    titre: 'Configurez une recherche de chemin',
    mission: "Choisissez l'heuristique de A*, le facteur qui la multiplie et la règle qui départage les cases de même score. Le système exécute la recherche dans l'entrepôt, colore les cases examinées, trace le chemin rendu et mesure sa longueur et l'étendue de l'exploration.",
  },
  hybride: {
    type: 'conception_hybride',
    titre: "Programmez l'arbitrage entre le plan et la garde réactive",
    mission: "Décidez qui a la priorité quand le lidar contredit le plan, à quelle distance la garde se déclenche, que faire après un blocage et ce que la carte retient. Le système exécute l'agent obtenu face à une palette imprévue, à un chariot qui traverse et à un cul-de-sac, et montre chaque trajectoire.",
  },
  espace: {
    type: 'conception_espace',
    titre: "Écrivez la fonction de coût d'une tournée",
    mission: "Réglez le poids de chaque terme du coût : distance, retard à la station urgente, passages en zone piétonne, énergie. Le système énumère les 120 ordres de visite, retient celui que votre coût préfère et vérifie sur cette tournée ce que demande l'exploitant.",
  },
  croyance: {
    type: 'conception_croyance',
    titre: 'Aménagez un couloir pour que le robot se localise',
    mission: "Posez trois portes au plus dans un couloir de dix cases et réglez la confiance du filtre dans son capteur. Le système exécute le filtre bayésien depuis chacune des dix cases de départ, puis avec une lecture fausse, et mesure la croyance attribuée à la vraie position.",
  },
};
