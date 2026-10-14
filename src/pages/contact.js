const { BIZ, SERVICES, ico, deco, grassEdge, head, header, footer, ctaBand, pageHero } = require('../layout');
const { pic, url } = require('../images');

// Stylised, not-to-scale map: Pacific coast on the left, service-area pins running north to south.
const pins = [
  { name: 'Warrenton', x: 292, y: 64, sub: 'Home base', primary: true },
  { name: 'Clatsop County', x: 262, y: 152, sub: 'Service area' },
  { name: 'Manzanita', x: 238, y: 256, sub: 'Service area' },
  { name: 'Rockaway Beach', x: 222, y: 342, sub: 'Service area' },
];
const mapSvg = `
<svg class="area-map" viewBox="0 0 520 440" role="img" aria-label="Illustrated map of the Oregon coast showing Warrenton, Clatsop County, Manzanita and Rockaway Beach">
  <defs>
    <pattern id="mapdots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#078C58" opacity=".22"/></pattern>
    <clipPath id="landclip"><path d="M150 0H520V440H196C214 400 196 372 206 340C218 304 190 286 218 252C240 222 212 190 236 156C252 130 238 96 270 72C286 58 262 22 280 0Z"/></clipPath>
  </defs>
  <rect width="520" height="440" rx="28" fill="#DCEBE0"/>
  <path d="M0 40C30 28 50 52 80 40S130 28 150 40" fill="none" stroke="#fff" stroke-width="2.4" opacity=".8"/>
  <path d="M0 110C30 98 50 122 80 110S120 98 150 110" fill="none" stroke="#fff" stroke-width="2.4" opacity=".8"/>
  <path d="M0 250C26 238 46 262 76 250S112 238 136 250" fill="none" stroke="#fff" stroke-width="2.4" opacity=".8"/>
  <path d="M0 360C26 348 46 372 76 360S112 348 140 360" fill="none" stroke="#fff" stroke-width="2.4" opacity=".8"/>
  <text x="28" y="196" fill="#1D5140" opacity=".7" font-family="Caveat, cursive" font-size="26" font-weight="700" transform="rotate(-8 28 196)">Pacific Ocean</text>
  <path d="M150 0H520V440H196C214 400 196 372 206 340C218 304 190 286 218 252C240 222 212 190 236 156C252 130 238 96 270 72C286 58 262 22 280 0Z" fill="#F8FAF5"/>
  <rect width="520" height="440" fill="url(#mapdots)" clip-path="url(#landclip)"/>
  <path d="M310 0C320 90 380 130 372 220C366 290 420 340 410 440" fill="none" stroke="#fff" stroke-width="7" opacity=".9" clip-path="url(#landclip)"/>
  <path d="M310 0C320 90 380 130 372 220C366 290 420 340 410 440" fill="none" stroke="#C8DDCB" stroke-width="1.6" stroke-dasharray="6 7" clip-path="url(#landclip)"/>
  <path d="M292 64C282 100 270 120 262 152C252 190 244 220 238 256C232 290 226 312 222 342" fill="none" stroke="#078C58" stroke-width="2.6" stroke-dasharray="3 8" stroke-linecap="round"/>
  <g fill="none" stroke="#1D5140" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity=".5" transform="translate(410 300) scale(2.2)"><use href="#d-sprig" width="48" height="36" x="-8" y="0"/></g>
  ${pins
    .map(
      (p) => `
  <g class="map-pin${p.primary ? ' is-primary' : ''}" transform="translate(${p.x} ${p.y})">
    <circle r="${p.primary ? 22 : 16}" fill="#79D94C" opacity=".28"/>
    <circle r="${p.primary ? 11 : 8}" fill="${p.primary ? '#078C58' : '#1D5140'}" stroke="#fff" stroke-width="3"/>
    <text x="${p.primary ? 30 : 24}" y="-2" font-family="Poppins, sans-serif" font-size="15" font-weight="700" fill="#123F2E">${p.name}</text>
    <text x="${p.primary ? 30 : 24}" y="16" font-family="DM Sans, sans-serif" font-size="12" fill="#1D5140" opacity=".75">${p.sub}</text>
  </g>`
    )
    .join('')}
  <text x="500" y="426" text-anchor="end" font-family="DM Sans, sans-serif" font-size="10.5" fill="#1D5140" opacity=".6">Illustrative map &#8212; not to scale</text>
</svg>`;

