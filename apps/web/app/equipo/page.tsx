import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server"
import { getContactByEmail, getDealsForContact } from "@cacao-colab/hubspot-client"
import { redirect } from "next/navigation"
import TeamWelcome from "@/components/team/TeamWelcome"
import TeamHubspotPanel from "@/components/team/TeamHubspotPanel"
import { signOutTeamMember } from "./actions"

export const metadata = {
  title: "Equipo · Cacao Colab",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function EquipoPage() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    redirect("/equipo/login")
  }

  const { data: teamMember } = await supabase
    .from("team_members")
    .select("*")
    .eq("email", user.email)
    .maybeSingle()

  if (!teamMember) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <p className="font-sans text-sm text-colab-forest/70 max-w-sm">
          Tu sesión es válida ({user.email}) pero tu email todavía no está
          registrado en <code>team_members</code>. Pídele a Amaury que te
          agregue en supabase/seed.sql.
        </p>
      </div>
    )
  }

  let hubspotContact = null
  let hubspotDeals: Awaited<ReturnType<typeof getDealsForContact>> = []
  let hubspotError: string | null = null

  if (teamMember.hubspot_contact_email) {
    try {
      hubspotContact = await getContactByEmail(teamMember.hubspot_contact_email)
      if (hubspotContact) {
        hubspotDeals = await getDealsForContact(hubspotContact.id)
      }
    } catch (err) {
      hubspotError = err instanceof Error ? err.message : "Error desconocido consultando HubSpot"
    }
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center gap-10 px-4 py-16">
      <TeamWelcome fullName={teamMember.full_name} />

      <div className="w-full max-w-xl">
        <TeamHubspotPanel
          hasMapping={Boolean(teamMember.hubspot_contact_email)}
          contact={hubspotContact}
          deals={hubspotDeals}
          errorMessage={hubspotError}
        />
      </div>

      <form action={signOutTeamMember}>
        <button
          type="submit"
          className="text-xs font-sans text-colab-forest/50 underline hover:text-colab-forest"
        >
          Cerrar sesión
        </button>
      </form>
    </div>
  )
}
