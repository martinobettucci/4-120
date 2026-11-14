import Animation, { Boite, Fleche, Jeton, COUL, seuil, doux } from '../composants/Animation.jsx';

const ETAPES = [
  { titre: "Un agent, un environnement", texte: "Un agent intelligent est un système qui perçoit son environnement par des capteurs et agit sur lui par des effecteurs. Ici, le robot de l'entrepôt : son environnement contient des rayonnages, des chariots et un objectif." },
  { titre: "Percevoir : les capteurs", texte: "Le lidar mesure huit distances autour du robot. Cette observation est tout ce que l'agent connaît du monde à cet instant : il ne voit ni la carte complète ni ce qui se trouve derrière un rayonnage." },
  { titre: "Décider", texte: "Le module de décision transforme l'observation en action. Sa forme varie : table de règles, planificateur, politique apprise. C'est le sujet du module 3." },
  { titre: "Agir : les effecteurs", texte: "L'action choisie est transmise aux roues. L'environnement change : le robot avance d'une cellule, les chariots se déplacent aussi." },
  { titre: "État réel et état observé", texte: "L'agent ne décide jamais sur l'état réel, seulement sur ce que ses capteurs rapportent. Un rayon perdu ou une distance bruitée suffit à créer un écart : ici le lidar annonce un obstacle une cellule trop loin." },
  { titre: "La boucle se répète", texte: "Perception, décision, action : la boucle tourne à chaque pas de temps. La qualité d'un agent se mesure sur la durée, pas sur une décision isolée." },
];

const PT = { envH: [260, 170], cap: [600, 110], dec: [710, 215], act: [600, 320], envB: [260, 290] };

function MiniMonde({ robotX, obstacleObserve }) {
  const c = 36;
  return (
    <g transform="translate(62 150)">
      {[0, 1, 2, 3, 4].map((i) => [0, 1, 2].map((j) => <rect key={`${i}-${j}`} x={i * c} y={j * c} width={c - 2} height={c - 2} rx="4" fill="var(--plan-sol)" />))}
      <rect x={3 * c} y={c} width={c - 2} height={c - 2} rx="4" fill={COUL.gris} />
      {obstacleObserve !== null && <rect x={(3 + obstacleObserve) * c} y={c} width={c - 2} height={c - 2} rx="4" fill="none" stroke={COUL.rouge} strokeWidth="3" strokeDasharray="5 4" />}
      <rect x={4 * c + 6} y={2 * c + 6} width={c - 14} height={c - 14} rx="4" fill={COUL.vert} />
      <line x1={robotX * c + c / 2} y1={c + c / 2} x2={3 * c} y2={c + c / 2} stroke={COUL.jaune} strokeWidth="3" />
      <circle cx={robotX * c + c / 2 - 1} cy={c + c / 2 - 1} r="12" fill={COUL.bleu} stroke="#fff" strokeWidth="2" />
    </g>
  );
}

export default function AnimM2() {
  return (
    <Animation titre="La boucle perception, décision, action" etapes={ETAPES} duree={6}>
      {(e, p) => {
        const a = (k) => e >= k;
        const tour = e === 5 ? (p * 2) % 1 : 0;
        const robotX = e === 3 ? doux(seuil(p, 0.55, 0.95)) : e > 3 ? 1 : 0;
        return (
          <svg viewBox="0 0 900 430" role="img" aria-label="Schéma de la boucle perception, décision, action">
            <Boite x={40} y={110} w={240} h={220} texte="" couleur={COUL.noir} />
            <text x="160" y="136" textAnchor="middle" fontWeight="700" fontSize="15" fill="var(--texte)">Environnement (état réel)</text>
            <MiniMonde robotX={robotX} obstacleObserve={e === 4 ? doux(seuil(p, 0.2, 0.6)) : null} />
            <Boite x={500} y={60} w={360} h={320} texte="" couleur={COUL.bleu} />
            <text x="680" y="52" textAnchor="middle" fontWeight="700" fontSize="15" fill={COUL.bleu}>Agent</text>
            <Boite x={530} y={80} w={150} h={60} texte="Capteurs" sous="lidar, 8 rayons" couleur="#9a8f00" actif={a(1)} />
            <Boite x={640} y={185} w={190} h={60} texte="Décision" sous="règles, plan ou politique" couleur={COUL.bleu} actif={a(2)} plein={e === 2} />
            <Boite x={530} y={290} w={150} h={60} texte="Effecteurs" sous="roues motrices" couleur={COUL.vert} actif={a(3)} />
            <Fleche de={[282, 170]} a={[528, 110]} couleur="#9a8f00" actif={a(1)} />
            <text x="400" y="122" textAnchor="middle" fontSize="13" fill="var(--texte-doux)" opacity={a(1) ? 1 : 0.2}>observation</text>
            <Fleche de={[682, 118]} a={[720, 183]} couleur={COUL.bleu} actif={a(2)} />
            <Fleche de={[720, 247]} a={[682, 310]} couleur={COUL.bleu} actif={a(3)} />
            <Fleche de={[528, 320]} a={[282, 290]} couleur={COUL.vert} actif={a(3)} />
            <text x="400" y="328" textAnchor="middle" fontSize="13" fill="var(--texte-doux)" opacity={a(3) ? 1 : 0.2}>action</text>
            {e === 1 && <Jeton points={[PT.envH, PT.cap]} p={p} />}
            {e === 2 && <Jeton points={[PT.cap, PT.dec]} p={p} couleur={COUL.bleu} />}
            {e === 3 && <Jeton points={[PT.dec, PT.act, PT.envB]} p={seuil(p, 0, 0.55)} couleur={COUL.vert} />}
            {e === 5 && <Jeton points={[PT.envH, PT.cap, PT.dec, PT.act, PT.envB, PT.envH]} p={Math.max(0.001, Math.min(0.999, tour))} />}
            {e === 1 && <text x="605" y="165" textAnchor="middle" fontSize="13" fill="#7a6f00" opacity={seuil(p, 0.6, 0.9)}>N 2 · E 3 · S 1 · O 6 …</text>}
            {e === 2 && <text x="735" y="272" textAnchor="middle" fontSize="13" fill={COUL.bleu} opacity={seuil(p, 0.6, 0.9)}>« voie libre à l'est : avancer »</text>}
            {e === 4 && (
              <g opacity={seuil(p, 0.5, 0.9)}>
                <text x="160" y="368" textAnchor="middle" fontSize="13" fill={COUL.rouge}>pointillés : obstacle tel que le capteur le situe</text>
                <text x="160" y="388" textAnchor="middle" fontSize="13" fill="var(--texte-doux)">gris : obstacle réel</text>
              </g>
            )}
          </svg>
        );
      }}
    </Animation>
  );
}
