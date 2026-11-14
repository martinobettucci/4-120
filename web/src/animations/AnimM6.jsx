import Animation, { COUL, seuil, doux } from '../composants/Animation.jsx';
import { useJSON } from '../composants/outils.jsx';

const ETAPES = [
  { titre: "Valider un comportement, pas un résultat", texte: "Un agent autonome ne se valide pas sur une exécution réussie. Ses décisions dépendent d'aléas (bruit des capteurs, glissement, obstacles mobiles) : il faut mesurer une distribution de résultats sur un grand nombre de simulations." },
  { titre: "La robustesse", texte: "Un agent est robuste si ses performances se dégradent progressivement, et non brutalement, quand les conditions s'éloignent du nominal. Les scénarios de test sont donc organisés par niveaux de perturbation croissants." },
  { titre: "Une campagne de simulations", texte: "Chaque carré est un environnement simulé. Des milliers d'environnements s'exécutent en parallèle sous forme de tenseurs : c'est ici que le GPU apporte un gain réel. Vert : objectif atteint. Rouge : échec." },
  { titre: "Avant et après correction", texte: "Le taux de réussite est donné avec son intervalle de confiance à 95 %. La politique corrigée (verte) évite les cellules perçues comme occupées. L'écart entre les deux courbes mesure l'effet de la correction, niveau par niveau." },
  { titre: "Les principaux scénarios d'échec", texte: "Les échecs se rangent en familles : collision avec un obstacle non perçu, face à face sans issue avec un chariot, dépassement du temps imparti. Chaque échec doit pouvoir être rejoué étape par étape : c'est le rôle des traces et de la scène 3D." },
];

const ACCENTS = { leger: 'léger', degrade: 'dégradé', severe: 'sévère' };
const lib = (nom) => ACCENTS[nom] || nom;
const nomNiveau = (n) => lib(typeof n === 'string' ? n : n?.nom);

