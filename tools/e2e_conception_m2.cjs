// Recettes de bout en bout des ateliers de conception du module 2.
// Chaque fonction part de l'atelier dans son état initial : un ou plusieurs essais insuffisants doivent être
// refusés (.bilan.faux), puis une construction correcte, saisie par l'interface, doit être validée (.bilan.juste).
// « zone » est une page Playwright ou le localisateur de l'atelier.
const verifier = (zone) => zone.locator('[data-testid=verifier]').click();
const refuse = async (zone, texte) => (await zone.locator('.bilan.faux').count()) === 1 && (!texte || (await zone.locator('.bilan.faux').textContent()).includes(texte));
const valide = async (zone) => (await zone.locator('.bilan.juste').count()) === 1 && (await zone.locator('.banc td.ko').count()) === 0;
const choisir = (zone, nom, valeur) => zone.getByLabel(nom, { exact: true }).selectOption(String(valeur));
const regler = (zone, nom, valeur) => zone.getByLabel(nom, { exact: true }).fill(String(valeur));
const cocher = (zone, nom, etat) => zone.getByLabel(nom, { exact: true }).setChecked(etat);

const EQUIPEMENTS = ['Récepteur GPS', 'Caméra couleur', 'Caméra thermique', 'Lidar', 'Télémètre pointé vers le sol', 'Centrale inertielle', 'Jauge de batterie', 'Quatre hélices motorisées', 'Moteurs à réserve de poussée', 'Pince de largage', 'Projecteur', 'Haut-parleur'];

module.exports = {
  // Agent : l'équipement de départ (quatre situations en échec), puis tout le catalogue (690 g, 900 €),
  // puis tous les capteurs sans aucun effecteur de vol, enfin l'équipement qui tient les six situations (560 g, 640 €).
  agent: async (zone) => {
    const equiper = async (retenus) => { for (const nom of EQUIPEMENTS) await cocher(zone, nom, retenus.includes(nom)); };
    await verifier(zone);
    const initial = await refuse(zone, 'aucun capteur ne lui livre');
    await equiper(EQUIPEMENTS); await verifier(zone);
    const tout = await refuse(zone, 'Le budget est dépassé');
    await equiper(EQUIPEMENTS.slice(0, 7).filter((nom) => nom !== 'Caméra thermique')); await verifier(zone);
    const impuissant = await refuse(zone, 'sans pouvoir y répondre');
    await equiper(EQUIPEMENTS.filter((nom) => nom !== 'Caméra thermique' && nom !== 'Haut-parleur')); await verifier(zone);
    return { refuse: initial && tout && impuissant, valide: await valide(zone) };
  },
  // Lidar : le lidar de la leçon (8 rayons, trop lent), puis 4 rayons à longue portée (la diagonale reste invisible),
  // puis la grande vitesse avec une portée courte, enfin 16 rayons, 5 cases de portée, 2 cases par seconde.
  lidar: async (zone) => {
    const reglage = async (rayons, portee, vitesse) => { await choisir(zone, 'Nombre de rayons', rayons); await regler(zone, 'Portée', portee); await regler(zone, 'Vitesse', vitesse); };
    await verifier(zone);
    const initial = await refuse(zone, 'cadence');
    await reglage(4, 10, 2); await verifier(zone);
    const quatre = await refuse(zone, 'avec 4 rayons');
    await reglage(16, 3, 3); await verifier(zone);
    const rapide = await refuse(zone, "pour s'arrêter");
    await reglage(16, 5, 2); await verifier(zone);
    return { refuse: initial && quatre && rapide, valide: await valide(zone) };
  },
  // État : une mesure sans marge (trop de collisions), puis trente mesures (le robot roule 0,75 m sans décider),
  // puis une marge excessive (arrêts hors de portée du bras), enfin cinq mesures et 0,32 m de marge.
  etat: async (zone) => {
    const reglage = async (n, marge) => { await regler(zone, 'Mesures moyennées', n); await regler(zone, 'Marge de sécurité', marge); };
    await verifier(zone);
    const initial = await refuse(zone, 'Trop de collisions');
    await reglage(30, 0.3); await verifier(zone);
    const lent = await refuse(zone, 'sans rien décider');
    await reglage(5, 0.8); await verifier(zone);
    const loin = await refuse(zone, 'hors de portée du bras');
    await reglage(5, 0.32); await verifier(zone);
    return { refuse: initial && lent && loin, valide: await valide(zone) };
  },
  // Boucle : la boucle ouverte (un scénario réussi sur trois), puis la boucle fermée à 1 s par tour
  // (collision avec le chariot), enfin la boucle fermée à 0,2 s par tour.
  boucle: async (zone) => {
    await verifier(zone);
    const ouverte = (await refuse(zone, "ne perçoit qu'une fois")) && (await zone.locator('.banc td.ok').count()) === 1;
    await choisir(zone, 'Perception', 'chaque'); await choisir(zone, 'Décision', 'obs'); await choisir(zone, "Condition d'arrêt", 'observe'); await verifier(zone);
    const lente = (await refuse(zone, 'entre deux perceptions')) && (await zone.locator('.banc td.ok').count()) === 2;
    await choisir(zone, 'Période de la boucle', 0.2); await verifier(zone);
    return { refuse: ouverte && lente, valide: (await valide(zone)) && (await zone.locator('.banc td.ok').count()) === 3 };
  },
};
