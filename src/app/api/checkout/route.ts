import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";
import { rateLimit, rateLimitHeaders } from "@/lib/rateLimit";

type IncomingItem = { slug?: string; quantity?: number };

const SITE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

const LIMIT = 10; // checkout starts per minute per IP
const WINDOW_SEC = 60;

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, { limit: LIMIT, windowSec: WINDOW_SEC, namespace: "checkout" });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many checkout attempts. Try again in a minute." },
      { status: 429, headers: rateLimitHeaders(rl, LIMIT) },
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { ok: false, error: "Stripe is not configured in this environment." },
      { status: 503, headers: rateLimitHeaders(rl, LIMIT) },
    );
  }

  let body: { items?: IncomingItem[]; mode?: "buy-now" | "cart" };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0) {
    return NextResponse.json({ ok: false, error: "Cart is empty." }, { status: 400 });
  }

  // Resolve every slug to a real product so we trust the price server-side, not the client.
  const lineItems: { price: string; quantity: number }[] = [];
  const missingPriceSlugs: string[] = [];
  for (const item of items) {
    const slug = String(item.slug ?? "").trim();
    const quantity = Math.max(1, Math.min(20, Number(item.quantity ?? 1)));
    if (!slug) continue;
    const product = await getProduct(slug);
    if (!product || !product.stripePriceId) {
      missingPriceSlugs.push(slug);
      continue;
    }
    lineItems.push({ price: product.stripePriceId, quantity });
  }

  if (lineItems.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        error:
          missingPriceSlugs.length > 0
            ? `Products are missing Stripe prices: ${missingPriceSlugs.join(", ")}`
            : "No valid items.",
      },
      { status: 400 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${SITE}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE}/shop/cart`,
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["US"] },
      automatic_tax: { enabled: true },
      allow_promotion_codes: true,
      payment_intent_data: {
        description: "Silverline Shop order",
      },
    });

    return NextResponse.json(
      { ok: true, id: session.id, url: session.url },
      { headers: rateLimitHeaders(rl, LIMIT) },
    );
  } catch (err) {
    // Log the real reason server-side; return a safe generic message to the client.
    console.error("[checkout] Stripe session creation failed:", (err as Error).message);
    return NextResponse.json(
      { ok: false, error: "Couldn't start checkout. Please try again." },
      { status: 502, headers: rateLimitHeaders(rl, LIMIT) },
    );
  }
}
