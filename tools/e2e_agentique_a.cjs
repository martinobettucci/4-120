// Recettes de bout en bout des ateliers du bloc « Systèmes agentiques » (première moitié).
// Chaque fonction part de la leçon ouverte au temps « Construire » : un premier essai insuffisant
// doit être refusé (.bilan.faux), puis une construction correcte doit être validée (.bilan.juste).
// Appelées par tools/e2e.cjs : const recettes = require('./e2e_agentique_a.cjs'); await recettes[id](page).
const verifier = (page) => page.locator('[data-testid=verifier]').click();
const refuse = async (page) => (await page.locator('.bilan.faux').count()) === 1;
const valide = async (page) => (await page.locator('.bilan.juste').count()) === 1;

module.exports = {
  // Composition : tout confié au LLM d'abord (60,8 %, 12 centimes), puis une famille par étape (88,4 %).
  familles: async (page) => {
    await verifier(page);
    const r = (await refuse(page)) && (await page.locator('.bilan.faux').textContent()).includes('maillon le plus faible');
    for (const [etape, famille] of [['Lire le courrier et extraire les champs', 'llm'], ['Contrôler la conformité réglementaire', 'regles'], ['Estimer le risque de fraude', 'statistique'], ["Planifier le rendez-vous d'expertise", 'optimisation']]) await page.getByLabel(etape, { exact: true }).selectOption(famille);
    await verifier(page);
    return { refuse: r, valide: (await valide(page)) && (await page.locator('.bilan.juste').textContent()).includes('hybride') && (await page.locator('.banc td.ko').count()) === 0 };
  },
  // Contrôles : le seul plafond de 5 000 € d'abord (6 cas sur 10), puis les cinq contrôles des règles métier.
  llm: async (page) => {
    await verifier(page);
    const r = (await refuse(page)) && (await page.locator('.banc td.ok').count()) === 6;
    const predicats = ['sup', 'lignes', 'siret', 'date', 'liste'];
    for (let k = 1; k < predicats.length; k++) await page.locator('[data-testid=ajouter-regle]').click();
    for (let k = 1; k < predicats.length; k++) await page.locator('.regles-edit li').nth(k).locator('select').selectOption(predicats[k]);
    await verifier(page);
    return { refuse: r, valide: (await valide(page)) && (await page.locator('.banc td.ok').count()) === 10 };
  },
  // Chaîne : aucun contrôle d'abord (76,4 %), puis un contrôle partout (délai dépassé), puis les agents 2, 4 et 5.
  complexite: async (page) => {
    const cases = page.locator('.regles-edit li input[type=checkbox]');
    await verifier(page);
    const sans = (await refuse(page)) && (await page.locator('.bilan.faux').textContent()).includes('76,4 %');
    for (let k = 0; k < 5; k++) await cases.nth(k).check();
    await verifier(page);
    const tout = (await refuse(page)) && (await page.locator('.bilan.faux').textContent()).includes('Le délai est dépassé');
    for (const k of [0, 2]) await cases.nth(k).uncheck();
    await verifier(page);
    return { refuse: sans && tout, valide: (await valide(page)) && (await page.locator('.bilan.juste').textContent()).includes('91,1 %') };
  },
  // Arbitre : majorité simple d'abord (82 erreurs), puis l'unanimité (équipe saturée), puis poids 2, 1, 1 et accord à 75 %.
  risque: async (page) => {
    await verifier(page);
    const majorite = (await refuse(page)) && (await page.locator('.bilan.faux').textContent()).includes('fausses : 82.');
    await page.getByLabel('Accord exigé', { exact: true }).fill('100');
    await verifier(page);
    const unanimite = (await refuse(page)) && (await page.locator('.bilan.faux').textContent()).includes('saturée');
    await page.getByLabel('Poids du moteur de règles', { exact: true }).fill('2');
    await page.getByLabel('Accord exigé', { exact: true }).fill('75');
    await verifier(page);
    return { refuse: majorite && unanimite, valide: (await valide(page)) && (await page.locator('.bilan.juste').textContent()).includes('0,94 €') };
  },
};
