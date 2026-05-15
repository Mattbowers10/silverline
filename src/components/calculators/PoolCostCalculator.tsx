"use client";

import * as React from "react";
import { CalculatorShell } from "./CalculatorShell";
import { EstimateGate } from "./EstimateGate";

type ConstructionType = "gunite" | "fiberglass";
type SizeKey = "small" | "medium" | "large" | "xl";
type Finish = "plaster" | "pebble" | "glass";
type DeckingKey = "none" | "concrete" | "stamped" | "paver" | "stone";

const SIZE_OPTIONS: { key: SizeKey; label: string; ft: string; gunite: number; fiberglass: number }[] = [
  { key: "small", label: "Small", ft: "12 × 24 ft", gunite: 85_000, fiberglass: 60_000 },
  { key: "medium", label: "Medium", ft: "14 × 28 ft", gunite: 105_000, fiberglass: 75_000 },
  { key: "large", label: "Large", ft: "16 × 32 ft", gunite: 135_000, fiberglass: 95_000 },
  { key: "xl", label: "Extra-large", ft: "18 × 36 ft", gunite: 175_000, fiberglass: 120_000 },
];

const FINISH_OPTIONS: { key: Finish; label: string; addCents: number }[] = [
  { key: "plaster", label: "Plaster", addCents: 0 },
  { key: "pebble", label: "Pebble Tec", addCents: 8_000 },
  { key: "glass", label: "Glass bead", addCents: 14_000 },
];

const DECK_OPTIONS: { key: DeckingKey; label: string; price: number }[] = [
  { key: "none", label: "No decking", price: 0 },
  { key: "concrete", label: "Standard concrete", price: 12_000 },
  { key: "stamped", label: "Stamped concrete", price: 22_000 },
  { key: "paver", label: "Pavers", price: 32_000 },
  { key: "stone", label: "Natural stone", price: 48_000 },
];

const ADDONS = [
  { key: "spa", label: "Spillover spa", price: 22_000 },
  { key: "waterFeature", label: "Water feature", price: 9_000 },
  { key: "automation", label: "Automation + LED", price: 6_500 },
  { key: "salt", label: "Salt system", price: 2_500 },
  { key: "heater", label: "Pool heater", price: 5_500 },
] as const;

const dollars = (n: number) => `$${n.toLocaleString("en-US")}`;
const range = (low: number, high: number) =>
  `${dollars(Math.round(low / 1000) * 1000)} – ${dollars(Math.round(high / 1000) * 1000)}`;

export function PoolCostCalculator() {
  const [type, setType] = React.useState<ConstructionType>("gunite");
  const [size, setSize] = React.useState<SizeKey>("medium");
  const [finish, setFinish] = React.useState<Finish>("pebble");
  const [decking, setDecking] = React.useState<DeckingKey>("stamped");
  const [addons, setAddons] = React.useState<Record<string, boolean>>({
    spa: false,
    waterFeature: false,
    automation: true,
    salt: false,
    heater: false,
  });

  const sizeOpt = SIZE_OPTIONS.find((s) => s.key === size)!;
  const finishOpt = FINISH_OPTIONS.find((f) => f.key === finish)!;
  const deckOpt = DECK_OPTIONS.find((d) => d.key === decking)!;

  const base = type === "gunite" ? sizeOpt.gunite : sizeOpt.fiberglass;
  const finishCost = type === "gunite" ? finishOpt.addCents : 0;
  const addonsCost = ADDONS.reduce(
    (sum, a) => sum + (addons[a.key] ? a.price : 0),
    0,
  );
  const subtotal = base + finishCost + addonsCost + deckOpt.price;

  const low = Math.round(subtotal * 0.92);
  const high = Math.round(subtotal * 1.12);

  const inputs = (
    <div className="space-y-8">
      <Group title="1. Construction method">
        <RadioCards
          name="type"
          value={type}
          onChange={(v) => setType(v as ConstructionType)}
          options={[
            { value: "gunite", label: "Gunite", sub: "Custom shape, premium" },
            { value: "fiberglass", label: "Fiberglass", sub: "Faster install, lower upkeep" },
          ]}
        />
      </Group>

      <Group title="2. Pool size">
        <RadioCards
          name="size"
          value={size}
          onChange={(v) => setSize(v as SizeKey)}
          options={SIZE_OPTIONS.map((s) => ({
            value: s.key,
            label: s.label,
            sub: s.ft,
          }))}
        />
      </Group>

      {type === "gunite" && (
        <Group title="3. Interior finish">
          <RadioCards
            name="finish"
            value={finish}
            onChange={(v) => setFinish(v as Finish)}
            options={FINISH_OPTIONS.map((f) => ({
              value: f.key,
              label: f.label,
              sub: f.addCents ? `+${dollars(f.addCents)}` : "Included",
            }))}
          />
        </Group>
      )}

      <Group title={`${type === "gunite" ? "4" : "3"}. Decking`}>
        <RadioCards
          name="decking"
          value={decking}
          onChange={(v) => setDecking(v as DeckingKey)}
          options={DECK_OPTIONS.map((d) => ({
            value: d.key,
            label: d.label,
            sub: d.price ? `+${dollars(d.price)}` : "Skip decking",
          }))}
        />
      </Group>

      <Group title={`${type === "gunite" ? "5" : "4"}. Add-ons`}>
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
              <span className="text-[var(--color-muted)]">+{dollars(a.price)}</span>
            </label>
          ))}
        </div>
      </Group>
    </div>
  );

  const estimate = (
    <EstimateGate
      preview={[
        { label: "Method", value: type === "gunite" ? "Gunite" : "Fiberglass" },
        { label: "Size", value: `${sizeOpt.label} · ${sizeOpt.ft}` },
        { label: "Base build", value: dollars(base) },
        ...(type === "gunite" && finishCost
          ? [{ label: "Finish upgrade", value: `+${dollars(finishCost)}` }]
          : []),
        { label: "Decking", value: deckOpt.price ? `+${dollars(deckOpt.price)}` : "—" },
        { label: "Add-ons", value: addonsCost ? `+${dollars(addonsCost)}` : "—" },
      ]}
      result={{
        label: "Estimated total cost",
        value: range(low, high),
        note: "Range reflects normal market variance and site conditions. Final quote is line-item and fixed.",
      }}
      source={type === "gunite" ? "calc_gunite" : "calc_fiberglass"}
      division="pools"
      cta={{ label: "Get a real quote", href: "/consultation" }}
    />
  );

  return (
    <CalculatorShell
      eyebrow="Pool cost estimator"
      headline="Gunite vs. fiberglass. Real numbers."
      italicWord="Real"
      sub="Five fields. A range tuned to East Tennessee market data and our last 50 builds. Drop your email to unlock the final estimate."
      inputs={inputs}
      estimate={estimate}
      methodology={
        <Methodology
          rows={[
            "Base prices reflect Silverline's last 24 months of completed pool builds across Knox, Blount, and Sevier counties.",
            "Gunite finishes assume standard waterline tile and coping. Premium tile, coping, or hardscape continuity is quoted separately.",
            "Decking pricing reflects 600 sqft of patio (or matching the pool footprint for larger pools). Smaller or larger decks scale linearly.",
            "Final quotes are fully line-item with no surprise change orders.",
          ]}
        />
      }
    />
  );
}

/* helpers */

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
