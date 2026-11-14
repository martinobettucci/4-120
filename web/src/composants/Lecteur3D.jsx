import { useEffect, useMemo, useRef, useState } from 'react';
import { Scene3D } from '../scene/Scene3D.js';

const COUCHES = [
  ['capteurs', 'Capteurs (lidar)'],
  ['plan', 'Plan courant'],
  ['trajectoire', 'Trajectoire'],
  ['observation', 'Position observée'],
  ['croyance', 'Croyance'],
  ['eclate', 'Vue éclatée du robot'],
  ['suivre', 'Suivre le robot'],
];

const COUCHES_NOMS = { reactive: 'réactive', deliberative: 'délibérative', apprise: 'apprise' };

const cache = new Map();
export async function chargerTrace(id) {
  if (!cache.has(id)) {
    cache.set(id, fetch(`traces/${id}.json`).then((r) => {
      if (!r.ok) throw new Error(`Trace introuvable : ${id}`);
      return r.json();
    }));
  }
  return cache.get(id);
}

function Decision({ trace, i, titre, couleur }) {
  if (!trace) return null;
  const n = trace.etapes.length;
  const fin = i >= n;
  const e = trace.etapes[Math.min(i, n - 1)];
  const b = trace.bilan;
  return (
    <div className="decision" style={{ borderColor: couleur }}>
      <div className="decision-titre"><span className="pastille" style={{ background: couleur }} />{titre}</div>
      {fin ? (
        <p className="raison">{b.succes ? 'Objectif atteint.' : 'Objectif non atteint dans le temps imparti.'} {b.etapes} étapes, {b.collisions} collision(s).</p>
      ) : (
        <>
          <p className="raison">{e.decision.raison || 'Décision sans commentaire'}</p>
          <dl>
            <dt>Couche active</dt><dd>{COUCHES_NOMS[e.decision.couche] || e.decision.couche || 'n.c.'}{e.decision.regle ? `, règle ${e.decision.regle}` : ''}</dd>
            <dt>Action</dt><dd><b>{e.action}</b>{e.resultat.glissement ? ' (glissement : non exécutée)' : ''}{e.resultat.collision ? ' (collision)' : ''}</dd>
            <dt>Position réelle</dt><dd>({e.etat.robot.join(', ')})</dd>
            <dt>Position observée</dt><dd>({e.observation.position.join(', ')}){e.observation.position_estimee ? `, estimée (${e.observation.position_estimee.join(', ')})` : ''}</dd>
            {e.decision.entropie_bits !== undefined && (<><dt>Incertitude</dt><dd>{e.decision.entropie_bits} bit(s)</dd></>)}
            <dt>Lidar N, E, S, O</dt><dd>{['N', 'E', 'S', 'O'].map((d) => e.observation.lidar[d]).join(' · ')}</dd>
            <dt>Collisions</dt><dd>{e.metriques.collisions}</dd>
            <dt>Reste à parcourir</dt><dd>{e.metriques.distance_objectif} cellule(s) à vol d'oiseau</dd>
          </dl>
        </>
      )}
    </div>
  );
}

