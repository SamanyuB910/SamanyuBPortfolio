"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import type { CaptionRefs } from "@/components/elimination-canvas";

const EliminationCanvas = dynamic(
  () => import("@/components/elimination-canvas"),
  { ssr: false },
);

const LIVE_QUERIES = [
  "(prefers-reduced-motion: no-preference)",
  "(pointer: fine)",
  "(min-width: 768px)",
];

function subscribe(onChange: () => void) {
  const mqls = LIVE_QUERIES.map((q) => window.matchMedia(q));
  mqls.forEach((m) => m.addEventListener("change", onChange));
  return () => mqls.forEach((m) => m.removeEventListener("change", onChange));
}

const liveSnapshot = () =>
  LIVE_QUERIES.every((q) => window.matchMedia(q).matches);

/**
 * Server-rendered static figure first (LCP, reduced-motion, mobile default);
 * on motion-tolerant fine-pointer desktops the live elimination canvas
 * hydrates lazily and fades in over it. The static SVG stays in the DOM
 * (visually hidden, still readable by assistive tech).
 */
export function HeroFigure({
  staticSvg,
  staticCaption,
}: {
  staticSvg: ReactNode;
  staticCaption: string;
}) {
  // false on the server and at hydration; flips after mount without setState-in-effect
  const live = useSyncExternalStore(subscribe, liveSnapshot, () => false);
  const [ready, setReady] = useState(false);
  const labelRef = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLSpanElement>(null);

  // stable identities so the canvas effect runs exactly once
  const captionRefs: CaptionRefs = useMemo(
    () => ({ label: labelRef, stats: statsRef }),
    [],
  );
  const onReady = useCallback(() => setReady(true), []);
  // render-time state adjustment: when the live gate drops (resize, OS
  // reduced-motion toggle), reset readiness so a future remount waits for
  // its own first painted frame before crossfading
  if (!live && ready) setReady(false);
  const showLive = live && ready;

  return (
    <figure className="w-full">
      <div className="relative">
        <div
          className={`transition-opacity duration-700 motion-reduce:transition-none ${showLive ? "opacity-0" : "opacity-100"}`}
        >
          {staticSvg}
        </div>
        {live && (
          <EliminationCanvas
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${showLive ? "opacity-100" : "opacity-0"}`}
            captionRefs={captionRefs}
            onReady={onReady}
          />
        )}
      </div>
      <figcaption className="mt-3 font-mono text-xs text-muted">
        {showLive ? (
          // hidden from AT: the static SVG (still in the DOM) carries the
          // complete description; this line churns with the animation
          <span aria-hidden="true">
            <span ref={labelRef} /> <span ref={statsRef} />
            <span className="mt-1 block">
              eliminating in min-fill order — fewer fill edges → smaller
              cliques → faster inference. move your cursor through the graph.
            </span>
          </span>
        ) : (
          <>
            {staticCaption}
            <span className="hidden sm:inline">
              {" "}
              Node numerals give the elimination order.
            </span>
          </>
        )}
      </figcaption>
    </figure>
  );
}
