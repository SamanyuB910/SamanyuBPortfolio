import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#writing", label: "Writing" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="mx-auto w-full max-w-5xl px-5 py-6 flex items-center justify-between gap-4">
      <Link href="/" className="font-mono text-sm text-ink no-underline">
        s.badam
      </Link>
      <nav aria-label="Main">
        <ul className="flex items-center gap-5">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-muted hover:text-ink no-underline"
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
    </header>
  );
}
