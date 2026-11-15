// Bouton « Voir la solution » des ateliers. Il n'apparaît qu'après trois vérifications infructueuses.
// Il applique la bonne construction dans l'atelier : l'apprenant la vérifie ensuite comme s'il l'avait saisie.
// Usage dans un atelier :
//   const sol = useSolution();
//   à chaque vérification : sol.noter(reussi)
//   à côté du bouton de vérification : {sol.bouton(() => appliquerLaSolution())}
import { useState } from 'react';

export const ESSAIS_AVANT_SOLUTION = 3;

export function useSolution() {
  const [echecs, setEchecs] = useState(0);
  const [vue, setVue] = useState(false);
  return {
    echecs,
    noter: (reussi) => { if (!reussi) setEchecs((n) => n + 1); },
    bouton: (appliquer) => {
      if (vue) return <span className="conseil essais" data-testid="solution-appliquee">La solution est appliquée ci-dessus. Lancez la vérification pour voir ce qu'elle donne, puis comparez-la à vos essais.</span>;
      if (echecs >= ESSAIS_AVANT_SOLUTION) return <button type="button" className="bouton secondaire" data-testid="solution" onClick={() => { appliquer(); setVue(true); }}>Voir la solution</button>;
      if (echecs > 0) return <span className="conseil essais">Solution disponible après {ESSAIS_AVANT_SOLUTION} essais infructueux ({echecs} sur {ESSAIS_AVANT_SOLUTION}).</span>;
      return null;
    },
  };
}
