import { ProjectGallery, CTABand } from "@/components/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Build Projects — Silverline Developments",
  description:
    "Recent Silverline residential, commercial, and remodel builds across East Tennessee.",
  path: "/projects",
});

export default function DevelopmentsProjectsPage() {
  return (
    <>
      <ProjectGallery
        eyebrow="Developments portfolio"
        headline="Every Silverline build."
        italicWord="Every"
        sub="The filterable gallery (by type, city, budget) ships in Week 10. For now, our six most recent featured builds."
        viewAllHref="/projects"
        projects={[
          {
            title: "Lakeside estate, Tellico Village",
            division: "developments",
            city: "Loudon",
            href: "/projects/tellico-estate",
          },
          {
            title: "Mountain modern, Sevier ridge",
            division: "developments",
            city: "Sevierville",
            href: "/projects/sevier-modern",
          },
          {
            title: "Downtown Knox restaurant fit-out",
            division: "developments",
            city: "Knoxville",
            href: "/projects/knox-restaurant",
          },
          {
            title: "1960s rancher → modern farmhouse",
            division: "developments",
            city: "Maryville",
            href: "/projects/maryville-rancher",
          },
          {
            title: "West Knox custom build",
            division: "developments",
            city: "Farragut",
            href: "/projects/farragut-custom",
          },
          {
            title: "ADU + main-house addition",
            division: "developments",
            city: "Oak Ridge",
            href: "/projects/oak-ridge-adu",
          },
        ]}
      />

      <CTABand
        eyebrow="Yours next?"
        headline="Schedule a discovery visit."
        italicWord="discovery"
        sub="A 90-minute walk of your lot or your home. A written proposal within two weeks. The crew that builds it walks it with you."
        emailCapture={{ submitLabel: "Schedule discovery visit" }}
      />
    </>
  );
}
