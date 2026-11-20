import { useEffect } from 'react';
import Sky from './components/Sky.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import Journey from './sections/Journey.jsx';
import Skills from './sections/Skills.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import useLegacyInteractions from './hooks/useLegacyInteractions.js';

export default function App() {
  useLegacyInteractions();

  // Deep links (/#projects …): the browser looks for the anchor before React
  // has rendered it, so jump there once the page exists.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id && document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Sky />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Journey />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
