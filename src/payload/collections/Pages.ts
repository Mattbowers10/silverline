import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "tenant", "slug", "status"],
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true },
    {
      name: "tenant",
      type: "select",
      required: true,
      defaultValue: "parent",
      options: [
        { label: "Parent (silverlineind.com)", value: "parent" },
        { label: "Pools", value: "pools" },
        { label: "Developments", value: "developments" },
        { label: "Properties", value: "properties" },
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "metaTitle", type: "text" },
        { name: "metaDescription", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "content",
      type: "richText",
      admin: { description: "Free-form content for pages outside the templated sections" },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
  ],
  indexes: [{ fields: ["tenant", "slug"], unique: true }],
};
