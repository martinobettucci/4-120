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
verifier((await page.locator('.carte.module').count()) === 7, 'accueil : module 0 et six modules');
await capture('01-accueil');
await page.locator('[data-testid=lecture]').first().click();
await page.waitForTimeout(3500);
await page.locator('[data-testid=vue3d]').first().scrollIntoViewIfNeeded();
await capture('02-accueil-scene3d');
const compteur = await page.locator('.compteur').first().textContent();
if (webgl) verifier(!compteur.startsWith('Étape 0 '), `accueil : la lecture 3D avance (${compteur.trim()})`);
else verifier((await page.textContent('main')).includes('demande WebGL'), 'accueil : message de repli sans WebGL');

// Module 0 : sommaire, puis une leçon déroulée de bout en bout comme le ferait un apprenant
await page.goto(`${base}/#/module/0`);
await page.waitForSelector('.lecon-carte');
const nbLecons = await page.locator('.lecon-carte').count();
verifier(nbLecons === 25, `module 0 : ${nbLecons} leçons au sommaire`);
await capture('m0-sommaire');
const allerAuTemps = async (id, k) => { await page.goto(`${base}/#/module/0/${id}`); await page.waitForSelector('.temps'); await page.locator('.temps button').nth(k).click(); };
await page.goto(`${base}/#/module/0/bayes`);
await page.waitForSelector('.accroche');
verifier((await page.locator('.mots div').count()) >= 3, 'leçon : vocabulaire défini avant la démonstration');
await page.locator('.page.lecon').screenshot({ path: `${sortie}/lecon-1-situer.jpg`, type: 'jpeg', quality: 82 });
await page.locator('[data-testid=continuer]').click();
verifier(await page.locator('[data-testid=continuer]').isDisabled(), 'leçon : la démonstration attend une prédiction');
await page.locator('[data-testid=pari]').first().click();
await page.locator('[data-testid=continuer]').click();
const nbEtapes = await page.locator('.demo-etapes li').count();
for (let k = 0; k < nbEtapes; k++) {
  await page.locator(k === 0 ? '[data-testid=jouer-etape]' : '[data-testid=etape-suivante]').click();
  await page.waitForFunction(() => !document.querySelector('[data-testid=jouer-etape]').textContent.includes('en cours'), null, { timeout: 20000 });
  verifier((await page.locator('.narration .regard').count()) === 1, `leçon : étape ${k + 1} commentée, avec consigne d'observation`);
  if (k === 1) await page.locator('.page.lecon').screenshot({ path: `${sortie}/lecon-3-observer.jpg`, type: 'jpeg', quality: 82 });
}
await page.locator('[data-testid=continuer]').click();
verifier((await page.locator('.verdict').count()) === 1, 'leçon : retour sur la prédiction');
verifier((await page.locator('.theorie section').count()) >= 3 && (await page.locator('.theorie .formule').count()) >= 1, 'leçon : cours théorique avec formules');
while (await page.locator('[data-testid=pas-suivant]').count()) await page.locator('[data-testid=pas-suivant]').click();
verifier((await page.locator('.exemple-resolu .resultat').count()) === 1, 'leçon : exemple résolu pas à pas');
await page.locator('.page.lecon').screenshot({ path: `${sortie}/lecon-4-cours.jpg`, type: 'jpeg', quality: 82 });
await page.locator('[data-testid=continuer]').click();
// Atelier : une construction fausse d'abord (retour ciblé), puis la bonne
const champs = page.locator('.atelier .saisie input');
for (const [k, v] of [[0, '19'], [1, '49'], [2, '68'], [3, '90']]) await champs.nth(k).fill(v);
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.atelier .aide-champ').count()) === 1 && (await page.locator('.bilan.faux').count()) === 1, 'atelier : une construction inexacte reçoit une indication ciblée');
await champs.nth(3).fill('28');
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.juste').count()) === 1, 'atelier calcul : construction validée');
await page.locator('.page.lecon').screenshot({ path: `${sortie}/lecon-5-construire.jpg`, type: 'jpeg', quality: 82 });
await page.locator('[data-testid=continuer]').click();
verifier((await page.locator('.a-retenir').count()) === 1, 'leçon : point à retenir');
await page.goto(`${base}/#/module/0`);
verifier((await page.locator('.score').textContent()).startsWith('1'), 'module 0 : la leçon terminée est comptée comme acquise');

