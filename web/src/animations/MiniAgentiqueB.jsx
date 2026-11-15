// Mini-animations du bloc « Systèmes agentiques » : niveaux d'autonomie, routage, arbitrage et
// modération, RAG, journalisation. Même convention que Mini.jsx : t entre 0 et 1, un dessin SVG.
import { COUL, seuil, doux } from '../composants/Animation.jsx';

const T = { fill: 'var(--texte)', fontSize: 13 };
const D = { fill: 'var(--texte-doux)', fontSize: 12 };
const Cadre = ({ children }) => <svg viewBox="0 0 440 230" role="img">{children}</svg>;
const F = (x, n) => x.toFixed(n).replace('.', ',');

// Niveaux d'autonomie : qui propose, qui décide, qui exécute. Puis le choix du niveau par les coûts.
const NIVEAUX = [
  ['Outil simple', 'répond aux commandes', 'décide de tout'],
  ['Suggestion sur demande', 'propose si on le demande', 'choisit et exécute'],
  ['Recommandation proactive', 'propose de lui-même', 'choisit et exécute'],
  ['Pré-exécution, validation humaine', "prépare l'action", 'valide avant exécution'],
  ['Exécution automatique sous contraintes', 'exécute dans ses limites', 'contrôle après coup'],
  ['Adaptation continue, supervision distante', "exécute et s'ajuste", 'supervise à distance'],
];
export function Autonomie(t) {
  const couts = t >= 0.75;
  const conf = 0.9 + 0.08 * doux(seuil(t, 0.78, 0.95));
  const auto = (1 - conf) * 40;
  const niveau = couts ? (auto < 2 ? 4 : 3) : t < 0.25 ? Math.min(2, Math.floor((t / 0.25) * 3)) : t < 0.5 ? 3 : t < 0.625 ? 4 : 5;
  return (
    <Cadre>
      {NIVEAUX.map(([nom], i) => {
        const y = 164 - i * 30; const actif = i === niveau; const coul = i <= 2 ? COUL.bleu : i === 3 ? COUL.orange : COUL.vert;
        return (
          <g key={nom} opacity={actif ? 1 : 0.75}>
            <rect x="12" y={y} width="262" height="25" rx="7" fill={actif ? coul : 'var(--carte)'} stroke={coul} strokeWidth="2" />
            <text x="26" y={y + 17} fontSize="12.5" fontWeight="700" fill={actif ? '#fff' : 'var(--texte)'}>{i}</text>
            <text x="42" y={y + 17} fontSize="11.5" fill={actif ? '#fff' : 'var(--texte)'}>{nom}</text>
          </g>
        );
      })}
      {!couts && (
        <>
          <text x="288" y="34" {...D}>Niveau {niveau}</text>
          <text x="288" y="62" {...D}>L'agent</text>
          <text x="288" y="80" fontSize="12" fontWeight="700" fill="var(--texte)">{NIVEAUX[niveau][1]}</text>
          <text x="288" y="112" {...D}>L'humain</text>
          <text x="288" y="130" fontSize="12" fontWeight="700" fill="var(--texte)">{NIVEAUX[niveau][2]}</text>
          <text x="288" y="166" {...D}>Décision finale :</text>
          <text x="288" y="184" fontSize="13" fontWeight="700" fill={niveau <= 3 ? COUL.bleu : COUL.vert}>{niveau <= 3 ? "l'humain" : "l'agent"}</text>
        </>
      )}
      {couts && (
        <>
          <text x="288" y="30" {...D}>Confiance de l'agent</text>
          <text x="288" y="50" fontSize="16" fontWeight="700" fill="var(--texte)">{F(conf * 100, 0)} %</text>
          <text x="288" y="80" {...D}>Coût espéré</text>
          <text x="288" y="100" fontSize="12" fill="var(--texte)" fontWeight={auto < 2 ? 700 : 400}>automatique : {F(auto, 2)} €</text>
          <text x="288" y="120" fontSize="12" fill="var(--texte)" fontWeight={auto < 2 ? 400 : 700}>validation : 2,00 €</text>
          <text x="288" y="150" {...D}>Bascule à 95 %</text>
          <text x="288" y="178" fontSize="13" fontWeight="700" fill={auto < 2 ? COUL.vert : COUL.orange}>Niveau retenu : {niveau}</text>
        </>
      )}
      <text x="220" y="216" textAnchor="middle" {...T}>{couts ? 'Une erreur automatique coûte 40 €, une validation 2 €' : niveau <= 2 ? "Niveaux 0 à 2 : l'agent informe, l'humain décide et agit" : niveau === 3 ? "Niveau 3 : l'agent prépare, l'humain valide" : "Niveaux 4 et 5 : l'agent agit, l'humain surveille"}</text>
    </Cadre>
  );
}

