// Moved verbatim from the static index.html (content unchanged).
export default function Contact() {
  return (
    <section className="section section-contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 id="contact-title" className="section-title reveal"><span className="section-num" aria-hidden="true">06</span>Contact</h2>
        <a className="contact-email reveal" href="mailto:awaljati361@gmail.com">awaljati361@gmail.com</a>
        <ul className="contact-links reveal">
          <li>
            {/* TODO: replace with your real LinkedIn profile URL (not visible in the CV PDF).
                 Until then this opens a LinkedIn people search for your name. */}
            <a className="text-link" href="https://www.linkedin.com/search/results/people/?keywords=Awal%20Jati%20Asmoro" rel="noopener">LinkedIn
              <svg className="icon-out" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M5 3h8v8M13 3 3 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </a>
          </li>
          <li>
            <a className="text-link" href="https://github.com/awaljati" rel="noopener">GitHub
              <svg className="icon-out" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M5 3h8v8M13 3 3 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
