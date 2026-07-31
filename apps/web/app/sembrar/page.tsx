import { redirect } from "next/navigation"

/** Alias amigable: Sembrar → laboratorio /juega */
export default function SembrarAliasPage() {
  redirect("/juega")
}
