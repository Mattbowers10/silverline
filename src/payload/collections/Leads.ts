import type { CollectionConfig } from "payload";

export const LEAD_STATUSES = [
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Consultation booked", value: "consultation_booked" },
  { label: "Proposal sent", value: "proposal" },
  { label: "Won", value: "won" },
  { label: "Lost", value: "lost" },
] as const;

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "status", "source", "division", "budgetBand", "createdAt"],
    description: "Lead inbox — mirrored to GoHighLevel and worked from /dashboard/leads",
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
  },
  fields: [
    { name: "email", type: "email", required: true },
    { name: "name", type: "text" },
    { name: "phone", type: "text" },
    { name: "zip", type: "text" },
    { name: "outOfServiceArea", type: "checkbox", defaultValue: false },
    {
      name: "division",
      type: "select",
      options: [
        { label: "Pools", value: "pools" },
        { label: "Developments", value: "developments" },
        { label: "Properties", value: "properties" },
        { label: "Multiple / Unsure", value: "multi" },
      ],
    },
    {
      name: "budgetBand",
      type: "select",
      options: [
        { label: "$50K – $150K", value: "50-150" },
        { label: "$150K – $500K", value: "150-500" },
        { label: "$500K+", value: "500plus" },
      ],
    },
    { name: "timeline", type: "text" },
    { name: "message", type: "textarea" },
    {
      name: "source",
      type: "text",
      admin: { description: "e.g. hero_parent, calc_gunite, exit_intent_pools" },
    },

    /* ─── Pipeline status ────────────────────────────────────────────── */
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      required: true,
      options: LEAD_STATUSES as unknown as { label: string; value: string }[],
      admin: { description: "Sales pipeline stage — updated from /dashboard/leads/[id]" },
    },
    {
      name: "statusChangedAt",
      type: "date",
      admin: { description: "Auto-stamped when status changes" },
    },
    {
      name: "notes",
      type: "array",
      labels: { singular: "Note", plural: "Notes" },
      admin: { description: "Internal sales notes" },
      fields: [
        { name: "body", type: "textarea", required: true },
        { name: "author", type: "text" },
        { name: "createdAt", type: "date" },
      ],
    },

    /* ─── GHL sync ──────────────────────────────────────────────────── */
    {
      name: "ghlSyncStatus",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Synced", value: "synced" },
        { label: "Failed", value: "failed" },
      ],
    },
    { name: "ghlContactId", type: "text" },
  ],
  timestamps: true,
};
