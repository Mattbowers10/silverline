import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PostBody } from "@/components/site/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { CTABand } from "@/components/sections";
import { PlaceholderArt } from "@/components/site/PlaceholderArt";
import { CATEGORY_LABEL, formatPubDate, getPost, listPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

type Args = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Args) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt ?? `${post.title} — from the Silverline team.`,
    path: `/blog/${slug}`,
  });
}

export const revalidate = 60;

export default async function PostPage({ params }: Args) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Pull related posts in the same category, excluding the current one.
  const related = (await listPosts({ category: post.category, limit: 4 }))
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const PLACEHOLDER_KIND = {
    pools: "pool",
    developments: "house",
    properties: "landscape",
    company: "tool",
    guides: "tool",
  } as const;

  return (
    <article>
      {/* Hero */}
      <header className="px-6 pb-12 pt-12 lg:pb-16 lg:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            <Link
              href={`/blog/category/${post.category}`}
              className="text-[var(--color-accent)] hover:underline"
            >
              {CATEGORY_LABEL[post.category]}
            </Link>
            <span aria-hidden> · </span>
            {formatPubDate(post.publishedAt)}
            {post.readingMinutes ? (
              <>
                <span aria-hidden> · </span>≈ {post.readingMinutes} min read
              </>
            ) : null}
          </p>

          <h1 className="mt-6 font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="mt-6 text-pretty text-[length:var(--text-20)] leading-relaxed text-[var(--color-muted)]">
              {post.excerpt}
            </p>
          ) : null}
        </div>
      </header>

      {/* Cover */}
      <div className="px-6">
        <div className="relative mx-auto aspect-[16/9] max-w-[1100px] overflow-hidden rounded-2xl border border-[var(--color-line)]">
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt ?? post.title}
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="object-cover"
            />
          ) : (
            <PlaceholderArt kind={PLACEHOLDER_KIND[post.category]} seed={hashSeed(post.slug)} />
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-2xl">
          <PostBody content={post.content} />

          {post.author ? (
            <div className="mt-16 flex items-center gap-4 border-t border-[var(--color-line)] pt-8">
              <span
                aria-hidden
                className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-panel)] text-[length:var(--text-13)] text-[var(--color-muted)]"
              >
                {post.author.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <p className="text-[length:var(--text-15)] font-medium text-[var(--color-text)]">
                  {post.author.name}
                </p>
                {post.author.role ? (
                  <p className="text-[length:var(--text-13)] text-[var(--color-muted)]">
                    {post.author.role}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 ? (
        <section className="border-t border-[var(--color-line)] px-6 py-20 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-[length:var(--text-32)] leading-tight tracking-tight md:text-[length:var(--text-40)]">
                More from <i className="font-display italic text-[var(--color-accent)]">
                  {CATEGORY_LABEL[post.category].toLowerCase()}.
                </i>
              </h2>
              <Link
                href={`/blog/category/${post.category}`}
                className="text-[length:var(--text-15)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
              >
                See all {CATEGORY_LABEL[post.category].toLowerCase()} posts →
              </Link>
            </header>
            <ul className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.id}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CTABand
        eyebrow="Got a project in mind?"
        headline="Tell us about it."
        italicWord="it."
        sub="Real humans on the other end. Most consultation requests get a reply within a single business day."
        emailCapture={{ submitLabel: "Request consultation" }}
      />
    </article>
  );
}

function hashSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return (Math.abs(h) % 9) + 1;
}
