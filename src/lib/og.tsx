import { ImageResponse } from "next/og";
import { TENANT_LABELS, TENANT_TAGLINES, type Tenant } from "./tenants";

/**
 * Render the 1200×630 Open Graph image for the given tenant.
 * Called from each tenant's app/.../opengraph-image.tsx — the route metadata
 * exports (runtime/size/contentType/alt) must be declared inline in each
 * route file (Next can't statically read re-exported metadata).
 */
export async function renderOgImage(tenant: Tenant): Promise<ImageResponse> {
  const heading = TENANT_LABELS[tenant];
  const sub = TENANT_TAGLINES[tenant];

  const italic =
    tenant === "pools"
      ? "right."
      : tenant === "developments"
      ? "right."
      : tenant === "properties"
      ? "smart."
      : "once.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#040406",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#a1a1aa",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <span>{`${heading} · East Tennessee`}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: "0 18px",
              fontSize: 96,
              lineHeight: 1.05,
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            <span style={{ display: "flex" }}>Built once.</span>
            <span style={{ display: "flex" }}>Built</span>
            <span style={{ display: "flex", fontStyle: "italic", color: "#82d8f9" }}>
              {italic}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.4,
              color: "#a1a1aa",
              maxWidth: 900,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            <span>{sub}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "system-ui, sans-serif",
            color: "#6b7280",
            fontSize: 22,
          }}
        >
          <span>silverlineind.com</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#82d8f9",
                display: "flex",
              }}
            />
            <span>Now booking 2026</span>
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
