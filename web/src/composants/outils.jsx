import { useEffect, useState } from 'react';

// Charge un fichier JSON publié avec le site (données produites par les scripts Python).
export function useJSON(url) {
  const [etat, setEtat] = useState({ donnees: null, erreur: null });
  useEffect(() => {
    let annule = false;
    fetch(url)
      .then((r) => { if (!r.ok) throw new Error(`${url} : ${r.status}`); return r.json(); })
      .then((d) => { if (!annule) setEtat({ donnees: d, erreur: null }); })
      .catch((e) => { if (!annule) setEtat({ donnees: null, erreur: e.message }); });
    return () => { annule = true; };
  }, [url]);
  return etat;
}

// Plan de l'entrepôt vu de dessus, en SVG. Une cellule mesure `c` unités.
export function Plan2D({ monde, x = 0, y = 0, c = 20, children }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={monde.largeur * c} height={monde.hauteur * c} fill="var(--plan-sol)" rx="4" />
      {monde.murs.map(([mx, my]) => <rect key={`m${mx}-${my}`} x={mx * c} y={my * c} width={c} height={c} fill="var(--plan-mur)" />)}
      {monde.rayonnages.map(([mx, my]) => <rect key={`r${mx}-${my}`} x={mx * c + 1.5} y={my * c + 1.5} width={c - 3} height={c - 3} rx="2" fill="#8A93A6" />)}
      {children}
    </g>
  );
}

export const centre = (p, c = 20) => [p[0] * c + c / 2, p[1] * c + c / 2];
export const polyligne = (points, c = 20) => points.map((p) => centre(p, c).join(',')).join(' ');
