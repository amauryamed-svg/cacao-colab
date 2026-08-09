import { redirect } from "next/navigation"
import { BARS_PRODUCT_PATH } from "@/lib/bars-colab-product"

/** Casa canónica: producto Colab en R&D — no micrositio Benevolo.co. */
export default function BenevoloAliasPage() {
  redirect(BARS_PRODUCT_PATH)
}
