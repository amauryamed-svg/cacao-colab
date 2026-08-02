/**
 * Directorio de marcas candidatas — Cacao Colab.
 *
 * NO es la red regional activa (eso sigue viviendo en `brands.ts`, que
 * lista el epicentro cacaotier y los nodos indicados por Amaury). Este
 * directorio SÍ se muestra en la página del Market (2026-07-22, pedido
 * explícito de Amaury) — pero como sección separada, marcada "candidatas,
 * sin confirmar", sin CTA de "conocer marca" ni ningún lenguaje que implique
 * que ya son parte del Colab. Ninguna de estas marcas fue contactada
 * todavía — ver `publicBlurb` para el copy honesto que sí se renderiza, y
 * `notes` para el research interno que NO se renderiza (no mezclar).
 *
 * Cada entrada fue verificada por búsqueda web real antes de guardarse aquí
 * (2026-07-22) — nada de datos inventados. `verified: false` significa que no
 * se encontró la marca con datos suficientes para confiar en el match.
 */

export type DirectoryStatus = "candidato_sin_contactar" | "en_conversacion" | "no_verificado"

export type DirectoryCandidate = {
  id: string
  name: string
  website: string | null
  sourceUrl: string | null
  city: string
  origin: string | null
  /** Copy público, corto, honesto — esto es lo único que se renderiza en la página del Market. */
  publicBlurb: string
  /** Research interno — NO renderizar, es para planear outreach. */
  notes: string
  status: DirectoryStatus
  verified: boolean
}

