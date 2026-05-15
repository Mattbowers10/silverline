import type { Metadata } from "next";
import { caudex, inter } from "@/lib/fonts";
import { Analytics } from "@/components/site/Analytics";
import { getTenant } from "@/lib/tenants";
import { StructuredData } from "@/components/site/StructuredData";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Silverline — Custom Homes, Pools, and Properties in East Tennessee",
    template: "%s · Silverline",
  },
  description:
    "Silverline builds custom luxury homes, custom pools, and manages East Tennessee properties. One team. One standard.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://silverlineind.com",
  ),
};

export default async function SiteRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = await getTenant();
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caudex.variable} h-full antialiased`}
    >
      <head>
        <StructuredData tenant={tenant} />
      </head>
      <body className="min-h-full bg-[var(--color-page)] text-[var(--color-text)]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
