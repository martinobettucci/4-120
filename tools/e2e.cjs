// Vérification de bout en bout du site : navigation, animations, scène 3D, notebooks.
// Produit des captures JPEG dans docs/captures et, avec --video, une vidéo WebM.
// Usage : node tools/e2e.cjs [url de base] [--video]
const { chromium } = require('playwright');
const fs = require('node:fs');

(async () => {
const base = (process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'http://localhost:4173').replace(/\/$/, '');
const video = process.argv.includes('--video');
const sortie = 'docs/captures';
fs.mkdirSync(sortie, { recursive: true });
const erreurs = [];
const verifier = (condition, message) => { if (!condition) { erreurs.push(message); console.error('ECHEC :', message); } else console.log('ok    :', message); };

const navigateur = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const contexte = await navigateur.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, ...(video ? { recordVideo: { dir: sortie, size: { width: 1440, height: 900 } } } : {}) });
const page = await contexte.newPage();
page.on('pageerror', (e) => erreurs.push(`Erreur JavaScript : ${e.message}`));
page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('favicon')) erreurs.push(`Console : ${m.text()}`); });
const capture = (nom, options = {}) => page.screenshot({ path: `${sortie}/${nom}.jpg`, type: 'jpeg', quality: 82, ...options });

// Accueil et scène 3D de vitrine
await page.goto(`${base}/#/`);
await page.waitForSelector('[data-testid=vue3d] canvas');
await page.waitForTimeout(1500);
verifier((await page.textContent('h1')).includes('agents autonomes'), 'accueil : titre de la formation');
verifier((await page.locator('.carte.module').count()) === 6, 'accueil : six modules');
await capture('01-accueil');
await page.locator('[data-testid=lecture]').first().click();
await page.waitForTimeout(3500);
await page.locator('[data-testid=vue3d]').first().scrollIntoViewIfNeeded();
await capture('02-accueil-scene3d');
const compteur = await page.locator('.compteur').first().textContent();
verifier(!compteur.startsWith('Étape 0 '), `accueil : la lecture 3D avance (${compteur.trim()})`);

// Les six modules
for (let n = 1; n <= 6; n++) {
  await page.goto(`${base}/#/module/${n}`);
  await page.waitForSelector('.animation');
  await page.waitForTimeout(700);
  verifier((await page.locator('.erreur').count()) === 0, `module ${n} : aucune donnée manquante`);
  const etapes = await page.locator('.anim-points button').count();
  verifier(etapes >= 4, `module ${n} : animation en ${etapes} étapes`);
  for (let k = 0; k < etapes; k++) {
    await page.locator('.anim-points button').nth(k).click();
    await page.waitForTimeout(250);
    if (k === Math.min(3, etapes - 1) || k === 1) {
      await page.locator('.animation').scrollIntoViewIfNeeded();
      await page.locator('.animation').screenshot({ path: `${sortie}/m${n}-animation-${k + 1}.jpg`, type: 'jpeg', quality: 82 });
    }
  }
  if (await page.locator('[data-testid=vue3d]').count()) {
    await page.locator('[data-testid=vue3d]').scrollIntoViewIfNeeded();
    for (let k = 0; k < 9; k++) await page.locator('[data-testid=pas]').click();
    await page.waitForTimeout(900);
    verifier((await page.locator('.compteur').textContent()).includes('Étape 9'), `module ${n} : lecture 3D étape par étape`);
    verifier((await page.locator('.decision .raison').first().textContent()).length > 5, `module ${n} : la décision est expliquée`);
    await page.locator('.lecteur').screenshot({ path: `${sortie}/m${n}-scene3d.jpg`, type: 'jpeg', quality: 82 });
  }
  const liens = await page.locator('.carte.notebook a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  for (const lien of liens.filter((l) => l.startsWith('notebooks/'))) {
    const r = await page.request.get(`${base}/${lien}`);
    verifier(r.ok(), `module ${n} : ${lien} disponible`);
  }
}

// Vue éclatée dans l'atelier, puis pages de contenu
await page.goto(`${base}/#/atelier`);
await page.waitForSelector('[data-testid=vue3d] canvas');
await page.getByLabel('Vue éclatée du robot').check();
await page.getByRole('button', { name: 'Près du robot' }).click();
await page.waitForTimeout(1800);
await page.locator('.lecteur').screenshot({ path: `${sortie}/atelier-vue-eclatee.jpg`, type: 'jpeg', quality: 82 });
await page.getByLabel('Vue éclatée du robot').uncheck();
await page.getByRole('button', { name: "Vue d'ensemble" }).click();
await page.locator('[data-testid=lecture]').click();
await page.waitForTimeout(video ? 9000 : 2500);
await page.locator('.lecteur').screenshot({ path: `${sortie}/atelier-croyance.jpg`, type: 'jpeg', quality: 82 });
// Synchronisation notebook vers 3D : import d'une trace produite par le notebook 05
if (fs.existsSync('notebooks/resultats/m5-appris.json')) {
  await page.locator('input[type=file]').setInputFiles('notebooks/resultats/m5-appris.json');
  await page.waitForTimeout(1200);
  verifier((await page.locator('[data-testid=choix-a]').inputValue()) === '__import', 'atelier : import d\'une trace de notebook');
  for (let k = 0; k < 12; k++) await page.locator('[data-testid=pas]').click();
  await page.waitForTimeout(800);
  verifier((await page.locator('.erreur').count()) === 0, 'atelier : la trace importée se rejoue');
  await page.locator('.lecteur').screenshot({ path: `${sortie}/atelier-trace-importee.jpg`, type: 'jpeg', quality: 82 });
}
for (const [route, texte] of [['syllabus', 'Niveau SAME'], ['consignes', 'Consignes de production'], ['notebooks', 'Notebooks']]) {
  await page.goto(`${base}/#/${route}`);
  await page.waitForTimeout(400);
  verifier((await page.textContent('main')).includes(texte), `page ${route}`);
  await capture(`page-${route}`);
}
await contexte.close();
if (video) {
  const fichier = await page.video().path();
  fs.renameSync(fichier, `${sortie}/parcours.webm`);
}
await navigateur.close();
if (erreurs.length) { console.error(`\n${erreurs.length} problème(s) :\n` + erreurs.join('\n')); process.exit(1); }
console.log('\nToutes les vérifications passent.');
})();
