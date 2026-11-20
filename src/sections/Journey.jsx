import { useEffect, useRef, useState } from 'react';

/*
 * Education + Experience & Organisations, as two numbered timelines.
 * Content comes only from CV_Awal.pdf. The item nearest the reading line is
 * "active"; the others step down in color (never below WCAG AA).
 *
 * `logo` is optional: drop an image in public/assets/logos/ and set e.g.
 * logo: 'logos/itb.png'. Without it, a monogram tile is shown.
 * TODO (optional): add real logos for ITB, Bosscha, Himastron and UKJ.
 */
const EDUCATION = [
  {
    org: 'Institut Teknologi Bandung',
    mono: 'ITB',
    date: '2023 – Present',
    role: 'Bachelor of Science in Astronomy',
    place: 'Minor in Instrumentation and Control Engineering',
    tag: 'Fast-track B.Sc.–M.Sc.'
  }
];

const EXPERIENCE = [
  {
    org: 'Institut Teknologi Bandung',
    mono: 'ITB',
    date: 'Oct 2026 – Present',
    role: 'Teaching Assistant',
    place: 'Basic Astronomy Laboratory II (Radio)',
    tag: 'Teaching'
  },
  {
    org: 'Bosscha Observatory',
    mono: 'BO',
    date: 'Aug 2026',
    role: 'Research Intern',
    place: 'Telescope instrumentation',
    tag: 'Research'
  },
  {
    org: 'Himpunan Mahasiswa Astronomi ITB',
    mono: 'HMA',
    date: 'Apr 2025 – Mar 2026',
    role: 'Capital and Liquidity Management Staff',
    place: 'Diastima merchandise',
    tag: 'Organisation'
  },
  {
    org: 'Unit Kebudayaan Jepang ITB',
    mono: 'UKJ',
    date: 'Jan – Aug 2025',
    role: 'Business & Inventory Staff',
    place: 'Merchandise and inventory',
    tag: 'Organisation'
  },
  {
    org: 'Unit Kebudayaan Jepang ITB',
    mono: 'UKJ',
    date: '2025',
    role: 'Operations & Logistics Committee',
    place: 'Bunka no Hi 2025',
    tag: 'Committee'
  },
  {
    org: 'Himpunan Mahasiswa Astronomi ITB',
    mono: 'HMA',
    date: 'Nov 2024 – Feb 2025',
    role: 'Fundraising Staff',
    place: 'Asmoscura Astronomy Exhibition',
    tag: 'Committee'
  },
  {
    org: 'Himpunan Mahasiswa Astronomi ITB',
    mono: 'HMA',
    date: 'Sep – Oct 2024',
    role: 'Fundraising Staff',
    place: 'Himastron Graduation Event',
    tag: 'Committee'
  }
];

const BASE = import.meta.env.BASE_URL;

function Timeline({ items, start }) {
  const listRef = useRef(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [progress, setProgress] = useState(0);

  // Active = last item whose node has passed 55% of the viewport height.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const nodes = list.querySelectorAll('.tl-node');
      const line = window.innerHeight * 0.55;
      let idx = 0;
      nodes.forEach((n, i) => {
        if (n.getBoundingClientRect().top <= line) idx = i;
      });
      setActive(idx);
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

  const current = hovered ?? active;

  // The accent rail fills down to the current node.
  useEffect(() => {
    const list = listRef.current;
    const first = list?.querySelector('.tl-node');
    const node = list?.querySelectorAll('.tl-node')[current];
    if (first && node) setProgress(node.offsetTop - first.offsetTop);
  }, [current]);

  return (
    <ol
      className="tl"
      ref={listRef}
      style={{ '--tl-progress': `${progress}px` }}
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((item, i) => (
        <li
          key={`${item.org}-${item.role}-${item.date}`}
          className={`tl-item${i === current ? ' is-active' : ''}`}
          onMouseEnter={() => setHovered(i)}
        >
          <span className="tl-node mono" aria-hidden="true">{start + i}</span>
          <div className="tl-body">
            <div className="tl-head">
              <span className="tl-logo" aria-hidden="true">
                {item.logo ? <img src={`${BASE}assets/${item.logo}`} alt="" width="44" height="44" /> : item.mono}
              </span>
              <p className="tl-org">{item.org}</p>
              <p className="tl-date mono">{item.date}</p>
            </div>
            <h4 className="tl-role">{item.role}</h4>
            <p className="tl-meta">
              <span>{item.place}</span>
              <span className="tl-dot" aria-hidden="true" />
              <span className="tl-tag">{item.tag}</span>
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Journey() {
  return (
    <section className="section journey" id="experience" aria-labelledby="journey-title">
      <div className="wrap">
        <h2 id="journey-title" className="sr-only">Education and experience</h2>
        <div className="journey-grid">
          <div className="journey-col journey-col-edu">
            <h3 className="journey-title reveal">
              <span className="section-num" aria-hidden="true">02</span>Education
            </h3>
            <div className="reveal">
              <Timeline items={EDUCATION} start={1} />
            </div>
          </div>
          <div className="journey-col">
            <h3 className="journey-title reveal">
              <span className="section-num" aria-hidden="true">03</span>Experience &amp; Organisations
            </h3>
            <div className="reveal">
              <Timeline items={EXPERIENCE} start={EDUCATION.length + 1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
