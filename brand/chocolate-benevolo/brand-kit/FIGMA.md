# Figma · 4 minutos · Chocolate Benevolo

Figma es la mejor app de las tres para **editar** este sistema (capas + texto + vectores).

## 1. Nuevo archivo

1. Figma → New design file → nómbralo `Chocolate Benevolo · Bars. Brand Kit`.
2. Arrastra **toda** la carpeta `brand-kit/logos/` y `brand-kit/key-values/` al canvas (o File → Place image / SVG).
3. Cada SVG entra como un frame con grupos. Los `id` del SVG pasan a nombres de capa: `logo-cb`, `TYPE_CHOCOLATE`, `TYPE_BENEVOLO`, `type-bars`.

## 2. Fuente

Left sidebar → Tools → o el text tool → en el picker busca **Bodoni Moda** (Google Fonts, ya está en Figma). Usa:

- Lockup nominativo `CHOCOLATE`: Bodoni Moda Medium Italic, tracking ~460
- `B` / `O`: Bodoni Moda Black Italic, ~92 pt
- `enevol`: Bodoni Moda Black Italic, ~62 pt
- `Bars.`: Bodoni Moda Black Italic, fill `#FFFFFF`, capa duplicada offset +12 / +12 en `#C43A18`

Si importas `*-live.svg` y Figma pide “missing fonts”, Replace with **Bodoni Moda**.

## 3. Orden recomendado de frames

1. `chocolate-benevolo-lockup-live-on-orange` — lockup del mockup
2. `cb-monogram-white` — avatar / sello
3. `bars-wordmark-live` — wordmark producto
4. `kv-manifiesto-live` · `kv-promesa-live` · `kv-juego-live` · `kv-producto-live`
5. `kv-claims-do-live` · `kv-claims-dont-live`
6. `kv-board-1920` — one-pager
7. `palette` — swatches
8. Templates social / OG

## 4. Componentes (2 min extra)

Selecciona el lockup → Create component `CB / Lockup / Light`.
Variants: White / Navy / On orange / On navy / On cocoa.

El monograma CB es trazo (no Georgia block). No lo conviertas a texto: es vector custom.

## 5. Export

- Web / social: PNG 2×
- Print / otra mano: SVG o PDF
- Canva: exporta PNG o SVG por componente y súbelo al Brand Kit
