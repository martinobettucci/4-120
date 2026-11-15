// Ateliers de conception des modules 3, 4 et 5. L'apprenant y configure une recherche A*, programme
// l'arbitrage d'un agent hybride, écrit la fonction de coût d'une tournée et aménage un couloir pour
// un filtre bayésien. Chaque construction est réellement exécutée, puis confrontée à un cahier des charges.
import { useState } from 'react';
import { F, C, Bilan } from './Ateliers.jsx';
import { useSolution } from './Solution.jsx';

const cle = (c) => `${c[0]},${c[1]}`;
const VOISINS = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const manhattan = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
const ligne = (ok, texte) => <tr><td>{texte}</td><td className={ok ? 'ok' : 'ko'}>{ok ? 'tenue ✓' : 'non tenue ✗'}</td></tr>;

// A* sur une grille : h estime le reste du trajet, departage ordonne les cases de même score f = g + h.
// Retourne le chemin et les cases examinées, dans l'ordre où elles sortent de la file.
export function aEtoile(libre, depart, but, h, departage = 'h') {
  const g = { [cle(depart)]: 0 }; const parent = {}; const ferme = new Set(); const explorees = []; let n = 0;
  const ouverts = [{ c: depart, g: 0, h: h(depart), n }];
  const avant = (a, b) => {
    if (Math.abs(a.g + a.h - b.g - b.h) > 1e-9) return a.g + a.h < b.g + b.h;
    if (departage === 'h' && a.h !== b.h) return a.h < b.h;
    if (departage === 'g' && a.g !== b.g) return a.g < b.g;
    return departage === 'h' || departage === 'recent' ? a.n > b.n : a.n < b.n;
  };
  while (ouverts.length) {
    let k = 0; for (let i = 1; i < ouverts.length; i++) if (avant(ouverts[i], ouverts[k])) k = i;
    const x = ouverts.splice(k, 1)[0];
    if (ferme.has(cle(x.c))) continue;
    ferme.add(cle(x.c)); explorees.push(x.c);
    if (cle(x.c) === cle(but)) { const chemin = [x.c]; while (parent[cle(chemin[0])]) chemin.unshift(parent[cle(chemin[0])]); return { chemin, explorees }; }
    for (const [dx, dy] of VOISINS) {
      const v = [x.c[0] + dx, x.c[1] + dy];
      if (!libre(v) || ferme.has(cle(v)) || x.g + 1 >= (g[cle(v)] ?? Infinity)) continue;
      g[cle(v)] = x.g + 1; parent[cle(v)] = x.c; ouverts.push({ c: v, g: x.g + 1, h: h(v), n: ++n });
    }
  }
  return { chemin: null, explorees };
}

