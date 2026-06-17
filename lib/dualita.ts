export type Module = {
  id: string
  number: number
  title: string
  duration: string
  topics: string[]
  status: "available" | "coming-soon"
  url?: string
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
    title: "¿Qué es chocolate inteligente?",
    duration: "8 min",
    topics: ["Sin azúcar añadida", "Beneficios funcionales", "Cacao vs. chocolate comercial"],
    status: "available",
    url: "https://cauacolombia.co/pages/aprende",
  },
  {
    id: "micro-2",
    number: 2,
    title: "Coberturas funcionales Zurych",
    duration: "6 min",
    topics: ["70%, 85%, 100% y Blanco", "Aplicaciones por tipo", "Temperado básico"],
    status: "available",
    url: "https://cauacolombia.co/pages/aprende",
  },
  {
    id: "micro-3",
    number: 3,
    title: "NIBS en cocina profesional",
    duration: "5 min",
    topics: ["NIBS cacao vivo", "Amenity & gifting HoReCa", "Presentación y emplatado"],
    status: "available",
    url: "https://cauacolombia.co/pages/aprende",
  },
  {
    id: "micro-4",
    number: 4,
    title: "Recetas de temporada",
    duration: "7 min",
    topics: ["Navidad & bodas", "Recetas firma exclusivas", "Ganaches y trufas de autor"],
    status: "available",
    url: "https://cauacolombia.co/pages/aprende",
  },
  {
    id: "micro-5",
    number: 5,
    title: "Gestión de proveedores cacao",
    duration: "9 min",
    topics: ["Criterios de selección", "Relación directa agricultor", "Pedido mínimo y lead times"],
    status: "available",
    url: "https://cauacolombia.co/pages/aprende",
  },
  {
    id: "micro-6",
    number: 6,
    title: "Métricas de cacao para HoReCa",
    duration: "8 min",
    topics: ["Costo por porción", "Rotación de cobertura", "KPIs de calidad sensorial"],
    status: "available",
    url: "https://cauacolombia.co/pages/aprende",
  },
]
