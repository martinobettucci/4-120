import { useState } from 'react';

// Question à choix avec retour explicatif pour chaque réponse (bonne ou non) et indice facultatif.
// `choix` : liste de [texte, retour]. `surReussite` est appelé à la première bonne réponse.
export default function Qcm({ q, choix, ok, indice, etiquette = 'Exercice', surReussite, memo }) {
  const [essais, setEssais] = useState(memo ? [ok] : []);
  const [aide, setAide] = useState(false);
  const dernier = essais[essais.length - 1];
  const reussi = essais.includes(ok);
  const repondre = (i) => {
    if (reussi || essais.includes(i)) return;
    setEssais([...essais, i]);
    if (i === ok && surReussite) surReussite(essais.length === 0);
  };
  return (
    <div className="exercice">
      <p className="question"><b>{etiquette}.</b> {q}</p>
      <div className="choix">
        {choix.map(([texte], i) => (
          <button key={texte} className={essais.includes(i) ? (i === ok ? 'juste' : 'faux') : ''} onClick={() => repondre(i)} disabled={reussi && i !== ok}>{texte}</button>
        ))}
      </div>
      {dernier !== undefined && (
        <p className={`retour ${dernier === ok ? 'juste' : 'faux'}`} role="status">{dernier === ok ? '' : 'Pas encore. '}{choix[dernier][1]}{dernier !== ok ? ' Essayez une autre réponse.' : ''}</p>
      )}
      {indice && !reussi && (aide ? <p className="indice"><b>Indice.</b> {indice}</p> : <button className="lien" onClick={() => setAide(true)}>Besoin d'un indice ?</button>)}
    </div>
  );
}
