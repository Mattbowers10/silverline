import { z } from "zod";
import { getPayload } from "payload";
import config from "@payload-config";
import { createGHLContact, type GHLResult } from "./ghl";
import { checkServiceArea } from "./serviceArea";

export const LeadSchema = z.object({
  email: z.string().email("Enter a valid email"),
  name: z.string().min(1, "Name is required").max(200),
  phone: z.string().min(7, "Enter a valid phone").max(40).optional().or(z.literal("")),
  zip: z.string().min(3).max(10).optional().or(z.literal("")),
  division: z
    .enum(["pools", "developments", "properties", "multi"])
    .optional(),
  budgetBand: z.enum(["50-150", "150-500", "500plus"]).optional(),
  timeline: z
    .enum(["asap", "1-3mo", "3-6mo", "6-12mo", "exploring"])
    .optional(),
  message: z.string().max(2000).optional().or(z.literal("")),
  source: z.string().max(120).default("unknown"),
});

export type LeadInput = z.infer<typeof LeadSchema>;

export type LeadResult = {
  ok: boolean;
  leadId?: string;
  ghl: GHLResult;
  outOfServiceArea?: boolean;
  errors?: Record<string, string>;
};

/**
 * The full lead pipeline:
 *   1. validate
 *   2. service-area check
 *   3. write to Payload `leads`
 *   4. attempt GHL contact create (graceful no-op without keys)
 *   5. (transactional email handled separately if RESEND_API_KEY set)
 */
export async function createLead(raw: unknown): Promise<LeadResult> {
  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "_form";
      errors[key] ??= issue.message;
    }
    return { ok: false, ghl: { skipped: true, reason: "validation failed" }, errors };
  }

  const input = parsed.data;
  const zipCheck = input.zip ? checkServiceArea(input.zip) : null;
  const outOfServiceArea = zipCheck ? !zipCheck.inServiceArea : false;

  // 1. Persist to Payload regardless of downstream sync state.
  const payload = await getPayload({ config });
  const stored = await payload.create({
    collection: "leads",
    data: {
      email: input.email,
      name: input.name,
      phone: input.phone || undefined,
      zip: input.zip || undefined,
      division: input.division,
      budgetBand: input.budgetBand,
      timeline: input.timeline,
      message: input.message || undefined,
      source: input.source,
      outOfServiceArea,
      ghlSyncStatus: "pending",
    },
  });

  // 2. Attempt GHL sync.
  const [firstName, ...rest] = (input.name || "").split(" ");
  const ghl = await createGHLContact({
    email: input.email,
    firstName,
    lastName: rest.join(" ") || undefined,
    phone: input.phone || undefined,
    postalCode: input.zip || undefined,
    source: input.source,
    tags: [
      `division:${input.division ?? "unknown"}`,
      `budget:${input.budgetBand ?? "unknown"}`,
      `timeline:${input.timeline ?? "unknown"}`,
      outOfServiceArea ? "out_of_area" : "in_service_area",
    ],
  });

  // 3. Patch GHL sync status back into Payload.
  if ("ok" in ghl && ghl.ok) {
    await payload.update({
      collection: "leads",
      id: stored.id,
      data: { ghlSyncStatus: "synced", ghlContactId: ghl.contactId },
    });
  } else if ("ok" in ghl && !ghl.ok) {
    await payload.update({
      collection: "leads",
      id: stored.id,
      data: { ghlSyncStatus: "failed" },
    });
  }
  // skipped → leave as pending; admin can review

  return {
    ok: true,
    leadId: String(stored.id),
    ghl,
    outOfServiceArea,
  };
}
