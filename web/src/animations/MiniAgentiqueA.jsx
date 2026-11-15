// Mini-animations du bloc « Systèmes agentiques » (première partie) : familles d'agents,
// agent LLM contrôlé par des règles, diffusion de la complexité, diffusion du risque.
// Même convention que Mini.jsx : t entre 0 et 1, dessin SVG reproductible.
import { COUL, seuil } from '../composants/Animation.jsx';

const T = { fill: 'var(--texte)', fontSize: 13 };
const D = { fill: 'var(--texte-doux)', fontSize: 12 };
const Cadre = ({ children }) => <svg viewBox="0 0 440 230" role="img">{children}</svg>;
const F = (x, n) => x.toFixed(n).replace('.', ',');
const alea = (graine) => { let s = graine; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; };
const melange = (n, graine) => { const g = alea(graine); const o = Array.from({ length: n }, (_, i) => i); for (let i = n - 1; i > 0; i--) { const j = Math.floor(g() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; } return o; };

// ------------------------------------------------------------------ Familles
const REGIMES = [['Règles', 'si condition alors action'], ['Logique métier codée', 'états et transitions programmés'], ['Heuristique', 'score, priorités, choix glouton'], ['Statistique', 'modèle, score, seuil'], ['Symbolique', 'faits, relations, déductions'], ['Optimisation', 'objectif sous contraintes'], ['Apprentissage', 'politique apprise'], ['LLM', 'langage, extraction, outils']];
const GRILLE = [['Règles', '0,1 c', '5 ms', 'oui'], ['Statistique', '0,5 c', '20 ms', 'non'], ['Optimisation', '1 c', '200 ms', 'oui'], ['LLM', '3 c', '900 ms', 'non']];
export function Familles(t) {
  const ph = t < 0.3 ? 0 : t < 0.6 ? 1 : 2;
  const cellule = (x, y, haut, bas, coul) => (<g><rect x={x} y={y} width="82" height="30" rx="6" fill="var(--carte)" stroke={coul} strokeWidth="2" /><text x={x + 41} y={y + 13} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--texte)">{haut}</text><text x={x + 41} y={y + 25} textAnchor="middle" fontSize="11" fill="var(--texte-doux)">{bas}</text></g>);
  return (
    <Cadre>
      {ph === 0 && <>
        {REGIMES.map(([nom, coeur], i) => { const x = 15 + (i % 2) * 210; const y = 10 + Math.floor(i / 2) * 46; return (
          <g key={nom} opacity={seuil(t, i * 0.03, i * 0.03 + 0.04)}>
            <rect x={x} y={y} width="200" height="40" rx="8" fill="var(--carte)" stroke={i === 7 ? COUL.orange : COUL.bleu} strokeWidth="2" />
            <text x={x + 12} y={y + 17} {...T} fontWeight="700">{nom}</text><text x={x + 12} y={y + 32} fontSize="11.5" fill="var(--texte-doux)">{coeur}</text>
          </g>); })}
        <text x="220" y="212" textAnchor="middle" {...T}>Huit régimes de décision. Les combiner donne un agent hybride.</text>
      </>}
      {ph === 1 && <>
        {['Famille', 'Coût par décision', 'Délai', 'Justifiable'].map((h, j) => <text key={h} x={[24, 150, 270, 350][j]} y="26" {...D} fontWeight="700">{h}</text>)}
        {GRILLE.map((l, i) => { const actif = seuil(t, 0.32 + i * 0.06, 0.36 + i * 0.06); return (
          <g key={l[0]} opacity={0.25 + 0.75 * actif}>
            <rect x="14" y={38 + i * 38} width="412" height="30" rx="6" fill="var(--plan-sol)" />
            {l.map((v, j) => <text key={j} x={[24, 150, 270, 350][j]} y={58 + i * 38} {...T} fontWeight={j === 0 ? 700 : 400} fill={j === 3 ? (v === 'oui' ? COUL.vert : COUL.rouge) : 'var(--texte)'}>{v}</text>)}
          </g>); })}
        <text x="220" y="202" textAnchor="middle" {...D}>Ordres de grandeur retenus pour l'exemple (c : centime).</text>
        <text x="220" y="219" textAnchor="middle" {...D}>À mesurer sur vos propres cas.</text>
      </>}
      {ph === 2 && <>
        {['Extraire', 'Conformité', 'Risque', 'Planifier'].map((n, j) => <g key={n}><rect x={92 + j * 86} y="8" width="82" height="24" rx="6" fill={COUL.bleu} /><text x={133 + j * 86} y="25" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">{n}</text></g>)}
        <text x="12" y="62" {...T} fontWeight="700">Tout LLM</text>
        {[['LLM', '96 %'], ['LLM', '92 %'], ['LLM', '86 %'], ['LLM', '80 %']].map(([a, b], j) => <g key={j}>{cellule(92 + j * 86, 42, a, b, COUL.orange)}</g>)}
        <text x="92" y="92" fontSize="12.5" fontWeight="700" fill={COUL.rouge}>0,96 × 0,92 × 0,86 × 0,80 = 60,8 %  ·  12 c  ·  3,6 s</text>
        <g opacity={seuil(t, 0.68, 0.76)}>
          <text x="12" y="132" {...T} fontWeight="700">Composé</text>
          {[['LLM', '96 %'], ['Règles', '99 %'], ['Statistique', '94 %'], ['Optimisation', '99 %']].map(([a, b], j) => <g key={j}>{cellule(92 + j * 86, 112, a, b, COUL.vert)}</g>)}
          <text x="92" y="162" fontSize="12.5" fontWeight="700" fill={COUL.vert}>0,96 × 0,99 × 0,94 × 0,99 = 88,4 %  ·  4,6 c  ·  1,1 s</text>
        </g>
        <text x="220" y="196" textAnchor="middle" {...D}>Fiabilité de bout en bout  ·  coût par réclamation  ·  délai</text>
        <text x="220" y="216" textAnchor="middle" {...T}>La bonne famille se choisit étape par étape, pas une fois pour toutes</text>
      </>}
    </Cadre>
  );
}

// ----------------------------------------------------------------------- LLM
// 100 courriers : 12 extractions fausses. Le contrôle par règles en bloque 13 (9 fausses, 4 justes).
const ORDRE_LLM = melange(100, 23);
const FAUX = new Set(ORDRE_LLM.slice(0, 12)); const FAUX_BLOQUES = new Set(ORDRE_LLM.slice(0, 9)); const JUSTES_BLOQUES = new Set(ORDRE_LLM.slice(12, 16));
export function Llm(t) {
  const ph = t < 0.3 ? 0 : t < 0.6 ? 1 : 2;
  const lignes = (x, y, l, gras) => l.map((s, i) => <text key={s} x={x} y={y + i * 18} {...T} fontWeight={gras?.includes(i) ? 700 : 400}>{s}</text>);
  return (
    <Cadre>
      {ph === 0 && <>
        <rect x="14" y="16" width="190" height="150" rx="8" fill="var(--carte)" stroke={COUL.gris} strokeWidth="2" />
        <text x="26" y="36" {...D} fontWeight="700">Courrier reçu (texte libre)</text>
        {['« Madame, Monsieur,', 'je sollicite une aide de', '1 240 € pour rénover mon', 'logement. Facture jointe,', 'déposée le 12 octobre. »'].map((s, i) => <text key={s} x="26" y={60 + i * 20} fontSize="12.5" fill="var(--texte)">{s}</text>)}
        <line x1="210" y1="92" x2="238" y2="92" stroke={COUL.orange} strokeWidth="3" /><path d="M238 86 L248 92 L238 98 z" fill={COUL.orange} />
        <text x="229" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill={COUL.orange}>LLM</text>
        <g opacity={seuil(t, 0.1, 0.2)}>
          <rect x="254" y="16" width="172" height="150" rx="8" fill="var(--carte)" stroke={COUL.bleu} strokeWidth="2" />
          <text x="266" y="36" {...D} fontWeight="700">Champs extraits</text>
          {[['montant', '1 240 €'], ['catégorie', 'rénovation'], ['date', '12/10/2026'], ['pièce jointe', 'facture']].map(([k, v], i) => <text key={k} x="266" y={62 + i * 24} fontSize="12.5" fill="var(--texte)">{k} : <tspan fontWeight="700">{v}</tspan></text>)}
        </g>
        <text x="220" y="204" textAnchor="middle" {...T}>Le LLM transforme un texte libre en champs structurés</text>
      </>}
      {ph >= 1 && <>
        {Array.from({ length: 100 }, (_, i) => { const x = 24 + (i % 10) * 18; const y = 20 + Math.floor(i / 10) * 18; const faux = FAUX.has(i); const bloque = ph === 2 && (FAUX_BLOQUES.has(i) || JUSTES_BLOQUES.has(i)); return (
          <g key={i}><circle cx={x} cy={y} r="5.5" fill={faux ? COUL.rouge : COUL.bleu} opacity={bloque ? 0.35 : 1} />{bloque && <circle cx={x} cy={y} r="8" fill="none" stroke={COUL.noir} strokeWidth="1.6" />}</g>); })}
        {ph === 1 && lignes(214, 34, ['100 courriers traités', '88 extractions justes', '12 extractions fausses', '', 'Tout est exécuté :', '12 erreurs × 50 € = 600 €'], [0, 5])}
        {ph === 2 && lignes(214, 34, ['Contrôle par des règles', '13 bloqués, relus par un humain', '(9 faux et 4 justes)', '87 exécutés, dont 3 faux', '', '3 × 50 € + 13 × 3 € = 189 €'], [0, 5])}
        <circle cx="220" cy="160" r="5.5" fill={COUL.bleu} /><text x="232" y="164" {...D}>extraction juste</text>
        <circle cx="340" cy="160" r="5.5" fill={COUL.rouge} /><text x="352" y="164" {...D}>fausse</text>
        {ph === 2 && <><circle cx="220" cy="180" r="8" fill="none" stroke={COUL.noir} strokeWidth="1.6" /><text x="234" y="184" {...D}>bloqué par un contrôle</text></>}
        <text x="220" y="218" textAnchor="middle" {...T}>{ph === 1 ? 'Sans contrôle, chaque extraction fausse devient une action fausse' : 'Le LLM propose, les règles contrôlent avant toute action'}</text>
      </>}
    </Cadre>
  );
}

// ---------------------------------------------------------------- Complexité
const AGENTS = ['Ingestion', 'Extraction', 'Validation', 'Scoring', 'Synthèse'];
export function Complexite(t) {
  const ph = t < 0.3 ? 0 : t < 0.62 ? 1 : 2;
  const p = ph === 2 ? 0.99 : 0.95;
  const vus = ph === 0 ? 0 : ph === 1 ? Math.min(5, Math.floor(seuil(t, 0.32, 0.56) * 5.999)) : 5;
  const seul = t < 0.1;
  return (
    <Cadre>
      {seul ? (
        <g><rect x="13" y="34" width="410" height="44" rx="10" fill="var(--carte)" stroke={COUL.orange} strokeWidth="2.5" /><text x="218" y="61" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--texte)">Un seul agent traite tout le dossier</text></g>
      ) : AGENTS.map((n, i) => (
        <g key={n} opacity={ph === 0 ? seuil(t, 0.1 + i * 0.03, 0.14 + i * 0.03) : 1}>
          <rect x={13 + i * 84} y="34" width="74" height="44" rx="8" fill="var(--carte)" stroke={COUL.bleu} strokeWidth="2.5" />
          <text x={50 + i * 84} y="53" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--texte)">{n}</text>
          <text x={50 + i * 84} y="69" textAnchor="middle" fontSize="11.5" fill="var(--texte-doux)">{ph === 0 ? `agent ${i + 1}` : `${F(p * 100, 0)} %`}</text>
          {i < 4 && <line x1={87 + i * 84} y1="56" x2={97 + i * 84} y2="56" stroke={COUL.gris} strokeWidth="2.5" />}
          {ph === 2 && <g><circle cx={80 + i * 84} cy="34" r="9" fill={COUL.vert} /><text x={80 + i * 84} y="38.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">✓</text></g>}
        </g>
      ))}
      <text x="13" y="22" {...D}>{ph === 0 ? 'Un dossier complexe, de la réception à la décision' : '100 dossiers entrent dans la chaîne'}</text>
      {ph >= 1 && AGENTS.map((n, i) => { const reste = 100 * p ** (i + 1); return i < vus && (
        <g key={n}>
          <rect x={13 + i * 84} y="92" width="74" height="10" rx="5" fill="var(--plan-sol)" /><rect x={13 + i * 84} y="92" width={74 * reste / 100} height="10" rx="5" fill={ph === 2 ? COUL.vert : COUL.orange} />
          <text x={50 + i * 84} y="122" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--texte)">{F(reste, 1)}</text>
        </g>); })}
      {ph >= 1 && <text x="13" y="142" {...D}>dossiers encore sans erreur après chaque agent</text>}
      {ph === 1 && vus === 5 && <text x="13" y="170" {...T} fontWeight="700">0,95 × 0,95 × 0,95 × 0,95 × 0,95 = 77,4 %</text>}
      {ph === 2 && <><text x="13" y="166" {...T}>Agent contrôlé : 0,95 + 0,05 × 0,8 = 0,99</text><text x="13" y="186" {...T} fontWeight="700">0,99 × 0,99 × 0,99 × 0,99 × 0,99 = 95,1 %</text></>}
      <text x="220" y="216" textAnchor="middle" {...T}>{['Décomposer : à chaque agent une tâche, une entrée, une sortie', 'Les fiabilités se multiplient le long de la chaîne', 'Un contrôle après chaque agent rattrape 8 erreurs sur 10'][ph]}</text>
    </Cadre>
  );
}

