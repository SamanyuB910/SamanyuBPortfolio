# Portfolio Build Plan — Research, Stack, Resources & Claude Code Prompt

Prepared for Samanyu Badam · June 2026
Goal: replace/level-up `sbadam.vercel.app` with a portfolio that reads "design-aware ML engineer," not "used a template."

---

## 1. Context: what the research says separates great portfolios

After surveying current galleries (Awwwards, Godly, Land-book), teardown articles, and the most-forked portfolio repos, the winners share these traits:

1. **Show, don't tell.** The best portfolios get out of the way and let the work speak — real projects, real metrics, links to code/demos. Skill bars and buzzword walls are the #1 amateur tell.
2. **One signature moment.** Memorable sites concentrate their boldness in a single element (Bruno Simon's drivable 3D car, Josh Comeau's sound-effect micro-interactions, Takuya's voxel dog) and keep everything else disciplined.
3. **Content depth = credibility.** Josh Comeau's site works because it's also an educational resource. For you: project **case studies with numbers** (you already have them — 90% of 404 graphs, 24% lower clique size, 11% sell-through lift) and short research writeups.
4. **Performance and a11y are part of the design.** Fast load, no layout shift, keyboard focus, `prefers-reduced-motion` respected. Recruiters open these on laptops on hotel wifi.
5. **Avoid the AI-template look.** Purple gradient + glassmorphism + bento grid + "I build things for the web" is now instantly recognizable as a tutorial clone. Distinctiveness comes from typography, a specific palette, and a signature element grounded in *your* subject matter (for you: graphs, optimization, ML systems).

**Your angle:** you're not a frontend dev selling frontend — you're an ML/systems person whose site should *demonstrate taste and rigor*. Lean minimal + one technically impressive interactive element beats maximal animation everywhere.

---

## 2. Inspiration sources (bookmark these)

### Galleries
| Site | URL | What it's for |
|---|---|---|
| Awwwards — Portfolio category | https://www.awwwards.com/websites/portfolio/ | Award-tier experiential sites |
| Godly | https://godly.website | "Astronomically good" curated web design |
| Land-book | https://land-book.com | Daily-curated, filterable by style (dark, big type, 3D) |
| Minimal Gallery | https://minimal.gallery | Restraint done well |
| Dark Mode Design | https://www.darkmodedesign.com | Dark-theme execution reference |
| dark.design | https://www.dark.design | More hand-picked dark sites |
| httpster | https://httpster.net | Fresh/edgy typographic sites |
| Siteinspire | https://www.siteinspire.com | Classic, searchable showcase |
| Landing Love | https://landing.love | Animation-heavy sites (GSAP/WebGL tagged) |
| Bento Grids | https://bentogrids.com | If you go bento, see it done right first |
| toools.design | https://www.toools.design | Meta-list of 100+ design resources |

### Individual portfolios worth studying
- **Josh Comeau** — https://www.joshwcomeau.com — micro-interactions, sound, whimsy + substance
- **Brittany Chiang** — https://brittanychiang.com (and https://v4.brittanychiang.com) — the canonical clean engineer portfolio
- **Takuya Matsuyama (craftzdog)** — https://www.craftzdog.com — Three.js voxel hero done tastefully
- **Bruno Simon** — https://bruno-simon.com — the famous fully-3D portfolio (study, don't copy; it's his whole identity)
- **1,500+ more:** the emmabostian list below

---

## 3. GitHub repos with good UI (verified links)

Study > fork. If you fork a designed portfolio, keep attribution (Brittany explicitly requires it).

| Repo | Stack | Why it matters |
|---|---|---|
| https://github.com/bchiang7/v4 | Gatsby, styled-components | The most-imitated engineer portfolio ever; study layout, hierarchy, hover states. Attribution required if reused. |
| https://github.com/craftzdog/craftzdog-homepage | Next.js, Chakra UI, Three.js | Gold standard for a *restrained* 3D hero (voxel model), MIT licensed |
| https://github.com/dillionverma/portfolio | Next.js 14, Tailwind, shadcn/ui, Magic UI | Minimalist dev portfolio; config-driven content in a single file — extremely fast to adapt |
| https://github.com/once-ui-system/magic-portfolio | Next.js, Once UI, MDX | Best "serious" free template: MDX blog, projects, gallery, CV page, strong SEO defaults |
| https://github.com/adrianhajdin/portfolio | Next.js, Tailwind, Aceternity, Framer Motion | The JS Mastery bento/Aceternity look — good to mine for component patterns (and to know what *not* to copy wholesale, since thousands have) |
| https://github.com/ladunjexa/Threejs_3D_Portfolio | React 18, Three.js (R3F), Vite | Clean reference for canvas sections (Earth, stars, model loading) |
| https://github.com/Abhiz2411/3D-interactive-portfolio | Next.js, GSAP, Spline, Aceternity, Resend | Shows GSAP + Spline runtime + contact-form (Resend) wiring in one codebase |
| https://github.com/DevonGifford/Portfolio_v2 | Next.js 15, React 19, TS, Tailwind | Brittany's v4 design rebuilt on a modern stack — useful migration reference |

### Curated discovery lists
- https://github.com/emmabostian/developer-portfolios — the classic "list of developer portfolios for your inspiration"
- https://github.com/bytefer/awesome-nextjs — Next.js templates/starters section
- https://github.com/topics/nextjs-portfolio and https://github.com/topics/open-source-portfolio — sort by stars, filter by recently updated

---

## 4. Recommended tech stack (June 2026)

| Layer | Pick | Why |
|---|---|---|
| Framework | **Next.js 16 (App Router, TypeScript)** | Current major; Turbopack is the default dev bundler now. You already deploy to Vercel. |
| Styling | **Tailwind CSS v4** | CSS-first `@theme` config (no `tailwind.config.js`), oklch palette, ~5× faster builds; Next.js still needs the thin `@tailwindcss/postcss` file |
| Base components | **shadcn/ui** — https://ui.shadcn.com | Accessible Radix primitives you own (copy-paste model); the 2026 consensus base layer |
| UI motion (React) | **Motion** (formerly Framer Motion) — https://motion.dev | Declarative animation, layout transitions, `useReducedMotion`; MIT, independent |
| Scroll-driven / orchestration | **GSAP + ScrollTrigger + SplitText** — https://gsap.com | 100% free since April 2025 (Webflow acquisition) including all formerly-paid plugins. Use for scroll choreography and text reveals only |
| Smooth scroll | **Lenis** — https://lenis.dev / https://github.com/darkroomengineering/lenis | ~3KB, wraps native scroll (sticky/anchors/a11y keep working), first-class GSAP ScrollTrigger sync, React adapter |
| 3D (optional, one section max) | **React Three Fiber + drei** — https://github.com/pmndrs/react-three-fiber | Declarative Three.js; lazy-load it, never block LCP |
| Content | **MDX** via Content Collections or next-mdx-remote | Projects + writing as files, type-safe frontmatter |
| Email/contact | **Resend** — https://resend.com | Simple API, free tier, pairs with a server action |
| Deploy | **Vercel** | You're already there; preview deploys per branch |

Scaffold command:
```bash
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir --turbopack
```

### Animated component libraries (copy-paste, mix freely)
All three share the shadcn-style "you own the code" model, so combining them costs nothing:
- **Aceternity UI** — https://ui.aceternity.com — 200+ free Motion-powered showpiece effects (spotlight, 3D cards, beams). Use 2–3 max.
- **Magic UI** — https://magicui.design — polished micro-interactions (Shimmer Button, Blur Fade, Animated Gradient Text); the middle ground.
- **React Bits** — https://reactbits.dev — 110+ components, #2 in JS Rising Stars 2025 (~37K stars); CSS-first, pulls in GSAP/Three only per-component. Strongest text-animation collection (BlurText, SplitText).
- Honorable mentions: **tsParticles** (https://particles.js.org) for particle backgrounds; **Spline** (https://spline.design) for no-code 3D scenes with a React runtime.

⚠️ Accessibility note: in the copy-paste model, *you* are responsible for wiring `prefers-reduced-motion` into copied components — the libraries don't enforce it.

---

## 5. Niche tools & resources (the polish layer)

**Typography**
- Fontshare (free, commercial-use: Satoshi, General Sans, Clash Display) — https://www.fontshare.com
- Google Fonts variable fonts (Inter, Geist, Newsreader, JetBrains Mono) — https://fonts.google.com
- Load via `next/font` for zero layout shift. Pair one characterful display face + one quiet body face + one mono for code/data.

**Color**
- Radix Colors (accessible scales, dark-mode pairs) — https://www.radix-ui.com/colors
- Realtime Colors (preview palette+type on a real layout) — https://www.realtimecolors.com
- Tailwind v4 is oklch-native — define your palette in `@theme` as oklch.

**Icons:** Lucide — https://lucide.dev · Phosphor — https://phosphoricons.com

**OG / link previews:** `@vercel/og` (ImageResponse) for generated social cards per page — https://vercel.com/docs/og-image-generation. A portfolio that unfurls beautifully in Slack/LinkedIn gets clicked.

**Analytics:** Vercel Analytics + Speed Insights (built-in) or privacy-first Plausible — https://plausible.io / Umami — https://umami.is

**SEO/meta:** Next.js Metadata API + `sitemap.ts` + `robots.ts`; JSON-LD `Person` schema; canonical domain.

**Performance:** `next/image` everywhere, `next/dynamic` for any Three.js/canvas, Lighthouse + https://pagespeed.web.dev as the budget gate.

**Contact/scheduling:** Cal.com embed — https://cal.com (a "book 15 min" link converts better than a form).

**3D learning (if you go that route):** Three.js Journey — https://threejs-journey.com (Bruno Simon's course; the reference for tasteful WebGL).

**Domain:** a `.dev` or `.me` on your name; keep `sbadam.vercel.app` as a redirect.

---

## 6. Content architecture (tailored to you)

1. **Hero** — name, one sharp thesis line ("I build and break ML systems" energy, but yours), and the **signature element** (below). No headshot needed; no "welcome to my portfolio."
2. **Selected work (3–4 case studies max)** — Kroger markdown ML system, SLAM graph-transformer research, deceptive-circuits interpretability project, vertex-minor Ramsey computation. Each: problem → approach → **numbers** → stack → links (GitHub/paper/demo). Your resume metrics are the content; reuse them.
3. **Research & writing** — MDX posts. Even 2 posts (e.g., "Treewidth signatures of deception in LLMs," "Testing ML systems that can't crash") instantly differentiate you from every template portfolio.
4. **About** — short, human, specific (USACO Platinum, the EPA paper, what you're exploring now).
5. **Contact / footer** — email, GitHub, LinkedIn, resume PDF, cal link.

**Signature element idea (your one bold move):** an interactive force-directed **graph in the hero** — nodes/edges that respond to cursor, occasionally "solving" itself (an elimination-ordering animation). It's literally your research, it's technically impressive, and nobody's template has it. Canvas/WebGL with a static SVG fallback for `prefers-reduced-motion`.

---

## 7. Build phases

- **P0 — Direction (no code):** pick 5 references from the galleries; write a 1-page art direction (palette in oklch, 2 typefaces, signature element, what you will NOT do).
- **P1 — Skeleton:** scaffold, fonts, `@theme` tokens, layout, nav, all sections with real content (no animation yet). Ship it — content-complete beats animated-empty.
- **P2 — Design system pass:** spacing/type scale discipline, dark default + light toggle, hover/focus states, responsive to 360px.
- **P3 — Motion pass:** Lenis; entrance reveals (Motion); one GSAP ScrollTrigger sequence; the signature hero. Every animation gated by `useReducedMotion`.
- **P4 — Hardening:** Lighthouse ≥ 95 across the board, a11y audit (keyboard, contrast, alt text), OG images, sitemap, JSON-LD.
- **P5 — Ship & iterate:** custom domain, analytics, ask 3 people to find your best project in <10s; fix whatever blocked them.

---

## 8. Claude Code setup & workflow

Install & run (official docs: https://docs.claude.com/en/docs/claude-code/overview):
```bash
npm install -g @anthropic-ai/claude-code
cd portfolio && claude
```

Workflow that works for builds like this:
1. Create the repo + scaffold first, then drop the `CLAUDE.md` below into the root so every session inherits your constraints.
2. Start in **plan mode** for each phase (have Claude propose, you approve, then it executes).
3. Go **one phase per session/PR**; commit at each green checkpoint.
4. Paste screenshots of the running site back into Claude Code for visual critique loops — "here's how it renders, fix X" is the highest-leverage iteration you can do.
5. Keep the master prompt (below) as the kickoff message of session 1.

### CLAUDE.md (put this in repo root)
```markdown
# Project: Samanyu Badam — personal portfolio

## Stack (do not deviate without asking)
Next.js 16 App Router + TypeScript (strict) · Tailwind v4 (CSS-first @theme, oklch tokens)
shadcn/ui base · Motion (framer-motion successor) for UI animation · GSAP ScrollTrigger only for scroll choreography
Lenis smooth scroll · React Three Fiber ONLY in the hero, lazy-loaded · MDX content via content collections

## Hard constraints
- Lighthouse ≥95 perf/a11y/SEO/best-practices on mobile; LCP < 2.5s; CLS ≈ 0
- Every animation respects prefers-reduced-motion (static fallback, not blank)
- Keyboard navigable; visible focus rings; WCAG AA contrast
- No: skill progress bars, emoji headers, marquee walls, purple-gradient glassmorphism defaults, lorem ipsum
- Mobile-first; test at 360px, 768px, 1280px, 1536px

## Conventions
- Components in src/components, content in src/content/*.mdx, design tokens only via @theme CSS vars
- Server components by default; "use client" only where interaction requires it
- Run `npm run lint && npm run build` before declaring any task done
```

---

## 9. THE MASTER PROMPT (paste into Claude Code, session 1)

> Attach/paste your resume content where marked, then send.

```text
You are building my personal portfolio website from scratch in this repo. Treat this as a design-led engineering project, not a template fill-in.

WHO I AM (use this as real content, do not invent facts):
[PASTE THE FULL TEXT OF MY RESUME HERE — education, Kroger ML internship, research, projects, honors, links]

AUDIENCE & GOAL: ML/SWE recruiters and researchers should, within 10 seconds, see (1) strong projects with real metrics, (2) taste and engineering rigor. The site must feel designed for me specifically — an ML/graphs/systems person — not like a frontend template.

STACK (already decided): Next.js 16 App Router + TypeScript strict, Tailwind v4 with CSS-first @theme tokens in oklch, shadcn/ui primitives, Motion for UI animation, GSAP + ScrollTrigger for scroll choreography only, Lenis for smooth scrolling, React Three Fiber lazy-loaded for the hero only, MDX for projects/writing, Resend for the contact action, deployed on Vercel. Use create-next-app with --turbopack if scaffolding is needed.

PROCESS — follow exactly:
1. Start in plan mode. Before any code, present me an ART DIRECTION BRIEF: 2–3 distinct directions, each with a named oklch palette (4–6 tokens), a display+body+mono type pairing (from next/font, Google Fonts or Fontshare-style faces), a one-line layout concept, and ONE signature element. At least one direction must center an interactive graph/network hero that nods to my graph-theory research (force-directed nodes reacting to cursor, occasionally animating an elimination ordering). Explicitly avoid: purple-gradient glassmorphism, generic bento-with-emoji, cream-paper-with-serif default, skill bars. Wait for my pick.
2. Build in phases, committing after each: (P1) skeleton + all real content unstyled-but-structured, (P2) full design system pass per the chosen direction, (P3) motion pass, (P4) perf/a11y/SEO hardening. After each phase, run lint+build, start the dev server, and tell me exactly what to screenshot for review.

PAGES/SECTIONS: hero (thesis line + signature element); selected work — exactly 4 MDX case studies (Kroger markdown ML system, SLAM graph transformer, LLM deceptive-circuits project, vertex-minor Ramsey computation), each structured problem → approach → measured results → stack → links; writing (MDX, seed with 2 placeholder drafts using my real project abstracts); about; contact/footer with email, GitHub, LinkedIn, resume PDF link.

MOTION RULES: choreograph ONE memorable moment (hero) and keep the rest to subtle entrance reveals and hover micro-interactions. Every effect must check prefers-reduced-motion and render a meaningful static fallback. Lenis must not break anchor links or keyboard scroll. Total JS for any 3D/canvas must be dynamically imported and never block LCP.

COMPONENT SOURCING: prefer writing components; you may adapt individual copy-paste components from ui.aceternity.com, magicui.design, or reactbits.dev (max 3 total), restyled to my tokens, with reduced-motion support added — never their default look verbatim.

QUALITY GATES (self-verify before calling any phase done): npm run build passes; Lighthouse mobile ≥95 across categories; CLS ≈ 0; keyboard-only navigation works with visible focus; 360px layout has no horizontal scroll; all images via next/image with dimensions; metadata API + OG image route + sitemap + robots + JSON-LD Person schema present.

If any requirement conflicts with another, ask me instead of silently choosing. Begin with step 1: the art direction brief.
```

---

## 10. Final context & cautions

- **Don't claim Awwwards-style sites as your design** — if you adapt a designed repo (especially bchiang7/v4), credit it visibly. Recruiters in this space recognize famous portfolios instantly.
- **GSAP licensing nuance:** free for everything now, but its license bars use inside products competing with Webflow — irrelevant for a portfolio, just know it. Motion is MIT if you ever care.
- **Content before motion.** A finished P1 (real case studies, fast, clean) already beats 90% of portfolios. Animation is the dessert.
- **Maintain it like a product:** every new project = one new MDX file. The architecture above makes updates a 10-minute job, which is the real reason portfolios die.
```