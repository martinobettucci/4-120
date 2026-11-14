import Animation, { COUL, doux } from '../composants/Animation.jsx';

// Filtre bayésien discret dans un couloir : le calcul est fait ici, en direct, avec les mêmes
// équations que le notebook 05 (prédiction par le modèle de mouvement, correction par la mesure).
const N = 10;
const PORTES = [1, 3, 8];
const normaliser = (b) => { const s = b.reduce((a, x) => a + x, 0); return b.map((x) => x / s); };
const corriger = (b, voitPorte) => normaliser(b.map((x, i) => x * ((PORTES.includes(i) === voitPorte) ? 0.85 : 0.15)));
const predire = (b, pas) => {
  const n = new Array(N).fill(0);
  b.forEach((x, i) => {
    const poser = (j, w) => { n[Math.max(0, Math.min(N - 1, j))] += x * w; };
    poser(i + pas, 0.8); poser(i + pas - 1, 0.1); poser(i + pas + 1, 0.1);
  });
  return n;
};
const B0 = new Array(N).fill(1 / N);
const B1 = corriger(B0, true);
const B2 = predire(B1, 2);
const B3 = corriger(B2, true);
const SUITE = [
  { avant: B0, apres: B0, robot: [1, 1] },
  { avant: B0, apres: B1, robot: [1, 1] },
  { avant: B1, apres: B2, robot: [1, 3] },
  { avant: B2, apres: B3, robot: [3, 3] },
  { avant: B3, apres: B3, robot: [3, 3] },
];
const ETAPES = [
  { titre: "Le robot ne sait pas où il est", texte: "Au démarrage, toutes les cellules du couloir sont également probables. La croyance est une distribution de probabilité sur les positions possibles : ici, elle est uniforme." },
  { titre: "Correction : une première mesure", texte: "Le capteur détecte une porte. Chaque cellule est multipliée par la vraisemblance de cette mesure, P(mesure | position), puis la croyance est normalisée. Trois hypothèses subsistent : les trois portes." },
  { titre: "Prédiction : un déplacement", texte: "Le robot avance de deux cellules. La croyance se décale avec lui et s'étale, parce que les roues glissent parfois : le mouvement ajoute de l'incertitude." },
  { titre: "Correction : une seconde mesure", texte: "Le capteur détecte de nouveau une porte. Une seule hypothèse est compatible avec « porte, deux cellules, porte ». La croyance se concentre sur la bonne cellule." },
  { titre: "Décider à partir d'une croyance", texte: "L'agent amélioré du module décide sur la position la plus probable, et attend lorsque la croyance est trop dispersée. Dans la scène 3D, les tuiles orange représentent cette croyance en deux dimensions." },
];

export default function AnimM5() {
  return (
    <Animation titre="Gérer l'incertitude : le filtre bayésien discret" etapes={ETAPES} duree={6}>
      {(e, p) => {
        const s = SUITE[e];
        const f = doux(p);
        const c = 78;
        const x0 = 60;
        const rx = s.robot[0] + (s.robot[1] - s.robot[0]) * f;
        return (
          <svg viewBox="0 0 900 430" role="img" aria-label="Croyance du robot dans un couloir">
            <text x={x0} y="34" fontSize="14" fontWeight="700" fill="var(--texte)">Croyance : P(position)</text>
            {s.avant.map((v, i) => {
              const val = v + (s.apres[i] - v) * f;
              const h = val * 270;
              return (
                <g key={i}>
                  <rect x={x0 + i * c + 8} y={250 - h} width={c - 16} height={h} rx="5" fill={COUL.orange} opacity="0.9" />
                  <text x={x0 + i * c + c / 2} y={242 - h} textAnchor="middle" fontSize="12.5" fill="var(--texte)">{val.toFixed(2)}</text>
                </g>
              );
            })}
            <line x1={x0} y1="250" x2={x0 + N * c} y2="250" stroke="var(--texte-doux)" />
            {Array.from({ length: N }, (_, i) => (
              <g key={i}>
                <rect x={x0 + i * c + 2} y="270" width={c - 4} height="74" rx="6" fill="var(--plan-sol)" stroke="var(--bord)" />
                {PORTES.includes(i) && <rect x={x0 + i * c + 22} y="262" width={c - 44} height="16" rx="3" fill={COUL.vert} />}
                <text x={x0 + i * c + c / 2} y="366" textAnchor="middle" fontSize="12" fill="var(--texte-doux)">{i}</text>
              </g>
            ))}
            <circle cx={x0 + rx * c + c / 2} cy="312" r="19" fill={COUL.bleu} stroke="#fff" strokeWidth="3" />
            {(e === 1 || e === 3) && <line x1={x0 + rx * c + c / 2} y1="293" x2={x0 + rx * c + c / 2} y2="280" stroke={COUL.jaune} strokeWidth="5" opacity={p < 0.6 ? 1 : 0.3} />}
            <text x={x0} y="402" fontSize="13" fill="var(--texte-doux)"><tspan fill={COUL.vert} fontWeight="700">■</tspan> porte détectable par le capteur   <tspan fill={COUL.bleu} fontWeight="700">●</tspan> position réelle du robot, inconnue de lui</text>
          </svg>
        );
      }}
    </Animation>
  );
}
