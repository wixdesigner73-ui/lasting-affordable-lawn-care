const { BIZ, SERVICES, ico, deco, grassEdge, head, header, footer, ctaBand, pageHero } = require('../layout');
const { pic, url } = require('../images');

const detail = {
  mowing: ['detailMowing', 'Maintain a neat, even appearance with professional lawn mowing. Regular mowing helps keep your lawn looking cared for and improves the overall presentation of your property.', 't-mower'],
  maintenance: ['detailMaint', 'Keep your lawn in good condition with ongoing attention and maintenance. We focus on helping your outdoor space stay attractive and manageable throughout the changing seasons.', 't-sprout'],
  edging: ['detailEdging', 'Create a clean, finished look around lawn borders, walkways, and other outdoor areas with careful edging and trimming.', 't-shears'],
  cleanup: ['detailCleanup', 'Give your outdoor space a fresh start by clearing leaves, loose debris, and unwanted yard clutter. A tidy yard helps make your entire property more inviting.', 't-rake'],
  hedge: ['detailHedge', 'Keep shrubs and hedges looking tidy and well-maintained with careful trimming that improves the appearance of your outdoor landscape.', 't-shears'],
  seasonal: ['detailSeasonal', 'Different seasons bring different lawn care needs. Seasonal maintenance helps keep outdoor areas manageable and looking their best throughout the year.', 't-can'],
};

module.exports = function services() {
  const rows = SERVICES.map((s, i) => {
    const [img, text, tool] = detail[s.key];
    const n = String(i + 1).padStart(2, '0');
    return `
  <article class="detail ${i % 2 ? 'detail-rev' : ''}" id="${s.key}" aria-labelledby="${s.key}-title">
    ${deco(i % 2 ? 'd-branch' : 'd-branch2', 'deco-line detail-branch')}
    <div class="container split ${i % 2 ? 'split-rev' : ''}">
      <div class="detail-media reveal">
        <div class="detail-frame">${pic(img, { w: 760, h: 620, sizes: '(min-width: 900px) 520px, 90vw' })}</div>
        <span class="detail-num">${n}</span>
        ${deco('d-leaves3', 'deco-line stack-leaves')}
      </div>
      <div class="detail-copy reveal" style="--d:120ms">
        <span class="icon-badge icon-badge-lg">${ico(s.icon)}</span>
        <h3 id="${s.key}-title">${s.title.replace('&', '&amp;')}</h3>
        <p>${text}</p>
        <div class="detail-foot">
          <a class="btn btn-primary" href="contact.html?service=${s.key}#contact-form">Contact Us</a>
          ${deco(tool, 'deco-line tool detail-tool')}
        </div>
      </div>
    </div>
  </article>`;
  }).join('');

  const why = [
    ['sparkle', 'Improved Curb Appeal', 'A trimmed, tidy lawn makes a strong first impression of your home or business.'],
    ['clock', 'Less Time Spent on Yard Work', 'Free up your weekends and let someone else handle the routine outdoor chores.'],
    ['calendar', 'Consistent Outdoor Maintenance', 'Regular care keeps small issues from turning into big yard projects.'],
    ['home', 'A Cleaner, More Inviting Property', 'Well-kept grounds help every visitor, customer, and neighbor feel welcome.'],
  ].map(([i, t, d], k) => `
      <article class="value-card reveal" style="--d:${k * 90}ms">
        <span class="feature-icon">${ico(i)}</span>
        <h3>${t}</h3>
        <p>${d}</p>
      </article>`).join('');

  return (
    head({
      title: 'Lawn Care Services | Lasting Affordable Lawn Care, Warrenton, OR',
      description:
        'Lawn mowing, lawn maintenance, edging and trimming, yard cleanup, shrub and hedge trimming, and seasonal lawn care for homes and businesses in Warrenton, Oregon.',
      file: 'services.html',
      ogImage: url('servicesHero', 1200),
    }) +
    header('services') +
    pageHero({
      label: 'WHAT WE DO',
      title: 'Professional Lawn Care for <span class="underline">Every Season.</span>',
      text: 'Discover lawn care and outdoor maintenance services designed to keep your property looking its best.',
      image: pic('servicesHero', { w: 1800, h: 900, sizes: '100vw', eager: true }),
      crumb: 'Services',
    }) +
    `
<!-- ============ INTRO ============ -->
<section class="section services-intro" aria-labelledby="intro-title">
  ${deco('d-fern', 'deco-line why-fern')}
  ${deco('t-trowel', 'deco-line tool ap-tool')}
  <div class="container narrow center reveal">
    <span class="eyebrow">${ico('leaf', 'icon icon-sm')} OUR SERVICES</span>
    <h2 id="intro-title">The Care Your Outdoor Space Deserves.</h2>
    <p class="lead">A beautiful lawn requires ongoing attention. Lasting Affordable Lawn Care offers practical lawn maintenance solutions for residential and commercial properties, helping customers enjoy neat, attractive outdoor spaces.</p>
    <ul class="chip-row" aria-label="Services at a glance">
      ${SERVICES.map((s) => `<li><a href="#${s.key}">${ico(s.icon, 'icon icon-sm')} ${s.title.replace('&', '&amp;')}</a></li>`).join('')}
    </ul>
  </div>
</section>

<!-- ============ DETAILS ============ -->
<div class="details">${rows}
</div>

<!-- ============ WHY PROFESSIONAL ============ -->
<section class="section dark why-pro" aria-labelledby="whypro-title">
  ${grassEdge('grass-dark')}
  ${deco('d-fern', 'deco-line sp-fern-l')}
  ${deco('d-branch', 'deco-line sp-branch-r')}
  ${deco('d-rings', 'deco-line sp-rings')}
  <div class="container">
    <div class="section-head center reveal">
      <span class="eyebrow eyebrow-light">${ico('leaf', 'icon icon-sm')} WHY IT MATTERS</span>
      <h2 id="whypro-title">Why Professional Lawn Care Matters.</h2>
    </div>
    <div class="values-grid on-dark">${why}</div>
  </div>
</section>

` +
    ctaBand({
      heading: 'Your Lawn Deserves Professional Attention.',
      text: 'Contact Lasting Affordable Lawn Care to discuss the services that are right for your property.',
      buttons: `<a class="btn btn-primary" href="contact.html">Get in Touch</a><a class="btn btn-outline-light" href="${BIZ.tel}">${ico('phone', 'icon icon-sm')} ${BIZ.phone}</a>`,
    }) +
    footer()
  );
};
