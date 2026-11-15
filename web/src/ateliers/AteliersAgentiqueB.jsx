// Ateliers de construction du bloc « Systèmes agentiques » (leçons autonomie, routage, rag, gouvernance).
// Comme dans Ateliers.jsx, l'apprenant fabrique un objet (des seuils de délégation, un routeur,
// une chaîne de recherche documentaire, un schéma de journal) et le système le met à l'épreuve.
// La logique de chaque atelier est exportée à part, pour être étalonnée et testée sans navigateur.
import { useMemo, useState } from 'react';
import { F, C, alea, Bilan } from './Ateliers.jsx';

const milliers = (x) => Math.round(x).toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ');
const euros = (x) => `${milliers(x)} €`;

// ------------------------------------------------------------------ Délégation
// Un lot de dossiers, chacun avec la confiance (calibrée) de l'agent dans sa proposition.
// Trois régimes : exécution automatique, pré-remplissage validé par un humain, décision humaine.
export const DELEG = { n: 20000, erreur: 80, validation: 2, humain: 6, oubli: 0.25, tolerance: 0.05, plafond: 0.005 };
export const LOT = (() => {
  const g = alea(4130);
  return Array.from({ length: DELEG.n }, () => { const u = g(); const c = 1 - 0.5 * u * u; return { c, juste: g() < c, vu: g() >= DELEG.oubli }; });
})();
export function simulerDelegation(bas, haut) {
  const b = Math.min(bas, haut);
  const z = { auto: { n: 0, cout: 0, err: 0 }, valid: { n: 0, cout: 0, err: 0 }, humain: { n: 0, cout: 0, err: 0 } };
  let attendu = 0;
  for (const d of LOT) {
    if (d.c >= haut) { z.auto.n++; if (!d.juste) { z.auto.err++; z.auto.cout += DELEG.erreur; } attendu += (1 - d.c) * DELEG.erreur; }
    else if (d.c >= b) { z.valid.n++; z.valid.cout += DELEG.validation; if (!d.juste && !d.vu) { z.valid.err++; z.valid.cout += DELEG.erreur; } attendu += DELEG.validation + (1 - d.c) * DELEG.oubli * DELEG.erreur; }
    else { z.humain.n++; z.humain.cout += DELEG.humain; attendu += DELEG.humain; }
  }
  return { z, cout: z.auto.cout + z.valid.cout + z.humain.cout, attendu, tauxAuto: z.auto.err / DELEG.n };
}
// Meilleur réglage du lot, cherché sur toute la grille des seuils (calculé à la première demande).
let memoOptimum = null;
export function optimum() {
  if (memoOptimum) return memoOptimum;
  for (let b = 50; b <= 100; b++) for (let h = b; h <= 100; h++) { const r = simulerDelegation(b / 100, h / 100); if (r.tauxAuto <= DELEG.plafond && (!memoOptimum || r.cout < memoOptimum.cout)) memoOptimum = { cout: r.cout, bas: b / 100, haut: h / 100 }; }
  return memoOptimum;
}
function AtelierDelegation({ surReussite }) {
  const [bas, setBas] = useState(0.5); const [haut, setHaut] = useState(0.5); const [res, setRes] = useState(null);
  const lancer = () => {
    const r = simulerDelegation(bas, haut); const opt = optimum(); const ecart = r.cout / opt.cout - 1;
    const pente = (b, h) => simulerDelegation(Math.min(1, Math.max(0.5, b)), Math.min(1, Math.max(0.5, h))).attendu - r.attendu;
    const b = Math.min(bas, haut);
    const pistes = [];
    if (pente(b, haut + 0.02) < -0.004 * r.attendu) pistes.push("Juste au-dessus de votre seuil haut, le risque d'erreur automatique coûte encore plus cher qu'une validation : ce seuil est trop bas.");
    else if (pente(b, haut - 0.02) < -0.004 * r.attendu) pistes.push("Juste sous votre seuil haut, vous payez des validations pour des dossiers presque sûrs : ce seuil est trop haut.");
    if (pente(b + 0.02, haut) < -0.004 * r.attendu) pistes.push("Juste au-dessus de votre seuil bas, corriger les erreurs oubliées à la validation coûte plus cher qu'une décision humaine complète : ce seuil est trop bas.");
    else if (pente(b - 0.02, haut) < -0.004 * r.attendu) pistes.push("Juste sous votre seuil bas, des agents humains refont entièrement des dossiers qu'une simple validation suffirait à sécuriser : ce seuil est trop haut.");
    const ok = ecart <= DELEG.tolerance && r.tauxAuto <= DELEG.plafond;
    setRes({ ...r, ecart, pistes, ok, opt }); if (ok) surReussite();
  };
  const b = Math.min(bas, haut);
  const histo = useMemo(() => { const h = Array(25).fill(0); LOT.forEach((d) => { h[Math.min(24, Math.floor((d.c - 0.5) / 0.02))]++; }); return h; }, []);
  const hmax = Math.max(...histo); const X = (c) => 20 + ((c - 0.5) / 0.5) * 400;
  const curseur = (nom, val, set) => (<label className="curseur">{nom} = <b>{F(val * 100, 0)} %</b><input type="range" min="0.5" max="1" step="0.01" value={val} onChange={(e) => { set(Number(e.target.value)); setRes(null); }} aria-label={nom} /></label>);
  const ligne = (nom, x) => <tr key={nom}><td>{nom}</td><td>{milliers(x.n)}</td><td>{milliers(x.err)}</td><td>{euros(x.cout)}</td></tr>;
  return (
    <div className="atelier">
      <div className="cahier"><b>Données du service.</b>
        <ul>
          <li>Un lot de {milliers(DELEG.n)} dossiers. Pour chacun, l'agent propose une décision et annonce sa confiance, entre 50 % et 100 %. La confiance est calibrée : à 90 %, il se trompe une fois sur dix.</li>
          <li>Exécution automatique : aucun coût si la décision est juste, {DELEG.erreur} € si elle est fausse (reprise du dossier et réclamation).</li>
          <li>Pré-remplissage validé par un humain : {DELEG.validation} € par dossier. Le validateur corrige trois erreurs sur quatre. Une erreur sur quatre lui échappe et coûte {DELEG.erreur} €.</li>
          <li>Décision humaine complète : {DELEG.humain} € par dossier, sans erreur.</li>
          <li>Exigence de sécurité : au plus {F(DELEG.plafond * 100, 1)} % des dossiers du lot exécutés à tort sans regard humain.</li>
        </ul>
      </div>
      <svg viewBox="0 0 440 150" role="img" aria-label="Répartition des dossiers selon la confiance de l'agent">
        {histo.map((n, i) => { const c = 0.5 + i * 0.02 + 0.01; return <rect key={i} x={X(0.5 + i * 0.02) + 1} y={112 - (n / hmax) * 96} width="14" height={(n / hmax) * 96} fill={c >= haut ? C.vert : c >= b ? C.jaune : C.bleu} />; })}
        <line x1="20" x2="420" y1="112" y2="112" stroke="var(--texte)" />
        {[0.5, 0.6, 0.7, 0.8, 0.9, 1].map((c) => <text key={c} x={X(c)} y="126" textAnchor="middle" fontSize="11" fill="var(--texte-doux)">{F(c * 100, 0)} %</text>)}
        <text x="20" y="145" fontSize="11" fill="var(--texte-doux)"><tspan fill={C.bleu} fontWeight="700">■</tspan> décision humaine  <tspan fill={C.jaune} fontWeight="700">■</tspan> validation  <tspan fill={C.vert} fontWeight="700">■</tspan> automatique  (confiance de l'agent en abscisse)</text>
      </svg>
      {curseur('Seuil bas (en dessous : décision humaine)', bas, setBas)}
      {curseur('Seuil haut (au-dessus : exécution automatique)', haut, setHaut)}
      <p className="conseil">Entre les deux seuils, l'agent pré-remplit la décision et un humain la valide. Pour placer un seuil, comparez le coût espéré des deux régimes qu'il sépare, comme dans l'exemple résolu.</p>
      <button className="bouton" onClick={lancer} data-testid="verifier">Traiter le lot avec ces seuils</button>
      {res && (
        <>
          <table className="tableau compact banc">
            <thead><tr><th>Régime</th><th>Dossiers</th><th>Erreurs non rattrapées</th><th>Coût</th></tr></thead>
            <tbody>{ligne('Exécution automatique', res.z.auto)}{ligne('Pré-remplissage validé', res.z.valid)}{ligne('Décision humaine', res.z.humain)}</tbody>
          </table>
          <Bilan ok={res.ok}>
            Coût total : {euros(res.cout)}, soit {F(res.cout / DELEG.n, 2)} € par dossier. Meilleur réglage connu : {F(res.opt.cout / DELEG.n, 2)} € par dossier. Écart : {F(res.ecart * 100, 1)} %. Dossiers exécutés à tort sans regard humain : {F(res.tauxAuto * 100, 2)} % du lot (maximum {F(DELEG.plafond * 100, 1)} %).{' '}
            {res.ok ? "Vos seuils répartissent le travail au moindre coût en tenant l'exigence de sécurité. Vous venez de fixer le niveau d'autonomie du système, dossier par dossier, à partir des coûts et non d'une intuition." : `${res.tauxAuto > DELEG.plafond ? "L'exigence de sécurité n'est pas tenue : trop de décisions fausses partent sans qu'un humain les voie. " : ''}${res.ecart > DELEG.tolerance ? "Le coût dépasse de plus de 5 % le meilleur réglage. " : ''}${res.pistes.join(' ')}`}
          </Bilan>
        </>
      )}
    </div>
  );
}

// --------------------------------------------------------------------- Routeur
export const FILES = ['Urgence sécurité', 'Technique', 'Facturation', 'Administratif'];
export const MESSAGES = [
  ['Demande de duplicata de la facture de mars', 'Facturation'],
  ["Panne du lecteur de badges à l'accueil", 'Technique'],
  ["Changement d'adresse du siège social", 'Administratif'],
  ['Erreur de montant sur la facture 2026-114', 'Facturation'],
  ["Fuite de gaz signalée dans l'atelier", 'Urgence sécurité'],
  ['Panne électrique, odeur de brûlé et début d\'incendie', 'Urgence sécurité'],
  ['Facture du contrôle annuel des alarmes incendie à régler', 'Facturation'],
  ['Mot de passe oublié sur le portail', 'Technique'],
  ['Attestation de dépôt de dossier demandée', 'Administratif'],
  ["Remboursement d'un trop-perçu", 'Facturation'],
  ['Portail inaccessible depuis ce matin', 'Technique'],
  ['Renseignement sur vos horaires d\'ouverture', 'Administratif'],
];
export const MAX_REGLES = 7;
export const normaliser = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
export function router(regles, defaut, texte) {
  const t = normaliser(texte);
  for (let i = 0; i < regles.length; i++) { const m = normaliser(regles[i].mot); if (m.length >= 3 && t.includes(m)) return [regles[i].file, `R${i + 1}`]; }
  return [defaut, 'défaut'];
}
function AtelierRouteur({ surReussite }) {
  const [regles, setRegles] = useState([{ mot: 'panne', file: 'Technique' }]);
  const [defaut, setDefaut] = useState('Technique');
  const [teste, setTeste] = useState(false);
  const maj = (i, champ, val) => { setRegles(regles.map((r, k) => (k === i ? { ...r, [champ]: val } : r))); setTeste(false); };
  const bouger = (i, d) => { const j = i + d; if (j < 0 || j >= regles.length) return; const r = [...regles]; [r[i], r[j]] = [r[j], r[i]]; setRegles(r); setTeste(false); };
  const res = MESSAGES.map(([t]) => router(regles, defaut, t));
  const nb = res.filter(([f], i) => f === MESSAGES[i][1]).length;
  const tout = nb === MESSAGES.length;
  const courts = regles.some((r) => normaliser(r.mot).length < 3);
  const masque = MESSAGES.some(([, attendu], i) => res[i][0] !== attendu && res[i][1] !== 'défaut' && regles.some((r, k) => `R${k + 1}` !== res[i][1] && r.file === attendu && normaliser(r.mot).length >= 3 && normaliser(MESSAGES[i][0]).includes(normaliser(r.mot))));
  return (
    <div className="atelier">
      <div className="cahier"><b>Les quatre files de traitement.</b>
        <ul><li><b>Urgence sécurité</b> : tout danger immédiat pour les personnes ou les locaux. Traitée en moins de dix minutes.</li><li><b>Technique</b> : pannes, accès, portail.</li><li><b>Facturation</b> : factures, paiements, remboursements.</li><li><b>Administratif</b> : tout le reste.</li></ul>
        <p className="conseil">Le routeur lit les règles de haut en bas et applique la première dont le mot-clé figure dans le message (majuscules et accents ignorés, 3 lettres au minimum). Vous disposez de {MAX_REGLES} règles au plus.</p>
      </div>
      <ol className="regles-edit">
        {regles.map((r, i) => (
          <li key={i}>
            <span className="fleches"><button onClick={() => bouger(i, -1)} disabled={i === 0} aria-label="Monter">▲</button><button onClick={() => bouger(i, 1)} disabled={i === regles.length - 1} aria-label="Descendre">▼</button></span>
            <b>R{i + 1}</b> si le message contient
            <input value={r.mot} onChange={(e) => maj(i, 'mot', e.target.value)} aria-label="Mot-clé" style={{ width: 130 }} /> alors file
            <select value={r.file} onChange={(e) => maj(i, 'file', e.target.value)} aria-label="File">{FILES.map((f) => <option key={f}>{f}</option>)}</select>
            <button className="lien" onClick={() => { setRegles(regles.filter((_, k) => k !== i)); setTeste(false); }}>retirer</button>
          </li>
        ))}
        <li className="defaut"><b>Sinon</b> file <select value={defaut} onChange={(e) => { setDefaut(e.target.value); setTeste(false); }} aria-label="File par défaut">{FILES.map((f) => <option key={f}>{f}</option>)}</select></li>
      </ol>
      <div className="actions">
        <button className="bouton secondaire" disabled={regles.length >= MAX_REGLES} onClick={() => { setRegles([...regles, { mot: '', file: 'Technique' }]); setTeste(false); }} data-testid="ajouter-regle">+ Ajouter une règle</button>
        <button className="bouton" onClick={() => { setTeste(true); if (tout) surReussite(); }} data-testid="verifier">Tester mon routeur</button>
      </div>
      {teste && (
        <>
          <table className="tableau compact banc">
            <thead><tr><th>Message reçu</th><th>File attendue</th><th>Votre routeur</th></tr></thead>
            <tbody>{MESSAGES.map(([t, attendu], i) => (
              <tr key={t}><td>{t}</td><td>{attendu}</td><td className={res[i][0] === attendu ? 'ok' : 'ko'}>{res[i][0]} ({res[i][1]}) {res[i][0] === attendu ? '✓' : '✗'}</td></tr>
            ))}</tbody>
          </table>
          <Bilan ok={tout}>{tout ? `Les ${MESSAGES.length} messages arrivent dans la bonne file. Votre routeur tient en ${regles.length} règles ordonnées et une file par défaut : il est lisible, testable, et chaque orientation se justifie par la règle qui l'a produite.` : `${nb} message(s) bien orienté(s) sur ${MESSAGES.length}. Pour chaque ligne en rouge, regardez la règle qui a répondu (entre parenthèses). ${courts ? 'Une règle au mot-clé vide ou trop court est ignorée. ' : ''}${masque ? "Au moins un message contient deux de vos mots-clés : c'est la règle placée le plus haut qui l'emporte. Revoyez l'ordre, ou choisissez un mot-clé plus précis. " : ''}Si la réponse vient de « défaut », aucun de vos mots-clés ne figure dans le message.`}</Bilan>
        </>
      )}
    </div>
  );
}

// ------------------------------------------------------------------------ RAG
// Règlement fictif d'une aide aux travaux : quatre fiches de six phrases.
export const CORPUS = [
  ['Dépôt', ["Le dossier de demande d'aide se dépose sur le portail avant le 30 septembre.", "Le dossier comprend le formulaire signé, un relevé d'identité bancaire et le devis des travaux.", 'Un accusé de réception est envoyé au demandeur sous cinq jours ouvrés.', 'Un dossier incomplet est mis en attente et le demandeur dispose de quinze jours pour le compléter.', 'Passé ce délai, le dossier incomplet est classé sans suite.', 'Le demandeur peut déposer un nouveau dossier lors de la campagne suivante.']],
  ['Instruction', ["L'instruction du dossier est confiée à un agent instructeur du service.", "L'instructeur vérifie l'éligibilité du demandeur et la conformité du devis.", "Le montant de l'aide est plafonné à 40 % du devis, dans la limite de 8 000 euros.", 'Un dossier dont le devis dépasse 20 000 euros passe en commission.', 'La commission se réunit le premier mardi de chaque mois.', 'La décision est notifiée au demandeur par courrier dans un délai de deux mois.']],
  ['Paiement', ["Le paiement de l'aide intervient après réception de la facture acquittée.", 'La facture doit être transmise dans les douze mois qui suivent la notification.', 'Un acompte de 30 % peut être versé au démarrage des travaux sur demande écrite.', 'Le solde est versé par virement sous trente jours.', "Si les travaux coûtent moins que le devis, l'aide est recalculée sur le montant réel.", "Une aide versée à tort fait l'objet d'un ordre de reversement."]],
  ['Recours', ['Un refus peut être contesté par un recours gracieux adressé au directeur.', 'Le recours doit être présenté dans les deux mois qui suivent la notification du refus.', 'Le directeur répond au recours dans un délai de trente jours.', "L'absence de réponse du directeur vaut rejet du recours.", 'Le demandeur peut alors saisir le médiateur.', 'Le médiateur rend un avis qui ne lie pas le service.']],
];
// Chaque question désigne la phrase qui porte la réponse : [fiche, phrase].
export const QUESTIONS = [
  ['Quelle est la date limite pour déposer mon dossier de demande sur le portail ?', [0, 0]],
  ['Mon dossier est incomplet, de combien de jours est-ce que je dispose pour le compléter ?', [0, 3]],
  ["Quel est le montant maximum de l'aide que le service peut verser au demandeur ?", [1, 2]],
  ['À partir de quel montant de devis le dossier doit-il passer en commission ?', [1, 3]],
  ['Quel jour du mois la commission se réunit-elle ?', [1, 4]],
  ['Combien de temps ai-je pour transmettre la facture après la notification ?', [2, 1]],
  ['Est-ce que le demandeur peut recevoir un acompte avant la fin des travaux ?', [2, 2]],
  ["Sous combien de jours le solde de l'aide est-il versé ?", [2, 3]],
  ["Que devient le montant de l'aide si les travaux coûtent moins cher que le devis ?", [2, 4]],
  ['De quel délai le demandeur dispose-t-il pour présenter un recours après un refus ?', [3, 1]],
  ['En combien de jours le directeur doit-il répondre au recours du demandeur ?', [3, 2]],
  ['Que peut faire le demandeur si le directeur ne répond pas à son recours ?', [3, 4]],
];
export const RAG = { minimum: 10, budget: 60 };
export const mots = (s) => normaliser(s).replace(/['\u2019-]/g, ' ').split(/[^a-z0-9]+/).filter((m) => m.length > 0);
export function decouper(taille) {
  const morceaux = [];
  CORPUS.forEach(([fiche, phrases], f) => { for (let i = 0; i < phrases.length; i += taille) { const lot = phrases.slice(i, i + taille); morceaux.push({ fiche, f, de: i, a: i + lot.length - 1, texte: lot.join(' '), mots: mots(lot.join(' ')) }); } });
  return morceaux;
}
export function evaluerRag(taille, k, methode) {
  const morceaux = decouper(taille); const N = morceaux.length;
  const df = {}; morceaux.forEach((m) => new Set(m.mots).forEach((w) => { df[w] = (df[w] || 0) + 1; }));
  const poids = (w) => (methode === 'rarete' ? Math.log2(N / df[w]) : 1);
  const details = QUESTIONS.map(([q, [f, p]]) => {
    const qm = [...new Set(mots(q))];
    const classes = morceaux.map((m, i) => { const communs = qm.filter((w) => m.mots.includes(w)); return { i, m, communs, score: communs.reduce((s, w) => s + (methode === 'rarete' ? poids(w) : m.mots.filter((x) => x === w).length), 0) }; }).sort((x, y) => y.score - x.score || x.i - y.i);
    const retenus = classes.slice(0, k);
    const trouve = retenus.some((r) => r.m.f === f && r.m.de <= p && p <= r.m.a);
    const rang = classes.findIndex((r) => r.m.f === f && r.m.de <= p && p <= r.m.a) + 1;
    return { q, trouve, rang, premier: classes[0], contexte: retenus.reduce((s, r) => s + r.m.mots.length, 0) };
  });
  const rappel = details.filter((d) => d.trouve).length / QUESTIONS.length;
  const contexte = details.reduce((s, d) => s + d.contexte, 0) / QUESTIONS.length;
  return { details, rappel, contexte, nbMorceaux: N, ok: details.filter((d) => d.trouve).length >= RAG.minimum && contexte <= RAG.budget };
}
function AtelierRag({ surReussite }) {
  const [taille, setTaille] = useState(6); const [k, setK] = useState(1); const [methode, setMethode] = useState('compte'); const [res, setRes] = useState(null);
  const lancer = () => { const r = evaluerRag(taille, k, methode); setRes(r); if (r.ok) surReussite(); };
  const curseur = (nom, val, set, min, max) => (<label className="curseur">{nom} = <b>{val}</b><input type="range" min={min} max={max} step="1" value={val} onChange={(e) => { set(Number(e.target.value)); setRes(null); }} aria-label={nom} /></label>);
  const rate = res?.details.find((d) => !d.trouve);
  return (
    <div className="atelier">
      <div className="cahier"><b>Le corpus et le banc d'essai.</b>
        <ul><li>Le règlement d'une aide aux travaux : {CORPUS.length} fiches ({CORPUS.map(([n]) => n).join(', ')}) de 6 phrases chacune.</li><li>{QUESTIONS.length} questions d'usagers. Pour chacune, on sait quelle phrase du règlement porte la réponse.</li><li>Objectif : retrouver la bonne phrase pour au moins {RAG.minimum} questions sur {QUESTIONS.length} (rappel de {F((RAG.minimum / QUESTIONS.length) * 100, 0)} % : la phrase attendue figure dans les morceaux transmis au modèle), avec un contexte moyen d'au plus {RAG.budget} mots par question.</li></ul>
        <details><summary>Lire le règlement</summary>{CORPUS.map(([n, ph]) => <p key={n}><b>{n}.</b> {ph.join(' ')}</p>)}</details>
      </div>
      {curseur('Taille des morceaux (phrases)', taille, setTaille, 1, 6)}
      {curseur('Nombre k de morceaux transmis', k, setK, 1, 5)}
      <label className="curseur">Score d'un morceau<select value={methode} onChange={(e) => { setMethode(e.target.value); setRes(null); }} aria-label="Score d'un morceau"><option value="compte">nombre de mots communs avec la question</option><option value="rarete">mots communs pondérés par leur rareté</option></select></label>
      <button className="bouton" onClick={lancer} data-testid="verifier">Lancer les {QUESTIONS.length} questions</button>
      {res && (
        <>
          <table className="tableau compact banc">
            <thead><tr><th>Question</th><th>Rang du bon morceau</th><th>Transmis au modèle ?</th></tr></thead>
            <tbody>{res.details.map((d) => <tr key={d.q}><td>{d.q}</td><td>{d.rang}</td><td className={d.trouve ? 'ok' : 'ko'}>{d.trouve ? 'oui ✓' : 'non ✗'}</td></tr>)}</tbody>
          </table>
          <Bilan ok={res.ok}>
            {res.nbMorceaux} morceaux indexés. Rappel : {F(res.rappel * 100, 0)} % ({res.details.filter((d) => d.trouve).length} questions sur {QUESTIONS.length}). Contexte moyen : {F(res.contexte, 1)} mots par question (budget {RAG.budget}).{' '}
            {res.ok ? "Objectif atteint : le bon passage arrive au modèle presque à chaque fois, sans noyer la question sous le texte. Vous avez réglé l'étage de recherche, celui dont dépend tout le reste." : `${res.contexte > RAG.budget ? "Le contexte dépasse le budget : des morceaux trop longs ou trop nombreux coûtent cher et diluent la réponse dans du texte sans rapport. " : ''}${rate ? `Exemple d'échec : « ${rate.q} ». Le morceau classé premier vient de la fiche ${rate.premier.m.fiche} et doit son score aux mots communs « ${rate.premier.communs.join(', ')} ». Ces mots distinguent-ils vraiment ce morceau des autres ? Le bon morceau n'est qu'au rang ${rate.rang}.` : ''}`}
          </Bilan>
        </>
      )}
    </div>
  );
}

// --------------------------------------------------------------------- Journal
// Champs proposés : [clé, libellé, coût en unités de stockage, donnée personnelle ?, extrait d'enregistrement]
export const CHAMPS = [
  ['id', 'Identifiant du dossier', 1, false, 'dossier: 2417'],
  ['horodatage', 'Horodatage de chaque étape', 1, false, 'etapes: [09:14:02, 09:14:03, 09:14:05, 14:02:40]'],
  ['versions', 'Version des règles, des seuils et du modèle', 1, false, 'versions: {regles: 12, seuils: 5, modele: 3}'],
  ['regles', 'Règles déclenchées et scores calculés', 2, false, 'regles: [R4], score_risque: 0.31'],
  ['avis', "Avis de chaque agent et décision de l'arbitre", 2, false, 'avis: {regles: commission, score: accepter}, arbitre: commission'],
  ['validation', 'Identifiant du validateur humain et sa décision', 1, false, 'validation: {par: V-07, decision: confirme}'],
  ['outils', "Appels d'outils et leurs réponses", 2, false, 'outils: [{nom: registre_entreprises, reponse: actif}]'],
  ['empreinte', 'Empreinte numérique de chaque pièce reçue', 1, false, 'pieces: [9f3c, 51ab]'],
  ['duree', 'Durée de chaque étape', 1, false, 'durees_ms: [40, 310, 95]'],
  ['texte', 'Texte intégral des pièces du dossier', 6, true, 'texte_pieces: "…"'],
  ['identite', 'Nom, adresse et coordonnées bancaires du demandeur', 1, true, 'demandeur: {nom: "…", iban: "…"}'],
];
export const AUDITS = [
  ['Le dossier 2417 est passé en commission : quelle règle en est la cause, et sur quel score ?', ['id', 'regles']],
  ["Les règles ont changé depuis : la décision a-t-elle été prise avec l'ancienne ou la nouvelle version ?", ['id', 'versions']],
  ["Les agents étaient-ils d'accord entre eux, et comment l'arbitre a-t-il tranché ?", ['id', 'avis']],
  ['Un humain a-t-il validé la décision ? Qui, et à quelle heure ?', ['id', 'validation', 'horodatage']],
  ["Le registre des entreprises a-t-il bien été interrogé, et qu'a-t-il répondu ?", ['id', 'outils']],
  ["Le devis examiné est-il bien celui que le demandeur a déposé, sans modification ?", ['id', 'empreinte']],
];
export const JOURNAL = { budget: 12 };
export function auditer(choisis) {
  const s = new Set(choisis);
  const cout = CHAMPS.filter(([c]) => s.has(c)).reduce((t, x) => t + x[2], 0);
  const perso = CHAMPS.filter(([c, , , p]) => p && s.has(c)).map((x) => x[1]);
  const audits = AUDITS.map(([q, besoin]) => ({ q, manque: besoin.filter((b) => !s.has(b)).map((b) => CHAMPS.find(([c]) => c === b)[1]) }));
  const sans = audits.filter((a) => a.manque.length).length;
  return { cout, perso, audits, sans, ok: sans === 0 && perso.length === 0 && cout <= JOURNAL.budget };
}
function AtelierJournal({ surReussite }) {
  const [choisis, setChoisis] = useState(['id', 'texte']); const [res, setRes] = useState(null);
  const basculer = (c) => { setChoisis(choisis.includes(c) ? choisis.filter((x) => x !== c) : [...choisis, c]); setRes(null); };
  const cout = CHAMPS.filter(([c]) => choisis.includes(c)).reduce((t, x) => t + x[2], 0);
  const verifier = () => { const r = auditer(choisis); setRes(r); if (r.ok) surReussite(); };
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges du journal.</b>
        <ul><li>Chaque dossier traité laisse un enregistrement. Le service d'audit doit pouvoir répondre, six mois plus tard, aux six questions du tableau ci-dessous sans rouvrir le dossier.</li><li>Stockage : {JOURNAL.budget} unités au plus par enregistrement.</li><li>Minimisation : aucune donnée personnelle du demandeur dans le journal, qui est lu par des équipes techniques et conservé longtemps.</li></ul>
      </div>
      <ul className="champs" style={{ listStyle: 'none', paddingLeft: 0 }}>
        {CHAMPS.map(([c, nom, prix]) => (
          <li key={c}><label><input type="checkbox" checked={choisis.includes(c)} onChange={() => basculer(c)} aria-label={nom} /> {nom} <em>({prix} unité{prix > 1 ? 's' : ''})</em></label></li>
        ))}
      </ul>
      <p className="conseil">Enregistrement actuel : {cout} unité(s) sur {JOURNAL.budget}.</p>
      <pre><code>{`{\n${CHAMPS.filter(([c]) => choisis.includes(c)).map((x) => `  ${x[4]}`).join(',\n')}\n}`}</code></pre>
      <button className="bouton" onClick={verifier} data-testid="verifier">Rejouer les questions d'audit</button>
      {res && (
        <>
          <table className="tableau compact banc">
            <thead><tr><th>Question de l'auditeur</th><th>Votre journal permet-il de répondre ?</th></tr></thead>
            <tbody>{res.audits.map((a) => <tr key={a.q}><td>{a.q}</td><td className={a.manque.length ? 'ko' : 'ok'}>{a.manque.length ? `non ✗ : il manque « ${a.manque.join(' », « ')} »` : 'oui ✓'}</td></tr>)}</tbody>
          </table>
          <Bilan ok={res.ok}>
            {AUDITS.length - res.sans} question(s) sur {AUDITS.length} trouvent leur réponse. Enregistrement : {res.cout} unité(s) sur {JOURNAL.budget}.{' '}
            {res.ok ? "Votre schéma de journal répond à tout l'audit, tient dans le budget et ne contient aucune donnée personnelle. Chaque décision du système peut être expliquée, datée et attribuée." : `${res.perso.length ? `Minimisation non respectée : « ${res.perso.join(' », « ')} ». Aucune question d'audit n'exige cette donnée en clair. Cherchez un champ qui prouve la même chose sans rien révéler du demandeur. ` : ''}${res.cout > JOURNAL.budget ? 'Le budget de stockage est dépassé : retirez ce qui ne sert à aucune question. ' : ''}${res.sans ? "Pour chaque ligne en rouge, le tableau nomme l'information absente." : ''}`}
          </Bilan>
        </>
      )}
    </div>
  );
}

export const ATELIERS_B = { delegation: AtelierDelegation, routeur: AtelierRouteur, rag: AtelierRag, journal: AtelierJournal };
