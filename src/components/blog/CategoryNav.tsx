import Link from "next/link";
import { cn } from "@/lib/cn";
import { POST_CATEGORIES, type PostCategory } from "@/lib/posts";

type Props = {
  active?: PostCategory | "all";
};

const ALL: { value: "all"; label: string } = { value: "all", label: "All posts" };

export function CategoryNav({ active = "all" }: Props) {
  const items = [ALL, ...POST_CATEGORIES] as const;
  return (
    <nav aria-label="Blog categories" className="flex flex-wrap gap-2">
      {items.map((c) => {
        const isActive = active === c.value;
        const href = c.value === "all" ? "/blog" : `/blog/category/${c.value}`;
        return (
          <Link
            key={c.value}
            href={href}
            className={cn(
              "rounded-full border px-5 py-2 text-[length:var(--text-15)] transition-colors",
              isActive
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5 text-[var(--color-accent)]"
                : "border-[var(--color-line)] bg-[var(--color-page)] text-[var(--color-text)]/85 hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text)]",
            )}
          >
            {c.label}
          </Link>
        );
      })}
    </nav>
  );
}
