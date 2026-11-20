// Moved verbatim from the static index.html (content unchanged).
export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap about">
        <h2 id="about-title" className="section-title reveal"><span className="section-num" aria-hidden="true">01</span>About</h2>
        <div className="about-body">
          <p className="about-lead reveal">I study astronomy at Institut Teknologi Bandung, in the fast-track bachelor’s–master’s program with a minor in Instrumentation and Control Engineering.</p>
          <p className="about-text reveal">I work on the parts of a telescope that move it, sense it and record its data. Right now that means radio telescopes at ITB and Bosscha Observatory.</p>
          <dl className="facts reveal">
            <div><dt>University</dt><dd>ITB, 2023 – present</dd></div>
            <div><dt>Focus</dt><dd>Radio instrumentation</dd></div>
            <div><dt>Based in</dt><dd>Bandung, Indonesia</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
