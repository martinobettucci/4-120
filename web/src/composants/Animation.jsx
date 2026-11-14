import { useEffect, useRef, useState } from 'react';

// Cadre commun des séquences de motion design : des étapes courtes, commentables en direct.
// L'animation avance seule, peut être mise en pause, parcourue étape par étape et rejouée.
// `children(etape, p)` reçoit l'indice de l'étape et sa progression p entre 0 et 1.
export default function Animation({ titre, etapes, duree = 5, children, hauteur }) {
  const [etape, setEtape] = useState(0);
  const [p, setP] = useState(0);
  const [lecture, setLecture] = useState(false);
  const ref = useRef(null);
  const etat = useRef({ etape: 0, p: 0 });
  etat.current = { etape, p };

  useEffect(() => {
    if (!lecture) return undefined;
    let dernier = performance.now();
    let raf;
    const tic = (t) => {
      const dt = Math.max(0, (t - dernier) / 1000);
      dernier = t;
      const d = etapes[etat.current.etape].duree || duree;
      let np = etat.current.p + dt / d;
      if (np >= 1) {
        if (etat.current.etape < etapes.length - 1) {
          // Courte respiration entre deux étapes.
          if (np >= 1.25) { setEtape(etat.current.etape + 1); np = 0; }
        } else { np = 1; setLecture(false); }
      }
      setP(np);
      raf = requestAnimationFrame(tic);
    };
    raf = requestAnimationFrame(tic);
    return () => cancelAnimationFrame(raf);
  }, [lecture, etapes, duree]);

  const aller = (k) => { setEtape(Math.max(0, Math.min(etapes.length - 1, k))); setP(0); };
  const surTouche = (e) => {
    if (e.key === 'ArrowRight') { setLecture(false); aller(etape + 1); setP(1); }
    if (e.key === 'ArrowLeft') { setLecture(false); aller(etape - 1); setP(1); }
    if (e.key === ' ') { e.preventDefault(); setLecture((v) => !v); }
  };

  return (
    <figure className="animation" tabIndex={0} onKeyDown={surTouche} ref={ref}>
      <figcaption>
        <span className="etiquette-anim">Animation</span>
        <strong>{titre}</strong>
        <span className="anim-etape">{etape + 1} / {etapes.length}</span>
      </figcaption>
      <div className="anim-scene" style={hauteur ? { minHeight: hauteur } : undefined}>{children(etape, Math.min(p, 1))}</div>
      <div className="anim-texte">
        <h5>{etapes[etape].titre}</h5>
        <p>{etapes[etape].texte}</p>
      </div>
      <div className="anim-commandes">
        <button onClick={() => { setLecture(false); aller(0); }} title="Rejouer depuis le début">↺</button>
        <button onClick={() => { setLecture(false); aller(etape - 1); setP(1); }} disabled={etape === 0}>◀</button>
        <button className="principal" onClick={() => { if (etape === etapes.length - 1 && p >= 1) aller(0); else if (p >= 1) aller(etape + 1); setLecture(!lecture); }}>{lecture ? '❚❚ Pause' : '▶ Lecture'}</button>
        <button onClick={() => { setLecture(false); aller(etape + 1); setP(1); }} disabled={etape === etapes.length - 1}>▶</button>
        <div className="anim-points">
          {etapes.map((e, k) => (
            <button key={e.titre} className={k === etape ? 'actif' : k < etape ? 'vu' : ''} onClick={() => { setLecture(false); aller(k); setP(1); }} title={e.titre} aria-label={e.titre} />
          ))}
        </div>
      </div>
    </figure>
  );
}

// Outils d'animation.
export const seuil = (p, debut, fin) => Math.max(0, Math.min(1, (p - debut) / (fin - debut)));
export const doux = (x) => x * x * (3 - 2 * x);
export const COUL = { bleu: '#23468C', vert: '#238C33', jaune: '#D9CF4A', rouge: '#F24141', noir: '#0D0D0D', gris: '#8A93A6', orange: '#E07B1A' };

// Jeton qui circule le long d'une suite de points, pour matérialiser un flux d'information.
export function Jeton({ points, p, couleur = COUL.jaune, r = 7 }) {
  if (p <= 0 || p >= 1) return null;
  const longueurs = points.slice(1).map((pt, i) => Math.hypot(pt[0] - points[i][0], pt[1] - points[i][1]));
  const total = longueurs.reduce((a, b) => a + b, 0);
  let d = p * total;
  for (let i = 0; i < longueurs.length; i++) {
    if (d <= longueurs[i]) {
      const f = d / longueurs[i];
      return <circle cx={points[i][0] + (points[i + 1][0] - points[i][0]) * f} cy={points[i][1] + (points[i + 1][1] - points[i][1]) * f} r={r} fill={couleur} stroke="#0D0D0D" strokeWidth="1.5" />;
    }
    d -= longueurs[i];
  }
  return null;
}

export function Boite({ x, y, w, h, texte, sous, couleur = COUL.bleu, actif = true, plein = false }) {
  return (
    <g opacity={actif ? 1 : 0.22} style={{ transition: 'opacity .4s' }}>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={plein ? couleur : 'var(--carte)'} stroke={couleur} strokeWidth="2.5" />
      <text x={x + w / 2} y={y + h / 2 + (sous ? -4 : 5)} textAnchor="middle" fontSize="15" fontWeight="700" fill={plein ? '#fff' : 'var(--texte)'}>{texte}</text>
      {sous && <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fontSize="11.5" fill={plein ? '#fff' : 'var(--texte-doux)'}>{sous}</text>}
    </g>
  );
}

export function Fleche({ de, a, couleur = COUL.gris, actif = true, pointille = false }) {
  const id = `f${couleur.replace('#', '')}`;
  return (
    <g opacity={actif ? 1 : 0.2} style={{ transition: 'opacity .4s' }}>
      <defs>
        <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={couleur} />
        </marker>
      </defs>
      <line x1={de[0]} y1={de[1]} x2={a[0]} y2={a[1]} stroke={couleur} strokeWidth="2.5" markerEnd={`url(#${id})`} strokeDasharray={pointille ? '6 5' : undefined} />
    </g>
  );
}
