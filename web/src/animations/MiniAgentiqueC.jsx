// Mini-animations du bloc « Systèmes agentiques » (troisième partie) : composantes d'un agent,
// agents non LLM en profondeur, design patterns, implémentation, évaluation, cas d'usage.
// Même convention que Mini.jsx : t entre 0 et 1, un dessin SVG reproductible.
import { COUL, seuil } from '../composants/Animation.jsx';

const T = { fill: 'var(--texte)', fontSize: 13 };
const D = { fill: 'var(--texte-doux)', fontSize: 12 };
const Cadre = ({ children }) => <svg viewBox="0 0 440 230" role="img">{children}</svg>;
const F = (x, n) => x.toFixed(n).replace('.', ',');
const Legende = ({ children }) => <text x="220" y="218" textAnchor="middle" {...T}>{children}</text>;
const fleche = (x1, y1, x2, y2, coul = COUL.gris) => { const a = Math.atan2(y2 - y1, x2 - x1); const p = (d, s) => `${x2 - d * Math.cos(a) + s * Math.sin(a)},${y2 - d * Math.sin(a) - s * Math.cos(a)}`; return <g><line x1={x1} y1={y1} x2={x2 - 5 * Math.cos(a)} y2={y2 - 5 * Math.sin(a)} stroke={coul} strokeWidth="2" /><polygon points={`${x2},${y2} ${p(8, 4)} ${p(8, -4)}`} fill={coul} /></g>; };
const boite = (x, y, w, h, titre, detail, coul = COUL.bleu, plein = false, taille = 11.5) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="7" fill={plein ? coul : 'var(--carte)'} stroke={coul} strokeWidth="2" />
    <text x={x + w / 2} y={y + (detail ? h / 2 - 2 : h / 2 + 4)} textAnchor="middle" fontSize={taille} fontWeight="700" fill={plein ? '#fff' : 'var(--texte)'}>{titre}</text>
    {detail && <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontSize="10.5" fill={plein ? '#fff' : 'var(--texte-doux)'}>{detail}</text>}
  </g>
);

// --------------------------------------------------------------- Composantes
// Le cycle d'un agent, la différence avec un chatbot, puis la fiche de diagnostic en sept questions.
const CYCLE = [['Perception', 'ticket reçu'], ['Représentation', 'charge des équipes'], ["Sélection d'action", 'règles, puis score'], ['Action', 'ticket affecté']];
const FICHE = [["Ce qu'il perçoit", 'les tickets entrants'], ['Comment il représente', 'la charge de chaque équipe'], ['Comment il décide', 'des règles, puis un score'], ['Sur quoi il agit', "la file d'une équipe"], ['Son autonomie', 'exécution automatique sous contraintes'], ['Son contrôle', 'un responsable peut réaffecter'], ['Sa qualité', 'part des tickets bien affectés']];
export function Composantes(t) {
  const ph = t < 0.3 ? 0 : t < 0.6 ? 1 : 2;
  const vus = Math.min(7, Math.floor(seuil(t, 0.62, 0.9) * 7.999));
  return (
    <Cadre>
      {ph === 0 && <>
        <text x="14" y="24" {...D}>Moteur d'allocation de tickets</text>
        {CYCLE.map(([n, s], i) => { const [x, y] = [[14, 36], [246, 36], [246, 112], [14, 112]][i]; return <g key={n} opacity={seuil(t, i * 0.05, i * 0.05 + 0.05)}>{boite(x, y, 180, 46, n, s, i === 3 ? COUL.vert : COUL.bleu)}</g>; })}
        <g opacity={seuil(t, 0.05, 0.1)}>{fleche(194, 59, 246, 59)}</g><g opacity={seuil(t, 0.1, 0.15)}>{fleche(336, 82, 336, 112)}</g><g opacity={seuil(t, 0.15, 0.2)}>{fleche(246, 135, 194, 135)}</g>
        <g opacity={seuil(t, 0.2, 0.26)}>{fleche(104, 112, 104, 82, COUL.orange)}<text x="220" y="184" textAnchor="middle" {...D}>l'action modifie l'environnement, qui est perçu de nouveau</text></g>
        <Legende>Un agent : percevoir, représenter, choisir une action, agir</Legende>
      </>}
      {ph === 1 && <>
        <text x="14" y="26" {...T} fontWeight="700">FAQ conversationnelle</text>
        {boite(14, 36, 110, 38, 'Question', "de l'usager", COUL.gris)}{fleche(124, 55, 150, 55)}{boite(150, 36, 110, 38, 'Réponse', 'un texte', COUL.gris)}
        <text x="274" y="60" fontSize="12.5" fontWeight="700" fill={COUL.rouge}>répond, n'agit pas</text>
        <g opacity={seuil(t, 0.38, 0.46)}>
          <text x="14" y="112" {...T} fontWeight="700">Moteur d'allocation de tickets</text>
          {boite(14, 122, 110, 38, 'Ticket', 'un signal')}{fleche(124, 141, 150, 141)}{boite(150, 122, 110, 38, 'Décision', 'quelle équipe ?')}{fleche(260, 141, 286, 141)}{boite(286, 122, 140, 38, 'Action', 'la file est modifiée', COUL.vert, true)}
          <text x="14" y="182" fontSize="12.5" fontWeight="700" fill={COUL.vert}>agit sur son environnement, sans conversation</text>
        </g>
        <Legende>Un agent se définit par sa capacité à agir, pas à répondre</Legende>
      </>}
      {ph === 2 && <>
        <text x="14" y="20" {...D}>Fiche de diagnostic du moteur d'allocation de tickets</text>
        {FICHE.slice(0, vus).map(([q, r], i) => <g key={q}><rect x="14" y={28 + i * 24} width="412" height="20" rx="5" fill="var(--plan-sol)" /><text x="22" y={42 + i * 24} fontSize="11.5" fontWeight="700" fill="var(--texte)">{i + 1}. {q}</text><text x="190" y={42 + i * 24} fontSize="11.5" fill="var(--texte)">{r}</text></g>)}
        <Legende>Sept questions pour diagnostiquer n'importe quel système</Legende>
      </>}
    </Cadre>
  );
}

