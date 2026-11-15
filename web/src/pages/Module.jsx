import { Link, useParams } from 'react-router-dom';
import { MODULES } from '../modules.js';
import { useJSON } from '../composants/outils.jsx';
import Lecteur3D from '../composants/Lecteur3D.jsx';
import { LiensNotebook } from './Notebooks.jsx';
import { PEDAGOGIE } from '../lecons/modules-pedagogie.js';
import { notion } from '../lecons/notions.js';
import Qcm from '../composants/Qcm.jsx';
import Theorie from '../composants/Theorie.jsx';
import Definition from '../composants/Definition.jsx';
import { NOTIONS } from '../lecons/notions.js';
import { useState } from 'react';
import AnimM1 from '../animations/AnimM1.jsx';
import AnimM2 from '../animations/AnimM2.jsx';
import AnimM3 from '../animations/AnimM3.jsx';
import AnimM4 from '../animations/AnimM4.jsx';
import AnimM5 from '../animations/AnimM5.jsx';
import AnimM6 from '../animations/AnimM6.jsx';
import AnimM7 from '../animations/AnimM7.jsx';

const ANIMS = { 1: AnimM1, 2: AnimM2, 3: AnimM3, 4: AnimM4, 5: AnimM5, 6: AnimM6, 7: AnimM7 };

function Mission({ etapes }) {
  const [vues, setVues] = useState([]);
  return (
    <ol className="mission">
      {etapes.map((e, i) => (
        <li key={e.question}>
          <p><b>À faire.</b> {e.faire}</p>
          <p><b>Question.</b> {e.question}</p>
          {vues.includes(i) ? <p className="reponse"><b>Explication.</b> {e.reponse}</p> : <button className="lien" onClick={() => setVues([...vues, i])}>J'ai observé, afficher l'explication</button>}
        </li>
      ))}
    </ol>
  );
}

