#!/usr/bin/env python3
"""Piezas 1:1 y story 9:16 para @chocolate.benevolo. Fuente de copy: apps/web/lib/benevolo-launch.ts."""

from pathlib import Path

OUT = Path(__file__).resolve().parents[3] / "apps/web/public/benevolo/ig"

FRAMES = [
    {
        "id": "prensa",
        "kicker": "Infonegocios · 8 sep",
        "wordmark": "Bars.",
        "display": "Hoy nos leyeron.",
        "quote": "",
        "support": "Prelanzamiento noviembre. No es mercado abierto.",
    },
    {
        "id": "quote",
        "kicker": "Amaury Amed",
        "wordmark": "",
        "display": "Antojo, no pretensión.",
        "quote": "Que sepa a una barra de chocolate. Que detrás haya origen, fermentación e historia.",
        "support": "Infonegocios Colombia",
    },
    {
        "id": "fear5",
        "kicker": "Origen · Fedecacao",
        "wordmark": "",
        "display": "FEAR 5",
        "quote": "Federación Arauquita 5. Cerca del 80 % del fine flavor nace en fermentación.",
        "support": "Trinitario colombiano · microlotes",
    },
    {
        "id": "bars",
        "kicker": "Línea",
        "wordmark": "Bars.",
        "display": "El comienzo es una chocolatina.",
        "quote": "Bons. anunciado. Todavía no es SKU de tienda.",
        "support": "Marañón salado · preventa Benevolo.shop",
    },
    {
        "id": "benevolente",
        "kicker": "Benevolente",
        "wordmark": "",
        "display": "Bueno para todos.",
        "quote": "Para quien lo come, quien lo produce y el territorio.",
        "support": "Cacao Colab · conocimiento y oficio",
    },
    {
        "id": "entender",
        "kicker": "Tesis",
        "wordmark": "",
        "display": "Comprar contexto.",
        "quote": "No solamente chocolate. Una manera de entender el cacao.",
        "support": "Link in bio · noviembre",
    },
    {
        "id": "noviembre",
        "kicker": "Ventana publicada",
        "wordmark": "Bars.",
        "display": "Noviembre.",
        "quote": "Preventa ahora. WhatsApp confirma el lote.",
        "support": "Intención: Estados Unidos — no tienda abierta",
    },
]

CSS = """
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@1,900&family=Fraunces:wght@700&family=Outfit:wght@500;700&display=swap');
:root { color-scheme: dark; }
* { box-sizing: border-box; margin: 0; }
html, body { height: 100%; background: #140e0a; }
.frame {
  width: 100vw; height: 100vh;
  padding: 8%;
  display: flex; flex-direction: column; justify-content: space-between;
  background:
    radial-gradient(circle at 88% 12%, rgba(232,201,160,.2), transparent 32%),
    radial-gradient(circle at 8% 88%, rgba(255,106,61,.16), transparent 36%),
    #140e0a;
  color: #f7f1ee;
  font-family: Outfit, system-ui, sans-serif;
}
header, footer { display: flex; justify-content: space-between; gap: 1rem; align-items: baseline; }
header span, header em, footer span, footer em {
  font-style: normal; font-size: 18px; letter-spacing: .14em;
  text-transform: uppercase; color: rgba(232,201,160,.7);
}
.wordmark {
  font-family: 'Bodoni Moda', Didot, Georgia, serif;
  font-style: italic; font-weight: 900;
  font-size: 168px; letter-spacing: -.04em; line-height: .85; color: #fff;
}
h1 {
  font-family: Fraunces, Georgia, serif;
  font-size: 64px; font-weight: 700; line-height: 1.12; margin-top: 12px;
}
.quote { margin-top: 22px; max-width: 820px; font-size: 28px; line-height: 1.4; color: rgba(247,241,238,.62); }
"""

TEMPLATE = """<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8"/>
  <meta name="robots" content="noindex"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>{title} · @chocolate.benevolo</title>
  <style>{css}</style>
</head>
<body>
  <article class="frame">
    <header>
      <span>{kicker}</span>
      <em>@chocolate.benevolo</em>
    </header>
    <div>
      {wordmark}
      <h1>{display}</h1>
      {quote}
    </div>
    <footer>
      <span>{support}</span>
      <em>cacaocolab.org/benevolo/noviembre</em>
    </footer>
  </article>
</body>
</html>
"""


def render(frame: dict, story: bool = False) -> str:
    css = CSS
    if story:
        css += ".wordmark { font-size: 132px; } h1 { font-size: 72px; }\n"
    wordmark = f'<p class="wordmark">{frame["wordmark"]}</p>' if frame["wordmark"] else ""
    quote = f'<p class="quote">{frame["quote"]}</p>' if frame["quote"] else ""
    return TEMPLATE.format(
        title=frame["display"],
        css=css,
        kicker=frame["kicker"],
        wordmark=wordmark,
        display=frame["display"],
        quote=quote,
        support=frame["support"],
    )


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for frame in FRAMES:
        (OUT / f"{frame['id']}.html").write_text(render(frame), encoding="utf-8")
    noviembre = next(item for item in FRAMES if item["id"] == "noviembre")
    (OUT / "noviembre-story.html").write_text(render(noviembre, story=True), encoding="utf-8")
    print(f"wrote {len(list(OUT.glob('*.html')))} html files → {OUT}")


if __name__ == "__main__":
    main()
