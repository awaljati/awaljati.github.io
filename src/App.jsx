import Sky from './components/Sky.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import Experience from './sections/Experience.jsx';
import Skills from './sections/Skills.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import useLegacyInteractions from './hooks/useLegacyInteractions.js';

export default function App() {
  useLegacyInteractions();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Sky />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
