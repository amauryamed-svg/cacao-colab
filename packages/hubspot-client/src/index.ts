export { hubspotFetch, resolveHubspotToken, HubspotNotConfiguredError } from "./client";
export { upsertContactByEmail, getContactByEmail, getHubspotFunnelSnapshot } from "./contacts";
export type { HubspotContact, UpsertContactResult, HubspotFunnelSnapshot } from "./contacts";
export { getDealsForContact } from "./deals";
export type { HubspotDeal } from "./deals";
