/**
 * MOOC Contexto Cacao · patrocinado por Zurych
 * Fuentes: chocolatezurych.com (home + Nosotros), presencia pública
 * "Zurych chocolate saludable" / Instagram @tiendazurych.
 * No inventamos claims de Facebook no verificados.
 */

export type MoocCard = {
  kicker: string
  headline: string
  body: string
  highlight?: { label: string; value: string }
}

export type MoocLesson = {
  slug: string
  number: number
  title: string
  duration: string
  xp: number
  status: "available" | "coming-soon"
  summary: string
  companionIntro: string
  companionMid: string
  companionQuiz: string
  companionComplete: string
  companionTips: string[]
  cards: MoocCard[]
  quiz: {
    question: string
    options: { id: string; text: string; correct: boolean; explanation: string }[]
  }
  sources: { label: string; href: string }[]
}

export const MOOC_ZURYCH_SLUG = "mooc-zurych"

export const moocZurychLessons: MoocLesson[] = [
  {
    slug: "zurych-territorio",
    number: 1,
    title: "Zurych · territorio y bean-to-bar",
    duration: "12 min",
    xp: 70,
    status: "available",
    summary:
      "Empresa familiar colombiana, cacao de Santander, agroecología y chocolate saludable bean-to-bar.",
    companionIntro:
      "Bienvenido al MOOC Zurych. Empezamos por quiénes son y desde qué territorio hablan — sin inventar medallas.",
    companionMid:
      "Bogotá opera; Santander cultiva. Bean-to-bar con sentido social es el hilo.",
    companionQuiz: "¿Qué afirma Zurych sobre sí misma en su sitio?",
    companionComplete: "Módulo 1 del MOOC listo. Ya ubicas a Zurych en el mapa Colab. +70 XP",
    companionTips: [
      "Sitio: chocolatezurych.com",
      "Redes: Zurych chocolate saludable · @tiendazurych",
      "Nodo Colab: Landázuri · Santander",
    ],
    cards: [
      {
        kicker: "Quiénes son",
        headline: "Empresa familiar, formas distintas de consumir cacao.",
        body: "En chocolatezurych.com/Nosotros, Zurych se presenta como empresa familiar que ofrece productos de cacao de alta calidad para explorar formas diferentes de consumir el cacao — con filosofía natural y saludable.",
        highlight: { label: "tipo de proyecto", value: "familiar · artesanal" },
      },
      {
        kicker: "Territorio",
        headline: "Santander en el centro del relato.",
        body: "Zurych declara trabajar con granos cultivados orgánicamente y agroecológicamente, con sentido social hacia campesinos de regiones apartadas de Santander. El Colab los reconoce como nodo Landázuri.",
        highlight: { label: "territorio", value: "Santander · Landázuri" },
      },
      {
        kicker: "Bean-to-bar",
        headline: "Trazabilidad de origen a producto.",
        body: "En home, Zurych habla de producto de origen bean-to-bar con trazabilidad, sellos agroecológico y negocios verdes, economía circular y comercio justo. Innovación para que el chocolate sea esencial y saludable.",
        highlight: { label: "modelo", value: "bean-to-bar · trazable" },
      },
      {
        kicker: "Canales",
        headline: "Mayor, detal y mesa.",
        body: "Ofrecen soluciones al por mayor, al detal y servicio a la mesa especializado en cacao. En redes destacan nibs 100 %, coberturas y presencia en ferias (p. ej. Corferias) y mercados.",
        highlight: { label: "presencia", value: "Bogotá · redes · ferias" },
      },
    ],
    quiz: {
      question: "Según su sitio, ¿cómo se define Zurych?",
      options: [
        {
          id: "a",
          text: "Multinacional suiza de chocolate industrial",
          correct: false,
          explanation: "Zurych es una marca colombiana; el nombre no implica sede en Suiza.",
        },
        {
          id: "b",
          text: "Empresa familiar de chocolatería artesanal bean-to-bar con ancla en Santander",
          correct: true,
          explanation: "Así lo describen Nosotros + home: familiar, artesanal, Santander, bean-to-bar.",
        },
        {
          id: "c",
          text: "Solo tienda de souvenirs sin cacao propio",
          correct: false,
          explanation: "Publican coberturas, chocolatinas y nibs con relato de origen.",
        },
      ],
    },
    sources: [
      { label: "Chocolate Zurych", href: "https://chocolatezurych.com" },
      { label: "Nosotros", href: "https://www.chocolatezurych.com/Nosotros/" },
      { label: "Instagram @tiendazurych", href: "https://www.instagram.com/tiendazurych/" },
    ],
  },
  {
    slug: "zurych-agroecologia",
    number: 2,
    title: "Agroecología y planeta",
    duration: "14 min",
    xp: 80,
    status: "available",
    summary:
      "Mercados agroecológicos de Bogotá región, cultivos sin agroquímicos, biodiversidad y planta con separación de residuos.",
    companionIntro:
      "Módulo 2: el compromiso ambiental que Zurych declara en Nosotros — leído como claim de marca, no como certificación inventada.",
    companionMid:
      "Cultivo, biodiversidad y planta: tres capas. Pregunta siempre por evidencia de lote.",
    companionQuiz: "¿Qué afirma Zurych sobre su relación con el planeta?",
    companionComplete: "Módulo 2 listo. Ya sabes qué pedir cuando alguien dice ‘verde’. +80 XP",
    companionTips: [
      "Fuente primaria: chocolatezurych.com/Nosotros",
      "Red de mercados agroecológicos Bogotá región (claim de marca).",
      "Dualita: claim ≠ auditoría — pide trazabilidad.",
    ],
    cards: [
      {
        kicker: "Mercados agroeco",
        headline: "Incluidos en la red de Bogotá región.",
        body: "Zurych declara que su proyecto está incluido en la red de mercados agroecológicos de Bogotá región por haber eliminado procesos agroquímicos de sus productos. Eso es posicionamiento territorial, no un sello que Dualita fabrique.",
        highlight: { label: "red", value: "mercados agroeco · Bogotá región" },
      },
      {
        kicker: "Cultivo",
        headline: "Sin agroquímicos, con biodiversidad.",
        body: "En Nosotros afirman no usar agroquímicos en cultivos, promover biodiversidad de flora y fauna, y conservar suelo y agua. Es la base de su relato ‘proyecto verde’.",
        highlight: { label: "práctica declarada", value: "sin agroquímicos · biodiversidad" },
      },
      {
        kicker: "Planta",
        headline: "Separación de residuos y reciclaje.",
        body: "En la planta transformadora se enfocan en separación de residuos y reciclaje de materiales. Circularidad empieza en operación, no solo en el empaque bonito.",
        highlight: { label: "planta", value: "residuos · reciclaje" },
      },
      {
        kicker: "Sentido social",
        headline: "Campesinos de Santander.",
        body: "El relato une agroecología con mejora de calidad de vida de campesinos en regiones apartadas de Santander. En el Colab eso se ancla al nodo Landázuri — sin inventar precios de compra ni % de prima.",
        highlight: { label: "ancla Colab", value: "Landázuri · Santander" },
      },
    ],
    quiz: {
      question: "Según Nosotros, ¿qué ubica a Zurych en la red agroecológica de Bogotá región?",
      options: [
        {
          id: "a",
          text: "Haber eliminado procesos agroquímicos de sus productos",
          correct: true,
          explanation: "Así lo declara explícitamente la página Nosotros.",
        },
        {
          id: "b",
          text: "Tener fábrica en Suiza con certificación inventada Dualita",
          correct: false,
          explanation: "Zurych opera el relato desde Colombia; no inventamos sellos.",
        },
        {
          id: "c",
          text: "Solo vender cobertura blanca al 40 %",
          correct: false,
          explanation: "Ese SKU no forma parte de los hechos publicados que usamos aquí.",
        },
      ],
    },
    sources: [
      { label: "Nosotros · Zurych", href: "https://www.chocolatezurych.com/Nosotros/" },
      { label: "Chocolate Zurych", href: "https://chocolatezurych.com" },
    ],
  },
  {
    slug: "zurych-producto-saludable",
    number: 3,
    title: "Chocolate saludable en la práctica",
    duration: "14 min",
    xp: 80,
    status: "available",
    summary:
      "Coberturas 60–100 %, chocolatinas y nibs 100 % sin azúcar añadida: cómo leer el portafolio Zurych.",
    companionIntro:
      "Módulo 3: del eslogan ‘chocolate saludable’ al portafolio real publicado en tienda y redes.",
    companionMid:
      "% de cacao, formato y azúcar añadida: tres datos antes de comprar o recomendar.",
    companionQuiz: "¿Qué productos declara Zurych de forma pública?",
    companionComplete: "Módulo 3 listo. Ya lees el portafolio sin inventar SKUs. +80 XP",
    companionTips: [
      "Home: coberturas 60 / 70 / 100 % y chocolatinas 75 / 100 %.",
      "Redes: nibs 100 % cacao, sin azúcar añadida, bean-to-bar.",
      "Precio en web cambia; Dualita enseña criterios, no cotizaciones.",
    ],
    cards: [
      {
        kicker: "Promesa de home",
        headline: "Chocolates saludables 100 % cacao (concepto).",
        body: "Zurych titula su propuesta como chocolates saludables con concepto bean-to-bar, trazabilidad, sello agroecológico, negocios verdes, economía circular y comercio justo. Lee eso como marco de marca.",
        highlight: { label: "marco", value: "saludable · trazable · circular" },
      },
      {
        kicker: "Coberturas",
        headline: "Línea 60 · 70 · 100 %.",
        body: "En catálogo público aparecen coberturas al 60 %, 70 % y 100 % cacao. Sirven a pastelería y mesa; el % te dice intensidad y margen de azúcar, no ‘poder curativo’.",
        highlight: { label: "coberturas", value: "60 % · 70 % · 100 %" },
      },
      {
        kicker: "Chocolatinas",
        headline: "Formatos de porción.",
        body: "Publican chocolatinas 75 % y 100 % cacao — el formato de entrada para quien aún no cocina con cobertura. Úsalas para educar paladar, no para inventar fichas técnicas.",
        highlight: { label: "chocolatinas", value: "75 % · 100 %" },
      },
      {
        kicker: "Nibs",
        headline: "Cacao sin maquillaje.",
        body: "En Facebook/Instagram, Zurych chocolate saludable / @tiendazurych presenta nibs 100 % cacao: puro, intenso, sin azúcar añadida, bean-to-bar. Es el producto más ‘grano’ del portafolio.",
        highlight: { label: "nibs", value: "100 % · sin azúcar añadida" },
      },
    ],
    quiz: {
      question: "¿Cuál afirmación sobre el portafolio Zurych está anclada a fuentes públicas?",
      options: [
        {
          id: "a",
          text: "Publican coberturas 60–100 %, chocolatinas y nibs 100 % sin azúcar añadida",
          correct: true,
          explanation: "Home + redes coinciden en esa línea de producto.",
        },
        {
          id: "b",
          text: "Solo venden cobertura blanca al 40 % con estudio HoReCa del 68 %",
          correct: false,
          explanation: "Eso sería alucinación: no lo usamos.",
        },
        {
          id: "c",
          text: "No tienen presencia en Bogotá ni en redes",
          correct: false,
          explanation: "Home indica Bogotá–Colombia; redes y ferias son visibles.",
        },
      ],
    },
    sources: [
      { label: "Tienda Zurych", href: "https://chocolatezurych.com" },
      { label: "Instagram @tiendazurych", href: "https://www.instagram.com/tiendazurych/" },
    ],
  },
  {
    slug: "zurych-cultura-cacao",
    number: 4,
    title: "Cultura, ferias y comunidad",
    duration: "12 min",
    xp: 70,
    status: "coming-soon",
    summary:
      "De Corferias a redes: cómo Zurych cuenta el cacao colombiano en comunidad.",
    companionIntro: "",
    companionMid: "",
    companionQuiz: "",
    companionComplete: "",
    companionTips: [],
    cards: [],
    quiz: { question: "", options: [] },
    sources: [
      { label: "Zurych chocolate saludable", href: "https://chocolatezurych.com" },
    ],
  },
]

export const moocZurychAvailable = moocZurychLessons.filter((l) => l.status === "available")
export const moocZurychTotalXp = moocZurychLessons.reduce((t, l) => t + l.xp, 0)

export function getMoocZurychLesson(slug: string) {
  return moocZurychLessons.find((l) => l.slug === slug) ?? null
}
