import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Investors",
  description:
    "Silverline investor relations and high-net-worth project inquiries.",
  path: "/investors",
});

export default function InvestorsPage() {
  return (
    <PagePlaceholder
      eyebrow="Investors"
      title="Talk to us, directly."
      italicWord="directly."
      description="High-net-worth projects, multi-property portfolios, and select investment opportunities. We respond personally."
      links={[
        { label: "Email investors@silverlineind.com", href: "mailto:investors@silverlineind.com" },
      ]}
    />
  );
}