export default function Lecteur3D({ catalogue, initialA, initialB = '', hauteur = 520, importer = false }) {
  const conteneur = useRef(null);
  const scene = useRef(null);
  const [idA, setIdA] = useState(initialA || catalogue[0]?.id);
  const [idB, setIdB] = useState(initialB);
  const [importee, setImportee] = useState(null);
  const [traces, setTraces] = useState([null, null]);
  const [t, setT] = useState(0);
  const [lecture, setLecture] = useState(false);
  const [vitesse, setVitesse] = useState(3);
  const [couches, setCouches] = useState({ capteurs: true, plan: true, trajectoire: true, croyance: true, observation: true, eclate: false, suivre: false });
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    scene.current = new Scene3D(conteneur.current);
    return () => scene.current.dispose();
  }, []);

  useEffect(() => {
    let annule = false;
    setErreur('');
    Promise.all([idA === '__import' ? importee : chargerTrace(idA), idB ? chargerTrace(idB) : null])
      .then(([a, b]) => {
        if (annule) return;
        setTraces([a, b]);
        scene.current.definirTraces([a, b]);
        scene.current.definirCouches(couches);
        setT(0);
        setLecture(false);
      })
      .catch((e) => setErreur(e.message));
    return () => { annule = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idA, idB, importee]);

  const max = useMemo(() => Math.max(...traces.filter(Boolean).map((x) => x.etapes.length), 0), [traces]);

  useEffect(() => { scene.current?.afficher(t); }, [t]);
  useEffect(() => { scene.current?.definirCouches(couches); }, [couches]);

  useEffect(() => {
    if (!lecture) return undefined;
    let dernier = performance.now();
    let raf;
    const tic = (maintenant) => {
      const dt = Math.max(0, (maintenant - dernier) / 1000);
      dernier = maintenant;
      setT((v) => {
        const suivant = v + dt * vitesse;
        if (suivant >= max) { setLecture(false); return max; }
        return suivant;
      });
      raf = requestAnimationFrame(tic);
    };
    raf = requestAnimationFrame(tic);
    return () => cancelAnimationFrame(raf);
  }, [lecture, vitesse, max]);

  const i = Math.max(0, Math.floor(t + 1e-6));
  const pas = (d) => { setLecture(false); setT((v) => Math.max(0, Math.min(max, d > 0 ? Math.floor(v + 1e-6) + 1 : Math.ceil(v - 1e-6) - 1))); };

  const surImport = async (ev) => {
    const fichier = ev.target.files?.[0];
    if (!fichier) return;
    try {
      const donnees = JSON.parse(await fichier.text());
      if (donnees.schema !== 'ascent-4130-trace/1') throw new Error('Ce fichier ne suit pas le format ascent-4130-trace/1.');
      setImportee(donnees);
      setIdA('__import');
      setIdB('');
    } catch (e) { setErreur(e.message); }
  };

  return (
    <div className="lecteur">
      <div className="lecteur-barre">
        <label>Exécution A
          <select value={idA} onChange={(e) => setIdA(e.target.value)} data-testid="choix-a">
            {catalogue.map((c) => <option key={c.id} value={c.id}>{c.titre}</option>)}
            {importee && <option value="__import">Trace importée : {importee.meta.titre}</option>}
          </select>
        </label>
        <label>Comparer avec B
          <select value={idB} onChange={(e) => setIdB(e.target.value)} data-testid="choix-b">
            <option value="">Aucune</option>
            {catalogue.filter((c) => c.id !== idA).map((c) => <option key={c.id} value={c.id}>{c.titre}</option>)}
          </select>
        </label>
        {importer && (
          <label className="bouton secondaire import">Importer une trace JSON
            <input type="file" accept="application/json,.json" onChange={surImport} hidden />
          </label>
        )}
      </div>
      {erreur && <p className="erreur">{erreur}</p>}
      <div className="lecteur-corps">
        <div className="vue3d" ref={conteneur} style={{ minHeight: hauteur }} data-testid="vue3d">
          <div className="vues">
            <button onClick={() => scene.current.vue('trois-quarts')}>Vue d'ensemble</button>
            <button onClick={() => scene.current.vue('dessus')}>Vue de dessus</button>
            <button onClick={() => scene.current.vue('robot')}>Près du robot</button>
          </div>
          <div className="aide3d">Glisser pour tourner, molette pour zoomer, clic droit pour déplacer</div>
        </div>
        <aside className="panneau">
          <h4>Pourquoi cette décision ?</h4>
          <Decision trace={traces[0]} i={i} titre={traces[0]?.meta.titre} couleur="#23468C" />
          <Decision trace={traces[1]} i={i} titre={traces[1]?.meta.titre} couleur="#E07B1A" />
          <h4>Couches affichées</h4>
          <div className="couches">
            {COUCHES.map(([cle, libelle]) => (
              <label key={cle}><input type="checkbox" checked={couches[cle]} onChange={(e) => setCouches({ ...couches, [cle]: e.target.checked })} />{libelle}</label>
            ))}
          </div>
          <p className="legende3d"><span style={{ color: '#b9ae1c' }}>■</span> rayons du lidar <span style={{ color: '#238C33' }}>●</span> plan <span style={{ color: '#F24141' }}>◯</span> position mesurée <span style={{ color: '#238C33' }}>◯</span> position estimée <span style={{ color: '#ff8a1f' }}>■</span> croyance</p>
        </aside>
      </div>
      <div className="transport">
        <button onClick={() => { setLecture(false); setT(0); }} title="Retour à l'état initial" data-testid="reinit">⏮ Réinitialiser</button>
        <button onClick={() => pas(-1)} title="Étape précédente">◀ Étape</button>
        <button className="principal" onClick={() => { if (t >= max) setT(0); setLecture(!lecture); }} data-testid="lecture">{lecture ? '⏸ Pause' : '▶ Lecture'}</button>
        <button onClick={() => pas(1)} title="Étape suivante" data-testid="pas">Étape ▶</button>
        <input type="range" min="0" max={max} step="0.01" value={t} onChange={(e) => { setLecture(false); setT(Number(e.target.value)); }} aria-label="Position dans la trace" />
        <span className="compteur">Étape {Math.min(i, max)} / {max}</span>
        <label className="vitesse">Vitesse
          <select value={vitesse} onChange={(e) => setVitesse(Number(e.target.value))}>
            <option value="1">lente</option><option value="3">normale</option><option value="8">rapide</option>
          </select>
        </label>
      </div>
    </div>
  );
}
