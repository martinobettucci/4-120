import { useState } from 'react';
import Animation, { COUL, seuil, doux } from '../composants/Animation.jsx';
import { useJSON } from '../composants/outils.jsx';
const F = (x, n) => Number(x).toFixed(n).replace('.', ',');

const ETAPES = [
  { titre: "Un même problème, trois approches", texte: "Le superviseur du robot doit choisir une action à partir de quelques mesures. Les trois approches du module reçoivent exactement la même entrée : choisissez un cas dans la liste pour la faire varier." },
  { titre: "Système à base de règles", texte: "Des règles écrites par un expert sont évaluées dans l'ordre. La première règle déclenchée fixe la décision. Le raisonnement est entièrement lisible, mais chaque seuil est figé à l'écriture." },
  { titre: "Réseau bayésien", texte: "Les mesures sont des indices qui modifient la probabilité de causes cachées (usure, capteur encrassé, panne). L'inférence propage l'information le long des arcs : la décision repose sur des probabilités, pas sur des seuils." },
  { titre: "Apprentissage supervisé", texte: "Un réseau de neurones entraîné sur des exemples étiquetés associe directement les mesures à une décision. Il capte des régularités que personne n'a écrites, au prix d'une explication moins directe." },
  { titre: "Comparer avant de choisir", texte: "Sur ce cas, les trois approches sont confrontées à la décision de référence. L'exactitude globale, mesurée sur le jeu de test du notebook 01, complète la comparaison." },
];

const NOMS = { temperature: 'température', distance_obstacle: 'distance obstacle', bruit_capteur: 'bruit capteur' };
// Affichage : accent de « ARRÊT » et virgule décimale, les identifiants des données restant inchangés.
const aff = (x) => String(x).replaceAll('ARRET', 'ARRÊT').replace(/(\d)\.(\d)/g, '$1,$2');
const libelleDecision = (d) => (d === undefined || d === null ? 'n.c.' : aff(d));

function Entree({ cas, variables }) {
  const cles = Object.keys(cas.entree);
  return (
    <g>
      <text x="20" y="34" fontSize="14" fontWeight="700" fill="var(--texte)">Entrée : {cas.libelle}</text>
      {cles.map((k, i) => {
        const v = variables.find((x) => x.nom === k) || { min: 0, max: 100, unite: '' };
        const val = Number(cas.entree[k]);
        const f = Math.max(0, Math.min(1, (val - v.min) / ((v.max - v.min) || 1)));
        const y = 62 + i * 46;
        return (
          <g key={k}>
            <text x="20" y={y} fontSize="12.5" fill="var(--texte-doux)">{NOMS[k] || k.replaceAll('_', ' ')}</text>
            <rect x="20" y={y + 7} width="190" height="10" rx="5" fill="var(--plan-sol)" />
            <rect x="20" y={y + 7} width={190 * f} height="10" rx="5" fill={COUL.bleu} />
            <text x="218" y={y + 17} fontSize="12.5" fontWeight="700" fill="var(--texte)">{Number.isInteger(val) ? val : F(val, 1)} {v.unite || ''}</text>
          </g>
        );
      })}
    </g>
  );
}

function Verdict({ titre, decision, reference, x, y, visible = 1 }) {
  const juste = decision === reference;
  return (
    <g opacity={visible}>
      <rect x={x} y={y} width="560" height="44" rx="10" fill={juste ? COUL.vert : COUL.rouge} />
      <text x={x + 16} y={y + 28} fontSize="15" fontWeight="700" fill="#fff">{titre} : {libelleDecision(decision)}</text>
    </g>
  );
}

function Regles({ donnees, cas, p }) {
  const regles = donnees.regles.slice(0, 7);
  const declenchees = cas.regles.declenchees || [];
  return (
    <g>
      {regles.map((r, i) => {
        const vu = seuil(p, i * 0.1, i * 0.1 + 0.08);
        const actif = declenchees.includes(r.id);
        return (
          <g key={r.id} opacity={0.25 + 0.75 * vu}>
            <rect x="310" y={30 + i * 44} width="560" height="36" rx="8" fill={actif && vu > 0.9 ? COUL.jaune : 'var(--carte)'} stroke={actif && vu > 0.9 ? COUL.noir : 'var(--bord)'} strokeWidth="1.5" />
            <text x="324" y={53 + i * 44} fontSize="12.5" fill={actif && vu > 0.9 ? '#0D0D0D' : 'var(--texte)'}><tspan fontWeight="700">{r.id}</tspan>  si {aff(r.condition)} → {aff(r.decision)}</text>
          </g>
        );
      })}
      <Verdict titre="Décision des règles" decision={cas.regles.decision} reference={cas.regles.decision} x={310} y={360} visible={seuil(p, 0.8, 0.95)} />
    </g>
  );
}

