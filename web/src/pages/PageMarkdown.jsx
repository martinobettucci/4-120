import { useMemo } from 'react';
import { marked } from 'marked';

export default function PageMarkdown({ source, surtitre }) {
  const html = useMemo(() => marked.parse(source), [source]);
  return (
    <article className="page prose">
      <p className="surtitre">{surtitre}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
