/**
 * Master Catador de Cacao · lente CoEx + Rueda Fine-Flavor Colab
 * Syllabus: /aprende/catador · Campaña: /campus/catador-cacao
 * Compara rueda CoEx (cacao) vs Callebaut (chocolate) → rueda propia Colab.
 */

export type CatadorStep = {
  kicker: string
  title: string
  body: string
  fieldAction: string
}

export type CatadorMission = {
  number: string
  slug: string
  title: string
  duration: string
  xp: number
  skill: string
  summary: string
  coexLens: string
  callebautBridge: string
  curvePhase: string
  practice: string
  dualitaIntro: string
  dualitaSuccess: string
  steps: CatadorStep[]
  quiz: {
    question: string
    options: { id: string; text: string; correct: boolean; explanation: string }[]
  }
}

export const CATADOR_COURSE_SLUG = "catador-cacao"

export const catadorMissions: CatadorMission[] = [
  {
    number: "01",
    slug: "panel-higiene",
    title: "Protocolo de panel",
    duration: "8 min",
    xp: 90,
    skill: "Higiene + ciego",
    summary:
      "Sin perfume, sin storytelling en la mesa. Código ciego, agua entre muestras y bitácora antes del deseo.",
    coexLens:
      "CoEx evalúa muestras bajo condiciones controladas. Tu panel de casa imita rigor, no el laboratorio oficial.",
    callebautBridge: "En Academy también se cata con método: primero limpieza, luego aplicación.",
    curvePhase: "Optimismo desinformado → primera regla: el panel no es degustación social.",
    practice: "Arma mesa ciega de 3 códigos + ficha en blanco.",
    dualitaIntro: "Vas a catar como si no supieras la marca. Eso duele al ego — y forma al catador.",
    dualitaSuccess: "Ya tienes higiene de panel. Sin eso, la rueda es decoración.",
    steps: [
      {
        kicker: "Mesa",
        title: "Quita la marca antes del primer bocado.",
        body: "Códigos aleatorios, orden anotado aparte, sin Instagram del origen en la mesa. Preferencia personal no dirige el ranking.",
        fieldAction: "Tres vasos/códigos · hoja ciega · agua tibia.",
      },
      {
        kicker: "Cuerpo",
        title: "Higiene sensorial.",
        body: "Sin café reciente, cigarrillo, perfume fuerte ni pasta mentolada. Espera y enjuaga. CoEx y Academy coinciden: el ruido es tuyo, no del cacao.",
        fieldAction: "Checklist de higiene firmado antes de catar.",
      },
      {
        kicker: "Microvictoria",
        title: "Una ficha vacía bien hecha.",
        body: "En la curva de maestría, esto corta el optimismo desinformado: aún no ‘sabes’ — sabes preparar el juicio.",
        fieldAction: "Fotografía o guarda la ficha en blanco lista.",
      },
    ],
    quiz: {
      question: "¿Qué define un panel ciego útil para Fine-Flavor?",
      options: [
        {
          id: "a",
          text: "Contar la historia del productor antes de catar",
          correct: false,
          explanation: "Eso sesga. El storytelling va después de la evidencia.",
        },
        {
          id: "b",
          text: "Códigos sin marca, higiene y ficha antes del juicio",
          correct: true,
          explanation: "Correcto: método primero.",
        },
        {
          id: "c",
          text: "Elegir la muestra que más te guste y punto",
          correct: false,
          explanation: "Preferencia ≠ tipicidad ni limpieza.",
        },
      ],
    },
  },
  {
    number: "02",
    slug: "rueda-colab",
    title: "Rueda Fine-Flavor Colab",
    duration: "12 min",
    xp: 120,
    skill: "Léxico + rueda",
    summary:
      "Core, complementary, defectos y puente tipicidad. Compara eco CoEx vs eco Callebaut sin copiar IP.",
    coexLens:
      "CoEx divide atributos en core / complementary / off-flavours y usa rueda + glosario + formulario (Excel/impreso).",
    callebautBridge:
      "Callebaut/Academy habla chocolate aplicado (cacao, tostado, fruta, lácteos…). La rueda Colab traduce cacao→uso.",
    curvePhase: "Pesimismo útil: descubres cuántos descriptores vacíos usabas (‘premium’, ‘especial’).",
    practice: "Marca 5 descriptores permitidos de la rueda para tu panel de casa.",
    dualitaIntro: "La rueda no es arte: es vocabulario compartido. Vamos a nombrarlo con precisión.",
    dualitaSuccess: "Ya tienes léxico Colab. Eso convierte ‘me gusta’ en ficha defendible.",
    steps: [
      {
        kicker: "Core",
        title: "Lo que casi siempre está.",
        body: "Cacao, acidez, amargor, astringencia, grado de tostado. Escale 0–10. Si no mides core, no hay panel.",
        fieldAction: "Completa core en una muestra ancla (licor o 70 %).",
      },
      {
        kicker: "Complementary",
        title: "Lo que puede aparecer.",
        body: "Fruta fresca/seca, floral, nuez, especias, madera, vegetal, caramelo/panela. No inventes lo que no percibes.",
        fieldAction: "Máximo 3 complementary dominantes por muestra.",
      },
      {
        kicker: "Puente",
        title: "CoEx ↔ Callebaut ↔ Colab.",
        body: "CoEx mira cacao; Callebaut mira chocolate usable; Colab exige tipicidad legible en ambos. Defectos descalifican en los tres lenguajes.",
        fieldAction: "Escribe una frase: ‘sirve para barra 70 % porque…’.",
      },
    ],
    quiz: {
      question: "¿Qué es la Rueda Fine-Flavor Colab?",
      options: [
        {
          id: "a",
          text: "La rueda oficial CoEx con otro logo",
          correct: false,
          explanation: "Es lente pedagógica propia; citamos CoEx sin copiar su IP como sello.",
        },
        {
          id: "b",
          text: "Vocabulario Colab que puentea evaluación de cacao (CoEx) y chocolate aplicado (Callebaut)",
          correct: true,
          explanation: "Exacto.",
        },
        {
          id: "c",
          text: "Una lista de marketing para empaques",
          correct: false,
          explanation: "Sin escala ni defectos no es rueda de catación.",
        },
      ],
    },
  },
  {
    number: "03",
    slug: "defectos-cero",
    title: "Defectos no negociables",
    duration: "8 min",
    xp: 100,
    skill: "Off-flavours",
    summary: "Moho, humo, podrido, sucio, sobre-fermentado: Global Quality cae. Tipicidad no absuelve.",
    coexLens: "Off-flavours en CoEx pueden aparecer o no; si están, pesan y descalifican excelencia.",
    callebautBridge: "Un defecto en cacao arrastra a la cobertura: no hay ganache que lo limpie del todo.",
    curvePhase: "Falta de sentido: el rigor parece cruel hasta que pruebas un testigo defectuoso.",
    practice: "Política de rechazo del lab Colab en dos líneas.",
    dualitaIntro: "Vas a oler lo que no quieres en tu marca. Eso da meaning al cuidado en Sembrar.",
    dualitaSuccess: "Ya tienes umbral de rechazo. Eso es oficio, no snobismo.",
    steps: [
      {
        kicker: "Lista",
        title: "Nombra el rechazo.",
        body: "Humo, moho, podrido, sucio/polvo, sobre-fermentado, animal/cuero, crudo extremo, quemado. Si aparece: documenta y para.",
        fieldAction: "Lista de rechazo pegada a tu mesa de catación.",
      },
      {
        kicker: "Set #10",
        title: "Usa el testigo didáctico.",
        body: "El Set Catación incluye pieza de defecto controlado. Entrena el ‘no’ antes del ‘wow’.",
        fieldAction: "Ficha de rechazo con un solo descriptor off + Global Quality baja.",
      },
      {
        kicker: "Meaning",
        title: "El cuidado en finca tiene sentido aquí.",
        body: "Fermentación y secado limpios no son romanticismo: son la diferencia entre panel y basura sensorial.",
        fieldAction: "Escribe qué defecto evitarías en tu próxima labranza Sembrar.",
      },
    ],
    quiz: {
      question: "Si hay tipicidad frutal pero también humo, ¿qué hace un catador CoEx-Colab?",
      options: [
        {
          id: "a",
          text: "Ignora el humo porque la fruta es ‘única’",
          correct: false,
          explanation: "El defecto no se negocia.",
        },
        {
          id: "b",
          text: "Documenta el off-flavour y rechaza excelencia aunque el origen sea noble",
          correct: true,
          explanation: "Correcto.",
        },
        {
          id: "c",
          text: "Sube el tostado para tapar el humo",
          correct: false,
          explanation: "Eso suele empeorar el perfil.",
        },
      ],
    },
  },
  {
    number: "04",
    slug: "tipicidad-vs-gusto",
    title: "Tipicidad vs preferencia",
    duration: "10 min",
    xp: 110,
    skill: "Juicio calibrado",
    summary:
      "Separa ‘me gusta’ de ‘es típico y limpio’. Microvictoria: ranking justificado sin logo.",
    coexLens: "Los Awards miran calidad y tipicidad de muestra, no fandom de marca.",
    callebautBridge: "En formulación, a veces prefieres un perfil menos ‘típico’ pero usable — decláralo.",
    curvePhase: "Optimismo informado: ya sabes que no sabes — y puedes justificarlo.",
    practice: "Ranking 1–2–3 de tres muestras del set con una frase cada una.",
    dualitaIntro: "El ego quiere ganar. El catador quiere acertar. Elige.",
    dualitaSuccess: "Ya separas gusto de tipicidad. Ese músculo es maestría temprana.",
    steps: [
      {
        kicker: "Dos columnas",
        title: "Gusto | Tipicidad.",
        body: "Puedes amar una barra y marcar tipicidad media. Puedes respetar un FEAR 5 limpio sin querer tomarlo diario.",
        fieldAction: "Tabla gusto 0–10 vs tipicidad 0–10 en 3 muestras.",
      },
      {
        kicker: "Ciego",
        title: "Ranking sin historia.",
        body: "Ordena por limpieza + tipicidad. Si no puedes decir por qué, tu ficha no sobrevive a CoEx ni a un chef Academy.",
        fieldAction: "Ranking justificado en tres frases.",
      },
      {
        kicker: "Microvictoria",
        title: "Una corrección pública.",
        body: "Cambia tu ranking si el re-catado lo pide. En la curva, eso es salida del pesimismo: el método te corrige.",
        fieldAction: "Nota: ‘corregí X porque…’.",
      },
    ],
    quiz: {
      question: "¿Qué es tipicidad en el lente Colab?",
      options: [
        {
          id: "a",
          text: "Que el productor tenga buena historia en redes",
          correct: false,
          explanation: "La tipicidad se prueba en boca y proceso.",
        },
        {
          id: "b",
          text: "Que el origen/genotipo/fermentación se lean con limpieza y coherencia",
          correct: true,
          explanation: "Exacto.",
        },
        {
          id: "c",
          text: "Que a ti te guste más que otras barras",
          correct: false,
          explanation: "Eso es preferencia.",
        },
      ],
    },
  },
  {
    number: "05",
    slug: "ficha-defendible",
    title: "Ficha de muestra defendible",
    duration: "10 min",
    xp: 110,
    skill: "Documentación",
    summary:
      "Genotipo, fermentación, secado, scores 0–10, Global Quality, puente a uso (barra/duja).",
    coexLens: "CoEx usa formularios estandarizados; tú entrenas el hábito de datos completos.",
    callebautBridge: "La ficha debe decirle a un chocolatier qué puede hacer con ese perfil.",
    curvePhase: "Optimismo informado: la ficha es tu antídoto al ‘solo sé que nada sé’.",
    practice: "Completa una ficha Catador Colab de punta a punta.",
    dualitaIntro: "Si no está escrito, no pasó. Vamos a dejar evidencia.",
    dualitaSuccess: "Ya tienes una ficha que podría viajar a un lab sin tu voz.",
    steps: [
      {
        kicker: "Identidad",
        title: "Quién es la muestra.",
        body: "Origen, genotipo, lote, proceso (fermentación/secado/tostión si aplica), código ciego.",
        fieldAction: "Bloque identidad completo.",
      },
      {
        kicker: "Scores",
        title: "Números, no adjetivos vacíos.",
        body: "Core + complementary + off. Global Quality 0–10. Descriptores de la rueda Colab.",
        fieldAction: "Scores numéricos + 3–5 descriptores.",
      },
      {
        kicker: "Uso",
        title: "Puente a Chocolatier.",
        body: "¿Barra 70 %? ¿Duja? ¿Cobertura? Declara recomendación de uso con honestidad Callebaut-aplicada.",
        fieldAction: "Una línea de recomendación de uso.",
      },
    ],
    quiz: {
      question: "¿Qué hace defendible una ficha de catación?",
      options: [
        {
          id: "a",
          text: "Muchos adjetivos de marketing y una foto bonita",
          correct: false,
          explanation: "Sin scores ni defectos no hay defensa.",
        },
        {
          id: "b",
          text: "Identidad de muestra, scores 0–10, defectos y recomendación de uso",
          correct: true,
          explanation: "Correcto.",
        },
        {
          id: "c",
          text: "Solo el puntaje Global Quality sin atributos",
          correct: false,
          explanation: "El Global sin desglose no enseña ni calibra.",
        },
      ],
    },
  },
  {
    number: "06",
    slug: "flight-colombia-10",
    title: "Capstone · flight Colombia 10",
    duration: "14 min",
    xp: 140,
    skill: "Maestría aplicada",
    summary:
      "Recorre el Set Catación Colombia: 10 chocolatinas/testigos. Cierra con diploma y meaning: formar criterio, no coleccionar medallas ajenas.",
    coexLens: "Usamos contexto CoEx (p. ej. Meta 2024) como lente — no como medalla Colab.",
    callebautBridge: "Elige 2 perfiles del flight que llevarías a una formulación Academy-style.",
    curvePhase: "Maestría: microvictorias acumuladas → dominio transferible.",
    practice: "Completa el flight (o simulación) y publica una síntesis de tipicidad.",
    dualitaIntro: "Capstone: diez muestras, una cabeza fría. Sal adelante con oficio.",
    dualitaSuccess:
      "Eres Catador Colab en entrenamiento: sabes que no lo sabes todo — y sabes cómo seguir midiendo.",
    steps: [
      {
        kicker: "Flight",
        title: "Orden y ritmo.",
        body: "Sigue la guía del set: delicados → intensos → defecto didáctico. Descansa nariz/lengua.",
        fieldAction: "Marca orden real vs orden recomendado.",
      },
      {
        kicker: "Síntesis",
        title: "Tres tipicidades defendibles.",
        body: "Elige tres muestras del set y defiende tipicidad en una frase cada una. Rechaza al menos un defecto o falso ‘wow’.",
        fieldAction: "Síntesis 3+1 (tres tipicidades, un rechazo).",
      },
      {
        kicker: "Herencia",
        title: "Enseña la rueda a alguien.",
        body: "Maestría es transferencia. Comparte diploma + invita a Dualita/Sembrar. El funnel vuelve a empezar — con más sentido.",
        fieldAction: "Plan: a quién le harás un panel de 3 muestras esta semana.",
      },
    ],
    quiz: {
      question: "¿Cuál es el cierre correcto del Capstone Catador?",
      options: [
        {
          id: "a",
          text: "Afirmar que el Colab ganó medallas CoEx con este set",
          correct: false,
          explanation: "Honestidad: contexto ≠ medalla Colab.",
        },
        {
          id: "b",
          text: "Demostrar fichas, tipicidad/rechazo y puente a uso, sin inventar premios",
          correct: true,
          explanation: "Exacto: maestría informada.",
        },
        {
          id: "c",
          text: "Elegir solo la barra que más te gustó y terminar",
          correct: false,
          explanation: "Falta el método y la tipicidad.",
        },
      ],
    },
  },
]

export const catadorTotalXp = catadorMissions.reduce((sum, m) => sum + m.xp, 0)

export const catadorCompanionTips = [
  "La rueda Colab es lente de entrenamiento — no el Excel oficial CoEx.",
  "Si dudas entre floral y perfume de empaque, marca menor intensidad y re-cata.",
  "Microvictoria > sprint: una ficha limpia vence a diez opiniones.",
  "Callebaut mira uso; CoEx mira cacao; tú unes ambos con tipicidad.",
  "El set de 10 es laboratorio: el #10 de defecto te hace catador de verdad.",
]

export const catadorPrinciples = [
  {
    title: "Lente, no medalla",
    body: "CoEx y Awards son marco público. El Colab entrena el músculo — no vende premios ajenos.",
  },
  {
    title: "Rueda propia",
    body: "Fine-Flavor Colab puentea CoEx (cacao) y Callebaut (chocolate aplicado).",
  },
  {
    title: "Microvictorias",
    body: "La curva de maestría se gana con paneles cortos y fichas, no con un solo ‘eureka’.",
  },
]