function Bayes({ donnees, cas, p }) {
  const { noeuds, arcs } = donnees.reseau;
  // Disposition par niveaux : un nœud se place sous ses parents.
  const niveau = {};
  const calc = (id, garde = 0) => {
    if (niveau[id] !== undefined || garde > 20) return niveau[id] || 0;
    const parents = arcs.filter((a) => a[1] === id).map((a) => a[0]);
    niveau[id] = parents.length ? 1 + Math.max(...parents.map((q) => calc(q, garde + 1))) : 0;
    return niveau[id];
  };
  noeuds.forEach((n) => calc(n.id));
  const nbNiv = Math.max(...Object.values(niveau)) + 1;
  const pos = {};
  for (let k = 0; k < nbNiv; k++) {
    const ids = noeuds.filter((n) => niveau[n.id] === k);
    ids.forEach((n, i) => { pos[n.id] = [310 + ((i + 0.5) * 560) / ids.length, 60 + (k * 250) / Math.max(1, nbNiv - 1)]; });
  }
  const post = cas.bayes.posterieurs || {};
  return (
    <g>
      {arcs.map(([a, b], i) => {
        const f = seuil(p, 0.1 + i * 0.04, 0.3 + i * 0.04);
        return <line key={`${a}-${b}`} x1={pos[a][0]} y1={pos[a][1] + 22} x2={pos[a][0] + (pos[b][0] - pos[a][0]) * f} y2={pos[a][1] + 22 + (pos[b][1] - 22 - pos[a][1] - 22) * f} stroke={COUL.gris} strokeWidth="2" />;
      })}
      {noeuds.map((n) => {
        const pr = post[n.id];
        const f = doux(seuil(p, 0.35, 0.8));
        return (
          <g key={n.id}>
            <rect x={pos[n.id][0] - 62} y={pos[n.id][1] - 22} width="124" height="44" rx="22" fill="var(--carte)" stroke={COUL.bleu} strokeWidth="2" />
            <text x={pos[n.id][0]} y={pos[n.id][1] - 3} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--texte)">{n.libelle}</text>
            {pr !== undefined && (
              <>
                <rect x={pos[n.id][0] - 46} y={pos[n.id][1] + 5} width="92" height="7" rx="3.5" fill="var(--plan-sol)" />
                <rect x={pos[n.id][0] - 46} y={pos[n.id][1] + 5} width={92 * pr * f} height="7" rx="3.5" fill={pr > 0.5 ? COUL.rouge : COUL.orange} />
                <text x={pos[n.id][0] + 70} y={pos[n.id][1] + 5} fontSize="11.5" fontWeight="700" fill="var(--texte)" opacity={f}>{Math.round(pr * 100)} %</text>
              </>
            )}
          </g>
        );
      })}
      <Verdict titre="Décision bayésienne" decision={cas.bayes.decision} reference={cas.bayes.decision} x={310} y={360} visible={seuil(p, 0.8, 0.95)} />
    </g>
  );
}

