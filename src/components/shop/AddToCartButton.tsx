"use client";

import * as React from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

type Props = {
  productId: string;
  slug: string;
  name: string;
  unitPriceCents: number;
  imageUrl?: string;
  disabled?: boolean;
  disabledLabel?: string;
  /** When true, show inline success state instead of a toast. */
  inline?: boolean;
};

export function AddToCartButton({
  productId,
  slug,
  name,
  unitPriceCents,
  imageUrl,
  disabled,
  disabledLabel = "Coming soon",
  inline,
}: Props) {
  const { add } = useCart();
  const [added, setAdded] = React.useState(false);

  function handleClick() {
    add({ productId, slug, name, unitPriceCents, imageUrl });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-page)] px-5 py-3 text-[length:var(--text-15)] text-[var(--color-muted)]"
      >
        {disabledLabel}
      </button>
    );
  }

  if (added && inline) {
    return (
      <div className="inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)]/15 px-5 py-3 text-[length:var(--text-15)] text-[var(--color-accent)]">
        ✓ Added to cart{" "}
        <Link
          href="/shop/cart"
          className="text-[var(--color-text)] underline-offset-4 hover:underline"
        >
          View cart →
        </Link>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-page)] px-5 py-3 text-[length:var(--text-15)] text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      {added ? "✓ Added" : "Add to cart"}
    </button>
  );
}
