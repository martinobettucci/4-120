import Animation, { Boite, Fleche, Jeton, COUL, seuil } from '../composants/Animation.jsx';
import { useJSON } from '../composants/outils.jsx';

const ETAPES = [
  { titre: "Architecture réactive", texte: "Les capteurs sont reliés aux effecteurs par des règles stimulus, réponse. Aucune carte, aucun plan : la réaction est immédiate et peu coûteuse, mais l'agent reste prisonnier des minimums locaux, comme un cul-de-sac." },
  { titre: "Architecture délibérative", texte: "L'agent entretient un modèle du monde, calcule un plan complet (ici avec A*) puis l'exécute. Il anticipe et trouve le chemin optimal, à condition que le monde ressemble encore au modèle au moment d'agir." },
  { titre: "Architecture hybride", texte: "Deux couches coopèrent. La couche délibérative fixe le cap à long terme, la couche réactive garde le dernier mot à court terme : si le lidar contredit le plan, elle bloque le mouvement et demande une replanification." },
  { titre: "Mêmes scénarios, trois comportements", texte: "Les trois architectures ont été exécutées sur les mêmes scénarios, avec les mêmes graines aléatoires. Ces chiffres proviennent des traces rejouables dans la scène 3D ci-dessous et du notebook 03." },
];

function Tableau({ index }) {
  const lignes = ['reactif', 'deliberatif', 'hybride'];
  const noms = { reactif: 'Réactive', deliberatif: 'Délibérative', hybride: 'Hybride' };
  const cel = (id) => {
    const t = index.find((x) => x.id === id);
    if (!t) return <td>n.c.</td>;
    return <td className={t.succes ? 'ok' : 'ko'}>{t.succes ? 'réussite' : 'échec'}, {t.etapes} étapes, {t.collisions} collision(s)</td>;
  };
  return (
    <table className="tableau compact">
      <thead><tr><th>Architecture</th><th>Cul-de-sac en U</th><th>Entrepôt avec palette imprévue</th></tr></thead>
      <tbody>{lignes.map((l) => <tr key={l}><th>{noms[l]}</th>{cel(`m3_${l}_piege`)}{cel(`m3_${l}_entrepot`)}</tr>)}</tbody>
    </table>
  );
}

export default function AnimM3() {
  const { donnees } = useJSON('traces/index.json');
  return (
    <Animation titre="Trois architectures d'agents" etapes={ETAPES} duree={7}>
      {(e, p) => {
        if (e === 3) return <div className="anim-html">{donnees ? <Tableau index={donnees} /> : <p>Chargement des résultats…</p>}</div>;
        const cyc = (p * 2.2) % 1;
        const q = Math.max(0.001, Math.min(0.999, cyc));
        return (
          <svg viewBox="0 0 900 430" role="img" aria-label="Flux de traitement des architectures d'agents">
            <Boite x={30} y={185} w={130} h={60} texte="Capteurs" couleur="#9a8f00" />
            <Boite x={740} y={185} w={130} h={60} texte="Effecteurs" couleur={COUL.vert} />
            {e === 0 && (
              <>
                <Boite x={340} y={175} w={220} h={80} texte="Règles" sous="si obstacle devant, contourner" couleur={COUL.rouge} plein />
                <Fleche de={[162, 215]} a={[338, 215]} couleur={COUL.rouge} />
                <Fleche de={[562, 215]} a={[738, 215]} couleur={COUL.rouge} />
                <Jeton points={[[160, 215], [740, 215]]} p={q} couleur={COUL.rouge} />
                <text x="450" y="300" textAnchor="middle" fontSize="14" fill="var(--texte-doux)">Temps de réaction : minimal. Mémoire : aucune.</text>
              </>
            )}
            {e === 1 && (
              <>
                <Boite x={210} y={70} w={150} h={60} texte="Modèle du monde" sous="carte de l'entrepôt" couleur={COUL.bleu} actif={p > 0.05} />
                <Boite x={390} y={70} w={150} h={60} texte="Planification" sous="A* vers l'objectif" couleur={COUL.bleu} plein actif={p > 0.2} />
                <Boite x={570} y={70} w={150} h={60} texte="Exécution" sous="suivi du plan" couleur={COUL.bleu} actif={p > 0.35} />
                <Fleche de={[95, 183]} a={[240, 132]} couleur={COUL.bleu} />
                <Fleche de={[362, 100]} a={[388, 100]} couleur={COUL.bleu} />
                <Fleche de={[542, 100]} a={[568, 100]} couleur={COUL.bleu} />
                <Fleche de={[690, 132]} a={[805, 183]} couleur={COUL.bleu} />
                <Jeton points={[[95, 185], [285, 100], [465, 100], [645, 100], [805, 185]]} p={Math.max(0.001, Math.min(0.999, (p * 1.1) % 1))} couleur={COUL.bleu} />
                <text x="450" y="300" textAnchor="middle" fontSize="14" fill="var(--texte-doux)">Chemin optimal, mais décision plus lente et plan fragile face à l'imprévu.</text>
              </>
            )}
            {e === 2 && (
              <>
                <rect x={195} y={45} width={540} height={110} rx="14" fill="none" stroke={COUL.bleu} strokeDasharray="6 5" strokeWidth="2" />
                <text x="210" y="38" fontSize="13" fontWeight="700" fill={COUL.bleu}>Couche délibérative (lente, voit loin)</text>
                <Boite x={215} y={70} w={150} h={60} texte="Modèle" couleur={COUL.bleu} />
                <Boite x={390} y={70} w={150} h={60} texte="Planification" couleur={COUL.bleu} plein />
                <Boite x={565} y={70} w={150} h={60} texte="Plan courant" couleur={COUL.bleu} />
                <rect x={195} y={275} width={540} height={110} rx="14" fill="none" stroke={COUL.rouge} strokeDasharray="6 5" strokeWidth="2" />
                <text x="210" y="405" fontSize="13" fontWeight="700" fill={COUL.rouge}>Couche réactive (rapide, voit près)</text>
                <Boite x={340} y={300} w={250} h={60} texte="Garde de sécurité" sous="le lidar confirme ou bloque" couleur={COUL.rouge} plein={seuil(p, 0.45, 0.5) > 0 && p < 0.8} />
                <Fleche de={[95, 183]} a={[240, 132]} couleur={COUL.bleu} />
                <Fleche de={[367, 100]} a={[388, 100]} couleur={COUL.bleu} />
                <Fleche de={[542, 100]} a={[563, 100]} couleur={COUL.bleu} />
                <Fleche de={[640, 132]} a={[500, 298]} couleur={COUL.bleu} />
                <Fleche de={[95, 247]} a={[338, 325]} couleur={COUL.rouge} />
                <Fleche de={[592, 330]} a={[790, 247]} couleur={COUL.vert} />
                <Fleche de={[420, 298]} a={[450, 132]} couleur={COUL.rouge} pointille actif={p > 0.5} />
                <text x="350" y="222" fontSize="12.5" fill={COUL.rouge} opacity={p > 0.5 ? 1 : 0.15}>obstacle imprévu : replanifier</text>
                <Jeton points={[[95, 185], [290, 100], [640, 100], [470, 330], [805, 245]]} p={seuil(p, 0, 0.45) * 0.998 + 0.001} couleur={COUL.bleu} />
                <Jeton points={[[430, 300], [455, 130]]} p={seuil(p, 0.5, 0.8) * 0.998 + 0.001} couleur={COUL.rouge} />
              </>
            )}
          </svg>
        );
      }}
    </Animation>
  );
}
