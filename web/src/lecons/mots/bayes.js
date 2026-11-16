import { pas, scene, carte, texte, rond, jetons } from './scenes.js';

// Un seul petit groupe pour toutes les notions : 5 pannes, 15 robots sains.
// Le même identifiant suit chaque robot de la population aux quatre cases.
export const ROBOTS_BAYES = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1, panne: i < 5, alerte: i < 4 || (i >= 5 && i < 8),
  case: i < 4 ? 'VP' : i === 4 ? 'FN' : i < 8 ? 'FP' : 'VN',
}));
const CASES = [
  { id: 'VP', nom: 'Vrai positif', sens: 'Panne détectée', col: 0, row: 0, ton: 'vert' },
  { id: 'FP', nom: 'Faux positif', sens: 'Fausse alerte', col: 1, row: 0, ton: 'orange' },
  { id: 'FN', nom: 'Faux négatif', sens: 'Panne manquée', col: 0, row: 1, ton: 'rouge' },
  { id: 'VN', nom: 'Vrai négatif', sens: 'Silence correct', col: 1, row: 1, ton: 'bleu' },
];
const PREMIERS = ['VP', 'FN', 'FP', 'VN'];
const GROUPES = { population: ['VP', 'FN', 'FP', 'VN'], pannes: ['VP', 'FN'], sains: ['FP', 'VN'], alertes: ['VP', 'FP'] };
const base = (nom, definition, etapes) => ({ nom, definition, etapes });

