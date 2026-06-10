"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

/**
 * Desktop-only scroll choreography. On fine-pointer viewports >=768px (and
 * only while motion is welcome — the gate is live, so an OS-level
 * reduced-motion toggle tears everything down mid-session) this lazily
 * imports Lenis + GSAP and wires:
 *  - Lenis smooth scrolling (native scroll preserved: sticky, keyboard, a11y)
 *  - same-page anchors routed through lenis.scrollTo, with focus moved to
 *    the target (the skip link stays a working WCAG 2.4.1 bypass)
 *  - THE one ScrollTrigger sequence: ledger rules draw in with read progress,
 *    entry content surfaces once. No pinning — CLS stays 0. Rebuilt per
 *    route so it survives client-side navigation.
 * Mobile and reduced-motion users never download any of it.
 */

const QUERIES = [
  "(prefers-reduced-motion: no-preference)",
  "(min-width: 768px)",
  "(pointer: fine)",
];

function subscribe(onChange: () => void) {
  const mqls = QUERIES.map((q) => window.matchMedia(q));
  mqls.forEach((m) => m.addEventListener("change", onChange));
  return () => mqls.forEach((m) => m.removeEventListener("change", onChange));
}

const snapshot = () => QUERIES.every((q) => window.matchMedia(q).matches);

type Libs = { gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType };

export function ScrollFx() {
  const live = useSyncExternalStore(subscribe, snapshot, () => false);
  const pathname = usePathname();
  const [libs, setLibs] = useState<Libs | null>(null);
  const lenisRef = useRef<{ destroy: () => void } | null>(null);

  // Lenis + GSAP wiring; lifecycle bound to the live gate
  useEffect(() => {
    if (!live) return;
    let cancelled = false;
    let teardown: (() => void) | null = null;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const l = new Lenis({ autoRaf: false });
      lenisRef.current = l;
      l.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => l.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Same-page anchors through Lenis. Capture phase: this runs before
      // Next's <Link> onClick, which bails once defaultPrevented is set.
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest("a");
        if (
          !a ||
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          (a.target && a.target !== "_self") ||
          a.hasAttribute("download")
        )
          return;
        const href = a.getAttribute("href") ?? "";
        if (!href.startsWith("/#") && !href.startsWith("#")) return;
        if (window.location.pathname !== "/") return; // let Next.js navigate
        const id = href.slice(href.indexOf("#") + 1);
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        l.scrollTo(el); // Lenis honors the target's scroll-margin-top
        if (window.location.hash === `#${id}`) {
          history.replaceState(null, "", `#${id}`);
        } else {
          history.pushState(null, "", `#${id}`);
        }
        // keep the focus contract of native fragment navigation
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      };
      document.addEventListener("click", onClick, true);

      setLibs({ gsap, ScrollTrigger });

      teardown = () => {
        document.removeEventListener("click", onClick, true);
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33); // restore gsap defaults
        l.destroy();
        lenisRef.current = null;
        setLibs(null);
      };
    })();

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [live]);

  // the ledger sequence; rebuilt on route change so triggers match the DOM
  useEffect(() => {
    if (!libs || pathname !== "/") return;
    const { gsap, ScrollTrigger } = libs;

    const ctx = gsap.context(() => {
      document
        .querySelectorAll<HTMLElement>("[data-ledger] > li")
        .forEach((li) => {
          const rule = li.querySelector("[data-rule]");
          if (rule) {
            gsap.fromTo(
              rule,
              { scaleX: 0 },
              {
                scaleX: 1,
                force3D: true, // keep the 1px rule on its own layer — no raster pop
                ease: "none",
                scrollTrigger: {
                  trigger: li,
                  start: "top 95%",
                  end: "top 58%",
                  scrub: true,
                },
              },
            );
          }
          const items = li.querySelectorAll("[data-ledger-item]");
          if (items.length) {
            gsap.from(items, {
              opacity: 0,
              y: 14,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: { trigger: li, start: "top 82%", once: true },
            });
          }
        });
    });
    // measure against the newly committed DOM
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [libs, pathname]);

  return null;
}