// Routage (orienter), arbitrage (trancher), modération (autoriser) : trois rôles, trois lignes.
export function Routage(t) {
  const ph = t < 0.31 ? 0 : t < 0.63 ? 1 : 2;
  const p0 = seuil(t, 0.04, 0.26); const p1 = seuil(t, 0.35, 0.58); const p2 = seuil(t, 0.67, 0.9);
  const etiq = (y, n, nom, actif) => (<g opacity={actif ? 1 : 0.4}><circle cx="22" cy={y} r="10" fill={COUL.bleu} /><text x="22" y={y + 4} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff">{n}</text><text x="38" y={y + 4} fontSize="12" fontWeight="700" fill="var(--texte)">{nom}</text></g>);
  // Boîte à une ou deux lignes : titre en gras, détail en dessous.
  const boite = (x, y, w, titre, detail, etat) => {
    const h = detail ? 34 : 24; const enc = etat ? '#0D0D0D' : 'var(--texte)';
    return (<g><rect x={x} y={y} width={w} height={h} rx="6" fill={etat === 'choisi' ? COUL.jaune : etat === 'alerte' ? COUL.orange : 'var(--carte)'} stroke={etat ? COUL.noir : 'var(--bord)'} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + (detail ? 14 : 16)} textAnchor="middle" fontSize="11" fontWeight={detail ? 700 : 400} fill={enc}>{titre}</text>
      {detail && <text x={x + w / 2} y={y + 27} textAnchor="middle" fontSize="10.5" fill={enc}>{detail}</text>}</g>);
  };
  return (
    <Cadre>
      {etiq(16, 1, 'Routage : vers quel traitement ?', ph === 0)}
      <g opacity={ph === 0 ? 1 : 0.4}>
        <text x="12" y="48" fontSize="11" fill="var(--texte)">« Portail inaccessible »</text>
        <line x1="134" y1="44" x2="148" y2="44" stroke={COUL.gris} strokeWidth="2" />
        {boite(150, 32, 84, 'Administratif', null, false)}{boite(240, 32, 76, 'Commercial', null, false)}{boite(322, 32, 110, 'Incident technique', null, p0 >= 1 ? 'choisi' : false)}
      </g>
      {etiq(76, 2, 'Arbitrage : quel avis retenir ?', ph === 1)}
      <g opacity={ph === 1 ? 1 : 0.4}>
        {boite(12, 90, 96, 'Règles', 'accepter, 0,9', false)}{boite(114, 90, 96, 'Score', 'accepter, 0,6', false)}{boite(216, 90, 96, 'LLM', 'refuser, 0,8', false)}
        {p1 >= 0.5 && (p1 >= 1 ? boite(322, 90, 110, 'Escalade humaine', 'accord 65 % < 70 %', 'alerte') : boite(322, 90, 110, '1,5 contre 0,8', 'accord 65 %', 'choisi'))}
      </g>
      {etiq(142, 3, 'Modération : est-ce permis ?', ph === 2)}
      <g opacity={ph === 2 ? 1 : 0.4}>
        {boite(12, 156, 120, 'Entrée', 'demande admise', p2 > 0.15 ? 'choisi' : false)}{boite(138, 156, 120, 'Exécution', 'outil autorisé', p2 > 0.5 ? 'choisi' : false)}{boite(264, 156, 168, 'Sortie', 'numéro de compte masqué', p2 >= 1 ? 'alerte' : false)}
      </g>
      <text x="220" y="216" textAnchor="middle" {...T}>{['Le routeur oriente la demande vers une seule file', "Trois avis concurrents : l'arbitre tranche ou fait remonter", 'Le modérateur contrôle avant, pendant et après'][ph]}</text>
    </Cadre>
  );
}

