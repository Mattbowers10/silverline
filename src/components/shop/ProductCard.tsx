import Link from "next/link";
import Image from "next/image";
import { PlaceholderArt } from "@/components/site/PlaceholderArt";
import { formatPrice } from "@/lib/stripe";
import { PRODUCT_CATEGORY_LABEL, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="card-highlight group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] transition-colors hover:border-[var(--color-accent)]/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.alt ?? product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderArt kind="tool" seed={hashSeed(product.slug)} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {product.category ? (
          <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-accent)]">
            {PRODUCT_CATEGORY_LABEL[product.category]}
          </p>
        ) : null}
        <h3 className="mt-2 font-display text-[length:var(--text-20)] leading-snug tracking-tight">
          {product.name}
        </h3>
        {product.shortDescription ? (
          <p className="mt-2 line-clamp-2 text-[length:var(--text-15)] leading-relaxed text-[var(--color-muted)]">
            {product.shortDescription}
          </p>
        ) : null}
        <p className="mt-auto pt-5 text-[length:var(--text-18)] text-[var(--color-text)]">
          {formatPrice(product.priceCents)}
        </p>
      </div>
    </Link>
  );
}

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return (Math.abs(h) % 9) + 1;
}
