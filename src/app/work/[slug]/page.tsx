import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getWork, getWorkBySlug } from "@/lib/content";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getWork().map((w) => ({ slug: w.meta.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) return {};
  return {
    title: `${entry.meta.title} — Samanyu Badam`,
    description: entry.meta.summary,
  };
}

const mdxBody =
  "[&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-3 " +
  "[&_p]:my-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 " +
  "[&_a]:text-signal [&_a]:underline [&_code]:font-mono [&_code]:text-sm [&_strong]:text-ink";

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) notFound();
  const { meta, body } = entry;

  return (
    <>
      <SiteNav />
      <main id="main" className="mx-auto w-full max-w-3xl scroll-mt-20 px-5 py-12 sm:px-8 sm:py-16">
        <Link href="/#work" className="font-mono text-xs text-muted no-underline hover:text-ink">
          ← selected work
        </Link>
        <header className="mt-6 border-b border-gridline pb-8">
          <p className="font-mono text-xs text-muted">
            {String(meta.order).padStart(2, "0")} · {meta.timeframe}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {meta.title}
          </h1>
          <p className="mt-2 font-mono text-sm text-muted">
            {meta.org} · {meta.role}
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {meta.metrics.map((m) => (
              <div key={m.label}>
                <dd className="font-mono text-lg text-signal">{m.value}</dd>
                <dt className="text-xs text-muted">
                  {m.label}
                  {m.detail ? ` — ${m.detail}` : ""}
                </dt>
              </div>
            ))}
          </dl>
          {meta.provisional && (
            <p className="mt-3 font-mono text-xs italic text-muted">
              Figures are provisional — work in progress.
            </p>
          )}

          <p className="mt-6 font-mono text-xs text-muted">
            {meta.stack.join(" · ")}
          </p>
          {meta.links.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-4">
              {meta.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-signal underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </header>

        <article className={`text-base text-muted ${mdxBody}`}>
          <MDXRemote source={body} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
