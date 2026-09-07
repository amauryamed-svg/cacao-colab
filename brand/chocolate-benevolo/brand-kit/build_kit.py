#!/usr/bin/env python3
"""Genera el Brand Kit Bars. (SVG por capas, listo para Canva / Figma / Express)."""

from __future__ import annotations

from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

ROOT = Path(__file__).resolve().parent
BRAND = ROOT.parent


def _font_dir() -> Path:
    local = ROOT / "type" / "fonts"
    if (local / "BodoniModa-500Italic.ttf").exists():
        return local
    return Path("/tmp/benevolo-fonts")


FONTS = _font_dir()
ORANGE = "#F05A28"
CORAL = "#FF6A3D"
NAVY = "#15243F"
CHAMPAGNE = "#E8C9A0"
CREAM = "#F7F1EE"
COCOA = "#140e0a"
SHADOW = "#C43A18"
WHITE = "#FFFFFF"

CB_C = "M57.2 21.8C46.4 12.6 26.8 13.4 19.6 28.4C13.2 42.2 16.8 59.6 31.2 65.6C40.4 69.4 52.8 66.8 58.6 58.2"
CB_B = "M33.8 18.8C33.4 33.2 33.8 47.6 34.8 62.4M33.9 21.4C50.6 16.2 64.4 22.6 62.2 33.2C60.4 41.4 47.6 43.8 34.2 40.2C52.8 38.6 66.2 46.4 62.8 57.2C59.6 67.4 45.2 69.2 34.6 60.4"


def load_font(weight: int) -> TTFont:
    return TTFont(FONTS / f"BodoniModa-{weight}Italic.ttf")


def measure(font: TTFont, text: str, size: float, tracking: float = 0) -> float:
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    upem = font["head"].unitsPerEm
    scale = size / upem
    width = 0.0
    for i, ch in enumerate(text):
        name = cmap.get(ord(ch))
        if not name:
            continue
        width += glyph_set[name].width * scale
        if i < len(text) - 1:
            width += tracking
    return width


def text_path(font: TTFont, text: str, x: float, y: float, size: float, tracking: float = 0) -> str:
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    upem = font["head"].unitsPerEm
    scale = size / upem
    cursor = x
    chunks: list[str] = []
    for i, ch in enumerate(text):
        name = cmap.get(ord(ch))
        if not name:
            continue
        pen = SVGPathPen(glyph_set)
        tpen = TransformPen(pen, Transform(scale, 0, 0, -scale, cursor, y))
        glyph_set[name].draw(tpen)
        d = pen.getCommands()
        if d:
            chunks.append(d)
        cursor += glyph_set[name].width * scale
        if i < len(text) - 1:
            cursor += tracking
    return " ".join(chunks)


def svg(view: str, body: str, width: int | None = None, height: int | None = None) -> str:
    w = f' width="{width}"' if width else ""
    h = f' height="{height}"' if height else ""
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        f'<svg xmlns="http://www.w3.org/2000/svg"{w}{h} viewBox="{view}" role="img">\n'
        f"{body}\n</svg>\n"
    )


def cb_group(color: str, cx: float = 40, cy: float = 40, scale: float = 1) -> str:
    t = f'transform="translate({cx - 40 * scale},{cy - 40 * scale}) scale({scale})"'
    return f"""  <g id="LOCKUP_CB" {t} fill="none" stroke="{color}" stroke-linecap="round" stroke-linejoin="round">
    <circle id="cb-ring" cx="40" cy="40" r="36.2" stroke-width="1.7"/>
    <path id="cb-c" stroke-width="3.35" d="{CB_C}"/>
    <path id="cb-b" stroke-width="3.2" d="{CB_B}"/>
  </g>"""


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print("wrote", path.relative_to(ROOT))


