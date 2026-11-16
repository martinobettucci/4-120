// Ateliers du bloc « Systèmes agentiques » (première partie). L'apprenant y construit :
// la composition d'un agent étape par étape, les contrôles qui encadrent un LLM,
// le plan de contrôle d'une chaîne d'agents, et un arbitre entre trois décideurs.
import { useMemo, useState } from 'react';
import { F, C, alea, nombre, Bilan } from './Ateliers.jsx';
import { useSolution } from './Solution.jsx';

// --------------------------------------------------------------- Composition
// Une famille d'agent par étape du traitement d'une réclamation.
export const ETAPES_COMPO = [
  ['extraire', 'Lire le courrier et extraire les champs', 'texte libre, formulations très variées'],
  ['conformite', 'Contrôler la conformité réglementaire', 'critères écrits dans un texte officiel'],
  ['risque', 'Estimer le risque de fraude', 'aucune règle exacte, 20 000 dossiers passés étiquetés'],
  ['planifier', "Planifier le rendez-vous d'expertise", 'agendas, durées, déplacements'],
];
export const FAMILLES_COMPO = { regles: ['Règles', 0.1, 5, true], heuristique: ['Heuristique', 0.2, 10, true], statistique: ['Modèle statistique', 0.5, 20, false], optimisation: ['Optimisation', 1, 200, true], llm: ['LLM', 3, 900, false] };
export const EXACT_COMPO = {
  extraire: { regles: 0.70, heuristique: 0.75, statistique: 0.88, llm: 0.96 },
  conformite: { regles: 0.99, heuristique: 0.90, statistique: 0.93, llm: 0.92 },
  risque: { regles: 0.80, heuristique: 0.84, statistique: 0.94, llm: 0.86 },
  planifier: { regles: 0.75, heuristique: 0.90, statistique: 0.70, optimisation: 0.99, llm: 0.80 },
};
export function evaluerComposition(choix) {
  const fiab = ETAPES_COMPO.reduce((p, [id]) => p * EXACT_COMPO[id][choix[id]], 1);
  const cout = ETAPES_COMPO.reduce((s, [id]) => s + FAMILLES_COMPO[choix[id]][1], 0);
  const delai = ETAPES_COMPO.reduce((s, [id]) => s + FAMILLES_COMPO[choix[id]][2], 0);
  const conf = choix.conformite; const justif = FAMILLES_COMPO[conf][3]; const errConf = 1 - EXACT_COMPO.conformite[conf];
  const faible = ETAPES_COMPO.reduce((m, e) => (EXACT_COMPO[e[0]][choix[e[0]]] < EXACT_COMPO[m[0]][choix[m[0]]] ? e : m));
  return { fiab, cout, delai, justif, errConf, faible, ok: fiab >= 0.8 && cout <= 6.0001 && delai <= 1500 && justif && errConf <= 0.0201 };
}
export function AtelierComposition({ surReussite }) {
  const [choix, setChoix] = useState({ extraire: 'llm', conformite: 'llm', risque: 'llm', planifier: 'llm' });
  const [teste, setTeste] = useState(false);
  const sol = useSolution();
  const r = evaluerComposition(choix);
  const ligne = (ok, texte) => <tr><td>{texte}</td><td className={ok ? 'ok' : 'ko'}>{ok ? 'respecté ✓' : 'non respecté ✗'}</td></tr>;
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges du service des réclamations.</b>
        <ul><li>Au moins 80 % des réclamations traitées sans erreur, de bout en bout.</li><li>Au plus 6 centimes par réclamation.</li><li>Au plus 1,5 seconde par réclamation.</li><li>Le contrôle de conformité doit pouvoir être justifié critère par critère, et se tromper au plus 2 fois sur 100.</li></ul>
      </div>
      <p>Mesures relevées sur un jeu d'essai : exactitude de chaque famille sur chaque étape, puis coût et délai par décision.</p>
      <table className="tableau compact banc">
        <thead><tr><th>Étape</th>{Object.values(FAMILLES_COMPO).map(([n]) => <th key={n}>{n}</th>)}</tr></thead>
        <tbody>
          {ETAPES_COMPO.map(([id, nom]) => <tr key={id}><th>{nom}</th>{Object.keys(FAMILLES_COMPO).map((f) => <td key={f}>{EXACT_COMPO[id][f] ? `${F(EXACT_COMPO[id][f] * 100, 0)} %` : 'sans objet'}</td>)}</tr>)}
          <tr><th>Coût par décision</th>{Object.values(FAMILLES_COMPO).map(([n, c]) => <td key={n}>{F(c, 1)} c</td>)}</tr>
          <tr><th>Délai par décision</th>{Object.values(FAMILLES_COMPO).map(([n, , d]) => <td key={n}>{d} ms</td>)}</tr>
          <tr><th>Décision justifiable</th>{Object.values(FAMILLES_COMPO).map(([n, , , j]) => <td key={n}>{j ? 'oui' : 'non'}</td>)}</tr>
        </tbody>
      </table>
      <ol className="regles-edit">
        {ETAPES_COMPO.map(([id, nom, note], i) => (
          <li key={id}><b>Étape {i + 1}</b> {nom} <span className="conseil">({note})</span>
            <select value={choix[id]} onChange={(e) => { setChoix({ ...choix, [id]: e.target.value }); setTeste(false); }} aria-label={nom}>
              {Object.keys(EXACT_COMPO[id]).map((f) => <option key={f} value={f}>{FAMILLES_COMPO[f][0]}</option>)}
            </select>
          </li>
        ))}
      </ol>
      <div className="actions">
        <button className="bouton" onClick={() => { setTeste(true); sol.noter(r.ok); if (r.ok) surReussite(); }} data-testid="verifier">Évaluer mon agent</button>
        {sol.bouton(() => { setChoix({ extraire: 'llm', conformite: 'regles', risque: 'statistique', planifier: 'optimisation' }); setTeste(false); })}
      </div>
      {teste && (
        <>
          <table className="tableau compact banc"><tbody>
            {ligne(r.fiab >= 0.8, `Fiabilité de bout en bout : ${ETAPES_COMPO.map(([id]) => F(EXACT_COMPO[id][choix[id]], 2)).join(' × ')} = ${F(r.fiab * 100, 1)} %`)}
            {ligne(r.cout <= 6.0001, `Coût : ${F(r.cout, 1)} centimes par réclamation`)}
            {ligne(r.delai <= 1500, `Délai : ${F(r.delai / 1000, 2)} seconde(s)`)}
            {ligne(r.justif && r.errConf <= 0.0201, `Conformité : ${r.justif ? 'justifiable' : 'non justifiable'}, ${F(r.errConf * 100, 0)} erreur(s) sur 100`)}
          </tbody></table>
          <Bilan ok={r.ok} solution="composition">{r.ok ? "Votre agent respecte les quatre exigences. Vous n'avez pas choisi « la meilleure famille » : vous avez attribué à chaque étape celle qui lui convient. C'est un agent hybride." : [
            !(r.justif && r.errConf <= 0.0201) && "Une décision réglementaire se justifie critère par critère : quelle famille applique des critères écrits tels quels ?",
            r.fiab < 0.8 && `Les exactitudes se multiplient. Votre maillon le plus faible est « ${r.faible[1]} » (${F(EXACT_COMPO[r.faible[0]][choix[r.faible[0]]] * 100, 0)} %) : relisez sa ligne dans le tableau.`,
            r.cout > 6.0001 && "Le coût dépasse le budget : chaque étape confiée au LLM coûte 3 centimes. Où son aptitude au langage est-elle réellement nécessaire ?",
            r.delai > 1500 && "Le délai dépasse 1,5 seconde : chaque appel au LLM prend 900 ms.",
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

// ----------------------------------------------------------------- Contrôles
// LLM en interface, règles en contrôle : les contrôles bloquent une extraction avant toute action.
const CAS_LLM = [
  [1240, 1240, 14, '12/10/2026', false, 'rénovation', true], [12400, 1240, 14, '03/11/2026', false, 'rénovation', false], [860, 860, 13, '28/10/2026', false, 'isolation', false],
  [3100, 3100, 14, '03/02/2027', true, 'chauffage', false], [1990, 1990, 14, '06/11/2026', false, 'aide exceptionnelle', false], [2300, 3200, 14, '21/10/2026', false, 'isolation', false],
  [5000, 5000, 14, '30/10/2026', false, 'chauffage', true], [2000, 2000, 14, '09/11/2026', false, 'rénovation', true], [6100, 6100, 14, '02/11/2026', false, 'chauffage', false], [480, 480, 14, '14/11/2026', false, 'isolation', true],
];
const LISTE = ['rénovation', 'isolation', 'chauffage'];
export const PREDICATS = {
  sup: ['le montant extrait est supérieur à', true, (c, s) => c[0] > s], inf: ['le montant extrait est inférieur à', true, (c, s) => c[0] < s],
  lignes: ['le montant extrait diffère du total des lignes de la facture', false, (c) => c[0] !== c[1]], siret: ["le numéro SIRET n'a pas 14 chiffres", false, (c) => c[2] !== 14],
  date: ['la date de dépôt est postérieure au jour du traitement', false, (c) => c[4]], liste: ['la catégorie est hors de la liste officielle', false, (c) => !LISTE.includes(c[5])],
  rond: ['le montant extrait est un multiple de 1 000 €', false, (c) => c[0] % 1000 === 0],
};
export function evaluerControles(controles) {
  return CAS_LLM.map((c) => { const k = controles.findIndex(({ p, s }) => { const [, seuilRequis, f] = PREDICATS[p]; const v = nombre(s); return seuilRequis ? !Number.isNaN(v) && f(c, v) : f(c); }); return { bloque: k >= 0, par: k, juste: (k >= 0) !== c[6] }; });
}
const euros = (x) => `${String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;
export function AtelierControles({ surReussite }) {
  const [cs, setCs] = useState([{ p: 'sup', s: '5000' }]);
  const [teste, setTeste] = useState(false);
  const sol = useSolution();
  const res = evaluerControles(cs); const nb = res.filter((r) => r.juste).length;
  const maj = (i, ch, v) => { setCs(cs.map((x, k) => (k === i ? { ...x, [ch]: v } : x))); setTeste(false); };
  return (
    <div className="atelier">
      <div className="cahier"><b>Règles métier de l'aide à la rénovation.</b>
        <ul><li>L'aide est plafonnée à 5 000 € : au-delà, la demande part en instruction humaine.</li><li>Le montant demandé est égal au total des lignes de la facture jointe.</li><li>Un numéro SIRET compte 14 chiffres.</li><li>Une demande ne peut pas être datée après le jour du traitement, le 15/11/2026.</li><li>Catégories ouvertes : rénovation, isolation, chauffage.</li><li>Un dossier bloqué est relu par un agent humain : ne bloquez que ce qui doit l'être.</li></ul>
      </div>
      <p>Le LLM a extrait les champs de dix courriers. Écrivez les contrôles qui s'appliquent à ses sorties avant tout versement. Un dossier est bloqué dès qu'un contrôle se déclenche.</p>
      <ol className="regles-edit">
        {cs.map((x, i) => (
          <li key={i}><b>C{i + 1}</b> bloquer si
            <select value={x.p} onChange={(e) => maj(i, 'p', e.target.value)} aria-label="Condition">{Object.entries(PREDICATS).map(([k, [t]]) => <option key={k} value={k}>{t}</option>)}</select>
            {PREDICATS[x.p][1] && <><input value={x.s} onChange={(e) => maj(i, 's', e.target.value)} inputMode="decimal" aria-label="Seuil" /> €</>}
            <button className="lien" onClick={() => { setCs(cs.filter((_, k) => k !== i)); setTeste(false); }}>retirer</button>
          </li>
        ))}
      </ol>
      <div className="actions">
        <button className="bouton secondaire" onClick={() => { setCs([...cs, { p: 'inf', s: '' }]); setTeste(false); }} data-testid="ajouter-regle">+ Ajouter un contrôle</button>
        <button className="bouton" onClick={() => { setTeste(true); sol.noter(nb === CAS_LLM.length); if (nb === CAS_LLM.length) surReussite(); }} data-testid="verifier">Tester mes contrôles</button>
        {sol.bouton(() => { setCs([{ p: 'sup', s: '5000' }, { p: 'lignes', s: '' }, { p: 'siret', s: '' }, { p: 'date', s: '' }, { p: 'liste', s: '' }]); setTeste(false); })}
      </div>
      {teste && (
        <>
          <table className="tableau compact banc">
            <thead><tr><th>Cas</th><th>Montant extrait</th><th>Total des lignes</th><th>SIRET</th><th>Date</th><th>Catégorie</th><th>Attendu</th><th>Vos contrôles</th></tr></thead>
            <tbody>{CAS_LLM.map((c, i) => (
              <tr key={i}><td>{i + 1}</td><td>{euros(c[0])}</td><td>{euros(c[1])}</td><td>{c[2]} chiffres</td><td>{c[3]}</td><td>{c[5]}</td><td>{c[6] ? 'exécuter' : 'bloquer'}</td>
                <td className={res[i].juste ? 'ok' : 'ko'}>{res[i].bloque ? `bloqué (C${res[i].par + 1})` : 'exécuté'} {res[i].juste ? '✓' : '✗'}</td></tr>
            ))}</tbody>
          </table>
          <Bilan ok={nb === CAS_LLM.length} solution="controles">{nb === CAS_LLM.length ? "Les 10 cas passent : aucune extraction fausse n'atteint le versement, et aucun dossier sain n'est bloqué. Le LLM lit, vos règles décident de ce qui peut être exécuté." : `${nb} cas correct(s) sur 10. Pour chaque ligne en rouge : un dossier exécuté à tort signale un contrôle manquant, à chercher dans les règles métier ; un dossier bloqué à tort signale un contrôle trop sévère, dont le numéro est entre parenthèses.`}</Bilan>
        </>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ Pipeline
// Diffusion de la complexité : où placer les contrôles d'une chaîne de cinq agents ?
export const CHAINE = [['Ingestion et OCR', 0.97], ['Extraction des informations', 0.90], ['Validation métier', 0.98], ['Scoring', 0.93], ['Synthèse finale', 0.96]];
export function evaluerChaine(controles) {
  const eff = CHAINE.map(([, p], i) => (controles[i] ? p + (1 - p) * 0.8 : p));
  const nb = controles.filter(Boolean).length; const fiab = eff.reduce((a, b) => a * b, 1); const delai = CHAINE.length * 2 + nb;
  return { eff, nb, fiab, delai, ok: fiab >= 0.9 && delai <= 13 };
}
export function AtelierPipeline({ surReussite }) {
  const [ct, setCt] = useState([false, false, false, false, false]);
  const [teste, setTeste] = useState(false);
  const sol = useSolution();
  const r = evaluerChaine(ct);
  return (
    <div className="atelier">
      <p>Le traitement d'un dossier est réparti entre cinq agents, chacun avec sa fiabilité mesurée. Un agent met 2 secondes. Vous pouvez placer un contrôle automatique à la sortie d'un agent : il rattrape 8 de ses erreurs sur 10 et ajoute 1 seconde. Objectif : au moins 90 % de dossiers sans erreur de bout en bout, en 13 secondes au plus.</p>
      <svg viewBox="0 0 520 120" role="img" aria-label="Chaîne de cinq agents">
        {CHAINE.map(([nom, p], i) => (
          <g key={nom}>
            <rect x={6 + i * 104} y="26" width="92" height="56" rx="8" fill="var(--carte)" stroke={C.bleu} strokeWidth="2.5" />
            <text x={52 + i * 104} y="47" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--texte)">{nom.split(' ')[0]}</text>
            <text x={52 + i * 104} y="62" textAnchor="middle" fontSize="11" fill="var(--texte-doux)">{nom.split(' ').slice(1).join(' ') || ' '}</text>
            <text x={52 + i * 104} y="76" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={ct[i] ? C.vert : C.orange}>{F(r.eff[i] * 100, 1)} %</text>
            {i < 4 && <line x1={98 + i * 104} y1="54" x2={110 + i * 104} y2="54" stroke={C.gris} strokeWidth="2.5" />}
            {ct[i] && <g><circle cx={92 + i * 104} cy="26" r="10" fill={C.vert} /><text x={92 + i * 104} y="30.5" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">✓</text></g>}
          </g>
        ))}
        <text x="6" y="108" fontSize="12" fill="var(--texte-doux)">Sous chaque agent : part de ses sorties sans erreur, contrôle compris.</text>
      </svg>
      <ol className="regles-edit">
        {CHAINE.map(([nom, p], i) => (
          <li key={nom}><label><input type="checkbox" checked={ct[i]} onChange={(e) => { setCt(ct.map((x, k) => (k === i ? e.target.checked : x))); setTeste(false); }} aria-label={`Contrôle après ${nom}`} /> Contrôle après « {nom} » (fiabilité de l'agent seul : {F(p * 100, 0)} %)</label></li>
        ))}
      </ol>
      <div className="actions">
        <button className="bouton" onClick={() => { setTeste(true); sol.noter(r.ok); if (r.ok) surReussite(); }} data-testid="verifier">Évaluer ma chaîne</button>
        {sol.bouton(() => { setCt([false, true, false, true, true]); setTeste(false); })}
      </div>
      {teste && <Bilan ok={r.ok} solution="pipeline">Fiabilité de bout en bout : {r.eff.map((x) => F(x, 3)).join(' × ')} = {F(r.fiab * 100, 1)} %. Délai : 5 × 2 s + {r.nb} × 1 s = {r.delai} s. {r.ok ? "Objectif atteint dans le délai. Vous avez placé les contrôles là où ils rapportent le plus, au lieu de tout contrôler." : r.delai > 13 ? "Le délai est dépassé : tous les contrôles ne se valent pas. Calculez ce que chacun fait gagner et gardez les plus utiles." : r.nb < 3 ? `Sans contrôle, les fiabilités se multiplient et la chaîne perd des dossiers à chaque agent. Il vous reste du délai pour ${3 - r.nb} contrôle(s).` : "Le délai est tenu, mais la fiabilité reste sous 90 %. Un contrôle fait gagner (1 - p) × 0,8 sur son agent : l'un des vôtres protège un agent déjà très fiable."}</Bilan>}
    </div>
  );
}

// ------------------------------------------------------------------- Arbitre
// Diffusion du risque : trois décideurs sur 1 000 dossiers, dont deux aux erreurs corrélées.
// Effectifs exacts par combinaison d'erreurs (règles, statistique, LLM).
const MOTIFS = [[[0, 0, 0], 826], [[1, 0, 0], 54], [[0, 1, 0], 19], [[0, 0, 1], 19], [[0, 1, 1], 75], [[1, 1, 0], 1], [[1, 0, 1], 1], [[1, 1, 1], 5]];
export const DOSSIERS_ARBITRE = (() => { const g = alea(4130); const d = []; MOTIFS.forEach(([m, n]) => { for (let k = 0; k < n; k++) d.push({ faux: m, conforme: g() < 0.7 }); }); return d; })();
export function evaluerArbitre(poids, accord) {
  const total = poids[0] + poids[1] + poids[2]; let humain = 0; let erreurs = 0;
  for (const d of DOSSIERS_ARBITRE) {
    const pour = d.faux.reduce((s, f, i) => s + ((d.conforme ? !f : !!f) ? poids[i] : 0), 0); const contre = total - pour;
    const majorite = Math.max(pour, contre);
    if (total === 0 || pour === contre || majorite * 100 < accord * total) { humain++; continue; }
    if ((pour > contre) !== d.conforme) erreurs++;
  }
  const n = DOSSIERS_ARBITRE.length; const cout = (erreurs * 60 + humain * 4) / n;
  return { humain, erreurs, cout, charge: humain / n, ok: cout <= 1.0001 && humain / n <= 0.15 };
}
const NOMS_ARBITRE = ['moteur de règles', 'modèle statistique', 'agent LLM'];
export function AtelierArbitre({ surReussite }) {
  const [poids, setPoids] = useState([1, 1, 1]); const [accord, setAccord] = useState(50); const [res, setRes] = useState(null);
  const stats = useMemo(() => { const n = DOSSIERS_ARBITRE.length; const err = [0, 1, 2].map((i) => DOSSIERS_ARBITRE.filter((d) => d.faux[i]).length / n); const acc = [[0, 1], [0, 2], [1, 2]].map(([a, b]) => DOSSIERS_ARBITRE.filter((d) => d.faux[a] === d.faux[b]).length / n); const ensemble = DOSSIERS_ARBITRE.filter((d) => d.faux[1] && d.faux[2]).length; return { err, acc, ensemble }; }, []);
  const curseur = (nom, val, set, min, max, pas, unite = '') => (<label className="curseur">{nom} = <b>{val}{unite}</b><input type="range" min={min} max={max} step={pas} value={val} onChange={(e) => { set(Number(e.target.value)); setRes(null); }} aria-label={nom} /></label>);
  const sol = useSolution();
  const tester = () => { const r = evaluerArbitre(poids, accord); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  return (
    <div className="atelier">
      <p>Trois décideurs examinent chacun les mêmes 1 000 dossiers et rendent un avis : conforme ou non conforme. Vous construisez l'arbitre. Il additionne les poids de chaque camp. Si le camp le plus lourd atteint la part d'accord exigée, sa décision est appliquée automatiquement. Sinon, ou en cas d'égalité, le dossier est transmis à un agent humain.</p>
      <div className="cahier"><b>Contraintes.</b>
        <ul><li>Une décision automatique fausse coûte 60 €. Un dossier transmis à un humain coûte 4 € et il est alors bien traité.</li><li>Coût moyen visé : au plus 1,00 € par dossier.</li><li>L'équipe humaine ne peut pas absorber plus de 15 % des dossiers.</li></ul>
      </div>
      <table className="tableau compact banc">
        <thead><tr><th>Mesuré sur le jeu d'essai</th><th>Règles</th><th>Statistique</th><th>LLM</th></tr></thead>
        <tbody>
          <tr><th>Taux d'erreur de chaque décideur seul</th>{stats.err.map((e, i) => <td key={i}>{F(e * 100, 1)} %</td>)}</tr>
          <tr><th>Part des dossiers où deux décideurs rendent le même avis</th><td>règles et statistique : {F(stats.acc[0] * 100, 1)} %</td><td>règles et LLM : {F(stats.acc[1] * 100, 1)} %</td><td>statistique et LLM : {F(stats.acc[2] * 100, 1)} %</td></tr>
        </tbody>
      </table>
      {curseur(`Poids du ${NOMS_ARBITRE[0]}`, poids[0], (v) => setPoids([v, poids[1], poids[2]]), 0, 3, 1)}
      {curseur(`Poids du ${NOMS_ARBITRE[1]}`, poids[1], (v) => setPoids([poids[0], v, poids[2]]), 0, 3, 1)}
      {curseur(`Poids de l'${NOMS_ARBITRE[2]}`, poids[2], (v) => setPoids([poids[0], poids[1], v]), 0, 3, 1)}
      {curseur('Accord exigé', accord, setAccord, 50, 100, 5, ' %')}
      <div className="actions">
        <button className="bouton" onClick={tester} data-testid="verifier">Faire arbitrer les 1 000 dossiers</button>
        {sol.bouton(() => { setPoids([2, 1, 1]); setAccord(75); setRes(null); })}
      </div>
      {res && (
        <Bilan ok={res.ok} solution="arbitre">
          Décisions automatiques fausses : {res.erreurs}. Dossiers transmis à un humain : {res.humain} ({F(res.charge * 100, 1)} %). Coût moyen : ({res.erreurs} × 60 € + {res.humain} × 4 €) / 1 000 = {F(res.cout, 2)} € par dossier.{' '}
          {res.ok ? "Les deux contraintes sont tenues. Votre arbitre ne compte pas des voix : il pèse des avis selon ce qu'ils apportent d'indépendant, et il passe la main quand le désaccord est réel." : res.charge > 0.15 ? "L'équipe humaine est saturée. Tous les désaccords ne se valent pas : quand un seul décideur s'oppose aux deux autres, qui a le plus souvent raison ? Regardez les taux d'erreur, puis réservez l'humain aux désaccords qui restent indécidables." : res.humain === 0 ? `L'arbitre décide toujours seul, et ${res.erreurs} décisions fausses coûtent trop cher. Le modèle statistique et le LLM rendent le même avis dans ${F(stats.acc[2] * 100, 1)} % des cas et se trompent ensemble sur ${stats.ensemble} dossiers : leur accord ne vaut pas deux avis indépendants.` : "Le coût reste trop élevé : trop de décisions automatiques fausses. Repérez quel camp l'emporte quand le moteur de règles s'oppose aux deux autres, et demandez-vous si ce cas se tranche sans humain."}
        </Bilan>
      )}
    </div>
  );
}

export const ATELIERS_A = { composition: AtelierComposition, controles: AtelierControles, pipeline: AtelierPipeline, arbitre: AtelierArbitre };
