import Link from "next/link";
import { getWriting } from "@/lib/content";

export function WritingList() {
  const posts = getWriting();
  return (
    <section
      id="writing"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28"
    >
      <h2 className="font-mono text-xs tracking-widest text-muted">
        02 — writing
      </h2>
      <ul className="mt-10">
        {posts.map((post) => (
          <li key={post.meta.slug} className="group border-t border-gridline">
            <Link
              href={`/writing/${post.meta.slug}`}
              className="grid gap-x-8 gap-y-2 py-8 no-underline sm:grid-cols-[10rem_1fr]"
            >
              <span className="font-mono text-xs text-muted">
                {post.meta.date}
                {post.meta.status === "draft" && (
                  <span className="block italic">draft</span>
                )}
              </span>
              <span className="block max-w-2xl">
                <span className="block font-display text-xl font-medium tracking-tight text-ink transition-colors group-hover:text-signal">
                  {post.meta.title}
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-muted">
                  {post.meta.abstract}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