export const directoryCandidates: DirectoryCandidate[] = [
  {
    id: "disidente",
    name: "Cacao Disidente",
    website: "https://www.cacaodisidente.com",
    sourceUrl: "https://www.cacaodisidente.com/en/pages/nosotros",
    city: "Origen múltiple",
    origin: "Arauca, Meta, Guaviare, Putumayo (según reportaje de Cambio Colombia)",
    publicBlurb: "Cacao de origen que ha llegado a restaurantes con estrella Michelin.",
    notes: "Fuerte fit con el ángulo HoReCa fine-dining del Colab.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "maki",
    name: "Maki Cacao",
    website: "https://makinatural.com",
    sourceUrl: "https://makinatural.com",
    city: "Caquetá / Sierra Nevada de Santa Marta",
    origin: "Caquetá y Sierra Nevada de Santa Marta",
    publicBlurb: "Cacao que sustituye cultivos de coca — barras, bebidas funcionales, chocolate caliente.",
    notes: "Fundada 2019. Rango de precio $5.000-$35.000 COP. Confirmado 2026-07-22 vía makinatural.com.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "chuculat",
    name: "Chuculat",
    website: "https://chuculat.com",
    sourceUrl: "https://chuculat.com",
    city: "Bogotá",
    origin: "Bogotá",
    publicBlurb: "Chocolate premium, tienda online.",
    notes: "Perfil retail/D2C más que HoReCa — revisar fit con Segmento A (coberturas/chocolatería).",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "heritage-cacao",
    name: "Heritage Cacao Experience",
    website: "https://www.legadocacao.com",
    sourceUrl: "https://www.legadocacao.com/nosotros",
    city: "Bogotá",
    origin: "Bogotá",
    publicBlurb: "Experiencia de cacao y catas guiadas — cacao como vehículo de paz.",
    notes: "Fundada 2019 como iniciativa de construcción de paz. Fit natural con Dualita (aprendizaje).",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "suagu",
    name: "Suagu",
    website: "https://www.suagu.com",
    sourceUrl: "https://www.suagu.com",
    city: "Tolima",
    origin: "Finca El Carmelo, Tolima",
    publicBlurb: "Barras 70% y 80% desde Finca El Carmelo — con Fundación Dulce Futuro.",
    notes: "Fundada 2016 por María Camila y Juan Diego Suárez. Alineación fuerte con el propósito social del Colab.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "girones",
    name: "Chocolate Gironés",
    website: "https://www.girones.com.co",
    sourceUrl: "https://www.girones.com.co/sobre-nosotros/quienes-somos",
    city: "Santander",
    origin: "Santander",
    publicBlurb: "La chocolatería más grande de Santander, operando desde 1970.",
    notes: "Sub-marca gourmet \"Davida\" con NIBS. Escala industrial — encaje probable en Coberturas/ingrediente.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "tibito",
    name: "Tibitó",
    website: "https://tibito.co",
    sourceUrl: "https://tibito.co/es",
    city: "Bogotá",
    origin: "Bogotá",
    publicBlurb: "Chocolate colombiano artesanal, desde 2015.",
    notes: "Entrega en Bogotá 1-2 días hábiles — confirma sede en Bogotá.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "chocolate-andino",
    name: "Chocolate Andino",
    website: "https://www.chocolatesandino.com",
    sourceUrl: "https://www.chocolatesandino.com/",
    city: "Bogotá",
    origin: "Bogotá",
    publicBlurb: "Fábrica de chocolate en Bogotá desde 1931.",
    notes: "Una de las más antiguas del listado. Línea de chocolates + cafés + maquila a la medida.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "fruto-de-cacao",
    name: "Fruto de Cacao",
    website: "https://frutodecacao.com",
    sourceUrl: "https://frutodecacao.com/",
    city: "Bogotá",
    origin: "Bogotá",
    publicBlurb: "Chocolatería y pastelería artesanal.",
    notes: "Barras, bean to bar, bombones, trufas.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "truffelinos",
    name: "Truffelinos",
    website: "https://truffelinos.com.co",
    sourceUrl: "https://truffelinos.com.co/conocer-nuestra-marca/",
    city: "Bogotá",
    origin: "Bogotá",
    publicBlurb: "Chocolatería artesanal desde 1979 — la más antigua del directorio.",
    notes: "Enfoque corporativo/regalos.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "daccord",
    name: "D'accord",
    website: "https://www.daccordchocolatvie.com",
    sourceUrl: "https://www.daccordchocolatvie.com/",
    city: "Bogotá",
    origin: "Bogotá",
    publicBlurb: "Bombonería que trabaja exclusivamente cacao al 70%.",
    notes: "Sitio con poco detalle textual (plantilla Wix) — verificar en persona antes de outreach.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "tartufi-cioccolati",
    name: "Tartufi Cioccolati",
    website: "https://www.tartufi.co",
    sourceUrl: "https://www.tartufi.co/",
    city: "Bogotá",
    origin: "Bogotá",
    publicBlurb: "Chocolatería gourmet — trufas y bombones de cacao fino y aromático.",
    notes: "Apareció en un listado de prensa de \"los 4 lugares en Bogotá para chocolatería fina\".",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "beantobarcolombia",
    name: "Bean to Bar Colombia",
    website: "https://www.beantobarcolombia.com",
    sourceUrl: "https://www.beantobarcolombia.com/",
    city: "Bogotá",
    origin: "Bogotá",
    publicBlurb: "Transformación de grano de cacao, procesado en Bogotá.",
    notes: "Lotes especializados para evaluación de calidad.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "somos-cacao",
    name: "Somos Cacao",
    website: "https://somoscacao.com",
    sourceUrl: "https://somoscacao.com/",
    city: "Colombia (ciudad sin confirmar)",
    origin: "Norte de Santander (origen del cacao — sede de la marca sin confirmar)",
    publicBlurb: "100% cacao colombiano, sin azúcar ni aditivos.",
    notes: "'Norte de Santander' es el origen del cacao, no necesariamente dónde opera la marca. No asumir Bogotá.",
    status: "no_verificado",
    verified: true,
  },
  {
    id: "terra-dulce",
    name: "Terra Dulce Chocolates",
    website: "https://terradulcechocolates.com.co",
    sourceUrl: "https://terradulcechocolates.com.co/",
    city: "Colombia (ciudad sin confirmar)",
    origin: "Colombia (ciudad no confirmada)",
    publicBlurb: "Cacao fino de aroma, endulzado con panela orgánica.",
    notes: "Filosofía bean to bar. No se confirmó ciudad de sede en el scrape.",
    status: "no_verificado",
    verified: true,
  },
  {
    id: "juan-choconat",
    name: "Juan Choconat",
    website: "https://www.juanchoconat.com",
    sourceUrl: "https://www.juanchoconat.com/es-us",
    city: "Colombia (ciudad sin confirmar)",
    origin: "Colombia (ciudad no confirmada)",
    publicBlurb: "Chocolate sin azúcar, premiado 2do lugar en América en Nueva York.",
    notes: "100% cacao colombiano, sin aditivos (monk fruit o puro). Envíos a toda Colombia.",
    status: "no_verificado",
    verified: true,
  },
  {
    id: "maluwa",
    name: "Maluwa Chocolate Company",
    website: "https://maluwa.co",
    sourceUrl: "https://maluwa.co/",
    city: "Meta",
    origin: "Meta (110 productores del departamento)",
    publicBlurb: "110 productores del Meta detrás de cada barra.",
    notes: "Ciudad de sede de la marca no confirmada — no asumir Bogotá.",
    status: "no_verificado",
    verified: true,
  },
  {
    id: "chacha",
    name: "CHACHA",
    website: "https://chachacolombia.com",
    sourceUrl: "https://chachacolombia.com/",
    city: "Colombia (ciudad sin confirmar)",
    origin: "Colombia (ciudad no confirmada)",
    publicBlurb: "Chocolate sin azúcar, apto para diabéticos, vegano, certificado sin gluten.",
    notes: "Ciudad de sede no confirmada en el scrape.",
    status: "no_verificado",
    verified: true,
  },
  {
    id: "color-cacao",
    name: "Color Cacao",
    website: "https://colorcacao.com",
    sourceUrl: "https://colorcacao.com/",
    city: "Medellín",
    origin: "Medellín",
    publicBlurb: "Chocolatería artesanal fina de origen colombiano.",
    notes: "NO es Bogotá — fundada 2011 en Medellín. Fuera del alcance geográfico pedido, se incluye igual por transparencia.",
    status: "no_verificado",
    verified: true,
  },
]

/**
 * Expositores de Chocoshow (feria anual, Corferias) mapeados vía Firecrawl el
 * 2026-07-22 — lista PARCIAL. El sitio público no expone un directorio
 * completo de los ~130 expositores reportados en prensa; solo se pudieron
 * mapear estos stands individuales. Si Amaury tiene el PDF/listado del
 * "Market" que vio en la feria, se reemplaza esto por la lista real completa.
 * No se renderiza en la página todavía — faltan datos (sin website
 * individual verificado por stand).
 */
export const chocoshowExhibitorsPartial = [
  { name: "Montes de Cacao", stand: "6827" },
  { name: "Chocobrand Productos Alimenticios S.A.S.", stand: "3363" },
  { name: "Kinza", stand: "12235" },
  { name: "Kilimbo", stand: "6837" },
  { name: "Colcocoa", stand: "12311" },
  { name: "Alisos", stand: "12301" },
  { name: "Patico Foods", stand: "12323" },
  { name: "Deleyten Arte en Chocolate", stand: "12320" },
  { name: "Productos Exclusivos de Café", stand: "6807" },
  { name: "FAO / ART — Productos con sabor a paz", stand: "12296" },
]
