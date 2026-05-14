import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "A portfolio of Silverline pools, homes, and managed properties across East Tennessee.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <PagePlaceholder
      eyebrow="Recent work"
      title="The Silverline portfolio."
      italicWord="portfolio."
      description="The filterable gallery lands in Week 10 once the photography drops. For now, the home page features six recent builds."
      links={[
        { label: "View on the home page", href: "/" },
        { label: "Pools projects", href: "https://pools.silverlineind.com/projects" },
        { label: "Developments projects", href: "https://developments.silverlineind.com/projects" },
      ]}
    />
  );
}
