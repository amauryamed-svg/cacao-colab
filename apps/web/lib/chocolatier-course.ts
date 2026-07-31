/**
 * Master Chocolatier · formulaciones bean-to-bar a la altura de Cacao of Excellence.
 * Output capstone: Chocolate Benevolo Bars. (FEAR 5 · duja de marañón).
 *
 * Syllabus público en /aprende/chocolatier
 * Campaña Dualita en /campus/maestro-chocolatier
 */

export type ChocolatierStep = {
  kicker: string
  title: string
  body: string
  fieldAction: string
}

export type ChocolatierMission = {
  number: string
  slug: string
  title: string
  duration: string
  xp: number
  skill: string
  summary: string
  coexLens: string
  practice: string
  dualitaIntro: string
  dualitaSuccess: string
  steps: ChocolatierStep[]
  quiz: {
    question: string
    options: { id: string; text: string; correct: boolean; explanation: string }[]
  }
}

export const CHOCOLATIER_COURSE_SLUG = "maestro-chocolatier"

export const chocolatierMissions: ChocolatierMission[] = [
  {
    number: "01",
    slug: "leer-el-grano",
    title: "Leer el grano FEAR 5",
    duration: "8 min",
    xp: 90,
    skill: "Materia prima + trazabilidad",
    summary:
      "Declara nodo, genotipo, fermentación, secado y defectos antes de tostar. El FEAR 5 de Quara (Tame · Arauca) es el material de referencia del Colab.",
    coexLens:
      "En Cacao of Excellence la muestra se juzga ciega: tu bitácora debe poder sostener el mismo rigor aunque el panel no vea la marca.",
    practice: "Ficha de lote: Quara / FEAR 5 / horas de fermentación / humedad / defectos / código de muestra.",
    dualitaIntro:
      "Antes de tostar, el grano ya habla. Vamos a leer FEAR 5 de Quara como un panel CoEx leería la muestra: sin storytelling, con evidencia.",
    dualitaSuccess:
      "Ya tienes un lote con identidad. Sin ficha de grano, Benevolo sería solo empaque.",
    steps: [
      {
        kicker: "Origen",
        title: "Declara el nodo antes del deseo.",
        body: "Quara Cacao (Tame · Arauca) es el nodo FEAR 5 del Colab. Anota genotipo, cosecha, masa, remoción de pulpa y código de muestra. CoEx no ve tu logo: ve tu grano.",
        fieldAction: "Código de lote: Quara–FEAR5–fecha–réplica.",
      },
      {
        kicker: "Poscosecha",
        title: "Fermentación y secado son parte de la fórmula.",
        body: "Registra horas de fermentación, régimen (cajón/tanque/biorreactor), humedad final y defectos visibles. Un FEAR 5 mal fermentado no se salva con gianduja.",
        fieldAction: "Completa humedad, defectos y ventana de corte en la ficha.",
      },
      {
        kicker: "Entrada a tostión",
        title: "Solo avanza grano defendible.",
        body: "Si hay moho, humo, podrido o insectos, detente. Tipicidad solo cuenta sobre una base limpia. Documenta por qué este lote entra a Master Chocolatier.",
        fieldAction: "Firma el gate de entrada: limpio / tipicidad esperada / listo para tostar.",
      },
    ],
    quiz: {
      question: "¿Qué hace defendible un lote FEAR 5 ante un panel ciego?",
      options: [
        {
          id: "a",
          text: "Contar la historia de marca antes de medir defectos",
          correct: false,
          explanation: "El panel no ve la marca. La evidencia del grano va primero.",
        },
        {
          id: "b",
          text: "Documentar nodo, genotipo, fermentación, humedad y defectos",
          correct: true,
          explanation: "Exacto: trazabilidad y limpieza sostienen tipicidad.",
        },
        {
          id: "c",
          text: "Tostar más fuerte para ocultar astringencia",
          correct: false,
          explanation: "La tostión no absuelve defectos de poscosecha.",
        },
      ],
    },
  },
  {
    number: "02",
    slug: "perfil-de-tostion",
    title: "Diseñar la tostión",
    duration: "10 min",
    xp: 110,
    skill: "Tostión + precursores",
    summary:
      "La tostión no inventa Fine-Flavor: revela lo que la fermentación dejó. Trabaja curvas cortas vs. desarrolladas y documenta color, aroma y pérdida de peso.",
    coexLens:
      "Los paneles de excelencia castigan humo, crudo y quemado. Busca claridad frutal/nuez antes de complejidad forzada.",
    practice: "Dos curvas sobre el mismo lote FEAR 5; conserva testigo y registra delta de humedad.",
    dualitaIntro:
      "La tostión es un revelador, no un maquillaje. Vamos a diseñar curvas que dejen leer FEAR 5.",
    dualitaSuccess:
      "Ya separas revelar precursores de quemar evidencia. Benevolo necesita claridad, no humo.",
    steps: [
      {
        kicker: "Intención",
        title: "Define qué quieres revelar.",
        body: "Fruta, nuez o cacao limpio no aparecen por milagro. Parte del perfil fermentado y elige una curva corta (más frutal/acidez viva) o desarrollada (más cuerpo/nuez) sin cruzar a humo.",
        fieldAction: "Escribe la intención sensorial en una frase antes de encender.",
      },
      {
        kicker: "Dos curvas",
        title: "Compara sin cambiar el lote.",
        body: "Corre dos perfiles sobre el mismo FEAR 5. Conserva testigo crudo/tostado, peso inicial/final y notas de aroma a mitad y al final. Un solo ensayo no enseña.",
        fieldAction: "Tabla: curva A vs B · delta humedad · aroma dominante.",
      },
      {
        kicker: "Defectos de calor",
        title: "Crudo y quemado descalifican.",
        body: "CoEx castiga humo, crudo extremo y quemado. Si la curva tapa el origen, perdiste tipicidad. Elige la curva que deja leer FEAR 5 con limpieza.",
        fieldAction: "Descarta cualquier corrida con humo o carbonización local.",
      },
    ],
    quiz: {
      question: "¿Cuál es el criterio correcto al elegir una curva de tostión para FEAR 5?",
      options: [
        {
          id: "a",
          text: "La que genere más ‘complejidad’ aunque haya notas de humo",
          correct: false,
          explanation: "Humo es defecto no negociable.",
        },
        {
          id: "b",
          text: "La que revela tipicidad limpia del genotipo sin defectos de calor",
          correct: true,
          explanation: "Correcto: claridad antes que espectáculo.",
        },
        {
          id: "c",
          text: "La más larga siempre, porque más tiempo = más Fine-Flavor",
          correct: false,
          explanation: "Más tiempo puede quemar precursores y tipicidad.",
        },
      ],
    },
  },
  {
    number: "03",
    slug: "licor-y-refino",
    title: "Licor, refino y textura",
    duration: "12 min",
    xp: 120,
    skill: "Proceso bean-to-bar",
    summary:
      "Del nib al licor: tamaño de partícula, viscosidad y tiempo de conchado. Define un protocolo repetible antes de formular inclusiones.",
    coexLens:
      "La excelencia sensorial exige limpieza técnica. Un buen FEAR 5 mal refinado se lee como astringencia o grasa sucia.",
    practice: "Licor 100 % FEAR 5 con tiempo, temperatura y finura documentados.",
    dualitaIntro:
      "Sin licor limpio no hay duja noble. Protocolo primero; marañón después.",
    dualitaSuccess:
      "Ya tienes un licor 100 % FEAR 5 repetible. Esa es la base de Benevolo.",
    steps: [
      {
        kicker: "Nib → licor",
        title: "Controla lo que mueles.",
        body: "Descascara, separa cáscara y define carga. Registra temperatura de molino, tiempo y finura objetivo. Un licor sucio arrastra astringencia a toda la barra.",
        fieldAction: "Protocolo mínimo: carga, °C, minutos, finura percibida.",
      },
      {
        kicker: "Refino",
        title: "Textura es evidencia táctil.",
        body: "Busca sedosidad sin arenilla. Si el tamaño de partícula queda alto, la duja de marañón amplificará el defecto. Refina hasta que el licor sea el estándar de la casa.",
        fieldAction: "Prueba de lengua: sin arenilla · sin grasa sucia · aroma limpio.",
      },
      {
        kicker: "Testigo",
        title: "Guarda un 100 % antes de formular.",
        body: "Conserva licor testigo FEAR 5. Toda inclusión (leche, duja, alulosa) se juzga contra ese control. Sin testigo no sabes qué tapó la fórmula.",
        fieldAction: "Etiqueta testigo: lote · curva · fecha · finura.",
      },
    ],
    quiz: {
      question: "¿Por qué guardar un licor 100 % FEAR 5 antes de la duja?",
      options: [
        {
          id: "a",
          text: "Porque la leche siempre mejora cualquier defecto",
          correct: false,
          explanation: "La leche puede enmascarar, no justificar, defectos.",
        },
        {
          id: "b",
          text: "Para comparar tipicidad y detectar si la fórmula tapa el origen",
          correct: true,
          explanation: "Exacto: el testigo es tu control CoEx-interno.",
        },
        {
          id: "c",
          text: "Solo por marketing de bean-to-bar",
          correct: false,
          explanation: "Es una necesidad técnica de control de calidad.",
        },
      ],
    },
  },
  {
    number: "04",
    slug: "sensorial-coex",
    title: "Panel a la altura COEX",
    duration: "10 min",
    xp: 100,
    skill: "Sensorial + vocabulario",
    summary:
      "Entrena descriptores (fruta, nuez, floral, especias, defectos) y prueba ciega. Separa preferencia personal de evidencia de calidad.",
    coexLens:
      "Cacao of Excellence premia tipicidad y ausencia de defectos, no el storytelling. Tu ficha debe sobrevivir sin logo.",
    practice: "Cata ciega de tres licores; escribe perfil y ranking justificado.",
    dualitaIntro:
      "Vas a catar como si no supieras que es Quara. Preferencia ≠ calidad.",
    dualitaSuccess:
      "Ya separas ‘me gusta’ de ‘es limpio y típico’. Ese músculo sostiene Benevolo.",
    steps: [
      {
        kicker: "Léxico",
        title: "Nombra con precisión.",
        body: "Entrena fruta, nuez, floral, especias, cacao, acidez, astringencia y defectos (humo, moho, podrido, crudo). Evita adjetivos vacíos como ‘premium’ o ‘especial’.",
        fieldAction: "Elige 5 descriptores permitidos para tu panel de casa.",
      },
      {
        kicker: "Ciego",
        title: "Quita la marca de la mesa.",
        body: "Cata tres licores o barras sin etiquetas. Rankea por limpieza y tipicidad, no por historia. Si no puedes justificar el ranking, tu ficha no sobrevive a CoEx.",
        fieldAction: "Ranking 1–2–3 con una frase de justificación cada uno.",
      },
      {
        kicker: "Defectos",
        title: "Cero negociaciones.",
        body: "Un defecto descalifica aunque el origen sea noble. Documenta umbral de rechazo del laboratorio Colab: humo, moho, podrido, insecto, quemado.",
        fieldAction: "Escribe la política de rechazo en dos líneas.",
      },
    ],
    quiz: {
      question: "En un panel estilo CoEx, ¿qué pesa más?",
      options: [
        {
          id: "a",
          text: "La narrativa de la finca y el empaque",
          correct: false,
          explanation: "El panel es ciego a la marca.",
        },
        {
          id: "b",
          text: "Tipicidad limpia y ausencia de defectos",
          correct: true,
          explanation: "Correcto: calidad sensorial defendible.",
        },
        {
          id: "c",
          text: "Que el chocolatier prefiera personalmente esa muestra",
          correct: false,
          explanation: "Preferencia personal no sustituye evidencia.",
        },
      ],
    },
  },
  {
    number: "05",
    slug: "formulacion-duja",
    title: "Formulación duja de marañón",
    duration: "14 min",
    xp: 140,
    skill: "Gianduja + innovación",
    summary:
      "Hibrida la cultura italiana de la gianduja con marañón local: proporción cacao/nuez/leche, dulzor con alulosa y stevia, y textura de duja sin enmascarar el FEAR 5.",
    coexLens:
      "La innovación no disculpa defectos. Si la duja tapa el origen, perdiste el punto Fine-Flavor.",
    practice: "Tres ratios de duja; elige el que deja leer FEAR 5 y marañón a la vez.",
    dualitaIntro:
      "Gianduja italiana, marañón colombiano. La duja debe dejar hablar al FEAR 5.",
    dualitaSuccess:
      "Encontraste un ratio donde origen y marañón conviven. Eso es Benevolo en potencia.",
    steps: [
      {
        kicker: "Ratio",
        title: "Tres fórmulas, un lote.",
        body: "Prueba tres balances licor FEAR 5 / duja de marañón / leche en polvo orgánica. Mantén constante el proceso del licor. Cambia solo la proporción de inclusión.",
        fieldAction: "Matriz A/B/C con % cacao, % duja, % leche.",
      },
      {
        kicker: "Dulzor",
        title: "Alulosa + stevia sin maquillaje.",
        body: "El dulzor debe sostener la leche y la duja sin tapar tipicidad. Evita picos metálicos o vacío dulce. Documenta percepción a 0, 30 y 60 segundos.",
        fieldAction: "Nota: dulzor pico · retrogusto · ¿se lee el cacao?",
      },
      {
        kicker: "Decisión",
        title: "Elige la que deja leer ambos.",
        body: "Gana el ratio donde FEAR 5 y marañón se perciben juntos, con textura sedosa y sin defectos. Si solo sabes a dulce o solo a nuez, descarta.",
        fieldAction: "Declara el ratio ganador y por qué sobrevive a cata ciega.",
      },
    ],
    quiz: {
      question: "¿Cuándo una duja de marañón falla el criterio Fine-Flavor?",
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
          explanation: "Innovación no absuelve pérdida de tipicidad ni defectos.",
        },
        {
          id: "c",
          text: "Cuando usa alulosa en lugar de azúcar blanca",
          correct: false,
          explanation: "El dulzor alternativo es válido si no enmascara.",
        },
      ],
    },
  },
  {
    number: "06",
    slug: "benevolo-capstone",
    title: "Capstone · Chocolate Benevolo",
    duration: "16 min",
    xp: 160,
    skill: "Producto + mercado",
    summary:
      "Entrega Bars. 80 g: leche en polvo orgánica, alulosa, stevia, duja de marañón y FEAR 5. Alianza Zurych × Quara. Preorden como prueba de demanda real.",
    coexLens:
      "El output Master Chocolatier debe poder explicarse a un panel COEX y a un consumidor: evidencia arriba, deseo abajo.",
    practice: "Ficha de producto + claim honestos + CTA de preorden Benevolo.",
    dualitaIntro:
      "Capstone: convierte evidencia en producto deseable. Benevolo sin tilde; Chocolate Benevolo le pone las tildes a la e.",
    dualitaSuccess:
      "Credencial lista. Ahora tu output tiene ficha, claims honestos y un canal de preorden real.",
    steps: [
      {
        kicker: "Ficha",
        title: "Producto con evidencia arriba.",
        body: "Documenta Bars. 80 g: FEAR 5 Quara, duja de marañón, leche orgánica, alulosa, stevia. Alianza Zurych × Quara. Declara lo que está listo y lo que no (sin medalla CoEx atribuida).",
        fieldAction: "Completa ficha: ingredientes · origen · formato · honestidad CoEx.",
      },
      {
        kicker: "Claims",
        title: "Deseo abajo, sin inventar sellos.",
        body: "Benevolo se lee igual en español e italiano. Puedes hablar de lente CoEx, no de premio ganado. Preventa WhatsApp es prueba de demanda, no inventario fingido.",
        fieldAction: "Escribe 2 claims permitidos y 1 claim prohibido.",
      },
      {
        kicker: "Mercado",
        title: "Cierra el círculo Colab.",
        body: "El capstone conecta campus → nodo → mesa. Comparte la página Benevolo o el CTA de preorden. La aceleración se mide en interés real, no solo en XP.",
        fieldAction: "Abre /benevolo y registra tu CTA de salida (preorden o ficha).",
      },
    ],
    quiz: {
      question: "¿Qué afirmación es honesta para Chocolate Benevolo?",
      options: [
        {
          id: "a",
          text: "Ganó medalla Cacao of Excellence",
          correct: false,
          explanation: "Usamos lente CoEx; no atribuimos medalla a la SKU.",
        },
        {
          id: "b",
          text: "Formulación bean-to-bar FEAR 5 Quara × Zurych en preventa, con criterios estilo CoEx",
          correct: true,
          explanation: "Correcto: evidencia + deseo sin sellos inventados.",
        },
        {
          id: "c",
          text: "Checkout con stock confirmado disponible hoy",
          correct: false,
          explanation: "Aún es preorden; no se simula inventario.",
        },
      ],
    },
  },
]

