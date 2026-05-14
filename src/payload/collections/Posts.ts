import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "status"],
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "URL slug (e.g. 'gunite-vs-fiberglass')" },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Pools", value: "pools" },
        { label: "Developments", value: "developments" },
        { label: "Properties", value: "properties" },
        { label: "Company News", value: "company" },
        { label: "Guides", value: "guides" },
      ],
    },
    { name: "excerpt", type: "textarea" },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "content", type: "richText" },
    { name: "author", type: "relationship", relationTo: "team" },
    { name: "publishedAt", type: "date" },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
    { name: "readingMinutes", type: "number" },
  ],
};
