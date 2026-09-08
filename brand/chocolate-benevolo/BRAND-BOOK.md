# Chocolate Benevolo · Brand Book

> Marca acelerada cacaotier · R&D Cacao Colab. Hermana del Master Chocolatier 70 % — **no** su capstone.
> Producto ancla: **Bars.** · Portafolio: **Bars. · Bons. · Nibs. · Coberturas.**
> Fuente de verdad de empaque: `SYSTEM-PACKAGING.md` + `LEAN-TO-PRO.md` + `references/` (este documento los resume, no los reemplaza).

---

## 1. Portada

**Chocolate Benevolo · Bars.**
Duja de Marañón sugar free. FEAR 5 de Quara. Se lee igual en español y en italiano.

---

## 2. Propósito de marca

**Línea madre**
> Benevolencia del oficio, en formato de antojo.

**Promesa (dorso impreso, verificada en el cartón real)**
> Buen chocolate indulgente.

**Juego de marca**
> Benevolo sin tilde. Chocolate Benevolo le pone las tildes a la e.

⚠️ **Inconsistencia detectada, sin resolver:** el arte ya impreso dice *"Bars. By **Benévolo**"* (con tilde) en la cara frontal — contradice la regla verbal de arriba ("Benevolo sin tilde" en el nombre corto). No se corrige aquí porque el cartón ya está impreso; el equipo debe decidir si es un error de imprenta a corregir en el próximo tiraje o si "By Benévolo" es una excepción deliberada del lockup.

---

## 3. Posicionamiento

| vs. | Diferencia de Benevolo |
|---|---|
| **Master Chocolatier 70 %** (Cacao Colab) | Chocolatier es el oficio 70 % estilo CoEx/Awards. Benevolo traduce ese criterio de origen a un producto de tendencia (duja/leche), como marca acelerada — no es la misma barra con otro empaque, ni su capstone. |
| **Gianduja / nut-spread genérico** | Marañón colombiano + FEAR 5 con origen legible, no pasta anónima industrial. |

---

## 4. Arquitectura verbal

| Clave | Valor |
|---|---|
| Marca | Chocolate Benevolo |
| Monograma | CB |
| Producto ancla | **Bars.** (con punto) |
| Líneas profesionales | **Bons.** · **Nibs.** · **Coberturas.** |
| Categoría Bars. | Chocolate de leche con marañón · sugar free (brief) |
| Formato Bars. | Neto 80 g |
| Origen | FEAR 5 · Quara Cacao · Tame · Arauca |
| Transformación | Zurych |
| Casa | Marca acelerada cacaotier / R&D Cacao Colab |
| Tono | Indulgente, honesto, territorial |

### Arquitectura de portafolio

| Línea | Audiencia | Job to be done | Firma visual |
|---|---|---|---|
| **Bars.** | Retail deseo | Antojo 80 g con origen legible | Swirls + mazorca + deboss `Bars.` |
| **Bons.** | Pastelería / regalo | Pieza individual · molde mazorca | Tapa naranja pod-ridge |
| **Nibs.** | Cocina / snack | Grano tostado | Header orange / body navy |
| **Coberturas.** | Chef / obrador | Temperar · % hero | Franja orange + % coral |

⚠️ **% cacao definitivo:** **45 %** (`Bars Benevolo (2).pdf`). El OCR viejo de `references/bars_benevolo_pdf_text.txt` decía 60 % — ya no se usa. El brief (`lib/benevolo-brand.ts`) sigue con sugar free / alulosa + stevia; el cartón (2) no lo escribe en el dorso. Sugar free sí va en el frente (DUJA DE MARAÑON / SUGAR FREE).

---

## 5. Logo system

