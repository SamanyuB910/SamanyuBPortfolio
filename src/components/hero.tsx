import { site } from "@/lib/site";
import { StaticGraphFigure } from "@/components/static-graph-figure";

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="font-mono text-xs text-muted">
            {site.location} · b.s. cs + math, georgia tech, may 2028
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl xl:text-7xl">
            Samanyu
            <br />
            Badam
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {site.thesis}
          </p>

          <dl className="mt-10 space-y-3 border-t border-gridline pt-6 font-mono text-sm">
            {site.heroMetrics.map((m) => (
              <div key={m.value} className="flex flex-wrap items-baseline gap-x-3">
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="text-signal">{m.value}</span>{" "}
                  <span className="text-muted">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <StaticGraphFigure />
        </div>
      </div>
    </section>
  );
}
