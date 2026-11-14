// Ateliers de construction du module 0. Ici l'apprenant ne choisit pas une réponse :
// il fabrique l'objet étudié (une base de règles, un neurone, un modèle de contraintes,
// une politique, des récompenses, un programme), puis le système le met à l'épreuve.
import { useMemo, useState } from 'react';

const C = { bleu: '#23468C', vert: '#238C33', jaune: '#D9CF4A', rouge: '#F24141', noir: '#0D0D0D', gris: '#8A93A6', orange: '#E07B1A' };
export const alea = (graine) => { let s = graine; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; };
const nombre = (x) => parseFloat(String(x).replace(',', '.'));
const Bilan = ({ ok, children }) => <p className={`bilan ${ok ? 'juste' : 'faux'}`} role="status">{children}</p>;

// ---------------------------------------------------------------- Formulaire
// Calcul ou fiche à compléter : champs numériques (avec tolérance) ou listes de choix.
export function Formulaire({ config, surReussite }) {
  const [v, setV] = useState({});
  const [verif, setVerif] = useState(false);
  const juste = (c, i) => (c.options ? v[i] === c.reponse : v[i] !== undefined && v[i] !== '' && Math.abs(nombre(v[i]) - c.reponse) <= (c.tolerance ?? 0.011));
  const nb = config.champs.filter(juste).length;
  const tout = nb === config.champs.length;
  return (
    <div className="atelier">
      {config.donnees && (
        <table className="tableau compact donnees"><tbody>{config.donnees.map((l) => <tr key={l.join('|')}>{l.map((x, k) => (k === 0 ? <th key={x}>{x}</th> : <td key={`${k}-${x}`}>{x}</td>))}</tr>)}</tbody></table>
      )}
      <ol className="champs">
        {config.champs.map((c, i) => (
          <li key={c.label}>
            <label>{c.label}
              {c.options ? (
                <select value={v[i] ?? ''} onChange={(e) => { setV({ ...v, [i]: e.target.value }); setVerif(false); }}>
                  <option value="">choisir…</option>{c.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <span className="saisie"><input inputMode="decimal" value={v[i] ?? ''} onChange={(e) => { setV({ ...v, [i]: e.target.value }); setVerif(false); }} />{c.unite && <em>{c.unite}</em>}</span>
              )}
            </label>
            {verif && (juste(c, i) ? <span className="marque juste">✓</span> : <span className="aide-champ">{c.aide}</span>)}
          </li>
        ))}
      </ol>
      <button className="bouton" onClick={() => { setVerif(true); if (tout) surReussite(); }} data-testid="verifier">Vérifier ma construction</button>
      {verif && <Bilan ok={tout}>{tout ? config.bilan : `${nb} élément(s) correct(s) sur ${config.champs.length}. Corrigez ceux qui portent une indication, puis vérifiez de nouveau.`}</Bilan>}
    </div>
  );
}

// ------------------------------------------------------------------- Parsons
// Assembler un programme : les lignes sont données dans le désordre, à remettre en ordre.
export function Parsons({ config, surReussite }) {
  const n = config.lignes.length;
  const depart = useMemo(() => { const g = alea(n * 97 + config.lignes[0].length); const o = config.lignes.map((_, i) => i); for (let i = n - 1; i > 0; i--) { const j = Math.floor(g() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; } if (o.every((x, i) => x === i)) o.reverse(); return o; }, [config, n]);
  const [ordre, setOrdre] = useState(depart);
  const [verif, setVerif] = useState(false);
  const bouger = (i, d) => { const j = i + d; if (j < 0 || j >= n) return; const o = [...ordre]; [o[i], o[j]] = [o[j], o[i]]; setOrdre(o); setVerif(false); };
  const place = (i) => config.lignes[ordre[i]].trim() === config.lignes[i].trim();
  const nb = ordre.filter((_, i) => place(i)).length;
  const tout = nb === n;
  return (
    <div className="atelier">
      <ol className="parsons">
        {ordre.map((k, i) => (
          <li key={k} className={verif ? (place(i) ? 'juste' : 'faux') : ''}>
            <span className="fleches"><button onClick={() => bouger(i, -1)} disabled={i === 0} aria-label="Monter">▲</button><button onClick={() => bouger(i, 1)} disabled={i === n - 1} aria-label="Descendre">▼</button></span>
            <code>{verif && tout ? config.lignes[i] : config.lignes[k].trim()}</code>
          </li>
        ))}
      </ol>
      <button className="bouton" onClick={() => { setVerif(true); if (tout) surReussite(); }} data-testid="verifier">Vérifier mon programme</button>
      {verif && <Bilan ok={tout}>{tout ? config.bilan : `${nb} ligne(s) à la bonne place sur ${n}. Les lignes en rouge sont à déplacer. ${config.aide || ''}`}</Bilan>}
    </div>
  );
}

// -------------------------------------------------------------- Base de règles
const VARS = { temperature: ['température', '°C'], batterie: ['batterie', '%'], obstacle: ['distance obstacle', 'm'] };
const DECISIONS = ['ARRÊT', 'RALENTIR', 'CONTINUER'];
const BANC = [
  [40, 80, 4, 'CONTINUER', 'situation normale'], [90, 80, 4, 'ARRÊT', 'surchauffe'], [40, 10, 4, 'RALENTIR', 'batterie faible'], [40, 80, 1, 'RALENTIR', 'obstacle proche'],
  [40, 80, 0.3, 'ARRÊT', 'obstacle au contact'], [40, 10, 0.3, 'ARRÊT', 'batterie faible et obstacle au contact'], [90, 10, 4, 'ARRÊT', 'surchauffe et batterie faible'], [84, 21, 1.6, 'CONTINUER', 'juste sous les seuils'],
];
export function AtelierRegles({ surReussite }) {
  const [regles, setRegles] = useState([{ v: 'temperature', op: '>', s: '85', d: 'ARRÊT' }]);
  const [defaut, setDefaut] = useState('CONTINUER');
  const [teste, setTeste] = useState(false);
  const maj = (i, champ, val) => { setRegles(regles.map((r, k) => (k === i ? { ...r, [champ]: val } : r))); setTeste(false); };
  const bouger = (i, d) => { const j = i + d; if (j < 0 || j >= regles.length) return; const r = [...regles]; [r[i], r[j]] = [r[j], r[i]]; setRegles(r); setTeste(false); };
  const decider = ([t, b, o]) => { const m = { temperature: t, batterie: b, obstacle: o }; for (let i = 0; i < regles.length; i++) { const r = regles[i]; const s = nombre(r.s); if (Number.isNaN(s)) continue; if (r.op === '>' ? m[r.v] > s : m[r.v] < s) return [r.d, `R${i + 1}`]; } return [defaut, 'défaut']; };
  const res = BANC.map((c) => decider(c));
  const nb = res.filter(([d], i) => d === BANC[i][3]).length;
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges de l'expert.</b>
        <ul><li>Arrêter si un obstacle est à moins de 0,5 m.</li><li>Arrêter si la température dépasse 85 °C.</li><li>Ralentir si la batterie est sous 20 %.</li><li>Ralentir si un obstacle est à moins de 1,5 m.</li><li>Dans tous les autres cas, continuer.</li><li>En cas de conflit, la sécurité l'emporte : l'arrêt passe avant le ralentissement.</li></ul>
      </div>
      <ol className="regles-edit">
        {regles.map((r, i) => (
          <li key={i}>
            <span className="fleches"><button onClick={() => bouger(i, -1)} disabled={i === 0} aria-label="Monter">▲</button><button onClick={() => bouger(i, 1)} disabled={i === regles.length - 1} aria-label="Descendre">▼</button></span>
            <b>R{i + 1}</b> si
            <select value={r.v} onChange={(e) => maj(i, 'v', e.target.value)} aria-label="Mesure">{Object.entries(VARS).map(([k, [nom]]) => <option key={k} value={k}>{nom}</option>)}</select>
            <select value={r.op} onChange={(e) => maj(i, 'op', e.target.value)} aria-label="Comparaison"><option value=">">&gt;</option><option value="<">&lt;</option></select>
            <input value={r.s} onChange={(e) => maj(i, 's', e.target.value)} inputMode="decimal" aria-label="Seuil" /> {VARS[r.v][1]} alors
            <select value={r.d} onChange={(e) => maj(i, 'd', e.target.value)} aria-label="Décision">{DECISIONS.map((d) => <option key={d}>{d}</option>)}</select>
            <button className="lien" onClick={() => { setRegles(regles.filter((_, k) => k !== i)); setTeste(false); }}>retirer</button>
          </li>
        ))}
        <li className="defaut"><b>Sinon</b> <select value={defaut} onChange={(e) => { setDefaut(e.target.value); setTeste(false); }} aria-label="Décision par défaut">{DECISIONS.map((d) => <option key={d}>{d}</option>)}</select></li>
      </ol>
      <div className="actions">
        <button className="bouton secondaire" onClick={() => { setRegles([...regles, { v: 'batterie', op: '<', s: '', d: 'RALENTIR' }]); setTeste(false); }} data-testid="ajouter-regle">+ Ajouter une règle</button>
        <button className="bouton" onClick={() => { setTeste(true); if (nb === BANC.length) surReussite(); }} data-testid="verifier">Tester ma base de règles</button>
      </div>
      {teste && (
        <>
          <table className="tableau compact banc">
            <thead><tr><th>Cas de test</th><th>Temp.</th><th>Batt.</th><th>Obst.</th><th>Attendu</th><th>Votre système</th></tr></thead>
            <tbody>{BANC.map((c, i) => (
              <tr key={c[4]}><td>{c[4]}</td><td>{c[0]} °C</td><td>{c[1]} %</td><td>{c[2]} m</td><td>{c[3]}</td><td className={res[i][0] === c[3] ? 'ok' : 'ko'}>{res[i][0]} ({res[i][1]}) {res[i][0] === c[3] ? '✓' : '✗'}</td></tr>
            ))}</tbody>
          </table>
          <Bilan ok={nb === BANC.length}>{nb === BANC.length ? "Les 8 cas passent : votre base de règles respecte le cahier des charges, priorités comprises. Vous venez d'écrire un système expert." : `${nb} cas réussi(s) sur 8. Pour chaque ligne en rouge, repérez la règle qui a répondu (entre parenthèses) : manque-t-il une règle, un seuil est-il inexact, ou une règle passe-t-elle avant une autre plus prioritaire ?`}</Bilan>
        </>
      )}
    </div>
  );
}

// -------------------------------------------------------------------- Neurone
const POINTS = (() => { const g = alea(31); const p = []; while (p.length < 18) { const x = g(); const y = g(); const s = 0.9 * x + 0.6 * y - 0.8; if (Math.abs(s) > 0.07) p.push([x, y, s > 0 ? 1 : 0]); } return p; })();
export function AtelierNeurone({ surReussite }) {
  const [w1, setW1] = useState(1); const [w2, setW2] = useState(-1); const [b, setB] = useState(0);
  const sortie = ([x, y]) => (w1 * x + w2 * y + b > 0 ? 1 : 0);
  const justes = POINTS.filter((p) => sortie(p) === p[2]).length;
  const faux = POINTS.find((p) => sortie(p) !== p[2]);
  const T = 250; const X = (v) => 30 + v * T; const Y = (v) => 10 + (1 - v) * T;
  // Frontière : w1 x + w2 y + b = 0, tracée d'un bord à l'autre du carré.
  const seg = []; for (const x of [0, 1]) { if (Math.abs(w2) > 1e-6) { const y = -(w1 * x + b) / w2; if (y >= -0.001 && y <= 1.001) seg.push([x, y]); } } for (const y of [0, 1]) { if (Math.abs(w1) > 1e-6) { const x = -(w2 * y + b) / w1; if (x >= -0.001 && x <= 1.001) seg.push([x, y]); } }
  const curseur = (nom, val, set, min, max, pas) => (<label className="curseur">{nom} = <b>{val.toFixed(2)}</b><input type="range" min={min} max={max} step={pas} value={val} onChange={(e) => set(Number(e.target.value))} aria-label={nom} /></label>);
  return (
    <div className="atelier deux">
      <svg viewBox="0 0 300 290" role="img" aria-label="Points à séparer">
        <rect x="30" y="10" width={T} height={T} fill="var(--plan-sol)" />
        {seg.length >= 2 && <line x1={X(seg[0][0])} y1={Y(seg[0][1])} x2={X(seg[1][0])} y2={Y(seg[1][1])} stroke="var(--texte)" strokeWidth="2.5" />}
        {POINTS.map((p, i) => <circle key={i} cx={X(p[0])} cy={Y(p[1])} r="6" fill={p[2] ? C.rouge : C.bleu} stroke={sortie(p) === p[2] ? 'none' : C.noir} strokeWidth="3" />)}
        <text x={30 + T / 2} y="282" textAnchor="middle" fontSize="12" fill="var(--texte-doux)">x₁ : température (0 à 1)</text>
        <text x="14" y={10 + T / 2} textAnchor="middle" fontSize="12" fill="var(--texte-doux)" transform={`rotate(-90 14 ${10 + T / 2})`}>x₂ : vibration (0 à 1)</text>
      </svg>
      <div>
        <p>Réglez les deux poids et le biais pour que le neurone réponde 1 (arrêter) sur tous les points rouges et 0 (continuer) sur tous les points bleus. Les points cerclés de noir sont mal classés.</p>
        {curseur('w₁', w1, setW1, -2, 2, 0.1)}{curseur('w₂', w2, setW2, -2, 2, 0.1)}{curseur('b', b, setB, -2, 2, 0.05)}
        <p className="formule">sortie = 1 si {w1.toFixed(2)} × x₁ + {w2.toFixed(2)} × x₂ + ({b.toFixed(2)}) &gt; 0</p>
        {faux && <p className="conseil">Exemple mal classé : x₁ = {faux[0].toFixed(2)}, x₂ = {faux[1].toFixed(2)}. Somme = {(w1 * faux[0] + w2 * faux[1] + b).toFixed(2)}, donc sortie {sortie(faux)}, alors que la bonne réponse est {faux[2]}.</p>}
        <button className="bouton" onClick={() => { if (justes === POINTS.length) surReussite(); }} data-testid="verifier" disabled={justes !== POINTS.length}>Valider mon neurone</button>
        <Bilan ok={justes === POINTS.length}>{justes} point(s) bien classé(s) sur {POINTS.length}. {justes === POINTS.length ? "Votre neurone sépare les deux classes. C'est exactement ce que l'entraînement fait automatiquement : chercher des poids qui réduisent les erreurs." : 'Un poids positif pousse vers « arrêter » quand la mesure augmente. Le biais déplace la frontière sans la faire tourner.'}</Bilan>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------- Gradient
export function AtelierGradient({ surReussite }) {
  const [taux, setTaux] = useState(0.02);
  const [lance, setLance] = useState(false);
  const pas = useMemo(() => { const w = [-4]; for (let k = 0; k < 20; k++) w.push(w[k] - taux * 2 * (w[k] - 3)); return w; }, [taux]);
  const fin = pas[20]; const ok = Math.abs(fin - 3) < 0.05; const diverge = Math.abs(fin - 3) > 7.01;
  const X = (w) => 20 + ((Math.max(-6, Math.min(12, w)) + 6) / 18) * 400; const Y = (w) => 200 - Math.min(190, ((w - 3) ** 2) * 2.2);
  return (
    <div className="atelier">
      <p>La perte vaut L(w) = (w - 3)². Le paramètre part de w = -4. Chaque pas applique w ← w - taux × pente, avec pente = 2 × (w - 3). Choisissez un taux d'apprentissage qui amène w à moins de 0,05 du minimum en 20 pas.</p>
      <svg viewBox="0 0 440 215" role="img" aria-label="Descente de gradient">
        <polyline points={Array.from({ length: 91 }, (_, i) => { const w = -6 + i * 0.2; return `${X(w)},${Y(w)}`; }).join(' ')} fill="none" stroke="var(--texte)" strokeWidth="2" />
        {lance && <polyline points={pas.map((w) => `${X(w)},${Y(w)}`).join(' ')} fill="none" stroke={C.orange} strokeWidth="1.5" strokeDasharray="4 3" />}
        {(lance ? pas : [pas[0]]).map((w, k) => <circle key={k} cx={X(w)} cy={Y(w)} r={k === 0 ? 7 : 4.5} fill={k === 0 ? C.bleu : C.orange} />)}
        <line x1={X(3)} y1="200" x2={X(3)} y2="208" stroke={C.vert} strokeWidth="3" /><text x={X(3)} y="214" textAnchor="middle" fontSize="11" fill={C.vert}>minimum</text>
      </svg>
      <label className="curseur">taux d'apprentissage = <b>{taux.toFixed(2)}</b><input type="range" min="0.01" max="1.2" step="0.01" value={taux} onChange={(e) => { setTaux(Number(e.target.value)); setLance(false); }} aria-label="taux d'apprentissage" /></label>
      <button className="bouton" onClick={() => { setLance(true); if (ok) surReussite(); }} data-testid="verifier">Lancer 20 pas de descente</button>
      {lance && <Bilan ok={ok}>Après 20 pas : w = {Math.abs(fin) > 999 ? 'hors échelle' : fin.toFixed(2)}. {ok ? 'Convergence atteinte. Vous avez réglé un hyperparamètre : ni trop prudent, ni trop audacieux.' : diverge ? "Chaque pas dépasse le minimum et s'en éloigne davantage : le taux est trop grand, la descente diverge." : Math.abs(taux - 1) < 0.006 ? 'Le paramètre saute indéfiniment d\'un côté à l\'autre du minimum, sans s\'en approcher.' : taux > 0.5 ? 'Le paramètre oscille de part et d\'autre du minimum et se rapproche trop lentement. Réduisez le taux.' : 'Le paramètre avance dans la bonne direction, mais à trop petits pas : 20 pas ne suffisent pas. Augmentez le taux.'}</Bilan>}
    </div>
  );
}

// ---------------------------------------------------- Scénario piège (grille)
const GL = 10; const GH = 7; const DEP = [1, 3]; const BUT = [8, 3];
const DIRS = { N: [0, -1], E: [1, 0], S: [0, 1], O: [-1, 0] }; const OPP = { N: 'S', S: 'N', E: 'O', O: 'E' };
export function AtelierPiege({ surReussite }) {
  const [murs, setMurs] = useState(new Set());
  const [res, setRes] = useState(null);
  const cle = (x, y) => `${x},${y}`;
  const libre = (x, y) => x > 0 && y > 0 && x < GL - 1 && y < GH - 1 && !murs.has(cle(x, y));
  const basculer = (x, y) => { if ((x === DEP[0] && y === DEP[1]) || (x === BUT[0] && y === BUT[1]) || x === 0 || y === 0 || x === GL - 1 || y === GH - 1) return; const m = new Set(murs); if (m.has(cle(x, y))) m.delete(cle(x, y)); else m.add(cle(x, y)); setMurs(m); setRes(null); };
  const tester = () => {
    // Plus court chemin (parcours en largeur) : existe-t-il une solution ?
    const parents = { [cle(...DEP)]: null }; const file = [DEP]; let chemin = null;
    while (file.length) { const [x, y] = file.shift(); if (x === BUT[0] && y === BUT[1]) { chemin = []; let k = cle(x, y); while (k) { chemin.unshift(k.split(',').map(Number)); k = parents[k]; } break; } for (const [dx, dy] of Object.values(DIRS)) { const v = [x + dx, y + dy]; if (libre(...v) && !(cle(...v) in parents)) { parents[cle(...v)] = cle(x, y); file.push(v); } } }
    // Agent réactif : aller vers l'objectif si la voie est libre, sinon contourner, sans mémoire.
    let p = [...DEP]; let der = null; const trace = [p]; let arrive = false;
    for (let t = 0; t < 80 && !arrive; t++) {
      const dx = BUT[0] - p[0]; const dy = BUT[1] - p[1]; const pref = [];
      const h = dx ? [dx > 0 ? 'E' : 'O'] : []; const v = dy ? [dy > 0 ? 'S' : 'N'] : [];
      pref.push(...(Math.abs(dx) >= Math.abs(dy) ? [...h, ...v] : [...v, ...h]));
      const libres = Object.keys(DIRS).filter((a) => libre(p[0] + DIRS[a][0], p[1] + DIRS[a][1]));
      let a = pref.find((x) => libres.includes(x));
      if (!a) { const autres = libres.filter((x) => !pref.includes(x) && x !== OPP[der]); a = autres.includes(der) ? der : autres[0]; }
      if (!a) a = libres[0];
      if (!a) break;
      der = a; p = [p[0] + DIRS[a][0], p[1] + DIRS[a][1]]; trace.push(p); arrive = p[0] === BUT[0] && p[1] === BUT[1];
    }
    const r = { chemin, trace, arrive }; setRes(r);
    if (chemin && !arrive) surReussite();
  };
  const c = 40;
  return (
    <div className="atelier">
      <p>Concevez un scénario de test. Cliquez sur les cases pour poser ou retirer des obstacles, de façon que l'agent réactif (règle : aller vers l'objectif si la voie est libre, sinon contourner) échoue, alors qu'un chemin existe bel et bien.</p>
      <svg viewBox={`0 0 ${GL * c} ${GH * c}`} className="grille-edit" role="img" aria-label="Grille à modifier">
        {Array.from({ length: GH }, (_, y) => Array.from({ length: GL }, (_, x) => {
          const bord = x === 0 || y === 0 || x === GL - 1 || y === GH - 1;
          return <rect key={cle(x, y)} x={x * c + 1} y={y * c + 1} width={c - 2} height={c - 2} rx="4" fill={bord || murs.has(cle(x, y)) ? 'var(--plan-mur)' : 'var(--plan-sol)'} onClick={() => basculer(x, y)} style={{ cursor: bord ? 'default' : 'pointer' }} data-case={cle(x, y)} />;
        }))}
        {res?.chemin && <polyline points={res.chemin.map(([x, y]) => `${x * c + c / 2},${y * c + c / 2}`).join(' ')} fill="none" stroke={C.vert} strokeWidth="4" strokeDasharray="3 8" strokeLinecap="round" pointerEvents="none" />}
        {res && <polyline points={res.trace.map(([x, y]) => `${x * c + c / 2 + 4},${y * c + c / 2 + 4}`).join(' ')} fill="none" stroke={C.bleu} strokeWidth="3" opacity="0.8" pointerEvents="none" />}
        <rect x={BUT[0] * c + 9} y={BUT[1] * c + 9} width={c - 18} height={c - 18} rx="4" fill={C.vert} pointerEvents="none" />
        <circle cx={(res ? res.trace[res.trace.length - 1][0] : DEP[0]) * c + c / 2} cy={(res ? res.trace[res.trace.length - 1][1] : DEP[1]) * c + c / 2} r="12" fill={C.bleu} stroke="#fff" strokeWidth="2" pointerEvents="none" />
      </svg>
      <button className="bouton" onClick={tester} data-testid="verifier">Lancer les deux agents</button>
      {res && <Bilan ok={!!res.chemin && !res.arrive}>{!res.chemin ? "Aucun chemin n'existe : même un agent planificateur échouerait. Un bon scénario de test doit rester soluble. Ouvrez un passage." : res.arrive ? `L'agent réactif (trait bleu) arrive en ${res.trace.length - 1} pas : ce scénario ne le met pas en défaut. Indice : il lui faut un obstacle qui barre la route directe et dont il ne peut pas sortir en avançant vers l'objectif, par exemple un U ouvert côté départ.` : `Scénario réussi. Un chemin de ${res.chemin.length - 1} pas existe (pointillés verts), mais l'agent réactif tourne en rond (trait bleu). Vous avez conçu un cas de test qui révèle une limite de l'architecture.`}</Bilan>}
    </div>
  );
}

// ------------------------------------------------------- Modèle de contraintes
const NOMS = ['A', 'B', 'C'];
const EXIGENCES = [['Deux missions ne partagent jamais le même créneau', (a) => a.A !== a.B && a.A !== a.C && a.B !== a.C], ['La mission A passe avant la mission B', (a) => a.A < a.B], ['La mission C ne peut pas occuper le créneau 1', (a) => a.C !== 1]];
const TOUTES = (() => { const t = []; for (let A = 1; A <= 3; A++) for (let B = 1; B <= 3; B++) for (let Cc = 1; Cc <= 3; Cc++) t.push({ A, B, C: Cc }); return t; })();
const dire = (a) => `A au créneau ${a.A}, B au créneau ${a.B}, C au créneau ${a.C}`;
export function AtelierContraintes({ surReussite }) {
  const [cs, setCs] = useState([{ g: 'A', op: '≠', d: 'B' }]);
  const [res, setRes] = useState(null);
  const val = (a, x) => (NOMS.includes(x) ? a[x] : Number(x));
  const respecte = (a) => cs.every(({ g, op, d }) => { const l = a[g]; const r = val(a, d); return op === '≠' ? l !== r : op === '<' ? l < r : op === '>' ? l > r : l === r; });
  const maj = (i, ch, v) => { setCs(cs.map((x, k) => (k === i ? { ...x, [ch]: v } : x))); setRes(null); };
  const tester = () => {
    const trouvees = TOUTES.filter(respecte); const attendues = TOUTES.filter((a) => EXIGENCES.every(([, f]) => f(a)));
    const enTrop = trouvees.find((a) => !EXIGENCES.every(([, f]) => f(a))); const manquante = attendues.find((a) => !respecte(a));
    setRes({ trouvees, enTrop, manquante }); if (!enTrop && !manquante) surReussite();
  };
  return (
    <div className="atelier">
      <p>Trois missions A, B et C doivent être placées sur trois créneaux, numérotés 1, 2 et 3. Les variables et leurs domaines sont fixés : A, B, C ∈ {'{1, 2, 3}'}. À vous de traduire les exigences en contraintes.</p>
      <div className="cahier"><b>Exigences.</b><ul>{EXIGENCES.map(([t]) => <li key={t}>{t}.</li>)}</ul></div>
      <ol className="regles-edit">
        {cs.map((x, i) => (
          <li key={i}>
            <select value={x.g} onChange={(e) => maj(i, 'g', e.target.value)} aria-label="Variable">{NOMS.map((n) => <option key={n}>{n}</option>)}</select>
            <select value={x.op} onChange={(e) => maj(i, 'op', e.target.value)} aria-label="Relation">{['≠', '<', '>', '='].map((o) => <option key={o}>{o}</option>)}</select>
            <select value={x.d} onChange={(e) => maj(i, 'd', e.target.value)} aria-label="Variable ou valeur">{[...NOMS, '1', '2', '3'].map((n) => <option key={n}>{n}</option>)}</select>
            <button className="lien" onClick={() => { setCs(cs.filter((_, k) => k !== i)); setRes(null); }}>retirer</button>
          </li>
        ))}
      </ol>
      <div className="actions">
        <button className="bouton secondaire" onClick={() => { setCs([...cs, { g: 'A', op: '≠', d: 'C' }]); setRes(null); }} data-testid="ajouter-regle">+ Ajouter une contrainte</button>
        <button className="bouton" onClick={tester} data-testid="verifier">Lancer le solveur sur mon modèle</button>
      </div>
      {res && (
        <Bilan ok={!res.enTrop && !res.manquante}>
          Le solveur trouve {res.trouvees.length} planning(s) qui respectent vos contraintes{res.trouvees.length > 0 && res.trouvees.length <= 4 ? ` : ${res.trouvees.map(dire).join(' ; ')}` : ''}.{' '}
          {res.enTrop ? `Votre modèle est trop permissif : il accepte « ${dire(res.enTrop)} », qui ne respecte pas l'exigence « ${EXIGENCES.find(([, f]) => !f(res.enTrop))[0]} ». Il manque une contrainte.` : res.manquante ? `Votre modèle est trop strict : il refuse « ${dire(res.manquante)} », qui satisfait pourtant toutes les exigences. Une contrainte est de trop ou mal écrite.` : "Ce sont exactement les plannings autorisés par les exigences. Vous avez écrit le modèle, le solveur a fait le reste."}
        </Bilan>
      )}
    </div>
  );
}

// --------------------------------------------------------------------- Recuit
const VILLES = (() => { const g = alea(77); return Array.from({ length: 16 }, () => [g(), g()]); })();
const longueur = (o) => o.reduce((s, v, i) => { const w = o[(i + 1) % o.length]; return s + Math.hypot(VILLES[v][0] - VILLES[w][0], VILLES[v][1] - VILLES[w][1]); }, 0);
export function recuit(t0, alpha, graine, iterations = 3000) {
  const g = alea(graine); let o = VILLES.map((_, i) => i); let cout = longueur(o); let T = t0; let meilleur = cout; let mo = o; const courbe = [];
  for (let it = 0; it < iterations; it++) {
    const i = 1 + Math.floor(g() * (o.length - 1)); const j = 1 + Math.floor(g() * (o.length - 1)); if (i === j) continue;
    const n = [...o]; [n[i], n[j]] = [n[j], n[i]]; const c = longueur(n); const d = c - cout;
    if (d < 0 || g() < Math.exp(-d / T)) { o = n; cout = c; if (c < meilleur) { meilleur = c; mo = n; } }
    T *= alpha; if (it % 30 === 0) courbe.push(cout);
  }
  return { meilleur, ordre: mo, courbe, tFinale: T };
}
const REFERENCE = Math.min(...[1, 2, 3, 4, 5, 6].map((s) => recuit(0.3, 0.998, s * 13).meilleur));
export function AtelierRecuit({ surReussite }) {
  const [t0, setT0] = useState(0.001); const [alpha, setAlpha] = useState(0.998); const [res, setRes] = useState(null);
  const lancer = () => { const essais = [11, 23, 37, 41, 59].map((s) => recuit(t0, alpha, s)); const moy = essais.reduce((s, e) => s + e.meilleur, 0) / essais.length; const r = { essais, moy, ecart: moy / REFERENCE - 1 }; setRes(r); if (r.ecart <= 0.08) surReussite(); };
  const e = res?.essais[0];
  return (
    <div className="atelier">
      <p>Le robot doit visiter 16 stations. Le recuit dispose de 3 000 itérations et échange deux stations à chaque essai. Réglez la température initiale T₀ et le coefficient de refroidissement α (à chaque itération, T ← α × T) pour que la longueur moyenne obtenue sur 5 graines soit à moins de 8 % de la meilleure tournée connue.</p>
      <label className="curseur">T₀ = <b>{t0.toFixed(3)}</b><input type="range" min="0.001" max="3" step="0.001" value={t0} onChange={(ev) => { setT0(Number(ev.target.value)); setRes(null); }} aria-label="Température initiale" /></label>
      <label className="curseur">α = <b>{alpha.toFixed(4)}</b><input type="range" min="0.99" max="0.9999" step="0.0001" value={alpha} onChange={(ev) => { setAlpha(Number(ev.target.value)); setRes(null); }} aria-label="Coefficient de refroidissement" /></label>
      <p className="conseil">Température à la fin des 3 000 itérations : {(t0 * alpha ** 3000).toExponential(1)}. Un échange typique allonge la tournée de 0,1 à 0,5.</p>
      <button className="bouton" onClick={lancer} data-testid="verifier">Lancer 5 recuits</button>
      {res && (
        <>
          <svg viewBox="0 0 440 200" role="img" aria-label="Tournée et convergence">
            <polygon points={e.ordre.map((v) => `${15 + VILLES[v][0] * 170},${15 + VILLES[v][1] * 170}`).join(' ')} fill="none" stroke={C.bleu} strokeWidth="2" />
            {VILLES.map((v, i) => <circle key={i} cx={15 + v[0] * 170} cy={15 + v[1] * 170} r="4.5" fill={i === 0 ? C.noir : C.jaune} stroke={C.noir} />)}
            <polyline points={e.courbe.map((c, i) => `${225 + (i / e.courbe.length) * 200},${190 - ((c - REFERENCE * 0.9) / (REFERENCE * 1.6)) * 170}`).join(' ')} fill="none" stroke={C.orange} strokeWidth="1.8" />
            <line x1="225" x2="425" y1={190 - ((REFERENCE - REFERENCE * 0.9) / (REFERENCE * 1.6)) * 170} y2={190 - ((REFERENCE - REFERENCE * 0.9) / (REFERENCE * 1.6)) * 170} stroke={C.vert} strokeDasharray="4 3" />
            <text x="225" y="12" fontSize="11" fill="var(--texte-doux)">coût au fil des itérations (première graine)</text>
          </svg>
          <Bilan ok={res.ecart <= 0.08}>Longueur moyenne : {res.moy.toFixed(2)}, meilleure connue : {REFERENCE.toFixed(2)}, écart : {(res.ecart * 100).toFixed(1)} %. {res.ecart <= 0.08 ? "Objectif atteint : la température était assez haute pour explorer, et elle a eu le temps de redescendre." : t0 * alpha ** 3000 > 0.05 ? "La température est encore élevée à la fin : la recherche accepte toujours des dégradations et n'a pas eu le temps de se stabiliser. Refroidissez plus vite (α plus petit) ou partez de moins haut." : t0 < 0.2 ? "La température de départ est trop basse : presque aucune dégradation n'est acceptée, la recherche se comporte comme une simple descente et reste dans un minimum local." : "La température chute trop vite : la phase d'exploration est trop courte. Ralentissez le refroidissement (α plus proche de 1)."}</Bilan>
        </>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ Politique
// Grille 5 × 4 : S départ, G objectif, X zone interdite (fin de mission), # mur.
const PG = ['....G', '.XX..', '.#...', 'S....'];
const FL = { N: '↑', E: '→', S: '↓', O: '←' }; const ORDRE = ['N', 'E', 'S', 'O'];
const typeCase = (x, y) => (PG[y] && PG[y][x]) || '#';
const LATERAL = { N: ['O', 'E'], S: ['E', 'O'], E: ['N', 'S'], O: ['S', 'N'] };
function deplacer(x, y, a) { const [dx, dy] = DIRS[a]; const t = typeCase(x + dx, y + dy); return t === '#' ? [x, y] : [x + dx, y + dy]; }
export function AtelierPolitique({ surReussite }) {
  const [pol, setPol] = useState({}); const [res, setRes] = useState(null);
  const cases = []; PG.forEach((l, y) => [...l].forEach((ch, x) => { if (ch === '.' || ch === 'S') cases.push([x, y]); }));
  const cle = (x, y) => `${x},${y}`;
  const tourner = (x, y) => { const a = pol[cle(x, y)]; setPol({ ...pol, [cle(x, y)]: ORDRE[(ORDRE.indexOf(a) + 1) % 4] }); setRes(null); };
  const tester = () => {
    if (cases.some(([x, y]) => !pol[cle(x, y)])) { setRes({ incomplet: true }); return; }
    // 1. Sans aléa, depuis chaque case : la politique mène-t-elle à l'objectif ?
    let echec = null;
    for (const [sx, sy] of cases) { let [x, y] = [sx, sy]; let fin = null; for (let t = 0; t < 25 && !fin; t++) { [x, y] = deplacer(x, y, pol[cle(x, y)]); const tc = typeCase(x, y); if (tc === 'G') fin = 'G'; else if (tc === 'X') fin = 'X'; } if (fin !== 'G') { echec = { de: [sx, sy], fin }; break; } }
    // 2. Avec glissement (10 % à gauche, 10 % à droite), 400 missions depuis le départ.
    const g = alea(4130); let ok = 0; let chutes = 0;
    for (let e = 0; e < 400; e++) { let [x, y] = [0, 3]; let fin = null; for (let t = 0; t < 40 && !fin; t++) { const a = pol[cle(x, y)]; const r = g(); const reel = r < 0.1 ? LATERAL[a][0] : r < 0.2 ? LATERAL[a][1] : a; [x, y] = deplacer(x, y, reel); const tc = typeCase(x, y); if (tc === 'G') fin = 'G'; else if (tc === 'X') fin = 'X'; } if (fin === 'G') ok++; else if (fin === 'X') chutes++; }
    const r = { echec, taux: ok / 400, chutes: chutes / 400 }; setRes(r); if (!echec && r.taux >= 0.9) surReussite();
  };
  const c = 62;
  return (
    <div className="atelier">
      <p>Définissez une politique : cliquez sur chaque case pour choisir l'action que le robot y exécutera. L'objectif est en vert, la zone rouge met fin à la mission. Attention : une fois sur dix le robot dévie à gauche de la direction voulue, une fois sur dix à droite.</p>
      <svg viewBox={`0 0 ${5 * c} ${4 * c}`} className="grille-edit politique" role="img" aria-label="Politique à définir">
        {PG.map((l, y) => [...l].map((ch, x) => (
          <g key={cle(x, y)} onClick={() => (ch === '.' || ch === 'S') && tourner(x, y)} style={{ cursor: ch === '.' || ch === 'S' ? 'pointer' : 'default' }} data-case={cle(x, y)}>
            <rect x={x * c + 2} y={y * c + 2} width={c - 4} height={c - 4} rx="6" fill={ch === '#' ? 'var(--plan-mur)' : ch === 'X' ? C.rouge : ch === 'G' ? C.vert : 'var(--plan-sol)'} />
            <text x={x * c + c / 2} y={y * c + c / 2 + 10} textAnchor="middle" fontSize="28" fontWeight="700" fill={ch === 'G' || ch === 'X' ? '#fff' : 'var(--texte)'}>{ch === 'G' ? '★' : ch === 'X' ? '✕' : ch === '#' ? '' : FL[pol[cle(x, y)]] || '·'}</text>
            {ch === 'S' && <text x={x * c + 9} y={y * c + 18} fontSize="11" fill={C.bleu} fontWeight="700">départ</text>}
          </g>
        )))}
      </svg>
      <button className="bouton" onClick={tester} data-testid="verifier">Tester ma politique</button>
      {res && (
        <Bilan ok={!res.incomplet && !res.echec && res.taux >= 0.9}>
          {res.incomplet ? "Une politique doit donner une action dans chaque situation possible : il reste des cases sans flèche (marquées d'un point)." : res.echec ? `Sans aucun aléa, en partant de la case (colonne ${res.echec.de[0] + 1}, ligne ${res.echec.de[1] + 1}), votre politique ${res.echec.fin === 'X' ? 'conduit dans la zone interdite' : "tourne en rond ou bute contre un mur sans jamais atteindre l'objectif"}. Suivez les flèches depuis cette case pour trouver l'erreur.` : `Sans aléa, toutes les cases mènent à l'objectif. Avec glissement, 400 missions depuis le départ : ${Math.round(res.taux * 100)} % de réussite, ${Math.round(res.chutes * 100)} % de chutes dans la zone interdite. ${res.taux >= 0.9 ? "Votre politique est correcte et robuste : elle tient compte de ce qui peut mal tourner, pas seulement du chemin le plus court." : "Votre politique longe la zone interdite : chaque déviation latérale y fait tomber le robot. Une bonne politique tient compte des transitions incertaines. Cherchez un trajet qui s'en tient éloigné."}`}
        </Bilan>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- Récompenses
const RG = ['S.X.G', '..X..', '.....'];
export function AtelierRecompenses({ surReussite }) {
  const [rObj, setRObj] = useState(0); const [rZone, setRZone] = useState(0); const [rPas, setRPas] = useState(0); const [res, setRes] = useState(null);
  const tc = (x, y) => (RG[y] && RG[y][x]) || '#';
  const calculer = () => {
    const gamma = 0.95; let V = RG.map((l) => [...l].map(() => 0));
    const q = (x, y, a, Vc) => { const [dx, dy] = DIRS[a]; const t = tc(x + dx, y + dy); const [nx, ny] = t === '#' ? [x, y] : [x + dx, y + dy]; const tt = tc(nx, ny); const r = rPas + (tt === 'G' ? rObj : 0) + (tt === 'X' ? rZone : 0); return r + (tt === 'G' ? 0 : gamma * Vc[ny][nx]); };
    for (let it = 0; it < 200; it++) V = V.map((l, y) => l.map((_, x) => (tc(x, y) === 'G' ? 0 : Math.max(...ORDRE.map((a) => q(x, y, a, V))))));
    const pol = V.map((l, y) => l.map((_, x) => { const vals = ORDRE.map((a) => q(x, y, a, V)); const m = Math.max(...vals); return vals.every((v) => Math.abs(v - m) < 1e-9) ? null : ORDRE[vals.indexOf(m)]; }));
    let [x, y] = [0, 0]; const chemin = [[0, 0]]; let arrive = false; let zone = false;
    for (let t = 0; t < 20 && !arrive; t++) { const a = pol[y][x]; if (!a) break; const [dx, dy] = DIRS[a]; if (tc(x + dx, y + dy) === '#') break; x += dx; y += dy; chemin.push([x, y]); if (tc(x, y) === 'X') zone = true; arrive = tc(x, y) === 'G'; }
    const r = { V, pol, chemin, arrive, zone }; setRes(r); if (arrive && !zone) surReussite();
  };
  const c = 62; const vmax = res ? Math.max(0.001, ...res.V.flat().map(Math.abs)) : 1;
  const curseur = (nom, val, set, min, max) => (<label className="curseur">{nom} = <b>{val}</b><input type="range" min={min} max={max} step="1" value={val} onChange={(e) => { set(Number(e.target.value)); setRes(null); }} aria-label={nom} /></label>);
  return (
    <div className="atelier deux">
      <div>
        <p>Vous ne programmez pas le trajet : vous fixez les récompenses, et l'agent en déduit sa politique. La zone orange est un sol fragile, que le robot peut traverser mais qu'il doit éviter. Réglez les trois récompenses pour que la politique apprise mène à l'objectif en contournant cette zone.</p>
        {curseur("Atteindre l'objectif", rObj, setRObj, 0, 10)}{curseur('Entrer dans la zone fragile', rZone, setRZone, -10, 0)}{curseur('Chaque pas', rPas, setRPas, -3, 0)}
        <button className="bouton" onClick={calculer} data-testid="verifier">Calculer la politique apprise</button>
      </div>
      <div>
        <svg viewBox={`0 0 ${5 * c} ${3 * c}`} role="img" aria-label="Politique apprise">
          {RG.map((l, y) => [...l].map((ch, x) => (
            <g key={`${x}-${y}`}>
              <rect x={x * c + 2} y={y * c + 2} width={c - 4} height={c - 4} rx="6" fill={ch === 'X' ? C.orange : ch === 'G' ? C.vert : 'var(--plan-sol)'} />
              {res && ch !== 'G' && <rect x={x * c + 2} y={y * c + 2} width={c - 4} height={c - 4} rx="6" fill={res.V[y][x] >= 0 ? C.vert : C.rouge} opacity={ch === 'X' ? 0 : 0.5 * Math.abs(res.V[y][x]) / vmax} />}
              <text x={x * c + c / 2} y={y * c + c / 2 + 9} textAnchor="middle" fontSize="26" fontWeight="700" fill={ch === 'G' ? '#fff' : 'var(--texte)'}>{ch === 'G' ? '★' : res ? FL[res.pol[y][x]] || '?' : ch === 'S' ? '●' : ''}</text>
            </g>
          )))}
          {res && <polyline points={res.chemin.map(([x, y]) => `${x * c + c / 2},${y * c + c / 2 + 18}`).join(' ')} fill="none" stroke={C.bleu} strokeWidth="4" strokeLinecap="round" opacity="0.8" />}
        </svg>
        {res && <Bilan ok={res.arrive && !res.zone}>{!res.arrive ? "La politique apprise ne mène pas à l'objectif (les « ? » signalent des cases où aucune action n'est meilleure qu'une autre). Sans récompense à l'objectif, l'agent n'a aucune raison d'y aller." : res.zone ? "L'agent atteint l'objectif en traversant la zone fragile : c'est le chemin le plus court, et rien dans vos récompenses ne le décourage assez. Il fait exactement ce que vous avez récompensé, pas ce que vous vouliez." : "L'agent contourne la zone fragile et atteint l'objectif. Vous n'avez écrit aucune règle de trajet : le comportement découle entièrement des récompenses que vous avez conçues."}</Bilan>}
      </div>
    </div>
  );
}

export const ATELIERS = { formulaire: Formulaire, parsons: Parsons, regles: AtelierRegles, neurone: AtelierNeurone, gradient: AtelierGradient, piege: AtelierPiege, contraintes: AtelierContraintes, recuit: AtelierRecuit, politique: AtelierPolitique, recompenses: AtelierRecompenses };
