export type CommerceAdapterType =
  | "none"
  | "manual_coupon"
  | "colab_native"
  | "shopify"
  | "woocommerce"
  | "custom_webhook";

export type RedemptionContext = {
  redemptionId: string;
  profileId: string;
  brandKey: string;
  benefitSlug: string;
};

export type FulfillmentResult =
  | { ok: true; reference: string; payload: Record<string, unknown> }
  | { ok: false; error: string };

export interface BrandCommerceConnector {
  readonly type: CommerceAdapterType;
  readonly active: boolean;
  issueBenefit(context: RedemptionContext): Promise<FulfillmentResult>;
}

export class ConnectorNotConfiguredError extends Error {
  constructor(type: CommerceAdapterType) {
    super(`El conector ${type} no está configurado. No se puede emitir un beneficio externo.`);
    this.name = "ConnectorNotConfiguredError";
  }
}

export class InactiveCommerceConnector implements BrandCommerceConnector {
  readonly active = false;
  constructor(readonly type: CommerceAdapterType = "none") {}
  async issueBenefit(): Promise<FulfillmentResult> {
    return { ok: false, error: new ConnectorNotConfiguredError(this.type).message };
  }
}

/**
 * Registro inicial: todas las marcas quedan inactivas hasta tener acuerdo,
 * credenciales, reglas de stock y pruebas de redención.
 */
export const connectorRegistry: Record<string, BrandCommerceConnector> = {
  cacaotier: new InactiveCommerceConnector("colab_native"),
  zurych: new InactiveCommerceConnector("none"),
  "la-querencia": new InactiveCommerceConnector("none"),
  "la-lomita": new InactiveCommerceConnector("none"),
  quara: new InactiveCommerceConnector("none"),
  chocolover: new InactiveCommerceConnector("none"),
};

export function getCommerceConnector(brandKey: string) {
  return connectorRegistry[brandKey] ?? new InactiveCommerceConnector("none");
}
