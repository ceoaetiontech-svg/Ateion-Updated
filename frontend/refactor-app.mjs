import fs from 'fs';
import path from 'path';

const appFile = path.join(process.cwd(), 'src', 'app', 'App.tsx');
let content = fs.readFileSync(appFile, 'utf-8');

// Add Suspense and lazy to react imports
content = content.replace(
  /import \{ useState, useEffect \} from "react";/,
  'import { useState, useEffect, Suspense, lazy } from "react";\nimport LoadingSpinner from "./components/LoadingSpinner";'
);

// Replace page imports with lazy
content = content.replace(/import ([A-Za-z0-9_]+) from "(\.\.\/pages\/[^"]+)";/g, 'const $1 = lazy(() => import("$2"));');

// Wrap everything in Suspense
content = content.replace(/<BrowserRouter>/, '<BrowserRouter>\n        <Suspense fallback={<LoadingSpinner />}>');
content = content.replace(/<\/BrowserRouter>/, '        </Suspense>\n      </BrowserRouter>');

fs.writeFileSync(appFile, content);
console.log("App.tsx refactored for code splitting.");
