// v2-pivot: seed/fallback local de `courses` → `modules`
// (supabase/migrations/0006_lms_dualita.sql), tipado como `Course`/`LmsModule`
// en @cacao-colab/types. Ver docs/07-MODELO-DATOS.md y docs/09-GAMIFICACION.md.
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
    title: "El cacao antes del chocolate",
    duration: "45 min",
    topics: ["Historia y domesticación", "Botánica y diversidad", "Del fruto a la sociedad"],
    status: "coming-soon",
  },
  {
    id: "m2",
    number: 2,
    title: "Colombia: territorio e historia",
    duration: "60 min",
    topics: ["Regiones cacaoteras", "Conflicto, paz y ruralidad", "Cacao Fine-Flavor"],
    status: "coming-soon",
  },
  {
    id: "m3",
    number: 3,
    title: "Cómo nació el chocolate",
    duration: "50 min",
    topics: ["Transformaciones históricas", "Industria y oficio", "Lenguaje sensorial"],
    status: "coming-soon",
  },
  {
    id: "m4",
    number: 4,
    title: "El cacao que viene",
    duration: "55 min",
    topics: ["Trazabilidad y clima", "Nuevas economías del cacao", "Ecosistemas colaborativos"],
    status: "coming-soon",
  },
]

export const microModules: Module[] = [
  {
    id: "micro-1",
    number: 1,
    title: "Cacao funcional: aprende a elegir",
    duration: "8 min",
    topics: ["Teobromina y flavanoles", "Cacao vs. chocolate", "Claims con evidencia"],
    status: "available",
    slug: "cacao-bioactivo",
    url: "/aprende/cacao-bioactivo",
  },
  {
    id: "micro-2",
    number: 2,
    title: "Fermentación y funcionalidad",
    duration: "7 min",
    topics: ["Transformación de polifenoles", "Sabor y aceptación", "Proceso trazable"],
    status: "available",
    slug: "fermentacion-controlada",
    url: "/aprende/fermentacion-controlada",
  },
  {
    id: "micro-3",
    number: 3,
    title: "Lee etiquetas sin caer en marketing",
    duration: "6 min",
    topics: ["Porcentaje real de cacao", "Azúcares y porción", "Ingredientes y contexto"],
    status: "available",
    slug: "coberturas-zurych",
    url: "/aprende/coberturas-zurych",
  },
  {
    id: "micro-4",
    number: 4,
    title: "NIBS: hábito simple y consciente",
    duration: "5 min",
    topics: ["Cacao sin azúcar añadida", "Porción y frecuencia", "Aplicaciones cotidianas"],
    status: "available",
    slug: "nibs-vivos",
    url: "/aprende/nibs-vivos",
  },
  {
    id: "micro-5",
    number: 5,
    title: "Origen, confianza y consumo",
    duration: "9 min",
    topics: ["Trazabilidad de CAÚA", "Calidad y transparencia", "Comprar con criterio"],
    status: "available",
    slug: "origen-guardianes",
    url: "/aprende/origen-guardianes",
  },
  {
    id: "micro-6",
    number: 6,
    title: "Diseña tu ritual de cacao",
    duration: "8 min",
    topics: ["Momento y porción", "Registro de hábito", "Consumo saludable en contexto"],
    status: "available",
    slug: "tu-operacion-cacao",
    url: "/aprende/tu-operacion-cacao",
  },
]
