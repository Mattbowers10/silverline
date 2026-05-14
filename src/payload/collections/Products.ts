import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "priceCents", "active"],
  },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Pool Care", value: "pool-care" },
        { label: "Parts & Equipment", value: "parts" },
        { label: "Branded", value: "branded" },
        { label: "Gift Cards", value: "gift-cards" },
      ],
    },
    { name: "description", type: "richText" },
    { name: "shortDescription", type: "textarea" },
    {
      name: "priceCents",
      type: "number",
      required: true,
      admin: { description: "Price in cents (e.g. 4999 = $49.99)" },
    },
    { name: "stripePriceId", type: "text", admin: { description: "Synced from Stripe" } },
    { name: "stripeProductId", type: "text" },
    { name: "images", type: "array", fields: [{ name: "image", type: "upload", relationTo: "media", required: true }] },
    { name: "inventory", type: "number", defaultValue: 0 },
    { name: "active", type: "checkbox", defaultValue: true },
  ],
};
