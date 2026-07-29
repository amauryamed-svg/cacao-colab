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
      "Laboratorio virtual + Cacao Gotchi",
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
      "Nodo regional del Colab en Landázuri. Conecta el territorio de Santander con conocimiento de transformación y aplicaciones profesionales de chocolate.",
    location: "Landázuri, Santander",
    territoryId: "santander",
    accentColor: "#F2C830",
    bgColor: "#2D1810",
    textColor: "#F7F1EE",
    products: [
      "Nodo regional de conocimiento",
      "Transformación de cacao",
      "Aplicaciones de chocolatería",
    ],
    ctaLabel: "Conocer Zurych →",
    ctaUrl: "https://chocolatezurych.com",
    role: "regional-node",
  },
  {
    id: "la-querencia",
    name: "La Querencia",
    tagline: "Nodo Arbeláez · Cundinamarca.",
    description:
      "Nodo regional del Colab en Arbeláez. Hace visible el cacao de Cundinamarca dentro de una red nacional de aprendizaje, colaboración y mercado.",
    location: "Arbeláez, Cundinamarca",
    territoryId: "cundinamarca",
    accentColor: "#DC775F",
    bgColor: "#3B1D16",
    textColor: "#F7F1EE",
    products: ["Nodo regional de origen", "Aprendizaje entre pares", "Conexión con compradores"],
    ctaLabel: "Conectar con el nodo →",
    ctaUrl: "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20conectar%20con%20La%20Querencia.",
    role: "regional-node",
  },
  {
    id: "la-lomita",
    name: "La Lomita",
    tagline: "Nodo Paicol · Huila.",
    description:
      "Nodo regional del Colab en Paicol. Representa una puerta al aprendizaje de finca, calidad de lote y cacao Fine-Flavor del Huila.",
    location: "Paicol, Huila",
    territoryId: "huila",
    accentColor: "#86B66B",
    bgColor: "#20371B",
    textColor: "#F7F1EE",
    products: ["Práctica de finca", "Calidad y trazabilidad", "Cacao Fine-Flavor"],
    ctaLabel: "Conectar con el nodo →",
    ctaUrl: "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20conectar%20con%20La%20Lomita.",
    role: "regional-node",
  },
  {
    id: "quara",
    name: "Quara Cacao",
    tagline: "Nodo Tame · Arauca.",
    description:
      "Nodo regional del Colab en Tame. Acerca el conocimiento del cacao araucano al laboratorio de fermentación y a la comunidad nacional.",
    location: "Tame, Arauca",
    territoryId: "arauca",
    accentColor: "#E3A12B",
    bgColor: "#402812",
    textColor: "#F7F1EE",
    products: ["Origen Arauca", "Fermentación aplicada", "Comunidad de aprendizaje"],
    ctaLabel: "Conectar con el nodo →",
    ctaUrl: "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20conectar%20con%20Quara%20Cacao.",
    role: "regional-node",
  },
  {
    id: "chocolover",
    name: "Chocolover",
    tagline: "Nodo Guamal · Meta.",
    description:
      "Nodo regional del Colab en Guamal. Conecta cacao, transformación y cultura del Meta con builders, learners y marcas.",
    location: "Guamal, Meta",
    territoryId: "meta",
    accentColor: "#48A784",
    bgColor: "#13362C",
    textColor: "#F7F1EE",
    products: ["Origen Meta", "Cultura de chocolate", "Conexión regional"],
    ctaLabel: "Conectar con el nodo →",
    ctaUrl: "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20conectar%20con%20Chocolover.",
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
