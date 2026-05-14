import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Silverline Shop",
  description:
    "Pool care, branded gear, and gift cards — direct from Silverline.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <PagePlaceholder
      eyebrow="Shop"
      title="Storefront opens in Week 6."
      italicWord="Week 6."
      description="The full Payload + Stripe storefront ships in Week 6 of the build. Pool care, branded gear, and gift cards. Email us if you need a product before then."
      links={[
        { label: "Email about pool products", href: "mailto:hello@silverlineind.com" },
        { label: "Visit pools.silverlineind.com", href: "https://pools.silverlineind.com" },
      ]}
    />
  );
}
