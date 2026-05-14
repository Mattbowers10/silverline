# Silverline

Multi-tenant marketing + commerce site for **Silverline Industries** —
luxury home developer in East Tennessee.

One Next.js app serves four hosts:

| Host | Tenant slug | Notes |
|---|---|---|
| `silverlineind.com` | `parent` | Brand hub, blog, shop, contact |
| `pools.silverlineind.com` | `pools` | Pool construction / service / maintenance |
| `developments.silverlineind.com` | `developments` | Residential / commercial / remodels |
| `properties.silverlineind.com` | `properties` | Real estate + STR management |

## Stack

- **Next.js 16** (App Router)
- **Payload CMS v3** — runs inline as Next.js routes (`/admin`, `/api/*`)
- **PostgreSQL** on Neon
- **Tailwind v4** + shadcn/ui (Radix primitives)
- **Stripe** for `/shop` (Week 6)
- **GoHighLevel** for lead capture (Week 8)
- **Mapbox** for service-area isochrone (Week 8)
- **Resend** for transactional email
- Hosted on **Vercel**

## Local development

```bash
cp .env.example .env
# fill in DATABASE_URL (Neon) and PAYLOAD_SECRET at minimum
npm install
npm run dev
```

Open <http://localhost:3000> for the parent site.
Admin at <http://localhost:3000/admin>.

To preview a subdomain locally:

```
http://pools.localhost:3000
http://developments.localhost:3000
http://properties.localhost:3000
```

(All major browsers resolve `*.localhost` automatically.)

## Project structure

```
src/
├── app/
│   ├── (payload)/             # Payload admin + REST + GraphQL
│   ├── s/                     # Tenant page trees, rewritten by middleware
│   │   ├── parent/
│   │   ├── pools/
│   │   ├── developments/
│   │   └── properties/
│   ├── globals.css
│   └── layout.tsx             # Root layout (fonts, html shell)
├── components/
│   ├── site/                  # Header, Footer, AnnouncementBar, etc.
│   └── ui/                    # shadcn primitives
├── lib/
│   ├── fonts.ts               # Caudex + Inter via next/font
│   └── tenants.ts             # Tenant resolution from host
├── payload/
│   └── collections/           # Payload schema (Pages, Posts, Projects, …)
├── payload.config.ts
└── middleware.ts              # Host → /s/{tenant}{path} rewrite
```

## Design tokens

| Token | Value | Use |
|---|---|---|
| `--color-page` | `#040406` | App background |
| `--color-panel` | `#0B0C0E` | Cards, footer |
| `--color-accent` | `#82d8f9` | **Sparingly** — italic display word, link hover, badges |
| `--color-text` | `#FFFFFF` | Primary text |
| `--color-muted` | `#A1A1AA` | Body sub copy |
| `--color-faint` | `#6B7280` | Fine print / legal |
| `--color-line` | `#1B1B20` | Hairline borders |
| `--font-display` | Caudex | Headlines (with one italic word per hero) |
| `--font-sans` | Inter | Body |

## Week 1 status

Done:

- Repo scaffolded
- Payload v3 integrated as Next.js routes
- Subdomain middleware
- Design tokens, fonts (Caudex + Inter)
- Base shell: announcement bar, header, footer
- Placeholder home pages for all four tenants

Pending (next):

- Neon `DATABASE_URL` (provisioned in Week 1 setup)
- Vercel project link + DNS (deferred per build plan)
- shadcn primitives + Week 2 section components
