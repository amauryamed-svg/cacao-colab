import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Etiqueta Bars. Benevolo · prueba de impresión",
  description:
    "Arte exacto del packshot Colab (frente) + dorso SVG para prueba de impresión Bars. Benevolo.",
  robots: { index: false, follow: false },
}

const FILES = [
  {
    href: "/benevolo/packaging/bars-fear5-front-art.jpg",
    label: "Arte exacto · bars-fear5-front-art.jpg",
    note: "Crop del packshot Colab — usa ESTE para imprimir el frente",
  },
  {
    href: "/benevolo/packaging/bars-fear5-front.svg",
    label: "Frente SVG 180×95 mm",
    note: "Montaje print que enlaza el arte exacto",
  },
  {
    href: "/benevolo/packaging/bars-fear5-front-guides.svg",
    label: "Frente + guías bleed/trim",
    note: "Para la imprenta",
  },
  {
    href: "/benevolo/packaging/bars-fear5-back.svg",
    label: "Dorso SVG",
    note: "Ingredientes · legal · QR placeholder",
  },
  {
    href: "/benevolo/bars-fear5.png",
    label: "Packshot completo",
    note: "Referencia fotográfica con barra",
  },
] as const

export default function BarsEtiquetaPrintPage() {
  return (
    <div className="bg-[#140e0a] min-h-screen text-colab-cream">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <Link href="/benevolo" className="eyebrow text-[#E8C9A0]/45 hover:text-[#FF6A3D]">
          ← Chocolate Benevolo
        </Link>
        <p className="eyebrow text-[#FF6A3D] mt-8">R&D · print · arte exacto Colab</p>
        <h1 className="font-serif text-4xl md:text-5xl font-black mt-3 leading-tight">
          Etiqueta Bars.<br />
          <em className="text-[#FF6A3D] not-italic">Mismo diseño del packshot</em>
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/55">
          El frente ya no es una recreación tipográfica: es el crop del packshot oficial
          (<code className="text-[#FF6A3D]"> /benevolo/bars-fear5.png</code>.
          Descarga el JPG/PNG de arte + el SVG de montaje 180×95 mm.
        </p>

        <ul className="mt-10 space-y-3">
          {FILES.map((file) => (
            <li key={file.href}>
              <a
                href={file.href}
                download
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:border-[#FF6A3D]/40 transition-colors"
              >
                <span>
                  <strong className="block text-sm">{file.label}</strong>
                  <small className="text-white/40">{file.note}</small>
                </span>
                <span className="text-[#FF6A3D] text-sm font-bold">Descargar →</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          <figure className="rounded-2xl border border-white/10 overflow-hidden bg-[#F05A28]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/benevolo/packaging/bars-fear5-front-art.jpg"
              alt="Frente exacto Bars. Benevolo — packshot Colab"
              className="w-full h-auto"
            />
            <figcaption className="px-4 py-3 text-xs text-white/70 bg-[#140e0a]">
              Frente · arte exacto del Colab
            </figcaption>
          </figure>
          <figure className="rounded-2xl border border-white/10 overflow-hidden bg-[#15243F]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/benevolo/packaging/bars-fear5-back.svg"
              alt="Dorso etiqueta Bars. Benevolo"
              className="w-full h-auto"
            />
            <figcaption className="px-4 py-3 text-xs text-white/70 bg-[#140e0a]">Dorso · vector</figcaption>
          </figure>
        </div>
      </main>
    </div>
  )
}
