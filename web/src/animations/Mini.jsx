// Mini-animations du module 0 : une notion, une animation en boucle.
// Chaque fonction reçoit t entre 0 et 1 (position dans la boucle) et retourne un dessin SVG.
import { COUL, seuil, doux } from '../composants/Animation.jsx';

const T = { fill: 'var(--texte)', fontSize: 13 };
const D = { fill: 'var(--texte-doux)', fontSize: 12 };
const Cadre = ({ children }) => <svg viewBox="0 0 440 230" role="img">{children}</svg>;
const robot = (x, y, r = 11) => <circle cx={x} cy={y} r={r} fill={COUL.bleu} stroke="#fff" strokeWidth="2" />;
// Générateur pseudo-aléatoire à graine : les animations sont reproductibles.
const F = (x, n) => x.toFixed(n).replace('.', ',');
const alea = (graine) => { let s = graine; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; };

export function Regles(t) {
  const temp = 40 + 55 * doux(seuil(t, 0.05, 0.7));
  const franchi = temp > 85;
  return (
    <Cadre>
      <text x="20" y="28" {...T} fontWeight="700">Température du moteur : {Math.round(temp)} °C</text>
      <rect x="20" y="42" width="400" height="18" rx="9" fill="var(--plan-sol)" />
      <rect x="20" y="42" width={400 * (temp / 100)} height="18" rx="9" fill={franchi ? COUL.rouge : COUL.bleu} />
      <line x1={20 + 340} y1="34" x2={20 + 340} y2="68" stroke={COUL.noir} strokeWidth="2" strokeDasharray="4 3" />
      <text x={360} y="84" textAnchor="middle" {...D}>seuil 85 °C</text>
      {[['R1', 'si température > 85 °C alors ARRÊT', franchi], ['R2', 'si batterie < 20 % alors RALENTIR', false], ['R3', 'sinon CONTINUER', !franchi]].map(([id, txt, actif], i) => (
        <g key={id}>
          <rect x="20" y={100 + i * 40} width="400" height="32" rx="8" fill={actif ? COUL.jaune : 'var(--carte)'} stroke={actif ? COUL.noir : 'var(--bord)'} />
          <text x="34" y={121 + i * 40} fontSize="13" fill={actif ? '#0D0D0D' : 'var(--texte)'}><tspan fontWeight="700">{id}</tspan>  {txt}</text>
        </g>
      ))}
    </Cadre>
  );
}

export function Bayes(t) {
  const phase = t < 0.3 ? 0 : t < 0.6 ? 1 : 2;
  const g = alea(7);
  // Effectifs exacts de la leçon : 9 pannes détectées sur 10, 19 fausses alertes sur 190 robots sains.
  const sains = Array.from({ length: 190 }, (_, i) => [g(), i]).sort((x, y) => x[0] - y[0]).slice(0, 19).map((x) => x[1] + 10);
  const pts = Array.from({ length: 200 }, (_, i) => { const malade = i < 10; return { malade, positif: malade ? i < 9 : sains.includes(i) }; });
  const vp = pts.filter((p) => p.malade && p.positif).length;
  const fp = pts.filter((p) => !p.malade && p.positif).length;
  return (
    <Cadre>
      {pts.map((p, i) => {
        const x = 20 + (i % 25) * 16; const y = 20 + Math.floor(i / 25) * 16;
        const coul = p.malade ? COUL.rouge : COUL.gris;
        return <g key={i}><circle cx={x} cy={y} r="5" fill={coul} opacity={phase === 2 && !p.positif ? 0.15 : 1} />{phase >= 1 && p.positif && <circle cx={x} cy={y} r="7.5" fill="none" stroke={COUL.noir} strokeWidth="1.6" />}</g>;
      })}
      <text x="20" y="170" {...T}><tspan fill={COUL.rouge} fontWeight="700">●</tspan> 10 pannes réelles sur 200 robots (prévalence 5 %)</text>
      {phase >= 1 && <text x="20" y="190" {...T}>◯ test positif : sensibilité 90 %, fausses alertes 10 %</text>}
      {phase === 2 && <text x="20" y="214" {...T} fontWeight="700">P(panne | test positif) = {vp} / ({vp} + {fp}) = {Math.round((vp / (vp + fp)) * 100)} %</text>}
    </Cadre>
  );
}

export function Reseau(t) {
  const ev = seuil(t, 0.25, 0.3);
  const pu = 0.25 + 0.477 * doux(seuil(t, 0.3, 0.55));
  const ps = 0.225 + 0.235 * doux(seuil(t, 0.55, 0.8));
  const noeud = (x, y, nom, p, observe) => (
    <g>
      <rect x={x - 70} y={y - 24} width="140" height="48" rx="24" fill={observe ? COUL.jaune : 'var(--carte)'} stroke={COUL.bleu} strokeWidth="2" />
      <text x={x} y={y - 4} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={observe ? '#0D0D0D' : 'var(--texte)'}>{nom}</text>
      <rect x={x - 46} y={y + 6} width="92" height="7" rx="3.5" fill="var(--plan-sol)" />
      <rect x={x - 46} y={y + 6} width={92 * p} height="7" rx="3.5" fill={COUL.orange} />
      <text x={x + 78} y={y + 4} {...D} fontWeight="700">{Math.round(p * 100)} %</text>
    </g>
  );
  return (
    <Cadre>
      <line x1="220" y1="64" x2="120" y2="136" stroke={COUL.gris} strokeWidth="2" />
      <line x1="220" y1="64" x2="320" y2="136" stroke={COUL.gris} strokeWidth="2" />
      {noeud(220, 44, 'Usure (cachée)', pu, false)}
      {noeud(110, 160, 'Vibration', ev ? 1 : 0.275, ev > 0)}
      {noeud(310, 160, 'Surchauffe', ps, false)}
      <text x="220" y="216" textAnchor="middle" {...D}>{ev ? 'Vibration observée : la cause, puis l\'autre effet, deviennent plus probables' : 'Avant toute observation : probabilités a priori'}</text>
    </Cadre>
  );
}

