import {
  Hero,
  FeatureList,
  HowWeWork,
  Testimonials,
  FAQ,
  CTABand,
} from "@/components/sections";
import { HeroComposite } from "@/components/site/HeroComposite";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pool Maintenance Plans — Silverline Pools",
  description:
    "Weekly, biweekly, or monthly pool maintenance plans across East Tennessee — chemistry, cleaning, equipment checks, and seasonal openings and closings.",
  path: "/services/maintenance",
});

export default function MaintenancePage() {
  return (
    <>
      <Hero
        eyebrow="Pool service · Maintenance plans"
        headline="A pool that's always ready."
        italicWord="ready."
        sub="A Silverline maintenance plan means weekly visits, balanced chemistry, clean filters, and equipment checks — handled by the same team that builds the best pools in East Tennessee."
        emailCapture={{ submitLabel: "Get a maintenance quote" }}
        secondaryLink={{ label: "Or estimate your annual cost", href: "/calculators/maintenance-plan" }}
        heroSlot={<HeroComposite />}
      />

      <FeatureList
        eyebrow="What's included"
        headline="Every Silverline maintenance plan covers:"
        italicWord="Every"
        columns={3}
        features={[
          {
            icon: "🧪",
            title: "Full chemistry balance",
            body: "Chlorine, pH, alkalinity, calcium hardness, cyanuric acid — measured and balanced every visit.",
          },
          {
            icon: "🧹",
            title: "Skim, brush & vacuum",
            body: "Surface skim, wall brush, vacuum to waste or filter — pool floor, walls, and waterline every visit.",
          },
          {
            icon: "⚙",
            title: "Equipment check",
            body: "Pump, filter, heater, salt cell, automation. Pressures noted, anomalies flagged before they become repairs.",
          },
          {
            icon: "📋",
            title: "Written visit report",
            body: "Photo, chemistry readings, and notes emailed after every visit. You always know what we did.",
          },
          {
            icon: "🌸",
            title: "Seasonal opening & closing",
            body: "Spring opening and winter closing included on the annual plan — no separate charge.",
          },
          {
            icon: "★",
            title: "Priority on emergencies",
            body: "Maintenance customers get first-in-line scheduling for any one-off service or repair calls.",
          },
        ]}
      />

      <HowWeWork
        eyebrow="Choose a cadence"
        headline="Three plans. Same standards."
        italicWord="standards."
        sub="Pick the visit frequency that matches how you use the pool — and how much margin for error you want."
        steps={[
          {
            n: "Weekly",
            title: "The default",
            body: "Best for heavy summer use. Algae never gets a head start. Most Silverline customers run weekly Memorial Day through Labor Day.",
          },
          {
            n: "Biweekly",
            title: "Shoulder seasons",
            body: "Spring and fall, when temps drop and use slows. Equipment still gets checked every visit.",
          },
          {
            n: "Monthly",
            title: "Winter watch",
            body: "Closed-pool monitoring through the cold months. Cover check, water level, equipment freeze prevention.",
          },
          {
            n: "Custom",
            title: "Your schedule",
            body: "Vacation rentals, lakefront properties, and absentee owners often want a custom cadence. We build it for you.",
          },
        ]}
      />

      <Testimonials
        eyebrow="Maintenance customers"
        headline="What our plan customers say."
        italicWord="customers"
        testimonials={[
          {
            quote:
              "We switched from a national pool service to Silverline three years ago and never looked back. The weekly reports alone are worth it.",
            name: "Placeholder Owner",
            role: "Weekly plan · Knoxville",
          },
          {
            quote:
              "They open the pool, they close the pool, they keep it clear in between. We just swim.",
            name: "Placeholder Owner",
            role: "Annual plan · Tellico Village",
          },
        ]}
      />

      <FAQ
        eyebrow="Maintenance FAQ"
        headline="Plan questions, answered."
        italicWord="answered."
        ctaLink={{ label: "Talk to our service team", href: "/consultation" }}
        items={[
          {
            question: "What does a maintenance plan cost?",
            answer:
              "Weekly plans typically run $150–$250 per visit depending on pool size and equipment. Biweekly and monthly plans scale down proportionally. Annual contracts get a discount.",
          },
          {
            question: "Do you service pools you didn't build?",
            answer:
              "Yes. We do an initial inspection and water panel before quoting a plan so we both know the starting point.",
          },
          {
            question: "What if I'm out of town?",
            answer:
              "Most plan customers we never have to coordinate with — we have a gate code and a fixed visit day. You get the report by email.",
          },
          {
            question: "Are chemicals included?",
            answer:
              "Standard chlorine, acid, and stabilizer are included. Salt cell replacements, shock treatments, and major chemistry corrections are quoted separately.",
          },
        ]}
      />

      <CTABand
        eyebrow="Set it and swim"
        headline="Lock in your pool plan."
        italicWord="plan."
        sub="A 15-minute call to spec your pool and your usage. A custom quote by email the same day."
        emailCapture={{ submitLabel: "Get a maintenance quote" }}
      />
    </>
  );
}
