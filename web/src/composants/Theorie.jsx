// Affiche un cours : blocs titrés, avec paragraphes, formules, pseudo-code et listes.
// Convention des lignes : "= " formule, "> " code, "- " élément de liste, sinon paragraphe.
export default function Theorie({ blocs }) {
  return (
    <div className="theorie">
      {blocs.map(([titre, lignes]) => {
        const sortie = []; let code = []; let liste = [];
        const vider = () => {
          if (code.length) { sortie.push(<pre key={`c${sortie.length}`}><code>{code.join('\n')}</code></pre>); code = []; }
          if (liste.length) { sortie.push(<ul key={`l${sortie.length}`}>{liste.map((x) => <li key={x}>{x}</li>)}</ul>); liste = []; }
        };
        lignes.forEach((l) => {
          if (l.startsWith('> ')) { if (liste.length) vider(); code.push(l.slice(2)); }
          else if (l.startsWith('- ')) { if (code.length) vider(); liste.push(l.slice(2)); }
          else { vider(); sortie.push(l.startsWith('= ') ? <p className="formule" key={`f${sortie.length}`}>{l.slice(2)}</p> : <p key={`p${sortie.length}`}>{l}</p>); }
        });
        vider();
        return <section key={titre}><h3>{titre}</h3>{sortie}</section>;
      })}
    </div>
  );
}
