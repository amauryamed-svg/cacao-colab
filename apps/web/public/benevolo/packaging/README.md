# Bars. · etiqueta print (vectores SVG)

Arte vectorial del empaque **Chocolate Benevolo · Bars.** propuesto en el Colab, listo para prueba de impresión.

## Archivos

| Archivo | Uso |
|---------|-----|
| [`bars-fear5-front.svg`](./bars-fear5-front.svg) | Frente wrapper **180 × 95 mm** |
| [`bars-fear5-back.svg`](./bars-fear5-back.svg) | Dorso / legal + ingredientes |
| `/benevolo/bars-fear5.png` | Packshot fotográfico de referencia |

## Descarga directa (prod)

- https://www.cacaocolab.org/benevolo/packaging/bars-fear5-front.svg
- https://www.cacaocolab.org/benevolo/packaging/bars-fear5-back.svg
- Vista R&D: `/rd/bars-etiqueta`

## Capas (IDs en el SVG)

**Frente:** `layer-guides` · `layer-background` · `layer-pattern` · `layer-brand-lockup` · `layer-wordmark` · `layer-cacao-pod` · `layer-seal` · `layer-footer` · `layer-colab-mark`

**Dorso:** `layer-guides` · `layer-background` · `layer-copy-panel` · `layer-ingredients` · `layer-qr-cta`

Para prueba de imprentas: abre el SVG, cambia `layer-guides` a `display="inline"` (bleed / trim / safe).

## Print notes

- Artboard: **180 × 95 mm** + bleed **3 mm** (guías).
- Colores: naranja `#F05A28`, navy `#15243F`, blanco, sombra tipográfica `#C43A18`.
- QR del dorso es placeholder — sustituir por QR real a `https://www.cacaocolab.org/benevolo`.
- La mazorca del frente es vector estilizado; para foto real, importa el packshot y enmascara sobre `layer-cacao-pod`.
- Tipografías del SVG usan stacks de sistema (Georgia / Arial Black) para edición rápida; para tiraje final sustituye por las fuentes de marca licenciadas.

## Contenido de marca

- **Bars.** · Duja de Marañón sugar free · Neto 80 g
- FEAR 5 · Quara · Arauca · Zurych
- Sugar free (alulosa + stevia)
- Sin medalla CoEx atribuida en empaque