// Ateliers de construction : chacun est réussi par une vraie construction, pas par un choix de réponse
// 1. Base de règles
await allerAuTemps('regles', 4);
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.banc td.ko').count()) > 0, 'atelier règles : une base incomplète échoue sur le banc de test');
const regle = async (i, v, op, s, d) => { const li = page.locator('.regles-edit li').nth(i); await li.locator('select').nth(0).selectOption(v); await li.locator('select').nth(1).selectOption(op); await li.locator('input').fill(s); await li.locator('select').nth(2).selectOption(d); };
for (let k = 0; k < 3; k++) await page.locator('[data-testid=ajouter-regle]').click();
await regle(0, 'obstacle', '<', '0.5', 'ARRÊT'); await regle(1, 'temperature', '>', '85', 'ARRÊT'); await regle(2, 'batterie', '<', '20', 'RALENTIR'); await regle(3, 'obstacle', '<', '1.5', 'RALENTIR');
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.banc td.ok').count()) === 8 && (await page.locator('.bilan.juste').count()) === 1, 'atelier règles : la base construite passe les 8 cas');
await page.locator('.atelier').screenshot({ path: `${sortie}/atelier-regles.jpg`, type: 'jpeg', quality: 82 });
// 2. Modèle de contraintes
await allerAuTemps('contraintes', 4);
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.faux').textContent()).includes('trop permissif'), 'atelier contraintes : un modèle incomplet reçoit un contre-exemple');
const contrainte = async (i, g, op, d) => { const li = page.locator('.regles-edit li').nth(i); await li.locator('select').nth(0).selectOption(g); await li.locator('select').nth(1).selectOption(op); await li.locator('select').nth(2).selectOption(d); };
for (let k = 0; k < 4; k++) await page.locator('[data-testid=ajouter-regle]').click();
await contrainte(0, 'A', '≠', 'B'); await contrainte(1, 'A', '≠', 'C'); await contrainte(2, 'B', '≠', 'C'); await contrainte(3, 'A', '<', 'B'); await contrainte(4, 'C', '≠', '1');
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.juste').count()) === 1, 'atelier contraintes : le modèle construit est validé par le solveur');
await page.locator('.atelier').screenshot({ path: `${sortie}/atelier-contraintes.jpg`, type: 'jpeg', quality: 82 });
// 3. Scénario piège
await allerAuTemps('reactif', 4);
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.faux').count()) === 1, 'atelier scénario : une grille vide ne piège pas l\'agent');
for (const c of ['6,2', '6,3', '6,4', '5,2', '5,4', '4,2', '4,4']) await page.locator(`[data-case="${c}"]`).click();
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.juste').count()) === 1, 'atelier scénario : le cul-de-sac construit met l\'agent réactif en défaut');
await page.locator('.atelier').screenshot({ path: `${sortie}/atelier-piege.jpg`, type: 'jpeg', quality: 82 });
// 4. Taux d'apprentissage
await allerAuTemps('gradient', 4);
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.faux').count()) === 1, 'atelier gradient : un taux trop faible ne converge pas');
await page.getByLabel("taux d'apprentissage").fill('0.3');
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.juste').count()) === 1, 'atelier gradient : le taux réglé converge');
// 5. Neurone
await allerAuTemps('neurone', 4);
await page.getByLabel('w₁').fill('0.9'); await page.getByLabel('w₂').fill('0.6'); await page.getByLabel('b', { exact: true }).fill('-0.8');
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.juste').count()) === 1, 'atelier neurone : les poids réglés séparent les deux classes');
await page.locator('.atelier').screenshot({ path: `${sortie}/atelier-neurone.jpg`, type: 'jpeg', quality: 82 });
// 6. Politique
await allerAuTemps('mdp', 4);
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.faux').textContent()).includes('sans flèche'), 'atelier politique : une politique incomplète est refusée');
const N = 1, E = 2, S = 3;
const poser = async (pol) => { for (const [c, n] of Object.entries(pol)) { const actuel = await page.locator(`[data-case="${c}"] text`).first().textContent(); const cible = ['', '↑', '→', '↓'][n]; let garde = 0; while ((await page.locator(`[data-case="${c}"] text`).first().textContent()) !== cible && garde++ < 5) await page.locator(`[data-case="${c}"]`).click(); void actuel; } };
const prudente = { '0,3': E, '1,3': E, '2,3': E, '3,3': E, '4,3': N, '4,2': N, '4,1': N, '3,2': E, '2,2': E, '3,1': E, '0,2': S, '0,1': S, '0,0': E, '1,0': E, '2,0': E, '3,0': E };
await poser({ ...prudente, '0,3': N, '0,2': N, '0,1': N });
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.faux').textContent()).includes('longe la zone interdite'), 'atelier politique : une politique qui longe le danger est refusée');
await poser(prudente);
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.juste').count()) === 1, 'atelier politique : la politique prudente est validée');
await page.locator('.atelier').screenshot({ path: `${sortie}/atelier-politique.jpg`, type: 'jpeg', quality: 82 });
// 7. Récompenses
await allerAuTemps('qlearning', 4);
await page.getByLabel("Atteindre l'objectif").fill('10');
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.faux').textContent()).includes('traversant la zone fragile'), 'atelier récompenses : sans pénalité, l\'agent coupe par la zone fragile');
await page.getByLabel('Entrer dans la zone fragile').fill('-6');
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.juste').count()) === 1, 'atelier récompenses : les récompenses conçues produisent le détour');
await page.locator('.atelier').screenshot({ path: `${sortie}/atelier-recompenses.jpg`, type: 'jpeg', quality: 82 });
// 8. Recuit
await allerAuTemps('recuit', 4);
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.faux').count()) === 1, 'atelier recuit : une température trop basse échoue');
await page.getByLabel('Température initiale').fill('1');
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.juste').count()) === 1, 'atelier recuit : le réglage trouvé atteint l\'objectif');
// 9. Assemblage de programme : on reconstruit l'ordre en déplaçant les lignes
const { ATELIER } = await import(require('node:url').pathToFileURL(require('node:path').resolve('web/src/lecons/cours.js')).href);
await allerAuTemps('boucle', 4);
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.faux').count()) === 1, 'atelier programme : un ordre incorrect est signalé ligne par ligne');
const cible = ATELIER.boucle.config.lignes.map((l) => l.trim());
for (let i = 0; i < cible.length; i++) {
  const textes = await page.locator('.parsons li code').allTextContents();
  let j = textes.findIndex((t, k) => k >= i && t.trim() === cible[i]);
  while (j > i) { await page.locator('.parsons li').nth(j).getByLabel('Monter').click(); j--; }
}
await page.locator('[data-testid=verifier]').click();
verifier((await page.locator('.bilan.juste').count()) === 1, 'atelier programme : le programme assemblé est validé');
await page.locator('.atelier').screenshot({ path: `${sortie}/atelier-programme.jpg`, type: 'jpeg', quality: 82 });
// Toutes les leçons s'ouvrent en entier : cours, démonstration, atelier
const ids = await page.evaluate(() => 0).then(async () => { await page.goto(`${base}/#/module/0`); return page.locator('.lecon-carte').evaluateAll((els) => els.map((e) => e.getAttribute('data-lecon'))); });
for (const id of ids) {
  await page.goto(`${base}/#/module/0/${id}`);
  await page.getByLabel('Tout afficher (mode formateur)').check();
  const ok = (await page.locator('.demo-scene svg').count()) === 1 && (await page.locator('.temps-carte').count()) === 6 && (await page.locator('.theorie section').count()) >= 3 && (await page.locator('.atelier').count()) === 1;
  if (!ok) verifier(false, `leçon ${id} : cours, démonstration ou atelier manquant`);
}
verifier(true, `les ${ids.length} leçons affichent cours, démonstration et atelier`);

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
  verifier((await page.locator('.objectifs li').count()) >= 3 && (await page.locator('.prerequis a').count()) >= 3, `module ${n} : objectifs et prérequis`);
  verifier((await page.locator('.cours-notion').count()) >= 3, `module ${n} : cours théorique à déplier`);
  verifier((await page.locator('.quiz .exercice').count()) === 3, `module ${n} : quiz de fin`);
  if (n === 3) { await page.locator('.mission').scrollIntoViewIfNeeded(); await page.locator('.mission').screenshot({ path: `${sortie}/m3-mission.jpg`, type: 'jpeg', quality: 82 }); }
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