// -------------------------------------------------------------------- Risque
// 1 000 dossiers. Erreurs indépendantes à 10 % : 243 dossiers avec un seul agent en erreur,
// 28 avec deux ou trois. Deux agents aux erreurs identiques : 100 votes faux, 90 erreurs isolées.
const ORDRE_RISQUE = melange(1000, 4130); const RANG = (() => { const r = new Array(1000); ORDRE_RISQUE.forEach((v, k) => { r[v] = k; }); return r; })();
export function Risque(t) {
  const ph = t < 0.3 ? 0 : t < 0.62 ? 1 : 2;
  const [rouges, jaunes] = ph === 1 ? [28, 243] : [100, 90];
  const agent = (y, nom, verdict, coul, k) => (
    <g opacity={seuil(t, 0.03 + k * 0.05, 0.07 + k * 0.05)}>
      <rect x="120" y={y} width="150" height="38" rx="8" fill="var(--carte)" stroke={COUL.bleu} strokeWidth="2" />
      <text x="195" y={y + 16} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--texte)">{nom}</text>
      <text x="195" y={y + 31} textAnchor="middle" fontSize="12" fontWeight="700" fill={coul}>{verdict}</text>
      <line x1="76" y1="96" x2="118" y2={y + 19} stroke={COUL.gris} strokeWidth="2" /><line x1="272" y1={y + 19} x2="318" y2="96" stroke={COUL.gris} strokeWidth="2" />
    </g>
  );
  return (
    <Cadre>
      {ph === 0 && <>
        <rect x="10" y="76" width="66" height="40" rx="8" fill={COUL.jaune} stroke={COUL.noir} /><text x="43" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0D0D0D">Dossier</text><text x="43" y="108" textAnchor="middle" fontSize="12" fill="#0D0D0D">n° 17</text>
        {agent(22, 'Moteur de règles', 'conforme', COUL.vert, 0)}{agent(77, 'Modèle statistique', 'conforme', COUL.vert, 1)}{agent(132, 'Agent LLM', 'non conforme', COUL.rouge, 2)}
        <g opacity={seuil(t, 0.2, 0.26)}>
          <rect x="318" y="70" width="110" height="52" rx="8" fill={COUL.bleu} /><text x="373" y="91" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Arbitre</text><text x="373" y="109" textAnchor="middle" fontSize="12" fill="#fff">2 voix contre 1</text>
          <text x="373" y="142" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={COUL.vert}>décision : conforme</text>
        </g>
        <text x="220" y="204" textAnchor="middle" {...T}>Trois approches différentes traitent le même dossier, un arbitre tranche</text>
      </>}
      {ph >= 1 && <>
        {Array.from({ length: 1000 }, (_, i) => { const k = RANG[i]; const coul = k < rouges ? COUL.rouge : k < rouges + jaunes ? COUL.jaune : 'var(--plan-sol)'; return <rect key={i} x={20 + (i % 50) * 8} y={8 + Math.floor(i / 50) * 8} width="7" height="7" rx="1.5" fill={coul} />; })}
        <rect x="20" y="177" width="10" height="10" rx="2" fill={COUL.jaune} /><text x="36" y="186" {...D}>{ph === 1 ? 'un seul agent se trompe : 243 dossiers, rattrapés par le vote' : 'le troisième agent se trompe seul : 90 dossiers, rattrapés'}</text>
        <rect x="20" y="195" width="10" height="10" rx="2" fill={COUL.rouge} /><text x="36" y="204" {...D}>{ph === 1 ? 'deux ou trois se trompent : 28 dossiers, le vote est faux' : 'les deux agents jumeaux se trompent ensemble : 100 dossiers'}</text>
        <text x="20" y="224" {...T} fontWeight="700">{ph === 1 ? 'Erreurs indépendantes : 3 × 0,1 × 0,1 × 0,9 + 0,1 × 0,1 × 0,1 = 2,8 %' : 'Deux agents jumeaux : vote faux sur 100 dossiers, soit 10 %'}</text>
      </>}
    </Cadre>
  );
}
