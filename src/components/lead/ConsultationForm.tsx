"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { normalizeZip, isInServiceArea } from "@/lib/serviceArea";

type Division = "pools" | "developments" | "properties" | "multi";

const DIVISION_OPTIONS: { value: Division; label: string }[] = [
  { value: "pools", label: "Pools" },
  { value: "developments", label: "Custom home or remodel" },
  { value: "properties", label: "Real estate or STR" },
  { value: "multi", label: "Multiple / not sure" },
];

const BUDGET_OPTIONS = [
  { value: "50-150", label: "$50K – $150K" },
  { value: "150-500", label: "$150K – $500K" },
  { value: "500plus", label: "$500K+" },
] as const;

const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3mo", label: "Within 1–3 months" },
  { value: "3-6mo", label: "Within 3–6 months" },
  { value: "6-12mo", label: "6–12 months out" },
  { value: "exploring", label: "Just exploring" },
] as const;

type Props = {
  /** Lead-source label written to GHL + Payload (e.g. "consultation_parent"). */
  source?: string;
  /** Optional default division when arriving from a subdomain. */
  defaultDivision?: Division;
  /** Optional default email (pre-filled from hero pill). */
  defaultEmail?: string;
};

export function ConsultationForm({
  source = "consultation_parent",
  defaultDivision,
  defaultEmail = "",
}: Props) {
  const [zipValid, setZipValid] = React.useState<null | boolean>(null);
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("source", source);

    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.ok) {
        setErrors(data.errors ?? { _form: "Something went wrong. Try again." });
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrors({ _form: "Network error. Try again." });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-10 text-center">
        <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-accent)]">
          Received
        </p>
        <h2 className="mt-4 font-display text-[length:var(--text-32)] leading-tight tracking-tight md:text-[length:var(--text-40)]">
          Thanks. We&apos;ll be in touch within one business day.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[length:var(--text-16)] text-[var(--color-muted)]">
          A real Silverline team member is reviewing your details. Look for a reply at
          the email you provided — and add hello@silverlineind.com to your contacts so it
          doesn&apos;t land in spam.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-6 md:p-10"
    >
      {/* Section: Contact */}
      <Section title="Contact details" first>
        <Field label="Name" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Your full name"
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={defaultEmail}
            className={fieldClass}
            placeholder="you@example.com"
          />
        </Field>

        <Field label="Phone" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="(555) 123-4567"
          />
        </Field>

        <Field
          label="ZIP code"
          htmlFor="zip"
          error={errors.zip}
          hint={
            zipValid === true
              ? "✓ Inside our 90-minute service area."
              : zipValid === false
              ? "Outside our usual area — we still review every lead, but timing may shift."
              : undefined
          }
          hintTone={zipValid === true ? "good" : zipValid === false ? "warn" : undefined}
        >
          <input
            id="zip"
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={10}
            className={fieldClass}
            placeholder="37902"
            onChange={(e) => {
              const v = normalizeZip(e.target.value);
              if (v.length === 5) setZipValid(isInServiceArea(v));
              else setZipValid(null);
            }}
          />
        </Field>
      </Section>

      {/* Section: Project */}
      <Section title="About your project">
        <Field label="What are you building?" htmlFor="division" error={errors.division}>
          <RadioGroup name="division" options={DIVISION_OPTIONS} defaultValue={defaultDivision} />
        </Field>

        <Field label="Project budget" htmlFor="budgetBand" error={errors.budgetBand}>
          <RadioGroup name="budgetBand" options={BUDGET_OPTIONS} />
        </Field>

        <Field label="Timeline" htmlFor="timeline" error={errors.timeline}>
          <RadioGroup name="timeline" options={TIMELINE_OPTIONS} />
        </Field>
      </Section>

      {/* Section: Message */}
      <Section title="Anything we should know? (optional)">
        <Field label="Message" htmlFor="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={cn(fieldClass, "resize-y")}
            placeholder="Lot details, inspiration, deadlines, questions…"
          />
        </Field>
      </Section>

      {errors._form ? (
        <p className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-[length:var(--text-15)] text-red-300">
          {errors._form}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-line)] pt-6">
        <p className="text-[length:var(--text-13)] text-[var(--color-muted)]">
          By submitting, you agree to be contacted by Silverline. We never sell your data.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-white px-6 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)] disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Request consultation"}
        </button>
      </div>
    </form>
  );
}

/* ------------- Internal primitives ------------- */

const fieldClass =
  "w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-page)] px-4 py-3 text-[length:var(--text-15)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none";

function Section({
  title,
  first,
  children,
}: {
  title: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset className={cn(!first && "mt-10 border-t border-[var(--color-line)] pt-10")}>
      <legend className="mb-6 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
        {title}
      </legend>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  hintTone,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  hintTone?: "good" | "warn";
  children: React.ReactNode;
}) {
  return (
    <div className="md:col-span-2">
      <label htmlFor={htmlFor} className="mb-2 block text-[length:var(--text-15)] text-[var(--color-text)]/85">
        {label}
      </label>
      {children}
      {hint ? (
        <p
          className={cn(
            "mt-2 text-[length:var(--text-13)]",
            hintTone === "good" && "text-[var(--color-accent)]",
            hintTone === "warn" && "text-amber-300",
            !hintTone && "text-[var(--color-muted)]",
          )}
        >
          {hint}
        </p>
      ) : null}
      {error ? <p className="mt-2 text-[length:var(--text-13)] text-red-300">{error}</p> : null}
    </div>
  );
}

function RadioGroup<T extends string>({
  name,
  options,
  defaultValue,
}: {
  name: string;
  options: readonly { value: T; label: string }[];
  defaultValue?: T;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => (
        <label
          key={o.value}
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--color-line)] bg-[var(--color-page)] px-4 py-3 text-[length:var(--text-15)] transition-colors hover:border-[var(--color-accent)]/50 has-[:checked]:border-[var(--color-accent)] has-[:checked]:bg-[var(--color-accent)]/5"
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            defaultChecked={defaultValue === o.value}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  );
}