def build_cb() -> None:
    for name, color, bg in (
        ("cb-monogram", "currentColor", None),
        ("cb-monogram-white", WHITE, None),
        ("cb-monogram-navy", NAVY, None),
        ("cb-monogram-orange", ORANGE, None),
        ("cb-monogram-on-orange", WHITE, ORANGE),
        ("cb-monogram-on-navy", WHITE, NAVY),
    ):
        bg_el = f'  <rect id="BG" width="80" height="80" fill="{bg}"/>\n' if bg else ""
        write(ROOT / "logos" / f"{name}.svg", svg("0 0 80 80", bg_el + cb_group(color if not bg else WHITE), 80, 80))


def build_lockup(font500: TTFont, font900: TTFont) -> None:
    variants = (
        ("chocolate-benevolo-lockup-white", WHITE, None, WHITE),
        ("chocolate-benevolo-lockup-navy", NAVY, None, NAVY),
        ("chocolate-benevolo-lockup-on-orange", WHITE, ORANGE, WHITE),
        ("chocolate-benevolo-lockup-on-navy", WHITE, NAVY, WHITE),
        ("chocolate-benevolo-lockup-on-cocoa", WHITE, COCOA, CHAMPAGNE),
    )
    for name, ink, bg, nom in variants:
        choc = "CHOCOLATE"
        mid = "enevol"
        choc_size, mid_size, cap_size = 22, 72, 108
        choc_track = 10.2
        w_ch = measure(font500, choc, choc_size, choc_track)
        w_b = measure(font900, "B", cap_size)
        w_mid = measure(font900, mid, mid_size)
        w_o = measure(font900, "O", cap_size)
        word_w = w_b + w_mid + w_o - 10
        cx, top = 360, 36
        bg_el = f'  <rect id="BG" width="720" height="420" fill="{bg}"/>\n' if bg else ""
        choc_x = cx - w_ch / 2
        word_x = cx - word_w / 2
        body = (
            bg_el
            + cb_group(ink, cx, top + 70, 1.55)
            + f'\n  <g id="TYPE_CHOCOLATE">\n    <path fill="{nom}" d="{text_path(font500, choc, choc_x, 232, choc_size, choc_track)}"/>\n  </g>\n'
            + f'  <g id="TYPE_BENEVOLO">\n    <path fill="{ink}" d="{text_path(font900, "B", word_x, 350, cap_size)}"/>\n'
            + f'    <path fill="{ink}" d="{text_path(font900, mid, word_x + w_b - 8, 338, mid_size)}"/>\n'
            + f'    <path fill="{ink}" d="{text_path(font900, "O", word_x + w_b + w_mid - 14, 350, cap_size)}"/>\n  </g>'
        )
        write(ROOT / "logos" / f"{name}.svg", svg("0 0 720 420", body, 720, 420))


def build_bars(font900: TTFont) -> None:
    word = "Bars."
    size = 220
    w = measure(font900, word, size)
    d = text_path(font900, word, 40, 280, size)
    d_shadow = text_path(font900, word, 52, 292, size)
    write(
        ROOT / "logos" / "bars-wordmark-paths.svg",
        svg(
            "0 0 720 360",
            f'  <g id="TYPE_BARS">\n    <path id="bars-shadow" fill="{SHADOW}" d="{d_shadow}"/>\n    <path id="bars-fill" fill="{WHITE}" d="{d}"/>\n  </g>',
            720,
            360,
        ),
    )
    write(
        ROOT / "logos" / "bars-wordmark-on-orange.svg",
        svg(
            "0 0 720 360",
            f'  <rect id="BG" width="720" height="360" fill="{ORANGE}"/>\n  <g id="TYPE_BARS">\n    <path fill="{SHADOW}" d="{d_shadow}"/>\n    <path fill="{WHITE}" d="{d}"/>\n  </g>',
            720,
            360,
        ),
    )
    write(
        ROOT / "logos" / "bars-wordmark-on-navy.svg",
        svg(
            "0 0 720 360",
            f'  <rect id="BG" width="720" height="360" fill="{NAVY}"/>\n  <g id="TYPE_BARS">\n    <path fill="{SHADOW}" d="{d_shadow}"/>\n    <path fill="{WHITE}" d="{d}"/>\n  </g>',
            720,
            360,
        ),
    )
    write(
        ROOT / "logos" / "bars-wordmark-navy.svg",
        svg(
            f"0 0 {int(w + 80)} 320",
            f'  <g id="TYPE_BARS"><path fill="{NAVY}" d="{text_path(font900, word, 24, 240, size)}"/></g>',
        ),
    )


