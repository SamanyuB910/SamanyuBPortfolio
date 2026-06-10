# sbadam.vercel.app

Personal portfolio of Samanyu Badam — CS + Math at Georgia Tech. ML systems, SLAM factor graphs, LLM interpretability, combinatorics.

Design direction: **"Elimination Order"** — the hero is a force-directed graph that solves itself by min-fill variable elimination, which is literally the research it advertises.

## Stack

Next.js 16 (App Router, TypeScript strict) · Tailwind CSS v4 (oklch `@theme` tokens) · Motion · GSAP ScrollTrigger (one sequence) · Lenis · MDX (gray-matter + zod + next-mdx-remote) · Resend contact action.

Fonts: Clash Grotesk (Fontshare, self-hosted) · Hanken Grotesk · Fragment Mono (Google).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run graphs     # regenerate hero graph data (also runs on prebuild)
npm run lint && npm run build
```

Contact form needs `RESEND_API_KEY` (see `.env.example`); without it the form degrades to a mailto hint.

## Content

- Case studies: `src/content/work/*.mdx` — metrics live in frontmatter; Kroger figures are provisional and edited there only.
- Writing: `src/content/writing/*.mdx`.
