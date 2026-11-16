// Vérification complète du contenu pédagogique : TOUTES les leçons et TOUS les modules.
// 1. Structure : champs, étapes, cours, exemple résolu, atelier (de conception, avec sa solution), animation exécutable.
// 2. Questions : la bonne réponse est bien celle dont le retour l'approuve, aucune autre.
// 3. Explications : chaque atelier affiche, une fois validé, la raison de chaque ligne de sa solution.
// 4. Planches : pour chaque leçon, l'image de chaque étape à côté de son commentaire
//    (docs/captures/planches), à relire d'un coup d'œil avant toute publication.
// 5. Liens : avec --liens, l'existence de chaque page Wikipédia citée est contrôlée en ligne (hors intégration continue).
// Usage : node tools/verifier_contenu.cjs [--planches] [--liens]   (après « npm ci » dans web/)
const path = require('node:path'); const fs = require('node:fs'); const os = require('node:os');
const racine = path.resolve(__dirname, '..'); const web = path.join(racine, 'web');
const esbuild = require(path.join(web, 'node_modules', 'esbuild'));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'verif-'));
const entree = path.join(tmp, 'entree.jsx');
fs.writeFileSync(entree, `export { NOTIONS } from ${JSON.stringify(path.join(web, 'src/lecons/notions.js'))};\nexport { PEDAGOGIE } from ${JSON.stringify(path.join(web, 'src/lecons/modules-pedagogie.js'))};\nexport { ATELIERS } from ${JSON.stringify(path.join(web, 'src/ateliers/index.js'))};\nexport { EXPLICATIONS } from ${JSON.stringify(path.join(web, 'src/ateliers/explications.js'))};\nexport { renderToStaticMarkup } from 'react-dom/server';\n`);
esbuild.buildSync({ entryPoints: [entree], bundle: true, format: 'cjs', platform: 'node', outfile: path.join(tmp, 'contenu.cjs'), jsx: 'automatic', logLevel: 'error', nodePaths: [path.join(web, 'node_modules')] });
const { NOTIONS, PEDAGOGIE, ATELIERS, EXPLICATIONS, renderToStaticMarkup } = require(path.join(tmp, 'contenu.cjs'));

