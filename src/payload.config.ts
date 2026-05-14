import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "@/payload/collections/Users";
import { Media } from "@/payload/collections/Media";
import { Posts } from "@/payload/collections/Posts";
import { Projects } from "@/payload/collections/Projects";
import { Testimonials } from "@/payload/collections/Testimonials";
import { Team } from "@/payload/collections/Team";
import { Products } from "@/payload/collections/Products";
import { Pages } from "@/payload/collections/Pages";
import { Leads } from "@/payload/collections/Leads";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
  secret: process.env.PAYLOAD_SECRET || "",
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — Silverline CMS",
    },
  },
  editor: lexicalEditor({}),
  collections: [
    Pages,
    Posts,
    Projects,
    Testimonials,
    Team,
    Products,
    Leads,
    Media,
    Users,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, "..", "schema.graphql"),
  },
  cors: [
    "http://localhost:3000",
    "https://silverlineind.com",
    "https://pools.silverlineind.com",
    "https://developments.silverlineind.com",
    "https://properties.silverlineind.com",
  ],
});
