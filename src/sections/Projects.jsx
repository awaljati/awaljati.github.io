// Moved verbatim from the static index.html (content unchanged).
export default function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="wrap">
        <h2 id="projects-title" className="section-title reveal"><span className="section-num" aria-hidden="true">02</span>Projects</h2>
    
        <div className="cards">
          {/* POAM-3m */}
          <article className="card reveal" data-card aria-labelledby="t-poam">
            <div className="card-media">
              {/* TODO (optional): swap this illustration for a photo of the POAM-3m dish. */}
              <svg className="ill ill-poam" viewBox="0 0 400 240" aria-hidden="true" focusable="false">
                <g className="ill-waves" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
                  <path d="M150 44 Q200 24 250 44" opacity=".9"/>
                  <path d="M162 28 Q200 12 238 28" opacity=".55"/>
                  <path d="M174 13 Q200 2 226 13" opacity=".3"/>
                </g>
                <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M112 112 Q200 196 288 112" stroke="var(--accent)" strokeWidth="2.5"/>
                  <path d="M112 112 Q200 128 288 112" opacity=".45"/>
                  <path d="M186 66 Q200 58 214 66"/>
                  <path d="M134 128 L190 68 M266 128 L210 68" opacity=".7"/>
                  <path d="M195 154 L197 140 H203 L205 154"/>
                  <circle cx="200" cy="168" r="6"/>
                  <path d="M182 166 L170 204 M218 166 L230 204 M156 204 H244 M184 204 L180 222 H220 L216 204"/>
                </g>
              </svg>
            </div>
            <div className="card-body">
              <p className="card-meta"><span>Undergraduate thesis</span><span className="mono">Aug 2026 – present</span></p>
              <h3 id="t-poam" className="card-title">POAM‑3m radio telescope</h3>
              <p className="card-desc">Getting ITB’s 3.0&nbsp;m radio dish ready for HI 21&nbsp;cm observation of the Milky Way.</p>
              <ul className="tags" aria-label="Technologies" translate="no">
                <li>Radio instrumentation</li><li>Telescope control</li><li>Data acquisition</li><li>NI-VISA</li>
              </ul>
              <button className="card-toggle" type="button" aria-expanded="false" aria-controls="d-poam">
                <span>Details</span>
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="card-details" id="d-poam">
                <div className="card-details-inner">
                  <p className="spec mono">3.0 m dual-reflector, Az-El mount, L-band 1350–1450 MHz</p>
                  <ul className="points">
                    <li>Restored remote Go and tracking control by fixing an NI-VISA driver mismatch and a Windows decimal setting.</li>
                    <li>Testing an RTAM-21 LNA (0.6&nbsp;dB noise figure, 30&nbsp;dB gain) and a 1–8&nbsp;GHz LNA with the T800 receiver.</li>
                    <li>Next: calibration, HI mapping, the Galactic rotation curve and an OH maser feasibility check.</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
    
          {/* BERT */}
          <article className="card reveal" data-card aria-labelledby="t-bert">
            <div className="card-media">
              {/* TODO (optional): swap this illustration for a photo of BERT. */}
              <svg className="ill ill-bert" viewBox="0 0 400 240" aria-hidden="true" focusable="false">
                <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <g className="ill-dish">
                    <path d="M118 62 Q104 148 188 166" stroke="var(--accent)" strokeWidth="2.5"/>
                    <path d="M118 62 L188 166" opacity=".45"/>
                    <path d="M152 116 L202 90"/>
                    <circle cx="207" cy="87" r="5"/>
                  </g>
                  <path d="M160 168 L126 222 M160 168 L196 222 M160 168 V224"/>
                  <path d="M162 180 C196 204 232 204 256 198" strokeDasharray="3 6" opacity=".6"/>
                  <rect x="258" y="146" width="92" height="58" rx="5"/>
                  <path d="M248 212 H360"/>
                  <path d="M266 190 L278 188 L288 191 L298 186 L306 170 L312 186 L322 189 L342 188" stroke="var(--accent)" strokeWidth="1.6"/>
                </g>
              </svg>
            </div>
            <div className="card-body">
              <p className="card-meta"><span>Bosscha Observatory</span><span className="mono">Sep 2026 – present</span></p>
              <h3 id="t-bert" className="card-title">BERT, portable radio telescope</h3>
              <p className="card-desc">Control and data-acquisition software for the Bosscha Educational Radio Telescope.</p>
              <ul className="tags" aria-label="Technologies" translate="no">
                <li>Telescope control</li><li>Motion programming</li><li>Data acquisition</li>
              </ul>
              <button className="card-toggle" type="button" aria-expanded="false" aria-controls="d-bert">
                <span>Details</span>
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="card-details" id="d-bert">
                <div className="card-details-inner">
                  <ul className="points">
                    <li>Programmed the movement system for controlled, automated operation.</li>
                    <li>Wrote the control and data-acquisition software, then tested and debugged it.</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
    
          {/* Roket Geprek */}
          <article className="card reveal" data-card aria-labelledby="t-roket">
            <div className="card-media">
              {/* TODO (optional): swap this illustration for a game screenshot. */}
              <svg className="ill ill-roket" viewBox="0 0 400 240" aria-hidden="true" focusable="false">
                <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="112" cy="176" r="48"/>
                  <path d="M76 160 Q112 150 148 164" opacity=".4"/>
                  <path d="M70 186 Q112 176 154 190" opacity=".4"/>
                  <ellipse cx="112" cy="176" rx="104" ry="40" opacity=".35" strokeDasharray="3 7" transform="rotate(-12 112 176)"/>
                  <path d="M148 140 C190 72 262 50 318 64" stroke="var(--accent)" strokeDasharray="6 8"/>
                  <circle cx="330" cy="168" r="12" opacity=".6"/>
                </g>
                <g transform="translate(318 64) rotate(14)">
                  <g className="ill-rocket">
                    <path d="M0 -9 C10 -9 20 -4 24 0 C20 4 10 9 0 9 Z" fill="var(--accent)"/>
                    <path d="M0 -9 L-7 -15 L-4 -6 M0 9 L-7 15 L-4 6" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round"/>
                  </g>
                </g>
                <g fill="currentColor" opacity=".7">
                  <circle cx="250" cy="150" r="1.6"/><circle cx="280" cy="112" r="1.2"/><circle cx="210" cy="40" r="1.4"/><circle cx="360" cy="110" r="1.2"/>
                </g>
              </svg>
            </div>
            <div className="card-body">
              <p className="card-meta"><span>NASA Space Apps Challenge 2026</span><span className="mono">Nov 2026</span></p>
              <h3 id="t-roket" className="card-title">Roket Geprek</h3>
              <p className="card-desc">An educational space mission design game. I led the project and built the game.</p>
              <ul className="tags" aria-label="Technologies" translate="no">
                <li>JavaScript</li><li>Three.js</li><li>Vite</li><li>Firebase</li>
              </ul>
              <button className="card-toggle" type="button" aria-expanded="false" aria-controls="d-roket">
                <span>Details</span>
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="card-details" id="d-roket">
                <div className="card-details-inner">
                  <ul className="points">
                    <li>Led a team from Astronomy, Data Science and Visual Communication Design.</li>
                    <li>Built interactive features with Three.js and Firebase Realtime Database, on a Git and GitHub workflow.</li>
                  </ul>
                  {/* TODO: add repo/demo links here if public. */}
                </div>
              </div>
            </div>
          </article>
    
          {/* Gray Code Encoder */}
          <article className="card reveal" data-card aria-labelledby="t-gray">
            <div className="card-media">
              {/* TODO (optional): swap this illustration for a photo of the encoder prototype.
                   The disk is a real 6-bit reflected Gray code, simplified from the 10-bit build. */}
              <svg className="ill ill-gray" viewBox="0 0 400 240" aria-hidden="true" focusable="false">
                <g transform="translate(100 20)">
                  <g className="ill-disk">
                    <circle cx="100" cy="100" r="99" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".4"/>
                    <path d="M109.31 5.46 A95 95 0 0 1 127.58 9.09 L124.96 17.70 A86 86 0 0 0 108.43 14.41Z M144.78 16.22 A95 95 0 0 1 160.27 26.56 L154.56 33.52 A86 86 0 0 0 140.54 24.15Z M173.44 39.73 A95 95 0 0 1 183.78 55.22 L175.85 59.46 A86 86 0 0 0 166.48 45.44Z M190.91 72.42 A95 95 0 0 1 194.54 90.69 L185.59 91.57 A86 86 0 0 0 182.30 75.04Z M194.54 109.31 A95 95 0 0 1 190.91 127.58 L182.30 124.96 A86 86 0 0 0 185.59 108.43Z M183.78 144.78 A95 95 0 0 1 173.44 160.27 L166.48 154.56 A86 86 0 0 0 175.85 140.54Z M160.27 173.44 A95 95 0 0 1 144.78 183.78 L140.54 175.85 A86 86 0 0 0 154.56 166.48Z M127.58 190.91 A95 95 0 0 1 109.31 194.54 L108.43 185.59 A86 86 0 0 0 124.96 182.30Z M90.69 194.54 A95 95 0 0 1 72.42 190.91 L75.04 182.30 A86 86 0 0 0 91.57 185.59Z M55.22 183.78 A95 95 0 0 1 39.73 173.44 L45.44 166.48 A86 86 0 0 0 59.46 175.85Z M26.56 160.27 A95 95 0 0 1 16.22 144.78 L24.15 140.54 A86 86 0 0 0 33.52 154.56Z M9.09 127.58 A95 95 0 0 1 5.46 109.31 L14.41 108.43 A86 86 0 0 0 17.70 124.96Z M5.46 90.69 A95 95 0 0 1 9.09 72.42 L17.70 75.04 A86 86 0 0 0 14.41 91.57Z M16.22 55.22 A95 95 0 0 1 26.56 39.73 L33.52 45.44 A86 86 0 0 0 24.15 59.46Z M39.73 26.56 A95 95 0 0 1 55.22 16.22 L59.46 24.15 A86 86 0 0 0 45.44 33.52Z M72.42 9.09 A95 95 0 0 1 90.69 5.46 L91.57 14.41 A86 86 0 0 0 75.04 17.70Z M116.19 18.59 A83 83 0 0 1 146.11 30.99 L141.11 38.47 A74 74 0 0 0 114.44 27.42Z M169.01 53.89 A83 83 0 0 1 181.41 83.81 L172.58 85.56 A74 74 0 0 0 161.53 58.89Z M181.41 116.19 A83 83 0 0 1 169.01 146.11 L161.53 141.11 A74 74 0 0 0 172.58 114.44Z M146.11 169.01 A83 83 0 0 1 116.19 181.41 L114.44 172.58 A74 74 0 0 0 141.11 161.53Z M83.81 181.41 A83 83 0 0 1 53.89 169.01 L58.89 161.53 A74 74 0 0 0 85.56 172.58Z M30.99 146.11 A83 83 0 0 1 18.59 116.19 L27.42 114.44 A74 74 0 0 0 38.47 141.11Z M18.59 83.81 A83 83 0 0 1 30.99 53.89 L38.47 58.89 A74 74 0 0 0 27.42 85.56Z M53.89 30.99 A83 83 0 0 1 83.81 18.59 L85.56 27.42 A74 74 0 0 0 58.89 38.47Z M127.17 34.40 A71 71 0 0 1 165.60 72.83 L157.28 76.27 A62 62 0 0 0 123.73 42.72Z M165.60 127.17 A71 71 0 0 1 127.17 165.60 L123.73 157.28 A62 62 0 0 0 157.28 123.73Z M72.83 165.60 A71 71 0 0 1 34.40 127.17 L42.72 123.73 A62 62 0 0 0 76.27 157.28Z M34.40 72.83 A71 71 0 0 1 72.83 34.40 L76.27 42.72 A62 62 0 0 0 42.72 76.27Z M141.72 58.28 A59 59 0 0 1 141.72 141.72 L135.36 135.36 A50 50 0 0 0 135.36 64.64Z M58.28 141.72 A59 59 0 0 1 58.28 58.28 L64.64 64.64 A50 50 0 0 0 64.64 135.36Z M147.00 100.00 A47 47 0 0 1 53.00 100.00 L62.00 100.00 A38 38 0 0 0 138.00 100.00Z M100.00 135.00 A35 35 0 0 1 100.00 65.00 L100.00 74.00 A26 26 0 0 0 100.00 126.00Z" fill="currentColor" opacity=".7"/>
                    <circle cx="100" cy="100" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </g>
                  <rect x="92" y="-6" width="16" height="70" rx="3" fill="none" stroke="var(--accent)" strokeWidth="2"/>
                  <g fill="var(--accent)">
                    <circle cx="100" cy="8" r="2"/><circle cx="100" cy="20" r="2"/><circle cx="100" cy="32" r="2"/>
                    <circle cx="100" cy="44" r="2"/><circle cx="100" cy="56" r="2"/>
                  </g>
                </g>
              </svg>
            </div>
            <div className="card-body">
              <p className="card-meta"><span>Bosscha Observatory</span><span className="mono">Aug 2026</span></p>
              <h3 id="t-gray" className="card-title">Gray code encoder</h3>
              <p className="card-desc">A 10-bit Gray code encoder prototype for measuring a telescope’s hour angle.</p>
              <ul className="tags" aria-label="Technologies" translate="no">
                <li>Arduino / C++</li><li>Sensors</li><li>Fritzing</li><li>CorelDRAW</li>
              </ul>
              <button className="card-toggle" type="button" aria-expanded="false" aria-controls="d-gray">
                <span>Details</span>
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="card-details" id="d-gray">
                <div className="card-details-inner">
                  <ul className="points">
                    <li>Wrote Arduino code for sensor reading, data processing and motor integration.</li>
                    <li>Built a hand-controlled telescope and drew its schematics in CorelDRAW and Fritzing.</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
