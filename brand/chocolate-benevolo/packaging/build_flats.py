#!/usr/bin/env python3
"""Genera flats SVG V0 · Bons / Nibs / Coberturas / Display (Benevolo)."""

from pathlib import Path

ROOT = Path(__file__).resolve().parent
PUBLIC = Path(__file__).resolve().parents[3] / "apps/web/public/benevolo/packaging"

ORANGE = "#F05A28"
CORAL = "#FF6A3D"
NAVY = "#15243F"
CHAMP = "#E8C9A0"
CREAM = "#F7F1EE"
SHADOW = "#C43A18"
WHITE = "#FFFFFF"
COCOA = "#140e0a"


def svg_doc(w_mm, h_mm, body: str, title: str) -> str:
    # 1mm = 1 user unit for print clarity; viewBox in mm
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{w_mm}mm" height="{h_mm}mm"
  viewBox="0 0 {w_mm} {h_mm}" role="img" aria-label="{title}">
  <title>{title}</title>
  <desc>Chocolate Benevolo · plano V0 diseño. Sustituir DIELINE por archivo de fábrica antes de troquel.</desc>
{body}
</svg>
'''


def guides(w, h, bleed=3, safe=4):
    return f'''  <g id="BLEED" fill="none" stroke="#00AEEF" stroke-width="0.25" stroke-dasharray="1 1">
    <rect x="{-bleed}" y="{-bleed}" width="{w+2*bleed}" height="{h+2*bleed}"/>
  </g>
  <g id="SAFE" fill="none" stroke="#39B54A" stroke-width="0.25" stroke-dasharray="1.5 1">
    <rect x="{safe}" y="{safe}" width="{w-2*safe}" height="{h-2*safe}"/>
  </g>
  <g id="DIELINE_CUT" fill="none" stroke="#FF00FF" stroke-width="0.35">
    <rect x="0" y="0" width="{w}" height="{h}"/>
  </g>
'''


def swirls(w, h, opacity=0.35):
    return f'''  <g id="MOTIF_SWIRLS" fill="none" stroke="{NAVY}" stroke-width="2.2" opacity="{opacity}">
    <path d="M {-5},{h*0.7} C {w*0.25},{h*0.2} {w*0.55},{h*1.1} {w*1.05},{h*0.35}"/>
    <path d="M {-8},{h*0.85} C {w*0.3},{h*0.35} {w*0.7},{h*1.15} {w*1.1},{h*0.55}"/>
  </g>
'''


def lockup(x, y, scale=1.0):
    return f'''  <g id="LOCKUP_CB" transform="translate({x},{y}) scale({scale})">
    <circle cx="8" cy="8" r="7.2" fill="none" stroke="{WHITE}" stroke-width="0.7"/>
    <text x="8" y="10.2" text-anchor="middle" font-family="Georgia, serif" font-size="6.5" font-weight="700" fill="{WHITE}">CB</text>
    <text x="20" y="7" font-family="Georgia, serif" font-size="4.2" font-weight="700" fill="{WHITE}" letter-spacing="0.8">CHOCOLATE</text>
    <text x="20" y="12.2" font-family="Georgia, serif" font-size="4.2" font-weight="700" fill="{CHAMP}" letter-spacing="0.8">BENEVOLO</text>
  </g>
'''


def wordmark(name: str, x, y, size=22, fill=WHITE, shadow=True):
    shadow_t = ""
    if shadow:
        shadow_t = f'<text x="{x+0.8}" y="{y+0.8}" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="{size}" font-style="italic" font-weight="900" fill="{SHADOW}">{name}</text>'
    return f'''  <g id="WORDMARK">
    {shadow_t}
    <text x="{x}" y="{y}" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="{size}" font-style="italic" font-weight="900" fill="{fill}">{name}</text>
  </g>
'''


def legal(w, h, line: str):
    return f'''  <g id="LEGAL">
    <text x="{w/2}" y="{h-3.5}" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.4" fill="{CREAM}" opacity="0.85">{line}</text>
  </g>
