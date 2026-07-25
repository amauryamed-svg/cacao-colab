# Cacao Colab — Mobile (Expo / React Native)

> Scaffold en `apps/mobile` — Expo managed + EAS Build (D12, `00-SPEC.md`). No compilado ni
> probado en un dispositivo/simulador todavía.

---

## 1. Por qué Expo managed (no bare RN)

Elegido por velocidad de desarrollo con un equipo de 3 personas y deadline de App Store en menos
de 3 meses. Apps de este estilo (Rappi, apps de edutainment/gamify) suelen usar RN bare por
necesidad de módulos nativos muy específicos a gran escala — Cacao Colab no tiene ese requisito
todavía. Se reevalúa **solo** si un módulo nativo concreto lo exige (ej. un SDK de pagos que no
tenga config plugin de Expo) — no antes, y no preventivamente.

## 2. Versión de SDK y reconciliación de dependencias

El scaffold fija `expo ~53.0.0` / `react-native 0.79.0` / `react 19.2.4` como versión objetivo, pero
**no se ha corrido `npx expo install --fix`** — Oscar/Hellen deben correrlo al hacer el primer
`pnpm install` real para que Expo reconcilie las versiones exactas compatibles entre sí (Expo es
estricto con el pinning cruzado RN/React/librerías nativas).

## 3. Estructura actual

```
apps/mobile/
  app/
    _layout.tsx          Stack root, StatusBar con colabForest
    (tabs)/
      _layout.tsx         Tabs: Marketplace · Aprende · Perfil
      index.tsx            Marketplace (placeholder)
      aprende.tsx           Dualita (placeholder)
      perfil.tsx            Perfil/membresía (placeholder)
  app.json                Config Expo — bundleIdentifier co.cacaocolab.app (revisar antes de submission)
  eas.json                Perfiles development/preview/production
  babel.config.js
  assets/                 SIN icon.png/splash/adaptive-icon — ver sección 5
```

## 4. Streaming del companion IA en RN

`@ai-sdk/react` no streamea por defecto en React Native — requiere pasar `expo/fetch` (polyfill
con `ReadableStream` real, Expo SDK 50+) como implementación de `fetch`. Ver `10-DUALITA-IA.md` § 6.
Sin implementar todavía (pantalla de chat es Fase 7).

## 5. Assets pendientes (bloqueante para cualquier build de EAS)

`app.json` referencia `icon.png`, `splash`, `adaptive-icon` que **no existen**. No se generó un
ícono placeholder a propósito — el logo oficial de Cacao Colab/Dualita no está disponible para
este agente (ver `assets/README.md` en el propio scaffold). Pedir a Amaury/Diseño:

- `icon.png` (1024×1024)
- `splash.png`
- `adaptive-icon.png` (Android, foreground transparente sobre `#1A2E10`)
- `favicon.png` (solo si se habilita output web de `expo-router`)

## 6. Política de OTA updates

No configurado todavía. Recomendación para Fase 6-7: `expo-updates` con canal `preview` para
builds internos y `production` para la tienda — permite shippear fixes de JS sin pasar por review
de Apple/Google para cambios que no toquen código nativo. Configurar `runtimeVersion` con policy
`appVersion` (simple, suficiente para el volumen de releases esperado en el año 1).

## 7. Checklist de submission (App Store + Play Store)

- [ ] Assets reales (sección 5)
- [ ] `bundleIdentifier`/`package` confirmados como `co.cacaocolab.app` o el dominio final que se compre (ver P6, `00-SPEC.md`)
- [ ] Cuenta de Apple Developer Program ($99/año) — no existe todavía, gestionar aparte
- [ ] Cuenta de Google Play Console ($25 único) — no existe todavía
- [ ] `eas build --profile production` verde en iOS y Android
- [ ] TestFlight / Internal Testing con al menos Oscar + Hellen + Amaury antes de submission pública
- [ ] Política de privacidad publicada (requerida por ambas tiendas — el marketplace maneja pagos y datos de agricultores, no es opcional)
- [ ] Screenshots y metadata de store listing
- [ ] `eas submit` configurado (credenciales de firma gestionadas por EAS o manuales)

Ninguno de estos pasos está hecho — este documento es el checklist para Fase 7, no un reporte de progreso.
