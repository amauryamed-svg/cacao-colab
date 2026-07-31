import type { Metadata } from "next"
import Link from "next/link"
import { legalDocuments } from "@/lib/legal"

export const metadata: Metadata = {
  title: "Políticas legales y privacidad",
  description:
    "Privacidad, términos, tratamiento de datos, cookies y ejercicio de derechos (UE, EE.UU., Colombia).",
}

export default function LegalIndexPage() {
  return (
    <div>
      <p className="eyebrow text-colab-green">Transparencia</p>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-colab-forest mt-3 leading-tight">
        Políticas del Colab
      </h1>
      <p className="mt-4 text-sm text-colab-forest/65 max-w-xl leading-relaxed">
        Prácticas modernas de privacidad para web y apps: opt-in al crear usuario, cookies con
        elección, y derechos bajo GDPR, CCPA/CPRA y habeas data colombiano.
      </p>
      <ul className="legal-index-list mt-10">
        {legalDocuments.map((doc) => (
          <li key={doc.slug}>
            <Link href={`/legal/${doc.slug}`}>
              <strong>{doc.title}</strong>
              <span>{doc.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
