#!/usr/bin/env python3
"""Benevolo lean→pro flats: Bons caja blanca, Nibs, Coberturas — lenguaje visual Bars. impreso."""

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


def doc(w, h, body, title):
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{w}mm" height="{h}mm" viewBox="0 0 {w} {h}" role="img" aria-label="{title}">
  <title>{title}</title>
  <desc>Chocolate Benevolo · plano lean→pro. Capas DIELINE non-printing. V0 diseño.</desc>
{body}
</svg>
'''


def guides(w, h, bleed=2, safe=3):
    return f'''  <g id="BLEED" fill="none" stroke="#00AEEF" stroke-width="0.2" stroke-dasharray="0.8 0.8">
    <rect x="{-bleed}" y="{-bleed}" width="{w+2*bleed}" height="{h+2*bleed}"/>
  </g>
  <g id="SAFE" fill="none" stroke="#39B54A" stroke-width="0.2" stroke-dasharray="1.2 0.8">
    <rect x="{safe}" y="{safe}" width="{w-2*safe}" height="{h-2*safe}"/>
  </g>
  <g id="DIELINE_CUT" fill="none" stroke="#FF00FF" stroke-width="0.3">
    <rect x="0" y="0" width="{w}" height="{h}" rx="1.2"/>
  </g>
'''


def swirls(w, h, op=0.42):
    return f'''  <g id="MOTIF_SWIRLS" fill="none" stroke="{NAVY}" stroke-width="2.4" opacity="{op}" stroke-linecap="round">
    <path d="M {-6},{h*0.75} C {w*0.2},{h*0.15} {w*0.5},{h*1.05} {w*1.08},{h*0.28}"/>
    <path d="M {-4},{h*0.95} C {w*0.28},{h*0.35} {w*0.65},{h*1.12} {w*1.1},{h*0.5}"/>
    <path d="M {w*0.05},{h*1.1} C {w*0.4},{h*0.55} {w*0.75},{h*1.05} {w*1.05},{h*0.7}"/>
  </g>
'''


def ripples(cx, cy, rmax=28):
    circles = "\n".join(
        f'    <circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{WHITE}" stroke-width="0.35" opacity="{0.55 - i*0.07}"/>'
        for i, r in enumerate(range(6, rmax, 5))
    )
    return f'  <g id="MOTIF_RIPPLES">\n{circles}\n  </g>\n'


def cb_mark(x, y, s=1):
    return f'''  <g id="LOCKUP_CB" transform="translate({x},{y}) scale({s})">
    <circle cx="7" cy="7" r="6.6" fill="none" stroke="{WHITE}" stroke-width="0.65"/>
    <text x="7" y="9.3" text-anchor="middle" font-family="Georgia, serif" font-size="6.2" font-weight="700" fill="{WHITE}">CB</text>
    <text x="17" y="5.8" font-family="Georgia, serif" font-size="3.3" font-weight="700" fill="{WHITE}" letter-spacing="0.55">CHOCOLATE</text>
    <text x="17" y="10.5" font-family="Georgia, serif" font-size="3.3" font-weight="700" fill="{CHAMP}" letter-spacing="0.55">BENEVOLO</text>
  </g>
'''


def wordmark(name, x, y, size=18, fill=WHITE):
    return f'''  <g id="WORDMARK">
    <text x="{x+0.7}" y="{y+0.7}" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="{size}" font-style="italic" font-weight="900" fill="{SHADOW}">{name}</text>
    <text x="{x}" y="{y}" font-family="Bodoni Moda, Didot, Georgia, serif" font-size="{size}" font-style="italic" font-weight="900" fill="{fill}">{name}</text>
  </g>
'''


def seal(cx, cy, s=1, line1="CACAO COLOMBIANO", line2="FEAR 5", line3="DE ORIGEN"):
    return f'''  <g id="SEAL_ORIGIN" transform="translate({cx},{cy}) scale({s})">
    <circle r="9.5" fill="{NAVY}" stroke="{WHITE}" stroke-width="0.55"/>
    <circle r="8.2" fill="none" stroke="{CORAL}" stroke-width="0.35"/>
    <text y="-3.2" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="1.7" fill="{CREAM}" letter-spacing="0.3">{line1}</text>
    <text y="1.6" text-anchor="middle" font-family="Georgia, serif" font-size="3.6" font-weight="700" fill="{WHITE}">{line2}</text>
    <text y="5.2" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="1.7" fill="{CHAMP}" letter-spacing="0.3">{line3}</text>
  </g>
