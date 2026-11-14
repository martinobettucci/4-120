// Vérification de bout en bout du site : navigation, animations, scène 3D, notebooks.
// Produit des captures JPEG dans docs/captures et, avec --video, une vidéo WebM.
// Usage : node tools/e2e.cjs [url de base] [--video]
const { chromium } = require('playwright');
const fs = require('node:fs');

(async () => {
const erreurs = [];
try {
const base = (process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'http://localhost:4173').replace(/\/$/, '');
const video = process.argv.includes('--video');
const sortie = 'docs/captures';
fs.mkdirSync(sortie, { recursive: true });
const verifier = (condition, message) => { if (!condition) { erreurs.push(message); console.error('ECHEC :', message); } else console.log('ok    :', message); };

const options = { args: ['--use-angle=swiftshader', '--use-gl=angle', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'] };
if (process.env.E2E_SANS_WEBGL === '1') options.args = ['--disable-gpu', '--disable-software-rasterizer', '--disable-webgl', '--disable-3d-apis'];
// Chromium complet (nouveau mode sans affichage) de préférence : son WebGL logiciel est plus fiable.
const navigateur = await chromium.launch({ ...options, channel: 'chromium' }).catch(() => chromium.launch(options));
const contexte = await navigateur.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, ...(video ? { recordVideo: { dir: sortie, size: { width: 1440, height: 900 } } } : {}) });
const page = await contexte.newPage();
page.on('response', (r) => { if (r.status() >= 400) console.error(`HTTP ${r.status()} : ${r.url()}`); });
page.on('pageerror', (e) => erreurs.push(`Erreur JavaScript : ${e.message}`));
page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('favicon') && !m.text().includes('WebGL')) erreurs.push(`Console : ${m.text()}`); });
const capture = (nom, options = {}) => page.screenshot({ path: `${sortie}/${nom}.jpg`, type: 'jpeg', quality: 82, ...options });

// Accueil et scène 3D de vitrine
await page.goto(`${base}/#/`);
const webgl = await page.evaluate(() => { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); });
if (!webgl) console.warn('AVERTISSEMENT : WebGL indisponible dans ce navigateur de test, les vérifications 3D sont ignorées.');
await page.waitForSelector(webgl ? '[data-testid=vue3d] canvas' : '[data-testid=vue3d]');
await page.waitForTimeout(1500);
verifier((await page.textContent('h1')).includes('agents autonomes'), 'accueil : titre de la formation');
verifier((await page.locator('.carte.module').count()) === 6, 'accueil : six modules');
await capture('01-accueil');
await page.locator('[data-testid=lecture]').first().click();
await page.waitForTimeout(3500);
await page.locator('[data-testid=vue3d]').first().scrollIntoViewIfNeeded();
await capture('02-accueil-scene3d');
const compteur = await page.locator('.compteur').first().textContent();
if (webgl) verifier(!compteur.startsWith('Étape 0 '), `accueil : la lecture 3D avance (${compteur.trim()})`);
else verifier((await page.textContent('main')).includes('demande WebGL'), 'accueil : message de repli sans WebGL');

// Les six modules
for (let n = 1; n <= 6; n++) {
  await page.goto(`${base}/#/module/${n}`);
  await page.waitForSelector('.animation');
  await page.waitForTimeout(700);
  verifier((await page.locator('.animation ~ .erreur, p.erreur:not(.lecteur .erreur)').count()) === 0, `module ${n} : aucune donnée manquante`);
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
  if (webgl && await page.locator('[data-testid=vue3d]').count()) {
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

if (webgl) {
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
} catch (e) {
  console.error(e.message);
  console.error('Erreurs relevées avant l\'arrêt :\n' + erreurs.join('\n'));
  process.exit(1);
}
})();
