// Fiches des ateliers de conception du module 2 : titre et mission affichés au temps « Construire ».
// Les composants correspondants sont dans web/src/ateliers/AteliersConceptionM2.jsx.
export const FICHES_CONCEPTION_M2 = {
  agent: {
    type: 'conception_agent',
    titre: "Spécifiez l'équipement d'un drone de livraison",
    mission: "Choisissez les capteurs et les effecteurs du drone dans le catalogue, sans dépasser le budget de masse ni le budget de coût. Le système fait traverser à votre drone les six situations de sa mission et dit, pour chacune, ce qu'il n'a pas su percevoir ou ce qu'il n'a pas pu faire.",
  },
  lidar: {
    type: 'conception_lidar',
    titre: 'Réglez le lidar pour que le robot voie à temps',
    mission: "Réglez le nombre de rayons, la portée et la vitesse du robot. Le système lance réellement les rayons, case après case, dans trois scènes de l'entrepôt, et vérifie que chaque obstacle est touché assez tôt pour que le robot s'arrête, sans saturer le calculateur.",
  },
  etat: {
    type: 'conception_etat',
    titre: "Concevez l'exploitation d'un capteur bruité",
    mission: "Le robot approche d'un mur avec un lidar dont chaque mesure porte un bruit de 0,2 m. Fixez le nombre de mesures à moyenner avant de décider, et la marge ajoutée à la distance d'arrêt. Le système simule 4 000 approches et compte les collisions et les arrêts trop éloignés du mur.",
  },
  boucle: {
    type: 'conception_boucle',
    titre: "Programmez la boucle d'un agent",
    mission: "Faites les quatre choix de programmation de la boucle : où percevoir, sur quoi décider, quand s'arrêter, à quelle cadence. Le système exécute le programme obtenu dans un couloir libre, sur un sol glissant et devant un chariot qui traverse, et trace la trajectoire de chaque essai.",
  },
};
