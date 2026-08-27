const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '../.next');
const MAX_JS_SIZE = 250 * 1024; // 250 KB

function checkBundleSize() {
const serverDir = path.join(BUILD_DIR, 'server');
const staticDir = path.join(BUILD_DIR, 'static');

let maxSize = 0;
let largestFile = '';

function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else if (file.endsWith('.js') && stat.size > maxSize) {
            maxSize = stat.size;
            largestFile = fullPath;
        }
    }
}

scanDir(serverDir);
scanDir(staticDir);

const sizeKB = (maxSize / 1024).toFixed(1);
const limitKB = (MAX_JS_SIZE / 1024).toFixed(1);

console.log(`📦 Grootste JS bundle: ${largestFile} (${sizeKB} KB / limiet: ${limitKB} KB)`);

if (maxSize > MAX_JS_SIZE) {
    console.error(`❌  BUNDLE TE GROOT: ${sizeKB} KB > ${limitKB} KB`);
    process.exit(1);
}

console.log('✅  Bundle size binnen budget');
}

checkBundleSize();
