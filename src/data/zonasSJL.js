/**
 * Datos geográficos y descriptivos de Zonas de Riesgo y Puntos de Referencia
 * para el distrito de San Juan de Lurigancho (Lima, Perú).
 */

export const INITIAL_MAP_CONFIG = {
  center: [-11.985, -77.005], // Coordenadas centrales de SJL
  zoom: 13,
  minZoom: 11,
  maxZoom: 18,
  bounds: [
    [-12.05, -77.05], // Límite Suroeste
    [-11.91, -76.95]  // Límite Noreste
  ]
};

export const NIVELES_RIESGO = {
  ALTO: {
    label: 'Riesgo Alto',
    color: '#ef4444',
    fillColor: '#ef4444',
    textColor: '#ffffff',
    bgBadge: '#fef2f2',
    borderBadge: '#fecaca',
    badgeColor: '#dc2626'
  },
  MEDIO: {
    label: 'Riesgo Medio',
    color: '#f97316',
    fillColor: '#f97316',
    textColor: '#ffffff',
    bgBadge: '#fff7ed',
    borderBadge: '#fed7aa',
    badgeColor: '#ea580c'
  },
  PRECAUCION: {
    label: 'Precaución',
    color: '#eab308',
    fillColor: '#eab308',
    textColor: '#ffffff',
    bgBadge: '#fefce8',
    borderBadge: '#fef08a',
    badgeColor: '#ca8a04'
  }
};

/**
 * 8 Zonas de Riesgo representativas de San Juan de Lurigancho con polígonos geográficos reales
 */
