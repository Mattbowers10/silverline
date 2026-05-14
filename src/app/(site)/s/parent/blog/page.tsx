import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Deep End — Silverline blog",
  description:
    "Project breakdowns, cost guides, and East Tennessee market reporting from the Silverline team.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <PagePlaceholder
      eyebrow="The Deep End"
      title="Posts coming soon."
      italicWord="soon."
      description="The full blog index lands in Week 7 once the Payload Posts collection is connected. The home page surfaces the latest four posts as they land."
      links={[
        { label: "Subscribe — leave email at contact", href: "/contact?subject=Newsletter" },
      ]}
    />
  );
}
