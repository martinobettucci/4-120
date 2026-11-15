// Ateliers de conception du module 7 (systèmes agentiques). L'apprenant y spécifie un agent, programme la fonction
// qui fait traverser le système à un dossier, monte un dispositif d'évaluation et arrête la conception d'un système complet.
// Chaque construction est réellement exécutée, puis confrontée à un cahier des charges. La logique est exportée pour l'étalonnage.
import { useState } from 'react';
import { F, C, alea, Bilan } from './Ateliers.jsx';
import { useSolution } from './Solution.jsx';

const milliers = (x) => String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const basculer = (liste, x) => (liste.includes(x) ? liste.filter((y) => y !== x) : [...liste, x]);
const verdict = (ok, texte) => <tr key={texte}><td>{texte}</td><td className={ok ? 'ok' : 'ko'} style={{ whiteSpace: 'nowrap' }}>{ok ? 'tenue ✓' : 'non tenue ✗'}</td></tr>;

// --------------------------------------------------------------- Composantes
// L'apprenant spécifie les composantes d'un assistant de ressources humaines. L'agent ainsi spécifié traite réellement
// douze demandes de congé, l'une après l'autre, et chaque décision est comparée à l'état réel des soldes et du planning.
// Une demande s'écrit [personne, premier jour, durée en jours].
export const EQUIPE_RH = [['Alix', 6], ['Basile', 2], ['Chloé', 5], ['Dany', 1], ['Elsa', 8]];
export const RH = { jours: 10, presents: 3, court: 2, maxSoumises: 4 };
export const DEMANDES_RH = [[0, 1, 1], [1, 1, 2], [2, 1, 1], [3, 3, 2], [4, 4, 5], [2, 5, 3], [0, 6, 1], [3, 9, 1], [3, 10, 1], [4, 9, 2], [2, 8, 3], [0, 2, 3]];
export const COMPOSANTES_RH = [
  ['percoit', "Ce qu'il perçoit", [['formulaire', 'Le formulaire de demande : demandeur, premier jour, durée'], ['retours', 'Les décisions de la responsable sur les demandes soumises'], ['motif', 'Le motif du congé, rédigé en texte libre']]],
  ['tient', "Ce qu'il tient à jour", [['solde', 'Le solde de congés de chacun'], ['planning', "Le planning des absences de l'équipe"]]],
  ['regles', 'Sa politique de décision', [['solde', 'Refuser si le solde ne couvre pas la durée demandée'], ['effectif', "Refuser si l'équipe passe sous 3 présents un des jours demandés"], ['collegue', 'Refuser si un collègue est déjà absent un des jours demandés']]],
  ['actions', 'Ses actions possibles', [['repondre', 'Envoyer la réponse au demandeur'], ['inscrire', 'Inscrire le congé au planning et débiter le solde'], ['transmettre', 'Transmettre la demande à la responsable']]],
];
export const AUTONOMIES_RH = [['tout', 'toutes ses décisions'], ['courts', 'les refus et les congés de 2 jours au plus, le reste est soumis à la responsable'], ['rien', 'les refus seulement, tout accord est soumis à la responsable']];
export const SOLUTION_COMPOSANTES = { percoit: ['formulaire', 'retours'], tient: ['solde', 'planning'], regles: ['solde', 'effectif'], actions: ['repondre', 'inscrire', 'transmettre'], autonomie: 'courts' };
export function evaluerComposantes(a) {
  const a_ = (cle, x) => a[cle].includes(x); const maxAbsents = EQUIPE_RH.length - RH.presents;
  const solde = EQUIPE_RH.map(([, s]) => s); const absents = Array.from({ length: RH.jours + 1 }, () => []);
  const mem = { solde: [...solde], absents: absents.map(() => 0) };
  const jours = (d) => Array.from({ length: d[2] }, (_, k) => d[1] + k);
  const inscrire = (d, connu) => { solde[d[0]] -= d[2]; jours(d).forEach((j) => absents[j].push(d[0])); if (connu) { mem.solde[d[0]] -= d[2]; jours(d).forEach((j) => { mem.absents[j] += 1; }); } };
  let soumises = 0; let longsSeuls = 0; let sansEffet = 0;
  const lignes = DEMANDES_RH.map((d) => {
    const att = solde[d[0]] < d[2] ? ['refuser', 'solde insuffisant'] : jours(d).some((j) => absents[j].length >= maxAbsents) ? ['refuser', 'moins de 3 présents'] : d[2] > RH.court ? ['soumettre', 'plus de 2 jours'] : ['accorder', 'solde et planning le permettent'];
    if (!a_('percoit', 'formulaire')) return { att, dec: 'aucune', note: 'demande non perçue', ok: false };
    let dec = 'accorder'; let note = ''; let effet = true;
    if (a_('regles', 'solde') && a_('tient', 'solde') && mem.solde[d[0]] < d[2]) [dec, note] = ['refuser', 'solde insuffisant'];
    else if (a_('regles', 'effectif') && a_('tient', 'planning') && jours(d).some((j) => mem.absents[j] >= maxAbsents)) [dec, note] = ['refuser', 'moins de 3 présents'];
    else if (a_('regles', 'collegue') && a_('tient', 'planning') && jours(d).some((j) => mem.absents[j] >= 1)) [dec, note] = ['refuser', 'un collègue déjà absent'];
    else if (a.autonomie === 'rien' || (a.autonomie === 'courts' && d[2] > RH.court)) dec = 'soumettre';
    if (dec === 'soumettre') {
      if (!a_('actions', 'transmettre')) { effet = false; note = 'aucune action pour transmettre, demande en attente'; }
      else { soumises++; if (att[0] === 'refuser') note = 'refusée par la responsable'; else { inscrire(d, a_('percoit', 'retours')); note = 'validée par la responsable'; } }
    } else {
      if (dec === 'accorder' && a_('actions', 'inscrire')) { inscrire(d, true); if (d[2] > RH.court) longsSeuls++; }
      else if (dec === 'accorder') { effet = false; sansEffet++; note = "rien n'est inscrit au planning"; }
      if (!a_('actions', 'repondre')) { effet = false; note = `${note ? `${note}, ` : ''}demandeur non prévenu`; }
    }
    return { att, dec, note, ok: effet && dec === att[0] };
  });
  const nb = lignes.filter((l) => l.ok).length; const sousEffectif = absents.map((x, j) => (x.length > maxAbsents ? j : 0)).filter(Boolean);
  const inapplicables = COMPOSANTES_RH[2][2].filter(([r]) => a_('regles', r) && !a_('tient', r === 'solde' ? 'solde' : 'planning')).map(([, nom]) => nom);
  const tests = { traitees: nb === DEMANDES_RH.length, longs: longsSeuls === 0, charge: soumises <= RH.maxSoumises, sobre: !a_('percoit', 'motif') };
  return { lignes, nb, soumises, longsSeuls, sansEffet, sousEffectif, inapplicables, absents, tests, ok: Object.values(tests).every(Boolean) };
}
const LIB_RH = { accorder: 'accordé', refuser: 'refusé', soumettre: 'soumis à la responsable', aucune: 'aucune décision' };
export function AtelierComposantes({ surReussite }) {
  const [a, setA] = useState({ percoit: ['formulaire'], tient: [], regles: [], actions: ['repondre'], autonomie: 'tout' });
  const [res, setRes] = useState(null);
  const sol = useSolution();
  const maj = (cle, v) => { setA({ ...a, [cle]: v }); setRes(null); };
  const verifier = () => { const r = evaluerComposantes(a); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const periode = (d) => (d[2] === 1 ? `J${d[1]}, 1 jour` : `J${d[1]} à J${d[1] + d[2] - 1}, ${d[2]} jours`);
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges de l'assistant de ressources humaines.</b>
        <ul>
          <li>Une équipe de 5 personnes, sur 10 jours ouvrés (J1 à J10). Soldes de départ : {EQUIPE_RH.map(([n, s]) => `${n} ${s} j`).join(', ')}.</li>
          <li>Un congé est refusé si le solde du demandeur ne le couvre pas, ou s'il laisse moins de {RH.presents} personnes présentes un jour donné.</li>
          <li>Les {DEMANDES_RH.length} demandes reçoivent la bonne décision, suivie d'effet : planning à jour, solde débité, demandeur prévenu.</li>
          <li>Un congé de plus de {RH.court} jours n'est inscrit qu'après validation de la responsable. Elle examine au plus {RH.maxSoumises} demandes sur la période.</li>
          <li>L'agent ne reçoit aucune donnée dont sa politique ne se sert pas.</li>
        </ul>
      </div>
      <p>Les demandes arrivent une à une. Quand une demande lui est soumise, la responsable décide juste et inscrit elle-même le congé qu'elle valide. La décision attendue est celle que les soldes et le planning réels imposent à l'arrivée de la demande.</p>
      <ol className="regles-edit">
        {COMPOSANTES_RH.map(([cle, titre, options]) => (
          <li key={cle} style={{ display: 'grid' }}><b>{titre}</b>
            {options.map(([c, nom]) => <label key={c}><input type="checkbox" style={{ width: 'auto' }} checked={a[cle].includes(c)} onChange={() => maj(cle, basculer(a[cle], c))} aria-label={nom} /> {nom}</label>)}
          </li>
        ))}
        <li><b>Ce qu'il exécute seul</b>
          <select style={{ flex: '1 1 0', minWidth: '9em', width: 0 }} value={a.autonomie} onChange={(e) => maj('autonomie', e.target.value)} aria-label="Ce qu'il exécute seul">{AUTONOMIES_RH.map(([c, nom]) => <option key={c} value={c}>{nom}</option>)}</select>
        </li>
      </ol>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Faire traiter les 12 demandes par mon agent</button>
        {sol.bouton(() => { setA(SOLUTION_COMPOSANTES); setRes(null); })}
      </div>
      <table className="tableau compact banc">
        <thead><tr><th>Demande</th><th>Demandeur et période</th>{res && <><th>Décision attendue</th><th>Votre agent</th></>}</tr></thead>
        <tbody>{DEMANDES_RH.map((d, i) => (
          <tr key={i}><td>{i + 1}</td><td>{EQUIPE_RH[d[0]][0]}, {periode(d)}</td>
            {res && <><td>{res.lignes[i].att[0]} ({res.lignes[i].att[1]})</td><td className={res.lignes[i].ok ? 'ok' : 'ko'}>{LIB_RH[res.lignes[i].dec]}{res.lignes[i].note ? ` (${res.lignes[i].note})` : ''} {res.lignes[i].ok ? '✓' : '✗'}</td></>}</tr>
        ))}</tbody>
      </table>
      {res && (
        <>
          <svg viewBox="0 0 520 132" role="img" aria-label="Planning réel après le traitement des demandes">
            {Array.from({ length: RH.jours }, (_, k) => <text key={k} x={92 + k * 43} y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill={res.sousEffectif.includes(k + 1) ? C.rouge : 'var(--texte-doux)'}>J{k + 1}</text>)}
            {EQUIPE_RH.map(([nom], p) => (
              <g key={nom}><text x="4" y={35 + p * 22} fontSize="11.5" fill="var(--texte)">{nom}</text>
                {Array.from({ length: RH.jours }, (_, k) => <rect key={k} x={72 + k * 43} y={21 + p * 22} width="40" height="19" rx="4" fill={res.absents[k + 1].includes(p) ? (res.sousEffectif.includes(k + 1) ? C.rouge : C.bleu) : 'var(--carte)'} stroke={C.gris} strokeWidth="1" />)}
              </g>
            ))}
          </svg>
          <p className="conseil">Planning réel après les 12 demandes. En bleu : congé inscrit. En rouge : jour où il reste moins de {RH.presents} présents.</p>
          <table className="tableau compact banc"><tbody>
            {verdict(res.tests.traitees, `Demandes bien traitées : ${res.nb} sur ${DEMANDES_RH.length}`)}
            {verdict(res.tests.longs, `Congés de plus de ${RH.court} jours inscrits sans validation : ${res.longsSeuls}`)}
            {verdict(res.tests.charge, `Demandes soumises à la responsable : ${res.soumises} (maximum ${RH.maxSoumises})`)}
            {verdict(res.tests.sobre, `Données reçues sans être utilisées : ${res.tests.sobre ? 'aucune' : 'le motif du congé'}`)}
          </tbody></table>
          <Bilan ok={res.ok}>{res.ok ? "Les 12 demandes sont bien traitées, et les congés longs passent par la responsable. Vous venez de spécifier un agent : ce qu'il perçoit, ce qu'il tient à jour, comment il décide, sur quoi il agit et ce qu'il fait seul. Retirez une seule de ces composantes, et il se trompe ou cesse d'agir." : [
            !a.percoit.includes('formulaire') && "L'agent ne perçoit aucune demande : il n'a rien à traiter. Par où les demandes lui arrivent-elles ?",
            res.sansEffet > 0 && `Votre agent répond « accordé » ${res.sansEffet} fois, mais rien ne change dans le planning ni dans les soldes : il répond sans agir, comme un chatbot. Sur quoi doit-il pouvoir agir ?`,
            res.sousEffectif.length > 0 && `Le jour J${res.sousEffectif[0]}, il reste moins de ${RH.presents} personnes présentes : l'agent a accordé un congé sans savoir qui était déjà absent. ${a.tient.includes('planning') && a.regles.includes('effectif') ? "Son planning ne contient que les congés qu'il a inscrits lui-même : comment apprend-il ceux que la responsable a validés ?" : "Tient-il à jour de quoi le savoir, et une règle s'en sert-elle ?"}`,
            res.longsSeuls > 0 && `${res.longsSeuls} congé(s) de plus de ${RH.court} jours ont été inscrits sans que la responsable les voie. Que peut-il exécuter seul, et que doit-il soumettre ?`,
            !res.tests.charge && `La responsable reçoit ${res.soumises} demandes pour ${RH.maxSoumises} possibles : l'agent ne décide presque plus rien. Quelles demandes peut-il traiter seul sans risque ?`,
            res.inapplicables.length > 0 && `La règle « ${res.inapplicables[0]} » lit une information que l'agent ne tient pas à jour : elle ne se déclenche jamais.`,
            res.lignes.some((l) => l.dec === 'refuser' && l.att[0] !== 'refuser') && `Votre agent refuse ${res.lignes.filter((l) => l.dec === 'refuser' && l.att[0] !== 'refuser').length} congé(s) que le cahier des charges permet : une de ses règles est plus sévère que l'exigence. Combien de personnes peuvent être absentes le même jour ?`,
            res.lignes.some((l) => l.note.includes('en attente')) && "Des demandes restent en attente : l'agent a choisi de les soumettre, mais aucune de ses actions ne le lui permet. Que lui manque-t-il pour passer la main ?",
            res.lignes.some((l) => l.note.includes('non prévenu')) && "Des décisions sont prises sans que le demandeur le sache. Quelle action clôt le traitement d'une demande ?",
            !res.tests.sobre && "L'agent reçoit le motif du congé, une donnée personnelle qu'aucune règle ne lit. Pourquoi la percevoir ?",
          ].filter(Boolean).slice(0, 2).join(' ') || "Pour chaque ligne en rouge, comparez les deux décisions : un accord à tort signale une règle ou une représentation manquante, un refus à tort une règle trop sévère."}</Bilan>
        </>
      )}
    </div>
  );
}

