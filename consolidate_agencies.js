const fs = require('fs');

const toString = (val) => (val === null || val === undefined) ? '' : String(val);

const regionMapping = {
    "Arica": "Arica y Parinacota",
    "Iquique": "Tarapacá",
    "Pozo Almonte": "Tarapacá",
    "Alto Hospicio": "Tarapacá",
    "Calama": "Antofagasta",
    "Antofagasta": "Antofagasta",
    "Mejillones": "Antofagasta",
    "Maria Elena": "Antofagasta",
    "Diego de Almagro": "Atacama",
    "Chañaral": "Atacama",
    "Copiapo": "Atacama",
    "Vallenar": "Atacama",
    "El Salvador": "Atacama",
    "La Serena": "Coquimbo",
    "Coquimbo": "Coquimbo",
    "Illapel": "Coquimbo",
    "Ovalle": "Coquimbo",
    "Salamanca": "Coquimbo",
    "Los Vilos": "Coquimbo",
    "San Felipe": "Valparaíso",
    "Los Andes": "Valparaíso",
    "La Calera": "Valparaíso",
    "Valparaiso": "Valparaíso",
    "San Antonio": "Valparaíso",
    "Limache": "Valparaíso",
    "Viña del Mar": "Valparaíso",
    "Quilpue": "Valparaíso",
    "Cartagena": "Valparaíso",
    "Con Con": "Valparaíso",
    "Rancagua": "O'Higgins",
    "Santa Cruz": "O'Higgins",
    "San Fernando": "O'Higgins",
    "Chimbarongo": "O'Higgins",
    "Pichilemu": "O'Higgins",
    "Curico": "Maule",
    "Talca": "Maule",
    "Linares": "Maule",
    "Parral": "Maule",
    "Cauquenes": "Maule",
    "Constitucion": "Maule",
    "Chillan": "Ñuble",
    "Concepcion": "Biobío",
    "Negrete": "Biobío",
    "Los Angeles": "Biobío",
    "Cabrero": "Biobío",
    "Coronel": "Biobío",
    "Lota": "Biobío",
    "Cañete": "Biobío",
    "Curanilahue": "Biobío",
    "Arauco": "Biobío",
    "Lebu": "Biobío",
    "Tome": "Biobío",
    "Penco": "Biobío",
    "Talcahuano": "Biobío",
    "Chiguayante": "Biobío",
    "San Pedro de la Paz": "Biobío",
    "Hualpen": "Biobío",
    "Temuco": "Araucanía",
    "Angol": "Araucanía",
    "Victoria": "Araucanía",
    "Lautaro": "Araucanía",
    "Villarrica": "Araucanía",
    "Pucon": "Araucanía",
    "Nueva Imperial": "Araucanía",
    "Carahue": "Araucanía",
    "Valdivia": "Los Ríos",
    "La Union": "Los Ríos",
    "Rio Bueno": "Los Ríos",
    "Panguipulli": "Los Ríos",
    "Osorno": "Los Lagos",
    "Puerto Montt": "Los Lagos",
    "Puerto Varas": "Los Lagos",
    "Frutillar": "Los Lagos",
    "Castro": "Los Lagos",
    "Ancud": "Los Lagos",
    "Quellon": "Los Lagos",
    "Chaiten": "Los Lagos",
    "Coyhaique": "Aysén",
    "Puerto Aysen": "Aysén",
    "Punta Arenas": "Magallanes",
    "Puerto Natales": "Magallanes"
};

function getAdminRegion(city, commune, rawRegion) {
    if (rawRegion === 'SANTIAGO') return 'Metropolitana';

    const searchStr = (city + " " + commune).toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove accents

    for (const [key, value] of Object.entries(regionMapping)) {
        const normalizedKey = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (searchStr.includes(normalizedKey)) {
            return value;
        }
    }

    // Fallback based on raw zone if known
    if (rawRegion === 'NORTE') {
        if (searchStr.includes('arica')) return 'Arica y Parinacota';
        if (searchStr.includes('iquique')) return 'Tarapacá';
    }

    return rawRegion; // Keep original if no match
}

