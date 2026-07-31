export type LegalSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export type LegalDocument = {
  slug: string
  title: string
  summary: string
  updated: string
  version: string
  sections: LegalSection[]
}
