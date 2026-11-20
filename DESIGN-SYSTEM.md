# Design System — awaljati.github.io

Source of truth for the portfolio. If any skill guidance conflicts with this file, this file wins.

Derived with the `ui-ux-pro-max` skill. The generic `--design-system` run returned a light brutalist
system that does not fit the brief (dark, astronomy, professional), so it was rejected. The palette is
adapted from the database's "time amber + night indigo on dark" profile (darkened background), and
the type stack combines verified typography results (Newsreader from *News Editorial*, Public Sans
from *Magazine Style*, JetBrains Mono from the *Editorial triple stack*).

## Direction

**"Observing log."** A quiet night-sky page that reads like a well-kept instrument notebook:
serif headings, plain sans body, monospace for technical data (frequencies, dates, tools).
One warm accent — starlight amber — used sparingly for links, focus and key highlights.
No gradients-on-everything, no glassmorphism, no neon glow.

**The one memorable element:** a hand-drawn SVG radio spectrum trace across the hero (axis labelled with the
CV's own L-band range, 1350–1450 MHz), with a single emission peak. It draws once on page load — the only
non-user-triggered motion on the page. Everything else stays quiet. (A star field was considered and cut:
one accessory removed.)

Audience: lecturers, researchers, recruiters in astronomy, instrumentation, software. Priority is
scannability: role, impact, tools — in that order.

## Color tokens (dark only)

| Token | Hex | Use | Contrast on `--bg` |
|---|---|---|---|
| `--bg` | `#070B14` | page background | — |
| `--surface` | `#0E1424` | cards, panels | — |
| `--surface-2` | `#141C30` | hover surface, chips | — |
| `--line` | `#1F2A42` | borders, dividers | decorative |
| `--text` | `#E8ECF4` | headings, body | 16.6:1 |
| `--text-muted` | `#9BA6BC` | secondary copy | 8.0:1 |
| `--text-faint` | `#7D88A0` | meta labels, dates | 5.5:1 (≥4.7 on all surfaces) |
| `--accent` | `#F2B84B` | links, focus ring, highlights | 11.0:1 |
| `--accent-ink` | `#070B14` | text on accent fills | 11.0:1 |
| ~~`--cool`~~ | — | removed in v2 (one accent only) | — |

Rules: never put body text in `--text-faint`; never use accent for large fills except small markers;
color is never the only signal (links are also underlined on hover/focus, current nav item also bold).

## Typography

Google Fonts only (the sole external dependency):

```
https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Public+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap
```

| Role | Family | Weight | Notes |
|---|---|---|---|
| Display / headings | Newsreader | 500–600 | tight leading 1.05–1.15, letter-spacing -0.01em |
| Body / UI | Public Sans | 400 / 600 | 16px base (1rem), line-height 1.6, max 68ch |
| Technical data | JetBrains Mono | 400–500 | 0.8125rem, sentence/original case. Only for real data: tech tags, frequencies, dates. Never for decorative labels |

Fluid scale:
- `--fs-hero: clamp(2.5rem, 7vw + 1rem, 5rem)`
- `--fs-h2: clamp(1.75rem, 3vw + 1rem, 2.75rem)`
- `--fs-h3: clamp(1.25rem, 1vw + 1rem, 1.5rem)`
- `--fs-body: 1rem` · `--fs-small: 0.875rem` · `--fs-mono: 0.8125rem`

## Spacing & layout

4px base. `--s-1: 4px` `--s-2: 8px` `--s-3: 12px` `--s-4: 16px` `--s-5: 24px` `--s-6: 32px`
`--s-7: 48px` `--s-8: 64px` `--s-9: 96px`.

- Container: `min(1120px, 100% - 2 * gutter)`, gutter 20px mobile / 32px ≥768px.
- Section vertical padding: `--s-8` mobile, `--s-9` desktop.
- Breakpoints (mobile-first): 640, 768, 1024px.
- Section header pattern: serif H2 only, left-aligned, with a 1px `--line` rule above the section. No eyebrows, no numeric indices (sections are not a sequence). Experience uses dates because it *is* a timeline.
- Projects: single column on mobile; the thesis (featured) spans full width with a media panel; others in a
  2-column grid ≥768px.

## Shape & elevation

- Radius: `--r-sm: 6px` (chips), `--r-md: 12px` (cards). No pills except tags.
- Borders over shadows: 1px `--line`. Hover: border shifts to a subtle lighter line + surface-2; no lift jumps.
- Media placeholders: CSS/SVG line-art on `--surface`, aspect-ratio reserved (no CLS), marked `TODO`.

## Motion

- Durations: 150ms (hover/color), 400ms (reveal). Easing `cubic-bezier(.2,.7,.2,1)`.
- Only opacity + transform (≤12px). Reveal on scroll via IntersectionObserver; content is visible without JS.
- `prefers-reduced-motion: reduce` → no reveal transforms, no smooth scroll, no star twinkle.

## Interaction & accessibility

- Visible focus: 2px `--accent` outline, 3px offset, on every interactive element (`:focus-visible`).
- Skip link to `#main`. Landmarks: header/nav, main, footer. One H1.
- Touch targets ≥44px. Mobile nav: disclosure button with `aria-expanded`, `aria-controls`.
- Icons: inline SVG, `aria-hidden="true"` when decorative; icon-only links get `aria-label`.
- External links: `rel="noopener"`, open in same tab; a small ↗ icon (SVG) only on outbound contact links.

## Anti-patterns (do not)

- Emoji as icons; purple-blue AI gradients; glowing text; fake stats/metrics.
- ALL-CAPS tracked labels, `01 / 02` section numbers, `A · B · C` meta strings, `→` appended to every link, one-word color accents in headlines.
- Invented numbers, links, testimonials. Content comes only from the CV.
- Phone number anywhere on the page.

## Hover & entrance (from design-taste-frontend, aesthetic guidance only)

- Hero enters once on load (heading + intro fade/translate 8px, then the spectrum draws).
- Linked cards/buttons: buttons darken/lighten on hover and press (`translateY(1px)`) on `:active`;
  text links draw their underline from left on hover/focus; project cards lift 2px on hover only when they are links.
- No captions under visuals. No violet/lavender anywhere in the palette.

---

## v2 revision (2026-11-20) — overrides the sections above where they differ

Client feedback: page felt empty and flat, no transitions, too much CV text. New rules:

- **Content budget:** no paragraph over 2 sentences; About max 3 sentences; project cards show title,
  one-line description and 3–4 tags, with details behind an expand control; Experience = 2 one-line items;
  organisational experience removed from the page; Skills as chip groups.
- **One accent only:** `--accent #F2B84B`. `--cool` is removed; tags use `--text-muted` on a translucent surface.
- **Background:** fixed dark radial gradient + canvas star field (3 depth layers, slow parallax on scroll).
  Static under reduced motion; gradient alone without JS.
- **Section markers (client request):** a small mono number (`01`–`05`) in accent, inline before each H2.
  Sentence case, not an all-caps eyebrow.
- **Scroll reveals (client request):** sections/cards fade + slide up 24px on entering the viewport
  (IntersectionObserver), 500ms, staggered ≤240ms. Content is visible without JS and under reduced motion.
- **Card hover:** lift 4px + accent border/glow, 300ms; card illustrations get one small transform on hover.
- **Type scale up:** hero name `clamp(3rem, 10vw, 7.5rem)`; H2 `clamp(2.25rem, 5vw, 4rem)`.
- **Section spacing:** 96px mobile, 144px desktop.
- Motion durations 200–500ms, easing `cubic-bezier(.2,.7,.2,1)`.

---

## v3 revision (2026-11-20): hero rebuilt in Vite + React. Overrides the sections above where they differ

Only the hero and nav changed; every other section keeps v2 rules and content.

- **Stack:** Vite + React (JS). Static files live in `public/assets/`; hashed build files go to `/static`.
- **Nav:** floating pill, sticky at the top: Home, About, Projects, Contact. The active section gets a sliding
  highlight plus a small accent dot (shape and color). Experience and Skills light up "Projects".
- **Hero:** two columns ≥1024px (copy left, card right); one column below (copy first, card after).
  Small label, serif name, typed accent phrase (italic serif), a 2-sentence lede, primary + ghost buttons,
  icon links (GitHub, LinkedIn, email) and a Download CV link. No phone number.
- **The one memorable element** is now the 3D lanyard card (React Bits "Lanyard": r3f + rapier + meshline).
  It lazy-loads only on large, hover-capable screens with hardware WebGL, and never under reduced motion.
  Everywhere else a static `card-front.png` is shown. The v1 spectrum trace is retired.
- **Background:** Milky Way photo under a dark overlay (≥80% `--bg` behind text, AA for `--text-muted`),
  30% scroll parallax, fading out below the hero, with the canvas star field on top.
- **Entrance:** hero copy rises 16px in a 70ms stagger, 500ms each; the card fades in. All off under reduced motion.
- The label "Astronomy · Instrumentation · Radio Telescopes" is a deliberate exception to the `A · B · C` rule (client request).
