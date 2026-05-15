import { getPayload, type Where } from "payload";
import config from "@payload-config";

export type PostCategory =
  | "pools"
  | "developments"
  | "properties"
  | "company"
  | "guides";

export const POST_CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: "pools", label: "Pools" },
  { value: "developments", label: "Developments" },
  { value: "properties", label: "Properties" },
  { value: "guides", label: "Guides" },
  { value: "company", label: "Company news" },
];

export type PostSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category: PostCategory;
  publishedAt?: string;
  readingMinutes?: number;
  coverImageUrl?: string;
  coverImageAlt?: string;
};

export type PostFull = PostSummary & {
  content: unknown; // Lexical JSON
  author?: { name: string; role?: string };
};

type ListArgs = {
  category?: PostCategory;
  limit?: number;
};

/**
 * Query Payload `posts` collection. Gracefully returns [] on any failure
 * (e.g. DB not migrated, env missing) so pages still render.
 */
export async function listPosts({
  category,
  limit = 20,
}: ListArgs = {}): Promise<PostSummary[]> {
  try {
    const payload = await getPayload({ config });
    const where: Where = { status: { equals: "published" } };
    if (category) where.category = { equals: category };

    const res = await payload.find({
      collection: "posts",
      where,
      limit,
      sort: "-publishedAt",
      depth: 1,
    });

    return res.docs.map((d) => toSummary(d as unknown as Record<string, unknown>));
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<PostFull | null> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "posts",
      where: {
        slug: { equals: slug },
        status: { equals: "published" },
      },
      limit: 1,
      depth: 2,
    });
    const doc = res.docs[0];
    if (!doc) return null;
    return toFull(doc as unknown as Record<string, unknown>);
  } catch {
    return null;
  }
}

/* ---------- shape mappers ---------- */

type PayloadMedia = { url?: string; alt?: string } | string | null | undefined;
type PayloadTeam = { name?: string; role?: string } | string | null | undefined;

function mediaUrl(m: PayloadMedia): string | undefined {
  if (!m || typeof m === "string") return undefined;
  return m.url;
}
function mediaAlt(m: PayloadMedia): string | undefined {
  if (!m || typeof m === "string") return undefined;
  return m.alt;
}

function toSummary(doc: Record<string, unknown>): PostSummary {
  const cover = doc.coverImage as PayloadMedia;
  return {
    id: String(doc.id),
    title: String(doc.title ?? ""),
    slug: String(doc.slug ?? ""),
    excerpt: doc.excerpt ? String(doc.excerpt) : undefined,
    category: (doc.category as PostCategory) ?? "guides",
    publishedAt: doc.publishedAt ? String(doc.publishedAt) : undefined,
    readingMinutes: typeof doc.readingMinutes === "number" ? doc.readingMinutes : undefined,
    coverImageUrl: mediaUrl(cover),
    coverImageAlt: mediaAlt(cover),
  };
}

function toFull(doc: Record<string, unknown>): PostFull {
  const summary = toSummary(doc);
  const author = doc.author as PayloadTeam;
  return {
    ...summary,
    content: doc.content,
    author:
      author && typeof author !== "string"
        ? { name: String(author.name ?? ""), role: author.role ? String(author.role) : undefined }
        : undefined,
  };
}

/** Formatted publish date — "May 13, 2026". Falls back to "Coming soon". */
export function formatPubDate(iso?: string): string {
  if (!iso) return "Coming soon";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Coming soon";
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const CATEGORY_LABEL: Record<PostCategory, string> = Object.fromEntries(
  POST_CATEGORIES.map((c) => [c.value, c.label]),
) as Record<PostCategory, string>;
