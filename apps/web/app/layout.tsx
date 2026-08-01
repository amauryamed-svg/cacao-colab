import type { Metadata } from "next"
import Link from "next/link"
import { Fraunces, Outfit } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/nav/Navbar"
import OnboardingGate from "@/components/onboarding/OnboardingGate"
import UTMCapture from "@/components/analytics/UTMCapture"
import CookieConsentBanner from "@/components/legal/CookieConsentBanner"

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
})

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://cacaocolab.org"),
  title: {
    default: "cacaotier · Cacao Fine-Flavor",
    template: "%s · cacaotier",
  },
  description:
    "Escuela futurista y marketplace del cacao Fine-Flavor: Master Cacaotier, Master Chocolatier y aprendizaje aplicado de finca a chocolate.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
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
    <html lang="es" className={`h-full scroll-smooth ${fraunces.variable} ${outfit.variable}`}>
      <body className="min-h-full flex flex-col antialiased">
        <UTMCapture />
        <Navbar />
        <OnboardingGate>
          <main className="flex-1">{children}</main>
        </OnboardingGate>
        <footer className="colab-footer">
          <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              <strong>cacaotier</strong> · un proyecto de Amaury Amed · {new Date().getFullYear()}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/amauryamed">Amaury · perfil</Link>
              <Link href="/aprende/cacaotier">Master Cacaotier</Link>
              <Link href="/legal/privacidad">Privacidad</Link>
              <Link href="/legal/terminos">Términos</Link>
              <Link href="/legal/cookies">Cookies</Link>
              <Link href="/legal">Legal</Link>
              <a href="https://cauacolombia.co" target="_blank" rel="noopener noreferrer">
                cauacolombia.co
              </a>
              <a href="https://wa.me/573102227848" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </footer>
        <CookieConsentBanner />
      </body>
    </html>
  )
}