// -------------------------------------------------------------------- NonLlm
// Trois agents sans LLM : un moteur d'éligibilité, une heuristique de priorité, un score avec sa politique.
const CONTROLES = [["Pièce d'identité valide", true], ['Justificatif de domicile récent', true], ['Âge minimal requis', true], ['Aucun document manquant', false], ['Dates cohérentes', true]];
const TICKETS = [['A', 4, 2, 1, 0, 0], ['B', 2, 3, 5, 1, 1], ['C', 5, 1, 2, 0, 0]];
export const POIDS_DEMO = [3, 2, 1, 4, 3];
export const scoreTicket = (p, t) => p[0] * t[1] + p[1] * t[2] + p[2] * t[3] + p[3] * t[4] + p[4] * t[5];
export function NonLlm(t) {
  const ph = t < 0.3 ? 0 : t < 0.62 ? 1 : 2;
  const vus = Math.min(5, Math.floor(seuil(t, 0.03, 0.2) * 5.999));
  const classes = [...TICKETS].sort((a, b) => scoreTicket(POIDS_DEMO, b) - scoreTicket(POIDS_DEMO, a)).map((x) => x[0]);
  const p = 0.1 + 0.75 * seuil(t, 0.66, 0.9); const zone = p < 0.2 ? 0 : p < 0.7 ? 1 : 2;
  return (
    <Cadre>
      {ph === 0 && <>
        <text x="14" y="20" {...D}>Moteur d'éligibilité : cinq contrôles</text>
        {CONTROLES.map(([n, ok], i) => <g key={n} opacity={i < vus ? 1 : 0.25}><rect x="14" y={28 + i * 27} width="226" height="22" rx="5" fill="var(--plan-sol)" /><text x="22" y={43 + i * 27} fontSize="11.5" fill="var(--texte)">{n}</text>{i < vus && <text x="224" y={44 + i * 27} textAnchor="middle" fontSize="13" fontWeight="700" fill={ok ? COUL.vert : COUL.rouge}>{ok ? '✓' : '✗'}</text>}</g>)}
        <text x="262" y="20" {...D}>Quatre décisions possibles</text>
        {['Accepté', 'Incomplet', 'Rejeté', 'Escalade humaine'].map((d, i) => { const choisi = i === 1 && t >= 0.22; return <g key={d}><rect x="262" y={28 + i * 34} width="164" height="27" rx="7" fill={choisi ? COUL.orange : 'var(--carte)'} stroke={choisi ? COUL.noir : COUL.bleu} strokeWidth="2" /><text x="344" y={46 + i * 34} textAnchor="middle" fontSize="12" fontWeight="700" fill={choisi ? '#0D0D0D' : 'var(--texte)'}>{d}</text></g>; })}
        <Legende>Agent à règles : chaque décision cite le contrôle en cause</Legende>
      </>}
      {ph === 1 && <>
        {['Ticket', 'Gravité', 'Secteur', 'Attente', 'Délai', 'Client', 'Score', 'Rang'].map((h, j) => <text key={h} x={[18, 62, 110, 160, 212, 270, 348, 396][j]} y="22" fontSize="11.5" fontWeight="700" fill="var(--texte-doux)">{h}</text>)}
        {TICKETS.map((k, i) => { const vu = seuil(t, 0.33 + i * 0.06, 0.37 + i * 0.06) >= 1; const rang = classes.indexOf(k[0]) + 1; return (
          <g key={k[0]}>
            <rect x="10" y={32 + i * 34} width="420" height="26" rx="6" fill={vu && t >= 0.55 && rang === 1 ? COUL.jaune : 'var(--plan-sol)'} />
            {[k[0], k[1], k[2], `${k[3]} j`, k[4] ? 'dépassé' : 'tenu', k[5] ? 'stratégique' : 'courant'].map((v, j) => <text key={j} x={[18, 62, 110, 160, 212, 270][j]} y={50 + i * 34} fontSize={j > 3 ? 11 : 12} fontWeight={j === 0 ? 700 : 400} fill={vu && t >= 0.55 && rang === 1 ? '#0D0D0D' : 'var(--texte)'}>{v}</text>)}
            {vu && <text x="348" y={50 + i * 34} fontSize="13" fontWeight="700" fill={t >= 0.55 && rang === 1 ? '#0D0D0D' : 'var(--texte)'}>{scoreTicket(POIDS_DEMO, k)}</text>}
            {t >= 0.55 && <text x="396" y={50 + i * 34} fontSize="12" fontWeight="700" fill={rang === 1 ? '#0D0D0D' : 'var(--texte)'}>{rang === 1 ? '1er' : `${rang}e`}</text>}
          </g>); })}
        <text x="14" y="152" {...D}>Score = 3 × gravité + 2 × secteur + 1 × jours d'attente</text>
        <text x="14" y="170" {...D}>+ 4 si le délai contractuel est dépassé + 3 si le client est stratégique</text>
        {t >= 0.55 && <text x="14" y="192" fontSize="12" fontWeight="700" fill={COUL.rouge}>Le ticket C, de gravité 5, passe après B, de gravité 2</text>}
        <Legende>Agent heuristique : un score, puis un tri</Legende>
      </>}
      {ph === 2 && <>
        <text x="14" y="22" {...D}>Probabilité de fraude estimée par le modèle</text>
        {[[0, 0.2, COUL.vert, 'Traitement normal'], [0.2, 0.7, COUL.jaune, 'Contrôle complémentaire'], [0.7, 1, COUL.rouge, 'Escalade immédiate']].map(([a, b, c, n], i) => (
          <g key={n}><rect x={20 + a * 400} y="60" width={(b - a) * 400} height="34" fill={c} opacity={zone === i ? 1 : 0.35} /><text x={20 + ((a + b) / 2) * 400} y="81" textAnchor="middle" fontSize="11" fontWeight="700" fill={zone === i && i !== 1 ? '#fff' : '#0D0D0D'}>{i === 0 ? 'Normal' : n}</text></g>))}
        <text x="100" y="112" textAnchor="middle" {...D}>seuil bas 0,20</text><text x="300" y="112" textAnchor="middle" {...D}>seuil haut 0,70</text>
        <polygon points={`${20 + p * 400},58 ${14 + p * 400},44 ${26 + p * 400},44`} fill={COUL.noir} /><text x={20 + p * 400} y="38" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--texte)">{F(p, 2)}</text>
        <text x="220" y="150" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--texte)">Action : {['traitement normal', 'contrôle complémentaire', 'escalade immédiate'][zone]}</text>
        <text x="220" y="176" textAnchor="middle" {...D}>le modèle produit le score, la politique d'action fixe les seuils</text>
        <Legende>Agent statistique : un score seul ne décide rien</Legende>
      </>}
    </Cadre>
  );
}

