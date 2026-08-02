import { redirect } from "next/navigation"
import { BARS_PRODUCT_PATH } from "@/lib/bars-colab-product"

/** Alias histórico → página de producto Colab Bars. */
export default function RdBenevoloAliasPage() {
  redirect(BARS_PRODUCT_PATH)
}
