import Link from "next/link";
import { getWriting } from "@/lib/content";

export function WritingList() {
  const posts = getWriting();
  return (
    <section id="writing" className="mx-auto w-full max-w-5xl px-5 py-16">
      <h2 className="font-mono text-sm text-muted">02 — Writing</h2>
      <ul className="mt-8 space-y-10">
        {posts.map((post) => (
          <li
            key={post.meta.slug}
            className="border-t border-gridline pt-6"
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-display text-lg font-medium">
                <Link
                  href={`/writing/${post.meta.slug}`}
                  className="text-ink no-underline hover:text-signal"
                >
                  {post.meta.title}
                </Link>
              </h3>
              <span className="font-mono text-xs text-muted">
                {post.meta.date}
                {post.meta.status === "draft" && " · draft"}
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {post.meta.abstract}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
