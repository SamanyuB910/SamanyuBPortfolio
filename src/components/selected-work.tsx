import Link from "next/link";
import { getWork } from "@/lib/content";

export function SelectedWork() {
  const work = getWork();
  return (
    <section id="work" className="mx-auto w-full max-w-5xl px-5 py-16">
      <h2 className="font-mono text-sm text-muted">01 — Selected work</h2>
      <ol className="mt-8 space-y-12">
        {work.map((entry, i) => (
          <li
            key={entry.meta.slug}
            className="grid gap-4 border-t border-gridline pt-6 sm:grid-cols-[auto_1fr_minmax(180px,auto)]"
          >
            <span className="font-mono text-sm text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="max-w-xl">
              <h3 className="font-display text-xl font-medium">
                <Link
                  href={`/work/${entry.meta.slug}`}
                  className="text-ink no-underline hover:text-signal"
                >
                  {entry.meta.title}
                </Link>
              </h3>
              <p className="mt-1 font-mono text-xs text-muted">
                {entry.meta.org} · {entry.meta.role} · {entry.meta.timeframe}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {entry.meta.summary}
              </p>
            </div>
            <dl className="space-y-2 font-mono text-xs sm:text-right">
              {entry.meta.metrics.map((m) => (
                <div key={m.label}>
                  <dd className="text-signal">{m.value}</dd>
                  <dt className="text-muted">{m.label}</dt>
                </div>
              ))}
              {entry.meta.provisional && (
                <p className="text-muted italic">figures provisional</p>
              )}
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}
