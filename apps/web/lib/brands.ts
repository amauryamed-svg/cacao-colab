// v2-pivot (docs/07-MODELO-DATOS.md): este array es seed/fallback local.
// La tabla real es `organizations` (supabase/migrations/0001_organizations_territories.sql),
// tipada en @cacao-colab/types como `Organization`. Se reemplaza por una
// query real cuando exista el proyecto Supabase — hasta entonces la UI
// sigue funcionando con estos datos, que ya son consistentes con ese shape.
export type Brand = {
  id: string
  name: string
  tagline: string
  description: string
  location: string
  territoryId: string
  accentColor: string
  bgColor: string
  textColor: string
  products: string[]
  ctaLabel: string
  ctaUrl: string
  role: 'epicenter' | 'regional-node'
}

export const brands: Brand[] = [
  {
    id: "cacaotier",
    name: "cacaotier",
    tagline: "La masterclass que conecta la finca con el chocolate.",
    description:
      "Epicentro educativo creado por Amaury Amed en Bogotá. Master Cacaotier forma en finca y bioprocesos; Master Chocolatier lleva esa evidencia a transformación, sensorial y aplicaciones.",
    location: "Bogotá D.C.",
    territoryId: "bogota",
    accentColor: "#F2C830",
    bgColor: "#17260F",
    textColor: "#F7F1EE",
    products: [
      "Master Cacaotier · finca y bioprocesos",
      "Master Chocolatier · transformación y aplicaciones",
      "Sembrar · laboratorio Ecoyuma × Colab",
    ],
    ctaLabel: "Entrar al campus →",
    ctaUrl: "/aprende",
    role: "epicenter",
  },
  {
    id: "zurych",
    name: "Zurych",
    tagline: "Nodo Landázuri · Santander.",
    description:
      "Nodo regional del Colab en Landázuri. Bean-to-bar y transformación aliada de Benevolo (R&D) y coberturas CAÚA. Zurych no tipifica clones en este hub: el FEAR 5 de Benevolo se declara desde Quara.",
    location: "Landázuri, Santander",
    territoryId: "santander",
    accentColor: "#F2C830",
    bgColor: "#2D1810",
    textColor: "#F7F1EE",
    products: [
      "Transformación bean-to-bar",
      "Coberturas × convergencia CAÚA",
      "Aliado de transformación Benevolo R&D",
    ],
    ctaLabel: "Conocer Zurych →",
    ctaUrl: "https://www.instagram.com/tiendazurych/",
    role: "regional-node",
  },
  {
    id: "caua",
    name: "CAÚA",
    tagline: "Coberturas · nibs · shop.",
    description:
      "Marca de coberturas y nibs de origen Santander/Arauca. Tienda propia fuera de línea — punto de convergencia con Zurych en el R&D del Colab, pedidos por WhatsApp.",
    location: "Santander · Colombia",
    territoryId: "santander",
    accentColor: "#C4A484",
    bgColor: "#1F1612",
    textColor: "#F7F1EE",
    products: [
      "Coberturas 60–100 % · 1 kg",
      "NIBS Arauca y Santander",
      "Ritual Pack coberturas × nibs",
    ],
    ctaLabel: "Pedir coberturas →",
    ctaUrl: "/rd/coberturas",
    role: "regional-node",
  },
  {
    id: "la-querencia",
    name: "La Querencia",
    tagline: "Nodo Arbeláez · Cundinamarca.",
    description:
      "Nodo regional del Colab en Arbeláez. Hace visible el cacao de Cundinamarca en la red nacional. Sin tipificación de clones publicada aquí — FEAR 5 solo como eje didáctico del laboratorio.",
    location: "Arbeláez, Cundinamarca",
    territoryId: "cundinamarca",
    accentColor: "#DC775F",
    bgColor: "#3B1D16",
    textColor: "#F7F1EE",
    products: ["Nodo regional de aprendizaje", "Aprendizaje entre pares", "Conexión con compradores"],
    ctaLabel: "Conectar con el nodo →",
    ctaUrl: "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20conectar%20con%20La%20Querencia.",
    role: "regional-node",
  },
  {
    id: "la-lomita",
    name: "La Lomita",
    tagline: "Nodo Paicol · Huila.",
    description:
      "Nodo regional del Colab en Paicol. Puerta al aprendizaje de finca, calidad de lote y Fine-Flavor del Huila. Sin clones tipificados por el nodo en este hub.",
    location: "Paicol, Huila",
    territoryId: "huila",
    accentColor: "#86B66B",
    bgColor: "#20371B",
    textColor: "#F7F1EE",
    products: ["Práctica de finca", "Calidad y trazabilidad", "Aprendizaje Fine-Flavor"],
    ctaLabel: "Conectar con el nodo →",
    ctaUrl: "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20conectar%20con%20La%20Lomita.",
    role: "regional-node",
  },
  {
    id: "quara",
    name: "Quara Cacao",
    tagline: "Nodo FEAR 5 declarado · Tame · Arauca.",
    description:
      "Nodo del Colab en Tame con FEAR 5 declarado para Chocolate Benevolo (R&D) y el paper de fermentación. FEAR 5 mantiene protagonismo por ser el más comercial y el material del paper; no inventamos tipificación de otros clones del nodo.",
    location: "Tame, Arauca",
    territoryId: "arauca",
    accentColor: "#E3A12B",
    bgColor: "#402812",
    textColor: "#F7F1EE",
    products: ["FEAR 5 declarado · Benevolo", "Fermentación aplicada", "Modelo araucano (contexto)"],
    ctaLabel: "Conectar con el nodo →",
    ctaUrl: "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20conectar%20con%20Quara%20Cacao.",
    role: "regional-node",
  },
  {
    id: "chocolover",
    name: "Chocolover",
    tagline: "Nodo Guamal · Meta.",
    description:
      "Nodo regional del Colab en Guamal. Conecta cacao, transformación y cultura del Meta. Chocolover no tipifica clones aquí; el territorio aporta contexto del oro CoEx Ámsterdam 2024 (WORKAKAO / Agroguamal · FEAR 5 + FSV 41) sin atribuir la medalla a la marca.",
    location: "Guamal, Meta",
    territoryId: "meta",
    accentColor: "#48A784",
    bgColor: "#13362C",
    textColor: "#F7F1EE",
    products: ["Nodo Guamal · aprendizaje", "Cultura de chocolate", "Contexto territorial CoEx Meta"],
    ctaLabel: "Conectar con el nodo →",
    ctaUrl: "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20conectar%20con%20Chocolover.",
    role: "regional-node",
  },
  {
    id: "benevolo",
    name: "Chocolate Benevolo",
    tagline: "El cacao fino puede ser un antojo.",
    description:
      "Bars. · chocolate de leche con marañón, sugar free. Trinitario de Arauca, Cundinamarca y Meta (FEAR 5 Quara ancla). Marca acelerada cacaotier · R&D Colab · preorden.",
    location: "Arauca · Cundinamarca · Meta",
    territoryId: "arauca",
    accentColor: "#FF6A3D",
    bgColor: "#1A120C",
    textColor: "#F7F1EE",
    products: [
      "Bars. · leche + marañón sugar free",
      "Orígenes Trinitario seleccionados",
      "R&D Colab · marca acelerada",
    ],
    ctaLabel: "Entrar a Benevolo →",
    ctaUrl: "/benevolo",
    role: "regional-node",
  },
  {
    id: "ecoyuma",
    name: "Ecoyuma",
    tagline: "Vivero y material vegetal · plántulas injertadas.",
    description:
      "Catálogo externo de plántulas y semillas. Puerta de siembra para FEAR 5, TCS 19, TCS 06 y otros clones. Stock y precios los define tienda.ecoyuma.com.co.",
    location: "Colombia · catálogo online",
    territoryId: "bogota",
    accentColor: "#86B66B",
    bgColor: "#142016",
    textColor: "#F7F1EE",
    products: [
      "Plántula FEAR-5",
      "Plántulas TCS-19 y TCS-06",
      "Semillas y material de siembra",
    ],
    ctaLabel: "Abrir tienda Ecoyuma →",
    ctaUrl: "https://tienda.ecoyuma.com.co/11-plantulas-de-cacao",
    role: "regional-node",
  },
]

export const comingSoonSlots = [
  { id: "slot-1", hint: "Tu finca puede ser nodo" },
  { id: "slot-2", hint: "Tu marca puede pautar" },
]

/** Epicentro actual. No implica participación societaria sobre las marcas regionales. */
export const founderBrands = brands.filter((brand) => brand.role === "epicenter")

/** El círculo de nodos regionales permanece abierto a nuevas fincas y marcas. */
export const collaboratorBrands = brands.filter((brand) => brand.role === "regional-node")