// ------------------------------------------------------------------ Patterns
// Trois organisations de cinq agents, puis deux patterns de robustesse chiffrés sur 1 000 demandes.
const LIGNES_PATTERNS = [['Score seul', 40, 0], ['Avec un contradicteur dédié', 20, 56], ['Double validation', 4, 132]];
export function Patterns(t) {
  const ph = t < 0.3 ? 0 : t < 0.62 ? 1 : 2;
  const cercle = (cx, cy, k) => { const a = -Math.PI / 2 + (k * 2 * Math.PI) / 5; return [cx + 40 * Math.cos(a), cy + 40 * Math.sin(a)]; };
  const noeud = ([x, y], k, coul = COUL.bleu) => <circle key={k} cx={x} cy={y} r="9" fill={coul} />;
  const trait = ([x1, y1], [x2, y2], k) => <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COUL.gris} strokeWidth="2" />;
  const table = (nb) => (
    <g>
      {['', 'Acceptées à tort', 'En revue humaine'].map((h, j) => <text key={j} x={[18, 220, 326][j]} y="112" fontSize="11.5" fontWeight="700" fill="var(--texte-doux)">{h}</text>)}
      {LIGNES_PATTERNS.slice(0, nb).map(([n, fa, h], i) => <g key={n}><rect x="10" y={118 + i * 26} width="420" height="22" rx="5" fill={i === nb - 1 ? COUL.jaune : 'var(--plan-sol)'} />{[n, fa, h].map((v, j) => <text key={j} x={[18, 220, 326][j]} y={133 + i * 26} fontSize="12" fontWeight={j === 0 ? 400 : 700} fill={i === nb - 1 ? '#0D0D0D' : 'var(--texte)'}>{v}</text>)}</g>)}
    </g>
  );
  return (
    <Cadre>
      {ph === 0 && <>
        {[['Pipeline linéaire', '4 liens', 0], ['Superviseur central', '5 liens', 0.08], ["Réseau d'agents", '10 liens', 0.16]].map(([n, l, d], i) => <g key={n} opacity={seuil(t, d, d + 0.06)}><text x={76 + i * 144} y="22" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--texte)">{n}</text><text x={76 + i * 144} y="168" textAnchor="middle" fontSize="13" fontWeight="700" fill={i === 2 ? COUL.rouge : COUL.vert}>{l}</text></g>)}
        <g opacity={seuil(t, 0, 0.06)}>{[0, 1, 2, 3].map((k) => trait([28 + k * 24, 90], [52 + k * 24, 90], k))}{[0, 1, 2, 3, 4].map((k) => noeud([28 + k * 24, 90], k))}</g>
        <g opacity={seuil(t, 0.08, 0.14)}>{[0, 1, 2, 3, 4].map((k) => trait([220, 92], cercle(220, 92, k), k))}{[0, 1, 2, 3, 4].map((k) => noeud(cercle(220, 92, k), k))}{noeud([220, 92], 's', COUL.orange)}</g>
        <g opacity={seuil(t, 0.16, 0.22)}>{[0, 1, 2, 3, 4].flatMap((a) => [0, 1, 2, 3, 4].filter((b) => b > a).map((b) => trait(cercle(364, 92, a), cercle(364, 92, b), `${a}${b}`)))}{[0, 1, 2, 3, 4].map((k) => noeud(cercle(364, 92, k), k))}</g>
        <text x="220" y="192" textAnchor="middle" {...D}>en orange, le superviseur : il distribue, collecte et contrôle</text>
        <Legende>Trois façons de relier cinq agents</Legende>
      </>}
      {ph === 1 && <>
        {boite(14, 22, 122, 44, 'Score de risque', 'propose : accepter')}{fleche(136, 44, 160, 44)}{boite(160, 22, 122, 44, 'Contradicteur', 'cherche une objection', COUL.orange)}{fleche(282, 44, 306, 44)}{boite(306, 22, 120, 44, 'Exécution', 'ou revue humaine', COUL.vert)}
        <text x="14" y="88" {...D}>1 000 demandes de prêt, dont 200 à refuser</text>
        {table(t < 0.42 ? 1 : 2)}
        <Legende>Un contradicteur conteste la proposition avant l'exécution</Legende>
      </>}
      {ph === 2 && <>
        {boite(14, 12, 122, 36, 'Règles', 'conformité')}{boite(14, 54, 122, 36, 'Score de risque', 'risque faible')}{fleche(136, 30, 172, 46)}{fleche(136, 72, 172, 56)}{boite(172, 30, 122, 42, 'Accord des deux ?', 'sinon revue humaine', COUL.orange)}{fleche(294, 51, 318, 51)}{boite(318, 30, 108, 42, 'Exécution', null, COUL.vert, true)}
        {table(3)}
        <Legende>Double validation : agir seulement si les deux s'accordent</Legende>
      </>}
    </Cadre>
  );
}

