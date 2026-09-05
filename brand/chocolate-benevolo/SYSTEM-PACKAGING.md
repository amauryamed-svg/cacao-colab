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
| Bars. wrap | 180 × 95 mm | 3 mm | 4 mm |
| Bons. label | 70 × 50 mm (frente caja/manga) | 3 mm | 3 mm |
| Bons. sleeve | 220 × 80 mm (desarrollo manga) | 3 mm | 4 mm |
| Nibs. pouch face | 120 × 180 mm (cara frontal) | 3 mm | 5 mm |
| Cobertura block | 140 × 90 mm (cara 1 kg) | 3 mm | 4 mm |
| Display counter | 300 × 200 mm (frente) | 3 mm | 5 mm |

> **V0** = planos de diseño en repo. **V1** = dieline oficial del convertidor. No mandar V0 a troquel sin validar fábrica.

---

## 3. Líneas

### 3.1 Bars. (existente)
- Arte canónico: `apps/web/public/benevolo/packaging/`
- Wordmark: `logos/bars-wordmark.svg`
- Categoría: duja de marañón sugar free · 80 g

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
