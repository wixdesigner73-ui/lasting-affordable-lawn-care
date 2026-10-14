// Every photo on the site. Each Unsplash ID is used exactly once (build.js enforces this).
// IDs were checked to return HTTP 200 and visually reviewed before being assigned.

const catalog = {
  // ---- Home ----
  homeHero:     { id: '1734303023491-db8037a21f09', pos: '60% 60%', alt: 'Two lawn care workers mowing and trimming a freshly striped green lawn beside a row of evergreen hedges' },
  homeAboutBig: { id: '1734079692160-fcbe4be6ab96', pos: '50% 40%', alt: 'Gardener in a green uniform pushing a wheelbarrow across a sunlit lawn' },
  homeAboutSm:  { id: '1622383563227-04401ab4e5ea', pos: '50% 50%', alt: 'Gloved hands planting a young seedling in dark garden soil' },
  svcMowing:    { id: '1779636489740-6077a4198be6', pos: '50% 50%', alt: 'Workers mowing a residential lawn and trimming shrubs beside a brick house' },
  svcMaint:     { id: '1738193830098-2d92352a1856', pos: '50% 60%', alt: 'Neatly edged green lawn and trimmed shrubs in front of a brick home' },
  svcEdging:    { id: '1779636489744-76eb81c44925', pos: '50% 40%', alt: 'Landscaper using a string trimmer around a tree in a sunny yard' },
  svcCleanup:   { id: '1634081727680-fa43e3237d5a', pos: '50% 50%', alt: 'Red rake resting on a pile of fallen autumn leaves' },
  svcHedge:     { id: '1543309959-4d45288d1629',    pos: '50% 50%', alt: 'Hedge trimmer shaping a rounded green shrub' },
  svcSeasonal:  { id: '1733286125300-b4c5563295ad', pos: '50% 60%', alt: 'Worker using a leaf blower to clear fallen leaves from a large lawn' },
  homeWhy:      { id: '1782594700873-bbeefef37e11', pos: '50% 60%', alt: 'Large home with a manicured striped lawn and curving driveway' },

  // ---- About ----
  aboutHero:    { id: '1623358519330-00f61d89396b', pos: '50% 85%', alt: 'Landscaped backyard lawn with steps and lush tropical planting' },
  aboutMain:    { id: '1782613064276-750c3a3ccdec', pos: '50% 50%', alt: 'Man mowing a residential lawn with a push mower beside a house' },
  aboutMission: { id: '1773427635639-ae852705e4a0', pos: '50% 60%', alt: 'Brick home with a lush, evenly mowed green lawn' },
  aboutExp:     { id: '1637531347055-4fa8aa80c111', pos: '50% 40%', alt: 'Gardener carrying long-handled tools past tall garden plants' },

  // ---- Services ----
  servicesHero:    { id: '1686663048931-6df69f577a2f', pos: '50% 55%', alt: 'Formal garden path lined with neatly trimmed topiary shrubs and trees' },
  detailMowing:    { id: '1734303023481-7508b5c9f1ff', pos: '50% 55%', alt: 'Man riding a mower across a freshly striped green lawn' },
  detailMaint:     { id: '1734079692079-aae7e24a7035', pos: '50% 50%', alt: 'Hands resting on thick, healthy green lawn grass' },
  detailEdging:    { id: '1683316924890-6a8c5ab10d29', pos: '50% 45%', alt: 'Worker trimming overgrown grass with a string trimmer in a yard' },
  detailCleanup:   { id: '1621272156568-7306716648df', pos: '50% 60%', alt: 'Wheelbarrow in a tidy garden with trimmed shrubs and a small shed' },
  detailHedge:     { id: '1617576683096-00fc8eecb3af', pos: '50% 50%', alt: 'Hands pruning an evergreen branch with hand shears' },
  detailSeasonal:  { id: '1597201278257-3687be27d954', pos: '50% 55%', alt: 'Colorful seasonal flower beds and manicured shrubs in a formal garden' },

  // ---- Contact ----
  contactHero:  { id: '1690068023694-053da714f95f', pos: '50% 50%', alt: 'Push lawn mower cutting a bright green lawn' },
  contactForm:  { id: '1585320806297-9794b3e4eeae', pos: '50% 50%', alt: 'Garden pathway lined with trimmed hedges and flowering roses' },
};

const BASE = 'https://images.unsplash.com/photo-';
const url = (key, w, q = 72) => `${BASE}${catalog[key].id}?auto=format&fit=crop&w=${w}&q=${q}`;

const usedKeys = new Set();

// <img> with responsive srcset, explicit dimensions (stable layout) and lazy loading.
function pic(key, { w = 900, h = 600, sizes = '(min-width: 900px) 50vw, 100vw', cls = '', eager = false, alt, maxW } = {}) {
  const c = catalog[key];
  if (!c) throw new Error('Unknown image key: ' + key);
  usedKeys.add(key);
  const widths = [480, 800, 1200, 1800].filter((x) => x <= (maxW || Math.max(w * 1.6, 800)));
  const srcset = widths.map((x) => `${url(key, x)} ${x}w`).join(', ');
  return `<img class="${cls}" src="${url(key, w)}" srcset="${srcset}" sizes="${sizes}" width="${w}" height="${h}" alt="${alt || c.alt}" style="object-position:${c.pos}" ${eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}>`;
}

function assertUnique() {
  const ids = Object.values(catalog).map((c) => c.id);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) throw new Error('Duplicate image IDs: ' + dup.join(', '));
  const unused = Object.keys(catalog).filter((k) => !usedKeys.has(k));
  if (unused.length) throw new Error('Unused catalogue images: ' + unused.join(', '));
}

module.exports = { catalog, pic, url, assertUnique };