// ------------------------------------------------------------ Implementation
// L'arborescence du projet, le trajet d'un dossier entre les modules, puis le plan de test.
const ARBRE = [['main.py', "point d'entrée"], ['src/router.py', 'oriente vers une file'], ['src/agents/', 'règles, score, LLM'], ['src/arbiter.py', 'compare les avis, tranche'], ['src/moderator.py', 'autorise, borne ou bloque'], ['src/utils/logger.py', 'journal structuré'], ['tests/', 'unitaires, intégration, bout en bout']];
const TESTS = [['Règles', '5 règles × 3 cas', 15], ['Routeur', '5 files + la file par défaut', 6], ['Arbitre', '2 × 2 × 2 combinaisons de trois avis', 8], ['Bout en bout', '3 décisions possibles', 3]];
export function Implementation(t) {
  const ph = t < 0.3 ? 0 : t < 0.62 ? 1 : 2;
  const vus = Math.min(7, Math.floor(seuil(t, 0.02, 0.24) * 7.999));
  const q = seuil(t, 0.34, 0.58); const actif = Math.min(3, Math.floor(q * 4));
  const nbT = Math.min(4, Math.floor(seuil(t, 0.64, 0.84) * 4.999));
  return (
    <Cadre>
      {ph === 0 && <>
        <text x="14" y="20" {...D}>Arborescence du projet</text>
        {ARBRE.slice(0, vus).map(([f, r], i) => <g key={f}><rect x="14" y={28 + i * 24} width="412" height="20" rx="5" fill="var(--plan-sol)" /><text x="22" y={42 + i * 24} fontSize="11.5" fontWeight="700" fill="var(--texte)" fontFamily="ui-monospace, monospace">{f}</text><text x="200" y={42 + i * 24} fontSize="11.5" fill="var(--texte)">{r}</text></g>)}
        <Legende>Une responsabilité par couche, un module par rôle</Legende>
      </>}
      {ph === 1 && <>
        {['router.py', 'agents/', 'arbiter.py', 'moderator.py'].map((m, i) => <g key={m}>{boite(12 + i * 106, 40, 96, 44, m, ['oriente', 'trois avis', 'tranche', 'autorise'][i], COUL.bleu, i === actif && q < 1)}{i < 3 && fleche(108 + i * 106, 62, 118 + i * 106, 62)}{(i <= actif) && fleche(60 + i * 106, 84, 60 + i * 106, 126, COUL.orange)}</g>)}
        <rect x="12" y="128" width="414" height="34" rx="7" fill="var(--carte)" stroke={COUL.orange} strokeWidth="2" /><text x="219" y="149" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--texte)" fontFamily="ui-monospace, monospace">utils/logger.py : {Math.min(4, actif + 1)} ligne(s) écrite(s)</text>
        <text x="220" y="186" textAnchor="middle" {...D}>chaque module consigne sa décision et sa raison avant de passer la main</text>
        <Legende>Un dossier traverse quatre modules et laisse quatre lignes</Legende>
      </>}
      {ph === 2 && <>
        <text x="14" y="20" {...D}>Plan de test du système</text>
        {TESTS.slice(0, nbT).map(([n, d, k], i) => <g key={n}><rect x="14" y={28 + i * 30} width="412" height="24" rx="5" fill="var(--plan-sol)" /><text x="22" y={44 + i * 30} fontSize="12" fontWeight="700" fill="var(--texte)">{n}</text><text x="118" y={44 + i * 30} fontSize="12" fill="var(--texte)">{d}</text><text x="414" y={44 + i * 30} textAnchor="end" fontSize="13" fontWeight="700" fill="var(--texte)">{k}</text></g>)}
        {t >= 0.86 && <><line x1="330" y1="152" x2="426" y2="152" stroke={COUL.noir} strokeWidth="1.5" /><text x="22" y="172" fontSize="13" fontWeight="700" fill="var(--texte)">Total : 15 + 6 + 8 + 3</text><text x="414" y="172" textAnchor="end" fontSize="15" fontWeight="700" fill={COUL.vert}>32</text></>}
        <Legende>32 cas de test, écrits avant la mise en service</Legende>
      </>}
    </Cadre>
  );
}

