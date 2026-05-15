import Link from "next/link";
import { stripeConfigured } from "@/lib/stripe";

export function ShopEmpty() {
  const configured = stripeConfigured();
  return (
    <div className="card-highlight rounded-2xl border border-[var(--color-line)] p-10 text-center md:p-16">
      <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
        Shop · Opening soon
      </p>
      <h2 className="mt-4 font-display text-[length:var(--text-32)] leading-tight tracking-tight md:text-[length:var(--text-40)]">
        Storefront <i className="font-display italic text-[var(--color-accent)]">stocking.</i>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-[length:var(--text-15)] text-[var(--color-muted)]">
        Pool care, branded gear, and gift cards are landing this season. Drop your email
        and we&apos;ll notify you the day the first products go live.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/contact?subject=Shop"
          className="rounded-full bg-white px-5 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)]"
        >
          Notify me at launch
        </Link>
        <Link
          href="https://pools.silverlineind.com"
          className="rounded-full border border-[var(--color-line)] px-5 py-3 text-[length:var(--text-15)] text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          Visit pool services →
        </Link>
      </div>
      {!configured ? (
        <p className="mt-6 text-[length:var(--text-13)] text-[var(--color-faint)]">
          Stripe is not configured in this environment. Set{" "}
          <code className="rounded bg-[var(--color-panel)] px-1.5 py-0.5">STRIPE_SECRET_KEY</code>{" "}
          to enable checkout.
        </p>
      ) : null}
    </div>
  );
}
