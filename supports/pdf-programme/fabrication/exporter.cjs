// Sources pédagogiques et figures du site, sans lancer l'application.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../../..');
const work = path.join(root, '.tmp/pdf-programme');
const out = path.join(root, 'supports/pdf-programme/sources');
const figures = path.join(root, 'supports/pdf-programme/assets/figures');
fs.mkdirSync(work, { recursive: true });
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(figures, { recursive: true });
const entry = path.join(work, 'sources.jsx');
fs.writeFileSync(entry, `
export { NOTIONS, BLOCS } from '${root}/web/src/lecons/notions.js';
export { MODULES } from '${root}/web/src/modules.js';
export { PEDAGOGIE } from '${root}/web/src/lecons/modules-pedagogie.js';
export { renderToStaticMarkup } from 'react-dom/server';
`);
require(path.join(root, 'web/node_modules/esbuild')).buildSync({
  entryPoints: [entry], bundle: true, format: 'cjs', platform: 'node',
  outfile: path.join(work, 'sources.cjs'), jsx: 'automatic', logLevel: 'error',
  define: { 'import.meta.env.VITE_DEPOT': '"martinobettucci/4-120"', 'import.meta.env.VITE_BRANCHE': '"main"' },
  nodePaths: [path.join(root, 'web/node_modules')],
});
const { NOTIONS, BLOCS, MODULES, PEDAGOGIE, renderToStaticMarkup } = require(path.join(work, 'sources.cjs'));
const colors = { texte: '#0d0d0d', 'texte-doux': '#556079', carte: '#ffffff', bord: '#dde1ea', 'plan-sol': '#e9ecf3', 'plan-mur': '#2a2f3d', fond: '#f5f6fa' };
for (const n of NOTIONS) {
  n.etapes.forEach((e, i) => {
    let svg = renderToStaticMarkup(n.anim(Math.min(e.fin, 0.9999)));
    svg = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" font-family="DejaVu Sans" ');
    svg = svg.replace(/var\(--([^)]*)\)/g, (_, k) => colors[k] || '#23468c');
    // CairoSVG ne comprend pas encore color-mix ; conserver la couleur exacte.
    svg = svg.replace(/color-mix\(in srgb,\s*(#[0-9a-f]{6})\s+([\d.]+)%,\s*(#[0-9a-f]{6})\)/gi, (_, a, p, b) => {
      const ratio = Number(p) / 100;
      return '#' + [1, 3, 5].map(i => Math.round(parseInt(a.slice(i, i + 2), 16) * ratio + parseInt(b.slice(i, i + 2), 16) * (1 - ratio)).toString(16).padStart(2, '0')).join('');
    });
    fs.writeFileSync(path.join(figures, `${n.id}-${i + 1}.svg`), svg);
  });
}
fs.writeFileSync(path.join(out, 'programme.json'), JSON.stringify({ notions: NOTIONS, blocs: BLOCS, modules: MODULES, pedagogie: PEDAGOGIE }, null, 2));
console.log(JSON.stringify({ notions: NOTIONS.length, modules: MODULES.length, figures: NOTIONS.reduce((s, n) => s + n.etapes.length, 0) }));
