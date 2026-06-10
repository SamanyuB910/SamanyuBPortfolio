// WCAG 2.x contrast checking for the oklch design tokens.
// oklch -> OKLab -> LMS -> linear sRGB -> relative luminance -> ratio.
// Run: node scripts/check-contrast.mjs

function oklchToLinearSrgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const clamp01 = (x) => Math.min(1, Math.max(0, x));

function luminance(L, C, h) {
  // WCAG luminance is defined on gamma-encoded sRGB; gamut-clamp first.
  const lin = oklchToLinearSrgb(L, C, h).map(clamp01);
  const enc = lin.map((v) =>
    v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055,
  );
  const [r, g, b] = enc.map((v) =>
    v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(fg, bg) {
  const l1 = luminance(...fg);
  const l2 = luminance(...bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

const dark = {
  void: [0.16, 0.015, 250],
  surface: [0.2, 0.017, 250],
  ink: [0.94, 0.01, 250],
  muted: [0.7, 0.02, 250],
  gridline: [0.38, 0.02, 250],
  signal: [0.75, 0.155, 65],
};
const light = {
  void: [0.97, 0.005, 250],
  surface: [0.93, 0.007, 250],
  ink: [0.21, 0.02, 250],
  muted: [0.45, 0.02, 250],
  gridline: [0.8, 0.015, 250],
  signal: [0.49, 0.13, 60],
};

const pairs = [
  ["ink", "void"],
  ["ink", "surface"],
  ["muted", "void"],
  ["muted", "surface"],
  ["signal", "void"],
  ["signal", "surface"],
  ["gridline", "void"],
];

for (const [name, t] of [
  ["DARK", dark],
  ["LIGHT", light],
]) {
  console.log(`-- ${name} --`);
  for (const [fg, bg] of pairs) {
    const r = ratio(t[fg], t[bg]);
    const verdict =
      fg === "gridline" ? "(decorative)" : r >= 4.5 ? "AA pass" : "** FAIL **";
    console.log(`${fg} on ${bg}: ${r.toFixed(2)}:1 ${verdict}`);
  }
}
