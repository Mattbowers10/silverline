import { PoolCostCalculator } from "@/components/calculators/PoolCostCalculator";
import { CTABand } from "@/components/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pool Cost Estimator — Gunite vs. Fiberglass | Silverline Pools",
  description:
    "Estimate the cost of a gunite or fiberglass pool in East Tennessee. Five fields, a live range, and a real number from Silverline's last 50 builds.",
  path: "/calculators/cost-estimator",
});

export default function PoolCostEstimatorPage() {
  return (
    <>
      <PoolCostCalculator />
      <CTABand
        eyebrow="Want a real quote?"
        headline="Tell us about your yard."
        italicWord="yard."
        sub="A 60-minute site walk. A true-to-scale 3D rendering. A line-item quote that matches the build."
        emailCapture={{ submitLabel: "Schedule a site walk" }}
      />
    </>
  );
}
