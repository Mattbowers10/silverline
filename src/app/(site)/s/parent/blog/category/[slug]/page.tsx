import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryNav } from "@/components/blog/CategoryNav";
import { EmptyPosts } from "@/components/blog/EmptyPosts";
import {
  CATEGORY_LABEL,
  POST_CATEGORIES,
  listPosts,
  type PostCategory,
} from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

type Args = { params: Promise<{ slug: string }> };

const VALID = new Set<PostCategory>(POST_CATEGORIES.map((c) => c.value));

export async function generateStaticParams() {
  return POST_CATEGORIES.map((c) => ({ slug: c.value }));
}

export async function generateMetadata({ params }: Args) {
  const { slug } = await params;
  if (!VALID.has(slug as PostCategory)) return {};
  const label = CATEGORY_LABEL[slug as PostCategory];
  return buildMetadata({
    title: `${label} posts — The Deep End`,
    description: `${label} build guides, cost breakdowns, and East Tennessee market reporting from Silverline.`,
    path: `/blog/category/${slug}`,
  });
}

export const revalidate = 60;

export default async function CategoryPage({ params }: Args) {
  const { slug } = await params;
  if (!VALID.has(slug as PostCategory)) notFound();
  const category = slug as PostCategory;
  const label = CATEGORY_LABEL[category];
  const posts = await listPosts({ category, limit: 30 });

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <header className="max-w-3xl">
          <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            The Deep End · {label}
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            <i className="font-display italic text-[var(--color-accent)]">{label}.</i>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
            Every {label.toLowerCase()} post from the Silverline team.
          </p>
        </header>

        <div className="mt-12">
          <CategoryNav active={category} />
        </div>

        {posts.length === 0 ? (
          <div className="mt-12">
            <EmptyPosts category={label.toLowerCase()} />
          </div>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.id}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
