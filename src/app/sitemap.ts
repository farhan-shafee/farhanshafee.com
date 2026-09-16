import type { MetadataRoute } from "next";
import { now } from "@/data/now";
import { getPublicProjects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";
import { getArticleTags, getPublishedArticles } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    "/",
    "/about",
    "/work",
    "/writing",
    "/lab",
    "/uses",
    "/contact",
  ].map((path) => ({ url: absoluteUrl(path) }));

  return [
    ...pages,
    { url: absoluteUrl("/now"), lastModified: now.updated },
    ...getPublicProjects().map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
    })),
    ...getPublishedArticles()
      .filter(
        (article) =>
          !article.canonical ||
          article.canonical === absoluteUrl(`/writing/${article.slug}`),
      )
      .map((article) => ({
        url: absoluteUrl(`/writing/${article.slug}`),
        lastModified: article.updated ?? article.date,
      })),
    ...getArticleTags().map((tag) => ({
      url: absoluteUrl(`/writing/tag/${tag}`),
    })),
  ];
}
