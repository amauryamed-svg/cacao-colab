# Tipografía Bars. · Bodoni Ultra Black Italic

## Regla canónica

El wordmark de producto **Bars.** (con punto) se compone **siempre** en:

**Bodoni Ultra Black Italic**

- Peso: Ultra Black / 900  
- Estilo: Italic  
- Color fill: `#FFFFFF` sobre naranja o navy  
- Extrusión / sombra de marca: `#C43A18` (offset abajo-derecha, sin blur suave)  

## Fallback web / Canva / Express

Si no hay licencia de Bodoni Ultra Black Italic instalada:

| Plataforma | Usar |
|------------|------|
| Web / SVG | [Bodoni Moda](https://fonts.google.com/specimen/Bodoni+Moda) 900 italic |
| Canva | Buscar “Bodoni” → Black/Italic; si no, “Playfair Display Black Italic” solo como temporal |
| Adobe Express | Bodoni / Didot Black Italic del catálogo Adobe Fonts |
| Print final | **Bodoni Ultra Black Italic** licenciada (archivo OTF/TTF del Brand Kit) |

## CSS

```css
.bars-wordmark {
  font-family: "Bodoni Ultra Black Italic", "Bodoni Moda", "Bodoni MT", Didot, serif;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #fff;
  text-shadow: 0 8px 0 #C43A18;
}
```

## Do / Don’t

- **Do:** Bars. con punto, itálica ultra negra Bodoni.  
- **Don’t:** Arial Black, Impact, script redondeada genérica, caps lock BARS, omitir el punto.  
- **Don’t:** Usar Bodoni Ultra para párrafos del Brand Book.  

## Assets

- `brand/chocolate-benevolo/logos/bars-wordmark.svg`  
- Portada corregida: `/opt/cursor/artifacts/assets/benevolo-brandbook-cover-bars-bodoni.png`  
