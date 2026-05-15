"use client";

import * as React from "react";
import { CalculatorShell } from "./CalculatorShell";
import { EstimateGate } from "./EstimateGate";

type Tier = "standard" | "premium" | "luxury" | "ultra";
type Lot = "flat" | "sloped" | "lakefront" | "mountain";

const TIER_OPTIONS: { key: Tier; label: string; pricePerSqft: number; sub: string }[] = [
  { key: "standard", label: "Standard", pricePerSqft: 275, sub: "Quality production-grade finishes" },
  { key: "premium", label: "Premium", pricePerSqft: 360, sub: "Mid-market custom standard" },
  { key: "luxury", label: "Luxury", pricePerSqft: 480, sub: "Premium materials, custom millwork" },
  { key: "ultra", label: "Ultra-luxury", pricePerSqft: 650, sub: "Bespoke architecture, top-tier finish" },
];

const LOT_OPTIONS: { key: Lot; label: string; multiplier: number; sub: string }[] = [
  { key: "flat", label: "Flat lot", multiplier: 1.0, sub: "Knox / West Knox urban" },
  { key: "sloped", label: "Sloped lot", multiplier: 1.15, sub: "Retaining walls, drainage" },
  { key: "lakefront", label: "Lakefront", multiplier: 1.25, sub: "Tellico / Norris / Watts Bar" },
  { key: "mountain", label: "Mountain", multiplier: 1.3, sub: "Sevier / Blount / Cocke ridges" },
];

const ADDONS = [
  { key: "basement", label: "Finished basement", extraPerSqft: 110 },
  { key: "garage", label: "3-car garage", extraFixed: 38_000 },
  { key: "primarySuite", label: "Resort primary suite", extraFixed: 65_000 },
  { key: "outdoor", label: "Outdoor living + kitchen", extraFixed: 55_000 },
] as const;

const dollars = (n: number) => `$${n.toLocaleString("en-US")}`;
const range = (low: number, high: number) =>
  `${dollars(Math.round(low / 1000) * 1000)} – ${dollars(Math.round(high / 1000) * 1000)}`;

