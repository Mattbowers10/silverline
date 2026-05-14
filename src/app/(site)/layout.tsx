import type { Metadata } from "next";
import { caudex, inter } from "@/lib/fonts";
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

export default function SiteRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caudex.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--color-page)] text-[var(--color-text)]">
        {children}
      </body>
    </html>
  );
}
