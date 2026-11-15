// Ateliers de conception du module 1 (Bayes, réseau bayésien, coût espéré, apprentissage supervisé, recommandation).
// L'apprenant compose un dispositif, une structure, une politique, un jeu de données ou un réglage :
// le système l'exécute sur des données simulées et le confronte à un cahier des charges.
// La logique de chaque atelier est exportée à part, pour être étalonnée et testée sans navigateur.
import { useState } from 'react';
import { F, C, alea, Bilan } from './Ateliers.jsx';
import { useSolution } from './Solution.jsx';

const milliers = (x) => String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const euros = (x) => `${milliers(x)} €`;
const pct = (x, n = 1) => `${F(x * 100, n)} %`;
const pc = (x) => `${String(Math.round(x * 1000) / 10).replace('.', ',')} %`;
const verdict = (ok, texte) => <tr><td>{texte}</td><td className={ok ? 'ok' : 'ko'}>{ok ? 'respecté ✓' : 'non respecté ✗'}</td></tr>;

// --------------------------------------------------------------------- Bayes
// Un dispositif de contrôle : un détecteur, son réglage, puis une confirmation éventuelle des seuls colis signalés.
// 10 000 colis dont 2 % défectueux passent réellement dans le dispositif.
export const COLIS = { n: 10000, defauts: 200, fondees: 0.9, detectes: 0.85, budget: 600 };
export const DETECTEURS = {
  simple: ['Caméra simple', 0.02, { sensible: [0.98, 0.10], moyen: [0.95, 0.05], strict: [0.85, 0.02] }],
  hd: ['Caméra haute définition', 0.05, { sensible: [0.995, 0.03], moyen: [0.99, 0.01], strict: [0.93, 0.004] }],
  gabarit: ['Cellule de gabarit', 0.01, { sensible: [0.95, 0.20], moyen: [0.90, 0.10], strict: [0.75, 0.05] }],
};
export const REGLAGES = { sensible: 'sensible', moyen: 'intermédiaire', strict: 'strict' };
export const CONFIRMATIONS = {
  aucune: ['Aucune confirmation', 0], relecture: ['Second passage devant le même détecteur', 0],
  pesee: ['Pesée de contrôle', 0.4, 0.96, 0.03], ouverture: ["Ouverture du colis par un opérateur", 3, 1, 0],
};
const LOT_COLIS = (() => { const g = alea(4130); return Array.from({ length: COLIS.n }, (_, i) => ({ defaut: i < COLIS.defauts, u: [g(), g(), g(), g()] })); })();
export function evaluerBayes({ detecteur, reglage, confirmation }) {
  const [, prix, reglages] = DETECTEURS[detecteur]; const [sens, fa] = reglages[reglage]; const conf = CONFIRMATIONS[confirmation];
  let signales = 0; let signalesDefaut = 0; let alertes = 0; let fondees = 0;
  for (const c of LOT_COLIS) {
    const p = c.defaut ? sens : fa;
    if (c.u[0] >= p) continue;
    signales++; if (c.defaut) signalesDefaut++;
    // Second passage : neuf fois sur dix, la même cause produit le même signal. Pesée : tirage indépendant.
    const confirme = confirmation === 'aucune' || (confirmation === 'relecture' ? c.u[1] < 0.9 || c.u[2] < p : confirmation === 'pesee' ? c.u[3] < (c.defaut ? conf[2] : conf[3]) : c.defaut);
    if (confirme) { alertes++; if (c.defaut) fondees++; }
  }
  const cout = COLIS.n * prix + (confirmation === 'aucune' ? 0 : signales * (confirmation === 'relecture' ? prix : conf[1]));
  const part = alertes ? fondees / alertes : 0; const rappel = fondees / COLIS.defauts;
  const tests = { fondees: part >= COLIS.fondees, detectes: rappel >= COLIS.detectes, budget: cout <= COLIS.budget + 1e-6 };
  return { signales, signalesDefaut, alertes, fondees, part, rappel, cout, tests, ok: tests.fondees && tests.detectes && tests.budget };
}
export const SOLUTION_BAYES = { detecteur: 'simple', reglage: 'moyen', confirmation: 'pesee' };
export function AtelierBayes({ surReussite }) {
  const [d, setD] = useState({ detecteur: 'simple', reglage: 'moyen', confirmation: 'aucune' }); const [res, setRes] = useState(null);
  const sol = useSolution();
  const verifier = () => { const r = evaluerBayes(d); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const choix = (cle, nom, options) => (<li><b>{nom}</b><select value={d[cle]} onChange={(e) => { setD({ ...d, [cle]: e.target.value }); setRes(null); }} aria-label={nom}>{options.map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select></li>);
  const [nomDetecteur, prix, reglages] = DETECTEURS[d.detecteur]; const fausses = res ? res.signales - res.signalesDefaut : 0; const conformes = COLIS.n - COLIS.defauts;
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges du poste de contrôle.</b>
        <ul><li>Au moins 90 % des alertes transmises au quai sont fondées : en dessous, les opérateurs cessent de s'y fier.</li><li>Au moins 85 % des colis défectueux sont arrêtés.</li><li>Au plus 600 € pour contrôler les 10 000 colis de la journée.</li></ul>
      </div>
      <p>Sur 10 000 colis, 200 sont défectueux, soit 2 %. Le détecteur examine tous les colis. Une confirmation, si vous en ajoutez une, ne porte que sur les colis qu'il a signalés : seuls les colis confirmés donnent une alerte.</p>
      <table className="tableau compact donnees">
        <thead><tr><th>Détecteur</th><th>Coût par colis</th>{Object.values(REGLAGES).map((n) => <th key={n}>Réglage {n}</th>)}</tr></thead>
        <tbody>{Object.values(DETECTEURS).map(([nom, cout, regl]) => <tr key={nom}><th>{nom}</th><td>{F(cout, 2)} €</td>{Object.keys(REGLAGES).map((k) => <td key={k}>détecte {pc(regl[k][0])} des défauts, signale à tort {pc(regl[k][1])} des colis conformes</td>)}</tr>)}</tbody>
      </table>
      <table className="tableau compact donnees">
        <thead><tr><th>Confirmation</th><th>Mesuré lors des essais</th><th>Coût par colis signalé</th></tr></thead>
        <tbody>
          <tr><th>{CONFIRMATIONS.relecture[0]}</th><td>ce qui a déclenché le signal le déclenche de nouveau 9 fois sur 10, que le colis soit défectueux ou non</td><td>celui du détecteur</td></tr>
          <tr><th>{CONFIRMATIONS.pesee[0]}</th><td>ne dépend pas de ce que voit le détecteur : confirme {pc(CONFIRMATIONS.pesee[2])} des colis défectueux et {pc(CONFIRMATIONS.pesee[3])} des colis conformes</td><td>{F(CONFIRMATIONS.pesee[1], 2)} €</td></tr>
          <tr><th>{CONFIRMATIONS.ouverture[0]}</th><td>ne se trompe pas</td><td>{F(CONFIRMATIONS.ouverture[1], 2)} €</td></tr>
        </tbody>
      </table>
      <ol className="regles-edit">
        {choix('detecteur', 'Détecteur', Object.entries(DETECTEURS).map(([k, v]) => [k, v[0]]))}
        {choix('reglage', 'Réglage du détecteur', Object.entries(REGLAGES))}
        {choix('confirmation', 'Confirmation des colis signalés', Object.entries(CONFIRMATIONS).map(([k, v]) => [k, v[0]]))}
      </ol>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Faire passer les 10 000 colis</button>
        {sol.bouton(() => { setD(SOLUTION_BAYES); setRes(null); })}
      </div>
      {res && (
        <>
          <table className="tableau compact banc"><tbody>
            <tr><td>Colis signalés par le détecteur : {milliers(res.signales)}, dont {res.signalesDefaut} défectueux et {milliers(fausses)} conformes</td><td>mesuré</td></tr>
            {verdict(res.tests.fondees, `Alertes transmises : ${milliers(res.alertes)}, dont ${res.fondees} fondées, soit ${pct(res.part)} (minimum 90 %)`)}
            {verdict(res.tests.detectes, `Colis défectueux arrêtés : ${res.fondees} sur 200, soit ${pct(res.rappel)} (minimum 85 %)`)}
            {verdict(res.tests.budget, `Coût : ${euros(COLIS.n * prix)} de détection + ${euros(res.cout - COLIS.n * prix)} de confirmation = ${euros(res.cout)} (maximum 600 €)`)}
          </tbody></table>
          <Bilan ok={res.ok}>{res.ok ? `Les trois exigences sont tenues : ${res.alertes} alertes, dont ${res.fondees} fondées. Vous savez composer un contrôle dont les alertes sont exploitables. Quand le défaut est rare, un détecteur seul produit surtout des fausses alertes : c'est une confirmation indépendante, réservée aux colis signalés, qui rend l'alerte crédible.` : [
            !res.tests.fondees && d.confirmation === 'aucune' && `${d.detecteur === 'hd' ? 'Le meilleur détecteur ne suffit pas : il' : 'Le détecteur'} signale à tort ${pc(reglages[d.reglage][1])} des ${milliers(conformes)} colis conformes : cela fait ${milliers(fausses)} fausses alertes, face à ${res.signalesDefaut} vraies. Les défauts sont rares, les colis conformes très nombreux : aucun détecteur seul n'atteint 90 %. Que pourriez-vous faire des seuls colis signalés avant de donner l'alerte ?`,
            !res.tests.fondees && d.confirmation === 'relecture' && `Le second passage a confirmé ${milliers(res.alertes)} des ${milliers(res.signales)} colis signalés : ce qui a trompé le détecteur le trompe de nouveau. Quelle confirmation ne dépend pas de ce que voit le détecteur ?`,
            !res.tests.fondees && d.confirmation === 'pesee' && `La pesée écarte la plupart des fausses alertes, mais il lui en arrive trop : ${milliers(fausses)} colis conformes signalés pour ${res.signalesDefaut} défectueux. Quel détecteur, ou quel réglage, en envoie moins à la confirmation ?`,
            !res.tests.detectes && `Seuls ${res.fondees} des 200 colis défectueux sont arrêtés. Un colis défectueux que le détecteur ne signale pas n'est jamais rattrapé ensuite. À quelle étape de votre dispositif les perdez-vous ?`,
            !res.tests.budget && (d.confirmation === 'ouverture' ? `Ouvrir ${milliers(res.signales)} colis à 3 € coûte ${euros(res.signales * 3)} : la confirmation coûte d'autant plus cher que le détecteur signale à tort. Existe-t-il une confirmation moins coûteuse et assez fiable ?` : `Le budget est dépassé : le détecteur « ${nomDetecteur} » coûte déjà ${euros(COLIS.n * prix)}, et chaque colis signalé ajoute une confirmation. Un détecteur moins cher, ou qui signale moins, tiendrait-il les deux autres exigences ?`),
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

// -------------------------------------------------------------------- Réseau
// Structure d'un réseau bayésien sur cinq variables du robot. Chaque constat est testé sur le graphe construit :
// séparation dans le graphe pour les observations, descendance pour les essais sur site.
export const VARS_RESEAU = { H: ['Sol humide', 90, 36], B: ['Batterie faible', 430, 36], P: ['Patinage', 290, 70], D: ['Détecteur actif', 90, 180], R: ['Retard de livraison', 430, 180] };
export const PAIRES_RESEAU = ['HP', 'HD', 'PD', 'HR', 'PR', 'DR', 'BR', 'BP'];
export const MAX_TABLES = 12;
// Réseau qui a produit les mesures : il sert à calculer les fréquences affichées, jamais à comparer les flèches.
const VRAI = { H: [[], [0.2]], B: [[], [0.1]], P: [['H'], [0.05, 0.6]], D: [['H'], [0.1, 0.9]], R: [['P', 'B'], [0.05, 0.4, 0.5, 0.8]] };
const PARENTS_VRAIS = Object.fromEntries(Object.entries(VRAI).map(([v, [par]]) => [v, par]));
const ETATS = Array.from({ length: 32 }, (_, k) => { const e = {}; Object.keys(VARS_RESEAU).forEach((v, i) => { e[v] = (k >> i) & 1; }); return e; });
const probaJointe = (e) => Object.entries(VRAI).reduce((p, [v, [par, t]]) => { const q = t[par.reduce((i, x) => i * 2 + e[x], 0)]; return p * (e[v] ? q : 1 - q); }, 1);
export const frequence = (x, cond) => { let a = 0; let b = 0; for (const e of ETATS) { if (Object.entries(cond).every(([v, s]) => e[v] === s)) { const p = probaJointe(e); b += p; if (e[x]) a += p; } } return a / b; };
export const CONSTATS = [
  ['obs', 'P', 'D', [], 'Patinage et détecteur actif'], ['obs', 'P', 'D', ['H'], 'Patinage et détecteur actif, sur sol humide'],
  ['obs', 'R', 'H', [], 'Retard et sol humide'], ['obs', 'R', 'H', ['P'], 'Retard et sol humide, parmi les trajets avec patinage'],
  ['obs', 'R', 'D', ['H'], 'Retard et détecteur actif, sur sol humide'], ['obs', 'R', 'B', [], 'Retard et batterie faible'], ['obs', 'P', 'B', [], 'Patinage et batterie faible'],
  ['essai', 'H', 'P', [], "Essai sur site : on arrose le sol, puis on observe le patinage"], ['essai', 'D', 'H', [], "Essai sur site : on déclenche le détecteur à la main, puis on observe le sol"],
];
export const parentsDe = (liens) => { const par = Object.fromEntries(Object.keys(VARS_RESEAU).map((v) => [v, []])); PAIRES_RESEAU.forEach((p) => { if (liens[p] === '>') par[p[1]].push(p[0]); if (liens[p] === '<') par[p[0]].push(p[1]); }); return par; };
const ancetres = (par, depart) => { const vus = new Set(); const pile = [...depart]; while (pile.length) { const v = pile.pop(); if (!vus.has(v)) { vus.add(v); pile.push(...par[v]); } } return vus; };
// Séparation dans le graphe : on garde les ancêtres des variables en jeu, on marie les parents, on retire les variables connues.
export function separes(par, x, y, z) {
  const anc = ancetres(par, [x, y, ...z]); const lien = {}; anc.forEach((v) => { lien[v] = new Set(); });
  anc.forEach((v) => par[v].forEach((p) => { lien[v].add(p); lien[p].add(v); par[v].forEach((q) => { if (q !== p) lien[p].add(q); }); }));
  const vus = new Set([x]); const pile = [x];
  while (pile.length) { for (const w of lien[pile.pop()]) if (!vus.has(w) && !z.includes(w)) { vus.add(w); pile.push(w); } }
  return !vus.has(y);
}
export function evaluerReseau(liens) {
  const par = parentsDe(liens); const vars = Object.keys(VARS_RESEAU);
  const cycle = vars.some((v) => par[v].some((p) => ancetres(par, [p]).has(v)));
  const tables = vars.reduce((s, v) => s + 2 ** par[v].length, 0);
  const constats = CONSTATS.map(([genre, x, y, z, texte]) => {
    const cond = Object.fromEntries(z.map((v) => [v, 1]));
    const mesure = genre === 'obs' ? [frequence(x, { ...cond, [y]: 1 }), frequence(x, { ...cond, [y]: 0 })] : null;
    const attendu = genre === 'obs' ? Math.abs(mesure[0] - mesure[1]) > 1e-9 : ancetres(PARENTS_VRAIS, [y]).has(x);
    const predit = cycle ? null : genre === 'obs' ? !separes(par, x, y, z) : ancetres(par, [y]).has(x);
    return { genre, x, y, z, texte, mesure, attendu, predit, ok: predit === attendu };
  });
  const tests = { cycle: !cycle, tables: tables <= MAX_TABLES, constats: constats.every((c) => c.ok) };
  return { par, cycle, tables, constats, tests, direct: liens.PD !== '', ok: tests.cycle && tests.tables && tests.constats };
}
export const SOLUTION_RESEAU = { HP: '>', HD: '>', PD: '', HR: '', PR: '>', DR: '', BR: '>', BP: '' };
const nomVar = (v) => VARS_RESEAU[v][0];
const piste = (c) => {
  const paire = `« ${nomVar(c.x)} » et « ${nomVar(c.y)} »`;
  if (c.genre === 'essai') return c.attendu ? `sur site, forcer « ${nomVar(c.x)} » change « ${nomVar(c.y)} », mais dans votre réseau aucune suite de flèches ne mène de l'un à l'autre. Dans quel sens va la cause ?` : `sur site, forcer « ${nomVar(c.x)} » ne change rien à « ${nomVar(c.y)} », mais votre réseau y mène par ses flèches. Une flèche va de la cause vers l'effet, pas de l'indice vers ce qu'il révèle : laquelle est à retourner ?`;
  if (c.attendu) return `les mesures montrent un lien entre ${paire}, que votre réseau ne peut pas produire : aucun chemin ne fait circuler l'information de l'un à l'autre. Par quelle cause, ou quelle chaîne de causes, sont-ils reliés ?`;
  return c.z.length ? `une fois « ${nomVar(c.z[0])} » connu, ${paire} n'ont plus rien à s'apprendre. Votre réseau garde pourtant entre eux un chemin qui ne passe pas par « ${nomVar(c.z[0])} » : quelle flèche le crée ?` : `${paire} sont indépendants dans les mesures, mais votre réseau les relie par un chemin. Quelle flèche faut-il retirer, ou retourner ?`;
};
export function AtelierReseau({ surReussite }) {
  const [liens, setLiens] = useState(Object.fromEntries(PAIRES_RESEAU.map((p) => [p, '']))); const [teste, setTeste] = useState(false);
  const sol = useSolution(); const r = evaluerReseau(liens);
  const verifier = () => { setTeste(true); sol.noter(r.ok); if (r.ok) surReussite(); };
  const fleche = (de, vers) => { const [, x1, y1] = VARS_RESEAU[de]; const [, x2, y2] = VARS_RESEAU[vers]; const dx = x2 - x1; const dy = y2 - y1; const t = Math.min(66 / Math.abs(dx || 1e-9), 19 / Math.abs(dy || 1e-9)); return <line key={de + vers} x1={x1 + dx * t} y1={y1 + dy * t} x2={x2 - dx * t * 1.08} y2={y2 - dy * t * 1.08} stroke={C.bleu} strokeWidth="2.5" markerEnd="url(#pointe-reseau)" />; };
  const manque = r.constats.findIndex((c) => !c.ok); const tenus = r.constats.filter((c) => c.ok).length;
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges du réseau.</b>
        <ul><li>Le réseau prédit chacun des neuf constats du tableau : liés quand les mesures les disent liés, indépendants quand elles les disent indépendants.</li><li>Il reste compact : au plus {MAX_TABLES} probabilités à faire renseigner par les experts. Une variable en demande une par combinaison d'états de ses parents.</li><li>Il ne contient aucun cycle.</li></ul>
      </div>
      <p>Pour chaque paire de variables, choisissez « aucun lien direct » ou le sens de la flèche. Le dessin suit vos choix.</p>
      <svg viewBox="0 0 520 210" role="img" aria-label="Réseau en cours de construction">
        <defs><marker id="pointe-reseau" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill={C.bleu} /></marker></defs>
        {PAIRES_RESEAU.map((p) => (liens[p] === '>' ? fleche(p[0], p[1]) : liens[p] === '<' ? fleche(p[1], p[0]) : null))}
        {Object.entries(VARS_RESEAU).map(([v, [nom, x, y]]) => (
          <g key={v}><rect x={x - 64} y={y - 17} width="128" height="34" rx="8" fill="var(--carte)" stroke={C.gris} strokeWidth="2" /><text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--texte)">{nom}</text><text x={x + 58} y={y - 21} textAnchor="end" fontSize="10.5" fill="var(--texte-doux)">{2 ** r.par[v].length} prob.</text></g>
        ))}
      </svg>
      <ol className="regles-edit">
        {PAIRES_RESEAU.map((p) => (
          <li key={p}><b>{nomVar(p[0])} et {nomVar(p[1]).toLowerCase()}</b>
            <select value={liens[p]} onChange={(e) => { setLiens({ ...liens, [p]: e.target.value }); setTeste(false); }} aria-label={`${nomVar(p[0])} et ${nomVar(p[1]).toLowerCase()}`}>
              <option value="">aucun lien direct</option><option value=">">{nomVar(p[0])} → {nomVar(p[1])}</option><option value="<">{nomVar(p[1])} → {nomVar(p[0])}</option>
            </select>
          </li>
        ))}
      </ol>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Confronter mon réseau aux constats</button>
        {sol.bouton(() => { setLiens(SOLUTION_RESEAU); setTeste(false); })}
      </div>
      <table className="tableau compact banc">
        <thead><tr><th>Constat relevé sur l'historique des trajets et sur site</th><th>Mesuré</th>{teste && <th>Votre réseau prédit</th>}</tr></thead>
        <tbody>{r.constats.map((c, i) => {
          const mot = (lie) => (c.genre === 'obs' ? (lie ? 'liés' : 'indépendants') : (lie ? 'un effet' : 'aucun effet'));
          return (<tr key={c.texte}><td>{i + 1}. {c.genre === 'obs' ? `${c.z.length ? `Parmi les trajets « ${nomVar(c.z[0]).toLowerCase()} » : ` : ''}« ${nomVar(c.x).toLowerCase()} » dans ${pct(c.mesure[0])} des cas si « ${nomVar(c.y).toLowerCase()} », dans ${pct(c.mesure[1])} des cas sinon` : c.texte}</td><td>{mot(c.attendu)}</td>
            {teste && <td className={c.ok ? 'ok' : 'ko'}>{c.predit === null ? 'rien : cycle' : mot(c.predit)} {c.ok ? '✓' : '✗'}</td>}</tr>);
        })}</tbody>
      </table>
      {teste && (
        <>
          <table className="tableau compact banc"><tbody>
            {verdict(r.tests.constats, `Constats prédits par votre réseau : ${tenus} sur ${r.constats.length}`)}
            {verdict(r.tests.tables, `Probabilités à renseigner : ${Object.keys(VARS_RESEAU).map((v) => 2 ** r.par[v].length).join(' + ')} = ${r.tables} (maximum ${MAX_TABLES})`)}
            {verdict(r.tests.cycle, `Graphe sans cycle : ${r.cycle ? 'non' : 'oui'}`)}
          </tbody></table>
          <Bilan ok={r.ok}>{r.ok ? `Les ${r.constats.length} constats sont prédits avec ${r.tables} probabilités seulement. Vous savez composer les dépendances d'un réseau bayésien : une flèche par cause directe, aucune entre deux effets d'une même cause, et deux causes indépendantes qui se rejoignent sur leur effet commun.` : r.cycle ? "Votre graphe contient un cycle : en suivant les flèches, on revient à son point de départ, et aucune probabilité ne peut plus être calculée. Quelle flèche ferme la boucle ?" : [
            !r.tests.tables && `Votre réseau demande ${r.tables} probabilités pour ${MAX_TABLES} au plus : chaque flèche qui arrive sur une variable double sa table. Tout relier ne modélise rien, puisque plus aucune indépendance n'est prédite. Lesquelles de vos flèches relient deux variables que les mesures disent indépendantes ?`,
            r.direct && !r.constats[1].ok && "Vous reliez directement le patinage et le détecteur. Votre réseau prédit alors qu'ils restent liés sur sol humide, ce que le constat 2 dément. D'où vient leur lien : l'un provoque-t-il l'autre ?",
            r.tests.tables && !(r.direct && !r.constats[1].ok) && manque >= 0 && `Constat ${manque + 1} : ${piste(r.constats[manque])}`,
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

// ------------------------------------------------------------------- Utilité
// Un seuil d'arrêt par type de chargement. Le système rejoue 20 000 alertes par type : probabilité annoncée
// par le modèle, vérité tirée selon cette probabilité. Il compare le coût obtenu au meilleur seuil du lot.
export const CHARGEMENTS = [['Produits fragiles', 5, 95], ['Cartons de vêtements', 20, 20], ['Produits frais urgents', 60, 20]];
export const TOLERANCE_COUT = 0.02;
export const LOTS_ALERTES = CHARGEMENTS.map((_, k) => { const g = alea(4130 + k); return Array.from({ length: 20000 }, () => { const u = g(); const p = u * u; return { p, panne: g() < p }; }); });
export function rejouer(k, seuil) {
  const [, arret, casse] = CHARGEMENTS[k]; let inutiles = 0; let manques = 0;
  for (const a of LOTS_ALERTES[k]) { if (a.p * 100 >= seuil) { if (!a.panne) inutiles++; } else if (a.panne) manques++; }
  return { inutiles, manques, cout: inutiles * arret + manques * casse };
}
let meilleurs = null;
export function evaluerUtilite(seuils) {
  meilleurs = meilleurs || CHARGEMENTS.map((_, k) => { let m = [Infinity, 0]; for (let s = 1; s <= 99; s++) { const c = rejouer(k, s).cout; if (c < m[0]) m = [c, s]; } return m; });
  const lignes = CHARGEMENTS.map(([nom, arret, casse], k) => { const r = rejouer(k, seuils[k]); const ecart = Math.round((r.cout / meilleurs[k][0] - 1) * 1000) / 1000; return { nom, arret, casse, seuil: seuils[k], ...r, meilleur: meilleurs[k][0], ecart, tropHaut: seuils[k] > meilleurs[k][1], ok: ecart <= TOLERANCE_COUT }; });
  return { lignes, ok: lignes.every((l) => l.ok) };
}
export const SOLUTION_UTILITE = [5, 50, 75];
export function AtelierUtilite({ surReussite }) {
  const [seuils, setSeuils] = useState([50, 50, 50]); const [res, setRes] = useState(null);
  const sol = useSolution();
  const verifier = () => { const r = evaluerUtilite(seuils); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const faux = res?.lignes.find((l) => !l.ok);
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges de la politique d'arrêt.</b>
        <ul><li>Le modèle annonce, à chaque alerte, une probabilité de défaillance. Le robot s'arrête si elle atteint le seuil programmé pour son chargement, sinon il continue.</li><li>Pour chaque type de chargement, le coût total de vos décisions reste à moins de 2 % au-dessus de celui du meilleur seuil possible sur le même lot d'alertes.</li></ul>
      </div>
      <table className="tableau compact donnees">
        <thead><tr><th>Chargement</th><th>Arrêt inutile</th><th>Défaillance non arrêtée</th></tr></thead>
        <tbody>{CHARGEMENTS.map(([nom, arret, casse]) => <tr key={nom}><th>{nom}</th><td>{arret} €</td><td>{casse} €</td></tr>)}</tbody>
      </table>
      <p>Le système rejoue 20 000 alertes passées par type de chargement : pour chacune, la probabilité annoncée par le modèle, puis ce qui s'est réellement produit.</p>
      {CHARGEMENTS.map(([nom], k) => (
        <label className="curseur" key={nom}>Seuil, {nom.toLowerCase()} = <b>{seuils[k]} %</b><input type="range" min="1" max="99" step="1" value={seuils[k]} onChange={(e) => { setSeuils(seuils.map((x, i) => (i === k ? Number(e.target.value) : x))); setRes(null); }} aria-label={`Seuil, ${nom.toLowerCase()}`} /></label>
      ))}
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Rejouer les 60 000 alertes</button>
        {sol.bouton(() => { setSeuils(SOLUTION_UTILITE); setRes(null); })}
      </div>
      {res && (
        <>
          <table className="tableau compact banc">
            <thead><tr><th>Chargement</th><th>Votre seuil</th><th>Arrêts inutiles</th><th>Défaillances non arrêtées</th><th>Coût total</th><th>Meilleur seuil du lot</th><th>Écart</th></tr></thead>
            <tbody>{res.lignes.map((l) => (
              <tr key={l.nom}><th>{l.nom}</th><td>{l.seuil} %</td><td>{milliers(l.inutiles)} × {l.arret} € = {euros(l.inutiles * l.arret)}</td><td>{milliers(l.manques)} × {l.casse} € = {euros(l.manques * l.casse)}</td><td>{euros(l.cout)}</td><td>{euros(l.meilleur)}</td>
                <td className={l.ok ? 'ok' : 'ko'}>+{pct(l.ecart)} {l.ok ? '✓' : '✗'}</td></tr>
            ))}</tbody>
          </table>
          <Bilan ok={res.ok}>{res.ok ? "Vos trois réglages sont à moins de 2 % du meilleur possible. Vous savez régler la politique de décision d'un système à partir des coûts : même modèle, mêmes probabilités, et pourtant trois seuils, parce que les erreurs ne coûtent pas le même prix d'un chargement à l'autre." : [
            seuils.every((x) => x === 50) && "Le seuil de 50 % paraît naturel, mais il ne tient que pour le chargement dont les deux erreurs coûtent le même prix.",
            `« ${faux.nom} » : votre seuil est trop ${faux.tropHaut ? 'haut' : 'bas'}. ${faux.tropHaut ? `Juste en dessous, le robot continue alors que la perte attendue dépasse le prix d'un arrêt` : `Juste au-dessus, le robot s'arrête alors que l'arrêt coûte plus que la perte attendue`}. Un arrêt inutile coûte ${faux.arret} €, une défaillance non arrêtée ${faux.casse} € : pour quelle probabilité les deux décisions ont-elles le même coût espéré ?`,
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

// ----------------------------------------------------------------- Supervisé
// Sept lots étiquetés à affecter : entraînement, test ou écarté. Le système entraîne un classifieur au plus
// proche voisin sur les lots d'entraînement, puis mesure son exactitude sur le test et sur un terrain caché.
export const SUPERVISE = { terrain: 0.9, ecart: 0.02, paresseux: 0.65 };
const situation = (g, nuit, marge = 0) => { const x1 = g(); const x2 = (nuit ? 0 : 0.5) + 0.5 * g(); return { x1, x2, nuit, y: x1 + x2 + (g() + g() - 1) * 0.15 > 1 - marge ? 1 : 0 }; };
const tirage = (graine, n, nuit, marge) => { const g = alea(graine); return Array.from({ length: n }, () => situation(g, nuit ?? g() < 0.5, marge)); };
export const LOTS = (() => {
  const jour = tirage(11, 600, false); const g = alea(17);
  return {
    jour: ['Tournées de jour', 'relevées de jour, de mars à juin, étiquetées par la cheffe de quai', jour],
    reexport: ['Export du 2 juillet', "la base des tournées de jour, exportée une seconde fois : mêmes robots, mêmes dates, mêmes mesures", jour.slice(0, 400).map((e) => ({ ...e }))],
    nuit: ['Tournées de nuit', 'relevées de nuit, entrepôt plus froid, étiquetées par la cheffe de quai', tirage(12, 400, true)],
    calme: ['Semaine calme', "jour et nuit, pendant une semaine sans incident : presque toutes les étiquettes sont « continuer »", tirage(13, 4000).filter((e) => e.y === 0 || g() < 0.04).slice(0, 500)],
    hate: ['Saisie rapide', "jour et nuit, étiquetées en fin de poste : un sondage a trouvé une étiquette « arrêter » sur trois saisie « continuer »", tirage(14, 1200).map((e) => ({ ...e, y: e.y && g() < 1 / 3 ? 0 : e.y }))],
    voisin: ['Entrepôt voisin', "jour et nuit, dans un autre entrepôt au sol plus glissant, où l'on arrête les robots plus tôt", tirage(15, 600, undefined, 0.3)],
    controle: ['Échantillon de contrôle', "tirées au hasard sur toute l'année, jour et nuit, étiquetées séparément par deux expertes", tirage(16, 300)],
  };
})();
const TERRAIN = tirage(4130, 2000);
// Le modèle retient ses exemples et répond comme le plus proche (ou comme la majorité des k plus proches).
export function predire(train, e, k = 1) {
  if (k === 1) { let d0 = Infinity; let y = 0; for (const t of train) { const d = (t.x1 - e.x1) ** 2 + (t.x2 - e.x2) ** 2; if (d < d0) { d0 = d; y = t.y; } } return y; }
  const proches = [];
  for (const t of train) { const d = (t.x1 - e.x1) ** 2 + (t.x2 - e.x2) ** 2; if (proches.length < k || d < proches[k - 1][0]) { proches.push([d, t.y]); proches.sort((a, b) => a[0] - b[0]); if (proches.length > k) proches.pop(); } }
  return proches.reduce((s, p) => s + p[1], 0) * 2 > proches.length ? 1 : 0;
}
const part = (jeu, f) => jeu.filter(f).length / jeu.length;
export function evaluerSupervise(affectation, k = 1) {
  const jeu = (role) => Object.keys(LOTS).filter((id) => affectation[id] === role).flatMap((id) => LOTS[id][2]);
  const train = jeu('train'); const test = jeu('test');
  if (!train.length || !test.length) return { nTrain: train.length, nTest: test.length, tests: { separe: false }, ok: false };
  const vus = new Set(train.map((e) => `${e.x1}|${e.x2}`)); const communs = test.filter((e) => vus.has(`${e.x1}|${e.x2}`)).length;
  const juste = TERRAIN.map((e) => predire(train, e, k) === e.y);
  const exTest = part(test, (e) => predire(train, e, k) === e.y); const exTerrain = part(juste, Boolean);
  const exJour = juste.filter((j, i) => j && !TERRAIN[i].nuit).length / part(TERRAIN, (e) => !e.nuit) / TERRAIN.length; const exNuit = juste.filter((j, i) => j && TERRAIN[i].nuit).length / part(TERRAIN, (e) => e.nuit) / TERRAIN.length;
  const arrets = part(test, (e) => e.y); const paresseux = Math.max(arrets, 1 - arrets); const ecart = Math.round((exTest - exTerrain) * 1000) / 1000;
  const tests = { separe: true, terrain: Math.round(exTerrain * 1000) >= SUPERVISE.terrain * 1000, honnete: Math.abs(ecart) <= SUPERVISE.ecart, departage: Math.round(paresseux * 1000) <= SUPERVISE.paresseux * 1000 };
  return { nTrain: train.length, nTest: test.length, communs, exTest, exTerrain, exJour, exNuit, ecart, arrets, paresseux, tests, ok: tests.terrain && tests.honnete && tests.departage };
}
export const SOLUTION_SUPERVISE = { jour: 'train', reexport: 'ecarte', nuit: 'train', calme: 'ecarte', hate: 'ecarte', voisin: 'ecarte', controle: 'test' };
const ROLES = { train: 'Entraînement', test: 'Test', ecarte: 'Écarté' };
export function AtelierSupervise({ surReussite }) {
  const [aff, setAff] = useState(Object.fromEntries(Object.keys(LOTS).map((id) => [id, 'train']))); const [res, setRes] = useState(null);
  const sol = useSolution();
  const verifier = () => { const r = evaluerSupervise(aff); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges du modèle d'arrêt.</b>
        <ul><li>Au moins 90 % d'exactitude sur le terrain : 2 000 situations du mois prochain, de jour comme de nuit, que vous ne voyez pas.</li><li>Une estimation honnête : l'exactitude mesurée sur votre test s'écarte d'au plus 2 points de celle du terrain.</li><li>Un test qui départage : un modèle qui donnerait toujours la même réponse y obtient au plus 65 %.</li></ul>
      </div>
      <p>Chaque situation est décrite par deux mesures, la vibration et la température du moteur, et étiquetée « continuer » ou « arrêter ». Le modèle est volontairement simple : il retient ses exemples d'entraînement et répond comme l'exemple le plus proche. Affectez chaque lot.</p>
      <ol className="regles-edit">
        {Object.entries(LOTS).map(([id, [nom, description, exemples]]) => (
          <li key={id}><b>{nom}</b> {milliers(exemples.length)} situations, {pct(part(exemples, (e) => e.y), 0)} étiquetées « arrêter »
            <select value={aff[id]} onChange={(e) => { setAff({ ...aff, [id]: e.target.value }); setRes(null); }} aria-label={nom}>{Object.entries(ROLES).map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select>
            <span className="conseil">{description}</span>
          </li>
        ))}
      </ol>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Entraîner puis mesurer</button>
        {sol.bouton(() => { setAff(SOLUTION_SUPERVISE); setRes(null); })}
      </div>
      {res && !res.tests.separe && <Bilan ok={false}>{res.nTrain ? "Tous les lots retenus sont partis à l'entraînement : il ne reste aucune situation que le modèle n'ait jamais vue. Sur quoi allez-vous mesurer ce qu'il vaut ?" : "Aucun lot à l'entraînement : le modèle n'a aucun exemple à retenir. Quels lots lui montreraient les situations du terrain ?"}</Bilan>}
      {res && res.tests.separe && (
        <>
          <table className="tableau compact banc"><tbody>
            <tr><td>Entraînement : {milliers(res.nTrain)} situations. Test : {milliers(res.nTest)} situations, dont {milliers(res.communs)} déjà vues à l'entraînement</td><td>mesuré</td></tr>
            {verdict(res.tests.terrain, `Exactitude sur le terrain : ${pct(res.exTerrain)} (de jour ${pct(res.exJour)}, de nuit ${pct(res.exNuit)}), minimum 90 %`)}
            {verdict(res.tests.honnete, `Exactitude mesurée sur votre test : ${pct(res.exTest)}, soit ${F(Math.abs(res.ecart) * 100, 1)} point(s) ${res.ecart >= 0 ? 'au-dessus' : 'en dessous'} du terrain (maximum 2)`)}
            {verdict(res.tests.departage, `Un modèle qui répondrait toujours « ${res.arrets > 0.5 ? 'arrêter' : 'continuer'} » obtiendrait ${pct(res.paresseux)} sur votre test (maximum 65 %)`)}
          </tbody></table>
          <Bilan ok={res.ok}>{res.ok ? `Votre test annonce ${pct(res.exTest)} et le terrain donne ${pct(res.exTerrain)}. Vous savez choisir les jeux de données d'un entraînement : des exemples fiables qui couvrent les conditions du terrain pour apprendre, et, pour mesurer, des situations jamais vues qui lui ressemblent.` : [
            res.communs > 0 && `${milliers(res.communs)} situations de votre test figurent aussi dans l'entraînement : le modèle les connaît par cœur, et le test annonce ${pct(res.exTest)} quand le terrain donne ${pct(res.exTerrain)}. Relisez la description des lots : lesquels contiennent les mêmes situations ?`,
            !res.tests.terrain && (res.exJour - res.exNuit > 0.08 ? `Sur le terrain, le modèle atteint ${pct(res.exJour)} de jour mais ${pct(res.exNuit)} de nuit. Quelles conditions manquent à vos lots d'entraînement ?` : `Sur le terrain, le modèle se trompe de jour comme de nuit : il répète des étiquettes qui ne valent pas pour cet entrepôt. Parmi vos lots d'entraînement, lesquels ont des étiquettes douteuses, ou viennent d'ailleurs ?`),
            !res.communs && res.tests.terrain && !res.tests.honnete && (res.ecart > 0 ? "Votre test flatte le modèle. Ses situations ressemblent-elles à celles du terrain, de jour comme de nuit ?" : "Votre test annonce nettement moins que le terrain : ce sont ses étiquettes qui sont en cause, pas le modèle. Ont-elles été saisies avec soin, et dans cet entrepôt ?"),
            !res.communs && !res.tests.departage && `Votre test compte ${pct(res.arrets, 0)} de situations « arrêter », contre environ la moitié sur le terrain : un modèle sans intérêt y brillerait. Quel lot ressemble au terrain ?`,
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

// ------------------------------------------------------------ Recommandation
// Filtrage collaboratif par voisinage : mesure de proximité, nombre de voisins, minimum de séries communes.
// Le système cache tour à tour chaque note connue, la prédit avec les autres, et mesure erreur et couverture.
export const SERIES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const NOTES = [
  ['Léa', [3, 3, 4, 4, 2, 0, 2, 2]], ['Marc', [5, 0, 5, 0, 0, 0, 0, 3]], ['Nina', [0, 3, 0, 3, 2, 0, 1, 1]], ['Omar', [0, 4, 0, 4, 0, 3, 0, 1]],
  ['Inès', [5, 5, 5, 5, 2, 3, 3, 4]], ['Paul', [0, 2, 1, 2, 4, 5, 4, 0]], ['Rose', [4, 3, 4, 3, 0, 0, 5, 0]], ['Sami', [0, 1, 1, 1, 0, 3, 3, 0]],
  ['Théa', [0, 2, 3, 0, 4, 3, 3, 0]], ['Ugo', [1, 0, 1, 1, 3, 3, 4, 0]], ['Yann', [0, 3, 2, 3, 1, 1, 1, 1]], ['Zoé', [0, 0, 0, 2, 0, 5, 0, 0]],
];
export const RECO = { erreur: 0.7, couverture: 0.9 };
const moyenne = (t) => t.reduce((s, x) => s + x, 0) / t.length;
export function predireNote({ mesure, voisins, communs }, notes, u, i) {
  const connues = (v) => notes[v][1].map((n, j) => (n && !(v === u && j === i) ? n : 0));
  const moi = connues(u); const mMoi = moi.some(Boolean) ? moyenne(moi.filter(Boolean)) : null;
  if (mMoi === null) return null;
  const candidats = [];
  notes.forEach(([, ligne], v) => {
    if (v === u || !ligne[i]) return;
    const mV = moyenne(ligne.filter(Boolean)); const ecarts = [];
    ligne.forEach((n, j) => { if (n && moi[j]) ecarts.push(mesure === 'centre' ? Math.abs((n - mV) - (moi[j] - mMoi)) : Math.abs(n - moi[j])); });
    if (ecarts.length >= communs) candidats.push({ poids: 1 / (1 + moyenne(ecarts)), note: mesure === 'centre' ? ligne[i] - mV : ligne[i] });
  });
  if (!candidats.length) return null;
  const retenus = candidats.sort((a, b) => b.poids - a.poids).slice(0, voisins);
  const p = retenus.reduce((s, c) => s + c.poids * c.note, 0) / retenus.reduce((s, c) => s + c.poids, 0);
  return Math.min(5, Math.max(1, mesure === 'centre' ? mMoi + p : p));
}
export function evaluerRecommandation(reglage, notes = NOTES) {
  let total = 0; let predites = 0; let erreur = 0; let erreurPop = 0; const parUtilisateur = notes.map(() => [0, 0, 0]);
  notes.forEach(([, ligne], u) => ligne.forEach((n, i) => {
    if (!n) return;
    total++; parUtilisateur[u][0]++;
    erreurPop += Math.abs(moyenne(notes.filter((l, v) => v !== u && l[1][i]).map((l) => l[1][i])) - n);
    const p = predireNote(reglage, notes, u, i);
    if (p !== null) { predites++; erreur += Math.abs(p - n); parUtilisateur[u][1]++; parUtilisateur[u][2] += Math.abs(p - n); }
  }));
  const mae = predites ? erreur / predites : null; const couverture = predites / total; const popularite = erreurPop / total;
  const tests = { erreur: mae !== null && mae <= RECO.erreur, couverture: couverture >= RECO.couverture };
  return { total, predites, mae, couverture, popularite, parUtilisateur, tests, ok: tests.erreur && tests.couverture };
}
export const SOLUTION_RECOMMANDATION = { mesure: 'centre', voisins: 3, communs: 2 };
const MESURES = { brut: 'Écart moyen entre les notes brutes', centre: 'Écart moyen entre les notes centrées sur la moyenne de chacun' };
export function AtelierRecommandation({ surReussite }) {
  const [reg, setReg] = useState({ mesure: 'brut', voisins: 1, communs: 1 }); const [res, setRes] = useState(null);
  const sol = useSolution();
  const maj = (cle, v) => { setReg({ ...reg, [cle]: v }); setRes(null); };
  const verifier = () => { const r = evaluerRecommandation(reg); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const curseur = (cle, nom, max) => (<label className="curseur">{nom} = <b>{reg[cle]}</b><input type="range" min="1" max={max} step="1" value={reg[cle]} onChange={(e) => maj(cle, Number(e.target.value))} aria-label={nom} /></label>);
  const sans = res ? NOTES.filter((_, u) => res.parUtilisateur[u][1] < res.parUtilisateur[u][0]).map(([n]) => n) : [];
  const pires = res ? NOTES.map(([n], u) => [n, res.parUtilisateur[u][1] ? res.parUtilisateur[u][2] / res.parUtilisateur[u][1] : 0]).sort((a, b) => b[1] - a[1]).slice(0, 2) : [];
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges du recommandeur.</b>
        <ul><li>Le système cache tour à tour chacune des {NOTES.reduce((s, l) => s + l[1].filter(Boolean).length, 0)} notes connues et la prédit à partir des autres.</li><li>Erreur moyenne d'au plus {F(RECO.erreur, 2)} point sur les notes prédites.</li><li>Au moins {F(RECO.couverture * 100, 0)} % des notes cachées reçoivent une prédiction.</li></ul>
      </div>
      <table className="tableau compact donnees">
        <thead><tr><th>Notes de 1 à 5</th>{SERIES.map((x) => <th key={x}>Série {x}</th>)}</tr></thead>
        <tbody>{NOTES.map(([nom, ligne]) => <tr key={nom}><th>{nom}</th>{ligne.map((n, i) => <td key={SERIES[i]}>{n || '·'}</td>)}</tr>)}</tbody>
      </table>
      <p>Pour prédire une note, le système compare l'utilisateur à ceux qui ont noté la série, sur les séries qu'ils ont notées tous les deux. Il écarte ceux qui en ont trop peu en commun, garde les plus proches, puis fait la moyenne de leurs avis, pondérée par la proximité. Avec les notes centrées, un avis est l'écart entre la note et la moyenne de celui qui la donne.</p>
      <ol className="regles-edit">
        <li><b>Mesure de proximité</b><select value={reg.mesure} onChange={(e) => maj('mesure', e.target.value)} aria-label="Mesure de proximité">{Object.entries(MESURES).map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select></li>
      </ol>
      {curseur('voisins', 'Voisins retenus', 8)}
      {curseur('communs', 'Séries communes exigées', 5)}
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Cacher puis prédire chaque note</button>
        {sol.bouton(() => { setReg(SOLUTION_RECOMMANDATION); setRes(null); })}
      </div>
      {res && (
        <>
          <table className="tableau compact banc"><tbody>
            <tr><td>Repère : prédire la moyenne de la série, la même pour tous (popularité), donne une erreur moyenne de {F(res.popularite, 2)} point</td><td>mesuré</td></tr>
            {verdict(res.tests.erreur, `Erreur moyenne de votre réglage : ${F(res.mae, 2)} point (maximum ${F(RECO.erreur, 2)})`)}
            {verdict(res.tests.couverture, `Notes prédites : ${res.predites} sur ${res.total}, soit ${pct(res.couverture, 0)} (minimum ${F(RECO.couverture * 100, 0)} %)`)}
          </tbody></table>
          <Bilan ok={res.ok}>{res.ok ? `Erreur moyenne de ${F(res.mae, 2)} point, contre ${F(res.popularite, 2)} pour la popularité, et ${pct(res.couverture, 0)} des notes prédites. Vous savez choisir la méthode et les réglages d'un recommandeur : comparer les goûts plutôt que la sévérité, garder peu de voisins mais comparés sur assez de séries. ${sans.length ? `Reste ${sans.join(', ')}, qui a trop peu noté pour avoir des voisins : c'est le démarrage à froid, où l'on se replie sur la popularité.` : ''}` : [
            !res.tests.couverture && `${res.total - res.predites} notes restent sans prédiction, chez ${sans.join(', ')} : en exigeant ${reg.communs} séries communes, vous écartez ceux qui ont peu noté. Quelle exigence garde des voisins à presque tout le monde ?`,
            !res.tests.erreur && reg.mesure === 'brut' && `Les erreurs les plus fortes concernent ${pires.map(([n, e]) => `${n} (${F(e, 2)})`).join(' et ')}. Regardez leurs lignes : ont-ils d'autres goûts que les autres, ou notent-ils tout plus haut, ou tout plus bas ? Deux utilisateurs aux mêmes goûts, l'un sévère et l'autre généreux, sont-ils proches pour votre mesure ?`,
            !res.tests.erreur && reg.mesure === 'centre' && (reg.voisins >= 4 ? `Avec ${reg.voisins} voisins, la moyenne accueille des utilisateurs aux goûts opposés, et l'erreur remonte vers celle de la popularité. Combien d'utilisateurs partagent vraiment les goûts de chacun ?` : reg.voisins === 1 ? "Avec un seul voisin, la prédiction recopie son avis, humeur du jour comprise. Que gagne-t-on à faire la moyenne de quelques avis proches ?" : reg.communs === 1 ? "Avec une seule série en commun, deux utilisateurs paraissent proches par hasard. Sur combien de séries faut-il les comparer pour se fier à leur ressemblance ?" : "Si peu d'utilisateurs franchissent ce minimum de séries communes que les voisins retenus ne sont plus les plus proches, seulement ceux qui ont beaucoup noté."),
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

export const ATELIERS_CONCEPTION_M1 = { conception_bayes: AtelierBayes, conception_reseau: AtelierReseau, conception_utilite: AtelierUtilite, conception_supervise: AtelierSupervise, conception_recommandation: AtelierRecommandation };