- Monograma **CB** en círculo (locked, trazo fluido — no Georgia block). SVG: `logos/cb-monogram.svg`.
- Lockup vertical **CB + CHOCOLATE + BenevolO** en Bodoni: `CHOCOLATE` 500 italic tracked; **B** y **O** 900 italic más altas que `enevol`. SVG: `logos/chocolate-benevolo-lockup.svg` (texto vivo) y `logos/chocolate-benevolo-lockup-paths.svg` (outlined).
- Wordmarks de línea — `Bars.` `Bons.` `Nibs.` `Coberturas.` — en **Bodoni Ultra Black Italic**, con punto, fill blanco + sombra/extrusión `#C43A18`. Nunca para body ni UI.
  - Fallback web: Bodoni Moda 900 italic.
  - Spec: `type/BARS-BODONI.md` · SVG: `logos/bars-wordmark.svg`.
  - Prohibido: Arial Black, Impact, scripts redondeados genéricos, versalitas `BARS.`.
- **Brand Kit editable (Canva / Figma / Adobe Express):** `brand-kit/README.md`.

**Coexistencia con Cacao Colab:** el lockup CB + Chocolate Benevolo va **locked** en el empaque retail. La ardilla/wordmark Cacao Colab es **opcional**, solo en la cara Colab o en un display compartido — nunca reemplaza el CB.

---

## 6. Color system

| Token | Hex | Uso |
|---|---|---|
| `benevolo-orange` | `#F05A28` | Fondo empaque / hero energético |
| `benevolo-coral` | `#FF6A3D` | CTA, acentos web/print |
| `benevolo-navy` | `#15243F` | Swirls, dorso, tipografía secundaria |
| `benevolo-champagne` | `#E8C9A0` | Eyebrows, detalles |
| `benevolo-cream` | `#F7F1EE` | Texto sobre oscuro / fondos claros |
| `benevolo-cocoa` | `#140e0a` | Fondos web oscuros |
| `benevolo-shadow` | `#C43A18` | Extrusión wordmark `Bars.` |
| Blanco | `#FFFFFF` | Tipografía principal sobre naranja |

**Entrega de impresión:** CMYK + Pantone spot nombrados (mapeo a confirmar con el convertidor); RGB solo para mockups web. Ver `SYSTEM-PACKAGING.md §5`.

---

## 7. Tipografía

- **Wordmark de producto (obligatorio):** Bodoni Ultra Black Italic / 900 italic. Ver `type/tokens.json`.
- **Marca Chocolate Benevolo:** Bodoni (misma familia que Bars.; B y O ópticas). No Fraunces.
- **UI web:** Outfit o equivalente geométrico clean.
- **Legal / ingredientes:** sans compacta, alta legibilidad.

---

## 8. Fotografía / packshot

- Sujeto real: mazorca, duja, packshot Bars. con luz cálida — nunca stock genérico.
- Referencias maestras en `references/`: `bars_benevolo_pdf_p1_web.jpg` (arte impreso), `IMG_3797_59bc_web.jpg` (packshot + barra debossed), `bars_packshot_alt_web.jpg`, `bons_mazorca_web.jpg` (molde mazorca Bons.).

---

## 9. Empaque · sistema multi-SKU

