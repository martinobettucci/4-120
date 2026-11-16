// Petites simulations déterministes. Chaque objet garde son identifiant entre deux étapes :
// le lecteur interpole sa position, sa taille et son apparition, sans déplacer le commentaire.
export const carte = (id, x, y, texte, ton = 'bleu', w = 170, h = 66) => ({ id, type: 'carte', x, y, texte, ton, w, h });
export const texte = (id, x, y, contenu, w = 580, taille = 17) => ({ id, type: 'texte', x, y, texte: contenu, w, taille });
export const rond = (id, x, y, contenu, ton = 'bleu', r = 19) => ({ id, type: 'rond', x, y, texte: contenu, ton, r });
export const trait = (id, x, y, x2, y2, ton = 'bleu', fleche = false) => ({ id, type: 'trait', x, y, x2, y2, ton, fleche });
export const scene = (large, petit, bilan) => ({ large, petit, bilan });
export const pas = (titre, explication, dessin) => ({ titre, explication, dessin });
export const mot = (nom, etapes) => ({ nom, etapes });

// Un objet passe réellement entre les trois postes. Les intitulés décrivent ce que chaque poste fait.
export function circuit(postes, actif, bilan, ton = 'bleu') {
  const dessiner = (petit) => {
    const positions = postes.map((_, i) => petit ? [145, 52 + i * 98] : [110 + i * 210, 85]);
    return [
      ...positions.slice(0, -1).map(([x, y], i) => petit
        ? trait(`liaison${i}`, x, y + 37, positions[i + 1][0], positions[i + 1][1] - 37, 'gris', true)
        : trait(`liaison${i}`, x + 94, y, positions[i + 1][0] - 94, y, 'gris', true)),
      ...postes.map((p, i) => carte(`poste${i}`, ...positions[i], p, i === actif ? ton : 'gris', petit ? 230 : 180, petit ? 66 : 102)),
      rond('objet', petit ? 285 : positions[actif][0], petit ? positions[actif][1] : 174, '●', ton, 13),
      texte('objet-label', petit ? 160 : 320, petit ? 310 : 221, '● Le point suit l’étape expliquée', petit ? 295 : 590, 15),
    ];
  };
  return scene(dessiner(false), dessiner(true), bilan);
}

// Des jetons numérotés : on peut recompter le numérateur et le dénominateur.
// marques contient un symbole par jeton (!, ✓, ×, ?). Au dernier pas, les groupes se séparent.
export function jetons(n, marques, groupe, phase, bilan) {
  const dessiner = (petit) => Array.from({ length: n }, (_, i) => {
    const c = groupe.includes(i); const ordre = phase === 2 ? (c ? groupe.indexOf(i) : Math.ceil(groupe.length / 5) * 5 + Array.from({ length: i }, (_, j) => j).filter((j) => !groupe.includes(j)).length) : i;
    const colonnes = 5; const dx = petit ? 57 : 94;
    const x = (petit ? 45 : 132) + (ordre % colonnes) * dx;
    const y = (petit ? 46 : 45) + Math.floor(ordre / colonnes) * (petit ? 69 : 64) + (phase === 2 && !c ? 10 : 0);
    return { ...rond(`jeton${i}`, x, y, phase === 0 ? String(i + 1) : marques[i], phase === 0 ? 'gris' : c ? 'orange' : 'bleu', petit ? 19 : 18), sous: phase ? String(i + 1) : '' };
  });
  const places = phase === 2 ? Math.ceil(groupe.length / 5) * 5 + n - groupe.length : n;
  const rangees = Math.ceil(places / 5);
  return { ...scene(dessiner(false), dessiner(true), bilan), hauteur: {
    large: Math.max(286, 45 + (rangees - 1) * 64 + 55),
    petit: Math.max(350, 46 + (rangees - 1) * 69 + 58),
  } };
}

// Une longueur représente une quantité ; l'échelle et la valeur restent affichées.
export function barres(lignes, max, bilan, unite = '') {
  const dessiner = (petit) => lignes.flatMap(([nom, valeur, ton = 'bleu'], i) => {
    const y = 44 + i * (petit ? 86 : 80); const longueur = petit ? 276 : 576;
    return [texte(`nom${i}`, petit ? 160 : 320, y - 16, `${nom} : ${valeur}${unite}`, petit ? 295 : 590, 16),
      { id: `fond${i}`, type: 'barre', x: 22, y, w: longueur, h: 22, ton: 'gris' },
      { id: `barre${i}`, type: 'barre', x: 22, y, w: longueur * valeur / max, h: 22, ton },
      texte(`echelle${i}`, petit ? 160 : 320, y + 40, `0${unite} → ${max}${unite}`, petit ? 290 : 590, 12)];
  });
  return scene(dessiner(false), dessiner(true), bilan);
}

