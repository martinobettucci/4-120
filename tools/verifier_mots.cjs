// Vérifie les prérequis et le vocabulaire du bloc 0, puis leurs dessins aux deux tailles.
// NODE_PATH=<playwright> node tools/verifier_mots.cjs [--planches]
// MOTS_SORTIE permet de conserver les preuves hors des fichiers versionnés.
const fs = require('node:fs'); const path = require('node:path');
const { NOTIONS, MOTS_ANIMES, SceneMot, createElement, renderToStaticMarkup } = require('./mots_communs.cjs')();
const sortie = path.resolve(process.env.MOTS_SORTIE || '.tmp/situer/verification'); fs.mkdirSync(sortie, { recursive: true });
const problemes = []; const verifier = (ok, message) => { if (!ok) problemes.push(message); };
const normaliser = (s) => s.replace(/[’‘]/g, "'");
const catalogue = [];
for (const n of NOTIONS) {
  const exemples = MOTS_ANIMES[n.id] || [];
  verifier(n.nombreBases >= 2, `${n.id} : parcours de prérequis incomplet`);
  verifier(exemples.length === n.mots.length, `${n.id} : ${exemples.length} exemples pour ${n.mots.length} mots`);
  n.mots.forEach(([nom], i) => {
    const e = exemples[i]; if (!e) return;
    verifier(normaliser(e.nom) === normaliser(nom), `${n.id} : mot différent (${e.nom} / ${nom})`);
    verifier(e.etapes.length >= 3, `${n.id}/${nom} : moins de trois étapes`);
    let evolution = false;
    for (const [k, p] of e.etapes.entries()) {
      const prefixe = `${n.id}/${nom}/${k + 1}`;
      verifier(p.titre.trim().length >= 3 && p.explication.trim().length >= 25 && p.dessin.bilan.trim().length >= 8, `${prefixe} : explication incomplète`);
      verifier(!/[\u2014\u2013]|viol|\$\$|\\frac/i.test(JSON.stringify(p)), `${prefixe} : formulation interdite`);
      for (const format of ['large', 'petit']) {
        const objets = p.dessin[format];
        verifier(objets.length >= 3, `${prefixe}/${format} : dessin absent`);
        verifier(new Set(objets.map((o) => o.id)).size === objets.length, `${prefixe}/${format} : identifiant en double`);
        for (const o of objets) {
          verifier(['carte', 'texte', 'trait', 'rond', 'barre', 'courbe'].includes(o.type), `${prefixe} : type inconnu ${o.type}`);
          for (const cle of ['x', 'y', 'x2', 'y2', 'w', 'h', 'r']) if (cle in o) verifier(Number.isFinite(o[cle]), `${prefixe}/${o.id} : ${cle} non fini`);
          if (o.type === 'carte') verifier(o.w > 0 && o.h > 0, `${prefixe}/${o.id} : dimensions invalides`);
        }
      }
      if (k) {
        const avant = e.etapes[k - 1].dessin.large;
        evolution ||= p.dessin.large.some((o) => { const a = avant.find((x) => x.id === o.id); return !a || ['x', 'y', 'w', 'h', 'r'].some((cle) => a[cle] !== o[cle]); });
      }
    }
    verifier(evolution, `${n.id}/${nom} : aucune simulation visuelle qui évolue`);
    catalogue.push({ id: `${n.id}-${i}`, lecon: n.id, nom, exemple: e, base: i < n.nombreBases });
  });
}
for (const id of Object.keys(MOTS_ANIMES)) verifier(NOTIONS.some((n) => n.id === id), `Exemples sans leçon : ${id}`);
const texte = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const blocs = catalogue.flatMap((c) => [false, true].map((compact) => `<section class="concept ${c.base ? 'base' : ''} ${c.exemple.ajoutPrerequis ? 'complement' : ''} ${compact ? 'compact' : 'large'}" id="${c.id}-${compact ? 'mobile' : 'bureau'}"><h2>${texte(c.lecon)} · ${texte(c.nom)}</h2><div class="etapes">${c.exemple.etapes.map((p, k) => `<article data-scene="${c.id}/${k}/${compact}">${renderToStaticMarkup(createElement(SceneMot, { avant: p.dessin, apres: p.dessin, compact, titre: `${c.nom}. ${p.titre}` }), { identifierPrefix: `${c.id}-${k}-${compact}-` })}<h3>${k + 1}. ${texte(p.titre)}</h3><p>${texte(p.explication)}</p><p class="bilan">${texte(p.dessin.bilan)}</p></article>`).join('')}</div></section>`));
fs.writeFileSync(path.join(sortie, 'planches.html'), `<!doctype html><meta charset="utf-8"><style>body{font-family:system-ui;margin:0;color:#17253c;background:white}.concept{width:1536px;padding:12px;box-sizing:border-box;border-bottom:4px solid #23468c}.concept.compact{width:1068px}h2{font-size:22px;margin:0 0 10px}h3{font-size:17px;margin:10px 0 4px}p{font-size:16px;line-height:1.45;margin:4px 0}.etapes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}article{border:1px solid #dce2ed;padding:8px;background:#fafbfe}svg{width:100%;display:block}.bilan{background:#fff5ca;padding:8px;font-weight:600}</style>${blocs.join('')}`);
(async () => {
  const { chromium } = require('playwright'); const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1540, height: 1000 } });
  await p.goto(`file://${path.join(sortie, 'planches.html')}`);
  verifier(await p.locator('[id]').evaluateAll((es) => new Set(es.map((e) => e.id)).size === es.length), 'Identifiants SVG en double dans les planches');
  // Mesure de tous les éléments SVG rendus : pas de texte coupé ni dépassant sa carte.
  const geometrie = await p.locator('article').evaluateAll((articles) => articles.flatMap((a) => {
    const erreurs = []; const svg = a.querySelector('svg'); const cadre = svg.viewBox.baseVal;
    for (const g of svg.querySelectorAll('g[data-objet]')) {
      const box = g.getBBox(); const id = `${a.dataset.scene}/${g.dataset.objet}`;
      if (box.x < -1 || box.y < -1 || box.x + box.width > cadre.width + 1 || box.y + box.height > cadre.height + 1) erreurs.push(`${id} : hors du dessin (${JSON.stringify({x:box.x,y:box.y,w:box.width,h:box.height})})`);
      const r = g.querySelector('rect'); const t = g.querySelector('text');
      if (r && t) { const rb = r.getBBox(); const tb = t.getBBox(); if (tb.x < rb.x + 3 || tb.y < rb.y + 1 || tb.x + tb.width > rb.x + rb.width - 3 || tb.y + tb.height > rb.y + rb.height - 1) erreurs.push(`${id} : texte hors de la carte`); }
    }
    const textes = [...svg.querySelectorAll('text')].filter((t) => t.textContent.trim());
    for (let i = 0; i < textes.length; i++) for (let j = i + 1; j < textes.length; j++) {
      const a0 = textes[i].getBBox(); const b0 = textes[j].getBBox();
      if (Math.min(a0.x + a0.width, b0.x + b0.width) - Math.max(a0.x, b0.x) > 1 && Math.min(a0.y + a0.height, b0.y + b0.height) - Math.max(a0.y, b0.y) > 1) erreurs.push(`${a.dataset.scene} : deux textes se chevauchent (${textes[i].textContent} / ${textes[j].textContent})`);
    }
    return erreurs;
  }));
  problemes.push(...geometrie);
  if (process.argv.includes('--planches')) {
    // Trois concepts par planche, chaque étape avec son explication lisible.
    for (const format of ['large', 'compact']) {
      const classes = await p.locator(`.concept.${format}${process.argv.includes('--complements') ? '.complement' : process.argv.includes('--bases') ? '.base' : ''}`).evaluateAll((es) => es.map((e) => e.id));
      await p.locator(`.concept:not(.${format})`).evaluateAll((es) => es.forEach((e) => e.style.display = 'none'));
      for (let i = 0; i < classes.length; i += 3) {
        const choisis = classes.slice(i, i + 3);
        await p.locator('.concept').evaluateAll((es, ids) => es.forEach((e) => e.style.display = ids.includes(e.id) ? 'block' : 'none'), choisis);
        await p.screenshot({ path: path.join(sortie, `${format}-${String(i / 3 + 1).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 87, fullPage: true, clip: { x: 0, y: 0, width: format === 'large' ? 1536 : 1068, height: await p.locator('body').evaluate((e) => e.getBoundingClientRect().height) } });
      }
      await p.locator('.concept').evaluateAll((es) => es.forEach((e) => e.style.display = 'block'));
    }
  }
  await b.close();
  const etapes = catalogue.reduce((s,c)=>s+c.exemple.etapes.length,0);
  fs.writeFileSync(path.join(sortie, 'controle.json'), JSON.stringify({ lecons: NOTIONS.length, bases: catalogue.filter(c=>c.base).length, termes: catalogue.length, etapes, rendus: etapes * 2, problemes }, null, 2));
  console.log(`${NOTIONS.length} leçons, ${catalogue.length} termes, ${etapes * 2} dessins contrôlés (ordinateur et mobile).`);
  if (problemes.length) { console.error(problemes.join('\n')); process.exitCode = 1; } else console.log('Tous les mots sont couverts ; aucun débordement de texte.');
})().catch((e) => { console.error(e); process.exitCode = 1; });
