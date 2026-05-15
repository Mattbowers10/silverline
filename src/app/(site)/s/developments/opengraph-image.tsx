import { renderOgImage } from "@/lib/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Silverline Developments — built once, built right.";

export default async function Image() {
  return renderOgImage("developments");
}
