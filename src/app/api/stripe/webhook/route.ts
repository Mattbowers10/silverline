import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Stripe webhook receiver. Verifies the signature and persists confirmed
 * orders to Payload's `orders` collection. Configure the endpoint in Stripe:
 *   - URL: https://silverlineind.com/api/stripe/webhook
 *   - Events: checkout.session.completed
 *   - Copy the signing secret into STRIPE_WEBHOOK_SECRET in your env.
 *
 * The route uses the raw body (req.text()) to satisfy Stripe signature verification.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !signingSecret) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Stripe webhook is not configured. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET.",
      },
      { status: 503 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ ok: false, error: "Missing signature" }, { status: 400 });
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, signingSecret);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: `Signature verification failed: ${(err as Error).message}` },
      { status: 400 },
    );
  }

  if (event.type !== "checkout.session.completed") {
    // Acknowledge unhandled events so Stripe stops retrying.
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Expand line items so we can persist a useful order record.
  let lineItems: Stripe.LineItem[] = [];
  try {
    const li = await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
      expand: ["data.price.product"],
    });
    lineItems = li.data;
  } catch {
    /* fall through with empty list */
  }

  const items = lineItems.map((li) => {
    const product = (li.price?.product as Stripe.Product | undefined) ?? undefined;
    return {
      productSlug: product?.metadata?.slug ?? undefined,
      name: li.description ?? product?.name ?? "Item",
      quantity: li.quantity ?? 1,
      unitPriceCents: li.price?.unit_amount ?? 0,
    };
  });

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "orders",
      data: {
        email: session.customer_details?.email ?? session.customer_email ?? "unknown@silverlineind.com",
        name: session.customer_details?.name ?? undefined,
        phone: session.customer_details?.phone ?? undefined,
        items,
        subtotalCents: session.amount_subtotal ?? 0,
        taxCents: session.total_details?.amount_tax ?? 0,
        shippingCents: session.total_details?.amount_shipping ?? 0,
        totalCents: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        shippingAddress: session.collected_information?.shipping_details?.address
          ? {
              line1: session.collected_information.shipping_details.address.line1 ?? undefined,
              line2: session.collected_information.shipping_details.address.line2 ?? undefined,
              city: session.collected_information.shipping_details.address.city ?? undefined,
              state: session.collected_information.shipping_details.address.state ?? undefined,
              postalCode:
                session.collected_information.shipping_details.address.postal_code ?? undefined,
              country: session.collected_information.shipping_details.address.country ?? "US",
            }
          : undefined,
        stripeCheckoutSessionId: session.id,
        stripePaymentIntentId:
          typeof session.payment_intent === "string" ? session.payment_intent : undefined,
        status: "paid",
      },
    });
  } catch (err) {
    // If we can't persist, still ack so Stripe doesn't retry forever — but log.
    console.error("[stripe webhook] Failed to persist order:", err);
  }

  return NextResponse.json({ ok: true });
}
