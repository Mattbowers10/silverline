/**
 * GoHighLevel REST API wrapper.
 *
 * Reads GHL_API_KEY + GHL_LOCATION_ID from env. When unset (local dev or
 * before Faiz wires keys) every call no-ops and returns { skipped: true }.
 *
 * GHL v2 contacts API:
 *   POST https://services.leadconnectorhq.com/contacts/
 *   Headers: Authorization: Bearer <token>, Version: 2021-07-28
 */

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

export type GHLContactInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  postalCode?: string;
  /** Free-form tags applied to the contact in GHL */
  tags?: string[];
  /** Custom fields keyed by GHL custom-field ID — populate when Faiz shares the IDs */
  customFields?: { id: string; value: string }[];
  /** Source label, e.g., "hero_parent", "consultation_pools" */
  source?: string;
};

export type GHLResult =
  | { ok: true; contactId: string }
  | { ok: false; error: string }
  | { skipped: true; reason: string };

export async function createGHLContact(input: GHLContactInput): Promise<GHLResult> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    return { skipped: true, reason: "GHL_API_KEY or GHL_LOCATION_ID not set" };
  }

  try {
    const res = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: GHL_API_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        locationId,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        postalCode: input.postalCode,
        tags: input.tags,
        source: input.source,
        customFields: input.customFields,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        ok: false,
        error: `GHL ${res.status}: ${text.slice(0, 240)}`,
      };
    }

    const data = (await res.json().catch(() => ({}))) as {
      contact?: { id?: string };
      id?: string;
    };
    const contactId = data.contact?.id ?? data.id ?? "";
    return { ok: true, contactId };
  } catch (err) {
    return {
      ok: false,
      error: `GHL network error: ${(err as Error).message}`,
    };
  }
}