'''


def write(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print("wrote", path)


def bons_front():
    w, h = 70, 50
    body = f'''  <g id="ARTWORK">
    <rect x="-3" y="-3" width="{w+6}" height="{h+6}" fill="{ORANGE}"/>
{swirls(w, h, 0.4)}
{lockup(4, 4, 0.85)}
{wordmark("Bons.", 6, 30, 16)}
    <text x="6" y="38" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="3.2" fill="{CREAM}" letter-spacing="0.6">CHOCOLATERÍA PROFESIONAL</text>
    <text x="6" y="43" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.8" fill="{CHAMP}">FEAR 5 · pieza de oficio</text>
{legal(w, h, "chocolatebenevolo.co · preventa")}
  </g>
{guides(w, h, 3, 3)}
'''
    return svg_doc(w, h, body, "Benevolo Bons. · etiqueta frente V0")


def bons_sleeve():
    w, h = 220, 80
    body = f'''  <g id="ARTWORK">
    <rect x="-3" y="-3" width="{w+6}" height="{h+6}" fill="{ORANGE}"/>
{swirls(w, h, 0.3)}
{lockup(8, 8, 1.1)}
{wordmark("Bons.", 8, 48, 28)}
    <text x="8" y="58" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="5" fill="{CREAM}" letter-spacing="1">CAJA 6–9 · CHOCOLATERÍA PROFESIONAL</text>
    <text x="8" y="66" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="4" fill="{CHAMP}">Benevolencia del oficio, en formato de antojo.</text>
    <g id="PANEL_VARIANT" transform="translate(160,18)">
      <rect width="50" height="44" rx="2" fill="{NAVY}"/>
      <text x="25" y="18" text-anchor="middle" font-family="Georgia, serif" font-size="7" fill="{CHAMP}">VARIANTE</text>
      <text x="25" y="32" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="5" fill="{WHITE}">FEAR 5</text>
    </g>
{legal(w, h, "Neto según ficha · chocolatebenevolo.co · R&amp;D Cacao Colab")}
  </g>
  <g id="DIELINE_CREASE" fill="none" stroke="#00FFFF" stroke-width="0.3" stroke-dasharray="2 1.5">
    <line x1="73" y1="0" x2="73" y2="{h}"/>
    <line x1="147" y1="0" x2="147" y2="{h}"/>
  </g>
{guides(w, h, 3, 4)}
'''
    return svg_doc(w, h, body, "Benevolo Bons. · manga / sleeve V0")


def nibs_front():
    w, h = 120, 180
    body = f'''  <g id="ARTWORK">
    <rect x="-3" y="-3" width="{w+6}" height="{h+6}" fill="{NAVY}"/>
    <rect x="-3" y="-3" width="{w+6}" height="58" fill="{ORANGE}"/>
{swirls(w, 58, 0.45)}
{lockup(8, 8, 1)}
{wordmark("Nibs.", 8, 48, 26)}
    <text x="8" y="78" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="6" fill="{CHAMP}" letter-spacing="1.2">100 % CACAO · TOSTADOS</text>
    <text x="8" y="92" font-family="Georgia, serif" font-size="8" fill="{CREAM}">Origen seleccionado</text>
    <text x="8" y="104" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="5" fill="{CREAM}" opacity="0.85">Arauca · Cundinamarca · Meta</text>
    <g id="FLEX_ORIGIN" transform="translate(8,118)">
      <rect width="104" height="28" rx="2" fill="{COCOA}"/>
      <text x="8" y="12" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="4.5" fill="{CHAMP}">SLOT ORIGEN / LOTE</text>
      <text x="8" y="22" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="5" fill="{WHITE}">FEAR 5 · Quara (si aplica)</text>
    </g>
    <text x="8" y="162" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="5" fill="{CREAM}">Neto 150–250 g</text>
{legal(w, h, "chocolatebenevolo.co · snack / cocina")}
  </g>
{guides(w, h, 3, 5)}
'''
    return svg_doc(w, h, body, "Benevolo Nibs. · cara pouch V0")


def cobertura_front():
    w, h = 140, 90
    body = f'''  <g id="ARTWORK">
    <rect x="-3" y="-3" width="{w+6}" height="{h+6}" fill="{COCOA}"/>
    <rect x="-3" y="-3" width="48" height="{h+6}" fill="{ORANGE}"/>
{lockup(6, 6, 0.9)}
    <g id="HERO_PCT">
      <text x="72" y="42" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="36" font-style="italic" font-weight="900" fill="{CORAL}">70%</text>
      <text x="72" y="54" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="5" fill="{CHAMP}" letter-spacing="1">COBERTURA</text>
    </g>
{wordmark("Coberturas.", 72, 70, 10, CREAM, False)}
    <text x="72" y="78" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="3.5" fill="{CREAM}">1 kg · obrador · temperar</text>
    <g id="FLEX_SWEETENER" transform="translate(6,55)">
      <rect width="36" height="22" rx="1.5" fill="{NAVY}"/>
      <text x="18" y="9" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="3" fill="{CHAMP}">ENDULZA</text>
      <text x="18" y="17" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="4" fill="{WHITE}">panela</text>
    </g>
{legal(w, h, "R&amp;D Colab · nodos CAÚA × Zurych · chocolatebenevolo.co")}
  </g>
{guides(w, h, 3, 4)}
'''
    return svg_doc(w, h, body, "Benevolo Coberturas. · cara block 1 kg V0")


def cobertura_back():
    w, h = 140, 90
    body = f'''  <g id="ARTWORK">
    <rect x="-3" y="-3" width="{w+6}" height="{h+6}" fill="{CREAM}"/>
    <text x="8" y="12" font-family="Georgia, serif" font-size="6" fill="{NAVY}" font-weight="700">Ficha técnica · Coberturas.</text>
    <text x="8" y="22" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="3.5" fill="{COCOA}">% cacao / endulzante / origen / lote — completar por SKU</text>
    <g font-family="Outfit, Helvetica, Arial, sans-serif" font-size="3.3" fill="{COCOA}">
      <text x="8" y="34">Uso: temperar · barras · aplicaciones de obrador</text>
      <text x="8" y="42">Nodos de red: CAÚA × Zurych (convergencia Colab)</text>
      <text x="8" y="50">Conservar fresco y seco · lejos de olores fuertes</text>
      <text x="8" y="58">Claims: solo ficha real del lote — sin medallas inventadas</text>
    </g>
    <text x="8" y="78" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="3" fill="{NAVY}">CHOCOLATE BENEVOLO · R&amp;D Cacao Colab</text>
{legal(w, h, "chocolatebenevolo.co")}
  </g>
{guides(w, h, 3, 4)}
'''
    return svg_doc(w, h, body, "Benevolo Coberturas. · dorso V0")


def display_counter():
    w, h = 300, 200
    body = f'''  <g id="ARTWORK">
    <rect x="-3" y="-3" width="{w+6}" height="{h+6}" fill="{ORANGE}"/>
{swirls(w, h, 0.25)}
{lockup(16, 16, 1.6)}
    <text x="16" y="70" font-family="Georgia, serif" font-size="14" fill="{CREAM}">Chocolatería profesional</text>
{wordmark("Bons.  ·  Nibs.  ·  Coberturas.", 16, 100, 18)}
    <text x="16" y="120" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="7" fill="{CREAM}">Benevolencia del oficio, en formato de antojo.</text>
    <g id="SKU_SLOTS" transform="translate(16,140)">
      <rect width="84" height="36" rx="2" fill="{NAVY}"/><text x="42" y="22" text-anchor="middle" fill="{WHITE}" font-family="Bodoni Moda, Georgia, serif" font-style="italic" font-size="12" font-weight="900">Bons.</text>
      <rect x="96" width="84" height="36" rx="2" fill="{NAVY}"/><text x="138" y="22" text-anchor="middle" fill="{WHITE}" font-family="Bodoni Moda, Georgia, serif" font-style="italic" font-size="12" font-weight="900">Nibs.</text>
      <rect x="192" width="84" height="36" rx="2" fill="{NAVY}"/><text x="234" y="22" text-anchor="middle" fill="{WHITE}" font-family="Bodoni Moda, Georgia, serif" font-style="italic" font-size="10" font-weight="900">Coberturas.</text>
    </g>
{legal(w, h, "Display counter V0 · POS · chocolatebenevolo.co · cacaocolab.org")}
  </g>
{guides(w, h, 3, 5)}
'''
    return svg_doc(w, h, body, "Benevolo · display counter POS V0")


def readme(line: str, files: list[str], notes: str) -> str:
    fl = "\n".join(f"| `{f}` | plano V0 |" for f in files)
    return f"""# {line} · planos V0

Lineamientos: [The Dieline](https://thedieline.com/) · skill `benevolo-packaging-dieline` · `SYSTEM-PACKAGING.md`

## Archivos

| Archivo | Uso |
|---------|-----|
{fl}

## Print notes

{notes}

- Capas: `ARTWORK`, `DIELINE_CUT` (magenta), `DIELINE_CREASE` (cyan), `BLEED` (azul), `SAFE` (verde).
- Antes de troquel: reemplazar geometría por **dieline oficial del convertidor** (V1).
"""


def main():
    pairs = [
        (ROOT / "bons/bons-label-front-v0.svg", bons_front()),
        (ROOT / "bons/bons-sleeve-v0.svg", bons_sleeve()),
        (ROOT / "nibs/nibs-pouch-front-v0.svg", nibs_front()),
        (ROOT / "coberturas/coberturas-block-front-v0.svg", cobertura_front()),
        (ROOT / "coberturas/coberturas-block-back-v0.svg", cobertura_back()),
        (ROOT / "shared/display-counter-v0.svg", display_counter()),
    ]
    for path, content in pairs:
        write(path, content)
        # mirror under public for web handoff
        rel = path.relative_to(ROOT)
        write(PUBLIC / rel, content)

    write(ROOT / "bons/README.md", readme(
        "Bons.",
        ["bons-label-front-v0.svg", "bons-sleeve-v0.svg"],
        "- Etiqueta 70×50 mm · manga 220×80 mm (creases a 73 / 147 mm).\n- Wordmark `Bons.` Bodoni Ultra Black Italic.",
    ))
    write(ROOT / "nibs/README.md", readme(
        "Nibs.",
        ["nibs-pouch-front-v0.svg"],
        "- Cara pouch 120×180 mm · slot de origen/lote flexible.\n- Fondo navy + header orange (familia Bars.).",
    ))
    write(ROOT / "coberturas/README.md", readme(
        "Coberturas.",
        ["coberturas-block-front-v0.svg", "coberturas-block-back-v0.svg"],
        "- Cara 140×90 mm · hero tipográfico del %.\n- Flex: endulzante + % (cambiar una variable por SKU).",
    ))
    write(ROOT / "shared/README.md", readme(
        "Shared / POS",
        ["display-counter-v0.svg"],
        "- Display 300×200 mm · un sistema, tres slots de línea.\n- No saturar el primer plano con collage de productos.",
    ))
    write(ROOT / "README.md", """# Packaging Benevolo · planos industriales V0

Sistema multi-SKU **Bars. · Bons. · Nibs. · Coberturas.**  
Criterio: [The Dieline](https://thedieline.com/) · skill `.cursor/skills/benevolo-packaging-dieline/`

```bash
python3 brand/chocolate-benevolo/packaging/build_flats.py
```

Espejo web: `apps/web/public/benevolo/packaging/{bons,nibs,coberturas,shared}/`
""")


if __name__ == "__main__":
    main()