// ---------------------------------------------------------------------- A*
// Configurer la recherche : heuristique, facteur multiplicateur, départage des scores égaux.
// L'entrepôt oppose une allée haute dégagée (le plus court) à une chicane qui semble aller droit au but.
export const ENTREPOT = ['.....................', '.....................', '..###########........', '....#...#...#........', '......#...#..........', '..###########........', '.....................', '..###########........'];
export const TRAJET = { depart: [1, 3], but: [19, 3], plafond: 45 };
const libreEntrepot = ([x, y]) => y >= 0 && y < ENTREPOT.length && x >= 0 && x < ENTREPOT[0].length && ENTREPOT[y][x] !== '#';
export const HEURISTIQUES = {
  nulle: ['aucune estimation : h = 0', () => 0], colonnes: ["l'écart de colonnes seul", (c) => Math.abs(c[0] - TRAJET.but[0])],
  oiseau: ["la distance à vol d'oiseau", (c) => Math.hypot(c[0] - TRAJET.but[0], c[1] - TRAJET.but[1])], manhattan: ['la distance de Manhattan', (c) => manhattan(c, TRAJET.but)],
};
export const DEPARTAGES = { ancien: 'la case ouverte depuis le plus longtemps', recent: 'la case ouverte en dernier', g: 'la case la plus proche du départ', h: "la case la plus proche de l'objectif" };
// Distance réelle de chaque case libre à l'objectif, par un parcours en largeur : la référence des mesures.
const REELLE = (() => { const d = { [cle(TRAJET.but)]: 0 }; const file = [TRAJET.but]; while (file.length) { const c = file.shift(); for (const [dx, dy] of VOISINS) { const v = [c[0] + dx, c[1] + dy]; if (libreEntrepot(v) && d[cle(v)] === undefined) { d[cle(v)] = d[cle(c)] + 1; file.push(v); } } } return d; })();
export function evaluerAstar({ h, facteur, departage }) {
  const estimer = (c) => facteur * HEURISTIQUES[h][1](c);
  const r = aEtoile(libreEntrepot, TRAJET.depart, TRAJET.but, estimer, departage);
  const cases = Object.keys(REELLE).map((k) => k.split(',').map(Number)).filter((c) => REELLE[cle(c)] > 0);
  const surestimees = cases.filter((c) => estimer(c) > REELLE[cle(c)] + 1e-9).length;
  const fidelite = cases.reduce((s, c) => s + estimer(c) / REELLE[cle(c)], 0) / cases.length;
  const longueur = r.chemin.length - 1; const optimum = REELLE[cle(TRAJET.depart)];
  const tests = { court: longueur === optimum, garanti: surestimees === 0, sobre: r.explorees.length <= TRAJET.plafond };
  return { ...r, longueur, optimum, surestimees, fidelite, libres: cases.length + 1, tests, ok: tests.court && tests.garanti && tests.sobre };
}
export const SOLUTION_ASTAR = { h: 'manhattan', facteur: 1, departage: 'h' };
export function AtelierAstar({ surReussite }) {
  const [c, setC] = useState({ h: 'nulle', facteur: 1, departage: 'ancien' }); const [res, setRes] = useState(null);
  const sol = useSolution();
  const maj = (champ, v) => { setC({ ...c, [champ]: v }); setRes(null); };
  const verifier = () => { const r = evaluerAstar(c); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const t = 24; const vues = new Set(res ? res.explorees.map(cle) : []); const centre = ([x, y]) => `${x * t + t / 2},${y * t + t / 2}`;
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges de la recherche de chemin.</b>
        <ul><li>Le chemin rendu est le plus court possible.</li><li>Ce résultat est garanti, dans cet entrepôt comme dans un autre : sur aucune case l'estimation ne dépasse la distance réelle.</li><li>La recherche examine au plus {TRAJET.plafond} cases : le robot attend son plan avant de partir.</li></ul>
      </div>
      <p>A* sort de sa file la case de plus petit score f = g + h. g compte les pas déjà faits, h estime ceux qui restent. Choisissez l'estimation, le facteur qui la multiplie, et la règle qui départage les cases de même score. Le robot (rond bleu) doit rejoindre le poste d'emballage (carré vert).</p>
      <ol className="regles-edit">
        <li><b>Heuristique</b> h estime le reste du trajet par
          <select value={c.h} onChange={(e) => maj('h', e.target.value)} aria-label="Heuristique">{Object.entries(HEURISTIQUES).map(([k, [nom]]) => <option key={k} value={k}>{nom}</option>)}</select>
        </li>
        <li><b>Départage</b> à score égal, sortir d'abord
          <select value={c.departage} onChange={(e) => maj('departage', e.target.value)} aria-label="Départage">{Object.entries(DEPARTAGES).map(([k, nom]) => <option key={k} value={k}>{nom}</option>)}</select>
        </li>
      </ol>
      <label className="curseur">Facteur = <b>{F(c.facteur, 1)}</b><input type="range" min="0.5" max="3" step="0.5" value={c.facteur} onChange={(e) => maj('facteur', Number(e.target.value))} aria-label="Facteur" /></label>
      <p className="conseil">Score utilisé par votre recherche : f = g + {F(c.facteur, 1)} × h, où h est {HEURISTIQUES[c.h][0]}.</p>
      <svg viewBox={`0 0 ${ENTREPOT[0].length * t} ${ENTREPOT.length * t + 20}`} role="img" aria-label="Entrepôt, cases examinées et chemin trouvé">
        {ENTREPOT.map((l, y) => [...l].map((ch, x) => <rect key={cle([x, y])} x={x * t + 1} y={y * t + 1} width={t - 2} height={t - 2} rx="3" fill={ch === '#' ? 'var(--plan-mur)' : vues.has(cle([x, y])) ? C.jaune : 'var(--plan-sol)'} />))}
        {res && <polyline points={res.chemin.map(centre).join(' ')} fill="none" stroke={C.vert} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
        <rect x={TRAJET.but[0] * t + 5} y={TRAJET.but[1] * t + 5} width={t - 10} height={t - 10} rx="3" fill={C.vert} />
        <circle cx={TRAJET.depart[0] * t + t / 2} cy={TRAJET.depart[1] * t + t / 2} r="8" fill={C.bleu} stroke="#fff" strokeWidth="2" />
        <text x="2" y={ENTREPOT.length * t + 15} fontSize="11" fill="var(--texte-doux)"><tspan fill={C.jaune} fontWeight="700">■</tspan> case examinée  <tspan fill={C.vert} fontWeight="700">▬</tspan> chemin rendu  ■ rayonnage</text>
      </svg>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Lancer A* avec ces réglages</button>
        {sol.bouton(() => { setC(SOLUTION_ASTAR); setRes(null); })}
      </div>
      {res && (
        <>
          <table className="tableau compact banc"><tbody>
            {ligne(res.tests.court, `Chemin rendu : ${res.longueur} pas (le plus court possible : ${res.optimum} pas)`)}
            {ligne(res.tests.garanti, `Garantie : l'estimation dépasse la distance réelle sur ${res.surestimees} case(s) sur ${res.libres}`)}
            {ligne(res.tests.sobre, `Exploration : ${res.explorees.length} cases examinées sur ${res.libres} (plafond : ${TRAJET.plafond})`)}
          </tbody></table>
          <Bilan ok={res.ok} solution="astar">{res.ok ? `Le plus court chemin, garanti, en ${res.explorees.length} cases examinées. Vous avez configuré la recherche : une estimation aussi proche que possible de la distance réelle sans jamais la dépasser, et un départage qui pousse vers l'objectif.` : !res.tests.garanti ? `${res.tests.court ? 'Le chemin est le plus court ici, mais rien ne le garantit ailleurs.' : `La recherche est rapide, mais elle rend ${res.longueur} pas quand ${res.optimum} suffisent : elle s'est engouffrée dans la chicane.`} Sur ${res.surestimees} cases, l'estimation dépasse la distance réelle : les cases de l'allée haute paraissent alors plus coûteuses qu'elles ne le sont, et A* conclut avant de les examiner. Jusqu'où une estimation peut-elle monter sans faire perdre la garantie ?` : c.h === 'nulle' ? "Sans estimation, tous les scores se réduisent au nombre de pas déjà faits : A* avance dans toutes les directions à la fois, comme l'algorithme de Dijkstra. Que sait le robot de l'objectif, qui permettrait d'orienter la recherche ?" : res.fidelite < 0.9 ? `Le chemin est le plus court, mais l'estimation vaut en moyenne ${F(res.fidelite * 100, 0)} % de la distance réelle : trop prudente, elle distingue mal les cases prometteuses des autres. Laquelle des estimations compte les déplacements comme le robot les fait, case par case, sans jamais dépasser le trajet réel ?` : "L'estimation est la bonne. Ce sont les ex æquo qui coûtent : beaucoup de cases ont le même score, et votre règle les sort de la file dans un ordre qui disperse la recherche. Entre deux cases de même score, laquelle a le plus de chances de conclure ?"}</Bilan>
        </>
      )}
    </div>
  );
}

// ----------------------------------------------------------------- Hybride
// Programmer l'arbitrage : priorité, distance de garde, conduite après un blocage, mémoire de l'obstacle.
// L'agent obtenu (A* et garde réactive) est exécuté pas à pas dans trois scénarios que sa carte ignore.
export const ALLEES = ['...........', '.##.#####..', '...........', '.##.#####..', '...........'];
export const MISSION = { depart: [0, 2], but: [10, 2], limite: 60, oubli: 3 };
export const SCENARIOS_HYBRIDE = [
  { nom: 'Palette imprévue', detail: ["Une palette est tombée à l'entrée de l'allée.", 'Elle y reste. La carte ne la connaît pas.'], obstacle: [4, 2], de: 0, a: Infinity, max: 18 },
  { nom: 'Chariot qui traverse', detail: ['Un chariot coupe la route du robot', "pendant 2 pas, puis s'en va."], obstacle: [3, 2], de: 2, a: 3, max: 14 },
  { nom: 'Cul-de-sac', detail: ["Le fond de l'allée est condamné.", "La carte l'indique encore ouvert."], obstacle: [8, 2], de: 0, a: Infinity, max: 26 },
];
const murAllees = ([x, y]) => y < 0 || y >= ALLEES.length || x < 0 || x >= ALLEES[0].length || ALLEES[y][x] === '#';
export function executerAgent(sc, { priorite, seuil, apres, patience, memoire }) {
  const connus = new Map(); const occupe = (c, t) => murAllees(c) || (cle(c) === cle(sc.obstacle) && t >= sc.de && t <= sc.a);
  const planifier = (p) => aEtoile((c) => !murAllees(c) && !connus.has(cle(c)), p, MISSION.but, (c) => manhattan(c, MISSION.but)).chemin;
  const lidar = (p, cible, t) => { const d = [cible[0] - p[0], cible[1] - p[1]]; let n = 1; while (!occupe([p[0] + d[0] * n, p[1] + d[1] * n], t)) n++; return { n, vu: [p[0] + d[0] * n, p[1] + d[1] * n] }; };
  let pos = MISSION.depart; let plan = planifier(pos); let attente = 0; const trace = [pos];
  for (let t = 0; t < MISSION.limite && plan; t++) {
    if (memoire === 'court') { const avant = connus.size; for (const [k, t0] of connus) if (t - t0 >= MISSION.oubli) connus.delete(k); if (connus.size < avant) plan = planifier(pos); }
    let cible = plan[plan.findIndex((c) => cle(c) === cle(pos)) + 1]; let mesure = lidar(pos, cible, t);
    if (mesure.n <= seuil && priorite === 'garde') {
      if (apres === 'attendre' || (apres === 'patience' && attente < patience)) { attente++; trace.push(pos); continue; }
      attente = 0; if (memoire !== 'non' && !murAllees(mesure.vu)) connus.set(cle(mesure.vu), t);
      plan = planifier(pos); if (!plan) break;
      cible = plan[1]; mesure = lidar(pos, cible, t);
      if (mesure.n <= seuil) { trace.push(pos); continue; }
    } else attente = 0;
    if (occupe(cible, t)) return { issue: 'collision', trace: [...trace, cible], pas: t + 1 };
    pos = cible; trace.push(pos);
    if (cle(pos) === cle(MISSION.but)) return { issue: 'arrivee', trace, pas: t + 1 };
  }
  return { issue: 'blocage', trace, pas: MISSION.limite };
}
export function evaluerHybride(c) {
  const cas = SCENARIOS_HYBRIDE.map((sc) => { const r = executerAgent(sc, c); return { ...r, ok: r.issue === 'arrivee' && r.pas <= sc.max }; });
  return { cas, ok: cas.every((x) => x.ok) };
}
export const SOLUTION_HYBRIDE = { priorite: 'garde', seuil: 1, apres: 'patience', patience: 2, memoire: 'oui' };
const PRIORITES = { plan: "au plan : l'action prévue est exécutée", carte: "à la carte : le mouvement n'est bloqué que si elle note la case occupée", garde: 'à la garde réactive : le mouvement est bloqué' };
const APRES = { attendre: 'attendre que la voie se libère', replanifier: 'replanifier aussitôt', patience: 'attendre un peu, puis replanifier si la voie reste fermée' };
const MEMOIRES = { non: 'ne rien noter sur la carte', court: `noter l'obstacle, puis l'oublier après ${MISSION.oubli} pas`, oui: "noter l'obstacle jusqu'à la fin de la mission" };
export function programmeHybride({ priorite, seuil, apres, patience, memoire }) {
  const l = ['def decider(observation):', '    action = prochaine_action(plan, position)', `    if observation["lidar"][action] <= ${seuil}:`];
  if (priorite === 'plan') l.push("        pass  # le plan garde la priorité : l'action prévue est exécutée");
  else {
    if (priorite === 'carte') l.push('        if case_visee(position, action) not in obstacles_connus:', '            return action  # la carte dit « libre » : le mouvement est exécuté');
    if (apres === 'attendre') l.push('        return ATTENDRE  # sans limite de durée');
    else {
      if (apres === 'patience') l.push(`        if attente < ${patience}:`, '            attente += 1', '            return ATTENDRE');
      l.push(memoire === 'oui' ? '        obstacles_connus.add(case_detectee)' : memoire === 'court' ? `        obstacles_connus.add(case_detectee, oubli_apres=${MISSION.oubli})` : "        # rien n'est noté : la carte reste celle du départ", '        plan = a_etoile(position, objectif, obstacles_connus)', '        action = prochaine_action(plan, position)');
    }
  }
  return [...l, '    return action'].join('\n');
}
export function AtelierHybride({ surReussite }) {
  const [c, setC] = useState({ priorite: 'plan', seuil: 3, apres: 'attendre', patience: 1, memoire: 'non' }); const [res, setRes] = useState(null);
  const sol = useSolution();
  const maj = (champ, v) => { setC({ ...c, [champ]: v }); setRes(null); };
  const verifier = () => { const r = evaluerHybride(c); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const choix = (champ, nom, texte, options) => <li key={champ}><b>{nom}</b> {texte} <select value={c[champ]} onChange={(e) => maj(champ, e.target.value)} aria-label={nom}>{Object.entries(options).map(([k, n]) => <option key={k} value={k}>{n}</option>)}</select></li>;
  const t = 22; const centre = ([x, y]) => `${x * t + t / 2},${y * t + t / 2}`;
  const issue = (r, sc) => (r.issue === 'collision' ? `collision au pas ${r.pas}` : r.issue === 'blocage' ? `n'arrive jamais (essai arrêté à ${MISSION.limite} pas)` : `arrivée en ${r.pas} pas${r.pas > sc.max ? ', hors délai' : ''}`);
  const [palette, chariot, impasse] = res ? res.cas : [];
  const diagnostic = () => (res.cas.some((x) => x.issue === 'collision') ? "Collision : le plan a été calculé sur une carte qui ignore l'obstacle, et rien n'arrête le mouvement prévu. Laquelle des deux couches dispose de l'information la plus récente ?"
    : c.seuil > 1 ? `La garde se déclenche à ${c.seuil} cases : le robot s'immobilise à ${c.seuil} cases de tout obstacle, mur du fond compris, et n'atteint jamais une case voisine d'un mur. À quelle distance un obstacle empêche-t-il réellement le prochain pas ?`
    : c.apres === 'attendre' ? "Le chariot finit par passer, mais la palette et le fond condamné ne bougeront pas : le robot attend sans fin. Que doit faire la couche qui planifie quand l'attente ne suffit pas ?"
    : c.memoire === 'non' ? "Le robot replanifie, mais sa carte n'a pas changé : A* lui rend le même plan, et il revient buter sur le même obstacle, sans fin. Que faut-il ajouter à la carte avant de relancer A* ?"
    : impasse.issue === 'blocage' ? `Dans le cul-de-sac, le robot fait demi-tour, oublie l'obstacle au bout de ${MISSION.oubli} pas alors qu'il est encore dans l'allée, et y retourne. Combien de temps l'obstacle doit-il rester sur la carte pour que le détour aille à son terme ?`
    : !chariot.ok ? `Face au chariot, le robot ${c.apres === 'patience' ? `n'attend que ${c.patience} pas, puis` : ''} part pour un détour : ${chariot.pas} pas, alors que la voie se libérait au bout de 2 pas. Quelle patience suffirait à laisser passer un chariot ?`
    : `Le robot patiente ${c.patience} pas devant un obstacle qui ne bougera pas : le délai est dépassé. Quelle patience laisse passer un chariot sans retarder les autres missions ?`);
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges de l'agent hybride.</b>
        <ul><li>Aucune collision, quoi qu'il arrive.</li><li>Le robot atteint son objectif dans les trois scénarios.</li><li>Il tient le délai de chaque scénario : {SCENARIOS_HYBRIDE.map((sc) => `${sc.max} pas`).join(', ')}.</li></ul>
      </div>
      <p>Le robot suit un plan calculé par A* sur sa carte. Avant chaque mouvement, le lidar donne la distance au premier obstacle dans la direction prévue : 1 signifie que la case voisine est occupée. Programmez ce que l'agent fait quand cette mesure contredit le plan.</p>
      <ol className="regles-edit">
        {choix('priorite', 'Priorité', 'quand le lidar contredit le plan, elle va', PRIORITES)}
        {choix('apres', 'Après un blocage', '', APRES)}
        {choix('memoire', 'Mémoire', 'avant de replanifier,', MEMOIRES)}
      </ol>
      <label className="curseur">Distance de garde = <b>{c.seuil} case(s)</b><input type="range" min="1" max="4" step="1" value={c.seuil} onChange={(e) => maj('seuil', Number(e.target.value))} aria-label="Distance de garde" /></label>
      {c.apres === 'patience' && <label className="curseur">Patience = <b>{c.patience} pas</b><input type="range" min="1" max="5" step="1" value={c.patience} onChange={(e) => maj('patience', Number(e.target.value))} aria-label="Patience" /></label>}
      <pre><code data-testid="programme">{programmeHybride(c)}</code></pre>
      <svg viewBox={`0 0 520 ${SCENARIOS_HYBRIDE.length * 124}`} role="img" aria-label="Trajectoire du robot dans les trois scénarios">
        {SCENARIOS_HYBRIDE.map((sc, i) => { const r = res?.cas[i]; const fin = r ? r.trace[r.trace.length - 1] : MISSION.depart; return (
          <g key={sc.nom} transform={`translate(0 ${i * 124})`}>
            {ALLEES.map((l, y) => [...l].map((ch, x) => <rect key={cle([x, y])} x={x * t + 1} y={y * t + 1} width={t - 2} height={t - 2} rx="3" fill={ch === '#' ? 'var(--plan-mur)' : 'var(--plan-sol)'} />))}
            <rect x={sc.obstacle[0] * t + 3} y={sc.obstacle[1] * t + 3} width={t - 6} height={t - 6} rx="3" fill={C.orange} />
            <rect x={MISSION.but[0] * t + 6} y={MISSION.but[1] * t + 6} width={t - 12} height={t - 12} rx="2" fill={C.vert} />
            {r && <polyline points={r.trace.map(centre).join(' ')} fill="none" stroke={C.bleu} strokeWidth="3" strokeLinejoin="round" opacity="0.75" />}
            <circle cx={fin[0] * t + t / 2} cy={fin[1] * t + t / 2} r="7" fill={r?.issue === 'collision' ? C.rouge : C.bleu} stroke="#fff" strokeWidth="2" />
            <text x="254" y="20" fontSize="13" fontWeight="700" fill="var(--texte)">{sc.nom}</text>
            {sc.detail.map((d, k) => <text key={d} x="254" y={40 + k * 16} fontSize="11.5" fill="var(--texte-doux)">{d}</text>)}
            {r && <text x="254" y="84" fontSize="12" fontWeight="700" fill={r.ok ? C.vert : C.rouge}>{issue(r, sc)}</text>}
          </g>
        ); })}
      </svg>
      <p className="conseil">Carré orange : l'obstacle que la carte ignore. Carré vert : l'objectif. Trait bleu : la trajectoire du robot, une fois l'agent exécuté.</p>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Exécuter mon agent dans les trois scénarios</button>
        {sol.bouton(() => { setC(SOLUTION_HYBRIDE); setRes(null); })}
      </div>
      {res && (
        <>
          <table className="tableau compact banc">
            <thead><tr><th>Scénario</th><th>Issue</th><th>Délai</th><th>Exigences</th></tr></thead>
            <tbody>{SCENARIOS_HYBRIDE.map((sc, i) => <tr key={sc.nom}><td>{sc.nom}</td><td>{issue(res.cas[i], sc)}</td><td>{sc.max} pas</td><td className={res.cas[i].ok ? 'ok' : 'ko'}>{res.cas[i].ok ? 'tenues ✓' : 'non tenues ✗'}</td></tr>)}</tbody>
          </table>
          <Bilan ok={res.ok} solution="hybride">{res.ok ? `Les trois scénarios sont tenus, en ${palette.pas}, ${chariot.pas} et ${impasse.pas} pas. Vous avez programmé l'arbitrage : le plan propose, la garde réactive a le dernier mot, la carte retient ce que le lidar a découvert, et un peu de patience évite un détour inutile.` : diagnostic()}</Bilan>
        </>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ Espace
// Écrire la fonction de coût d'une tournée : quatre termes pondérés. Le système énumère les 120 ordres
// de visite, retient celui de coût minimal et vérifie sur lui ce que le métier exige.
export const SITE = { Q: [0, 20], A: [2, 2], B: [48, 6], C: [58, 0], D: [20, 40], U: [52, 16] };
export const TOURNEE = { zone: [22, 16, 42, 34], limite: 55, distanceMax: 200, depots: { A: 10, B: 30, C: 5, D: 20, U: 5 } };
const permuter = (a) => (a.length < 2 ? [a] : a.flatMap((x, i) => permuter([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [x, ...p])));
const traverse = (a, b) => Array.from({ length: 59 }, (_, i) => [a[0] + ((b[0] - a[0]) * (i + 1)) / 60, a[1] + ((b[1] - a[1]) * (i + 1)) / 60]).some(([x, y]) => x > TOURNEE.zone[0] && x < TOURNEE.zone[2] && y > TOURNEE.zone[1] && y < TOURNEE.zone[3]);
export const TOURNEES = permuter(['A', 'B', 'C', 'D', 'U']).map((ordre) => {
  const etapes = ['Q', ...ordre, 'Q']; let distance = 0; let heure = 0; let passages = 0; let energie = 0; let charge = 70;
  for (let i = 0; i < etapes.length - 1; i++) {
    const [a, b] = [SITE[etapes[i]], SITE[etapes[i + 1]]]; const l = Math.round(Math.hypot(a[0] - b[0], a[1] - b[1]));
    distance += l; passages += traverse(a, b) ? 1 : 0; energie += l * (0.2 + 0.01 * charge);
    if (etapes[i + 1] === 'U') heure = distance;
    charge -= TOURNEE.depots[etapes[i + 1]] || 0;
  }
  return { etapes, distance, heure, retard: Math.max(0, heure - TOURNEE.limite), passages, energie };
});
// Nombre de passages qu'on ne peut pas éviter en servant U à l'heure sans dépasser la distance permise.
export const PASSAGES_UTILES = Math.min(...TOURNEES.filter((x) => x.retard === 0 && x.distance <= TOURNEE.distanceMax).map((x) => x.passages));
export function evaluerCout(p) {
  const cout = (x) => p.distance * x.distance + p.retard * x.retard + p.passages * x.passages + p.energie * x.energie;
  const minimum = Math.min(...TOURNEES.map(cout)); const exaequo = TOURNEES.filter((x) => cout(x) <= minimum + 1e-9);
  const juger = (x) => ({ urgence: x.retard === 0, distance: x.distance <= TOURNEE.distanceMax, zone: x.passages <= PASSAGES_UTILES });
  const tournee = exaequo.find((x) => !Object.values(juger(x)).every(Boolean)) || exaequo[0]; const tests = juger(tournee);
  const ok = Object.values(tests).every(Boolean);
  return { tournee, cout: minimum, exaequo: exaequo.length, tests, ok, sansEnergie: !ok && p.energie > 0 && evaluerCout({ ...p, energie: 0 }).ok };
}
export const SOLUTION_ESPACE = { distance: 1, retard: 5, passages: 20, energie: 0 };
const TERMES = [['distance', 'Poids de la distance', 5, 1, 'distance (m)'], ['retard', 'Poids du retard', 10, 1, 'retard en U (s)'], ['passages', 'Poids des passages', 100, 10, 'passages en zone piétonne'], ['energie', "Poids de l'énergie", 5, 1, 'énergie (Wh)']];
export function AtelierEspace({ surReussite }) {
  const [p, setP] = useState({ distance: 1, retard: 0, passages: 0, energie: 0 }); const [res, setRes] = useState(null);
  const sol = useSolution();
  const verifier = () => { const r = evaluerCout(p); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const X = ([x]) => 26 + x * 8; const Y = ([, y]) => 22 + y * 8; const [zx, zy, zX, zY] = TOURNEE.zone; const x = res?.tournee;
  return (
    <div className="atelier">
      <div className="cahier"><b>Ce que demande l'exploitant.</b>
        <ul><li>La station U attend une pièce urgente : elle est servie dans les {TOURNEE.limite} secondes qui suivent le départ.</li><li>La tournée ne dépasse pas {TOURNEE.distanceMax} m.</li><li>La zone piétonne n'est traversée qu'en dernier recours : pas un passage de plus que ce qu'imposent les deux premières exigences.</li></ul>
      </div>
      <p>Le robot part du quai Q, sert les cinq stations et revient au quai, en ligne droite d'un point au suivant, à 1 m par seconde. Il emporte 70 kg et dépose 10 kg en A, 30 kg en B, 5 kg en C, 20 kg en D et 5 kg en U : plus il est chargé, plus il consomme. Le solveur essaie les 120 ordres de visite et garde celui dont le coût est le plus faible. À vous d'écrire ce coût.</p>
      {TERMES.map(([id, nom, max, pas]) => <label className="curseur" key={id}>{nom} = <b>{p[id]}</b><input type="range" min="0" max={max} step={pas} value={p[id]} onChange={(e) => { setP({ ...p, [id]: Number(e.target.value) }); setRes(null); }} aria-label={nom} /></label>)}
      <p className="conseil">Coût d'une tournée = {TERMES.map(([id, , , , unite]) => `${p[id]} × ${unite}`).join(' + ')}.</p>
      <svg viewBox="0 0 520 364" role="img" aria-label="Plan de l'entrepôt et tournée retenue">
        <rect x="6" y="4" width="508" height="356" rx="8" fill="var(--plan-sol)" />
        <rect x={X([zx])} y={Y([0, zy])} width={(zX - zx) * 8} height={(zY - zy) * 8} rx="4" fill={C.orange} opacity="0.3" stroke={C.orange} strokeWidth="2" strokeDasharray="6 4" />
        <text x={X([(zx + zX) / 2])} y={Y([0, zY]) - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--texte)">zone piétonne</text>
        {x && <polygon points={x.etapes.slice(0, -1).map((s) => `${X(SITE[s])},${Y(SITE[s])}`).join(' ')} fill="none" stroke={C.bleu} strokeWidth="3" strokeLinejoin="round" />}
        {Object.entries(SITE).map(([s, pt]) => (
          <g key={s}>
            <circle cx={X(pt)} cy={Y(pt)} r="12" fill={s === 'Q' ? C.noir : s === 'U' ? C.rouge : C.jaune} stroke="#fff" strokeWidth="2" />
            <text x={X(pt)} y={Y(pt) + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill={s === 'Q' || s === 'U' ? '#fff' : C.noir}>{s}</text>
            {x && s !== 'Q' && <text x={X(pt) + (pt[0] > 55 ? -40 : 16)} y={Y(pt) + (pt[0] > 55 ? 5 : pt[1] > 35 ? -4 : 16)} fontSize="11.5" fontWeight="700" fill={C.bleu}>n° {x.etapes.indexOf(s)}</text>}
          </g>
        ))}
      </svg>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Chercher la tournée de coût minimal</button>
        {sol.bouton(() => { setP(SOLUTION_ESPACE); setRes(null); })}
      </div>
      {res && (
        <>
          <p>Tournée de coût minimal parmi 120 : <b>{x.etapes.join(' → ')}</b>. Coût = {p.distance} × {x.distance} + {p.retard} × {x.retard} + {p.passages} × {x.passages} + {p.energie} × {F(x.energie, 0)} = {F(res.cout, 0)}.{res.exaequo > 1 && ` Votre coût ne départage pas ${res.exaequo} tournées : le solveur peut rendre n'importe laquelle, celle-ci comprise.`}</p>
          <table className="tableau compact banc"><tbody>
            {ligne(res.tests.urgence, `Station U servie à ${x.heure} s (limite : ${TOURNEE.limite} s)`)}
            {ligne(res.tests.distance, `Distance parcourue : ${x.distance} m (maximum : ${TOURNEE.distanceMax} m)`)}
            {ligne(res.tests.zone, `Passages en zone piétonne : ${x.passages} (le strict nécessaire : ${PASSAGES_UTILES})`)}
          </tbody></table>
          <Bilan ok={res.ok} solution="espace">{res.ok ? `Les trois exigences sont tenues, pour ${x.distance} m et ${F(x.energie, 0)} Wh. Vous avez écrit la fonction de coût : le retard y pèse assez pour primer, un passage en zone piétonne vaut un détour mais pas un retard, et le solveur a fait le reste.` : res.sansEnergie ? "Sans le terme d'énergie, ces mêmes poids tiendraient les trois exigences. L'exploitant ne demande rien sur l'énergie : en la payant, votre coût déplace la tournée vers un autre compromis. Que doit contenir une fonction de coût, au juste ?" : !res.tests.urgence ? (p.retard === 0 ? `Rien dans votre coût ne parle de l'urgence : la tournée la moins chère sert U à ${x.heure} s. Quel terme rendrait ce retard coûteux ?` : x.passages < PASSAGES_UTILES ? `Votre coût préfère ${x.retard} s de retard à un passage en zone piétonne : ${p.retard} × ${x.retard} pèse moins que ${p.passages}. Laquelle de ces deux exigences l'exploitant accepte-t-il de voir céder ?` : `Le retard ne coûte pas assez : ${x.retard} s de retard ajoutent ${p.retard * x.retard} au coût, moins que ce que coûterait la tournée qui sert U d'abord. Combien de mètres de détour vaut une seconde de retard sur une pièce urgente ?`) : !res.tests.zone ? `U est servie à l'heure, mais la tournée traverse ${x.passages} fois la zone piétonne quand ${PASSAGES_UTILES} passage suffit. ${p.passages === 0 ? 'Votre coût ne dit rien de cette zone.' : `À ${p.passages} par passage, le détour qui l'évite reste plus cher.`} Combien de mètres de détour un passage évité vaut-il ?` : `U est servie à l'heure, mais la tournée fait ${x.distance} m. ${p.distance === 0 ? "La distance ne pèse rien dans votre coût : rien ne retient le solveur d'allonger le trajet." : 'Les autres termes pèsent si lourd que la distance ne compte presque plus.'} Quel poids relatif lui rendre ?`}</Bilan>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- Croyance
// Aménager un couloir de dix cases (où poser les portes) et régler la confiance du filtre dans son capteur.
// Un filtre bayésien est exécuté depuis chaque case de départ, sans erreur de lecture puis avec une lecture fausse.
export const COULOIR = { cases: 10, pas: 4, seuil: 0.75, portesMax: 3 };
export function filtrer(portes, depart, confiance, fausse = -1) {
  const n = portes.length; let bel = Array(n).fill(1 / n); let pos = depart; const lues = [];
  for (let t = 0; t <= COULOIR.pas; t++) {
    if (t > 0) { pos = Math.min(n - 1, pos + 1); const b = Array(n).fill(0); bel.forEach((x, i) => { b[Math.min(n - 1, i + 1)] += x; }); bel = b; }
    const z = portes[pos] !== (fausse === t); lues.push(z);
    const b = bel.map((x, i) => x * (portes[i] === z ? confiance : 1 - confiance)); const s = b.reduce((a, x) => a + x, 0);
    bel = s > 0 ? b.map((x) => x / s) : b;
  }
  return { depart, bel, pos, lues, vraie: bel[pos] };
}
export function evaluerCroyance({ portes, confiance }) {
  const r = confiance / 100; const departs = portes.map((_, d) => d);
  const essais = departs.map((d) => filtrer(portes, d, r)); const pire = essais.reduce((m, e) => (e.vraie < m.vraie ? e : m));
  const perturbe = Math.min(...departs.flatMap((d) => Array.from({ length: COULOIR.pas + 1 }, (_, f) => filtrer(portes, d, r, f).vraie)));
  const rivale = pire.bel.reduce((m, x, i) => (i !== pire.pos && (m < 0 || x > pire.bel[m]) ? i : m), -1);
  const places = departs.filter((d) => portes[d]); const ecarts = places.slice(1).map((x, i) => x - places[i]);
  const tests = { localise: pire.vraie >= COULOIR.seuil, robuste: perturbe > 1e-9, sobre: places.length <= COULOIR.portesMax };
  const ok = tests.localise && tests.robuste && tests.sobre;
  return { essais, pire, perturbe, rivale, nb: places.length, regulier: ecarts.length > 0 && ecarts.every((e) => e === ecarts[0]) ? ecarts[0] : 0, tests, ok, capteurSeul: !tests.localise && r < 0.9 && evaluerCroyance({ portes, confiance: 90 }).tests.localise };
}
export const SOLUTION_CROYANCE = { portes: [true, false, false, false, true, true, false, false, false, false], confiance: 90 };
export function AtelierCroyance({ surReussite }) {
  const [c, setC] = useState({ portes: Array(COULOIR.cases).fill(false), confiance: 100 }); const [res, setRes] = useState(null);
  const sol = useSolution();
  const verifier = () => { const r = evaluerCroyance(c); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const basculer = (i) => { setC({ ...c, portes: c.portes.map((x, k) => (k === i ? !x : x)) }); setRes(null); };
  const l = 48; const bel = res ? res.pire.bel : c.portes.map(() => 1 / COULOIR.cases); const pct = (x) => `${F(x * 100, 0)} %`;
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges de la localisation.</b>
        <ul><li>Après {COULOIR.pas} déplacements, le robot attribue au moins {pct(COULOIR.seuil)} de croyance à sa vraie case, quelle que soit sa case de départ.</li><li>Une lecture fausse du capteur ne fait jamais exclure la vraie case : sa croyance ne tombe pas à zéro.</li><li>Au plus {COULOIR.portesMax} portes : chaque repère posé se paie.</li></ul>
      </div>
      <p>Le couloir compte {COULOIR.cases} cases. Le robot ignore où il se trouve : 10 % par case. Il lit son capteur, puis avance d'une case vers la droite et relit, {COULOIR.pas} fois de suite. Arrivé au fond, il reste contre le mur. Le capteur annonce « porte » ou « mur » et lit juste 9 fois sur 10. Cochez les cases où poser une porte, puis réglez la confiance que le filtre accorde à chaque lecture.</p>
      <div className="actions">{c.portes.map((x, i) => <label key={i}><input type="checkbox" checked={x} onChange={() => basculer(i)} aria-label={`Porte en case ${i + 1}`} /> {i + 1}</label>)}</div>
      <label className="curseur">Confiance dans le capteur = <b>{c.confiance} %</b><input type="range" min="50" max="100" step="10" value={c.confiance} onChange={(e) => { setC({ ...c, confiance: Number(e.target.value) }); setRes(null); }} aria-label="Confiance dans le capteur" /></label>
      <svg viewBox="0 0 520 208" role="img" aria-label="Couloir, portes et croyance du robot">
        <text x="20" y="14" fontSize="11.5" fill="var(--texte-doux)">{res ? `Croyance après ${COULOIR.pas} déplacements, robot parti de la case ${res.pire.depart + 1} (le départ le moins bien localisé)` : 'Croyance avant toute mesure'}</text>
        {bel.map((x, i) => (
          <g key={i}>
            <rect x={20 + i * l + 6} y={126 - x * 100} width={l - 12} height={x * 100} fill={C.orange} />
            <text x={20 + i * l + l / 2} y={121 - x * 100} textAnchor="middle" fontSize="11" fill="var(--texte)">{pct(x)}</text>
            <rect x={20 + i * l + 1} y="130" width={l - 2} height="34" rx="4" fill="var(--plan-sol)" stroke="var(--texte-doux)" />
            {c.portes[i] && <rect x={20 + i * l + 10} y="130" width={l - 20} height="9" rx="2" fill={C.vert} />}
            {res && res.pire.pos === i && <circle cx={20 + i * l + l / 2} cy="152" r="8" fill={C.bleu} stroke="#fff" strokeWidth="2" />}
            <text x={20 + i * l + l / 2} y="180" textAnchor="middle" fontSize="12" fill="var(--texte-doux)">{i + 1}</text>
          </g>
        ))}
        <text x="20" y="200" fontSize="11.5" fill="var(--texte-doux)"><tspan fill={C.vert} fontWeight="700">▬</tspan> porte  <tspan fill={C.bleu} fontWeight="700">●</tspan> position réelle du robot, inconnue de lui  <tspan fill={C.orange} fontWeight="700">■</tspan> croyance</text>
      </svg>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Lancer le filtre depuis les 10 cases</button>
        {sol.bouton(() => { setC(SOLUTION_CROYANCE); setRes(null); })}
      </div>
      {res && (
        <>
          <table className="tableau compact donnees"><tbody>
            <tr><th>Case de départ</th>{res.essais.map((e) => <td key={e.depart}>{e.depart + 1}</td>)}</tr>
            <tr><th>Croyance sur la vraie case</th>{res.essais.map((e) => <td key={e.depart}>{pct(e.vraie)}</td>)}</tr>
          </tbody></table>
          <table className="tableau compact banc"><tbody>
            {ligne(res.tests.localise, `Localisation : au pire ${F(res.pire.vraie * 100, 1)} % sur la vraie case, robot parti de la case ${res.pire.depart + 1} (minimum : ${pct(COULOIR.seuil)})`)}
            {ligne(res.tests.robuste, `Après une lecture fausse, la vraie case garde au pire ${F(res.perturbe * 100, 1)} % de croyance`)}
            {ligne(res.tests.sobre, `Portes posées : ${res.nb} (maximum : ${COULOIR.portesMax})`)}
          </tbody></table>
          <Bilan ok={res.ok} solution="croyance">{res.ok ? `Le robot se localise depuis les 10 cases de départ, avec ${res.nb} portes. Vous avez aménagé le couloir pour que chaque départ produise une suite de mesures qu'aucun autre ne produit, et réglé le filtre sur la fiabilité réelle de son capteur.` : !res.tests.sobre ? `Vous avez posé ${res.nb} portes pour ${COULOIR.portesMax} permises. Ce n'est pas le nombre de repères qui localise le robot : lesquelles de vos portes rendent deux départs impossibles à confondre ?` : !res.tests.localise ? (res.nb === 0 ? "Sans repère, le capteur annonce « mur » partout : aucune mesure ne distingue une case d'une autre. Où poser des portes pour que le robot voie autre chose selon l'endroit d'où il part ?" : c.confiance === 50 ? "À 50 %, le filtre tient chaque lecture pour un tirage à pile ou face : aucune mesure ne modifie la croyance. Que vaut réellement le capteur ?" : `Parti de la case ${res.pire.depart + 1}, le robot lit « ${res.pire.lues.map((z) => (z ? 'porte' : 'mur')).join(', ')} » et hésite : ${pct(res.pire.vraie)} pour sa vraie case, la ${res.pire.pos + 1}, et ${pct(res.pire.bel[res.rivale])} pour la case ${res.rivale + 1}. ${res.regulier ? `Vos portes se suivent toutes les ${res.regulier} cases : décalé de ${res.regulier} cases, le robot relit exactement la même suite. Quelle disposition donnerait à chaque départ une suite qui n'appartient qu'à lui ?` : res.capteurSeul ? `Votre disposition suffirait si le filtre accordait au capteur ce qu'il vaut : à ${c.confiance} %, chaque lecture pèse trop peu. Quelle est la fiabilité réelle du capteur ?` : "Ces deux positions donnent des suites de mesures trop proches, et le filtre sait qu'une lecture peut être fausse. Où déplacer une porte pour qu'elles diffèrent davantage ?"}`) : "Le filtre tient son capteur pour infaillible. À la première lecture fausse, il attribue 0 % à la vraie case, et plus aucune mesure ne pourra l'y ramener. Quelle confiance correspond à un capteur qui lit juste 9 fois sur 10 ?"}</Bilan>
        </>
      )}
    </div>
  );
}

export const ATELIERS_CONCEPTION_M3 = { conception_astar: AtelierAstar, conception_hybride: AtelierHybride, conception_espace: AtelierEspace, conception_croyance: AtelierCroyance };
