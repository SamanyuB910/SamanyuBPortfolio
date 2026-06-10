import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/#work", label: "work" },
  { href: "/#writing", label: "writing" },
  { href: "/#about", label: "about" },
  { href: "/#contact", label: "contact" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-gridline bg-void">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-mono text-sm text-ink no-underline hover:text-signal"
        >
          s.badam
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 sm:gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="px-2 py-2 font-mono text-xs text-muted no-underline hover:text-ink sm:px-3 sm:text-sm"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