export const ZONAS_RIESGO = [
  {
    id: 'zona-bayovar',
    nombre: 'Alrededores de Estación Bayóvar (Final Línea 1)',
    sector: 'Bayóvar / Mariscal Cáceres',
    nivelRiesgo: 'Alto',
    color: '#ef4444',
    tipoIncidencia: 'Robo al paso en motocicleta, arrebato de celulares y cogoteo nocturno',
    horarioCritico: '19:00 - 05:30 hrs y horas punta de salida del Metro (07:00 - 08:30 hrs)',
    justificacion: 'Punto neurálgico de transbordo masivo hacia San Antonio de Jicamarca y partes altas. La alta concentración de transeúntes combinada con vías auxiliares con escasa iluminación y vías de escape rápido en mototaxis informales facilita el accionar de delincuentes.',
    recomendacion: 'Evitar manipular smartphones en el puente de salida y mantener bolsos al frente. Preferir paraderos iluminados y transporte formal.',
    centro: [-11.9540, -76.9965],
    coordenadas: [
      [-11.9515, -76.9985],
      [-11.9505, -76.9945],
      [-11.9555, -76.9930],
      [-11.9575, -76.9975],
      [-11.9545, -77.0000]
    ]
  },
  {
    id: 'zona-puente-nuevo',
    nombre: 'Puente Nuevo / Conexión Vía Evitamiento',
    sector: 'Límite SJL con El Agustino',
    nivelRiesgo: 'Alto',
    color: '#ef4444',
    tipoIncidencia: 'Asalto a mano armada en paraderos, hurto dentro de unidades de transporte y aglomeración',
    horarioCritico: '05:30 - 08:00 hrs y 18:30 - 23:00 hrs',
    justificacion: 'Principal cuello de botella y conexión sur del distrito con la Vía Evitamiento. La gran congestión vehicular en horas punta es aprovechada por bandas de arranchadores y falsos jaladores de colectivos clandestinos.',
    recomendacion: 'Cerrar ventanas en el transporte público al detenerse bajo el puente. No exhibir pertenencias de valor en los descansos peatonales.',
    centro: [-12.0325, -77.0080],
    coordenadas: [
      [-12.0290, -77.0110],
      [-12.0285, -77.0055],
      [-12.0350, -77.0050],
      [-12.0365, -77.0095],
      [-12.0335, -77.0120]
    ]
  },
  {
    id: 'zona-proceres-15-20',
    nombre: 'Av. Próceres de la Independencia (Cdras 15 - 20)',
    sector: 'Los Jardines / La Huayrona',
    nivelRiesgo: 'Medio',
    color: '#f97316',
    tipoIncidencia: 'Marcaje en cajeros bancarios, robo por descuido en paraderos y comercios',
    horarioCritico: '12:00 - 15:00 hrs (Salida de entidades financieras) y 19:00 - 22:00 hrs',
    justificacion: 'Zona altamente comercial con alta densidad de agencias bancarias, notarías y restaurantes. Si bien cuenta con presencia de Serenazgo, se registran hurtos rápidos a clientes descuidados y robos de accesorios vehiculares.',
    recomendacion: 'Realizar retiros de dinero en cajeros dentro de locales vigilados y evitar caminar contando efectivo.',
    centro: [-12.0010, -77.0085],
    coordenadas: [
      [-11.9960, -77.0105],
      [-11.9950, -77.0065],
      [-12.0060, -77.0050],
      [-12.0075, -77.0095]
    ]
  },
  {
    id: 'zona-canto-grande',
    nombre: 'Canto Grande (Mercado y Paraderos 5 al 10)',
    sector: 'Canto Grande Centro',
    nivelRiesgo: 'Medio',
    color: '#f97316',
    tipoIncidencia: 'Robo en tiendas comerciales, extorsión menor y sustracción de billeteras en mercados',
    horarioCritico: '11:00 - 14:00 hrs y 18:00 - 21:30 hrs',
    justificacion: 'Foco comercial tradicional de gran movimiento peatonal. La estrechez de calles por comercio ambulatorio reduce la movilidad policial y facilita el escape a través de los pasajes internos.',
    recomendacion: 'Guardar billeteras y móviles en compartimentos internos de bolsos cerrados. Comprar en pasadizos con libre tránsito.',
    centro: [-11.9680, -76.9920],
    coordenadas: [
      [-11.9635, -76.9940],
      [-11.9620, -76.9890],
      [-11.9725, -76.9875],
      [-11.9740, -76.9935]
    ]
  },
  {
    id: 'zona-zarate',
    nombre: 'Zárate (Av. Gran Chimú y Zona Bancaria)',
    sector: 'Zárate Antiguo',
    nivelRiesgo: 'Precaución',
    color: '#eab308',
    tipoIncidencia: 'Hurto de autopartes, carteristas en áreas gastronómicas y estafas callejeras',
    horarioCritico: '13:00 - 16:00 hrs y fines de semana por la noche (20:00 - 01:00 hrs)',
    justificacion: 'Zona consolidada residencial y gastronómica. Posee buena cobertura de cámaras y patrullaje, pero registra incidencias focalizadas contra vehículos estacionados en calles aledañas y comensales en terrazas abiertas.',
    recomendacion: 'Utilizar cocheras autorizadas y no descuidar objetos personales sobre mesas de locales con vista directa a la calle.',
    centro: [-12.0220, -77.0090],
    coordenadas: [
      [-12.0180, -77.0125],
      [-12.0175, -77.0065],
      [-12.0260, -77.0055],
      [-12.0270, -77.0115]
    ]
  },
  {
    id: 'zona-las-flores',
    nombre: 'Av. Las Flores de Primavera (Cdras 30 al 45)',
    sector: 'Las Flores / San Hilarión',
    nivelRiesgo: 'Precaución',
    color: '#eab308',
    tipoIncidencia: 'Arrebato a transeúntes solitarios, asaltos en mototaxis sin registro municipal',
    horarioCritico: '21:00 - 03:00 hrs',
    justificacion: 'Corredor vial paralelo a Av. Próceres que disminuye significativamente su flujo vehicular pasada la medianoche, generando tramos con iluminación deficiente donde operan mototaxis informales.',
    recomendacion: 'Abordar únicamente mototaxis formales con placa pintada en techo y lona. Evitar transitar por bermas oscuras a altas horas.',
    centro: [-11.9920, -77.0180],
    coordenadas: [
      [-11.9860, -77.0210],
      [-11.9850, -77.0160],
      [-11.9970, -77.0140],
      [-11.9985, -77.0195]
    ]
  },
  {
    id: 'zona-huascar',
    nombre: 'A.H. Huáscar (Parte Alta y Pasajes Interiores)',
    sector: 'Huáscar / Cerros de Canto Grande',
    nivelRiesgo: 'Alto',
    color: '#ef4444',
    tipoIncidencia: 'Cobro de cupos de construcción, asalto en escaleras peatonales y microcomercialización',
    horarioCritico: '20:00 - 05:00 hrs',
    justificacion: 'Geografía accidentada con prolongadas escaleras y pasajes estrechos donde los vehículos de serenazgo o policía no pueden ingresar de manera ágil. Frecuente reporte vecinal de puntos oscuros y pandillaje.',
    recomendacion: 'Coordinar con juntas vecinales y dirigirse en grupo por las vías principales pavimentadas.',
    centro: [-11.9740, -76.9780],
    coordenadas: [
      [-11.9690, -76.9810],
      [-11.9685, -76.9740],
      [-11.9780, -76.9730],
      [-11.9795, -76.9805]
    ]
  },
  {
    id: 'zona-campoy',
    nombre: 'Campoy (Eje Ribereño y Accesos Industriales)',
    sector: 'Campoy / Ribera Río Rímac',
    nivelRiesgo: 'Medio',
    color: '#f97316',
    tipoIncidencia: 'Asaltos en paraderos de Av. Principal de Campoy y asalto a camiones distribuidores',
    horarioCritico: '05:00 - 07:00 hrs y 19:30 - 22:30 hrs',
    justificacion: 'Zona mixta residencial e industrial con amplias distancias entre postes de luz y desolación en horarios nocturnos. Los accesos hacia el río y descampados son utilizados como zonas de escape rápido.',
    recomendacion: 'Evitar paraderos solitarios en el tramo industrial. Mantener comunicación activa con vigilantes de garita comunitaria.',
    centro: [-12.0280, -76.9850],
    coordenadas: [
      [-12.0230, -76.9890],
      [-12.0220, -76.9800],
      [-12.0320, -76.9810],
      [-12.0340, -76.9880]
    ]
  }
];

