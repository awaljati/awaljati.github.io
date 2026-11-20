import { useEffect, useState } from 'react';

const TYPE_MS = 65;
const DELETE_MS = 32;
const HOLD_MS = 1700;
const GAP_MS = 350;
const STILL_MS = 3200; // reduced motion: swap whole phrases, no typing

/*
 * Types each phrase, holds, deletes, moves on. Screen readers get the full
 * list once (sr-only) and never hear the per-letter changes.
 */
export default function Typewriter({ phrases, className = '' }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [still, setStill] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setStill(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    const phrase = phrases[index];
    let t;
    if (still) {
      setText(phrase);
      t = setTimeout(() => setIndex(i => (i + 1) % phrases.length), STILL_MS);
    } else if (!deleting && text.length < phrase.length) {
      t = setTimeout(() => setText(phrase.slice(0, text.length + 1)), TYPE_MS);
    } else if (!deleting) {
      t = setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (text.length > 0) {
      t = setTimeout(() => setText(phrase.slice(0, text.length - 1)), DELETE_MS);
    } else {
      t = setTimeout(() => {
        setDeleting(false);
        setIndex(i => (i + 1) % phrases.length);
      }, GAP_MS);
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, still, phrases]);

  return (
    <p className={`typewriter ${className}`}>
      <span className="sr-only">{phrases.join(', ')}</span>
      <span aria-hidden="true">
        {text}
        <span className="typewriter-caret" />
      </span>
    </p>
  );
}