function processAgencies(rawData, mapping, isSantiago = false) {
    const agencies = [];
    const entries = isSantiago ? rawData['SANTIAGO'] : (rawData.data || rawData['REGIONES ']);

    if (!entries || !Array.isArray(entries)) return [];

    entries.forEach(item => {
        if (!item[mapping.tipo] || item[mapping.tipo].trim() === 'Tipo' || !item[mapping.direccion]) {
            return;
        }

        const phone = toString(item[mapping.fono] || item[mapping.fonoClientes]);
        let email = toString(item[mapping.email]);
        if (email === '-') email = '';

        const name = toString(item[mapping.nombreAgencia]);
        const address = toString(item[mapping.direccion]);
        const rawRegion = isSantiago ? 'SANTIAGO' : toString(item[mapping.regionZona] || item[mapping.region]);
        const commune = toString(item[mapping.comuna] || item[mapping.ciudad]);
        const city = toString(item[mapping.ciudad] || item[mapping.agenciaCiudad]) || commune || (isSantiago ? 'Santiago' : '');

        const adminRegion = getAdminRegion(city, commune, rawRegion);

        // Synthesize hours
        let hours = 'Lun-Vie: 09:00 - 18:30';
        const sabado = toString(item[mapping.sabado]);
        if (sabado && (sabado.trim().toUpperCase() === 'SI' || (sabado.trim().toLowerCase().includes('09:00')))) {
            hours += ' | Sáb: 09:00 - 13:00';
        }

        agencies.push({
            city: city.trim(),
            name: name.trim(),
            address: address.trim(),
            phone: phone.trim(),
            hours: hours,
            region: adminRegion,
            commune: commune.trim(),
            email: email.trim()
        });
    });
    return agencies;
}

// 1. Load Santiago from FULL file
const fullRaw = fs.readFileSync('C:\\Users\\EQUIPO1\\Downloads\\Agencias_Pullman_FULL.json', 'utf8').replace(/: NaN/g, ': null');
const fullData = JSON.parse(fullRaw);
const mappingFull = {
    tipo: 'Unnamed: 0',
    nombreAgencia: 'Unnamed: 2',
    region: 'Unnamed: 3',
    ciudad: 'Unnamed: 7',
    fono: 'Unnamed: 10',
    fonoClientes: 'Unnamed: 11',
    email: 'Unnamed: 12',
    direccion: 'Unnamed: 13',
    comuna: 'Unnamed: 14',
    sabado: 'Unnamed: 6'
};
const santiagoAgencies = processAgencies(fullData, mappingFull, true);

// 2. Load Regiones from Regiones file
const regionesRaw = fs.readFileSync('C:\\Users\\EQUIPO1\\Downloads\\Regiones.json', 'utf8').replace(/: NaN/g, ': null');
const regionesData = JSON.parse(regionesRaw);
const mappingRegiones = {
    tipo: 'Unnamed: 0',
    nombreAgencia: 'Unnamed: 2',
    regionZona: 'Unnamed: 3',
    agenciaCiudad: 'Unnamed: 8',
    fonoClientes: 'Unnamed: 12',
    email: 'Unnamed: 13',
    direccion: 'Unnamed: 15',
    sabado: 'Unnamed: 7',
    comuna: 'Unnamed: 8'
};
const regionalAgencies = processAgencies(regionesData, mappingRegiones, false);

// 3. Merge
const allAgencies = [...santiagoAgencies, ...regionalAgencies];

const tsContent = `export interface Agency {
    city: string
    name?: string
    address: string
    phone: string
    hours: string
    region: string
    commune?: string
    email?: string
}

export const agencies: Agency[] = ${JSON.stringify(allAgencies, null, 4)};
`;

fs.writeFileSync('src/data/agencies.ts', tsContent);
console.log(`Successfully consolidated ${allAgencies.length} agencies with administrative regions.`);
const finalRegions = [...new Set(allAgencies.map(a => a.region))];
console.log(`Detected regions: ${finalRegions.join(', ')}`);
