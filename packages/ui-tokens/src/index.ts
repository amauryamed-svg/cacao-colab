/**
 * Paleta ya fijada de Cacao Colab (docs/02-PLATFORM.md D8/D9). Fuente
 * única de verdad — apps/web la vuelca a `@theme` de Tailwind v4 en
 * globals.css, apps/mobile la consume directo como objeto JS/TS para
 * StyleSheet / NativeWind.
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
} as const;

export type ColabColorName = keyof typeof colabColors;

export const colabFonts = {
  display: "Georgia, 'Times New Roman', serif",
  ui: "Arial, Helvetica, sans-serif",
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
