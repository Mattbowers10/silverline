import { ProjectGallery, CTABand } from "@/components/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pool Projects — Silverline Pools",
  description:
    "Recent Silverline pool builds across East Tennessee — gunite, fiberglass, infinity edges, plunge pools, and remodels.",
  path: "/projects",
});

export default function PoolsProjectsPage() {
  return (
    <>
      <ProjectGallery
        eyebrow="Pool portfolio"
        headline="Every pool we've built."
        italicWord="Every"
        sub="The filterable gallery (by city, style, finish, budget) lands in Week 10 once the photo drop is complete. For now, our six most recent featured builds."
        viewAllHref="/projects"
        projects={[
          {
            title: "Gunite pool & spa, Northshore",
            division: "pools",
            city: "Farragut",
            href: "/projects/northshore-pool",
          },
          {
            title: "Freeform with infinity edge",
            division: "pools",
            city: "Loudon",
            href: "/projects/loudon-infinity",
          },
          {
            title: "Fiberglass pool install",
            division: "pools",
            city: "Maryville",
            href: "/projects/maryville-fiberglass",
          },
          {
            title: "Plunge pool, downtown lot",
            division: "pools",
            city: "Knoxville",
            href: "/projects/knox-plunge",
          },
          {
            title: "Beach entry with spillover spa",
            division: "pools",
            city: "Sevierville",
            href: "/projects/sevier-beach-entry",
          },
          {
            title: "Lap pool with stone coping",
            division: "pools",
            city: "Oak Ridge",
            href: "/projects/oak-ridge-lap",
          },
        ]}
      />

      <CTABand
        eyebrow="See one you like?"
        headline="Yours could be next."
        italicWord="next."
        sub="A 60-minute site walk and a true-to-scale 3D rendering. Then the quote."
        emailCapture={{ submitLabel: "Schedule a site walk" }}
      />
    </>
  );
}
