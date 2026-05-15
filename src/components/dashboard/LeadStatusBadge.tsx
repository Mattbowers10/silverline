import { cn } from "@/lib/cn";

export const STATUS_LABEL: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  consultation_booked: "Consultation booked",
  proposal: "Proposal sent",
  won: "Won",
  lost: "Lost",
};

const STATUS_TONE: Record<string, string> = {
  new: "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
  contacted: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  consultation_booked: "border-violet-500/30 bg-violet-500/10 text-violet-200",
  proposal: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  won: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  lost: "border-red-500/30 bg-red-500/10 text-red-300",
};

type Props = {
  status?: string;
  size?: "sm" | "md";
};

export function LeadStatusBadge({ status = "new", size = "sm" }: Props) {
  const tone = STATUS_TONE[status] ?? "border-[var(--color-line)] text-[var(--color-muted)]";
  return (
    <span
      className={cn(
        "inline-flex rounded-full border",
        size === "sm" && "px-2.5 py-0.5 text-[length:var(--text-13)]",
        size === "md" && "px-3 py-1 text-[length:var(--text-15)]",
        tone,
      )}
    >
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}
