"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle color theme"
      className="inline-flex size-9 items-center justify-center text-muted hover:text-ink"
    >
      {/* icon choice is pure CSS off the html class — no hydration mismatch */}
      <Sun size={16} className="light:hidden" />
      <Moon size={16} className="hidden light:inline" />
    </button>
  );
}
