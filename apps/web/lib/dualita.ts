export type Module = {
  id: string
  number: number
  title: string
  duration: string
  topics: string[]
  status: "available" | "coming-soon"
  url?: string
  slug?: string
}

export const moocModules: Module[] = [
  {
    id: "m1",
    number: 1,
    title: "Fundamentos del cacao colombiano",
    duration: "45 min",
    topics: ["Historia del cacao en Colombia", "Cuatro regiones Cacao Colab", "Del árbol a la tableta"],
    status: "coming-soon",
  },
  {
    id: "m2",
    number: 2,
    title: "Fermentación, terroir y trazabilidad",
    duration: "60 min",
    topics: ["Proceso de fermentación", "Influencia del terroir en el sabor", "Trazabilidad por lote"],
    status: "coming-soon",
  },
  {
    id: "m3",
    number: 3,
    title: "Temperado y coberturas funcionales",
    duration: "50 min",
    topics: ["Cristalización del cacao", "Coberturas funcionales Zurych", "Técnicas de temperado profesional"],
    status: "coming-soon",
  },
  {
    id: "m4",
    number: 4,
    title: "Negocio de cacao: HoReCa y retail",
    duration: "55 min",
    topics: ["Unit economics del cacao", "Integración HoReCa", "Estrategia de precios de especialidad"],
    status: "coming-soon",
  },
]

export const microModules: Module[] = [
  {
    id: "micro-1",
    number: 1,
    title: "El cacao que activa tu cerebro",
    duration: "8 min",
    topics: ["Teobromina y flavonoides", "Cacao bioactivo vs. chocolate industrial", "Por qué el origen cambia el perfil"],
    status: "available",
    slug: "cacao-bioactivo",
    url: "/aprende/cacao-bioactivo",
  },
  {
    id: "micro-2",
    number: 2,
    title: "La fermentación: donde nace el sabor",
    duration: "7 min",
    topics: ["Proceso CAÚA 5–7 días", "Levaduras y bacterias acéticas", "Control de temperatura por lote"],
    status: "available",
    slug: "fermentacion-controlada",
    url: "/aprende/fermentacion-controlada",
  },
  {
    id: "micro-3",
    number: 3,
    title: "Coberturas funcionales: tu nueva herramienta",
    duration: "6 min",
    topics: ["70%, 85%, 100% y Blanco Zurych", "Temperado y cristalización", "Aplicaciones HoReCa por perfil"],
    status: "available",
    slug: "coberturas-zurych",
    url: "/aprende/coberturas-zurych",
  },
  {
    id: "micro-4",
    number: 4,
    title: "NIBS vivos en tu cocina",
    duration: "5 min",
    topics: ["Cacao puro sin azúcar", "Amenity & gifting HoReCa", "6+ aplicaciones en cocina"],
    status: "available",
    slug: "nibs-vivos",
    url: "/aprende/nibs-vivos",
  },
  {
    id: "micro-5",
    number: 5,
    title: "Cacao con historia: los Guardianes",
    duration: "9 min",
    topics: ["5 regiones de origen CAÚA", "Trazabilidad por lote", "Impacto social y narrativa de menú"],
    status: "available",
    slug: "origen-guardianes",
    url: "/aprende/origen-guardianes",
  },
  {
    id: "micro-6",
    number: 6,
    title: "Tu operación + cacao: los números",
    duration: "8 min",
    topics: ["Costo por porción vs. precio de venta", "Pedido mínimo CAÚA", "KPIs de calidad sensorial"],
    status: "available",
    slug: "tu-operacion-cacao",
    url: "/aprende/tu-operacion-cacao",
  },
]
