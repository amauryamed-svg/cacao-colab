import Link from "next/link"
import SquirrelSVG from "@/components/brand/SquirrelSVG"
import CacaoColabWordmark from "@/components/brand/CacaoColabWordmark"

const WA_URL =
  "https://wa.me/573102227848?text=Hola%20Cacao%20Colab%2C%20quiero%20saber%20más%20sobre%20el%20marketplace%20y%20Dualita."

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-colab-forest/95 backdrop-blur-sm border-b border-colab-green/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <SquirrelSVG size={30} />
          <CacaoColabWordmark size="sm" inverted />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/marketplace"
            className="hidden sm:inline text-xs font-bold text-colab-cream/70 hover:text-colab-yellow font-sans tracking-wide transition-colors"
          >
            Mercado
          </Link>
          <Link
            href="/marketplace/beneficios"
            className="hidden lg:inline text-xs font-bold text-colab-cream/70 hover:text-colab-yellow font-sans tracking-wide transition-colors"
          >
            Beneficios
          </Link>
          <Link
            href="/conocimiento"
            className="hidden md:inline text-xs font-bold text-colab-cream/70 hover:text-colab-yellow font-sans tracking-wide transition-colors"
          >
            Conocimiento
          </Link>
          <Link
            href="/benevolo"
            className="hidden lg:inline text-xs font-bold text-colab-cream/70 hover:text-colab-yellow font-sans tracking-wide transition-colors"
          >
            Benevolo
          </Link>
          <Link
            href="/aprende"
            className="hidden sm:inline text-xs font-bold text-colab-cream/70 hover:text-colab-yellow font-sans tracking-wide transition-colors"
          >
            Campus
          </Link>
          <Link
            href="/juega"
            className="hidden md:inline text-xs font-bold text-colab-cream/70 hover:text-colab-yellow font-sans tracking-wide transition-colors"
          >
            Sembrar
          </Link>
          <Link
            href="/cuenta"
            className="hidden sm:inline text-xs font-bold text-colab-cream/70 hover:text-colab-yellow font-sans tracking-wide transition-colors"
          >
            Mi cuenta
          </Link>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-colab-yellow text-colab-forest text-xs font-bold px-4 py-2 rounded-full hover:bg-colab-amber transition-colors font-sans"
          >
            Unirme
          </a>
        </div>
      </div>
    </nav>
  )
}
