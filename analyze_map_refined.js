const fs = require('fs');

function getPathBounds(d) {
    const coords = d.match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number);
    let points = [];
    for (let i = 0; i < coords.length; i += 2) {
        const x = coords[i];
        const y = coords[i + 1];
        if (!isNaN(x) && !isNaN(y)) {
            // Filter out islands and distant points for mainland focus
            if (x > 450) {
                points.push({ x, y });
            }
        }
    }

    if (points.length === 0) return null;

    let minX = Math.min(...points.map(p => p.x));
    let maxX = Math.max(...points.map(p => p.x));
    let minY = Math.min(...points.map(p => p.y));
    let maxY = Math.max(...points.map(p => p.y));

    return { minX, minY, maxX, maxY };
}

const content = fs.readFileSync('c:\\Users\\EQUIPO1\\Desktop\\PullmanCargoWeb\\src\\data\\chileMapData.ts', 'utf8');
const regionRegex = /id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*d:\s*"([^"]+)"/g;
let match;
const results = {};

while ((match = regionRegex.exec(content)) !== null) {
    const id = match[1];
    const path = match[3];
    const bounds = getPathBounds(path);
    if (bounds) {
        const centerX = (bounds.minX + bounds.maxX) / 2;
        const centerY = (bounds.minY + bounds.maxY) / 2;
        results[id] = { ax: Math.round(centerX), ay: Math.round(centerY) };
    }
}

console.log(JSON.stringify(results, null, 2));
