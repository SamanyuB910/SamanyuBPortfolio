import { site } from "@/lib/site";
import { StaticGraphFigure } from "@/components/static-graph-figure";

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 pt-12 pb-16">
      <p className="font-mono text-xs text-muted">
        {site.location} · {site.education}
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {site.name}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
        {site.thesis}
      </p>

      <dl className="mt-8 flex flex-col gap-3 font-mono text-sm sm:flex-row sm:gap-8">
        {site.heroMetrics.map((m) => (
          <div key={m.value}>
            <dt className="sr-only">{m.label}</dt>
            <dd>
              <span className="text-signal">{m.value}</span>{" "}
              <span className="text-muted">{m.label}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12">
        <StaticGraphFigure />
      </div>
    </section>
  );
}
