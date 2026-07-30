/**
 * Master Chocolatier · formulaciones bean-to-bar a la altura de Cacao of Excellence.
 * Output capstone: Chocolate Benevolo Bars. (FEAR 5 · duja de marañón).
 */

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
}

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

export const coexPrinciples = [
  {
    title: "Ciego primero",
    body: "Evalúa grano y chocolate sin depender de la marca. COEX juzga la muestra, no el pitch.",
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