// ------------------------------------------------------------ Implémentation
// L'apprenant programme la fonction traiter(dossier) par cinq choix d'écriture. Le programme obtenu est affiché en Python
// et réellement exécuté sur six dossiers de test : on vérifie la décision rendue et ce que contient le journal.
// Un dossier de test porte les avis des trois agents, la décision attendue et ce que le journal doit permettre de retrouver.
export const CHOIX_IMPL = [
  ['routeur', "Dossier qu'aucune règle de routage ne reconnaît", [['erreur', 'lever une erreur'], ['hasard', 'choisir une file au hasard'], ['humain', "l'orienter vers la file humaine"]]],
  ['journal', 'Écriture dans le journal', [['fin', 'une ligne récapitulative, à la fin de la fonction'], ['etape', 'une ligne après chaque étape']]],
  ['panne', 'Agent qui lève une exception', [['remonter', "laisser l'exception remonter"], ['ignorer', 'ignorer cet agent et continuer avec les autres'], ['escalader', 'transmettre le dossier à un humain']]],
  ['desaccord', 'Avis en désaccord', [['majorite', "retenir l'avis majoritaire"], ['premier', "retenir l'avis du premier agent"], ['escalader', 'transmettre le dossier à un humain']]],
  ['moderation', 'Appel du modérateur', [['aucun', 'aucun appel'], ['avant', "avant l'arbitrage, sur les avis"], ['apres', "après l'arbitrage, sur la décision rédigée"]]],
];
export const SOLUTION_IMPLEMENTATION = { routeur: 'humain', journal: 'etape', panne: 'escalader', desaccord: 'escalader', moderation: 'apres' };
export const IMPL = { plafond: 5000, files: ['aides', 'paiements'], regles: [['aide', 'aides'], ['facture', 'paiements']], agents: ['regles', 'score', 'llm'] };
const TROIS = ['accepter', 'accepter', 'accepter'];
export const DOSSIERS_TEST = [
  { id: 'D1', nom: 'Dossier ordinaire', objet: "demande d'aide", montant: 1200, avis: TROIS, attendu: 'accepter', trace: ['file', 'avis', 'decision'] },
  { id: 'D2', nom: "Objet qu'aucune règle ne reconnaît", objet: 'proposition de partenariat', montant: 0, avis: TROIS, attendu: 'humain', trace: ['file', 'raison'] },
  { id: 'D3', nom: 'Désaccord entre les agents', objet: "demande d'aide", montant: 2400, avis: ['rejeter', 'accepter', 'accepter'], attendu: 'humain', trace: ['file', 'avis'] },
  { id: 'D4', nom: 'Réponse rédigée avec le compte bancaire du demandeur', objet: "demande d'aide", montant: 800, avis: TROIS, perso: true, attendu: 'accepter', trace: ['file', 'avis', 'controle'] },
  { id: 'D5', nom: "Agent de score en panne pendant l'évaluation", objet: 'facture à régler', montant: 600, avis: TROIS, panne: 1, attendu: 'humain', trace: ['file', 'panne'] },
  { id: 'D6', nom: 'Accord unanime sur un versement de 9 000 €', objet: "demande d'aide", montant: 9000, avis: TROIS, attendu: 'humain', trace: ['file', 'avis', 'controle'] },
];
const TRACES = { file: 'la file choisie', raison: 'la raison du routage', avis: 'les avis rendus', decision: "la décision de l'arbitre", controle: 'le contrôle du modérateur', panne: "l'agent en panne" };
export function executerTraiter(c, d) {
  const journal = []; const parEtape = c.journal === 'etape'; const noter = (etape, champs) => { if (parEtape) journal.push({ etape, ...champs }); };
  const escalader = (motif) => ({ decision: { statut: 'humain', motif }, journal });
  try {
    const regle = IMPL.regles.find(([mot]) => d.objet.includes(mot)); let file = regle && regle[1]; let raison = regle && `objet « ${regle[0]} »`;
    if (!regle && c.routeur === 'erreur') throw new Error('RegleInconnue');
    if (!regle) [file, raison] = c.routeur === 'hasard' ? [IMPL.files[Math.floor(alea(4130)() * IMPL.files.length)], 'tirage au hasard'] : ['humain', 'aucune règle reconnue'];
    noter('routage', { file, raison });
    if (file === 'humain') return escalader(raison);
    let avis = []; let controle;
    for (const [i, nom] of IMPL.agents.entries()) {
      if (d.panne !== i) { avis.push(d.avis[i]); continue; }
      if (c.panne === 'remonter') throw new Error(`PanneAgent (${nom})`);
      if (c.panne === 'escalader') { noter('avis', { panne: nom }); return escalader(`panne de l'agent ${nom}`); }
    }
    noter('avis', { avis: avis.join(', ') });
    const plafonner = (statut) => (statut === 'accepter' && d.montant > IMPL.plafond ? 'humain' : statut);
    if (c.moderation === 'avant') { controle = d.montant > IMPL.plafond ? 'plafond dépassé' : 'rien à signaler'; avis = avis.map(plafonner); noter('moderation', { avis: avis.join(', '), controle }); }
    if (new Set(avis).size > 1 && c.desaccord === 'escalader') { noter('arbitrage', { desaccord: 'oui' }); return escalader('désaccord'); }
    const majoritaire = [...avis].sort((x, y) => avis.filter((v) => v === y).length - avis.filter((v) => v === x).length)[0];
    let decision = { statut: c.desaccord === 'majorite' ? majoritaire : avis[0], fuite: !!d.perso };
    noter('arbitrage', { decision: decision.statut });
    if (c.moderation === 'apres') { controle = decision.statut !== plafonner(decision.statut) ? 'plafond dépassé' : d.perso ? 'compte bancaire masqué' : 'rien à signaler'; decision = { statut: plafonner(decision.statut), fuite: false, motif: controle === 'plafond dépassé' ? controle : undefined }; noter('moderation', { decision: decision.statut, controle }); }
    if (!parEtape) journal.push({ etape: 'fin', file, raison, avis: avis.join(', '), decision: decision.statut, controle });
    return { decision, journal };
  } catch (e) { return { exception: e.message, journal }; }
}
export function programmePython(c) {
  const J = c.journal === 'etape'; const L = ['def traiter(dossier):'];
  L.push({ erreur: '    file, raison = routeur.router(dossier)  # lève RegleInconnue si aucune règle ne répond', hasard: '    file, raison = routeur.router(dossier, defaut=random.choice(FILES))', humain: '    file, raison = routeur.router(dossier, defaut="humain")' }[c.routeur]);
  if (J) L.push('    journal.noter(etape="routage", file=file, raison=raison)');
  L.push('    if file == "humain":', '        return escalader(dossier, motif=raison)');
  if (c.panne === 'remonter') L.push('    avis = [agent.evaluer(dossier) for agent in agents[file]]');
  else L.push('    avis = []', '    for agent in agents[file]:', '        try:', '            avis.append(agent.evaluer(dossier))', '        except PanneAgent:', ...(c.panne === 'ignorer' ? ['            continue'] : [...(J ? ['            journal.noter(etape="avis", panne=agent.nom)'] : []), '            return escalader(dossier, motif="panne de " + agent.nom)']));
  if (J) L.push('    journal.noter(etape="avis", avis=avis)');
  if (c.moderation === 'avant') L.push('    avis = [moderateur.controler(dossier, a) for a in avis]', ...(J ? ['    journal.noter(etape="moderation", avis=avis)'] : []));
  if (c.desaccord === 'escalader') L.push('    if len(set(avis)) > 1:', ...(J ? ['        journal.noter(etape="arbitrage", desaccord=True)'] : []), '        return escalader(dossier, motif="désaccord")');
  L.push(`    decision = arbitre.rediger(dossier, ${c.desaccord === 'majorite' ? 'max(set(avis), key=avis.count)' : 'avis[0]'})`);
  if (J) L.push('    journal.noter(etape="arbitrage", decision=decision)');
  if (c.moderation === 'apres') L.push('    decision = moderateur.controler(dossier, decision)', ...(J ? ['    journal.noter(etape="moderation", decision=decision)'] : []));
  if (!J) L.push('    journal.noter(etape="fin", file=file, raison=raison, avis=avis, decision=decision)');
  return [...L, '    return decision'].join('\n');
}
export function evaluerImplementation(c) {
  const cas = DOSSIERS_TEST.map((d) => {
    const r = executerTraiter(c, d); const juste = !r.exception && r.decision.statut === d.attendu && !r.decision.fuite;
    const manque = d.trace.filter((k) => !r.journal.some((l) => l[k] !== undefined)).map((k) => TRACES[k]);
    return { d, ...r, juste, manque, ok: juste && manque.length === 0 };
  });
  return { cas, nb: cas.filter((x) => x.ok).length, ok: cas.every((x) => x.ok) };
}
const LIB_IMPL = { accepter: 'accepter', rejeter: 'rejeter', humain: 'transmettre à un humain' };
export function AtelierImplementation({ surReussite }) {
  const [c, setC] = useState({ routeur: 'erreur', journal: 'fin', panne: 'remonter', desaccord: 'majorite', moderation: 'aucun' });
  const [res, setRes] = useState(null);
  const sol = useSolution();
  const verifier = () => { const r = evaluerImplementation(c); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const cas = (id) => res.cas.find((x) => x.d.id === id);
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges de la fonction <code>traiter</code>.</b>
        <ul>
          <li>Tout dossier reçoit une décision : accepter, rejeter ou transmettre à un humain. La fonction ne s'arrête jamais sur une exception.</li>
          <li>Ce que le système ne sait pas traiter avec certitude est transmis à un humain, jamais décidé par défaut.</li>
          <li>Rien ne sort sans contrôle : aucun versement automatique au-dessus de {milliers(IMPL.plafond)} €, aucune donnée personnelle dans une réponse.</li>
          <li>Le journal permet de reconstituer chaque traitement, y compris un traitement interrompu : file choisie, raison, avis rendus, contrôle effectué, agent en panne.</li>
        </ul>
      </div>
      <p>Trois agents (règles, score, LLM) rendent chacun un avis. L'arbitre rédige ensuite la décision et la réponse au demandeur. Faites vos cinq choix : le programme se réécrit à mesure.</p>
      <ol className="regles-edit">
        {CHOIX_IMPL.map(([cle, nom, options]) => (
          <li key={cle}><b>{nom}</b>
            <select style={{ flex: '1 1 0', minWidth: '9em', width: 0 }} value={c[cle]} onChange={(e) => { setC({ ...c, [cle]: e.target.value }); setRes(null); }} aria-label={nom}>{options.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select>
          </li>
        ))}
      </ol>
      <pre data-testid="programme"><code>{programmePython(c)}</code></pre>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Exécuter ma fonction sur les 6 dossiers de test</button>
        {sol.bouton(() => { setC(SOLUTION_IMPLEMENTATION); setRes(null); })}
      </div>
      {res && (
        <>
          <table className="tableau compact banc">
            <thead><tr><th>Dossier de test</th><th>Décision attendue</th><th>Décision rendue</th><th>Journal écrit</th><th>Verdict</th></tr></thead>
            <tbody>{res.cas.map((x) => (
              <tr key={x.d.id}><td>{x.d.id}. {x.d.nom}</td><td>{LIB_IMPL[x.d.attendu]}</td>
                <td>{x.exception ? `aucune : exception ${x.exception}` : `${LIB_IMPL[x.decision.statut]}${x.decision.motif ? ` (${x.decision.motif})` : ''}${x.decision.fuite ? ', compte bancaire en clair dans la réponse' : ''}`}</td>
                <td>{x.journal.length ? x.journal.map((l, i) => <div key={i}>{l.etape} : {Object.entries(l).filter(([k, v]) => k !== 'etape' && v !== undefined).map(([k, v]) => `${k} = ${v}`).join(', ')}</div>) : 'vide'}</td>
                <td className={x.ok ? 'ok' : 'ko'}>{x.ok ? 'réussi ✓' : `${x.juste ? '' : 'décision ✗ '}${x.manque.length ? `journal ✗ : il manque ${x.manque.join(', ')}` : ''}`}</td></tr>
            ))}</tbody>
          </table>
          <Bilan ok={res.ok}>{res.ok ? "Les 6 dossiers de test passent : chaque dossier reçoit une décision, le doute remonte à un humain, rien ne sort sans contrôle et le journal dit où en était le traitement, même interrompu. Vous venez d'écrire la fonction centrale du système, celle du notebook 07." : `${res.nb} dossier(s) de test réussi(s) sur 6. ${[
            res.cas.some((x) => x.exception) && `Sur ${res.cas.filter((x) => x.exception).map((x) => x.d.id).join(' et ')}, la fonction s'arrête sur une exception : le dossier reste sans décision. Que doit devenir un dossier que le système ne sait pas traiter ?`,
            c.journal === 'fin' && cas('D5').journal.length === 0 && `Sur D5, l'agent de score tombe en panne et le journal est vide : il ne dit pas où le traitement s'est arrêté. La ligne récapitulative n'est écrite que si la fonction va jusqu'au bout. À quel moment écrire pour garder une trace quoi qu'il arrive ensuite ?`,
            !cas('D5').exception && !cas('D5').juste && "Sur D5, la décision est prise sur deux avis au lieu de trois, sans que personne le sache. Une panne est-elle un cas que le système sait traiter avec certitude ?",
            !cas('D2').exception && !cas('D2').juste && "Sur D2, une file tirée au hasard fait décider le dossier par des agents qui ne sont pas faits pour lui. Qui devrait le recevoir ?",
            !cas('D3').juste && "Sur D3, un désaccord est tranché d'office : deux avis sur trois ne font pas une certitude. Que demande le cahier des charges quand le système doute ?",
            cas('D4').decision && cas('D4').decision.fuite && `Sur D4, la réponse part avec le compte bancaire en clair. ${c.moderation === 'avant' ? "Le modérateur ne voit que les avis, alors que la réponse est rédigée par l'arbitre : à quel endroit peut-il la contrôler ?" : 'Quel composant contrôle ce qui sort du système ?'}`,
          ].filter(Boolean).slice(0, 2).join(' ') || 'Pour chaque ligne en rouge, la colonne « Verdict » nomme ce qui manque.'}`}</Bilan>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- Évaluation
// L'apprenant choisit, sous un budget, les instruments de mesure d'un système. Un mois de fonctionnement est simulé avec
// cinq défauts : chaque instrument choisi mesure réellement son indicateur, et un défaut est détecté si un objectif est manqué.
// Un instrument : [nom, coût en jours par mois, connaît-il la bonne réponse ?, mesure qui rend indicateur, valeur, objectif, objectif manqué ?, défaut].
export const EVAL = { budget: 16, n: 2000 };
export const DEFAUTS = [
  ['routage', 'Le routeur envoie des messages dans une file inadaptée, qui les traite sans les renvoyer'],
  ['accords', 'Deux agents apprennent sur les mêmes données : les trois avis concordent sur des décisions fausses'],
  ['strict', 'Le modérateur bloque des actions légitimes'],
  ['risque', 'Le modérateur laisse passer des actions à risque'],
  ['latence', "Les trois avis sont demandés l'un après l'autre : le traitement est trop lent"],
];
export const MOIS = (() => {
  const g = alea(4130); const tirer = (n, f) => Array.from({ length: n }, f);
  const router = () => { const u = g(); return u < 0.88 ? 'bonne' : u < 0.91 ? 'renvoi' : 'inadaptee'; };
  const moderer = (risque) => g() < (risque ? 0.7 : 0.05);
  const messages = tirer(EVAL.n, router);
  const dossiers = tirer(EVAL.n, () => { const commun = g() < 0.045; const faux = [0, 1, 2].map(() => commun || g() < 0.09); return { accord: faux[0] === faux[1] && faux[1] === faux[2], faux: faux[0], delai: 3 + 15 * g() ** 2 }; });
  const actions = tirer(EVAL.n, () => { const risque = g() < 0.04; return { risque, bloquee: moderer(risque) }; });
  const accords = dossiers.filter((d) => d.accord);
  return { messages, dossiers, actions, bancMessages: tirer(1000, router), bancRisque: tirer(100, () => moderer(true)), sondage: accords.filter((_, i) => i % Math.floor(accords.length / 200) === 0).slice(0, 200) };
})();
const taux = (liste, f) => liste.filter(f).length / liste.length; const pc = (t) => `${F(t * 100, 1)} %`;
export const INSTRUMENTS = {
  retours: ['Comptage des retours entre files', 1, false, (m) => { const t = taux(m.messages, (x) => x === 'renvoi'); return ['taux de retour', pc(t), 'moins de 10 %', t >= 0.1, 'routage']; }],
  desaccords: ['Comptage des désaccords entre agents', 1, false, (m) => ['désaccords détectés', `${m.dossiers.filter((d) => !d.accord).length} sur ${milliers(EVAL.n)} dossiers`, 'aucun objectif', false, 'accords']],
  blocages: ['Comptage des actions bloquées', 1, false, (m) => ['actions bloquées', `${m.actions.filter((x) => x.bloquee).length} sur ${milliers(EVAL.n)} actions`, 'aucun objectif', false, 'strict']],
  latence: ['Suivi du délai de traitement', 1, false, (m) => { const t = m.dossiers.reduce((s, d) => s + d.delai, 0) / m.dossiers.length; return ['délai moyen de traitement', `${F(t, 1)} s`, 'au plus 5 s', t > 5, 'latence']; }],
  satisfaction: ['Enquête de satisfaction auprès des équipes', 2, false, (m) => { const t = 10 * (1 - taux(m.messages, (x) => x === 'renvoi') - taux(m.actions, (x) => x.bloquee)); return ['note moyenne des équipes', `${F(t, 1)} sur 10`, 'au moins 7 sur 10', t < 7, 'routage']; }],
  bancRoutage: ['Banc de 1 000 messages étiquetés, rejoué par le routeur', 4, true, (m) => { const t = taux(m.bancMessages, (x) => x === 'bonne'); return ['taux de routage correct', pc(t), 'au moins 95 %', t < 0.95, 'routage']; }],
  sondage: ['Contrôle humain par sondage de 200 accords unanimes', 4, true, (m) => { const t = taux(m.sondage, (d) => d.faux); return ["taux d'accord trompeur", pc(t), 'moins de 2 %', t >= 0.02, 'accords']; }],
  revue: ['Revue humaine des actions bloquées', 3, true, (m) => { const b = m.actions.filter((x) => x.bloquee); const t = b.filter((x) => !x.risque).length / m.actions.filter((x) => !x.risque).length; return ['taux de faux positifs de blocage', `${pc(t)} (blocages justifiés : ${pc(taux(b, (x) => x.risque))})`, 'moins de 3 %', t >= 0.03, 'strict']; }],
  bancRisque: ['Banc de 100 actions à risque connues, rejoué par le modérateur', 3, true, (m) => { const t = taux(m.bancRisque, Boolean); return ['incidents évités', pc(t), 'au moins 90 %', t < 0.9, 'risque']; }],
};
export const SOLUTION_EVALUATION = ['latence', 'bancRoutage', 'sondage', 'revue', 'bancRisque'];
export function evaluerEvaluation(choisis) {
  const cles = Object.keys(INSTRUMENTS).filter((k) => choisis.includes(k));
  const cout = cles.reduce((s, k) => s + INSTRUMENTS[k][1], 0);
  const mesures = cles.map((k) => { const [indicateur, valeur, objectif, alerte, defaut] = INSTRUMENTS[k][3](MOIS); return { k, nom: INSTRUMENTS[k][0], indicateur, valeur, objectif, alerte, defaut }; });
  const defauts = DEFAUTS.map(([id, nom]) => ({ id, nom, par: mesures.find((x) => x.alerte && x.defaut === id) }));
  const nb = defauts.filter((d) => d.par).length; const aveugle = cles.length > 0 && cles.every((k) => !INSTRUMENTS[k][2]);
  const tests = { detection: nb === DEFAUTS.length, budget: cout <= EVAL.budget };
  return { cout, mesures, defauts, nb, aveugle, tests, ok: tests.detection && tests.budget };
}
export function AtelierEvaluation({ surReussite }) {
  const [choisis, setChoisis] = useState(['retours', 'desaccords', 'blocages']);
  const [res, setRes] = useState(null);
  const sol = useSolution();
  const cout = choisis.reduce((s, k) => s + INSTRUMENTS[k][1], 0);
  const verifier = () => { const r = evaluerEvaluation(choisis); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges du dispositif d'évaluation.</b>
        <ul>
          <li>Le système traite {milliers(EVAL.n)} messages, {milliers(EVAL.n)} dossiers et {milliers(EVAL.n)} actions par mois. Cinq défauts y ont été introduits : votre dispositif doit les révéler tous.</li>
          <li>Un défaut est révélé quand un de vos instruments mesure un indicateur qui manque son objectif.</li>
          <li>Budget : {EVAL.budget} jours de travail par mois pour l'ensemble des instruments.</li>
        </ul>
      </div>
      <p>Les trois premiers instruments sont déjà en place : le journal du système les fournit. Composez votre dispositif.</p>
      <ol className="regles-edit">
        {Object.entries(INSTRUMENTS).map(([k, [nom, prix]]) => (
          <li key={k}><label><input type="checkbox" style={{ width: 'auto' }} checked={choisis.includes(k)} onChange={() => { setChoisis(basculer(choisis, k)); setRes(null); }} aria-label={nom} /> {nom} <span className="conseil">({prix} jour{prix > 1 ? 's' : ''})</span></label></li>
        ))}
      </ol>
      <p className="conseil">Dispositif actuel : {cout} jour(s) sur {EVAL.budget}.</p>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Simuler un mois avec ce dispositif</button>
        {sol.bouton(() => { setChoisis(SOLUTION_EVALUATION); setRes(null); })}
      </div>
      {res && (
        <>
          <table className="tableau compact banc">
            <thead><tr><th>Votre instrument</th><th>Indicateur mesuré sur le mois</th><th>Objectif</th><th>Lecture</th></tr></thead>
            <tbody>{res.mesures.map((x) => <tr key={x.k}><td>{x.nom}</td><td>{x.indicateur} : {x.valeur}</td><td style={{ whiteSpace: 'nowrap' }}>{x.objectif}</td><td style={{ whiteSpace: 'nowrap' }}>{x.alerte ? 'objectif manqué' : 'rien à signaler'}</td></tr>)}</tbody>
          </table>
          <table className="tableau compact banc">
            <thead><tr><th>Défaut introduit dans le mois</th><th>Votre dispositif le révèle-t-il ?</th></tr></thead>
            <tbody>
              {res.defauts.map((d) => <tr key={d.id}><td>{d.nom}</td><td className={d.par ? 'ok' : 'ko'}>{d.par ? `oui ✓ : ${d.par.indicateur}, ${d.par.valeur}` : 'non ✗ : aucun de vos indicateurs ne manque son objectif'}</td></tr>)}
              <tr><td>Coût du dispositif : {res.cout} jours par mois (budget {EVAL.budget})</td><td className={res.tests.budget ? 'ok' : 'ko'}>{res.tests.budget ? 'tenu ✓' : 'dépassé ✗'}</td></tr>
            </tbody>
          </table>
          <Bilan ok={res.ok}>{res.ok ? `Les 5 défauts sont révélés pour ${res.cout} jours par mois. Vous venez de monter un dispositif d'évaluation : à chaque composant ses indicateurs, et pour chaque erreur qui ne laisse pas de trace, un banc de cas connus ou un contrôle humain par sondage.` : [
            `${res.nb} défaut(s) révélé(s) sur ${DEFAUTS.length}.`,
            res.aveugle && "Votre dispositif ne compte que ce que le système laisse voir : retours, désaccords, blocages, délais. Un accord faux, un message traité au mauvais endroit, une action à risque qui passe ne laissent aucune trace dans le journal. Qui connaît la bonne réponse pour ces cas-là ?",
            !res.aveugle && !res.tests.detection && "Pour chaque ligne en rouge, demandez-vous quel composant est en cause, quel indicateur de la leçon le juge, et qui peut fournir la bonne réponse : un banc de cas connus, ou un humain qui recontrôle un échantillon.",
            !res.tests.budget && `Le dispositif coûte ${res.cout} jours pour ${EVAL.budget} disponibles. Dans le premier tableau, quels instruments n'ont rien à signaler alors que leur composant porte un défaut ?`,
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

// --------------------------------------------------------------- Cas d'usage
// Synthèse du module : l'apprenant arrête cinq décisions de conception. Le système en calcule les conséquences sur
// 1 000 dossiers par jour avec les formules du module : fiabilité d'une chaîne, erreur d'un vote, coût espéré.
export const CAS = { erreur: 60, validation: 3, avis: 0.8, controle: 300, masquage: 20, fuites: 20, rattrape: 0.9, sansLlm: 0.8, maxErreurs: 26, maxCharge: 150, maxCout: 3650 };
export const CLASSES_CAS = [['Ordinaires, pièces nettes', 650, 0.01, false], ['Ordinaires, pièces ambiguës', 100, 0.07, false], ['À risque élevé', 250, 0.1, true]];
export const CHAINE_CAS = [['Extraction', 0.95], ['Enrichissement', 0.997], ['Validation', 0.999], ['Scoring', 0.98]];
export const OPTIONS_CAS = {
  avis: [['aucun', 'un seul avis pour tous les dossiers'], ['risque', 'trois avis et un vote pour les dossiers à risque élevé'], ['tous', 'trois avis et un vote pour tous les dossiers']],
  llm: [['decision', 'il lit le courrier, extrait les champs et rend la décision'], ['interface', 'il lit le courrier, extrait les champs et explique la décision prise par les règles et le score'], ['aucun', "aucun : l'extraction est confiée à des règles"]],
  moderation: [['rien', 'rien'], ['perso', 'les données personnelles de chaque réponse, masquées automatiquement'], ['relecture', 'chaque réponse, relue par un humain avant envoi']],
};
export const SOLUTION_CASUSAGE = { avis: 'risque', controles: [true, false, false, true], seuil: 95, llm: 'interface', moderation: 'perso' };
export const vote = (e) => 3 * e * e * (1 - e) + e ** 3;
export function evaluerCasusage(c) {
  const fiabilite = (ct) => CHAINE_CAS.reduce((p, [, q], i) => { const seul = i === 0 && c.llm === 'aucun' ? CAS.sansLlm : q; return p * (ct[i] ? seul + (1 - seul) * CAS.rattrape : seul); }, 1);
  const fiab = fiabilite(c.controles); const errPrep = 1000 * (1 - fiab);
  const gains = c.controles.map((x, i) => (x ? 1000 * (fiab - fiabilite(c.controles.map((y, k) => (k === i ? false : y)))) : 0));
  const classes = CLASSES_CAS.map(([nom, n, e, risque]) => { const nAvis = c.avis === 'tous' || (c.avis === 'risque' && risque) ? 3 : 1; const err = nAvis === 3 ? vote(e) : e; const auto = 1 - err >= c.seuil / 100 - 1e-9; return { nom, n, e, nAvis, err, auto, erreurs: auto ? n * err : 0, validations: auto ? 0 : n }; });
  const somme = (f) => classes.reduce((s, x) => s + f(x), 0);
  const traitements = somme((x) => x.n * x.nAvis); const errDec = somme((x) => x.erreurs); const erreurs = errPrep + errDec;
  const validations = somme((x) => x.validations) + (c.moderation === 'relecture' ? 1000 : 0); const nbControles = c.controles.filter(Boolean).length;
  const cout = traitements * CAS.avis + nbControles * CAS.controle + validations * CAS.validation + erreurs * CAS.erreur + (c.moderation === 'perso' ? CAS.masquage : 0);
  const fuites = c.moderation === 'rien' ? CAS.fuites : 0;
  const tests = { erreurs: erreurs <= CAS.maxErreurs, charge: validations <= CAS.maxCharge, cout: cout <= CAS.maxCout, fuites: fuites === 0, justif: c.llm !== 'decision' };
  return { fiab, errPrep, gains, classes, traitements, errDec, erreurs, validations, nbControles, cout, fuites, tests, ok: Object.values(tests).every(Boolean) };
}
export function AtelierCasusage({ surReussite }) {
  const [c, setC] = useState({ avis: 'aucun', controles: [false, false, false, false], seuil: 80, llm: 'decision', moderation: 'rien' });
  const [res, setRes] = useState(null);
  const sol = useSolution();
  const maj = (cle, v) => { setC({ ...c, [cle]: v }); setRes(null); };
  const verifier = () => { const r = evaluerCasusage(c); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const choix = (cle, nom) => <li key={cle}><b>{nom}</b><select style={{ flex: '1 1 0', minWidth: '9em', width: 0 }} value={c[cle]} onChange={(e) => maj(cle, e.target.value)} aria-label={nom}>{OPTIONS_CAS[cle].map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></li>;
  const inutile = res ? res.gains.findIndex((g, i) => c.controles[i] && g * CAS.erreur < CAS.controle) : -1;
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges du système de traitement de dossiers.</b>
        <ul>
          <li>Au plus {CAS.maxErreurs} dossiers exécutés avec une erreur, par jour.</li>
          <li>Au plus {CAS.maxCharge} validations humaines par jour : l'équipe ne peut pas en absorber davantage.</li>
          <li>Au plus {milliers(CAS.maxCout)} € par jour, tout compris : avis, contrôles, validations, erreurs.</li>
          <li>Aucune donnée personnelle dans une réponse envoyée.</li>
          <li>Chaque décision se justifie par les règles déclenchées et le score calculé.</li>
        </ul>
      </div>
      <table className="tableau compact donnees"><tbody>
        <tr><th>Volume</th><td>1 000 dossiers par jour : {CLASSES_CAS.map(([nom, n, e]) => `${n} ${nom.toLowerCase()} (un agent seul s'y trompe dans ${F(e * 100, 0)} % des cas)`).join(', ')}</td></tr>
        <tr><th>Préparation</th><td>quatre étapes avant la décision : {CHAINE_CAS.map(([nom, p]) => `${nom.toLowerCase()} fiable à ${F(p * 100, 1)} %`).join(', ')}. Sans LLM, l'extraction tombe à {F(CAS.sansLlm * 100, 0)} %. Un contrôle après une étape rattrape 9 de ses erreurs sur 10.</td></tr>
        <tr><th>Décision</th><td>la confiance d'une décision vaut 1 moins son taux d'erreur. Trois agents indépendants votent à la majorité. Sous le seuil de confiance, un humain valide et corrige la décision. Une erreur de préparation lui échappe.</td></tr>
        <tr><th>Coûts</th><td>un avis : {F(CAS.avis, 2)} €. Un contrôle : {CAS.controle} € par jour. Une validation humaine : {CAS.validation} €. Une erreur exécutée : {CAS.erreur} €. Le masquage automatique : {CAS.masquage} € par jour. Sans modération, {CAS.fuites} réponses par jour citent une donnée personnelle.</td></tr>
      </tbody></table>
      <ol className="regles-edit">
        {choix('avis', 'Diffusion du risque')}
        <li><b>Contrôles de la chaîne, après</b>{CHAINE_CAS.map(([nom], i) => <label key={nom}><input type="checkbox" style={{ width: 'auto' }} checked={c.controles[i]} onChange={(e) => maj('controles', c.controles.map((x, k) => (k === i ? e.target.checked : x)))} aria-label={`Contrôle après ${nom}`} /> {nom}</label>)}</li>
        {choix('llm', 'Rôle du LLM')}
        {choix('moderation', 'La modération contrôle en sortie')}
      </ol>
      <label className="curseur">Seuil de confiance = <b>{c.seuil} %</b><input type="range" min="80" max="99" step="1" value={c.seuil} onChange={(e) => maj('seuil', Number(e.target.value))} aria-label="Seuil de confiance" /></label>
      <p className="conseil">À partir de ce seuil, le système exécute seul. En dessous, un humain valide.</p>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Chiffrer ma conception sur 1 000 dossiers</button>
        {sol.bouton(() => { setC(SOLUTION_CASUSAGE); setRes(null); })}
      </div>
      {res && (
        <>
          <table className="tableau compact banc">
            <thead><tr><th>Dossiers</th><th>Avis</th><th>Erreur de la décision</th><th>Régime</th><th>Erreurs exécutées</th></tr></thead>
            <tbody>{res.classes.map((x) => <tr key={x.nom}><td>{x.n} {x.nom.toLowerCase()}</td><td>{x.nAvis}</td><td>{x.nAvis === 3 ? `3 × ${F(x.e, 2)}² × ${F(1 - x.e, 2)} + ${F(x.e, 2)}³ = ${F(x.err * 100, 2)} %` : `${F(x.err * 100, 0)} %`}, confiance {F((1 - x.err) * 100, 1)} %</td><td>{x.auto ? 'exécution automatique' : 'validation humaine'}</td><td>{F(x.erreurs, 1)}</td></tr>)}</tbody>
          </table>
          <table className="tableau compact banc"><tbody>
            {verdict(res.tests.erreurs, `Erreurs exécutées par jour : préparation 1 000 × (1 - ${F(res.fiab, 3)}) = ${F(res.errPrep, 1)}, décision ${F(res.errDec, 1)}, total ${F(res.erreurs, 1)} (maximum ${CAS.maxErreurs})`)}
            {verdict(res.tests.charge, `Charge humaine : ${milliers(res.validations)} validations par jour (maximum ${CAS.maxCharge})`)}
            {verdict(res.tests.cout, `Coût : ${milliers(res.traitements)} avis × ${F(CAS.avis, 2)} € + ${res.nbControles} contrôle(s) × ${CAS.controle} € + ${milliers(res.validations)} validations × ${CAS.validation} € + ${F(res.erreurs, 1)} erreurs × ${CAS.erreur} €${c.moderation === 'perso' ? ` + ${CAS.masquage} €` : ''} = ${milliers(res.cout)} € par jour (maximum ${milliers(CAS.maxCout)})`)}
            {verdict(res.tests.fuites, `Non-divulgation : ${res.fuites} réponse(s) par jour avec une donnée personnelle`)}
            {verdict(res.tests.justif, `Décisions justifiables par des règles et un score : ${res.tests.justif ? 'oui' : 'non'}`)}
          </tbody></table>
          <Bilan ok={res.ok}>{res.ok ? `Les cinq exigences sont tenues : ${F(res.erreurs, 1)} erreurs, ${res.validations} validations et ${milliers(res.cout)} € par jour. Vous venez de concevoir un système complet : la chaîne contrôlée là où elle perd des dossiers, le vote réservé aux dossiers à risque, l'humain sous le seuil que le coût d'une erreur justifie, le LLM en interface, le modérateur en sortie.` : [
            !res.tests.justif && "Le LLM rend la décision : ni règle ni score ne permettent de la justifier devant un usager. Où son aptitude au langage est-elle utile sans engager le service ?",
            !res.tests.fuites && `${res.fuites} réponses par jour partent avec une donnée personnelle. Quel composant décide de ce que le système a le droit d'envoyer ?`,
            !res.tests.cout && c.avis === 'tous' && `Trois avis sur tous les dossiers : ${milliers(res.traitements)} avis par jour. Sur les 650 dossiers nets, combien d'erreurs ce vote évite-t-il, et à quel prix ?`,
            !res.tests.charge && (c.moderation === 'relecture' ? "Relire chaque réponse ajoute 1 000 validations par jour. Un contrôle automatique suffirait-il à tenir l'exigence visée ?" : `${res.validations} validations par jour saturent l'équipe. Quels dossiers peuvent gagner en confiance autrement que par un humain, et le seuil est-il plus haut que le coût d'une erreur ne le demande ?`),
            !res.tests.erreurs && c.llm === 'aucun' && `Sans LLM, l'extraction du texte libre tombe à ${F(CAS.sansLlm * 100, 0)} % : c'est l'étape qui perd le plus de dossiers. Qui sait lire un texte libre, et que peut-on lui confier sans engager le service ?`,
            !res.tests.erreurs && c.llm !== 'aucun' && (res.errPrep > res.errDec ? `La préparation perd ${F(res.errPrep, 1)} dossiers par jour : les fiabilités se multiplient. Quelles étapes en perdent le plus, et un contrôle y coûte-t-il moins que les erreurs qu'il évite ?` : `${F(res.errDec, 1)} erreurs de décision sont exécutées sans regard humain. Exécuter seul coûte p × ${CAS.erreur} €, valider coûte ${CAS.validation} € : pour quelles confiances l'exécution automatique reste-t-elle la moins chère ?`),
            !res.tests.cout && inutile >= 0 && `Le contrôle après « ${CHAINE_CAS[inutile][0]} » évite ${F(res.gains[inutile], 1)} erreur(s) par jour, soit ${milliers(res.gains[inutile] * CAS.erreur)} €, pour ${CAS.controle} €. Est-il placé là où la chaîne perd des dossiers ?`,
          ].filter(Boolean).slice(0, 3).join(' ') || `Le coût dépasse ${milliers(CAS.maxCout)} € : comparez, poste par poste, ce que chaque décision coûte et ce qu'elle évite.`}</Bilan>
        </>
      )}
    </div>
  );
}

export const ATELIERS_CONCEPTION_M7 = { conception_composantes: AtelierComposantes, conception_implementation: AtelierImplementation, conception_evaluation: AtelierEvaluation, conception_casusage: AtelierCasusage };
