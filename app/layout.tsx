import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/nav/Navbar"
import OnboardingGate from "@/components/onboarding/OnboardingGate"

export const metadata: Metadata = {
  title: "Cacao Colab · CAÚA × Zurych",
  description:
    "Marketplace de cacao de especialidad colombiano y sistema de aprendizaje dual Dualita. CAÚA Colombia × Chocolate Zurych.",
  openGraph: {
    title: "Cacao Colab · CAÚA × Zurych",
    description: "El mejor cacao colombiano. Ahora aprendes con él.",
    siteName: "Cacao Colab",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <OnboardingGate>
          <main className="flex-1">{children}</main>
        </OnboardingGate>
        <footer className="bg-colab-forest text-colab-cream/55 text-xs font-sans">
          <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>Cacao Colab · CAÚA Colombia SAS × Zurych · {new Date().getFullYear()}</p>
            <div className="flex gap-4">
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
