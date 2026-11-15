// Fiches des ateliers de conception du module 1 : titre et mission affichés au-dessus de chaque atelier.
// Les composants sont dans web/src/ateliers/AteliersConceptionM1.jsx (types « conception_<idLecon> »).
export const FICHES_CONCEPTION_M1 = {
  bayes: {
    type: 'conception_bayes',
    titre: 'Composez un contrôle dont les alertes sont exploitables',
    mission: "2 % des colis sont défectueux. Choisissez un détecteur, son réglage, et décidez de confirmer ou non les colis signalés. Le système fait passer 10 000 colis dans votre dispositif, puis mesure la part des alertes fondées, la part des défauts arrêtés et le coût.",
  },
  reseau: {
    type: 'conception_reseau',
    titre: "Composez les dépendances d'un réseau bayésien",
    mission: "Cinq variables décrivent un trajet du robot : sol humide, patinage, détecteur d'humidité actif, batterie faible, retard de livraison. Tracez les flèches. Le système teste sur votre graphe chacun des constats mesurés, liés ou indépendants, et compte les probabilités qu'il faudrait renseigner.",
  },
  utilite: {
    type: 'conception_utilite',
    titre: "Réglez la politique d'arrêt du robot à partir des coûts",
    mission: "Le même modèle de défaillance équipe trois types de chargement, dont les erreurs ne coûtent pas le même prix. Programmez le seuil d'arrêt de chacun. Le système rejoue 20 000 alertes par chargement et compare le coût de vos décisions à celui du meilleur seuil possible.",
  },
  supervise: {
    type: 'conception_supervise',
    titre: "Choisissez les jeux de données d'un entraînement",
    mission: "Sept lots de situations étiquetées sont disponibles, de qualité inégale. Affectez chacun à l'entraînement, au test, ou écartez-le. Le système entraîne réellement un classifieur sur vos lots, mesure son exactitude sur votre test, puis sur 2 000 situations de terrain que vous ne voyez pas.",
  },
  recommandation: {
    type: 'conception_recommandation',
    titre: "Réglez un recommandeur par filtrage collaboratif",
    mission: "Douze utilisateurs ont noté huit séries. Choisissez la mesure de proximité, le nombre de voisins et le nombre de séries communes exigé. Le système cache tour à tour chaque note connue, la prédit avec votre réglage, puis mesure l'erreur moyenne et la part des notes qu'il a su prédire.",
  },
};