export function matrice({ construction = 5, groupe = 'population', retenus = [], phase = 0, legende, bilan }) {
  const dessiner = (petit) => {
    const x0 = petit ? 61 : 130; const w = petit ? 128 : 230; const gap = petit ? 14 : 20;
    const y0 = 210; const h = petit ? 182 : 160; const dy = h + 20;
    const classe = (r) => construction === 5 || PREMIERS.slice(0, construction).includes(r.case) && ROBOTS_BAYES.find((x) => x.case === r.case).id === r.id;
    const attente = ROBOTS_BAYES.filter((r) => !classe(r));
    const actifs = GROUPES[groupe];
    const objets = [
      carte('population', petit ? 170 : 320, 65, '', 'gris', petit ? 320 : 600, 112),
      texte('population-titre', petit ? 170 : 320, 28, attente.length ? `À classer : ${attente.length} robots` : 'Les mêmes 20 robots', petit ? 300 : 580, 16),
      ...(attente.length ? [] : [texte('population-rappel', petit ? 170 : 320, 73, '5 en panne · 15 sains', petit ? 300 : 580, 17)]),
      texte('axe-realite', petit ? 197 : 370, 148, 'RÉALITÉ VÉRIFIÉE', petit ? 270 : 490, 16),
      texte('reel-positif', x0 + w / 2, 180, 'En panne', w, 16),
      texte('reel-negatif', x0 + w + gap + w / 2, 180, 'Sain', w, 16),
      texte('test-positif', petit ? 29 : 58, y0 + h / 2, 'Test +\nAlerte', petit ? 53 : 106, petit ? 13 : 16),
      texte('test-negatif', petit ? 29 : 58, y0 + dy + h / 2, 'Test −\nSilence', petit ? 53 : 106, petit ? 13 : 16),
    ];
    for (const c of CASES) {
      const x = x0 + c.col * (w + gap); const y = y0 + c.row * dy;
      const connus = ROBOTS_BAYES.filter((r) => r.case === c.id && classe(r));
      const visible = construction === 5 || PREMIERS.slice(0, construction).includes(c.id);
      const opacite = construction < 5 || actifs.includes(c.id) ? 1 : .32;
      objets.push({ ...carte(`case-${c.id}`, x + w / 2, y + h / 2, '', visible ? c.ton : 'gris', w, h), opacite });
      objets.push(texte(`nom-${c.id}`, x + w / 2, y + 23, visible ? `${c.id} · ${c.nom}` : '?', w - 10, petit ? 13 : 16));
      if (visible) objets.push(texte(`sens-${c.id}`, x + w / 2, y + 49, c.sens, w - 8, petit ? 12 : 14));
      objets.push(texte(`nombre-${c.id}`, x + w / 2, y + h - 13, `${connus.length} robot${connus.length > 1 ? 's' : ''}`, w - 8, 13));
    }
    for (const r of ROBOTS_BAYES) {
      const c = CASES.find((x) => x.id === r.case);
      const range = ROBOTS_BAYES.filter((x) => x.case === r.case).findIndex((x) => x.id === r.id);
      const dansCase = classe(r); const i = attente.findIndex((x) => x.id === r.id);
      const colonnes = petit ? 3 : 4;
      const x = dansCase ? x0 + c.col * (w + gap) + (petit ? 23 : 47) + (range % colonnes) * (petit ? 40 : 45) : (petit ? 29 : 65) + (i % 10) * (petit ? 31 : 56);
      const y = dansCase ? y0 + c.row * dy + (petit ? 78 : 76) + Math.floor(range / colonnes) * (petit ? 22 : 27) : 61 + Math.floor(i / 10) * 33;
      objets.push({ ...rond(`robot-${r.id}`, x, y, String(r.id), dansCase ? c.ton : 'gris', petit ? 10 : 12), taille: petit ? 11 : 13, opacite: construction < 5 || actifs.includes(c.id) ? 1 : .23 });
    }
    if (construction === 5) {
      const selection = CASES.filter((c) => (phase ? retenus : actifs).includes(c.id));
      if (selection.length) {
        const cols = selection.map((c) => c.col); const rows = selection.map((c) => c.row);
        const gauche = x0 + Math.min(...cols) * (w + gap) - 4; const haut = y0 + Math.min(...rows) * dy - 4;
        const largeur = (Math.max(...cols) - Math.min(...cols)) * (w + gap) + w + 8;
        const hauteur = (Math.max(...rows) - Math.min(...rows)) * dy + h + 8;
        objets.push({ ...carte('groupe-compte', gauche + largeur / 2, haut + hauteur / 2, '', phase ? 'vert' : 'bleu', largeur, hauteur), contour: true });
      }
    }
    objets.push(texte('legende-calcul', petit ? 170 : 320, y0 + dy + h + 38, legende, petit ? 310 : 600, petit ? 16 : 19));
    return objets;
  };
  return { ...scene(dessiner(false), dessiner(true), bilan), hauteur: { large: 615, petit: 660 } };
}

