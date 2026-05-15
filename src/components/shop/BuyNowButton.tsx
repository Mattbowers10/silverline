"use client";

import * as React from "react";

type Props = {
  productSlug: string;
  disabled?: boolean;
  disabledLabel?: string;
};

/**
 * Buy-now bypasses the cart and creates a single-item Stripe Checkout
 * session via POST /api/checkout. On success, redirects to the Stripe URL.
 */
export function BuyNowButton({
  productSlug,
  disabled,
  disabledLabel = "Coming soon",
}: Props) {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "error">(
    "idle",
  );
  const [error, setError] = React.useState<string>("");

  async function handleClick() {
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "buy-now",
          items: [{ slug: productSlug, quantity: 1 }],
        }),
      });
      const data = await res.json();
      if (!data.ok || !data.url) {
        setError(data.error ?? "Couldn't start checkout.");
        setStatus("error");
        return;
      }
      window.location.href = data.url as string;
    } catch {
      setError("Network error.");
      setStatus("error");
    }
  }

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 rounded-full bg-white/30 px-5 py-3 text-[length:var(--text-15)] font-medium text-black/50"
      >
        {disabledLabel}
      </button>
    );
  }

  return (
    <div className="inline-flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)] disabled:opacity-50"
      >
        {status === "submitting" ? "Redirecting…" : "Buy now"}
      </button>
      {error ? <p className="text-[length:var(--text-13)] text-red-300">{error}</p> : null}
    </div>
  );
}
