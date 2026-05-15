import Link from "next/link";
import Image from "next/image";
import { PlaceholderArt } from "@/components/site/PlaceholderArt";
import { CATEGORY_LABEL, formatPubDate, type PostSummary } from "@/lib/posts";

const PLACEHOLDER_KIND_BY_CATEGORY = {
  pools: "pool",
  developments: "house",
  properties: "landscape",
  company: "tool",
  guides: "tool",
} as const;

export function PostCard({
  post,
  size = "default",
}: {
  post: PostSummary;
  size?: "default" | "feature";
}) {
  const feature = size === "feature";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-highlight group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] transition-colors hover:border-[var(--color-accent)]/40"
    >
      <div className={`relative ${feature ? "aspect-[16/9]" : "aspect-[16/10]"} overflow-hidden bg-black/30`}>
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt ?? post.title}
            fill
            sizes={feature ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderArt
            kind={PLACEHOLDER_KIND_BY_CATEGORY[post.category] ?? "tool"}
            seed={hashSeed(post.slug)}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[length:var(--text-13)] uppercase tracking-[0.18em] text-[var(--color-muted)]">
          <span className="text-[var(--color-accent)]">{CATEGORY_LABEL[post.category]}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.publishedAt}>{formatPubDate(post.publishedAt)}</time>
        </div>
        <h3
          className={`mt-3 font-display leading-snug tracking-tight ${
            feature
              ? "text-[length:var(--text-32)] md:text-[length:var(--text-40)]"
              : "text-[length:var(--text-20)] md:text-[length:var(--text-24)]"
          }`}
        >
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-3 line-clamp-3 text-[length:var(--text-15)] leading-relaxed text-[var(--color-muted)]">
            {post.excerpt}
          </p>
        ) : null}
        {post.readingMinutes ? (
          <p className="mt-auto pt-5 text-[length:var(--text-13)] text-[var(--color-muted)]">
            ≈ {post.readingMinutes} min read
          </p>
        ) : null}
      </div>
    </Link>
  );
}

function hashSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h) % 9 + 1;
}
