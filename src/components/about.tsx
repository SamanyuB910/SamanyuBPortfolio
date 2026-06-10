import { site } from "@/lib/site";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28"
    >
      <h2 className="font-mono text-xs tracking-widest text-muted">
        03 — about
      </h2>
      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted lg:col-span-8">
          <p className="border-l-2 border-signal pl-4 font-mono text-sm leading-relaxed text-ink">
            Beat METIS on 90% of held-out factor graphs. Classified deceptive
            LLM circuits by treewidth. Checked all 12,005,168 ten-vertex graphs
            in 11 seconds.
          </p>
          <p>
            I&apos;m studying computer science and mathematics at Georgia Tech
            (B.S., May 2028), based in Atlanta. I got here through competition
            — USACO Platinum, four AIME qualifications, 2nd place in the
            Citadel Engineering Challenge, 78th globally (25th in the US) in
            IMC Trading&apos;s Prosperity 4, and first-place finishes at
            CalHacks and HackGT. I&apos;m also an AI Safety Initiative
            Technical Fellow.
          </p>
          <p>
            The thread through everything I do is graphs. In Frank
            Dellaert&apos;s lab I train a graph transformer to find elimination
            orderings for SLAM factor graphs. In interpretability, I measure
            the treewidth of SAE feature circuits to tell honest computation
            from confabulation. In combinatorics, I proved a vertex-minor
            Ramsey bound by exhausting twelve million graphs. Same object,
            three fields — and the same question each time: what ordering,
            what decomposition, makes this structure tractable?
          </p>
          <p>
            The other half of my work is ML systems engineering: at Kroger I
            build markdown price-optimization models and the data and
            evaluation infrastructure they need to be trusted in production —
            slice-based evals and behavioral invariance tests for a system
            whose failures are silent, not loud.
          </p>
          <p>
            Right now I&apos;m exploring where those threads meet: learned
            orderings for inference, and structural signatures of how models
            compute.
          </p>
        </div>
        <div className="lg:col-span-4">
          <h3 className="font-mono text-xs tracking-widest text-muted">
            tools
          </h3>
          <p className="mt-3 font-mono text-xs leading-loose text-muted">
            {site.skills}
          </p>
        </div>
      </div>
    </section>
  );
}