function Supervise({ cas, p }) {
  const probas = Object.entries(cas.supervise.probabilites || {});
  const entrees = Object.keys(cas.entree).length;
  const couches = [entrees, 6, 6, probas.length];
  const xs = [330, 430, 530, 630];
  const ys = (n, i) => 190 + (i - (n - 1) / 2) * 42;
  return (
    <g>
      {couches.slice(0, -1).map((n, c) => Array.from({ length: n }, (_, i) => Array.from({ length: couches[c + 1] }, (_, j) => (
        <line key={`${c}-${i}-${j}`} x1={xs[c]} y1={ys(n, i)} x2={xs[c + 1]} y2={ys(couches[c + 1], j)} stroke={COUL.gris} strokeWidth="1" opacity={0.12 + 0.5 * seuil(p, c * 0.2, c * 0.2 + 0.2) * (((i * 7 + j * 3 + c) % 5) / 5)} />
      ))))}
      {couches.map((n, c) => Array.from({ length: n }, (_, i) => (
        <circle key={`${c}-${i}`} cx={xs[c]} cy={ys(n, i)} r="11" fill={seuil(p, c * 0.2 - 0.05, c * 0.2 + 0.1) > 0.5 ? COUL.bleu : 'var(--carte)'} stroke={COUL.bleu} strokeWidth="2" />
      )))}
      {probas.map(([d, v], i) => {
        const f = doux(seuil(p, 0.6, 0.9));
        return (
          <g key={d}>
            <text x="662" y={ys(probas.length, i) - 6} fontSize="12" fill="var(--texte)">{aff(d)}</text>
            <rect x="662" y={ys(probas.length, i)} width="150" height="9" rx="4.5" fill="var(--plan-sol)" />
            <rect x="662" y={ys(probas.length, i)} width={150 * v * f} height="9" rx="4.5" fill={d === cas.supervise.decision ? COUL.vert : COUL.gris} />
            <text x="820" y={ys(probas.length, i) + 9} fontSize="12" fontWeight="700" fill="var(--texte)" opacity={f}>{Math.round(v * 100)} %</text>
          </g>
        );
      })}
      <Verdict titre="Décision du modèle" decision={cas.supervise.decision} reference={cas.supervise.decision} x={310} y={360} visible={seuil(p, 0.85, 0.97)} />
    </g>
  );
}

function Comparaison({ donnees, cas, p }) {
  const lignes = [['Règles', cas.regles.decision, donnees.scores.regles], ['Réseau bayésien', cas.bayes.decision, donnees.scores.bayes], ['Apprentissage supervisé', cas.supervise.decision, donnees.scores.supervise]];
  return (
    <g>
      <text x="310" y="52" fontSize="14" fill="var(--texte)">Décision de référence : <tspan fontWeight="700">{libelleDecision(cas.reference)}</tspan></text>
      {lignes.map(([nom, d, sc], i) => {
        const f = seuil(p, i * 0.2, i * 0.2 + 0.2);
        const ok = d === cas.reference;
        return (
          <g key={nom} opacity={f}>
            <rect x="310" y={80 + i * 84} width="560" height="66" rx="10" fill="var(--carte)" stroke={ok ? COUL.vert : COUL.rouge} strokeWidth="2.5" />
            <text x="326" y={108 + i * 84} fontSize="15" fontWeight="700" fill="var(--texte)">{nom}</text>
            <text x="326" y={130 + i * 84} fontSize="13" fill={ok ? COUL.vert : COUL.rouge}>{libelleDecision(d)} ({ok ? 'conforme à la référence' : 'différent de la référence'})</text>
            <text x="854" y={118 + i * 84} textAnchor="end" fontSize="13" fill="var(--texte-doux)">exactitude globale</text>
            <text x="854" y={136 + i * 84} textAnchor="end" fontSize="15" fontWeight="700" fill="var(--texte)">{sc ? `${Math.round(sc.exactitude * 100)} %` : 'n.c.'}</text>
          </g>
        );
      })}
    </g>
  );
}

export default function AnimM1() {
  const { donnees, erreur } = useJSON('data/m1_decision.json');
  const [k, setK] = useState(0);
  if (erreur) return <p className="erreur">Données de l'animation indisponibles ({erreur}).</p>;
  if (!donnees) return <p>Chargement…</p>;
  const cas = donnees.cas[k];
  return (
    <div>
      <label className="choix-cas">Cas étudié
        <select value={k} onChange={(e) => setK(Number(e.target.value))}>
          {donnees.cas.map((c, i) => <option key={c.id} value={i}>{c.libelle}</option>)}
        </select>
      </label>
      <Animation titre="Trois façons de décider" etapes={ETAPES} duree={7}>
        {(e, p) => (
          <svg viewBox="0 0 900 430" role="img" aria-label="Comparaison de trois approches de décision">
            <Entree cas={cas} variables={donnees.variables} />
            <line x1="290" y1="20" x2="290" y2="410" stroke="var(--bord)" />
            {e === 0 && <text x="590" y="210" textAnchor="middle" fontSize="16" fill="var(--texte-doux)">Règles, réseau bayésien, apprentissage supervisé</text>}
            {e === 1 && <Regles donnees={donnees} cas={cas} p={p} />}
            {e === 2 && <Bayes donnees={donnees} cas={cas} p={p} />}
            {e === 3 && <Supervise cas={cas} p={p} />}
            {e === 4 && <Comparaison donnees={donnees} cas={cas} p={p} />}
          </svg>
        )}
      </Animation>
    </div>
  );
}
