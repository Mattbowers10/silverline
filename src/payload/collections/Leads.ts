import type { CollectionConfig } from "payload";

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "source", "division", "budgetBand", "createdAt"],
    description: "Mirror of leads sent to GoHighLevel for audit/recovery",
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
};
