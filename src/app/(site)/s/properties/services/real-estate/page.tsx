import {
  Hero,
  FeatureList,
  ProcessSteps,
  Testimonials,
  FAQ,
  CTABand,
} from "@/components/sections";
import { HeroComposite } from "@/components/site/HeroComposite";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "East Tennessee Real Estate — Silverline Properties",
  description:
    "Buy and sell residential and STR-grade real estate across East Tennessee. STR-market underwriting, vertically integrated renovation, and Silverline-team management on the back end.",
  path: "/services/real-estate",
});

export default function RealEstatePage() {
  return (
    <>
      <Hero
        eyebrow="Properties · Real estate"
        headline="Buy property that performs."
        italicWord="performs."
        sub="A residential real estate practice tuned for East Tennessee STR and second-home buyers. We underwrite for income, walk the property, and connect the build + management teams that close the loop."
        emailCapture={{ submitLabel: "Talk to a property advisor" }}
        secondaryLink={{ label: "Or browse current listings", href: "/listings" }}
        heroSlot={<HeroComposite />}
      />

      <FeatureList
        eyebrow="What you get"
        headline="A buyer's experience built around East Tennessee."
        italicWord="East Tennessee."
        columns={2}
        features={[
          {
            icon: "🔍",
            title: "Curated sourcing",
            body: "We surface STR-grade listings before they hit your inbox. Local agents, off-market network, MLS feed — all filtered for performance.",
          },
          {
            icon: "📊",
            title: "Real underwriting",
            body: "Every finalist gets a pro forma with realistic occupancy, ADR, and operating costs based on our managed-portfolio data.",
          },
          {
            icon: "🛠",
            title: "Renovation guidance",
            body: "If the property needs work, we model the renovation scope and budget alongside the purchase — handled by the Silverline build team.",
          },
          {
            icon: "🤝",
            title: "Negotiation that respects the numbers",
            body: "We negotiate from underwriting, not from emotion. We'll walk away from properties that don't pencil.",
          },
          {
            icon: "✓",
            title: "Smooth close coordination",
            body: "Inspections, financing, title, and final walkthrough — coordinated by us so you sign without surprises.",
          },
          {
            icon: "🔁",
            title: "Hand-off to management",
            body: "If you want STR management, the Silverline ops team takes the keys from us at closing. No vendor switchover.",
          },
        ]}
      />

      <ProcessSteps
        eyebrow="The buy"
        headline="From first call to first guest."
        italicWord="first"
        sub="The Silverline buy-and-launch sequence — typically 60–120 days from contract to first booking."
        steps={[
          {
            step: "01 · Strategy",
            title: "Goals + underwriting model",
            body: "30-minute call to align on goals, budget, geography, and ownership horizon. We build your underwriting model.",
          },
          {
            step: "02 · Source + close",
            title: "Tour, underwrite, negotiate, close",
            body: "We surface 4–8 finalists. Walk-through and pro-forma on each. Negotiation, inspection, financing, close.",
          },
          {
            step: "03 · Launch",
            title: "Renovate, furnish, list",
            body: "If renovation is needed, the Silverline build team executes. Design, photography, multi-platform listings.",
          },
        ]}
      />

      <Testimonials
        eyebrow="Buyer reviews"
        headline="What our buyers say."
        italicWord="buyers"
        testimonials={[
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

      <FAQ
        eyebrow="Real estate FAQ"
        headline="Buyer questions, answered."
        italicWord="answered."
        ctaLink={{ label: "Talk to an advisor", href: "/consultation" }}
        items={[
          {
            question: "Do you only work with STR buyers?",
            answer:
              "No. We work with primary-home buyers, second-home buyers, long-term rental investors, and STR investors. STR is our specialty, but we underwrite the whole market.",
          },
          {
            question: "What's your commission structure?",
            answer:
              "Standard buy-side broker commission, typically covered by the seller. We're transparent about any fees up front in the buyer representation agreement.",
          },
          {
            question: "Can you help me sell a property?",
            answer:
              "Yes. We represent sellers across the East Tennessee market — primary, second, STR, and investment property.",
          },
          {
            question: "What's the East Tennessee market doing right now?",
            answer:
              "STR demand remains strong in Sevier and on the lakes, with some pricing softness compared to the 2022 peak. We share current data on the strategy call.",
          },
        ]}
      />

      <CTABand
        eyebrow="Ready to buy?"
        headline="Schedule a strategy call."
        italicWord="strategy"
        sub="30 minutes to align on goals, market, and budget. A vetted shortlist within a week."
        emailCapture={{ submitLabel: "Schedule strategy call" }}
      />
    </>
  );
}