// ---------------------------------------------------------------- Evaluation
// Trois journaux, trois familles d'indicateurs : routage, arbitrage, modération.
export function Evaluation(t) {
  const ph = t < 0.3 ? 0 : t < 0.62 ? 1 : 2;
  const barre = (parts, total) => { let x = 20; return parts.map(([n, coul, lib]) => { const w = (n / total) * 400; const g = <g key={lib}><rect x={x} y="40" width={w} height="30" fill={coul} />{w > 50 && lib && <text x={x + w / 2} y="60" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={coul === COUL.jaune ? '#0D0D0D' : '#fff'}>{lib}</text>}</g>; x += w; return g; }); };
  const lignes = (l, debut) => l.map(([a, b], i) => <g key={a} opacity={seuil(t, debut + i * 0.05, debut + i * 0.05 + 0.04)}><text x="20" y={104 + i * 26} fontSize="12.5" fill="var(--texte)">{a}</text><text x="420" y={104 + i * 26} textAnchor="end" fontSize="13" fontWeight="700" fill="var(--texte)">{b}</text></g>);
  return (
    <Cadre>
      {ph === 0 && <>
        <text x="20" y="26" {...D}>Routage : 1 000 messages dont on connaît la bonne file</text>
        {barre([[920, COUL.vert, '920 dans la bonne file'], [60, COUL.jaune, ''], [20, COUL.rouge, '']], 1000)}
        {lignes([['Taux de routage correct : 920 / 1 000', '92 %'], ['Taux de retour, 60 messages renvoyés par leur file', '6 %'], ['Traités par une file inadaptée : 20 / 1 000', '2 %']], 0.06)}
        <Legende>Un routeur se mesure sur un banc de messages étiquetés</Legende>
      </>}
      {ph === 1 && <>
        <text x="20" y="26" {...D}>Arbitrage : 1 000 dossiers, trois avis par dossier</text>
        {barre([[776, COUL.vert, '776 accords justes'], [24, COUL.rouge, ''], [200, COUL.jaune, '200']], 1000)}
        {lignes([['Accords unanimes : 800. Désaccords détectés', '200'], ["Taux d'accord trompeur : 24 accords faux / 800", '3 %'], ['Erreurs finales : 100 avec un agent seul, 40 avec arbitre', ''], ['Réduction des erreurs finales : (100 - 40) / 100', '60 %']], 0.36)}
        <Legende>Un accord unanime peut être faux : on le mesure aussi</Legende>
      </>}
      {ph === 2 && <>
        <text x="20" y="26" {...D}>Modération : 64 actions bloquées sur 1 000, dont 50 à risque</text>
        {barre([[45, COUL.vert, '45 bloquées à juste titre'], [19, COUL.rouge, '19 à tort']], 64)}
        {lignes([['Blocages à juste titre : 45 / 64', '70 %'], ['Faux positifs : 19 actions légitimes sur 950', '2 %'], ['Incidents évités : 45 actions à risque sur 50', '90 %']], 0.66)}
        <Legende>Un modérateur se juge aussi sur ce qu'il bloque à tort</Legende>
      </>}
    </Cadre>
  );
}

