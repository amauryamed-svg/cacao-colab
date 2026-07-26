const HUBSPOT_BASE = "https://api.hubapi.com";

let warnedAboutLegacyEnvVar = false;

/**
 * Nombre de env var estandarizado en todo el ecosistema Caúa:
 * `HUBSPOT_ACCESS_TOKEN`. Spec v1 de cacao-colab usaba `HUBSPOT_TOKEN` —
 * se mantiene como fallback para no romper despliegues existentes durante
 * la migración, pero loguea un warning una sola vez por proceso.
 */
export function resolveHubspotToken(): string | undefined {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (token) return token;

  const legacy = process.env.HUBSPOT_TOKEN;
  if (legacy) {
    if (!warnedAboutLegacyEnvVar) {
      warnedAboutLegacyEnvVar = true;
      // eslint-disable-next-line no-console
      console.warn(
        "[@cacao-colab/hubspot-client] Usando HUBSPOT_TOKEN (legacy). " +
          "Renombrar a HUBSPOT_ACCESS_TOKEN en Vercel — ver docs/03-HUBSPOT.md.",
      );
    }
    return legacy;
  }

  return undefined;
}

export class HubspotNotConfiguredError extends Error {
  constructor() {
    super(
      "HubSpot no está configurado: falta HUBSPOT_ACCESS_TOKEN (o el legacy " +
        "HUBSPOT_TOKEN) en las env vars.",
    );
    this.name = "HubspotNotConfiguredError";
  }
}

export async function hubspotFetch<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<{ ok: boolean; status: number; data: T | null; raw: string }> {
  const token = resolveHubspotToken();
  if (!token) throw new HubspotNotConfiguredError();

  const res = await fetch(`${HUBSPOT_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const raw = await res.text();
  let data: T | null = null;
  try {
    data = raw ? (JSON.parse(raw) as T) : null;
  } catch {
    data = null;
  }

  return { ok: res.ok, status: res.status, data, raw };
}