/**
 * Catálogo de más de 18 Puntos de Referencia y Avenidas en SJL para el Buscador con autocompletado
 */
export const PUNTOS_REFERENCIA = [
  // Estaciones del Metro de Lima (Línea 1)
  {
    id: 'ref-est-bayovar',
    nombre: 'Estación Bayóvar (Metro Línea 1)',
    tipo: 'Transporte Masivo',
    categoria: 'Estación Metro',
    coordenadas: [-11.9545, -76.9972],
    descripcion: 'Última estación norte de la Línea 1. Alto flujo de pasajeros y conexiones a Jicamarca.'
  },
  {
    id: 'ref-est-santa-rosa',
    nombre: 'Estación Santa Rosa (Metro Línea 1)',
    tipo: 'Transporte Masivo',
    categoria: 'Estación Metro',
    coordenadas: [-11.9650, -76.9995],
    descripcion: 'Av. Próceres de la Independencia con Av. Santa Rosa.'
  },
  {
    id: 'ref-est-san-martin',
    nombre: 'Estación San Martín (Metro Línea 1)',
    tipo: 'Transporte Masivo',
    categoria: 'Estación Metro',
    coordenadas: [-11.9720, -77.0015],
    descripcion: 'Paradero accesible cerca a centros educativos y comercio zonal.'
  },
  {
    id: 'ref-est-san-carlos',
    nombre: 'Estación San Carlos (Metro Línea 1)',
    tipo: 'Transporte Masivo',
    categoria: 'Estación Metro',
    coordenadas: [-11.9785, -77.0035],
    descripcion: 'Frente a la Universidad Tecnológica del Perú (UTP) e Institutos.'
  },
  {
    id: 'ref-est-los-postes',
    nombre: 'Estación Los Postes (Metro Línea 1)',
    tipo: 'Transporte Masivo',
    categoria: 'Estación Metro',
    coordenadas: [-11.9890, -77.0060],
    descripcion: 'Av. Próceres de la Independencia con Av. Los Postes.'
  },
  {
    id: 'ref-est-los-jardines',
    nombre: 'Estación Los Jardines (Metro Línea 1)',
    tipo: 'Transporte Masivo',
    categoria: 'Estación Metro',
    coordenadas: [-12.0005, -77.0085],
    descripcion: 'Zona financiera y comercial de Los Jardines de SJL.'
  },
  {
    id: 'ref-est-piramide',
    nombre: 'Estación Pirámide del Sol (Metro Línea 1)',
    tipo: 'Transporte Masivo',
    categoria: 'Estación Metro',
    coordenadas: [-12.0165, -77.0125],
    descripcion: 'Conexión con Zárate, Mangomarca y Av. Pirámide del Sol.'
  },
  {
    id: 'ref-est-caja-agua',
    nombre: 'Estación Caja de Agua (Metro Línea 1)',
    tipo: 'Transporte Masivo',
    categoria: 'Estación Metro',
    coordenadas: [-12.0270, -77.0145],
    descripcion: 'Ingreso al túnel Santa Rosa y conexión hacia el Rímac y Centro de Lima.'
  },
  // Avenidas y Cruces Principales
  {
    id: 'ref-puente-nuevo',
    nombre: 'Puente Nuevo (Límite con Vía Evitamiento)',
    tipo: 'Intercambio Vial',
    categoria: 'Avenida Principal',
    coordenadas: [-12.0325, -77.0080],
    descripcion: 'Nodo de interconexión con el Agustino, Surco y Vía Evitamiento.'
  },
  {
    id: 'ref-cruce-wiesse-sol',
    nombre: 'Cruce Av. Fernando Wiesse con Av. El Sol',
    tipo: 'Cruce Vial',
    categoria: 'Avenida Principal',
    coordenadas: [-11.9760, -77.0040],
    descripcion: 'Intersección concurrida cercana al Penal de San Pedro y sedes de estudios.'
  },
  {
    id: 'ref-gran-chimu',
    nombre: 'Av. Gran Chimú (Zárate)',
    tipo: 'Eje Comercial',
    categoria: 'Avenida Principal',
    coordenadas: [-12.0220, -77.0090],
    descripcion: 'Avenida emblemática con alta oferta gastronómica, tiendas y bancos.'
  },
  {
    id: 'ref-las-flores-20',
    nombre: 'Av. Las Flores de Primavera (Paradero 20)',
    tipo: 'Eje Residencial',
    categoria: 'Avenida Principal',
    coordenadas: [-11.9930, -77.0185],
    descripcion: 'Eje vial alternativo que recorre urbanizaciones residenciales de SJL.'
  },
  // Puntos Cívicos, Sanitarios y de Seguridad
  {
    id: 'ref-hosp-sjl',
    nombre: 'Hospital San Juan de Lurigancho (Canto Grande)',
    tipo: 'Salud',
    categoria: 'Servicio Público',
    coordenadas: [-11.9665, -76.9935],
    descripcion: 'Principal nosocomio público de nivel II-2 para el distrito.'
  },
  {
    id: 'ref-mercado-canto-grande',
    nombre: 'Mercado Central de Canto Grande (Paradero 10)',
    tipo: 'Comercio',
    categoria: 'Mercado',
    coordenadas: [-11.9678, -76.9922],
    descripcion: 'Mercado de gran abastecimiento y concurrencia diaria de vecinos.'
  },
  {
    id: 'ref-comisaria-zarate',
    nombre: 'Comisaría PNP Zárate',
    tipo: 'Seguridad',
    categoria: 'Policía Nacional',
    coordenadas: [-12.0210, -77.0115],
    descripcion: 'Sede policial encargada de la seguridad de Zárate y Mangomarca.'
  },
  {
    id: 'ref-comisaria-santa-elizabeth',
    nombre: 'Comisaría PNP Santa Elizabeth (Canto Grande)',
    tipo: 'Seguridad',
    categoria: 'Policía Nacional',
    coordenadas: [-11.9710, -76.9980],
    descripcion: 'Jurisdicción sobre Canto Grande, Huáscar y zonas aledañas.'
  },
  {
    id: 'ref-huaca-mangomarca',
    nombre: 'Zona Arqueológica Huaca Mangomarca',
    tipo: 'Patrimonio Cultural',
    categoria: 'Monumento',
    coordenadas: [-12.0150, -76.9930],
    descripcion: 'Importante vestigio preinca de la cultura Ruricancho.'
  },
  {
    id: 'ref-mariscal-caceres',
    nombre: 'Urbanización Mariscal Cáceres (Sector 1)',
    tipo: 'Urbanización',
    categoria: 'Zona Urbana',
    coordenadas: [-11.9420, -76.9890],
    descripcion: 'Sector residencial al norte de Bayóvar con conexión a Mariátegui.'
  },
  {
    id: 'ref-parque-san-silvestre',
    nombre: 'Parque San Silvestre (Zárate)',
    tipo: 'Espacio Público',
    categoria: 'Parque',
    coordenadas: [-12.0235, -77.0070],
    descripcion: 'Área verde tradicional para actividades familiares y recreativas.'
  }
];
