/**
 * Chocolate Benevolo · marca acelerada cacaotier
 *
 * Output separado del Master Chocolatier (track 70 % CoEx/Awards).
 * Conecta tendencias (gianduja moderna, dulzor alternativo, snackable bars)
 * con el oficio del chocolatier y el FEAR 5 de Quara × Zurych.
 */

export const BENEVOLO_COURSE_SLUG = "benevolo-duja"

export type BenevoloMission = {
  number: string
  slug: string
  title: string
  duration: string
  xp: number
  summary: string
  trendLink: string
  steps: { kicker: string; title: string; body: string; fieldAction: string }[]
  quiz: {
    question: string
    options: { id: string; text: string; correct: boolean; explanation: string }[]
  }
}

export const benevoloFormulation = {
  name: "Bars. · Chocolate Benevolo",
  category: "Duja de Marañón sugar free",
  netWeight: "80 g",
  style: "Duja de Marañón sugar free · chocolatina de leche",
  inspiration: "Gianduja italiana reinterpretada con marañón colombiano, sin azúcar añadida",
  cacao: {
    genotype: "FEAR 5",
    node: "Quara Cacao",
    place: "Tame · Arauca",
    process: "Fermentación controlada documentada (ruta Master Cacaotier)",
  },
  ingredients: [
    "Licor / masa de cacao FEAR 5",
    "Duja de marañón local",
    "Leche en polvo orgánica",
    "Alulosa",
    "Stevia",
  ],
  targets: [
    { label: "Categoría", value: "Duja de Marañón sugar free" },
    { label: "Lectura de origen", value: "FEAR 5 perceptible tras la duja" },
    { label: "Textura", value: "Duja sedosa, sin arenilla" },
    { label: "Dulzor", value: "Alulosa + stevia · sugar free, sin enmascarar" },
    { label: "Formato", value: "Bars. 80 g · preventa" },
  ],
  partners: [
    { name: "cacaotier", role: "Marca acelerada · edutainment" },
    { name: "Zurych", role: "Transformación y oficio" },
    { name: "Quara Cacao", role: "Nodo FEAR 5 · Arauca" },
    { name: "Master Chocolatier", role: "Oficio 70 % CoEx que alimenta la marca" },
  ],
  trends: [
    {
      title: "Gianduja reinventada",
      body: "La tendencia global de nut-spreads premium se traduce aquí en duja de marañón con origen legible — no praliné genérico.",
    },
    {
      title: "Dulzor moderno",
      body: "Alulosa + stevia: snackable y contemporáneo sin tapar tipicidad FEAR 5.",
    },
    {
      title: "Bars. de mesa y bolsillo",
      body: "80 g como formato de deseo y preorden: aceleración de marca, no solo medalla de panel.",
    },
  ],
}

