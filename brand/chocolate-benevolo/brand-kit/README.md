# Chocolate Benevolo · Brand Kit Bars.

Sistema visual **editable** del lockup que vendiste en el mockup: monograma **CB**, **CHOCOLATE BenevolO** (Bodoni, B y O más altas) y **key values**.

No es un archivo en tu nube de Canva / Figma / Adobe Express. Yo no puedo entrar a esas cuentas. Esto **sí** es el sistema: vectores, capas nombradas, fuentes OFL y una guía de 4 minutos para importarlo donde edites.

## Qué hay aquí

| Carpeta | Para qué |
|---------|----------|
| `logos/` | CB + lockup + Bars. (outlined y live-text) |
| `key-values/` | Manifiesto, promesa, juego, producto, claims do/don’t |
| `colors/` | Hex + paleta + JSON |
| `type/fonts/` | Bodoni Moda 500/900 italic (OFL) — fallback de Bodoni Ultra Black |
| `motifs/` | Swirls navy + halo mazorca |
| `templates/` | Post 1080, story 1080×1920, OG 1200×630 |
| `png/` | Mismos assets rasterizados (Canva a veces prefiere PNG) |

## Dos familias de archivo (elige según la app)

1. **`*-live.svg`** — texto vivo (`<text>`). Figma e Illustrator lo abren como capas de texto. En Canva/Express a veces se aplana: si el texto no se edita, usa la outlined.
2. **Outlined / paths** — letras convertidas a path. Se ven iguales aunque no tengas la fuente. Editas color, escala y posición; no el glifo.

Print final de **Bars.**: licencia de **Bodoni Ultra Black Italic**. Aquí va **Bodoni Moda** (OFL) como fallback legal.

## Importar ahora

- [CANVA.md](CANVA.md) — Brand Kit Canva (colores + logos + plantillas)
- [FIGMA.md](FIGMA.md) — archivo Figma editable (arrastrar SVG + Bodoni Moda)
- [ADOBE-EXPRESS.md](ADOBE-EXPRESS.md) — Brand de Express

Regenerar outlined:

```bash
python3 brand/chocolate-benevolo/brand-kit/build_kit.py
```

## Capas (mismas en Canva, Express, Figma)

`bg-orange` · `bg-navy` · `logo-cb` · `type-brand` / `TYPE_CHOCOLATE` / `TYPE_BENEVOLO` · `type-category` · `type-bars` · `type-line` · `pattern-swirls` · `MOTIF_HALO`

## Claims

Solo lo de `../KEY-VALUES.md`. No CoEx fingido, no stock inventado, no confundir con Master 70 %.
