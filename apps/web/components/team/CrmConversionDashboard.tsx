import type { HubspotFunnelSnapshot } from "@cacao-colab/hubspot-client"

type Metrics = {
  pageViews: number
  uniqueVisitors: number
  registeredUsers: number
  onboardedLeads: number
  microClicks: number
  moocClicks: number
  lessonsCompleted: number
}

type ContactRow = {
  id: string
  fullName: string
  email: string
  company: string | null
  city: string | null
  lifecycleStage: string | null
  hubspotContactId: string | null
  createdAt: string
}

function pct(value: number, base: number) {
  return base > 0 ? `${Math.round((value / base) * 100)}%` : "—"
}

export default function CrmConversionDashboard({
  metrics,
  contacts,
  hubspot,
  hubspotError,
  dataError,
}: {
  metrics: Metrics
  contacts: ContactRow[]
  hubspot: HubspotFunnelSnapshot | null
  hubspotError: string | null
  dataError: string | null
}) {
  const funnel = [
    { label: "Visitas", value: metrics.uniqueVisitors, rate: "100%", color: "#F2C830" },
    { label: "Registros", value: metrics.registeredUsers, rate: pct(metrics.registeredUsers, metrics.uniqueVisitors), color: "#E3A12B" },
    { label: "Onboarding", value: metrics.onboardedLeads, rate: pct(metrics.onboardedLeads, metrics.uniqueVisitors), color: "#DC775F" },
    { label: "Micro CAÚA", value: metrics.microClicks, rate: pct(metrics.microClicks, metrics.uniqueVisitors), color: "#86B66B" },
    { label: "MOOC Zurych", value: metrics.moocClicks, rate: pct(metrics.moocClicks, metrics.uniqueVisitors), color: "#48A784" },
  ]

  return (
    <section className="crm-dashboard">
      <div className="crm-dashboard-header">
        <div>
          <p className="eyebrow text-colab-green">CRM interno · first-party + HubSpot</p>
          <h2>Conversión del ecosistema</h2>
          <p>Ventana acumulada desde la activación del tracking. Los clics no equivalen a matrícula ni compra.</p>
        </div>
        <span className="crm-live-dot">● Datos reales</span>
      </div>

      {dataError && <div className="crm-warning">CRM local no disponible: {dataError}</div>}

      <div className="crm-metric-grid">
        {[
          ["Page views", metrics.pageViews],
          ["Visitantes únicos", metrics.uniqueVisitors],
          ["Usuarios registrados", metrics.registeredUsers],
          ["Leads onboarding", metrics.onboardedLeads],
          ["Lecciones completas", metrics.lessonsCompleted],
        ].map(([label, value]) => (
          <article key={String(label)}><span>{label}</span><strong>{value}</strong></article>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.35fr_.65fr] gap-4 mt-4">
        <article className="crm-panel">
          <div className="crm-panel-title"><div><span>01</span><h3>Funnel hacia aprendizaje</h3></div><small>Conversión sobre visitantes únicos</small></div>
          <div className="crm-funnel">
            {funnel.map((stage, index) => {
              const width = metrics.uniqueVisitors > 0
                ? Math.max(28, 100 - index * 8 - (1 - stage.value / Math.max(1, metrics.uniqueVisitors)) * 22)
                : 100 - index * 10
              return (
                <div key={stage.label} style={{ width: `${width}%`, borderColor: stage.color }}>
                  <span>{stage.label}</span><strong>{stage.value}</strong><small>{stage.rate}</small>
                </div>
              )
            })}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            <div className="crm-conversion-card">
              <span>CAÚA · Microlearning funcional</span>
              <strong>{metrics.microClicks}</strong>
              <small>{pct(metrics.microClicks, metrics.uniqueVisitors)} de visitantes hicieron clic</small>
            </div>
            <div className="crm-conversion-card">
              <span>Zurych · MOOC contexto cacao</span>
              <strong>{metrics.moocClicks}</strong>
              <small>{pct(metrics.moocClicks, metrics.uniqueVisitors)} de visitantes hicieron clic</small>
            </div>
          </div>
        </article>

        <article className="crm-panel">
          <div className="crm-panel-title"><div><span>02</span><h3>HubSpot</h3></div></div>
          {hubspot ? (
            <div className="crm-hubspot-list">
              <div><span>Contactos</span><strong>{hubspot.totalContacts}</strong></div>
              <div><span>Leads</span><strong>{hubspot.leads}</strong></div>
              <div><span>MQL</span><strong>{hubspot.marketingQualified}</strong></div>
              <div><span>SQL</span><strong>{hubspot.salesQualified}</strong></div>
              <div><span>Clientes</span><strong>{hubspot.customers}</strong></div>
            </div>
          ) : (
            <div className="crm-empty">
              <strong>HubSpot sin lectura agregada</strong>
              <p>{hubspotError ?? "No hay snapshot disponible."}</p>
            </div>
          )}
        </article>
      </div>

      <article className="crm-panel mt-4">
        <div className="crm-panel-title"><div><span>03</span><h3>Leads recientes</h3></div><small>{contacts.length} mostrados</small></div>
        {contacts.length ? (
          <div className="crm-table-wrap">
            <table className="crm-table">
              <thead><tr><th>Contacto</th><th>Operación</th><th>Ciudad</th><th>Etapa</th><th>HubSpot</th><th>Creado</th></tr></thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td><strong>{contact.fullName}</strong><small>{contact.email}</small></td>
                    <td>{contact.company ?? "—"}</td><td>{contact.city ?? "—"}</td>
                    <td><span className="crm-stage">{contact.lifecycleStage ?? "sin etapa"}</span></td>
                    <td>{contact.hubspotContactId ? "✓ vinculado" : "pendiente"}</td>
                    <td>{new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(contact.createdAt))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <div className="crm-empty"><strong>Sin leads locales todavía</strong><p>El dashboard no genera datos de demostración.</p></div>}
      </article>
    </section>
  )
}