export const benevoloFormulation = {
  name: "Bars. · Chocolate Benevolo",
  netWeight: "80 g",
  style: "Chocolatina de leche con duja de marañón",
  inspiration: "Gianduja italiana reinterpretada con marañón colombiano",
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
    { label: "Lectura de origen", value: "FEAR 5 perceptible tras la duja" },
    { label: "Textura", value: "Duja sedosa, sin arenilla" },
    { label: "Dulzor", value: "Alulosa + stevia, sin enmascarar" },
    { label: "Formato", value: "Bars. 80 g · preventa" },
  ],
  partners: [
    { name: "Zurych", role: "Cultura de transformación bean-to-bar" },
    { name: "Quara Cacao", role: "Nodo FEAR 5 · Arauca" },
    { name: "Master Chocolatier", role: "Formulación y output de aceleración" },
  ],
}

export const chocolatierTotalXp = chocolatierMissions.reduce((total, mission) => total + mission.xp, 0)

/** Principios didácticos inspirados en Cacao of Excellence (cacaoofexcellence.org). No implican premio ni afiliación. */
export const coexPrinciples = [
  {
    title: "Ciego primero",
    body: "Evalúa grano y chocolate sin depender de la marca. CoEx juzga la muestra, no el pitch.",
  },
  {
    title: "Defectos no se negocian",
    body: "Humo, moho, podrido, crudo extremo o astringencia sucia descalifican aunque el origen sea noble.",
  },
  {
    title: "Tipicidad con limpieza",
    body: "Fruta, nuez, floral o especias solo cuentan si la base está limpia y la técnica no tapa el genotipo.",
  },
  {
    title: "Trazabilidad defendible",
    body: "Nodo, clon, fermentación y tostión deben poder reconstruirse. Benevolo declara Quara × FEAR 5.",
  },
]

export const coexOfficialUrl = "https://www.cacaoofexcellence.org/"

export const chocolatierCompanionTips = [
  "Lente CoEx ≠ medalla CoEx. Nunca atribuyas un premio a Benevolo sin evidencia.",
  "El XP mide avance educativo; la ficha de lote y la cata ciega demuestran criterio.",
  "Si la duja tapa el FEAR 5, la fórmula falló aunque sepa ‘rica’.",
]