// Une grille de six colonnes et quatre lignes. Les coordonnées restent identiques sur téléphone.
export function grille(robot, but, murs, chemin, bilan, rayons = []) {
  const dessiner = (petit) => {
    const d = petit ? 45 : 58; const origine = petit ? 47 : 175;
    const xy = ([x, y]) => [origine + x * d, 36 + y * d];
    return [
      ...Array.from({ length: 24 }, (_, i) => { const c = [i % 6, Math.floor(i / 6)]; return { ...carte(`case${i}`, ...xy(c), '', murs.some(([x, y]) => x === c[0] && y === c[1]) ? 'mur' : 'gris', d - 4, d - 4) }; }),
      ...chemin.slice(1).map((c, i) => trait(`chemin${i}`, ...xy(chemin[i]), ...xy(c), 'vert')),
      ...rayons.map((c, i) => trait(`rayon${i}`, ...xy(robot), ...xy(c), 'orange', true)),
      ...(but ? [rond('but', ...xy(but), '★', 'vert', petit ? 15 : 18)] : []),
      rond('robot', ...xy(robot), 'R', 'bleu', petit ? 15 : 18),
      texte('legende', petit ? 160 : 320, petit ? 253 : 260, but ? 'R : robot · ★ : objectif · ■ : mur' : 'R : robot · ■ : obstacle', petit ? 290 : 590, 15),
    ];
  };
  return scene(dessiner(false), dessiner(true), bilan);
}

// Un paysage de coût ; les coordonnées sont des valeurs d'exemple, jamais une trajectoire aléatoire.
export function relief(position, bilan, simple = false) {
  const points = simple ? [[0, 0], [1, 2], [2, 4], [3, 5], [4, 4], [5, 2], [6, 0]] : [[0, 0], [1, 3], [2, 2], [3, 0], [4, 5], [5, 3], [6, 1]];
  const dessiner = (petit) => {
    const xy = ([x, y]) => [25 + x * (petit ? 45 : 98), 50 + y * 30];
    const centre = petit ? 160 : 319; const demi = petit ? 135 : 294;
    const point = rond('position', ...xy(position), 'R', 'bleu', 16);
    if (simple) { point.parabole = { centre, demi }; point.y = 200 - 150 * ((point.x - centre) / demi) ** 2; }
    else point.relief = points.map(xy);
    return [texte('axe', petit ? 160 : 320, 20, 'Plus bas = moins de coût', petit ? 295 : 590, 16),
      ...(simple ? [{ id: 'pente', type: 'courbe', d: `M25,50 Q${centre},350 ${centre + demi},50`, ton: 'gris' }] : points.slice(1).map((p, i) => trait(`pente${i}`, ...xy(points[i]), ...xy(p), 'gris'))),
      point,
      texte('parametre', petit ? 160 : 320, 246, '← Changer la solution →', petit ? 295 : 590, 15)];
  };
  return scene(dessiner(false), dessiner(true), bilan);
}

export function tableau(entetes, lignes, actifs, bilan) {
  const dessiner = (petit) => {
    const w = petit ? 94 : 180; const x = petit ? 65 : 140;
    const lecture = actifs.length ? actifs.at(-1).split('-').map(Number) : null;
    return [...entetes.map((t, j) => carte(`titre${j}`, x + j * w, 30, t, 'bleu', w - 6, 40)),
      ...lignes.flatMap((ligne, i) => ligne.map((t, j) => carte(`cellule${i}-${j}`, x + j * w, 83 + i * 55, t, actifs.includes(`${i}-${j}`) ? 'vert' : 'gris', w - 6, 46))),
      ...(lecture ? [rond('lecture', x + lecture[1] * w, 55 + lecture[0] * 55, '', 'orange', 4)] : [])];
  };
  return scene(dessiner(false), dessiner(true), bilan);
}

// Trois cartes comparables, dont le contenu ou la position change entre les pas.
export function cartes(contenus, actif, bilan) {
  return circuit(contenus, actif, bilan, 'vert');
}

export const histoire = (nom, postes, etapes, ton = 'bleu') => mot(nom, etapes.map(([titre, explication, bilan], i) => pas(titre, explication, circuit(postes, i, bilan, ton))));
export const comparer = (nom, max, etapes, unite = '') => mot(nom, etapes.map(([titre, explication, valeurs, bilan]) => pas(titre, explication, barres(valeurs, max, bilan, unite))));

// Un prérequis conserve son petit cas pendant les étapes ; la lecture suit les cellules utiles.
export const baseTableau = (nom, definition, entetes, etapes) => ({ nom, definition, ajoutPrerequis: true,
  etapes: etapes.map(([titre, explication, lignes, actifs, bilan, colonnes = entetes]) => {
    const dessin = tableau(colonnes, lignes, actifs, bilan);
    // Sur téléphone, chaque ligne devient un groupe de champs nommés et lisibles.
    // Les mots longs et les valeurs scientifiques gardent leur taille de caractère.
    const petit = []; let y = 30;
    lignes.forEach((ligne, i) => {
      ligne.forEach((valeur, j) => {
        if (valeur === '') return;
        petit.push(carte(`cellule${i}-${j}`, 170, y, `${colonnes[j]} : ${valeur}`, actifs.includes(`${i}-${j}`) ? 'vert' : 'gris', 300, 46));
        y += 52;
      });
      y += 8;
    });
    const lecture = petit.find((objet) => objet.id === `cellule${actifs.at(-1)}`);
    if (lecture) petit.push(rond('lecture', 10, lecture.y, '', 'orange', 4));
    return pas(titre, explication, { ...dessin, petit, hauteur: { large: 286, petit: Math.max(192, y - 8) } });
  }),
});
