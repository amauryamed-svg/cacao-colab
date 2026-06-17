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
    slug: 'cacao-bioactivo',
    number: 1,
    title: 'El cacao que activa tu cerebro',
    emoji: '🧠',
    duration: '8 min',
    xp: 50,
    companionIntro: '¡Bienvenido! Soy Dualita. Vamos a descubrir por qué el cacao es el superalimento más subestimado de la cocina profesional.',
    companionMid: '¿Lo sabías? La teobromina del cacao dura más en el cuerpo que la cafeína. Tu cliente va a sentirlo.',
    companionQuiz: '¡Hora de demostrar lo que aprendiste! El cacao no miente — y tú tampoco.',
    companionComplete: '¡Módulo 1 completado! El cacao bioactivo ya es tu aliado. +50 XP 🎉',
    companionTips: [
      'El cacao tiene 3x más antioxidantes que el té verde.',
      'La fermentación controlada desarrolla hasta 500 compuestos de sabor.',
      'El chocolate oscuro 70%+ tiene más flavonoides que el vino tinto.',
    ],
    cards: [
      {
        kicker: 'Cacao vs. chocolate',
        headline: 'No es lo mismo cacao que chocolate.',
        body: 'El chocolate comercial pasa por alcalinización (proceso holandés) que destruye hasta el 77% de los flavonoides. El cacao mínimamente procesado de CAÚA conserva su perfil bioactivo completo. Eso cambia todo en tu cocina.',
        highlight: { label: 'flavonoides perdidos en proceso industrial', value: 'hasta 77%' },
      },
      {
        kicker: 'Teobromina',
        headline: 'La molécula que lo hace diferente.',
        body: 'La teobromina es el alcaloide principal del cacao. A diferencia de la cafeína, genera alerta sin ansiedad y dura más en el cuerpo. En tu propuesta HoReCa, esto es un diferenciador real para experiencias de madrugada, postres nocturnos y cócteles funcionales.',
        highlight: { label: 'duración en el cuerpo vs. cafeína', value: '6–8 h vs. 3–5 h' },
      },
      {
        kicker: 'Flavonoides',
        headline: 'Los compuestos que tu cliente no ve pero siente.',
        body: 'Los flavonoides del cacao (epicatequina, catequina) tienen efecto vasodilatador — mejoran el flujo sanguíneo y la cognición en 1–3 horas. Una ganache con cobertura 85% Zurych no es solo sabor: es función. Así se vende la diferencia.',
        highlight: { label: 'mg de flavonoides por porción de cacao oscuro', value: '200–500 mg' },
      },
      {
        kicker: 'Cacao CAÚA',
        headline: 'Por qué el origen cambia el perfil bioactivo.',
        body: 'El cacao de Huila, Meta y Arauca que usa CAÚA se fermenta entre 5 y 7 días en cajones de madera con control de temperatura. Este proceso preserva más polifenoles que el secado rápido industrial. El terroir no es marketing — es química.',
        highlight: { label: 'días de fermentación controlada CAÚA', value: '5–7 días' },
      },
    ],
    quiz: {
      question: '¿Qué proceso industrial destruye hasta el 77% de los flavonoides del cacao?',
      options: [
        { id: 'a', text: 'Fermentación prolongada', correct: false, explanation: 'Al contrario — la fermentación controlada preserva y desarrolla los compuestos bioactivos.' },
        { id: 'b', text: 'Alcalinización (proceso holandés)', correct: true, explanation: '¡Exacto! La alcalinización eleva el pH para suavizar el sabor, pero destruye la mayoría de los flavonoides.' },
        { id: 'c', text: 'Temperado del chocolate', correct: false, explanation: 'El temperado trabaja con la cristalización de la manteca de cacao, no afecta los flavonoides.' },
      ],
    },
  },
  {
    slug: 'fermentacion-controlada',
    number: 2,
    title: 'La fermentación: donde nace el sabor',
    emoji: '🦠',
    duration: '7 min',
    xp: 60,
    companionIntro: '¡Módulo 2! La fermentación es donde el cacao crudo se transforma en algo extraordinario. Esto es lo que hace CAÚA diferente.',
    companionMid: 'Los cajones de madera no son tradición — son tecnología. La madera regula la temperatura y permite el intercambio de aire justo.',
    companionQuiz: '¡A demostrar! ¿Recuerdas qué pasa en cada etapa de la fermentación?',
    companionComplete: '¡Ya entiendes el corazón del cacao CAÚA! +60 XP 🎉',
    companionTips: [
      'Un cacao mal fermentado no lo salva ni el mejor chocolatero.',
      'La temperatura ideal de fermentación es 45–50°C en el pico.',
      'El volteo de los granos cada 24–48 h es clave para fermentación homogénea.',
    ],
    cards: [
      {
        kicker: 'Por qué importa',
        headline: 'Sin fermentación no hay sabor.',
        body: 'El grano de cacao fresco es amargo, astringente y sin los aromas que conocemos. La fermentación es la etapa donde levaduras y bacterias transforman los azúcares de la pulpa en ácidos, calor y compuestos de sabor precursores. Es el paso más importante — y el que más varía entre productores.',
        highlight: { label: 'compuestos de sabor que se desarrollan en fermentación', value: '+500' },
      },
      {
        kicker: 'Etapas CAÚA',
        headline: 'Fase 1: las levaduras hacen el trabajo sucio.',
        body: 'En las primeras 24–48 horas, las levaduras (principalmente Saccharomyces cerevisiae) fermentan los azúcares de la pulpa produciendo etanol. Esto crea un ambiente anaeróbico y empieza el calentamiento del cajón. CAÚA monitorea temperatura cada 6 horas en esta etapa crítica.',
        highlight: { label: 'temperatura de inicio', value: '25–30°C' },
      },
      {
        kicker: 'Etapas CAÚA',
        headline: 'Fase 2: las bacterias toman el control.',
        body: 'Del día 2 al 5, las bacterias lácticas y acéticas toman el relevo. El ácido acético penetra el grano, mata el embrión (detiene la germinación) y desencadena reacciones enzimáticas que crean los precursores de Maillard. Aquí nace la acidez frutal, el floral y el terroir del origen.',
        highlight: { label: 'temperatura pico de fermentación', value: '45–50°C' },
      },
      {
        kicker: 'Control CAÚA',
        headline: 'El cajón de madera: tecnología ancestral.',
        body: 'CAÚA usa cajones de madera de cedro o guamo (maderas locales sin taninos que contaminen el sabor). La madera regula la temperatura, permite respiración y retiene la humedad ideal. Los agricultores voltean los granos cada 48 horas para homogeneizar la fermentación. Cada lote se certifica con ficha técnica.',
        highlight: { label: 'días de fermentación según origen', value: '5–7 días' },
      },
    ],
    quiz: {
      question: '¿Cuál es el papel de las bacterias acéticas en la fermentación del cacao?',
      options: [
        { id: 'a', text: 'Producen etanol a partir de los azúcares de la pulpa', correct: false, explanation: 'Eso lo hacen las levaduras en la Fase 1 (primeras 24–48h).' },
        { id: 'b', text: 'Crean precursores de sabor mediante ácido acético que penetra el grano', correct: true, explanation: '¡Perfecto! El ácido acético mata el embrión y desencadena las reacciones enzimáticas que crean los precursores de Maillard — el sabor complejo del cacao.' },
        { id: 'c', text: 'Reducen la temperatura del cajón para proteger el grano', correct: false, explanation: 'Al contrario — las bacterias acéticas generan calor, llevando el cajón a su temperatura pico de 45–50°C.' },
      ],
    },
  },
  {
    slug: 'coberturas-zurych',
    number: 3,
    title: 'Coberturas funcionales: tu nueva herramienta',
    emoji: '🍫',
    duration: '6 min',
    xp: 55,
    companionIntro: '¡Módulo 3! Las coberturas Zurych no son solo chocolate — son herramientas de precisión para tu cocina profesional.',
    companionMid: 'La cobertura 100% es la más versátil para fondos y moles. No le temas a la amargura — aprende a usarla.',
    companionQuiz: '¿Ya sabes qué cobertura usar para cada aplicación? ¡Comprobémoslo!',
    companionComplete: '¡Ya dominas el lenguaje de las coberturas Zurych! +55 XP 🎉',
    companionTips: [
      'Temperar correctamente = bloom perfecto = presentación impecable.',
      'La cobertura blanca 40% Zurych es ideal para ganaches de frutas tropicales.',
      'El 85% panela Santander tiene notas a frutas rojas y madera — úsala en postres de autor.',
    ],
    cards: [
      {
        kicker: 'El portafolio',
        headline: 'Cuatro coberturas, cuatro perfiles de sabor.',
        body: 'Zurych diseñó sus coberturas específicamente para cocina profesional: 70% (equilibrio, versatilidad), 85% panela Santander (notas frutales y madera, menos amargor que 85% estándar), 100% sin azúcar (intensidad máxima, para fondos y moles) y Blanco 40% (leche y vainilla, para ganaches de fruta).',
        highlight: { label: 'orígenes colombianos en el portafolio', value: '4 regiones' },
      },
      {
        kicker: '70% — el caballo de trabajo',
        headline: 'Tu cobertura de entrada para todo.',
        body: 'La cobertura 70% Zurych tiene un perfil equilibrado — notas de frutos secos, caramelo y ligero frutal. Fluye bien en temperatura, tempera fácil y es el punto de partida para el equipo que empieza con cobertura de especialidad. Ganaches, mousses, tabletas, trufas: todo funciona.',
        highlight: { label: 'temperatura de temperado', value: '31–32°C' },
      },
      {
        kicker: '85% & 100% — para valientes',
        headline: 'Intensidad que transforma un plato.',
        body: 'El 85% panela de Santander tiene un amargor suave (la panela lo redondea) con notas a cereza y tabaco que funcionan perfecto en postres de autor y maridajes con vino. El 100% es el arma secreta del chef: en moles colombianos, fondos de res, o gelatos de cacao puro — cambia el nivel de cualquier plato salado.',
        highlight: { label: 'uso ideal del 100%', value: 'moles, fondos, gelato' },
      },
      {
        kicker: 'Temperado básico',
        headline: 'La diferencia entre profesional y amateur.',
        body: 'El temperado no es magia — es física de cristales. La manteca de cacao tiene 6 formas cristalinas; la Forma V (beta estable) da el snap, brillo y textura sedosa que queremos. Método tablaje: fundir a 50°C → enfriar a 27°C en mármol → calentar a 31–32°C. Zurych diseña sus coberturas para que el rango de trabajo sea amplio y tolerante.',
        highlight: { label: 'temperatura de trabajo óptima', value: '31–32°C' },
      },
    ],
    quiz: {
      question: '¿Cuál cobertura Zurych es más adecuada para elaborar un mole colombiano contemporáneo?',
      options: [
        { id: 'a', text: 'Cobertura 70% — por su equilibrio y versatilidad', correct: false, explanation: 'El 70% es excelente para postres, pero en un mole la dulzura puede competir con los chiles y especias.' },
        { id: 'b', text: 'Cobertura Blanco 40% — por su cremosidad', correct: false, explanation: 'La cobertura blanca tiene leche y vainilla — no el perfil adecuado para un mole salado.' },
        { id: 'c', text: 'Cobertura 100% sin azúcar — por su intensidad sin dulzura', correct: true, explanation: '¡Exacto! El 100% aporta toda la profundidad del cacao sin dulzura, perfecta para fondos, moles y salsas saladas complejas.' },
      ],
    },
  },
  {
    slug: 'nibs-vivos',
    number: 4,
    title: 'NIBS vivos en tu cocina',
    emoji: '✨',
    duration: '5 min',
    xp: 45,
    companionIntro: '¡Módulo 4! Los NIBS son el ingrediente más honesto del cacao — y el más subestimado en la cocina HoReCa.',
    companionMid: 'Un amenity de hotel con NIBS CAÚA × Zurych × Lust es un diferenciador que el huésped fotografía. Piénsalo.',
    companionQuiz: '¿Ya sabes dónde brillan los NIBS? ¡Vamos a comprobarlo!',
    companionComplete: '¡NIBS dominados! Ahora sabes usarlos como un profesional. +45 XP 🎉',
    companionTips: [
      'Los NIBS tostados a baja temperatura conservan más teobromina.',
      'NIBS + sal de mar + aceite de oliva = snack de bar premium en 2 minutos.',
      'En ensaladas, los NIBS reemplazan las nueces con un perfil de sabor más complejo.',
    ],
    cards: [
      {
        kicker: '¿Qué son los NIBS?',
        headline: 'El cacao en su forma más pura.',
        body: 'Los NIBS son granos de cacao fermentados, secados y descascarillados — sin azúcar, sin leche, sin procesamiento industrial. Lo que obtienes es el cotiledon del cacao puro: crujiente, con notas intensas de fruto seco, tierra y fruta. El NIBS CAÚA × Zurych × Lust es co-branding real, nacido en Alimentec 2026.',
        highlight: { label: 'calorías por 10g de NIBS', value: '55 kcal · 4g grasa buena' },
      },
      {
        kicker: 'Aplicaciones HoReCa',
        headline: 'Textura, sabor y función en un solo ingrediente.',
        body: 'Los NIBS se usan como: topping de postres (crunch y sabor), ingrediente en granolas gourmet, elemento de emplatado fine dining, base de salsas y vinagretas (triturados), infusión en aceites y cremas. En bar: en cócteles de autor (infusión en ron o gin), garnish de mocktails y bases de siropes de cacao.',
        highlight: { label: 'usos verificados en cocina profesional', value: '6+ aplicaciones' },
      },
      {
        kicker: 'Amenity & gifting',
        headline: 'El detalle que convierte un hotel en experiencia.',
        body: 'Un amenity de NIBS CAÚA en habitación — con tarjeta de trazabilidad del lote y agricultor — es diferenciador fotografiable. Los huéspedes lo comparten en redes. En gifting corporativo: una caja de NIBS con historia de origen reemplaza el chocolate genérico y cuenta una historia de impacto real.',
        highlight: { label: 'tasa de fotografía de amenities premium', value: '68% (estudio HoReCa 2024)' },
      },
    ],
    quiz: {
      question: '¿Cuál es la diferencia principal entre NIBS de cacao y chips de chocolate oscuro?',
      options: [
        { id: 'a', text: 'Los NIBS tienen más azúcar y son más dulces', correct: false, explanation: 'Al contrario — los NIBS no tienen azúcar añadida. Son cacao puro fermentado y descascarillado.' },
        { id: 'b', text: 'Son lo mismo, solo cambia el nombre', correct: false, explanation: 'No — los chips de chocolate contienen azúcar, leche y estabilizantes. Los NIBS son solo grano de cacao puro.' },
        { id: 'c', text: 'Los NIBS son cacao puro sin azúcar; los chips tienen azúcar y otros ingredientes añadidos', correct: true, explanation: '¡Correcto! Los NIBS conservan el perfil bioactivo completo del cacao sin aditivos. Son más intensos, más funcionales y con mayor potencial culinario.' },
      ],
    },
  },
  {
    slug: 'origen-guardianes',
    number: 5,
    title: 'Cacao con historia: los Guardianes',
    emoji: '🌿',
    duration: '9 min',
    xp: 70,
    companionIntro: '¡Módulo 5! Este es el corazón de CAÚA. Los Guardianes son agricultores reales con nombres reales — y sus granos están en tu cocina.',
    companionMid: 'La trazabilidad no es un certificado — es una historia que tu cliente puede rastrear. Ese es el poder del Colab.',
    companionQuiz: '¿Conoces los 5 orígenes del Cacao Colab? ¡Vamos a comprobarlo!',
    companionComplete: '¡Ya conoces a los Guardianes! El cacao ahora tiene cara y nombre para ti. +70 XP 🎉',
    companionTips: [
      'Huila produce cacao con notas a frutas rojas y acidez brillante.',
      'El cacao de Arauca tiene notas a nuez y chocolate oscuro — más plano pero muy consistente.',
      'Pedir cacao por lote y agricultor (no solo por origen) es el siguiente nivel de especialidad.',
    ],
    cards: [
      {
        kicker: 'Los 5 orígenes',
        headline: 'Cinco regiones. Cinco perfiles. Una sola visión.',
        body: 'CAÚA trabaja con 5 regiones cacaoteras de Colombia: Huila (acidez frutal, notas a cereza), Santander (cacao de montaña, notas a nuez y canela), Meta (perfil balanced, chocolate clásico), Arauca (robusto, notas a tabaco y madera) y Cundinamarca (floral, ligero). Cada región tiene un Guardián — un agricultor de referencia con quien CAÚA trabaja directamente.',
        highlight: { label: 'regiones de origen activas', value: '5 departamentos' },
      },
      {
        kicker: 'Trazabilidad por lote',
        headline: 'Tu cliente puede rastrear su chocolate hasta el árbol.',
        body: 'Cada lote CAÚA tiene código único: región, Guardián, fecha de fermentación, fecha de secado, peso. Esto permite que en tu menú puedas escribir "Ganache de cacao Huila, lote H-24-07, Lucho Díaz" — y tu cliente puede escanearlo y ver la finca. Eso no lo hace ningún chocolate industrial.',
        highlight: { label: 'información disponible por lote', value: '6 campos verificados' },
      },
      {
        kicker: 'Impacto real',
        headline: 'Cada compra financia la siguiente cosecha.',
        body: 'CAÚA paga precio diferencial a los Guardianes — entre 20% y 40% sobre el precio de bolsa del cacao convencional. Ese diferencial se invierte en mejoras de fermentación, infraestructura de secado y calidad de vida de las familias. Cuando usas cacao CAÚA en tu operación, tu cliente no solo come mejor — también financia regeneración rural.',
        highlight: { label: 'sobreprecio pagado a Guardianes vs. precio bolsa', value: '20–40%' },
      },
      {
        kicker: 'En tu menú',
        headline: 'La historia de origen como diferenciador de precio.',
        body: 'Un postre con "cobertura Zurych 85% panela de Santander, cacao del Guardián Ricardo Gómez" puede cobrarse 30–50% más que el mismo postre con "chocolate oscuro". La historia de origen justifica el precio y genera conversación en mesa. El Cacao Colab te da esa historia lista para usar.',
        highlight: { label: 'aumento de precio posible con narrativa de origen', value: '30–50%' },
      },
    ],
    quiz: {
      question: '¿Qué significa "trazabilidad por lote" en el contexto del cacao CAÚA?',
      options: [
        { id: 'a', text: 'Que el cacao tiene certificación orgánica internacional', correct: false, explanation: 'La trazabilidad por lote es independiente de la certificación orgánica — es el seguimiento específico de cada lote desde el agricultor hasta el producto final.' },
        { id: 'b', text: 'Que cada lote tiene un código que permite rastrear origen, agricultor, fermentación y secado', correct: true, explanation: '¡Exacto! La trazabilidad por lote de CAÚA permite conocer exactamente de qué finca, de qué Guardián y en qué fecha específica viene el cacao que estás usando.' },
        { id: 'c', text: 'Que el cacao viene de un solo agricultor siempre', correct: false, explanation: 'No — CAÚA trabaja con múltiples Guardianes en 5 regiones. La trazabilidad es por lote específico, no por proveedor único.' },
      ],
    },
  },
  {
    slug: 'tu-operacion-cacao',
    number: 6,
    title: 'Tu operación + cacao: los números',
    emoji: '📊',
    duration: '8 min',
    xp: 65,
    companionIntro: '¡Último módulo! El cacao ya no es solo un ingrediente para ti — es un activo estratégico. Vamos a hacer los números.',
    companionMid: 'El margen del cacao especialidad es más alto que el chocolate convencional porque el precio de venta sube más que el costo.',
    companionQuiz: '¡El examen final! ¿Sabes calcular el unit economics del cacao en tu operación?',
    companionComplete: '¡Completaste Dualita Microlearning! Ahora tienes el conocimiento completo. +65 XP 🎉🎉🎉',
    companionTips: [
      'Un postre con historia de origen justifica +30% de precio sin resistencia del cliente.',
      'El pedido mínimo de CAÚA permite empezar sin comprometer tu capital de trabajo.',
      'Integrar cacao de especialidad toma 2–3 semanas de ajuste de recetas, no meses.',
    ],
    cards: [
      {
        kicker: 'Costo por porción',
        headline: 'El cacao de especialidad cuesta más — y vale más.',
        body: 'Una cobertura de especialidad Zurych 70% cuesta ~30–40% más que una cobertura industrial. Pero el precio de venta del postre puede subir 50–80% con la narrativa correcta. El unit margin mejora — no empeora — cuando introduces especialidad con historia. El error es calcular solo el costo, no el precio de venta posible.',
        highlight: { label: 'mejora de margen posible con especialidad', value: '+15–25 puntos' },
      },
      {
        kicker: 'Pedido mínimo CAÚA',
        headline: 'Empezar es más fácil de lo que crees.',
        body: 'CAÚA diseñó sus presentaciones para HoReCa de escala media: mínimos de 1kg en coberturas y 500g en NIBS. No necesitas comprometer grandes volúmenes para empezar. El primer pedido te da para probar, ajustar recetas y presentar al equipo antes de comprometerte en mayor escala.',
        highlight: { label: 'pedido mínimo de entrada', value: '1 kg cobertura / 500 g NIBS' },
      },
      {
        kicker: 'KPIs de calidad sensorial',
        headline: 'Los indicadores que importan en especialidad.',
        body: 'Para cacao de especialidad, los KPIs son diferentes: nota de sabor (frutal/floral/nuez), amargor en escala 1–10, acidez percibida, finish (cuánto dura el sabor en boca), y consistencia lote a lote. CAÚA entrega ficha técnica sensorial por lote. En tu menú, esto se traduce en que cada plato sabe igual en marzo y en octubre.',
        highlight: { label: 'variación sensorial lote a lote CAÚA', value: '< 5% desviación' },
      },
      {
        kicker: 'Tu menú en 3 semanas',
        headline: 'Un plan de implementación realista.',
        body: 'Semana 1: recibe primer pedido, haz pruebas de temperado con el equipo. Semana 2: adapta 2–3 recetas existentes con la nueva cobertura, pon a prueba con mesa. Semana 3: actualiza menú con descripción de origen y lanza. El Cacao Colab te da acceso al equipo de Zurych y CAÚA para resolver dudas técnicas durante todo el proceso.',
        highlight: { label: 'tiempo promedio de adopción HoReCa', value: '2–3 semanas' },
      },
    ],
    quiz: {
      question: '¿Por qué el cacao de especialidad puede mejorar el margen de un postre aunque cueste más?',
      options: [
        { id: 'a', text: 'Porque se usa menos cantidad en cada preparación', correct: false, explanation: 'No necesariamente — en la mayoría de recetas la cantidad es similar. La clave está en el precio de venta, no en usar menos.' },
        { id: 'b', text: 'Porque el precio de venta del postre puede subir más que el aumento de costo del ingrediente', correct: true, explanation: '¡Exacto! Con una narrativa de origen y especialidad, el precio de venta puede subir 50–80% mientras el costo del ingrediente sube 30–40%. El margen absoluto mejora.' },
        { id: 'c', text: 'Porque los clientes de especialidad siempre pagan el mismo precio sin importar el margen', correct: false, explanation: 'El cliente de especialidad valora la experiencia y está dispuesto a pagar más — pero el margen depende de cómo estructuras el precio, no del cliente.' },
      ],
    },
  },
]

export const lessonSlugs = lessons.map(l => l.slug)
