import Link from "next/link"
import SquirrelSVG from "@/components/brand/SquirrelSVG"
import CacaoColabWordmark from "@/components/brand/CacaoColabWordmark"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-colab-forest/95 backdrop-blur-sm border-b border-colab-green/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <SquirrelSVG size={30} expression="happy" className="squirrel-bob" />
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
            href="/shop"
            className="hidden sm:inline text-xs font-bold text-colab-cream/70 hover:text-colab-yellow font-sans tracking-wide transition-colors"
          >
            Tienda
          </Link>
          <Link
            href="/nodo"
            className="hidden lg:inline text-xs font-bold text-colab-cream/70 hover:text-colab-yellow font-sans tracking-wide transition-colors"
          >
            Nodos
          </Link>
          <Link
            href="/conocimiento"
            className="hidden md:inline text-xs font-bold text-colab-cream/70 hover:text-colab-yellow font-sans tracking-wide transition-colors"
          >
            Conocimiento
          </Link>
          <Link
            href="/manifiesto"
            className="hidden lg:inline text-xs font-bold text-colab-cream/70 hover:text-colab-yellow font-sans tracking-wide transition-colors"
          >
            Manifiesto
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
          <Link
            href="/unete"
            className="bg-colab-yellow text-colab-forest text-xs font-bold px-4 py-2 rounded-full hover:bg-colab-amber transition-colors font-sans"
          >
            Unirme
          </Link>
        </div>
      </div>
    </nav>
  )
}
