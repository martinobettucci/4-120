import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NOTIONS, BLOCS } from '../lecons/notions.js';
import { RAPPELS } from '../lecons/rappels.js';
import { marquer, useProgression } from '../lecons/progression.js';
import Qcm from '../composants/Qcm.jsx';
import Theorie from '../composants/Theorie.jsx';
import Definition from '../composants/Definition.jsx';
import MotsAnimes from '../composants/MotsAnimes.jsx';
import { ATELIERS } from '../ateliers/index.js';

// Une leçon du module 0. Un bloc 0 pose la notion (définition, origine, liens pour en savoir plus), puis six temps,
// inspirés des principes de Merrill et de Gagné : situer, prédire, observer une démonstration segmentée,
// étudier le cours et un exemple résolu, construire soi-même l'objet étudié dans un atelier, retenir et transférer.
const TEMPS = ['La notion', 'Situer', 'Prédire', 'Observer', 'Le cours', 'Construire', 'Retenir'];

function Demonstration({ n, surFin }) {
  const [k, setK] = useState(0);
  const [t, setT] = useState(0);
  const [lecture, setLecture] = useState(false);
  const [vues, setVues] = useState([]);
  const ref = useRef({});
  const debut = (i) => (i === 0 ? 0 : n.etapes[i - 1].fin);
  ref.current = { k, t };
  useEffect(() => {
    if (vues.length === n.etapes.length) surFin();
  }, [vues, n.etapes.length, surFin]);
  useEffect(() => {
    if (!lecture) return undefined;
    let dernier = performance.now(); let raf;
    const tic = (m) => {
      const dt = Math.max(0, (m - dernier) / 1000); dernier = m;
      const fin = n.etapes[ref.current.k].fin;
      const suivant = ref.current.t + dt / n.duree;
      if (suivant >= fin) {
        setT(fin); setLecture(false);
        setVues((v) => v.includes(ref.current.k) ? v : [...v, ref.current.k]);
        return;
      }
      setT(suivant); raf = requestAnimationFrame(tic);
    };
    raf = requestAnimationFrame(tic);
    return () => cancelAnimationFrame(raf);
  }, [lecture, n, surFin]);
  const jouer = (i) => { setK(i); setT(debut(i)); setLecture(true); };
  const e = n.etapes[k];
  const termine = !lecture && vues.includes(k);
  return (
    <div className="demo">
      <div className="demo-scene">
        <div className="mini-scene">{n.anim(Math.min(t, 0.9999))}</div>
        <div className="demo-commandes">
          <button onClick={() => jouer(k)} className="principal" data-testid="jouer-etape">{lecture ? 'Lecture en cours…' : termine ? '↺ Revoir cette étape' : `▶ Lancer l'étape ${k + 1}`}</button>
          {termine && k < n.etapes.length - 1 && <button onClick={() => jouer(k + 1)} data-testid="etape-suivante">Étape suivante ▶</button>}
          <span className="demo-compteur">Étape {k + 1} sur {n.etapes.length}</span>
        </div>
      </div>
      <ol className="demo-etapes">
        {n.etapes.map((x, i) => (
          <li key={x.titre} className={i === k ? 'active' : vues.includes(i) ? 'vue' : ''}>
            <button onClick={() => jouer(i)}><span>{i + 1}</span>{x.titre}</button>
            {i === k && (
              <div className="narration">
                <p>{x.texte}</p>
                <p className="regard"><b>Regardez :</b> {x.regard}</p>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ExempleResolu({ ex }) {
  const [vus, setVus] = useState(1);
  const fini = vus > ex.pas.length;
  return (
    <div className="exemple-resolu">
      <p className="enonce"><b>Exemple résolu.</b> {ex.enonce}</p>
      <ol>
        {ex.pas.slice(0, vus).map((p) => <li key={p}>{p}</li>)}
      </ol>
      {fini ? <p className="resultat"><b>Résultat.</b> {ex.resultat}</p> : (
        <button className="bouton secondaire" onClick={() => setVus(vus + 1)} data-testid="pas-suivant">{vus < ex.pas.length ? 'Afficher le pas suivant' : 'Afficher le résultat'}</button>
      )}
      {!fini && <p className="conseil">Avant de cliquer, essayez de trouver vous-même le pas suivant.</p>}
    </div>
  );
}

export default function Lecon() {
  const { id } = useParams();
  const i = Math.max(0, NOTIONS.findIndex((x) => x.id === id));
  const n = NOTIONS[i];
  const prog = useProgression();
  const [temps, setTemps] = useState(0);
  const [tout, setTout] = useState(false);
  const [pari, setPari] = useState(undefined);
  const [demoVue, setDemoVue] = useState(false);
  useEffect(() => { setTemps(0); setPari(undefined); setDemoVue(false); }, [id]);
  const rappel = RAPPELS[n.id];
  const bloc = BLOCS.find((b) => b.module === n.module);
  const visible = (k) => tout || temps === k;
  const AtelierCourant = ATELIERS[n.atelier.type];
  const Suite = ({ vers, texte, inactif }) => <button className="bouton" disabled={inactif} onClick={() => { setTemps(vers); window.scrollTo({ top: 0, behavior: 'smooth' }); }} data-testid="continuer">{texte} →</button>;

  return (
    <div className="page lecon" key={n.id}>
      <p className="surtitre"><Link to="/module/0">Module 0</Link> · {bloc.titre} · Leçon {i + 1} sur {NOTIONS.length}</p>
      <h1>{n.nom}</h1>
      <div className="lecon-barre">
        <ol className="temps">
          {TEMPS.map((nom, k) => <li key={nom} className={k === temps && !tout ? 'actif' : k < temps ? 'fait' : ''}><button onClick={() => setTemps(k)} data-temps={k}><span>{k}</span>{nom}</button></li>)}
        </ol>
        <label className="formateur"><input type="checkbox" checked={tout} onChange={(e) => setTout(e.target.checked)} /> Tout afficher (mode formateur)</label>
      </div>

      {visible(0) && (
        <section className="carte temps-carte" data-testid="bloc-notion">
          <h2>0. La notion en bref</h2>
          <p className="conseil">Avant toute mise en situation, voici de quoi il s'agit : ce qu'est la notion, d'où elle vient, à quoi elle sert. La leçon la fait ensuite vivre sur un cas concret.</p>
          <Definition d={n.definition} />
          <h3>Les bases à comprendre avant de commencer</h3>
          <MotsAnimes n={n} />
          {!tout && <Suite vers={1} texte="Voir la situation" />}
        </section>
      )}

      {visible(1) && (
        <section className="carte temps-carte">
          <h2>1. Situer</h2>
          <p className="accroche">{n.accroche}</p>
          <p className="objectif"><b>Objectif.</b> À la fin de cette leçon, vous saurez {n.objectif}.</p>
          {rappel && (
            <div className="rappel" data-testid="rappel-inline">
              <p><b>Repère utile.</b> {rappel}</p>
              <button type="button" className="bouton secondaire" onClick={() => setTemps(0)}>Revoir les bases de cette leçon</button>
            </div>
          )}
          {!tout && <Suite vers={2} texte="Je fais ma prédiction" />}
        </section>
      )}

      {visible(2) && (
        <section className="carte temps-carte">
          <h2>2. Prédire</h2>
          <p className="conseil">Engagez-vous sur une réponse avant de voir la démonstration. Peu importe qu'elle soit juste : comparer votre idée de départ à ce que vous allez observer est ce qui fait progresser.</p>
          <p className="question"><b>À votre avis.</b> {n.prediction.q}</p>
          <div className="choix">
            {n.prediction.choix.map((c, k) => <button key={c} className={pari === k ? 'pari' : ''} onClick={() => setPari(k)} data-testid="pari">{c}</button>)}
          </div>
          {pari !== undefined && <p className="retour">Prédiction enregistrée. Vous la vérifierez après la démonstration.</p>}
          {!tout && <Suite vers={3} texte="Voir la démonstration" inactif={pari === undefined} />}
        </section>
      )}

      {visible(3) && (
        <section className="carte temps-carte">
          <h2>3. Observer</h2>
          <p className="conseil">La démonstration avance étape par étape et s'arrête à chaque fois. Lisez le commentaire, repérez ce qu'il vous demande de regarder, puis passez à la suite à votre rythme.</p>
          <Demonstration n={n} surFin={() => setDemoVue(true)} />
          {!tout && <Suite vers={4} texte="Comprendre ce que j'ai vu" inactif={!demoVue} />}
          {!tout && !demoVue && <p className="conseil">Parcourez toutes les étapes pour continuer.</p>}
        </section>
      )}

      {visible(4) && (
        <section className="carte temps-carte">
          <h2>4. Le cours</h2>
          {pari !== undefined && (
            <div className={`verdict ${pari === n.prediction.ok ? 'juste' : 'faux'}`}>
              <b>Retour sur votre prédiction.</b> Vous aviez répondu « {n.prediction.choix[pari]} ». {pari === n.prediction.ok ? "C'est bien ce que montre la démonstration." : `La démonstration montre autre chose : « ${n.prediction.choix[n.prediction.ok]} ». Cet écart est utile : c'est précisément l'idée à corriger.`}
            </div>
          )}
          <p className="conseil">Vous avez vu le mécanisme fonctionner. Voici maintenant ce qu'il est exactement : sa définition, son modèle, son algorithme et ses limites.</p>
          <Theorie blocs={n.theorie} />
          <ExempleResolu ex={n.exemple} />
          <div className="piege"><b>Erreur fréquente.</b> {n.piege}</div>
          {!tout && <Suite vers={5} texte="À moi de construire" />}
        </section>
      )}

      {visible(5) && (
        <section className="carte temps-carte">
          <h2>5. Construire</h2>
          <h3 className="atelier-titre">Atelier : {n.atelier.titre}</h3>
          <p className="mission-atelier">{n.atelier.mission}</p>
          <AtelierCourant config={n.atelier.config} surReussite={() => marquer(n.id, 'atelier')} />
          {prog[n.id]?.atelier && <p className="acquis-atelier">Atelier réussi : cette leçon est acquise.</p>}
          <details className="controle">
            <summary>Deux questions rapides pour vérifier le vocabulaire et le transfert</summary>
            <Qcm {...n.exercice} etiquette="Application" />
            <Qcm {...n.transfert} etiquette="Transfert" />
          </details>
          {!tout && <Suite vers={6} texte="Ce que je retiens" inactif={!prog[n.id]?.atelier} />}
          {!tout && !prog[n.id]?.atelier && <p className="conseil">Réussissez l'atelier pour valider la leçon. Chaque essai vous indique quoi corriger.</p>}
        </section>
      )}

      {visible(6) && (
        <section className="carte temps-carte">
          <h2>6. Retenir</h2>
          <p className="a-retenir">{n.retenir}</p>
          <p><b>Vous savez maintenant</b> {n.objectif}.</p>
          <p><b>Où retrouve-t-on cette idée ?</b> {n.ailleurs}</p>
          <p><b>Pour la mettre en pratique.</b> Cette notion est approfondie et programmée dans le <Link to={`/module/${n.module}`}>module {n.module}</Link> et son notebook.</p>
        </section>
      )}

      <nav className="suite">
        {i > 0 ? <Link to={`/module/0/${NOTIONS[i - 1].id}`}>← {NOTIONS[i - 1].nom}</Link> : <Link to="/module/0">← Sommaire</Link>}
        {i < NOTIONS.length - 1 ? <Link className="bouton" to={`/module/0/${NOTIONS[i + 1].id}`}>Leçon suivante : {NOTIONS[i + 1].nom} →</Link> : <Link className="bouton" to="/module/1">Module 1 →</Link>}
      </nav>
    </div>
  );
}
