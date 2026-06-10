import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import graphs from "@/generated/graphs.json";
import { site } from "@/lib/site";

export const alt =
  "Samanyu Badam — ML, graphs, systems. Everything I work on is secretly a graph.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// sRGB approximations of the oklch tokens (Satori has no oklch support)
const C = {
  void: "#13161e",
  ink: "#eceef4",
  muted: "#a3a9b8",
  grid: "#4b5263",
  signal: "#eda14f",
};

export default async function OgImage() {
  const font = await readFile(
    path.join(process.cwd(), "src", "fonts", "ClashGrotesk-Semibold.otf"),
  );

  // the 10-vertex circulant from the live hero, drawn as the OG motif
  const fam = graphs.families.find((f) => f.key === "circulant")!;
  const clique = new Set(fam.clique);
  const nodes = fam.nodes.map((n) => ({
    ...n,
    px: 760 + (n.x / graphs.view.width) * 400,
    py: 115 + (n.y / graphs.view.height) * 400,
  }));
  const byId = new Map(nodes.map((n) => [n.id, n]));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: C.void,
          padding: 72,
          fontFamily: "Clash Grotesk",
          position: "relative",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {fam.edges.map(([u, v]) => {
            const a = byId.get(u)!;
            const b = byId.get(v)!;
            const hot = clique.has(u) && clique.has(v);
            return (
              <line
                key={`${u}-${v}`}
                x1={a.px}
                y1={a.py}
                x2={b.px}
                y2={b.py}
                stroke={hot ? C.signal : C.grid}
                strokeWidth={hot ? 2.5 : 1.5}
              />
            );
          })}
          {nodes.map((n) => (
            <circle
              key={n.id}
              cx={n.px}
              cy={n.py}
              r={14}
              fill={C.void}
              stroke={clique.has(n.id) ? C.signal : C.ink}
              strokeWidth={clique.has(n.id) ? 3 : 2}
            />
          ))}
        </svg>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: 680,
          }}
        >
          <div style={{ color: C.signal, fontSize: 26 }}>
            sbadam.vercel.app
          </div>
          <div
            style={{
              color: C.ink,
              fontSize: 88,
              lineHeight: 1.02,
              marginTop: 16,
              letterSpacing: -2,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              color: C.muted,
              fontSize: 30,
              lineHeight: 1.35,
              marginTop: 28,
            }}
          >
            Everything I work on is secretly a graph — SLAM backends,
            deceptive circuits, Ramsey bounds.
          </div>
          <div
            style={{
              color: C.muted,
              fontSize: 22,
              marginTop: 36,
              display: "flex",
            }}
          >
            CS + Math @ Georgia Tech · ML systems · graph theory
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Clash Grotesk", data: font, weight: 600, style: "normal" },
      ],
    },
  );
}
