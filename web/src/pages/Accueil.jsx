import { Link } from 'react-router-dom';
import { MODULES } from '../modules.js';
import Lecteur3D from '../composants/Lecteur3D.jsx';

const CYCLE = ['Problème', 'Animation explicative', 'Décomposition 3D', 'Algorithme et code', 'Notebook', 'Simulation', 'Paramètres', 'Résultats', 'Synthèse'];
const VITRINE = [{ id: 'm3_hybride_entrepot', titre: 'Agent hybride, palette imprévue', monde: 'entrepot' }, { id: 'm5_robuste', titre: 'Agent robuste, capteurs bruités', monde: 'entrepot' }, { id: 'm3_reactif_piege', titre: 'Agent réactif, cul-de-sac en U', monde: 'piege' }];

export default function Accueil() {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="surtitre">ASCENT, Lot 4, référence 4-130 · 16 et 17 novembre 2026 · 12 heures</p>
          <h1>Les agents autonomes<br />et aide à la décision</h1>
          <p className="chapo">Deux jours pour concevoir, optimiser et valider des agents intelligents, autour d'un fil rouge : un robot autonome dans un entrepôt logistique simulé. Chaque concept est expliqué par une animation, décomposé dans une scène 3D, puis expérimenté dans un notebook Python.</p>
          <div className="actions">
            <Link className="bouton" to="/module/0">Commencer par les fondamentaux</Link>
            <Link className="bouton secondaire" to="/module/1">Jour 1</Link>
            <Link className="bouton secondaire" to="/syllabus">Lire le syllabus officiel</Link>
          </div>
          <ul className="chiffres">
            <li><b>6</b> modules de 2 heures</li>
            <li><b>62,5 %</b> de travaux pratiques</li>
            <li><b>6</b> notebooks GPU et CPU</li>
            <li><b>17</b> traces rejouables en 3D</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Le fil rouge en action</h2>
        <p className="intro">Le robot perçoit par son lidar (rayons jaunes), suit un plan (pastilles vertes) et le révise quand un obstacle imprévu apparaît. Lancez la lecture, mettez en pause, avancez étape par étape : le panneau de droite explique chaque décision.</p>
        <Lecteur3D catalogue={VITRINE} initialA="m3_hybride_entrepot" hauteur={460} />
      </section>

      <section>
        <h2>Programme</h2>
        <Link to="/module/0" className="carte module zero">
          <span className="numero">Module 0 · Prélude</span>
          <h4>Les fondamentaux, pas à pas</h4>
          <p>Vingt leçons guidées pour qui découvre le sujet : une situation, une prédiction, une démonstration commentée étape par étape, un exemple résolu, des exercices corrigés. Aucun prérequis en IA.</p>
        </Link>
        {[1, 2].map((jour) => (
          <div key={jour}>
            <h3 className="jour">Jour {jour} : {jour === 1 ? 'Introduction aux agents intelligents et solutions IA' : 'Optimisation et autonomie des systèmes robotisés'} <small>6 heures</small></h3>
            <div className="cartes">
              {MODULES.filter((m) => m.jour === jour).map((m) => (
                <Link key={m.n} to={`/module/${m.n}`} className="carte module">
                  <span className="numero">Module {m.n}</span>
                  <h4>{m.titre}</h4>
                  <p>{m.court}</p>
                  <span className="horaire">{m.horaire}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2>Le cycle de chaque module</h2>
        <p className="intro">Chaque module dure 2 heures : 45 minutes d'explications et de démonstrations, puis 75 minutes de travaux pratiques. Tous suivent le même cycle.</p>
        <ol className="cycle">{CYCLE.map((c, i) => <li key={c}><span>{i + 1}</span>{c}</li>)}</ol>
      </section>

      <section className="deux-colonnes">
        <div className="carte">
          <h3>Trois supports synchronisés</h3>
          <p>Notebooks, animations et scènes 3D partagent les mêmes exemples et un format commun de traces. Une expérience lancée dans un notebook produit un fichier JSON que l'<Link to="/atelier">atelier 3D</Link> rejoue étape par étape.</p>
        </div>
        <div className="carte">
          <h3>GPU quand il sert, CPU toujours</h3>
          <p>Les notebooks détectent le GPU et l'utilisent pour l'apprentissage, l'inférence et les simulations parallèles. Tout reste exécutable sur CPU, et les résultats pré-calculés sont embarqués dans chaque notebook.</p>
        </div>
      </section>
    </div>
  );
}
