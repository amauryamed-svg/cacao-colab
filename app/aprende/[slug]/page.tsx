import { notFound } from 'next/navigation'
import { lessons, lessonSlugs } from '@/lib/lessons'
import LessonPlayer from '@/components/aprende/LessonPlayer'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return lessonSlugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const lesson = lessons.find(l => l.slug === slug)
  if (!lesson) return {}
  return {
    title: `${lesson.emoji} ${lesson.title} · Dualita · Cacao Colab`,
    description: `Módulo ${lesson.number} de CAÚA Academy — ${lesson.duration} · ${lesson.xp} XP`,
  }
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lesson = lessons.find(l => l.slug === slug)
  if (!lesson) notFound()

  return <LessonPlayer lesson={lesson} />
}
