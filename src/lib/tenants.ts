import { headers } from "next/headers";

export type Tenant = "parent" | "pools" | "developments" | "properties";

export const TENANTS: Tenant[] = ["parent", "pools", "developments", "properties"];

export const TENANT_LABELS: Record<Tenant, string> = {
  parent: "Silverline",
  pools: "Silverline Pools",
  developments: "Silverline Developments",
  properties: "Silverline Properties",
};

export const TENANT_TAGLINES: Record<Tenant, string> = {
  parent: "Custom homes, custom pools, and the East Tennessee properties that hold their value.",
  pools: "Gunite and fiberglass pools built once — built right.",
  developments: "Residential and commercial builds with a single point of contact.",
  properties: "Buy, manage, and grow short-term rental properties in East Tennessee.",
};

export const TENANT_HOSTS: Record<Tenant, string> = {
  parent: "silverlineind.com",
  pools: "pools.silverlineind.com",
  developments: "developments.silverlineind.com",
  properties: "properties.silverlineind.com",
};

/** Resolve the tenant from a request host header. */
export function tenantFromHost(host: string | null | undefined): Tenant {
  if (!host) return "parent";
  const h = host.toLowerCase().split(":")[0];
  if (h.startsWith("pools.")) return "pools";
  if (h.startsWith("developments.")) return "developments";
  if (h.startsWith("properties.")) return "properties";
  // localhost subdomain shorthands for dev:
  //   pools.localhost / developments.localhost / properties.localhost
  if (h.startsWith("pools.localhost")) return "pools";
  if (h.startsWith("developments.localhost")) return "developments";
  if (h.startsWith("properties.localhost")) return "properties";
  return "parent";
}

/** Server-component helper. Reads `x-silverline-tenant` set by middleware. */
export async function getTenant(): Promise<Tenant> {
  const h = await headers();
  const fromHeader = h.get("x-silverline-tenant") as Tenant | null;
  if (fromHeader && TENANTS.includes(fromHeader)) return fromHeader;
  return tenantFromHost(h.get("host"));
}