export function Supervise(t) {
  const g = alea(11);
  const pts = Array.from({ length: 46 }, (_, i) => { const c = i % 2; return { x: 60 + g() * 150 + c * 150, y: 30 + g() * 130 - c * 20 + (1 - c) * 20, c }; });
  const a = doux(seuil(t, 0.05, 0.8));
  const angle = (-70 + 62 * a) * (Math.PI / 180);
  const cx = 220; const cy = 95; const dx = Math.sin(angle); const dy = Math.cos(angle);
  // Erreur réelle : part des points situés du mauvais côté de la frontière.
  const cote = (p) => ((p.x - cx) * dy - (p.y - cy) * dx > 0 ? 1 : 0);
  const faux = pts.filter((p) => cote(p) !== p.c).length;
  const L = Math.min(90 / Math.abs(dy || 1e-6), 150);
  return (
    <Cadre>
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="5" fill={p.c ? COUL.rouge : COUL.bleu} stroke={cote(p) !== p.c ? COUL.noir : 'none'} strokeWidth="2" />)}
      <line x1={cx - L * dx} y1={cy - L * dy} x2={cx + L * dx} y2={cy + L * dy} stroke={COUL.noir} strokeWidth="2.5" />
      <text x="20" y="204" {...T}><tspan fill={COUL.bleu} fontWeight="700">●</tspan> continuer  <tspan fill={COUL.rouge} fontWeight="700">●</tspan> arrêter  <tspan fontWeight="700">▬</tspan> frontière  ◯ mal classé</text>
      <text x="20" y="222" {...T}>Époque {Math.round(a * 40)} : <tspan fontWeight="700">{faux}</tspan> points mal classés sur {pts.length}, erreur {Math.round((faux / pts.length) * 100)} %</text>
    </Cadre>
  );
}

export function AgentEnv(t) {
  const p = (t * 2) % 1; const aller = t < 0.5;
  return (
    <Cadre>
      <rect x="20" y="60" width="150" height="110" rx="12" fill="var(--carte)" stroke={COUL.noir} strokeWidth="2.5" />
      <text x="95" y="120" textAnchor="middle" {...T} fontWeight="700">Environnement</text>
      <rect x="270" y="60" width="150" height="110" rx="12" fill="var(--carte)" stroke={COUL.bleu} strokeWidth="2.5" />
      <text x="345" y="120" textAnchor="middle" {...T} fontWeight="700">Agent</text>
      <line x1="172" y1="90" x2="268" y2="90" stroke="#9a8f00" strokeWidth="2.5" />
      <line x1="268" y1="140" x2="172" y2="140" stroke={COUL.vert} strokeWidth="2.5" />
      <text x="220" y="46" textAnchor="middle" {...D}>perception, par les capteurs</text>
      <text x="220" y="192" textAnchor="middle" {...D}>action, par les effecteurs</text>
      <circle cx={aller ? 172 + 96 * p : 268 - 96 * p} cy={aller ? 90 : 140} r="7" fill={aller ? COUL.jaune : COUL.vert} stroke={COUL.noir} />
    </Cadre>
  );
}

const GRILLE = ['##########', '#........#', '#..##....#', '#..##..#.#', '#......#.#', '##########'];
const libre = (x, y) => GRILLE[y] && GRILLE[y][x] === '.';
const Carte = ({ c = 34, children }) => (
  <g transform="translate(50 3)">
    {GRILLE.map((l, y) => [...l].map((ch, x) => <rect key={`${x}-${y}`} x={x * c} y={y * c} width={c - 1} height={c - 1} rx="3" fill={ch === '#' ? 'var(--plan-mur)' : 'var(--plan-sol)'} />))}
    {children}
  </g>
);

