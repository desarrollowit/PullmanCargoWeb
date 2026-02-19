export interface Agency {
    city: string
    address: string
    phone: string
    hours: string
    region: string
    commune?: string
}

export const agencies: Agency[] = [
    // Norte Grande
    {
        city: "Arica",
        address: "Santa Maria 2038",
        phone: "+56 58 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Arica y Parinacota",
        commune: "Arica"
    },
    {
        city: "Iquique",
        address: "Patricio Lynch 123",
        phone: "+56 57 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Tarapacá",
        commune: "Iquique"
    },
    {
        city: "Antofagasta",
        address: "Pedro Aguirre Cerda 1234",
        phone: "+56 55 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Antofagasta",
        commune: "Antofagasta"
    },
    {
        city: "Calama",
        address: "Av. Granaderos 3466",
        phone: "+56 55 2222 999",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Antofagasta",
        commune: "Calama"
    },

    // Norte Chico
    {
        city: "Copiapó",
        address: "Chañarcillo 654",
        phone: "+56 52 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Atacama",
        commune: "Copiapó"
    },
    {
        city: "La Serena",
        address: "Av. Balmaceda 4321",
        phone: "+56 51 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Coquimbo",
        commune: "La Serena"
    },
    {
        city: "Coquimbo",
        address: "Av. Varela 1500",
        phone: "+56 51 2222 333",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Coquimbo",
        commune: "Coquimbo"
    },

    // Zona Central
    {
        city: "Valparaíso",
        address: "Av. Argentina 123",
        phone: "+56 32 2222 111",
        hours: "Lun-Vie: 09:00 - 18:30",
        region: "Valparaíso",
        commune: "Valparaíso"
    },
    {
        city: "Viña del Mar",
        address: "Av. Libertad 987",
        phone: "+56 32 2222 222",
        hours: "Lun-Vie: 09:00 - 18:30",
        region: "Valparaíso",
        commune: "Viña del Mar"
    },
    {
        city: "Santiago (Centro)",
        address: "San Borja 1234, Estación Central",
        phone: "+56 2 2222 2222",
        hours: "Lun-Vie: 08:30 - 18:30",
        region: "Metropolitana",
        commune: "Estación Central"
    },
    {
        city: "Santiago (Norte)",
        address: "Panamericana Norte 5500",
        phone: "+56 2 2222 3333",
        hours: "Lun-Vie: 08:30 - 18:30",
        region: "Metropolitana",
        commune: "Conchalí"
    },
    {
        city: "Rancagua",
        address: "O'Carrol 789",
        phone: "+56 72 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "O'Higgins",
        commune: "Rancagua"
    },
    {
        city: "Talca",
        address: "1 Sur 1500",
        phone: "+56 71 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Maule",
        commune: "Talca"
    },

    // Zona Sur
    {
        city: "Chillán",
        address: "Av. Brasil 567",
        phone: "+56 42 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Ñuble",
        commune: "Chillán"
    },
    {
        city: "Concepción",
        address: "Autopista Concepción-Talcahuano 8000",
        phone: "+56 41 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Biobío",
        commune: "Concepción"
    },
    {
        city: "Temuco",
        address: "Vicente Pérez Rosales 456",
        phone: "+56 45 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Araucanía",
        commune: "Temuco"
    },
    {
        city: "Valdivia",
        address: "Picarte 2300",
        phone: "+56 63 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Los Ríos",
        commune: "Valdivia"
    },
    {
        city: "Osorno",
        address: "Errázuriz 1400",
        phone: "+56 64 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Los Lagos",
        commune: "Osorno"
    },
    {
        city: "Puerto Montt",
        address: "Ruta 5 Sur Km 1000",
        phone: "+56 65 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Los Lagos",
        commune: "Puerto Montt"
    },
    {
        city: "Coyhaique",
        address: "Prat 340",
        phone: "+56 67 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Aysén",
        commune: "Coyhaique"
    },
    {
        city: "Punta Arenas",
        address: "Av. Colón 800",
        phone: "+56 61 2222 222",
        hours: "Lun-Vie: 09:00 - 18:00",
        region: "Magallanes",
        commune: "Punta Arenas"
    }
]
