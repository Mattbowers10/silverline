"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Division = "pools" | "developments" | "properties" | "multi";

type Props = {
  /** Live preview rows shown above the gated total — always visible. */
  preview: { label: string; value: React.ReactNode }[];
  /** Final headline result that is gated behind an email submission. */
  result: { label: string; value: string; note?: string };
  /** GHL/Payload source tag, e.g. "calc_gunite", "calc_home_build" */
  source: string;
  /** Division to route this lead to in GHL. */
  division: Division;
  /** Optional next-step CTA shown after unlocking. */
  cta?: { label: string; href: string };
};

/**
 * Shared gated-estimate UI:
 *   - Preview rows always shown
 *   - Final result number visually redacted (blurred) until the visitor
 *     submits an email — that posts to /api/leads with the configured
 *     source + division tags, then reveals the number.
 */
export function EstimateGate({ preview, result, source, division, cta }: Props) {
  const [status, setStatus] = React.useState<"locked" | "submitting" | "unlocked" | "error">(
    "locked",
  );
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  async function handleUnlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      zip: String(fd.get("zip") ?? "").trim() || undefined,
      division,
      source,
      website: String(fd.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.ok) {
        const firstError = data.errors ? Object.values(data.errors)[0] : "Something went wrong.";
        setErrorMsg(String(firstError));
        setStatus("error");
        return;
      }
      setStatus("unlocked");
    } catch {
      setErrorMsg("Network error. Try again.");
      setStatus("error");
    }
  }

  const unlocked = status === "unlocked";

  return (
    <aside className="card-highlight rounded-2xl border border-[var(--color-line)] p-6 md:p-8">
      <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
        Live estimate
      </p>

      <ul className="mt-5 divide-y divide-[var(--color-line)]">
        {preview.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between py-2.5 text-[length:var(--text-15)]"
          >
            <span className="text-[var(--color-muted)]">{row.label}</span>
            <span className="text-[var(--color-text)]">{row.value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 rounded-xl border border-[var(--color-line)] bg-[var(--color-page)] p-5">
        <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          {result.label}
        </p>
        <p
          aria-label={unlocked ? result.value : "Locked — enter email to reveal"}
          className={cn(
            "mt-2 font-display text-[length:var(--text-40)] leading-none tracking-tight md:text-[length:var(--text-52)]",
            !unlocked && "select-none [filter:blur(10px)] [text-shadow:0_0_18px_rgba(255,255,255,0.15)]",
          )}
        >
          {result.value}
        </p>
        {result.note ? (
          <p className="mt-3 text-[length:var(--text-13)] text-[var(--color-muted)]">
            {result.note}
          </p>
        ) : null}
      </div>

      {!unlocked ? (
        <form onSubmit={handleUnlock} className="mt-6 space-y-3">
          {/* Honeypot — invisible to humans. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-10000px",
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            <label htmlFor={`gate-website-${source}`}>Website (leave blank)</label>
            <input
              id={`gate-website-${source}`}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <p className="text-[length:var(--text-15)] text-[var(--color-muted)]">
            Drop your email and we&apos;ll unlock the full estimate.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              autoComplete="name"
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClass}
            />
          </div>
          <input
            type="text"
            name="zip"
            inputMode="numeric"
            maxLength={10}
            placeholder="ZIP (optional)"
            autoComplete="postal-code"
            className={inputClass}
          />
          {errorMsg ? (
            <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-[length:var(--text-13)] text-red-300">
              {errorMsg}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-full bg-white px-5 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)] disabled:opacity-50"
          >
            {status === "submitting" ? "Unlocking…" : "Unlock full estimate"}
          </button>
          <p className="text-[length:var(--text-13)] text-[var(--color-muted)]">
            One email gets you this estimate and any future ones. No spam.
          </p>
        </form>
      ) : (
        <div className="mt-6 rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-5">
          <p className="text-[length:var(--text-15)] text-[var(--color-accent)]">
            ✓ Unlocked. We&apos;ve sent a copy to your inbox.
          </p>
          {cta ? (
            <Link
              href={cta.href}
              className="mt-4 inline-flex rounded-full bg-white px-5 py-2.5 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)]"
            >
              {cta.label}
            </Link>
          ) : null}
        </div>
      )}
    </aside>
  );
}

const inputClass =
  "w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-page)] px-4 py-3 text-[length:var(--text-15)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none";
