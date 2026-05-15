import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PlaceholderArt } from "@/components/site/PlaceholderArt";
import { PostBody } from "@/components/site/PostBody";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { BuyNowButton } from "@/components/shop/BuyNowButton";
import { getProduct } from "@/lib/products";
import { formatPrice, stripeConfigured } from "@/lib/stripe";
import { buildMetadata } from "@/lib/seo";

type Args = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Args) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} — Silverline Shop`,
    description: product.shortDescription ?? `${product.name} from the Silverline shop.`,
    path: `/shop/${slug}`,
  });
}

export const revalidate = 60;

export default async function ProductPage({ params }: Args) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const checkoutEnabled = stripeConfigured() && Boolean(product.stripePriceId);
  const cover = product.images[0];
  const galleryRest = product.images.slice(1);

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <p className="mb-6 text-[length:var(--text-13)] text-[var(--color-muted)]">
          <Link href="/shop" className="hover:text-[var(--color-accent)]">Shop</Link>{" "}
          <span aria-hidden>›</span> {product.name}
        </p>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Image column */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-line)]">
              {cover?.url ? (
                <Image
                  src={cover.url}
                  alt={cover.alt ?? product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              ) : (
                <PlaceholderArt kind="tool" seed={hashSeed(product.slug)} />
              )}
            </div>
            {galleryRest.length > 0 ? (
              <ul className="mt-4 grid grid-cols-4 gap-4">
                {galleryRest.slice(0, 4).map((img, i) => (
                  <li
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-lg border border-[var(--color-line)]"
                  >
                    {img.url ? (
                      <Image
                        src={img.url}
                        alt={img.alt ?? `${product.name} — image ${i + 2}`}
                        fill
                        sizes="(max-width: 1024px) 25vw, 15vw"
                        className="object-cover"
                      />
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Buy column */}
          <div className="lg:col-span-5">
            <h1 className="font-display text-balance text-[length:var(--text-40)] leading-tight tracking-tight md:text-[length:var(--text-48)]">
              {product.name}
            </h1>
            <p className="mt-4 font-display text-[length:var(--text-32)] text-[var(--color-text)]">
              {formatPrice(product.priceCents)}
            </p>
            {product.shortDescription ? (
              <p className="mt-6 text-[length:var(--text-16)] leading-relaxed text-[var(--color-muted)]">
                {product.shortDescription}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BuyNowButton
                productSlug={product.slug}
                disabled={!checkoutEnabled}
                disabledLabel={checkoutEnabled ? undefined : "Coming soon"}
              />
              <AddToCartButton
                productId={product.id}
                slug={product.slug}
                name={product.name}
                unitPriceCents={product.priceCents}
                imageUrl={cover?.url}
                disabled={!checkoutEnabled}
                inline
              />
            </div>

            {!checkoutEnabled ? (
              <p className="mt-4 text-[length:var(--text-13)] text-[var(--color-faint)]">
                Checkout is disabled in this environment.{" "}
                {!stripeConfigured()
                  ? "Set STRIPE_SECRET_KEY in .env."
                  : "This product is missing a stripePriceId — sync the product to Stripe and paste the price_… ID in /admin."}
              </p>
            ) : null}

            <dl className="mt-10 divide-y divide-[var(--color-line)] text-[length:var(--text-15)]">
              {product.inventory > 0 ? (
                <Spec
                  label="In stock"
                  value={`${product.inventory} available`}
                />
              ) : (
                <Spec label="Inventory" value="Limited stock — confirm at checkout" />
              )}
              <Spec label="Ships from" value="Knoxville, TN" />
              <Spec label="Returns" value="30-day, unopened" />
            </dl>
          </div>
        </div>

        {product.description ? (
          <div className="mt-20 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 className="mb-6 font-display text-[length:var(--text-24)] leading-tight tracking-tight md:text-[length:var(--text-32)]">
                Details
              </h2>
              <PostBody content={product.description} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="text-[var(--color-muted)]">{label}</dt>
      <dd className="text-right text-[var(--color-text)]">{value}</dd>
    </div>
  );
}

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return (Math.abs(h) % 9) + 1;
}
