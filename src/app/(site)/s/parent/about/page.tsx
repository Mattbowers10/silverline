import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Silverline",
  description:
    "The Silverline story — a 10-person East Tennessee team with 85+ years of combined experience across pools, construction, and real estate.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PagePlaceholder
      eyebrow="About Silverline"
      title="A small team. Built to outlast."
      italicWord="outlast."
      description="Founded in 2021 in Knoxville. Ten people, 85+ years of combined craftsmanship, and a stubborn refusal to be the cheapest option."
      links={[
        { label: "Meet the team", href: "/about#team" },
        { label: "Our story", href: "/about#story" },
        { label: "Open roles", href: "/careers" },
      ]}
    />
  );
}
