import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main
        id="main"
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center px-5 py-24 sm:px-8"
      >
        <p className="font-mono text-xs tracking-widest text-muted">404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">
          No such vertex.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          This page isn&apos;t in the graph. It may have been eliminated.
        </p>
        <Link
          href="/"
          className="mt-8 font-mono text-sm text-signal underline"
        >
          ← back to the start
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
