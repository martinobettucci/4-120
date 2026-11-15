// Encadré « Pourquoi cette solution » : une ligne de la solution de référence, et à côté la raison qui la rend exacte.
// Il s'affiche dans un atelier dès que la construction est validée, que l'apprenant l'ait devinée ou qu'il ait
// utilisé le bouton « Voir la solution ». Les textes sont dans explications.js, une entrée par leçon.
import { EXPLICATIONS } from './explications.js';

export default function Explications({ id, titre = 'Pourquoi cette solution, ligne par ligne' }) {
  const e = EXPLICATIONS[id];
  if (!e) return null;
  return (
    <section className="explications" data-testid="explications" aria-label={titre}>
      <h3>{titre}</h3>
      {e.intro && <p className="intro">{e.intro}</p>}
      <dl>
        {e.lignes.map((l) => (
          <div className="explication" key={l.choix}>
            <dt>{l.choix}</dt>
            <dd>{l.pourquoi}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
