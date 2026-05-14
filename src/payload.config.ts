import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./payload/collections/Users.js";
import { Media } from "./payload/collections/Media.js";
import { Posts } from "./payload/collections/Posts.js";
import { Projects } from "./payload/collections/Projects.js";
import { Testimonials } from "./payload/collections/Testimonials.js";
import { Team } from "./payload/collections/Team.js";
import { Products } from "./payload/collections/Products.js";
import { Pages } from "./payload/collections/Pages.js";
import { Leads } from "./payload/collections/Leads.js";

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
