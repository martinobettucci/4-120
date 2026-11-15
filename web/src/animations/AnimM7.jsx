import Animation, { Boite, Fleche, Jeton, COUL, seuil } from '../composants/Animation.jsx';

// Module 7 : l'architecture d'un système agentique de traitement de dossiers, construite pas à pas.
// Les nombres sont ceux des leçons du bloc « Systèmes agentiques ».
const ETAPES = [
  { titre: 'Une famille par étape', texte: "Un agent n'est pas forcément un LLM. Le traitement d'une réclamation compte quatre étapes, chacune confiée au régime de décision qui lui convient : le LLM lit le texte libre, des règles contrôlent la conformité, un modèle statistique estime le risque, un solveur planifie. Résultat : 88,4 % de réclamations traitées sans erreur, contre 60,8 % en confiant tout au LLM." },
  { titre: 'Diffusion de la complexité', texte: "On répartit le dossier entre cinq agents spécialisés. Les fiabilités se multiplient : cinq agents à 95 % donnent une chaîne à 77,4 %. Un contrôle à la sortie de chaque agent, qui rattrape 8 erreurs sur 10, la ramène à 95,1 %. On décompose pour tester et maintenir, on contrôle pour ne pas perdre les dossiers en route." },
  { titre: 'Diffusion du risque', texte: "Sur une étape critique, trois agents de familles différentes traitent le même dossier et un arbitre tranche. Avec des erreurs indépendantes à 10 %, le vote se trompe dans 2,8 % des cas. Si deux agents font les mêmes erreurs, il se trompe dans 10 % des cas : l'arbitre doit peser des avis indépendants, pas compter des voix." },
  { titre: 'Routage, arbitrage, modération', texte: "Trois fonctions organisent la circulation. Le routeur oriente chaque demande vers la bonne file. L'arbitre choisit entre des avis divergents ou les combine. La modération contrôle ce qui entre, ce qui s'exécute et ce qui sort, et bloque ce qui ne doit pas passer." },
  { titre: 'Autonomie, contrôle humain, journal', texte: "Dernière décision de conception : jusqu'où l'agent agit seul. Deux seuils de confiance séparent la décision humaine, la proposition à valider et l'exécution automatique. Chaque étape est consignée dans un journal : entrées, règles déclenchées, scores, avis, validations, versions. Sans journal, aucun audit n'est possible." },
];

