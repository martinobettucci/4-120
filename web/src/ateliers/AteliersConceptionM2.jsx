// Ateliers de conception du module 2 (leçons agent, lidar, etat, boucle). L'apprenant y prend des décisions de
// conception : l'équipement d'un drone, le réglage d'un lidar, l'exploitation d'un capteur bruité, le programme
// d'une boucle. Le système exécute ce qu'il a conçu et le confronte à un cahier des charges.
// La logique de chaque atelier est exportée à part, pour être étalonnée et testée sans navigateur.
import { useState } from 'react';
import { F, C, alea, Bilan } from './Ateliers.jsx';
import { useSolution } from './Solution.jsx';

const ligne = (ok, texte, cle) => <tr key={cle || texte}><td>{texte}</td><td className={ok ? 'ok' : 'ko'}>{ok ? 'tenu ✓' : 'non tenu ✗'}</td></tr>;

// ---------------------------------------------------------------------- Agent
// Spécifier un drone de livraison : capteurs et effecteurs choisis dans un catalogue, sous un budget de masse
// et de coût. Le drone équipé traverse six situations : chacune exige de percevoir, puis de pouvoir agir.
export const DRONE = { masse: 560, cout: 800 };
// [clé, nom, famille, masse en grammes, coût en euros, ce que l'équipement apporte, capacités]
export const CATALOGUE = [
  ['gps', 'Récepteur GPS', 'capteur', 30, 40, 'perçoit sa position sur la carte', ['position']],
  ['camera', 'Caméra couleur', 'capteur', 50, 60, 'perçoit une image du sol, si le sol est éclairé', ['image']],
  ['thermique', 'Caméra thermique', 'capteur', 90, 240, 'perçoit une image du sol, de jour comme de nuit', ['image', 'image_nuit']],
  ['lidar', 'Lidar', 'capteur', 150, 260, "perçoit la distance aux obstacles qui l'entourent", ['obstacles']],
  ['telemetre', 'Télémètre pointé vers le sol', 'capteur', 15, 20, 'perçoit sa hauteur au-dessus du sol', ['hauteur']],
  ['inertie', 'Centrale inertielle', 'capteur', 10, 30, 'perçoit son inclinaison', ['inclinaison']],
  ['jauge', 'Jauge de batterie', 'capteur', 5, 10, "perçoit l'énergie qui lui reste", ['energie']],
  ['helices', 'Quatre hélices motorisées', 'effecteur', 120, 80, 'permet de voler et de se diriger', ['vol']],
  ['reserve', 'Moteurs à réserve de poussée', 'effecteur', 80, 80, 'permet de se redresser dans une rafale', ['poussee']],
  ['pince', 'Pince de largage', 'effecteur', 40, 30, 'permet de lâcher le colis', ['largage']],
  ['projecteur', 'Projecteur', 'effecteur', 60, 30, "permet d'éclairer le sol", ['eclairage']],
  ['hautparleur', 'Haut-parleur', 'effecteur', 40, 20, 'permet de diffuser un message', ['annonce']],
];
// [situation, ce qu'il faut percevoir, ce qu'il faut pouvoir faire, ce qui arrive au drone qui ne perçoit pas]
export const SITUATIONS = [
  ['Croisière de jour vers le client, à 2 km', ['position'], ['vol'], "rien ne lui indique où il se trouve : il s'égare"],
  ['Rafale de vent de travers', ['inclinaison'], ['vol', 'poussee'], "rien ne lui signale qu'il penche : la rafale le renverse"],
  ['Grue de chantier imprévue sur la route', ['obstacles'], ['vol'], 'rien ne mesure la distance à la grue : il la heurte'],
  ['Livraison à 22 h : trouver la zone de dépose dans le noir', ['image_nuit'], ['vol'], 'aucune image exploitable dans le noir : il ne trouve pas la zone de dépose'],
  ['Dépose du colis à 1 m du sol', ['hauteur'], ['vol', 'largage'], 'il ignore sa hauteur : le colis tombe de trop haut'],
  ['Retour à la base avant la panne de batterie', ['energie', 'position'], ['vol'], "il ignore s'il lui reste assez d'énergie pour rentrer, ou par où rentrer : il tombe en panne en route"],
];
const GESTES = { vol: 'voler', poussee: 'se redresser', largage: 'lâcher le colis' };
export const SOLUTION_AGENT = ['gps', 'camera', 'lidar', 'telemetre', 'inertie', 'jauge', 'helices', 'reserve', 'pince', 'projecteur'];
export function evaluerAgent(choisis) {
  const pris = CATALOGUE.filter(([c]) => choisis.includes(c)); const cap = new Set(pris.flatMap((e) => e[6]));
  if (cap.has('image') && cap.has('eclairage')) cap.add('image_nuit');
  const masse = pris.reduce((s, e) => s + e[3], 0); const cout = pris.reduce((s, e) => s + e[4], 0);
  const situations = SITUATIONS.map(([nom, percevoir, agir, aveugle]) => {
    const voit = percevoir.every((c) => cap.has(c)); const manque = agir.filter((c) => !cap.has(c));
    return { nom, voit, peut: manque.length === 0, ok: voit && manque.length === 0, pourquoi: !voit ? aveugle : `il perçoit ce qu'il faut, mais rien ne lui permet de ${manque.map((c) => GESTES[c]).join(' ni de ')}` };
  });
  const reussies = situations.filter((s) => s.ok).length; const okMasse = masse <= DRONE.masse; const okCout = cout <= DRONE.cout;
  return { masse, cout, situations, reussies, okMasse, okCout, impuissant: situations.filter((s) => s.voit && !s.peut).length, aveugle: situations.filter((s) => !s.voit).length, ok: reussies === SITUATIONS.length && okMasse && okCout };
}
export function AtelierAgent({ surReussite }) {
  const [choisis, setChoisis] = useState(['gps', 'camera', 'helices', 'pince']); const [res, setRes] = useState(null);
  const sol = useSolution();
  const basculer = (c) => { setChoisis(choisis.includes(c) ? choisis.filter((x) => x !== c) : [...choisis, c]); setRes(null); };
  const verifier = () => { const r = evaluerAgent(choisis); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const actuel = evaluerAgent(choisis);
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges du drone de livraison.</b>
        <ul><li>Le drone porte un colis de l'entrepôt au client et revient, de jour comme de nuit. Il doit réussir les six situations de la mission.</li><li>Masse des équipements : {DRONE.masse} g au plus. Au-delà, il ne soulève plus le colis.</li><li>Coût des équipements : {DRONE.cout} € au plus.</li></ul>
        <ol>{SITUATIONS.map(([nom]) => <li key={nom}>{nom}</li>)}</ol>
      </div>
      <p>Le châssis, la batterie et le calculateur sont fournis. Composez le reste : cochez les capteurs et les effecteurs que vous embarquez.</p>
      <table className="tableau compact">
        <thead><tr><th>Équipement</th><th>Famille</th><th>Masse</th><th>Coût</th><th>Ce qu'il apporte au drone</th></tr></thead>
        <tbody>{CATALOGUE.map(([c, nom, famille, masse, cout, apport]) => (
          <tr key={c}><td><label><input type="checkbox" checked={choisis.includes(c)} onChange={() => basculer(c)} aria-label={nom} /> {nom}</label></td><td>{famille}</td><td>{masse} g</td><td>{cout} €</td><td>{apport}</td></tr>
        ))}</tbody>
      </table>
      <p className="conseil">Équipement actuel : {actuel.masse} g sur {DRONE.masse}, {actuel.cout} € sur {DRONE.cout}.</p>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Faire voler mon drone</button>
        {sol.bouton(() => { setChoisis(SOLUTION_AGENT); setRes(null); })}
      </div>
      {res && (
        <>
          <table className="tableau compact banc">
            <thead><tr><th>Situation de la mission</th><th>Votre drone</th></tr></thead>
            <tbody>
              {res.situations.map((s) => <tr key={s.nom}><td>{s.nom}</td><td className={s.ok ? 'ok' : 'ko'}>{s.ok ? 'réussie ✓' : `échec ✗ : ${s.pourquoi}`}</td></tr>)}
              <tr><td>Masse des équipements ({DRONE.masse} g au plus)</td><td className={res.okMasse ? 'ok' : 'ko'}>{res.masse} g {res.okMasse ? '✓' : '✗'}</td></tr>
              <tr><td>Coût des équipements ({DRONE.cout} € au plus)</td><td className={res.okCout ? 'ok' : 'ko'}>{res.cout} € {res.okCout ? '✓' : '✗'}</td></tr>
            </tbody>
          </table>
          <Bilan ok={res.ok} solution="agent">{res.ok ? "Les six situations sont réussies, dans le budget de masse et de coût. Vous venez de spécifier un agent : pour chaque situation de sa mission, ce qu'il doit percevoir et ce par quoi il doit agir, sans rien embarquer de superflu." : [
            `${res.reussies} situation(s) réussie(s) sur ${SITUATIONS.length}.`,
            res.impuissant > 0 && `Dans ${res.impuissant} situation(s), votre drone perçoit ce qui se passe sans pouvoir y répondre : sans l'effecteur adapté, un agent est impuissant. Par quoi agirait-il ?`,
            res.aveugle > 0 && `Dans ${res.aveugle} situation(s), aucun capteur ne lui livre l'information dont dépend sa décision. Pour chaque ligne concernée : que doit-il percevoir, et quel équipement le lui apporte ?`,
            !(res.okMasse && res.okCout) && `Le budget est dépassé. Tout embarquer n'est pas spécifier : quel équipement ne sert aucune situation, et quelle capacité payez-vous deux fois ?`,
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------- Lidar
// Régler un lidar : nombre de rayons, portée, vitesse du robot. Les rayons sont réellement lancés sur la grille,
// case après case, dans trois scènes. Un obstacle doit être touché assez tôt pour que le robot s'arrête.
export const LIDAR = { calcul: 100, cadence: 2, arret: { 1: 1, 2: 3, 3: 6 }, choix: [4, 8, 16, 32], L: 12, H: 10, rang: 8 };
const RAYONNAGES = new Set([[0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2], [0, 3], [1, 3], [2, 3], [0, 4], [1, 4], [2, 4], [4, 0], [5, 0], [6, 0], [4, 1], [5, 1], [6, 1]].map(String));
const mur = (x, y) => x < 0 || y < 0 || x >= LIDAR.L || y >= LIDAR.rang + 1 || RAYONNAGES.has(`${x},${y}`);
// [nom, colonne où la route de l'obstacle coupe celle du robot, case de l'obstacle quand le robot a parcouru t cases]
export const SCENES = [
  ['Palette tombée dans l\'allée', 10, () => [10, 8]],
  ['Robot sortant d\'une allée transversale', 8, (t) => [8, t]],
  ['Opérateur à pied qui traverse', 10, (t) => [10, 3 + Math.floor(t / 2)]],
];
const arrondi = (v) => Math.sign(v) * Math.round(Math.abs(v));
export function lancerRayons(n, portee, x, y, occupe) {
  return Array.from({ length: n }, (_, i) => {
    const a = (2 * Math.PI * i) / n; const ux = Math.round(Math.cos(a) * 1e9) / 1e9; const uy = -Math.round(Math.sin(a) * 1e9) / 1e9;
    for (let s = 1; ; s++) {
      const d = s * 0.02; const cx = x + arrondi(d * ux); const cy = y + arrondi(d * uy); const k = Math.max(Math.abs(cx - x), Math.abs(cy - y));
      if (k > portee) return { ex: x + (d - 0.02) * ux, ey: y + (d - 0.02) * uy, touche: null };
      if (k > 0 && occupe(cx, cy)) return { ex: x + d * ux, ey: y + d * uy, touche: [cx, cy], k };
    }
  });
}
export function observerScene(scene, t, { rayons, portee }) {
  const o = scene[2](t); const faisceau = lancerRayons(rayons, portee, t, LIDAR.rang, (x, y) => mur(x, y) || (x === o[0] && y === o[1]));
  return { t, o, faisceau, touche: faisceau.some((r) => r.touche && r.touche[0] === o[0] && r.touche[1] === o[1]) };
}
export const SOLUTION_LIDAR = { rayons: 16, portee: 5, vitesse: 2 };
export function evaluerLidar(c) {
  const arret = LIDAR.arret[c.vitesse];
  const scenes = SCENES.map((scene) => {
    let vue = null;
    for (let t = 0; t < scene[1] && !vue; t++) { const obs = observerScene(scene, t, c); if (obs.touche) vue = obs; }
    const reste = vue ? scene[1] - vue.t : 0;
    return { nom: scene[0], vue: !!vue, reste, ok: !!vue && arret < reste, instant: vue || observerScene(scene, scene[1] - 1, c) };
  });
  const points = c.rayons * c.portee; const okCalcul = points <= LIDAR.calcul; const okCadence = c.vitesse >= LIDAR.cadence;
  return { arret, scenes, points, okCalcul, okCadence, ok: scenes.every((s) => s.ok) && okCalcul && okCadence };
}
function Grille({ scene, obs, i, etat }) {
  const u = 14; const X = (x) => i * 176 + (x + 0.5) * u; const Y = (y) => 20 + (y + 0.5) * u; const [ox, oy] = obs.o; const d = scene[2](0);
  return (
    <g>
      <text x={i * 176} y="12" fontSize="10.5" fontWeight="700" fill={etat === null ? 'var(--texte)' : etat ? C.vert : C.rouge}>Scène {i + 1}</text>
      <rect x={i * 176} y="20" width={LIDAR.L * u} height={LIDAR.H * u} fill="var(--carte)" stroke="var(--bord)" />
      {Array.from({ length: LIDAR.L * LIDAR.H }, (_, k) => [k % LIDAR.L, Math.floor(k / LIDAR.L)]).filter(([x, y]) => mur(x, y)).map(([x, y]) => <rect key={`${x},${y}`} x={X(x) - u / 2} y={Y(y) - u / 2} width={u} height={u} fill={C.gris} />)}
      <line x1={X(0)} y1={Y(LIDAR.rang)} x2={X(scene[1])} y2={Y(LIDAR.rang)} stroke={C.bleu} strokeWidth="1" strokeDasharray="3 3" />
      <line x1={X(d[0])} y1={Y(d[1])} x2={X(scene[1])} y2={Y(LIDAR.rang)} stroke={C.rouge} strokeWidth="1" strokeDasharray="3 3" />
      {obs.faisceau.map((r, k) => { const vu = r.touche && r.touche[0] === ox && r.touche[1] === oy; return <line key={k} x1={X(obs.t)} y1={Y(LIDAR.rang)} x2={X(r.ex)} y2={Y(r.ey)} stroke={vu ? C.rouge : C.orange} strokeWidth={vu ? 2 : 0.9} opacity={vu ? 1 : 0.75} />; })}
      <rect x={X(ox) - 5} y={Y(oy) - 5} width="10" height="10" fill={C.rouge} />
      <circle cx={X(obs.t)} cy={Y(LIDAR.rang)} r="5.5" fill={C.bleu} />
    </g>
  );
}
export function AtelierLidar({ surReussite }) {
  const [c, setC] = useState({ rayons: 8, portee: 5, vitesse: 1 }); const [res, setRes] = useState(null);
  const sol = useSolution();
  const maj = (cle, v) => { setC({ ...c, [cle]: Number(v) }); setRes(null); };
  const verifier = () => { const r = evaluerLidar(c); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const rate = res?.scenes.find((s) => !s.ok);
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges du lidar.</b>
        <ul><li>Dans chacune des trois scènes, le robot doit s'arrêter avant la case où sa route croise celle de l'obstacle. Il freine dès qu'un rayon touche l'obstacle.</li><li>Distance d'arrêt, temps de réaction compris : 1 case à 1 case par seconde, 3 cases à 2 cases par seconde, 6 cases à 3 cases par seconde.</li><li>Cadence de l'entrepôt : au moins {LIDAR.cadence} cases par seconde.</li><li>Calculateur : au plus {LIDAR.calcul} points de mesure par tour de lidar. Un rayon produit un point par case de portée.</li></ul>
      </div>
      <p>Le robot (disque bleu) roule vers l'est et mesure à chaque case parcourue. Scène 1 : une palette immobile. Scène 2 : un autre robot, à la même vitesse que le vôtre. Scène 3 : un opérateur à pied, deux fois plus lent. Les pointillés montrent les routes. Les distances se comptent en cases, comme dans la leçon. Le réglage de départ est le lidar de la leçon.</p>
      <svg viewBox="0 0 520 164" role="img" aria-label="Les trois scènes, avec les rayons du lidar">
        {SCENES.map((scene, i) => <Grille key={scene[0]} scene={scene} i={i} obs={res ? res.scenes[i].instant : observerScene(scene, 0, c)} etat={res ? res.scenes[i].ok : null} />)}
      </svg>
      <p className="conseil">{res ? "Dessin : l'instant où un rayon touche l'obstacle pour la première fois (rayon rouge) ou, s'il n'est jamais touché, la dernière case avant le choc." : 'Dessin : ce que le lidar balaie au départ de chaque scène, avec votre réglage.'}</p>
      <label className="curseur">Nombre de rayons<select value={c.rayons} onChange={(e) => maj('rayons', e.target.value)} aria-label="Nombre de rayons">{LIDAR.choix.map((n) => <option key={n} value={n}>{n} rayons, un tous les {String(360 / n).replace('.', ',')}°</option>)}</select></label>
      <label className="curseur">Portée = <b>{c.portee} cases</b><input type="range" min="2" max="10" step="1" value={c.portee} onChange={(e) => maj('portee', e.target.value)} aria-label="Portée" /></label>
      <label className="curseur">Vitesse = <b>{c.vitesse} case{c.vitesse > 1 ? 's' : ''} par seconde</b><input type="range" min="1" max="3" step="1" value={c.vitesse} onChange={(e) => maj('vitesse', e.target.value)} aria-label="Vitesse" /></label>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Lancer les rayons dans les trois scènes</button>
        {sol.bouton(() => { setC(SOLUTION_LIDAR); setRes(null); })}
      </div>
      {res && (
        <>
          <table className="tableau compact banc">
            <thead><tr><th>Exigence</th><th>Mesuré</th><th>Verdict</th></tr></thead>
            <tbody>
              {res.scenes.map((s, i) => <tr key={s.nom}><td>Scène {i + 1}. {s.nom}</td><td>{s.vue ? `touché à ${s.reste} case(s) du croisement, ${res.arret} case(s) pour s'arrêter` : 'jamais touché par un rayon'}</td><td className={s.ok ? 'ok' : 'ko'}>{s.ok ? 'arrêt à temps ✓' : 'collision ✗'}</td></tr>)}
              <tr><td>Cadence (au moins {LIDAR.cadence} cases par seconde)</td><td>{c.vitesse} case(s) par seconde</td><td className={res.okCadence ? 'ok' : 'ko'}>{res.okCadence ? 'tenue ✓' : 'non tenue ✗'}</td></tr>
              <tr><td>Calcul (au plus {LIDAR.calcul} points par tour)</td><td>{c.rayons} rayons × {c.portee} cases = {res.points} points</td><td className={res.okCalcul ? 'ok' : 'ko'}>{res.okCalcul ? 'tenu ✓' : 'dépassé ✗'}</td></tr>
            </tbody>
          </table>
          <Bilan ok={res.ok} solution="lidar">{res.ok ? "Les trois obstacles sont touchés assez tôt, à la cadence demandée et sans saturer le calculateur. Vous venez de régler un capteur d'après ce que le robot doit voir : assez de rayons pour ne rien laisser passer entre deux, et juste la portée qu'exige la distance d'arrêt." : [
            rate && !rate.vue && c.rayons === 4 && `Scène « ${rate.nom} » : avec 4 rayons, le robot ne regarde que devant, derrière et sur les côtés. Ce qui arrive en diagonale reste entre deux rayons jusqu'au choc. Que verrait un rayon de plus dans chaque intervalle ?`,
            rate && (rate.vue || c.rayons !== 4) && rate.reste <= 1 && `Scène « ${rate.nom} » : l'obstacle était à portée, mais il est resté entre deux rayons presque jusqu'au contact. Regardez le dessin : qu'est-ce qui resserre l'écart entre deux rayons voisins ?`,
            rate && rate.reste > 1 && `Scène « ${rate.nom} » : l'obstacle est touché à ${rate.reste} cases du croisement, alors qu'il faut ${res.arret} cases pour s'arrêter à ${c.vitesse} cases par seconde, et une case de garde. Deux réglages jouent sur cet écart : lesquels ?`,
            !res.okCadence && "La cadence de l'entrepôt n'est pas tenue : le robot roule trop lentement. Que devient la distance d'arrêt s'il accélère ?",
            !res.okCalcul && `${res.points} points par tour saturent le calculateur. Chaque rayon se paie sur toute sa portée : de quelle portée la distance d'arrêt a-t-elle réellement besoin ?`,
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------- État
// Exploiter un capteur bruité : combien de mesures moyenner avant de décider, quelle marge ajouter à la distance
// d'arrêt. Le système simule 4 000 approches d'un mur : le robot avance pendant qu'il mesure.
export const MUR = { sigma: 0.2, pas: 0.025, arret: 1, approches: 4000, plafond: 0.01, bras: 0.4, part: 0.05, margeMax: 1 };
export const SOLUTION_ETAT = { n: 5, marge: 0.32 };
export function evaluerEtat({ n, marge }) {
  const g = alea(4130); const gauss = () => Math.sqrt(-2 * Math.log(g())) * Math.cos(2 * Math.PI * g());
  const seuil = MUR.arret + marge; let collisions = 0; let loin = 0; let somme = 0; const histo = Array(36).fill(0); const ecarts = [];
  for (let a = 0; a < MUR.approches; a++) {
    let d = seuil + 1 + g() * n * MUR.pas;
    for (;;) { let s = 0; for (let k = 0; k < n; k++) { d -= MUR.pas; s += d + MUR.sigma * gauss(); } if (s / n <= seuil || d <= 0) break; }
    const f = d - MUR.arret; if (f < 0) collisions++; else { somme += f; if (f > MUR.bras) loin++; }
    histo[Math.max(0, Math.min(35, Math.floor((f + 0.6) / 0.05)))]++; ecarts.push(d - seuil);
  }
  const taux = collisions / MUR.approches; const tropLoin = loin / MUR.approches; const moyen = collisions < MUR.approches ? somme / (MUR.approches - collisions) : 0;
  const okCollisions = taux <= MUR.plafond; const okLoin = tropLoin <= MUR.part;
  // Le freinage se déclenche au même écart du seuil quelle que soit la marge : on en déduit si ce nombre de mesures peut tenir les deux exigences.
  ecarts.sort((x, y) => x - y); const mini = Math.max(0, Math.ceil(-ecarts[Math.floor(MUR.plafond * MUR.approches)] * 100 - 1e-6) / 100);
  const reglable = mini <= MUR.margeMax && ecarts.filter((x) => x + mini > MUR.bras).length / MUR.approches <= MUR.part;
  return { taux, collisions, tropLoin, loin, moyen, histo, reglable, peuDeMesures: n * MUR.pas <= MUR.sigma / Math.sqrt(n), bruit: MUR.sigma / Math.sqrt(n), aveugle: n * MUR.pas, okCollisions, okLoin, ok: okCollisions && okLoin };
}
export function AtelierEtat({ surReussite }) {
  const [c, setC] = useState({ n: 1, marge: 0 }); const [res, setRes] = useState(null);
  const sol = useSolution();
  const maj = (cle, v) => { setC({ ...c, [cle]: Number(v) }); setRes(null); };
  const verifier = () => { const r = evaluerEtat(c); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const hmax = res ? Math.max(...res.histo) : 1; const X = (m) => 20 + ((m + 0.6) / 1.8) * 400; const milliers = `${MUR.approches / 1000} 000`;
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges de l'approche du mur.</b>
        <ul><li>Le robot roule vers un mur à 0,5 m/s. Son lidar donne une mesure toutes les 0,05 s : entre deux mesures, le robot avance de 2,5 cm. Chaque mesure porte un bruit d'écart type {F(MUR.sigma, 1)} m, celui de la leçon.</li><li>Votre règle : le robot moyenne un lot de n mesures, puis freine si la moyenne est inférieure ou égale à la distance d'arrêt (1 m) augmentée de la marge. Sinon il recommence avec n nouvelles mesures.</li><li>Sécurité : au plus {F(MUR.plafond * 100, 0)} % de collisions sur {milliers} approches.</li><li>Précision : au plus {F(MUR.part * 100, 0)} % des approches arrêtées à plus de {F(MUR.bras, 2)} m du mur. Au-delà, le bras du robot n'atteint plus le rayonnage.</li></ul>
      </div>
      <label className="curseur">Mesures moyennées = <b>{c.n}</b><input type="range" min="1" max="30" step="1" value={c.n} onChange={(e) => maj('n', e.target.value)} aria-label="Mesures moyennées" /></label>
      <label className="curseur">Marge de sécurité = <b>{F(c.marge, 2)} m</b><input type="range" min="0" max={MUR.margeMax} step="0.01" value={c.marge} onChange={(e) => maj('marge', e.target.value)} aria-label="Marge de sécurité" /></label>
      <p className="conseil">Avec ce réglage : incertitude de la moyenne σ / √n = {F(MUR.sigma / Math.sqrt(c.n), 2)} m, distance parcourue pendant un lot de mesures = {F(c.n * MUR.pas, 2)} m, freinage quand la moyenne passe sous {F(MUR.arret + c.marge, 2)} m.</p>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Simuler les {milliers} approches</button>
        {sol.bouton(() => { setC(SOLUTION_ETAT); setRes(null); })}
      </div>
      {res && (
        <>
          <svg viewBox="0 0 440 132" role="img" aria-label="Répartition des positions d'arrêt par rapport au mur">
            {res.histo.map((v, i) => <rect key={i} x={X(-0.6 + i * 0.05) + 0.5} y={100 - (v / hmax) * 86} width={400 / 36 - 1} height={(v / hmax) * 86} fill={i < 12 ? C.rouge : i >= 20 ? C.orange : C.bleu} />)}
            <line x1="20" x2="420" y1="100" y2="100" stroke="var(--texte)" />
            <line x1={X(0)} x2={X(0)} y1="8" y2="104" stroke="var(--texte)" strokeWidth="2.5" />
            <line x1={X(MUR.bras)} x2={X(MUR.bras)} y1="8" y2="104" stroke={C.orange} strokeDasharray="4 3" />
            {[-0.5, 0, 0.4, 1].map((m) => <text key={m} x={X(m)} y="114" textAnchor="middle" fontSize="10.5" fill="var(--texte-doux)">{m === 0 ? 'mur' : `${F(m, 1)} m`}</text>)}
            <text x="20" y="128" fontSize="10.5" fill="var(--texte-doux)">Position d'arrêt :  <tspan fill={C.rouge} fontWeight="700">■</tspan> dans le mur (collision)  <tspan fill={C.bleu} fontWeight="700">■</tspan> à portée de bras  <tspan fill={C.orange} fontWeight="700">■</tspan> trop loin</text>
          </svg>
          <table className="tableau compact banc"><tbody>
            {ligne(res.okCollisions, `Collisions : ${res.collisions} sur ${milliers} approches, soit ${F(res.taux * 100, 2)} % (maximum ${F(MUR.plafond * 100, 0)} %)`)}
            {ligne(res.okLoin, `Arrêts à plus de ${F(MUR.bras, 2)} m du mur : ${res.loin} sur ${milliers}, soit ${F(res.tropLoin * 100, 1)} % (maximum ${F(MUR.part * 100, 0)} %)`)}
          </tbody></table>
          <Bilan ok={res.ok} solution="etat">{res.collisions < MUR.approches ? `Arrêt moyen à ${F(res.moyen, 2)} m du mur. ` : ''}{res.ok ? `Les deux exigences sont tenues. Vous venez de concevoir la façon dont un agent exploite un capteur bruité : assez de mesures pour ramener l'incertitude à ${F(res.bruit, 2)} m, pas au point de rouler longtemps sans décider, et une marge qui couvre ce qui reste.` : [
            !res.okCollisions && res.reglable && `Trop de collisions. Avec ${c.n} mesures, il reste ${F(res.bruit, 2)} m d'incertitude sur la moyenne et ${F(res.aveugle, 2)} m parcourus pendant un lot : votre marge de ${F(c.marge, 2)} m ne couvre pas les deux. Que doit-elle absorber ?`,
            !res.okCollisions && !res.reglable && res.peuDeMesures && `Trop de collisions. Chaque décision repose sur une moyenne incertaine de ${F(res.bruit, 2)} m, pour ${F(c.marge, 2)} m de marge : trop souvent, le robot croit le mur plus loin qu'il n'est. Deux leviers réduisent ce risque : lesquels, et que coûte chacun ?`,
            !res.okCollisions && !res.reglable && !res.peuDeMesures && `Trop de collisions. Pendant qu'il accumule ses ${c.n} mesures, le robot parcourt ${F(res.aveugle, 2)} m sans rien décider, et sa moyenne décrit une position déjà dépassée. Une marge peut-elle couvrir un tel trajet sans arrêter le robot trop loin ?`,
            res.okCollisions && res.reglable && "La sécurité est tenue avec de la réserve, mais trop d'approches s'arrêtent hors de portée du bras : chaque centimètre de marge en trop se retrouve devant le mur. Jusqu'où pouvez-vous la réduire sans repasser au-dessus du plafond de collisions ?",
            res.okCollisions && !res.reglable && res.peuDeMesures && `La sécurité est tenue, mais trop d'approches s'arrêtent hors de portée du bras, et réduire la marge ramènerait les collisions. Avec ${F(res.bruit, 2)} m d'incertitude par décision, il suffit d'une moyenne trop basse pour freiner bien avant le seuil. Qu'est-ce qui rendrait chaque décision plus fiable ?`,
            res.okCollisions && !res.reglable && !res.peuDeMesures && `La sécurité est tenue, mais trop d'approches s'arrêtent hors de portée du bras, et réduire la marge ramènerait les collisions. Entre deux décisions, le robot parcourt ${F(res.aveugle, 2)} m sans rien décider : c'est ce trajet que la marge doit couvrir. Faut-il autant de mesures pour un bruit ramené à ${F(res.bruit, 2)} m ?`,
          ].filter(Boolean).join(' ')}</Bilan>
        </>
      )}
    </div>
  );
}

// --------------------------------------------------------------------- Boucle
// Programmer la boucle d'un agent : quatre choix de programmation. Le programme obtenu est réellement exécuté,
// par pas de 0,1 s, sur trois scénarios : couloir libre, sol glissant, chariot qui traverse.
export const QUAI = 10;
export const SCENARIOS = [{ nom: 'Couloir sans perturbation' }, { nom: 'Sol mouillé de 3 m à 6 m : les roues glissent', glisse: true }, { nom: 'Chariot qui débouche à 6 m', chariot: [51, 80] }];
// [clé, nom du choix, variantes proposées]
export const CHOIX_BOUCLE = [
  ['perception', 'Perception', [['avant', 'une seule fois, avant la boucle'], ['chaque', 'avant la boucle, puis à chaque tour']]],
  ['decision', 'Décision', [['plan', 'suivre le plan calculé au départ'], ['obs', 'décider sur la dernière observation']]],
  ['arret', "Condition d'arrêt", [['tours', 'le nombre de tours prévu est atteint'], ['estime', 'la distance commandée atteint 10 m'], ['observe', "l'observation indique le quai"]]],
  ['periode', 'Période de la boucle', [[0.2, '0,2 s par tour'], [1, '1 s par tour'], [2, '2 s par tour']]],
];
export const SOLUTION_BOUCLE = { perception: 'chaque', decision: 'obs', arret: 'observe', periode: 0.2 };
export function programme({ perception, decision, arret, periode }) {
  return [
    'observation = percevoir()',
    decision === 'plan' && 'plan = planifier(observation)          # la liste des « avancer » qui mènent au quai',
    arret === 'tours' && `tours_prevus = round(10 / (VITESSE * ${periode}))`,
    arret === 'estime' && 'distance_commandee = 0',
    { tours: 'for tour in range(tours_prevus):', estime: 'while distance_commandee < 10:', observe: 'while not observation.au_quai:' }[arret],
    decision === 'plan' ? '    action = suivante(plan)                # « arrêter » quand le plan est épuisé' : '    action = decider(observation)',
    `    agir(action, duree=${periode})`,
    arret === 'estime' && `    distance_commandee += action.vitesse * ${periode}`,
    perception === 'chaque' && '    observation = percevoir()',
  ].filter(Boolean).join('\n');
}
export function executerBoucle(c, sc) {
  const m = { x: 0, tick: 0, choc: null, traj: [[0, 0]] }; const present = () => !!sc.chariot && m.tick >= sc.chariot[0] && m.tick < sc.chariot[1];
  const percevoir = () => ({ position: m.x, auQuai: m.x >= QUAI - 0.05, obstacle: present() && m.x < 6 ? 5.5 - m.x : Infinity });
  const decider = (o) => (o.auQuai || o.obstacle <= 1 ? 0 : Math.min(1, (QUAI - o.position) / c.periode));
  const agir = (v) => { for (let k = 0; k < Math.round(c.periode * 10) && !m.choc; k++) { m.x += v * (sc.glisse && m.x >= 3 && m.x < 6 ? 0.6 : 1) * 0.1; m.tick++; m.traj.push([m.tick / 10, m.x]); if (present() && m.x > 5.5 && m.x < 6.5) m.choc = 'chariot'; else if (m.x >= QUAI + 0.5) m.choc = 'quai'; } };
  let observation = percevoir(); const prevus = Math.round(QUAI / c.periode); let plan = prevus; let tour = 0; let commandee = 0;
  const continuer = () => (c.arret === 'tours' ? tour < prevus : c.arret === 'estime' ? commandee < QUAI - 0.05 : !observation.auQuai);
  while (continuer() && !m.choc && m.tick < 300) { const v = c.decision === 'plan' ? (plan-- > 0 ? 1 : 0) : decider(observation); agir(v); commandee += v * c.periode; tour++; if (c.perception === 'chaque') observation = percevoir(); }
  const ecart = QUAI - m.x; const fini = !m.choc && !continuer(); const ok = fini && Math.abs(ecart) <= 0.25;
  const bilan = m.choc === 'chariot' ? `collision avec le chariot à ${F(m.tick / 10, 1)} s` : m.choc === 'quai' ? 'le robot percute le fond du quai' : !fini ? `après 30 s, le programme tourne encore, robot à ${F(Math.abs(ecart), 1)} m du quai` : ok ? `au quai en ${F(m.tick / 10, 1)} s` : `programme terminé à ${F(Math.abs(ecart), 1)} m du quai`;
  return { nom: sc.nom, ok, bilan, traj: m.traj, choc: m.choc };
}
export function evaluerBoucle(c) { const essais = SCENARIOS.map((sc) => executerBoucle(c, sc)); return { essais, ok: essais.every((e) => e.ok) }; }
export function AtelierBoucle({ surReussite }) {
  const [c, setC] = useState({ perception: 'avant', decision: 'plan', arret: 'tours', periode: 1 }); const [res, setRes] = useState(null);
  const sol = useSolution();
  const verifier = () => { const r = evaluerBoucle(c); setRes(r); sol.noter(r.ok); if (r.ok) surReussite(); };
  const X = (t) => 26 + (Math.min(t, 20) / 20) * 136; const Y = (x) => 112 - (Math.min(x, 11) / 11) * 88;
  return (
    <div className="atelier">
      <div className="cahier"><b>Cahier des charges du programme.</b>
        <ul><li>Le robot part de 0 m et rejoint le quai, à 10 m, à 1 m/s. Le programme doit se terminer en moins de 30 s, robot arrêté à 0,25 m du quai au plus, sans collision.</li><li>Il est exécuté sur trois scénarios : un couloir sans perturbation, un sol mouillé de 3 m à 6 m où le robot n'avance qu'à 60 % de la vitesse commandée, et un chariot qui débouche à 6 m, 0,4 s avant le contact, puis libère le passage.</li><li>Fournis : <code>percevoir()</code> donne la position, la distance au premier obstacle et l'arrivée au quai. <code>decider(observation)</code> arrête le robot au quai ou à moins de 1 m d'un obstacle, et le fait avancer sinon.</li></ul>
      </div>
      <ol className="regles-edit">
        {CHOIX_BOUCLE.map(([cle, nom, options]) => (
          <li key={cle}><b>{nom}</b>
            <select value={c[cle]} onChange={(e) => { setC({ ...c, [cle]: cle === 'periode' ? Number(e.target.value) : e.target.value }); setRes(null); }} aria-label={nom}>{options.map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select>
          </li>
        ))}
      </ol>
      <p className="conseil">Le programme que vos choix composent :</p>
      <pre><code data-testid="programme">{programme(c)}</code></pre>
      <div className="actions">
        <button className="bouton" onClick={verifier} data-testid="verifier">Exécuter mon programme</button>
        {sol.bouton(() => { setC(SOLUTION_BOUCLE); setRes(null); })}
      </div>
      {res && (
        <>
          <svg viewBox="0 0 520 132" role="img" aria-label="Position du robot au cours du temps, dans les trois scénarios">
            {res.essais.map((e, i) => (
              <g key={e.nom} transform={`translate(${i * 174} 0)`}>
                <text x="26" y="14" fontSize="10.5" fontWeight="700" fill={e.ok ? C.vert : C.rouge}>Scénario {i + 1}</text>
                {SCENARIOS[i].glisse && <rect x="26" y={Y(6)} width="136" height={Y(3) - Y(6)} fill={C.bleu} opacity="0.15" />}
                {SCENARIOS[i].chariot && <rect x={X(5.1)} y={Y(6.5)} width={X(8) - X(5.1)} height={Y(5.5) - Y(6.5)} fill={C.orange} />}
                <line x1="26" x2="162" y1={Y(QUAI)} y2={Y(QUAI)} stroke={C.vert} strokeDasharray="4 3" />
                <line x1="26" x2="162" y1="112" y2="112" stroke="var(--texte)" /><line x1="26" x2="26" y1="24" y2="112" stroke="var(--texte)" />
                <polyline points={e.traj.filter(([t]) => t <= 20).map(([t, x]) => `${F(X(t), 1).replace(',', '.')},${F(Y(x), 1).replace(',', '.')}`).join(' ')} fill="none" stroke={e.ok ? C.vert : C.rouge} strokeWidth="2" />
                {e.choc && <text x={X(e.traj[e.traj.length - 1][0])} y={Y(e.traj[e.traj.length - 1][1]) + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill={C.rouge}>✗</text>}
                <text x="22" y={Y(QUAI) + 3} textAnchor="end" fontSize="9.5" fill="var(--texte-doux)">10 m</text><text x="22" y="115" textAnchor="end" fontSize="9.5" fill="var(--texte-doux)">0</text>
                <text x="94" y="126" textAnchor="middle" fontSize="9.5" fill="var(--texte-doux)">temps, de 0 à 20 s</text>
              </g>
            ))}
          </svg>
          <p className="conseil">Position du robot au cours du temps. Pointillés verts : le quai. Bande bleue : le sol mouillé. Rectangle orange : le chariot dans le couloir.</p>
          <table className="tableau compact banc">
            <thead><tr><th>Scénario</th><th>Ce que l'exécution donne</th></tr></thead>
            <tbody>{res.essais.map((e, i) => <tr key={e.nom}><td>{i + 1}. {e.nom}</td><td className={e.ok ? 'ok' : 'ko'}>{e.bilan} {e.ok ? '✓' : '✗'}</td></tr>)}</tbody>
          </table>
          <Bilan ok={res.ok} solution="boucle">{res.ok ? "Les trois scénarios réussissent. Vous venez de programmer une boucle fermée : percevoir à chaque tour, décider sur la dernière observation, s'arrêter sur ce que le robot constate, et boucler plus vite que ce qui peut surgir." : `${res.essais.filter((e) => e.ok).length} scénario(s) réussi(s) sur 3. ${
            c.perception === 'avant' && c.arret === 'observe' ? "Votre programme ne perçoit qu'une fois, et sa condition d'arrêt lit cette observation du départ : elle ne changera jamais. Comment le programme saurait-il que le robot est arrivé ?"
              : c.perception === 'avant' ? "Votre programme ne perçoit qu'une fois : tout ce qu'il sait date du départ. Un monde qui ne change pas lui suffirait. Dans les scénarios en échec, qu'est-ce qui a changé sans qu'il puisse le constater ?"
              : c.decision === 'plan' ? "Votre programme perçoit à chaque tour, mais sa décision ne lit jamais l'observation : il suit le plan du départ. À quoi sert une perception dont la décision ne tient pas compte ?"
                : c.arret !== 'observe' ? "Le robot décide sur ce qu'il voit, mais la boucle s'arrête sur un compte fait d'avance. Ce compte reste-t-il juste quand les roues glissent, ou quand le robot attend devant un chariot ?"
                  : `Votre boucle est fermée, et le chariot la met pourtant en échec : entre deux perceptions, le robot roule ${F(c.periode, 0)} s sans regarder, alors que le chariot débouche 0,4 s avant le contact. À quelle cadence faut-il boucler pour maîtriser un phénomène aussi rapide ?`}`}</Bilan>
        </>
      )}
    </div>
  );
}

export const ATELIERS_CONCEPTION_M2 = { conception_agent: AtelierAgent, conception_lidar: AtelierLidar, conception_etat: AtelierEtat, conception_boucle: AtelierBoucle };
