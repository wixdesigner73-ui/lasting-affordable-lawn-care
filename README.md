# Lasting Affordable Lawn Care — website

Static site, no dependencies. Pages live in `src/pages/`; edit them, then run:

    node build.js

This regenerates `index.html`, `about.html`, `services.html`and `contact.html`.
Upload the whole folder (HTML files, `assets/`, `robots.txt`) to any static host.

## Make the contact form send email
Until a form service is set up, the form opens the visitor's email app (mailto fallback).
To send directly: create a free form at formspree.io, then in `src/pages/contact.js` replace
`YOUR_FORM_ID` in the form `action` with your form ID and rebuild.

## Images
All photos are listed in `src/images.js`; `build.js` fails if an image is unused or duplicated.
