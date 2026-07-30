import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import TrackedLink from "@/components/analytics/TrackedLink"
import {
  evidenceLabels,
  getKnowledgeTopic,
  knowledgeSlugs,
} from "@/lib/knowledge-base"

export function generateStaticParams() {
  return knowledgeSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const topic = getKnowledgeTopic(slug)
  if (!topic) return {}
  return {
    title: `${topic.title} · Conocimiento`,
    description: topic.summary,
  }
}

export default async function KnowledgeTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const topic = getKnowledgeTopic(slug)
  if (!topic) notFound()

  return (
    <div className="bg-colab-cream min-h-screen">
      <header className="bg-colab-forest">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <Link href="/conocimiento" className="eyebrow text-colab-cream/45 hover:text-colab-yellow">
            ← Base de conocimiento
          </Link>
          <span className="kb-evidence mt-8 inline-block">{evidenceLabels[topic.evidence]}</span>
          <p className="eyebrow text-colab-yellow mt-5">{topic.eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-6xl font-black text-colab-cream leading-tight mt-3">
            {topic.title}
          </h1>
          <p className="text-colab-cream/60 mt-6 leading-relaxed">{topic.summary}</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="space-y-5">
          {topic.body.map((paragraph) => (
            <p key={paragraph} className="text-colab-forest/70 leading-relaxed text-[0.95rem]">
              {paragraph}
            </p>
          ))}
        </div>

        <section className="mt-12">
          <p className="eyebrow text-colab-green">Referencias</p>
          <ul className="mt-5 space-y-3">
            {topic.links.map((link) => (
              <li key={link.href}>
                <TrackedLink
                  href={link.href}
                  event="knowledge_link_clicked"
                  targetName={topic.slug}
                  source={link.label}
                  external={link.href.startsWith("http")}
                  className="kb-ref"
                >
                  <strong>{link.label}</strong>
                  {link.note && <span>{link.note}</span>}
                </TrackedLink>
              </li>
            ))}
          </ul>
        </section>

        {topic.relatedCampus && topic.relatedCampus.length > 0 && (
          <section className="mt-12 border-t border-colab-forest/10 pt-10">
            <p className="eyebrow text-colab-green">Continúa en el Colab</p>
            <div className="flex flex-wrap gap-3 mt-5">
              {topic.relatedCampus.map((href) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full border border-colab-forest/15 px-5 py-2.5 text-xs font-bold text-colab-forest"
                >
                  {href.replace(/^\//, "").replaceAll("/", " · ") || "inicio"} →
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
