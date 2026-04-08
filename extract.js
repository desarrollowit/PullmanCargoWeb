const fs = require('fs');

const rawData = fs.readFileSync('cotizador_data.json', 'utf8');
const json = JSON.parse(rawData);

const pool = json.nodes[1].data;
const locationsMap = new Map();

pool.forEach(item => {
    if (item && typeof item === 'object' && 'codigo' in item && 'descripcion' in item) {
        const idValue = pool[item.codigo];
        const nameValue = pool[item.descripcion];

        if (typeof idValue === 'string' && typeof nameValue === 'string') {
            // The API payload needs ID&NAME format for "origen" and "destino"
            const fullId = `${idValue}&${nameValue}`;
            if (!locationsMap.has(idValue)) {
                locationsMap.set(idValue, { id: fullId, name: nameValue, originalId: idValue });
            }
        }
    }
});

const locations = Array.from(locationsMap.values());
locations.sort((a, b) => a.name.localeCompare(b.name));

console.log(`Found ${locations.length} locations.`);

if (!fs.existsSync('./public/data')) {
    fs.mkdirSync('./public/data', { recursive: true });
}

fs.writeFileSync('./public/data/locations.json', JSON.stringify(locations, null, 2));
console.log('Saved to ./public/data/locations.json');
