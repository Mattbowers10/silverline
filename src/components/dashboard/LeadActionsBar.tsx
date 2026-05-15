"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { updateLeadStatus, addLeadNote } from "@/lib/leadActions";
import { LEAD_STATUSES } from "@/payload/collections/Leads";

type Props = {
  leadId: string;
  currentStatus: string;
};

export function LeadActionsBar({ leadId, currentStatus }: Props) {
  const router = useRouter();
  const [status, setStatus] = React.useState(currentStatus);
  const [statusError, setStatusError] = React.useState("");
  const [pending, setPending] = React.useState<"status" | "note" | null>(null);
  const [noteError, setNoteError] = React.useState("");

  async function handleStatusChange(next: string) {
    setStatus(next);
    setStatusError("");
    setPending("status");
    const result = await updateLeadStatus(leadId, next);
    setPending(null);
    if (!result.ok) {
      setStatus(currentStatus); // revert
      setStatusError(result.error);
      return;
    }
    router.refresh();
  }

  async function handleNoteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNoteError("");
    const fd = new FormData(e.currentTarget);
    const body = String(fd.get("body") ?? "");
    if (!body.trim()) {
      setNoteError("Note can't be empty.");
      return;
    }
    setPending("note");
    const result = await addLeadNote(leadId, body);
    setPending(null);
    if (!result.ok) {
      setNoteError(result.error);
      return;
    }
    e.currentTarget.reset();
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {/* Status selector */}
      <div>
        <label
          htmlFor="lead-status"
          className="mb-2 block text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]"
        >
          Pipeline status
        </label>
        <select
          id="lead-status"
          value={status}
          disabled={pending === "status"}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-page)] px-4 py-2.5 text-[length:var(--text-15)] text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-50"
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {statusError ? (
          <p className="mt-2 text-[length:var(--text-13)] text-red-300">{statusError}</p>
        ) : null}
        {pending === "status" ? (
          <p className="mt-2 text-[length:var(--text-13)] text-[var(--color-muted)]">
            Updating…
          </p>
        ) : null}
      </div>

      {/* Add note */}
      <form onSubmit={handleNoteSubmit}>
        <label
          htmlFor="note-body"
          className="mb-2 block text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]"
        >
          Add a note
        </label>
        <textarea
          id="note-body"
          name="body"
          rows={3}
          disabled={pending === "note"}
          placeholder="Called and left voicemail. Will try again tomorrow…"
          className="w-full resize-y rounded-lg border border-[var(--color-line)] bg-[var(--color-page)] px-4 py-3 text-[length:var(--text-15)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-50"
        />
        {noteError ? (
          <p className="mt-2 text-[length:var(--text-13)] text-red-300">{noteError}</p>
        ) : null}
        <button
          type="submit"
          disabled={pending === "note"}
          className="mt-3 inline-flex rounded-full bg-white px-5 py-2.5 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)] disabled:opacity-50"
        >
          {pending === "note" ? "Saving…" : "Save note"}
        </button>
      </form>
    </div>
  );
}
