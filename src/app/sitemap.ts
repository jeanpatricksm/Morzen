import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...services.map((service) => ({
      url: `${siteUrl}/servicos/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