const pb = []; const dire = (id, m) => pb.push(`${id} : ${m}`);
const qcm = (id, nom, q) => {
  if (!(q.ok >= 0 && q.ok < q.choix.length)) dire(id, `${nom} : bonne réponse hors limites`);
  q.choix.forEach(([t, r], i) => {
    const exact = /^Exact/.test(r);
    if (i === q.ok && !exact) dire(id, `${nom} : le retour de la bonne réponse « ${t} » ne l'approuve pas`);
    if (i !== q.ok && exact) dire(id, `${nom} : « ${t} » est comptée fausse mais son retour dit Exact`);
    if (!r || r.length < 20) dire(id, `${nom} : retour trop court pour « ${t} »`);
  });
  if (new Set(q.choix.map((c) => c[0])).size !== q.choix.length) dire(id, `${nom} : choix en double`);
};
const interdits = /[\u2014\u2013]|viol|\$\$|\\frac/i;
for (const n of NOTIONS) {
  for (const c of ['id', 'module', 'nom', 'anim', 'duree', 'accroche', 'objectif', 'mots', 'prediction', 'etapes', 'exemple', 'piege', 'exercice', 'transfert', 'retenir', 'ailleurs', 'theorie', 'atelier', 'definition']) if (n[c] === undefined || n[c] === null) dire(n.id, `champ manquant : ${c}`);
  let prec = 0;
  n.etapes.forEach((e, i) => { if (!(e.fin > prec && e.fin <= 1)) dire(n.id, `étape ${i + 1} : position d'arrêt ${e.fin} non croissante`); prec = e.fin; for (const c of ['titre', 'texte', 'regard']) if (!e[c]) dire(n.id, `étape ${i + 1} : ${c} manquant`); });
  if (n.etapes.length < 2) dire(n.id, 'moins de deux étapes de démonstration');
  if (!(n.prediction.ok >= 0 && n.prediction.ok < n.prediction.choix.length)) dire(n.id, 'prédiction : réponse hors limites');
  qcm(n.id, 'application', n.exercice); qcm(n.id, 'transfert', n.transfert);
  if (!n.exercice.indice) dire(n.id, 'application : indice manquant');
  if (n.theorie.length < 3) dire(n.id, 'cours : moins de trois blocs');
  if (!n.theorie.some(([, l]) => l.some((x) => x.startsWith('= ') || x.startsWith('> ')))) dire(n.id, 'cours : ni formule ni algorithme');
  if (n.exemple.pas.length < 3) dire(n.id, 'exemple résolu : moins de trois pas');
  if (n.mots.length < 3) dire(n.id, 'moins de trois mots définis');
  // Bloc 0 : la notion en bref, deux paragraphes au moins et un lien Wikipédia au moins, en français ou en anglais.
  const d = n.definition || { texte: [], liens: [] };
  if (d.texte.length < 2 || d.texte.some((t) => t.length < 120)) dire(n.id, 'notion en bref : moins de deux paragraphes, ou paragraphe trop court');
  if (!d.liens.length) dire(n.id, 'notion en bref : aucun lien pour en savoir plus');
  d.liens.forEach((l) => { if (!/^https:\/\/(fr|en)\.wikipedia\.org\/wiki\/\S+$/.test(l.url) || !l.titre || !l.url.startsWith(`https://${l.langue}.`)) dire(n.id, `notion en bref : lien mal formé (${l.titre})`); });
  const a = n.atelier;
  if (!a.titre || !a.mission) dire(n.id, 'atelier : titre ou mission manquant');
  // Un atelier fait concevoir : ni calcul à recopier, ni rangement dans des rubriques, ni lignes à remettre en ordre.
  if (a.type === 'formulaire' || a.type === 'parsons') dire(n.id, `atelier de restitution proscrit (${a.type}) : l'apprenant doit concevoir, le système exécuter`);
  if (typeof ATELIERS[a.type] !== 'function') dire(n.id, `atelier : aucun composant pour le type « ${a.type} »`);
  for (const t of [0, 0.25, 0.5, 0.75, 0.9999, ...n.etapes.map((e) => Math.min(e.fin, 0.9999))]) { try { renderToStaticMarkup(n.anim(t)); } catch (e) { dire(n.id, `animation en erreur à t = ${t} : ${e.message}`); } }
  if (interdits.test(JSON.stringify(n, (k, v) => (typeof v === 'function' ? undefined : v)))) dire(n.id, 'caractère ou mot proscrit');
}
const ids = new Set(NOTIONS.map((n) => n.id));
for (const [m, p] of Object.entries(PEDAGOGIE)) {
  p.prerequis.forEach((i) => { if (!ids.has(i)) dire(`module ${m}`, `prérequis inconnu : ${i}`); });
  (p.suite || []).forEach((i) => { if (!ids.has(i)) dire(`module ${m}`, `prolongement inconnu : ${i}`); });
  p.quiz.forEach((q, k) => qcm(`module ${m}`, `quiz ${k + 1}`, q));
  if (p.objectifs.length < 4) dire(`module ${m}`, 'moins de quatre objectifs');
  if (interdits.test(JSON.stringify(p))) dire(`module ${m}`, 'caractère ou mot proscrit');
}
// Chaque type d'atelier sert une seule leçon, et chaque fichier d'ateliers respecte les règles de rédaction et propose la solution.
const parType = {}; NOTIONS.forEach((n) => { (parType[n.atelier.type] = parType[n.atelier.type] || []).push(n.id); });
Object.entries(parType).forEach(([t, l]) => { if (l.length > 1) dire(l.join(', '), `même atelier (${t}) pour plusieurs leçons`); });
for (const f of fs.readdirSync(path.join(web, 'src/ateliers')).filter((x) => /^Ateliers.*\.jsx$/.test(x))) {
  const source = fs.readFileSync(path.join(web, 'src/ateliers', f), 'utf8');
  if (interdits.test(source)) dire(f, 'caractère ou mot proscrit');
  if (/Math\.random/.test(source)) dire(f, 'tirage non reproductible (Math.random)');
  const composants = (source.match(/^(?:export )?function \w+\(\{ (?:config, )?surReussite \}\)/gm) || []).length;
  const solutions = (source.match(/sol\.bouton\(/g) || []).length;
  if (composants !== solutions) dire(f, `${composants} atelier(s) pour ${solutions} bouton(s) « Voir la solution »`);
}
// Explications ligne par ligne : chaque atelier en a une, chaque ligne justifie son choix,
// et le bilan de l'atelier les affiche (attribut solution="<type>").
const conception = NOTIONS;
const idExplication = (n) => n.atelier.type.replace(/^conception_/, '');
conception.forEach((n) => {
  const e = EXPLICATIONS[idExplication(n)];
  if (!e) { dire(n.id, `explications : aucune entrée pour « ${n.atelier.type} »`); return; }
  if (!e.intro || e.intro.length < 60) dire(n.id, 'explications : introduction absente ou trop courte');
  if (!Array.isArray(e.lignes) || e.lignes.length < 2) dire(n.id, 'explications : moins de deux lignes');
  (e.lignes || []).forEach((l, i) => {
    if (!l.choix || l.choix.length < 4) dire(n.id, `explications ligne ${i + 1} : intitulé du choix absent ou trop court`);
    if (!l.pourquoi || l.pourquoi.length < 80) dire(n.id, `explications ligne ${i + 1} : raison absente ou trop courte`);
  });
  if (new Set((e.lignes || []).map((l) => l.choix)).size !== (e.lignes || []).length) dire(n.id, 'explications : deux lignes de même intitulé');
  if (interdits.test(JSON.stringify(e))) dire(n.id, 'explications : caractère ou mot proscrit');
});
const typesConception = new Set(conception.map(idExplication));
Object.keys(EXPLICATIONS).forEach((k) => { if (!typesConception.has(k)) dire('explications', `entrée sans atelier : ${k}`); });
const annonces = new Set();
for (const f of fs.readdirSync(path.join(web, 'src/ateliers')).filter((x) => /^Ateliers.*\.jsx$/.test(x))) {
  for (const m of fs.readFileSync(path.join(web, 'src/ateliers', f), 'utf8').matchAll(/solution="([^"]+)"/g)) annonces.add(m[1]);
}
conception.forEach((n) => { if (!annonces.has(idExplication(n))) dire(n.id, `explications : le bilan de l'atelier ne les affiche pas (solution="${idExplication(n)}")`); });
const cites = new Set(Object.values(PEDAGOGIE).flatMap((p) => p.prerequis));
NOTIONS.forEach((n) => { if (!cites.has(n.id)) dire(n.id, "leçon citée par aucun module"); });
const nbEtapes = NOTIONS.reduce((s, n) => s + n.etapes.length, 0);
console.log(`${NOTIONS.length} leçons, ${nbEtapes} étapes de démonstration, ${NOTIONS.length * 2 + Object.values(PEDAGOGIE).reduce((s, p) => s + p.quiz.length, 0)} questions, ${NOTIONS.length} ateliers, ${conception.length} explications ligne par ligne`);

if (process.argv.includes('--planches')) {
  const sortie = process.env.CONTENU_SORTIE ? path.resolve(process.env.CONTENU_SORTIE) : path.join(racine, 'docs', 'captures', 'planches'); fs.mkdirSync(sortie, { recursive: true });
  const css = ':root{--texte:#0d0d0d;--texte-doux:#556079;--carte:#fff;--bord:#dde1ea;--plan-sol:#e9ecf3;--plan-mur:#2a2f3d;--fond:#f5f6fa}body{font-family:system-ui,sans-serif;margin:0;background:#fff;color:#0d0d0d}.lecon{width:1760px;padding:8px 10px;border-bottom:3px solid #23468c;box-sizing:border-box}h2{font-size:17px;margin:0 0 4px}.rang{display:flex;gap:8px}.et{width:428px;flex:none}.et svg{width:428px;height:auto;border:1px solid #dde1ea;background:#f5f6fa;display:block}.et b{font-size:13px}.et p{font-size:12px;line-height:1.3;margin:2px 0}.r{background:#f3eeb5}';
  const html = `<meta charset="utf-8"><style>${css}</style>` + NOTIONS.map((n, i) => `<div class="lecon" id="${n.id}"><h2>${i + 1}. ${n.nom} (module ${n.module}) · prédiction attendue : « ${n.prediction.choix[n.prediction.ok]} »</h2><div class="rang">${n.etapes.map((e, k) => `<div class="et">${renderToStaticMarkup(n.anim(Math.min(e.fin, 0.9999)))}<b>${k + 1}. ${e.titre}</b><p>${e.texte}</p><p class="r">Regardez : ${e.regard}</p></div>`).join('')}</div></div>`).join('');
  const page = path.join(tmp, 'planches.html'); fs.writeFileSync(page, html);
  const { chromium } = require('playwright');
  (async () => {
    const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1760, height: 1000 } });
    await p.goto('file://' + page); const liste = await p.locator('.lecon').evaluateAll((e) => e.map((x) => x.id));
    for (let i = 0; i < liste.length; i += 3) {
      const h = await p.evaluate(([a, z]) => [document.getElementById(a).getBoundingClientRect().top + scrollY, document.getElementById(z).getBoundingClientRect().bottom + scrollY], [liste[i], liste[Math.min(i + 2, liste.length - 1)]]);
      await p.screenshot({ path: path.join(sortie, `lecons-${String(i + 1).padStart(2, '0')}-a-${String(Math.min(i + 3, liste.length)).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 72, fullPage: true, clip: { x: 0, y: h[0], width: 1760, height: h[1] - h[0] } });
    }
    await b.close(); console.log(`planches écrites dans ${path.relative(racine, sortie)}`); finir();
  })();
} else if (process.argv.includes('--liens')) {
  (async () => {
    const liens = [...new Map(NOTIONS.flatMap((n) => n.definition.liens.map((l) => [l.url, { ...l, lecon: n.id }]))).values()];
    for (const langue of ['fr', 'en']) {
      const lot = liens.filter((l) => l.langue === langue);
      for (let i = 0; i < lot.length; i += 20) {
        const titres = lot.slice(i, i + 20);
        const url = `https://${langue}.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=pageprops&titles=${encodeURIComponent(titres.map((l) => l.titre).join('|'))}`;
        const q = (await (await fetch(url, { headers: { 'User-Agent': 'ascent-4130-verification/1.0 (https://github.com/martinobettucci/4-120)' } })).json()).query;
        const vers = Object.fromEntries([...(q.normalized || []), ...(q.redirects || [])].map((r) => [r.from, r.to])); const pages = Object.values(q.pages);
        for (const l of titres) {
          let t = l.titre; for (let k = 0; k < 3 && vers[t]; k++) t = vers[t];
          const page = pages.find((x) => x.title === t);
          if (!page || page.missing !== undefined) dire(l.lecon, `page Wikipédia introuvable (${langue}) : ${l.titre}`);
          else if (page.pageprops && page.pageprops.disambiguation !== undefined) dire(l.lecon, `page d'homonymie (${langue}) : ${l.titre}`);
        }
      }
    }
    console.log(`${liens.length} pages Wikipédia contrôlées en ligne`); finir();
  })().catch((e) => { console.error('Contrôle des liens impossible :', e.message); process.exit(1); });
} else finir();
function finir() { if (pb.length) { console.error(pb.join('\n')); process.exit(1); } console.log('Contrôle du contenu : aucun défaut.'); }
