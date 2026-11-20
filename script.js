// awaljati.github.io — progressive enhancement only; the page works without JS.
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------------- Star field with slow parallax ---------------- */
  (function starfield() {
    var canvas = document.querySelector(".starfield");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");

    // Three depth layers: far stars are small, dim and move least.
    var layers = [
      { count: 0.00018, size: [0.5, 1.0], alpha: [0.25, 0.55], speed: 0.03 },
      { count: 0.00008, size: [0.8, 1.4], alpha: [0.4, 0.75], speed: 0.07 },
      { count: 0.00002, size: [1.2, 2.0], alpha: [0.6, 0.95], speed: 0.14 }
    ];
    var stars = [];
    var w = 0, h = 0, dpr = 1, ticking = false, lastW = 0;

    function rand(a, b) { return a + Math.random() * (b - a); }

    function build() {
      stars = [];
      var area = w * h;
      layers.forEach(function (L, li) {
        var n = Math.min(Math.round(area * L.count), 320);
        for (var i = 0; i < n; i++) {
          stars.push({
            x: Math.random(),            // fractions of viewport, so resize keeps the sky
            y: Math.random(),
            r: rand(L.size[0], L.size[1]),
            a: rand(L.alpha[0], L.alpha[1]),
            l: li,
            warm: Math.random() < 0.08   // a few faintly warm stars
          });
        }
      });
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Rebuild only when width changes (mobile URL bar only changes height).
      if (w !== lastW || !stars.length) { build(); lastW = w; }
      draw();
    }

    function draw() {
      ticking = false;
      var scroll = reduceMotion.matches ? 0 : window.scrollY;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var y = (s.y * h - scroll * layers[s.l].speed) % h;
        if (y < 0) y += h;
        ctx.globalAlpha = s.a;
        ctx.fillStyle = s.warm ? "#F6DDA8" : "#DCE4F5";
        ctx.beginPath();
        ctx.arc(s.x * w, y, s.r, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function onScroll() {
      if (reduceMotion.matches || ticking) return;
      ticking = true;
      window.requestAnimationFrame(draw);
    }

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", draw);
    resize();
  })();

  /* ---------------- Header state ---------------- */
  var header = document.querySelector(".site-header");
  function headerState() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", headerState, { passive: true });
  headerState();

  /* ---------------- Mobile navigation ---------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var desktop = window.matchMedia("(min-width: 768px)");

  function setOpen(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && !desktop.matches) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") === "true" &&
          !nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
    var onBp = function () { if (desktop.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener("change", onBp);
  }

  /* ---------------- Project cards: expand / collapse ---------------- */
  document.querySelectorAll("[data-card]").forEach(function (card) {
    var btn = card.querySelector(".card-toggle");
    if (!btn) return;
    var label = btn.querySelector("span");
    var panel = card.querySelector(".card-details");
    var settle;

    function set(open) {
      card.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      if (label) label.textContent = open ? "Hide details" : "Details";
      if (!panel) return;
      clearTimeout(settle);
      // Animate from the current pixel height to the target, then settle.
      panel.style.height = panel.getBoundingClientRect().height + "px";
      void panel.offsetHeight; // commit the start value
      panel.style.height = open ? panel.scrollHeight + "px" : "0px";
      // A timeout (not transitionend) guarantees the final state even if
      // transitions are disabled or interrupted.
      settle = setTimeout(function () {
        panel.style.height = open ? "auto" : "0px";
      }, 340);
    }

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      set(btn.getAttribute("aria-expanded") !== "true");
    });

    // Clicking anywhere on the card also toggles, unless it was a link,
    // a button, or the user was selecting text.
    card.addEventListener("click", function (e) {
      if (e.target.closest("a, button")) return;
      var sel = window.getSelection && window.getSelection();
      if (sel && String(sel).length) return;
      set(btn.getAttribute("aria-expanded") !== "true");
    });
  });

  if (!("IntersectionObserver" in window)) return;

  /* ---------------- Reveal on scroll ---------------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion.matches) {
    reveals.forEach(function (el) { el.classList.remove("reveal"); });
  } else {
    // Stagger siblings that enter together (cards, skill groups, exp items)
    reveals.forEach(function (el) {
      var parent = el.parentElement;
      var group = parent ? Array.prototype.filter.call(parent.children, function (c) {
        return c.classList.contains("reveal");
      }) : [];
      var i = group.indexOf(el);
      if (i > 0) el.style.setProperty("--d", Math.min(i * 80, 240) + "ms");
    });

    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add("is-visible");
        revealObs.unobserve(el);
        // Hand transitions back to the element's own styles (e.g. card hover)
        setTimeout(function () {
          el.classList.remove("reveal", "is-visible");
          el.style.removeProperty("--d");
        }, 800);
      });
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0 });

    reveals.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---------------- Active section in nav ---------------- */
  if (!nav) return;
  var links = {};
  nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
    links[a.getAttribute("href").slice(1)] = a;
  });
  var sectionObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      Object.keys(links).forEach(function (id) {
        if (id === entry.target.id) links[id].setAttribute("aria-current", "true");
        else links[id].removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  Object.keys(links).forEach(function (id) {
    var s = document.getElementById(id);
    if (s) sectionObs.observe(s);
  });
  // Clear the marker while the hero is in view
  var hero = document.getElementById("top");
  if (hero) {
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        Object.keys(links).forEach(function (id) { links[id].removeAttribute("aria-current"); });
      }
    }, { rootMargin: "-45% 0px -50% 0px" }).observe(hero);
  }
})();
