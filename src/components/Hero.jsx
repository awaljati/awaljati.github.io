import Typewriter from './Typewriter.jsx';
import HeroCard from './HeroCard.jsx';
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons.jsx';

const BASE = import.meta.env.BASE_URL;
const PHRASES = ['Radio Astronomy', 'Telescope Instrumentation', 'Software for Observatories'];

const SOCIALS = [
  { label: 'GitHub (awaljati)', href: 'https://github.com/awaljati', Icon: GitHubIcon },
  // TODO: replace with your real LinkedIn profile URL. Until then this opens a
  // LinkedIn people search for your name (same placeholder as the Contact section).
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/search/results/people/?keywords=Awal%20Jati%20Asmoro',
    Icon: LinkedInIcon
  },
  { label: 'Email awaljati361@gmail.com', href: 'mailto:awaljati361@gmail.com', Icon: MailIcon }
];

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            Astronomy · Instrumentation · Radio Telescopes
          </p>

          <h1 id="hero-title" className="hero-title" translate="no">
            Awal Jati Asmoro
          </h1>

          <Typewriter className="hero-typed" phrases={PHRASES} />

          <p className="hero-lede">
            I research radio telescopes at Institut Teknologi Bandung and the Bosscha Observatory. I build the
            control and data-acquisition software that lets these instruments point, track and record the sky.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">View Projects</a>
            <a className="btn btn-ghost" href="#contact">Contact</a>
          </div>

          <div className="hero-links">
            <ul className="hero-socials">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a
                    className="icon-btn"
                    href={href}
                    aria-label={label}
                    title={label}
                    {...(href.startsWith('http') ? { rel: 'noopener' } : {})}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
            <span className="hero-links-rule" aria-hidden="true" />
            {/* TODO: add public/assets/CV_Awal.pdf (a public version without a phone number). */}
            <a className="cv-link" href={`${BASE}assets/CV_Awal.pdf`} download="CV_Awal_Jati_Asmoro.pdf">
              <DownloadIcon />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <HeroCard />
        </div>
      </div>
    </section>
  );
}
