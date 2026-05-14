import type { MetadataRoute } from "next";

const PARENT = "https://silverlineind.com";
const POOLS = "https://pools.silverlineind.com";
const DEV = "https://developments.silverlineind.com";
const PROPS = "https://properties.silverlineind.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const parentPages = [
    "/",
    "/about",
    "/contact",
    "/consultation",
    "/careers",
    "/service-area",
    "/projects",
    "/testimonials",
    "/financing",
    "/blog",
    "/shop",
    "/press",
    "/partners",
    "/investors",
    "/legal/privacy",
    "/legal/terms",
  ].map((p) => ({
    url: `${PARENT}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "/" ? 1 : 0.7,
  }));

  const poolsPages = [
    "/",
    "/services/gunite",
    "/services/fiberglass",
    "/services/service",
    "/services/maintenance",
    "/services/remodels",
    "/projects",
    "/calculators/cost-estimator",
    "/calculators/maintenance-plan",
    "/consultation",
  ].map((p) => ({
    url: `${POOLS}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const devPages = [
    "/",
    "/services/residential",
    "/services/commercial",
    "/services/remodels",
    "/projects",
    "/calculators/home-build",
    "/calculators/remodel-roi",
    "/consultation",
  ].map((p) => ({
    url: `${DEV}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const propsPages = [
    "/",
    "/services/real-estate",
    "/services/management",
    "/listings",
    "/calculators/str-roi",
    "/consultation",
  ].map((p) => ({
    url: `${PROPS}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...parentPages, ...poolsPages, ...devPages, ...propsPages];
}
