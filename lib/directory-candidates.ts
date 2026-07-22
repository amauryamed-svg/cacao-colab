/**
 * Directorio de marcas candidatas — Cacao Colab.
 *
 * NO es el marketplace público (eso sigue viviendo en `brands.ts`, que solo
 * lista socios/colaboradores ya integrados: CAÚA, Zurych, Lust). Este es el
 * paso previo que pidió Amaury explícitamente (2026-07-22): "todavía no está
 * lista la app como para invitarlos formalmente, primero hay que crear el
 * directorio, luego el marketplace" — así que este archivo NO se importa
 * desde ninguna página pública todavía. Es la base de datos interna para
 * planear outreach, no un anuncio de que estas marcas ya son parte del Colab.
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
  origin: string | null
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
    origin: "Arauca, Meta, Guaviare, Putumayo (según reportaje de Cambio Colombia)",
    notes: "Chocolate de origen que ha llegado a restaurantes con estrella Michelin. Fuerte fit con el ángulo HoReCa fine-dining del Colab.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "maki",
    name: "Maki Cacao (Maki Natural)",
    website: "https://makinatural.com",
    sourceUrl: "https://makinatural.com",
    origin: "Caquetá y Sierra Nevada de Santa Marta",
    notes: "Fundada 2019, sustitución de cultivos de coca por cacao. Barras (sal y coco 70%, lulo y romero 70%), bebidas funcionales con adaptógenos, chocolate caliente chai. Rango de precio $5.000-$35.000 COP. Confirmado 2026-07-22 vía makinatural.com (producto \"70% Dark Chocolate, Lulo y Romero\" coincide con la descripción encontrada en prensa).",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "chuculat",
    name: "Chuculat",
    website: "https://chuculat.com",
    sourceUrl: "https://chuculat.com",
    origin: "Bogotá",
    notes: "Tienda de chocolate premium online, Bogotá. Perfil retail/D2C más que HoReCa — revisar si el fit es con Segmento A (coberturas/chocolatería) del Colab.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "legado",
    name: "Legado Cacao Experience",
    website: "https://www.legadocacao.com",
    sourceUrl: "https://www.legadocacao.com/nosotros",
    origin: "Bogotá",
    notes: "Fundada 2019 como iniciativa de construcción de paz. Centro de experiencia de cacao (catas guiadas, talleres) — fit natural con Dualita (aprendizaje), no solo marketplace de producto.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "suagu",
    name: "Suagu",
    website: "https://www.suagu.com",
    sourceUrl: "https://www.suagu.com",
    origin: "Finca El Carmelo, Tolima",
    notes: "Fundada 2016 por María Camila y Juan Diego Suárez. Barras 70% y 80%. Da de vuelta a la comunidad vía Fundación Dulce Futuro — alineación fuerte con el propósito social del Colab.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "girones",
    name: "Chocolate Gironés",
    website: "https://www.girones.com.co",
    sourceUrl: "https://www.girones.com.co/sobre-nosotros/quienes-somos",
    origin: "Santander",
    notes: "La chocolatería más grande de Santander, operando desde 1970. Tiene sub-marca gourmet \"Davida\" con NIBS. Escala industrial vs. las demás candidatas (artesanales) — encaje probable en Coberturas/ingrediente, no marketplace boutique.",
    status: "candidato_sin_contactar",
    verified: true,
  },
]

/**
 * Segunda tanda — búsqueda completa de marcas de cacao/chocolate en Bogotá
 * (2026-07-22, pedido explícito de Amaury). Cada una se verificó por
 * búsqueda web + scrape real de su sitio antes de guardarse acá.
 *
 * `locationConfirmed: true` significa que una fuente real (prensa o el
 * propio sitio) dice Bogotá explícitamente. `false` significa que la marca
 * es colombiana real y verificada, pero no encontré confirmación clara de
 * que su sede sea Bogotá específicamente (podría ser origen del cacao en
 * otro departamento, no la ciudad de la marca) — no se infiere, se marca
 * honesto.
 */
