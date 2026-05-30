const fs = require('fs');
const path = require('path');

const cssFiles = [
  'styles/gco/CircleHero.css',
  'styles/gco/FAQ.css',
  'styles/gco/GCOComparison.css',
  'styles/gco/GridSection.css',
  'styles/gco/HeroSection.css',
  'styles/gco/TimelineSection.css',
  'styles/gco/PolicyAlignment.css',
  'styles/login.css',
  'styles/register.css',
  'imports/contact-styles.css'
].map(f => path.join(__dirname, 'frontend/src', f));

const mappings = [
  { regex: /background-color:\s*#f7f3eb;/g, replace: 'background-color: var(--color-background-primary);' },
  { regex: /background:\s*#f7f3eb;/g, replace: 'background: var(--color-background-primary);' },
  { regex: /color:\s*(#000|#000000|#111111|#1a1b22|black|#111827|#1a1a1a);/g, replace: 'color: var(--color-text-primary);' },
  { regex: /background-color:\s*(#ffffff|white);/g, replace: 'background-color: var(--color-background-secondary);' },
  { regex: /color:\s*(#333|#333333|#374151);/g, replace: 'color: var(--color-text-secondary);' },
  { regex: /color:\s*(#64748b|#6c6c6c);/g, replace: 'color: var(--color-text-tertiary);' },
  { regex: /background-color:\s*(#000|#000000|black);/g, replace: 'background-color: var(--color-text-primary);' },
  { regex: /color:\s*(#ffffff|white);/g, replace: 'color: var(--color-background-primary);' },
  { regex: /color:\s*rgba\(0,\s*0,\s*0,\s*0\.7\);/g, replace: 'color: var(--color-text-muted);' },
  { regex: /color:\s*#fb4444;/g, replace: 'color: var(--color-primary);' },
];

for (const file of cssFiles) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    for (const mapping of mappings) {
      content = content.replace(mapping.regex, mapping.replace);
    }
    fs.writeFileSync(file, content, 'utf8');
    console.log('Processed', file);
  } else {
    console.log('Not found:', file);
  }
}
