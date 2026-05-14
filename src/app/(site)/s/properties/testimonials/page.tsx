import { Testimonials, CTABand } from "@/components/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Owner Reviews — Silverline Properties",
  description:
    "Real reviews from East Tennessee STR owners, investors, and second-home buyers who work with Silverline Properties.",
  path: "/testimonials",
});

export default function PropertiesTestimonialsPage() {
  return (
    <>
      <Testimonials
        eyebrow="Owner reviews"
        headline="Real investors. Real returns."
        italicWord="Real"
        sub="Reviews from East Tennessee owners and investors who work with the Silverline properties team. Filterable by service type in Week 10."
        testimonials={[
          {
            quote:
              "Silverline rebuilt our STR top to bottom and now manages it. Bookings doubled in our first season.",
            name: "Placeholder Owner",
            role: "STR remodel + management · Sevierville",
          },
          {
            quote:
              "We're out-of-state owners. Silverline finds the properties, runs the renovations, and runs the rentals. We just review reports.",
            name: "Placeholder Owner",
            role: "Portfolio · Pigeon Forge",
          },
          {
            quote:
              "Our occupancy went from 51% to 78% after we switched to Silverline's management. Same property, better operations.",
            name: "Placeholder Owner",
            role: "Single STR · Gatlinburg",
          },
          {
            quote:
              "We toured eight properties with Silverline. They walked us away from three. We're glad they did — the one we bought has performed exactly as projected.",
            name: "Placeholder Buyer",
            role: "Cabin purchase · Pigeon Forge",
          },
          {
            quote:
              "The integration of buy + renovate + manage is the reason we picked Silverline. One company, one number, one P&L.",
            name: "Placeholder Buyer",
            role: "STR portfolio · Sevierville",
          },
        ]}
      />

      <CTABand
        eyebrow="Ready to join them?"
        headline="Schedule a strategy call."
        italicWord="strategy"
        sub="30 minutes to align on goals, market, and budget. Honest underwriting. Vertically integrated execution if you decide to move."
        emailCapture={{ submitLabel: "Schedule strategy call" }}
      />
    </>
  );
}
