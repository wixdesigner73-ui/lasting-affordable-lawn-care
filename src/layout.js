const sprite = require('./sprite');

const BIZ = {
  name: 'Lasting Affordable Lawn Care',
  owner: 'Nick Tucker',
  phone: '(503) 468-2557',
  tel: 'tel:+15034682557',
  email: 'nicktucker2805@yahoo.com',
  mailto: 'mailto:nicktucker2805@yahoo.com',
  yelp: 'https://www.yelp.com/biz/lasting-affordable-lawn-care-warrenton',
};

// ---- small helpers used by every page ----
const ico = (name, cls = 'icon') => `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
// decorative illustration: name from the sprite, extra classes handle position/colour/animation
const deco = (name, cls = '') => `<svg class="deco ${cls}" aria-hidden="true" focusable="false"><use href="#${name}"/></svg>`;
const grassEdge = (cls = '') => `<svg class="grass-edge ${cls}" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" focusable="false"><use href="#d-grass"/></svg>`;

const logoMark = `<svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="24" fill="#078C58"/><path d="M13 35C12 22 21 13 35 12C36 26 28 35 15 35" fill="#79D94C"/><path d="M13 35L27 21" stroke="#123F2E" stroke-width="2.2" stroke-linecap="round" fill="none"/><path d="M10 37H38" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`;

const NAV = [
  { href: 'index.html', label: 'Home', key: 'home' },
  { href: 'about.html', label: 'About Us', key: 'about' },
  { href: 'services.html', label: 'Services', key: 'services' },
  { href: 'contact.html', label: 'Contact Us', key: 'contact' },
];

const SERVICES = [
  { key: 'mowing', title: 'Lawn Mowing', icon: 'mower' },
  { key: 'maintenance', title: 'Lawn Maintenance', icon: 'grass' },
  { key: 'edging', title: 'Edging & Trimming', icon: 'shears' },
  { key: 'cleanup', title: 'Yard Cleanup', icon: 'rake' },
  { key: 'hedge', title: 'Shrub & Hedge Trimming', icon: 'hedge' },
  { key: 'seasonal', title: 'Seasonal Lawn Care', icon: 'season' },
];

function head({ title, description, file, ogImage }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="#123F2E">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
${ogImage ? `<meta property="og:image" content="${ogImage}">` : ''}
<meta property="og:locale" content="en_US">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Poppins:wght@500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<script>document.documentElement.classList.add('js');</script>
<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LawnCare',
    name: BIZ.name,
    founder: BIZ.owner,
    telephone: '+1-503-468-2557',
    email: BIZ.email,
    sameAs: [BIZ.yelp],
    address: { '@type': 'PostalAddress', addressLocality: 'Warrenton', addressRegion: 'OR', addressCountry: 'US' },
    areaServed: ['Warrenton, OR', 'Clatsop County, OR', 'Manzanita, OR', 'Rockaway Beach, OR'],
  })}</script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${sprite}
`;
}

function header(active) {
  const links = NAV.map(
    (n) => `<li><a href="${n.href}"${n.key === active ? ' class="is-active" aria-current="page"' : ''}>${n.label}</a></li>`
  ).join('');
  return `
<div class="topbar">
  <div class="container topbar-inner">
    <ul class="topbar-list">
      <li>${ico('pin')}<span>Serving Warrenton, Oregon &amp; Surrounding Areas</span></li>
      <li class="hide-sm">${ico('phone')}<a href="${BIZ.tel}">${BIZ.phone}</a></li>
      <li class="hide-md">${ico('mail')}<a href="${BIZ.mailto}">${BIZ.email}</a></li>
    </ul>
    <a class="topbar-link hide-sm" href="${BIZ.yelp}" target="_blank" rel="noopener">Find us on Yelp ${ico('arrow', 'icon icon-xs')}</a>
  </div>
