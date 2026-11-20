import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';

// three / r3f / rapier live in their own chunk and load only when needed.
const Lanyard = lazy(() => import('./Lanyard/Lanyard.jsx'));

const BASE = import.meta.env.BASE_URL;
const FRONT = `${BASE}assets/card-front.png`;
const BACK = `${BASE}assets/card-back.png`;
const ALT =
  'ID card of Awal Jati Asmoro, astronomy student working on radio telescope instrumentation';

const DESKTOP_QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';

/** True only on a large screen with a capable, hardware-accelerated WebGL. */
function canRender3D() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (!window.matchMedia(DESKTOP_QUERY).matches) return false;
  const nav = navigator;
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency || 8) <= 2) return false;
  if (nav.deviceMemory && nav.deviceMemory < 4) return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    // Software rasterisers would make the physics scene stutter.
    if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)) return false;
    return true;
  } catch {
    return false;
  }
}

/** Resolve to the URL if the image loads, otherwise null. */
function probe(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

const idle = cb =>
  'requestIdleCallback' in window
    ? window.requestIdleCallback(cb, { timeout: 1200 })
    : window.setTimeout(cb, 300);

/** Any WebGL / loader failure drops back to the static card. */
class Fallback3D extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn('[hero] 3D card disabled:', err);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function StaticCard() {
  const [missing, setMissing] = useState(false);
  return (
    <figure className="card-static">
      <span className="card-static-strap" aria-hidden="true" />
      {missing ? (
        // TODO: shows only until public/assets/card-front.png exists.
        <div className="card-static-img card-static-placeholder" role="img" aria-label={ALT}>
          <span>Awal Jati Asmoro</span>
        </div>
      ) : (
        <img
          className="card-static-img"
          src={FRONT}
          alt={ALT}
          width="1000"
          height="1500"
          decoding="async"
          onError={() => setMissing(true)}
        />
      )}
    </figure>
  );
}

export default function HeroCard() {
  const ref = useRef(null);
  const [use3D, setUse3D] = useState(false);
  const [images, setImages] = useState(null);
  const [onScreen, setOnScreen] = useState(true);

  // Decide after first paint, and again if the viewport crosses the breakpoint.
  useEffect(() => {
    let cancelled = false;
    const mq = window.matchMedia(DESKTOP_QUERY);
    const decide = () => {
      if (!canRender3D()) {
        setUse3D(false);
        return;
      }
      idle(async () => {
        const [front, back] = await Promise.all([probe(FRONT), probe(BACK)]);
        if (cancelled) return;
        setImages({ front, back });
        setUse3D(true);
      });
    };
    decide();
    mq.addEventListener?.('change', decide);
    return () => {
      cancelled = true;
      mq.removeEventListener?.('change', decide);
    };
  }, []);

  // Pause the scene when the hero scrolls away.
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fallback = <StaticCard />;

  return (
    <div className={`hero-card${use3D ? ' is-3d' : ''}`} ref={ref}>
      {use3D && images ? (
        <Fallback3D fallback={fallback}>
          <Suspense fallback={fallback}>
            <div className="hero-canvas" role="img" aria-label={`${ALT}. Drag the card to swing it.`}>
              <Lanyard
                // Frames y ≈ -1.9…2.5: the strap's anchor (y = 4) stays above
                // the top edge and the card fills about half the height.
                position={[0, 0.3, 12.5]}
                fov={20}
                gravity={[0, -40, 0]}
                frontImage={images.front}
                backImage={images.back}
                imageFit="cover"
                active={onScreen}
              />
            </div>
          </Suspense>
        </Fallback3D>
      ) : (
        fallback
      )}
    </div>
  );
}
