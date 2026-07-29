import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { createSupabaseAdminClient } from "@cacao-colab/supabase-client/admin"
import {
  getContactByEmail,
  getDealsForContact,
  getHubspotFunnelSnapshot,
} from "@cacao-colab/hubspot-client"
import { redirect } from "next/navigation"
import TeamWelcome from "@/components/team/TeamWelcome"
import TeamHubspotPanel from "@/components/team/TeamHubspotPanel"
import CrmConversionDashboard from "@/components/team/CrmConversionDashboard"
import { signOutTeamMember } from "./actions"

export const metadata = { title: "Superadmin CRM · Cacao Colab", robots: { index: false, follow: false } }
export const dynamic = "force-dynamic"

const emptyMetrics = {
  pageViews: 0, uniqueVisitors: 0, registeredUsers: 0, onboardedLeads: 0,
  microClicks: 0, moocClicks: 0, lessonsCompleted: 0,
}

export default async function EquipoPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) redirect("/cuenta/entrar?next=/equipo&intent=team")

  await supabase.rpc("claim_team_membership")
  const { data: teamMember } = await supabase
    .from("team_members")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle()

  if (!teamMember || teamMember.access_level !== "superadmin") {
    redirect("/cuenta")
  }

  let metrics = emptyMetrics
  let contacts: Array<{
    id: string; fullName: string; email: string; company: string | null; city: string | null;
    lifecycleStage: string | null; hubspotContactId: string | null; createdAt: string;
  }> = []
  let dataError: string | null = null

  try {
    const admin = createSupabaseAdminClient()
    const [
      visitorsResult,
      pageViewsResult,
      microResult,
      moocResult,
      profilesResult,
      onboardingResult,
      recentContactsResult,
      completedResult,
    ] = await Promise.all([
      admin.from("analytics_events").select("visitor_id").limit(1000),
      admin.from("analytics_events").select("id", { count: "exact", head: true }).eq("event_type", "page_view"),
      admin.from("analytics_events").select("id", { count: "exact", head: true }).eq("event_type", "microlearning_link_clicked"),
      admin.from("analytics_events").select("id", { count: "exact", head: true }).eq("event_type", "mooc_link_clicked"),
      admin.from("profiles").select("id", { count: "exact", head: true }),
      admin.from("crm_contacts").select("id", { count: "exact", head: true }),
      admin.from("crm_contacts").select("*").order("created_at", { ascending: false }).limit(25),
      admin.from("campus_progress").select("id", { count: "exact", head: true }).not("completed_at", "is", null),
    ])
    if (visitorsResult.error) throw visitorsResult.error
    const events = visitorsResult.data ?? []
    metrics = {
      pageViews: pageViewsResult.count ?? 0,
      uniqueVisitors: new Set(events.map((event) => event.visitor_id)).size,
      registeredUsers: profilesResult.count ?? 0,
      onboardedLeads: onboardingResult.count ?? 0,
      microClicks: microResult.count ?? 0,
      moocClicks: moocResult.count ?? 0,
      lessonsCompleted: completedResult.count ?? 0,
    }
    contacts = (recentContactsResult.data ?? []).map((contact) => ({
      id: contact.id,
      fullName: contact.full_name,
      email: contact.email,
      company: contact.company,
      city: contact.city,
      lifecycleStage: contact.lifecycle_stage,
      hubspotContactId: contact.hubspot_contact_id,
      createdAt: contact.created_at,
    }))
  } catch (error) {
    dataError = error instanceof Error ? error.message : "No se pudo leer el CRM local."
  }

  let hubspot = null
  let hubspotError: string | null = null
  let personalContact = null
  let personalDeals: Awaited<ReturnType<typeof getDealsForContact>> = []
  try {
    hubspot = await getHubspotFunnelSnapshot()
    if (teamMember.hubspot_contact_email) {
      personalContact = await getContactByEmail(teamMember.hubspot_contact_email)
      if (personalContact) personalDeals = await getDealsForContact(personalContact.id)
    }
  } catch (error) {
    hubspotError = error instanceof Error ? error.message : "No se pudo consultar HubSpot."
  }

  return (
    <div className="min-h-screen bg-colab-cream px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <TeamWelcome fullName={teamMember.full_name} />
          <div className="text-left sm:text-right">
            <span className="inline-block rounded-full bg-colab-forest text-colab-yellow px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              Superadministrador
            </span>
            <p className="text-xs text-colab-forest/40 mt-2">{teamMember.email}</p>
          </div>
        </div>

        <div className="mt-10">
          <CrmConversionDashboard
            metrics={metrics}
            contacts={contacts}
            hubspot={hubspot}
            hubspotError={hubspotError}
            dataError={dataError}
          />
        </div>

        <details className="mt-6 rounded-2xl bg-white border border-colab-forest/10 p-5">
          <summary className="cursor-pointer text-sm font-bold text-colab-forest">Mi ficha personal en HubSpot</summary>
          <div className="mt-5 max-w-xl">
            <TeamHubspotPanel
              hasMapping={Boolean(teamMember.hubspot_contact_email)}
              contact={personalContact}
              deals={personalDeals}
              errorMessage={hubspotError}
            />
          </div>
        </details>

        <form action={signOutTeamMember} className="mt-8 text-center">
          <button type="submit" className="text-xs text-colab-forest/45 underline hover:text-colab-forest">Cerrar sesión</button>
        </form>
      </div>
    </div>
  )
}
