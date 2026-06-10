"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

/**
 * Subtle entrance reveal (m.div — features arrive via LazyMotion in
 * Providers). MotionConfig reducedMotion="user" strips the transform for
 * reduced-motion users; a <noscript> override in the layout keeps content
 * visible without JavaScript.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </m.div>
  );
}
