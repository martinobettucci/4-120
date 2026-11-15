// Ateliers du bloc « Systèmes agentiques » (troisième partie). L'apprenant y construit :
// les poids d'une heuristique de priorité, vérifiés sur une file de tickets, et l'architecture
// d'une demande de prêt, composée à partir des design patterns et évaluée sur un cahier des charges.
// La logique de chaque atelier est exportée à part, pour être étalonnée et testée sans navigateur.
import { useState } from 'react';
import { F, Bilan } from './Ateliers.jsx';

const entier = (x) => (Math.abs(x - Math.round(x)) < 1e-6 ? String(Math.round(x)) : F(x, 1));

// --------------------------------------------------------------- Priorisation
// Agent heuristique : score = somme des poids × valeurs. Chaque ticket : gravité, secteur,
// jours d'attente, délai contractuel dépassé, client stratégique.
export const TICKETS_FILE = [
  ['T1', 5, 1, 0, 0, 0], ['T2', 3, 3, 4, 1, 1], ['T3', 3, 2, 0, 0, 0], ['T4', 2, 1, 10, 0, 0], ['T5', 4, 2, 1, 1, 0],
  ['T6', 4, 2, 1, 0, 0], ['T7', 2, 2, 2, 0, 1], ['T8', 2, 2, 2, 0, 0], ['T9', 3, 1, 0, 0, 0],
];
export const CRITERES = ['Gravité', 'Secteur', "Jour d'attente", 'Délai dépassé', 'Client stratégique'];
export const EXIGENCES = [
  ['T1', 'T2', "Un ticket de gravité 5 passe avant tout ticket de gravité 3, même ancien, hors délai et stratégique.", "Deux niveaux de gravité doivent peser plus lourd que tout ce que T2 gagne par ailleurs : secteur, attente, délai et client réunis."],
  ['T1', 'T4', "Un ticket de gravité 5 passe avant un ticket de gravité 2, même en attente depuis 10 jours.", "Trois niveaux de gravité doivent peser plus lourd que dix jours d'attente."],
  ['T4', 'T3', "Personne n'attend indéfiniment : un ticket de gravité 2 en attente depuis 10 jours passe avant un ticket de gravité 3 du jour.", "Dix jours d'attente doivent peser plus lourd qu'un niveau de gravité et un niveau de secteur."],
  ['T5', 'T6', 'À situation égale, le ticket dont le délai contractuel est dépassé passe le premier.', "Le délai dépassé ne pèse rien : son poids doit être positif."],
  ['T7', 'T8', 'À situation égale, le client stratégique passe le premier.', "Le client stratégique ne pèse rien : son poids doit être positif."],
  ['T6', 'T7', 'Un client stratégique ne double pas un ticket plus grave de deux niveaux.', "Deux niveaux de gravité doivent peser plus lourd qu'un jour d'attente et le bonus de client stratégique réunis."],
  ['T3', 'T9', 'À situation égale, le secteur prioritaire passe le premier.', "Le secteur ne pèse rien : son poids doit être positif."],
];
export const scoreFile = (p, t) => p[0] * t[1] + p[1] * t[2] + p[2] * t[3] + p[3] * t[4] + p[4] * t[5];
export function evaluerPriorisation(p) {
  const sc = Object.fromEntries(TICKETS_FILE.map((t) => [t[0], scoreFile(p, t)]));
  const exigences = EXIGENCES.map(([a, b, texte, piste]) => ({ a, b, texte, piste, ok: sc[a] > sc[b] }));
  const ordre = [...TICKETS_FILE].sort((x, y) => sc[y[0]] - sc[x[0]] || y[3] - x[3]);
  return { sc, exigences, ordre, ok: exigences.every((e) => e.ok) };
}
export function AtelierPriorisation({ surReussite }) {
  const [p, setP] = useState([3, 2, 1, 4, 3]); const [res, setRes] = useState(null);
  const trier = () => { const r = evaluerPriorisation(p); setRes(r); if (r.ok) surReussite(); };
  const manque = res?.exigences.find((e) => !e.ok);
  return (
    <div className="atelier">
      <div className="cahier"><b>La politique de priorité du service.</b>
        <ol>{EXIGENCES.map(([a, b, texte]) => <li key={a + b}>{texte}</li>)}</ol>
      </div>
      <p>Score d'un ticket = somme des poids multipliés par les valeurs. Les poids de départ sont ceux de la démonstration. Réglez-les, entre 0 et 10, puis faites trier la file.</p>
      {CRITERES.map((nom, i) => (
        <label className="curseur" key={nom}>{nom} = <b>{p[i]}</b><input type="range" min="0" max="10" step="1" value={p[i]} onChange={(e) => { setP(p.map((x, k) => (k === i ? Number(e.target.value) : x))); setRes(null); }} aria-label={nom} /></label>
      ))}
      <button className="bouton" onClick={trier} data-testid="verifier">Trier la file avec ces poids</button>
      {res && (
        <>
          <table className="tableau compact file-triee">
            <thead><tr><th>Rang</th><th>Ticket</th><th>Gravité</th><th>Secteur</th><th>Attente</th><th>Délai contractuel</th><th>Client</th><th>Score</th></tr></thead>
            <tbody>{res.ordre.map((t, i) => <tr key={t[0]}><td>{i + 1}</td><th>{t[0]}</th><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]} j</td><td>{t[4] ? 'dépassé' : 'tenu'}</td><td>{t[5] ? 'stratégique' : 'courant'}</td><td>{res.sc[t[0]]}</td></tr>)}</tbody>
          </table>
          <table className="tableau compact banc">
            <thead><tr><th>Exigence</th><th>Scores</th><th>Votre file</th></tr></thead>
            <tbody>{res.exigences.map((e, i) => <tr key={e.a + e.b}><td>{i + 1}. {e.a} avant {e.b}</td><td>{res.sc[e.a]} contre {res.sc[e.b]}</td><td className={e.ok ? 'ok' : 'ko'}>{e.ok ? 'respectée ✓' : 'non respectée ✗'}</td></tr>)}</tbody>
          </table>
          <Bilan ok={res.ok}>{res.ok ? "Les 7 exigences sont respectées. Vos poids ne sont pas un réglage technique : ils écrivent la politique de priorité du service, et chacun peut la vérifier sur la file." : `${res.exigences.filter((e) => e.ok).length} exigence(s) respectée(s) sur 7. Première exigence non tenue : ${manque.a} doit passer avant ${manque.b}. ${manque.piste}`}</Bilan>
        </>
      )}
    </div>
  );
}

