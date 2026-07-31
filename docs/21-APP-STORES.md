# Cacao Colab — Publicación App Store y Google Play

> Primer paso documentado para que Hellen (UI móvil), Oscar (build/CI) y Amaury (cuentas legales / Product) publiquen la app nativa.  
> Estado: **documentación + scaffolding** — aún no hay binario en stores.  
> Última actualización: 2026-07-31

---

## 1. Qué se publica

| Campo | Valor |
|-------|-------|
| Nombre | Cacao Colab |
| Bundle iOS | `co.cacaocolab.app` |
| Package Android | `co.cacaocolab.app` |
| Framework | Expo managed (`apps/mobile`) |
| Versión actual en repo | `0.1.0` (`apps/mobile/app.json`) |
| Canal de build | EAS Build (recomendado) |

La web ([cacao-colab.vercel.app](https://cacao-colab.vercel.app)) ya es la superficie principal. La app móvil es el mismo Colab en bolsillo: marketplace (lectura), Dualita / Aprende, perfil.

---

## 2. Cuentas que debe abrir Amaury (PM)

| Plataforma | Cuenta | Costo aproximado | Notas |
|------------|--------|-----------------|-------|
| **Apple Developer Program** | developer.apple.com | ~99 USD/año | Requiere entidad o persona; D-U-N-S si es company |
| **Google Play Console** | play.google.com/console | ~25 USD una vez | Cuenta de desarrollador |
| **Expo / EAS** | expo.dev | Free tier → Production | Proyecto ligado a `apps/mobile` |
| **Privacy policy URL** | `https://cacao-colab.vercel.app/legal/privacidad` | — | Obligatorio en ambas stores · ver `23-PRIVACIDAD-Y-OPTIN.md` |

Sin estas cuentas no se puede completar el “paso de descarga” en las tiendas; sí se puede seguir desarrollando con **Expo Go**.

---

## 3. Paso 0 — Descargar / probar hoy (plug-and-play)

Antes de App Store / Play Store, cualquiera del trío (y nuevos builders) puede “descargar” el Colab móvil así:

```bash
./scripts/bootstrap.sh
pnpm --filter @cacao-colab/mobile start
```

1. Instalar **Expo Go** desde [App Store](https://apps.apple.com/app/expo-go/id982107779) o [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent).  
2. Escanear el QR del terminal.  
3. Validar tabs Marketplace · Aprende · Perfil (placeholders Fase 0 — ver `13-MOBILE.md`).

Esto es el **camino de descarga interno** mientras no exista la ficha pública en las tiendas.

---

## 4. Paso 1 — Preparar el proyecto EAS (Oscar + Hellen)

Desde `apps/mobile`:

```bash
npm i -g eas-cli   # o pnpm dlx eas-cli
eas login
eas build:configure
```

Archivo de referencia en el repo: `apps/mobile/eas.json` (perfiles `development`, `preview`, `production`).

Checklist técnico:

- [ ] Icono 1024×1024 y splash Colab (`#1A2E10`)  
- [ ] Screenshots iPhone 6.7" / 6.5" y Android phone (usar también `docs/assets/screenshots/home-mobile.png` como referencia visual)  
- [ ] Privacy policy + términos (URL live: `/legal/privacidad`, `/legal/terminos`)  
- [ ] `version` / `ios.buildNumber` / `android.versionCode` bump por release  
- [ ] Variables EAS: `EXPO_PUBLIC_API_URL`, Supabase anon key (nunca service role en el cliente)

---

## 5. Paso 2 — Builds de store

```bash
# Preview interna (TestFlight / internal testing)
eas build --platform ios --profile preview
eas build --platform android --profile preview

# Producción
eas build --platform ios --profile production
eas build --platform android --profile production
```

Submit (cuando Amaury tenga las cuentas enlazadas):

```bash
eas submit --platform ios --latest
eas submit --platform android --latest
```

---

## 6. Paso 3 — Ficha de tienda (borrador de copy)

**Nombre:** Cacao Colab  

**Subtítulo / short description:**  
Acelera el cacao colombiano: aprende, colabora y conecta finca con chocolate.

**Descripción (borrador):**  
Cacao Colab es la plataforma de los builders fundadores Amaury Amed, Hellen Bareño y Oscar Gamboa. Marketplace de nodos, Dualita (microlearning CAÚA + MOOC Zurych), Sembrar y R&D (Benevolo + coberturas). Un idioma de excelencia para agricultores, chocolateros y nuevas generaciones.

**Keywords (iOS):** cacao, chocolate, colombia, fine flavor, dualita, colab  

**Categoría:** Educación / Food & Drink  

**Clasificación:** 4+ / Everyone  

---

## 7. Paso 4 — Revisión y “descarga” pública

| Store | Flujo de revisión | Dónde aparece la descarga |
|-------|-------------------|---------------------------|
| App Store | App Review (1–3 días típicos) | App Store Connect → versión Ready for Sale → URL pública |
| Google Play | Revisión Play (horas–días) | Play Console → Production → ficha live |

Cuando ambas estén live, actualizar:

1. README raíz (badges App Store / Google Play)  
2. Landing web con botones “Descargar en App Store / Google Play”  
3. Este doc con las URLs finales  

---

## 8. Responsabilidades

| Tarea | Dueño |
|-------|-------|
| Cuentas Apple / Google / legal / privacy URL | **Amaury** (PM) |
| UI móvil, assets, copy visual, Expo Go QA | **Hellen** (Frontend) |
| EAS config, secrets, CI de build, API que consume la app | **Oscar** (Backend) |
| Aprobar release a production | **Amaury** |

---

## 9. Fuera de alcance de esta pasada

- Binarios ya publicados en stores  
- Push notifications / deep links de producción  
- Login marketplace completo en móvil (Fase 1+)  

Siguiente hito concreto: Amaury crea Apple Developer + Play Console; Oscar corre `eas build:configure` y un profile `preview`; Hellen entrega icono + 3 screenshots móviles.
