import { useEffect } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Accueil from './pages/Accueil.jsx';
import Module from './pages/Module.jsx';
import Panorama from './pages/Panorama.jsx';
import Atelier from './pages/Atelier.jsx';
import Notebooks from './pages/Notebooks.jsx';
import PageMarkdown from './pages/PageMarkdown.jsx';
import syllabus from '../../docs/syllabus-4-130.md?raw';
import consignes from '../../docs/consignes-production.md?raw';
import { MODULES } from './modules.js';

function HautDePage() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <HautDePage />
      <header className="entete">
        <NavLink to="/" className="marque"><span className="logo">4-130</span><span>Agents autonomes<br /><small>et aide à la décision</small></span></NavLink>
        <nav>
          <NavLink to="/syllabus">Syllabus</NavLink>
          <div className="menu-modules">
            <span>Modules</span>
            <div className="sous-menu">
              <NavLink to="/module/0"><b>0</b> Panorama des concepts</NavLink>
              {MODULES.map((m) => <NavLink key={m.n} to={`/module/${m.n}`}><b>{m.n}</b> {m.titre}</NavLink>)}
            </div>
          </div>
          <NavLink to="/notebooks">Notebooks</NavLink>
          <NavLink to="/atelier">Atelier 3D</NavLink>
          <NavLink to="/consignes">Conception</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/syllabus" element={<PageMarkdown source={syllabus} surtitre="Référentiel officiel ASCENT, Lot 4" />} />
          <Route path="/consignes" element={<PageMarkdown source={consignes} surtitre="Cahier de conception pédagogique" />} />
          <Route path="/module/0" element={<Panorama />} />
          <Route path="/module/:n" element={<Module />} />
          <Route path="/notebooks" element={<Notebooks />} />
          <Route path="/atelier" element={<Atelier />} />
          <Route path="*" element={<Accueil />} />
        </Routes>
      </main>
      <footer className="pied">
        <div>
          <strong>ASCENT 4-130</strong>, Les agents autonomes et aide à la décision. Session des 16 et 17 novembre 2026.
        </div>
        <div>Formation conçue et animée par Martino Bettucci, P2Enjoy SAS. <a href="https://p2enjoy.studio" target="_blank" rel="noreferrer">https://p2enjoy.studio</a></div>
      </footer>
    </>
  );
}
