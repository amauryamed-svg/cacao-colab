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
    title: "Licor, refino y conchado",
    duration: "14 min",
    xp: 120,
    skill: "Proceso bean-to-bar",
    summary:
      "Del nib al licor: finura de partícula, ventanas de refino, tiempos de conchado y viscosidad. Protocolo repetible antes de bombonería o duja.",
    coexLens:
      "La excelencia sensorial exige limpieza técnica. Un FEAR 5 Fedecacao mal refinado se lee como astringencia o grasa sucia — el panel CoEx no perdona textura sucia.",
    practice: "Licor 100 % FEAR 5 con °C, minutos de refino/conchado y finura documentados.",
    dualitaIntro:
      "Sin licor limpio no hay duja ni bombón noble. Tiempos y finura primero; marañón después.",
    dualitaSuccess:
      "Ya tienes un licor 100 % FEAR 5 repetible. Esa es la base de Benevolo y de cualquier fórmula moderna.",
    steps: [
      {
        kicker: "Nib → licor",
        title: "Controla lo que mueles.",
        body: "Descascara, separa cáscara y define carga. Registra temperatura de molino, tiempo y finura objetivo. Un licor sucio arrastra astringencia a barra y a bombón.",
        fieldAction: "Protocolo mínimo: carga, °C, minutos, finura percibida.",
      },
      {
        kicker: "Refino",
        title: "Ventana de finura, no superstición.",
        body: "Busca sedosidad sin arenilla. En laboratorio Colab documentamos tiempo de refino y prueba de lengua; no inventamos micrones de máquina si no los mides. Si la partícula queda alta, la duja amplifica el defecto.",
        fieldAction: "Bitácora: minutos de refino · °C · prueba lengua (sin arenilla / grasa sucia).",
      },
      {
        kicker: "Conchado",
        title: "Tiempo que redondea, no que borra el origen.",
        body: "El conchado volatiliza ácidos indeseables y redondea textura. Demasiado corto deja aristas; demasiado largo puede aplanar tipicidad FEAR 5. Define una ventana de casa (p. ej. correlacionada a tu molino) y no la alargues ‘por si acaso’.",
        fieldAction: "Declara ventana de conchado A/B y aroma a mitad/final.",
      },
      {
        kicker: "Fedecacao × CoEx",
        title: "Genética de referencia, panel ciego.",
        body: "FEAR 5 es Trinitario comercial Fedecacao — material de referencia del Colab. Eso no es medalla: es genotipo. El nivel CoEx se gana en limpieza y tipicidad del licor, no en el nombre del clon.",
        fieldAction: "Ficha: Fedecacao FEAR 5 · lote · refino · conchado · listo para panel.",
      },
      {
        kicker: "Testigo",
        title: "Guarda un 100 % antes de formular.",
        body: "Conserva licor testigo FEAR 5. Toda inclusión (leche, duja, bombón, alulosa) se juzga contra ese control. Sin testigo no sabes qué tapó la fórmula.",
        fieldAction: "Etiqueta testigo: lote · curva · refino · conchado · fecha.",
      },
    ],
    quiz: {
      question: "¿Qué documenta un protocolo serio de refino/conchado antes de formular?",
      options: [
        {
          id: "a",
          text: "Solo el nombre del molino y un claim de ‘bean-to-bar artesanal’",
          correct: false,
          explanation: "Sin tiempos, °C y prueba de finura no hay protocolo.",
        },
        {
          id: "b",
          text: "Tiempos/°C de refino y conchado, finura percibida y licor testigo 100 %",
          correct: true,
          explanation: "Exacto: repetibilidad + control para CoEx-interno.",
        },
        {
          id: "c",
          text: "Conchar el máximo posible para borrar el origen Fedecacao",
          correct: false,
          explanation: "Aplanar tipicidad destruye el punto Fine-Flavor.",
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
    title: "Formulaciones modernas y bombonería",
    duration: "16 min",
    xp: 140,
    skill: "Gianduja + bombón + innovación",
    summary:
      "Duja de marañón, ratios modernos (alulosa/stevia) y puerta a bombonería: inclusión sin tapar FEAR 5. Innovar sin rendirse al chocolate genérico de industria.",
    coexLens:
      "La innovación no disculpa defectos. Si duja o ganache tapan el origen, perdiste Fine-Flavor — aunque el bombón ‘brille’ en vitrina.",
    practice: "Tres ratios de duja + un brief de bombón que deje leer FEAR 5.",
    dualitaIntro:
      "Gianduja, marañón, bombón. La fórmula moderna debe dejar hablar al FEAR 5 — no sustituirlo por dulzor industrial.",
    dualitaSuccess:
      "Encontraste ratios y un brief de bombonería donde origen y oficio conviven. Benevolo en potencia.",
    steps: [
      {
        kicker: "Ratio",
        title: "Tres fórmulas, un lote.",
        body: "Prueba tres balances licor FEAR 5 / duja de marañón / leche en polvo orgánica. Mantén constante el perfil del licor. Cambia solo la proporción de inclusión.",
        fieldAction: "Matriz A/B/C con % cacao, % duja, % leche.",
      },
      {
        kicker: "Dulzor moderno",
        title: "Alulosa + stevia sin maquillaje.",
        body: "Las formulaciones modernas pueden bajar azúcar refinada. El dulzor debe sostener leche y duja sin tapar tipicidad ni dejar pico metálico. Documenta percepción a 0, 30 y 60 s.",
        fieldAction: "Nota: dulzor pico · retrogusto · ¿se lee el cacao?",
      },
      {
        kicker: "Bombonería",
        title: "Ganache y cáscara al servicio del origen.",
        body: "Un bombón Fine-Flavor declara el licor o la cobertura de origen; no esconde un cacao mediocre bajo praliné ruidoso. Define cáscara (cobertura FEAR 5 o aliada), ganache y proporción para que el primer y segundo mordisco lean tipicidad.",
        fieldAction: "Brief de bombón: cáscara · ganache · % origen · claim honesto.",
      },
      {
        kicker: "Decisión",
        title: "Elige la que deja leer ambos.",
        body: "Gana el ratio (y el brief) donde FEAR 5 y marañón se perciben juntos, con textura sedosa y sin defectos. Si solo sabes a dulce o solo a nuez, descarta.",
        fieldAction: "Declara ratio ganador + brief bombón y por qué sobreviven a cata ciega.",
      },
    ],
    quiz: {
      question: "¿Cuándo una formulación moderna o un bombón falla el criterio Fine-Flavor?",
      options: [
        {
          id: "a",
          text: "Cuando el marañón o la ganache se notan junto al FEAR 5",
          correct: false,
          explanation: "Eso puede ser el objetivo si el origen sigue legible.",
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
    title: "Capstone · Benevolo y la generación Colab",
    duration: "18 min",
    xp: 160,
    skill: "Producto + postura + colectivo",
    summary:
      "Entrega Bars. 80 g Benevolo y toma postura frente al grown chocolate industrial que amenaza el cacao de especialidad. Invita a la nueva generación a competir en colectivo con Cacao Colab.",
    coexLens:
      "El output Master Chocolatier se explica a un panel CoEx y a un consumidor: evidencia arriba, deseo abajo — sin disfrazar commodity con storytelling de origen falso.",
    practice: "Ficha Benevolo + claims honestos + manifiesto anti–grown chocolate + CTA al Colab.",
    dualitaIntro:
      "Capstone: producto deseable y voz de generación. Benevolo sin tilde; ustedes ponen las tildes al oficio.",
    dualitaSuccess:
      "Credencial lista: ficha, postura y un llamado al colectivo. El cacao de especialidad se defiende en red.",
    steps: [
      {
        kicker: "Ficha",
        title: "Producto con evidencia arriba.",
        body: "Documenta Bars. 80 g: FEAR 5 Quara, duja de marañón, leche orgánica, alulosa, stevia. Alianza Zurych × Quara. Declara lo listo y lo que no (sin medalla CoEx atribuida).",
        fieldAction: "Completa ficha: ingredientes · origen · formato · honestidad CoEx.",
      },
      {
        kicker: "Postura",
        title: "Grown chocolate no es nuestro norte.",
        body: "La industria empuja cacao ‘crecido’ a escala que aplana tipicidad, desconecta finca y mesa, y educa paladares a dulzor genérico. Eso amenaza el cacao de especialidad como lo conocemos. Tu postura Colab: origen legible, genética Fedecacao/clones con bitácora, fermentación y formulación que no borren el territorio.",
        fieldAction: "Escribe 3 líneas: qué rechazas del grown chocolate y qué defiendes.",
      },
      {
        kicker: "Generación",
        title: "Habla a quien hereda la tierra y el oficio.",
        body: "Chocolateros y agricultores que vienen: no compitan solos. Sembrar (Ecoyuma), fermentar (Cacaotier) y formular (Chocolatier) son una misma aceleración. El Colab es la red donde el sibarismo con criterio se vuelve competitividad colectiva.",
        fieldAction: "Redacta tu invitación a un par de tu generación (5 líneas).",
      },
      {
        kicker: "Colectivo",
        title: "Cierra el círculo en Cacao Colab.",
        body: "Comparte Benevolo, entra a /unete o trae a alguien al campus. La aceleración se mide en interés real y en manos que siembran y formulan juntas — no solo en XP.",
        fieldAction: "CTA de salida: /benevolo · /unete · /aprende · Sembrar (/juega).",
      },
    ],
    quiz: {
      question: "¿Cuál es la postura Colab frente al grown chocolate industrial?",
      options: [
        {
          id: "a",
          text: "Adoptarlo porque escala más barato y el origen ya no importa",
          correct: false,
          explanation: "Eso aplana tipicidad y amenaza la especialidad.",
        },
        {
          id: "b",
          text: "Defender origen legible, oficio y colectivo frente al cacao genérico que borra territorio",
          correct: true,
          explanation: "Correcto: especialidad + generación + Cacao Colab.",
        },
        {
          id: "c",
          text: "Atribuir medalla CoEx a cualquier barra con FEAR 5 en el empaque",
          correct: false,
          explanation: "Lente CoEx ≠ medalla; no inventamos premios.",
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

/** Postura pública Master Chocolatier frente al cacao genérico de escala industrial. */
export const grownChocolateStance = {
  title: "Nuestra postura frente al grown chocolate",
  lede: "El cacao de especialidad no es nostalgia: es competitividad con tipicidad. Cuando la industria educa el paladar a un chocolate genérico ‘crecido’ a escala, se borra el territorio — y con él la razón de que nuevas generaciones hereden la tierra con orgullo.",
  reject: [
    "Origen decorativo sin bitácora de lote",
    "Formulaciones que tapan defecto con dulzor y grasa",
    "Escala que sacrifica tipicidad Fedecacao / Fine-Flavor por commodity",
  ],
  defend: [
    "Genética y vivero con criterio (Ecoyuma · FEAR 5 / TCS)",
    "Fermentación y conchado documentados, panel estilo CoEx",
    "Bombonería y barras que dejan leer el cacao",
    "Colectivo Cacao Colab: finca + oficio + marca en red",
  ],
  callToGeneration:
    "Si heredas tierra o estás aprendiendo a formular: no entres solo a un mercado que premia lo genérico. Entra al Colab. Sembrar, fermentar y chocolatear en colectivo es cómo subimos la competitividad de nuestro cacao.",
}

export const chocolatierCompanionTips = [
  "Lente CoEx ≠ medalla CoEx. Nunca atribuyas un premio a Benevolo sin evidencia.",
  "El XP mide avance educativo; la ficha de lote y la cata ciega demuestran criterio.",
  "Si la duja o el bombón tapan el FEAR 5, la fórmula falló aunque sepa ‘rica’.",
  "Grown chocolate genérico amenaza la especialidad: tu oficio es la resistencia con evidencia.",
  "Invita a tu generación al Colab — la tipicidad se defiende en red.",
]
