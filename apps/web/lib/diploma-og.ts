import { getSiteUrl } from "@/lib/site"
import { gradeLabel, type DiplomaPayload } from "@/lib/campus-rigor"

export function diplomaAbsoluteUrl(path: string) {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`
}

/** Open Graph image — lo que LinkedIn / X muestran al compartir. */
export function diplomaOgImageUrl(diploma: DiplomaPayload) {
  const params = new URLSearchParams({
    name: diploma.name,
    title: diploma.title,
    grade: gradeLabel(diploma.grade),
    course: diploma.course,
  })
  return `${getSiteUrl()}/api/og/diploma?${params.toString()}`
}

function brandForCourse(course: string) {
  if (course.includes("benevolo")) return "Chocolate Benevolo"
  if (course.includes("catador")) return "Master Catador de Cacao"
  if (course.includes("chocolatier")) return "Master Chocolatier"
  return "Master Cacaotier"
}

function hashtagsForCourse(course: string): string[] {
  const base = [
    "#CacaoColab",
    "#FineFlavor",
    "#ChocolateColombiano",
    "#Cacaotier",
    "#BeanToBar",
    "#Edutainment",
    "#Certificacion",
  ]
  if (course.includes("chocolatier")) {
    return ["#MasterChocolatier", "#Chocolate70", "#CoEx", ...base]
  }
  if (course.includes("catador")) {
    return ["#MasterCatador", "#Catacion", "#Sensory", ...base]
  }
  if (course.includes("benevolo")) {
    return ["#Benevolo", "#MarcaCacao", "#HoReCa", ...base]
  }
  return ["#MasterCacaotier", "#Fermentacion", "#Tipicidad", ...base]
}

/**
 * Copy listo para pegar en LinkedIn (LinkedIn solo scrapea la URL;
 * el texto del post hay que pegarlo en el compositor).
 */
export function diplomaLinkedInCopy(diploma: DiplomaPayload, absoluteUrl: string) {
  const brand = brandForCourse(diploma.course)
  const grade = gradeLabel(diploma.grade)
  const tags = hashtagsForCourse(diploma.course).join(" ")

  const hook =
    diploma.course.includes("chocolatier")
      ? "barra 70 %, tipicidad y criterio de panel — no un curso genérico."
      : diploma.course.includes("catador")
        ? "catación Fine-Flavor con rigor de oficio y territorio."
        : diploma.course.includes("benevolo")
          ? "marca acelerada con origen y deseo de mercado."
          : "fermentación, finca idónea y tipicidad araucana."

  return [
    `Acabo de cerrar ${brand} en Cacao Colab — ${grade}.`,
    "",
    `Diploma digital de oficio cacaotero: ${hook}`,
    "",
    "Si trabajas cacao, chocolate o HoReCa y quieres certificar tu criterio Fine-Flavor, la ruta está abierta:",
    absoluteUrl,
    "",
    tags,
  ].join("\n")
}

export function diplomaShareMeta(diploma: DiplomaPayload, pagePath: string) {
  const absolute = diplomaAbsoluteUrl(pagePath)
  const og = diplomaOgImageUrl(diploma)
  const g = gradeLabel(diploma.grade)
  const brand = brandForCourse(diploma.course)
  const title = `${diploma.name} cerró ${brand} · ${g}`
  const description = `Diploma digital verificable · Cacao Colab. ${g}. Certifica tu criterio Fine-Flavor en cacaocolab.org.`

  return {
    absolute,
    og,
    title,
    description,
    linkedInCopy: diplomaLinkedInCopy(diploma, absolute),
    openGraph: {
      title,
      description,
      url: absolute,
      siteName: "Cacao Colab",
      locale: "es_CO",
      type: "website" as const,
      images: [
        {
          url: og,
          width: 1200,
          height: 630,
          alt: `${diploma.name} · ${brand} · Cacao Colab`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [og],
    },
  }
}
