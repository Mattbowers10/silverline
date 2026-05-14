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
  title: "Short-Term Rental Management — Silverline Properties",
  description:
    "Full-service STR management across East Tennessee. Multi-platform listings, dynamic pricing, 24/7 guest comms, cleaning, and on-call maintenance via the Silverline build team.",
  path: "/services/management",
});

export default function ManagementPage() {
  return (
    <>
      <Hero
        eyebrow="Properties · STR management"
        headline="Higher occupancy. Less work."
        italicWord="Less"
        sub="Full-service short-term rental management across East Tennessee — listings, pricing, guest comms, cleaning, and maintenance — backed by the Silverline build team for everything that needs to be fixed, upgraded, or rebuilt."
        emailCapture={{ submitLabel: "Talk to operations" }}
        secondaryLink={{ label: "Or model your ROI", href: "/calculators/str-roi" }}
        heroSlot={<HeroComposite />}
      />

      <FeatureList
        eyebrow="What's included"
        headline="Every Silverline management plan covers:"
        italicWord="Every"
        columns={3}
        features={[
          {
            icon: "📣",
            title: "Multi-platform listings",
            body: "Airbnb, VRBO, Booking.com, and a direct-booking site. Professional photography, copywriting, channel manager.",
          },
          {
            icon: "📈",
            title: "Dynamic pricing",
            body: "Daily rate optimization keyed to demand, seasonality, events, and competitor pricing. PriceLabs/Wheelhouse-tuned.",
          },
          {
            icon: "📱",
            title: "24/7 guest comms",
            body: "Instant response to booking questions, check-in issues, and emergencies. Friendly, fast, on-brand.",
          },
          {
            icon: "🧹",
            title: "Turnover cleaning",
            body: "Vetted local cleaning crews, photo-documented turns, restocking, inventory. We catch problems before guests do.",
          },
          {
            icon: "🛠",
            title: "On-call maintenance",
            body: "The Silverline service team handles maintenance — pool, HVAC, plumbing, electrical. Real techs, fast response.",
          },
          {
            icon: "📊",
            title: "Monthly P&L reports",
            body: "Revenue, occupancy, ADR, expenses, repairs — transparent monthly statements. Tax-time ready.",
          },
        ]}
      />

      <HowWeWork
        eyebrow="Onboarding"
        headline="From first email to first guest."
        italicWord="first"
        sub="Most Silverline managed properties go live within 14 days of contract."
        steps={[
          {
            n: "01",
            title: "Property review",
            body: "Walk-through, photo audit, inventory check, pricing model, list of recommended upgrades.",
          },
          {
            n: "02",
            title: "Listing build",
            body: "Photography, copywriting, channel-manager onboarding, dynamic-pricing setup, direct-booking site.",
          },
          {
            n: "03",
            title: "Operations live",
            body: "Cleaning crew assigned, maintenance on call, guest-comms automation, first booking calendar opens.",
          },
          {
            n: "04",
            title: "Ongoing optimization",
            body: "Monthly P&L. Quarterly review of pricing, photography, listing copy, and renovation opportunities.",
          },
        ]}
      />

      <Testimonials
        eyebrow="Management customers"
        headline="What our STR owners say."
        italicWord="owners"
        testimonials={[
          {
            quote:
              "Our occupancy went from 51% to 78% after we switched to Silverline's management. Same property, better operations.",
            name: "Placeholder Owner",
            role: "Single STR · Gatlinburg",
          },
          {
            quote:
              "We're out-of-state owners. Silverline runs everything — guests, cleaners, maintenance. We just review reports.",
            name: "Placeholder Owner",
            role: "Portfolio · Pigeon Forge",
          },
        ]}
      />

      <FAQ
        eyebrow="Management FAQ"
        headline="Operations questions, answered."
        italicWord="answered."
        ctaLink={{ label: "Talk to operations", href: "/consultation" }}
        items={[
          {
            question: "What's the management fee?",
            answer:
              "Industry-standard 20–25% of gross booking revenue. Includes listings, dynamic pricing, guest comms, cleaning coordination, maintenance dispatch, and reporting. No setup fees on annual contracts.",
          },
          {
            question: "Do you manage properties you didn't sell?",
            answer:
              "Yes. We manage existing STRs in our service area. We do an initial walkthrough and listing audit before quoting.",
          },
          {
            question: "How fast can we get listed?",
            answer:
              "Most properties go live within 14 days of contract. Photography is the gating item — typically scheduled within the first week.",
          },
          {
            question: "Who handles maintenance issues?",
            answer:
              "The Silverline service team. We dispatch directly to in-house techs for pool, HVAC, plumbing, and electrical. You get a notification with the fix scope and cost.",
          },
          {
            question: "Can I use the property myself?",
            answer:
              "Yes. We block your dates in the owner calendar. Most owners take 2–6 weeks per year for personal stays.",
          },
          {
            question: "What's a typical occupancy in our market?",
            answer:
              "Our managed Sevier/Gatlinburg portfolio averages 70%+ annual occupancy. Lake properties swing more seasonally. Specific projections are in your underwriting.",
          },
        ]}
      />

      <CTABand
        eyebrow="Ready to outsource ops?"
        headline="Schedule a property walk-through."
        italicWord="property"
        sub="30-minute walk-through and listing audit. We'll tell you what's working, what's not, and what we'd change."
        emailCapture={{ submitLabel: "Schedule walk-through" }}
      />
    </>
  );
}
