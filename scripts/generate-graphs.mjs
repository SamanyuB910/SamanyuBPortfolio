// Build-time generation of the hero graph families: structure, force layout,
// min-fill elimination ordering, fill-in edges, and max-clique stats.
// Deterministic (seeded) so builds are reproducible. Output: src/generated/graphs.json
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class Graph {
  constructor(n) {
    this.n = n;
    this.adj = Array.from({ length: n }, () => new Set());
    this.edges = [];
  }
  addEdge(u, v) {
    if (u === v || this.adj[u].has(v)) return;
    this.adj[u].add(v);
    this.adj[v].add(u);
    this.edges.push([u, v]);
  }
}

// ---- Family 1: SLAM-style pose graph -----------------------------------
// Pose chain around a loop + loop closures + landmark stars.
function poseGraph(rand) {
  const poses = 40;
  const landmarks = 16;
  const g = new Graph(poses + landmarks);
  for (let i = 0; i < poses - 1; i++) g.addEdge(i, i + 1);
  // loop closures between revisited parts of the trajectory
  const closures = [
    [0, poses - 1],
    [2, 21],
    [5, 26],
    [9, 30],
    [12, 33],
    [15, 36],
    [3, 18],
    [7, 24],
  ];
  for (const [u, v] of closures) g.addEdge(u, v);
  // landmarks observed from 2-4 nearby poses
  for (let l = 0; l < landmarks; l++) {
    const id = poses + l;
    const anchor = Math.floor(rand() * poses);
    const obs = 2 + Math.floor(rand() * 3);
    for (let k = 0; k < obs; k++) {
      const p = Math.min(poses - 1, Math.max(0, anchor + Math.floor(rand() * 7) - 3));
      g.addEdge(id, p);
    }
  }
  return g;
}

// ---- Family 2: layered feature-circuit DAG (drawn undirected) ----------
function circuitGraph(rand) {
  const layers = [10, 12, 14, 8, 4];
  const n = layers.reduce((a, b) => a + b, 0);
  const g = new Graph(n);
  const offsets = [];
  let acc = 0;
  for (const sz of layers) {
    offsets.push(acc);
    acc += sz;
  }
  for (let li = 1; li < layers.length; li++) {
    for (let j = 0; j < layers[li]; j++) {
      const node = offsets[li] + j;
      const parents = 2 + Math.floor(rand() * 2);
      for (let k = 0; k < parents; k++) {
        const p = offsets[li - 1] + Math.floor(rand() * layers[li - 1]);
        g.addEdge(node, p);
      }
    }
  }
  return g;
}

// ---- Family 3: dense 10-vertex circulant (vertex-minor nod) ------------
function circulantGraph() {
  const n = 10;
  const g = new Graph(n);
  for (const off of [1, 2, 5]) {
    for (let i = 0; i < n; i++) g.addEdge(i, (i + off) % n);
  }
  return g;
}

// ---- Min-fill elimination ----------------------------------------------
function minFill(g) {
  const adj = g.adj.map((s) => new Set(s));
  const remaining = new Set(Array.from({ length: g.n }, (_, i) => i));
  const order = [];
  const fillEdges = [];
  let maxClique = 0;
  let cliqueNodes = [];

  const fillCount = (v) => {
    const nb = [...adj[v]].filter((u) => remaining.has(u));
    let cnt = 0;
    for (let i = 0; i < nb.length; i++)
      for (let j = i + 1; j < nb.length; j++)
        if (!adj[nb[i]].has(nb[j])) cnt++;
    return cnt;
  };

  while (remaining.size > 0) {
    let best = -1;
    let bestFill = Infinity;
    for (const v of remaining) {
      const f = fillCount(v);
      if (f < bestFill) {
        bestFill = f;
        best = v;
      }
    }
    const v = best;
    const nb = [...adj[v]].filter((u) => remaining.has(u));
    if (nb.length + 1 > maxClique) {
      maxClique = nb.length + 1;
      cliqueNodes = [v, ...nb];
    }
    for (let i = 0; i < nb.length; i++) {
      for (let j = i + 1; j < nb.length; j++) {
        if (!adj[nb[i]].has(nb[j])) {
          adj[nb[i]].add(nb[j]);
          adj[nb[j]].add(nb[i]);
          fillEdges.push([nb[i], nb[j]]);
        }
      }
    }
    order.push(v);
    remaining.delete(v);
  }
  return { order, fillEdges, maxClique, cliqueNodes };
}

