import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as M from '../animations/Mini.jsx';

// Module 0 : toutes les notions des modules 1 à 6, chacune avec son animation,
// son explication, un exemple du fil rouge, un commentaire pédagogique et un exercice.
const BLOCS = [
  { module: 1, titre: 'Décider : trois familles de solutions IA', concepts: [
    { id: 'regles', nom: 'Système à base de règles', anim: M.Regles, duree: 7,
      explication: "Un expert écrit des règles de la forme « si condition alors décision ». Le système les évalue dans l'ordre et applique la première qui se déclenche.",
      exemple: "Le superviseur arrête le robot dès que la température du moteur dépasse 85 °C.",
      commentaire: "Faire remarquer le seuil : à 84,9 °C rien ne se passe, à 85,1 °C tout s'arrête. Cette rigidité est le prix de la lisibilité.",
      q: "À 84 °C, avec une batterie à 60 %, quelle règle s'applique ?", choix: ['R1 : arrêt', 'R2 : ralentir', 'R3 : continuer'], ok: 2, pourquoi: "Aucune condition de R1 ni de R2 n'est remplie : la règle par défaut R3 s'applique." },
    { id: 'bayes', nom: 'Théorème de Bayes et prévalence', anim: M.Bayes, duree: 9,
      explication: "La probabilité d'une cause, une fois un indice observé, dépend de la fiabilité de l'indice mais aussi de la rareté de la cause : P(cause | indice) = P(indice | cause) × P(cause) / P(indice).",
      exemple: "Un test de panne fiable à 90 % se déclenche. Si seuls 5 % des robots sont réellement en panne, la plupart des alertes sont de fausses alertes.",
      commentaire: "C'est le même raisonnement que le diagnostic médical du syllabus. Demander une estimation à main levée avant de lancer l'animation : l'intuition donne souvent 90 %.",
      q: "Si la prévalence des pannes passe de 5 % à 50 %, la probabilité d'une vraie panne après un test positif…", choix: ['baisse', 'ne change pas', 'augmente fortement'], ok: 2, pourquoi: "Plus la cause est fréquente, moins les fausses alertes pèsent : à 50 % de prévalence, on dépasse 90 %." },
    { id: 'reseau', nom: 'Réseau bayésien', anim: M.Reseau, duree: 8,
      explication: "Un graphe relie des causes à leurs effets, avec une table de probabilités par nœud. Observer un effet modifie la probabilité des causes, puis celle des autres effets.",
      exemple: "Une vibration anormale rend l'usure plus probable, ce qui rend la surchauffe plus probable à son tour.",
      commentaire: "Insister sur le sens de circulation : l'information remonte de l'effet vers la cause, puis redescend vers les autres effets.",
      q: "On observe une vibration. Que devient la probabilité de surchauffe ?", choix: ['Elle baisse', 'Elle reste identique', 'Elle augmente'], ok: 2, pourquoi: "La vibration renforce l'hypothèse d'usure, cause commune de la vibration et de la surchauffe." },
    { id: 'supervise', nom: 'Apprentissage supervisé', anim: M.Supervise, duree: 8,
      explication: "Le modèle apprend à partir d'exemples étiquetés. À chaque passage, il ajuste ses paramètres pour réduire son erreur, jusqu'à séparer correctement les classes.",
      exemple: "À partir de milliers d'états passés du robot et de la bonne décision associée, un réseau de neurones apprend la frontière entre « continuer » et « arrêter ».",
      commentaire: "Souligner que personne n'a écrit la frontière : elle vient des données. Si les données changent (nouveau robot, nouveau sol), elle peut devenir fausse.",
      q: "Le modèle rencontre un cas très différent de ses données d'entraînement. Sa réponse est…", choix: ['fiable, il a généralisé', 'incertaine, il extrapole', 'impossible, il refuse de répondre'], ok: 1, pourquoi: "Un modèle supervisé répond toujours, mais hors de sa distribution d'entraînement rien ne garantit la qualité de la réponse." },
  ] },
  { module: 2, titre: "L'agent et son environnement", concepts: [
    { id: 'agent', nom: 'Agent et environnement', anim: M.AgentEnv, duree: 5,
      explication: "Un agent intelligent perçoit son environnement par des capteurs et agit sur lui par des effecteurs, en vue d'un objectif.",
      exemple: "Le robot (agent) perçoit l'entrepôt (environnement) par son lidar et agit par ses roues. Un thermostat connecté suit le même schéma.",
      commentaire: "Faire identifier capteurs, effecteurs et objectif sur deux ou trois systèmes connus des participants.",
      q: "Pour un thermostat connecté, quel est l'effecteur ?", choix: ['La sonde de température', 'La commande du chauffage', 'La consigne choisie par l\'utilisateur'], ok: 1, pourquoi: "La sonde est le capteur, la consigne est l'objectif, la commande du chauffage est le moyen d'agir." },
    { id: 'lidar', nom: 'Capteurs : le lidar', anim: M.Lidar, duree: 7,
      explication: "Le lidar émet des rayons et mesure la distance au premier obstacle. Au-delà de sa portée, il ne rapporte rien.",
      exemple: "Le robot de la formation dispose de 8 rayons d'une portée de 5 cellules.",
      commentaire: "Faire constater ce que le robot ne voit pas : tout ce qui est derrière un obstacle ou hors de portée.",
      q: "Un rayon retourne la distance 1. Cela signifie que…", choix: ['la voie est libre', 'la cellule voisine est occupée', 'le capteur est en panne'], ok: 1, pourquoi: "La distance 1 désigne la cellule immédiatement adjacente : le robot ne peut pas avancer dans cette direction." },
    { id: 'etat', nom: 'État réel et observation', anim: M.EtatObs, duree: 6,
      explication: "L'état réel est la situation exacte du monde. L'observation est ce que les capteurs en rapportent : une vue partielle, entachée de bruit.",
      exemple: "Une palette est réellement en (6, 1), mais le lidar bruité la situe tantôt une cellule plus loin, tantôt plus près.",
      commentaire: "Notion pivot de toute la formation : l'agent ne décide jamais sur l'état réel. Les modules 5 et 6 en découlent.",
      q: "Sur quoi l'agent fonde-t-il sa décision ?", choix: ['Sur l\'état réel', 'Sur son observation', 'Sur l\'état réel et l\'observation'], ok: 1, pourquoi: "L'état réel lui est inaccessible : il ne dispose que de ce que ses capteurs lui transmettent." },
    { id: 'boucle', nom: 'Boucle perception, décision, action', anim: M.Boucle, duree: 6,
      explication: "L'agent perçoit, décide, agit, puis recommence. Chaque action modifie l'environnement, donc la perception suivante.",
      exemple: "À chaque pas de temps, le robot lit son lidar, choisit une direction, avance d'une cellule.",
      commentaire: "Préparer la suite : une erreur à une étape se corrige à la suivante seulement si la boucle reste fermée.",
      q: "Pourquoi répéter la boucle à chaque pas de temps ?", choix: ['Pour consommer moins d\'énergie', 'Parce que l\'environnement change', 'Pour mémoriser la carte'], ok: 1, pourquoi: "Les actions du robot et les obstacles mobiles modifient la situation : une décision ancienne n'est plus forcément valable." },
  ] },
  { module: 3, titre: "Trois architectures d'agents", concepts: [
    { id: 'reactif', nom: 'Architecture réactive', anim: M.Reactif, duree: 8,
      explication: "Des règles relient directement la perception à l'action. Pas de carte, pas de plan : la réaction est immédiate, mais locale.",
      exemple: "« Avancer vers l'objectif tant que la voie est libre » fonctionne en zone dégagée et échoue dans un cul-de-sac.",
      commentaire: "Laisser l'animation tourner jusqu'à l'oscillation, puis demander ce qui manque à l'agent pour en sortir.",
      q: "Que manque-t-il à l'agent réactif pour sortir du cul-de-sac ?", choix: ['Un capteur plus précis', 'Une mémoire ou un plan', 'Des roues plus rapides'], ok: 1, pourquoi: "Il perçoit correctement le mur, mais sans mémoire ni modèle il retombe toujours dans le même minimum local." },
    { id: 'astar', nom: 'Planifier avec A*', anim: M.AEtoile, duree: 9,
      explication: "A* explore la carte en privilégiant les cellules dont le coût déjà parcouru plus la distance restante estimée est le plus faible. Il garantit le plus court chemin.",
      exemple: "Avec la carte de l'entrepôt, l'agent délibératif calcule tout son trajet avant de partir.",
      commentaire: "Montrer que l'exploration ne couvre pas toute la carte : l'heuristique la concentre vers l'objectif.",
      q: "Quelle information A* utilise-t-il que l'agent réactif n'a pas ?", choix: ['La carte de l\'environnement', 'La vitesse du robot', 'Le bruit du lidar'], ok: 0, pourquoi: "A* travaille sur un modèle du monde. Si ce modèle est faux ou périmé, le plan l'est aussi." },
    { id: 'hybride', nom: 'Architecture hybride', anim: M.Hybride, duree: 9,
      explication: "Une couche délibérative fixe le plan à long terme, une couche réactive surveille les capteurs et impose une replanification quand le monde contredit le plan.",
      exemple: "Une palette tombe sur le trajet : le lidar la détecte, le plan est recalculé depuis la position courante.",
      commentaire: "Faire le lien avec les deux échecs précédents : l'hybride corrige la myopie du réactif et la rigidité du délibératif.",
      q: "Dans l'agent hybride, qui a le dernier mot avant un mouvement ?", choix: ['Le plan initial', 'La couche réactive', 'Le hasard'], ok: 1, pourquoi: "La couche réactive peut bloquer un mouvement prévu par le plan si le lidar signale un obstacle." },
  ] },
  { module: 4, titre: 'Optimiser sous contraintes', concepts: [
    { id: 'espace', nom: 'Espace de recherche et fonction de coût', anim: M.Espace, duree: 7,
      explication: "Chaque solution candidate reçoit un coût. Optimiser, c'est chercher la solution de coût minimal dans l'ensemble des candidates.",
      exemple: "Chaque ordre de visite des stations est une solution, la distance totale parcourue est son coût.",
      commentaire: "Faire calculer 9! de tête ou presque : l'explosion combinatoire justifie tout le module.",
      q: "On passe de 9 à 10 stations. Le nombre d'ordres possibles est multiplié par…", choix: ['2', '10', '100'], ok: 1, pourquoi: "10! = 10 × 9! : chaque station supplémentaire multiplie l'espace par le nombre de stations." },
    { id: 'contraintes', nom: 'Programmation sous contraintes', anim: M.Contraintes, duree: 10,
      explication: "On décrit des variables, leurs domaines et les contraintes à respecter. Le solveur construit une solution pas à pas et revient en arrière dès qu'une contrainte n'est plus respectée.",
      exemple: "Placer 4 bornes de recharge sans interférence. Dans le notebook 04, le même principe ordonne les collectes avec des fenêtres de temps.",
      commentaire: "Faire observer que le retour arrière élimine des familles entières de solutions sans les énumérer.",
      q: "Pourquoi le retour arrière est-il plus rapide qu'une énumération complète ?", choix: ['Il utilise le GPU', 'Il abandonne tôt les branches sans issue', 'Il tire les solutions au hasard'], ok: 1, pourquoi: "Dès qu'un placement partiel enfreint une contrainte, toutes les solutions qui le prolongent sont écartées d'un coup." },
    { id: 'recuit', nom: 'Recuit simulé', anim: M.Recuit, duree: 9,
      explication: "On modifie légèrement la solution courante. Une amélioration est toujours acceptée, une dégradation Δ l'est avec la probabilité exp(-Δ / T). La température T décroît peu à peu.",
      exemple: "Échanger deux stations dans la tournée, accepter parfois un trajet plus long au début pour en trouver un meilleur ensuite.",
      commentaire: "Comparer avec une bille qu'on secoue de moins en moins fort. Sans secousse, elle reste dans le premier creux.",
      q: "Que se passe-t-il si la température baisse trop vite ?", choix: ['La solution est toujours optimale', 'La recherche se fige dans un minimum local', 'Le calcul ne se termine pas'], ok: 1, pourquoi: "Sans phase d'exploration suffisante, l'algorithme se comporte comme une simple descente et reste dans le premier creux." },
  ] },
  { module: 5, titre: "Rester autonome dans l'incertitude", concepts: [
    { id: 'croyance', nom: 'Croyance et filtre bayésien', anim: M.Croyance, duree: 10,
      explication: "Faute de connaître sa position, le robot entretient une distribution de probabilité sur les positions possibles. Un déplacement l'étale (prédiction), une mesure la resserre (correction).",
      exemple: "Après « porte, une cellule, mur », une seule position reste plausible dans le couloir.",
      commentaire: "Relier au théorème de Bayes du module 1 : c'est la même formule, appliquée à chaque pas de temps.",
      q: "Quel événement augmente l'incertitude du robot sur sa position ?", choix: ['Une mesure du lidar', 'Un déplacement', 'Un arrêt'], ok: 1, pourquoi: "Les roues peuvent glisser : après un mouvement, la position est moins certaine. La mesure, elle, réduit l'incertitude." },
    { id: 'qlearning', nom: 'Apprentissage par renforcement (Q-learning)', anim: M.QLearning, duree: 9,
      explication: "L'agent apprend par essais et erreurs la valeur de chaque action dans chaque situation. La récompense obtenue à l'objectif se propage vers les situations qui y mènent.",
      exemple: "Des centaines de robots simulés explorent l'entrepôt en parallèle et remplissent une même table de valeurs.",
      commentaire: "Faire lire la politique : il suffit de suivre les flèches. Aucune carte n'a été fournie, seulement des récompenses.",
      q: "Que représentent les flèches une fois l'apprentissage terminé ?", choix: ['La carte de l\'entrepôt', 'La politique : la meilleure action par cellule', 'Les erreurs du capteur'], ok: 1, pourquoi: "Dans chaque cellule, la flèche pointe vers le voisin de plus grande valeur : c'est la politique apprise." },
    { id: 'exploration', nom: 'Exploration et exploitation', anim: M.Exploration, duree: 8,
      explication: "Explorer, c'est essayer des actions incertaines pour apprendre. Exploiter, c'est choisir la meilleure action connue. Le paramètre ε règle la part d'exploration et diminue au fil de l'apprentissage.",
      exemple: "Au début, le robot essaie tous les couloirs. Ensuite, il emprunte presque toujours le meilleur.",
      commentaire: "Faire le parallèle avec la température du recuit simulé : les deux mécanismes laissent d'abord explorer, puis stabilisent.",
      q: "Avec ε = 0 dès le début de l'apprentissage, l'agent risque de…", choix: ['explorer sans fin', 'répéter une action médiocre sans découvrir mieux', 'oublier ce qu\'il a appris'], ok: 1, pourquoi: "Sans exploration, il s'en tient à la première action qui a rapporté quelque chose, même si une meilleure existe." },
  ] },
  { module: 6, titre: 'Tester et valider', concepts: [
    { id: 'confiance', nom: 'Distribution des résultats et intervalle de confiance', anim: M.Confiance, duree: 9,
      explication: "Un agent soumis à des aléas ne produit pas un résultat mais une distribution. Le taux de réussite mesuré s'accompagne d'un intervalle de confiance, qui se resserre quand le nombre de simulations augmente.",
      exemple: "82 % de réussite sur 10 simulations ne dit presque rien. Sur 2 000 simulations, l'intervalle tient en quelques points.",
      commentaire: "Demander combien de démonstrations réussies il faudrait pour être convaincu, puis montrer la largeur de l'intervalle à n = 10.",
      q: "Pour diviser par deux la largeur de l'intervalle, il faut multiplier le nombre de simulations par…", choix: ['2', '4', '10'], ok: 1, pourquoi: "La largeur varie comme 1 / √n : il faut quatre fois plus de simulations." },
    { id: 'robustesse', nom: 'Robustesse', anim: M.Robustesse, duree: 8,
      explication: "Un agent robuste voit ses performances se dégrader progressivement quand les conditions s'éloignent du nominal. Un agent fragile s'effondre au-delà d'un seuil.",
      exemple: "On augmente pas à pas le bruit des capteurs, le glissement et le nombre d'obstacles mobiles, et on mesure le taux de réussite à chaque niveau.",
      commentaire: "Faire remarquer que les deux agents sont indiscernables en conditions nominales : seul le test en conditions dégradées les départage.",
      q: "Deux agents atteignent 99 % en conditions nominales. Que peut-on en conclure sur leur robustesse ?", choix: ['Ils sont aussi robustes l\'un que l\'autre', 'Rien sans tests en conditions dégradées', 'Le plus rapide est le plus robuste'], ok: 1, pourquoi: "La robustesse se mesure hors du nominal, niveau de perturbation par niveau de perturbation." },
    { id: 'graine', nom: 'Reproductibilité et rejeu', anim: M.Graine, duree: 8,
      explication: "Une graine aléatoire fixe la suite des tirages. Avec la même graine et les mêmes paramètres, une simulation se rejoue à l'identique.",
      exemple: "Chaque trace de la formation enregistre sa graine : un échec observé en campagne peut être rejoué étape par étape dans la scène 3D.",
      commentaire: "Règle pratique à faire retenir : pas de résultat sans sa graine et ses paramètres.",
      q: "Un échec survient une fois sur mille. Comment l'étudier ?", choix: ['Relancer jusqu\'à ce qu\'il réapparaisse', 'Rejouer la simulation avec la graine enregistrée', 'L\'ignorer, il est trop rare'], ok: 1, pourquoi: "La graine enregistrée reproduit exactement la même exécution, autant de fois que nécessaire." },
  ] },
];
const TOTAL = BLOCS.reduce((n, b) => n + b.concepts.length, 0);

