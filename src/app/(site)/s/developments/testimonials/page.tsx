import { Testimonials, CTABand } from "@/components/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Owner Reviews — Silverline Developments",
  description:
    "Real reviews from East Tennessee owners — custom homes, commercial builds, and remodels delivered by Silverline.",
  path: "/testimonials",
});

export default function DevelopmentsTestimonialsPage() {
  return (
    <>
      <Testimonials
        eyebrow="Build reviews"
        headline="Real owners. Real builds."
        italicWord="Real"
        sub="Reviews from East Tennessee owners who chose Silverline for their largest project. Filterable by build type in Week 10."
        testimonials={[
          {
            quote:
              "We interviewed five builders. Silverline was the only one who walked the lot before quoting. They were also the only ones we'd hire again.",
            name: "Placeholder Owner",
            role: "Lakeside custom · Loudon",
          },
          {
            quote:
              "Our project manager answered every question, every week, on time. The build itself was the easiest hard thing we've ever done.",
            name: "Placeholder Owner",
            role: "West Knox custom · Farragut",
          },
          {
            quote:
              "Our commercial fit-out came in three weeks ahead of schedule. The crew was professional and clean from day one.",
            name: "Placeholder Operator",
            role: "Restaurant · Downtown Knoxville",
          },
          {
            quote:
              "The communication was the best we've had on any commercial project. Status calls every Friday, photos every day.",
            name: "Placeholder Operator",
            role: "Office fit-out · West Knox",
          },
          {
            quote:
              "Silverline took a 1960s rancher and made it feel like a brand-new home. The communication and project management was the best we've ever seen.",
            name: "Placeholder Owner",
            role: "Whole-home remodel · Maryville",
          },
          {
            quote:
              "Our kitchen remodel came in on budget and four days early. They cleaned the site every single afternoon.",
            name: "Placeholder Owner",
            role: "Kitchen remodel · Knoxville",
          },
        ]}
      />

      <CTABand
        eyebrow="Ready to join them?"
        headline="Schedule a discovery visit."
        italicWord="discovery"
        sub="A 90-minute walk-through. A written, fixed-scope proposal within two weeks. The crew that builds it walks it with you."
        emailCapture={{ submitLabel: "Schedule discovery visit" }}
      />
    </>
  );
}
