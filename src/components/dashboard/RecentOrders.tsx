import Link from "next/link";
import { cn } from "@/lib/cn";
import { EmptyNudge } from "./EmptyNudge";
import { formatPrice } from "@/lib/stripe";
import type { OrderRow } from "@/lib/dashboard";

export function RecentOrders({ orders }: { orders: OrderRow[] }) {
  if (orders.length === 0) {
    return (
      <EmptyNudge
        title="No orders in this window."
        body="Stripe Checkout sessions land here once products are published with Stripe price IDs."
        cta={{ label: "Manage products in CMS", href: "/admin/collections/products" }}
      />
    );
  }

  return (
    <ul className="divide-y divide-[var(--color-line)]">
      {orders.map((o) => (
        <li key={o.id}>
          <Link
            href={`/admin/collections/orders/${o.id}`}
            className="flex items-center justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-white/[0.02]"
          >
            <div className="min-w-0">
              <p className="truncate text-[length:var(--text-15)] text-[var(--color-text)]">
                {o.email}
              </p>
              <p className="text-[length:var(--text-13)] text-[var(--color-muted)]">
                {o.itemCount} item{o.itemCount === 1 ? "" : "s"}{" "}
                <span aria-hidden>·</span>{" "}
                <time dateTime={o.createdAt}>
                  {new Date(o.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-[length:var(--text-18)] text-[var(--color-text)]">
                {formatPrice(o.totalCents)}
              </p>
              <p
                className={cn(
                  "text-[length:var(--text-13)]",
                  o.status === "paid" && "text-emerald-300",
                  o.status === "fulfilled" && "text-emerald-300",
                  o.status === "shipped" && "text-emerald-300",
                  o.status === "refunded" && "text-amber-300",
                )}
              >
                {o.status}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