function MiniAnimation({ anim, duree }) {
  const [t, setT] = useState(0);
  const [lecture, setLecture] = useState(true);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!lecture || !visible) return undefined;
    let dernier = performance.now(); let raf;
    const tic = (m) => { const dt = Math.max(0, (m - dernier) / 1000); dernier = m; setT((v) => (v + dt / (duree * 1.15)) % 1); raf = requestAnimationFrame(tic); };
    raf = requestAnimationFrame(tic);
    return () => cancelAnimationFrame(raf);
  }, [lecture, visible, duree]);
  // Une courte pause en fin de boucle laisse lire le résultat.
  const p = Math.min(1, t * 1.15);
  return (
    <div className="mini" ref={ref}>
      <div className="mini-scene">{anim(Math.min(p, 0.9999))}</div>
      <div className="mini-commandes">
        <button onClick={() => setLecture(!lecture)} aria-label={lecture ? 'Pause' : 'Lecture'}>{lecture ? '❚❚' : '▶'}</button>
        <input type="range" min="0" max="0.869" step="0.001" value={Math.min(t, 0.869)} onChange={(e) => { setLecture(false); setT(Number(e.target.value)); }} aria-label="Position dans l'animation" />
      </div>
    </div>
  );
}

function Exercice({ c, reponse, surReponse }) {
  return (
    <div className="exercice">
      <p className="question"><b>Exercice.</b> {c.q}</p>
      <div className="choix">
        {c.choix.map((txt, i) => {
          const classe = reponse === undefined ? '' : i === c.ok ? 'juste' : i === reponse ? 'faux' : '';
          return <button key={txt} className={classe} onClick={() => surReponse(i)} disabled={reponse !== undefined && reponse === c.ok}>{txt}</button>;
        })}
      </div>
      {reponse !== undefined && <p className={`retour ${reponse === c.ok ? 'juste' : 'faux'}`}>{reponse === c.ok ? 'Exact. ' : 'Pas tout à fait. '}{c.pourquoi}</p>}
    </div>
  );
}

