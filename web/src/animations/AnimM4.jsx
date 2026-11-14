import Animation, { COUL, seuil } from '../composants/Animation.jsx';
import { useJSON, Plan2D, centre, polyligne } from '../composants/outils.jsx';

const ETAPES = [
  { titre: "Un espace de recherche", texte: "Le robot doit visiter toutes les stations de collecte puis revenir au dépôt. Chaque ordre de visite est une solution candidate : avec 9 stations, il en existe 9! = 362 880. Voici un ordre pris au hasard." },
  { titre: "Des contraintes", texte: "Toutes les solutions ne sont pas admissibles. Certaines stations doivent être visitées avant d'autres (flèches rouges) et d'autres dans une fenêtre de temps (horloges). Une solution courte mais qui ne respecte pas ces contraintes est inutilisable." },
  { titre: "Le recuit simulé", texte: "À chaque itération, une modification locale est proposée. Si elle améliore le coût, elle est acceptée. Sinon, elle l'est avec la probabilité exp(-Δ / T). Tant que la température T est haute, l'algorithme accepte de dégrader la solution pour sortir des minimums locaux." },
  { titre: "La convergence", texte: "La température baisse, les dégradations sont de plus en plus rarement acceptées et la tournée se stabilise. La courbe bleue est le coût courant, la verte le meilleur coût rencontré. Ces données sortent du notebook 04." },
  { titre: "Deux approches, deux garanties", texte: "La programmation sous contraintes (CP-SAT) explore l'espace de façon systématique et peut prouver l'optimalité. Le recuit simulé ne prouve rien mais fournit vite une bonne solution et passe mieux à l'échelle." },
];

const C = 21;

function Tournee({ d, ordre, couleur, chemin, opacite = 1 }) {
  const parId = Object.fromEntries(d.probleme.stations.map((s) => [s.id, s.pos]));
  const points = chemin && chemin.length ? chemin : [d.probleme.depot, ...ordre.map((id) => parId[id]), d.probleme.depot];
  return <polyline points={polyligne(points, C)} fill="none" stroke={couleur} strokeWidth="3" strokeLinejoin="round" opacity={opacite} />;
}

