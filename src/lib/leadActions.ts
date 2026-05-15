"use server";

import { revalidatePath } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";
import { requireUser } from "./auth";
import { LEAD_STATUSES } from "@/payload/collections/Leads";

export type ActionResult = { ok: true } | { ok: false; error: string };

const ALLOWED_STATUSES = new Set(LEAD_STATUSES.map((s) => s.value));

export async function updateLeadStatus(
  leadId: string,
  status: string,
): Promise<ActionResult> {
  const user = await requireUser(`/dashboard/leads/${leadId}`);
  if (!ALLOWED_STATUSES.has(status as never)) {
    return { ok: false, error: `Invalid status: ${status}` };
  }

  try {
    const payload = await getPayload({ config });
    await payload.update({
      collection: "leads",
      id: leadId,
      data: {
        status: status as
          | "new"
          | "contacted"
          | "consultation_booked"
          | "proposal"
          | "won"
          | "lost",
        statusChangedAt: new Date().toISOString(),
      },
    });

    // Append a system note so the activity timeline shows status changes.
    await appendNote(leadId, `Status changed to ${status}`, user.email, "system");

    revalidatePath(`/dashboard/leads/${leadId}`);
    revalidatePath(`/dashboard/leads`);
    revalidatePath(`/dashboard`);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

export async function addLeadNote(
  leadId: string,
  body: string,
): Promise<ActionResult> {
  const user = await requireUser(`/dashboard/leads/${leadId}`);
  const trimmed = body.trim();
  if (!trimmed) return { ok: false, error: "Note can't be empty." };
  if (trimmed.length > 4000) return { ok: false, error: "Note too long (max 4000 chars)." };

  try {
    await appendNote(leadId, trimmed, user.email, "user");
    revalidatePath(`/dashboard/leads/${leadId}`);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/** Internal — appends a single note entry while preserving the existing array. */
async function appendNote(
  leadId: string,
  body: string,
  authorEmail: string,
  kind: "user" | "system",
) {
  const payload = await getPayload({ config });
  const existing = await payload.findByID({
    collection: "leads",
    id: leadId,
    depth: 0,
  });
  const currentNotes = Array.isArray((existing as { notes?: unknown[] }).notes)
    ? ((existing as { notes: { body?: string; author?: string; createdAt?: string }[] }).notes)
    : [];

  const next = [
    ...currentNotes,
    {
      body: kind === "system" ? `[system] ${body}` : body,
      author: authorEmail,
      createdAt: new Date().toISOString(),
    },
  ];

  await payload.update({
    collection: "leads",
    id: leadId,
    data: { notes: next },
  });
}
