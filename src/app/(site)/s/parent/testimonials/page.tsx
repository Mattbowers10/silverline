import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Testimonials",
  description:
    "What 100+ Silverline owners across East Tennessee have to say about working with us.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <PagePlaceholder
      eyebrow="Reviews"
      title="100+ owners. One bar."
      italicWord="One"
      description="The full filterable testimonial library lands in Week 8. The home page rotates the three strongest stories from our 100+ reviews."
      links={[
        { label: "See featured stories", href: "/#testimonials" },
        { label: "Request consultation", href: "/consultation" },
      ]}
    />
  );
}
