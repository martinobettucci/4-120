const fs = require('node:fs'); const path = require('node:path'); const os = require('node:os');
module.exports = () => {
  const racine = path.resolve(__dirname, '..'); const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mots-'));
  const code = `export { NOTIONS } from ${JSON.stringify(path.join(racine, 'web/src/lecons/notions.js'))};
export { MOTS_ANIMES } from ${JSON.stringify(path.join(racine, 'web/src/lecons/mots/index.js'))};
export { default as SceneMot } from ${JSON.stringify(path.join(racine, 'web/src/animations/SceneMot.jsx'))};
export { createElement } from 'react'; export { renderToStaticMarkup } from 'react-dom/server';`;
  const sortie = path.join(tmp, 'contenu.cjs');
  require(path.join(racine, 'web/node_modules/esbuild')).buildSync({ stdin: { contents: code, resolveDir: racine }, bundle: true, format: 'cjs', platform: 'node', outfile: sortie, jsx: 'automatic', logLevel: 'error', nodePaths: [path.join(racine, 'web/node_modules')] });
  const resultat = require(sortie); fs.rmSync(tmp, { recursive: true, force: true }); return resultat;
};
