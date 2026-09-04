# Claude Code · Brand Book + Web ChocolateBenevolo.co + capas Canva/Express

> **Prompt operativo para Claude Code.** Ejecuta este documento de punta a punta.
> Fuente de verdad: monorepo `cacaocolab.org` (marca acelerada cacaotier · R&D Colab).
> Dominio de marca: **ChocolateBenevolo.co** · Producto: **Bars.** (Duja de Marañón sugar free · 80 g · FEAR 5 Quara).

---

## 0. Rol y misión

Eres un director de marca + product designer + implementador front.

**Entrega tres frentes en el mismo sprint:**

1. **Brand Book** (PDF/MD + assets por capas) de Chocolate Benevolo.
2. **Sitio web** `ChocolateBenevolo.co` (landing + producto + preorden), visualmente fiel al packshot Bars. y coherente con Cacao Colab.
3. **Kit por capas** importable a **Adobe Express** y **Canva** (plantillas sociales, empaque, stories, ads).

No improvises medallas CoEx, stock, ni checkout inventado. Benevolo es **preventa / preorden**.

---

## 1. Fuente de verdad (leer antes de diseñar)

### 1.1 Código y copy canónicos

| Recurso | Ruta |
|---------|------|
| Producto + claims | `apps/web/lib/knowledge-base.ts` → `benevoloProduct` |
| Formulación / misiones Dualita | `apps/web/lib/benevolo-brand.ts` |
| Landing Colab actual | `apps/web/app/benevolo/page.tsx` |
| Packshot oficial | `apps/web/public/benevolo/bars-fear5.png` |
| Etiqueta print (arte exacto) | `apps/web/public/benevolo/packaging/` |
| Tokens Colab (coral/cocoa) | `packages/ui-tokens/src/index.ts` |
| Spec producto | `docs/00-SPEC.md` (D39 Benevolo) · `docs/17-ECOSISTEMA-CONOCIMIENTO.md` |

### 1.2 Identidad verbal (no negociable)

- **Marca:** Chocolate Benevolo  
- **Wordmark producto:** Bars. (con punto)  
- **Categoría:** Duja de Marañón sugar free  
- **Tagline:** *Duja de Marañón sugar free. FEAR 5 de Quara. Se lee igual en español y en italiano.*  
- **Juego de marca:** *Benevolo sin tilde. Chocolate Benevolo le pone las tildes a la e.*  
- **Origen:** FEAR 5 · Quara Cacao · Tame · Arauca  
- **Transformación:** Zurych  
- **Casa:** marca acelerada cacaotier / R&D Cacao Colab (hermana del Master Chocolatier 70 %, **no** su capstone)  
- **Formato:** Bars. · Neto 80 g  
- **Dulzor:** alulosa + stevia · sin azúcar añadida  
- **CTA:** Preordenar por WhatsApp (no checkout fingido)

### 1.3 Claims permitidos / prohibidos

**Permitidos**

- Duja de Marañón sugar free  
- FEAR 5 Quara · Arauca · fermentación controlada  
- Leche en polvo orgánica  
- Preventa / preorden  
- Output R&D Colab · criterio de origen  

**Prohibidos**

- “Ganó medalla Cacao of Excellence / CoEx”  
- Stock o envío inmediato sin lote real  
- Certificación orgánica del producto terminado (aún no)  
- Confundir Benevolo con la barra 70 % Master Chocolatier  

### 1.4 Paleta (packshot + Colab)

| Token | Hex | Uso |
|-------|-----|-----|
| `benevolo-orange` | `#F05A28` | Fondo empaque / hero energético |
| `benevolo-coral` | `#FF6A3D` | CTA, acentos web |
| `benevolo-navy` | `#15243F` | Swirls, dorso, tipografía secundaria |
| `benevolo-champagne` | `#E8C9A0` | Eyebrows, detalles |
| `benevolo-cream` | `#F7F1EE` | Texto sobre oscuro / fondos claros |
| `benevolo-cocoa` | `#140e0a` | Fondos web oscuros |
| `benevolo-shadow` | `#C43A18` | Extrusión wordmark Bars. |
| Blanco | `#FFFFFF` | Tipografía principal sobre naranja |

### 1.5 Sistema tipográfico

