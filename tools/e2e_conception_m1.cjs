// Recettes de bout en bout des ateliers de conception du module 1.
// Chaque fonction part de l'atelier dans son état initial : un ou plusieurs essais insuffisants doivent être
// refusés (.bilan.faux), puis une construction correcte, saisie par l'interface, doit être validée (.bilan.juste).
// « zone » est une page Playwright ou le localisateur de l'atelier.
// Appel : const recettes = require('./e2e_conception_m1.cjs'); const { refuse, valide } = await recettes[id](zone).
const verifier = (zone) => zone.locator('[data-testid=verifier]').click();
const refuse = async (zone, texte) => (await zone.locator('.bilan.faux').count()) === 1 && (!texte || (await zone.locator('.bilan.faux').textContent()).includes(texte));
const valide = async (zone) => (await zone.locator('.bilan.juste').count()) === 1 && (await zone.locator('.banc td.ko').count()) === 0;
const choisir = (zone, nom, valeur) => zone.getByLabel(nom, { exact: true }).selectOption(valeur);
const regler = (zone, nom, valeur) => zone.getByLabel(nom, { exact: true }).fill(String(valeur));

module.exports = {
  // Bayes : la caméra simple seule (30 % d'alertes fondées), puis la meilleure caméra seule (72 %),
  // puis un second passage devant le même détecteur, enfin la caméra simple suivie d'une pesée indépendante.
  bayes: async (zone) => {
    await verifier(zone);
    const initial = await refuse(zone, 'fausses alertes');
    await choisir(zone, 'Détecteur', 'hd'); await verifier(zone);
    const meilleur = await refuse(zone, 'Le meilleur détecteur ne suffit pas');
    await choisir(zone, 'Détecteur', 'simple'); await choisir(zone, 'Confirmation des colis signalés', 'relecture'); await verifier(zone);
    const relecture = await refuse(zone, 'le trompe de nouveau');
    await choisir(zone, 'Confirmation des colis signalés', 'pesee'); await verifier(zone);
    return { refuse: initial && meilleur && relecture, valide: await valide(zone) };
  },
  // Réseau : aucun lien, puis les deux effets reliés directement, puis toutes les paires reliées (26 probabilités),
  // enfin la structure sol humide → patinage, sol humide → détecteur, patinage → retard, batterie → retard.
  reseau: async (zone) => {
    const paires = { HP: 'Sol humide et patinage', HD: 'Sol humide et détecteur actif', PD: 'Patinage et détecteur actif', HR: 'Sol humide et retard de livraison', PR: 'Patinage et retard de livraison', DR: 'Détecteur actif et retard de livraison', BR: 'Batterie faible et retard de livraison', BP: 'Batterie faible et patinage' };
    const tracer = async (liens) => { for (const [p, nom] of Object.entries(paires)) await choisir(zone, nom, liens[p] || ''); };
    await verifier(zone);
    const vide = await refuse(zone, 'Constat 1');
    await tracer({ HP: '>', HD: '>', PD: '>', PR: '>', BR: '>' }); await verifier(zone);
    const effets = await refuse(zone, 'Vous reliez directement le patinage et le détecteur');
    await tracer({ HP: '>', HD: '>', PD: '>', HR: '>', PR: '>', DR: '>', BR: '>', BP: '>' }); await verifier(zone);
    const complet = await refuse(zone, '26 probabilités');
    await tracer({ HP: '>', HD: '>', PR: '>', BR: '>' }); await verifier(zone);
    return { refuse: vide && effets && complet, valide: (await valide(zone)) && (await zone.locator('.banc td.ok').count()) === 12 };
  },
  // Coût espéré : 50 % partout (deux chargements sur trois refusés), puis 5 % partout, puis 5 %, 50 % et 75 %.
  utilite: async (zone) => {
    const seuils = ['Seuil, produits fragiles', 'Seuil, cartons de vêtements', 'Seuil, produits frais urgents'];
    await verifier(zone);
    const naturel = (await refuse(zone, 'Le seuil de 50 % paraît naturel')) && (await zone.locator('.banc td.ko').count()) === 2;
    for (const nom of seuils) await regler(zone, nom, 5);
    await verifier(zone);
    const prudent = await refuse(zone, 'trop bas');
    await regler(zone, seuils[1], 50); await regler(zone, seuils[2], 75); await verifier(zone);
    return { refuse: naturel && prudent, valide: (await valide(zone)) && (await zone.locator('.banc td.ok').count()) === 3 };
  },
  // Supervisé : tout à l'entraînement (aucun test), puis un test fait de doublons de l'entraînement (100 % annoncés),
  // puis l'échantillon de contrôle en test mais tous les autres lots à l'entraînement, enfin jour et nuit seuls à l'entraînement.
  supervise: async (zone) => {
    await verifier(zone);
    const tout = await refuse(zone, "Tous les lots retenus sont partis à l'entraînement");
    await choisir(zone, 'Export du 2 juillet', 'test'); await verifier(zone);
    const doublons = await refuse(zone, 'par cœur');
    await choisir(zone, 'Export du 2 juillet', 'train'); await choisir(zone, 'Échantillon de contrôle', 'test'); await verifier(zone);
    const pollue = await refuse(zone, 'étiquettes douteuses');
    for (const nom of ['Export du 2 juillet', 'Semaine calme', 'Saisie rapide', 'Entrepôt voisin']) await choisir(zone, nom, 'ecarte');
    await verifier(zone);
    return { refuse: tout && doublons && pollue, valide: await valide(zone) };
  },
  // Recommandation : notes brutes avec un voisin, puis le meilleur réglage en notes brutes (erreur 0,95),
  // puis notes centrées avec quatre séries communes (couverture 86 %), enfin notes centrées, 3 voisins, 2 séries communes.
  recommandation: async (zone) => {
    await verifier(zone);
    const initial = await refuse(zone, 'sévère');
    await regler(zone, 'Voisins retenus', 4); await regler(zone, 'Séries communes exigées', 2); await verifier(zone);
    const brut = await refuse(zone, 'sévère');
    await choisir(zone, 'Mesure de proximité', 'centre'); await regler(zone, 'Voisins retenus', 2); await regler(zone, 'Séries communes exigées', 4); await verifier(zone);
    const couverture = await refuse(zone, 'sans prédiction');
    await regler(zone, 'Voisins retenus', 3); await regler(zone, 'Séries communes exigées', 2); await verifier(zone);
    return { refuse: initial && brut && couverture, valide: await valide(zone) };
  },
};
