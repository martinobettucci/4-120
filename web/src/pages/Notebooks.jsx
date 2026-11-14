import { MODULES, lienColab } from '../modules.js';

export function LiensNotebook({ nb }) {
  return (
    <div className="actions">
      <a className="bouton" href={`notebooks/${nb}.html`} target="_blank" rel="noreferrer">Lire le notebook exécuté</a>
      <a className="bouton secondaire" href={`notebooks/${nb}.ipynb`} download>Télécharger le fichier .ipynb</a>
      <a className="bouton secondaire" href={lienColab(nb)} target="_blank" rel="noreferrer">Ouvrir dans Colab</a>
    </div>
  );
}

export default function Notebooks() {
  return (
    <div className="page">
      <p className="surtitre">Travaux pratiques</p>
      <h1>Notebooks</h1>
      <p className="intro">Six notebooks Jupyter, un par module. Chacun s'exécute du début à la fin, détecte le GPU, fonctionne aussi sur CPU, fixe ses graines aléatoires et embarque ses résultats pré-calculés.</p>
      <div className="carte">
        <h3>Installation</h3>
        <p>Sur un poste équipé de Docker, depuis le dépôt : <code>./runDev.sh</code> lance JupyterLab sur le port 8888 et ce site sur le port 5173, sans aucune autre installation.</p>
        <p>Sur Colab ou un autre environnement, la première cellule de chaque notebook installe la bibliothèque de la formation :</p>
        <pre><code>pip install "ascent-agents[complet] @ https://martinobettucci.github.io/4-120/dist/ascent_agents-1.0.0-py3-none-any.whl"</code></pre>
        <p>Dépendances : Python 3.10 ou plus, NumPy, Matplotlib, PyTorch, OR-Tools, SciPy, pandas. Les versions exactes sont figées dans <code>docker/requirements.txt</code>.</p>
      </div>
      {MODULES.map((m) => (
        <div className="carte notebook" key={m.n}>
          <span className="numero">Module {m.n} · Jour {m.jour}</span>
          <h3>{m.titre}</h3>
          <ul>{m.notebookPoints.map((p) => <li key={p}>{p}</li>)}</ul>
          <LiensNotebook nb={m.notebook} />
        </div>
      ))}
    </div>
  );
}
