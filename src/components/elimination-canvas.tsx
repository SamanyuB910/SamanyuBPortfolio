"use client";

import { useEffect, useRef, type RefObject } from "react";
import graphs from "@/generated/graphs.json";

export type CaptionRefs = {
  label: RefObject<HTMLSpanElement | null>;
  stats: RefObject<HTMLSpanElement | null>;
};

type Family = (typeof graphs.families)[number];

// timeline (ms) — the algorithm is the first impression: eliminate early
const RELAX_MS = 1800; // settle + cursor play before the solve starts
const STEP_MS = 320; // per eliminated vertex
const FLASH_MS = 360; // fill-edge flash on creation
const CLIQUE_HOLD_MS = 1800; // re-highlight the max clique at the end
const FADE_MS = 700; // crossfade between graph families
const ELIM_ANIM_MS = 420; // node collapse duration

const FAMILY_LABELS: Record<string, string> = {
  posegraph: "slam pose graph",
  circuit: "feature-circuit dag",
  circulant: "10-vertex circulant",
};

type Sim = {
  x: Float64Array;
  y: Float64Array;
  vx: Float64Array;
  vy: Float64Array;
  elimAt: Float64Array; // timeline ms at which node was eliminated, else -1
};

export default function EliminationCanvas({
  className,
  captionRefs,
  onReady,
}: {
  className?: string;
  captionRefs: CaptionRefs;
  onReady: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // captionRefs and onReady must be referentially stable (they are: HeroFigure
  // memoizes both), so this effect runs exactly once.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let readySignaled = false;

    const families = graphs.families as Family[];
    const view = graphs.view;

    // ---- colors, recached when the theme class flips --------------------
    let colors = readColors();
    function readColors() {
      const s = getComputedStyle(document.documentElement);
      return {
        gridline: s.getPropertyValue("--gridline").trim(),
        ink: s.getPropertyValue("--ink").trim(),
        muted: s.getPropertyValue("--muted").trim(),
        signal: s.getPropertyValue("--signal").trim(),
        void: s.getPropertyValue("--void").trim(),
      };
    }
    const themeObserver = new MutationObserver(() => {
      colors = readColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ---- sizing ----------------------------------------------------------
    let cssW = 0;
    let cssH = 0;
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      cssW = rect.width;
      cssH = rect.height;
      const d = dpr();
      canvas.width = Math.round(cssW * d);
      canvas.height = Math.round(cssH * d);
      ctx!.setTransform(d, 0, 0, d, 0, 0);
      // setting width/height wiped the bitmap after this frame's draw but
      // before paint; repaint now so the presented frame is never blank
      if (readySignaled) draw(t);
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    // re-run resize() when devicePixelRatio changes without a CSS box change
    // (e.g. dragging the window between 1x and 2x monitors)
    let dprMql: MediaQueryList | null = null;
    function onDprChange() {
      resize();
      armDprListener();
    }
    function armDprListener() {
      dprMql = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      dprMql.addEventListener("change", onDprChange, { once: true });
    }
    armDprListener();

    const sx = (gx: number) => (gx / view.width) * cssW;
    const sy = (gy: number) => (gy / view.height) * cssH;
    // node radii scale with the rendered width so the canvas matches the
    // static SVG (r=13 user units) during the crossfade
    const su = () => cssW / view.width;

    // ---- simulation state -------------------------------------------------
    let famIndex = 0;
    let fam = families[famIndex];
    let sim = initSim(fam);
    let firstCycle = true; // CSS handles the very first fade-in

    function initSim(f: Family): Sim {
      const n = f.n;
      const s: Sim = {
        x: new Float64Array(n),
        y: new Float64Array(n),
        vx: new Float64Array(n),
        vy: new Float64Array(n),
        elimAt: new Float64Array(n).fill(-1),
      };
      for (const node of f.nodes) {
        s.x[node.id] = node.x;
        s.y[node.id] = node.y;
      }
      return s;
    }

    // ---- pointer ----------------------------------------------------------
    const pointer = { gx: -1e6, gy: -1e6, active: false };
    function onPointerMove(e: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointer.gx = ((e.clientX - rect.left) / rect.width) * view.width;
      pointer.gy = ((e.clientY - rect.top) / rect.height) * view.height;
      pointer.active = true;
    }
    function onPointerLeave() {
      pointer.active = false;
    }
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    // ---- visibility: pause off-viewport and on tab blur -------------------
    let inView = true;
    let running = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncRunning();
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    function onVisibility() {
      syncRunning();
    }
    document.addEventListener("visibilitychange", onVisibility);
    function syncRunning() {
      const should = inView && !document.hidden;
      if (should && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!should) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }

    // ---- timeline ----------------------------------------------------------
    // t accumulates only while running, so pauses don't skip the show.
    let t = 0;
    let last = performance.now();
    let raf = 0;

    const elimDoneMs = (f: Family) => RELAX_MS + f.n * STEP_MS;
    const cycleMs = (f: Family) => elimDoneMs(f) + CLIQUE_HOLD_MS + FADE_MS;

    function stepOf(time: number): number {
      // number of fully-committed eliminations at timeline time
      return Math.max(0, Math.min(fam.n, Math.floor((time - RELAX_MS) / STEP_MS)));
    }

    // caption writes only when (family, step) changes — not at 60Hz
    let lastCaptionFam = -1;
    let lastCaptionK = -1;
    function updateCaption(time: number) {
      const label = captionRefs.label.current;
      const stats = captionRefs.stats.current;
      if (!label || !stats) return;
      const k = stepOf(time);
      if (famIndex === lastCaptionFam && k === lastCaptionK) return;
      lastCaptionFam = famIndex;
      lastCaptionK = k;
      let fills = 0;
      for (const fe of fam.fillEdges) if (fe[2] < k) fills++;
      let clique = 0;
      for (let i = 0; i < k; i++)
        if (fam.cliqueSizes[i] > clique) clique = fam.cliqueSizes[i];
      label.textContent = `fig. 1 — ${FAMILY_LABELS[fam.key] ?? fam.key} (${fam.n} vertices) ·`;
      stats.textContent =
        k === 0
          ? `relaxing — ${fam.m} edges`
          : `eliminated ${Math.min(k, fam.n)}/${fam.n} · fill edges ${fills} · max clique ${clique}`;
    }

    // ---- physics ------------------------------------------------------------
    function physics(dtMs: number, time: number) {
      const f = fam;
      const s = sim;
      const dt = Math.min(dtMs, 32) / 16.667; // normalize to ~60fps units
      const n = f.n;
      // spring to home layout
      for (let i = 0; i < n; i++) {
        if (s.elimAt[i] >= 0) continue;
        const home = f.nodes[i];
        s.vx[i] += (home.x - s.x[i]) * 0.012 * dt;
        s.vy[i] += (home.y - s.y[i]) * 0.012 * dt;
      }
      // pairwise repulsion (n <= 56 — trivial)
      for (let i = 0; i < n; i++) {
        if (s.elimAt[i] >= 0) continue;
        for (let j = i + 1; j < n; j++) {
          if (s.elimAt[j] >= 0) continue;
          let dx = s.x[i] - s.x[j];
          let dy = s.y[i] - s.y[j];
          const d2 = dx * dx + dy * dy;
          if (d2 > 130 * 130 || d2 < 1e-6) continue;
          const d = Math.sqrt(d2);
          const push = (320 / d2) * dt;
          dx /= d;
          dy /= d;
          s.vx[i] += dx * push;
          s.vy[i] += dy * push;
          s.vx[j] -= dx * push;
          s.vy[j] -= dy * push;
        }
      }
      // cursor repulsion within ~120 graph units
      if (pointer.active) {
        for (let i = 0; i < n; i++) {
          if (s.elimAt[i] >= 0) continue;
          const dx = s.x[i] - pointer.gx;
          const dy = s.y[i] - pointer.gy;
          const d2 = dx * dx + dy * dy;
          if (d2 > 120 * 120 || d2 < 1e-6) continue;
          const d = Math.sqrt(d2);
          const push = (5200 / (d2 + 400)) * dt;
          s.vx[i] += (dx / d) * push;
          s.vy[i] += (dy / d) * push;
        }
      }
      // integrate + damping
      for (let i = 0; i < n; i++) {
        if (s.elimAt[i] >= 0) continue;
        s.vx[i] *= 0.86;
        s.vy[i] *= 0.86;
        s.x[i] += s.vx[i] * dt;
        s.y[i] += s.vy[i] * dt;
      }
      // commit eliminations that the timeline has reached
      const k = stepOf(time);
      for (let i = 0; i < k; i++) {
        const v = fam.order[i];
        if (sim.elimAt[v] < 0) sim.elimAt[v] = RELAX_MS + (i + 1) * STEP_MS;
      }
    }

    // ---- drawing --------------------------------------------------------------
    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, cssW, cssH);
      const f = fam;
      const s = sim;
      const k = stepOf(time);
      const elimDone = time >= elimDoneMs(f);
      const cliqueSet = elimDone ? new Set(f.clique) : null;

      // symmetric dissolve at family boundaries: fade in at cycle start
      // (skipped on the very first cycle — CSS crossfades the canvas in),
      // fade out after the clique hold
      const fadeStart = elimDoneMs(f) + CLIQUE_HOLD_MS;
      let alpha = 1;
      if (!firstCycle && time < FADE_MS) alpha = time / FADE_MS;
      else if (time > fadeStart)
        alpha = Math.max(0, 1 - (time - fadeStart) / FADE_MS);
      ctx.globalAlpha = alpha;

      const nodeAlive = (v: number) => s.elimAt[v] < 0;
      const elimProgress = (v: number) =>
        s.elimAt[v] < 0 ? 0 : Math.min(1, (time - s.elimAt[v]) / ELIM_ANIM_MS);

      // original edges: full while both ends alive, ghosted after
      for (const [u, v] of f.edges) {
        const ghost = !nodeAlive(u) || !nodeAlive(v);
        const hot = cliqueSet && cliqueSet.has(u) && cliqueSet.has(v);
        ctx.strokeStyle = hot ? colors.signal : colors.gridline;
        ctx.globalAlpha = alpha * (hot ? 0.9 : ghost ? 0.18 : 0.8);
        ctx.lineWidth = hot ? 1.5 : 1;
        ctx.beginPath();
        ctx.moveTo(sx(s.x[u]), sy(s.y[u]));
        ctx.lineTo(sx(s.x[v]), sy(s.y[v]));
        ctx.stroke();
      }

      // fill-in edges created so far: flash solid then settle dashed
      for (const [u, v, step] of f.fillEdges) {
        if (step >= k) continue;
        const created = RELAX_MS + (step + 1) * STEP_MS;
        const age = time - created;
        const flashing = age < FLASH_MS;
        const hot = cliqueSet && cliqueSet.has(u) && cliqueSet.has(v);
        ctx.strokeStyle = colors.signal;
        ctx.globalAlpha = alpha * (flashing ? 1 : hot ? 0.9 : 0.45);
        ctx.lineWidth = flashing || hot ? 1.5 : 1;
        ctx.setLineDash(flashing ? [] : [4, 4]);
        ctx.beginPath();
        ctx.moveTo(sx(s.x[u]), sy(s.y[u]));
        ctx.lineTo(sx(s.x[v]), sy(s.y[v]));
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // nodes: hollow circles; eliminated ones collapse and dim; clique
      // nodes recover during the end hold so the final frame matches the
      // frozen SVG figure before the crossfade
      const holdT = elimDone
        ? Math.min(1, (time - elimDoneMs(f)) / ELIM_ANIM_MS)
        : 0;
      for (let i = 0; i < f.n; i++) {
        const p = elimProgress(i);
        const inClique = cliqueSet?.has(i) ?? false;
        const collapse = p * (inClique ? 1 - holdT : 1);
        const r = (13 - 10 * collapse) * su();
        ctx.globalAlpha = alpha * (1 - 0.7 * collapse);
        ctx.fillStyle = colors.void;
        ctx.strokeStyle = inClique ? colors.signal : colors.ink;
        ctx.lineWidth = inClique ? 1.75 : 1.25;
        ctx.beginPath();
        ctx.arc(sx(s.x[i]), sy(s.y[i]), Math.max(r, 1.2), 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    // ---- main loop -----------------------------------------------------------
    function frame(now: number) {
      if (!running) return;
      // rAF can resume after arbitrarily long suspensions (hidden tab,
      // occluded window); clamp so the timeline never skips the show
      const dt = Math.min(now - last, 100);
      last = now;
      t += dt;

      if (t >= cycleMs(fam)) {
        // next family
        famIndex = (famIndex + 1) % families.length;
        fam = families[famIndex];
        sim = initSim(fam);
        t = 0;
        firstCycle = false;
      }

      physics(dt, t);
      draw(t);
      updateCaption(t);

      if (!readySignaled) {
        readySignaled = true;
        onReady();
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      dprMql?.removeEventListener("change", onDprChange);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [captionRefs, onReady]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
