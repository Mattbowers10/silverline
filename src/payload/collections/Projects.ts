import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "division", "city", "completedAt"],
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    {
      name: "division",
      type: "select",
      required: true,
      options: [
        { label: "Pools", value: "pools" },
        { label: "Developments", value: "developments" },
        { label: "Properties", value: "properties" },
      ],
    },
    {
      name: "projectType",
      type: "select",
      options: [
        { label: "Gunite Pool", value: "pool-gunite" },
        { label: "Fiberglass Pool", value: "pool-fiberglass" },
        { label: "Pool Remodel", value: "pool-remodel" },
        { label: "Residential New Build", value: "residential" },
        { label: "Commercial Build", value: "commercial" },
        { label: "Home Remodel", value: "remodel" },
        { label: "Short-term Rental", value: "str" },
      ],
    },
    { name: "summary", type: "textarea" },
    { name: "story", type: "richText" },
    { name: "city", type: "text" },
    { name: "state", type: "text", defaultValue: "TN" },
    { name: "completedAt", type: "date" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    {
      name: "gallery",
      type: "array",
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    {
      name: "specs",
      type: "array",
      labels: { singular: "Spec", plural: "Specs" },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    { name: "featured", type: "checkbox", defaultValue: false },
  ],
};
