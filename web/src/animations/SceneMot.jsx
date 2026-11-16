import { useId } from 'react';

const PALETTE = {
  bleu: ['#e9f0ff', '#23468c'], vert: ['#e7f6e9', '#1a6a2b'], orange: ['#fff1dc', '#9a4c0d'],
  rouge: ['#ffe8e8', '#ae202a'], gris: ['#edf0f5', '#68758c'], mur: ['#344154', '#344154'],
};
export function lignes(texte = '', largeur, taille = 16) {
  const limite = Math.max(5, Math.floor(largeur / (taille * 0.56)));
  return String(texte).split('\n').flatMap((p) => {
    const lignes = [''];
    for (const mot of p.split(' ')) {
      const i = lignes.length - 1;
      if (lignes[i].length && lignes[i].length + mot.length + 1 > limite) lignes.push(mot);
      else lignes[i] += (lignes[i] ? ' ' : '') + mot;
    }
    return lignes;
  });
}
function Libelle({ x, y, texte, w = 150, taille = 16, couleur = '#17253c', gras = false }) {
  if (!texte) return null;
  const ls = lignes(texte, w, taille);
  return <text x={x} y={y - (ls.length - 1) * taille * .61} fill={couleur} fontSize={taille} fontWeight={gras ? 700 : 500} textAnchor="middle" dominantBaseline="middle">
    {ls.map((l, i) => <tspan key={i} x={x} dy={i ? taille * 1.22 : 0}>{l}</tspan>)}
  </text>;
}
const melange = (a, b, t) => a + (b - a) * t;
export default function SceneMot({ avant, apres, progression = 1, compact = false, titre = 'Exemple animé' }) {
  const uid = useId().replace(/:/g, '');
  const cle = compact ? 'petit' : 'large';
  const debut = avant[cle]; const fin = apres[cle];
  const t = progression * progression * (3 - 2 * progression);
  const objets = [...new Set([...debut, ...fin].map((o) => o.id))].map((id) => {
    const a = debut.find((o) => o.id === id); const b = fin.find((o) => o.id === id);
    const origine = a || { ...b, opacite: 0 }; const cible = b || { ...a, opacite: 0 };
    const o = { ...(t < .5 ? origine : cible) };
    for (const k of ['x', 'y', 'x2', 'y2', 'w', 'h', 'r']) if (typeof origine[k] === 'number') o[k] = melange(origine[k], cible[k] ?? origine[k], t);
    if (o.parabole) o.y = 200 - 150 * ((o.x - o.parabole.centre) / o.parabole.demi) ** 2;
    if (o.relief) {
      const i = Math.max(1, o.relief.findIndex(([x]) => x >= o.x));
      const [x1, y1] = o.relief[i - 1]; const [x2, y2] = o.relief[i];
      o.y = melange(y1, y2, (o.x - x1) / (x2 - x1));
    }
    o.opacite = melange(origine.opacite ?? 1, cible.opacite ?? 1, t);
    return o;
  });
  return <svg className="mot-dessin" viewBox={`0 0 ${compact ? 340 : 640} ${apres.hauteur?.[cle] ?? (compact ? 350 : 286)}`} role="img" aria-labelledby={`${uid}-titre`} data-testid="mot-dessin">
    <title id={`${uid}-titre`}>{titre}</title>
    <defs>{Object.entries(PALETTE).map(([ton, [, couleur]]) => <marker key={ton} id={`${uid}-${ton}`} markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5" fill={couleur} /></marker>)}</defs>
    {objets.map((o) => {
      const [fond, couleur] = PALETTE[o.ton || 'bleu'];
      return <g key={o.id} opacity={o.opacite} data-objet={o.id}>
        {o.type === 'trait' && <line x1={o.x} y1={o.y} x2={o.x2} y2={o.y2} stroke={couleur} strokeWidth={3} markerEnd={o.fleche ? `url(#${uid}-${o.ton})` : undefined} />}
        {o.type === 'courbe' && <path d={o.d} fill="none" stroke={couleur} strokeWidth={3} />}
        {o.type === 'barre' && <rect x={o.x} y={o.y} width={Math.max(0, o.w)} height={o.h} rx={5} fill={o.ton === 'gris' ? fond : couleur} />}
        {o.type === 'carte' && <><rect x={o.x - o.w / 2} y={o.y - o.h / 2} width={o.w} height={o.h} rx={9} fill={o.contour ? 'none' : fond} stroke={couleur} strokeWidth={o.contour ? 4 : o.ton === 'gris' ? 1 : 2} /><Libelle {...o} w={o.w - 16} taille={compact ? 14 : 16} gras /></>}
        {o.type === 'rond' && <><circle cx={o.x} cy={o.y} r={o.r} fill={fond} stroke={couleur} strokeWidth={2.5} /><Libelle {...o} w={o.r * 2} taille={o.taille || 16} gras />{o.sous && <Libelle x={o.x} y={o.y + o.r + 12} texte={o.sous} taille={11} />}</>}
        {o.type === 'texte' && <Libelle {...o} />}
      </g>;
    })}
  </svg>;
}
