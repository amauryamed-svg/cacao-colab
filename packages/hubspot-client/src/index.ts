export { hubspotFetch, resolveHubspotToken, HubspotNotConfiguredError } from "./client";
export { upsertContactByEmail, getContactByEmail } from "./contacts";
export type { HubspotContact, UpsertContactResult } from "./contacts";
export { getDealsForContact } from "./deals";
export type { HubspotDeal } from "./deals";
