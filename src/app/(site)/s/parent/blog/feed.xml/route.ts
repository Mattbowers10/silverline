import { listPosts, CATEGORY_LABEL } from "@/lib/posts";

const SITE = "https://silverlineind.com";
const TITLE = "The Deep End — Silverline blog";
const DESC =
  "Project breakdowns, cost guides, and East Tennessee market reporting from the Silverline team.";

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const revalidate = 600;

export async function GET() {
  const posts = await listPosts({ limit: 50 });

  const items = posts
    .map((p) => {
      const url = `${SITE}/blog/${p.slug}`;
      const pubDate = p.publishedAt
        ? new Date(p.publishedAt).toUTCString()
        : new Date().toUTCString();
      return `<item>
  <title>${xmlEscape(p.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${pubDate}</pubDate>
  <category>${xmlEscape(CATEGORY_LABEL[p.category])}</category>
  <description>${xmlEscape(p.excerpt ?? "")}</description>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${xmlEscape(TITLE)}</title>
<link>${SITE}/blog</link>
<description>${xmlEscape(DESC)}</description>
<language>en-us</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<atom:link href="${SITE}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
