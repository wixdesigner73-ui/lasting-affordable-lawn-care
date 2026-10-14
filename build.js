// Static site generator — no dependencies. Run:  node build.js
const fs = require('fs');
const path = require('path');
const { assertUnique } = require('./src/images');

const pages = {
  'index.html': require('./src/pages/home'),
  'about.html': require('./src/pages/about'),
  'services.html': require('./src/pages/services'),
  'contact.html': require('./src/pages/contact'),
};

for (const [file, render] of Object.entries(pages)) {
  fs.writeFileSync(path.join(__dirname, file), render());
  console.log('built', file);
}
assertUnique(); // every catalogue image used once, no duplicate IDs
console.log('image check OK');
