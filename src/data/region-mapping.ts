export const regionMapping: Record<string, string> = {
    "Arica y Parinacota": "15",
    "Tarapacá": "01",
    "Antofagasta": "02",
    "Atacama": "03",
    "Coquimbo": "04",
    "Valparaíso": "05",
    "Metropolitana": "13",
    "O'Higgins": "06",
    "Maule": "07",
    "Ñuble": "16",
    "Biobío": "08",
    "Araucanía": "09",
    "Los Ríos": "14",
    "Los Lagos": "10",
    "Aysén": "11",
    "Magallanes": "12",
};

// Inverse mapping if needed
export const getRegionNameById = (id: string): string | undefined => {
    return Object.entries(regionMapping).find(([_, value]) => value === id)?.[0];
};
