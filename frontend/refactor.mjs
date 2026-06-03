import fs from 'fs';
import path from 'path';

const SRC = path.join(process.cwd(), 'src');
const IMPORTS = path.join(SRC, 'imports');
const PAGES = path.join(SRC, 'pages');
const FEATURES = path.join(SRC, 'features');
const STYLES = path.join(SRC, 'styles');

// Create dirs
[PAGES, FEATURES].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Moves
const moves = [
  // Admin & Teacher to pages
  { from: path.join(IMPORTS, 'admin'), to: path.join(PAGES, 'admin') },
  { from: path.join(IMPORTS, 'teacher'), to: path.join(PAGES, 'teacher') },
  // Features to features
  { from: path.join(IMPORTS, 'gco'), to: path.join(FEATURES, 'gco') },
  { from: path.join(IMPORTS, 'home'), to: path.join(FEATURES, 'home') },
  // CSS to styles
  { from: path.join(IMPORTS, 'contact-styles.css'), to: path.join(STYLES, 'contact-styles.css') },
];

moves.forEach(({from, to}) => {
  if (fs.existsSync(from)) {
    fs.renameSync(from, to);
    console.log(`Moved ${from} to ${to}`);
  }
});

// Move remaining .tsx to pages
const importsFiles = fs.readdirSync(IMPORTS);
importsFiles.forEach(file => {
  const fromPath = path.join(IMPORTS, file);
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    const toPath = path.join(PAGES, file);
    fs.renameSync(fromPath, toPath);
    console.log(`Moved ${fromPath} to ${toPath}`);
  }
});

// Try removing imports dir
try { fs.rmdirSync(IMPORTS); } catch (e) { console.log("Could not remove imports dir, might not be empty"); }

// Search and replace imports globally
function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content;

  // Global replacements
  newContent = newContent.replace(/\.\.\/imports\/admin/g, '../pages/admin');
  newContent = newContent.replace(/\.\.\/imports\/teacher/g, '../pages/teacher');
  newContent = newContent.replace(/\.\.\/imports\/gco/g, '../features/gco');
  newContent = newContent.replace(/\.\.\/imports\/home/g, '../features/home');
  newContent = newContent.replace(/\.\.\/imports\//g, '../pages/');
  
  // Specific replacements in GCOPage.tsx and Homepage.tsx (which used to be in imports/ doing ./gco)
  if (filePath.endsWith('GCOPage.tsx')) {
    newContent = newContent.replace(/\.\/gco\//g, '../features/gco/');
  }
  if (filePath.endsWith('Homepage.tsx')) {
    newContent = newContent.replace(/\.\/home\//g, '../features/home/');
  }
  
  // Update CSS import in ContactPage
  if (filePath.endsWith('ContactPage.tsx')) {
    newContent = newContent.replace(/\.\/contact-styles\.css/g, '../styles/contact-styles.css');
  }

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated imports in ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css') || fullPath.endsWith('.html')) {
      replaceInFile(fullPath);
    }
  });
}

walkDir(SRC);
console.log("Refactoring complete.");
