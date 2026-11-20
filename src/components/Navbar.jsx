import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

// Sections without their own nav item light up the closest item above them.
const SECTION_TO_LINK = {
  home: 'home',
  about: 'about',
  projects: 'projects',
  experience: 'projects',
  skills: 'projects',
  contact: 'contact'
};

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const listRef = useRef(null);
  const thumbRef = useRef(null);

  // Active section = the last section whose top has passed 40% of the viewport.
  useEffect(() => {
    const ids = Object.keys(SECTION_TO_LINK);
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = window.innerHeight * 0.4;
      let current = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom, the last section wins even if it is short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = 'contact';
      setActive(SECTION_TO_LINK[current]);
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Slide the highlight under the active link.
  useLayoutEffect(() => {
    const place = () => {
      const list = listRef.current;
      const thumb = thumbRef.current;
      const link = list?.querySelector(`a[href="#${active}"]`);
      if (!list || !thumb || !link) return;
      // First placement jumps into position; later changes slide.
      const first = thumb.style.opacity !== '1';
      if (first) thumb.style.transition = 'none';
      thumb.style.width = `${link.offsetWidth}px`;
      thumb.style.transform = `translateX(${link.offsetLeft}px)`;
      thumb.style.opacity = '1';
      if (first) {
        void thumb.offsetWidth; // commit before re-enabling transitions
        thumb.style.transition = '';
      }
    };
    place();
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener('resize', place);
  }, [active]);

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}`}>
      <nav className="nav-pill" aria-label="Primary" ref={listRef}>
        <span className="nav-thumb" ref={thumbRef} aria-hidden="true" />
        <ul>
          {LINKS.map(link => (
            <li key={link.id}>
              <a href={`#${link.id}`} aria-current={active === link.id ? 'true' : undefined}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
