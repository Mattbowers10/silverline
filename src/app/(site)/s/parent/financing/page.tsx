import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Financing",
  description:
    "Silverline maintains relationships with construction lenders and pool-financing partners across East Tennessee.",
  path: "/financing",
});

export default function FinancingPage() {
  return (
    <PagePlaceholder
      eyebrow="Financing partners"
      title="Build now. Pay over time."
      italicWord="now."
      description="Silverline doesn't lend directly, but we work with construction lenders and pool-financing partners who know our timelines and our standards."
      links={[
        { label: "Talk to a partner", href: "/contact?subject=Financing" },
        { label: "Pool cost estimator", href: "https://pools.silverlineind.com/calculators/cost-estimator" },
      ]}
    />
  );
}
