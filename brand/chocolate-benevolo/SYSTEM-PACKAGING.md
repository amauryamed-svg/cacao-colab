# Chocolate Benevolo · Sistema de empaque multi-SKU

> Brand system para **Bars. · Bons. · Nibs. · Coberturas.**  
> Criterio de calidad: [The Dieline](https://thedieline.com/) (packaging systems, retail & POS, print craft).  
> Skill agente: `.cursor/skills/benevolo-packaging-dieline/SKILL.md`

---

## 1. Modelo locked / flex

### Locked (identidad de casa)
- Monograma **CB**
- Lockup **CHOCOLATE BENEVOLO**
- Paleta: ver `type/tokens.json`
- Wordmarks de línea en **Bodoni Ultra Black Italic** + punto (`Bars.` `Bons.` `Nibs.`)
- Franja legal inferior + URL
- Motivo swirls navy (familia gráfica del packshot Bars.)

### Flex (una variable a la vez)
| Variable | Uso |
|----------|-----|
| Acento de variante | Slot de color secundario |
| Descriptor | `%` · origen · sugar free · panela |
| Hero visual | Mazorca / duja / nibs / cobertura |
| Formato neto | 80 g · 150 g · 1 kg · caja 6–9 |

---

## 2. Familias estructurales (V0 diseño)

| Familia | Dieline base | Bleed | Safe |
|---------|--------------|-------|------|
| Bars. wrap / carton | Arte impreso PDF (referencia) | 3 mm | 4 mm |
| Bons. L0 sticker | Frente 50 × 45 · tapa 50 × 50 (caja blanca) | 2 mm | 3 mm |
| Bons. L1 sleeve | 200 × 45 mm (wrap 4 caras) | 2 mm | 3 mm |
| Bons. L2 carton | Tuck-box plano ~220 × 120 mm | 3 mm | 3 mm |
| Nibs. L0 sticker | 60 × 80 mm | 2 mm | 3 mm |
| Cobertura L0 sticker | 70 × 50 mm | 2 mm | 3 mm |
| Nibs. pouch face (pro) | 120 × 180 mm | 3 mm | 5 mm |
| Cobertura block (pro) | 140 × 90 mm | 3 mm | 4 mm |
| Display counter L3 | 300 × 200 mm | 3 mm | 5 mm |

> **V0** = planos de diseño en repo. **V1** = dieline oficial del convertidor. No mandar V0 a troquel sin validar fábrica.  
> Escalera completa: `LEAN-TO-PRO.md`.

---

## 3. Líneas

### 3.1 Bars. (existente)
- Arte canónico: `apps/web/public/benevolo/packaging/`
- Wordmark: `logos/bars-wordmark.svg`
- Categoría ancla: duja de marañón sugar free · 80 g · **FEAR5 45 %**
- SKU flex (mismo lockup CB + Bars.; cambia acento + descriptor):
  - **San Vicente 41** — morado `#4A0D6B` · clon **FSV41** (no es 41 % de cacao) · `brand-kit/skus/san-vicente-41/`
  - **70 % panela** — cocoa `#2A140C` · dark endulzado con panela · **no** es el capstone Master 70 % · `brand-kit/skus/70-panela/`
- Fotos de SKU flex: Commons (ver `brand-kit/skus/SOURCES.md`). No son packshot de fábrica.

### 3.2 Bons. (chocolatería profesional)
- Piezas / bombones Benevolo
- Caja o manga con etiqueta frontal + faja
- Claim: *chocolatería profesional · oficio snackable*
- Flex: sabor (FEAR 5 · marañón · dark) vía acento + descriptor

### 3.3 Nibs.
- Nibs tostados para cocina y mesa
- Pouch o lata; cara frontal con tipografía `Nibs.` + % / origen
- Coexistencia con nibs de red CAÚA × Zurych: Benevolo es **marca de casa**; nodos conservan origen

### 3.4 Coberturas.
- Blocks / mangas 1 kg para obrador
- Hero tipográfico del `%` (70 · 85 · 100) + endulzante
- Ficha técnica en dorso (origen, nodos, uso: temperar / barra / cobertura)

---

## 4. Capas de archivo (obligatorio)

```
DIELINE_CUT      # corte — non-printing
DIELINE_CREASE   # pliegue — non-printing
BLEED            # guía
SAFE             # guía
ARTWORK          # print
FINISH_*         # foil / spot UV / emboss (si aplica)
LEGAL            # ingredientes, lote, URL
```

---

## 5. Pantones de referencia (brand-critical)

Mapear en preprensa (aprox. a confirmar con convertidor):

| Token | HEX | Uso print |
|-------|-----|-----------|
| benevolo-orange | `#F05A28` | Fondo Bars. / energía |
| benevolo-coral | `#FF6A3D` | Acentos / CTA |
| benevolo-navy | `#15243F` | Swirls / dorso |
| benevolo-champagne | `#E8C9A0` | Detalles |
| benevolo-shadow | `#C43A18` | Extrusión wordmark |

Entrega final: **CMYK + pantone spot** nombrados; RGB solo para mock web.

---

## 6. Displays / POS

- Mismo lockup CB + Chocolate Benevolo
- Un SKU hero por display (no collage de 6 productos en el primer plano)
- Material: cartón microcorrugado o foil según presupuesto
- Plano: `packaging/shared/display-counter-v0.svg`

---

## 7. Gobernanza

1. Nuevo SKU → actualizar esta tabla + carpeta `packaging/<linea>/`
2. Claims → `KEY-VALUES.md`
3. Agente → skill `benevolo-packaging-dieline`
4. Imprenta → sustituir dieline V0 por dieline de fábrica (V1) sin mover arte locked
