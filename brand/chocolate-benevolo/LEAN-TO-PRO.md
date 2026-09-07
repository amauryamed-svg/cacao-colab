# Benevolo · Lean → Pro (sistema de empaque)

> Anclado en lo **ya impreso**: `Bars Benevolo.pdf` + packshot físico + prototipo de caja blanca + Bons. (molde mazorca).  
> Referencias: `brand/chocolate-benevolo/references/`  
> Skill: `.cursor/skills/benevolo-packaging-dieline/` · barra de calidad [The Dieline](https://thedieline.com/)

---

## 1. Qué ya existe (realidad de imprenta)

### Bars. (pro carton ya troquelado)
- Dieline multi-panel: frente naranja + swirls navy + mazorca + sello FEAR 5 + monograma CB
- Costado URL `ChocolaBenevolo.co` / `ChocolateBenevolo.co`
- Dorso navy: *Bars. By Benévolo · Buen Chocolate Indulgente.*
- Contiene (copy impreso): leche FEAR5 **60 %** Trinitario · fermentación controlada · leche en polvo avellanada · marañón salado
- Elaborado: Chocolate Zurych SAS · NSA-0011242-2021 · WhatsApp +57 310 222 7848
- Barra con **Bars.** debossed

### Bons. (producto físico)
- **Bombón grande** dark + tapa textura mazorca en naranja/coral jaspeado
- Molde “pod-ridge” = firma visual de la línea Bons.
- Tres rellenos (flex por SKU):
  1. **Caramelo** — caramelo · malvavisco · galleta
  2. **Dubai** — pistacho · crocante · mantequilla
  3. **Tiramisú** — bizcocho soletilla · café · crema · cacao en polvo

### Caja lean (prototipo)
- Tuck-top blanca ~**50 × 50 × 45 mm**, notch semicircular
- Sin arte → **canvas L0** (etiqueta front-face)

### Colab co-brand
- Ardilla + wordmark **CACAO COLAB** (canal Colab / R&D)
- En empaque Benevolo retail: CB + Chocolate Benevolo son locked; ardilla es **opcional** en cara Colab / display compartido

---

## 2. Escalera Lean → Pro

| Nivel | Nombre | Qué es | Cuándo | Archivos |
|-------|--------|--------|--------|----------|
| **L0** | Lean sticker | Etiqueta frontal (+ opcional tapa) sobre caja blanca existente | Prueba, pop-up, primeras unidades | `*-l0-front.svg` |
| **L1** | Lean sleeve | Faja / wrap que abraza la caja sin re-troquelar | Series cortas, eventos | `*-l1-sleeve.svg` |
| **L2** | Pro carton | Cartón plegable full-print (como Bars. PDF) | Retail / preventa seria | `*-l2-carton.svg` |
| **L3** | Pro display | Counter / POS multi-SKU | Tienda, feria, Colab | `shared/display-*.svg` |

**Regla:** subir de nivel **sin romper** locked elements (CB, wordmark Bodoni, swirls, sello origen, claims).

---

## 3. Locked vs flex (alineado a lo impreso)

### Locked
- Monograma **CB** en círculo
- **CHOCOLATE BENEVOLO**
- Wordmark de línea (`Bars.` `Bons.` `Nibs.`) Bodoni Ultra Black Italic + punto + sombra `#C43A18`
- Swirls navy sobre campo naranja/coral
- Sello circular origen / FEAR 5 (solo si el SKU lo lleva)
- Navy dorso para legal
- URL + contacto Zurych / WhatsApp cuando aplique

### Flex por línea
| Línea | Flex |
|-------|------|
| Bars. | Ya definido (80 g · leche 60 % · marañón) |
| Bons. | Nombre de relleno (Caramelo / Dubai / Tiramisú) · descriptor de 3 capas · uds por caja |
| Nibs. | Origen · neto 150–250 g |
| Coberturas. | % · endulzante · 1 kg |

---

## 4. Caja Bons. — medidas L0 (prototipo)

Asumidas del mock físico (ajustar con calibre):

| Panel | mm |
|-------|-----|
| Frente / dorso | 50 × 45 |
| Laterales | 50 × 45 |
| Tapa | 50 × 50 |
| Notch | Ø ~12 mm (solo estructura) |

Bleed etiqueta L0: **2 mm** (sticker) · Safe: **3 mm**

---

## 5. Copy canónico Bons. (V0, coherente con Bars. impreso)

**Frente (locked):** `Bons.` · CHOCOLATE BENEVOLO · molde mazorca  
**Frente (flex):** nombre del relleno + 3 capas  
**Dorso lean:** Buen chocolate indulgente. · Contiene: [relleno] · Elaborado Zurych / R&D Colab.  
**Contacto:** +57 310 222 7848 · chocolatebenevolo.co  

| SKU | Sub frente | Contiene (dorso) |
|-----|------------|------------------|
| Caramelo | Caramelo · malvavisco · galleta | Tres capas: caramelo, malvavisco y galleta |
| Dubai | Pistacho · crocante · mantequilla | Tres capas: pistacho, crocante y mantequilla |
| Tiramisú | Soletilla · café · crema cacao | Bizcocho soletilla, café, crema y cacao en polvo |

Claims solo verificables; no inventar medallas.

---

## 6. Coexistencia Colab

- Canal **ChocolateBenevolo.co** → lockup CB
- Canal **Cacao Colab** / feria Colab → CB + mini ardilla Colab en esquina (no reemplaza CB)
