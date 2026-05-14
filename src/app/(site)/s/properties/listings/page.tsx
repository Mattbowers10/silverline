import { ProjectGallery, CTABand } from "@/components/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Listings — Silverline Properties",
  description:
    "Active East Tennessee real estate listings and managed short-term rental properties from the Silverline team.",
  path: "/listings",
});

export default function ListingsPage() {
  return (
    <>
      <ProjectGallery
        eyebrow="Active listings + managed STRs"
        headline="What we have today."
        italicWord="today."
        sub="A live MLS-backed feed is wired in Week 10. For now, a sample of currently managed STRs and recently listed buy-side opportunities."
        viewAllHref="/listings"
        projects={[
          {
            title: "Mountain rental remodel",
            division: "properties",
            city: "Sevierville",
            href: "/listings/sevier-mountain-remodel",
          },
          {
            title: "Lakefront 4-bed STR",
            division: "properties",
            city: "Loudon",
            href: "/listings/loudon-lakefront",
          },
          {
            title: "Downtown Gatlinburg cabin",
            division: "properties",
            city: "Gatlinburg",
            href: "/listings/gatlinburg-cabin",
          },
          {
            title: "Norris Lake A-frame",
            division: "properties",
            city: "Andersonville",
            href: "/listings/norris-aframe",
          },
          {
            title: "Maryville long-term rental",
            division: "properties",
            city: "Maryville",
            href: "/listings/maryville-ltr",
          },
          {
            title: "Pigeon Forge investor pack",
            division: "properties",
            city: "Pigeon Forge",
            href: "/listings/pigeon-forge-portfolio",
          },
        ]}
      />

      <CTABand
        eyebrow="Don't see what you need?"
        headline="Tell us what you're looking for."
        italicWord="looking"
        sub="Most of our deals never hit the public listings page. Share your criteria and we'll send you off-market opportunities as they surface."
        emailCapture={{ submitLabel: "Share buying criteria" }}
      />
    </>
  );
}