export default function Module() {
  const { n } = useParams();
  const m = MODULES.find((x) => String(x.n) === n) || MODULES[0];
  const Anim = ANIMS[m.n];
  const ped = PEDAGOGIE[m.n];
  const { donnees: index } = useJSON('traces/index.json');
  const catalogue = m.scene && index ? index.filter((t) => m.scene.traces.includes(t.id)) : null;
  return (
    <div className="page large" key={m.n}>
      <p className="surtitre">{m.jour ? `Jour ${m.jour} · Module ${m.n} · ${m.horaire} · 2 heures` : `Module ${m.n} · ${m.horaire}`}</p>
      <h1>{m.titre}</h1>

      <div className="deux-colonnes">
        <section className="carte">
          <h3>À la fin de ce module, vous saurez</h3>
          <ul className="objectifs">{ped.objectifs.map((o) => <li key={o}>{o}</li>)}</ul>
        </section>
        <section className="carte">
          <h3>Ce qu'il faut connaître avant</h3>
          <p className="conseil">Chaque notion a sa leçon guidée dans le module 0. Si l'une d'elles vous est nouvelle, commencez par là.</p>
          <div className="prerequis">{ped.prerequis.map((id) => <Link key={id} to={`/module/0/${id}`}>{notion(id).nom}</Link>)}</div>
        </section>
      </div>

      <div className="deux-colonnes">
        <section className="carte probleme">
          <h3><span className="etape-cycle">1</span> Le problème</h3>
          <p>{m.probleme}</p>
        </section>
        <section className="carte">
          <h3>{m.jour ? 'Contenu du syllabus' : 'Contenu du module'}</h3>
          <ul>{m.syllabus.map((s) => <li key={s}>{s}</li>)}</ul>
          <p className="tp"><b>Travaux pratiques :</b> {m.tp}</p>
        </section>
      </div>

      <section>
        <h2>Le cours du module</h2>
        <p className="intro">La théorie de chaque notion, à déplier. Chaque leçon complète ajoute une démonstration commentée, un exemple résolu et un atelier où vous construisez vous-même.</p>
        {NOTIONS.filter((x) => x.module === m.n).map((x) => (
          <details className="cours-notion" key={x.id}>
            <summary><b>{x.nom}</b><span>Atelier : {x.atelier.titre}</span></summary>
            <Definition d={x.definition} />
            <Theorie blocs={x.theorie} />
            <p><Link className="bouton secondaire" to={`/module/0/${x.id}`}>Leçon complète et atelier →</Link></p>
          </details>
        ))}
      </section>

      <section>
        <h2><span className="etape-cycle">2</span> Animation explicative</h2>
        <p className="intro">Séquences courtes, à commenter en direct. Espace : lecture ou pause. Flèches gauche et droite : étape précédente ou suivante.</p>
        <p className="avant"><b>Avant de regarder.</b> {ped.avant}</p>
        <Anim />
      </section>

      {m.scene && (
        <section>
          <h2><span className="etape-cycle">3</span> Décomposition dans la scène 3D</h2>
          <p className="intro">{m.scene.consigne}</p>
          {catalogue ? <Lecteur3D catalogue={catalogue} initialA={m.scene.a} initialB={m.scene.b} /> : <p>Chargement…</p>}
          <div className="carte">
            <h3>Mission d'observation</h3>
            <p className="conseil">Pour chaque point : faites la manipulation, répondez à la question pour vous-même, puis affichez l'explication.</p>
            <Mission etapes={ped.mission} />
          </div>
        </section>
      )}

      <section>
        <h2><span className="etape-cycle">{m.scene ? 4 : 3}</span> Travaux pratiques : le notebook</h2>
        <div className="carte notebook">
          <span className="numero">{m.dureeTp || '75 minutes'} · notebook {m.notebook}.ipynb</span>
          <p className="conseil"><b>Méthode de travail.</b> Pour chaque partie : lisez l'explication, prédisez le résultat de la cellule avant de l'exécuter, exécutez, puis modifiez un paramètre et expliquez ce qui change. Dans les exercices, essayez seul, puis consultez l'indice, et seulement ensuite la solution.</p>
          <ul>{m.notebookPoints.map((p) => <li key={p}>{p}</li>)}</ul>
          <LiensNotebook nb={m.notebook} />
        </div>
      </section>

      <section>
        <h2><span className="etape-cycle">{m.scene ? 5 : 4}</span> Vérifiez vos acquis</h2>
        <p className="intro">Trois questions sans regarder vos notes. Chaque réponse reçoit une explication.</p>
        <div className="carte quiz">{ped.quiz.map((x) => <Qcm key={x.q} {...x} etiquette="Question" />)}</div>
        <h3 className="sous-titre">Erreurs fréquentes</h3>
        <ul className="pieges">{ped.pieges.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>

      <section>
        <h2><span className="etape-cycle">{m.scene ? 6 : 5}</span> Synthèse</h2>
        <ul className="synthese">{m.synthese.map((s) => <li key={s}>{s}</li>)}</ul>
        {ped.suite && (
          <div className="carte">
            <h3>Pour aller plus loin : du robot seul au système d'agents</h3>
            <p className="conseil">Ces leçons du <Link to="/module/7">module 7</Link> prolongent ce module vers les systèmes à plusieurs décideurs.</p>
            <div className="prerequis suite-agentique">{ped.suite.map((id) => <Link key={id} to={`/module/0/${id}`}>{notion(id).nom}</Link>)}</div>
          </div>
        )}
      </section>

      <nav className="suite">
        <Link to={`/module/${m.n - 1}`}>← Module {m.n - 1}</Link>
        {m.n < MODULES.length ? <Link className="bouton" to={`/module/${m.n + 1}`}>Module {m.n + 1} : {MODULES[m.n].titre} →</Link> : <Link className="bouton" to="/atelier">Atelier 3D →</Link>}
      </nav>
    </div>
  );
}
