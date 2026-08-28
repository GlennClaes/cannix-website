import type { MetadataRoute } from "next";
import { isProductionSite, siteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: isProductionSite ? "/" : undefined,
      disallow: isProductionSite ? ["/api/", "/_next/"] : "/",
    },
    host: isProductionSite ? siteUrl : undefined,
    sitemap: isProductionSite ? `${siteUrl}/sitemap.xml` : undefined,
  };
}
