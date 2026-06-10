import Link from "next/link";
import { getWork } from "@/lib/content";

export function SelectedWork() {
  const work = getWork();
  return (
    <section
      id="work"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28"
    >
      <h2 className="font-mono text-xs tracking-widest text-muted">
        01 — selected work
      </h2>
      <ol className="mt-10" data-ledger>
        {work.map((entry, i) => (
          <li key={entry.meta.slug} className="group">
            {/* drawn in by the one ScrollTrigger sequence; full-width by default */}
            <span aria-hidden data-rule className="ledger-rule" />
            <Link
              href={`/work/${entry.meta.slug}`}
              className="grid gap-x-8 gap-y-4 py-8 no-underline sm:grid-cols-[3rem_1fr_minmax(200px,16rem)] sm:py-10"
            >
              <span
                aria-hidden
                data-ledger-item
                className="font-mono text-sm text-muted transition-colors group-hover:text-signal"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="block max-w-xl" data-ledger-item>
                <span className="block font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-signal">
                  {entry.meta.title}
                </span>
                <span className="mt-2 block font-mono text-xs text-muted">
                  {entry.meta.org} · {entry.meta.timeframe}
                </span>
                <span className="mt-4 block text-sm leading-relaxed text-muted">
                  {entry.meta.summary}
                </span>
              </span>
              <span
                className="block space-y-3 font-mono text-xs sm:text-right"
                data-ledger-item
              >
                {entry.meta.metrics.slice(0, 3).map((m) => (
                  <span key={m.label} className="block">
                    <span className="block text-base text-signal">
                      {m.value}
                    </span>
                    <span className="block text-muted">{m.label}</span>
                  </span>
                ))}
                {entry.meta.provisional && (
                  <span className="block italic text-muted">
                    figures provisional
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
