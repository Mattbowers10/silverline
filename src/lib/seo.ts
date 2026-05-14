import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://silverlineind.com";

export const SITE_NAME = "Silverline";

type BuildArgs = {
  title: string;
  description: string;
  /** Relative path on the current tenant. */
  path?: string;
  noIndex?: boolean;
};

/** Compose Next.js Metadata with consistent defaults. */
export function buildMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: BuildArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
