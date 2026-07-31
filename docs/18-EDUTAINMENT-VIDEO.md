# Edutainment video · HyperFrames studio

## 1. Tesis

Cacao Colab se posiciona como referente de **edutainment** cacao: MOOC + Microlearning + Masters con intros audiovisuales estilo Anthropic Academy (una idea por beat, tipografía expresiva, calma, evidencia).

## 2. Stack elegido

| Motor | Rol |
|---|---|
| **HyperFrames** (primario) | HTML/CSS/GSAP → MP4 determinista. Agent-native. Vivir en `apps/video`. |
| Remotion | Reserva si una composición exige React compartido con la web. |
| Higgsfield | Solo B-roll cinematográfico opcional con API keys — **nunca** para claims científicos. |

Sitio oficial CoEx (referencia de calidad, no afiliación): https://www.cacaoofexcellence.org/

## 3. Superficies

| Video | Ruta web |
|---|---|
| `dualita-campus` | `/aprende` |
| `micro-cacao-bioactivo` | `/aprende/cacao-bioactivo` (LessonPlayer) |
| `master-cacaotier` | `/aprende/cacaotier` |
| `master-chocolatier` | `/aprende/chocolatier` |

Player: `CourseIntroPlayer` — reproduce MP4 si existe; si no, iframe de la composición HyperFrames.

## 4. Authoring

```bash
cd apps/video
pnpm install
pnpm render:all   # escribe MP4 en apps/web/public/videos/intros/
```

- Scripts: `apps/video/scripts/catalog.json`
- Cámara / tokens: `apps/video/frame.md`
- Composiciones: `apps/video/compositions/*`

## 5. Pedagogía (estilo Anthropic)

1. Brand / track  
2. Concepto en una línea  
3. Por qué importa  
4. Modelo mental (≤3 pasos)  
5. CTA al módulo interactivo  

Sin glow púrpura, sin emojis, sin badges flotantes, sin medallas CoEx inventadas.

## 6. Analytics

Evento `video_intro_played` — migración `20260730235900_video_intro_played_event.sql`.

## 7. Roadmap corto

1. Narración TTS + captions en HyperFrames (`/media-use`)  
2. Intros para los 6 micros restantes y 4 MOOC Zurych  
3. Cloud render HeyGen / Lambda cuando haya volumen CI  
4. Higgsfield solo para atmosphere shots aprobados editorialmente  
