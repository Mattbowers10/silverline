import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Press",
  description: "Press inquiries, brand assets, and recent coverage of Silverline.",
  path: "/press",
});

export default function PressPage() {
  return (
    <PagePlaceholder
      eyebrow="Press"
      title="Press inquiries welcome."
      italicWord="welcome."
      description="For interviews, brand assets, or coverage requests, email us directly. We respond to legitimate press in a single business day."
      links={[
        { label: "Email press@silverlineind.com", href: "mailto:press@silverlineind.com" },
      ]}
    />
  );
}
