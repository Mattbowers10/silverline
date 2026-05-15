import { HomeBuildCalculator } from "@/components/calculators/HomeBuildCalculator";
import { CTABand } from "@/components/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Custom Home Cost Estimator — East Tennessee | Silverline Developments",
  description:
    "Estimate the cost of a custom home in East Tennessee. Four inputs, a live range, and a real number from Silverline's last 50 builds.",
  path: "/calculators/home-build",
});

export default function HomeBuildPage() {
  return (
    <>
      <HomeBuildCalculator />
      <CTABand
        eyebrow="Want a real proposal?"
        headline="A site walk, then a fixed-scope number."
        italicWord="fixed-scope"
        sub="90-minute discovery visit. Written proposal within two weeks. The crew that builds it walks it with you."
        emailCapture={{ submitLabel: "Schedule discovery visit" }}
      />
    </>
  );
}
