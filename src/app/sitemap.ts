import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mehdirajani.com";
const showPortfolio = process.env.NEXT_PUBLIC_SHOW_PORTFOLIO === "true";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...(showPortfolio
      ? [
          {
            url: `${siteUrl}/portfolio`,
            lastModified,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : []),
  ];
}
