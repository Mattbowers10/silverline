"use client";

import * as React from "react";
import Link from "next/link";
import { isInServiceArea, normalizeZip } from "@/lib/serviceArea";

type Status = "idle" | "in" | "out";

export function ServiceAreaCheck() {
  const [zip, setZip] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");

  function handleCheck(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const normalized = normalizeZip(zip);
    if (normalized.length !== 5) {
      setStatus("idle");
      return;
    }
    setStatus(isInServiceArea(normalized) ? "in" : "out");
  }

  return (
    <div className="card-highlight rounded-2xl border border-[var(--color-line)] p-6 md:p-8">
      <p className="mb-3 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
        Check your ZIP
      </p>
      <h3 className="font-display text-[length:var(--text-24)] leading-tight tracking-tight md:text-[length:var(--text-32)]">
        Is your address inside the radius?
      </h3>

      <form onSubmit={handleCheck} className="mt-6 flex max-w-md items-center rounded-full border border-[var(--color-line)] bg-[var(--color-page)] p-1">
        <input
          type="text"
          inputMode="numeric"
          maxLength={10}
          value={zip}
          onChange={(e) => {
            setZip(e.target.value);
            setStatus("idle");
          }}
          placeholder="Enter your ZIP code"
          className="flex-1 bg-transparent px-5 py-3 text-[length:var(--text-15)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-white px-5 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)]"
        >
          Check
        </button>
      </form>

      {status === "in" && (
        <p className="mt-5 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-4 py-3 text-[length:var(--text-15)] text-[var(--color-accent)]">
          ✓ Inside Silverline&apos;s 90-minute service area. {" "}
          <Link href="/consultation" className="underline underline-offset-4">
            Start a consultation →
          </Link>
        </p>
      )}
      {status === "out" && (
        <p className="mt-5 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-[length:var(--text-15)] text-amber-200">
          Outside our usual radius. We still review every lead — get in touch and we&apos;ll let you know.{" "}
          <Link href="/contact" className="underline underline-offset-4">
            Contact us →
          </Link>
        </p>
      )}
    </div>
  );
}
