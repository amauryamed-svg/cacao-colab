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
  poster?: string
  compositionPath: string
  lessonSlug?: string
  eyebrow: string
  summary: string
}

export const courseVideos: CourseVideo[] = [
  {
    id: "dualita-campus",
    track: "campus",
    title: "Dos velocidades. Una escuela.",
    durationLabel: "24 s",
    src: "/videos/intros/dualita-campus.mp4",
    compositionPath: "/videos/compositions/dualita-campus/index.html",
    eyebrow: "Intro · Dualita Campus",
    summary: "MOOC para contexto. Microlearning para hábitos. Masters para oficio.",
  },
  {
    id: "micro-cacao-bioactivo",
    track: "micro",
    title: "Cacao funcional: aprende a elegir",
    durationLabel: "20 s",
    src: "/videos/intros/micro-cacao-bioactivo.mp4",
    compositionPath: "/videos/compositions/micro-cacao-bioactivo/index.html",
    lessonSlug: "cacao-bioactivo",
    eyebrow: "Intro · Microlearning CAÚA",
    summary: "Cacao no es chocolate industrial. Elige con teobromina, flavanoles y origen.",
  },
  {
    id: "master-cacaotier",
    track: "master",
    title: "Diseña el sabor antes de tostarlo",
    durationLabel: "26 s",
    src: "/videos/intros/master-cacaotier.mp4",
    compositionPath: "/videos/compositions/master-cacaotier/index.html",
    eyebrow: "Intro · Master Cacaotier",
    summary: "Temperatura, pH y ventanas de precursores. La bitácora es la credencial.",
  },
  {
    id: "master-chocolatier",
    track: "master",
    title: "Del grano FEAR 5 a la gianduja",
    durationLabel: "26 s",
    src: "/videos/intros/master-chocolatier.mp4",
    compositionPath: "/videos/compositions/master-chocolatier/index.html",
    eyebrow: "Intro · Master Chocolatier",
    summary: "Lente CoEx, FEAR 5 de Quara y capstone Chocolate Benevolo.",
  },
]

export function getCourseVideo(id: string) {
  return courseVideos.find((video) => video.id === id) ?? null
}

export function getLessonIntroVideo(slug: string) {
  return courseVideos.find((video) => video.lessonSlug === slug) ?? null
}
