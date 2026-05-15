"use client";

import * as React from "react";
import { CalculatorShell } from "./CalculatorShell";
import { EstimateGate } from "./EstimateGate";

type Market = "sevier" | "gatlinburg" | "pigeonForge" | "knoxville" | "lake";
type PropertyType = "cabin" | "lakeHome" | "condo" | "urban";

const MARKETS: { key: Market; label: string; adr: number; occ: number; sub: string }[] = [
  { key: "sevier", label: "Sevierville", adr: 285, occ: 0.66, sub: "Cabin / mountain area" },
  { key: "gatlinburg", label: "Gatlinburg", adr: 325, occ: 0.7, sub: "Downtown / Parkway" },
  { key: "pigeonForge", label: "Pigeon Forge", adr: 305, occ: 0.68, sub: "Family / attractions" },
  { key: "knoxville", label: "Knoxville urban", adr: 215, occ: 0.55, sub: "Old City / Downtown" },
  { key: "lake", label: "Lake (Tellico/Norris)", adr: 405, occ: 0.5, sub: "Highly seasonal" },
];

const PROPERTY_TYPES: { key: PropertyType; label: string; mult: number; sub: string }[] = [
  { key: "cabin", label: "Mountain cabin", mult: 1.0, sub: "Hot tub, views" },
  { key: "lakeHome", label: "Lake home", mult: 1.15, sub: "Dock, lake access" },
  { key: "condo", label: "Condo / townhome", mult: 0.85, sub: "Amenity building" },
  { key: "urban", label: "Urban house", mult: 0.95, sub: "Walkable downtown" },
];

const BEDROOM_MULTIPLIER: Record<number, number> = {
  1: 0.65,
  2: 0.85,
  3: 1.0,
  4: 1.18,
  5: 1.35,
  6: 1.5,
};

const dollars = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const pct = (n: number) => `${(n * 100).toFixed(0)}%`;

export function STRROICalculator() {
  const [price, setPrice] = React.useState(525_000);
  const [downPct, setDownPct] = React.useState(25);
  const [market, setMarket] = React.useState<Market>("gatlinburg");
  const [type, setType] = React.useState<PropertyType>("cabin");
  const [bedrooms, setBedrooms] = React.useState(3);

  const m = MARKETS.find((x) => x.key === market)!;
  const t = PROPERTY_TYPES.find((x) => x.key === type)!;
  const bedMult = BEDROOM_MULTIPLIER[bedrooms] ?? 1;

  const effectiveADR = m.adr * t.mult * bedMult;
  const annualNights = 365 * m.occ;
  const grossRevenue = effectiveADR * annualNights;

  // Operating costs as % of revenue (industry standard, Silverline managed average)
  const mgmtFee = grossRevenue * 0.22;
  const cleaning = grossRevenue * 0.1;
  const utilities = grossRevenue * 0.08;
  const maintenance = grossRevenue * 0.05;
  const insurance = grossRevenue * 0.03;
  const otherOpex = grossRevenue * 0.04;
  const totalOpex = mgmtFee + cleaning + utilities + maintenance + insurance + otherOpex;
  const netIncome = grossRevenue - totalOpex;

  const downPayment = price * (downPct / 100);
  const cashOnCash = downPayment > 0 ? netIncome / downPayment : 0;

  const inputs = (
    <div className="space-y-8">
      <Group title="1. Property + financing">
        <div className="space-y-4">
          <Range
            label="Purchase price"
            value={price}
            min={150_000}
            max={2_000_000}
            step={5_000}
            display={dollars(price)}
            onChange={setPrice}
          />
          <Range
            label="Down payment"
            value={downPct}
            min={5}
            max={50}
            step={5}
            display={`${downPct}% · ${dollars(price * (downPct / 100))}`}
            onChange={setDownPct}
          />
        </div>
      </Group>

      <Group title="2. Market">
        <RadioCards
          name="market"
          value={market}
          onChange={(v) => setMarket(v as Market)}
          options={MARKETS.map((mk) => ({
            value: mk.key,
            label: mk.label,
            sub: `${dollars(mk.adr)} ADR · ${pct(mk.occ)} occ`,
          }))}
        />
      </Group>

      <Group title="3. Property type">
        <RadioCards
          name="type"
          value={type}
          onChange={(v) => setType(v as PropertyType)}
          options={PROPERTY_TYPES.map((p) => ({
            value: p.key,
            label: p.label,
            sub: p.sub,
          }))}
        />
      </Group>

      <Group title="4. Bedrooms">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setBedrooms(n)}
              className={`rounded-full border px-5 py-2 text-[length:var(--text-15)] transition-colors ${
                bedrooms === n
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5 text-[var(--color-accent)]"
                  : "border-[var(--color-line)] bg-[var(--color-page)] text-[var(--color-text)]/85 hover:border-[var(--color-accent)]/50"
              }`}
            >
              {n}
              {n === 6 ? "+" : ""}
            </button>
          ))}
        </div>
      </Group>
    </div>
  );

  const estimate = (
    <EstimateGate
      preview={[
        { label: "Effective ADR", value: dollars(effectiveADR) },
        { label: "Annual booked nights", value: Math.round(annualNights).toString() },
        { label: "Gross revenue", value: dollars(grossRevenue) },
        { label: "Operating costs", value: `−${dollars(totalOpex)}` },
        { label: "Mgmt fee (22%)", value: `−${dollars(mgmtFee)}` },
      ]}
      result={{
        label: "Projected annual net income",
        value: `${dollars(netIncome)} · ${pct(cashOnCash)} cash-on-cash`,
        note: "Pre-tax, pre-mortgage. Cash-on-cash uses your down payment as the basis.",
      }}
      source="calc_str_roi"
      division="properties"
      cta={{ label: "Underwrite with our team", href: "/consultation" }}
    />
  );

  return (
    <CalculatorShell
      eyebrow="STR ROI calculator"
      headline="Will this property actually perform?"
      italicWord="actually"
      sub="Four inputs. Live underwriting tuned to Silverline's 40+ managed properties in East Tennessee. Drop your email to unlock the full projection."
      inputs={inputs}
      estimate={estimate}
      methodology={
        <Methodology
          rows={[
            "ADR and occupancy reflect rolling 12-month averages across Silverline's managed Sevier and Knox portfolios.",
            "Property-type multipliers (lake +15%, condo −15%, etc.) are derived from same-market comp data.",
            "Operating cost stack: 22% mgmt fee, 10% cleaning, 8% utilities, 5% maintenance, 3% insurance, 4% other.",
            "Cash-on-cash is gross before financing, taxes, and reserves. Live underwriting from our team adjusts for real numbers.",
          ]}
        />
      }
    />
  );
}

/* shared helpers (local to file) */

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

function Range({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-page)] px-5 py-4">
      <div className="flex items-baseline justify-between">
        <span className="text-[length:var(--text-15)] text-[var(--color-muted)]">{label}</span>
        <span className="font-display text-[length:var(--text-20)] text-[var(--color-text)]">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[var(--color-accent)]"
      />
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
