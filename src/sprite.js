// Inline SVG sprite: botanical illustrations, garden tools and UI icons.
// Paths carry no fill/stroke so the <svg> that references them (via CSS) controls colour.

function mulberry(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const bez = (p, t) => {
  const u = 1 - t;
  return [
    u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0],
    u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1],
  ];
};
const tan = (p, t) => {
  const u = 1 - t;
  const dx = 3 * u * u * (p[1][0] - p[0][0]) + 6 * u * t * (p[2][0] - p[1][0]) + 3 * t * t * (p[3][0] - p[2][0]);
  const dy = 3 * u * u * (p[1][1] - p[0][1]) + 6 * u * t * (p[2][1] - p[1][1]) + 3 * t * t * (p[3][1] - p[2][1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
};
const f = (n) => n.toFixed(1);

const LEAF = 'M0 0C8 -13 28 -13 40 0C28 13 8 13 0 0Z';
const leaf = (x, y, a, s) =>
  `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)}) scale(${s.toFixed(2)})"><path d="${LEAF}"/><path d="M3 0H33"/></g>`;

// A stem curve with alternating leaves along it.
function sprig(p, n, minS, maxS, spread = 48, paired = false) {
  let out = `<path d="M${p[0]} C${p[1]} ${p[2]} ${p[3]}"/>`;
  for (let i = 0; i < n; i++) {
    const t = 0.16 + (0.8 * i) / (n - 1);
    const [x, y] = bez(p, t);
    const a = tan(p, t);
    const s = maxS - (maxS - minS) * t;
    if (paired) {
      out += leaf(x, y, a - spread, s) + leaf(x, y, a + spread, s);
    } else {
      out += leaf(x, y, a + (i % 2 ? -spread : spread), s);
    }
  }
  const [tx, ty] = bez(p, 1);
  out += leaf(tx, ty, tan(p, 1), minS * 0.95);
  return out;
}

function grass(width, seed, minH, maxH) {
  const r = mulberry(seed);
  let d = '';
  for (let x = -4; x < width; x += 5 + r() * 5) {
    const h = minH + r() * (maxH - minH);
    const b = (r() - 0.5) * 22;
    const w = 5 + r() * 4;
    d += `M${f(x)} 90Q${f(x + b * 0.35)} ${f(90 - h * 0.62)} ${f(x + b)} ${f(90 - h)}Q${f(x + b * 0.35 + w * 0.7)} ${f(90 - h * 0.55)} ${f(x + w)} 90Z`;
  }
  return d;
}

const S = (id, vb, body) => `<symbol id="${id}" viewBox="${vb}">${body}</symbol>`;

const symbols = [
  // ---------- botanical illustrations ----------
  S('d-branch', '0 0 210 290', sprig([[30, 280], [38, 180], [88, 112], [172, 22]], 9, 0.62, 1.05)),
  S('d-branch2', '0 0 210 290', sprig([[24, 18], [70, 96], [150, 126], [186, 276]], 8, 0.6, 1.0, 52)),
  S('d-fern', '0 0 130 320', sprig([[62, 312], [52, 220], [72, 110], [64, 14]], 11, 0.4, 0.95, 62, true)),
  S('d-sprig', '0 0 160 120', sprig([[8, 108], [50, 100], [100, 70], [150, 14]], 6, 0.55, 0.9, 44)),
  S('d-leaf', '0 0 44 28', `<path d="M2 14C10 1 30 1 42 14C30 27 10 27 2 14Z"/><path d="M5 14H38"/>`),
  S('d-leaves3',
    '0 0 120 110',
    `<g transform="translate(14 96) rotate(-62) scale(1.3)"><path d="${LEAF}"/><path d="M3 0H33"/></g>` +
    `<g transform="translate(14 96) rotate(-28) scale(1.5)"><path d="${LEAF}"/><path d="M3 0H33"/></g>` +
    `<g transform="translate(14 96) rotate(6) scale(1.2)"><path d="${LEAF}"/><path d="M3 0H33"/></g>` +
    `<path d="M14 96C14 96 12 104 8 110"/>`),
  S('d-grass', '0 0 1440 90', `<path d="${grass(1440, 7, 16, 66)}"/>`),
  S('d-rings', '0 0 200 200',
    `<circle cx="100" cy="100" r="96"/><circle cx="100" cy="100" r="76"/><circle cx="100" cy="100" r="56"/><circle cx="100" cy="100" r="36"/>`),
  S('d-dots', '0 0 120 120',
    Array.from({ length: 36 }, (_, i) => `<circle cx="${10 + (i % 6) * 20}" cy="${10 + Math.floor(i / 6) * 20}" r="2.2"/>`).join('')),
  S('d-arrow', '0 0 180 80',
    `<path d="M6 62C30 8 90 -2 168 40"/><path d="M146 24L170 41L142 54"/>`),
  S('d-arrow-down', '0 0 80 120',
    `<path d="M14 6C70 22 76 70 40 112"/><path d="M22 92L40 114L58 88"/>`),
  S('d-swirl', '0 0 220 60',
    `<path d="M4 40C34 6 56 6 74 28C92 50 110 52 130 30C150 8 176 10 216 42"/>`),
  S('d-wave', '0 0 1440 60', `<path d="M0 30C120 -10 240 70 360 30S600 -10 720 30 960 70 1080 30 1320 -10 1440 30V60H0Z"/>`),

  // ---------- garden tools (line art) ----------
  S('t-trowel', '0 0 80 80',
    `<path d="M52 8L72 28L44 48C38 54 28 54 24 50C20 46 20 36 26 30Z"/><path d="M44 48L8 74"/><path d="M6 76L12 70"/>`),
  S('t-shears', '0 0 80 80',
    `<path d="M32 40L66 8"/><path d="M48 40L14 8"/><circle cx="22" cy="58" r="12"/><circle cx="58" cy="58" r="12"/><path d="M28 48L36 40"/><path d="M52 48L44 40"/>`),
  S('t-rake', '0 0 80 80',
    `<path d="M62 6L36 46"/><path d="M12 50H48"/><path d="M14 50V72M22 50V72M30 50V72M38 50V72M46 50V72"/>`),
  S('t-can', '0 0 80 80',
    `<path d="M16 34H52L56 66H12Z"/><path d="M52 40L72 22"/><path d="M68 14L78 26"/><path d="M16 34C16 20 36 20 36 34"/><path d="M10 42C0 42 2 58 14 58"/>`),
  S('t-mower', '0 0 100 80',
    `<path d="M14 50H66L72 62H10Z"/><circle cx="24" cy="66" r="9"/><circle cx="62" cy="66" r="9"/><path d="M62 50L90 10"/><path d="M84 8H96"/><path d="M30 50V40H50V50"/>`),
  S('t-sprout', '0 0 80 80',
    `<path d="M40 74V40"/><path d="M40 44C40 26 24 18 8 20C8 38 22 46 40 44Z"/><path d="M40 36C40 20 54 12 70 14C70 32 56 40 40 36Z"/><path d="M26 74H54"/>`),
  S('t-glove', '0 0 80 80',
    `<path d="M22 70V44L14 32C12 28 16 24 20 28L26 36V16C26 12 32 12 32 16V32V10C32 6 38 6 38 10V32V14C38 10 44 10 44 14V36V22C44 18 50 18 50 22V50L58 40C62 36 66 40 62 44L52 62V70Z"/><path d="M22 60H52"/>`),

  // ---------- UI / feature icons (48 grid) ----------
  S('i-leaf', '0 0 48 48', `<path d="M9 39C8 21 21 8 40 8C41 27 30 40 11 40"/><path d="M9 39L28 20"/><path d="M20 28L16 22M26 22L22 16M31 17L29 12"/>`),
  S('i-shield', '0 0 48 48', `<path d="M24 6L40 12V23C40 33 33 40 24 43C15 40 8 33 8 23V12Z"/><path d="M17 24L22 29L31 19"/>`),
  S('i-coin', '0 0 48 48', `<circle cx="24" cy="24" r="17"/><path d="M29 18C27 15 19 15 19 20C19 25 29 23 29 28C29 33 21 33 18 30"/><path d="M24 11V37"/>`),
  S('i-mower', '0 0 48 48', `<path d="M7 31H33L37 39H6Z"/><circle cx="13" cy="40" r="4"/><circle cx="31" cy="40" r="4"/><path d="M33 31L41 11"/><path d="M38 10H46"/><path d="M14 31V25H26V31"/>`),
  S('i-grass', '0 0 48 48', `<path d="M6 41H42"/><path d="M13 41C13 31 16 24 11 14"/><path d="M24 41C24 29 27 18 24 7"/><path d="M35 41C35 31 32 24 38 14"/>`),
  S('i-shears', '0 0 48 48', `<path d="M19 30L35 7"/><path d="M29 30L13 7"/><circle cx="14" cy="38" r="6"/><circle cx="34" cy="38" r="6"/><path d="M18 33L21 29M30 33L27 29"/>`),
  S('i-rake', '0 0 48 48', `<path d="M38 5L24 28"/><path d="M8 31H36"/><path d="M10 31V43M16 31V43M22 31V43M28 31V43M34 31V43"/>`),
  S('i-hedge', '0 0 48 48', `<path d="M7 41V23C7 17 14 15 16 19C18 12 30 12 32 19C34 15 41 17 41 23V41Z"/><path d="M7 41H41"/><path d="M16 30V37M24 28V37M32 30V37"/>`),
  S('i-season', '0 0 48 48', `<circle cx="17" cy="17" r="6"/><path d="M17 5V8M17 26V29M5 17H8M26 17H29M8.5 8.5L10.6 10.6M23.4 23.4L25.5 25.5M8.5 25.5L10.6 23.4M23.4 10.6L25.5 8.5"/><path d="M25 42C23 30 31 22 43 22C44 34 36 42 27 42"/><path d="M25 42L36 30"/>`),
  S('i-phone', '0 0 48 48', `<path d="M14 7H20L23 16L19 19C21 25 25 29 31 31L34 27L43 30V37C43 41 39 43 36 42C21 40 8 27 6 12C5 9 9 7 14 7Z"/>`),
  S('i-mail', '0 0 48 48', `<path d="M6 11H42V37H6Z"/><path d="M6 12L24 27L42 12"/>`),
  S('i-pin', '0 0 48 48', `<path d="M24 44C24 44 10 30 10 20A14 14 0 0 1 38 20C38 30 24 44 24 44Z"/><circle cx="24" cy="20" r="5"/>`),
  S('i-arrow', '0 0 48 48', `<path d="M14 34L34 14"/><path d="M16 14H34V32"/>`),
  S('i-arrow-right', '0 0 48 48', `<path d="M8 24H38"/><path d="M27 13L38 24L27 35"/>`),
  S('i-check', '0 0 48 48', `<path d="M11 25L20 34L38 14"/>`),
  S('i-home', '0 0 48 48', `<path d="M6 24L24 8L42 24"/><path d="M11 20V41H37V20"/><path d="M20 41V29H28V41"/>`),
  S('i-building', '0 0 48 48', `<path d="M11 42V8H31V42"/><path d="M31 20H38V42"/><path d="M6 42H43"/><path d="M17 15H25M17 22H25M17 29H25M17 36H25"/>`),
  S('i-eye', '0 0 48 48', `<path d="M4 24C10 14 17 10 24 10C31 10 38 14 44 24C38 34 31 38 24 38C17 38 10 34 4 24Z"/><circle cx="24" cy="24" r="6"/>`),
  S('i-heart', '0 0 48 48', `<path d="M24 41C10 31 6 23 6 17C6 11 10 8 15 8C19 8 22 10 24 14C26 10 29 8 33 8C38 8 42 11 42 17C42 23 38 31 24 41Z"/>`),
  S('i-clock', '0 0 48 48', `<circle cx="24" cy="24" r="17"/><path d="M24 13V24L32 29"/>`),
  S('i-sparkle', '0 0 48 48', `<path d="M24 5C26 18 30 22 43 24C30 26 26 30 24 43C22 30 18 26 5 24C18 22 22 18 24 5Z"/>`),
  S('i-calendar', '0 0 48 48', `<path d="M7 11H41V42H7Z"/><path d="M7 20H41"/><path d="M15 6V15M33 6V15"/><path d="M15 28H19M22 28H26M29 28H33M15 35H19M22 35H26"/>`),
  S('i-clipboard', '0 0 48 48', `<path d="M12 9H36V43H12Z"/><path d="M19 5H29V12H19Z"/><path d="M18 22H30M18 29H30M18 36H25"/>`),
  S('i-smile', '0 0 48 48', `<circle cx="24" cy="24" r="17"/><path d="M16 28C19 34 29 34 32 28"/><path d="M18 19V20M30 19V20"/>`),
  S('i-award', '0 0 48 48', `<circle cx="24" cy="19" r="12"/><path d="M17 29L13 43L24 38L35 43L31 29"/><path d="M19 19L23 23L29 15"/>`),
  S('i-menu', '0 0 48 48', `<path d="M8 14H40M8 24H40M8 34H40"/>`),
  S('i-close', '0 0 48 48', `<path d="M12 12L36 36M36 12L12 36"/>`),
  S('i-up', '0 0 48 48', `<path d="M24 38V10"/><path d="M12 22L24 10L36 22"/>`),
  S('i-star', '0 0 48 48', `<path d="M24 5L29.5 17.5L43 19L33 28.5L36 42L24 35L12 42L15 28.5L5 19L18.5 17.5Z"/>`),
];

module.exports = `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${symbols.join('')}</defs></svg>`;
