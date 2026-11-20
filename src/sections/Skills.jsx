// Moved verbatim from the static index.html (content unchanged).
export default function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="wrap">
        <h2 id="skills-title" className="section-title reveal"><span className="section-num" aria-hidden="true">04</span>Skills</h2>
        <dl className="skills">
          <div className="skill-group reveal">
            <dt>Code</dt>
            <dd><ul className="chips" translate="no"><li>Python</li><li>JavaScript</li><li>Arduino / C++</li><li>HTML / CSS</li><li>Three.js</li><li>Firebase</li><li>Git</li></ul></dd>
          </div>
          <div className="skill-group reveal">
            <dt>Instrumentation</dt>
            <dd><ul className="chips"><li>Radio telescopes</li><li>Sensor integration</li><li>Data acquisition</li><li>Telescope control</li><li>Hardware troubleshooting</li></ul></dd>
          </div>
          <div className="skill-group reveal">
            <dt>Tools</dt>
            <dd><ul className="chips" translate="no"><li>VS Code</li><li>Arduino IDE</li><li>Fritzing</li><li>CorelDRAW</li></ul></dd>
          </div>
          <div className="skill-group reveal">
            <dt>Languages</dt>
            <dd><ul className="chips"><li>Indonesian (native)</li><li>English (intermediate)</li><li>Japanese (N5)</li></ul></dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