function Stations({ d, contraintes }) {
  const parId = Object.fromEntries(d.probleme.stations.map((s) => [s.id, s.pos]));
  const [dx, dy] = centre(d.probleme.depot, C);
  return (
    <g>
      {contraintes && d.probleme.precedences.map(([a, b]) => {
        const [x1, y1] = centre(parId[a], C); const [x2, y2] = centre(parId[b], C);
        return <line key={`${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COUL.rouge} strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#prec)" />;
      })}
      <rect x={dx - 9} y={dy - 9} width="18" height="18" rx="3" fill={COUL.noir} />
      <text x={dx + 14} y={dy + 4} fontSize="11" fontWeight="700" fill="#0D0D0D" stroke="#fff" strokeWidth="3" paintOrder="stroke">dépôt</text>
      {d.probleme.stations.map((s) => {
        const [x, y] = centre(s.pos, C);
        return (
          <g key={s.id}>
            <circle cx={x} cy={y} r="10" fill={COUL.jaune} stroke={COUL.noir} strokeWidth="1.5" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0D0D0D">{s.id}</text>
            {contraintes && s.fenetre && <text x={x + 13} y={y - 9} fontSize="10.5" fontWeight="700" fill={COUL.bleu} stroke="#fff" strokeWidth="3" paintOrder="stroke">⏱ {s.fenetre[0]} à {s.fenetre[1]}</text>}
          </g>
        );
      })}
    </g>
  );
}

function Courbe({ h, p, x = 470, y = 40, w = 400, ht = 250 }) {
  const maxIt = h[h.length - 1].it || 1;
  const vals = h.flatMap((q) => [q.cout_courant, q.meilleur_cout]);
  const lo = Math.min(...vals); const hi = Math.max(...vals);
  const X = (it) => x + (it / maxIt) * w;
  const Y = (v) => y + ht - ((v - lo) / ((hi - lo) || 1)) * ht;
  const n = Math.max(2, Math.round(p * h.length));
  const vus = h.slice(0, n);
  const tMax = Math.max(...h.map((q) => q.temperature));
  return (
    <g>
      <rect x={x} y={y} width={w} height={ht} fill="var(--carte)" stroke="var(--bord)" />
      <polyline points={vus.map((q) => `${X(q.it)},${y + ht - (q.temperature / tMax) * ht}`).join(' ')} fill="none" stroke={COUL.rouge} strokeWidth="1.5" strokeDasharray="4 4" />
      <polyline points={vus.map((q) => `${X(q.it)},${Y(q.cout_courant)}`).join(' ')} fill="none" stroke={COUL.bleu} strokeWidth="1.5" />
      <polyline points={vus.map((q) => `${X(q.it)},${Y(q.meilleur_cout)}`).join(' ')} fill="none" stroke={COUL.vert} strokeWidth="3" />
      <text x={x} y={y - 10} fontSize="12.5" fill="var(--texte)"><tspan fill={COUL.bleu} fontWeight="700">▬</tspan> coût courant  <tspan fill={COUL.vert} fontWeight="700">▬</tspan> meilleur coût  <tspan fill={COUL.rouge} fontWeight="700">┅</tspan> température</text>
      <text x={x + w} y={y + ht + 18} textAnchor="end" fontSize="12" fill="var(--texte-doux)">itération {vus[vus.length - 1].it} sur {maxIt}</text>
      <text x={x} y={y + ht + 18} fontSize="12" fill="var(--texte-doux)">meilleur coût : {Math.round(vus[vus.length - 1].meilleur_cout)}</text>
    </g>
  );
}

// Paysage de coût à une dimension, pour l'intuition du critère d'acceptation.
const paysage = (x) => 0.55 + 0.3 * Math.sin(x * 9) * Math.cos(x * 2.3) + 0.35 * (x - 0.7) ** 2;
function Paysage({ p }) {
  const x0 = 470; const w = 400; const y0 = 60; const h = 210;
  const pts = Array.from({ length: 101 }, (_, i) => `${x0 + (i / 100) * w},${y0 + paysage(i / 100) * h}`).join(' ');
  // Trajectoire déterministe : exploration large puis descente dans le meilleur bassin.
  const T = 1 - p;
  const bx = 0.12 + 0.6 * seuil(p, 0, 0.75) + 0.16 * T * Math.sin(p * 40);
  return (
    <g>
      <polyline points={pts} fill="none" stroke="var(--texte)" strokeWidth="2.5" />
      <circle cx={x0 + bx * w} cy={y0 + paysage(bx) * h - 11} r="10" fill={COUL.jaune} stroke={COUL.noir} strokeWidth="2" />
      <text x={x0} y={y0 - 22} fontSize="12.5" fill="var(--texte)">Coût des solutions (plus bas : meilleur)</text>
      <rect x={x0} y={320} width={w} height="12" rx="6" fill="var(--plan-sol)" />
      <rect x={x0} y={320} width={w * T} height="12" rx="6" fill={COUL.rouge} />
      <text x={x0} y={312} fontSize="12.5" fill="var(--texte)">Température T : {T.toFixed(2)} (probabilité d'accepter une dégradation Δ = 0,2 : {Math.round(Math.exp(-0.2 / Math.max(T, 0.01)) * 100)} %)</text>
    </g>
  );
}

export default function AnimM4() {
  const { donnees: d, erreur } = useJSON('data/m4_optimisation.json');
  if (erreur) return <p className="erreur">Données de l'animation indisponibles ({erreur}).</p>;
  if (!d) return <p>Chargement…</p>;
  const inst = d.recuit.instantanes;
  return (
    <Animation titre="Optimiser une tournée : contraintes et recuit simulé" etapes={ETAPES} duree={8}>
      {(e, p) => {
        const k = Math.min(inst.length - 1, Math.floor(p * inst.length));
        const hasard = inst[0];
        return (
          <svg viewBox="0 0 900 430" role="img" aria-label="Optimisation de la tournée du robot">
            <defs>
              <marker id="prec" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill={COUL.rouge} /></marker>
            </defs>
            <Plan2D monde={d.monde} x={20} y={40} c={C}>
              {e <= 1 && <Tournee d={d} ordre={hasard.ordre} couleur={COUL.gris} />}
              {e === 2 && <Tournee d={d} ordre={inst[Math.min(inst.length - 1, Math.floor(p * 4))].ordre} couleur={COUL.bleu} />}
              {e === 3 && <Tournee d={d} ordre={inst[k].ordre} couleur={COUL.bleu} />}
              {e === 4 && <><Tournee d={d} ordre={d.cp_sat.ordre} chemin={d.cp_sat.chemin} couleur={COUL.vert} /><Tournee d={d} ordre={d.recuit.ordre} couleur={COUL.bleu} opacite={0.75} /></>}
              <Stations d={d} contraintes={e >= 1} />
            </Plan2D>
            {e === 0 && <text x="470" y="180" fontSize="15" fill="var(--texte)">Coût de cet ordre aléatoire : <tspan fontWeight="700">{Math.round(hasard.cout)}</tspan> pas</text>}
            {e === 1 && (
              <g fontSize="14" fill="var(--texte)">
                <text x="470" y="150">{d.probleme.precedences.length} précédence(s), {d.probleme.stations.filter((s) => s.fenetre).length} fenêtre(s) de temps</text>
                <text x="470" y="180">Contraintes non respectées par cet ordre : <tspan fontWeight="700" fill={COUL.rouge}>{hasard.non_respectees ?? 'n.c.'}</tspan></text>
              </g>
            )}
            {e === 2 && <Paysage p={p} />}
            {e === 3 && <Courbe h={d.recuit.historique} p={p} />}
            {e === 3 && <text x="470" y="352" fontSize="13" fill="var(--texte)">Tournée courante : coût {Math.round(inst[k].cout)}, contraintes non respectées : {inst[k].non_respectees ?? 0}</text>}
            {e === 4 && (
              <g fontSize="14" fill="var(--texte)">
                <rect x="470" y="70" width="400" height="92" rx="10" fill="var(--carte)" stroke={COUL.vert} strokeWidth="2.5" />
                <text x="486" y="98" fontWeight="700">Programmation sous contraintes (CP-SAT)</text>
                <text x="486" y="122">coût {Math.round(d.cp_sat.cout)}, statut {d.cp_sat.statut}</text>
                <text x="486" y="144">temps de calcul : {Number(d.cp_sat.duree_s).toFixed(2)} s</text>
                <rect x="470" y="186" width="400" height="92" rx="10" fill="var(--carte)" stroke={COUL.bleu} strokeWidth="2.5" />
                <text x="486" y="214" fontWeight="700">Recuit simulé</text>
                <text x="486" y="238">coût {Math.round(d.recuit.cout)}, sans preuve d'optimalité</text>
                <text x="486" y="260">temps de calcul : {Number(d.recuit.duree_s).toFixed(2)} s</text>
              </g>
            )}
            <text x="20" y="28" fontSize="13" fontWeight="700" fill="var(--texte)">Entrepôt vu de dessus</text>
          </svg>
        );
      }}
    </Animation>
  );
}
