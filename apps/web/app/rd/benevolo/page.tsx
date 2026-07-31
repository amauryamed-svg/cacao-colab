import { redirect } from "next/navigation"

/** Benevolo vive en R&D; la página de producto/preorden sigue en /benevolo. */
export default function RdBenevoloAliasPage() {
  redirect("/benevolo")
}
