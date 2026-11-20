import { useEffect } from 'react';

/*
 * Behaviour ported from the old script.js so the moved sections work exactly
 * as before: project cards expand/collapse, and `.reveal` elements fade in on
 * scroll. The sections are static markup, so working on the DOM here is safe
 * (React never re-renders those nodes).
 */
export default function useLegacyInteractions() {
  // Project cards: expand / collapse
  useEffect(() => {
    const cleanups = [];
    document.querySelectorAll('[data-card]').forEach(card => {
      const btn = card.querySelector('.card-toggle');
      if (!btn) return;
      const label = btn.querySelector('span');
      const panel = card.querySelector('.card-details');
      let settle;

      const set = open => {
        card.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
        if (label) label.textContent = open ? 'Hide details' : 'Details';
        if (!panel) return;
        clearTimeout(settle);
        // Animate from the current pixel height to the target, then settle.
        panel.style.height = panel.getBoundingClientRect().height + 'px';
        void panel.offsetHeight; // commit the start value
        panel.style.height = open ? panel.scrollHeight + 'px' : '0px';
        // A timeout (not transitionend) guarantees the final state even if
        // transitions are disabled or interrupted.
        settle = setTimeout(() => {
          panel.style.height = open ? 'auto' : '0px';
        }, 340);
      };

      const onBtn = e => {
        e.stopPropagation();
        set(btn.getAttribute('aria-expanded') !== 'true');
      };
      // Clicking anywhere on the card also toggles, unless it was a link,
      // a button, or the user was selecting text.
      const onCard = e => {
        if (e.target.closest('a, button')) return;
        const sel = window.getSelection && window.getSelection();
        if (sel && String(sel).length) return;
        set(btn.getAttribute('aria-expanded') !== 'true');
      };

      btn.addEventListener('click', onBtn);
      card.addEventListener('click', onCard);
      cleanups.push(() => {
        clearTimeout(settle);
        btn.removeEventListener('click', onBtn);
        card.removeEventListener('click', onCard);
      });
    });
    return () => cleanups.forEach(fn => fn());
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll('.reveal'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.remove('reveal'));
      return;
    }

    // Stagger siblings that enter together (cards, skill groups, exp items)
    reveals.forEach(el => {
      const parent = el.parentElement;
      const group = parent ? Array.from(parent.children).filter(c => c.classList.contains('reveal')) : [];
      const i = group.indexOf(el);
      if (i > 0) el.style.setProperty('--d', Math.min(i * 80, 240) + 'ms');
    });

    const timers = [];
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add('is-visible');
          obs.unobserve(el);
          // Hand transitions back to the element's own styles (e.g. card hover)
          timers.push(
            setTimeout(() => {
              el.classList.remove('reveal', 'is-visible');
              el.style.removeProperty('--d');
            }, 800)
          );
        });
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0 }
    );
    reveals.forEach(el => obs.observe(el));
    return () => {
      obs.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);
}
