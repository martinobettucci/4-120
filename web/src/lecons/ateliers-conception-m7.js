// Fiches des ateliers de conception du module 7 (systèmes agentiques) : titre et mission affichés au-dessus de chaque atelier.
// Les composants correspondants sont dans web/src/ateliers/AteliersConceptionM7.jsx.
export const FICHES_CONCEPTION_M7 = {
  composantes: {
    type: 'conception_composantes',
    titre: "Spécifiez l'agent qui traitera les demandes de congé d'un service",
    mission: "Un assistant de ressources humaines doit traiter les demandes de congé d'une équipe de cinq personnes. Fixez ce qu'il perçoit, ce qu'il tient à jour, ses règles de décision, ses actions et ce qu'il exécute seul. L'agent ainsi spécifié traitera douze demandes, et chacune de ses décisions sera comparée à celle que l'état réel des soldes et du planning imposait.",
  },
  implementation: {
    type: 'conception_implementation',
    titre: 'Programmez la fonction qui fait traverser le système à un dossier',
    mission: "Écrivez la fonction traiter par cinq choix de programmation : dossier non reconnu, écriture du journal, panne d'un agent, désaccord, appel du modérateur. Le programme obtenu s'affiche en Python, puis il est exécuté sur six dossiers de test : pour chacun, le système vérifie la décision rendue et ce que contient le journal.",
  },
  evaluation: {
    type: 'conception_evaluation',
    titre: "Montez le dispositif d'évaluation d'un système en service",
    mission: "Choisissez, sous un budget de 16 jours par mois, les instruments qui mesureront le routeur, l'arbitre et le modérateur. Le système simule un mois de fonctionnement dans lequel cinq défauts ont été introduits, relève les indicateurs de vos instruments et montre, défaut par défaut, si votre dispositif le révèle.",
  },
  casusage: {
    type: 'conception_casusage',
    titre: 'Concevez le système complet qui traitera 1 000 dossiers par jour',
    mission: "Arrêtez les cinq décisions de conception : où multiplier les avis, où contrôler la chaîne, à partir de quelle confiance exécuter seul, quel rôle confier au LLM, que modérer en sortie. Le système chiffre votre conception avec les formules du module (fiabilité d'une chaîne, erreur d'un vote, coût espéré), puis la confronte à cinq exigences.",
  },
};
