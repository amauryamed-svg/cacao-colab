import type { Metadata } from "next"
import { getMoocZurychLesson, moocZurychLessons } from "@/lib/mooc-zurych"
import LessonPlayer from "@/components/aprende/LessonPlayer"
import type { Lesson } from "@/lib/lessons"
import Link from "next/link"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return moocZurychLessons.filter((l) => l.status === "available").map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const lesson = getMoocZurychLesson(slug)
  if (!lesson || lesson.status !== "available") return { title: "MOOC Zurych" }
  return {
    title: `${lesson.title} · MOOC Zurych · Cacao Colab`,
    description: lesson.summary,
  }
}

function toLesson(mooc: NonNullable<ReturnType<typeof getMoocZurychLesson>>): Lesson {
  return {
    slug: mooc.slug,
    number: mooc.number,
    title: mooc.title,
    emoji: "Z",
    duration: mooc.duration,
    xp: mooc.xp,
    companionIntro: mooc.companionIntro,
    companionMid: mooc.companionMid,
    companionQuiz: mooc.companionQuiz,
    companionComplete: mooc.companionComplete,
    companionTips: mooc.companionTips,
    cards: mooc.cards,
    quiz: mooc.quiz,
  }
}

export default async function MoocZurychLessonPage({ params }: Props) {
  const { slug } = await params
  const mooc = getMoocZurychLesson(slug)
  if (!mooc || mooc.status !== "available" || !mooc.quiz.question) {
    return (
      <div className="bg-colab-forest min-h-screen text-colab-cream px-4 py-24 max-w-lg mx-auto">
        <p className="eyebrow text-colab-yellow">MOOC Zurych</p>
        <h1 className="font-serif text-3xl font-bold mt-4">Módulo en preparación</h1>
        <p className="text-white/50 mt-4 text-sm leading-relaxed">
          Este capítulo se está escribiendo con fuentes de chocolatezurych.com y las redes de la marca.
        </p>
        <Link href="/aprende" className="inline-block mt-8 text-colab-yellow font-bold text-sm">
          ← Volver al campus
        </Link>
      </div>
    )
  }

  return <LessonPlayer lesson={toLesson(mooc)} track="mooc" />
}
