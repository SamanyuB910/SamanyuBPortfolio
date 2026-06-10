"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { ScrollFx } from "@/components/scroll-fx";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        {children}
        <ScrollFx />
      </MotionConfig>
    </ThemeProvider>
  );
}
