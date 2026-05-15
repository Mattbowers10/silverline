import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import type { SessionUser } from "@/lib/auth";

export function DashboardChrome({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[var(--color-page)]/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1320px] items-center justify-between px-6 lg:h-16">
          <div className="flex items-center gap-6">
            <Logo tenant="parent" />
            <span className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
              · Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-[length:var(--text-13)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              CMS admin
            </Link>
            <span aria-hidden className="h-4 w-px bg-[var(--color-line)]" />
            <div className="hidden text-right md:block">
              <p className="text-[length:var(--text-13)] text-[var(--color-text)]">
                {user.name || user.email}
              </p>
              <p className="text-[length:var(--text-13)] text-[var(--color-muted)]">
                {user.role ?? "editor"}
              </p>
            </div>
            <Link
              href="/admin/logout"
              className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-[length:var(--text-13)] text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Sign out
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1320px] px-6 py-10 lg:py-12">
        {children}
      </main>
    </div>
  );
}
