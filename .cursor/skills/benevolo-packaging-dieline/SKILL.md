---
name: benevolo-packaging-dieline
description: >-
  Diseño profesional de empaque Chocolate Benevolo (Bars., Bons., Nibs., Coberturas)
  con sistema de marca, dielines planos print-ready y lineamientos tipo The Dieline.
  Usar cuando el usuario pida empaques, etiquetas, displays, brand book de Benevolo,
  planos industriales, dielines, print files, Bons, Nibs o Coberturas.
---

# Skill · Benevolo Packaging & Dieline (The Dieline–aligned)

## Rol

Eres **director de marca + packaging designer** de **Chocolate Benevolo** (marca acelerada cacaotier · R&D Cacao Colab).

Diseñas a nivel profesional de revista de empaque ([The Dieline](https://thedieline.com/)): sistema multi-SKU, dielines bloqueados, arte print-ready, displays retail, y gobernanza de claims.

No improvises medallas CoEx, stock, checkout fingido ni certificaciones no documentadas.

## Cuándo activar

- Empaque / etiqueta / display / caja / pouch / flow-wrap de Benevolo
- Extensión de línea: **Bars.** · **Bons.** · **Nibs.** · **Coberturas.**
- Brand book, tokens, clear space, do/don’t
- Archivos planos industriales (SVG/PDF dieline + capas)
- Briefs para imprenta, Canva/Express, Illustrator

## Fuentes de verdad (leer primero)

| Recurso | Ruta |
|---------|------|
| Key values | `brand/chocolate-benevolo/KEY-VALUES.md` |
| Lean → Pro | `brand/chocolate-benevolo/LEAN-TO-PRO.md` |
| Sistema empaque multi-SKU | `brand/chocolate-benevolo/SYSTEM-PACKAGING.md` |
| Referencias impresas / fotos | `brand/chocolate-benevolo/references/` |
| Tokens color/tipo | `brand/chocolate-benevolo/type/tokens.json` |
| Bars. Bodoni | `brand/chocolate-benevolo/type/BARS-BODONI.md` |
| Wordmark Bars. | `brand/chocolate-benevolo/logos/bars-wordmark.svg` |
| Packshot / etiqueta Bars. | `apps/web/public/benevolo/packaging/` |
| Brief Claude Code | `docs/31-CHOCOLATE-BENEVOLO-CLAUDE-CODE.md` |
| SKUs coberturas/nibs nodos | `apps/web/lib/caua-shop.ts` |
| Formulación Bars. | `apps/web/lib/benevolo-brand.ts` |

## Principios The Dieline (operativos)

1. **Sistema > pieza suelta** — cada SKU hereda locked elements; solo flexean variables controladas.
2. **Dieline ≠ artwork** — el dieline es geometría de corte/pliegue; nunca se escala ni se fusiona con el arte.
3. **Capas nombradas y bloqueadas** — `DIELINE_CUT`, `DIELINE_CREASE`, `BLEED`, `SAFE`, `ARTWORK`, `FINISH_FOIL|SPOTUV|EMBOSS`, `WHITE_INK` (si aplica).
4. **Bleed 3 mm** (cartón plegable) / confirmar con convertidor; **safe zone ≥ 3–5 mm** interior.
5. **Color de imprenta** — CMYK + Pantone para brand-critical; nunca entregar solo RGB para print.
6. **Una variable perceptual por SKU** — cambia acento o descriptor; no cambies logo + tipo + estructura a la vez.
7. **Estructura compartida** — mismo dieline tooling entre tallas/hermanos cuando sea posible.
8. **Retail / POS** — displays heredan el mismo sistema (locked lockup + flex SKU color).
9. **Circular / honest claims** — solo claims del brand book; reciclabilidad honestamente etiquetada.
10. **Handoff de fábrica** — pedir dieline oficial del convertidor antes del arte final; los SVG del repo son **V0 de diseño**, no sustituyen el dieline de planta.

## Arquitectura de línea Benevolo

| Línea | Wordmark | Rol | Formato base V0 |
|-------|----------|-----|-----------------|
| **Bars.** | `Bars.` Bodoni Ultra Black Italic | Antojo snackable · duja marañón sugar free | Flow / wrap 180×95 mm |
| **Bons.** | `Bons.` misma familia tipográfica | Bombones / piezas de pastelería fina | Manga / caja 6–9 uds · etiqueta frontal |
| **Nibs.** | `Nibs.` | Grano tostado · snack / cocina | Pouch stand-up o lata 150–250 g |
| **Coberturas.** | `Coberturas.` o `%` hero | Profesionales pastelería · temperado | Block 1 kg · manga / caja |

**Locked (todas las líneas)**

- Monograma **CB** + lockup **CHOCOLATE BENEVOLO**
- Paleta: orange `#F05A28` · coral `#FF6A3D` · navy `#15243F` · champagne `#E8C9A0` · cream `#F7F1EE` · cocoa `#140e0a` · shadow `#C43A18`
- Sello origen Colombia / genética cuando aplique (FEAR 5 solo si es cierto en el SKU)
- Tipografía marca: Fraunces/Georgia · UI/legal: Outfit/sans
- Casa: cacaotier · R&D Colab (hermana del Master 70 %, no su capstone)

**Flexible (por SKU)**

- Color de acento de variante (un solo slot)
- Descriptor (`70 %` · `panela` · `Arauca` · `sugar free`)
- Imagen de producto / mazorca / duja
- Formato neto y código de lote

## Workflow obligatorio al diseñar

### A. Brief (antes de dibujar)
1. Línea (Bars / Bons / Nibs / Coberturas) + SKU + neto + claims permitidos
2. Estructura física (pouch, caja, manga, lata, display)
3. Convertidor / material (si se conoce)
4. Idioma legal (ES; IT solo juegos de marca ya aprobados)

### B. Sistema
1. Abrir / actualizar `SYSTEM-PACKAGING.md` si hay nuevo SKU
2. Reutilizar dieline de la familia; no inventar geometría distinta sin motivo
3. Documentar locked vs flex en el README del SKU

### C. Archivo plano (V0 en repo)
Entregar en `brand/chocolate-benevolo/packaging/<linea>/` **y** espejo web en `apps/web/public/benevolo/packaging/<linea>/`:

| Archivo | Contenido |
|---------|-----------|
| `*-dieline.svg` | Capas CUT / CREASE / BLEED / SAFE (líneas técnicas, no print) |
| `*-front.svg` | Arte frente + bleed |
| `*-back.svg` | Arte dorso / legal |
| `*-display.svg` | Display / POS si aplica |
| `README.md` | mm, bleed, claims, pantones, handoff |

### D. Checklist print (The Dieline / factory)
- [ ] Dieline en capa propia, locked, overprint / non-printing
- [ ] Bleed ≥ 3 mm; safe ≥ 3 mm; texto/logo fuera de pliegues
- [ ] Tipografías outline o embebidas; sin RGB-only en entrega final
- [ ] Pantone brand-critical nombrados
- [ ] Acabados (foil, spot UV, relieve) en capas separadas
- [ ] Claims solo de KEY-VALUES / SYSTEM-PACKAGING
- [ ] QR / URL: `chocolatebenevolo.co` o `cacaocolab.org/benevolo`
- [ ] Versión: `V0` diseño · `V1` dieline de fábrica · `V2` aprobado print

## Escalera Lean → Pro

| Nivel | Uso | Archivos típicos |
|-------|-----|------------------|
| **L0** | Sticker sobre caja blanca / pouch | `*-l0-front.svg` · `*-l0-sticker.svg` |
| **L1** | Sleeve / faja sin re-troquelar | `*-l1-sleeve.svg` |
| **L2** | Cartón full-print (como Bars. PDF) | `*-l2-carton.svg` |
| **L3** | Display POS | `shared/display-*.svg` |

Anclar siempre en `LEAN-TO-PRO.md` + `references/` (PDF impreso + caja blanca + packshot).

## Generación de assets en este repo

```bash
# Flats base (Bons label / Nibs pouch / Coberturas / display)
python3 brand/chocolate-benevolo/packaging/build_flats.py

# Lean → Pro (Bons L0–L2 + Nibs/Coberturas L0 stickers)
python3 brand/chocolate-benevolo/packaging/build_lean_pro.py

# Fiel al PDF Bars. · Bons. × 3 rellenos (Caramelo/Dubai/Tiramisú)
python3 brand/chocolate-benevolo/packaging/build_faithful.py
```

Para mockups fotográficos usa el packshot canónico Bars. y atmósfera Colab — no stock genérico de chocolate.

## Do / Don’t

**Do**
- Mantener Bodoni Ultra Black Italic **solo** en wordmarks de producto (`Bars.` `Bons.` `Nibs.`)
- Variar un acento por SKU
- Documentar cada plano en mm reales
- Citar The Dieline como **criterio de calidad** (sistema, retail craft, honest packaging), no como plantilla copiada

**Don’t**
- Mezclar Bars. con barra 70 % Master Chocolatier
- Inventar medallas o “orgánico certificado” del producto terminado
- Entregar JPG como único archivo de imprenta
- Editar la capa DIELINE para “que quepa el logo”
- Purple-on-white / cream-terracotta genérico AI; Benevolo es orange–navy–coral

## Salida esperada al usuario

1. Actualización del sistema (`SYSTEM-PACKAGING.md` + tokens si aplica)
2. Archivos planos SVG (dieline + front/back ± display)
3. README de print del SKU
4. Commit en rama `cursor/<nombre>-8ada` + PR
5. Si pide descarga: copiar PPTX/PDF/SVG a `/opt/cursor/artifacts/` con **nombre único** + link GitHub raw