'''


def write(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    # mirror
    try:
        rel = path.relative_to(ROOT)
        pub = PUBLIC / rel
        pub.parent.mkdir(parents=True, exist_ok=True)
        pub.write_text(content, encoding="utf-8")
    except ValueError:
        pass
    print("wrote", path.name)


# ── Bons L0: sticker frente caja ~50×45 ──
def bons_l0_front():
    w, h = 50, 45
    body = f'''  <g id="ARTWORK">
    <rect x="-2" y="-2" width="{w+4}" height="{h+4}" fill="{ORANGE}"/>
{swirls(w, h)}
{ripples(38, 16, 22)}
{cb_mark(2.5, 2.5, 0.78)}
{wordmark("Bons.", 3, 27, 14)}
    <text x="3" y="33.5" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.4" fill="{CREAM}" letter-spacing="0.45">CHOCOLATERÍA PROFESIONAL</text>
    <text x="3" y="37.5" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.1" fill="{CHAMP}">Molde mazorca · 1 pieza</text>
{seal(40, 34, 0.72)}
  </g>
{guides(w, h, 2, 3)}
'''
    return doc(w, h, body, "Bons. L0 · etiqueta frente caja blanca")


def bons_l0_lid():
    w, h = 50, 50
    body = f'''  <g id="ARTWORK">
    <rect x="-2" y="-2" width="{w+4}" height="{h+4}" fill="{NAVY}"/>
{wordmark("Bons.", 8, 30, 16)}
    <text x="8" y="38" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.6" fill="{CHAMP}">CHOCOLATE BENEVOLO</text>
{cb_mark(3, 3, 0.7)}
  </g>
{guides(w, h, 2, 3)}
'''
    return doc(w, h, body, "Bons. L0 · etiqueta tapa")


def bons_l0_back():
    w, h = 50, 45
    body = f'''  <g id="ARTWORK">
    <rect x="-2" y="-2" width="{w+4}" height="{h+4}" fill="{NAVY}"/>
    <text x="4" y="8" font-family="Bodoni Moda, Georgia, serif" font-size="5.5" font-style="italic" font-weight="900" fill="{WHITE}">Bons.</text>
    <text x="4" y="13" font-family="Georgia, serif" font-size="2.4" fill="{CHAMP}">By Benevolo</text>
    <text x="4" y="19" font-family="Georgia, serif" font-size="2.6" fill="{CREAM}">Buen chocolate indulgente.</text>
    <text x="4" y="25" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.1" fill="{CREAM}">FEAR 5 · fermentación controlada</text>
    <text x="4" y="29.5" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.1" fill="{CREAM}">Oficio Zurych · R&amp;D Colab</text>
    <text x="4" y="36" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2" fill="{CHAMP}">+57 310 222 7848</text>
    <text x="4" y="40.5" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2" fill="{WHITE}">chocolatebenevolo.co</text>
  </g>
{guides(w, h, 2, 3)}
'''
    return doc(w, h, body, "Bons. L0 · etiqueta dorso")


# ── Bons L1 sleeve ──
def bons_l1_sleeve():
    # wrap around 50mm box: front 50 + side 50 + back 50 + side 50 = 200 × 45
    w, h = 200, 45
    body = f'''  <g id="ARTWORK">
    <rect x="-2" y="-2" width="{w+4}" height="{h+4}" fill="{ORANGE}"/>
    <!-- panel faces -->
    <g id="PANEL_FRONT">
{swirls(50, h, 0.4)}
{ripples(36, 14, 20)}
{cb_mark(3, 3, 0.72)}
{wordmark("Bons.", 3, 26, 13)}
      <text x="3" y="32" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.2" fill="{CREAM}">1 PIEZA · PROFESIONAL</text>
{seal(40, 34, 0.65)}
    </g>
    <g id="PANEL_SIDE_A" transform="translate(50,0)">
      <rect width="50" height="{h}" fill="{NAVY}"/>
      <text x="25" y="26" text-anchor="middle" transform="rotate(-90 25 22)" font-family="Bodoni Moda, Georgia, serif" font-size="7" font-style="italic" font-weight="900" fill="{WHITE}">Bons.</text>
    </g>
    <g id="PANEL_BACK" transform="translate(100,0)">
      <rect width="50" height="{h}" fill="{NAVY}"/>
      <text x="4" y="10" font-family="Georgia, serif" font-size="2.5" fill="{CHAMP}">By Benevolo</text>
      <text x="4" y="17" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.2" fill="{CREAM}">Buen chocolate</text>
      <text x="4" y="21.5" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.2" fill="{CREAM}">indulgente.</text>
      <text x="4" y="30" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2" fill="{CHAMP}">FEAR 5 · Zurych</text>
      <text x="4" y="38" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="1.9" fill="{WHITE}">chocolatebenevolo.co</text>
    </g>
    <g id="PANEL_SIDE_B" transform="translate(150,0)">
      <rect width="50" height="{h}" fill="{ORANGE}"/>
      <text x="25" y="28" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.4" fill="{CREAM}" letter-spacing="0.4">COLAB R&amp;D</text>
    </g>
  </g>
  <g id="DIELINE_CREASE" fill="none" stroke="#00FFFF" stroke-width="0.25" stroke-dasharray="1.5 1">
    <line x1="50" y1="0" x2="50" y2="{h}"/>
    <line x1="100" y1="0" x2="100" y2="{h}"/>
    <line x1="150" y1="0" x2="150" y2="{h}"/>
  </g>
{guides(w, h, 2, 3)}
'''
    return doc(w, h, body, "Bons. L1 · sleeve wrap caja blanca")


# ── Bons L2 carton flat (simplified tuck box) ──
def bons_l2_carton():
    # layout: glue | left | front | right | back   + top/bottom flaps on front column
    # Simplified single strip + flaps annotation
    w, h = 220, 120
    body = f'''  <g id="ARTWORK">
    <rect x="0" y="30" width="20" height="45" fill="{NAVY}"/>
    <!-- left -->
    <g transform="translate(20,30)">
      <rect width="50" height="45" fill="{NAVY}"/>
      <text x="25" y="26" text-anchor="middle" font-family="Bodoni Moda, Georgia, serif" font-size="8" font-style="italic" font-weight="900" fill="{WHITE}">Bons.</text>
    </g>
    <!-- front -->
    <g transform="translate(70,30)">
      <rect x="-2" y="-2" width="54" height="49" fill="{ORANGE}"/>
      <rect width="50" height="45" fill="{ORANGE}"/>
{swirls(50, 45, 0.4)}
{ripples(36, 14, 20)}
{cb_mark(2.5, 2.5, 0.7)}
{wordmark("Bons.", 3, 26, 12)}
      <text x="3" y="32" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.1" fill="{CREAM}">1 PIEZA</text>
{seal(40, 34, 0.62)}
    </g>
    <!-- right -->
    <g transform="translate(120,30)">
      <rect width="50" height="45" fill="{NAVY}"/>
      <text x="6" y="14" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.3" fill="{CHAMP}">FEAR 5</text>
      <text x="6" y="22" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.1" fill="{CREAM}">Molde mazorca</text>
      <text x="6" y="36" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2" fill="{WHITE}">chocolatebenevolo.co</text>
    </g>
    <!-- back -->
    <g transform="translate(170,30)">
      <rect width="50" height="45" fill="{NAVY}"/>
      <text x="4" y="10" font-family="Georgia, serif" font-size="2.4" fill="{CHAMP}">By Benevolo</text>
      <text x="4" y="17" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.1" fill="{CREAM}">Buen chocolate</text>
      <text x="4" y="21.5" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.1" fill="{CREAM}">indulgente.</text>
      <text x="4" y="30" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="1.9" fill="{CHAMP}">Zurych SAS</text>
      <text x="4" y="38" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="1.9" fill="{WHITE}">+57 310 222 7848</text>
    </g>
    <!-- top flap -->
    <g transform="translate(70,0)">
      <rect width="50" height="30" fill="{NAVY}"/>
      <text x="25" y="18" text-anchor="middle" font-family="Bodoni Moda, Georgia, serif" font-size="7" font-style="italic" font-weight="900" fill="{WHITE}">Bons.</text>
    </g>
    <!-- bottom flap -->
    <g transform="translate(70,75)">
      <rect width="50" height="30" fill="{NAVY}"/>
      <text x="25" y="17" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.2" fill="{CHAMP}">CHOCOLATE BENEVOLO</text>
    </g>
  </g>
  <g id="DIELINE_CUT" fill="none" stroke="#FF00FF" stroke-width="0.35">
    <rect x="0" y="30" width="20" height="45"/>
    <rect x="20" y="30" width="50" height="45"/>
    <rect x="70" y="0" width="50" height="30"/>
    <rect x="70" y="30" width="50" height="45"/>
    <rect x="70" y="75" width="50" height="30"/>
    <rect x="120" y="30" width="50" height="45"/>
    <rect x="170" y="30" width="50" height="45"/>
  </g>
  <g id="DIELINE_CREASE" fill="none" stroke="#00FFFF" stroke-width="0.3" stroke-dasharray="2 1.2">
    <line x1="20" y1="30" x2="20" y2="75"/>
    <line x1="70" y1="30" x2="70" y2="75"/>
    <line x1="120" y1="30" x2="120" y2="75"/>
    <line x1="170" y1="30" x2="170" y2="75"/>
    <line x1="70" y1="30" x2="120" y2="30"/>
    <line x1="70" y1="75" x2="120" y2="75"/>
  </g>
  <g id="SAFE" fill="none" stroke="#39B54A" stroke-width="0.2" stroke-dasharray="1 0.8">
    <rect x="73" y="33" width="44" height="39"/>
  </g>
