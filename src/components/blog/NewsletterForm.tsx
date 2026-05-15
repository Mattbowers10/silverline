"use client";

import * as React from "react";

/** Single-field newsletter signup. POSTs to /api/leads with source=newsletter. */
export function NewsletterForm() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    if (!email) {
      setError("Enter your email.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.split("@")[0] || "Subscriber",
          email,
          source: "newsletter",
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(
          (data.errors && (Object.values(data.errors)[0] as string)) ?? "Try again.",
        );
        setStatus("error");
        return;
      }
      setStatus("ok");
    } catch {
      setError("Network error.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <p
        role="status"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-5 py-2.5 text-[length:var(--text-15)] text-[var(--color-accent)]"
      >
        ✓ You&apos;re on the list. First post lands soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-6 flex max-w-md items-center rounded-full border border-[var(--color-line)] bg-[var(--color-page)] p-1"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        required
        placeholder="What's your email?"
        className="flex-1 bg-transparent px-5 py-3 text-[length:var(--text-15)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-white px-5 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)] disabled:opacity-50"
      >
        {status === "submitting" ? "…" : "Subscribe"}
      </button>
      {error ? (
        <p role="alert" className="sr-only">
          {error}
        </p>
      ) : null}
    </form>
  );
}
