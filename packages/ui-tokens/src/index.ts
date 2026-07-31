/**
 * Paleta Cacao Colab — fuente única (docs/02-PLATFORM.md).
 * Ampliada 2026-07-31: tonos cacao/coral estilo Bars para universo dopaminérgico.
 */
export const colabColors = {
  yellow: "#F2C830",
  amber: "#C8A010",
  green: "#3D7A2C",
  forest: "#1A2E10",
  cream: "#F7F1EE",
  pod: "#87AA27",
  ink: "#1C3B26",
  mist: "#E8E0DA",
  /** Benevolo / Bars accents */
  coral: "#FF6A3D",
  champagne: "#E8C9A0",
  cocoa: "#3D2418",
  cocoaDeep: "#140e0a",
  clay: "#B9583B",
} as const;

export type ColabColorName = keyof typeof colabColors;

export const colabFonts = {
  /** Expressive display — Fraunces wired in apps/web layout */
  display: "var(--font-fraunces), Fraunces, Georgia, 'Times New Roman', serif",
  ui: "var(--font-outfit), Outfit, 'Segoe UI', sans-serif",
} as const;

/** Tema plano para React Native (StyleSheet no entiende CSS var/font-stack). */
export const mobileTheme = {
  colors: colabColors,
  fonts: {
    display: "serif",
    ui: "sans-serif",
  },
  spacing: (n: number) => n * 4,
} as const;
