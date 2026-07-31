import Link from "next/link"
import type { LegalDocument } from "@/lib/legal"

export default function LegalDocView({ doc }: { doc: LegalDocument }) {
  return (
    <article className="legal-doc">
      <header className="legal-doc__header">
        <p className="eyebrow text-colab-green">Legal · Cacao Colab</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-colab-forest leading-tight mt-3">
          {doc.title}
        </h1>
        <p className="mt-4 text-sm text-colab-forest/65 max-w-2xl leading-relaxed">{doc.summary}</p>
        <p className="mt-3 text-[11px] uppercase tracking-wider text-colab-forest/40">
          Versión {doc.version} · Actualizado {doc.updated}
        </p>
      </header>

      <nav className="legal-doc__toc" aria-label="Contenido">
        <p className="text-[11px] font-bold uppercase tracking-wider text-colab-forest/40 mb-2">Contenido</p>
        <ol>
          {doc.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="legal-doc__body">
        {doc.sections.map((section) => (
          <section key={section.id} id={section.id} className="legal-doc__section">
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={`${section.id}-p-${index}`}>{paragraph}</p>
            ))}
            {section.bullets && section.bullets.length > 0 && (
              <ul>
                {section.bullets.map((item, index) => (
                  <li key={`${section.id}-b-${index}`}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <footer className="legal-doc__footer">
        <Link href="/legal">← Todas las políticas</Link>
        <Link href="/cuenta/entrar">Crear cuenta / entrar</Link>
      </footer>
    </article>
  )
}