'''
    return doc(w, h, body, "Bons. L2 · carton tuck-box plano V0")


# ── Nibs L0 sticker ──
def nibs_l0():
    w, h = 60, 80
    body = f'''  <g id="ARTWORK">
    <rect x="-2" y="-2" width="{w+4}" height="{h+4}" fill="{NAVY}"/>
    <rect x="-2" y="-2" width="{w+4}" height="28" fill="{ORANGE}"/>
{swirls(w, 28, 0.45)}
{cb_mark(3, 3, 0.75)}
{wordmark("Nibs.", 3, 22, 12)}
    <text x="4" y="40" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="3.2" fill="{CHAMP}" letter-spacing="0.5">100 % CACAO</text>
    <text x="4" y="48" font-family="Georgia, serif" font-size="4" fill="{CREAM}">Tostados</text>
    <text x="4" y="58" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.6" fill="{CREAM}">Origen seleccionado</text>
    <text x="4" y="68" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.4" fill="{CHAMP}">150–250 g</text>
{seal(48, 68, 0.7)}
  </g>
{guides(w, h, 2, 3)}
'''
    return doc(w, h, body, "Nibs. L0 · sticker lean")


# ── Coberturas L0 ──
def cob_l0():
    w, h = 70, 50
    body = f'''  <g id="ARTWORK">
    <rect x="-2" y="-2" width="{w+4}" height="{h+4}" fill="{COCOA}"/>
    <rect x="-2" y="-2" width="22" height="{h+4}" fill="{ORANGE}"/>
{cb_mark(2, 2.5, 0.55)}
    <text x="30" y="22" font-family="Bodoni Moda, Georgia, serif" font-size="18" font-style="italic" font-weight="900" fill="{CORAL}">70%</text>
    <text x="30" y="30" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="3" fill="{CHAMP}" letter-spacing="0.6">COBERTURA</text>
{wordmark("Coberturas.", 30, 40, 6, CREAM)}
    <text x="30" y="46" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.2" fill="{CREAM}">1 kg · obrador</text>
    <g transform="translate(3,28)">
      <rect width="16" height="14" rx="1" fill="{NAVY}"/>
      <text x="8" y="6" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2" fill="{CHAMP}">FLEX</text>
      <text x="8" y="11" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="2.4" fill="{WHITE}">panela</text>
    </g>
  </g>
{guides(w, h, 2, 3)}
'''
    return doc(w, h, body, "Coberturas. L0 · sticker lean")


def readme():
    return """# Lean → Pro · planos Bons / Nibs / Coberturas

Ver `../../LEAN-TO-PRO.md`.

## Bons. (caja blanca ~50 mm)

| Nivel | Archivo |
|-------|---------|
| L0 frente | `bons-l0-front.svg` |
| L0 tapa | `bons-l0-lid.svg` |
| L0 dorso | `bons-l0-back.svg` |
| L1 sleeve | `bons-l1-sleeve.svg` |
| L2 carton | `bons-l2-carton.svg` |

## Nibs. / Coberturas.

| Archivo |
|---------|
| `../nibs/nibs-l0-sticker.svg` |
| `../coberturas/coberturas-l0-sticker.svg` |

Imprimir L0 en vinilo mate / papel adhesivo; cortar con bleed 2 mm.
"""


def main():
    outs = [
        (ROOT / "bons/bons-l0-front.svg", bons_l0_front()),
        (ROOT / "bons/bons-l0-lid.svg", bons_l0_lid()),
        (ROOT / "bons/bons-l0-back.svg", bons_l0_back()),
        (ROOT / "bons/bons-l1-sleeve.svg", bons_l1_sleeve()),
        (ROOT / "bons/bons-l2-carton.svg", bons_l2_carton()),
        (ROOT / "nibs/nibs-l0-sticker.svg", nibs_l0()),
        (ROOT / "coberturas/coberturas-l0-sticker.svg", cob_l0()),
    ]
    for path, content in outs:
        write(path, content)
    (ROOT / "bons/LEAN-PRO.md").write_text(readme(), encoding="utf-8")
    print("done")


if __name__ == "__main__":
    main()
