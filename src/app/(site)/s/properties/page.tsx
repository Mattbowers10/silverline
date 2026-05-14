import {
  Hero,
  ForWho,
  DivisionCards,
  ProcessSteps,
  Testimonials,
  MetricsRow,
  ToolsGrid,
  WhyAccordion,
  HowWeWork,
  Partners,
  FAQ,
  RecentPosts,
  ProjectGallery,
  CTABand,
} from "@/components/sections";
import { HeroComposite } from "@/components/site/HeroComposite";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Silverline Properties — East Tennessee Real Estate & STR Management",
  description:
    "Buy and operate East Tennessee real estate with the team that builds and maintains it. Short-term rental management, real estate purchases, and lifecycle service — vertically integrated.",
  path: "/",
});

export default function PropertiesHome() {
  return (
    <>
      <Hero
        eyebrow="Silverline Properties · Real estate · STR management"
        headline="Buy smart. Earn more."
        italicWord="smart."
        sub="The only East Tennessee real estate team that builds the homes, maintains the homes, and operates them as short-term rentals. One ownership stack — design, build, buy, maintain, manage."
        emailCapture={{
          placeholder: "What's your email?",
          submitLabel: "Talk to a property advisor",
        }}
        secondaryLink={{ label: "Or explore current listings", href: "/listings" }}
        heroSlot={<HeroComposite />}
        metric={{
          value: "70%+",
          label: "average occupancy across the Silverline managed STR portfolio",
        }}
        logos={[
          { name: "NAR-Knoxville" },
          { name: "TN Realtors" },
          { name: "VRBO Premier" },
          { name: "Airbnb Plus" },
          { name: "BBB A+" },
          { name: "PMAR Pro" },
        ]}
      />

      <ForWho
        eyebrow="Who we work with"
        headline="From first-time investors to portfolio owners."
        italicWord="portfolio"
        sub="Whether you're buying your first STR or managing a five-property portfolio, the same vertically integrated Silverline team handles it."
        cards={[
          { label: "First-time STR investors", sub: "Mountain & lake cabins" },
          { label: "Portfolio operators", sub: "5+ unit owners" },
          { label: "Second-home buyers", sub: "Personal + rental use" },
          { label: "Lake-home owners", sub: "Tellico · Norris · Watts Bar" },
          { label: "Mountain owners", sub: "Sevier · Gatlinburg · Pigeon Forge" },
          { label: "Long-term landlords", sub: "Annual rentals" },
          { label: "1031 exchangers", sub: "Tax-deferred buyers" },
          { label: "Out-of-state investors", sub: "We manage everything" },
        ]}
      />

      <DivisionCards
        eyebrow="Two services"
        headline="The full ownership stack."
        italicWord="full"
        sub="Buy with the team that builds. Operate with the team that maintains. Two services, one ownership stack."
        cards={[
          {
            tag: "Real estate",
            title: "Buying, selling, investing.",
            body: "East Tennessee residential real estate brokerage with deep STR-market expertise. We help you buy property that performs.",
            href: "/services/real-estate",
            placeholderKind: "landscape",
          },
          {
            tag: "STR management",
            title: "Full-service short-term rental ops.",
            body: "Listings, dynamic pricing, guest comms, cleaning, maintenance, and the Silverline build team for upgrades. End-to-end.",
            href: "/services/management",
            placeholderKind: "house",
          },
          {
            tag: "Long-term rentals",
            title: "Coming Q3 2026.",
            body: "Annual-lease property management for owners who prefer the stability of long-term tenants. Pilot launching late 2026.",
            href: "/services/management",
            placeholderKind: "house",
          },
        ]}
      />

      <ProcessSteps
        eyebrow="How Silverline Properties works"
        headline="Buy. Operate. Grow."
        italicWord="Grow."
        sub="The Silverline vertical-integration sequence — owning real estate, made easier."
        steps={[
          {
            step: "01 · Buy",
            title: "Find the right property",
            body: "We scout, underwrite, and negotiate. STR-grade properties only — we walk away from properties that won't perform.",
          },
          {
            step: "02 · Optimize",
            title: "Renovate + furnish if needed",
            body: "If the property needs work, the Silverline build team handles it. Renovation, furniture, photography — all in one.",
          },
          {
            step: "03 · Operate",
            title: "Listings, guests, cleanings",
            body: "Multi-platform listings, dynamic pricing, 24/7 guest comms, turnover cleaning, and on-call maintenance.",
          },
        ]}
      />

      <Testimonials
        eyebrow="Real owners. Real returns."
        headline="They trusted us with their portfolio."
        italicWord="trusted"
        sub="Investors and second-home owners who hand the keys to Silverline."
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
        ]}
      />

      <MetricsRow
        eyebrow="The properties division"
        metrics={[
          { value: "40+", label: "managed STR properties" },
          { value: "70%+", label: "average annual occupancy" },
          { value: "4.9★", label: "average guest rating" },
          { value: "$8M+", label: "in guest revenue under management" },
        ]}
      />

      <ToolsGrid
        eyebrow="Free property tools"
        headline="Underwrite before you buy."
        italicWord="buy."
        sub="Real numbers, tuned to the East Tennessee STR market. No spam, no obligation."
        tools={[
          {
            name: "STR ROI calculator",
            description: "Project rental income, occupancy, and net yield by zip and property type.",
            href: "/calculators/str-roi",
            badge: "STR",
          },
          {
            name: "Property search",
            description: "Browse vetted STR-grade listings curated by the Silverline team.",
            href: "/listings",
          },
          {
            name: "Service-area lookup",
            description: "Check whether a property falls inside our 90-minute radius.",
            href: "https://silverlineind.com/service-area",
          },
        ]}
      />

      <WhyAccordion
        eyebrow="Why Silverline Properties"
        headline="Owning made simple. Operations made better."
        italicWord="simple."
        sub="What separates the Silverline approach from a typical real estate or management company."
        items={[
          {
            title: "Vertical integration",
            body: "We build, we buy, we maintain, we manage. One company across the whole ownership stack — fewer vendors, less friction.",
          },
          {
            title: "STR-market expertise",
            body: "Knoxville's mountain and lake markets behave nothing like a metro market. Our underwriting is specific to this region.",
          },
          {
            title: "Renovation + furnishing under one roof",
            body: "If a property needs work, the Silverline build team handles it. No coordinating between brokers, contractors, and stagers.",
          },
          {
            title: "Multi-platform listings",
            body: "Airbnb, VRBO, direct-booking site, and channel manager. Dynamic pricing keyed to seasonality, events, and demand.",
          },
          {
            title: "On-the-ground operations",
            body: "Local cleaning crews, 24/7 guest comms, on-call maintenance via the Silverline service team. Real humans, real fast.",
          },
        ]}
      />

      <HowWeWork
        eyebrow="From inquiry to ownership"
        headline="How a Silverline property gets started."
        italicWord="started."
        sub="A predictable, four-step path from first email to first guest."
        steps={[
          {
            n: "01",
            title: "Strategy call",
            body: "30 minutes to understand goals, market, and budget. We're honest about whether STR is right for you.",
          },
          {
            n: "02",
            title: "Find + underwrite",
            body: "We source vetted properties, run pro forma, and present 2–4 finalists with full underwriting.",
          },
          {
            n: "03",
            title: "Close + optimize",
            body: "Coordinate the close. If renovations are needed, the Silverline build team runs them.",
          },
          {
            n: "04",
            title: "Manage",
            body: "Listings, pricing, guests, turns, maintenance. Reports to you monthly with full P&L.",
          },
        ]}
      />

      <Partners
        headline="Built on platforms East Tennessee guests already trust."
        logos={[
          { name: "Airbnb Plus" },
          { name: "VRBO Premier" },
          { name: "Booking.com" },
          { name: "NAR" },
          { name: "TN Realtors" },
          { name: "BBB A+" },
        ]}
      />

      <FAQ
        eyebrow="Properties FAQ"
        headline="What owners ask us first."
        italicWord="first."
        ctaLink={{ label: "Talk to a property advisor", href: "/consultation" }}
        items={[
          {
            question: "Do you only manage properties you sourced?",
            answer:
              "No. We manage existing STRs in our service area. We do an initial property review and walkthrough before quoting management.",
          },
          {
            question: "What's a typical management fee?",
            answer:
              "Industry-standard 20–25% of gross booking revenue. The fee includes guest comms, dynamic pricing, multi-platform listing, cleaning coordination, and 24/7 maintenance dispatch. No setup fees on annual contracts.",
          },
          {
            question: "What occupancy can I expect?",
            answer:
              "Our managed portfolio averages 70%+ annual occupancy. Mountain and lake STRs swing seasonally — full transparency in your underwriting and monthly reports.",
          },
          {
            question: "Can you renovate the property before listing?",
            answer:
              "Yes — that's our edge. The Silverline build team handles renovation and the design team handles furnishing. One vendor, one schedule.",
          },
          {
            question: "Do you work with out-of-state owners?",
            answer:
              "Most of our owners live elsewhere. We handle every on-site touchpoint — guests, cleaners, maintenance, inspections — and report monthly.",
          },
          {
            question: "Can I use the property myself?",
            answer:
              "Yes. We block your dates in the calendar. Most owners use 2–6 weeks per year for personal stays.",
          },
        ]}
      />

      <RecentPosts
        eyebrow="The Deep End — properties"
        headline="What investors and owners read."
        italicWord="read."
        sub="Market reporting, underwriting playbooks, and operations guides from the Silverline properties team."
        viewAllHref="https://silverlineind.com/blog?category=properties"
        posts={[
          {
            title: "Short-term rental yields by zip in 2026 (placeholder)",
            href: "https://silverlineind.com/blog/str-yields-2026",
            category: "Properties",
            publishedAt: "May 9, 2026",
            readingMinutes: 9,
          },
          {
            title: "How we underwrite a mountain cabin in 30 minutes (placeholder)",
            href: "https://silverlineind.com/blog/underwriting-mountain-cabin",
            category: "Properties",
            publishedAt: "May 4, 2026",
            readingMinutes: 11,
          },
          {
            title: "Dynamic pricing playbooks for Sevier-county STRs (placeholder)",
            href: "https://silverlineind.com/blog/dynamic-pricing-sevier",
            category: "Properties",
            publishedAt: "April 30, 2026",
            readingMinutes: 8,
          },
          {
            title: "1031 exchanges into East Tennessee STRs (placeholder)",
            href: "https://silverlineind.com/blog/1031-east-tn",
            category: "Properties",
            publishedAt: "April 25, 2026",
            readingMinutes: 13,
          },
        ]}
      />

      <ProjectGallery
        eyebrow="Featured properties"
        headline="Some of what we operate."
        italicWord="operate."
        sub="A sample of the 40+ properties Silverline currently manages across East Tennessee."
        viewAllHref="/listings"
        projects={[
          {
            title: "Mountain rental remodel",
            division: "properties",
            city: "Sevierville",
            href: "/listings/sevier-mountain-remodel",
          },
          {
            title: "STR portfolio onboarding",
            division: "properties",
            city: "Pigeon Forge",
            href: "/listings/pigeon-forge-portfolio",
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
        ]}
      />

      <CTABand
        eyebrow="Ready to own East Tennessee?"
        headline="Tell us about your goals."
        italicWord="goals."
        sub="A 30-minute strategy call. Honest underwriting. Vertically integrated execution if you decide to move."
        emailCapture={{ submitLabel: "Schedule strategy call" }}
      />
    </>
  );
}