export const BASES_BAYES = [
  base('Proportion et pourcentage', 'Une part se calcule en divisant le nombre de cas retenus par le nombre de cas du groupe de départ.', [
    pas('Compter tout le groupe', 'Voici vingt robots numérotés. Ce groupe entier sera notre point de départ : le nombre du bas dans une fraction, appelé dénominateur.', jetons(20, Array(20).fill(''), [], 0, 'Groupe de départ : 20 robots.')),
    pas('Retenir une partie', 'Cinq robots sont en panne. On les marque !. Ce sont les cas retenus : le nombre du haut, appelé numérateur. Les quinze autres sont sains.', jetons(20, Array.from({ length: 20 }, (_, i) => i < 5 ? '!' : '✓'), [0, 1, 2, 3, 4], 1, 'Part retenue : 5 robots sur les 20.')),
    pas('Dire la même part sur cent', '5 divisé par 20 vaut 0,25. Pour l’écrire en pourcentage, on multiplie par 100 : 25 %. Cela décrit une part, pas vingt-cinq robots dans ce groupe.', jetons(20, Array.from({ length: 20 }, (_, i) => i < 5 ? '!' : '✓'), [0, 1, 2, 3, 4], 2, '5 / 20 = 0,25 = 25 %. Toujours préciser : parmi qui ?')),
  ]),
  base('Matrice de confusion', 'Un tableau qui croise la réalité avec ce que dit le test : vrais positifs, faux négatifs, faux positifs et vrais négatifs.', [
    pas('Poser deux questions différentes', 'Le robot est-il vraiment en panne ? Le test sonne-t-il ? On réserve une colonne à chaque état réel et une ligne à chaque résultat du test. Positif veut seulement dire : le test annonce une panne.', matrice({ construction: 0, legende: 'Deux réponses oui/non → quatre cases', bilan: 'Les colonnes disent la réalité ; les lignes disent ce que le test annonce.' })),
    pas('Vrai positif : panne et alerte', 'Le robot 1 est réellement en panne et le test sonne. Il rejoint la case VP. « Positif » décrit l’alerte ; « vrai » signifie que cette alerte correspond à la réalité.', matrice({ construction: 1, legende: 'Panne OUI + alerte OUI → VP', bilan: 'Vrai positif = panne correctement détectée.' })),
    pas('Faux négatif : panne sans alerte', 'Le robot 5 est en panne, mais le test reste silencieux. Il rejoint FN. « Négatif » décrit le silence ; « faux » signifie que le test a manqué la panne.', matrice({ construction: 2, legende: 'Panne OUI + alerte NON → FN', bilan: 'Faux négatif = panne présente, mais non détectée.' })),
    pas('Faux positif : alerte sans panne', 'Le robot 6 est sain, mais le test sonne. Il rejoint FP. L’alerte est positive, mais elle est fausse : c’est une fausse alerte.', matrice({ construction: 3, legende: 'Panne NON + alerte OUI → FP', bilan: 'Faux positif = robot sain signalé à tort.' })),
    pas('Vrai négatif : ni panne ni alerte', 'Le robot 9 est sain et le test reste silencieux. Il rejoint VN. Ici le silence est correct. Vrai/faux parle de la justesse du test ; positif/négatif parle de sa réponse.', matrice({ construction: 4, legende: 'Panne NON + alerte NON → VN', bilan: 'Vrai négatif = absence de panne correctement reconnue.' })),
    pas('Ranger tous les robots', 'Les vingt robots prennent leur place. Quatre pannes sont détectées, une est manquée, trois robots sains déclenchent une alerte et douze restent silencieux. Chaque robot apparaît une seule fois.', matrice({ legende: '4 VP + 1 FN + 3 FP + 12 VN = 20', bilan: 'La matrice conserve les quatre résultats, y compris les deux sortes d’erreurs.' })),
  ]),
  base('Prévalence', 'La part de robots réellement en panne dans la population entière, quel que soit le résultat du test.', [
    pas('Partir de toute la population', 'Le cadre bleu prend les quatre cases : tous les vingt robots comptent. Pour la prévalence, on part de la population entière.', matrice({ legende: 'Groupe de départ : 20 robots', bilan: 'Le dénominateur est toute la population.' })),
    pas('Compter toutes les vraies pannes', 'On retient toute la colonne « En panne » : les quatre VP et le FN. Le robot que le test a manqué est quand même réellement en panne.', matrice({ retenus: ['VP', 'FN'], phase: 1, legende: 'Pannes réelles : 4 VP + 1 FN = 5', bilan: 'Le numérateur compte les pannes, avec ou sans alerte.' })),
    pas('Former la proportion', 'Il y a cinq pannes dans le groupe de vingt robots. On divise 5 par 20 : la prévalence vaut 25 %. Le test ne change pas l’état réel des robots.', matrice({ retenus: ['VP', 'FN'], phase: 2, legende: 'Prévalence : 5 / 20 = 25 %', bilan: 'Prévalence = (VP + FN) / population totale.' })),
  ]),
  base('Sensibilité', 'Parmi les robots vraiment en panne, la part de ceux que le test détecte.', [
    pas('Ne garder que les vraies pannes', 'On part cette fois des cinq robots de la colonne « En panne ». Les quinze robots sains sont estompés : ils ne participent pas au calcul de la sensibilité.', matrice({ groupe: 'pannes', legende: 'Groupe de départ : 5 pannes réelles', bilan: 'Dénominateur : VP + FN = 4 + 1 = 5.' })),
    pas('Repérer celles qui déclenchent le test', 'Parmi ces cinq pannes, quatre font sonner le test : les VP. La cinquième est un FN. Le cadre vert entoure seulement les pannes détectées.', matrice({ groupe: 'pannes', retenus: ['VP'], phase: 1, legende: 'Pannes détectées : 4 VP', bilan: 'Numérateur : les 4 vrais positifs.' })),
    pas('Mesurer la détection', 'Le test repère quatre pannes sur cinq : 4 divisé par 5 donne 80 %. Cette phrase part des pannes réelles ; elle ne dit pas encore si une alerte est fondée.', matrice({ groupe: 'pannes', retenus: ['VP'], phase: 2, legende: 'Sensibilité : 4 / 5 = 80 %', bilan: 'Sensibilité = VP / (VP + FN). Parmi les pannes, combien sont détectées ?' })),
  ]),
  base('Fausse alerte', 'Le test sonne sur un robot sain. Le taux de fausses alertes se calcule parmi tous les robots sains.', [
    pas('Ne garder que les robots sains', 'On part des quinze robots de la colonne « Sain ». Les cinq pannes sont estompées. C’est le groupe dans lequel le test peut sonner à tort.', matrice({ groupe: 'sains', legende: 'Groupe de départ : 15 robots sains', bilan: 'Dénominateur : FP + VN = 3 + 12 = 15.' })),
    pas('Repérer les alertes injustifiées', 'Trois de ces robots sains déclenchent une alerte : les FP. Les douze VN sont sains et restent silencieux. Ce sont deux résultats du test sur le même état réel.', matrice({ groupe: 'sains', retenus: ['FP'], phase: 1, legende: 'Fausses alertes : 3 FP', bilan: 'Numérateur : les 3 faux positifs.' })),
    pas('Mesurer le taux de fausses alertes', 'Trois fausses alertes sur quinze robots sains donnent 20 %. On divise par les robots sains, pas par les sept alertes. Ce sont deux questions différentes.', matrice({ groupe: 'sains', retenus: ['FP'], phase: 2, legende: 'Taux de fausses alertes : 3 / 15 = 20 %', bilan: 'Taux de fausses alertes = FP / (FP + VN).' })),
  ]),
  base('Probabilité sachant une alerte', 'La part de vraies pannes parmi les robots pour lesquels le test a sonné : le groupe de départ est maintenant celui des alertes.', [
    pas('Changer de groupe de départ', 'Cette fois, on sait que le test a sonné. On ne garde que la ligne « Test + » : quatre VP et trois FP, soit sept alertes. « Sachant une alerte » signifie : parmi ces sept robots.', matrice({ groupe: 'alertes', legende: 'Groupe de départ : 7 alertes', bilan: 'Dénominateur : VP + FP = 4 + 3 = 7.' })),
    pas('Chercher les pannes dans ce groupe', 'Parmi les sept alertes, quatre robots sont réellement en panne. Ce sont les mêmes quatre VP que pour la sensibilité, mais on les compare maintenant à sept alertes, et non à cinq pannes.', matrice({ groupe: 'alertes', retenus: ['VP'], phase: 1, legende: 'Alertes fondées : 4 VP', bilan: 'Le numérateur reste 4 ; le dénominateur a changé.' })),
    pas('Comprendre la question de Bayes', 'Une alerte est fondée dans 4 cas sur 7, soit environ 57 %. La sensibilité était 80 %. Bayes permet de calculer cette nouvelle proportion à partir de la prévalence et des performances du test.', matrice({ groupe: 'alertes', retenus: ['VP'], phase: 2, legende: 'Panne sachant alerte : 4 / 7 ≈ 57 %', bilan: 'P(alerte sachant panne) = 4/5 ; P(panne sachant alerte) = 4/7.' })),
  ]),
];
