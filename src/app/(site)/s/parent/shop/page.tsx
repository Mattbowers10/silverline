import { ProductCard } from "@/components/shop/ProductCard";
import { ShopEmpty } from "@/components/shop/ShopEmpty";
import { CTABand } from "@/components/sections";
import { listProducts } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Silverline Shop",
  description:
    "Pool care, branded gear, and gift cards — direct from Silverline.",
  path: "/shop",
});

export const revalidate = 60;

export default async function ShopPage() {
  const products = await listProducts({ limit: 60 });

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <header className="max-w-3xl">
          <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Shop
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            The Silverline{" "}
            <i className="font-display italic text-[var(--color-accent)]">storefront.</i>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
            Pool care that we actually use on jobs, branded gear from our team, and gift
            cards. Stocked from East Tennessee.
          </p>
        </header>

        <div className="mt-14">
          {products.length === 0 ? (
            <ShopEmpty />
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <CTABand
        eyebrow="Project, not just product?"
        headline="Talk to a real Silverline team member."
        italicWord="real"
        sub="If you're after design or build help — not just a part — start with a consultation."
        emailCapture={{ submitLabel: "Request consultation" }}
      />
    </section>
  );
}
