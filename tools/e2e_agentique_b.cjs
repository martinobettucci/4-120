// Recettes de bout en bout des ateliers du bloc « Systèmes agentiques » (seconde moitié).
// Chaque fonction part de la leçon ouverte au temps « Construire » : un premier essai insuffisant
// doit être refusé (.bilan.faux), puis une construction correcte doit être validée (.bilan.juste).
// Appelées par tools/e2e.cjs : const recettes = require('./e2e_agentique_b.cjs'); await recettes[id](page).
const verifier = (page) => page.locator('[data-testid=verifier]').click();
const refuse = async (page) => (await page.locator('.bilan.faux').count()) === 1;
const valide = async (page) => (await page.locator('.bilan.juste').count()) === 1;

module.exports = {
  // Seuils de délégation : tout en automatique d'abord (coût et sécurité hors limites), puis 80 % et 97 %.
  autonomie: async (page) => {
    await verifier(page);
    const r = await refuse(page);
    await page.getByLabel('Seuil bas (en dessous : décision humaine)').fill('0.8');
    await page.getByLabel('Seuil haut (au-dessus : exécution automatique)').fill('0.97');
    await verifier(page);
    return { refuse: r, valide: await valide(page) };
  },
  // Routeur : une seule règle d'abord, puis six règles ordonnées et la file par défaut.
  routage: async (page) => {
    await verifier(page);
    const r = (await refuse(page)) && (await page.locator('.banc td.ko').count()) > 0;
    const regles = [['facture', 'Facturation'], ['remboursement', 'Facturation'], ['incendie', 'Urgence sécurité'], ['gaz', 'Urgence sécurité'], ['panne', 'Technique'], ['portail', 'Technique']];
    for (let k = 1; k < regles.length; k++) await page.locator('[data-testid=ajouter-regle]').click();
    for (let k = 0; k < regles.length; k++) {
      const li = page.locator('.regles-edit li').nth(k);
      await li.locator('input').fill(regles[k][0]);
      await li.locator('select').selectOption(regles[k][1]);
    }
    await page.getByLabel('File par défaut').selectOption('Administratif');
    await verifier(page);
    return { refuse: r, valide: (await valide(page)) && (await page.locator('.banc td.ok').count()) === 12 };
  },
  // RAG : une fiche entière et un seul morceau d'abord, puis morceaux de 2 phrases, k = 2, mots pondérés.
  rag: async (page) => {
    await verifier(page);
    const r = await refuse(page);
    await page.getByLabel('Taille des morceaux (phrases)').fill('2');
    await page.getByLabel('Nombre k de morceaux transmis').fill('2');
    await page.getByLabel("Score d'un morceau").selectOption('rarete');
    await verifier(page);
    return { refuse: r, valide: await valide(page) };
  },
  // Journal : identifiant et texte intégral d'abord (audit sans réponse, donnée personnelle), puis le schéma utile.
  gouvernance: async (page) => {
    await verifier(page);
    const r = await refuse(page);
    await page.getByLabel('Texte intégral des pièces du dossier', { exact: true }).uncheck();
    for (const nom of ['Horodatage de chaque étape', 'Version des règles, des seuils et du modèle', 'Règles déclenchées et scores calculés', "Avis de chaque agent et décision de l'arbitre", 'Identifiant du validateur humain et sa décision', "Appels d'outils et leurs réponses", 'Empreinte numérique de chaque pièce reçue']) await page.getByLabel(nom, { exact: true }).check();
    await verifier(page);
    return { refuse: r, valide: await valide(page) };
  },
};
