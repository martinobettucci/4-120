// Parcourt tous les prérequis et le vocabulaire du bloc 0 aux deux tailles.
// Vérifie aussi l'animation, la pause, la reprise, le clavier et les préférences de mouvement.
const { chromium } = require('playwright'); const fs = require('node:fs'); const path = require('node:path');
const { NOTIONS, MOTS_ANIMES } = require('./mots_communs.cjs')();
const base = process.argv[2] || 'http://127.0.0.1:5173';
const complementsSeuls = process.argv.includes('--complements');
const sortie = path.resolve(process.env.MOTS_SORTIE || '.tmp/situer/parcours'); fs.mkdirSync(sortie, { recursive: true });
(async () => {
  const b = await chromium.launch(); const erreurs = []; let controles = 0; let etapes = 0;
  const verifier = (ok, texte) => { controles++; if (!ok) { erreurs.push(texte); console.error('ECHEC :', texte); } };
  const contexte = await b.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const p = await contexte.newPage(); p.on('pageerror', (e) => erreurs.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error' && !/WebGL|favicon/.test(m.text())) erreurs.push(m.text()); });
  const aller = async (id) => { await p.goto(`${base}/#/module/0/${id}`); await p.locator('.temps button[data-temps="0"]').click(); await p.locator('[data-testid=mot-exemple]').waitFor(); };
  const exemple = () => p.locator('[data-testid=mot-exemple]');
  const fin = () => p.waitForFunction(() => document.querySelector('[data-testid=mot-exemple]')?.dataset.progression === '1.000');
  const capture = (nom, locator = p.locator('.mots-animes')) => locator.screenshot({ path: path.join(sortie, `${nom}.jpg`), type: 'jpeg', quality: 87, style: '.entete{visibility:hidden!important}' });
  for (const [format, largeur] of [['bureau', 1440], ['mobile', 390]]) {
    await p.setViewportSize({ width: largeur, height: 1000 });
    for (const n of NOTIONS) {
      await aller(n.id);
      verifier(await p.locator('[data-testid=bloc-notion] .etiquette-base').count() === n.nombreBases && n.nombreBases > 0, `${format}/${n.id} : prérequis disponibles dès le bloc 0`);
      const parcours = await p.getByTestId('parcours-prerequis').textContent();
      verifier(n.mots.slice(0, n.nombreBases).every(([nom]) => parcours.includes(nom)), `${format}/${n.id} : parcours initial explicite et complet`);
      verifier(await p.locator('[data-testid=choisir-mot]').count() === n.mots.length, `${format}/${n.id} : un bouton par mot`);
      let motsParcourus = 0;
      for (const [i, [nom]] of n.mots.entries()) {
        if (complementsSeuls && !MOTS_ANIMES[n.id][i].ajoutPrerequis) continue;
        motsParcourus++;
        await p.locator('[data-testid=choisir-mot]').nth(i).click();
        verifier(await exemple().getAttribute('data-etape') === '0', `${format}/${n.id}/${nom} : départ à la première étape`);
        verifier(await p.locator('[data-testid=mot-precedent]').isDisabled(), `${format}/${n.id}/${nom} : précédent inactif au début`);
        for (let k = 0; k < MOTS_ANIMES[n.id][i].etapes.length; k++) {
          if (k) await p.locator('[data-testid=mot-suivant]').click();
          await fin(); etapes++;
          const e = MOTS_ANIMES[n.id][i].etapes[k];
          verifier(await exemple().getAttribute('data-etape') === String(k), `${format}/${n.id}/${nom} : étape ${k + 1}`);
          verifier((await p.locator('.mot-commentaire').textContent()).includes(e.explication), `${format}/${n.id}/${nom}/${k} : explication présente`);
          verifier((await p.locator('.mot-bilan').textContent()).includes(e.dessin.bilan), `${format}/${n.id}/${nom}/${k} : conclusion présente`);
          verifier(await p.locator('[data-testid=mot-dessin] [data-objet]').count() >= 3, `${format}/${n.id}/${nom}/${k} : scène présente`);
          verifier(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${format}/${n.id}/${nom}/${k} : pas de débordement horizontal`);
          verifier(await exemple().getAttribute('data-lecture') === 'false', `${format}/${n.id}/${nom}/${k} : arrêt entre les étapes`);
        }
        verifier(await p.locator('[data-testid=mot-suivant]').isDisabled(), `${format}/${n.id}/${nom} : arrêt à la dernière étape`);
        const parcours = p.locator('[data-testid=choisir-mot]').nth(i).locator('[aria-label="Exemple parcouru"]');
        await parcours.waitFor();
        verifier(await parcours.isVisible(), `${format}/${n.id}/${nom} : exemple signalé comme parcouru`);
        await p.locator('[data-testid=mot-precedent]').click();
        verifier(await exemple().getAttribute('data-etape') === String(MOTS_ANIMES[n.id][i].etapes.length - 2), `${format}/${n.id}/${nom} : retour à l’étape précédente`);
      }
      console.log(`ok : ${format}/${n.id} : ${motsParcourus} mots et toutes leurs étapes parcourus`);
      if (['bayes', 'gradient', 'lidar', 'confiance', 'recommandation', 'gouvernance'].includes(n.id)) await capture(`${format}-${n.id}`);
    }
  }
  // Un groupe constant, les quatre issues possibles, puis les différents dénominateurs.
  await aller('bayes');
  const choisir = async (nom) => { await p.locator('[data-testid=choisir-mot]').filter({hasText: nom}).click(); await fin(); };
  const population = async () => p.locator('[data-testid=mot-dessin]').evaluate((svg) => {
    const inclus = (r, cadre) => { const x = r.cx.baseVal.value; const y = r.cy.baseVal.value; return x > cadre.x.baseVal.value && x < cadre.x.baseVal.value + cadre.width.baseVal.value && y > cadre.y.baseVal.value && y < cadre.y.baseVal.value + cadre.height.baseVal.value; };
    const robots = [...svg.querySelectorAll('[data-objet^="robot-"] circle')];
    const comptes = Object.fromEntries(['VP','FN','FP','VN'].map(id=>[id,robots.filter(r=>inclus(r,svg.querySelector(`[data-objet="case-${id}"] rect`))).length]));
    const cadre = svg.querySelector('[data-objet="groupe-compte"] rect');
    return { comptes, ids:robots.map(r=>r.parentElement.dataset.objet).sort(), selection:cadre ? robots.filter(r=>inclus(r,cadre)).length : null };
  });
  for (const largeur of [1440,390]) {
    await p.setViewportSize({width:largeur,height:1000}); await choisir('Matrice de confusion');
    const attendu = [[0,0,0,0],[1,0,0,0],[1,1,0,0],[1,1,1,0],[1,1,1,1],[4,1,3,12]];
    for (let k=0;k<6;k++) {
      await p.locator('.mot-etapes button').nth(k).click(); await fin(); const etat = await population();
      verifier(etat.ids.length === 20 && new Set(etat.ids).size === 20, `Bayes/${largeur}/${k} : vingt robots uniques conservés`);
      verifier(JSON.stringify(Object.values(etat.comptes)) === JSON.stringify(attendu[k]), `Bayes/${largeur}/${k} : robots dans les bonnes cases`);
    }
    await capture(`matrice-complete-${largeur}`, p.locator('.mot-panneau'));
    for (const [nom,denom,num,formule] of [['Prévalence',20,5,'5 / 20 = 25 %'],['Sensibilité',5,4,'4 / 5 = 80 %'],['Fausse alerte',15,3,'3 / 15 = 20 %'],['Probabilité sachant une alerte',7,4,'4 / 7 ≈ 57 %']]) {
      await choisir(nom); let etat=await population();
      verifier(etat.selection===denom, `${nom}/${largeur} : cadre du dénominateur (${denom})`);
      await p.locator('.mot-etapes button').nth(2).click(); await fin(); etat=await population();
      verifier(etat.selection===num, `${nom}/${largeur} : cadre du numérateur (${num})`);
      verifier(etat.ids.length===20 && JSON.stringify(Object.values(etat.comptes))==='[4,1,3,12]', `${nom}/${largeur} : population identique à la matrice`);
      const calcul = await p.locator('[data-objet="legende-calcul"] tspan').allTextContents();
      verifier(calcul.join(' ').includes(formule), `${nom}/${largeur} : calcul visible correct`);
    }
  }
  // Mouvement réel, arrêt volontaire puis reprise, sur chaque famille de dessin.
  await p.emulateMedia({ reducedMotion: 'no-preference' }); await p.setViewportSize({ width: 1440, height: 1000 });
  for (const [id, nom, cible, objet] of [
    ['regles', 'Règle', 1, 'objet'], ['regles', 'Seuil', 1, 'barre0'], ['bayes', 'Proportion et pourcentage', 2, 'jeton5'], ['bayes', 'Matrice de confusion', 1, 'robot-1'],
    ['reactif', 'Minimum local', 1, 'robot'], ['gradient', 'Gradient', 1, 'position'], ['recuit', 'Minimum local', 2, 'position'], ['recommandation', 'Filtrage collaboratif', 1, 'lecture'], ['lidar', 'Lidar', 1, 'lumiere'],
    ['evaluation', 'Réalité et décision : les quatre cases', 1, 'lecture'],
    ['supervise', 'Apprentissage, validation et test', 1, 'lecture'],
  ]) {
    const mot = NOTIONS.find(n => n.id === id).mots.findIndex(([libelle]) => libelle === nom);
    if (mot < 0) throw new Error(`${id} : animation ${nom} introuvable`);
    await aller(id); await p.locator('[data-testid=choisir-mot]').nth(mot).click();
    if (cible === 2) { await p.locator('.mot-etapes button').nth(1).click(); await fin(); }
    const geometrie = () => p.locator(`[data-testid=mot-dessin] [data-objet="${objet}"]`).evaluate((e) => { const b = e.getBBox(); return [b.x, b.y, b.width, b.height]; });
    const avant = await geometrie();
    await p.locator('[data-testid=mot-suivant]').click();
    await p.waitForFunction(() => { const e = document.querySelector('[data-testid=mot-exemple]'); return Number(e.dataset.progression) > .15 && Number(e.dataset.progression) < .9; });
    await p.locator('[data-testid=mot-lecture]').click();
    const milieu = await geometrie(); const position = await exemple().getAttribute('data-progression');
    verifier(avant.some((v, i) => Math.abs(v - milieu[i]) > .1), `${id}/${mot} : un objet du dessin se déplace ou change de taille`);
    if (id === 'recuit') verifier(await p.locator('[data-testid=mot-dessin]').evaluate((svg) => {
      const point = svg.querySelector('[data-objet="position"] circle');
      const x = point.cx.baseVal.value; const y = point.cy.baseVal.value;
      return [...svg.querySelectorAll('[data-objet^="pente"] line')].some((ligne) => {
        const x1 = ligne.x1.baseVal.value; const x2 = ligne.x2.baseVal.value;
        const y1 = ligne.y1.baseVal.value; const y2 = ligne.y2.baseVal.value;
        return x >= x1 && x <= x2 && Math.abs(y - (y1 + (y2 - y1) * (x - x1) / (x2 - x1))) < .1;
      });
    }), 'minimum local : le point suit le relief pendant le mouvement');
    await p.waitForTimeout(200);
    verifier(await exemple().getAttribute('data-progression') === position, `${id}/${mot} : pause stable`);
    if (id === 'recuit') await capture('minimum-local-pendant-la-remontee', p.locator('.mot-panneau'));
    await p.locator('[data-testid=mot-lecture]').click(); await fin();
    verifier(await exemple().getAttribute('data-lecture') === 'false', `${id}/${mot} : reprise puis arrêt automatique`);
    await capture(`mouvement-${id}-${mot}`, p.locator('.mot-panneau'));
  }
  // Changement de mot et de route : pas de progression ni de minuterie héritée.
  await aller('bayes'); await p.locator('[data-testid=mot-suivant]').click();
  await p.locator('[data-testid=choisir-mot]').nth(1).click();
  verifier(await exemple().getAttribute('data-etape') === '0' && await exemple().getAttribute('data-lecture') === 'false', 'changer de mot arrête et réinitialise le lecteur');
  await aller('regles'); verifier(await exemple().getAttribute('data-etape') === '0', 'changer de leçon réinitialise le lecteur');
  // La préférence de mouvement prend effet pendant une lecture en cours.
  await p.locator('[data-testid=mot-suivant]').click(); await p.emulateMedia({ reducedMotion: 'reduce' }); await fin();
  verifier(await exemple().getAttribute('data-lecture') === 'false', 'réduction de mouvement appliquée immédiatement');
  // Navigation au clavier et lien vers le mot suivant.
  await p.locator('[data-testid=choisir-mot]').nth(0).focus(); await p.keyboard.press('Enter');
  await p.locator('.mot-etapes button').nth(2).focus(); await p.keyboard.press('Enter'); await fin();
  await p.locator('.mot-prochain').click();
  verifier(await p.locator('[data-testid=choisir-mot]').nth(1).evaluate((e) => document.activeElement === e), 'le mot suivant reçoit le focus au clavier');
  verifier(await exemple().getAttribute('data-etape') === '0', 'le mot suivant commence à la première étape');
  await p.getByLabel('Tout afficher (mode formateur)').check();
  verifier(await p.locator('[data-testid=mot-exemple]').count() === 1 && await p.locator('.demo-scene').count() === 1, 'mode formateur : exemple de vocabulaire et démonstration de leçon coexistent');
  await p.getByLabel('Tout afficher (mode formateur)').uncheck();
  await aller('bayes'); await p.setViewportSize({ width: 360, height: 800 }); await p.emulateMedia({ colorScheme: 'dark' });
  await p.locator('.mot-etapes button').nth(2).click(); await fin(); await capture('mobile-sombre-bayes');
  verifier(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), '360 px et mode sombre : aucune largeur excessive');
  await contexte.close(); await b.close();
  fs.writeFileSync(path.join(sortie, 'resultat.json'), JSON.stringify({ controles, etapes, termes: NOTIONS.reduce((s,n)=>s+n.mots.length,0), erreurs }, null, 2));
  console.log(`${controles} contrôles, ${etapes} étapes visitées, ${erreurs.length} erreur(s).`);
  if (erreurs.length) process.exitCode = 1;
})().catch((e) => { console.error(e); process.exitCode = 1; });
