import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Request a property consultation — Silverline Properties",
  description:
    "Schedule a 30-minute strategy call with the Silverline properties team. Buying, selling, or short-term rental management.",
  path: "/consultation",
});

export default function PropertiesConsultationPage() {
  return (
    <PagePlaceholder
      eyebrow="Property consultation"
      title="A few questions. Then we strategize."
      italicWord="strategize."
      description="The multi-step intake form (goals, geography, budget band) lands in Week 8. Until then, email us with your property goals."
      links={[
        { label: "Contact the properties team", href: "https://silverlineind.com/contact?subject=Property%20inquiry" },
        { label: "Check the service area", href: "https://silverlineind.com/service-area" },
        { label: "STR ROI calculator", href: "/calculators/str-roi" },
      ]}
    />
  );
}
