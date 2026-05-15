import { getPayload, type Where } from "payload";
import config from "@payload-config";

export type ProductCategory = "pool-care" | "parts" | "branded" | "gift-cards";

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "pool-care", label: "Pool care" },
  { value: "parts", label: "Parts & equipment" },
  { value: "branded", label: "Branded" },
  { value: "gift-cards", label: "Gift cards" },
];

export const PRODUCT_CATEGORY_LABEL: Record<ProductCategory, string> =
  Object.fromEntries(PRODUCT_CATEGORIES.map((c) => [c.value, c.label])) as Record<
    ProductCategory,
    string
  >;

export type ProductImage = { url?: string; alt?: string };

export type Product = {
  id: string;
  name: string;
  slug: string;
  category?: ProductCategory;
  shortDescription?: string;
  description?: unknown; // Lexical JSON
  priceCents: number;
  stripePriceId?: string;
  inventory: number;
  active: boolean;
  images: ProductImage[];
};

type ListArgs = {
  category?: ProductCategory;
  limit?: number;
};

export async function listProducts({
  category,
  limit = 40,
}: ListArgs = {}): Promise<Product[]> {
  try {
    const payload = await getPayload({ config });
    const where: Where = { active: { equals: true } };
    if (category) where.category = { equals: category };

    const res = await payload.find({
      collection: "products",
      where,
      limit,
      sort: "name",
      depth: 1,
    });

    return res.docs.map((d) => toProduct(d as unknown as Record<string, unknown>));
  } catch {
    return [];
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "products",
      where: { slug: { equals: slug }, active: { equals: true } },
      limit: 1,
      depth: 1,
    });
    const doc = res.docs[0];
    if (!doc) return null;
    return toProduct(doc as unknown as Record<string, unknown>);
  } catch {
    return null;
  }
}

type PayloadMedia = { url?: string; alt?: string } | string | null | undefined;

function mediaFromRel(m: PayloadMedia): ProjectImageFallback | undefined {
  if (!m || typeof m === "string") return undefined;
  return { url: m.url, alt: m.alt };
}
type ProjectImageFallback = { url?: string; alt?: string };

function toProduct(doc: Record<string, unknown>): Product {
  const imagesRaw = Array.isArray(doc.images) ? doc.images : [];
  const images = (imagesRaw as { image?: PayloadMedia }[])
    .map((row) => mediaFromRel(row.image))
    .filter((x): x is ProductImage => !!x);

  return {
    id: String(doc.id),
    name: String(doc.name ?? ""),
    slug: String(doc.slug ?? ""),
    category: doc.category as ProductCategory | undefined,
    shortDescription: doc.shortDescription ? String(doc.shortDescription) : undefined,
    description: doc.description,
    priceCents: typeof doc.priceCents === "number" ? doc.priceCents : 0,
    stripePriceId: doc.stripePriceId ? String(doc.stripePriceId) : undefined,
    inventory: typeof doc.inventory === "number" ? doc.inventory : 0,
    active: doc.active !== false,
    images,
  };
}
