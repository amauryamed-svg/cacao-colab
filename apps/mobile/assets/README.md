# Assets pendientes

`app.json` referencia `icon.png`, `splash` y `adaptive-icon` que **no existen todavía**. No se generó
un ícono placeholder a propósito: el logo oficial de Cacao Colab/CAÚA no está disponible para este
agente (ver memoria del proyecto — los PNG sueltos en otros repos del ecosistema Caúa no son el logo
oficial). Antes de un build de EAS real hace falta:

- `icon.png` (1024×1024)
- `splash.png`
- `adaptive-icon.png` (Android, foreground transparente sobre `backgroundColor` ya fijado en `app.json`)
- `favicon.png` (web, si se habilita `expo-router` web output)

Pedir el asset oficial de la ardilla Dualita / wordmark Cacao Colab antes de generar estos archivos.
