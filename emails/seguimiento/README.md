# Emails de seguimiento · Mazorcas + Sembrar + consistencia

Plantillas **body-only** para pegar en HubSpot (Marketing → Email → `<>` Source).  
Principio: *la maestría se logra con consistencia en estudiar y practicar*.

| Archivo | Cuándo | Enfoque |
|---------|--------|---------|
| `01-bienvenida-semilla.html` | Día 1 tras onboarding / registro | Primer surco · Dualita + Sembrar |
| `07-consistencia-mazorcas.html` | Día 7 (o tras ≥1 MD / 1 módulo) | MD recolectadas · rango · próximo módulo |
| `14-maestria-repeticion.html` | Día 14 | Repetición deliberada · estado Sembrar como consejo |

Tokens HubSpot estándar: `{{ contact.firstname }}`  
Tokens custom (crear props primero — ver `docs/22-EMAIL-SEGUIMIENTO-CONSISTENCIA.md`):

- `{{ contact.colab_md_lifetime }}`
- `{{ contact.colab_md_balance }}`
- `{{ contact.colab_rank }}`
- `{{ contact.colab_micro_completed }}`
- `{{ contact.colab_sembrar_stage }}`
- `{{ contact.colab_sembrar_genotype }}`

El motor de consejo en código: `apps/web/lib/followup-advice.ts`  
Sync automático tras lección/Sembrar: `apps/web/lib/followup-sync.ts`
