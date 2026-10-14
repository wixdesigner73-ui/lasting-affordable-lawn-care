const { BIZ, SERVICES, ico, deco, grassEdge, head, header, footer, ctaBand } = require('../layout');
const { pic, url } = require('../images');

const svcCopy = {
  mowing: ['svcMowing', 'Keep your grass looking neat and evenly maintained with professional lawn mowing.'],
  maintenance: ['svcMaint', 'Regular care to help maintain the beauty, appearance, and condition of your lawn.'],
  edging: ['svcEdging', 'Give your outdoor space a cleaner, more polished appearance with detailed trimming and edging.'],
  cleanup: ['svcCleanup', 'Refresh your property by addressing leaves, loose debris, and general yard clutter.'],
  hedge: ['svcHedge', 'Maintain a neat appearance around your property with careful shrub and hedge trimming.'],
  seasonal: ['svcSeasonal', "Help prepare your outdoor spaces for changing seasons with maintenance suited to your property's needs."],
};

module.exports = function home() {
  const serviceCards = SERVICES.map((s, i) => {
    const [img, text] = svcCopy[s.key];
    return `
      <article class="svc-card reveal" style="--d:${(i % 3) * 90}ms">
        <a class="svc-media" href="services.html#${s.key}" tabindex="-1" aria-hidden="true">${pic(img, { w: 640, h: 440, sizes: '(min-width: 1000px) 400px, (min-width: 640px) 45vw, 100vw' })}</a>
        <div class="svc-body">
          <div class="svc-top">
            <span class="icon-badge">${ico(s.icon)}</span>
            <a class="round-btn" href="services.html#${s.key}" aria-label="Learn more about ${s.title}">${ico('arrow')}</a>
          </div>
          <h3>${s.title.replace('&', '&amp;')}</h3>
          <p>${text}</p>
        </div>
      </article>`;
  }).join('');

  const why = [
    ['award', 'Over 12 Years of Experience', 'A dozen-plus years of hands-on lawn care behind every property we look after.'],
    ['coin', 'Affordable Lawn Care', 'Practical services priced to give you real value, without unnecessary extras.'],
    ['home', 'Residential & Commercial Service', 'From family homes to business properties, we keep outdoor spaces looking cared for.'],
    ['eye', 'Attention to Detail', 'Clean lines, tidy finishes, and the small touches that make a property stand out.'],
  ].map(([i, t, d], k) => `
        <div class="why-item reveal" style="--d:${k * 80}ms">
          <span class="icon-badge icon-badge-lg">${ico(i)}</span>
          <div><h3>${t.replace('&', '&amp;')}</h3><p>${d}</p></div>
        </div>`).join('');

  const steps = [
    ['phone', '01', 'Get in Touch', 'Call or send a message to tell us about your lawn care needs.'],
    ['clipboard', '02', 'Discuss Your Property', 'Share the type of maintenance your property requires.'],
    ['calendar', '03', 'Plan Your Service', "We'll discuss suitable services and scheduling options."],
    ['smile', '04', 'Enjoy Your Outdoor Space', 'Spend less time worrying about lawn maintenance and more time enjoying your property.'],
  ].map(([i, n, t, d], k) => `
        <li class="step reveal" style="--d:${k * 100}ms">
          <div class="step-node"><span>${n}</span></div>
          <div class="step-card">
            <span class="icon-badge">${ico(i)}</span>
            <h3>${t}</h3>
            <p>${d}</p>
          </div>
          ${k < 3 ? deco('d-arrow', 'deco-line step-arrow') : ''}
        </li>`).join('');

  return (
    head({
      title: 'Lasting Affordable Lawn Care | Lawn Care in Warrenton, Oregon',
      description:
        'Dependable, affordable lawn care for homes and businesses in Warrenton, Oregon, Clatsop County, Manzanita and Rockaway Beach. Over 12 years of experience. Call (503) 468-2557.',
      file: 'index.html',
      ogImage: url('homeHero', 1200),
    }) +
    header('home') +
    `
<!-- ============ HERO ============ -->
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-bg">${pic('homeHero', { w: 1800, h: 1000, sizes: '100vw', cls: 'hero-img', eager: true })}</div>
  <div class="hero-overlay"></div>
  ${deco('d-branch', 'deco-line hero-branch')}
  ${deco('d-sprig', 'deco-line hero-sprig')}
  <span class="float-circle fc-a"></span><span class="float-circle fc-b"></span><span class="float-circle fc-c"></span>
  ${deco('d-leaf', 'deco-solid float-leaf fl-1')}${deco('d-leaf', 'deco-solid float-leaf fl-2')}${deco('d-leaf', 'deco-solid float-leaf fl-3')}
  <div class="container hero-inner">
    <div class="hero-copy">
      <span class="pill pill-light">PROFESSIONAL LAWN CARE SERVICES</span>
      <h1 id="hero-title">Beautiful Lawns. Affordable Care. <span class="underline">Lasting Results.</span></h1>
      <p>Keep your outdoor spaces looking their best with dependable, affordable lawn care from Lasting Affordable Lawn Care. We help homeowners and businesses maintain clean, healthy, and attractive properties.</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="services.html">Explore Our Services</a>
        <a class="btn btn-outline-light" href="contact.html">Contact Us</a>
      </div>
    </div>
  </div>
  ${grassEdge('grass-bright')}
</section>

<!-- ============ FEATURE CARDS ============ -->
<section class="features" aria-label="Why homeowners choose us">
  <div class="container features-grid">
    <article class="feature-card reveal">
      <span class="feature-icon">${ico('leaf')}</span>
      <div><h3>Quality Lawn Care</h3><p>Thoughtful lawn maintenance focused on keeping your property neat, healthy, and inviting.</p></div>
    </article>
    <article class="feature-card reveal" style="--d:90ms">
      <span class="feature-icon">${ico('shield')}</span>
      <div><h3>Dependable Service</h3><p>Professional lawn care with attention to detail and respect for your property.</p></div>
    </article>
    <article class="feature-card reveal" style="--d:180ms">
      <span class="feature-icon">${ico('coin')}</span>
      <div><h3>Affordable Solutions</h3><p>Practical lawn care services designed to help you maintain a beautiful outdoor space without unnecessary expense.</p></div>
    </article>
  </div>
</section>

<!-- ============ ABOUT PREVIEW ============ -->
<section class="section about-preview" aria-labelledby="about-title">
  ${deco('d-branch2', 'deco-line ap-branch-r')}
  ${deco('d-rings', 'deco-line ap-rings')}
  ${deco('t-trowel', 'deco-line tool ap-tool')}
  <div class="container split">
    <div class="img-stack reveal">
      <div class="img-main">${pic('homeAboutBig', { w: 760, h: 900, sizes: '(min-width: 900px) 480px, 90vw' })}</div>
      <div class="img-small">${pic('homeAboutSm', { w: 420, h: 340, sizes: '260px' })}</div>
      <div class="exp-badge" role="img" aria-label="12 plus years of experience"><strong>12+</strong><span>Years of<br>Experience</span></div>
      ${deco('d-leaves3', 'deco-line stack-leaves')}
    </div>
    <div class="split-copy reveal" style="--d:120ms">
      <span class="eyebrow">${ico('leaf', 'icon icon-sm')} ABOUT US</span>
      <h2 id="about-title">Helping Your Lawn Look Its Best, Season After Season.</h2>
      <p>At Lasting Affordable Lawn Care, we believe a well-maintained lawn makes every property more welcoming. Led by Nick Tucker, our business brings over 12 years of lawn care experience to residential and commercial properties in Warrenton, Oregon, and surrounding communities.</p>
      <ul class="check-list">
        <li><span class="check-badge">${ico('grass')}</span><div><h3>Reliable Lawn Maintenance</h3><p>Consistent attention to the appearance and condition of your outdoor spaces.</p></div></li>
        <li><span class="check-badge">${ico('home')}</span><div><h3>Residential &amp; Commercial Care</h3><p>Lawn care solutions for homes, businesses, and outdoor properties.</p></div></li>
        <li><span class="check-badge">${ico('coin')}</span><div><h3>Affordable, Personalized Service</h3><p>Practical lawn maintenance based on the needs of your property.</p></div></li>
      </ul>
      <a class="btn btn-primary" href="about.html">Discover More</a>
    </div>
  </div>
</section>

<!-- ============ SERVICES PREVIEW ============ -->
<section class="section dark services-preview" aria-labelledby="svc-title">
  ${grassEdge('grass-dark')}
  ${deco('d-fern', 'deco-line sp-fern-l')}
  ${deco('d-branch', 'deco-line sp-branch-r')}
  ${deco('d-rings', 'deco-line sp-rings')}
  <div class="container">
    <div class="section-head split-head reveal">
      <div>
        <span class="eyebrow eyebrow-light">${ico('leaf', 'icon icon-sm')} OUR SERVICES</span>
        <h2 id="svc-title">Professional Care for a Greener, Healthier Lawn.</h2>
      </div>
      <div class="head-side">
        ${deco('d-arrow', 'deco-line head-arrow')}
        <p>Explore practical lawn care and maintenance solutions to help keep your outdoor spaces looking clean, fresh, and well cared for.</p>
        <a class="btn btn-primary" href="services.html">View All Services</a>
      </div>
    </div>
    <div class="svc-grid">${serviceCards}</div>
  </div>
</section>

<!-- ============ WHY CHOOSE US ============ -->
<section class="section why" aria-labelledby="why-title">
  ${deco('d-fern', 'deco-line why-fern')}
  ${deco('t-shears', 'deco-line tool why-tool')}
  <div class="container split split-rev">
    <div class="why-media reveal">
      <div class="why-frame">${pic('homeWhy', { w: 760, h: 860, sizes: '(min-width: 900px) 460px, 90vw' })}</div>
      ${deco('d-dots', 'deco-dots why-dots')}
      <div class="why-note"><span class="icon-badge">${ico('leaf')}</span><p>Neat, healthy, welcoming properties &mdash; that&rsquo;s the goal on every visit.</p></div>
    </div>
    <div class="reveal" style="--d:120ms">
      <span class="eyebrow">${ico('leaf', 'icon icon-sm')} WHY CHOOSE US</span>
      <h2 id="why-title">Lawn Care That Puts Your Property First.</h2>
      <p class="lead">We understand that every lawn is different. Our goal is to make outdoor maintenance easier with dependable service, practical solutions, and attention to the details that matter.</p>
      <div class="why-grid">${why}</div>
    </div>
  </div>
</section>

<!-- ============ PROCESS ============ -->
<section class="section process" aria-labelledby="process-title">
  ${deco('d-branch', 'deco-line pr-branch-l')}
  ${deco('d-branch2', 'deco-line pr-branch-r')}
  <div class="container">
    <div class="section-head center reveal">
      <span class="eyebrow">${ico('leaf', 'icon icon-sm')} OUR SIMPLE PROCESS</span>
      <h2 id="process-title">A Simple Way to a Better-Looking Lawn.</h2>
    </div>
    <ol class="steps">${steps}</ol>
  </div>
</section>

` +
    ctaBand({
      heading: "Ready for a Lawn You'll Love?",
      text: 'Let Lasting Affordable Lawn Care help you keep your outdoor space clean, green, and inviting.',
      label: 'Let’s get growing',
      buttons: `<a class="btn btn-primary" href="${BIZ.tel}">${ico('phone', 'icon icon-sm')} Call ${BIZ.phone}</a><a class="btn btn-outline-light" href="contact.html">Request a Quote</a>`,
    }) +
    footer()
  );
};
