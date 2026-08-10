/**
 * Camino a la excelencia: visión Cacaotier → rueda → tostión bean-to-bar.
 * Fermentación controlada diseña precursores; la rueda nombra complejidad;
 * la tostión revela sin maquillar (puente de respeto).
 */

export type ExcellenceGate = {
  id: "fermentacion" | "complejidad" | "tostion"
  step: string
  title: string
  claim: string
  detail: string
  href: string
  cta: string
  accent: string
}

export const excellencePathMeta = {
  eyebrow: "Camino a la excelencia · bean-to-bar con rigor",
  title: "Fermentación limpia. Complejidad legible. Tostión que respeta.",
  lede:
    "Desde la visión del Cacaotier, la excelencia no empieza en el tambor: se diseña en el lote. La rueda Fine-Flavor Colab traduce esa química en vocabulario compartido; la tostión es el puente de respeto que revela — no corrige — lo que la fermentación dejó.",
} as const

export const excellenceGates: ExcellenceGate[] = [
  {
    id: "fermentacion",
    step: "01",
    title: "Fermentación controlada",
    claim: "Diseña precursores, no espera suerte.",
    detail:
      "Tc-pH (45 °C, pH espontáneo): péptidos superiores (FASKDQPLNA, FGVPSKL, GINDYRL…) abren floral, nuez, frutal y especiado limpio. Sin esta ventana, la rueda solo registra defectos o tipicidad plana.",
    href: "#atlas-precursores",
    cta: "Ver atlas de biomarcadores",
    accent: "#F2C830",
  },
  {
    id: "complejidad",
    step: "02",
    title: "Complejidad en la rueda",
    claim: "Lo que fermentaste se vuelve lenguaje de panel.",
    detail:
      "La Rueda Fine-Flavor Colab (lente CoEx × Callebaut) nombra core, complementary, tipicidad y off-flavours. Floral, nuez y fruta fresca dejan de ser storytelling: son radios defendibles en mesa ciega.",
    href: "/conocimiento/rueda-fine-flavor",
    cta: "Abrir rueda Fine-Flavor",
    accent: "#86B66B",
  },
  {
    id: "tostion",
    step: "03",
    title: "Tostión como puente de respeto",
    claim: "Revela el grano. No maquilla la poscosecha.",
    detail:
      "En bean-to-bar, la tostión desarrolla lo que el Cacaotier dejó legible. Una curva agresiva borra tipicidad; una curva honesta deja leer FEAR 5 y el trabajo de fermentación. Master Chocolatier diseña ese puente.",
    href: "/aprende/chocolatier",
    cta: "Ir a Master Chocolatier",
    accent: "#DC775F",
  },
]

/** Correlación didáctica biomarcador / nota → radios de la rueda. */
export const precursorToWheelLinks = [
  {
    peptide: "FGVPSKL",
    notes: "Floral · nuez · caramelo suave",
    spokes: ["floral", "nutty", "caramel", "roast"],
    why: "Precursores que la tostión puede revelar como bouquet limpio, no como amargor seco.",
  },
  {
    peptide: "FASKDQPLNA",
    notes: "Especiado · vegetal fresco · frutal",
    spokes: ["spice", "vegetal", "fresh-fruit", "tipicity"],
    why: "Firma de lote controlado: la rueda lo lee como tipicidad + complementary, no como defecto verde.",
  },
  {
    peptide: "GINDYRL",
    notes: "Floral alto",
    spokes: ["floral", "tipicity", "cacao"],
    why: "Nota floral que Japón y Europa buscan en single-origin — solo sobrevive si la tostión no la quema.",
  },
  {
    peptide: "LAIN · ESYF",
    notes: "Ventana y discriminación de excelencia",
    spokes: ["tipicity", "cacao", "acidity"],
    why: "Prueba de proceso: el panel encuentra origen coherente y acidez limpia, no over-ferment.",
  },
] as const