export const benevoloMissions: BenevoloMission[] = [
  {
    number: "01",
    slug: "tendencia-gianduja",
    title: "Tendencia × territorio",
    duration: "10 min",
    xp: 80,
    summary:
      "Lee la tendencia gianduja/nut-butter premium y ancla el marañón + FEAR 5 como respuesta Colab — no como copia industrial.",
    trendLink: "Gianduja moderna y snacks de nuez con origen",
    steps: [
      {
        kicker: "Tendencia",
        title: "El mundo pide nuez + cacao con historia.",
        body: "La gianduja y los spreads premium crecen porque el consumidor quiere indulgencia con identidad. Benevolo responde con marañón local y FEAR 5 Quara — no con pasta anónima.",
        fieldAction: "Escribe en una frase: ¿qué tendencia global atiende Benevolo?",
      },
      {
        kicker: "Territorio",
        title: "Zurych × Quara en la misma barra.",
        body: "La marca acelerada conecta transformación (Zurych) y genética de nodo (Quara). Sin ese puente, es solo marketing de duja.",
        fieldAction: "Declara el rol de cada aliado en la ficha Bars.",
      },
      {
        kicker: "Chocolatier",
        title: "El oficio 70 % alimenta la marca.",
        body: "Master Chocolatier entrena la barra 70 % estilo CoEx/Awards. Benevolo toma ese criterio de origen y lo traduce a formato leche + duja deseable. Son rutas hermanas, no el mismo capstone.",
        fieldAction: "Diferencia en 2 líneas: track 70 % vs marca Benevolo.",
      },
    ],
    quiz: {
      question: "¿Qué hace de Benevolo una marca acelerada y no el capstone del Master Chocolatier?",
      options: [
        {
          id: "a",
          text: "Es la misma barra 70 % CoEx con otro empaque",
          correct: false,
          explanation: "El Master Chocolatier apunta a 70 % dark estilo Awards; Benevolo es duja/leche como output de marca.",
        },
        {
          id: "b",
          text: "Traduce criterio de origen a un producto tendencia (duja) con aliados y preorden",
          correct: true,
          explanation: "Correcto: aceleración de marca conectada al oficio, no medalla fingida.",
        },
        {
          id: "c",
          text: "Solo existe para atribuir medalla CoEx a la SKU",
          correct: false,
          explanation: "Nunca atribuimos medalla sin evidencia.",
        },
      ],
    },
  },
  {
    number: "02",
    slug: "formulacion-duja",
    title: "Formulación duja de marañón",
    duration: "14 min",
    xp: 120,
    summary:
      "Tres ratios licor FEAR 5 / duja / leche orgánica; dulzor alulosa+stevia sin tapar origen.",
    trendLink: "Formulación moderna de inclusion bars",
    steps: [
      {
        kicker: "Ratio",
        title: "Tres fórmulas, un lote.",
        body: "Prueba balances licor FEAR 5 / duja de marañón / leche en polvo orgánica. Mantén el perfil del licor; cambia solo la inclusión.",
        fieldAction: "Matriz A/B/C con % cacao, % duja, % leche.",
      },
      {
        kicker: "Dulzor",
        title: "Alulosa + stevia sin maquillaje.",
        body: "El dulzor sostiene leche y duja sin tapar tipicidad ni dejar pico metálico. Documenta 0 / 30 / 60 s.",
        fieldAction: "Nota: dulzor pico · retrogusto · ¿se lee el cacao?",
      },
      {
        kicker: "Decisión",
        title: "Gana la que deja leer ambos.",
        body: "FEAR 5 y marañón juntos, textura sedosa, cero defectos. Si solo sabes a dulce o solo a nuez, descarta.",
        fieldAction: "Declara el ratio ganador y por qué sobrevive a cata ciega.",
      },
    ],
    quiz: {
      question: "¿Cuándo falla la duja Benevolo el criterio de origen?",
      options: [
        {
          id: "a",
          text: "Cuando el marañón se nota junto al FEAR 5",
          correct: false,
          explanation: "Eso es el objetivo de la formulación.",
        },
        {
          id: "b",
          text: "Cuando la inclusión tapa el origen o introduce defectos",
          correct: true,
          explanation: "Tendencia no absuelve pérdida de tipicidad.",
        },
        {
          id: "c",
          text: "Cuando usa alulosa en lugar de azúcar blanca",
          correct: false,
          explanation: "Válido si no enmascara.",
        },
      ],
    },
  },
  {
    number: "03",
    slug: "aceleracion-preorden",
    title: "Aceleración · preorden y colectivo",
    duration: "10 min",
    xp: 100,
    summary:
      "Ficha Bars. 80 g, claims honestos y CTA de preorden. Invita a la generación a sumarse al Colab.",
    trendLink: "Preventa como prueba de demanda",
    steps: [
      {
        kicker: "Ficha",
        title: "Evidencia arriba, deseo abajo.",
        body: "Documenta Bars. 80 g: FEAR 5 Quara, duja, leche orgánica, alulosa, stevia. Sin medalla CoEx atribuida.",
        fieldAction: "Completa ficha: ingredientes · origen · formato · honestidad.",
      },
      {
        kicker: "Mercado",
        title: "Preorden = señal, no inventario fingido.",
        body: "WhatsApp/preventa mide deseo real. Benevolo acelera marca mientras el lote se cierra con rigor de finca y chocolatería.",
        fieldAction: "Escribe 2 claims permitidos y 1 prohibido.",
      },
      {
        kicker: "Generación",
        title: "Trae a alguien al colectivo.",
        body: "La aceleración es colaborativa: Sembrar, Master 70 % y Benevolo son puertas al mismo Colab. Invita a un par.",
        fieldAction: "CTA: /benevolo · /unete · /aprende/chocolatier",
      },
    ],
    quiz: {
      question: "¿Qué afirmación es honesta para Chocolate Benevolo?",
      options: [
        {
          id: "a",
          text: "Ganó medalla Cacao of Excellence",
          correct: false,
          explanation: "Usamos lente/criterio; no atribuimos medalla a la SKU.",
        },
        {
          id: "b",
          text: "Marca acelerada cacaotier: duja FEAR 5 Quara × Zurych en preventa, con criterio de origen",
          correct: true,
          explanation: "Correcto: evidencia + tendencia sin sellos inventados.",
        },
        {
          id: "c",
          text: "Checkout con stock confirmado disponible hoy",
          correct: false,
          explanation: "Aún es preorden.",
        },
      ],
    },
  },
]

export const benevoloTotalXp = benevoloMissions.reduce((t, m) => t + m.xp, 0)
