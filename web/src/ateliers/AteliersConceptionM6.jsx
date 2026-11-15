// Ateliers de conception des modules 5 et 6 (leçons exploration, confiance, robustesse, graine).
// L'apprenant règle une stratégie d'exploration, dimensionne une campagne de validation, construit
// un plan de test et rend une expérience rejouable. Le système exécute ce qu'il a conçu, sur des
// tirages déterministes, puis confronte le résultat à un cahier des charges.
// La logique de chaque atelier est exportée à part, pour être étalonnée et testée sans navigateur.
import { useState } from 'react';
import { F, C, alea, nombre, Bilan } from './Ateliers.jsx';
import { useSolution } from './Solution.jsx';

const pourcent = (x, n = 0) => `${F(x * 100, n)} %`;
const milliers = (x) => String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const exigence = (ok, texte) => <tr key={texte}><td>{texte}</td><td className={ok ? 'ok' : 'ko'}>{ok ? 'tenu ✓' : 'non tenu ✗'}</td></tr>;

// ---------------------------------------------------------------- Exploration
// Trois couloirs aux durées aléatoires, un agent ε-glouton qui estime leur valeur (Q ← Q + α (r - Q)).
// 40 exécutions de 800 trajets. Après le trajet 400, le couloir C est dégagé et devient le meilleur.
export const BANDIT = { executions: 40, essais: 100, bascule: 400, total: 800, alpha: 0.2, trouve: 0.9, service: 66, fin: 82 };
export const COULOIRS = [
  ['A', 'allée centrale, 45 s à 5 s près', 55, 55],
  ['B', 'allée nord, 27 s, mais 52 s une fois sur cinq quand un chariot y manœuvre', 68, 68],
  ['C', "allée sud, 60 s tant qu'elle est encombrée, puis 15 s", 40, 85],
];
const gain = (a, u, degage) => (a === 0 ? 50 + 10 * u : a === 1 ? (u < 0.2 ? 48 : 73) : (degage ? 80 : 35) + 10 * u);
export const epsilonAu = ({ e0, dec, plancher }, trajet) => Math.max(plancher, e0 * dec ** (trajet - 1));
export function evaluerExploration(c) {
  const B = BANDIT; const n = B.executions; const courbe = Array(B.total / 20).fill(0); const choix = [[0, 0, 0], [0, 0, 0]]; const valeurs = [0, 0, 0];
  let trouveB = 0; let trouveC = 0; let service = 0; let fin = 0; let essaisB = 0; let retoursC = 0;
  for (let k = 0; k < n; k++) {
    const g = alea(4130 + 97 * k); const Q = [0, 0, 0]; let eps = c.e0;
    for (let t = 1; t <= B.total; t++) {
      const a = g() < eps ? Math.floor(g() * 3) : Q.indexOf(Math.max(...Q));
      const r = gain(a, g(), t > B.bascule);
      Q[a] += B.alpha * (r - Q[a]); eps = Math.max(c.plancher, eps * c.dec);
      courbe[Math.floor((t - 1) / 20)] += r / 20 / n; choix[t > B.bascule ? 1 : 0][a] += 1 / n;
      if (t <= B.essais && a === 1) essaisB += 1 / n;
      if (t > B.bascule && t <= B.bascule + 100 && a === 2) retoursC += 1 / n;
      if (t > B.bascule - 100 && t <= B.bascule) service += r / 100 / n;
      if (t > B.total - 100) fin += r / 100 / n;
      if (t === B.essais && Q.indexOf(Math.max(...Q)) === 1) trouveB += 1 / n;
    }
    if (Q.indexOf(Math.max(...Q)) === 2) trouveC += 1 / n;
    Q.forEach((q, i) => { valeurs[i] += q / n; });
  }
  const tests = { essais: trouveB >= B.trouve - 1e-9, service: service >= B.service, detecte: trouveC >= B.trouve - 1e-9, fin: fin >= B.fin };
  return { courbe, choix, valeurs, trouveB, trouveC, service, fin, essaisB, retoursC, tests, ok: Object.values(tests).every(Boolean) };
}
export const INITIALE_EXPLORATION = { e0: 0, dec: 1, plancher: 0 };
export const SOLUTION_EXPLORATION = { e0: 1, dec: 0.98, plancher: 0.08 };
export function AtelierExploration({ surReussite }) {
  const [c, setC] = useState(INITIALE_EXPLORATION); const [res, setRes] = useState(null); const sol = useSolution();
  const verifier = () => { const r = evaluerExploration(c); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const curseur = (nom, cle, min, max, pas, n) => (<label className="curseur">{nom} = <b>{F(c[cle], n)}</b><input type="range" min={min} max={max} step={pas} value={c[cle]} onChange={(e) => { setC({ ...c, [cle]: Number(e.target.value) }); setRes(null); }} aria-label={nom} /></label>);
  const B = BANDIT; const X = (t) => 34 + (t / B.total) * 396; const Y = (r) => 150 - ((r - 30) / 60) * 130;
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges.</b>
        <ul>
          <li>Le robot choisit un couloir à chaque trajet. Récompense d'un trajet : 100 moins sa durée en secondes. Il ne connaît aucune durée au départ : il estime la valeur de chaque couloir d'après ses propres trajets.</li>
          {COULOIRS.map(([nom, detail]) => <li key={nom}>Couloir {nom} : {detail}.</li>)}
          <li>Trajets 1 à {B.essais} : période d'essai. À la fin, le couloir B doit être le préféré dans au moins {pourcent(B.trouve)} des exécutions.</li>
          <li>Trajets 301 à {B.bascule} : le robot est en service. Récompense moyenne d'au moins {B.service} (le couloir B seul en rapporte 68).</li>
          <li>Après le trajet {B.bascule}, le couloir C est dégagé, sans que le robot en soit averti. Au trajet {B.total}, il doit être le préféré dans au moins {pourcent(B.trouve)} des exécutions, et la récompense moyenne des 100 derniers trajets doit atteindre {B.fin}.</li>
        </ul>
      </div>
      <p>À chaque trajet, l'agent tire un couloir au hasard avec la probabilité ε, sinon il prend celui qu'il estime le meilleur. Après chaque trajet : ε ← max(plancher, ε × décroissance). Le système lance {B.executions} exécutions de {B.total} trajets avec votre réglage.</p>
      {curseur('ε initial', 'e0', 0, 1, 0.05, 2)}{curseur('Décroissance', 'dec', 0.9, 1, 0.005, 3)}{curseur('Plancher', 'plancher', 0, 0.5, 0.01, 2)}
      <p className="conseil">Avec ce réglage, ε vaut {F(epsilonAu(c, B.essais), 2)} au trajet {B.essais}, {F(epsilonAu(c, 300), 2)} au trajet 300 et {F(epsilonAu(c, B.total), 2)} au trajet {B.total}.</p>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Lancer les {B.executions} apprentissages</button>
        {sol.bouton(() => { setC(SOLUTION_EXPLORATION); setRes(null); })}
      </div>
      {res && (
        <>
          <svg viewBox="0 0 440 178" role="img" aria-label="Récompense moyenne et ε au fil des trajets">
            <line x1="34" x2="430" y1="150" y2="150" stroke="var(--texte)" />
            {[B.essais, B.bascule].map((t) => <line key={t} x1={X(t)} x2={X(t)} y1="14" y2="150" stroke={C.gris} strokeDasharray="4 3" />)}
            {[40, 60, 80].map((r) => <text key={r} x="30" y={Y(r) + 4} textAnchor="end" fontSize="10" fill="var(--texte-doux)">{r}</text>)}
            {[1, 100, 400, 800].map((t) => <text key={t} x={X(t)} y="163" textAnchor="middle" fontSize="10" fill="var(--texte-doux)">{t}</text>)}
            <polyline points={Array.from({ length: 81 }, (_, i) => `${X(i * 10)},${150 - epsilonAu(c, i * 10 + 1) * 130}`).join(' ')} fill="none" stroke={C.orange} strokeWidth="1.5" strokeDasharray="5 3" />
            <polyline points={res.courbe.map((r, i) => `${X(i * 20 + 10)},${Y(r)}`).join(' ')} fill="none" stroke={C.bleu} strokeWidth="2.2" />
            <text x="34" y="176" fontSize="10.5" fill="var(--texte-doux)"><tspan fill={C.bleu} fontWeight="700">trait plein</tspan> récompense moyenne par trajet   <tspan fill={C.orange} fontWeight="700">pointillés</tspan> ε (de 0 en bas à 1 en haut)</text>
          </svg>
          <table className="tableau compact donnees">
            <thead><tr><th>Couloir</th><th>Récompense réelle, avant puis après le trajet {B.bascule}</th><th>Choisi, trajets 1 à {B.bascule}</th><th>Choisi, trajets {B.bascule + 1} à {B.total}</th><th>Valeur estimée à la fin</th></tr></thead>
            <tbody>{COULOIRS.map(([nom, , avant, apres], i) => <tr key={nom}><th>{nom}</th><td>{avant} puis {apres}</td><td>{F(res.choix[0][i], 0)} fois</td><td>{F(res.choix[1][i], 0)} fois</td><td>{F(res.valeurs[i], 1)}</td></tr>)}</tbody>
          </table>
          <table className="tableau compact banc"><tbody>
            {exigence(res.tests.essais, `Fin de la période d'essai : le couloir B est le préféré dans ${pourcent(res.trouveB)} des exécutions (minimum ${pourcent(B.trouve)})`)}
            {exigence(res.tests.service, `En service, trajets 301 à ${B.bascule} : récompense moyenne de ${F(res.service, 1)} (minimum ${B.service})`)}
            {exigence(res.tests.detecte, `Au trajet ${B.total} : le couloir C est le préféré dans ${pourcent(res.trouveC)} des exécutions (minimum ${pourcent(B.trouve)})`)}
            {exigence(res.tests.fin, `Trajets 701 à ${B.total} : récompense moyenne de ${F(res.fin, 1)} (minimum ${B.fin})`)}
          </tbody></table>
          <Bilan ok={res.ok}>{res.ok ? "Les quatre exigences sont tenues. Vous avez réglé une stratégie d'exploration : beaucoup de hasard tant que l'agent ne sait rien, de moins en moins ensuite, et un reste de curiosité qui lui a permis de remarquer que le monde avait changé." : [
            !res.tests.essais && (res.choix[0][1] + res.choix[0][2] === 0 ? "L'agent n'a jamais quitté le couloir A : c'est le premier qui lui a rapporté quelque chose, et rien ne l'a poussé à essayer les autres. Que sait-il de la valeur d'un couloir qu'il n'a jamais emprunté ?" : `À la fin de la période d'essai, le couloir B n'a été emprunté que ${F(res.essaisB, 0)} fois en moyenne : trop peu pour que son estimation dépasse celle du couloir A. À quel moment de l'apprentissage un choix au hasard rapporte-t-il le plus d'information ?`),
            res.tests.essais && !res.tests.service && `L'agent connaît le meilleur couloir mais ne l'exploite pas : au trajet 350, ε vaut encore ${F(epsilonAu(c, 350), 2)}, et un tirage au hasard tombe deux fois sur trois sur un couloir moins bon. Que rapporte encore l'exploration quand les valeurs sont connues ?`,
            !res.tests.detecte && `Le couloir C est dégagé après le trajet ${B.bascule}, et l'agent ne s'en aperçoit pas assez souvent : dans les 100 trajets qui suivent, il ne l'essaie que ${F(res.retoursC, 1)} fois en moyenne. Qu'est-ce qui, dans votre réglage, lui laisse une chance d'y retourner ?`,
            res.tests.essais && res.tests.service && res.tests.detecte && !res.tests.fin && `Le changement est détecté, mais trop de trajets partent encore au hasard à la fin : ε y vaut ${F(epsilonAu(c, B.total), 2)}. Jusqu'où pouvez-vous réduire cette part sans perdre la détection ?`,
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ Confiance
// Une règle d'acceptation et une taille de campagne, rejouées 2 000 fois sur deux agents
// dont on connaît le vrai taux de réussite : 92 % (à accepter) et 84 % (à refuser).
export const CAMPAGNE = { rejouees: 2000, bon: 0.92, insuffisant: 0.84, maxInsuffisant: 0.05, maxBon: 0.1, budget: 250 };
export const REGLES_CAMPAGNE = { taux: 'le taux mesuré', borne: "la borne basse de l'intervalle à 95 %" };
export function evaluerCampagne({ n, regle, seuil }) {
  const K = CAMPAGNE; const mesure = (reussites) => { const p = reussites / n; return regle === 'borne' ? p - 1.96 * Math.sqrt((p * (1 - p)) / n) : p; };
  const rejouer = (vrai, graine) => {
    const g = alea(graine); let acceptees = 0; const histo = Array(20).fill(0);
    for (let k = 0; k < K.rejouees; k++) {
      let reussites = 0; for (let i = 0; i < n; i++) if (g() < vrai) reussites++;
      const m = mesure(reussites); if (m * 100 >= seuil - 1e-9) acceptees++;
      histo[Math.max(0, Math.min(19, Math.floor((m * 100 - 60) / 2 + 1e-9)))]++;
    }
    return { acceptees: acceptees / K.rejouees, histo };
  };
  const bon = rejouer(K.bon, 4130); const insuffisant = rejouer(K.insuffisant, 7);
  const tests = { insuffisant: insuffisant.acceptees <= K.maxInsuffisant, bon: 1 - bon.acceptees <= K.maxBon, budget: n <= K.budget };
  return { bon, insuffisant, refusBon: 1 - bon.acceptees, tests, ok: Object.values(tests).every(Boolean) };
}
export const INITIALE_CAMPAGNE = { n: 50, regle: 'taux', seuil: 85 };
export const SOLUTION_CAMPAGNE = { n: 200, regle: 'borne', seuil: 85 };
export function AtelierCampagne({ surReussite }) {
  const [c, setC] = useState(INITIALE_CAMPAGNE); const [res, setRes] = useState(null); const sol = useSolution();
  const verifier = () => { const r = evaluerCampagne(c); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const maj = (cle, v) => { setC({ ...c, [cle]: v }); setRes(null); };
  const K = CAMPAGNE; const demi = (p) => 196 * Math.sqrt((p * (1 - p)) / c.n); const X = (v) => 30 + ((v - 60) / 40) * 390;
  const hmax = res ? Math.max(...res.bon.histo, ...res.insuffisant.histo) : 1;
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges.</b>
        <ul>
          <li>Un agent est déployé si la campagne l'accepte. Le besoin : au moins 90 % de missions réussies.</li>
          <li>Deux agents de référence, dont le vrai taux de réussite est connu : un bon agent ({pourcent(K.bon)}) et un agent insuffisant ({pourcent(K.insuffisant)}).</li>
          <li>L'agent insuffisant doit être accepté dans moins de {pourcent(K.maxInsuffisant)} des campagnes.</li>
          <li>Le bon agent doit être refusé dans moins de {pourcent(K.maxBon)} des campagnes.</li>
          <li>Budget : {K.budget} simulations au plus par campagne.</li>
        </ul>
      </div>
      <p>Vous fixez la taille de la campagne et la règle d'acceptation. Le système rejoue {milliers(K.rejouees)} campagnes pour chaque agent, mission par mission, et compte combien de fois votre règle l'accepte.</p>
      <label className="curseur">Simulations = <b>{c.n}</b><input type="range" min="10" max="600" step="10" value={c.n} onChange={(e) => maj('n', Number(e.target.value))} aria-label="Simulations" /></label>
      <label className="curseur">Accepter l'agent si<select value={c.regle} onChange={(e) => maj('regle', e.target.value)} aria-label="Règle d'acceptation">{Object.entries(REGLES_CAMPAGNE).map(([k, t]) => <option key={k} value={k}>{t} atteint le seuil</option>)}</select></label>
      <label className="curseur">Seuil = <b>{c.seuil} %</b><input type="range" min="80" max="95" step="1" value={c.seuil} onChange={(e) => maj('seuil', Number(e.target.value))} aria-label="Seuil" /></label>
      <p className="conseil">Avec {c.n} simulations, la demi-largeur de l'intervalle à 95 % vaut environ {F(demi(K.bon), 1)} points pour un taux de {pourcent(K.bon)} et {F(demi(K.insuffisant), 1)} points pour un taux de {pourcent(K.insuffisant)}.</p>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Rejouer les campagnes</button>
        {sol.bouton(() => { setC(SOLUTION_CAMPAGNE); setRes(null); })}
      </div>
      {res && (
        <>
          <svg viewBox="0 0 440 168" role="img" aria-label="Répartition des campagnes des deux agents">
            {res.insuffisant.histo.map((h, i) => <rect key={`i${i}`} x={X(60 + i * 2) + 1} y={128 - (h / hmax) * 108} width="8.5" height={(h / hmax) * 108} fill={C.orange} />)}
            {res.bon.histo.map((h, i) => <rect key={`b${i}`} x={X(60 + i * 2) + 10} y={128 - (h / hmax) * 108} width="8.5" height={(h / hmax) * 108} fill={C.vert} />)}
            <line x1="30" x2="420" y1="128" y2="128" stroke="var(--texte)" />
            {[60, 70, 80, 90, 100].map((v) => <text key={v} x={X(v)} y="141" textAnchor="middle" fontSize="10.5" fill="var(--texte-doux)">{v} %</text>)}
            <line x1={X(c.seuil)} x2={X(c.seuil)} y1="6" y2="128" stroke="var(--texte)" strokeWidth="2" strokeDasharray="5 3" />
            <text x={X(c.seuil) + 4} y="14" fontSize="10.5" fill="var(--texte)">accepté →</text>
            <text x="30" y="160" fontSize="10.5" fill="var(--texte-doux)"><tspan fill={C.orange} fontWeight="700">■</tspan> agent insuffisant  <tspan fill={C.vert} fontWeight="700">■</tspan> bon agent  (en abscisse : {REGLES_CAMPAGNE[c.regle]}, campagne par campagne)</text>
          </svg>
          <table className="tableau compact banc"><tbody>
            {exigence(res.tests.insuffisant, `Agent insuffisant (vrai taux ${pourcent(K.insuffisant)}) accepté dans ${pourcent(res.insuffisant.acceptees, 1)} des campagnes (maximum ${pourcent(K.maxInsuffisant)})`)}
            {exigence(res.tests.bon, `Bon agent (vrai taux ${pourcent(K.bon)}) refusé dans ${pourcent(res.refusBon, 1)} des campagnes (maximum ${pourcent(K.maxBon)})`)}
            {exigence(res.tests.budget, `Campagne de ${c.n} simulations (budget ${K.budget})`)}
          </tbody></table>
          <Bilan ok={res.ok}>{res.ok ? "Les trois exigences sont tenues. Vous avez conçu une campagne de validation : assez de simulations pour séparer les deux agents, et une règle qui tient compte de l'incertitude au lieu de croire le taux mesuré sur parole." : [
            !res.tests.insuffisant && !res.tests.bon && `Avec ${c.n} simulations, le taux mesuré d'un même agent varie d'environ ${F(demi(K.insuffisant), 1)} points d'une campagne à l'autre, alors que 8 points seulement séparent les deux agents : les deux répartitions se recouvrent, et aucun seuil ne peut les départager. Que faut-il changer pour les resserrer ?`,
            !res.tests.insuffisant && res.tests.bon && `L'agent insuffisant passe trop souvent. Son vrai taux est de ${pourcent(K.insuffisant)}, mais sur ${c.n} simulations le hasard lui donne régulièrement mieux${c.regle === 'taux' ? ", et votre règle compare le taux mesuré au seuil sans tenir compte de cette incertitude" : ''}. Quelle marge votre règle garde-t-elle au-dessus de ce que le hasard peut lui offrir ?`,
            res.tests.insuffisant && !res.tests.bon && `Votre règle est sûre, mais elle écarte trop souvent un agent qui convient. Regardez où tombe le seuil dans la répartition verte : la barre est-elle trop haute pour un agent à ${pourcent(K.bon)}, ou l'intervalle trop large avec ${c.n} simulations ?`,
            !res.tests.budget && `Le budget est dépassé de ${c.n - K.budget} simulations. ${res.tests.insuffisant && res.tests.bon ? 'Votre règle sépare bien les deux agents : quelle est la plus petite campagne qui y parvient encore ?' : ''}`,
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

// ----------------------------------------------------------------- Robustesse
// Un plan de test à trois niveaux. Deux agents y passent 400 missions par niveau. Leur taux de
// réussite suit la sévérité du niveau : 98 %, 87 %, 69 % pour le robuste, 99 %, 39 %, 5 % pour le naïf.
export const PIRE = { bruit: 10, glissement: 45, chariots: 16 };
export const PLAN_TEST = { missions: 400, ecart: 0.25, nominal: 0.1, limite: 0.9, seuilNominal: 95, seuilLimite: 50 };
export const NIVEAUX_PLAN = [['nominal', 'Nominal'], ['degrade', 'Dégradé'], ['limite', 'Limite']];
const FACTEURS = [['bruit', 'Bruit', 'bruit du lidar', 'cm'], ['glissement', 'Glissement', 'glissement', '%'], ['chariots', 'Chariots', 'chariots', '']];
export const severite = (c) => (c.bruit / PIRE.bruit + c.glissement / PIRE.glissement + c.chariots / PIRE.chariots) / 3;
export const MODELE_AGENTS = {
  robuste: (s) => (s <= 1 ? 0.98 - 0.29 * s : Math.max(0, 0.69 - 1.5 * (s - 1))),
  naif: (s) => 0.05 + 0.94 / (1 + Math.exp((s - 0.344) / 0.03)),
};
export function evaluerPlan(plan) {
  const P = PLAN_TEST;
  const niveaux = NIVEAUX_PLAN.map(([id, nom]) => { const c = Object.fromEntries(['bruit', 'glissement', 'chariots', 'seuil'].map((k) => [k, nombre(plan[id][k])])); return { id, nom, ...c, s: severite(c) }; });
  if (!niveaux.every((v) => [v.bruit, v.glissement, v.chariots, v.seuil].every((x) => Number.isFinite(x) && x >= 0) && v.seuil <= 100)) return { saisie: false, ok: false };
  const passer = (agent, graine) => { const g = alea(graine); const tirages = Array.from({ length: P.missions }, () => g()); return niveaux.map((v) => tirages.filter((u) => u < MODELE_AGENTS[agent](v.s)).length / P.missions); };
  const taux = { robuste: passer('robuste', 915), naif: passer('naif', 787) };
  const passe = (agent) => niveaux.map((v, i) => taux[agent][i] * 100 >= v.seuil - 1e-9);
  const hors = niveaux.flatMap((v) => FACTEURS.filter(([k]) => v[k] > PIRE[k]).map(([k, , nom, unite]) => `niveau ${v.nom.toLowerCase()}, ${nom} : ${F(v[k], 0)} ${unite} pour un pire cas de ${PIRE[k]} ${unite}`.replace(/ +/g, ' ').trim()));
  const [a, b, d] = niveaux;
  const tests = {
    domaine: hors.length === 0,
    croissant: [[a, b], [b, d]].every(([x, y]) => FACTEURS.every(([k]) => y[k] >= x[k]) && y.s - x.s >= P.ecart - 1e-9),
    etendue: a.s <= P.nominal + 1e-9 && d.s >= P.limite - 1e-9,
    seuils: a.seuil >= P.seuilNominal && d.seuil >= P.seuilLimite && b.seuil <= a.seuil && d.seuil <= b.seuil,
    robuste: passe('robuste').every(Boolean),
    naif: !passe('naif').every(Boolean),
  };
  return { saisie: true, niveaux, taux, passe: { robuste: passe('robuste'), naif: passe('naif') }, hors, tests, ok: Object.values(tests).every(Boolean) };
}
export const INITIALE_PLAN = { nominal: { bruit: 0, glissement: 0, chariots: 0, seuil: 95 }, degrade: { bruit: 0, glissement: 0, chariots: 0, seuil: 95 }, limite: { bruit: 0, glissement: 0, chariots: 0, seuil: 95 } };
export const SOLUTION_PLAN = { nominal: { bruit: 0, glissement: 0, chariots: 0, seuil: 95 }, degrade: { bruit: 5, glissement: 15, chariots: 4, seuil: 80 }, limite: { bruit: 10, glissement: 45, chariots: 16, seuil: 60 } };
export function AtelierPlanTest({ surReussite }) {
  const [plan, setPlan] = useState(INITIALE_PLAN); const [res, setRes] = useState(null); const sol = useSolution();
  const verifier = () => { const r = evaluerPlan(plan); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const P = PLAN_TEST; const X = (s) => 40 + (Math.min(s, 2) / 2) * 380; const Y = (t) => 140 - t * 120;
  const sev = (id) => { const s = severite(Object.fromEntries(FACTEURS.map(([k]) => [k, nombre(plan[id][k])]))); return Number.isFinite(s) ? pourcent(s) : 'à compléter'; };
  const champ = (id, nom, k, titre, max) => <input type="number" min="0" max={max} step="1" value={plan[id][k]} onChange={(e) => { setPlan({ ...plan, [id]: { ...plan[id], [k]: e.target.value } }); setRes(null); }} aria-label={`${titre} ${nom.toLowerCase()}`} />;
  const r = res?.saisie ? res : null; const rate = (agent) => r.niveaux.findIndex((_, i) => !r.passe[agent][i]);
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges du plan de test.</b>
        <ul>
          <li>Domaine d'emploi de l'entrepôt. Conditions de conception : lidar sans bruit, sol sec, aucun chariot. Pires valeurs réalistes : {PIRE.bruit} cm de bruit du lidar, {PIRE.glissement} % de glissement, {PIRE.chariots} chariots. Au-delà, aucun agent n'est censé fonctionner.</li>
          <li>Sévérité d'un niveau : moyenne des trois perturbations, chacune rapportée à sa pire valeur réaliste.</li>
          <li>Trois niveaux croissants : aucune perturbation ne baisse d'un niveau au suivant, et la sévérité gagne au moins {F(P.ecart * 100, 0)} points à chaque fois.</li>
          <li>Le plan couvre tout le domaine : sévérité d'au plus {pourcent(P.nominal)} au niveau nominal, d'au moins {pourcent(P.limite)} au niveau limite.</li>
          <li>Besoin de l'exploitant : au moins {P.seuilNominal} % de réussite exigés au niveau nominal, au moins {P.seuilLimite} % au niveau limite, et jamais plus à un niveau qu'au niveau précédent.</li>
          <li>Deux agents passent {P.missions} missions par niveau. Ils font jeu égal en conditions de conception. Le plan doit accepter l'agent robuste et refuser l'agent naïf.</li>
        </ul>
      </div>
      <ol className="regles-edit">
        {NIVEAUX_PLAN.map(([id, nom]) => (
          <li key={id}><b>{nom}</b> bruit du lidar {champ(id, nom, 'bruit', 'Bruit', 20)} cm, glissement {champ(id, nom, 'glissement', 'Glissement', 80)} %, {champ(id, nom, 'chariots', 'Chariots', 30)} chariots, réussite exigée {champ(id, nom, 'seuil', 'Seuil', 100)} % <span className="conseil">sévérité : {sev(id)}</span></li>
        ))}
      </ol>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Faire passer le plan aux deux agents</button>
        {sol.bouton(() => { setPlan(SOLUTION_PLAN); setRes(null); })}
      </div>
      {res && !r && <Bilan ok={false}>Le plan est incomplet : chaque case attend un nombre positif, et un seuil ne dépasse pas 100 %. Quelle valeur manque-t-il ?</Bilan>}
      {r && (
        <>
          <svg viewBox="0 0 440 170" role="img" aria-label="Taux de réussite mesurés selon la sévérité">
            <rect x={X(1)} y="20" width={X(2) - X(1)} height="120" fill={C.gris} opacity="0.18" /><text x={X(1) + 6} y="32" fontSize="10.5" fill="var(--texte-doux)">hors du domaine d'emploi</text>
            <line x1="40" x2="420" y1="140" y2="140" stroke="var(--texte)" /><line x1="40" x2="40" y1="20" y2="140" stroke="var(--texte)" />
            {[0, 0.5, 1].map((t) => <text key={t} x="36" y={Y(t) + 4} textAnchor="end" fontSize="10" fill="var(--texte-doux)">{F(t * 100, 0)} %</text>)}
            {[0, 0.5, 1, 1.5, 2].map((s) => <text key={s} x={X(s)} y="153" textAnchor="middle" fontSize="10" fill="var(--texte-doux)">{F(s * 100, 0)} %</text>)}
            {[['robuste', C.vert], ['naif', C.rouge]].map(([agent, couleur]) => <g key={agent}><polyline points={r.niveaux.map((v, i) => `${X(v.s)},${Y(r.taux[agent][i])}`).join(' ')} fill="none" stroke={couleur} strokeWidth="2" />{r.niveaux.map((v, i) => <circle key={v.id} cx={X(v.s)} cy={Y(r.taux[agent][i])} r="4.5" fill={couleur} />)}</g>)}
            {r.niveaux.map((v) => <line key={v.id} x1={X(v.s) - 9} x2={X(v.s) + 9} y1={Y(v.seuil / 100)} y2={Y(v.seuil / 100)} stroke="var(--texte)" strokeWidth="2.5" />)}
            <text x="40" y="167" fontSize="10.5" fill="var(--texte-doux)"><tspan fill={C.vert} fontWeight="700">●</tspan> agent robuste  <tspan fill={C.rouge} fontWeight="700">●</tspan> agent naïf  <tspan fontWeight="700">▬</tspan> réussite exigée  (en abscisse : sévérité du niveau)</text>
          </svg>
          <table className="tableau compact donnees">
            <thead><tr><th>Niveau</th><th>Sévérité</th><th>Réussite exigée</th><th>Agent robuste</th><th>Agent naïf</th></tr></thead>
            <tbody>{r.niveaux.map((v, i) => <tr key={v.id}><th>{v.nom}</th><td>{pourcent(v.s)}</td><td>{F(v.seuil, 0)} %</td>{['robuste', 'naif'].map((agent) => <td key={agent}>{pourcent(r.taux[agent][i])}, {r.passe[agent][i] ? 'passe' : 'échoue'}</td>)}</tr>)}</tbody>
          </table>
          <table className="tableau compact banc"><tbody>
            {exigence(r.tests.domaine, "Toutes les conditions restent dans le domaine d'emploi")}
            {exigence(r.tests.croissant, `Niveaux croissants, séparés d'au moins ${F(P.ecart * 100, 0)} points de sévérité`)}
            {exigence(r.tests.etendue, 'Le plan va des conditions de conception au pire cas réaliste')}
            {exigence(r.tests.seuils, "Les seuils traduisent le besoin de l'exploitant")}
            {exigence(r.tests.robuste, "L'agent robuste est accepté")}
            {exigence(r.tests.naif, "L'agent naïf est refusé")}
          </tbody></table>
          <Bilan ok={r.ok}>{r.ok ? "Les six exigences sont tenues. Vous avez construit un plan de test : des niveaux qui durcissent par paliers jusqu'au pire cas réaliste, et des seuils fixés avant les essais, qui admettent une dégradation progressive et refusent une rupture." : [
            !r.tests.domaine && `Le plan sort du domaine d'emploi (${r.hors[0]}). ${!r.tests.robuste && r.tests.naif ? "Les deux agents échouent, et cet échec ne prouve rien : aucun agent n'est censé faire face à ces conditions. " : ''}Quelles sont les pires valeurs que l'entrepôt peut réellement présenter ?`,
            r.tests.domaine && !r.tests.croissant && (r.niveaux[2].s - r.niveaux[0].s < 0.01 ? `Vos trois niveaux se confondent : les deux agents y obtiennent ${pourcent(r.taux.robuste[0])} et ${pourcent(r.taux.naif[0])}, et rien ne les distingue. Dans quelles conditions deux agents cessent-ils de se ressembler ?` : "Les niveaux ne durcissent pas par paliers nets : une perturbation baisse d'un niveau au suivant, ou deux niveaux sont trop proches pour apprendre quelque chose de différent. Que doit apporter le niveau dégradé que les deux autres ne montrent pas ?"),
            r.tests.domaine && r.tests.croissant && !r.tests.etendue && (r.niveaux[0].s > P.nominal ? "Votre niveau nominal est déjà perturbé : il ne dit plus ce que valent les agents dans les conditions pour lesquelles ils ont été conçus." : `Votre niveau limite s'arrête à ${pourcent(r.niveaux[2].s)} de sévérité : rien ne dit comment un agent se comporte dans le pire cas réaliste. Jusqu'où l'entrepôt peut-il se dégrader ?`),
            !r.tests.seuils && "Les seuils ne traduisent pas le besoin de l'exploitant : relisez ses deux planchers, et vérifiez qu'aucun niveau n'exige plus que le précédent.",
            r.tests.domaine && !r.tests.robuste && `Votre plan refuse l'agent robuste au niveau ${r.niveaux[rate('robuste')].nom.toLowerCase()} : ${pourcent(r.taux.robuste[rate('robuste')])} mesurés pour ${F(r.niveaux[rate('robuste')].seuil, 0)} % exigés. Sa dégradation est pourtant progressive. Faut-il exiger en conditions dures la même réussite qu'en conditions de conception ?`,
            r.tests.domaine && r.tests.croissant && !r.tests.naif && "L'agent naïf passe les trois niveaux : le plan ne révèle pas sa faiblesse. Comparez ses taux aux seuils, niveau par niveau.",
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

// --------------------------------------------------------------------- Rejeu
// Une campagne de 60 essais simulés (position des chariots, glissements, erreur du lidar tirés au
// hasard), puis le rejeu isolé du premier essai en échec avec ce que le programme a conservé.
export const REJEU = { essais: 60, pas: 10, graine: 4130, plafond: 150, campagne: 'v1.3', actuelle: 'v1.4' };
export const PLAN_ESSAIS = [{ nom: 'dégradé', bruit: 5, glissement: 15, chariots: 2 }, { nom: 'limite', bruit: 10, glissement: 30, chariots: 5 }, { nom: 'nominal', bruit: 2, glissement: 5, chariots: 1 }];
export const REGLAGE_REJEU = { marge: { 'v1.3': 9.8, 'v1.4': 12 }, glissade: 1, horloges: [1012, 564738], tirage: 2522, neuve: 271828 };
export const MODES_GRAINE = { aucune: 'nulle part', lancement: 'une fois, au lancement du programme', constante: 'à chaque essai, toujours la même graine (4130)', apres: 'à chaque essai, une graine neuve, fixée après la création du scénario', avant: 'à chaque essai, une graine neuve, fixée avant la création du scénario' };
export const CONSERVER = [['graine', "Graine de l'essai", 8, '"graine": graine'], ['parametres', 'Paramètres du scénario', 60, '"parametres": parametres'], ['version', "Version de l'agent", 12, '"version": agent.version'], ['trace', 'Trace complète, pas à pas', 2400, '"trace": trace.pas'], ['bilan', 'Bilan (réussite ou échec)', 20, '"bilan": trace.bilan']];
const GRAINES_ESSAIS = (() => { const g = alea(REGLAGE_REJEU.tirage); return Array.from({ length: REJEU.essais + 1 }, () => 100000 + Math.floor(g() * 900000)); })();
const creerScenario = (g, p) => Array.from({ length: p.chariots }, () => 1 + Math.floor(g() * REJEU.pas));
function simuler(g, chariots, p, version) {
  const trace = [];
  for (let pas = 1; pas <= REJEU.pas; pas++) {
    const glisse = g() < p.glissement / 100; const ecart = (2 * g() - 1) * p.bruit; const chariot = chariots.includes(pas);
    trace.push(`${pas}${chariot ? 'C' : '.'}${glisse ? 'G' : '.'}${ecart.toFixed(1)}`);
    if (chariot && ecart + (glisse ? REGLAGE_REJEU.glissade : 0) > REGLAGE_REJEU.marge[version]) return { reussi: false, pas, ecart, glisse, trace };
  }
  return { reussi: true, pas: REJEU.pas, trace };
}
export function evaluerRejeu({ mode, conserve }) {
  const R = REJEU; const garde = new Set(conserve); const neuve = mode === 'avant' || mode === 'apres';
  const lancer = (horloge) => ({ g: alea(mode === 'lancement' ? R.graine : horloge) });
  const jouer = (prog, graine, p, version) => {
    if (graine && mode !== 'apres') prog.g = alea(graine);
    const chariots = creerScenario(prog.g, p);
    if (graine && mode === 'apres') prog.g = alea(graine);
    return simuler(prog.g, chariots, p, version);
  };
  const prog = lancer(REGLAGE_REJEU.horloges[0]); const essais = [];
  for (let i = 1; i <= R.essais; i++) { const graine = mode === 'constante' ? R.graine : neuve ? GRAINES_ESSAIS[i] : null; const p = PLAN_ESSAIS[i % 3]; essais.push({ numero: i, graine, p, version: R.campagne, ...jouer(prog, graine, p, R.campagne) }); }
  const distincts = new Set(essais.map((e) => e.trace.join(' '))).size; const echecs = essais.filter((e) => !e.reussi).length;
  const echec = essais.find((e) => !e.reussi); const repere = !!echec && (garde.has('bilan') || garde.has('trace'));
  let rejeu = null; let identique = false; let jumeau = null;
  if (repere) {
    const graine = mode === 'constante' ? R.graine : neuve ? (garde.has('graine') ? echec.graine : REGLAGE_REJEU.neuve) : null;
    const p = garde.has('parametres') ? echec.p : PLAN_ESSAIS[2]; const version = garde.has('version') ? R.campagne : R.actuelle;
    rejeu = { graine, p, version, ...jouer(lancer(REGLAGE_REJEU.horloges[1]), graine, p, version) };
    identique = rejeu.trace.join(' ') === echec.trace.join(' ');
    jumeau = essais.find((e) => e.trace.join(' ') === rejeu.trace.join(' '))?.numero ?? null;
  }
  const octets = CONSERVER.filter(([k]) => garde.has(k)).reduce((s, x) => s + x[2], 0);
  const tests = { distincts: distincts === R.essais, repere, identique, cause: repere && (garde.has('trace') || identique), stockage: octets <= R.plafond };
  return { essais, distincts, echecs, echec, rejeu, jumeau, octets, tests, ok: Object.values(tests).every(Boolean) };
}
export function programmeRejeu({ mode, conserve }) {
  const l = mode === 'lancement' ? ['fixer_graines(4130)'] : [];
  l.push('for numero in range(1, 61):', '    parametres = PLAN[numero % 3]');
  if (mode === 'constante') l.push('    graine = 4130', '    fixer_graines(graine)');
  if (mode === 'avant' || mode === 'apres') l.push('    graine = nouvelle_graine()        # un nombre neuf à chaque essai');
  if (mode === 'avant') l.push('    fixer_graines(graine)');
  l.push('    monde = creer_scenario("entrepot", **parametres)    # place les chariots au hasard');
  if (mode === 'apres') l.push('    fixer_graines(graine)');
  l.push('    trace = simuler(monde, agent)             # glissements et erreurs du lidar tirés au hasard');
  const champs = CONSERVER.filter(([k]) => conserve.includes(k)).map(([k, , , code]) => (k === 'graine' && mode === 'aucune' ? '"graine": None' : k === 'graine' && mode === 'lancement' ? '"graine": 4130' : code));
  l.push(...(champs.length ? ['    enregistrer(f"essais/essai_{numero}.json", {', ...champs.map((c) => `        ${c},`), '    })'] : ["    # rien n'est enregistré"]));
  return l.join('\n');
}
const raconter = (e) => (e.reussi ? `mission réussie en ${e.pas} pas` : `collision au pas ${e.pas} : chariot vu ${F(e.ecart, 1)} cm trop loin${e.glisse ? ', roue qui glisse' : ''}, freinage trop tardif`);
const conditions = (p) => `niveau ${p.nom} (${p.bruit} cm, ${p.glissement} %, ${p.chariots} chariot${p.chariots > 1 ? 's' : ''})`;
export const INITIALE_REJEU = { mode: 'lancement', conserve: ['bilan'] };
export const SOLUTION_REJEU = { mode: 'avant', conserve: ['graine', 'parametres', 'version', 'bilan'] };
export function AtelierRejeu({ surReussite }) {
  const [c, setC] = useState(INITIALE_REJEU); const [res, setRes] = useState(null); const sol = useSolution();
  const verifier = () => { const r = evaluerRejeu(c); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const R = REJEU; const garde = (k) => c.conserve.includes(k); const octets = CONSERVER.filter(([k]) => garde(k)).reduce((s, x) => s + x[2], 0);
  const basculer = (k) => { setC({ ...c, conserve: garde(k) ? c.conserve.filter((x) => x !== k) : [...c.conserve, k] }); setRes(null); };
  const e = res?.echec; const j = res?.rejeu; const neuve = c.mode === 'avant' || c.mode === 'apres';
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges.</b>
        <ul>
          <li>La campagne compte {R.essais} essais, répartis sur trois jeux de paramètres. Chaque essai doit explorer une situation différente.</li>
          <li>Tout essai en échec doit pouvoir être rejoué seul, plus tard, sans relancer les autres, et se dérouler exactement comme la première fois.</li>
          <li>On doit pouvoir dire pourquoi il a échoué : à quel pas, et sur quelle mesure.</li>
          <li>Stockage : {R.plafond} octets au plus par essai. La campagne réelle en compte 5 000 chaque nuit.</li>
          <li>Depuis la campagne, menée avec l'agent {R.campagne}, l'équipe a livré l'agent {R.actuelle}.</li>
        </ul>
      </div>
      <ol className="regles-edit">
        <li><b>Fixer la graine</b> <select value={c.mode} onChange={(ev) => { setC({ ...c, mode: ev.target.value }); setRes(null); }} aria-label="Fixer la graine">{Object.entries(MODES_GRAINE).map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select></li>
        {CONSERVER.map(([k, nom, poids]) => <li key={k}><label><input type="checkbox" checked={garde(k)} onChange={() => basculer(k)} aria-label={nom} /> Conserver : <b>{nom}</b> <span className="conseil">({milliers(poids)} octets)</span></label></li>)}
      </ol>
      <p className="conseil">Votre programme, tel qu'il sera exécuté. Enregistrement : {milliers(octets)} octets par essai sur {R.plafond}.</p>
      <pre><code>{programmeRejeu(c)}</code></pre>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Lancer la campagne, puis rejouer un échec</button>
        {sol.bouton(() => { setC(SOLUTION_REJEU); setRes(null); })}
      </div>
      {res && (
        <>
          {j && (
            <table className="tableau compact donnees">
              <thead><tr><th>Exécution</th><th>Graine</th><th>Paramètres</th><th>Agent</th><th>Déroulement</th></tr></thead>
              <tbody>
                <tr><th>Essai n° {e.numero}, pendant la campagne</th><td>{e.graine ?? (c.mode === 'lancement' ? `${R.graine}, fixée avant l'essai n° 1` : "tirée de l'horloge")}</td><td>{conditions(e.p)}</td><td>{e.version}</td><td>{res.tests.cause ? raconter(e) : 'échec, sans autre détail'}</td></tr>
                <tr><th>Essai n° {e.numero}, rejoué seul</th><td>{j.graine ? `${j.graine}${neuve && !garde('graine') ? ', neuve' : ''}` : c.mode === 'lancement' ? `${R.graine}, fixée au lancement` : "tirée de l'horloge"}</td><td>{conditions(j.p)}{garde('parametres') ? '' : ', par défaut'}</td><td>{j.version}{garde('version') ? '' : ', agent actuel'}</td><td>{raconter(j)}</td></tr>
              </tbody>
            </table>
          )}
          <table className="tableau compact banc"><tbody>
            {exigence(res.tests.distincts, `Situations explorées : ${res.distincts} déroulements différents sur ${R.essais} essais`)}
            {exigence(res.tests.repere, e ? (res.tests.repere ? `Échec repéré : essai n° ${e.numero} (${res.echecs} échec${res.echecs > 1 ? 's' : ''} sur ${R.essais} essais)` : "Échec repéré : aucun enregistrement ne dit quel essai a échoué") : `Échec repéré : aucun échec sur ${R.essais} essais`)}
            {exigence(res.tests.identique, j ? `Rejeu de l'essai seul : ${res.tests.identique ? 'identique à la campagne, pas pour pas' : `différent de la campagne${res.jumeau ? `, mais identique à l'essai n° ${res.jumeau}` : ''}`}` : "Rejeu de l'essai seul : impossible, aucun essai à rejouer")}
            {exigence(res.tests.cause, `Cause de l'échec : ${res.tests.cause ? (garde('trace') ? 'lisible dans la trace conservée' : 'lisible dans la trace du rejeu') : 'inconnue'}`)}
            {exigence(res.tests.stockage, `Stockage : ${milliers(res.octets)} octets par essai (plafond ${R.plafond})`)}
          </tbody></table>
          <Bilan ok={res.ok}>{res.ok ? `Les cinq exigences sont tenues. L'essai n° ${e.numero} se rejoue seul, pas pour pas, et sa trace se régénère à la demande : ${raconter(e)}. Vous avez rendu une expérience rejouable avec trois informations et une graine fixée au bon endroit.` : [
            !res.tests.distincts && `Tous les essais reçoivent la même graine : ils se répètent, et la campagne ne compte que ${res.distincts} déroulements différents, un par jeu de paramètres. Que doit avoir de particulier la graine d'un essai pour qu'il soit à la fois unique et rejouable ?`,
            res.tests.distincts && !res.tests.repere && "Rien de ce que vous conservez ne dit quel essai a échoué : la campagne ne produit même pas un taux de réussite. Quelle information, la plus légère possible, faut-il garder pour chaque essai ?",
            j && !res.tests.identique && c.mode === 'aucune' && "Aucune graine n'est fixée : le générateur part de l'horloge, et chaque lancement raconte une autre histoire. Qu'est-ce qui permettrait de retrouver les mêmes tirages ?",
            j && !res.tests.identique && c.mode === 'lancement' && `La graine ${R.graine} ouvre la campagne entière, pas l'essai n° ${e.numero} : rejoué seul, il reçoit les premiers tirages du générateur${res.jumeau ? `, ceux de l'essai n° ${res.jumeau}` : ''}. Où fixer la graine pour que chaque essai parte d'un point connu ?`,
            j && !res.tests.identique && c.mode === 'apres' && garde('graine') && "La graine est fixée après la création du scénario : la position des chariots a déjà été tirée, et le rejeu ne la retrouve pas. Quelle est la première opération de l'essai qui utilise le hasard ?",
            j && !res.tests.identique && neuve && !garde('graine') && "La graine de l'essai n'est pas conservée : le rejeu en tire une neuve, donc d'autres tirages.",
            j && !res.tests.identique && c.mode !== 'aucune' && !garde('parametres') && `Les paramètres du scénario ne sont pas conservés : le rejeu prend ceux par défaut, le niveau nominal, au lieu du niveau ${e.p.nom}.`,
            j && !res.tests.identique && c.mode !== 'aucune' && !garde('version') && `La version de l'agent n'est pas conservée : le rejeu fait tourner l'agent actuel, ${R.actuelle}, qui n'est plus celui de la campagne.`,
            !res.tests.stockage && "Le plafond de stockage est dépassé : la trace complète pèse 2 400 octets par essai. Si un essai se rejoue à l'identique, sa trace a-t-elle besoin d'être stockée ?",
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

export const ATELIERS_CONCEPTION_M6 = { conception_exploration: AtelierExploration, conception_confiance: AtelierCampagne, conception_robustesse: AtelierPlanTest, conception_graine: AtelierRejeu };
