import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getWriting, getWritingBySlug } from "@/lib/content";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getWriting().map((w) => ({ slug: w.meta.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);
  if (!entry) return {};
  return {
    title: `${entry.meta.title} — Samanyu Badam`,
    description: entry.meta.abstract,
  };
}

const mdxBody =
  "[&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-3 " +
  "[&_p]:my-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 " +
  "[&_a]:text-signal [&_a]:underline [&_code]:font-mono [&_code]:text-sm [&_strong]:text-ink";

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);
  if (!entry) notFound();
  const { meta, body } = entry;

  return (
    <>
      <SiteNav />
      <main id="main" className="mx-auto w-full max-w-3xl scroll-mt-20 px-5 py-12 sm:px-8 sm:py-16">
        <Link href="/#writing" className="font-mono text-xs text-muted no-underline hover:text-ink">
          ← writing
        </Link>
        <header className="mt-6 border-b border-gridline pb-8">
          <p className="font-mono text-xs text-muted">
            {meta.date}
            {meta.status === "draft" && " · draft"}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {meta.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {meta.abstract}
          </p>
        </header>

        <article className={`text-base text-muted ${mdxBody}`}>
          <MDXRemote source={body} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