// RAG : le modèle seul invente, la recherche trouve le passage, la génération s'appuie dessus.
export function Rag(t) {
  const ph = t < 0.29 ? 0 : t < 0.63 ? 1 : 2;
  const p1 = seuil(t, 0.32, 0.58);
  const passages = [['Le dossier se dépose sur le portail.', 0], ["L'aide est plafonnée à 40 % du devis.", 3], ["L'aide est versée après la facture.", 1], ['Un refus peut être contesté.', 0]];
  return (
    <Cadre>
      <text x="14" y="22" {...T} fontWeight="700">Question : à combien l'aide est-elle plafonnée ?</text>
      {ph === 0 && (
        <>
          <rect x="60" y="62" width="320" height="64" rx="10" fill="var(--carte)" stroke={COUL.rouge} strokeWidth="2" />
          <text x="220" y="88" textAnchor="middle" {...D}>Modèle de langage seul, sans le règlement</text>
          <text x="220" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--texte)">« Probablement 50 % du devis. »</text>
          <text x="220" y="150" textAnchor="middle" fontSize="12" fill={COUL.rouge} fontWeight="700">Réponse plausible, inventée, sans source</text>
        </>
      )}
      {ph >= 1 && passages.map(([txt, score], i) => {
        const y = 36 + i * 30; const garde = i === 1 && (ph === 2 || p1 >= 1);
        return (
          <g key={txt} opacity={ph === 2 && i !== 1 ? 0.3 : 1}>
            <rect x="14" y={y} width="270" height="24" rx="6" fill={garde ? COUL.jaune : 'var(--carte)'} stroke={garde ? COUL.noir : 'var(--bord)'} />
            <text x="22" y={y + 16} fontSize="11.5" fill={garde ? '#0D0D0D' : 'var(--texte)'}><tspan fontWeight="700">{i + 1}</tspan>  {txt}</text>
            <rect x="294" y={y + 5} width={score * 30 * (ph === 2 ? 1 : p1)} height="14" rx="4" fill={i === 1 ? COUL.vert : COUL.gris} />
            <text x={300 + score * 30} y={y + 17} fontSize="12" fontWeight="700" fill="var(--texte)">{ph === 2 || p1 >= 1 ? score : ''}</text>
          </g>
        );
      })}
      {ph === 1 && <text x="14" y="176" {...D}>Score = somme des poids des mots communs : aide 1, plafonnée 2</text>}
      {ph === 2 && (
        <>
          <rect x="14" y="160" width="412" height="34" rx="8" fill="var(--carte)" stroke={COUL.vert} strokeWidth="2" />
          <text x="24" y="182" fontSize="12.5" fontWeight="700" fill="var(--texte)">« 40 % du devis. »  <tspan fontWeight="400" fill="var(--texte-doux)">Source : passage 2 du règlement</tspan></text>
        </>
      )}
      <text x="220" y="216" textAnchor="middle" {...T}>{['Sans document, le modèle répond de mémoire', 'Étage 1 : rechercher les passages les plus proches', 'Étage 2 : générer la réponse à partir du passage'][ph]}</text>
    </Cadre>
  );
}

// Journalisation : chaque étape du traitement écrit une ligne, que l'audit relira.
export function Journal(t) {
  const ph = t < 0.46 ? 0 : t < 0.71 ? 1 : 2;
  const p = seuil(t, 0.03, 0.4);
  const etapes = ['Réception', 'Règles', 'Arbitrage', 'Validation'];
  const lignes = [
    ['09:14:02', 'réception', 'dossier 2417, empreinte du devis 9f3c'],
    ['09:14:03', 'règles v12', 'R4 : devis 23 500 € > 20 000 €'],
    ['09:14:05', 'arbitrage', 'règles : commission, score 0,31 : accepter'],
    ['14:02:40', 'validation', 'agent V-07 confirme la commission'],
  ];
  const nb = ph > 0 ? 4 : Math.min(4, Math.floor(p * 4 + 0.001) + (p > 0 ? 1 : 0));
  const k = Math.min(3, Math.max(0, nb - 1));
  const vise = ph === 1 ? [1] : ph === 2 ? [3] : [];
  return (
    <Cadre>
      {etapes.map((e, i) => (
        <g key={e}>
          <rect x={14 + i * 106} y="10" width="94" height="26" rx="8" fill={ph === 0 && i === k && nb > 0 ? COUL.bleu : 'var(--carte)'} stroke={COUL.bleu} strokeWidth="2" />
          <text x={61 + i * 106} y="27" textAnchor="middle" fontSize="12" fontWeight="700" fill={ph === 0 && i === k && nb > 0 ? '#fff' : 'var(--texte)'}>{e}</text>
          {i < 3 && <line x1={108 + i * 106} y1="23" x2={120 + i * 106} y2="23" stroke={COUL.gris} strokeWidth="2" />}
        </g>
      ))}
      <text x="14" y="56" {...D}>Journal du dossier 2417</text>
      {lignes.slice(0, nb).map(([h, etape, txt], i) => (
        <g key={h}>
          <rect x="14" y={62 + i * 26} width="412" height="22" rx="5" fill={vise.includes(i) ? COUL.jaune : 'var(--plan-sol)'} stroke={vise.includes(i) ? COUL.noir : 'none'} />
          <text x="20" y={77 + i * 26} fontSize="11" fill={vise.includes(i) ? '#0D0D0D' : 'var(--texte)'} fontFamily="ui-monospace, monospace">{h}</text>
          <text x="84" y={77 + i * 26} fontSize="11" fontWeight="700" fill={vise.includes(i) ? '#0D0D0D' : 'var(--texte)'}>{etape}</text>
          <text x="158" y={77 + i * 26} fontSize="11" fill={vise.includes(i) ? '#0D0D0D' : 'var(--texte)'}>{txt}</text>
        </g>
      ))}
      {ph >= 1 && <text x="14" y="188" fontSize="12.5" fontWeight="700" fill="var(--texte)">{ph === 1 ? 'Audit : pourquoi ce dossier est-il passé en commission ?' : 'Audit : un humain a-t-il validé, qui et quand ?'}</text>}
      <text x="220" y="216" textAnchor="middle" {...T}>{['Chaque étape écrit une ligne structurée', 'La règle R4, version 12 : devis au-dessus de 20 000 €', "L'agent V-07, à 14 h 02 : la réponse est dans le journal"][ph]}</text>
    </Cadre>
  );
}