// ---- Fruchterman–Reingold layout ----------------------------------------
function layout(g, rand, width, height, iterations = 500) {
  const n = g.n;
  const pos = Array.from({ length: n }, () => ({
    x: rand() * width,
    y: rand() * height,
  }));
  const area = width * height;
  const k = Math.sqrt(area / n) * 0.9;
  let temp = width / 8;
  const cool = temp / iterations;

  for (let it = 0; it < iterations; it++) {
    const disp = Array.from({ length: n }, () => ({ x: 0, y: 0 }));
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let dx = pos[i].x - pos[j].x;
        let dy = pos[i].y - pos[j].y;
        let d = Math.hypot(dx, dy) || 0.01;
        const f = (k * k) / d;
        dx /= d;
        dy /= d;
        disp[i].x += dx * f;
        disp[i].y += dy * f;
        disp[j].x -= dx * f;
        disp[j].y -= dy * f;
      }
    }
    for (const [u, v] of g.edges) {
      let dx = pos[u].x - pos[v].x;
      let dy = pos[u].y - pos[v].y;
      let d = Math.hypot(dx, dy) || 0.01;
      const f = (d * d) / k;
      dx /= d;
      dy /= d;
      disp[u].x -= dx * f;
      disp[u].y -= dy * f;
      disp[v].x += dx * f;
      disp[v].y += dy * f;
    }
    for (let i = 0; i < n; i++) {
      const d = Math.hypot(disp[i].x, disp[i].y) || 0.01;
      pos[i].x += (disp[i].x / d) * Math.min(d, temp);
      pos[i].y += (disp[i].y / d) * Math.min(d, temp);
    }
    temp = Math.max(temp - cool, 0.5);
  }

  // normalize into the viewbox with padding
  const pad = 36;
  const xs = pos.map((p) => p.x);
  const ys = pos.map((p) => p.y);
  const [minX, maxX] = [Math.min(...xs), Math.max(...xs)];
  const [minY, maxY] = [Math.min(...ys), Math.max(...ys)];
  return pos.map((p) => ({
    x: Math.round(pad + ((p.x - minX) / (maxX - minX || 1)) * (width - 2 * pad)),
    y: Math.round(pad + ((p.y - minY) / (maxY - minY || 1)) * (height - 2 * pad)),
  }));
}

// ---- Assemble ------------------------------------------------------------
const VIEW = { width: 1000, height: 620 };

function build(key, label, g, rand) {
  const elim = minFill(g);
  const pos = layout(g, rand, VIEW.width, VIEW.height);
  const ordIndex = new Array(g.n);
  elim.order.forEach((v, i) => (ordIndex[v] = i + 1));
  return {
    key,
    label,
    n: g.n,
    m: g.edges.length,
    nodes: pos.map((p, id) => ({ id, x: p.x, y: p.y, ord: ordIndex[id] })),
    edges: g.edges,
    fillEdges: elim.fillEdges,
    order: elim.order,
    clique: elim.cliqueNodes,
    stats: { fillCount: elim.fillEdges.length, maxClique: elim.maxClique },
  };
}

const rand = mulberry32(910); // GitHub handle nod; fixed for reproducibility
const families = [
  build("posegraph", "slam pose graph", poseGraph(rand), mulberry32(7)),
  build("circuit", "feature-circuit dag", circuitGraph(rand), mulberry32(11)),
  build("circulant", "10-vertex circulant", circulantGraph(), mulberry32(13)),
];

const out = { view: VIEW, families };
const outDir = join(ROOT, "src", "generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "graphs.json"), JSON.stringify(out));
console.log(
  families
    .map((f) => `${f.key}: n=${f.n} m=${f.m} fill=${f.stats.fillCount} maxClique=${f.stats.maxClique}`)
    .join("\n"),
);
