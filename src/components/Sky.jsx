import { useEffect, useRef } from 'react';

const BASE = import.meta.env.BASE_URL;

/*
 * Fixed background, behind all content:
 *  1. Milky Way photo with a dark gradient overlay (text contrast) and slow
 *     parallax: it moves at a fraction of the scroll speed and fades out
 *     below the hero.
 *  2. Canvas star field, three depth layers with their own parallax
 *     (ported from the old script.js).
 * Both stay still under prefers-reduced-motion.
 */
export default function Sky() {
  const photoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const photo = photoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Far stars are small, dim and move least.
    const layers = [
      { count: 0.00018, size: [0.5, 1.0], alpha: [0.25, 0.55], speed: 0.03 },
      { count: 0.00008, size: [0.8, 1.4], alpha: [0.4, 0.75], speed: 0.07 },
      { count: 0.00002, size: [1.2, 2.0], alpha: [0.6, 0.95], speed: 0.14 }
    ];
    let stars = [];
    let w = 0, h = 0, lastW = 0, ticking = false;
    const rand = (a, b) => a + Math.random() * (b - a);

    const build = () => {
      stars = [];
      const area = w * h;
      layers.forEach((L, li) => {
        const n = Math.min(Math.round(area * L.count), 320);
        for (let i = 0; i < n; i++) {
          stars.push({
            x: Math.random(), // fractions of viewport, so resize keeps the sky
            y: Math.random(),
            r: rand(L.size[0], L.size[1]),
            a: rand(L.alpha[0], L.alpha[1]),
            l: li,
            warm: Math.random() < 0.08 // a few faintly warm stars
          });
        }
      });
    };

    const draw = () => {
      ticking = false;
      const scroll = reduceMotion.matches ? 0 : window.scrollY;

      if (photo) {
        // Photo drifts up at 30% of scroll speed and fades over ~1.2 screens.
        const vh = window.innerHeight || 1;
        photo.style.transform = `translate3d(0, ${(-scroll * 0.3).toFixed(1)}px, 0)`;
        photo.style.opacity = String(Math.max(0, 1 - window.scrollY / (vh * 1.2)).toFixed(3));
      }

      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        let y = (s.y * h - scroll * layers[s.l].speed) % h;
        if (y < 0) y += h;
        ctx.globalAlpha = s.a;
        ctx.fillStyle = s.warm ? '#F6DDA8' : '#DCE4F5';
        ctx.beginPath();
        ctx.arc(s.x * w, y, s.r, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      if (!ctx) return draw();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Rebuild only when width changes (mobile URL bar only changes height).
      if (w !== lastW || !stars.length) {
        build();
        lastW = w;
      }
      draw();
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(draw);
    };

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    reduceMotion.addEventListener?.('change', draw);
    resize();

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      reduceMotion.removeEventListener?.('change', draw);
    };
  }, []);

  return (
    <div className="sky" aria-hidden="true">
      <div className="sky-photo" ref={photoRef}>
        {/* TODO: credit the Milky Way photo source in the footer (see Footer.jsx). */}
        <div className="sky-img" style={{ backgroundImage: `url(${BASE}assets/milky-way.jpg)` }} />
        <div className="sky-overlay" />
      </div>
      <canvas className="starfield" ref={canvasRef} />
    </div>
  );
}