export function HomeBuildCalculator() {
  const [sqft, setSqft] = React.useState(3200);
  const [tier, setTier] = React.useState<Tier>("premium");
  const [lot, setLot] = React.useState<Lot>("flat");
  const [addons, setAddons] = React.useState<Record<string, boolean>>({
    basement: false,
    garage: true,
    primarySuite: false,
    outdoor: false,
  });

  const tierOpt = TIER_OPTIONS.find((t) => t.key === tier)!;
  const lotOpt = LOT_OPTIONS.find((l) => l.key === lot)!;

  const baseCost = sqft * tierOpt.pricePerSqft * lotOpt.multiplier;
  const addonsCost = ADDONS.reduce((sum, a) => {
    if (!addons[a.key]) return sum;
    if ("extraPerSqft" in a && a.extraPerSqft) return sum + sqft * a.extraPerSqft;
    if ("extraFixed" in a && a.extraFixed) return sum + a.extraFixed;
    return sum;
  }, 0);
  const subtotal = baseCost + addonsCost;
  const low = subtotal * 0.9;
  const high = subtotal * 1.15;
  const effective$Sqft = subtotal / sqft;

  const inputs = (
    <div className="space-y-8">
      <Group title="1. Total square footage">
        <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-page)] px-5 py-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[length:var(--text-15)] text-[var(--color-muted)]">Finished sqft</span>
            <span className="font-display text-[length:var(--text-24)] text-[var(--color-text)]">
              {sqft.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={1500}
            max={8000}
            step={100}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
            className="mt-3 w-full accent-[var(--color-accent)]"
          />
          <div className="mt-1 flex justify-between text-[length:var(--text-13)] text-[var(--color-muted)]">
            <span>1,500</span>
            <span>8,000+</span>
          </div>
        </div>
      </Group>

      <Group title="2. Finish tier">
        <RadioCards
          name="tier"
          value={tier}
          onChange={(v) => setTier(v as Tier)}
          options={TIER_OPTIONS.map((t) => ({
            value: t.key,
            label: t.label,
            sub: `${dollars(t.pricePerSqft)}/sqft · ${t.sub}`,
          }))}
        />
      </Group>

      <Group title="3. Lot type">
        <RadioCards
          name="lot"
          value={lot}
          onChange={(v) => setLot(v as Lot)}
          options={LOT_OPTIONS.map((l) => ({
            value: l.key,
            label: l.label,
            sub: `${Math.round((l.multiplier - 1) * 100)}% adj · ${l.sub}`,
          }))}
        />
      </Group>

      <Group title="4. Major features">
        <div className="grid gap-2 sm:grid-cols-2">
          {ADDONS.map((a) => (
            <label
              key={a.key}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-[var(--color-line)] bg-[var(--color-page)] px-4 py-3 text-[length:var(--text-15)] transition-colors hover:border-[var(--color-accent)]/50 has-[:checked]:border-[var(--color-accent)] has-[:checked]:bg-[var(--color-accent)]/5"
            >
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!addons[a.key]}
                  onChange={(e) => setAddons((s) => ({ ...s, [a.key]: e.target.checked }))}
                  className="h-4 w-4 accent-[var(--color-accent)]"
                />
                {a.label}
              </span>
              <span className="text-[var(--color-muted)]">
                {"extraPerSqft" in a && a.extraPerSqft ? `+${dollars(a.extraPerSqft)}/sqft` : null}
                {"extraFixed" in a && a.extraFixed ? `+${dollars(a.extraFixed)}` : null}
              </span>
            </label>
          ))}
        </div>
      </Group>
    </div>
  );

  const estimate = (
    <EstimateGate
      preview={[
        { label: "Sqft", value: sqft.toLocaleString() },
        { label: "Tier", value: tierOpt.label },
        { label: "Lot adjustment", value: `+${Math.round((lotOpt.multiplier - 1) * 100)}%` },
        { label: "Base build", value: dollars(Math.round(baseCost)) },
        { label: "Add-ons", value: addonsCost ? `+${dollars(addonsCost)}` : "—" },
        { label: "Effective $/sqft", value: dollars(Math.round(effective$Sqft)) },
      ]}
      result={{
        label: "Estimated total build cost",
        value: range(low, high),
        note: "Excludes land. Includes design, materials, labor, permits, and a typical site-conditions allowance.",
      }}
      source="calc_home_build"
      division="developments"
      cta={{ label: "Get a real proposal", href: "/consultation" }}
    />
  );

  return (
    <CalculatorShell
      eyebrow="Home build cost estimator"
      headline="A real number. In sixty seconds."
      italicWord="sixty"
      sub="Four inputs. A range tuned to East Tennessee market data and Silverline's last 24 months of completed builds. Drop your email to unlock the full estimate."
      inputs={inputs}
      estimate={estimate}
      methodology={
        <Methodology
          rows={[
            "Base $/sqft tiers reflect Silverline's last 50 completed builds across Knox, Blount, Loudon, and Sevier counties.",
            "Lot adjustments cover structural and drainage costs typical of each terrain class — actual costs vary with grade and soil.",
            "Finished-basement add cost is per-sqft of basement (assumed at 50% of main-floor sqft).",
            "Numbers exclude land acquisition and major site work (private wells, septic, road cuts).",
          ]}
        />
      }
    />
  );
}

/* shared helpers (kept local to avoid cross-file coupling) */

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
        {title}
      </p>
      {children}
    </div>
  );
}

function RadioCards<T extends string>({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; sub?: string }[];
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => (
        <label
          key={o.value}
          className="flex cursor-pointer items-start gap-3 rounded-lg border border-[var(--color-line)] bg-[var(--color-page)] px-4 py-3 text-[length:var(--text-15)] transition-colors hover:border-[var(--color-accent)]/50 has-[:checked]:border-[var(--color-accent)] has-[:checked]:bg-[var(--color-accent)]/5"
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
          />
          <span>
            <span className="block text-[var(--color-text)]">{o.label}</span>
            {o.sub ? (
              <span className="mt-0.5 block text-[length:var(--text-13)] text-[var(--color-muted)]">
                {o.sub}
              </span>
            ) : null}
          </span>
        </label>
      ))}
    </div>
  );
}

function Methodology({ rows }: { rows: string[] }) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)]/40 p-8">
      <p className="mb-4 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
        How this is calculated
      </p>
      <ul className="space-y-3 text-[length:var(--text-15)] leading-relaxed text-[var(--color-muted)]">
        {rows.map((r) => (
          <li key={r} className="flex gap-3">
            <span aria-hidden className="text-[var(--color-accent)]">·</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