def build_palette() -> None:
    swatches = [
        ("orange", ORANGE, "Empaque / hero"),
        ("coral", CORAL, "CTA"),
        ("navy", NAVY, "Swirls / dorso"),
        ("champagne", CHAMPAGNE, "Nominativo / eyebrows"),
        ("cream", CREAM, "Texto / fondos claros"),
        ("cocoa", COCOA, "Fondos oscuros"),
        ("shadow", SHADOW, "Extrusión Bars."),
        ("white", WHITE, "Tipo sobre naranja"),
    ]
    tiles = []
    for i, (slug, hexv, use) in enumerate(swatches):
        x = 40 + (i % 4) * 280
        y = 80 + (i // 4) * 220
        label = hexv if hexv != WHITE else "#FFFFFF"
        ink = COCOA if hexv in {CREAM, WHITE, CHAMPAGNE} else WHITE
        tiles.append(
            f'  <g id="swatch-{slug}">\n'
            f'    <rect x="{x}" y="{y}" width="250" height="180" rx="18" fill="{hexv}" stroke="{NAVY}" stroke-width="1"/>\n'
            f'    <text x="{x + 20}" y="{y + 50}" fill="{ink}" font-family="Georgia, serif" font-size="22">{slug}</text>\n'
            f'    <text x="{x + 20}" y="{y + 86}" fill="{ink}" font-family="ui-monospace, monospace" font-size="18">{label}</text>\n'
            f'    <text x="{x + 20}" y="{y + 130}" fill="{ink}" font-family="Georgia, serif" font-size="14">{use}</text>\n'
            f"  </g>"
        )
    write(
        ROOT / "colors" / "palette.svg",
        svg(
            "0 0 1180 560",
            f'  <rect width="1180" height="560" fill="{CREAM}"/>\n'
            f'  <text x="40" y="48" fill="{NAVY}" font-family="Georgia, serif" font-size="28">Chocolate Benevolo · paleta Bars.</text>\n'
            + "\n".join(tiles),
            1180,
            560,
        ),
    )


def kv_card(font500: TTFont, font900: TTFont, slug: str, kicker: str, line: str, note: str, bg: str, ink: str) -> None:
    d_kick = text_path(font500, kicker.upper(), 72, 120, 22, 4)
    # wrap line roughly by splitting
    words = line.split()
    rows: list[str] = []
    acc = ""
    for word in words:
        trial = f"{acc} {word}".strip()
        if measure(font900, trial, 54) < 920 or not acc:
            acc = trial
        else:
            rows.append(acc)
            acc = word
    if acc:
        rows.append(acc)
    paths = []
    y = 220
    for row in rows:
        paths.append(f'    <path fill="{ink}" d="{text_path(font900, row, 72, y, 54)}"/>')
        y += 72
    note_path = text_path(font500, note, 72, 500, 18, 0.4)
    write(
        ROOT / "key-values" / f"{slug}.svg",
        svg(
            "0 0 1080 1080",
            f'  <rect id="BG" width="1080" height="1080" fill="{bg}"/>\n'
            + cb_group(ink, 980, 88, 0.85)
            + f'\n  <g id="TYPE_KICKER"><path fill="{CHAMPAGNE if bg != CREAM else NAVY}" d="{d_kick}"/></g>\n'
            + f'  <g id="TYPE_LINE">\n'
            + "\n".join(paths)
            + "\n  </g>\n"
            + f'  <g id="TYPE_NOTE"><path fill="{ink}" fill-opacity="0.7" d="{note_path}"/></g>',
            1080,
            1080,
        ),
    )


def build_key_values(font500: TTFont, font900: TTFont) -> None:
    kv_card(font500, font900, "kv-manifiesto", "Propósito", "Benevolencia del oficio, en formato de antojo.", "Línea madre · Brand Book V1", ORANGE, WHITE)
    kv_card(font500, font900, "kv-promesa", "Promesa", "Buen chocolate indulgente.", "Dorso impreso Bars.", NAVY, WHITE)
    kv_card(font500, font900, "kv-juego", "Juego de marca", "Benevolo sin tilde. Chocolate Benevolo le pone las tildes a la e.", "Se lee igual en español y en italiano.", COCOA, CREAM)
    kv_card(font500, font900, "kv-producto", "Producto ancla", "Bars. Duja de marañón. Sugar free. 80 g.", "FEAR 5 · 60 % Trinitario · Zurych SAS", ORANGE, WHITE)

    claims_ok = [
        "Bars. By Benevolo",
        "Buen chocolate indulgente",
        "Leche FEAR5 60 % Trinitario",
        "Marañón salado · leche avellanada",
        "Cacao colombiano de origen",
        "chocolatebenevolo.co · benevolo.shop",
    ]
    claims_no = [
        "Medallas CoEx inventadas",
        "Stock / envío inmediato fingido",
        "Orgánico del producto terminado",
        "Confundir con Master 70 %",
    ]
    ok_paths = []
    for i, line in enumerate(claims_ok):
        ok_paths.append(f'    <path fill="{WHITE}" d="{text_path(font500, "✓  " + line, 64, 280 + i * 46, 22)}"/>')
    no_paths = []
    for i, line in enumerate(claims_no):
        no_paths.append(f'    <path fill="{CREAM}" d="{text_path(font500, "✗  " + line, 64, 280 + i * 52, 22)}"/>')
    write(
        ROOT / "key-values" / "kv-claims-do.svg",
        svg(
            "0 0 1080 1080",
            f'  <rect id="BG" width="1080" height="1080" fill="{NAVY}"/>\n'
            + cb_group(WHITE, 980, 88, 0.8)
            + f'  <g id="TYPE_KICKER"><path fill="{CHAMPAGNE}" d="{text_path(font500, "CLAIMS PERMITIDOS", 64, 140, 22, 5)}"/></g>\n'
            + f'  <g id="TYPE_LIST">\n'
            + "\n".join(ok_paths)
            + "\n  </g>",
            1080,
            1080,
        ),
    )
    write(
        ROOT / "key-values" / "kv-claims-dont.svg",
        svg(
            "0 0 1080 1080",
            f'  <rect id="BG" width="1080" height="1080" fill="{COCOA}"/>\n'
            + f'  <g id="TYPE_KICKER"><path fill="{CORAL}" d="{text_path(font500, "CLAIMS PROHIBIDOS", 64, 140, 22, 5)}"/></g>\n'
            + f'  <g id="TYPE_LIST">\n'
            + "\n".join(no_paths)
            + "\n  </g>",
            1080,
            1080,
        ),
    )


def build_motifs() -> None:
    write(
        ROOT / "motifs" / "swirls-navy.svg",
        svg(
            "0 0 800 500",
            f'  <rect id="BG" width="800" height="500" fill="{ORANGE}"/>\n'
            f'  <g id="MOTIF_SWIRLS" fill="none" stroke="{NAVY}" stroke-linecap="round">\n'
            f'    <path stroke-width="38" d="M-20 420 C 80 380, 140 260, 240 250 C 360 236, 400 360, 520 340 C 640 320, 700 180, 840 160"/>\n'
            f'    <path stroke-width="28" d="M-10 200 C 120 160, 180 80, 300 90 C 430 102, 470 210, 600 190"/>\n'
            f'    <path stroke-width="18" d="M 80 480 C 200 450, 260 390, 380 400"/>\n'
            f"  </g>",
            800,
            500,
        ),
    )
    write(
        ROOT / "motifs" / "halo-mazorca.svg",
        svg(
            "0 0 400 400",
            f'  <g id="MOTIF_HALO" fill="none" stroke="{WHITE}" stroke-width="1.2">\n'
            + "\n".join(f'    <circle cx="200" cy="200" r="{r}"/>' for r in (40, 70, 100, 130, 160, 190))
            + "\n  </g>",
            400,
            400,
        ),
    )


def build_templates(font500: TTFont, font900: TTFont) -> None:
    manifesto = "Benevolencia del oficio,"
    manifesto2 = "en formato de antojo."
    write(
        ROOT / "templates" / "social-post-1080.svg",
        svg(
            "0 0 1080 1080",
            f'  <rect id="BG" width="1080" height="1080" fill="{ORANGE}"/>\n'
            f'  <g id="MOTIF_SWIRLS" fill="none" stroke="{NAVY}" stroke-linecap="round" opacity="0.92">\n'
            f'    <path stroke-width="70" d="M-40 900 C 180 820, 260 620, 480 600 C 720 576, 780 820, 1120 760"/>\n'
            f"  </g>\n"
            + cb_group(WHITE, 160, 160, 1.4)
            + f'\n  <g id="TYPE_CHOCOLATE"><path fill="{WHITE}" d="{text_path(font500, "CHOCOLATE", 90, 300, 20, 8)}"/></g>\n'
            + f'  <g id="TYPE_BENEVOLO"><path fill="{WHITE}" d="{text_path(font900, "BenevolO", 80, 400, 72)}"/></g>\n'
            + f'  <g id="TYPE_BARS"><path fill="{SHADOW}" d="{text_path(font900, "Bars.", 88, 620, 140)}"/><path fill="{WHITE}" d="{text_path(font900, "Bars.", 80, 608, 140)}"/></g>\n'
            + f'  <g id="TYPE_LINE"><path fill="{WHITE}" d="{text_path(font500, manifesto, 80, 760, 28)}"/>'
            + f'<path fill="{WHITE}" d="{text_path(font500, manifesto2, 80, 810, 28)}"/></g>\n'
            + f'  <g id="TYPE_LEGAL"><path fill="{CHAMPAGNE}" d="{text_path(font500, "chocolatebenevolo.co", 80, 980, 20)}"/></g>',
            1080,
            1080,
        ),
    )
    write(
        ROOT / "templates" / "social-story-1080x1920.svg",
        svg(
            "0 0 1080 1920",
            f'  <rect id="BG" width="1080" height="1920" fill="{ORANGE}"/>\n'
            f'  <g id="MOTIF_SWIRLS" fill="none" stroke="{NAVY}" stroke-width="80" stroke-linecap="round">\n'
            f'    <path d="M-60 1500 C 200 1400, 280 1100, 560 1080 C 840 1060, 900 1480, 1200 1400"/>\n'
            f"  </g>\n"
            + cb_group(WHITE, 200, 280, 1.8)
            + f'\n  <g id="TYPE_LINE"><path fill="{WHITE}" d="{text_path(font900, "Bars.", 80, 980, 180)}"/></g>\n'
            + f'  <g id="TYPE_NOTE"><path fill="{WHITE}" d="{text_path(font500, "Buen chocolate indulgente.", 80, 1120, 32)}"/></g>\n'
            + f'  <g id="TYPE_LEGAL"><path fill="{CHAMPAGNE}" d="{text_path(font500, "FEAR 5 · 80 g · sugar free", 80, 1760, 24)}"/></g>',
            1080,
            1920,
        ),
    )
    write(
        ROOT / "templates" / "og-1200x630.svg",
        svg(
            "0 0 1200 630",
            f'  <rect id="BG" width="1200" height="630" fill="{COCOA}"/>\n'
            + cb_group(WHITE, 160, 160, 1.6)
            + f'\n  <g id="TYPE_BENEVOLO"><path fill="{WHITE}" d="{text_path(font900, "Chocolate BenevolO", 80, 360, 64)}"/></g>\n'
            + f'  <g id="TYPE_LINE"><path fill="{CHAMPAGNE}" d="{text_path(font500, "Benevolencia del oficio, en formato de antojo.", 80, 440, 26)}"/></g>\n'
            + f'  <g id="TYPE_BARS"><path fill="{ORANGE}" d="{text_path(font900, "Bars.", 80, 560, 72)}"/></g>',
            1200,
            630,
        ),
    )


def build_board(font500: TTFont, font900: TTFont) -> None:
    """One-pager sistema visual + key values — importar como página Figma."""
    rows = [
        (ORANGE, WHITE, "PROPÓSITO", "Benevolencia del oficio, en formato de antojo."),
        (NAVY, WHITE, "PROMESA", "Buen chocolate indulgente."),
        (COCOA, CREAM, "JUEGO", "Benevolo sin tilde. Las tildes van en la e."),
        (ORANGE, WHITE, "ANCLA", "Bars. · 80 g · duja de marañón · sugar free"),
    ]
    cards = []
    for i, (bg, ink, k, v) in enumerate(rows):
        x = 80 + (i % 2) * 920
        y = 520 + (i // 2) * 280
        cards.append(
            f'  <g id="KV_{k}">\n'
            f'    <rect x="{x}" y="{y}" width="880" height="250" rx="8" fill="{bg}"/>\n'
            f'    <path fill="{CHAMPAGNE}" d="{text_path(font500, k, x + 40, y + 70, 18, 5)}"/>\n'
            f'    <path fill="{ink}" d="{text_path(font900, v, x + 40, y + 150, 28)}"/>\n'
            f"  </g>"
        )
    write(
        ROOT / "key-values" / "kv-board-1920.svg",
        svg(
            "0 0 1920 1200",
            f'  <rect id="BG" width="1920" height="1200" fill="{CREAM}"/>\n'
            + cb_group(NAVY, 140, 130, 1.4)
            + f'\n  <g id="TYPE_CHOCOLATE"><path fill="{NAVY}" d="{text_path(font500, "CHOCOLATE", 240, 100, 18, 7)}"/></g>\n'
            + f'  <g id="TYPE_BENEVOLO"><path fill="{NAVY}" d="{text_path(font900, "BenevolO", 230, 190, 64)}"/></g>\n'
            + f'  <g id="TYPE_BARS"><path fill="{SHADOW}" d="{text_path(font900, "Bars.", 1210, 200, 110)}"/><path fill="{ORANGE}" d="{text_path(font900, "Bars.", 1200, 188, 110)}"/></g>\n'
            + f'  <g id="TYPE_NOTE"><path fill="{NAVY}" d="{text_path(font500, "Brand Kit editable · Canva · Figma · Adobe Express", 80, 320, 22)}"/></g>\n'
            + "\n".join(cards)
            + f'\n  <g id="TYPE_LEGAL"><path fill="{NAVY}" d="{text_path(font500, "chocolatebenevolo.co  ·  benevolo.shop  ·  no CoEx fingido  ·  no stock inventado", 80, 1140, 18)}"/></g>',
            1920,
            1200,
        ),
    )


def main() -> None:
    font500 = load_font(500)
    font900 = load_font(900)
    build_cb()
    build_lockup(font500, font900)
    build_bars(font900)
    build_palette()
    build_key_values(font500, font900)
    build_motifs()
    build_templates(font500, font900)
    build_board(font500, font900)


if __name__ == "__main__":
    main()
