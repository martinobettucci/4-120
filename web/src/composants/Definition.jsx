// La notion en bref : le texte de définition et les liens Wikipédia, repris aussi dans le cours de chaque module.
export default function Definition({ d }) {
  return (
    <div className="definition">
      {d.texte.map((t) => <p key={t}>{t}</p>)}
      <p className="en-savoir-plus"><b>Pour en savoir plus.</b>{' '}
        {d.liens.map((l, k) => <span key={l.url}>{k > 0 && ' · '}<a href={l.url} target="_blank" rel="noopener noreferrer" lang={l.langue}>{l.titre}</a> <small>(Wikipédia, {l.langue === 'fr' ? 'en français' : 'en anglais'})</small></span>)}
      </p>
    </div>
  );
}
