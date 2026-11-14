import { Link } from 'react-router-dom';
import { NOTIONS, BLOCS } from '../lecons/notions.js';
import { reinitialiser, useProgression } from '../lecons/progression.js';

const METHODE = [
  ['Situer', "Une situation concrète pose le problème, l'objectif dit ce que vous saurez faire, et le vocabulaire est défini avant d'être utilisé."],
  ['Prédire', "Vous vous engagez sur une réponse avant de voir. Se tromper ici est utile : c'est ce qui rend la suite mémorable."],
  ['Observer', "La démonstration est découpée en étapes courtes, chacune commentée, avec l'endroit précis à regarder. Vous avancez à votre rythme."],
  ['Comprendre', "Un exemple chiffré est résolu pas à pas, puis l'erreur la plus fréquente est nommée pour l'éviter."],
  ["S'exercer", "Une question d'application, puis une question de transfert dans un autre domaine. Chaque réponse reçoit une explication."],
  ['Retenir', "L'idée tient en une phrase, reliée à d'autres domaines et au module où vous la programmerez."],
];

export default function Panorama() {
  const prog = useProgression();
  const acquis = (id) => prog[id]?.application && prog[id]?.transfert;
  const total = NOTIONS.filter((n) => acquis(n.id)).length;
  const suivante = NOTIONS.find((n) => !acquis(n.id)) || NOTIONS[0];
  return (
    <div className="page large">
      <p className="surtitre">Module 0 · Prélude, hors des 12 heures du syllabus</p>
      <h1>Les fondamentaux, pas à pas</h1>
      <p className="chapo">Vingt leçons courtes pour acquérir, sans prérequis en IA, toutes les notions utilisées dans la formation. Comptez 8 à 10 minutes par leçon.</p>

      <div className="deux-colonnes">
        <div className="carte">
          <h3>Votre progression</h3>
          <div className="progression" data-testid="progression"><div style={{ width: `${(total / NOTIONS.length) * 100}%` }} /></div>
          <p className="score"><b>{total}</b> leçon(s) acquise(s) sur {NOTIONS.length}</p>
          <div className="actions">
            <Link className="bouton" to={`/module/0/${suivante.id}`} data-testid="reprendre">{total === 0 ? 'Commencer la première leçon' : total === NOTIONS.length ? 'Revoir les leçons' : `Reprendre : ${suivante.nom}`}</Link>
            {total > 0 && <button className="bouton secondaire" onClick={reinitialiser}>Remettre à zéro</button>}
          </div>
          <p className="conseil">La progression est conservée dans votre navigateur. Une leçon est acquise quand ses deux exercices sont réussis.</p>
        </div>
        <div className="carte">
          <h3>Comment apprendre avec ces leçons</h3>
          <ol className="methode">{METHODE.map(([t, d], k) => <li key={t}><span>{k + 1}</span><div><b>{t}.</b> {d}</div></li>)}</ol>
          <p className="conseil">Cette progression applique des principes établis de conception pédagogique. <Link to="/pedagogie">Méthodes et sources</Link></p>
        </div>
      </div>

      {BLOCS.map((b) => (
        <section key={b.module} id={`bloc-${b.module}`}>
          <h2><span className="etape-cycle">{b.module}</span> {b.titre}</h2>
          <p className="intro">Ces leçons préparent le <Link to={`/module/${b.module}`}>module {b.module}</Link>.</p>
          <div className="cartes">
            {NOTIONS.filter((n) => n.module === b.module).map((n) => (
              <Link key={n.id} to={`/module/0/${n.id}`} className={`carte module lecon-carte ${acquis(n.id) ? 'acquise' : ''}`} data-lecon={n.id}>
                <span className="numero">Leçon {NOTIONS.indexOf(n) + 1}{acquis(n.id) ? ' · acquise ✓' : ''}</span>
                <h4>{n.nom}</h4>
                <p>Vous saurez {n.objectif}.</p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section>
        <h2>Glossaire</h2>
        <p className="intro">Tous les termes définis dans les leçons, dans l'ordre où ils apparaissent.</p>
        <dl className="mots glossaire">{NOTIONS.flatMap((n) => n.mots.map(([m, d]) => <div key={`${n.id}-${m}`}><dt>{m}</dt><dd>{d} <Link to={`/module/0/${n.id}`}>Leçon {NOTIONS.indexOf(n) + 1}</Link></dd></div>))}</dl>
      </section>
    </div>
  );
}
