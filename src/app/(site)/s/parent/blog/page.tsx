import { PostCard } from "@/components/blog/PostCard";
import { CategoryNav } from "@/components/blog/CategoryNav";
import { EmptyPosts } from "@/components/blog/EmptyPosts";
import { listPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Deep End — Silverline blog",
  description:
    "Project breakdowns, cost guides, and East Tennessee market reporting from the Silverline team.",
  path: "/blog",
});

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await listPosts({ limit: 30 });
  const [feature, ...rest] = posts;

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <header className="max-w-3xl">
          <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            The Deep End
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            Build guides &amp; market{" "}
            <i className="font-display italic text-[var(--color-accent)]">reporting.</i>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
            Project breakdowns, cost guides, and East Tennessee market reporting from the
            Silverline team. Five new posts a week, written by people who actually do the
            work.
          </p>
        </header>

        <div className="mt-12">
          <CategoryNav active="all" />
        </div>

        {posts.length === 0 ? (
          <div className="mt-12">
            <EmptyPosts />
          </div>
        ) : (
          <>
            {feature ? (
              <div className="mt-12">
                <PostCard post={feature} size="feature" />
              </div>
            ) : null}

            {rest.length > 0 ? (
              <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <li key={p.id}>
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
