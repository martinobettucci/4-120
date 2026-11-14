import { Link, useParams } from 'react-router-dom';
import { MODULES } from '../modules.js';
import { useJSON } from '../composants/outils.jsx';
import Lecteur3D from '../composants/Lecteur3D.jsx';
import { LiensNotebook } from './Notebooks.jsx';
import AnimM1 from '../animations/AnimM1.jsx';
import AnimM2 from '../animations/AnimM2.jsx';
import AnimM3 from '../animations/AnimM3.jsx';
import AnimM4 from '../animations/AnimM4.jsx';
import AnimM5 from '../animations/AnimM5.jsx';
import AnimM6 from '../animations/AnimM6.jsx';

const ANIMS = { 1: AnimM1, 2: AnimM2, 3: AnimM3, 4: AnimM4, 5: AnimM5, 6: AnimM6 };

export default function Module() {
  const { n } = useParams();
  const m = MODULES.find((x) => String(x.n) === n) || MODULES[0];
  const Anim = ANIMS[m.n];
  const { donnees: index } = useJSON('traces/index.json');
  const catalogue = m.scene && index ? index.filter((t) => m.scene.traces.includes(t.id)) : null;
  return (
    <div className="page large" key={m.n}>
      <p className="surtitre">Jour {m.jour} · Module {m.n} · {m.horaire} · 2 heures</p>
      <h1>{m.titre}</h1>

      <div className="deux-colonnes">
        <section className="carte probleme">
          <h3><span className="etape-cycle">1</span> Le problème</h3>
          <p>{m.probleme}</p>
        </section>
        <section className="carte">
          <h3>Contenu du syllabus</h3>
          <ul>{m.syllabus.map((s) => <li key={s}>{s}</li>)}</ul>
          <p className="tp"><b>Travaux pratiques :</b> {m.tp}</p>
        </section>
      </div>

      <section>
        <h2><span className="etape-cycle">2</span> Animation explicative</h2>
        <p className="intro">Séquences courtes, à commenter en direct. Espace : lecture ou pause. Flèches gauche et droite : étape précédente ou suivante.</p>
        <Anim />
      </section>

      {m.scene && (
        <section>
          <h2><span className="etape-cycle">3</span> Décomposition dans la scène 3D</h2>
          <p className="intro">{m.scene.consigne}</p>
          {catalogue ? <Lecteur3D catalogue={catalogue} initialA={m.scene.a} initialB={m.scene.b} /> : <p>Chargement…</p>}
        </section>
      )}

      <section>
        <h2><span className="etape-cycle">{m.scene ? 4 : 3}</span> Travaux pratiques : le notebook</h2>
        <div className="carte notebook">
          <span className="numero">75 minutes · notebook {m.notebook}.ipynb</span>
          <ul>{m.notebookPoints.map((p) => <li key={p}>{p}</li>)}</ul>
          <LiensNotebook nb={m.notebook} />
        </div>
      </section>

      <section>
        <h2><span className="etape-cycle">{m.scene ? 5 : 4}</span> Synthèse</h2>
        <ul className="synthese">{m.synthese.map((s) => <li key={s}>{s}</li>)}</ul>
      </section>

      <nav className="suite">
        {m.n > 1 ? <Link to={`/module/${m.n - 1}`}>← Module {m.n - 1}</Link> : <span />}
        {m.n < 6 ? <Link className="bouton" to={`/module/${m.n + 1}`}>Module {m.n + 1} : {MODULES[m.n].titre} →</Link> : <Link className="bouton" to="/atelier">Atelier 3D →</Link>}
      </nav>
    </div>
  );
}