export default function AnimM6() {
  const { donnees: d, erreur } = useJSON('data/m6_validation.json');
  if (erreur) return <p className="erreur">Données de l'animation indisponibles ({erreur}).</p>;
  if (!d) return <p>Chargement…</p>;
  const niveaux = d.niveaux;
  const res = (niveau, prudence) => d.resultats.find((r) => (r.niveau === niveau.nom || r.niveau === niveaux.indexOf(niveau)) && r.prudence === prudence);
  const X = (i) => 110 + (i * 700) / Math.max(1, niveaux.length - 1);
  const Y = (v) => 330 - v * 250;
  return (
    <Animation titre="Tester et valider un agent autonome" etapes={ETAPES} duree={7}>
      {(e, p) => (
        <svg viewBox="0 0 900 430" role="img" aria-label="Validation d'un agent autonome par campagne de simulations">
          {e === 0 && (
            <g>
              {Array.from({ length: 9 }, (_, i) => {
                const f = seuil(p, i * 0.08, i * 0.08 + 0.15);
                const ok = [0, 1, 2, 4, 5, 7, 8].includes(i);
                return (
                  <g key={i} opacity={f}>
                    <rect x={90 + (i % 3) * 250} y={50 + Math.floor(i / 3) * 110} width="220" height="86" rx="10" fill="var(--carte)" stroke={ok ? COUL.vert : COUL.rouge} strokeWidth="2.5" />
                    <polyline points={Array.from({ length: 8 }, (_, k) => `${105 + (i % 3) * 250 + k * 27},${95 + Math.floor(i / 3) * 110 + Math.sin(k * (1 + i * 0.37) + i) * 22}`).join(' ')} fill="none" stroke={ok ? COUL.bleu : COUL.rouge} strokeWidth="2.5" />
                    <text x={100 + (i % 3) * 250} y={70 + Math.floor(i / 3) * 110} fontSize="12" fill="var(--texte-doux)">graine {i + 1} : {ok ? 'réussite' : 'échec'}</text>
                  </g>
                );
              })}
              <text x="450" y="405" textAnchor="middle" fontSize="14" fill="var(--texte)">Même agent, même carte, neuf graines aléatoires : sept réussites, deux échecs.</text>
            </g>
          )}
          {e === 1 && (
            <g>
              <text x="60" y="50" fontSize="14" fontWeight="700" fill="var(--texte)">Niveaux de perturbation de la campagne</text>
              {niveaux.map((n, i) => {
                const f = seuil(p, i * 0.12, i * 0.12 + 0.15);
                const w = 780 / niveaux.length;
                return (
                  <g key={n.nom} opacity={f}>
                    <rect x={60 + i * w} y={80} width={w - 12} height={230} rx="10" fill="var(--carte)" stroke={COUL.bleu} strokeWidth="2" />
                    <rect x={60 + i * w} y={80} width={w - 12} height={8} rx="4" fill={i < niveaux.length / 3 ? COUL.vert : i < (2 * niveaux.length) / 3 ? COUL.orange : COUL.rouge} />
                    <text x={60 + i * w + (w - 12) / 2} y="120" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--texte)">{lib(n.nom)}</text>
                    <text x={72 + i * w} y="165" fontSize="12" fill="var(--texte-doux)">glissement</text>
                    <text x={72 + i * w} y="184" fontSize="15" fontWeight="700" fill="var(--texte)">{Math.round(n.glissement * 100)} %</text>
                    <text x={72 + i * w} y="215" fontSize="12" fill="var(--texte-doux)">obstacle non perçu</text>
                    <text x={72 + i * w} y="234" fontSize="15" fontWeight="700" fill="var(--texte)">{Math.round(n.rate_perception * 100)} %</text>
                    <text x={72 + i * w} y="265" fontSize="12" fill="var(--texte-doux)">obstacles mobiles</text>
                    <text x={72 + i * w} y="284" fontSize="15" fontWeight="700" fill="var(--texte)">{n.n_obstacles}</text>
                  </g>
                );
              })}
              <text x="450" y="360" textAnchor="middle" fontSize="13.5" fill="var(--texte-doux)">Chaque niveau est simulé {d.lot} fois, limité à {d.max_etapes} étapes.</text>
            </g>
          )}
          {e === 2 && (() => {
            const niveau = niveaux[niveaux.length - 1];
            const r = res(niveau, false) || d.resultats[d.resultats.length - 1];
            const total = 400; const vus = Math.round(p * total);
            return (
              <g>
                <text x="60" y="44" fontSize="14" fontWeight="700" fill="var(--texte)">Niveau « {nomNiveau(niveau)} », politique avant correction : {vus * Math.round(d.lot / total)} simulations sur {d.lot}</text>
                {Array.from({ length: vus }, (_, i) => {
                  const alea = ((i * 2654435761) % 1000) / 1000;
                  return <rect key={i} x={60 + (i % 40) * 19.5} y={64 + Math.floor(i / 40) * 19.5} width="16" height="16" rx="3" fill={alea < r.taux_succes ? COUL.vert : COUL.rouge} />;
                })}
                <text x="60" y="290" fontSize="14" fill="var(--texte)">Taux de réussite mesuré : <tspan fontWeight="700">{(r.taux_succes * 100).toFixed(1)} %</tspan>, collisions moyennes par exécution : <tspan fontWeight="700">{Number(r.collisions_moyennes).toFixed(2)}</tspan></text>
              </g>
            );
          })()}
          {e === 3 && (
            <g>
              {[0, 0.25, 0.5, 0.75, 1].map((v) => (
                <g key={v}><line x1="90" x2="830" y1={Y(v)} y2={Y(v)} stroke="var(--bord)" /><text x="80" y={Y(v) + 4} textAnchor="end" fontSize="12" fill="var(--texte-doux)">{v * 100} %</text></g>
              ))}
              {niveaux.map((n, i) => <text key={n.nom} x={X(i)} y="356" textAnchor="middle" fontSize="12.5" fill="var(--texte)">{lib(n.nom)}</text>)}
              {[[false, COUL.rouge, 'avant correction'], [true, COUL.vert, 'après correction']].map(([prud, coul, lib], s) => {
                const pts = niveaux.map((n, i) => ({ i, r: res(n, prud) })).filter((q) => q.r);
                const f = doux(seuil(p, s * 0.35, s * 0.35 + 0.45));
                const n = Math.max(1, Math.ceil(f * pts.length));
                return (
                  <g key={lib} opacity={f > 0 ? 1 : 0}>
                    <polyline points={pts.slice(0, n).map((q) => `${X(q.i)},${Y(q.r.taux_succes)}`).join(' ')} fill="none" stroke={coul} strokeWidth="3" />
                    {pts.slice(0, n).map((q) => (
                      <g key={q.i}>
                        {q.r.ic && <line x1={X(q.i)} x2={X(q.i)} y1={Y(q.r.ic[0])} y2={Y(q.r.ic[1])} stroke={coul} strokeWidth="6" opacity="0.35" strokeLinecap="round" />}
                        <circle cx={X(q.i)} cy={Y(q.r.taux_succes)} r="6" fill={coul} stroke="#fff" strokeWidth="1.5" />
                        <text x={X(q.i) + (s ? -10 : 10)} y={Y(q.r.taux_succes) + (s ? -10 : 20)} textAnchor={s ? 'end' : 'start'} fontSize="12" fontWeight="700" fill={coul}>{Math.round(q.r.taux_succes * 100)} %</text>
                      </g>
                    ))}
                    <text x={110 + s * 190} y="398" fontSize="13" fill="var(--texte)"><tspan fill={coul} fontWeight="700">●</tspan> {lib}</text>
                  </g>
                );
              })}
              <text x="90" y="28" fontSize="14" fontWeight="700" fill="var(--texte)">Taux de réussite par niveau de perturbation</text>
            </g>
          )}
          {e === 4 && (
            <g>
              {[["Obstacle non perçu", "La perception rate un chariot : le robot avance et le heurte.", COUL.rouge], ["Face à face sans issue", "Le robot et un chariot attendent chacun que l'autre libère le passage.", COUL.orange], ["Temps imparti dépassé", "Glissements et replanifications s'accumulent : la mission dure trop longtemps.", COUL.bleu]].map(([t, s, c], i) => (
                <g key={t} opacity={seuil(p, i * 0.2, i * 0.2 + 0.2)}>
                  <rect x="90" y={50 + i * 112} width="720" height="90" rx="12" fill="var(--carte)" stroke={c} strokeWidth="2.5" />
                  <rect x="90" y={50 + i * 112} width="10" height="90" rx="5" fill={c} />
                  <text x="122" y={88 + i * 112} fontSize="16" fontWeight="700" fill="var(--texte)">{t}</text>
                  <text x="122" y={114 + i * 112} fontSize="13.5" fill="var(--texte-doux)">{s}</text>
                </g>
              ))}
            </g>
          )}
        </svg>
      )}
    </Animation>
  );
}
