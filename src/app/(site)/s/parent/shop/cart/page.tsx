import { CartView } from "./CartView";

export const metadata = {
  title: "Cart — Silverline Shop",
  description: "Review your Silverline cart and check out.",
};

export default function CartPage() {
  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-12">
          <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Cart
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            Your{" "}
            <i className="font-display italic text-[var(--color-accent)]">cart.</i>
          </h1>
        </header>

        <CartView />
      </div>
    </section>
  );
}
