import Link from "next/link";
import { ClearCartOnMount } from "./ClearCartOnMount";

export const metadata = {
  title: "Order received — Silverline Shop",
  description: "Thanks for ordering from Silverline.",
  robots: { index: false, follow: false },
};

type Args = { searchParams: Promise<{ session_id?: string }> };

export default async function ShopSuccessPage({ searchParams }: Args) {
  const { session_id } = await searchParams;

  return (
    <section className="px-6 py-24 lg:py-40">
      <div className="mx-auto max-w-2xl text-center">
        <ClearCartOnMount />

        <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-accent)]">
          Order received
        </p>
        <h1 className="mt-5 font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
          Thanks. We&apos;re on it.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
          We&apos;ve received your order and a real Silverline team member is preparing
          it for shipment. A confirmation is on the way to your email.
        </p>

        {session_id ? (
          <p className="mt-6 text-[length:var(--text-13)] text-[var(--color-faint)]">
            Reference: <code className="rounded bg-[var(--color-panel)] px-1.5 py-0.5">{session_id}</code>
          </p>
        ) : null}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/shop"
            className="rounded-full bg-white px-5 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)]"
          >
            Keep shopping
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-[var(--color-line)] px-5 py-3 text-[length:var(--text-15)] text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Email us about this order
          </Link>
        </div>
      </div>
    </section>
  );
}