module.exports = function contact() {
  const options = SERVICES.map((s) => `<option value="${s.key}">${s.title.replace('&', '&amp;')}</option>`).join('');

  return (
    head({
      title: 'Contact Us | Lasting Affordable Lawn Care, Warrenton, Oregon',
      description:
        'Contact Lasting Affordable Lawn Care in Warrenton, Oregon. Call (503) 468-2557, email nicktucker2805@yahoo.com, or send a message to request a lawn care quote.',
      file: 'contact.html',
      ogImage: url('contactHero', 1200),
    }) +
    header('contact') +
    pageHero({
      label: 'CONTACT US',
      title: "Let's Make Your Lawn <span class=\"underline\">Look Its Best.</span>",
      text: "Have questions about lawn care or need help maintaining your property? We'd love to hear from you.",
      image: pic('contactHero', { w: 1800, h: 900, sizes: '100vw', eager: true }),
      crumb: 'Contact Us',
    }) +
    `
<!-- ============ CONTACT CARDS ============ -->
<section class="section contact-cards-sec" aria-label="Contact details">
  ${deco('d-fern', 'deco-line why-fern')}
  <div class="container contact-cards">
    <article class="contact-card reveal">
      ${deco('d-leaf', 'deco-line cc-leaf')}
      <span class="feature-icon">${ico('phone')}</span>
      <h3>Call Us</h3>
      <a href="${BIZ.tel}">${BIZ.phone}</a>
    </article>
    <article class="contact-card reveal" style="--d:90ms">
      ${deco('d-leaf', 'deco-line cc-leaf')}
      <span class="feature-icon">${ico('mail')}</span>
      <h3>Email Us</h3>
      <a href="${BIZ.mailto}">${BIZ.email}</a>
    </article>
    <article class="contact-card reveal" style="--d:180ms">
      ${deco('d-leaf', 'deco-line cc-leaf')}
      <span class="feature-icon">${ico('pin')}</span>
      <h3>Our Location</h3>
      <p>Warrenton, Oregon</p>
    </article>
  </div>
</section>

<!-- ============ FORM ============ -->
<section class="section form-section" aria-labelledby="form-title">
  ${deco('d-branch2', 'deco-line ap-branch-r')}
  <div class="container form-wrap">
    <div class="form-image reveal">
      ${pic('contactForm', { w: 1200, h: 800, maxW: 1800, sizes: '(min-width: 960px) 1400px, 100vw' })}
      ${deco('d-leaves3', 'deco-line stack-leaves')}
    </div>
    <div class="form-panel reveal" style="--d:120ms">
      ${deco('d-fern', 'deco-line fp-fern')}
      <span class="eyebrow eyebrow-light">${ico('leaf', 'icon icon-sm')} GET A QUOTE</span>
      <h2 id="form-title">Send Us a Message.</h2>
      <p>Tell us a little about your lawn care needs, and we&rsquo;ll be happy to discuss how we can help.</p>
      <form id="contact-form" class="form" novalidate
            action="https://formspree.io/f/YOUR_FORM_ID" method="POST"
            data-endpoint="" data-mailto="${BIZ.email}">
        <div class="form-grid">
          <div class="field">
            <label for="firstName">First Name <span class="req" aria-hidden="true">*</span></label>
            <input id="firstName" name="firstName" type="text" autocomplete="given-name" required aria-describedby="firstName-err">
            <span class="err" id="firstName-err" role="alert"></span>
          </div>
          <div class="field">
            <label for="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" autocomplete="family-name">
          </div>
          <div class="field">
            <label for="email">Email Address <span class="req" aria-hidden="true">*</span></label>
            <input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-err">
            <span class="err" id="email-err" role="alert"></span>
          </div>
          <div class="field">
            <label for="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" aria-describedby="phone-err">
            <span class="err" id="phone-err" role="alert"></span>
          </div>
          <div class="field field-full">
            <label for="service">Service Interested In</label>
            <select id="service" name="service">
              <option value="">Select a service&hellip;</option>
              ${options}
              <option value="other">Other / Not sure yet</option>
            </select>
          </div>
          <div class="field field-full">
            <label for="message">Your Message <span class="req" aria-hidden="true">*</span></label>
            <textarea id="message" name="message" rows="5" required aria-describedby="message-err"></textarea>
            <span class="err" id="message-err" role="alert"></span>
          </div>
          <div class="hp" aria-hidden="true"><label>Leave this field empty<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" type="submit"><span class="btn-label">Send Message</span></button>
          <p class="form-note">Fields marked <span class="req">*</span> are required.</p>
        </div>
        <div class="form-status" id="form-status" role="status" aria-live="polite" hidden></div>
      </form>
    </div>
  </div>
</section>

<!-- ============ SERVICE AREA ============ -->
<section class="section dark area" aria-labelledby="area-title">
  ${grassEdge('grass-dark')}
  ${deco('d-fern', 'deco-line sp-fern-l')}
  ${deco('d-rings', 'deco-line sp-rings')}
  <div class="container split">
    <div class="reveal">
      <span class="eyebrow eyebrow-light">${ico('leaf', 'icon icon-sm')} SERVICE AREA</span>
      <h2 id="area-title">Proudly Serving Our Local Communities.</h2>
      <p class="lead">Based in Warrenton, Oregon, Lasting Affordable Lawn Care provides lawn care services across its surrounding service areas.</p>
      <ul class="area-list">
        <li>${ico('pin')}<span>Warrenton</span></li>
        <li>${ico('pin')}<span>Clatsop County</span></li>
        <li>${ico('pin')}<span>Manzanita</span></li>
        <li>${ico('pin')}<span>Rockaway Beach</span></li>
        <li class="area-wide">${ico('pin')}<span>Surrounding communities within the service area</span></li>
      </ul>
    </div>
    <div class="map-wrap reveal" style="--d:120ms">${mapSvg}</div>
  </div>
</section>

` +
    ctaBand({
      heading: 'Beautiful Lawns Start With Great Care.',
      text: '',
      buttons: `<a class="btn btn-primary" href="${BIZ.tel}">${ico('phone', 'icon icon-sm')} Call Us Today</a><a class="btn btn-outline-light" href="${BIZ.mailto}">${ico('mail', 'icon icon-sm')} Email Nick</a>`,
    }) +
    footer()
  );
};