// ------------------------------------------------------------------ CasUsage
// Deux cas d'usage du support, puis l'équilibre entre déterminisme et flexibilité.
export function CasUsage(t) {
  const ph = t < 0.3 ? 0 : t < 0.62 ? 1 : 2;
  return (
    <Cadre>
      {ph === 0 && <>
        <text x="14" y="22" {...D}>Cas d'usage : tri et routage de tickets</text>
        {[['Intention', 'LLM', COUL.orange], ['Routage', 'règles', COUL.bleu], ['Priorité', 'règles', COUL.bleu], ['Ordre', 'heuristique', COUL.bleu], ['Modération', 'règles', COUL.rouge]].map(([n, f, c], i) => <g key={n} opacity={seuil(t, i * 0.04, i * 0.04 + 0.04)}>{boite(8 + i * 86, 60, 78, 52, n, f, c)}{i < 4 && fleche(86 + i * 86, 86, 94 + i * 86, 86)}</g>)}
        <text x="220" y="146" textAnchor="middle" {...D}>le LLM comprend la demande, il n'affecte pas le ticket</text>
        <text x="220" y="168" textAnchor="middle" {...D}>la modération écarte ce qui sort du périmètre automatisé</text>
        <Legende>Une famille par étape, un rôle par composant</Legende>
      </>}
      {ph === 1 && <>
        <text x="14" y="20" {...D}>Cas d'usage : analyse de dossiers complexes</text>
        {['Extraction', 'Enrichissement', 'Validation', 'Scoring', 'Synthèse'].map((n, i) => <g key={n}>{boite(8 + i * 86, 30, 78, 30, n, null, COUL.bleu, false, 9.5)}{i < 4 && fleche(86 + i * 86, 45, 94 + i * 86, 45)}</g>)}
        <g opacity={seuil(t, 0.38, 0.44)}>{fleche(391, 60, 391, 82, COUL.orange)}{boite(250, 82, 182, 40, 'Si le risque est élevé', 'trois avis et un arbitre', COUL.orange)}</g>
        <g opacity={seuil(t, 0.46, 0.52)}>
          <text x="14" y="146" fontSize="12.5" fill="var(--texte)">Trois avis pour les 1 000 dossiers : <tspan fontWeight="700">3 000 traitements</tspan></text>
          <text x="14" y="168" fontSize="12.5" fill="var(--texte)">Trois avis pour les 250 dossiers à risque : <tspan fontWeight="700" fill={COUL.vert}>1 500 traitements</tspan></text>
          <text x="14" y="190" fontSize="12.5" fill="var(--texte)">Erreurs sur ces 250 dossiers : <tspan fontWeight="700">25 avec un avis, 7 avec trois</tspan></text>
        </g>
        <Legende>Diffuser le risque seulement là où l'enjeu le justifie</Legende>
      </>}
      {ph === 2 && <>
        <rect x="14" y="14" width="200" height="170" rx="9" fill="var(--carte)" stroke={COUL.bleu} strokeWidth="2" /><rect x="226" y="14" width="200" height="170" rx="9" fill="var(--carte)" stroke={COUL.orange} strokeWidth="2" />
        <text x="114" y="36" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--texte)">Déterminisme</text><text x="326" y="36" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--texte)">Flexibilité</text>
        <text x="114" y="54" textAnchor="middle" fontSize="11" fill="var(--texte-doux)">prévisible, auditable</text><text x="326" y="54" textAnchor="middle" fontSize="11" fill="var(--texte-doux)">ambiguïté, langage naturel</text>
        {['contrôle de conformité', 'plafonds et seuils', 'versement', 'journal'].map((x, i) => <text key={x} x="30" y={82 + i * 24} fontSize="12" fill="var(--texte)" opacity={seuil(t, 0.64 + i * 0.03, 0.67 + i * 0.03)}>· {x}</text>)}
        {['lecture du courrier', 'résumé du dossier', 'cas flous', "question à l'usager"].map((x, i) => <text key={x} x="242" y={82 + i * 24} fontSize="12" fill="var(--texte)" opacity={seuil(t, 0.76 + i * 0.03, 0.79 + i * 0.03)}>· {x}</text>)}
        <Legende>Toute architecture réaliste équilibre ces deux pôles</Legende>
      </>}
    </Cadre>
  );
}
