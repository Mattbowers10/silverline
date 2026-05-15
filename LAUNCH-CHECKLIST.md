# Silverline launch checklist

The complete set of external accounts, API keys, DNS records, content tasks,
and Vercel configuration needed to take the site from local dev to live and
fully QA-able.

**How to use this file:** work top to bottom. Each item is either an account
to create, a value to copy into `.env`, or a one-time setup task. The site
runs without any of these — every integration has a graceful fallback — but
checking off each item unlocks the corresponding feature.

> Legend
> 🟢 = required for launch  ·  🟡 = recommended  ·  ⚪ = optional / later

---

## 1. Code & hosting

### 1.1 🟢 GitHub repo
- [x] Repo exists: <https://github.com/Mattbowers10/silverline>
- [ ] Confirm production branch is `main`
- [ ] Add Matt + any other collaborators with `Maintain` access

### 1.2 🟢 Vercel project
- [ ] Create Vercel team (or use existing) and import the GitHub repo
- [ ] Framework preset: **Next.js**  ·  root directory: `/`  ·  Node 22+
- [ ] Production branch: `main`
- [ ] Build command: default (`next build`)
- [ ] Install command: default (`npm install`)
- [ ] Output: default
- [ ] **Functions region:** pick `iad1` (US East) — closest to Neon US-East-1
- [ ] **Environment variables** — add every value from section 2 below
- [ ] First deploy passes (will show empty data states until DB + CMS are seeded)

### 1.3 🟢 DNS — `silverlineind.com` and three subdomains
Each domain attaches to the same Vercel project. The proxy at `src/proxy.ts`
reads the `Host` header and routes to the right tenant.

In your registrar (or wherever DNS is managed), add Vercel's records:

| Host | Type | Value |
|---|---|---|
| `silverlineind.com` (apex) | `A` | `76.76.21.21` |
| `www.silverlineind.com` | `CNAME` | `cname.vercel-dns.com` |
| `pools.silverlineind.com` | `CNAME` | `cname.vercel-dns.com` |
| `developments.silverlineind.com` | `CNAME` | `cname.vercel-dns.com` |
| `properties.silverlineind.com` | `CNAME` | `cname.vercel-dns.com` |

Then in Vercel → Project → Domains, add all four hostnames. Vercel issues
SSL certs automatically once DNS propagates (5 min–48 hr).

- [ ] DNS records added
- [ ] All four hostnames attached in Vercel
- [ ] SSL: green padlock on all four

---

## 2. Environment variables

Copy these into Vercel's environment variables UI (Production + Preview).
For local dev they live in `~/Code/silverline/.env`.

### 2.1 🟢 Core
| Var | Where to get it | Notes |
|---|---|---|
| `PAYLOAD_SECRET` | `openssl rand -base64 32` | 32+ random bytes; rotate annually |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://silverlineind.com` | Used by Payload for admin links |
| `DATABASE_URL` | See **3. Neon** below | Postgres connection string |
| `NEXT_PUBLIC_SITE_URL` | `https://silverlineind.com` | Used in sitemap, OG tags, redirects |

