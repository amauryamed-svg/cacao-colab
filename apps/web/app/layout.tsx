import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/nav/Navbar"
import OnboardingGate from "@/components/onboarding/OnboardingGate"
import UTMCapture from "@/components/analytics/UTMCapture"

export const metadata: Metadata = {
  metadataBase: new URL("https://cacao-colab-web.vercel.app"),
  title: {
    default: "cacaotier · Cacao Fine-Flavor",
    template: "%s · cacaotier",
  },
  description:
    "Escuela futurista y marketplace del cacao Fine-Flavor: Master Cacaotier, Master Chocolatier y aprendizaje aplicado de finca a chocolate.",
  openGraph: {
    title: "cacaotier · Cultiva conocimiento. Cosecha sabor.",
    description: "Formación profesional, experimentación y mercado para el cacao Fine-Flavor.",
    siteName: "cacaotier · Cacao Colab",
    locale: "es_CO",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">
        <UTMCapture />
        <Navbar />
        <OnboardingGate>
          <main className="flex-1">{children}</main>
        </OnboardingGate>
        <footer className="bg-colab-forest text-colab-cream/55 text-xs font-sans">
          <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p><strong className="text-colab-cream">cacaotier</strong> · un proyecto de Amaury Amed · {new Date().getFullYear()}</p>
            <div className="flex gap-4">
              <a href="/aprende/cacaotier" className="hover:text-colab-yellow transition-colors">Master Cacaotier</a>
              <a href="https://cauacolombia.co" target="_blank" rel="noopener noreferrer" className="hover:text-colab-yellow transition-colors">cauacolombia.co</a>
              <a href="https://chocolatezurych.com" target="_blank" rel="noopener noreferrer" className="hover:text-colab-yellow transition-colors">chocolatezurych.com</a>
              <a href="https://wa.me/573102227848" target="_blank" rel="noopener noreferrer" className="hover:text-colab-yellow transition-colors">WhatsApp</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