// -------------------------------------------------------------------- Patrons
// Design patterns : une organisation, puis des patterns de robustesse sur la décision.
// 1 000 demandes de prêt, dont 200 à refuser. Effectifs attendus, erreurs indépendantes.
export const PRET = { bonnes: 800, mauvaises: 200, maxFautives: 5, maxRevue: 0.15, maxDelai: 5 };
export function evaluerArchitecture({ org, double, contra, vh }) {
  const { bonnes, mauvaises } = PRET;
  let fautives = double ? mauvaises * 0.2 * 0.1 : mauvaises * 0.2;
  const bonnesAcceptees = bonnes * 0.9;
  let revue = double ? mauvaises * (0.2 * 0.9 + 0.8 * 0.1) + bonnes * 0.1 : 0;
  if (contra) { revue += fautives * 0.5 + bonnesAcceptees * 0.05; fautives *= 0.5; }
  if (vh) { fautives *= 0.5; revue = (bonnes + mauvaises) * 0.5 + revue * 0.5; }
  const delai = (org === 'superviseur' ? 4 : 3) + (double ? 1 : 0) + (contra ? 2 : 0);
  const part = revue / (bonnes + mauvaises);
  const tests = { fautives: fautives <= PRET.maxFautives + 1e-6, revue: part <= PRET.maxRevue + 1e-9, delai: delai <= PRET.maxDelai, trace: org !== 'reseau', reprise: org === 'superviseur' };
  return { fautives, revue, part, delai, tests, ok: Object.values(tests).every(Boolean) };
}
const ORGANISATIONS = { pipeline: 'Pipeline linéaire', superviseur: 'Superviseur central', reseau: "Réseau d'agents spécialisés" };
export function AtelierPatrons({ surReussite }) {
  const [a, setA] = useState({ org: 'pipeline', double: false, contra: false, vh: false }); const [teste, setTeste] = useState(false);
  const r = evaluerArchitecture(a);
  const maj = (cle, v) => { setA({ ...a, [cle]: v }); setTeste(false); };
  const ligne = (ok, texte) => <tr><td>{texte}</td><td className={ok ? 'ok' : 'ko'}>{ok ? 'respecté ✓' : 'non respecté ✗'}</td></tr>;
  const coche = (cle, nom, detail) => <li key={cle}><label><input type="checkbox" checked={a[cle]} onChange={(e) => maj(cle, e.target.checked)} aria-label={nom} /> <b>{nom}</b> <span className="conseil">{detail}</span></label></li>;
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges de la demande de prêt.</b>
        <ul><li>Au plus 5 demandes à refuser acceptées à tort, sur 1 000 demandes.</li><li>Au plus 15 % des demandes en revue humaine.</li><li>Au plus 5 secondes de traitement automatique par demande.</li><li>Chaque décision doit pouvoir être retracée étape par étape.</li><li>Une étape en échec (pièce illisible, service indisponible) doit être relancée sans bloquer la demande : il faut un point unique qui contrôle chaque résultat.</li></ul>
      </div>
      <table className="tableau compact donnees"><tbody>
        <tr><th>Jeu d'essai</th><td>1 000 demandes : 800 bonnes, 200 à refuser. Trois étapes : validation des pièces, score de risque, décision. Sans autre pattern, la décision suit le score.</td></tr>
        <tr><th>Score de risque</th><td>accepte 20 % des demandes à refuser, refuse 10 % des bonnes</td></tr>
        <tr><th>Moteur de règles</th><td>accepte 10 % des demandes à refuser, ne refuse aucune bonne demande</td></tr>
        <tr><th>Contradicteur</th><td>conteste 50 % des acceptations fautives et 5 % des acceptations justes. Chaque contestation part en revue humaine.</td></tr>
        <tr><th>Validation humaine</th><td>au-dessus de 10 000 €, soit une demande sur deux. L'humain décide juste.</td></tr>
        <tr><th>Délais</th><td>3 secondes pour les trois étapes, 1 seconde de plus avec un superviseur, 1 seconde pour la double validation, 2 secondes pour le contradicteur</td></tr>
      </tbody></table>
      <ol className="regles-edit">
        <li><b>Organisation des agents</b>
          <select value={a.org} onChange={(e) => maj('org', e.target.value)} aria-label="Organisation des agents">{Object.entries(ORGANISATIONS).map(([k, n]) => <option key={k} value={k}>{n}</option>)}</select>
        </li>
        {coche('double', 'Double validation', "le moteur de règles et le score doivent s'accorder, tout désaccord part en revue humaine")}
        {coche('contra', 'Contradicteur dédié', 'un agent conteste chaque acceptation avant son exécution')}
        {coche('vh', 'Suggestion puis validation humaine', 'au-dessus de 10 000 €, le système propose et un humain décide')}
      </ol>
      <button className="bouton" onClick={() => { setTeste(true); if (r.ok) surReussite(); }} data-testid="verifier">Évaluer mon architecture</button>
      {teste && (
        <>
          <table className="tableau compact banc"><tbody>
            {ligne(r.tests.fautives, `Demandes à refuser acceptées à tort : ${entier(r.fautives)} (maximum 5)`)}
            {ligne(r.tests.revue, `Revue humaine : ${entier(r.revue)} demandes, soit ${F(r.part * 100, 1)} % (maximum 15 %)`)}
            {ligne(r.tests.delai, `Traitement automatique : ${r.delai} secondes (maximum 5)`)}
            {ligne(r.tests.trace, `Décision retraçable étape par étape : ${r.tests.trace ? 'oui' : 'non'}`)}
            {ligne(r.tests.reprise, `Point unique de contrôle et de relance : ${r.tests.reprise ? 'oui' : 'non'}`)}
          </tbody></table>
          <Bilan ok={r.ok}>{r.ok ? "Les cinq exigences sont tenues. Vous avez retenu une organisation pour ce qu'elle garantit, et un seul pattern de robustesse, celui que le coût d'une erreur justifiait. Ajouter les autres aurait saturé la revue humaine." : [
            !r.tests.fautives && "Trop d'acceptations fautives : le score seul laisse passer 20 % des demandes à refuser. Quel pattern n'agit que si deux agents différents s'accordent ?",
            r.tests.fautives && !r.tests.revue && "La revue humaine dépasse 15 % : chaque pattern de robustesse y envoie des dossiers. Lequel de vos patterns n'est pas nécessaire pour tenir l'objectif d'acceptations fautives ?",
            !r.tests.delai && "Le délai dépasse 5 secondes : additionnez ce que chaque pattern ajoute au traitement.",
            !r.tests.trace && "Dans un réseau, les agents se parlent directement : rien ne garantit la trace complète d'une décision.",
            r.tests.trace && !r.tests.reprise && "Dans un pipeline, chaque agent ne voit que la sortie du précédent. Quelle organisation fait passer tous les résultats par le même point ?",
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

export const ATELIERS_C = { priorisation: AtelierPriorisation, patrons: AtelierPatrons };
