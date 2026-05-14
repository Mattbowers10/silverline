import { Testimonials, CTABand } from "@/components/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pool Customer Reviews — Silverline Pools",
  description:
    "Real reviews from pool owners across East Tennessee — gunite, fiberglass, service, and remodel customers.",
  path: "/testimonials",
});

export default function PoolsTestimonialsPage() {
  return (
    <>
      <Testimonials
        eyebrow="Pool reviews"
        headline="Real owners. Real builds."
        italicWord="Real"
        sub="A growing collection of reviews from Silverline pool owners. Filterable by service type when the Payload Testimonials collection is wired in Week 10."
        testimonials={[
          {
            quote:
              "Our pool came in on time, on budget, and looks better than the renderings. Their service team has been just as good.",
            name: "Placeholder Owner",
            role: "Gunite pool · Knoxville",
          },
          {
            quote:
              "We interviewed three pool builders before choosing Silverline. They were the only ones who actually walked the yard.",
            name: "Placeholder Owner",
            role: "Freeform pool · Farragut",
          },
          {
            quote:
              "Fiberglass was the right call for our timeline. Silverline had it in the ground in three weeks — and the crew was meticulous.",
            name: "Placeholder Owner",
            role: "Fiberglass pool · Maryville",
          },
          {
            quote:
              "Two summers in and we love it. Easier on the chemistry, easier on the feet, and the install was uneventful.",
            name: "Placeholder Owner",
            role: "Fiberglass pool · Oak Ridge",
          },
          {
            quote:
              "We switched from a national pool service to Silverline three years ago and never looked back. The weekly reports alone are worth it.",
            name: "Placeholder Owner",
            role: "Weekly maintenance plan · Knoxville",
          },
          {
            quote:
              "Our pool was 20 years old and showing it. Silverline brought it back to looking newer than the day it was built.",
            name: "Placeholder Owner",
            role: "Replaster + retile · Knoxville",
          },
        ]}
      />

      <CTABand
        eyebrow="Ready to join them?"
        headline="Tell us about your pool."
        italicWord="pool."
        sub="A 60-minute site walk and a 3D rendering on us. The crew that builds your pool will be the one walking it with you."
        emailCapture={{ submitLabel: "Schedule a site walk" }}
      />
    </>
  );
}
