"use client";

import { ThemeProvider } from "next-themes";
import { LazyMotion, MotionConfig } from "motion/react";
import { ScrollFx } from "@/components/scroll-fx";
import type { ReactNode } from "react";

// Motion's render features load async at idle — keeps the animation runtime
// off the LCP critical path (~6KB sync instead of the full bundle)
const whenIdle = () =>
  new Promise<void>((resolve) => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => resolve(), { timeout: 2000 });
    } else {
      setTimeout(resolve, 600);
    }
  });

const loadMotionFeatures = () =>
  whenIdle()
    .then(() => import("@/lib/motion-features"))
    .then((mod) => mod.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          {children}
          <ScrollFx />
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
