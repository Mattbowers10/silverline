"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

/** Small "cart · N" badge — used in the header on the parent tenant only. */
export function CartIndicator() {
  const { count } = useCart();
  if (count === 0) return null;
  return (
    <Link
      href="/shop/cart"
      aria-label={`Cart with ${count} item${count === 1 ? "" : "s"}`}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-3 py-1 text-[length:var(--text-13)] text-[var(--color-text)]/85 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      <span aria-hidden>🛍</span>
      <span>Cart · {count}</span>
    </Link>
  );
}