export default function Panorama() {
  const [reponses, setReponses] = useState({});
  const justes = BLOCS.flatMap((b) => b.concepts).filter((c) => reponses[c.id] === c.ok).length;
  let numero = 0;
  return (
    <div className="page large">
      <p className="surtitre">Module 0 · Prélude, hors des 12 heures du syllabus</p>
      <h1>Panorama des concepts</h1>
      <p className="chapo">Les {TOTAL} notions de la formation, dans l'ordre des modules. Chacune tient en une animation, une explication, un exemple du fil rouge, un commentaire pour l'animation en salle et un exercice.</p>
      <div className="carte mode-emploi">
        <h3>Mode d'emploi</h3>
        <p>À parcourir avant la session, ou en ouverture de chaque demi-journée pour installer le vocabulaire. Chaque animation tourne en boucle : le bouton la met en pause, le curseur permet de s'arrêter sur un instant précis pour le commenter. Les exercices donnent un retour immédiat.</p>
        <div className="progression" data-testid="progression"><div style={{ width: `${(justes / TOTAL) * 100}%` }} /></div>
        <p className="score"><b>{justes}</b> exercice(s) réussi(s) sur {TOTAL}</p>
        <nav className="sommaire">{BLOCS.map((b) => <a key={b.module} href={`#/module/0`} onClick={(e) => { e.preventDefault(); document.getElementById(`bloc-${b.module}`).scrollIntoView({ behavior: 'smooth' }); }}><b>{b.module}</b> {b.titre}</a>)}</nav>
      </div>
      {BLOCS.map((b) => (
        <section key={b.module} id={`bloc-${b.module}`}>
          <h2><span className="etape-cycle">{b.module}</span> {b.titre}</h2>
          <p className="intro">Notions approfondies dans le <Link to={`/module/${b.module}`}>module {b.module}</Link>.</p>
          {b.concepts.map((c) => {
            numero += 1;
            return (
              <article className="concept" key={c.id} id={c.id}>
                <MiniAnimation anim={c.anim} duree={c.duree} />
                <div className="concept-texte">
                  <span className="numero">Notion {numero} sur {TOTAL}</span>
                  <h3>{c.nom}</h3>
                  <p>{c.explication}</p>
                  <p className="exemple"><b>Exemple.</b> {c.exemple}</p>
                  <p className="commentaire"><b>Commentaire pour la salle.</b> {c.commentaire}</p>
                  <Exercice c={c} reponse={reponses[c.id]} surReponse={(i) => setReponses({ ...reponses, [c.id]: i })} />
                </div>
              </article>
            );
          })}
        </section>
      ))}
      <nav className="suite"><span /><Link className="bouton" to="/module/1">Module 1 : Solutions IA pour la prise de décision →</Link></nav>
    </div>
  );
}
