const { BIZ, ico, deco, grassEdge, head, header, footer, ctaBand, pageHero } = require('../layout');
const { pic, url } = require('../images');

module.exports = function about() {
  const values = [
    ['shield', 'Dependability', 'We understand the importance of consistent lawn maintenance.', 't-mower'],
    ['coin', 'Affordability', 'We focus on practical services that offer meaningful value.', 't-can'],
    ['eye', 'Attention to Detail', 'Small details make a big difference in how a property looks.', 't-shears'],
    ['heart', 'Customer-Focused Care', 'We listen to the needs of each customer and their property.', 't-sprout'],
  ]
    .map(
      ([i, t, d, tool], k) => `
      <article class="value-card reveal" style="--d:${k * 90}ms">
        ${deco(tool, 'deco-line tool vc-tool')}
        <span class="feature-icon">${ico(i)}</span>
        <h3>${t}</h3>
        <p>${d}</p>
      </article>`
    )
    .join('');

  return (
    head({
      title: 'About Us | Lasting Affordable Lawn Care, Warrenton, Oregon',
      description:
        'Meet Lasting Affordable Lawn Care, an owner-led lawn care business in Warrenton, Oregon with over 12 years of experience serving residential and commercial properties.',
      file: 'about.html',
      ogImage: url('aboutHero', 1200),
    }) +
    header('about') +
    pageHero({
      label: 'GET TO KNOW US',
      title: 'Local Lawn Care Built on <span class="underline">Experience</span> and Dedication.',
      text: 'Discover the people and values behind Lasting Affordable Lawn Care.',
      image: pic('aboutHero', { w: 1800, h: 900, sizes: '100vw', eager: true }),
      crumb: 'About Us',
    }) +
    `
<!-- ============ ABOUT ============ -->
<section class="section about-preview" aria-labelledby="about-title">
  ${deco('d-branch2', 'deco-line ap-branch-r')}
  ${deco('d-rings', 'deco-line ap-rings')}
  <div class="container split">
    <div class="img-stack img-stack-single reveal">
      <div class="img-main img-main-wide">${pic('aboutMain', { w: 800, h: 780, sizes: '(min-width: 900px) 500px, 90vw' })}</div>
      ${deco('d-leaves3', 'deco-line stack-leaves')}
      ${deco('d-dots', 'deco-dots stack-dots')}
    </div>
    <div class="split-copy reveal" style="--d:120ms">
      <span class="eyebrow">${ico('leaf', 'icon icon-sm')} ABOUT LASTING AFFORDABLE LAWN CARE</span>
      <h2 id="about-title">Dedicated to Making Outdoor Spaces Look Their Best.</h2>
      <p>Lasting Affordable Lawn Care is a lawn care service based in Warrenton, Oregon, led by owner Nick Tucker.</p>
      <p>With over 12 years of experience in the industry, Nick understands the importance of maintaining attractive, healthy-looking lawns for both residential and commercial properties.</p>
      <p>Our approach is centered on dependable maintenance, affordable service, and attention to the unique needs of each outdoor space.</p>
      <p>Whether you need help keeping your lawn tidy or maintaining the appearance of your property throughout the year, Lasting Affordable Lawn Care is here to help.</p>
      <a class="btn btn-primary" href="contact.html">Get in Touch</a>
    </div>
  </div>
</section>

<!-- ============ MISSION ============ -->
<section class="section dark mission" aria-labelledby="mission-title">
  ${grassEdge('grass-dark')}
  ${deco('d-fern', 'deco-line sp-fern-l')}
  ${deco('d-rings', 'deco-line sp-rings')}
  <div class="container split split-rev">
    <div class="mission-media reveal">
      <div class="mission-frame">${pic('aboutMission', { w: 800, h: 640, sizes: '(min-width: 900px) 520px, 90vw' })}</div>
      ${deco('d-sprig', 'deco-line mission-sprig')}
    </div>
    <div class="reveal" style="--d:120ms">
      <span class="eyebrow eyebrow-light">${ico('leaf', 'icon icon-sm')} OUR MISSION</span>
      <h2 id="mission-title">Quality Lawn Care Without the Complications.</h2>
      <p class="lead">Our mission is to make professional lawn maintenance accessible and straightforward. We aim to help customers enjoy cleaner, greener, and more welcoming outdoor spaces through practical, affordable lawn care.</p>
      <div class="btn-row"><a class="btn btn-primary" href="services.html">See Our Services</a></div>
    </div>
  </div>
</section>

<!-- ============ VALUES ============ -->
<section class="section values" aria-labelledby="values-title">
  ${deco('d-branch', 'deco-line pr-branch-l')}
  ${deco('d-branch2', 'deco-line pr-branch-r')}
  <div class="container">
    <div class="section-head center reveal">
      <span class="eyebrow">${ico('leaf', 'icon icon-sm')} OUR VALUES</span>
      <h2 id="values-title">What Guides Every Lawn We Care For.</h2>
    </div>
    <div class="values-grid">${values}</div>
  </div>
</section>

<!-- ============ EXPERIENCE ============ -->
<section class="section experience" aria-labelledby="exp-title">
  ${deco('d-fern', 'deco-line why-fern')}
  <div class="container split">
    <div class="exp-media reveal">
      <div class="why-frame">${pic('aboutExp', { w: 760, h: 760, sizes: '(min-width: 900px) 460px, 90vw' })}</div>
      ${deco('d-leaves3', 'deco-line stack-leaves')}
    </div>
    <div class="exp-copy reveal" style="--d:120ms">
      <div class="big-badge" role="img" aria-label="12 plus years of lawn care experience"><strong>12+</strong><span>Years of Lawn Care Experience</span></div>
      <span class="eyebrow">${ico('leaf', 'icon icon-sm')} EXPERIENCE</span>
      <h2 id="exp-title">Over a Decade of Caring for Local Lawns.</h2>
      <p class="lead">Nick Tucker brings more than 12 years of lawn care experience to every property, serving homes and businesses in Warrenton and the surrounding communities.</p>
      <ul class="tick-list">
        <li>${ico('check')} Residential and commercial properties</li>
        <li>${ico('check')} Dependable, consistent maintenance</li>
        <li>${ico('check')} Practical, affordable service</li>
      </ul>
    </div>
  </div>
</section>

` +
    ctaBand({
      heading: 'Let Us Take Care of Your Lawn.',
      text: 'Tell us about your property and we&rsquo;ll talk through the right care for it.',
      buttons: `<a class="btn btn-primary" href="contact.html">Contact Us Today</a><a class="btn btn-outline-light" href="${BIZ.tel}">${ico('phone', 'icon icon-sm')} ${BIZ.phone}</a>`,
    }) +
    footer()
  );
};
