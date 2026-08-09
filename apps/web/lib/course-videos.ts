/**
 * Catálogo de intros edutainment (HyperFrames).
 * Fuente de scripts: apps/video/scripts/catalog.json
 * Render: apps/video → public/videos/intros/*.mp4
 */

export type CourseVideo = {
  id: string
  track: "campus" | "micro" | "master" | "mooc"
  title: string
  durationLabel: string
  src: string
  /** PNG/JPG del programa — cover antes de reproducir (nunca vacío). */
  poster?: string
  compositionPath: string
  lessonSlug?: string
  eyebrow: string
  summary: string
  /** Línea Dualita en el cover. */
  dualitaLine?: string
  /** Etiqueta del packshot (ej. Bars. FEAR 5). */
  packLabel?: string
}

export const courseVideos: CourseVideo[] = [
  {
    id: "dualita-campus",
    track: "campus",
    title: "Dos velocidades. Una escuela.",
    durationLabel: "24 s",
    src: "/videos/intros/dualita-campus.mp4",
    poster: "/atmosphere/coex-home.jpg",
    compositionPath: "/videos/compositions/dualita-campus/index.html",
    eyebrow: "Intro · Dualita Campus",
    summary: "MOOC para contexto. Microlearning para hábitos. Masters para oficio.",
    dualitaLine: "Soy Dualita, mascota del Colab. Te guío en dos velocidades.",
    packLabel: "Campus Dualita",
  },
  {
    id: "micro-cacao-bioactivo",
    track: "micro",
    title: "Cacao funcional: aprende a elegir",
    durationLabel: "20 s",
    src: "/videos/intros/micro-cacao-bioactivo.mp4",
    poster: "/atmosphere/cacao-pods-close.jpg",
    compositionPath: "/videos/compositions/micro-cacao-bioactivo/index.html",
    lessonSlug: "cacao-bioactivo",
    eyebrow: "Intro · Microlearning CAÚA",
    summary: "Cacao no es chocolate industrial. Elige con teobromina, flavanoles y origen.",
    dualitaLine: "Dualita: elige cacao con criterio — no con humo.",
    packLabel: "Micro CAÚA",
  },
  {
    id: "master-cacaotier",
    track: "master",
    title: "Diseña el sabor antes de tostarlo",
    durationLabel: "26 s",
    src: "/videos/intros/master-cacaotier.mp4",
    poster: "/atmosphere/ecoyuma-fear5.jpg",
    compositionPath: "/videos/compositions/master-cacaotier/index.html",
    eyebrow: "Intro · Master Cacaotier",
    summary: "Temperatura, pH y ventanas de precursores. La bitácora es la credencial.",
    dualitaLine: "Dualita abre Master Cacaotier: fermentación con tipicidad.",
    packLabel: "FEAR 5 · Ecoyuma",
  },
  {
    id: "master-chocolatier",
    track: "master",
    title: "Del grano FEAR 5 a la gianduja",
    durationLabel: "26 s",
    src: "/videos/intros/master-chocolatier.mp4",
    poster: "/benevolo/bars-fear5.png",
    compositionPath: "/videos/compositions/master-chocolatier/index.html",
    eyebrow: "Intro · Master Chocolatier",
    summary: "Lente CoEx, FEAR 5 de Quara y capstone Chocolate Benevolo.",
    dualitaLine: "Dualita te presenta la barra 70 % — tipicidad con puesta en escena.",
    packLabel: "Bars. · FEAR 5",
  },
]

export function getCourseVideo(id: string) {
  return courseVideos.find((video) => video.id === id) ?? null
}

export function getLessonIntroVideo(slug: string) {
  return courseVideos.find((video) => video.lessonSlug === slug) ?? null
}
