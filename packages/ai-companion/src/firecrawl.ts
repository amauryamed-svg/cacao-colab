/**
 * Puerto opcional del wrapper de Firecrawl de caua-io/lib/emily-io/firecrawl.ts.
 * Dualita no lo usa por defecto (no hay caso de uso de scraping en el
 * companion de aprendizaje hoy) — se deja portado y listo para el blog de
 * tendencias (docs/00-SPEC.md) si en Fase 2 se necesita research
 * automatizado de fuentes externas (ej. precios de bolsa de cacao,
 * tendencias Callebaut/Valrhona).
 *
 * Requiere `FIRECRAWL_API_KEY`. Sin la key, `scrapeUrl` lanza en vez de
 * devolver contenido simulado.
 */
export class FirecrawlNotConfiguredError extends Error {
  constructor() {
    super("Firecrawl no está configurado: falta FIRECRAWL_API_KEY.");
    this.name = "FirecrawlNotConfiguredError";
  }
}

export async function scrapeUrl(url: string): Promise<{ markdown: string }> {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) throw new FirecrawlNotConfiguredError();

  const res = await fetch("https://api.firecrawl.dev/v2/scrape", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, formats: ["markdown"] }),
  });

  if (!res.ok) {
    throw new Error(`Firecrawl respondió ${res.status} para ${url}`);
  }

  const data = (await res.json()) as { data?: { markdown?: string } };
  return { markdown: data.data?.markdown ?? "" };
}
