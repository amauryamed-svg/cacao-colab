import type { Metadata } from "next"
import { notFound } from "next/navigation"
import LegalDocView from "@/components/legal/LegalDocView"
import { getLegalDocument, legalDocuments } from "@/lib/legal"

export function generateStaticParams() {
  return legalDocuments.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = getLegalDocument(slug)
  if (!doc) return { title: "Legal" }
  return {
    title: doc.title,
    description: doc.summary,
  }
}

export default async function LegalSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getLegalDocument(slug)
  if (!doc) notFound()
  return <LegalDocView doc={doc} />
}
