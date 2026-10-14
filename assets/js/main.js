/* Lasting Affordable Lawn Care — site scripts (no dependencies) */
(function () {
  'use strict';

  var doc = document.documentElement;
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var toTop = document.querySelector('.to-top');

  /* ---- footer year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- mobile navigation ---- */
  function setNav(open) {
    if (!header || !toggle) return;
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (toggle) {
    toggle.addEventListener('click', function () { setNav(!header.classList.contains('nav-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });
    document.addEventListener('click', function (e) { if (header && !header.contains(e.target)) setNav(false); });
    document.querySelectorAll('.main-nav a').forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1000) setNav(false); });
  }

  /* ---- header shadow + back-to-top ---- */
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || doc.scrollTop;
    if (header) header.classList.toggle('scrolled', y > 8);
    if (toTop) toTop.classList.toggle('show', y > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---- scroll reveal ---- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- contact form ---- */
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn.querySelector('.btn-label');
  var serviceSelect = form.elements.service;

  // Pre-select a service when arriving from the Services page (contact.html?service=mowing)
  try {
    var wanted = new URLSearchParams(window.location.search).get('service');
    if (wanted && serviceSelect.querySelector('option[value="' + wanted + '"]')) serviceSelect.value = wanted;
  } catch (e) { /* ignore */ }

  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var rules = {
    firstName: function (v) { return v.trim() ? '' : 'Please enter your first name.'; },
    email: function (v) {
      if (!v.trim()) return 'Please enter your email address.';
      return emailRe.test(v.trim()) ? '' : 'Please enter a valid email address.';
    },
    phone: function (v) {
      if (!v.trim()) return '';
      return v.replace(/\D/g, '').length >= 7 ? '' : 'Please enter a valid phone number.';
    },
    message: function (v) {
      if (!v.trim()) return 'Please tell us a little about your lawn care needs.';
      return v.trim().length >= 10 ? '' : 'Please add a few more details (at least 10 characters).';
    },
  };

  function check(name) {
    var field = form.elements[name];
    var wrap = field.closest('.field');
    var msg = rules[name](field.value);
    var out = document.getElementById(name + '-err');
    if (out) out.textContent = msg;
    wrap.classList.toggle('invalid', !!msg);
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  Object.keys(rules).forEach(function (name) {
    var field = form.elements[name];
    field.addEventListener('blur', function () { check(name); });
    field.addEventListener('input', function () { if (field.closest('.field').classList.contains('invalid')) check(name); });
  });

  function show(kind, html) {
    status.hidden = false;
    status.className = 'form-status is-' + kind;
    status.innerHTML = html;
    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function serviceLabel() {
    var o = serviceSelect.options[serviceSelect.selectedIndex];
    return o && o.value ? o.text : 'Not specified';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.hidden = true;

    var results = Object.keys(rules).map(check);
    if (results.indexOf(false) !== -1) {
      var firstBad = form.querySelector('.field.invalid input, .field.invalid textarea');
      if (firstBad) firstBad.focus();
      show('error', 'Please fix the highlighted fields and try again.');
      return;
    }

    // Spam trap: bots fill the hidden field. Pretend success, send nothing.
    if (form.elements._gotcha && form.elements._gotcha.value) {
      show('success', 'Thank you! Your message has been sent.');
      form.reset();
      return;
    }

    var endpoint = form.dataset.endpoint || (form.action.indexOf('YOUR_FORM_ID') === -1 ? form.action : '');
    var name = (form.elements.firstName.value + ' ' + form.elements.lastName.value).trim();

    if (endpoint) {
      /* Working form backend (Formspree, Getform, Basin, etc.): set data-endpoint on the <form>. */
      submitBtn.disabled = true;
      submitLabel.textContent = 'Sending…';
      var body = new FormData(form);
      body.append('_subject', 'Website inquiry from ' + name);
      body.append('serviceLabel', serviceLabel());
      fetch(endpoint, { method: 'POST', body: body, headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r; })
        .then(function () {
          show('success', '<strong>Thank you, ' + escapeHtml(form.elements.firstName.value.trim()) + '!</strong> Your message has been sent. We&rsquo;ll be in touch soon.');
          form.reset();
        })
        .catch(function () {
          show('error', '<strong>Sorry, your message couldn&rsquo;t be sent.</strong> Please try again, call <a href="tel:+15034682557">(503) 468-2557</a>, or email <a href="mailto:' + form.dataset.mailto + '">' + form.dataset.mailto + '</a>.');
        })
        .then(function () { submitBtn.disabled = false; submitLabel.textContent = 'Send Message'; });
      return;
    }

    /* No backend configured yet: open the visitor's email app with the message pre-filled. */
    var lines = [
      'Name: ' + name,
      'Email: ' + form.elements.email.value.trim(),
      'Phone: ' + (form.elements.phone.value.trim() || 'Not provided'),
      'Service: ' + serviceLabel(),
      '',
      form.elements.message.value.trim(),
    ];
    var href = 'mailto:' + form.dataset.mailto +
      '?subject=' + encodeURIComponent('Lawn care inquiry from ' + name) +
      '&body=' + encodeURIComponent(lines.join('\n'));
    window.location.href = href;
    show('success', '<strong>Almost done!</strong> Your email app should open with your message ready to send. If it doesn&rsquo;t, please email <a href="mailto:' + form.dataset.mailto + '">' + form.dataset.mailto + '</a> or call <a href="tel:+15034682557">(503) 468-2557</a>.');
  });

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
})();