</div>
<header class="site-header" id="top">
  <div class="container header-inner">
    <a class="logo" href="index.html" aria-label="${BIZ.name} — home">
      ${logoMark}
      <span class="logo-text"><strong>Lasting</strong><em>Affordable Lawn Care</em></span>
    </a>
    <nav class="main-nav" id="main-nav" aria-label="Main navigation">
      <ul>${links}</ul>
      <div class="nav-mobile-cta">
        <a class="btn btn-primary" href="contact.html">Get a Quote</a>
        <a class="nav-phone" href="${BIZ.tel}">${ico('phone')}<span>${BIZ.phone}</span></a>
      </div>
    </nav>
    <div class="header-actions">
      <a class="header-call" href="${BIZ.tel}">
        <span class="header-call-icon">${ico('phone')}</span>
        <span><small>Call us today</small><strong>${BIZ.phone}</strong></span>
      </a>
      <a class="btn btn-primary btn-sm hide-sm" href="contact.html">Get a Quote</a>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav">
        ${ico('menu', 'icon icon-open')}${ico('close', 'icon icon-close')}
      </button>
    </div>
  </div>
</header>
<main id="main">`;
}

function ctaBand({ heading, text, buttons, label = '' }) {
  return `
<section class="cta-band" aria-labelledby="cta-title">
  ${grassEdge('grass-dark')}
  ${deco('d-branch', 'deco-line cta-branch-l')}
  ${deco('d-branch2', 'deco-line cta-branch-r')}
  ${deco('d-rings', 'deco-line cta-rings')}
  <div class="container cta-inner reveal">
    ${label ? `<span class="hand-label">${label}</span>` : ''}
    <h2 id="cta-title">${heading}</h2>
    ${text ? `<p>${text}</p>` : ''}
    <div class="btn-row center">${buttons}</div>
  </div>
</section>`;
}

function footer() {
  return `
</main>
<footer class="site-footer">
  ${grassEdge('grass-dark')}
  ${deco('d-fern', 'deco-line foot-fern')}
  ${deco('d-branch', 'deco-line foot-branch')}
  <div class="container footer-grid">
    <div class="footer-brand">
      <a class="logo logo-light" href="index.html" aria-label="${BIZ.name} — home">
        ${logoMark}
        <span class="logo-text"><strong>Lasting</strong><em>Affordable Lawn Care</em></span>
      </a>
      <p>Dependable, affordable lawn care for residential and commercial properties in Warrenton, Oregon, and surrounding communities. Owner-led, with over 12 years of experience.</p>
      <a class="footer-yelp" href="${BIZ.yelp}" target="_blank" rel="noopener">${ico('star')} See us on Yelp</a>
    </div>
    <div>
      <h3>Quick Links</h3>
      <ul class="footer-links">
        ${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
      </ul>
    </div>
    <div>
      <h3>Our Services</h3>
      <ul class="footer-links">
        ${SERVICES.map((s) => `<li><a href="services.html#${s.key}">${s.title.replace('&', '&amp;')}</a></li>`).join('')}
      </ul>
    </div>
    <div>
      <h3>Contact</h3>
      <ul class="footer-contact">
        <li>${ico('phone')}<a href="${BIZ.tel}">${BIZ.phone}</a></li>
        <li>${ico('mail')}<a href="${BIZ.mailto}">${BIZ.email}</a></li>
        <li>${ico('pin')}<span>Warrenton, Oregon</span></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <p>&copy; <span data-year>2026</span> ${BIZ.name}. All rights reserved.</p>
      <p>Photography via <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a></p>
    </div>
  </div>
</footer>
<a class="to-top" href="#top" aria-label="Back to top">${ico('up')}</a>
<script src="assets/js/main.js" defer></script>
</body>
</html>
`;
}

// Inner-page hero (About / Services / Contact)
function pageHero({ label, title, text, image, crumb }) {
  return `
<section class="page-hero">
  <div class="page-hero-bg">${image}</div>
  <div class="page-hero-overlay"></div>
  ${deco('d-branch', 'deco-line ph-branch')}
  <span class="float-circle fc-a"></span><span class="float-circle fc-b"></span>
  <div class="container page-hero-inner">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">${crumb}</span></nav>
    <span class="pill pill-light">${label}</span>
    <h1>${title}</h1>
    <p>${text}</p>
  </div>
  ${grassEdge('grass-bright')}
</section>`;
}

module.exports = { BIZ, NAV, SERVICES, ico, deco, grassEdge, head, header, footer, ctaBand, pageHero, logoMark };
