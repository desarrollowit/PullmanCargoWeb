const fs = require('fs');

// Simple parser for SVG paths to find bounding box
function getPathBounds(d) {
    const coords = d.match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number);
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    for (let i = 0; i < coords.length; i += 2) {
        const x = coords[i];
        const y = coords[i + 1];
        if (!isNaN(x) && !isNaN(y)) {
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }
    }
    return { minX, minY, maxX, maxY };
}

// Read the data file
const content = fs.readFileSync('c:\\Users\\EQUIPO1\\Desktop\\PullmanCargoWeb\\src\\data\\chileMapData.ts', 'utf8');

// Extract regions using regex (simple but effective for this file structure)
const regionRegex = /id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*d:\s*"([^"]+)"/g;
let match;
const results = {};

while ((match = regionRegex.exec(content)) !== null) {
    const id = match[1];
    const path = match[3];
    const bounds = getPathBounds(path);
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    results[id] = { ax: Math.round(centerX), ay: Math.round(centerY), bounds };
}

console.log(JSON.stringify(results, null, 2));
