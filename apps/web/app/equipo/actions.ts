"use server";

import { createSupabaseServerClient } from "@cacao-colab/supabase-client/server";
import { redirect } from "next/navigation";

export async function signOutTeamMember() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/equipo/login");
}
