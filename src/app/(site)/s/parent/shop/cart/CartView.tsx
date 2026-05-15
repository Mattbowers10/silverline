"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/shop/CartContext";
import { formatPrice } from "@/lib/stripe";

export function CartView() {
  const { lines, count, subtotalCents, setQuantity, remove, clear } = useCart();
  const [status, setStatus] = React.useState<"idle" | "submitting" | "error">(
    "idle",
  );
  const [error, setError] = React.useState("");

  async function handleCheckout() {
    if (lines.length === 0) return;
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "cart",
          items: lines.map((l) => ({ slug: l.slug, quantity: l.quantity })),
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

  if (count === 0) {
    return (
      <div className="card-highlight rounded-2xl border border-[var(--color-line)] p-10 text-center md:p-16">
        <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Empty cart
        </p>
        <p className="mt-4 font-display text-[length:var(--text-32)] leading-tight">
          Nothing here <i className="font-display italic text-[var(--color-accent)]">yet.</i>
        </p>
        <p className="mt-3 text-[length:var(--text-15)] text-[var(--color-muted)]">
          Browse the shop and add a product to get started.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)]"
        >
          Open the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ul className="space-y-4 lg:col-span-8">
        {lines.map((l) => (
          <li
            key={l.productId}
            className="card-highlight flex gap-5 rounded-2xl border border-[var(--color-line)] p-4"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[var(--color-panel)]">
              {l.imageUrl ? (
                <Image
                  src={l.imageUrl}
                  alt={l.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col">
              <Link
                href={`/shop/${l.slug}`}
                className="font-display text-[length:var(--text-18)] leading-tight tracking-tight hover:text-[var(--color-accent)]"
              >
                {l.name}
              </Link>
              <p className="mt-1 text-[length:var(--text-15)] text-[var(--color-muted)]">
                {formatPrice(l.unitPriceCents)} each
              </p>
              <div className="mt-auto flex items-end justify-between gap-3">
                <div className="inline-flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(l.productId, l.quantity - 1)}
                    aria-label={`Decrease quantity of ${l.name}`}
                    className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-accent)]"
                  >
                    −
                  </button>
                  <span className="min-w-[2ch] text-center text-[length:var(--text-15)]">
                    {l.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(l.productId, l.quantity + 1)}
                    aria-label={`Increase quantity of ${l.name}`}
                    className="grid h-8 w-8 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-accent)]"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-display text-[length:var(--text-18)]">
                    {formatPrice(l.unitPriceCents * l.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => remove(l.productId)}
                    className="text-[length:var(--text-13)] text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
        <li className="text-right">
          <button
            type="button"
            onClick={clear}
            className="text-[length:var(--text-13)] text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
          >
            Clear cart
          </button>
        </li>
      </ul>

      <aside className="lg:col-span-4">
        <div className="card-highlight sticky top-32 rounded-2xl border border-[var(--color-line)] p-6">
          <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Order summary
          </p>
          <dl className="mt-5 divide-y divide-[var(--color-line)] text-[length:var(--text-15)]">
            <Row label={`Items (${count})`} value={formatPrice(subtotalCents)} />
            <Row label="Shipping" value="Calculated at checkout" />
            <Row label="Tax" value="Calculated at checkout" />
            <div className="flex items-baseline justify-between gap-4 pt-4">
              <dt className="text-[length:var(--text-15)] text-[var(--color-text)]">Subtotal</dt>
              <dd className="font-display text-[length:var(--text-24)] text-[var(--color-text)]">
                {formatPrice(subtotalCents)}
              </dd>
            </div>
          </dl>
          {error ? (
            <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-[length:var(--text-13)] text-red-300">
              {error}
            </p>
          ) : null}
          <button
            type="button"
            onClick={handleCheckout}
            disabled={status === "submitting"}
            className="mt-6 w-full rounded-full bg-white px-5 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)] disabled:opacity-50"
          >
            {status === "submitting" ? "Redirecting…" : "Checkout"}
          </button>
          <p className="mt-3 text-center text-[length:var(--text-13)] text-[var(--color-muted)]">
            Secure checkout via Stripe.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="text-[var(--color-muted)]">{label}</dt>
      <dd className="text-[var(--color-text)]">{value}</dd>
    </div>
  );
}