- **Display / wordmark Bars. (OBLIGATORIO):** **Bodoni Ultra Black Italic** (peso Ultra Black / 900, itálica). Con punto. Fill `#FFFFFF` · extrusión `#C43A18`.  
  - Fallback web: [Bodoni Moda](https://fonts.google.com/specimen/Bodoni+Moda) 900 italic.  
  - Spec: `brand/chocolate-benevolo/type/BARS-BODONI.md` · SVG: `brand/chocolate-benevolo/logos/bars-wordmark.svg`.  
  - **Prohibido** en Bars.: Arial Black, Impact, scripts redondeados genéricos, caps BARS.  
- **Marca Chocolate Benevolo:** serif display (Georgia / Fraunces family).  
- **UI web:** Outfit o equivalente geométrico clean.  
- **Legal / ingredients:** sans compacta, alta legibilidad.  

### 1.6 Motivos gráficos (capas)

1. Fondo naranja sólido  
2. Swirls navy orgánicos  
3. Círculos concéntricos blancos (halo mazorca)  
4. Mazorca FEAR 5 (foto/render — capa imagen)  
5. Monograma circular **CB**  
6. Wordmark **Bars.** + sombra/extrusión  
7. Lockup **CHOCOLATE BENEVOLO / DUJA DE MARAÑÓN / SUGAR FREE**  
8. Sello **CACAO COLOMBIANO DE ORIGEN · FEAR 5**  
9. Footer legal + URL  

---

## 2. Entregable A — Brand Book

### 2.1 Estructura del documento (12–16 páginas)

1. Portada · Chocolate Benevolo · Bars.  
2. Propósito de marca (benevolencia del oficio + deseo snackable)  
3. Posicionamiento vs Master Chocolatier 70 % vs commodity gianduja  
4. Arquitectura verbal (nombre, tagline, tono: indulgente, honesto, territorial)  
5. Logo system (CB monograma + wordmark + Bars.) · clear space · mínimos  
6. Color system + combinaciones permitidas  
7. Tipografía + jerarquías  
8. Fotografía / packshot rules (mazorca, duja, luz cálida, sin stock genérico)  
9. Empaque Bars. 80 g (frente/dorso, bleed, claims)  
10. Aplicaciones: web, WhatsApp, stories, diploma Dualita  
11. Aliados (Quara × Zurych × cacaotier) — co-branding rules  
12. Do / Don’t  
13. Assets checklist + carpetas  

### 2.2 Formatos de salida Brand Book

```
brand/chocolate-benevolo/
  BRAND-BOOK.md                 # versión editable
  brand-book.pdf                # export lectura
  logos/
    cb-monogram.svg
    chocolate-benevolo-lockup.svg
    bars-wordmark.svg
  colors/tokens.json
  type/specimen.md
  packaging/
    (symlink o copia de apps/web/public/benevolo/packaging/)
  layers/                       # ver §4 Canva/Express
```

### 2.3 Criterios de aceptación Brand Book

- [ ] Ningún claim prohibido  
- [ ] Paleta y tipografías documentadas con hex/uso  
- [ ] Packshot y etiqueta print referenciados como arte maestro  
- [ ] Diferencia clara Benevolo ≠ 70 % CoEx  

---

## 3. Entregable B — Sitio ChocolateBenevolo.co

### 3.1 Principios UX/UI

- **Una composición** en el primer viewport (no dashboard).  
- **Brand first:** “Chocolate Benevolo” / **Bars.** como señal hero, no solo nav.  
- Fondo con atmósfera (naranja/cocoa, swirls o packshot full-bleed) — no plano vacío.  
- Hero full-bleed con packshot o crop de manga.  
- Primer viewport: marca + 1 headline + 1 frase + CTA preorden (+ packshot). Sin stats ni clutter.  
- Sin cards decorativas; cards solo si hay interacción.  
- Motion sutil: 2–3 (reveal tipográfico, swirl drift, CTA pulse).  
- Evitar clichés AI (púrpura, cream+terracotta genérico, glow excess).  

### 3.2 IA de páginas (MVP)

| Ruta | Objetivo |
|------|----------|
| `/` | Hero aspiracional + Bars. + preorden WhatsApp |
| `/bars` | Ficha producto 80 g · ingredientes · origen FEAR 5 · aliados |
| `/historia` | Oficio · Quara × Zurych · Colab (sin inventar premios) |
| `/preorden` | CTA WhatsApp + qué incluye preventa + qué aún no |
| `/legal` | Privacidad / términos mínimos |

Idioma principal: **ES**. Opcional toggle IT para el juego “se lee igual en español y en italiano”.

### 3.3 Stack sugerido

- Next.js (App Router) o Astro estático en repo aparte `chocolate-benevolo-web`, **o** subdominio/ruta en monorepo si Amaury lo decide.  
- Tokens CSS variables desde la paleta §1.4.  
- Imágenes desde packshot + packaging.  
- Analytics: UTM `utm_source` / `utm_campaign=benevolo_bars` hacia HubSpot vía flujo Colab cuando el lead cruza a cacaocolab.org/unete.  

### 3.4 Copy hero sugerido (editable)

- Eyebrow: `Bars. · Duja de Marañón sugar free`  
- H1: `Chocolate Benevolo`  
- Sub: tagline canónico  
- CTA primario: `Preordenar Bars. →` (WhatsApp)  
- CTA secundario: `Ver el oficio →` (`/historia` o cacaocolab.org/campus/benevolo)  

WhatsApp base (Colab):  
`https://wa.me/573102227848?text=Hola%20Chocolate%20Benevolo%2C%20quiero%20preordenar%20Bars.%20Duja%20de%20Mara%C3%B1%C3%B3n%20sugar%20free%20FEAR%205%20Quara%20(80g).`

### 3.5 Criterios de aceptación Web

- [ ] Mobile + desktop  
- [ ] Hero = composición única brand-first  
- [ ] Packshot fiel (no mock genérico)  
- [ ] Preorden WhatsApp funciona  
- [ ] Sin medalla CoEx / sin stock fingido  
- [ ] Link cruzado a cacaocolab.org (Colab / Dualita) sin diluir Benevolo  

---

## 4. Entregable C — Capas Canva + Adobe Express

### 4.1 Objetivo

Entregar **plantillas por capas** que un no-diseñador pueda editar en Canva o Adobe Express sin romper la marca.

### 4.2 Convención de capas (orden de abajo → arriba)

Usar **nombres idénticos** en Canva, Express e Illustrator:

| # | Nombre de capa | Editable | Contenido |
|---|----------------|----------|-----------|
| 01 | `bg-orange` | color | Fondo `#F05A28` |
| 02 | `bg-navy` | color | Fondo dorso `#15243F` (solo piezas dorso) |
| 03 | `pattern-swirls` | lock opcional | Swirls navy/orange |
| 04 | `pattern-ripples` | lock | Círculos concéntricos |
| 05 | `photo-pod` | replace | Mazorca FEAR 5 |
| 06 | `photo-product` | replace | Packshot / barra |
| 07 | `logo-cb` | lock | Monograma CB |
| 08 | `type-brand` | text | CHOCOLATE BENEVOLO |
| 09 | `type-category` | text | DUJA DE MARAÑÓN / SUGAR FREE |
| 10 | `type-bars` | text | Bars. + sombra |
| 11 | `seal-fear5` | lock | Sello origen |
| 12 | `type-legal` | text | Neto 80 g · URL |
| 13 | `cta-button` | text+link | Preordenar |
| 14 | `guides` | hide | Bleed/safe (print only) |

### 4.3 Piezas a generar (kit mínimo)

**Print / empaque**

- Frente wrapper 180×95 mm (+ bleed 3 mm)  
- Dorso wrapper 180×95 mm  

**Social (export PNG)**

- Story 1080×1920  
- Post 1080×1080  
- Landscape ad 1200×628  
- WhatsApp status 1080×1920 (safe zone superior)  

**Web**

- OG 1200×630 ChocolateBenevolo.co  
- Favicon / app icon 512  

### 4.4 Cómo publicar en Canva

1. Exportar cada pieza desde SVG/PSD con capas nombradas §4.2 **o** armar Brand Kit Canva con logos + colores + fonts.  
2. Crear **Brand Kit · Chocolate Benevolo** (colores hex §1.4 + logos SVG).  
3. Duplicar plantillas “Team” con capas desbloqueadas solo en `type-*`, `photo-*`, `cta-button`.  
4. Documentar en `layers/CANVA.md`: qué se puede editar / qué no.  

### 4.5 Cómo publicar en Adobe Express

1. Subir logos SVG + packshot al proyecto Express.  
2. Crear **Brand** Express con paleta + fonts.  
3. Plantillas con **locked layers** para swirls/seal; texto editable para CTA.  
4. Documentar en `layers/ADOBE-EXPRESS.md`.  

### 4.6 Export técnico desde el repo

Desde `apps/web/public/benevolo/packaging/`:

- `bars-fear5-front-art.jpg` → capa `photo-product` / arte maestro frente  
- `bars-fear5-front.svg` + `bars-fear5-front-guides.svg` → print  
- `bars-fear5-back.svg` → dorso  

Generar además PNG transparentes por capa (swirls, seal, CB, Bars. wordmark) en `brand/chocolate-benevolo/layers/png/`.

### 4.7 Criterios de aceptación capas

- [ ] Nombres de capa consistentes Canva ↔ Express ↔ SVG  
- [ ] Brand Kit con hex correctos  
- [ ] Al menos 4 plantillas sociales + 2 print  
- [ ] Guía de 1 página: “qué editar / qué no tocar”  

---

## 5. Plan de ejecución Claude Code (orden)

```text
Fase 1 — Inventario
  - Leer §1 fuentes
  - Catalogar assets existentes packaging/ + packshot

Fase 2 — Brand Book
  - Escribir BRAND-BOOK.md
  - Extraer/limpiar logos SVG (CB, Bars., lockup)
  - tokens.json + specimen tipográfico
  - Export PDF

Fase 3 — Capas Canva/Express
  - Separar PNG/SVG por capa §4.2
  - Armar plantillas + docs CANVA.md / ADOBE-EXPRESS.md

Fase 4 — Web ChocolateBenevolo.co
  - Scaffold sitio §3
  - Hero packshot + preorden WhatsApp
  - Páginas /bars /historia /preorden /legal
  - OG image desde packshot
  - QA mobile/desktop

Fase 5 — Cierre
  - Checklist §2.3 §3.5 §4.7
  - README raíz con links de entrega
  - PR / deploy notes
```

---

## 6. Estructura de carpetas objetivo

```text
chocolate-benevolo/
  README.md
  docs/
    CLAUDE-CODE-BENEVOLO-BRAND.md   # este archivo (o symlink)
  brand/
    BRAND-BOOK.md
    brand-book.pdf
    logos/
    colors/tokens.json
    layers/
      CANVA.md
      ADOBE-EXPRESS.md
      png/
      svg/
  web/                              # ChocolateBenevolo.co
    app/ o src/
  packaging/                        # copia o referencia Colab packaging
```

---

## 7. Definition of Done

Claude Code solo cierra cuando:

1. Brand Book MD+PDF existe y pasa checklist §2.3  
2. Kit de capas Canva/Express documentado y con archivos exportables §4  
3. Web MVP de ChocolateBenevolo.co corre en local y cumple §3.5  
4. Todo el copy respeta claims permitidos/prohibidos  
5. README de entrega lista URLs, assets y “cómo editar en Canva/Express”  

---

## 8. Prompt corto (pegar al iniciar Claude Code)

```text
Lee docs/31-CHOCOLATE-BENEVOLO-CLAUDE-CODE.md y ejecuta las Fases 1–5.
Prioridad: (1) Brand Book, (2) capas Canva/Adobe Express con nombres §4.2,
(3) web MVP ChocolateBenevolo.co fiel al packshot apps/web/public/benevolo/bars-fear5.png.
No inventes medallas CoEx ni checkout. Preorden = WhatsApp canónico del brief.
Entrega en chocolate-benevolo/ (o ruta acordada) + README de handoff.
```

---

## 9. Contacto / canales

- Preorden WA: `+57 310 222 7848`  
- Colab: `https://www.cacaocolab.org/benevolo`  
- Etiqueta print R&D: `https://www.cacaocolab.org/rd/bars-etiqueta`  
- Campus Dualita: `https://www.cacaocolab.org/campus/benevolo`

---

## 10. Addendum 2026-09-04 — Origin Series (arquitectura de dos líneas)

Ejecutado el sitio de marca en repo aparte (`amauryamed-svg/chocolate-benevolo-web`,
deploy `https://chocolate-benevolo-web.vercel.app`, dominio `chocolatebenevolo.co/.com`
pendiente de compra). **No reemplaza nada de este brief** — "Bars." sigue exactamente
como está documentado en §1–§7 (paleta, tipografía, claims, packshot). Se añade una
segunda línea, **Origin Series**, con las 3 monoclonales oscuras de origen que Amaury
está posicionando en prensa (Infonegocios) y para el lanzamiento US de noviembre:

| Bar | Genotipo / lote | Región |
|---|---|---|
| Fear 5 | FEAR 5 (Federación Arauca 5) | Arauca |
| San Vicente 41 | Lote 41 | San Vicente de Chucurí, Santander |
| Saravena 13 | Lote 13 | Saravena, Arauca |

Origin Series tiene paleta y voz propias (oscura/celestial, geometría sagrada +
astrología como lenguaje de marca — nunca como claim de producto) documentadas en
`brand/ORIGIN-SERIES.md` del repo nuevo. Bars. y Origin Series son dos puertas del
mismo Benévolo: no comparten sistema visual, sí comparten origen Colab, marañón como
ingrediente de territorio, y las mismas reglas de claims permitidos/prohibidos (cero
medallas no obtenidas, cero cifras de fermentación inventadas).

El sitio nuevo vive fuera del monorepo y no depende de `Caua-Corp/caua-io` ni de
infraestructura de CAÚA — decisión explícita de Amaury dado el proceso de separación
en curso. `/benevolo` (esta página, R&D interno) ahora enlaza de vuelta al sitio de
marca ("Ver el sitio de marca →" en el hero).

---

## 11. Addendum 2026-09-04 (2) — Bars. cambia de nodo: Quara → La Querencia

**Cambio de fuente para el FEAR 5 de Bars.** El duja de marañón ya no se abastece del
nodo Quara Cacao (Tame, Arauca): ahora viene de **La Querencia**, finca de los
hermanos **Rafael y Liubha** en **Arbeláez, Cundinamarca** (~1.400 msnm,
4.27°N/74.42°O). Actualizado en `benevoloProduct` (`lib/knowledge-base.ts`:
`tagline`, `description`, `alliances`, `formula`, `claims`, `preorderWhatsapp`) y en
`app/benevolo/page.tsx` (hero, sección 01 · Mazorca).

**No confundir con el "Fear 5" de Origin Series (§10):** ese bar de exportación sigue
anclado a Arauca (modelo araucano, Fedecacao) — es el mismo genotipo FEAR 5, pero una
planta distinta, para una línea distinta. Bars. (gateway, Cundinamarca) y Origin
Series (exportación, Arauca) documentan dos siembras del mismo clon en dos fincas
distintas; no es un error, es la arquitectura real de sourcing de Benévolo.

**Narrativa de origen añadida** (sitio nuevo, `/origen#la-querencia` y
`brand/canvas/` del repo `chocolate-benevolo-web`): el viento cálido del valle del
Magdalena se encuentra con el frío del páramo de Sumapaz a la altura de la finca —
ese contraste térmico es lo que el sitio llama "cacao altitudinal", con un perfil
más caramelizado. La fermentación se documenta ahora como controlada y experimental,
45°C por 72 horas, buscando el máximo de precursores de *fine flavor*. El perfil de
sabor de Bars. se describe con marañón colombiano salado y una nota umami.

**Producto nuevo — Bons.**: bombones de Chocolate Benévolo con relleno de caramelo
salado de alulosa y marañón, mismo cacao FEAR 5 de La Querencia. Vive en
`/bons` del sitio nuevo — todavía no tiene página propia en este monorepo; si se
quiere reflejar aquí, seguiría el mismo patrón que `/benevolo`.

Estos cambios de origen/proceso vienen dictados directamente por Amaury en la sesión
del sitio nuevo — no son inferencia de IA. Quedan documentados aquí para que
`knowledge-base.ts` no vuelva a decir "Quara" en una futura edición sin haber leído
este addendum.  
