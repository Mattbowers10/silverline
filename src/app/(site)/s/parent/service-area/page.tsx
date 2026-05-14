import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Service area",
  description:
    "Silverline serves every city within a 90-minute drive of downtown Knoxville. Check whether your address qualifies.",
  path: "/service-area",
});

export default function ServiceAreaPage() {
  return (
    <PagePlaceholder
      eyebrow="Service area"
      title="90 minutes. Door to door."
      italicWord="Door"
      description="From Knoxville's downtown core to Crossville, Sevierville, and the lakes — we serve every major East Tennessee city inside a 90-minute drive. The interactive map and ZIP validator land in Week 8."
      links={[
        { label: "Request consultation", href: "/consultation" },
        { label: "See completed projects", href: "/projects" },
      ]}
    />
  );
}
