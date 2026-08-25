/**
 * Microlearning CAÚA · contenido anclado al protocolo CAÚA
 * (protocolo diario, origen, fermentación 7 días, coberturas reales).
 * Tienda propia fuera de línea desde 2026-08 — el protocolo/hechos de marca se
 * conservan como registro; pedidos hoy van por WhatsApp, no por shop en línea.
 * Las dosis funcionales se presentan como promedios de lote declarados por la marca,
 * no como consejo médico ni como cifras universales.
 */
export type LessonCard = {
  kicker: string
  headline: string
  body: string
  highlight?: { label: string; value: string }
}

export type QuizOption = {
  id: string
  text: string
  correct: boolean
  explanation: string
}

export type Lesson = {
  slug: string
  number: number
  title: string
  emoji: string
  duration: string
  xp: number
  companionIntro: string
  companionMid: string
  companionQuiz: string
  companionComplete: string
  companionTips: string[]
  cards: LessonCard[]
  quiz: {
    question: string
    options: QuizOption[]
  }
}

export const lessons: Lesson[] = [
  {
    slug: "cacao-bioactivo",
    number: 1,
    title: "Cacao funcional, no chocolate de góndola",
    emoji: "◆",
    duration: "7 min",
    xp: 50,
    companionIntro:
      "Soy Dualita. Hoy aprendes a distinguir cacao funcional (como lo presenta CAÚA) del chocolate ultraprocesado de góndola.",
    companionMid:
      "CAÚA habla de teobromina y flavanoles como protocolo diario — no como magia. Lee la etiqueta y el origen.",
    companionQuiz: "Comprobemos si separas cacao funcional de chocolate industrial.",
    companionComplete: "Módulo 1 listo. Ya sabes qué preguntar antes de comprar. +50 XP",
    companionTips: [
      "Fuente: protocolo CAÚA — cacao funcional de origen colombiano.",
      "Las dosis varían por cosecha; CAÚA lo declara como promedio de lote.",
      "Esto es educación alimentaria, no consejo médico.",
    ],
    cards: [
      {
        kicker: "Definición CAÚA",
        headline: "Cacao funcional, no chocolate.",
        body: "CAÚA se presenta como protocolo diario de cacao: energía y enfoque sin la narrativa del dulce industrial. El chocolate de góndola suele añadir azúcar y leche; el cacao funcional busca conservar el perfil del grano fermentado.",
        highlight: { label: "promesa de marca", value: "cacao dosificado · origen único" },
      },
      {
        kicker: "Teobromina",
        headline: "Estimulación distinta al café.",
        body: "CAÚA destaca la teobromina como estimulación natural sostenida frente a la “espiral de cortisol” del café. En su ritual, un cubo (~8 g) declara alrededor de 150 mg de teobromina — promedio de lote, no dosis clínica.",
        highlight: { label: "por cubo (promedio de lote)", value: "~150 mg teobromina" },
      },
      {
        kicker: "Flavanoles",
        headline: "Flujo y cognición, con matices.",
        body: "Los flavanoles del cacao se asocian a flujo sanguíneo y cognición en literatura pública. CAÚA declara ~320 mg de flavanoles de cacao por cubo como promedio de lote. No sustituye evaluación médica ni garantiza un efecto individual.",
        highlight: { label: "por cubo (promedio de lote)", value: "~320 mg flavanoles" },
      },
      {
        kicker: "Honestidad",
        headline: "Lee el panel, no solo el eslogan.",
        body: "CAÚA actualiza el panel nutricional por cosecha y advierte que los valores exactos varían. Tu criterio: origen, fermentación, azúcar añadida y si el producto declara promedios o promesas absolutas.",
        highlight: { label: "principio Dualita", value: "evidencia > eslogan" },
      },
    ],
    quiz: {
      question: "Según el propio marco de CAÚA, ¿qué distingue al cacao funcional del chocolate de góndola?",
      options: [
        {
          id: "a",
          text: "Que siempre tiene certificación médica",
          correct: false,
          explanation: "CAÚA es alimento funcional de marca; no es un medicamento ni un consejo clínico.",
        },
        {
          id: "b",
          text: "Prioriza el cacao dosificado y el perfil del grano frente al dulce ultraprocesado",
          correct: true,
          explanation: "Correcto: cacao funcional vs. chocolate de góndola con azúcar/leche añadidos.",
        },
        {
          id: "c",
          text: "Que nunca declara dosis de teobromina",
          correct: false,
          explanation: "CAÚA sí publica dosis aproximadas por cubo como promedio de lote.",
        },
      ],
    },
  },
  {
    slug: "fermentacion-controlada",
    number: 2,
    title: "Siete días en cajón de madera",
    emoji: "◎",
    duration: "7 min",
    xp: 55,
    companionIntro:
      "Módulo 2: la fermentación de siete días que CAÚA declara en finca. Sin inventar setpoints que la marca no publica.",
    companionMid:
      "Madera, sol y tiempo. Eso es lo que CAÚA pone en el centro de su historia de biodisponibilidad.",
    companionQuiz: "¿Qué afirma CAÚA sobre su fermentación?",
    companionComplete: "Ya conectas fermentación de finca con el ritual diario. +55 XP",
    companionTips: [
      "CAÚA: fermentación natural de siete días en cajón de madera.",
      "Secado al sol · origen colombiano.",
      "Para curvas Tc-pH de laboratorio, ve a Master Cacaotier.",
    ],
    cards: [
      {
        kicker: "Declaración de marca",
        headline: "Siete días, no un eslogan vacío.",
        body: "CAÚA describe fermentación natural de siete días en cajón de madera y secado al sol. Esa ventana es parte de su argumento de polifenoles biodisponibles. No confundas su protocolo de finca con un paper de biorreactor.",
        highlight: { label: "fermentación declarada", value: "7 días · cajón de madera" },
      },
      {
        kicker: "Por qué importa",
        headline: "Sin fermentación no hay matriz de sabor ni función.",
        body: "La fermentación transforma la pulpa y prepara precursores que el tostado y el consumo interpretan. CAÚA usa esa historia para explicar por qué su cacao no es “polvo genérico”.",
        highlight: { label: "proceso", value: "fermentación → secado solar" },
      },
      {
        kicker: "Upcycled",
        headline: "Menos desperdicio del fruto.",
        body: "CAÚA insiste en economía circular: usar más del fruto (bean, mucilage, hull en su narrativa de ingredientes) frente a una industria que desperdicia gran parte del cacao. Es tesis de marca; valídala en cada SKU.",
        highlight: { label: "filosofía", value: "cero desperdicio · upcycled" },
      },
      {
        kicker: "Límite Dualita",
        headline: "No inventamos sensores ni volteos.",
        body: "Si la marca no publica frecuencia de volteo o setpoints, no los inventamos. Para bioproceso medido (T°, pH, 72 h vs 120 h) entra a Master Cacaotier.",
        highlight: { label: "ruta profunda", value: "/aprende/cacaotier" },
      },
    ],
    quiz: {
      question: "¿Qué dice CAÚA sobre su fermentación?",
      options: [
        {
          id: "a",
          text: "Fermentación natural de siete días en cajón de madera",
          correct: true,
          explanation: "Así lo declara la marca en su sitio.",
        },
        {
          id: "b",
          text: "Biorreactor isotérmico a 45 °C publicado en LWT 2025",
          correct: false,
          explanation: "Eso pertenece al paper de Master Cacaotier, no al copy de CAÚA.",
        },
        {
          id: "c",
          text: "Sin fermentación, solo tostado industrial",
          correct: false,
          explanation: "CAÚA pone la fermentación de finca en el centro del relato.",
        },
      ],
    },
  },
  {
    slug: "coberturas-zurych",
    number: 3,
    title: "Lee la etiqueta de cobertura",
    emoji: "▣",
    duration: "6 min",
    xp: 50,
    companionIntro:
      "Módulo 3: coberturas reales del catálogo CAÚA (Santander) y cómo leer % de cacao, endulzante y origen.",
    companionMid:
      "100 %, 70 % panela, 85 % panela, 60 % maltitol. El porcentaje importa — y también qué endulza.",
    companionQuiz: "¿Sabes qué mirar en una cobertura antes de usarla?",
    companionComplete: "Ya lees coberturas con criterio de etiqueta. +50 XP",
    companionTips: [
      "Catálogo CAÚA: coberturas origen Santander (precios y stock por WhatsApp mientras la tienda está fuera de línea).",
      "Panela ≠ maltitol ≠ alulosa: cambia dulzor y uso.",
      "Zurych también publica coberturas bean-to-bar (@tiendazurych).",
    ],
    cards: [
      {
        kicker: "Catálogo CAÚA",
        headline: "Coberturas con origen Santander.",
        body: "El catálogo CAÚA incluye coberturas 100 %, 70 % con panela, 85 % con panela y 60 % con maltitol — origen Santander. Precios y membresía los define la tienda; aquí aprendes a leer la ficha, no a memorizar tarifas.",
        highlight: { label: "origen declarado", value: "Santander · Colombia" },
      },
      {
        kicker: "Porcentaje",
        headline: "El % es cacao, no magia.",
        body: "Un 100 % es cacao sin azúcar añadida (intensidad máxima). Un 70 % o 85 % con panela equilibra amargor con dulzor de panela. Un 60 % con maltitol apunta a otro perfil de dulzor. Elige según uso y tolerancia.",
        highlight: { label: "pregunta clave", value: "¿qué endulza y cuánto cacao hay?" },
      },
      {
        kicker: "Powder Lite",
        headline: "Alulosa y 0 g de azúcar añadida.",
        body: "Caúa Powder 70 % Lite (Landázuri, Santander) se comunica con alulosa y 0 g de azúcar añadida. Es otra forma del protocolo — no es la misma matriz que una cobertura para temperar.",
        highlight: { label: "formato", value: "polvo 70 % · alulosa" },
      },
      {
        kicker: "Zurych en paralelo",
        headline: "Bean-to-bar saludable.",
        body: "Zurych (@tiendazurych) ofrece coberturas y chocolatinas bean-to-bar con trazabilidad y enfoque saludable. En Dualita, CAÚA enseña el hábito funcional; Zurych aporta contexto de transformación y territorio.",
        highlight: { label: "aliado MOOC", value: "Zurych · Landázuri / Bogotá" },
      },
    ],
    quiz: {
      question: "Al elegir una cobertura CAÚA, ¿qué debes mirar primero en la etiqueta?",
      options: [
        {
          id: "a",
          text: "Solo el color del empaque",
          correct: false,
          explanation: "El empaque no dice % de cacao ni endulzante.",
        },
        {
          id: "b",
          text: "Porcentaje de cacao, tipo de endulzante y origen",
          correct: true,
          explanation: "Correcto: 100 % / panela / maltitol cambian uso y perfil.",
        },
        {
          id: "c",
          text: "Si tiene medalla Cacao of Excellence",
          correct: false,
          explanation: "Eso no es un criterio de etiqueta de cobertura CAÚA.",
        },
      ],
    },
  },
  {
    slug: "nibs-vivos",
    number: 4,
    title: "Ritual diario y nibs sin azúcar",
    emoji: "◇",
    duration: "5 min",
    xp: 45,
    companionIntro:
      "Módulo 4: el hábito. CAÚA habla de cubos en agua o leche vegetal; Zurych publica nibs 100 % sin azúcar añadida.",
    companionMid:
      "Un ritual simple vence a la receta complicada que nunca haces.",
    companionQuiz: "¿Qué define un hábito de cacao consciente?",
    companionComplete: "Ritual claro. Menos teatro, más constancia. +45 XP",
    companionTips: [
      "CAÚA: 1 cubo (~8 g) en agua >70 °C o leche vegetal.",
      "Zurych: nibs 100 % cacao, bean-to-bar, sin azúcar añadida.",
      "Empieza por una porción diaria antes de ‘biohackear’.",
    ],
    cards: [
      {
        kicker: "Protocolo CAÚA",
        headline: "Dosifica, construye, compón.",
        body: "CAÚA organiza el hábito en tres gestos: dosificar un cubo, construir el día con teobromina/flavanoles de fondo, y componer la suscripción para que el lote no se acabe. Es diseño de hábito, no de laboratorio.",
        highlight: { label: "porción declarada", value: "1 cubo ≈ 8 g" },
      },
      {
        kicker: "Nibs Zurych",
        headline: "Cacao en su forma más directa.",
        body: "En redes y tienda, Zurych presenta nibs 100 % cacao: puro, intenso, sin azúcar añadida, bean-to-bar. Sirven como snack, topping o recordatorio de qué sabe el grano sin maquillaje.",
        highlight: { label: "claim de marca", value: "sin azúcar añadida · bean-to-bar" },
      },
      {
        kicker: "Hábito",
        headline: "Consistencia > complejidad.",
        body: "El error más común es armar un ‘menú funcional’ imposible. Elige una ventana (mañana), una forma (cubo o nibs) y repite una semana. Luego ajusta.",
        highlight: { label: "meta Dualita", value: "7 días · 1 microvictoria" },
      },
    ],
    quiz: {
      question: "¿Qué práctica encaja con el ritual que comunica CAÚA?",
      options: [
        {
          id: "a",
          text: "Un cubo en agua caliente o leche vegetal como porción diaria",
          correct: true,
          explanation: "Así lo describe el protocolo CAÚA.",
        },
        {
          id: "b",
          text: "Sustituir toda comida por cacao sin consultar hábitos reales",
          correct: false,
          explanation: "El microlearning busca un hábito sostenible, no extremos.",
        },
        {
          id: "c",
          text: "Solo usar cacao si tiene estudio HoReCa inventado",
          correct: false,
          explanation: "No necesitamos estudios ficticios para empezar un ritual.",
        },
      ],
    },
  },
  {
    slug: "origen-guardianes",
    number: 5,
    title: "Origen: Huila, Santander y red",
    emoji: "◈",
    duration: "8 min",
    xp: 60,
    companionIntro:
      "Módulo 5: de dónde viene. CAÚA habla de Hobo (Huila), Landázuri (Santander) y una red de cacaocultores — con precio justo y cultivo bajo sombra.",
    companionMid:
      "Origen único no significa ‘un solo árbol mágico’. Significa lote y territorio declarados.",
    companionQuiz: "¿Qué orígenes declara CAÚA en su sitio?",
    companionComplete: "Ya anclas el cacao a territorio real. +60 XP",
    companionTips: [
      "Hobo, Huila · Híbrido Acriollado regenerativo bajo sombra.",
      "Landázuri, Santander · presente en Powder Lite y coberturas.",
      "Zurych trabaja con campesinos de Santander y mercados agroecológicos de Bogotá región.",
    ],
    cards: [
      {
        kicker: "Huila",
        headline: "Hobo · Híbrido Acriollado.",
        body: "CAÚA ubica su narrativa de origen único en Hobo, Huila: híbrido acriollado, cultivo bajo sombra, regenerativo. Coordenadas y storytelling de marca acompañan el ritual — siempre verifica el lote del SKU que compras.",
        highlight: { label: "origen destacado", value: "Hobo · Huila" },
      },
      {
        kicker: "Santander",
        headline: "Landázuri en coberturas y powder.",
        body: "Varios productos del catálogo declaran origen Santander / Landázuri. Zurych, nodo del Colab, también ancla su historia a campesinos de Santander y a una planta con enfoque de residuos y biodiversidad.",
        highlight: { label: "territorio aliado", value: "Landázuri · Santander" },
      },
      {
        kicker: "Red",
        headline: "Precio justo y sin pesticidas (claim de marca).",
        body: "CAÚA comunica precio justo directo a productores, cultivo sin pesticidas y QR de trazabilidad. Son compromisos de marca: Dualita te enseña a pedir evidencia de lote, no a repetir eslóganes.",
        highlight: { label: "preguntas útiles", value: "¿quién? ¿dónde? ¿qué lote?" },
      },
      {
        kicker: "Zurych",
        headline: "Economía circular y agroecología.",
        body: "Zurych se describe como empresa familiar, chocolatería artesanal, inclusión en mercados agroecológicos de Bogotá región, sin agroquímicos en cultivos y separación de residuos en planta. Eso alimenta el MOOC de contexto.",
        highlight: { label: "MOOC", value: "/aprende/mooc/zurych-territorio" },
      },
    ],
    quiz: {
      question: "¿Cuáles territorios aparecen de forma explícita en la narrativa CAÚA / Dualita?",
      options: [
        {
          id: "a",
          text: "Solo Suiza, porque el nombre suena a Zurich",
          correct: false,
          explanation: "CAÚA y Zurych son marcas colombianas; Zurych remite a Santander/Bogotá.",
        },
        {
          id: "b",
          text: "Hobo (Huila) y Landázuri / Santander, más red de cacaocultores",
          correct: true,
          explanation: "Correcto: así lo declaran sitio y catálogo.",
        },
        {
          id: "c",
          text: "Cinco departamentos inventados como ‘Guardianes’ sin fuente",
          correct: false,
          explanation: "Evitamos listas de regiones no respaldadas por la marca.",
        },
      ],
    },
  },
  {
    slug: "tu-operacion-cacao",
    number: 6,
    title: "Arma tu protocolo de 7 días",
    emoji: "▸",
    duration: "7 min",
    xp: 55,
    companionIntro:
      "Cierre: convierte lo aprendido en un protocolo de 7 días. Sin unit economics inventados ni promesas de margen.",
    companionMid:
      "Suscripción, pausa y cancelación flexible son parte del diseño CAÚA — úsalo a tu favor.",
    companionQuiz: "¿Qué hace realista un protocolo personal de cacao?",
    companionComplete: "Completaste el microlearning CAÚA. Ritual > ruido. +55 XP",
    companionTips: [
      "Empieza con 7 días, una porción, una hora fija.",
      "Guarda origen y % de cacao de lo que consumes.",
      "Si quieres oficio profesional, sigue a cacaotier / Master Chocolatier.",
    ],
    cards: [
      {
        kicker: "Plan 7 días",
        headline: "Una microvictoria al día.",
        body: "Día 1–2: elige formato (cubo CAÚA o nibs Zurych). Día 3–4: registra energía/sujeto (subjetivo). Día 5: lee la etiqueta completa. Día 6: identifica origen. Día 7: decide si continúas, pausas o cambias SKU.",
        highlight: { label: "duración", value: "7 días · 1 decisión final" },
      },
      {
        kicker: "Suscripción",
        headline: "Hábito con fricción baja.",
        body: "CAÚA vende el hábito con suscripción, envío y cancelación/pausa sin teatro. Dualita no te pide comprar: te pide entender el diseño de producto que sostiene un ritual.",
        highlight: { label: "diseño de hábito", value: "llega antes de que se acabe" },
      },
      {
        kicker: "Siguiente nivel",
        headline: "De consumidor a criterio profesional.",
        body: "Si tu meta es oficio (fermentación, bean-to-bar, Benevolo), este microlearning es la puerta. El MOOC Zurych da contexto territorial; Master Cacaotier/Chocolatier dan competencia.",
        highlight: { label: "rutas", value: "MOOC · Masters · Benevolo" },
      },
    ],
    quiz: {
      question: "¿Cuál es un cierre honesto del microlearning CAÚA?",
      options: [
        {
          id: "a",
          text: "Prometer +50 % de margen HoReCa sin datos",
          correct: false,
          explanation: "Evitamos unit economics inventados.",
        },
        {
          id: "b",
          text: "Completar un protocolo de 7 días con porción, origen y decisión de continuar",
          correct: true,
          explanation: "Exacto: hábito medible y claims sobrios.",
        },
        {
          id: "c",
          text: "Afirmar que cualquier cacao cura enfermedades",
          correct: false,
          explanation: "Fuera de alcance: educación alimentaria, no medicina.",
        },
      ],
    },
  },
]

export const lessonSlugs = lessons.map((l) => l.slug)
