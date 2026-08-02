import { paperSources } from "@/lib/cacaotier-course"

export type CampusSource = {
  label: string
  href: string
  note: string
  kind: "paper" | "program" | "cartilla" | "video" | "campus"
}

/** Fuentes visibles en Masters · rigor + MOOC cercano. */
export const campusKnowledgeSources: CampusSource[] = [
  ...paperSources.map((s) => ({
    label: s.label,
    href: s.href,
    note: s.note,
    kind: "paper" as const,
  })),
  {
    label: "Cacao of Excellence",
    href: "https://www.cacaoofexcellence.org/",
    note: "Awards, training y lab sensorial. Usamos el lente CoEx — no atribuimos medallas inventadas.",
    kind: "program",
  },
  {
    label: "International Chocolate Awards",
    href: "https://www.internationalchocolateawards.com/",
    note: "Referencia de categorías y excelencia en chocolate de origen. Contexto para Master Chocolatier 70 %.",
    kind: "program",
  },
  {
    label: "Agrosavia × Fedecacao · cartillas (YouTube)",
    href: "https://www.youtube.com/watch?v=lGZSnuXAvyo",
    note: "Presentación pública de cartillas técnicas. Refuerza poscosecha y calidad con lenguaje de campo.",
    kind: "video",
  },
  {
    label: "Cartilla Agrosavia 1 · editorial",
    href: "http://editorial.agrosavia.co/index.php/publicaciones/catalog/book/190",
    note: "Material práctico Agrosavia × aliados. Léelo junto al paper de biorreactor, no en su lugar.",
    kind: "cartilla",
  },
  {
    label: "Cartilla Agrosavia 2 · editorial",
    href: "http://editorial.agrosavia.co/index.php/publicaciones/catalog/book/191",
    note: "Segunda cartilla de la serie colaborativa con Fedecacao y universidades.",
    kind: "cartilla",
  },
  {
    label: "Conocimiento Colab · CoEx",
    href: "/conocimiento/cacao-of-excellence",
    note: "Cómo el Colab traduce CoEx/Awards a criterio de campus sin sellos falsos.",
    kind: "campus",
  },
  {
    label: "Sci. Rep. 2024 · Cd nib → testa",
    href: "https://doi.org/10.1038/s41598-024-62609-8",
    note: "Temperatura alta y acidificación favorecen transferencia de cadmio del nib a la cascarilla descartable.",
    kind: "paper",
  },
  {
    label: "Food Res. Int. 2019 · Cd en fermentación",
    href: "https://doi.org/10.1016/j.foodres.2019.108743",
    note: "Distribución de cadmio durante fermentación de cacao — contexto para Sembrar y Master Cacaotier.",
    kind: "paper",
  },
  {
    label: "Conocimiento Colab · Cadmio y suelo",
    href: "/conocimiento/cadmio-suelo-fermentacion",
    note: "Acidez, cuidado preventivo y fermentación ~45 °C: conciencia sin promesa de Cd cero.",
    kind: "campus",
  },
  {
    label: "CoEx · protocolos de evaluación de calidad",
    href: "https://www.cacaoofexcellence.org/rd-laboratory-and-training/quality-evaluation-protocols",
    note: "Rueda, glosario y guía 2023. Lente del Master Catador — no software Colab oficial.",
    kind: "program",
  },
  {
    label: "Rueda Fine-Flavor Colab",
    href: "/conocimiento/rueda-fine-flavor",
    note: "Puente CoEx (cacao) × Callebaut (chocolate aplicado) · entrenamiento Catador.",
    kind: "campus",
  },
  {
    label: "Set Catación Colombia 10",
    href: "/rd/set-catacion",
    note: "Drop de 10 chocolatinas + guía profesional de panel.",
    kind: "campus",
  },
]

export const architectCompanionTips = [
  "La racha 🔥 es constancia diaria. La nota del diploma mira otra cosa: aciertos al primer intento.",
  "Lee el paper y las cartillas Agrosavia/Fedecacao antes del reto — Dualita premia criterio, no memoria de posición.",
  "XP mide avance; la bitácora de lote demuestra competencia real.",
  "Si fallas una vida, no pasa nada: repasa el paso, respira y vuelve. Así se entrena un arquitecto.",
  "Cuando termines, comparte el diploma en el foro Colab con un 🍫 — la generación aprende junta.",
]

export const chocolatierCompanionTipsShared = [
  "Primer intento limpio ≠ racha diaria. El diploma mira cuántos retos resolviste a la primera.",
  "CoEx y Chocolate Awards son lente de panel — no medallas pegadas al empaque.",
  "Fedecacao FEAR 5 es genotipo de referencia; la tipicidad se gana en proceso limpio.",
  "Si la opción «del medio» te tienta, para: las mezclamos a propósito. Piensa como panel ciego.",
  "Termina con ganas de compartir: diploma + Sembrar + foro. Eso es generación Colab.",
]