### 2.2 🟢 Stripe (shop checkout + webhook)
| Var | Where to get it |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys (`sk_live_…` for prod, `sk_test_…` for preview) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same screen (`pk_live_…` / `pk_test_…`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks → add endpoint → signing secret |

### 2.3 🟢 GoHighLevel (lead pipeline — Faiz)
| Var | Where to get it |
|---|---|
| `GHL_API_KEY` | GHL sub-account → Integrations → Private Integration token |
| `GHL_LOCATION_ID` | GHL sub-account → Settings → Location ID |
| `GHL_WEBHOOK_SECRET` | If using inbound webhooks from GHL → workflow webhook secret |

### 2.4 🟢 Resend (transactional email)
| Var | Where to get it |
|---|---|
| `RESEND_API_KEY` | Resend dashboard → API Keys |
| `RESEND_FROM_EMAIL` | `hello@silverlineind.com` (already set in `.env.example`) |

### 2.5 🟡 Calendly (scheduling on `/contact`)
| Var | Where to get it |
|---|---|
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly → Share → event-type URL (e.g. `https://calendly.com/silverline/consultation`) |

### 2.6 🟡 Mapbox (live isochrone map — Week 11 upgrade)
| Var | Where to get it |
|---|---|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox → Account → Access tokens |

> Without this, the service-area page shows our hand-drawn SVG — already works.

### 2.7 🟡 Analytics (load order: GTM first, others fire through GTM)
| Var | Where to get it |
|---|---|
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager → workspace ID (`GTM-XXXXXX`) |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 → property → Measurement ID (`G-XXXXXXX`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Events Manager → pixel ID |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity → project → tracking code ID |

> Recommend wiring GA4 + Meta Pixel through GTM (set both up in GTM, not in code).

---

## 3. 🟢 Neon Postgres

Already created during Week 1.

- [x] Project: silverline
- [ ] Confirm production branch separate from dev branch (Neon → Branching)
- [ ] Copy production connection string into Vercel `DATABASE_URL`
- [ ] (Optional) Upgrade from free tier before launch if traffic warrants
- [ ] First-time on production DB: visit `/admin`, create the admin user

---

## 4. 🟢 Payload CMS — content tasks before launch

Log into `https://silverlineind.com/admin` and seed each collection.

### 4.1 Users
- [ ] Create your admin user during first-visit setup
- [ ] Add additional `editor`-role users for the content team

### 4.2 Team (drives author bylines on blog posts + team page)
- [ ] Add team members with photo, name, role, bio, years experience

### 4.3 Media
- [ ] Upload Silverline logo (SVG preferred) — replace placeholder Caudex wordmark
- [ ] Upload 4–6 flagship project hero photos (drone + interior) for the home page
- [ ] Upload partner logos for the `Partners` section (NAHB, MPG, BBB, etc.)

### 4.4 Testimonials
- [ ] Pick 6–10 of your 100+ reviews to feature (3 for home, more for `/testimonials`)
- [ ] For each: customer name, location, photo (if consent), division, project type, rating, quote
- [ ] Mark 3 as `featured: true` for the home-page rotation

### 4.5 Projects (drives `/projects` galleries + case studies)
- [ ] Publish 6 minimum to fill the home-page `ProjectGallery` (2 per division)
- [ ] For each: title, slug, division, projectType, summary, story (rich text), city, completedAt, hero image, gallery, specs

### 4.6 Posts (The Deep End blog)
- [ ] Publish first 5 posts to populate `/blog` and the home-page carousel
- [ ] Each: title, slug, category, excerpt, cover image, content (rich text), author, publishedAt, readingMinutes, status: `published`

### 4.7 Products (shop)
- [ ] Decide what's launching: pool chemicals, branded merch, gift cards
- [ ] Create each in Stripe first (see 5.2), then mirror in Payload with the `stripePriceId` copied in

### 4.8 Pages
- [ ] Optional — only if you want CMS-editable copy on the static pages (about/careers/etc.)

---

## 5. 🟢 Stripe — account + product sync

### 5.1 Account
- [ ] Create Stripe account at <https://stripe.com>
- [ ] Complete business verification (tax ID, bank account, ID)
- [ ] Activate Stripe Tax (or note that you'll handle TN sales tax manually)
- [ ] Set business profile: Silverline Industries, Knoxville TN, business type: LLC

### 5.2 Products + prices (one row per SKU)
For every product:
1. Stripe → Products → Add product (name, image, description)
2. Add a Price (one-time, USD, e.g. $49.99)
3. Copy the `price_…` ID
4. In Payload `/admin → Products`, create the matching product and paste `stripePriceId`
5. (Optional) set product `metadata.slug` in Stripe to match the Payload slug — used by the webhook to back-link line items

### 5.3 Webhook
- [ ] Stripe → Developers → Webhooks → Add endpoint
- [ ] URL: `https://silverlineind.com/api/stripe/webhook`
- [ ] Events: `checkout.session.completed` (start) · later add `charge.refunded`, `payment_intent.payment_failed`
- [ ] Copy the signing secret into `STRIPE_WEBHOOK_SECRET`
- [ ] Test: Stripe dashboard → "Send test webhook" → look for the order in Payload `/admin → Orders`

### 5.4 Test order before launch
- [ ] Switch to test mode in Stripe
- [ ] Buy a product end-to-end on staging using `4242 4242 4242 4242`
- [ ] Verify Order record appears in Payload `/admin → Orders`
- [ ] Verify email confirmation arrives (once Resend is wired)

---

## 6. 🟢 GoHighLevel (Faiz owns)

### 6.1 Sub-account
- [ ] Confirm silverline sub-account exists under your agency account
- [ ] Generate Private Integration token → drop into `GHL_API_KEY`
- [ ] Copy Location ID → drop into `GHL_LOCATION_ID`

### 6.2 Pipelines + workflows
Our leads come in tagged with these labels — wire workflows around them:

| Tag | Source |
|---|---|
| `division:pools` / `developments` / `properties` / `multi` | Hero pill, consultation form |
| `budget:50-150` / `150-500` / `500plus` | Consultation form only |
| `timeline:asap` / `1-3mo` / `3-6mo` / `6-12mo` / `exploring` | Consultation form only |
| `in_service_area` / `out_of_area` | Every lead (ZIP check) |

And these `source` values:

| Source | Origin |
|---|---|
| `hero_<tenant>` | Hero email pill (currently routes via /consultation prefill) |
| `consultation_parent` / `_pools` / `_developments` / `_properties` | Multi-step form |
| `calc_gunite` / `calc_fiberglass` | Pool cost estimator |
| `calc_home_build` | Developments cost estimator |
| `calc_str_roi` | Properties ROI calculator |

- [ ] Build pipeline stages: New lead → Contacted → Consultation booked → Proposal sent → Won/Lost
- [ ] Build workflows routing by tags above (e.g., pools leads → Silverline-Pools pipeline)
- [ ] Set up an email auto-responder so leads get a reply within 5 minutes

### 6.3 Test end-to-end
- [ ] Submit a real lead from `/consultation` → confirm Payload `/admin → Leads` has it AND it appeared in GHL
- [ ] Submit a calculator unlock → confirm `source: calc_<name>` shows on the GHL contact

---

## 7. 🟢 Resend — transactional email

### 7.1 Account + domain verification
- [ ] Create Resend account
- [ ] Add `silverlineind.com` as a sending domain
- [ ] Add the SPF, DKIM, and DMARC records Resend provides to your DNS
- [ ] Copy the API key → `RESEND_API_KEY`

### 7.2 Mailbox forwarding (these addresses are referenced in the site)
Set up these as forwarding addresses (Google Workspace, Cloudflare Email Routing, or your email host):

| Address | Used in |
|---|---|
| `hello@silverlineind.com` | General contact (footer, /contact, transactional from-address) |
| `press@silverlineind.com` | /press page |
| `careers@silverlineind.com` | /careers page |
| `investors@silverlineind.com` | /investors page |

- [ ] All four mailboxes / aliases route to a real human inbox

### 7.3 Templates (post-launch, Week 11 polish)
- [ ] Consultation confirmation: "We received your request"
- [ ] Order confirmation: "Thanks for your Silverline order"
- [ ] Calculator unlock follow-up: "Your full estimate"

> The Resend send code isn't wired yet (graceful no-op currently). Polish pass
> in Week 11 turns it on inside `lib/leads.ts` and the Stripe webhook.

---

## 8. 🟡 Calendly

- [ ] Create Calendly account
- [ ] Create an event type: "Silverline consultation" — 30 min, group of consultants
- [ ] Copy event URL → `NEXT_PUBLIC_CALENDLY_URL`
- [ ] (Optional) integrate Calendly → GHL so bookings auto-create contacts

When set, the `/contact` page renders the inline scheduler. Otherwise it
shows the "Calendly slot — set NEXT_PUBLIC_CALENDLY_URL" placeholder.

---

## 9. 🟡 Mapbox (replaces hand-drawn SVG service-area map)

- [ ] Create Mapbox account, get public access token → `NEXT_PUBLIC_MAPBOX_TOKEN`
- [ ] Week 11 polish work: swap the inline SVG `ServiceAreaMap` for a Mapbox isochrone render (90-min drive from Knoxville, 35.96°N, 83.92°W)

---

## 10. 🟡 Analytics

### 10.1 Google Tag Manager (umbrella)
- [ ] Create GTM container for `silverlineind.com`
- [ ] Add to `NEXT_PUBLIC_GTM_ID` (`GTM-XXXXXX`)
- [ ] Inside GTM, configure tags for GA4 + Meta Pixel (so you don't need to wire each separately in code)

### 10.2 Google Analytics 4
- [ ] Create GA4 property → Measurement ID → `NEXT_PUBLIC_GA4_ID`
- [ ] Set up conversions: `lead_submit`, `calc_unlock`, `checkout_complete`

### 10.3 Meta Pixel (Facebook/Instagram ads)
- [ ] Create pixel in Events Manager → `NEXT_PUBLIC_META_PIXEL_ID`
- [ ] Set up the same conversions as standard events

### 10.4 Microsoft Clarity (session replay — free)
- [ ] Create project → ID → `NEXT_PUBLIC_CLARITY_ID`

> The analytics tags don't yet load in `RootLayout` — Week 11 polish wires
> them in via a `next/script` block, conditional on env vars being set.

---

## 11. 🟢 SEO + indexing

- [ ] Submit sitemap to Google: <https://silverlineind.com/sitemap.xml> in Search Console
- [ ] Same for each subdomain
- [ ] Verify domain ownership in Search Console (DNS TXT or HTML file)
- [ ] Bing Webmaster Tools (same process)
- [ ] Confirm `robots.txt` at <https://silverlineind.com/robots.txt> looks right (it disallows `/admin` and `/api`, points to sitemap)

---

## 12. 🟢 Pre-launch QA pass

Run through this list once everything above is wired:

### Functional
- [ ] `/admin` loads and login works
- [ ] All five marketing properties render: silverlineind.com, pools., developments., properties., admin
- [ ] Submit `/consultation` form → lead appears in **both** Payload and GHL
- [ ] Submit a calculator unlock → lead appears with `source: calc_<name>`
- [ ] Subdomain → parent redirect works: `pools.silverlineind.com/about` → 308 → `silverlineind.com/about`
- [ ] ZIP validation: enter `37902` (in-area) and `90210` (out-of-area) on consultation — verify both flag correctly
- [ ] Stripe test purchase end-to-end: `/shop` → add to cart → checkout → success → Order in `/admin → Orders`
- [ ] Calendly embed on `/contact` shows real scheduler (not placeholder)
- [ ] Subscribe email at `EmptyPosts` → lead in GHL with `source: newsletter` (Week 11 wiring)
- [ ] Floating CTA appears after 25% scroll, dismiss persists for the session

### Visual & content
- [ ] Every nav link works on every host
- [ ] Every footer link works on every host (parent-only ones redirect from subdomains)
- [ ] No `/window.svg` or other placeholder images visible
- [ ] All "Placeholder Owner" testimonial bylines replaced with real customers
- [ ] All `(placeholder)` blog/project titles replaced with real ones
- [ ] Hero photography swapped in (replaces `HeroComposite` SVG)
- [ ] Service-area map matches the real 90-minute boundary

### Performance & SEO
- [ ] Lighthouse mobile + desktop > 95 across Performance, A11y, Best Practices, SEO on the parent home page
- [ ] Same for each subdomain home, `/blog`, `/projects`, `/shop`, `/consultation`
- [ ] OpenGraph image renders on social-share preview tools
- [ ] No console errors on any page in production
- [ ] No 404s when crawling the sitemap

### Accessibility
- [ ] Skip link works (tab from page load)
- [ ] All form inputs have labels
- [ ] Focus states visible on every interactive element
- [ ] Color contrast passes WCAG AA (the dark theme is already designed for this)
- [ ] Screen reader pass on the parent home page

---

## 13. 🟢 Launch day

- [ ] Final deploy from `main`
- [ ] Verify production env vars match prod values (not test/staging)
- [ ] Cut DNS over (if pointing from an old site)
- [ ] Submit sitemap to Search Console
- [ ] Announce on LinkedIn / X / newsletter
- [ ] Monitor `/admin → Leads` and `/admin → Orders` for the first 72 hours

---

## Living references

- **Service-area ZIP list** lives in `src/lib/serviceArea.ts` — edit there to add/remove ZIPs
- **Calculator pricing** lives at the top of each calculator file in `src/components/calculators/`
- **Tenant labels and host detection** live in `src/lib/tenants.ts`
- **Proxy redirect list** (parent-only paths) lives in `src/proxy.ts` `PARENT_ONLY_PREFIXES`
- **All env vars** documented in `.env.example`
