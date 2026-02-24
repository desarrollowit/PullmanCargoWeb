export interface Agency {
    city: string
    name?: string
    address: string
    phone: string
    hours: string
    region: string
    commune?: string
    email?: string
}

export const agencies: Agency[] = [
    {
        "city": "Estación Central",
        "name": "A14-OBISPO UMAÑA",
        "address": "Obispo Umaña N°1307",
        "phone": "9-99217249",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Estación Central",
        "email": "A14@PULLMANCARGO.CL"
    },
    {
        "city": "Bilbao",
        "name": "A41-BILBAO",
        "address": "Avenida Bilbao N° 308",
        "phone": "9-77888602",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Providencia",
        "email": "A41@PULLMANCARGO.CL"
    },
    {
        "city": "Conchali",
        "name": "A45-EL CORTIJO",
        "address": "Eduardo Frei Montalva N°6001 Edificio B-82",
        "phone": "9-42126656",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Conchali",
        "email": "A45@PULLMANCARGO.CL"
    },
    {
        "city": "Melipilla",
        "name": "A53-MELIPILLA SILVA CHAVEZ",
        "address": "Silvia Chávez N° 561-B",
        "phone": "9-42465348",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Melipilla",
        "email": "A53@PULLMANCARGO.CL"
    },
    {
        "city": "Mapocho",
        "name": "A55-AGENCIA MAPOCHO",
        "address": "Avenida Mapocho N°5534",
        "phone": "9-95426254",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Quinta Normal",
        "email": "A55@PULLMANCARGO.CL"
    },
    {
        "city": "La Cisterna",
        "name": "A63-LA CISTERNA",
        "address": "Angamos N° 7763",
        "phone": "9-35163805",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "La Cisterna",
        "email": "A63@PULLMANCARGO.CL"
    },
    {
        "city": "Toesca",
        "name": "A69-TOESCA",
        "address": "Toesca N° 2698",
        "phone": "9-54782260",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Santiago Centro",
        "email": "A69@PULLMANCARGO.CL"
    },
    {
        "city": "Puente Alto",
        "name": "A82-PUENTE ALTO",
        "address": "Ernesto Alvear N° 247",
        "phone": "9-31267359",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Puente Alto",
        "email": "A82@PULLMANCARGO.CL"
    },
    {
        "city": "Lo Campino",
        "name": "A85-LO CAMPINO",
        "address": "Av. Américo Vespucio N° 1651 Local 21, Strip center Lider Lo Campino",
        "phone": "9-31209093",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Quilicura",
        "email": "A85@PULLMANCARGO.CL"
    },
    {
        "city": "Bodega San Francisco",
        "name": "A86-BODEGAS SAN FRANCISCO",
        "address": "Avenida Laguna Sur 9.660; Bodega 571",
        "phone": "9-54459505",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Pudahuel",
        "email": "A86@PULLMANCARGO.CL"
    },
    {
        "city": "Talagante",
        "name": "A87-TALAGANTE",
        "address": "Enrique Alcalde N°1336",
        "phone": "9-79571978",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Talagante",
        "email": "A87@PULLMANCARGO.CL"
    },
    {
        "city": "Quinta Normal",
        "name": "A90-QUINTA NORMAL",
        "address": "Avenida José Joaquín Pérez N°4481",
        "phone": "9-35585762",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Quinta Normal",
        "email": "A90@PULLMANCARGO.CL"
    },
    {
        "city": "Lo Barnechea",
        "name": "B32-LO BARNECHEA",
        "address": "Comandante Malbec N° 13500 Local 1",
        "phone": "9-45757725",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Lo Barnechea",
        "email": "B32@PULLMANCARGO.CL"
    },
    {
        "city": "La Florida",
        "name": "G58- LA FLORIDA",
        "address": "Canadá N° 9541",
        "phone": "9-32712092",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "La Florida",
        "email": "G58@PULLMANCARGO.CL"
    },
    {
        "city": "Chacabuco",
        "name": "K07-CHACABUCO",
        "address": "Chacabuco N° 92",
        "phone": "9-51604262",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Santiago Centro",
        "email": "K07@PULLMANCARGO.CL"
    },
    {
        "city": "El Bosque",
        "name": "M06-EL BOSQUE",
        "address": "Gran Avenida Jose Miguel Carrera N° 10782 Paradero 33",
        "phone": "9-77550806",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "El Bosque",
        "email": "M06@PULLMANCARGO.CL"
    },
    {
        "city": "Thompson",
        "name": "M08-THOMPSON",
        "address": "Jotabeche N°137",
        "phone": "9-99217249",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Estación Central",
        "email": "M08@PULLMANCARGO.CL"
    },
    {
        "city": "Buin",
        "name": "M11-BUIN",
        "address": "Jose Manuel Balmaceda N° 899, Local 3",
        "phone": "9-87773458",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Buin",
        "email": "M11@PULLMANCARGO.CL"
    },
    {
        "city": "San Diego",
        "name": "M13-SAN DIEGO",
        "address": "Aconcagua N° 1125",
        "phone": "9-82907764",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Santiago",
        "email": "M13@PULLMANCARGO.CL"
    },
    {
        "city": "Santiago",
        "name": "M15-EXPOSICION 2",
        "address": "Exposicion N° 516",
        "phone": "9-62654890",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Santiago",
        "email": "M15@PULLMANCARGO.CL"
    },
    {
        "city": "San Borja",
        "name": "M16-SAN BORJA",
        "address": "San Borja N° 201",
        "phone": "9-76490691",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Estación Central",
        "email": "M16@PULLMANCARGO.CL"
    },
    {
        "city": "Cerrillos",
        "name": "M-18 BUZETA",
        "address": "Av. Cinco N° 2700",
        "phone": "9-47556231",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Cerrillos",
        "email": "M18@PULLMANCARGO.CL"
    },
    {
        "city": "Peñalolen",
        "name": "M21-PEÑALOLEN",
        "address": "Av. Américo Vespucio N° 886",
        "phone": "9-81877873",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Peñalolen",
        "email": "M21@PULLMANCARGO.CL"
    },
    {
        "city": "Lo Prado",
        "name": "M-22 SAN PABLO",
        "address": "San Pablo N°5986",
        "phone": "9-85859540",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Lo Prado",
        "email": "M22@PULLMANCARGO.CL"
    },
    {
        "city": "Lonquen",
        "name": "M23-BOD.DESPACHO CLIENTE",
        "address": "Cerro Sombrero N° 1775",
        "phone": "9-78887068",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Maipú",
        "email": "M23@PULLMANCARGO.CL"
    },
    {
        "city": "Matta",
        "name": "M30-AV. MATTA",
        "address": "Av. Matta N° 421",
        "phone": "9-91556748",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Santiago",
        "email": "M30@PULLMANCARGO.CL"
    },
    {
        "city": "Santiago",
        "name": "M32-ARTEMIO GUTIERREZ",
        "address": "Artemio Gutierrez N° 1446",
        "phone": "9-44367893",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Santiago",
        "email": "M32@PULLMANCARGO.CL"
    },
    {
        "city": "Jotabeche",
        "name": "M35-JOTABECHE",
        "address": "Jotabeche N° 529",
        "phone": "9-9010 6968",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Estación Central",
        "email": "M35@PULLMANCARGO.CL"
    },
    {
        "city": "Patronato",
        "name": "M44-PATRONATO",
        "address": "Tabaré N° 616",
        "phone": "9-3867 8416",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Recoleta",
        "email": "M44@PULLMANCARGO.CL"
    },
    {
        "city": "Ñuñoa",
        "name": "M47-NUNOA",
        "address": "Los Alerces N° 2176",
        "phone": "9-9316 0124",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Ñuñoa",
        "email": "M47@PULLMANCARGO.CL"
    },
    {
        "city": "San Bernardo",
        "name": "M54-SAN BERNARDO",
        "address": "Freire N° 318",
        "phone": "9-7958 8586",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "San Bernardo",
        "email": "M54@PULLMANCARGO.CL"
    },
    {
        "city": "Lo Boza",
        "name": "M58-LO BOZA CD",
        "address": "Lo Boza N° 107",
        "phone": "9-84645444",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Pudahuel",
        "email": "M58@PULLMANCARGO.CL"
    },
    {
        "city": "Einstein",
        "name": "M60-EINSTEIN",
        "address": "Av. Einstein N° 1196",
        "phone": "9-99883002",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Recoleta",
        "email": "M60@PULLMANCARGO.CL"
    },
    {
        "city": "Macul",
        "name": "M90-MACUL",
        "address": "Almirante Cochrane N° 3940",
        "phone": "9-95394204",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Macul",
        "email": "M90@PULLMANCARGO.CL"
    },
    {
        "city": "Lo Espejo",
        "name": "M93-LO ESPEJO",
        "address": "Av.Lo Espejo N°01565",
        "phone": "9-41790619",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Lo Espejo",
        "email": "M93@PULLMANCARGO.CL"
    },
    {
        "city": "Carmen Mena",
        "name": "N31-SAN MIGUEL",
        "address": "Carmen Mena N° 981",
        "phone": "9-36604197",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "San Miguel",
        "email": "N31@PULLMANCARGO.CL"
    },
    {
        "city": "Bustamante",
        "name": "N39-PARQUE BUSTAMANTE",
        "address": "Bustamante N° 656",
        "phone": "9-36923231",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Ñuñoa",
        "email": "N39@PULLMANCARGO.CL"
    },
    {
        "city": "Exposicion",
        "name": "N87-EXPOSICION",
        "address": "Exposición N° 324",
        "phone": "9-49226153",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Santiago Centro",
        "email": "N87@PULLMANCARGO.CL"
    },
    {
        "city": "Serrano",
        "name": "O14-SERRANO",
        "address": "Serrano N° 691",
        "phone": "9-61949901",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "SANTIAGO",
        "commune": "Santiago Centro",
        "email": "O14@PULLMANCARGO.CL"
    },
    {
        "city": "Quilicura",
        "name": "O18-QUILICURA",
        "address": "San Ignacio N° 101",
        "phone": "9-40363364",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "Quilicura",
        "email": "O18@PULLMANCARGO.CL"
    },
    {
        "city": "Larrain",
        "name": "Z83-LA REINA",
        "address": "Alcalde Fernando Castillo Velasco  N° 6985",
        "phone": "9-94127504",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "La Reina",
        "email": "Z83@PULLMANCARGO.CL"
    },
    {
        "city": "Santa Rosa",
        "name": "Z86-SANTA ROSA",
        "address": "Avenida Santa Rosa N° 5320",
        "phone": "9-82334201",
        "hours": "Lun-Vie: 09:00 - 18:30",
        "region": "SANTIAGO",
        "commune": "San Joaquín",
        "email": "Z86@PULLMANCARGO.CL"
    },
    {
        "city": "SI",
        "name": "ARICA CD",
        "address": "A00@PULLMANCARGO.CL",
        "phone": "9-57680529",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "rmontecinos@pullmancargo.cl; arica.carga@pullmancargo.cl; administracion.arica@pullmancargo.cl;  smanqueo@pullmancargo.cl; aquiroga@pullmancargo.cl",
        "email": "58- 2220240"
    },
    {
        "city": "SI",
        "name": "IQUIQUE CD",
        "address": "A02@PULLMANCARGO.CL",
        "phone": "9-57680529",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "tmuscio@pullmancargo.cl     a02@pullmancargo.cl     gmaureira@pullmancargo.cl",
        "email": "57-2413262"
    },
    {
        "city": "SI",
        "name": "POZO ALMONTE",
        "address": "A10@PULLMANCARGO.CL",
        "phone": "9-61334297",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "a10@pullmancargo.cl",
        "email": "57-2751205"
    },
    {
        "city": "SI",
        "name": "ALTO HOSPICIO",
        "address": "A24@PULLMANCARGO.CL",
        "phone": "9-82273963",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "gpacha@comisionistas.cl",
        "email": "57-2498127"
    },
    {
        "city": "SI",
        "name": "LA SERENA TERMINAL",
        "address": "A61@PULLMANCARGO.CL",
        "phone": "9-75178793",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "arojas@pullmancargo.cl;  a61@pullmancargo.cl",
        "email": ""
    },
    {
        "city": "SI",
        "name": "CALAMA CD",
        "address": "B02@PULLMANCARGO.CL",
        "phone": "9-95568754",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "oespinoza@pullmancargo.cl; rrojasd@pullmancargo.cl;    dbeltran@pullmancargo.cl",
        "email": "sin fono fijo"
    },
    {
        "city": "SI",
        "name": "MARIA ELENA",
        "address": "B08@PULLMANCARGO.CL",
        "phone": "9-54070180",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "b08@pullmancargo.cl",
        "email": "55-2639839"
    },
    {
        "city": "SI",
        "name": "MEJILLONES",
        "address": "B12@PULLMANCARGO.CL",
        "phone": "9-32504495",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "b12@pullmancargo.cl",
        "email": "55-2622179"
    },
    {
        "city": "SI",
        "name": "ANTOFAGASTA CD",
        "address": "B14@PULLMANCARGO.CL",
        "phone": "9-85454857",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "jmarcoleta@pullmancargo.cl vdonoso@pullmancargo.cl  b14@pullmancargo.cl",
        "email": "55- 2476233"
    },
    {
        "city": "SI",
        "name": "DIEGO DE ALMAGRO",
        "address": "C02@PULLMANCARGO.CL",
        "phone": "9-78090851",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "arubina@pullmanbus.cl; diegodealmagro@pullmancargo.cl",
        "email": ""
    },
    {
        "city": "SI",
        "name": "CHAÑARAL",
        "address": "C05@PULLMANCARGO.CL",
        "phone": "9-78090851",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "arubina@pullmanbus.cl;  c05@pullmancargo.cl",
        "email": ""
    },
    {
        "city": "SI",
        "name": "COPIAPO CD",
        "address": "C09@PULLMANCARGO.CL",
        "phone": "9-30263915",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "jmorales@pullmancargo.cl; c07@pullmancargo.cl",
        "email": "232383296-232383297"
    },
    {
        "city": "SI",
        "name": "VALLENAR CD",
        "address": "C11@PULLMANCARGO.CL",
        "phone": "9-57151836",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "pramirez@pullmanbus.cl;  c16@pullmancargo.cl  c11@pullmancargo.cl>",
        "email": "232383272"
    },
    {
        "city": "SI",
        "name": "EL SALVADOR",
        "address": "C18@PULLMANCARGO.CL",
        "phone": "9-88186699",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "jdiaz@pullmancargo.cl  c18@pullmancargo.cl",
        "email": "52-2475509"
    },
    {
        "city": "SI",
        "name": "LA SERENA CD",
        "address": "D03@PULLMANCARGO.CL",
        "phone": "9-75178793",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "arojas@pullmancargo.cl;  d03@pullmancargo.cl",
        "email": ""
    },
    {
        "city": "SI",
        "name": "COQUIMBO TERMINAL",
        "address": "d06-carga@pullmancargo.cl",
        "phone": "9-75178793",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "arojas@pullmancargo.cl;  'd06-carga@pullmancargo.cl'",
        "email": ""
    },
    {
        "city": "SI",
        "name": "ILLAPEL",
        "address": "D11@PULLMANCARGO.CL",
        "phone": "9-93640719",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "d11@pullmancargo.cl",
        "email": "232383032-232383031"
    },
    {
        "city": "SI",
        "name": "OVALLE CD",
        "address": "D12@PULLMANCARGO.CL",
        "phone": "9-84645319",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "jcortes@pullmanbus.cl; d12@pullmanbus.cl",
        "email": "232383286-232383287"
    },
    {
        "city": "SI",
        "name": "SALAMANCA",
        "address": "D13@PULLMANCARGO.CL",
        "phone": "9-44294775",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "d13@pullmancargo.cl;lperez@pullmanbus.cl",
        "email": "53-2552648"
    },
    {
        "city": "SI",
        "name": "LOS VILOS CD",
        "address": "D25@PULLMANCARGO.CL",
        "phone": "9-53731394",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "d25@pullmanbus.cl; lperez@pullmanbus.cl",
        "email": "232383033"
    },
    {
        "city": "SI",
        "name": "CARTAGENA",
        "address": "A18@PULLMANCARGO.CL",
        "phone": "9-44294769",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "hrubio@pullmancargo.cl",
        "email": ""
    },
    {
        "city": "SI",
        "name": "CON CON",
        "address": "A23@PULLMANCARGO.CL",
        "phone": "9-78722255",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "aalbini@pullmancargo.cl; a23@pullmancargo.cl",
        "email": "9-42913624"
    },
    {
        "city": "SI",
        "name": "VIÑA DEL MAR CENTRO",
        "address": "A88@PULLMANCARGO.CL",
        "phone": "9-39097433",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "a88@pullmancargo.cl",
        "email": ""
    },
    {
        "city": "SI",
        "name": "SAN FELIPE",
        "address": "E00@PULLMANCARGO.CL",
        "phone": "9-57158897",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "e00@pullmancargo.cl",
        "email": ""
    },
    {
        "city": "SI",
        "name": "LOS ANDES",
        "address": "E01@PULLMANCARGO.CL",
        "phone": "9-31366955",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "e01@pullmancargo.cl",
        "email": "232383593"
    },
    {
        "city": "SI",
        "name": "LA CALERA CD",
        "address": "E02@PULLMANCARGO.CL",
        "phone": "9-74530614",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "e02@localpullman.cl; rodrigomauretr@gmail.com",
        "email": "232383597"
    },
    {
        "city": "SI",
        "name": "VALPARAÍSO CD",
        "address": "E05@PULLMANCARGO.CL",
        "phone": "9-66920525",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "e05@pullmancargo.cl bfernandez@pullmancargo.cl",
        "email": "32-2212550"
    },
    {
        "city": "SI",
        "name": "SAN ANTONIO CD",
        "address": "E11@PULLMANCARGO.CL",
        "phone": "9-44294768",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "e11@pullmancargo.cl",
        "email": "9-84645369"
    },
    {
        "city": "SI",
        "name": "LIMACHE",
        "address": "E25@PULLMANCARGO.CL",
        "phone": "9-95416379",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "e25@pullmancargo.cl rodrigomauretr@gmail.com",
        "email": ""
    },
    {
        "city": "SI",
        "name": "GO FAST VIÑA DEL MAR",
        "address": "E41@PULLMANCARGO.CL",
        "phone": "9- 9770 0448",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "e41@pullmancargo.cl",
        "email": ""
    },
    {
        "city": "SI",
        "name": "VIÑA DEL MAR CD",
        "address": "E80@PULLMANCARGO.CL",
        "phone": "9-84645469",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "nurriola@pullmancargo.cl; e80@pullmancargo.cl; egonzalez@pullmancargo.cl",
        "email": ""
    },
    {
        "city": "SI",
        "name": "QUILPUE",
        "address": "Z59@PULLMANCARGO.CL",
        "phone": "9-54623801",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "z59@pullmancargo.cl",
        "email": ""
    },
    {
        "city": "SI",
        "name": "LLANQUIHUE",
        "address": "A12@PULLMANCARGO.CL",
        "phone": "9-58389566",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "cnewensur@gmail.com",
        "email": "CERRADA"
    },
    {
        "city": "SI",
        "name": "CHIMBARONGO",
        "address": "A39@PULLMANCARGO.CL",
        "phone": "9-51923326",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "a39@pullmancargo.cl",
        "email": "940286562"
    },
    {
        "city": "SI",
        "name": "TEMUCO CENTRO",
        "address": "A43@PULLMANCARGO.CL",
        "phone": "9-84645362",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "rborquez@pullmancargo.cl;mmiranda@comisionista.cl A43@pullmancargo.cl",
        "email": "232383510"
    },
    {
        "city": "SI",
        "name": "PICHILEMU",
        "address": "C70@PULLMANCARGO.CL",
        "phone": "9-58284304",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "c70@pullmancargo.cl;abea@pullmancargo.cl",
        "email": "232383260"
    },
    {
        "city": "SI",
        "name": "RANCAGUA CD",
        "address": "F00@PULLMANCARGO.CL",
        "phone": "9-94493140",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "f00@pullmancargo.cl;mriquelme@pullmancargo.cl;dmartinez@pullmancargo.cl;vcornejo@pullmancargo.cl",
        "email": "232383002"
    },
    {
        "city": "SI",
        "name": "SANTA CRUZ",
        "address": "F27@PULLMANCARGO.CL",
        "phone": "9-56029730",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "f27@pullmancargo.cl",
        "email": "442913660"
    },
    {
        "city": "SI",
        "name": "SAN FERNANDO CD",
        "address": "G00@PULLMANCARGO.CL",
        "phone": "9-42565273",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "mriquelme@pullmancargo.cl",
        "email": "942565273/ 72-2712984"
    },
    {
        "city": "SI",
        "name": "CURICO CD",
        "address": "G01@PULLMANCARGO.CL",
        "phone": "9-87734187",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "g01@pullmancargo.cl   administrativocurico@pullmancargo.cl",
        "email": "232383006"
    },
    {
        "city": "SI",
        "name": "TALCA CD",
        "address": "G02@PULLMANCARGO.CL",
        "phone": "9-31980800",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "administraciontalca@pullmancargo.cl;g02@pullmancargo.cl;jtapia@pullmancargo.cl;",
        "email": "232383007-23238008"
    },
    {
        "city": "SI",
        "name": "LINARES CD",
        "address": "G03@PULLMANCARGO.CL",
        "phone": "9-57886344",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "g03@localpullman.cl;nmondaca@comisionistas.cl",
        "email": "232383012"
    },
    {
        "city": "SI",
        "name": "SAN CARLOS",
        "address": "G04@PULLMANCARGO.CL",
        "phone": "9-88271928",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "jmendoza@pullmancargo.cl",
        "email": "988271928"
    },
    {
        "city": "SI",
        "name": "CONSTITUCION",
        "address": "G05@PULLMANCARGO.CL",
        "phone": "9-42897565",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "g05@pullmancargo.cl;",
        "email": "9-42897565"
    },
    {
        "city": "SI",
        "name": "CAUQUENES",
        "address": "G06@PULLMANCARGO.CL",
        "phone": "9-83863844",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "g06@pullmanbus.cl",
        "email": "232383018"
    },
    {
        "city": "SI",
        "name": "CHILLAN CENTRO",
        "address": "G08@PULLMANCARGO.CL",
        "phone": "9-98070980",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "g08@pullmancargo.cl",
        "email": "42-2245745"
    },
    {
        "city": "SI",
        "name": "PARRAL",
        "address": "G18@PULLMANCARGO.CL",
        "phone": "9-81376469",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "g18@pullmancargo.cl",
        "email": "232383022"
    },
    {
        "city": "SI",
        "name": "CABRERO",
        "address": "G31@PULLMANCARGO.CL",
        "phone": "9-42160059",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "g31@pullmancargo.cl",
        "email": "9-42160059"
    },
    {
        "city": "SI",
        "name": "CHILLAN CD",
        "address": "G34@PULLMANCARGO.CL",
        "phone": "9-44031119",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "msepulveda@pullmancargo.cl",
        "email": "232383027"
    },
    {
        "city": "SI",
        "name": "LOS ANGELES CD",
        "address": "H00@PULLMANCARGO.CL",
        "phone": "9-83564463",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "h05@pullmancargo.cl jescobar@pullmancargo.cl",
        "email": "232383560-232383558"
    },
    {
        "city": "SI",
        "name": "CONCEPCION CD",
        "address": "H01@PULLMANCARGO.CL",
        "phone": "9-45187891",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "mrodriguez@pullmancargo.cl  nnebreda@pullmancargo.cl",
        "email": "41-2430600/41-2432195 Malo"
    },
    {
        "city": "SI",
        "name": "CONCEPCION CENTRO",
        "address": "H04@PULLMANCARGO.CL",
        "phone": "9-45516722",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "msandoval@pullmancargo.cl",
        "email": "232383536"
    },
    {
        "city": "SI",
        "name": "NEGRETE",
        "address": "H46@PULLMANCARGO.CL",
        "phone": "9-56626985",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "ovasquez@comisionistas.cl",
        "email": "43-2551797"
    },
    {
        "city": "SI",
        "name": "CONCEPCION COLLAO",
        "address": "H53@PULLMANCARGO.CL",
        "phone": "9-89708507",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "vsepulveda@pullmancargo.cl   rvelasquez@pullmancargo.cl",
        "email": "41-2311335"
    },
    {
        "city": "SI",
        "name": "TEMUCO CD",
        "address": "I00@PULLMANCARGO.CL",
        "phone": "9-84645361",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "rborquez@pullmancargo.cl; mancavil@comisionistas.cl; mvera@comisionistas.cl",
        "email": "k"
    },
    {
        "city": "SI",
        "name": "PUCON",
        "address": "I06@PULLMANCARGO.CL",
        "phone": "9-84645438",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "resparza@comisionistas.cl; i06@pullmancargo.cl;fesparza@comisionistas.cl",
        "email": "45-2443331"
    },
    {
        "city": "SI",
        "name": "VILLARRICA",
        "address": "I26@PULLMANCARGO.CL",
        "phone": "9-84645438",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "resparza@comisionistas.cl; i26@pullmancargo.cl ;fesparza@comisionistas.cl",
        "email": "45-2412971"
    },
    {
        "city": "SI",
        "name": "VALDIVIA CD",
        "address": "J00@PULLMANCARGO.CL",
        "phone": "9-44285320",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "rtoledo@pullmancargo.cl; j00@pullmancargo.cl; bodega.valdivia@pullmancargo.cl",
        "email": "63-2215853 /63-2227345"
    },
    {
        "city": "SI",
        "name": "OSORNO CENTRO",
        "address": "J01@PULLMANCARGO.CL",
        "phone": "9-99864820",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "mdelgado@pullmancargo.cl",
        "email": "23238243"
    },
    {
        "city": "SI",
        "name": "PUERTO MONTT CD",
        "address": "J02@PULLMANCARGO.CL",
        "phone": "",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "jcare@pullmancargo.cl; j02@pullmancargo.cl; pbarria@pullmancargo.cl",
        "email": "9-99208631 /9-32645007"
    },
    {
        "city": "SI",
        "name": "PUERTO VARAS",
        "address": "J13@PULLMANCARGO.CL",
        "phone": "-",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "j13@pullmanbus.cl",
        "email": ""
    },
    {
        "city": "SI",
        "name": "FRUTILLAR",
        "address": "J18@PULLMANCARGO.CL",
        "phone": "9-98184866",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "J18@pullmancargo.cl",
        "email": "65-2422880"
    },
    {
        "city": "SI",
        "name": "CASTRO",
        "address": "J20@PULLMANCARGO.CL",
        "phone": "9-77186805",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "jcsoto@comisionistas.cl; j20@pullmancargo.cl",
        "email": "65-2531078"
    },
    {
        "city": "SI",
        "name": "ANCUD",
        "address": "J24@PULLMANCARGO.CL",
        "phone": "9-77186805",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "jcsoto@comisionistas.cl;",
        "email": "65-2898288"
    },
    {
        "city": "SI",
        "name": "OSORNO CD",
        "address": "J26@PULLMANCARGO.CL",
        "phone": "9-99864820",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "mdelgado@pullmancargo.cl",
        "email": "232383245"
    },
    {
        "city": "SI",
        "name": "LA UNION",
        "address": "J50@PULLMANCARGO.CL",
        "phone": "9-83524734",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "msilva@comisionistas.cl J50@pullmancargo.cl",
        "email": "64-2426541"
    },
    {
        "city": "SI",
        "name": "RIO BUENO",
        "address": "J72@PULLMANCARGO.CL",
        "phone": "9-97439884",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "riobueno@comisionistas.cl  j72@pullmancargo.cl",
        "email": "64-2342001"
    },
    {
        "city": "NO",
        "name": "COYHAIQUE",
        "address": "K09@PULLMANCARGO.CL",
        "phone": "9-66678795",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "-",
        "email": ""
    },
    {
        "city": "SI",
        "name": "PUNTA ARENAS",
        "address": "L00@PULLMANCARGO.CL",
        "phone": "9-52295975",
        "hours": "Lun-Vie: 09:00 - 18:30 | Sáb: 09:00 - 13:00",
        "region": "REGIONES",
        "commune": "cvarela@comisionista.cl      transportessandypoint@gmail.com      l00@pullmancargo.cl",
        "email": "61-2222241"
    }
];
