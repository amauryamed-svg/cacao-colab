/**
 * Fuente única de verdad de marca Cacao Colab (fijada en Spec v1, D8-D9, no se re-decide en v2).
 * apps/web la consume vía @theme en Tailwind (globals.css importa estos valores).
 * apps/mobile la consume vía el theme object de abajo (NativeWind / StyleSheet).
 * No hardcodear estos valores en ningún otro archivo — un solo lugar para el rebrand de licenciamiento
 * (Luker/Nacional) cuando llegue.
 */
export const colors = {
  colabYellow: "#F2C830", // primario
  colabAmber: "#C8A010", // hover
  colabGreen: "#3D7A2C", // secundario
  colabForest: "#1A2E10", // dark bg
  colabCream: "#F7F1EE", // Heirloom White
  colabPod: "#87AA27", // Pod Green
  colabInk: "#1C3B26", // forest claro
  colabMist: "#E8E0DA",
} as const;

export const fonts = {
  display: `Georgia, "Times New Roman", serif`,
  ui: "Arial, Helvetica, sans-serif",
} as const;

/** expo-font: mapeo a activos que apps/mobile debe cargar para igualar el display font en RN. */
export const mobileFontAssets = {
  display: "Georgia", // iOS system font; Android requiere activo .ttf embebido, ver docs/13-MOBILE.md
  ui: "Arial",
} as const;

export const motion = {
  squirrelBobMs: 2800,
  fadeUpMs: 600,
} as const;

export type ColorToken = keyof typeof colors;
