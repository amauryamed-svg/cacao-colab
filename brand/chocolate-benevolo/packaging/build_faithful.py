#!/usr/bin/env python3
"""
Benevolo packaging fiel al cartón impreso Bars Benevolo.pdf / bars-fear5-front-art.jpg.

Bons. = bombón grande · 3 rellenos (flex):
  - Caramelo: caramelo · malvavisco · galleta
  - Dubai:    pistacho · crocante · mantequilla
  - Tiramisú: bizcocho soletilla · café · crema · cacao en polvo

Hereda swirls navy gruesos + mazorca + ripples + sello del arte Bars. — no abstracciones.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent
PUBLIC = Path(__file__).resolve().parents[3] / "apps/web/public/benevolo/packaging"
ASSETS = ROOT / "shared/assets"
REFS = Path(__file__).resolve().parents[1] / "references"

BARS_ART = Path(__file__).resolve().parents[3] / "apps/web/public/benevolo/packaging/bars-fear5-front-art.jpg"
PDF_UPLOADS = [
    Path("/home/ubuntu/.cursor/projects/workspace/uploads/Bars_Benevolo_3ae8.pdf"),
    Path("/home/ubuntu/.cursor/projects/workspace/uploads/Bars_Benevolo_51af.pdf"),
]

NAVY = (21, 36, 63)
SHADOW = (196, 58, 24)
WHITE = (255, 255, 255)
CREAM = (247, 241, 238)
CHAMP = (232, 201, 160)

BONS_SKUS = [
    {
        "id": "caramelo",
        "name": "Caramelo",
        "layers_short": "Caramelo · malvavisco · galleta",
        "layers_lines": [
            "Tres capas:",
            "caramelo, malvavisco",
            "y galleta",
        ],
        "bottom": "Bombón grande · Caramelo · malvavisco · galleta",
    },
    {
        "id": "dubai",
        "name": "Dubai",
        "layers_short": "Pistacho · crocante · mantequilla",
        "layers_lines": [
            "Tres capas:",
            "pistacho, crocante",
            "y mantequilla",
        ],
        "bottom": "Bombón grande · Dubai · pistacho · crocante",
    },
    {
        "id": "tiramisu",
        "name": "Tiramisú",
        "layers_short": "Soletilla · café · crema cacao",
        "layers_lines": [
            "Bizcocho soletilla,",
            "café, crema",
            "y cacao en polvo",
        ],
        "bottom": "Bombón grande · Tiramisú · soletilla · café",
    },
]


def font(size: int):
    for c in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
    ):
        if Path(c).exists():
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def sans(size: int, bold=False):
    path = (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
        if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    )
    return ImageFont.truetype(path, size) if Path(path).exists() else ImageFont.load_default()


def ensure_assets():
    ASSETS.mkdir(parents=True, exist_ok=True)
    REFS.mkdir(parents=True, exist_ok=True)
    if not BARS_ART.exists():
        raise SystemExit(f"missing Bars art: {BARS_ART}")
    art = Image.open(BARS_ART).convert("RGB")
    art.save(ASSETS / "bars-fear5-front-art.jpg", quality=95)

    try:
        import fitz

        for pdf in PDF_UPLOADS:
            if not pdf.exists():
                continue
            doc = fitz.open(str(pdf))
            pix = doc[0].get_pixmap(matrix=fitz.Matrix(2.5, 2.5))
            full = ASSETS / "bars-carton-dieline.png"
            pix.save(str(full))
            im = Image.open(full).convert("RGB")
            thumb = im.copy()
            thumb.thumbnail((1100, 1100))
            thumb.save(REFS / "bars_benevolo_pdf_p1_web.jpg", quality=88, optimize=True)
            print("wrote PDF dieline", full)
            break
    except Exception as e:
        print("PDF render skip:", e)

    return art


def cover_wordmark(im: Image.Image) -> Image.Image:
    """Paint over Bars. slab with swirl texture + soft orange so redraw is clean."""
    out = im.copy()
    w, h = out.size
    # Bars. occupies a large left-center band on the wrap art — cover generously
    box = (int(w * 0.00), int(h * 0.12), int(w * 0.68), int(h * 0.92))
    patch_src = out.crop((int(w * 0.08), int(h * 0.58), int(w * 0.40), int(h * 0.98)))
    patch = patch_src.resize((box[2] - box[0], box[3] - box[1]), Image.Resampling.LANCZOS)
    patch = patch.filter(ImageFilter.GaussianBlur(2.5))
    # blend with orange to kill residual letterforms
    orange = Image.new("RGB", patch.size, (240, 90, 40))
    patch = Image.blend(patch, orange, 0.28)
    out.paste(patch, box[:2])
    return out


def draw_extruded_wordmark(im: Image.Image, text: str, xy: tuple[int, int], size: int, angle: float = -8):
    f = font(size)
    tmp = Image.new("RGBA", (1, 1))
    d0 = ImageDraw.Draw(tmp)
    bbox = d0.textbbox((0, 0), text, font=f)
    tw, th = bbox[2] - bbox[0] + size // 2, bbox[3] - bbox[1] + size // 2
    layer = Image.new("RGBA", (tw + size, th + size), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    depth = max(6, size // 14)
    for i in range(depth, 0, -1):
        d.text((depth + i, depth + i), text, font=f, fill=SHADOW + (255,))
    d.text((depth, depth), text, font=f, fill=WHITE + (255,))
    rotated = layer.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    im.paste(rotated, xy, rotated)


def rewrite_bottom(im: Image.Image, line_left: str, line_right: str = "ChocolateBenevolo.co"):
    w, h = im.size
    d = ImageDraw.Draw(im)
    band = (0, int(h * 0.90), w, h)
    sample = im.getpixel((w // 3, int(h * 0.5)))
    d.rectangle(band, fill=sample)
    f = sans(max(18, w // 70))
    d.text((int(w * 0.03), int(h * 0.93)), line_left, font=f, fill=WHITE)
    bbox = d.textbbox((0, 0), line_right, font=f)
    tw = bbox[2] - bbox[0]
    d.text((w - tw - int(w * 0.03), int(h * 0.93)), line_right, font=f, fill=WHITE)


def rewrite_lockup_sub(im: Image.Image, line1: str, line2: str):
    w, h = im.size
    d = ImageDraw.Draw(im)
    x0, y0 = int(w * 0.04), int(h * 0.72)
    x1, y1 = int(w * 0.32), int(h * 0.88)
    sample = im.getpixel((int(w * 0.08), int(h * 0.65)))
    d.rectangle((x0, y0, x1, y1), fill=sample)
    f = sans(max(15, w // 90), bold=True)
    d.text((x0 + 8, y0 + 6), line1, font=f, fill=NAVY)
    d.text((x0 + 8, y0 + 6 + max(17, w // 85)), line2, font=f, fill=NAVY)


def make_line_front(
    art: Image.Image,
    wordmark: str,
    sub1: str,
    sub2: str,
    bottom: str,
    out_path: Path,
    size: tuple[int, int] | None = None,
    wm_size_ratio: float = 0.42,
):
    base = cover_wordmark(art)
    w, h = base.size
    draw_extruded_wordmark(base, wordmark, (int(w * 0.04), int(h * 0.28)), size=int(h * wm_size_ratio))
    rewrite_lockup_sub(base, sub1, sub2)
    rewrite_bottom(base, bottom)
    if size:
        base = base.resize(size, Image.Resampling.LANCZOS)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    base.convert("RGB").save(out_path, quality=94)
    print("wrote", out_path.name)


def make_l0_sticker(front: Image.Image, out_path: Path, box=(50, 45), dpi=14):
    w, h = front.size
    crop = front.crop((0, 0, int(w * 0.72), h))
    target = (box[0] * dpi, box[1] * dpi)
    sticker = crop.resize(target, Image.Resampling.LANCZOS)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    sticker.convert("RGB").save(out_path, quality=94)
    print("wrote", out_path.name)


def navy_back_panel(out_path: Path, title: str, variant: str, body_lines: list[str], size=(900, 1200)):
    im = Image.new("RGB", size, NAVY)
    d = ImageDraw.Draw(im)
    d.line((size[0] - 18, 40, size[0] - 18, size[1] - 40), fill=WHITE, width=2)
    y = 70
    d.text((48, y), title, font=font(64), fill=WHITE)
    y += 78
    d.text((48, y), variant, font=font(40), fill=CHAMP)
    y += 60
    d.text((48, y), "By Benévolo", font=font(34), fill=CHAMP)
    y += 58
    d.text((48, y), "Buen Chocolate Indulgente.", font=font(36), fill=CREAM)
    y += 80
    d.text((48, y), "Contiene:", font=sans(26, bold=True), fill=WHITE)
    y += 44
    for line in body_lines:
        d.text((48, y), line, font=sans(28), fill=CREAM)
        y += 36
    y += 28
    d.text((48, y), "Bombón grande · molde mazorca", font=sans(24), fill=CHAMP)
    y += 50
    d.text((48, y), "Elaborado por:", font=sans(26, bold=True), fill=WHITE)
    y += 40
    d.text((48, y), "Chocolate Zurych SAS", font=sans(28), fill=CREAM)
    y += 36
    d.text((48, y), "NSA-0011242-2021", font=sans(24), fill=CHAMP)
    y += 50
    d.text((48, y), "Contacto:", font=sans(26, bold=True), fill=WHITE)
    y += 40
    d.text((48, y), "+57 310 222 7848", font=sans(28), fill=CREAM)
    y += 40
    d.text((48, y), "ChocolateBenevolo.co", font=sans(28), fill=WHITE)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    im.save(out_path, quality=94)
    print("wrote", out_path.name)


def svg_image_label(mm_w, mm_h, href_rel: str, title: str) -> str:
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="{mm_w}mm" height="{mm_h}mm" viewBox="0 0 {mm_w*10} {mm_h*10}"
  role="img" aria-label="{title}">
  <title>{title}</title>
  <desc>Arte derivado del cartón impreso Bars Benevolo.pdf. Capas guides ocultas.</desc>
  <g id="layer-guides" display="none">
    <rect id="bleed" x="-30" y="-30" width="{mm_w*10+60}" height="{mm_h*10+60}" fill="none" stroke="#00AEEF" stroke-width="2" stroke-dasharray="8 6"/>
    <rect id="trim" x="0" y="0" width="{mm_w*10}" height="{mm_h*10}" fill="none" stroke="#FF00AA" stroke-width="2"/>
    <rect id="safe" x="30" y="30" width="{mm_w*10-60}" height="{mm_h*10-60}" fill="none" stroke="#00FF88" stroke-width="1" stroke-dasharray="4 4"/>
  </g>
  <g id="layer-artwork">
    <image x="0" y="0" width="{mm_w*10}" height="{mm_h*10}" preserveAspectRatio="xMidYMid slice"
      href="{href_rel}" xlink:href="{href_rel}"/>
  </g>
</svg>
'''


def write_both(rel: Path, content: str | None = None, binary: Path | None = None):
    dest = ROOT / rel
    pub = PUBLIC / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    pub.parent.mkdir(parents=True, exist_ok=True)
    if binary:
        data = binary.read_bytes()
        dest.write_bytes(data)
        pub.write_bytes(data)
    elif content is not None:
        dest.write_text(content, encoding="utf-8")
        pub.write_text(content, encoding="utf-8")
    print("mirrored", rel)


def main():
    art = ensure_assets()

    # ── Bons. × 3 rellenos ──
    for sku in BONS_SKUS:
        sid = sku["id"]
        front = ASSETS / f"bons-{sid}-front.jpg"
        l0 = ASSETS / f"bons-{sid}-l0.jpg"
        back = ASSETS / f"bons-{sid}-back.jpg"

        make_line_front(
            art,
            "Bons.",
            sku["name"].upper(),
            sku["layers_short"],
            sku["bottom"],
            front,
            wm_size_ratio=0.40,
        )
        make_l0_sticker(Image.open(front), l0)
        navy_back_panel(back, "Bons.", sku["name"], sku["layers_lines"])

        write_both(Path(f"bons/bons-{sid}-front.jpg"), binary=front)
        write_both(Path(f"bons/bons-{sid}-l0.jpg"), binary=l0)
        write_both(Path(f"bons/bons-{sid}-back.jpg"), binary=back)
        write_both(
            Path(f"bons/bons-{sid}-l0.svg"),
            content=svg_image_label(50, 45, f"bons-{sid}-l0.jpg", f"Bons. {sku['name']} L0 · fiel Bars. PDF"),
        )
        write_both(
            Path(f"bons/bons-{sid}-front.svg"),
            content=svg_image_label(90, 50, f"bons-{sid}-front.jpg", f"Bons. {sku['name']} · frente fiel"),
        )
        write_both(
            Path(f"bons/bons-{sid}-back.svg"),
            content=svg_image_label(50, 45, f"bons-{sid}-back.jpg", f"Bons. {sku['name']} · dorso navy PDF"),
        )

    # Default aliases → Caramelo (SKU ancla)
    for alias, src in [
        ("bons/bons-l0-front-faithful.jpg", ASSETS / "bons-caramelo-l0.jpg"),
        ("bons/bons-front-faithful.jpg", ASSETS / "bons-caramelo-front.jpg"),
        ("bons/bons-back-faithful.jpg", ASSETS / "bons-caramelo-back.jpg"),
    ]:
        write_both(Path(alias), binary=src)
    write_both(
        Path("bons/bons-l0-front.svg"),
        content=svg_image_label(50, 45, "bons-caramelo-l0.jpg", "Bons. Caramelo L0 · default"),
    )
    write_both(
        Path("bons/bons-label-front-v0.svg"),
        content=svg_image_label(90, 50, "bons-caramelo-front.jpg", "Bons. Caramelo · frente"),
    )
    write_both(
        Path("bons/bons-l0-back.svg"),
        content=svg_image_label(50, 45, "bons-caramelo-back.jpg", "Bons. Caramelo · dorso"),
    )

    # Nibs / Coberturas still from Bars art
    nibs = ASSETS / "nibs-front-faithful.jpg"
    cob = ASSETS / "coberturas-front-faithful.jpg"
    make_line_front(art, "Nibs.", "100% CACAO", "TOSTADOS", "Nibs de origen · Neto 150–250 g", nibs)
    make_line_front(
        art, "Coberturas.", "70% CACAO", "1 KG OBRADOR", "Cobertura profesional · temperar", cob, size=(1800, 900), wm_size_ratio=0.28
    )
    write_both(Path("nibs/nibs-front-faithful.jpg"), binary=nibs)
    write_both(Path("coberturas/coberturas-front-faithful.jpg"), binary=cob)
    write_both(Path("nibs/nibs-l0-sticker.svg"), content=svg_image_label(70, 40, "nibs-front-faithful.jpg", "Nibs. · fiel Bars."))
    write_both(
        Path("coberturas/coberturas-l0-sticker.svg"),
        content=svg_image_label(70, 40, "coberturas-front-faithful.jpg", "Coberturas. · fiel Bars."),
    )

    if (ASSETS / "bars-fear5-front-art.jpg").exists():
        write_both(Path("shared/assets/bars-fear5-front-art.jpg"), binary=ASSETS / "bars-fear5-front-art.jpg")
    if (ASSETS / "bars-carton-dieline.png").exists():
        write_both(Path("shared/assets/bars-carton-dieline.png"), binary=ASSETS / "bars-carton-dieline.png")
        write_both(
            Path("shared/bars-carton-dieline.svg"),
            content=svg_image_label(210, 297, "assets/bars-carton-dieline.png", "Bars. · dieline PDF impreso"),
        )

    readme = """# Bons. · fiel a Bars Benevolo.pdf · 3 rellenos

Bombón grande · molde mazorca. Arte heredado del PDF/packshot Bars. (swirls + mazorca + sello).

| SKU | Archivos L0 | Relleno |
|-----|-------------|---------|
| **Caramelo** | `bons-caramelo-l0.jpg` / `.svg` | caramelo · malvavisco · galleta |
| **Dubai** | `bons-dubai-l0.jpg` / `.svg` | pistacho · crocante · mantequilla |
| **Tiramisú** | `bons-tiramisu-l0.jpg` / `.svg` | soletilla · café · crema · cacao en polvo |

Master Bars.: `shared/assets/bars-carton-dieline.png` · `bars-fear5-front-art.jpg`

```bash
python3 brand/chocolate-benevolo/packaging/build_faithful.py
```
"""
    (ROOT / "bons/README-SKUS.md").write_text(readme, encoding="utf-8")
    (ROOT / "FAITHFUL.md").write_text(readme, encoding="utf-8")
    (PUBLIC / "FAITHFUL.md").write_text(readme, encoding="utf-8")
    print("done")


if __name__ == "__main__":
    main()