> Documento completo: `SYSTEM-PACKAGING.md` (dielines, capas, pantones, POS, gobernanza) + `LEAN-TO-PRO.md` (qué ya existe impreso, escalera de niveles). Planos: `packaging/{bars,bons,nibs,coberturas,shared}/`. Skill del agente: `.cursor/skills/benevolo-packaging-dieline/SKILL.md`. Barra de calidad: [The Dieline](https://thedieline.com/).

### 9.1 Qué ya existe de verdad (imprenta real, no mock)

- **Bars.** — cartón pro ya troquelado: frente naranja + swirls navy + mazorca + sello FEAR 5 + monograma CB; dorso navy con *"Bars. By Benévolo · Buen Chocolate Indulgente."*; barra con `Bars.` debossed.
  - Copy legal definitivo (`Bars Benevolo (2).pdf`): *"Contiene: Cacao FEAR5 45% Trinitario con fermentación controlada. Leche en polvo avellanada y marañón salado."*
  - Dominio impreso: `ChocolaBenevolo.co` / `ChocolateBenevolo.co` (dos variantes en el arte — confirmar cuál es la canónica).
- **Bons.** — bombón dark físico con tapa textura "pod-ridge" naranja/coral jaspeado (firma visual de la línea).
- **Caja lean (prototipo)** — tuck-top blanca ~50×50×45 mm, notch semicircular, sin arte propio → candidata a etiqueta L0.

### 9.2 Escalera Lean → Pro

| Nivel | Qué es | Cuándo | Archivos |
|---|---|---|---|
| **L0** Lean sticker | Etiqueta frontal (+ tapa opcional) sobre caja blanca existente | Prueba, pop-up, primeras unidades | `*-l0-front.svg` |
| **L1** Lean sleeve | Faja/wrap sin re-troquelar | Series cortas, eventos | `*-l1-sleeve.svg` |
| **L2** Pro carton | Cartón plegable full-print (como Bars.) | Retail / preventa seria | `*-l2-carton.svg` |
| **L3** Pro display | Counter/POS multi-SKU | Tienda, feria, Colab | `shared/display-*.svg` |

**Regla:** subir de nivel sin romper elementos locked (CB, wordmark Bodoni, swirls, sello origen, claims).

### 9.3 Familias estructurales (V0 — planos de diseño, no dieline de fábrica)

| Familia | Dieline base | Bleed | Safe |
|---|---|---|---|
| Bars. wrap/carton | Arte impreso PDF (referencia real) | 3 mm | 4 mm |
| Bons. L0 sticker | Frente 50×45 · tapa 50×50 | 2 mm | 3 mm |
| Bons. L1 sleeve | 200×45 mm (wrap 4 caras) | 2 mm | 3 mm |
| Bons. L2 carton | Tuck-box plano ~220×120 mm | 3 mm | 3 mm |
| Nibs. L0 sticker | 60×80 mm | 2 mm | 3 mm |
| Cobertura L0 sticker | 70×50 mm | 2 mm | 3 mm |
| Nibs. pouch face (pro) | 120×180 mm | 3 mm | 5 mm |
| Cobertura block (pro) | 140×90 mm | 3 mm | 4 mm |
| Display counter L3 | 300×200 mm | 3 mm | 5 mm |

⚠️ **V0 = planos de diseño en este repo. V1 = dieline oficial del convertidor de fábrica. No mandar V0 a troquel sin validar con el convertidor.**

### 9.4 Locked vs. flex

**Locked (toda la casa):** monograma CB, lockup CHOCOLATE BENEVOLO, wordmark Bodoni Ultra Black Italic + punto + sombra `#C43A18`, swirls navy sobre campo naranja/coral, sello circular origen/FEAR 5 (si el SKU lo lleva), franja navy dorso para legal, URL + contacto Zurych/WhatsApp cuando aplique.

**Flex (una variable a la vez por línea):**

| Línea | Flex |
|---|---|
| Bars. | Ya cerrado (80 g · cacao 45 % · marañón) |
| Bons. | Sabor/relleno · acento de tapa (naranja pod) · uds por caja |
| Nibs. | Origen · neto 150–250 g |
| Coberturas. | % · endulzante · 1 kg |

### 9.5 Capas de archivo (obligatorio en todo plano)

```
DIELINE_CUT      # corte — non-printing
DIELINE_CREASE   # pliegue — non-printing
BLEED            # guía
SAFE             # guía
ARTWORK          # print
FINISH_*         # foil / spot UV / emboss (si aplica)
LEGAL            # ingredientes, lote, URL
```

### 9.6 Displays / POS

Un SKU hero por display (nunca collage de 6 productos en primer plano). Mismo lockup CB + Chocolate Benevolo. Plano: `packaging/shared/display-counter-v0.svg`.

### 9.7 Gobernanza

1. Nuevo SKU → actualizar la tabla de familias estructurales + carpeta `packaging/<línea>/`.
2. Claims nuevos → validar contra §12 (Do/Don't) antes de imprimir.
3. Cambios de plano → skill `.cursor/skills/benevolo-packaging-dieline/`.
4. Rumbo a imprenta → sustituir dieline V0 por dieline V1 del convertidor **sin mover** elementos locked.

---

## 10. Aplicaciones

- **Web:** `apps/web/app/benevolo/page.tsx` (landing Colab), packshot y packaging espejados en `apps/web/public/benevolo/`.
- **Shopify (cta primario):** `https://benevolo.shop/products/bars-benevolo` (colección `bars-benevolo`). Misma tienda que `cacao-colab.myshopify.com`. Preventa: ficha + carrito reales; el cobro/fulfillment del lote se confirma — no se afirma stock inmediato.
- **WhatsApp:** CTA secundario — *"Confirmar lote por WhatsApp"* — nunca un checkout paralelo inventado (ver §12).
- **Stories / diploma Dualita:** pendiente de plantillas — usar paleta y wordmark de este documento cuando se produzcan.

---

## 11. Aliados / co-branding

| Aliado | Rol |
|---|---|
| **cacaotier** | Marca acelerada · edutainment (casa) |
| **Zurych** | Transformación y oficio · fabricante real (Chocolate Zurych SAS, NSA-0011242-2021) |
| **Quara Cacao** | Nodo FEAR 5 · Arauca |
| **Master Chocolatier** (Cacao Colab) | Oficio 70 % CoEx que alimenta la marca — no el mismo producto |

**Regla de coexistencia con Cacao Colab:** en canal `ChocolateBenevolo.co` el lockup es CB puro. En canal/feria Cacao Colab, se permite CB + mini ardilla Colab en una esquina — la ardilla nunca reemplaza el CB.

---

## 12. Do / Don't

**Permitido**
- Bars. By Benevolo · Buen chocolate indulgente
- Cacao FEAR5 45 % Trinitario · fermentación controlada
- Leche en polvo avellanada y marañón salado
- Elaborado por Chocolate Zurych SAS · NSA-0011242-2021
- Contacto +57 310 222 7848 · chocolatebenevolo.co
- Cacao colombiano de origen · FEAR 5 (sello)
- Bons. · chocolatería profesional · molde mazorca
- Preventa / preorden (Bars. hoy)

**Prohibido**
- Medallas Cacao of Excellence / CoEx inventadas
- Stock o envío inmediato sin lote real
- Certificación orgánica del producto terminado (aún no)
- Confundir Benevolo con la barra 70 % Master Chocolatier (no es su capstone)
- Checkout de cobro real **con inventario confirmado** para Bars. mientras siga en preventa (la ficha Shopify Colab sí existe; no se afirma envío inmediato)

---

## 13. Assets checklist + carpetas

```
brand/chocolate-benevolo/
  BRAND-BOOK.md                    # este documento
  KEY-VALUES.md                    # identidad, claims, portafolio (fuente §3-4, §12)
  SYSTEM-PACKAGING.md              # sistema de empaque completo (fuente §9)
  LEAN-TO-PRO.md                   # qué existe impreso + escalera (fuente §9.1-9.2)
  logos/
    cb-monogram.svg
    chocolate-benevolo-lockup.svg
    chocolate-benevolo-lockup-paths.svg
    bars-wordmark.svg
  brand-kit/                       # Canva / Figma / Adobe Express
    README.md · CANVA.md · FIGMA.md · ADOBE-EXPRESS.md
    logos/ · key-values/ · colors/ · type/fonts/ · templates/ · png/
  type/
    tokens.json                    # colores, tipografía, refs de empaque
    BARS-BODONI.md
  packaging/
    README.md
    build_flats.py · build_lean_pro.py
    bars/  bons/  nibs/  coberturas/  shared/    # planos V0 por línea
  references/                      # material de campo (impreso real, prototipos, packshots)
    bars_benevolo_pdf_p1_web.jpg
    bars_benevolo_pdf_text.txt
    IMG_1139_2036_web.jpg
    IMG_3797_59bc_web.jpg
    bons_mazorca_web.jpg
```

### Criterios de aceptación

- [x] Ningún claim prohibido añadido en este documento
- [x] Paleta y tipografías documentadas con hex/uso
- [x] Packshot y etiqueta print referenciados como arte maestro
- [x] Diferencia clara Benevolo ≠ 70 % CoEx documentada
- [ ] Reconciliar "sugar free" (brief) vs. copy impreso real (§4, §9.1) — pendiente del equipo
- [ ] Confirmar dominio canónico `ChocolaBenevolo.co` vs `ChocolateBenevolo.co` — pendiente del equipo
- [ ] Confirmar si "By Benévolo" (con tilde, impreso) es error de imprenta o excepción — pendiente del equipo
