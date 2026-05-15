import type { CollectionConfig } from "payload";

/**
 * Orders mirror confirmed Stripe Checkout sessions. The webhook handler at
 * /api/stripe/webhook is the writer; admins can browse and update fulfillment
 * status from the Payload admin.
 */
export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "stripeCheckoutSessionId",
    defaultColumns: ["email", "totalCents", "status", "createdAt"],
    description: "Confirmed shop orders (Stripe webhook → Payload).",
  },
  access: {
    // Only authenticated admins can list/edit. Webhook creates with admin context.
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // webhook authenticates separately via signature
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "email", type: "email", required: true },
    { name: "name", type: "text" },
    { name: "phone", type: "text" },

    {
      name: "items",
      type: "array",
      labels: { singular: "Item", plural: "Items" },
      fields: [
        { name: "productSlug", type: "text" },
        { name: "name", type: "text", required: true },
        { name: "quantity", type: "number", required: true, defaultValue: 1 },
        { name: "unitPriceCents", type: "number", required: true },
      ],
    },

    { name: "subtotalCents", type: "number", required: true, defaultValue: 0 },
    { name: "taxCents", type: "number", defaultValue: 0 },
    { name: "shippingCents", type: "number", defaultValue: 0 },
    { name: "totalCents", type: "number", required: true, defaultValue: 0 },
    { name: "currency", type: "text", defaultValue: "usd" },

    {
      name: "shippingAddress",
      type: "group",
      fields: [
        { name: "line1", type: "text" },
        { name: "line2", type: "text" },
        { name: "city", type: "text" },
        { name: "state", type: "text" },
        { name: "postalCode", type: "text" },
        { name: "country", type: "text", defaultValue: "US" },
      ],
    },

    { name: "stripeCheckoutSessionId", type: "text", unique: true, index: true },
    { name: "stripePaymentIntentId", type: "text", index: true },

    {
      name: "status",
      type: "select",
      defaultValue: "paid",
      options: [
        { label: "Paid", value: "paid" },
        { label: "Fulfilled", value: "fulfilled" },
        { label: "Shipped", value: "shipped" },
        { label: "Refunded", value: "refunded" },
      ],
    },

    { name: "notes", type: "textarea", admin: { description: "Internal admin notes" } },
  ],
  timestamps: true,
};
