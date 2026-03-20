const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src/assets');
fs.readdirSync(p).forEach(f => {
    if(f.endsWith('.png')){
        const buf = fs.readFileSync(path.join(p, f));
        if (buf.toString('ascii', 1, 4) === 'PNG') {
            const width = buf.readUInt32BE(16);
            const height = buf.readUInt32BE(20);
            console.log(`${f}: ${width}x${height}`);
        }
    }
});
