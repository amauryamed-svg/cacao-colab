import type { HubspotContact, HubspotDeal } from "@cacao-colab/hubspot-client"

type Props = {
  /** false si este team member no tiene `hubspot_contact_email` configurado. */
  hasMapping: boolean
  contact: HubspotContact | null
  deals: HubspotDeal[]
  /** Mensaje de error real de la API de HubSpot, si lo hubo (nunca se inventan datos en su lugar). */
  errorMessage?: string | null
}

function formatCOP(amount: string | null) {
  if (!amount) return "—"
  const n = Number(amount)
  if (Number.isNaN(n)) return amount
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n)
}

/**
 * Panel de datos reales de HubSpot CRM en el portal /equipo. Regla dura:
 * cero datos inventados. Si no hay mapping, o el contacto no existe en
 * HubSpot, o hay un error de API — se muestra el estado correspondiente de
 * forma explícita, nunca un placeholder que parezca dato real.
 */
export default function TeamHubspotPanel({ hasMapping, contact, deals, errorMessage }: Props) {
  if (!hasMapping) {
    return (
      <div className="rounded-2xl border border-dashed border-colab-forest/20 bg-colab-cream/60 px-6 py-8 text-center">
        <p className="font-sans text-sm text-colab-forest/60">
          Sin contacto de HubSpot vinculado todavía. Este perfil no tiene un
          <code className="mx-1 rounded bg-colab-forest/5 px-1.5 py-0.5 text-xs">hubspot_contact_email</code>
          configurado en <code className="rounded bg-colab-forest/5 px-1.5 py-0.5 text-xs">team_members</code>.
        </p>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
        <p className="font-sans text-sm text-red-700">
          No se pudo consultar HubSpot: {errorMessage}
        </p>
      </div>
    )
  }

  if (!contact) {
    return (
      <div className="rounded-2xl border border-dashed border-colab-forest/20 bg-colab-cream/60 px-6 py-8 text-center">
        <p className="font-sans text-sm text-colab-forest/60">
          Este email tiene mapping configurado pero no existe como contacto en
          HubSpot todavía. No se muestran datos hasta que exista de verdad.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-colab-forest/10 bg-white/70 px-6 py-6 flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-lg text-colab-forest mb-3">Tu contacto en HubSpot</h2>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-sans">
          <dt className="text-colab-forest/50">Nombre</dt>
          <dd>{contact.properties.firstname ?? "—"} {contact.properties.lastname ?? ""}</dd>
          <dt className="text-colab-forest/50">Email</dt>
          <dd>{contact.properties.email ?? "—"}</dd>
          <dt className="text-colab-forest/50">Compañía</dt>
          <dd>{contact.properties.company ?? "—"}</dd>
          <dt className="text-colab-forest/50">Etapa</dt>
          <dd>{contact.properties.lifecyclestage ?? "—"}</dd>
        </dl>
      </div>

      <div>
        <h2 className="font-serif text-lg text-colab-forest mb-3">Deals asociados</h2>
        {deals.length === 0 ? (
          <p className="text-sm text-colab-forest/50 font-sans">Sin deals asociados en HubSpot.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {deals.map((deal) => (
              <li
                key={deal.id}
                className="flex items-center justify-between rounded-xl bg-colab-cream/60 px-4 py-3 text-sm font-sans"
              >
                <span>{deal.dealname ?? `Deal ${deal.id}`}</span>
                <span className="text-colab-forest/60">{formatCOP(deal.amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
