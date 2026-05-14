import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "customerName",
    defaultColumns: ["customerName", "division", "rating"],
  },
  access: { read: () => true },
  fields: [
    { name: "customerName", type: "text", required: true },
    { name: "customerLocation", type: "text", admin: { description: "City, TN" } },
    { name: "customerPhoto", type: "upload", relationTo: "media" },
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
    { name: "projectType", type: "text" },
    { name: "rating", type: "number", min: 1, max: 5, defaultValue: 5 },
    { name: "quote", type: "textarea", required: true },
    { name: "longerStory", type: "richText" },
    {
      name: "linkedProject",
      type: "relationship",
      relationTo: "projects",
    },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "publishedAt", type: "date" },
  ],
};
