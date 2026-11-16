import { useCallback, useEffect, useId, useRef, useState } from 'react';
import SceneMot from '../animations/SceneMot.jsx';
import { MOTS_ANIMES } from '../lecons/mots/index.js';

function ExempleAnime({ exemple, surFin }) {
  const [etape, setEtape] = useState(0);
  const [progression, setProgression] = useState(1);
  const [lecture, setLecture] = useState(false);
  const [compact, setCompact] = useState(false);
  const [reduit, setReduit] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const visuel = useRef(null); const position = useRef(1);
  const avancer = (p) => { position.current = p; setProgression(p); };
  const e = exemple.etapes[etape];
  const precedent = etape ? exemple.etapes[etape - 1].dessin : {
    ...e.dessin,
    large: e.dessin.large.map((x) => ({ ...x, opacite: 0 })),
    petit: e.dessin.petit.map((x) => ({ ...x, opacite: 0 })),
  };
  useEffect(() => {
    const observer = new ResizeObserver(([taille]) => setCompact(taille.contentRect.width < 520));
    observer.observe(visuel.current); return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const changer = () => { setReduit(media.matches); if (media.matches) { setLecture(false); avancer(1); } };
    media.addEventListener('change', changer); return () => media.removeEventListener('change', changer);
  }, []);
  useEffect(() => {
    const cacher = () => { if (document.hidden) setLecture(false); };
    document.addEventListener('visibilitychange', cacher); return () => document.removeEventListener('visibilitychange', cacher);
  }, []);
  useEffect(() => {
    if (!lecture) return undefined;
    let raf; let dernier = performance.now();
    const tick = (maintenant) => {
      const suivant = Math.min(1, position.current + (maintenant - dernier) / 1700);
      dernier = maintenant; avancer(suivant);
      if (suivant === 1) setLecture(false); else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [lecture, etape]);
  useEffect(() => { if (etape === exemple.etapes.length - 1 && progression === 1) surFin(); }, [etape, progression, exemple, surFin]);
  const aller = (i) => { setEtape(i); avancer(reduit || i < etape ? 1 : 0); setLecture(!reduit && i >= etape); };
  const jouer = () => { if (lecture) setLecture(false); else { if (position.current === 1) avancer(reduit ? 1 : 0); setLecture(!reduit); } };
  return <div className="mot-exemple" data-testid="mot-exemple" data-etape={etape} data-lecture={lecture} data-progression={progression.toFixed(3)}>
    <ol className="mot-etapes" aria-label="Étapes de l’exemple">
      {exemple.etapes.map((p, i) => <li key={p.titre}><button type="button" aria-current={i === etape ? 'step' : undefined} onClick={() => aller(i)}><span>{i + 1}</span>{p.titre}</button></li>)}
    </ol>
    <div className="mot-visuel" ref={visuel}>
      <SceneMot avant={precedent} apres={e.dessin} progression={progression} compact={compact} titre={`${exemple.nom}. ${e.titre}. ${e.dessin.bilan}`} />
    </div>
    <div className="mot-commentaire" aria-live="polite" aria-atomic="true">
      <p className="mot-etape-titre">Étape {etape + 1} sur {exemple.etapes.length} · {e.titre}</p>
      <p>{e.explication}</p>
      <p className="mot-bilan"><b>À retenir à cette étape.</b> {e.dessin.bilan}</p>
    </div>
    <div className="mot-commandes">
      <button type="button" className="bouton secondaire" onClick={() => aller(etape - 1)} disabled={etape === 0} data-testid="mot-precedent">← Précédent</button>
      <button type="button" className="bouton secondaire" onClick={jouer} data-testid="mot-lecture">{reduit ? 'Réafficher l’étape' : lecture ? 'Pause' : progression < 1 ? 'Reprendre' : '↻ Animer cette étape'}</button>
      <button type="button" className="bouton" onClick={() => aller(etape + 1)} disabled={etape === exemple.etapes.length - 1} data-testid="mot-suivant">Étape suivante →</button>
    </div>
    {reduit && <p className="conseil">Les étapes restent disponibles sans mouvement, selon votre préférence d’animations réduites.</p>}
  </div>;
}

export default function MotsAnimes({ n }) {
  const [choisi, setChoisi] = useState(0); const [vus, setVus] = useState([]);
  const boutons = useRef([]);
  const uid = useId(); const exemples = MOTS_ANIMES[n.id];
  const fini = useCallback(() => setVus((v) => v.includes(choisi) ? v : [...v, choisi]), [choisi]);
  return <div className="mots-animes" data-testid="mots-animes">
    <p className="conseil">Commencez par les bases, puis avancez vers les notions de la leçon. Chaque animation s’arrête entre les étapes pour vous laisser observer et comprendre.</p>
    <p className="parcours-bases" data-testid="parcours-prerequis"><b>Pour comprendre cette leçon :</b> {n.mots.slice(0, n.nombreBases).map(([nom]) => nom).join(' → ')}.
      {n.id === 'bayes' && ' Les mêmes vingt robots permettent de suivre chaque calcul.'}</p>
    <dl className="mots mots-animes-choix">
      {n.mots.map(([nom, definition], i) => <div key={nom} className={i === choisi ? 'mot-choisi' : ''}>
        <dt><button ref={(b) => { boutons.current[i] = b; }} type="button" onClick={() => setChoisi(i)} aria-pressed={i === choisi} aria-controls={`${uid}-exemple`} data-testid="choisir-mot">{i < n.nombreBases && <span className="etiquette-base">Base {i + 1}</span>}{nom}{vus.includes(i) && <span aria-label="Exemple parcouru"> ✓</span>}</button></dt>
        <dd>{definition}</dd>
      </div>)}
    </dl>
    <section className="mot-panneau" id={`${uid}-exemple`} aria-labelledby={`${uid}-titre`}>
      <h4 id={`${uid}-titre`}>{n.mots[choisi][0]} : comprendre pas à pas</h4>
      {exemples?.[choisi] && <ExempleAnime key={choisi} exemple={exemples[choisi]} surFin={fini} />}
      {vus.includes(choisi) && choisi < n.mots.length - 1 && <button type="button" className="bouton secondaire mot-prochain" onClick={() => { setChoisi(choisi + 1); boutons.current[choisi + 1]?.focus(); }}>Comprendre la notion suivante : {n.mots[choisi + 1][0]} →</button>}
    </section>
  </div>;
}
