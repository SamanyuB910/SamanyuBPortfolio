import graphs from "@/generated/graphs.json";

type Node = { id: number; x: number; y: number; ord: number };
type Family = {
  key: string;
  label: string;
  n: number;
  m: number;
  nodes: Node[];
  edges: number[][];
  fillEdges: number[][];
  order: number[];
  clique: number[];
  stats: { fillCount: number; maxClique: number };
};

/**
 * The frozen elimination — a server-rendered figure of the pose-graph family
 * with its min-fill ordering printed in each node, fill-in edges dashed in
 * signal, and the maximum clique highlighted. This is the hero's first paint,
 * the reduced-motion experience, and the mobile default.
 */
export function StaticGraphFigure() {
  const fam = (graphs.families as Family[])[0];
  const { width, height } = graphs.view;
  const clique = new Set(fam.clique);
  const byId = new Map(fam.nodes.map((n) => [n.id, n]));
  const inClique = ([u, v]: number[]) => clique.has(u) && clique.has(v);

  const caption = `fig. 1 — min-fill elimination of a ${fam.n}-vertex ${fam.label}: ${fam.stats.fillCount} fill edges, clique number ${fam.stats.maxClique}. Node numerals give the elimination order.`;

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={caption}
        className="w-full h-auto"
      >
        <title>{caption}</title>
        {/* original edges */}
        <g stroke="var(--gridline)" strokeWidth="1">
          {fam.edges.map(([u, v]) => {
            const a = byId.get(u)!;
            const b = byId.get(v)!;
            return (
              <line
                key={`e${u}-${v}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                {...(inClique([u, v])
                  ? { stroke: "var(--signal)", strokeWidth: 1.5 }
                  : {})}
              />
            );
          })}
        </g>
        {/* fill-in edges created by the elimination */}
        <g
          stroke="var(--signal)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.5"
        >
          {fam.fillEdges.map(([u, v]) => {
            const a = byId.get(u)!;
            const b = byId.get(v)!;
            return (
              <line
                key={`f${u}-${v}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                {...(inClique([u, v]) ? { opacity: 1, strokeWidth: 1.5 } : {})}
              />
            );
          })}
        </g>
        {/* nodes, hollow, with elimination-order numerals */}
        <g>
          {fam.nodes.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={9}
                fill="var(--void)"
                stroke={clique.has(n.id) ? "var(--signal)" : "var(--ink)"}
                strokeWidth={clique.has(n.id) ? 1.75 : 1.25}
              />
              <text
                x={n.x}
                y={n.y + 2.5}
                textAnchor="middle"
                fontSize="7.5"
                fill="var(--muted)"
                style={{ fontFamily: "var(--font-fragment), monospace" }}
              >
                {n.ord}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <figcaption className="mt-3 font-mono text-xs text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