export const bogotaSearchCandidates: DirectoryCandidate[] = [
  {
    id: "tibito",
    name: "Tibitó",
    website: "https://tibito.co",
    sourceUrl: "https://tibito.co/es",
    origin: "Colombia (curiosidad y exploración del cacao colombiano, fundada 2015)",
    notes: "Entrega en Bogotá 1-2 días hábiles — confirma sede en Bogotá. Marca joven, 2015.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "chocolate-andino",
    name: "Chocolate Andino",
    website: "https://www.chocolatesandino.com",
    sourceUrl: "https://www.chocolatesandino.com/",
    origin: "Bogotá",
    notes: "Fábrica de chocolate en Bogotá desde 1931 — una de las más antiguas del listado. Línea de chocolates + cafés + maquila a la medida.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "fruto-de-cacao",
    name: "Fruto de Cacao",
    website: "https://frutodecacao.com",
    sourceUrl: "https://frutodecacao.com/",
    origin: "Bogotá",
    notes: "Chocolatería y pastelería artesanal en Bogotá. Barras, bean to bar, bombones, trufas.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "truffelinos",
    name: "Truffelinos",
    website: "https://truffelinos.com.co",
    sourceUrl: "https://truffelinos.com.co/conocer-nuestra-marca/",
    origin: "Bogotá",
    notes: "Chocolatería artesanal Bogotá desde 1979 — la más antigua confirmada del listado. Enfoque corporativo/regalos.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "daccord",
    name: "D'accord",
    website: "https://www.daccordchocolatvie.com",
    sourceUrl: "https://www.daccordchocolatvie.com/",
    origin: "Bogotá",
    notes: "Bombonería en Bogotá, trabaja exclusivamente cacao al 70%. Sitio con poco detalle textual (plantilla Wix) — vale la pena verificar en persona antes de outreach.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "tartufi-cioccolati",
    name: "Tartufi Cioccolati",
    website: "https://www.tartufi.co",
    sourceUrl: "https://www.tartufi.co/",
    origin: "Bogotá",
    notes: "Chocolatería gourmet Bogotá — trufas y bombones, cacao \"fino y aromático\". Apareció en un listado de prensa de \"los 4 lugares en Bogotá para chocolatería fina\".",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "beantobarcolombia",
    name: "Bean to Bar Colombia",
    website: "https://www.beantobarcolombia.com",
    sourceUrl: "https://www.beantobarcolombia.com/",
    origin: "Bogotá",
    notes: "Procesan su chocolate en Bogotá — expertos en transformación del grano, lotes especializados para evaluación de calidad.",
    status: "candidato_sin_contactar",
    verified: true,
  },
  {
    id: "somos-cacao",
    name: "Somos Cacao",
    website: "https://somoscacao.com",
    sourceUrl: "https://somoscacao.com/",
    origin: "Norte de Santander (origen del cacao — sede de la marca sin confirmar)",
    notes: "100% cacao colombiano sin azúcar ni aditivos. Ciudad de sede no confirmada — 'Norte de Santander' es el origen del cacao, no necesariamente dónde opera la marca. No asumir Bogotá sin confirmar.",
    status: "no_verificado",
    verified: true,
  },
  {
    id: "terra-dulce",
    name: "Terra Dulce Chocolates",
    website: "https://terradulcechocolates.com.co",
    sourceUrl: "https://terradulcechocolates.com.co/",
    origin: "Colombia (ciudad no confirmada)",
    notes: "Cacao fino de aroma endulzado con panela orgánica, filosofía bean to bar. No se confirmó ciudad de sede en el scrape — no asumir Bogotá.",
    status: "no_verificado",
    verified: true,
  },
  {
    id: "juan-choconat",
    name: "Juan Choconat",
    website: "https://www.juanchoconat.com",
    sourceUrl: "https://www.juanchoconat.com/es-us",
    origin: "Colombia (ciudad no confirmada)",
    notes: "Premiado 2do lugar en América en Nueva York. 100% cacao colombiano, sin azúcar/aditivos (monk fruit o puro). Envíos a toda Colombia — no se confirmó ciudad de sede.",
    status: "no_verificado",
    verified: true,
  },
  {
    id: "maluwa",
    name: "Maluwa Chocolate Company",
    website: "https://maluwa.co",
    sourceUrl: "https://maluwa.co/",
    origin: "Meta (110 productores del departamento)",
    notes: "Origen Meta, ciudad de sede de la marca no confirmada — no asumir Bogotá.",
    status: "no_verificado",
    verified: true,
  },
  {
    id: "chacha",
    name: "CHACHA",
    website: "https://chachacolombia.com",
    sourceUrl: "https://chachacolombia.com/",
    origin: "Colombia (ciudad no confirmada)",
    notes: "Chocolates sin azúcar, apto diabéticos, vegano, certificado sin gluten. Ciudad de sede no confirmada en el scrape.",
    status: "no_verificado",
    verified: true,
  },
  {
    id: "color-cacao",
    name: "Color Cacao",
    website: "https://colorcacao.com",
    sourceUrl: "https://colorcacao.com/",
    origin: "Medellín",
    notes: "NO es Bogotá — fundada 2011 en Medellín. Se incluye porque salió en la búsqueda y es una marca real fuerte, pero fuera del alcance geográfico pedido (\"marcas de cacao en Bogotá\"). Decisión de incluir o no la deja Amaury.",
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
