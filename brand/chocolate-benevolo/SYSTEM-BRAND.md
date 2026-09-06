# Chocolate Benevolo · Sistema de marca (enriquecido)

> Marca acelerada cacaotier · R&D Cacao Colab  
> Propósito: *Benevolencia del oficio, en formato de antojo.*  
> Fuentes: `KEY-VALUES.md` · `BRAND-BOOK.md` · `SYSTEM-PACKAGING.md` · `LEAN-TO-PRO.md`

---

## 1. Portafolio (locked wordmarks · con punto)

| Línea | Formato | Job | Firma | Inspiración de sistema |
|-------|--------|-----|-------|------------------------|
| **Bars.** | 80 g carton | Antojo indulgente | Swirls navy + mazorca + FEAR 5 | Cartón impreso propio |
| **Bons.** | Bombón grande · caja ~50 mm | Regalo / pastelería | Pod-ridge + relleno | **Deit** — familia + ingredientes principales |
| **Nibs.** | 150–250 g | Snack / cocina | Header orange / navy | Misma casa gráfica |
| **Coberturas.** | 1 kg | Obrador | % hero | Misma casa gráfica |
| **Fizz.** | Lata 355 ml | Gaseosa de cacao | Lata blanca + dúo ilustrado | **DAYDRINK** — blanco + personajes + `A & B` |

---

## 2. Arquitectura verbal

### Locked
- Marca: **Chocolate Benevolo** · monograma **CB**
- Wordmarks de línea en Bodoni Ultra Black Italic + punto
- Promesa: *Buen chocolate indulgente.*
- URL: chocolatebenevolo.co · WhatsApp +57 310 222 7848
- Casa: Zurych SAS · NSA-0011242-2021 · R&D Colab

### Patrones de naming por línea

| Línea | Patrón | Ejemplo |
|-------|--------|---------|
| Bars. | Producto cerrado | `Bars.` |
| Bons. | `Bons. con {ingredientes}` (Deit) | *Bons. con caramelo, malvavisco y galleta* |
| Nibs. | Origen / uso | `Nibs.` · tostados |
| Coberturas. | `%` + uso | `70%` · temperar |
| Fizz. | `CACAO & {par}` (DAYDRINK) | `CACAO & LIMÓN` |

---

## 3. Sistemas de empaque adoptados (sin copiar marcas)

### 3.1 Patrón Deit → Bons.
- Categoría fija: **Bombón grande**
- Flex: sabor + lista de ingredientes principales
- Misma estructura L0/L1/L2; solo cambia el sabor
- Ver `packaging/bons/FAMILY-FLAVORS.md`

### 3.2 Patrón DAYDRINK → Fizz.
- Empaque: **lata** · fondo **blanco**
- Hero: dúo ilustrado (cacao + par de sabor) en escena lúdica
- Nombre de producto tipográfico: **CACAO & X**
- Tagline con wit (mitad cacao / mitad refresco)
- Neto: **355 ml (12 FL OZ)**
- Ver `packaging/fizz/SYSTEM.md`

### 3.3 Patrón propio Bars. → casa gráfica
- Swirls navy gruesos · mazorca · ripples · sello FEAR 5 · extrusión `#C43A18`
- Base de arte: `bars-fear5-front-art.jpg` / PDF dieline

---

## 4. Color & tipo

| Token | Hex | Uso |
|-------|-----|-----|
| orange | `#F05A28` | Bars./Bons. energía |
| coral | `#FF6A3D` | Acentos |
| navy | `#15243F` | Swirls / dorso |
| champagne | `#E8C9A0` | Detalles |
| cream | `#F7F1EE` | Texto sobre oscuro |
| cocoa | `#140e0a` | Footer / web dark |
| white | `#FFFFFF` | **Fizz. lata** · tipografía hero |
| shadow | `#C43A18` | Extrusión wordmark |

**Tipo producto:** Bodoni Ultra Black Italic (solo wordmarks).  
**Tipo UI/legal:** Outfit / sans.  
**Fizz. display pair:** sans bold condensed para `CACAO & LIMÓN` (legible en curva de lata).

---

## 5. Co-brand Colab

- Retail Benevolo: CB locked
- Canal Colab / feria: CB + ardilla opcional (nunca reemplaza CB)
- Fizz. puede llevar mini ardilla en costado Colab edition

---

## 6. Claims

Solo verificables. Prohibido: medallas inventadas, orgánico del terminado sin certificación, stock fingido.

---

## 7. Handoff

```bash
python3 brand/chocolate-benevolo/packaging/build_faithful.py   # Bons./Nibs/Coberturas
python3 brand/chocolate-benevolo/packaging/build_fizz_cans.py  # Fizz. latas
```

Skill: `.cursor/skills/benevolo-packaging-dieline/`  
Calidad: [The Dieline](https://thedieline.com/)
