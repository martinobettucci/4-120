// Recettes de bout en bout des ateliers de conception des modules 3, 4 et 5.
// Chaque fonction part de l'atelier dans son état initial : un ou plusieurs essais insuffisants doivent être
// refusés (.bilan.faux), puis une construction correcte, saisie par l'interface, doit être validée (.bilan.juste).
// « zone » est une page Playwright ou le localisateur de l'atelier.
const verifier = (zone) => zone.locator('[data-testid=verifier]').click();
const refuse = async (zone, texte) => (await zone.locator('.bilan.faux').count()) === 1 && (!texte || (await zone.locator('.bilan.faux').textContent()).includes(texte));
const valide = async (zone) => (await zone.locator('.bilan.juste').count()) === 1 && (await zone.locator('.banc td.ko').count()) === 0;
const choisir = (zone, nom, valeur) => zone.getByLabel(nom, { exact: true }).selectOption(String(valeur));
const regler = (zone, nom, valeur) => zone.getByLabel(nom, { exact: true }).fill(String(valeur));

module.exports = {
  // A* : aucune heuristique (125 cases examinées), puis le vol d'oiseau multiplié par 2 (rapide, mais 24 pas pour 22),
  // puis Manhattan avec un départage qui disperse la recherche, enfin Manhattan départagée vers l'objectif.
  astar: async (zone) => {
    await verifier(zone);
    const sans = await refuse(zone, 'Dijkstra');
    await choisir(zone, 'Heuristique', 'oiseau'); await regler(zone, 'Facteur', 2); await verifier(zone);
    const surestimee = await refuse(zone, 'chicane');
    await choisir(zone, 'Heuristique', 'manhattan'); await regler(zone, 'Facteur', 1); await choisir(zone, 'Départage', 'g'); await verifier(zone);
    const disperse = await refuse(zone, 'ex æquo');
    await choisir(zone, 'Départage', 'h'); await verifier(zone);
    return { refuse: sans && surestimee && disperse, valide: await valide(zone) };
  },
  // Hybride : le plan a la priorité (collision), puis la garde qui replanifie sans rien noter (même plan, sans fin),
  // puis une patience d'un pas (détour inutile devant le chariot), enfin deux pas de patience et la mémoire de l'obstacle.
  hybride: async (zone) => {
    await verifier(zone);
    const plan = await refuse(zone, 'Collision');
    await choisir(zone, 'Priorité', 'garde'); await regler(zone, 'Distance de garde', 1); await choisir(zone, 'Après un blocage', 'replanifier'); await verifier(zone);
    const oubli = await refuse(zone, 'le même plan');
    await choisir(zone, 'Après un blocage', 'patience'); await choisir(zone, 'Mémoire', 'oui'); await verifier(zone);
    const presse = await refuse(zone, 'part pour un détour');
    await regler(zone, 'Patience', 2); await verifier(zone);
    return { refuse: plan && oubli && presse, valide: (await valide(zone)) && (await zone.locator('.banc td.ok').count()) === 3 };
  },
  // Espace : la distance seule (U servie à 93 s), puis un retard qui pèse trop peu, enfin retard à 5 et passage à 20.
  espace: async (zone) => {
    await verifier(zone);
    const distance = await refuse(zone, "ne parle de l'urgence");
    await regler(zone, 'Poids du retard', 1); await regler(zone, 'Poids des passages', 10); await verifier(zone);
    const leger = await refuse(zone);
    await regler(zone, 'Poids du retard', 5); await regler(zone, 'Poids des passages', 20); await verifier(zone);
    return { refuse: distance && leger, valide: (await valide(zone)) && (await zone.locator('.banc td.ok').count()) === 3 };
  },
  // Croyance : aucun repère, puis trois portes régulièrement espacées (positions indiscernables),
  // puis une bonne disposition avec un capteur tenu pour infaillible, enfin les portes 1, 5 et 6 à 90 %.
  croyance: async (zone) => {
    const poser = async (cases) => { for (let i = 1; i <= 10; i++) await zone.getByLabel(`Porte en case ${i}`, { exact: true }).setChecked(cases.includes(i)); };
    await verifier(zone);
    const vide = await refuse(zone, 'Sans repère');
    await poser([1, 4, 7]); await regler(zone, 'Confiance dans le capteur', 90); await verifier(zone);
    const regulier = await refuse(zone, 'toutes les 3 cases');
    await poser([1, 5, 6]); await regler(zone, 'Confiance dans le capteur', 100); await verifier(zone);
    const infaillible = await refuse(zone, 'infaillible');
    await regler(zone, 'Confiance dans le capteur', 90); await verifier(zone);
    return { refuse: vide && regulier && infaillible, valide: (await valide(zone)) && (await zone.locator('.banc td.ok').count()) === 3 };
  },
};
