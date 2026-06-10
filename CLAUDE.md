@AGENTS.md

# Project: Samanyu Badam — personal portfolio ("Elimination Order")

## Stack (do not deviate without asking)
Next.js 16 App Router + TypeScript (strict) · Tailwind v4 (CSS-first @theme, oklch tokens in src/app/globals.css)
Motion (framer-motion successor) for UI animation · GSAP ScrollTrigger ONLY for the one Selected-Work scroll sequence
Lenis smooth scroll · 2D canvas hero (NO React Three Fiber / WebGL) · MDX content via gray-matter + zod + next-mdx-remote/rsc

## Design direction — "Elimination Order"
Cold slate + one amber accent. Tokens: --void/--surface/--ink/--muted/--gridline/--signal (dark default, `.light` flips).
- --gridline is DECORATIVE ONLY (≈1.9:1): never text, never outlines on interactive controls.
- --signal (amber) budget: links, fill-in edges, clique highlights, key metrics. Keep it scarce (<~5% of pixels). Links always underlined.
- NO glow, blur, drop-shadow, or additive blending anywhere — one glow and the hero reads as particles.js.
- Fragment Mono carries numbers/metrics/captions only — NEVER body copy.
- Clash Grotesk woff2 files ship UNMODIFIED (Fontshare license forbids modification — do not subset).

## Hard constraints
- Lighthouse ≥95 perf/a11y/SEO/best-practices on mobile; LCP < 2.5s; CLS ≈ 0
- Every animation respects prefers-reduced-motion (static fallback = the server-rendered SVG figure, never blank)
- Hero canvas: desktop pointer-fine only; static SVG is the default on <768px / coarse pointers; DPR cap 2; sim pauses off-viewport
- Keyboard navigable; visible focus rings; WCAG AA contrast (verify light-mode amber on --surface with a real checker)
- No: skill bars, emoji headers, marquees, purple-gradient glassmorphism, lorem ipsum
- No facts about Samanyu that aren't in his resume/case-study frontmatter; Kroger metrics are PROVISIONAL and live ONLY in
  src/content/work/kroger-markdown-ml.mdx frontmatter (never hardcoded in components or prose)
- Mobile-first; test at 360 / 768 / 1280 / 1536 px

## Conventions
- Components in src/components, content in src/content/{work,writing}/*.mdx, tokens only via @theme CSS vars
- Server components by default; "use client" only where interaction requires it
- Hero graph data is generated at build time: scripts/generate-graphs.mjs → src/generated/graphs.json (npm run graphs)
- Run `npm run lint && npm run build` before declaring any task done
