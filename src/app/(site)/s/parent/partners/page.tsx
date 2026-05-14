import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Partners",
  description:
    "Silverline partners with select architects, designers, financing partners, and suppliers across East Tennessee.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <PagePlaceholder
      eyebrow="Partners"
      title="A small, vetted network."
      italicWord="vetted"
      description="Architects, designers, financing partners, and material suppliers we trust. Apply to join, or check the network for your next project."
      links={[
        { label: "Become a partner", href: "/contact?subject=Partnership" },
      ]}
    />
  );
}
