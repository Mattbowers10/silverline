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
    "Silverline Developments — Custom Homes, Commercial, & Remodels",
  description:
    "Ground-up custom homes, commercial builds, and remodels in East Tennessee. One team, one schedule, one point of contact from first sketch to final walkthrough.",
  path: "/",
});

export default function DevelopmentsHome() {
  return (
    <>
      <Hero
        eyebrow="Silverline Developments · Knoxville & East Tennessee"
        headline="Built once. Built right."
        italicWord="once."
        sub="Custom homes, commercial spaces, and remodels delivered by one Silverline team with a single point of contact from first sketch through final walkthrough."
        emailCapture={{
          placeholder: "What's your email?",
          submitLabel: "Start a build",
        }}
        secondaryLink={{ label: "Or see completed builds", href: "/projects" }}
        heroSlot={<HeroComposite />}
        metric={{
          value: "$120M+",
          label: "in finished East Tennessee real estate across our portfolio",
        }}
        logos={[
          { name: "NAHB" },
          { name: "AIA-Knoxville" },
          { name: "AGC of Tennessee" },
          { name: "ENERGY STAR" },
          { name: "BBB A+" },
          { name: "RESNET HERS-rated" },
        ]}
      />

      <ForWho
        eyebrow="What we build"
        headline="From lakefront to main street."
        italicWord="lakefront"
        sub="A Silverline build can be a 6,000-sqft lakeside estate, a downtown commercial fit-out, or anything in between. Here's where we work most."
        cards={[
          { label: "Lakeside estates", sub: "Tellico, Norris, Watts Bar" },
          { label: "Mountain homes", sub: "Sevier · Blount · Cocke" },
          { label: "Urban infill", sub: "Downtown Knoxville" },
          { label: "West Knox custom", sub: "Farragut · Northshore" },
          { label: "Commercial fit-out", sub: "Retail + office" },
          { label: "Restaurant builds", sub: "Front + back of house" },
          { label: "Whole-home remodels", sub: "Mid-century to modern" },
          { label: "ADUs & guest houses", sub: "Detached & attached" },
        ]}
      />

      <DivisionCards
        eyebrow="Three services"
        headline="One builder. Three disciplines."
        italicWord="One"
        sub="Whether you're building from dirt, fitting out a commercial space, or remodeling a home you already own — the same Silverline team runs the project."
        cards={[
          {
            tag: "Residential",
            title: "Custom homes from dirt up.",
            body: "Ground-up custom homes designed around your lot, your lifestyle, and your budget. Lakeside, mountain, urban, or in town.",
            href: "/services/residential",
            placeholderKind: "house",
          },
          {
            tag: "Commercial",
            title: "Retail, restaurants, offices.",
            body: "Commercial fit-outs and ground-up builds for East Tennessee operators who care about the long-term result.",
            href: "/services/commercial",
            placeholderKind: "house",
          },
          {
            tag: "Remodels",
            title: "Bring it back. Make it yours.",
            body: "Whole-home and selective remodels — kitchens, primaries, additions, and complete back-to-studs transformations.",
            href: "/services/remodels",
            placeholderKind: "landscape",
          },
        ]}
      />

      <ProcessSteps
        eyebrow="How a Silverline build works"
        headline="Predictable. Documented. Visible."
        italicWord="Visible."
        sub="The Silverline design-build sequence — disciplined and scheduled, with weekly photo updates and a single point of contact."
        steps={[
          {
            step: "01 · Design",
            title: "Discovery → drawings → permits",
            body: "We walk the lot, design with you, produce construction drawings, and pull permits. You sign a fixed-scope agreement before a hammer swings.",
          },
          {
            step: "02 · Build",
            title: "Foundation through punch list",
            body: "One project manager. Our crews execute the build with weekly photo updates and Friday status emails.",
          },
          {
            step: "03 · Warranty",
            title: "Walkthrough → warranty → returning",
            body: "Final walkthrough, written warranty, and a return visit at 6 months and 1 year. We don't disappear after the keys.",
          },
        ]}
      />

      <Testimonials
        eyebrow="Real owners. Real builds."
        headline="They trusted Silverline with their home."
        italicWord="trusted"
        sub="A few of the East Tennessee owners who chose Silverline for their largest project."
        testimonials={[
          {
            quote:
              "We interviewed five builders. Silverline was the only one who walked the lot before quoting. They were also the only ones we'd hire again.",
            name: "Placeholder Owner",
            role: "Custom home · Farragut",
          },
          {
            quote:
              "Our commercial fit-out came in three weeks ahead of schedule. The crew was professional and clean from day one.",
            name: "Placeholder Owner",
            role: "Commercial · Knoxville",
          },
          {
            quote:
              "Silverline took a 1960s rancher and made it feel like a brand-new home. The communication and project management was the best we've ever seen.",
            name: "Placeholder Owner",
            role: "Whole-home remodel · Maryville",
          },
        ]}
      />

      <MetricsRow
        eyebrow="The developments division"
        metrics={[
          { value: "50+", label: "homes and commercial builds completed" },
          { value: "$120M+", label: "in finished real estate" },
          { value: "4.9★", label: "across owner reviews" },
          { value: "11 mo", label: "median custom-home build" },
        ]}
      />

      <ToolsGrid
        eyebrow="Free build tools"
        headline="Plan before you break ground."
        italicWord="break"
        sub="Real numbers, generated from East Tennessee market data — no spam, no obligation."
        tools={[
          {
            name: "Home build cost estimator",
            description: "Cost-per-sqft estimator tuned to East Tennessee market data.",
            href: "/calculators/home-build",
            badge: "Residential",
          },
          {
            name: "Remodel ROI estimator",
            description: "Projected return on common kitchen, primary, and addition remodels.",
            href: "/calculators/remodel-roi",
            badge: "Remodels",
          },
          {
            name: "Service-area lookup",
            description: "Check whether your build site falls inside our 90-minute radius.",
            href: "https://silverlineind.com/service-area",
          },
        ]}
      />

      <WhyAccordion
        eyebrow="Why Silverline Developments"
        headline="Built on standards, not shortcuts."
        italicWord="shortcuts."
        sub="What separates a Silverline build from the cheaper option — and why our owners refer us to their neighbors."
        items={[
          {
            title: "Design-build under one roof",
            body: "We design and we build. No handoff between architect and contractor, no shifted-blame moments, no surprises in the field.",
          },
          {
            title: "Local crews, no anonymous subs",
            body: "Our crews — not faceless subs — execute the build. The team that bids it is the team that builds it.",
          },
          {
            title: "Weekly photo updates, Friday status emails",
            body: "You always know where we are. Project management is a discipline at Silverline, not an afterthought.",
          },
          {
            title: "Fixed-scope, line-item contracts",
            body: "No change-order traps. No vague allowances. Every line in the contract is something we'll deliver.",
          },
          {
            title: "Warranty + return visits",
            body: "Written warranty on the build. Return walkthroughs at 6 months and 1 year, where we fix anything we missed.",
          },
        ]}
      />

      <HowWeWork
        eyebrow="From inquiry to keys"
        headline="How a Silverline build gets started."
        italicWord="started."
        sub="A predictable, four-step path from your first email to walking through your finished home."
        steps={[
          {
            n: "01",
            title: "Discovery",
            body: "Phone or site walk. We listen, we ask, we take notes. Honest budget conversation up front.",
          },
          {
            n: "02",
            title: "Design + proposal",
            body: "Architectural drawings, finish selections, fixed-scope budget, calendar. Signed before construction.",
          },
          {
            n: "03",
            title: "Build",
            body: "One crew, one schedule, one project manager. Weekly photos, Friday emails, no surprises.",
          },
          {
            n: "04",
            title: "Walkthrough + warranty",
            body: "Final walkthrough, written warranty, return visits at 6 months and 1 year. Maintain anything we built.",
          },
        ]}
      />

      <Partners
        headline="Built with East Tennessee's best architects, suppliers, and trades."
        logos={[
          { name: "NAHB" },
          { name: "AIA-Knoxville" },
          { name: "AGC-TN" },
          { name: "ENERGY STAR" },
          { name: "RESNET HERS" },
          { name: "BBB A+" },
        ]}
      />

      <FAQ
        eyebrow="Developments FAQ"
        headline="What owners ask us first."
        italicWord="first."
        ctaLink={{ label: "Talk to our team", href: "/consultation" }}
        items={[
          {
            question: "What's a typical custom-home timeline?",
            answer:
              "Most Silverline custom homes run 9–14 months from contract to keys, design phase included. Commercial fit-outs typically run 3–6 months. Whole-home remodels typically run 6–16 weeks.",
          },
          {
            question: "What's a typical cost-per-square-foot in this market?",
            answer:
              "Custom homes typically start around $325/sqft in East Tennessee and rise with finish level and complexity (lakefront, mountain lots, structural complexity). Commercial varies widely by use.",
          },
          {
            question: "Do you design as well as build?",
            answer:
              "Yes — Silverline runs a true design-build model. We work with our own architectural partner from concept through construction drawings. If you already have plans, we'll build to them.",
          },
          {
            question: "Do you build outside Knoxville?",
            answer:
              "We serve every city within a 90-minute drive of downtown Knoxville. If your build site is on our service-area map, the answer is yes.",
          },
          {
            question: "How do you handle change orders?",
            answer:
              "Up front, we lock scope and budget in a line-item contract. If you ask for a change during the build, we quote it in writing before we proceed. No surprise invoices at handoff.",
          },
          {
            question: "What's the warranty?",
            answer:
              "Written 1-year workmanship warranty plus the standard manufacturer warranties on materials and systems. Return walkthroughs at 6 months and 12 months are included.",
          },
        ]}
      />

      <RecentPosts
        eyebrow="The Deep End — building"
        headline="What East Tennessee owners read."
        italicWord="read."
        sub="Build guides, cost breakdowns, and market reporting from the Silverline developments team."
        viewAllHref="https://silverlineind.com/blog?category=developments"
        posts={[
          {
            title: "Cost per square foot for custom homes in Knox County (placeholder)",
            href: "https://silverlineind.com/blog/cost-per-sqft-knox",
            category: "Developments",
            publishedAt: "May 11, 2026",
            readingMinutes: 14,
          },
          {
            title: "Lakefront builds: the 6 questions to ask before you buy the lot (placeholder)",
            href: "https://silverlineind.com/blog/lakefront-lot-questions",
            category: "Developments",
            publishedAt: "May 6, 2026",
            readingMinutes: 11,
          },
          {
            title: "Kitchen remodels: where the budget really goes (placeholder)",
            href: "https://silverlineind.com/blog/kitchen-remodel-budget",
            category: "Developments",
            publishedAt: "May 1, 2026",
            readingMinutes: 9,
          },
          {
            title: "Why we don't take low bids (placeholder)",
            href: "https://silverlineind.com/blog/low-bid-economics",
            category: "Developments",
            publishedAt: "April 28, 2026",
            readingMinutes: 7,
          },
        ]}
      />

      <ProjectGallery
        eyebrow="Recent builds"
        headline="Our developments portfolio."
        italicWord="developments"
        sub="Six recent Silverline builds across residential, commercial, and remodel work."
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
        eyebrow="Ready to build?"
        headline="A site walk, then a real proposal."
        italicWord="real"
        sub="A 90-minute discovery visit. A written proposal within two weeks. The crew that builds your project will be the one walking it with you."
        emailCapture={{ submitLabel: "Schedule discovery visit" }}
      />
    </>
  );
}