export function Lidar(t) {
  const c = 34; const rx = 5; const ry = 3; const portee = doux(seuil(t, 0.05, 0.6));
  const dirs = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
  return (
    <Cadre>
      <Carte>
        {dirs.map(([dx, dy], i) => {
          let d = 1; while (d < 5 && libre(rx + d * dx, ry + d * dy)) d++;
          const l = Math.min(d, 5 * portee + 0.01);
          const touche = l >= d && d < 5;
          return (
            <g key={i}>
              <line x1={rx * c + c / 2} y1={ry * c + c / 2} x2={(rx + l * dx) * c + c / 2} y2={(ry + l * dy) * c + c / 2} stroke={COUL.jaune} strokeWidth="3" />
              {touche && <circle cx={(rx + (d - 0.45) * dx) * c + c / 2} cy={(ry + (d - 0.45) * dy) * c + c / 2} r="5" fill={COUL.rouge} />}
              {touche && t > 0.65 && <text x={(rx + 0.62 * dx) * c + c / 2 + dx * 6} y={(ry + 0.62 * dy) * c + c / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={COUL.noir} stroke="#fff" strokeWidth="3" paintOrder="stroke">{d}</text>}
            </g>
          );
        })}
        {robot(rx * c + c / 2, ry * c + c / 2)}
      </Carte>
      <text x="220" y="225" textAnchor="middle" {...D}>8 rayons : chacun retourne la distance au premier obstacle</text>
    </Cadre>
  );
}

export function EtatObs(t) {
  const c = 34; const k = t < 0.33 ? 0 : t < 0.66 ? 1 : 2;
  // Trois mesures successives du même monde immobile : l'erreur change à chaque fois.
  const palette = [[5, 1], [7, 1], [6, 2]][k]; const cru = [[1, 1], [2, 2], [3, 1]][k];
  return (
    <Cadre>
      <Carte>
        <rect x={6 * c + 5} y={1 * c + 5} width={c - 11} height={c - 11} rx="4" fill={COUL.rouge} />
        <rect x={palette[0] * c + 3} y={palette[1] * c + 3} width={c - 7} height={c - 7} rx="4" fill="none" stroke={COUL.rouge} strokeWidth="2.5" strokeDasharray="5 4" />
        {robot(2 * c + c / 2, 1 * c + c / 2)}
        <circle cx={cru[0] * c + c / 2} cy={cru[1] * c + c / 2} r="13" fill="none" stroke={COUL.bleu} strokeWidth="2" strokeDasharray="4 3" />
      </Carte>
      <text x="220" y="225" textAnchor="middle" {...D}>Mesure {k + 1}. Plein : état réel. Pointillés : ce que les capteurs rapportent</text>
    </Cadre>
  );
}

export function Boucle(t) {
  const noms = ['Percevoir', 'Décider', 'Agir']; const cs = ['#9a8f00', COUL.bleu, COUL.vert];
  const pos = (k) => [220 + 120 * Math.cos((k / 3) * 2 * Math.PI - Math.PI / 2), 112 + 78 * Math.sin((k / 3) * 2 * Math.PI - Math.PI / 2)];
  const tours = t * 3; const actif = Math.floor(tours) % 3;
  const ang = (tours / 3) * 2 * Math.PI - Math.PI / 2;
  return (
    <Cadre>
      <ellipse cx="220" cy="112" rx="120" ry="78" fill="none" stroke="var(--bord)" strokeWidth="2" />
      <circle cx={220 + 120 * Math.cos(ang)} cy={112 + 78 * Math.sin(ang)} r="8" fill={COUL.jaune} stroke={COUL.noir} />
      {noms.map((n, k) => { const [x, y] = pos(k); return (
        <g key={n}><rect x={x - 54} y={y - 18} width="108" height="36" rx="10" fill={actif === k ? cs[k] : 'var(--carte)'} stroke={cs[k]} strokeWidth="2.5" />
          <text x={x} y={y + 5} textAnchor="middle" fontSize="13.5" fontWeight="700" fill={actif === k ? '#fff' : 'var(--texte)'}>{n}</text></g>); })}
      <text x="220" y="108" textAnchor="middle" {...D}>un tour de boucle</text>
      <text x="220" y="124" textAnchor="middle" {...D}>= un pas de temps</text>
    </Cadre>
  );
}

const PIEGE = ['###########', '#.........#', '#....###..#', '#......#..#', '#....###..#', '###########'];
export function Reactif(t) {
  const c = 34; const etapes = [[1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [6, 3], [5, 3], [6, 3], [5, 3], [6, 3], [5, 3]];
  const i = Math.min(etapes.length - 1, Math.floor(t * etapes.length)); const [x, y] = etapes[i];
  return (
    <Cadre>
      <g transform="translate(33 3)">
        {PIEGE.map((l, yy) => [...l].map((ch, xx) => <rect key={`${xx}-${yy}`} x={xx * c} y={yy * c} width={c - 1} height={c - 1} rx="3" fill={ch === '#' ? 'var(--plan-mur)' : 'var(--plan-sol)'} />))}
        <rect x={9 * c + 6} y={3 * c + 6} width={c - 13} height={c - 13} rx="4" fill={COUL.vert} />
        <polyline points={etapes.slice(0, i + 1).map(([a, b]) => `${a * c + c / 2},${b * c + c / 2}`).join(' ')} fill="none" stroke={COUL.bleu} strokeWidth="2.5" opacity="0.5" />
        {robot(x * c + c / 2, y * c + c / 2)}
      </g>
      <text x="220" y="225" textAnchor="middle" {...D}>{i < 6 ? 'Règle : avancer vers l\'objectif tant que la voie est libre' : 'Cul-de-sac : sans mémoire ni plan, l\'agent oscille'}</text>
    </Cadre>
  );
}

// A* calculé en direct sur la petite carte.
function aEtoile(dep, arr, bloque = null) {
  const h = (p) => Math.abs(p[0] - arr[0]) + Math.abs(p[1] - arr[1]);
  const cle = (p) => `${p[0]},${p[1]}`;
  const ouverts = [{ p: dep, g: 0 }]; const parents = { [cle(dep)]: null }; const couts = { [cle(dep)]: 0 }; const ordre = [];
  while (ouverts.length) {
    ouverts.sort((a, b) => a.g + h(a.p) - (b.g + h(b.p)) || h(a.p) - h(b.p));
    const { p, g } = ouverts.shift(); ordre.push(p);
    if (p[0] === arr[0] && p[1] === arr[1]) { const chemin = []; let k = cle(p); while (k) { chemin.unshift(k.split(',').map(Number)); k = parents[k]; } return { ordre, chemin }; }
    for (const [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) {
      const v = [p[0] + dx, p[1] + dy];
      if (!libre(v[0], v[1]) || (bloque && cle(v) === cle(bloque))) continue;
      if (couts[cle(v)] === undefined || g + 1 < couts[cle(v)]) { couts[cle(v)] = g + 1; parents[cle(v)] = cle(p); ouverts.push({ p: v, g: g + 1 }); }
    }
  }
  return { ordre, chemin: [] };
}
const AE = aEtoile([1, 4], [8, 4]);
export function AEtoile(t) {
  const c = 34; const n = Math.round(seuil(t, 0.05, 0.65) * AE.ordre.length); const fini = t > 0.68;
  return (
    <Cadre>
      <Carte>
        {AE.ordre.slice(0, n).map(([x, y], i) => <rect key={i} x={x * c + 3} y={y * c + 3} width={c - 7} height={c - 7} rx="3" fill={COUL.jaune} opacity="0.55" />)}
        {fini && <polyline points={AE.chemin.map(([x, y]) => `${x * c + c / 2},${y * c + c / 2}`).join(' ')} fill="none" stroke={COUL.vert} strokeWidth="4" strokeLinejoin="round" />}
        <rect x={8 * c + 6} y={4 * c + 6} width={c - 13} height={c - 13} rx="4" fill={COUL.vert} />
        {robot(1 * c + c / 2, 4 * c + c / 2)}
      </Carte>
      <text x="220" y="225" textAnchor="middle" {...D}>{fini ? `Plus court chemin : ${AE.chemin.length - 1} pas, ${AE.ordre.length} cellules explorées` : `Exploration guidée : ${n} cellules visitées`}</text>
    </Cadre>
  );
}

const OBST = [5, 1]; const PLAN1 = aEtoile([1, 1], [8, 4]);
export function Hybride(t) {
  const c = 34; const k1 = PLAN1.chemin.findIndex((p) => p[0] === OBST[0] && p[1] === OBST[1]);
  const arret = Math.max(1, k1 - 1); const depuis = PLAN1.chemin[arret];
  const plan2 = aEtoile(depuis, [8, 4], OBST).chemin;
  // Phase 1 : suivi du plan initial. Phase 2 : la palette tombe, le robot arrive à son contact.
  // Phase 3 : nouveau plan, détour jusqu'à l'objectif.
  const ph = t < 0.2 ? 0 : t < 0.4 ? 1 : 2;
  const pos = ph === 0 ? PLAN1.chemin[Math.min(arret - 1, Math.floor((t / 0.2) * arret))] : ph === 1 ? PLAN1.chemin[t < 0.3 ? arret - 1 : arret] : plan2[Math.min(plan2.length - 1, Math.floor(seuil(t, 0.4, 0.93) * plan2.length))];
  const plan = ph === 2 ? plan2 : PLAN1.chemin;
  return (
    <Cadre>
      <Carte>
        <polyline points={plan.map(([a, b]) => `${a * c + c / 2},${b * c + c / 2}`).join(' ')} fill="none" stroke={COUL.vert} strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
        {ph >= 1 && <rect x={OBST[0] * c + 5} y={OBST[1] * c + 5} width={c - 11} height={c - 11} rx="4" fill="#b5651d" />}
        {ph === 1 && t >= 0.3 && <line x1={pos[0] * c + c / 2} y1={pos[1] * c + c / 2} x2={OBST[0] * c + 4} y2={OBST[1] * c + c / 2} stroke={COUL.jaune} strokeWidth="4" />}
        <rect x={8 * c + 6} y={4 * c + 6} width={c - 13} height={c - 13} rx="4" fill={COUL.vert} />
        {robot(pos[0] * c + c / 2, pos[1] * c + c / 2)}
      </Carte>
      <text x="220" y="225" textAnchor="middle" {...D}>{ph === 0 ? 'Couche délibérative : un plan complet' : ph === 1 ? (t < 0.3 ? 'Une palette tombe sur le trajet prévu' : 'Couche réactive : le lidar signale la case occupée') : 'Plan recalculé depuis la position courante'}</text>
    </Cadre>
  );
}

export function Espace(t) {
  const g = alea(5); const couts = Array.from({ length: 24 }, () => 62 + g() * 38); couts[3] = 55; couts[9] = 46; couts[17] = 31;
  const n = Math.max(1, Math.round(seuil(t, 0.03, 0.8) * 24)); const meilleur = couts.slice(0, n).indexOf(Math.min(...couts.slice(0, n)));
  return (
    <Cadre>
      <text x="20" y="24" {...T} fontWeight="700">Coût de chaque ordre de visite essayé</text>
      {couts.slice(0, n).map((v, i) => <rect key={i} x={22 + i * 16.6} y={180 - v * 1.4} width="12" height={v * 1.4} rx="2" fill={i === meilleur ? COUL.vert : COUL.gris} />)}
      <line x1="20" y1="180" x2="420" y2="180" stroke="var(--texte-doux)" />
      <text x="20" y="204" {...T}>{n} ordres évalués sur 24, meilleur coût : <tspan fontWeight="700">{Math.round(couts[meilleur])}</tspan></text>
      <text x="20" y="222" {...D}>Avec 9 stations : 362 880 ordres possibles.</text>
    </Cadre>
  );
}

// Retour arrière sur 4 bornes de recharge : aucune sur la même ligne, colonne ou diagonale.
const PAS = (() => { const pas = []; const col = [];
  const ok = (r, c) => col.every((cc, rr) => cc !== c && Math.abs(cc - c) !== Math.abs(rr - r));
  const poser = (r) => { if (r === 4) return true; for (let c = 0; c < 4; c++) { const valide = ok(r, c); pas.push({ col: [...col, c], valide }); if (valide) { col.push(c); if (poser(r + 1)) return true; col.pop(); pas.push({ col: [...col], valide: true, retour: true }); } } return false; };
  poser(0); return pas; })();
export function Contraintes(t) {
  const i = Math.min(PAS.length - 1, Math.floor(seuil(t, 0.02, 0.9) * PAS.length)); const e = PAS[i]; const c = 44;
  const fini = i === PAS.length - 1;
  return (
    <Cadre>
      <g transform="translate(30 14)">
        {Array.from({ length: 16 }, (_, k) => <rect key={k} x={(k % 4) * c} y={Math.floor(k / 4) * c} width={c - 2} height={c - 2} rx="4" fill="var(--plan-sol)" />)}
        {e.col.map((cc, r) => { const dernier = r === e.col.length - 1; return <circle key={r} cx={cc * c + c / 2 - 1} cy={r * c + c / 2 - 1} r="14" fill={dernier && !e.valide ? COUL.rouge : fini ? COUL.vert : COUL.bleu} />; })}
      </g>
      <text x="230" y="50" {...T} fontWeight="700">Essai {i + 1} sur {PAS.length}</text>
      <text x="230" y="78" {...T}>{fini ? 'Solution trouvée' : e.retour ? 'Impasse : retour arrière' : e.valide ? 'Placement admissible' : 'Contrainte non respectée'}</text>
      <text x="230" y="120" {...D}>4 bornes de recharge,</text>
      <text x="230" y="138" {...D}>jamais deux sur la même</text>
      <text x="230" y="156" {...D}>ligne, colonne ou diagonale.</text>
      <text x="230" y="192" {...D}>256 placements possibles,</text>
      <text x="230" y="210" {...D}>{PAS.length} essais suffisent.</text>
    </Cadre>
  );
}

const relief = (x) => 0.5 + 0.28 * Math.sin(x * 10) * Math.cos(x * 2.5) + 0.4 * (x - 0.72) ** 2;
const CREUX = (() => { let m = 0; for (let i = 0; i <= 200; i++) if (relief(i / 200) < relief(m)) m = i / 200; return m; })();
export function Recuit(t) {
  // Un coût élevé est dessiné en haut, un coût faible en bas : le meilleur point est le creux le plus profond.
  const Yc = (x) => 30 + (1 - relief(x)) * 150;
  const temp = 1 - seuil(t, 0, 0.9); const x = Math.max(0, Math.min(1, 0.06 + (CREUX - 0.06) * seuil(t, 0, 0.8) + 0.17 * temp * Math.sin(t * 46)));
  return (
    <Cadre>
      <polyline points={Array.from({ length: 101 }, (_, i) => `${20 + i * 4},${Yc(i / 100)}`).join(' ')} fill="none" stroke="var(--texte)" strokeWidth="2.5" />
      <circle cx={20 + x * 400} cy={Yc(x) - 10} r="9" fill={COUL.jaune} stroke={COUL.noir} strokeWidth="2" />
      <text x="20" y="20" {...D}>coût (haut : mauvais, bas : bon)</text>
      <rect x="20" y="186" width="400" height="10" rx="5" fill="var(--plan-sol)" />
      <rect x="20" y="186" width={400 * temp} height="10" rx="5" fill={COUL.rouge} />
      <text x="20" y="216" {...T}>T = {F(temp, 2)} : {temp > 0.5 ? 'dégradations souvent acceptées' : temp > 0.12 ? 'dégradations de plus en plus rares' : 'la solution se fige dans un creux'}</text>
    </Cadre>
  );
}

export function Croyance(t) {
  // Valeurs calculées avec le modèle de la leçon : portes aux cases 2 et 3, capteur qui annonce une porte
  // dans 95 % des cas devant une porte et 20 % devant un mur, glissement de 20 % à chaque déplacement.
  const etapes = [[0.2, 0.2, 0.2, 0.2, 0.2], [0.08, 0.38, 0.38, 0.08, 0.08], [0.016, 0.14, 0.38, 0.32, 0.144], [0.031, 0.017, 0.046, 0.624, 0.281]];
  const noms = ['Position inconnue', 'Mesure : « je vois une porte »', 'Déplacement d\'une cellule (avec glissement possible)', 'Nouvelle mesure : « je vois un mur »'];
  const f = t * etapes.length; const i = Math.min(etapes.length - 1, Math.floor(f)); const a = etapes[Math.max(0, i - 1)]; const b = etapes[i]; const p = doux(Math.min(1, (f - i) * 2));
  return (
    <Cadre>
      {b.map((v, k) => { const val = a[k] + (v - a[k]) * p; return (
        <g key={k}><rect x={40 + k * 76} y={150 - val * 160} width="56" height={val * 160} rx="5" fill={COUL.orange} />
          <text x={68 + k * 76} y={143 - val * 160} textAnchor="middle" {...D}>{F(val, 2)}</text>
          <rect x={36 + k * 76} y="158" width="64" height="26" rx="5" fill="var(--plan-sol)" stroke="var(--bord)" />
          {(k === 1 || k === 2) && <rect x={56 + k * 76} y="154" width="24" height="8" rx="2" fill={COUL.vert} />}</g>); })}
      <text x="220" y="212" textAnchor="middle" {...T} fontWeight="700">{noms[i]}</text>
    </Cadre>
  );
}

// Itérations de valeur sur une petite grille : la valeur se propage depuis l'objectif.
const QL = (() => { const W = 6; const H = 4; const mur = (x, y) => (x === 3 && y < 3); const but = [5, 0]; const g = 0.85;
  let V = Array.from({ length: H }, () => new Array(W).fill(0)); const hist = [V.map((l) => [...l])];
  for (let it = 0; it < 12; it++) { const N = V.map((l) => [...l]);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { if (mur(x, y)) continue; if (x === but[0] && y === but[1]) { N[y][x] = 1; continue; }
      let m = 0; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const a = x + dx; const b = y + dy; if (a >= 0 && a < W && b >= 0 && b < H && !mur(a, b)) m = Math.max(m, g * V[b][a]); } N[y][x] = m; }
    V = N; hist.push(V.map((l) => [...l])); }
  return { W, H, mur, but, hist }; })();
export function QLearning(t) {
  const c = 46; const i = Math.min(QL.hist.length - 1, Math.floor(seuil(t, 0.02, 0.9) * QL.hist.length)); const V = QL.hist[i];
  return (
    <Cadre>
      <g transform="translate(82 10)">
        {V.map((l, y) => l.map((v, x) => { const m = QL.mur(x, y); let fl = '';
          if (!m && v > 0 && !(x === QL.but[0] && y === QL.but[1])) { let best = -1; for (const [dx, dy, s] of [[1, 0, '→'], [-1, 0, '←'], [0, 1, '↓'], [0, -1, '↑']]) { const a = x + dx; const b = y + dy; if (a >= 0 && a < QL.W && b >= 0 && b < QL.H && !QL.mur(a, b) && V[b][a] > best) { best = V[b][a]; fl = s; } } }
          return (<g key={`${x}-${y}`}><rect x={x * c} y={y * c} width={c - 2} height={c - 2} rx="4" fill={m ? 'var(--plan-mur)' : 'var(--plan-sol)'} />
            {!m && <rect x={x * c} y={y * c} width={c - 2} height={c - 2} rx="4" fill={COUL.vert} opacity={v * 0.85} />}
            {!m && <text x={x * c + c / 2 - 1} y={y * c + c / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--texte)">{x === QL.but[0] && y === QL.but[1] ? '★' : fl}</text>}</g>); }))}
      </g>
      <text x="220" y="214" textAnchor="middle" {...D}>Itération {i} : la valeur se propage depuis l'objectif (★)</text>
    </Cadre>
  );
}

export function Exploration(t) {
  const eps = 1 - 0.92 * seuil(t, 0, 0.9); const g = alea(21); const n = Math.round(t * 60);
  const tirages = Array.from({ length: 60 }, (_, i) => { const e = 1 - 0.92 * (i / 60) / 0.9; return g() < Math.max(0.08, e) ? Math.floor(g() * 3) : 1; });
  const comptes = [0, 1, 2].map((k) => tirages.slice(0, n).filter((x) => x === k).length);
  return (
    <Cadre>
      <text x="20" y="24" {...T} fontWeight="700">ε = {F(eps, 2)} : probabilité de choisir une action au hasard</text>
      <rect x="20" y="34" width="400" height="10" rx="5" fill="var(--plan-sol)" /><rect x="20" y="34" width={400 * eps} height="10" rx="5" fill={COUL.orange} />
      {[['Couloir A', 0.4], ['Couloir B (le meilleur)', 0.9], ['Couloir C', 0.6]].map(([nom, q], k) => (
        <g key={nom}><text x="20" y={84 + k * 44} {...T}>{nom}</text>
          <rect x="190" y={72 + k * 44} width={Math.min(225, comptes[k] * 5)} height="16" rx="4" fill={k === 1 ? COUL.vert : COUL.gris} />
          <text x={196 + Math.min(225, comptes[k] * 5)} y={85 + k * 44} {...D}>{comptes[k]} essais</text></g>))}
      <text x="20" y="216" {...D}>{eps > 0.5 ? 'Début : l\'agent explore tous les couloirs' : 'Ensuite : il exploite surtout le meilleur couloir'}</text>
    </Cadre>
  );
}

export function Confiance(t) {
  const n = Math.round(10 + 1990 * seuil(t, 0.02, 0.9) ** 2); const p = 0.82; const demi = 1.96 * Math.sqrt((p * (1 - p)) / n);
  const g = alea(9); const X = (v) => 20 + v * 400;
  return (
    <Cadre>
      <text x="20" y="26" {...T} fontWeight="700">{n} simulations : taux de réussite estimé {Math.round(p * 100)} %</text>
      {Array.from({ length: Math.min(n, 300) }, (_, i) => <rect key={i} x={20 + (i % 50) * 8} y={38 + Math.floor(i / 50) * 8} width="6" height="6" rx="1" fill={g() < p ? COUL.vert : COUL.rouge} />)}
      <line x1="20" y1="140" x2="420" y2="140" stroke="var(--texte-doux)" />
      {[0, 0.25, 0.5, 0.75, 1].map((v) => <text key={v} x={X(v)} y="158" textAnchor="middle" {...D}>{v * 100} %</text>)}
      <rect x={X(Math.max(0, p - demi))} y="126" width={X(Math.min(1, p + demi)) - X(Math.max(0, p - demi))} height="14" rx="7" fill={COUL.bleu} opacity="0.4" />
      <circle cx={X(p)} cy="133" r="6" fill={COUL.bleu} />
      <text x="20" y="190" {...T}>Intervalle de confiance à 95 % : [{Math.round(Math.max(0, p - demi) * 100)} % ; {Math.round(Math.min(1, p + demi) * 100)} %]</text>
      <text x="20" y="212" {...D}>Quatre fois plus de simulations : un intervalle deux fois plus étroit.</text>
    </Cadre>
  );
}

export function Robustesse(t) {
  const x = seuil(t, 0.03, 0.92); const A = (v) => 0.99 - 0.3 * v ** 1.6; const B = (v) => (v < 0.45 ? 0.99 : Math.max(0.05, 0.99 - (v - 0.45) * 6));
  const X = (v) => 40 + v * 370; const Y = (v) => 170 - v * 140;
  const courbe = (f, coul) => <polyline points={Array.from({ length: 51 }, (_, i) => `${X(i / 50)},${Y(f(i / 50))}`).join(' ')} fill="none" stroke={coul} strokeWidth="3" />;
  return (
    <Cadre>
      <line x1="40" y1="170" x2="410" y2="170" stroke="var(--texte-doux)" /><line x1="40" y1="30" x2="40" y2="170" stroke="var(--texte-doux)" />
      {courbe(A, COUL.vert)}{courbe(B, COUL.rouge)}
      <line x1={X(x)} y1="30" x2={X(x)} y2="170" stroke={COUL.noir} strokeDasharray="4 3" />
      <circle cx={X(x)} cy={Y(A(x))} r="6" fill={COUL.vert} /><circle cx={X(x)} cy={Y(B(x))} r="6" fill={COUL.rouge} />
      <text x="225" y="190" textAnchor="middle" {...D}>niveau de perturbation (bruit, glissement, obstacles)</text>
      <text x="40" y="214" {...T}><tspan fill={COUL.vert} fontWeight="700">●</tspan> robuste : {Math.round(A(x) * 100)} % de réussite   <tspan fill={COUL.rouge} fontWeight="700">●</tspan> fragile : {Math.round(B(x) * 100)} %</text>
    </Cadre>
  );
}

export function Graine(t) {
  const marche = (graine) => { const g = alea(graine); let y = 0; return Array.from({ length: 40 }, (_, i) => { y += (g() - 0.5) * 15; return [30 + i * 9.6, y]; }); };
  const n = Math.max(2, Math.round(seuil(t, 0.03, 0.9) * 40));
  const trace = (pts, y0, coul, dash) => <polyline points={pts.slice(0, n).map(([x, y]) => `${x},${y0 + y}`).join(' ')} fill="none" stroke={coul} strokeWidth="2.5" strokeDasharray={dash} />;
  return (
    <Cadre>
      <text x="20" y="22" {...T} fontWeight="700">Même graine (4130) : deux exécutions identiques</text>
      {trace(marche(4130), 62, COUL.bleu)}{trace(marche(4130), 62, COUL.jaune, '3 6')}
      <text x="20" y="128" {...T} fontWeight="700">Graines différentes (4130 et 7) : deux histoires</text>
      {trace(marche(4130), 172, COUL.bleu)}{trace(marche(7), 172, COUL.rouge)}
      <text x="20" y="224" {...D}>Conserver la graine et les paramètres rend tout échec rejouable.</text>
    </Cadre>
  );
}

// ------------------------------------------------------------------ Leçons ajoutées
export function Neurone(t) {
  const ph = t < 0.25 ? 0 : t < 0.5 ? 1 : t < 0.75 ? 2 : 3;
  const entree = (y, nom, x, w, prod) => (
    <g>
      <circle cx="60" cy={y} r="24" fill="var(--carte)" stroke={COUL.bleu} strokeWidth="2.5" />
      <text x="60" y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--texte)">{x}</text>
      <text x="60" y={y - 32} textAnchor="middle" {...D}>{nom}</text>
      <line x1="86" y1={y} x2="232" y2="112" stroke={COUL.gris} strokeWidth={ph >= 1 ? 3 : 1.5} />
      <text x="150" y={y + (y < 112 ? -4 : 22)} textAnchor="middle" fontSize="12.5" fill={COUL.orange} fontWeight="700">poids {w}</text>
      {ph >= 1 && <text x="196" y={y < 112 ? 86 : 150} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--texte)">{prod}</text>}
    </g>
  );
  return (
    <Cadre>
      {entree(60, 'x₁ température', '0,8', '0,9', '0,72')}{entree(165, 'x₂ vibration', '0,3', '0,6', '0,18')}
      <circle cx="262" cy="112" r="32" fill={ph >= 2 ? COUL.bleu : 'var(--carte)'} stroke={COUL.bleu} strokeWidth="2.5" />
      <text x="262" y="108" textAnchor="middle" fontSize="12" fill={ph >= 2 ? '#fff' : 'var(--texte-doux)'}>somme</text>
      <text x="262" y="125" textAnchor="middle" fontSize="14" fontWeight="700" fill={ph >= 2 ? '#fff' : 'var(--texte)'}>{ph >= 2 ? '0,10' : '?'}</text>
      <text x="262" y="66" textAnchor="middle" fontSize="12.5" fill={COUL.orange} fontWeight="700">biais -0,8</text>
      <line x1="296" y1="112" x2="350" y2="112" stroke={COUL.gris} strokeWidth="2.5" />
      <rect x="350" y="88" width="76" height="48" rx="10" fill={ph >= 3 ? COUL.rouge : 'var(--carte)'} stroke={COUL.rouge} strokeWidth="2.5" />
      <text x="388" y="118" textAnchor="middle" fontSize="15" fontWeight="700" fill={ph >= 3 ? '#fff' : 'var(--texte)'}>{ph >= 3 ? '1' : '?'}</text>
      <text x="220" y="212" textAnchor="middle" {...T}>{['Deux mesures entrent dans le neurone', 'Chaque mesure est multipliée par son poids', '0,72 + 0,18 - 0,8 = 0,10', 'Somme positive : sortie 1, « arrêter »'][ph]}</text>
    </Cadre>
  );
}

export function Gradient(t) {
  const taux = 0.25; const ws = [-1]; for (let k = 0; k < 8; k++) ws.push(ws[k] - taux * 2 * (ws[k] - 3));
  const n = Math.min(8, Math.floor(t * 9)); const X = (w) => 40 + ((w + 2) / 7) * 360; const Y = (w) => 180 - ((w - 3) ** 2) * 9;
  const w = ws[n]; const pente = 2 * (w - 3);
  return (
    <Cadre>
      <polyline points={Array.from({ length: 71 }, (_, i) => { const x = -2 + i * 0.1; return `${X(x)},${Y(x)}`; }).join(' ')} fill="none" stroke="var(--texte)" strokeWidth="2.5" />
      <polyline points={ws.slice(0, n + 1).map((x) => `${X(x)},${Y(x)}`).join(' ')} fill="none" stroke={COUL.orange} strokeDasharray="4 3" />
      {ws.slice(0, n + 1).map((x, k) => <circle key={k} cx={X(x)} cy={Y(x)} r={k === n ? 8 : 4} fill={k === n ? COUL.jaune : COUL.orange} stroke={COUL.noir} strokeWidth={k === n ? 2 : 0} />)}
      <text x="250" y="22" {...T} fontWeight="700">Perte L(w) = (w - 3)²</text>
      <text x="40" y="206" {...T}>Pas {n} : w = {F(w, 2)}, pente = {F(pente, 2)}, perte = {F(((w - 3) ** 2), 2)}</text>
      <text x="40" y="224" {...D}>w ← w - 0,25 × pente : plus la pente est forte, plus le pas est grand</text>
    </Cadre>
  );
}

export function Utilite(t) {
  const p = 0.2 * t; const cont = p * 200; const arr = (1 - p) * 10; const mieux = cont < arr ? 0 : 1;
  const barre = (y, nom, v, k) => (
    <g><text x="20" y={y + 15} {...T} fontWeight={mieux === k ? 700 : 400}>{nom}</text>
      <rect x="150" y={y} width={Math.min(215, v * 5.4)} height="22" rx="5" fill={mieux === k ? COUL.vert : COUL.gris} />
      <text x={158 + Math.min(215, v * 5.4)} y={y + 16} {...T} fontWeight="700">{F(v, 1)} €</text></g>
  );
  return (
    <Cadre>
      <text x="20" y="26" {...T} fontWeight="700">Probabilité de panne : {F((p * 100), 1)} %</text>
      <rect x="20" y="36" width="400" height="10" rx="5" fill="var(--plan-sol)" /><rect x="20" y="36" width={400 * (p / 0.2)} height="10" rx="5" fill={COUL.orange} />
      <line x1={20 + 400 * (0.0476 / 0.2)} y1="30" x2={20 + 400 * (0.0476 / 0.2)} y2="52" stroke={COUL.noir} strokeWidth="2" strokeDasharray="4 3" />
      <text x={20 + 400 * (0.0476 / 0.2)} y="66" textAnchor="middle" {...D}>seuil 4,8 %</text>
      {barre(92, 'Continuer', cont, 0)}{barre(132, 'Arrêter', arr, 1)}
      <text x="20" y="176" {...D}>Coût espéré = probabilité × coût</text>
      <text x="20" y="193" {...D}>Panne non évitée : 200 €. Arrêt inutile : 10 €.</text>
      <text x="20" y="214" {...T} fontWeight="700">Décision la moins coûteuse : {mieux === 0 ? 'continuer' : 'arrêter'}</text>
    </Cadre>
  );
}

export function Recommandation(t) {
  const ph = t < 0.3 ? 0 : t < 0.6 ? 1 : 2;
  const noms = ['Ana', 'Ben', 'Chloé', 'Dan']; const notes = [[5, 4, 1, 5], [4, 5, 2, 4], [5, 5, 1, null], [1, 2, 5, 1]];
  return (
    <Cadre>
      {['Film A', 'Film B', 'Film C', 'Film D'].map((f, j) => <text key={f} x={150 + j * 68} y="24" textAnchor="middle" {...D} fontWeight="700">{f}</text>)}
      {noms.map((n, i) => (
        <g key={n} opacity={ph >= 1 && i === 3 ? 0.3 : 1}>
          <text x="30" y={58 + i * 40} {...T} fontWeight={i === 2 ? 700 : 400}>{n}</text>
          {notes[i].map((v, j) => {
            const cible = i === 2 && j === 3; const voisin = ph >= 1 && (i === 0 || i === 1);
            return (<g key={j}><rect x={122 + j * 68} y={36 + i * 40} width="56" height="32" rx="6" fill={cible ? (ph === 2 ? COUL.vert : COUL.jaune) : voisin ? 'color-mix(in srgb, #23468C 22%, var(--carte))' : 'var(--plan-sol)'} />
              <text x={150 + j * 68} y={58 + i * 40} textAnchor="middle" fontSize="15" fontWeight="700" fill={cible && ph === 2 ? '#fff' : 'var(--texte)'}>{cible ? (ph === 2 ? '4,5' : '?') : v}</text></g>);
          })}
        </g>
      ))}
      <text x="220" y="216" textAnchor="middle" {...T}>{['Chloé n\'a pas vu le film D : quelle note lui donnerait-elle ?', 'Ana et Ben ont noté les autres films comme Chloé', 'Prédiction : moyenne de leurs notes, (5 + 4) / 2 = 4,5'][ph]}</text>
    </Cadre>
  );
}

export function Mdp(t) {
  const ph = t < 0.25 ? 0 : t < 0.5 ? 1 : t < 0.75 ? 2 : 3; const c = 56; const ox = 120; const oy = 14;
  const cell = (x, y, f) => <rect x={ox + x * c + 2} y={oy + y * c + 2} width={c - 4} height={c - 4} rx="6" fill={f} />;
  const fl = (dx, dy, p, coul) => (<g><line x1={ox + 1.5 * c} y1={oy + 1.5 * c} x2={ox + (1.5 + dx * 0.78) * c} y2={oy + (1.5 + dy * 0.78) * c} stroke={coul} strokeWidth={2 + p * 6} strokeLinecap="round" />
    <text x={ox + (1.5 + dx * 1.0) * c + (dx ? 0 : 22)} y={oy + (1.5 + dy * 0.62) * c + (dx ? -8 : 4)} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={coul}>{Math.round(p * 100)} %</text></g>);
  return (
    <Cadre>
      {[0, 1, 2].map((y) => [0, 1, 2, 3].map((x) => <g key={`${x}-${y}`}>{cell(x, y, x === 3 && y === 1 ? COUL.vert : x === 1 && y === 2 ? COUL.rouge : 'var(--plan-sol)')}</g>))}
      <text x={ox + 3.5 * c} y={oy + 1.5 * c + 7} textAnchor="middle" fontSize="20" fill="#fff">★</text>
      {ph === 2 && <>{fl(1, 0, 0.8, COUL.bleu)}{fl(0, -1, 0.1, COUL.gris)}{fl(0, 1, 0.1, COUL.noir)}</>}
      {ph === 1 && <text x={ox + 1.5 * c + 30} y={oy + 1.5 * c + 8} fontSize="26" fontWeight="700" fill={COUL.bleu}>→</text>}
      <circle cx={ox + (ph === 3 ? 2.5 : 1.5) * c} cy={oy + 1.5 * c} r="14" fill={COUL.bleu} stroke="#fff" strokeWidth="2" />
      <text x="16" y="60" {...D}>état s</text><text x="16" y="78" {...T} fontWeight="700">case (2, 2)</text>
      {ph >= 1 && <><text x="16" y="110" {...D}>action a</text><text x="16" y="128" {...T} fontWeight="700">est</text></>}
      {ph >= 3 && <><text x="366" y="60" {...D}>récompense</text><text x="366" y="78" {...T} fontWeight="700">-0,05</text></>}
      <text x="220" y="212" textAnchor="middle" {...T}>{["L'état : tout ce qu'il faut savoir pour décider", "L'action choisie par la politique dans cet état", 'La transition est incertaine : P(s′ | s, a)', "Nouvel état, et récompense reçue pour ce pas"][ph]}</text>
    </Cadre>
  );
}