export default function AnimM7() {
  return (
    <Animation titre="Un système agentique de traitement de dossiers" etapes={ETAPES} duree={7}>
      {(e, p) => {
        const q = Math.max(0.001, Math.min(0.999, (p * 1.6) % 1));
        return (
          <svg viewBox="0 0 900 430" role="img" aria-label="Architecture d'un système agentique">
            {e === 0 && (
              <>
                <Boite x={20} y={170} w={120} h={60} texte="Réclamation" sous="texte libre" couleur="#9a8f00" />
                {[['Extraire', 'LLM · 96 %', COUL.orange], ['Conformité', 'Règles · 99 %', COUL.bleu], ['Risque', 'Statistique · 94 %', COUL.bleu], ['Planifier', 'Optimisation · 99 %', COUL.bleu]].map(([n, s, c], i) => (
                  <g key={n}><Boite x={180 + i * 180} y={165} w={150} h={70} texte={n} sous={s} couleur={c} actif={p > 0.08 + i * 0.12} />{i > 0 && <Fleche de={[332 + (i - 1) * 180, 200]} a={[378 + (i - 1) * 180, 200]} />}</g>
                ))}
                <Fleche de={[142, 200]} a={[178, 200]} />
                <Jeton points={[[140, 200], [870, 200]]} p={q} />
                <text x="450" y="300" textAnchor="middle" fontSize="16" fontWeight="700" fill={COUL.vert}>0,96 × 0,99 × 0,94 × 0,99 = 88,4 %  ·  4,6 centimes  ·  1,1 seconde</text>
                <text x="450" y="330" textAnchor="middle" fontSize="14" fill="var(--texte-doux)">Tout confier au LLM : 60,8 %, 12 centimes, 3,6 secondes</text>
              </>
            )}
            {e === 1 && (
              <>
                {['Ingestion', 'Extraction', 'Validation', 'Scoring', 'Synthèse'].map((n, i) => {
                  const controle = p > 0.55; const reste = 100 * (controle ? 0.99 : 0.95) ** (i + 1);
                  return (
                    <g key={n}>
                      <Boite x={30 + i * 172} y={120} w={140} h={64} texte={n} sous={controle ? '99 %' : '95 %'} couleur={COUL.bleu} />
                      {i < 4 && <Fleche de={[172 + i * 172, 152]} a={[200 + i * 172, 152]} />}
                      {controle && <g><circle cx={160 + i * 172} cy={120} r="13" fill={COUL.vert} /><text x={160 + i * 172} y={126} textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">✓</text></g>}
                      <rect x={30 + i * 172} y={210} width="140" height="14" rx="7" fill="var(--plan-sol)" /><rect x={30 + i * 172} y={210} width={140 * reste / 100} height="14" rx="7" fill={controle ? COUL.vert : COUL.orange} />
                      <text x={100 + i * 172} y={250} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--texte)">{reste.toFixed(1).replace('.', ',')}</text>
                    </g>
                  );
                })}
                <text x="450" y="290" textAnchor="middle" fontSize="14" fill="var(--texte-doux)">dossiers encore sans erreur, sur 100, après chaque agent</text>
                <text x="450" y="330" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--texte)">{p > 0.55 ? 'Avec un contrôle par agent : 0,99 multiplié cinq fois = 95,1 %' : 'Sans contrôle : 0,95 multiplié cinq fois = 77,4 %'}</text>
              </>
            )}
            {e === 2 && (
              <>
                <Boite x={30} y={185} w={120} h={60} texte="Dossier" couleur="#9a8f00" />
                {[['Moteur de règles', 70], ['Modèle statistique', 185], ['Agent LLM', 300]].map(([n, y], i) => (
                  <g key={n}><Boite x={300} y={y} w={200} h={60} texte={n} sous={p > 0.2 + i * 0.1 ? (i === 2 ? 'non conforme' : 'conforme') : 'analyse en cours'} couleur={COUL.bleu} /><Fleche de={[152, 215]} a={[298, y + 30]} /><Fleche de={[502, y + 30]} a={[648, 215]} /></g>
                ))}
                <Boite x={650} y={175} w={200} h={80} texte="Arbitre" sous={p > 0.55 ? 'décision : conforme' : 'compare les avis'} couleur={COUL.bleu} plein />
                <text x="450" y="405" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--texte)">Erreurs indépendantes à 10 % : vote faux dans 2,8 % des cas. Deux agents corrélés : 10 %.</text>
              </>
            )}
            {e === 3 && (
              <>
                <Boite x={20} y={185} w={120} h={60} texte="Demande" couleur="#9a8f00" />
                <Boite x={175} y={185} w={130} h={60} texte="Modération" sous="en entrée" couleur={COUL.rouge} actif={p > 0.05} />
                <Boite x={340} y={185} w={110} h={60} texte="Routeur" sous="oriente" couleur={COUL.bleu} plein actif={p > 0.2} />
                {[['File urgente', 80], ['File technique', 185], ['File administrative', 290]].map(([n, y]) => (<g key={n}><Boite x={480} y={y} w={160} h={60} texte={n} couleur={COUL.bleu} actif={p > 0.35} /><Fleche de={[452, 215]} a={[478, y + 30]} actif={p > 0.35} /><Fleche de={[642, y + 30]} a={[668, 215]} actif={p > 0.5} /></g>))}
                <Boite x={670} y={185} w={100} h={60} texte="Arbitre" sous="tranche" couleur={COUL.bleu} plein actif={p > 0.5} />
                <Boite x={790} y={185} w={100} h={60} texte="Modération" sous="en sortie" couleur={COUL.rouge} actif={p > 0.65} />
                <Fleche de={[142, 215]} a={[173, 215]} /><Fleche de={[307, 215]} a={[338, 215]} /><Fleche de={[772, 215]} a={[788, 215]} />
                <Jeton points={[[140, 215], [340, 215], [450, 215], [560, 110], [670, 215], [890, 215]]} p={q} />
                <text x="450" y="405" textAnchor="middle" fontSize="15" fill="var(--texte-doux)">Router : où va la demande. Arbitrer : quel avis l'emporte. Modérer : ce qui a le droit de passer.</text>
              </>
            )}
            {e === 4 && (
              <>
                <text x="60" y="52" fontSize="15" fontWeight="700" fill="var(--texte)">Confiance de l'agent dans sa décision</text>
                {[[60, 250, COUL.rouge, 'Décision humaine', "l'agent suggère"], [310, 260, COUL.jaune, 'Validation humaine', "l'agent prépare, un humain confirme"], [570, 270, COUL.vert, 'Exécution automatique', "sous contraintes, et journalisée"]].map(([x, w, c, t, s], i) => (
                  <g key={t} opacity={0.3 + 0.7 * seuil(p, i * 0.15, i * 0.15 + 0.1)}>
                    <rect x={x} y="90" width={w} height="46" rx="8" fill={c} /><text x={x + w / 2} y="119" textAnchor="middle" fontSize="15" fontWeight="700" fill={i === 1 ? '#0D0D0D' : '#fff'}>{t}</text>
                    <text x={x + w / 2} y="160" textAnchor="middle" fontSize="13" fill="var(--texte-doux)">{s}</text>
                  </g>
                ))}
                <text x="310" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--texte)">seuil bas</text><text x="570" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--texte)">seuil haut</text>
                <g opacity={seuil(p, 0.5, 0.62)}>
                  <rect x="60" y="210" width="780" height="150" rx="10" fill="var(--carte)" stroke={COUL.bleu} strokeWidth="2.5" />
                  <text x="80" y="240" fontSize="15" fontWeight="700" fill="var(--texte)">Journal du dossier</text>
                  {['horodatage de chaque étape', 'versions des règles, des seuils et du modèle', 'règles déclenchées et scores', "avis de chaque agent, décision de l'arbitre", 'validateur humain et sa décision', "appels d'outils et réponses"].map((l, i) => <text key={l} x={80 + (i % 2) * 390} y={270 + Math.floor(i / 2) * 28} fontSize="14" fill="var(--texte)">· {l}</text>)}
                </g>
                <text x="450" y="405" textAnchor="middle" fontSize="15" fill="var(--texte-doux)">Qui décide, qui valide, qui révise les seuils, qui surveille les dérives : la gouvernance le fixe par écrit.</text>
              </>
            )}
          </svg>
        );
      }}
    </Animation>
  );
}
