/**
 * Dualita Curriculum — CAÚA × Zurych
 *
 * Microlearning: grounded in the CAÚA daily-cacao protocol (tienda propia fuera de línea
 * desde 2026-08; pedidos por WhatsApp mientras tanto)
 * MOOC: grounded in redes (Zurych chocolate saludable / @tiendazurych)
 *
 * Module shape kept for ModuleCard / useColabProgress consumers.
 */

export type Module = {
  id: string
  number: number
  title: string
  duration: string
  topics: string[]
  status: "available" | "coming-soon"
  slug?: string
  url?: string
}

export const moocModules: Module[] = [
  {
    id: "mooc-1",
    number: 1,
    title: "Territorio y bean-to-bar",
    duration: "12 min",
    topics: [
      "Empresa familiar colombiana",
      "Santander · Landázuri Colab",
      "Trazabilidad bean-to-bar",
    ],
    status: "available",
    slug: "zurych-territorio",
    url: "/aprende/mooc/zurych-territorio",
  },
  {
    id: "mooc-2",
    number: 2,
    title: "Agroecología y planeta",
    duration: "14 min",
    topics: [
      "Mercados agroeco Bogotá región",
      "Sin agroquímicos en cultivo",
      "Residuos y circularidad en planta",
    ],
    status: "available",
    slug: "zurych-agroecologia",
    url: "/aprende/mooc/zurych-agroecologia",
  },
  {
    id: "mooc-3",
    number: 3,
    title: "Chocolate saludable en la práctica",
    duration: "14 min",
    topics: [
      "Coberturas 60–100 %",
      "Chocolatinas y nibs",
      "Sin azúcar añadida (nibs)",
    ],
    status: "available",
    slug: "zurych-producto-saludable",
    url: "/aprende/mooc/zurych-producto-saludable",
  },
  {
    id: "mooc-4",
    number: 4,
    title: "Cultura, ferias y comunidad",
    duration: "12 min",
    topics: [
      "Corferias y mercados",
      "@tiendazurych",
      "Contar origen sin inventar medallas",
    ],
    status: "coming-soon",
    slug: "zurych-cultura-cacao",
  },
]

export const microModules: Module[] = [
  {
    id: "micro-1",
    number: 1,
    title: "Cacao funcional, no chocolate",
    duration: "7 min",
    topics: [
      "Protocolo diario CAÚA",
      "~150 mg teobromina / cubo",
      "~320 mg flavanols (promedio de lote)",
    ],
    status: "available",
    slug: "cacao-bioactivo",
    url: "/aprende/cacao-bioactivo",
  },
  {
    id: "micro-2",
    number: 2,
    title: "Siete días en cajón de madera",
    duration: "7 min",
    topics: [
      "Fermentación natural 7 días",
      "Secado al sol",
      "Sin setpoints inventados",
    ],
    status: "available",
    slug: "fermentacion-controlada",
    url: "/aprende/fermentacion-controlada",
  },
  {
    id: "micro-3",
    number: 3,
    title: "Lee la etiqueta de cobertura",
    duration: "6 min",
    topics: [
      "100 % · 70 % panela · 85 %",
      "60 % maltitol Santander",
      "Qué mirar en el panel",
    ],
    status: "available",
    slug: "coberturas-zurych",
    url: "/aprende/coberturas-zurych",
  },
  {
    id: "micro-4",
    number: 4,
    title: "Ritual diario y nibs",
    duration: "5 min",
    topics: [
      "Cubo ~8 g en agua/leche vegetal",
      "Nibs Zurych 100 % sin azúcar",
      "Hábito > complejidad",
    ],
    status: "available",
    slug: "nibs-vivos",
    url: "/aprende/nibs-vivos",
  },
  {
    id: "micro-5",
    number: 5,
    title: "Origen: Huila y Santander",
    duration: "8 min",
    topics: [
      "Hobo, Huila · Híbrido Acriollado",
      "Landázuri · Santander",
      "Red y precio justo (claim de marca)",
    ],
    status: "available",
    slug: "origen-guardianes",
    url: "/aprende/origen-guardianes",
  },
  {
    id: "micro-6",
    number: 6,
    title: "Protocolo personal de 7 días",
    duration: "7 min",
    topics: [
      "Una porción · una hora",
      "Suscripción como diseño de hábito",
      "Sin unit economics inventados",
    ],
    status: "available",
    slug: "tu-operacion-cacao",
    url: "/aprende/tu-operacion-cacao",
  },
]

export const DUALITA_WHATSAPP =
  "https://wa.me/573102227848?text=" +
  encodeURIComponent(
    "Hola Cacao Colab — quiero cupo / info del MOOC Zurych Bean-to-Bar."
  )
