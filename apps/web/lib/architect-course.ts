export type ArchitectStep = {
  kicker: string
  title: string
  body: string
  fieldAction: string
}

export type ArchitectMission = {
  slug: string
  number: number
  title: string
  skill: string
  xp: number
  dualitaIntro: string
  dualitaSuccess: string
  steps: ArchitectStep[]
  quiz: {
    question: string
    options: { id: string; text: string; correct: boolean; explanation: string }[]
  }
}

export const architectMissions: ArchitectMission[] = [
  {
    slug: "leer-lote",
    number: 1,
    title: "Leer el lote antes de tocarlo",
    skill: "Línea base + trazabilidad",
    xp: 80,
    dualitaIntro: "¡Primera regla de un arquitecto! No controles lo que aún no has descrito. Vamos a darle identidad al lote.",
    dualitaSuccess: "Ahora el lote tiene memoria. Sin línea base solo hay anécdotas; con datos ya podemos comparar.",
    steps: [
      { kicker: "Identidad", title: "Un lote no es solo una masa de cacao.", body: "Registra finca, nodo, genotipo declarado, fecha de cosecha, madurez, masa y remoción de pulpa. FEAR 5 del artículo provino de una finca y una cosecha: no extrapoles sin declarar tu material.", fieldAction: "Crea un código único: nodo–fecha–genotipo–réplica." },
      { kicker: "Línea cero", title: "Mide antes de iniciar.", body: "Toma temperatura de pulpa, ambiente, pH interno de una muestra representativa y masa total. Calibra el medidor de pH y documenta el método de muestreo.", fieldAction: "Fotografía los instrumentos y anota hora cero." },
      { kicker: "Comparabilidad", title: "Cambia una cosa a la vez.", body: "Para comparar recipientes necesitas homogeneizar materia prima, secado y elaboración del chocolate. Si cambian masa, geometría y manejo, registra cada diferencia.", fieldAction: "Define testigo, tratamiento y criterio de cierre." },
    ],
    quiz: {
      question: "¿Qué acción convierte una fermentación en un ensayo comparable?",
      options: [
        { id: "a", text: "Usar siempre 45 °C sin medir el lote", correct: false, explanation: "Un setpoint sin línea base ni réplica no crea comparabilidad." },
        { id: "b", text: "Documentar línea base, tratamiento, testigo y protocolo común", correct: true, explanation: "Exacto: identidad y método permiten interpretar diferencias." },
        { id: "c", text: "Cambiar recipiente, masa, secado y tostión al mismo tiempo", correct: false, explanation: "Eso confunde el efecto de cada variable." },
      ],
    },
  },
  {
    slug: "tres-rutas",
    number: 2,
    title: "Diseñar tres rutas de fermentación",
    skill: "Diseño experimental",
    xp: 100,
    dualitaIntro: "Hoy no buscamos un ganador universal. Buscamos entender qué variable mueve cada resultado.",
    dualitaSuccess: "¡Diseño listo! Ya separas evidencia publicada, referencia de finca e hipótesis de transferencia.",
    steps: [
      { kicker: "Precisión", title: "Biorreactor isotérmico a 45 °C.", body: "El tratamiento publicado con mejor valoración fue 45 °C constante, pH espontáneo y sin ácido añadido. Trabajó con 4,5 kg y cerró a 120 h para chocolate.", fieldAction: "Marca esta ruta como publicada y conserva sus límites de escala." },
      { kicker: "Puente", title: "Tanque adaptado desde el día 2.", body: "La línea de cantina o tanque cervecero es un piloto propuesto: ascenso natural inicial y aproximación gradual a 45 °C desde 48 h. No fue evaluada en el paper.", fieldAction: "Valida drenaje, limpieza, cizalla y uniformidad térmica." },
      { kicker: "Finca", title: "Cajón de madera como referencia.", body: "En el control publicado de 60 kg la temperatura permaneció bajo 35 °C las primeras 48 h y llegó cerca de 45 °C hacia 96 h.", fieldAction: "Mide centro, periferia y altura; no uses un único sensor." },
    ],
    quiz: {
      question: "¿Cuál ruta es una hipótesis de transferencia y no un tratamiento del artículo?",
      options: [
        { id: "a", text: "Biorreactor a 45 °C", correct: false, explanation: "Sí fue una condición publicada." },
        { id: "b", text: "Tanque adaptado con control desde 48 h", correct: true, explanation: "Correcto: debe validarse como piloto." },
        { id: "c", text: "Control en cajón de madera", correct: false, explanation: "El estudio incluyó un control en cajón." },
      ],
    },
  },
  {
    slug: "pilotar-curvas",
    number: 3,
    title: "Pilotar temperatura y pH",
    skill: "Curvas + decisiones",
    xp: 120,
    dualitaIntro: "Una cifra aislada engaña. Un arquitecto lee velocidad, tendencia y diferencias entre sensores.",
    dualitaSuccess: "¡Curvas dominadas! Ya sabes cuándo observar, cuándo comparar y cuándo no intervenir.",
    steps: [
      { kicker: "Temperatura", title: "Lee transferencia, no solo setpoint.", body: "La chaqueta puede marcar 45 °C mientras el centro y la pared difieren. Registra al menos dos posiciones y la temperatura ambiente con hora exacta.", fieldAction: "Grafica centro, periferia y setpoint en la misma escala." },
      { kicker: "pH interno", title: "La velocidad de caída importa.", body: "El estudio asoció una acidificación rápida, cerca de pH 4,6 en 48–72 h, con mayor amargor y astringencia. El mejor perfil mostró un descenso más gradual.", fieldAction: "Muestrea de forma consistente sin contaminar el lote." },
      { kicker: "Control", title: "Medir no significa dosificar.", body: "El llamado pH controlado fue acidificación inicial, no realimentación continua. La concentración reportada es inconsistente; este curso no prescribe ácido.", fieldAction: "Define límites de observación y escalamiento, no una corrección automática." },
    ],
    quiz: {
      question: "¿Qué significa controlar pH en el piloto Cacaotier?",
      options: [
        { id: "a", text: "Añadir ácido automáticamente hasta llegar a 4,3", correct: false, explanation: "No hay base reproducible para prescribir esa dosificación." },
        { id: "b", text: "Medir tendencia, documentar y decidir dentro de un protocolo validado", correct: true, explanation: "Exacto: el dato guía una decisión trazable." },
        { id: "c", text: "Medir únicamente al final", correct: false, explanation: "Perderías la velocidad de acidificación." },
      ],
    },
  },
  {
    slug: "cazar-precursores",
    number: 4,
    title: "Cazar precursores de aroma",
    skill: "Metabolitos + sabor",
    xp: 110,
    dualitaIntro: "Los aromas no están terminados en el grano húmedo. Vamos a seguir las piezas que el tostado transformará.",
    dualitaSuccess: "Ya conectas fermentación con Maillard sin prometer que un marcador aislado produce el mejor chocolate.",
    steps: [
      { kicker: "Sustratos", title: "Azúcares y proteínas cambian.", body: "Sacarosa, glucosa, fructosa y proteínas de reserva se transforman. Proteólisis y difusión generan péptidos y aminoácidos que después participan en reacciones de Maillard.", fieldAction: "Conserva muestras por hora bajo un código trazable." },
      { kicker: "Ventana 72 h", title: "Candidato metabolómico, no veredicto sensorial.", body: "En 45 °C/pH espontáneo se propuso 72 h por biomarcadores. Sin embargo, el chocolate de biorreactor se elaboró a 120 h.", fieldAction: "No declares superioridad sensorial de 72 h sin elaborar y evaluar ese corte." },
      { kicker: "Perfil conjunto", title: "Más de un compuesto no siempre es mejor.", body: "El tratamiento favorable mostró mayores grupos frutales y de nuez, pero no maximizó todos los volátiles. El aroma emerge de relaciones, umbrales y procesamiento posterior.", fieldAction: "Relaciona química con corte, tostión y panel sensorial." },
    ],
    quiz: {
      question: "¿Qué demuestra la ventana candidata de 72 h?",
      options: [
        { id: "a", text: "Que el chocolate a 72 h fue el mejor del panel", correct: false, explanation: "Ese chocolate no fue evaluado sensorialmente en el estudio." },
        { id: "b", text: "Que ciertos biomarcadores alcanzaron una ventana de interés", correct: true, explanation: "Correcto: es una inferencia metabolómica." },
        { id: "c", text: "Que todo FEAR 5 debe detenerse a 72 h", correct: false, explanation: "Una finca y una cosecha no definen un óptimo universal." },
      ],
    },
  },
  {
    slug: "punto-corte",
    number: 5,
    title: "Elegir el punto de corte",
    skill: "Calidad + riesgo",
    xp: 130,
    dualitaIntro: "Detener también es una decisión de proceso. Hoy vas a construir un criterio, no a obedecer un reloj.",
    dualitaSuccess: "¡Buen corte! Usaste múltiples señales y mantuviste una muestra comparable.",
    steps: [
      { kicker: "Ventanas", title: "72, 96 y 120 h responden preguntas distintas.", body: "72 h fue una ventana metabolómica candidata en biorreactor; 96–120 h fue la ventana candidata del cajón; 120 h es el punto sensorial comparable del biorreactor publicado.", fieldAction: "Define qué hipótesis prueba cada corte." },
      { kicker: "Sobrefermentación", title: "Más tiempo también acumula defectos.", body: "En el cajón aumentaron volátiles asociados a defecto de 120 a 192 h. Después de 144 h el pH volvió hacia 5 y aparecieron señales de sobrefermentación.", fieldAction: "Activa alarma por olor, pH ascendente y duración, sin depender de una sola señal." },
      { kicker: "Cierre", title: "Secado común o comparación perdida.", body: "Un punto de corte solo se interpreta si secado, almacenamiento, tostión y formulación se mantienen comparables.", fieldAction: "Reserva muestra testigo y registra humedad final." },
    ],
    quiz: {
      question: "¿Cuál es el punto comparable con la evaluación sensorial del biorreactor publicado?",
      options: [
        { id: "a", text: "72 h", correct: false, explanation: "Fue una inferencia metabolómica." },
        { id: "b", text: "96 h", correct: false, explanation: "Es relevante para la ventana del cajón." },
        { id: "c", text: "120 h", correct: true, explanation: "Exacto: el chocolate de biorreactor se preparó con la muestra de 120 h." },
      ],
    },
  },
  {
    slug: "evidencia-replica",
    number: 6,
    title: "Convertir grano en evidencia",
    skill: "Réplica + comunicación",
    xp: 160,
    dualitaIntro: "Última misión. Un maestro no solo obtiene un resultado: logra que otra persona entienda cómo lo obtuvo.",
    dualitaSuccess: "¡Credencial desbloqueada! Eres Arquitecto de Fermentación: diseñas, documentas y comunicas sin exagerar.",
    steps: [
      { kicker: "Réplica", title: "Repetir fermentación, no solo análisis.", body: "Triplicados de laboratorio no sustituyen réplicas independientes de fermentación. Repite en cosechas, días y masas antes de generalizar.", fieldAction: "Planifica al menos una réplica independiente y registra desviaciones." },
      { kicker: "Chocolate", title: "La fermentación se valida después.", body: "Usa secado, tostión y chocolate 70 % comunes para comparar. Un panel entrenado y datos instrumentales responden preguntas complementarias.", fieldAction: "Ciega códigos de muestra y conserva la llave fuera del panel." },
      { kicker: "Claim responsable", title: "Publica alcance y límite.", body: "Distingue dato publicado, observación propia, cálculo e hipótesis. FEAR 5 comercial en otro nodo sigue siendo otro lote, no una reproducción automática de Arauquita.", fieldAction: "Escribe una conclusión con resultado, incertidumbre y siguiente prueba." },
    ],
    quiz: {
      question: "¿Qué hace defendible un claim de calidad?",
      options: [
        { id: "a", text: "Mucho XP y una curva visual atractiva", correct: false, explanation: "La gamificación no reemplaza evidencia." },
        { id: "b", text: "Método trazable, réplica, evaluación comparable y límites explícitos", correct: true, explanation: "Exacto: esa combinación permite aprender y comunicar responsablemente." },
        { id: "c", text: "Copiar el resultado de una finca a todos los nodos", correct: false, explanation: "Eso excede el alcance de la evidencia." },
      ],
    },
  },
]

export const architectTotalXp = architectMissions.reduce((total, mission) => total + mission.xp, 0)
