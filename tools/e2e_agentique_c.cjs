// Recettes de bout en bout des ateliers du bloc « Systèmes agentiques » (troisième partie).
// Chaque fonction part de la leçon ouverte au temps « Construire » : un premier essai insuffisant
// doit être refusé (.bilan.faux), puis une construction correcte doit être validée (.bilan.juste).
// Appelées par tools/e2e.cjs : const recettes = require('./e2e_agentique_c.cjs'); await recettes[id](page).
const verifier = (page) => page.locator('[data-testid=verifier]').click();
const refuse = async (page) => (await page.locator('.bilan.faux').count()) === 1;
const valide = async (page) => (await page.locator('.bilan.juste').count()) === 1;

module.exports = {
  // Heuristique de priorité : les poids de la démonstration d'abord (5 exigences sur 7), puis 6, 1, 1, 2, 2.
  nonllm: async (page) => {
    await verifier(page);
    const r = (await refuse(page)) && (await page.locator('.banc td.ko').count()) === 2;
    for (const [nom, poids] of [['Gravité', '6'], ['Secteur', '1'], ["Jour d'attente", '1'], ['Délai dépassé', '2'], ['Client stratégique', '2']]) await page.getByLabel(nom, { exact: true }).fill(poids);
    await verifier(page);
    return { refuse: r, valide: (await valide(page)) && (await page.locator('.banc td.ok').count()) === 7 };
  },
  // Design patterns : le score seul d'abord (40 acceptations fautives), puis tous les patterns (revue saturée),
  // puis un superviseur central et la seule double validation.
  patterns: async (page) => {
    await verifier(page);
    const seul = (await refuse(page)) && (await page.locator('.bilan.faux').textContent()).includes('acceptations fautives');
    for (const nom of ['Double validation', 'Contradicteur dédié', 'Suggestion puis validation humaine']) await page.getByLabel(nom, { exact: true }).check();
    await verifier(page);
    const tout = (await refuse(page)) && (await page.locator('.bilan.faux').textContent()).includes('revue humaine dépasse');
    for (const nom of ['Contradicteur dédié', 'Suggestion puis validation humaine']) await page.getByLabel(nom, { exact: true }).uncheck();
    await verifier(page);
    const pipeline = (await refuse(page)) && (await page.locator('.bilan.faux').textContent()).includes('même point');
    await page.getByLabel('Organisation des agents', { exact: true }).selectOption('superviseur');
    await verifier(page);
    return { refuse: seul && tout && pipeline, valide: (await valide(page)) && (await page.locator('.banc td.ko').count()) === 0 };
  },
};
