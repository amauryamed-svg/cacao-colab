export type Brand = {
  id: string
  name: string
  tagline: string
  description: string
  accentColor: string
  bgColor: string
  textColor: string
  products: string[]
  ctaLabel: string
  ctaUrl: string
  role?: 'owner' | 'colaborador'
}

export const brands: Brand[] = [
  {
    id: "caua",
    name: "CAÚA Colombia",
    tagline: "Cacao de origen. Cero azúcar añadida.",
    description:
      "Cacao colombiano trazable por lote, directamente de agricultores de Huila, Santander, Meta y Arauca. Productos sin azúcar añadida para operaciones HoReCa y retail de especialidad.",
    accentColor: "#87AA27",
    bgColor: "#1C3B26",
    textColor: "#F7F1EE",
    products: [
      "Cacao en polvo 70% · 100%",
      "Ritual Cacao (bebida funcional)",
      "NIBS cacao vivo × Zurych",
    ],
    ctaLabel: "Ver catálogo CAÚA →",
    ctaUrl: "https://cauacolombia.co/pages/horeca",
  },
  {
    id: "zurych",
    name: "Chocolate Zurych",
    tagline: "Coberturas funcionales para el profesional.",
    description:
      "Chocolatería de especialidad con coberturas en cuatro cacao orígenes: 70%, 85%, 100% sin azúcar y Blanco 40%. Formulaciones de chocolate inteligente diseñadas para temperado profesional.",
    accentColor: "#F2C830",
    bgColor: "#2D1810",
    textColor: "#F7F1EE",
    products: [
      "Cobertura 70% — ganaches & mousses",
      "Cobertura 85% panela Santander",
      "Cobertura 100% — moles & fondos",
      "Cobertura Blanco 40%",
    ],
    ctaLabel: "Conocer Zurych →",
    ctaUrl: "https://chocolatezurych.com",
  },
  {
    id: "lust",
    name: "Chocolate Lust",
    tagline: "Chocolate de autor colombiano.",
    description:
      "Tabletas y confitería de autor con cacao colombiano de origen. Colaborador del Colab desde Alimentec 2026 — co-creadores de los NIBS CAÚA × Zurych × Lust.",
    accentColor: "#881C79",
    bgColor: "#1A0F1A",
    textColor: "#F7F1EE",
    products: [
      "Co-branding NIBS Oscuro × Lust",
      "Co-branding NIBS Blanco × Lust",
      "Tabletas de autor · origen Colombia",
    ],
    ctaLabel: "Conocer Lust →",
    ctaUrl: "https://chocolatelust.com",
    role: "colaborador",
  },
]

export const comingSoonSlots = [
  { id: "slot-1", hint: "Productor directo · Arauca" },
]
