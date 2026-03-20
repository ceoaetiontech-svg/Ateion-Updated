const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/assets');
const files = [
    '3aab4451afd875f66a83eb26e0ca2d6f58abce98.png',
    'a440209918fa81a1c528e2e95290d4f1f12546e7.png',
    'e985b07ea1f916546c05a06ca93558ef62ecc870.png',
    'eba887f3bcae20b7a5611026256348307e65c2c4.png'
];

files.forEach(f => {
    // Just read the first few bytes, wait, I can't easily parse PNG pixels in raw node without a library like 'pngjs'.
    // Let me check if pngjs is installed in package.json.
    try {
        const pkg = require('./package.json');
        console.log(`Dependencies:`, Object.keys(pkg.dependencies || {}));
    } catch (e) {}
});

// alternative: I can copy them to public folder and the user will see. Or maybe I can generate an HTML file with base64 URIs and I can't look at it...
