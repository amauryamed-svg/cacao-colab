/**
 * Master Chocolatier · barra 70 % estilo CoEx / Chocolate Awards
 * Ruta de excelencia y puesta en escena del cacao de especialidad.
 * La duja Benevolo vive en lib/benevolo-brand.ts (marca acelerada separada).
 *
 * Syllabus: /aprende/chocolatier · Campaña: /campus/maestro-chocolatier
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
      "Ya tienes un lote con identidad. Sin ficha de grano, la barra 70 % sería solo empaque.",
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
      "Ya separas revelar precursores de quemar evidencia. La barra 70 % necesita claridad, no humo.",
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
      "Ya tienes un licor 100 % FEAR 5 repetible. Esa es la base de la masa 70 % y de cualquier fórmula seria.",
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
      "Ya separas ‘me gusta’ de ‘es limpio y típico’. Ese músculo sostiene la barra de especialidad.",
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
    slug: "formulacion-70",
    title: "Formulación barra 70 %",
    duration: "14 min",
    xp: 140,
    skill: "Masa · CoEx / Awards category",
    summary:
      "Diseña una barra dark 70 % — la categoría que CoEx y Chocolate Awards contextualizan con origen. Azúcar, finura, temperado y tipicidad FEAR 5 legible.",
    coexLens:
      "En CoEx y Chocolate Awards el contexto de origen importa: la muestra 70 % debe expresar tipicidad limpia, no solo ‘amargo fuerte’. Medalla es aspiración; buen chocolate de especialidad es el piso.",
    practice: "Ficha 70 %: % cacao, % azúcar, curva, temperado, perfil sensorial, código de muestra.",
    dualitaIntro:
      "Aquí no hay leche ni duja. Es la ruta 70 %: excelencia de puesta en escena del cacao.",
    dualitaSuccess:
      "Ya tienes una barra 70 % defendible. Medalla o no, el reconocimiento empieza por hacer muy buen chocolate.",
    steps: [
      {
        kicker: "Categoría",
        title: "70 % es lenguaje de panel y de mesa.",
        body: "CoEx y Chocolate Awards usan categorías donde el dark con contexto de origen se juzga ciego. Tu 70 % FEAR 5 debe poder explicar tipicidad sin logo. No siempre hay medalla: hay rigor.",
        fieldAction: "Declara categoría: dark 70 % · origen Quara FEAR 5 · muestra ciega.",
      },
      {
        kicker: "Fórmula",
        title: "Cacao + azúcar con intención.",
        body: "Define ratio ~70 % masa/licor FEAR 5 y ~30 % azúcar (ajusta a tu protocolo de casa). Documenta finura, viscosidad y si usas manteca adicional. Menos ingredientes, más responsabilidad de origen.",
        fieldAction: "Escribe fórmula: % cacao · % azúcar · adiciones · lote.",
      },
      {
        kicker: "Temperado",
        title: "Puesta en escena táctil.",
        body: "Snap, brillo y contracción del molde son parte del reconocimiento. Un gran origen mal temperado pierde escena. Registra curva de temperado y prueba de snap.",
        fieldAction: "Bitácora: temperado · snap · brillo · defectos de grasa.",
      },
      {
        kicker: "Paradoja",
        title: "Medalla ≠ único norte.",
        body: "Aspira a CoEx/Awards, pero mide éxito también en que alguien reconozca un muy buen chocolate de especialidad. El Colab celebra ambas victorias — con evidencia, sin inventar premios.",
        fieldAction: "Escribe tu doble meta: panel + reconocimiento de mesa.",
      },
    ],
    quiz: {
      question: "¿Qué define la ruta 70 % del Master Chocolatier Colab?",
      options: [
        {
          id: "a",
          text: "Solo conseguir medalla; si no hay premio el chocolate no importa",
          correct: false,
          explanation: "La medalla motiva, pero el piso es especialidad reconocible.",
        },
        {
          id: "b",
          text: "Barra dark con tipicidad legible estilo CoEx/Awards — excelencia y puesta en escena, con o sin medalla",
          correct: true,
          explanation: "Correcto: rigor de categoría + reconocimiento de oficio.",
        },
        {
          id: "c",
          text: "Formulación de duja de marañón con leche",
          correct: false,
          explanation: "Eso es Chocolate Benevolo, marca acelerada separada.",
        },
      ],
    },
  },
  {
    number: "06",
    slug: "capstone-70-colab",
    title: "Capstone · especialidad y generación Colab",
    duration: "16 min",
    xp: 160,
    skill: "Muestra · diploma · colectivo",
    summary:
      "Entrega ficha de barra 70 % lista para contexto CoEx/Awards, postura ante grown chocolate e invitación a compartir tu diploma digital con el Colab.",
    coexLens:
      "Tu muestra debe sobrevivir sin marca. El diploma Colab certifica rigor edutainment — no sustituye un premio oficial.",
    practice: "Ficha 70 % + claims honestos + CTA diploma / LinkedIn / colectivo.",
    dualitaIntro:
      "Capstone: la barra 70 % y tu voz de generación. Rachas, vidas y criterio — edutainment con rigor.",
    dualitaSuccess:
      "Credencial lista. Comparte el diploma: es Coursera con mazorca — diverte y exige.",
    steps: [
      {
        kicker: "Muestra",
        title: "Ficha que habla sin logo.",
        body: "Completa ficha de barra 70 % FEAR 5 Quara: proceso, proceso, perfil, defectos ausentes, código. Lista para contexto de Awards/CoEx sin atribuirte medalla.",
        fieldAction: "Exporta ficha: origen · 70 % · sensorial · honestidad.",
      },
      {
        kicker: "Postura",
        title: "Especialidad frente a grown chocolate.",
        body: "El cacao genérico de escala amenaza la tipicidad. Tu 70 % es resistencia con evidencia: Fedecacao/FEAR 5, fermentación, conchado y escena.",
        fieldAction: "3 líneas: qué rechazas y qué defiendes.",
      },
      {
        kicker: "Diploma",
        title: "Comparte rigor con onda.",
        body: "Al aprobar con vidas, rachas y primer intento limpio, desbloqueas diploma digital Colab — enlázalo en LinkedIn. No es medalla CoEx; es credencial de oficio y colectivo.",
        fieldAction: "Prepara nombre para el diploma y CTA al Colab.",
      },
      {
        kicker: "Hermanos de ruta",
        title: "Benevolo es otra puerta.",
        body: "Si quieres duja y tendencia snackable, ve a Chocolate Benevolo (marca acelerada). Si quieres panel 70 %, estás en casa. Ambas rutas alimentan Cacao Colab.",
        fieldAction: "CTA: diploma · /benevolo · /unete · Sembrar",
      },
    ],
    quiz: {
      question: "¿Qué certifica el diploma digital Master Chocolatier del Colab?",
      options: [
        {
          id: "a",
          text: "Una medalla oficial Cacao of Excellence",
          correct: false,
          explanation: "El diploma es credencial Colab edutainment, no premio CoEx.",
        },
        {
          id: "b",
          text: "Que completaste la ruta 70 % con rigor (vidas, rachas, criterio) y puedes enlazar al Colab",
          correct: true,
          explanation: "Correcto: Coursera-vibes + diversión cacao, sin sellos inventados.",
        },
        {
          id: "c",
          text: "Que tu duja Benevolo ya tiene stock en góndola",
          correct: false,
          explanation: "Benevolo es track/marca separada en preventa.",
        },
      ],
    },
  },
]

/** @deprecated import from @/lib/benevolo-brand — marca acelerada separada */
export { benevoloFormulation } from "@/lib/benevolo-brand"

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
    body: "Nodo, clon, fermentación y tostión deben poder reconstruirse. La barra 70 % declara Quara × FEAR 5.",
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
    "Barras 70 % y marcas aceleradas (Benevolo) que dejan leer el cacao",
    "Colectivo Cacao Colab: finca + oficio + marca en red",
  ],
  callToGeneration:
    "Si heredas tierra o estás aprendiendo a formular: no entres solo a un mercado que premia lo genérico. Entra al Colab. Sembrar, fermentar y chocolatear en colectivo es cómo subimos la competitividad de nuestro cacao.",
}

export const chocolatierCompanionTips = [
  "Lente CoEx ≠ medalla CoEx. El diploma Colab certifica rigor, no un premio oficial.",
  "Barra 70 %: tipicidad legible. Medalla motiva; muy buen chocolate de especialidad es el piso.",
  "Vidas y rachas cuidan el criterio — edutainment con exigencia.",
  "Grown chocolate genérico amenaza la especialidad: tu oficio es la resistencia con evidencia.",
  "Duja Benevolo es marca acelerada hermana — no el capstone de este track.",
  "Comparte el diploma en LinkedIn con enlace al Colab. Colectivo > ego.",
]
