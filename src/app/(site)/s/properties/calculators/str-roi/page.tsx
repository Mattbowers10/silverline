import { STRROICalculator } from "@/components/calculators/STRROICalculator";
import { CTABand } from "@/components/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "STR ROI Calculator — East Tennessee | Silverline Properties",
  description:
    "Project annual revenue, operating costs, and net income for a short-term rental in East Tennessee. Live underwriting tuned to Silverline's managed portfolio.",
  path: "/calculators/str-roi",
});

export default function STRROIPage() {
  return (
    <>
      <STRROICalculator />
      <CTABand
        eyebrow="Want real underwriting?"
        headline="Schedule a strategy call."
        italicWord="strategy"
        sub="30 minutes to align on goals and market. We underwrite live in front of you using real comp data."
        emailCapture={{ submitLabel: "Schedule strategy call" }}
      />
    </>
  );
}
