import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui";
import { WritingList, WritingTags } from "@/components/writing-list";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { getArticleTags, getPublishedArticles } from "@/lib/writing";

type Props = { params: Promise<{ tag: string }> };

export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  return getArticleTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  if (!getArticleTags().includes(tag)) notFound();
  const label = tag.replaceAll("-", " ");
  return pageMetadata(
    `${label.charAt(0).toUpperCase()}${label.slice(1)} writing`,
    `Technical writing about ${label} by ${siteConfig.name}.`,
    `/writing/tag/${tag}`,
  );
}

export default async function WritingTagPage({ params }: Props) {
  const { tag } = await params;
  if (!getArticleTags().includes(tag)) notFound();
  const label = tag.replaceAll("-", " ");
  return (
    <div className="page-shell narrow">
      <PageIntro
        eyebrow="Writing"
        title={`${label.charAt(0).toUpperCase()}${label.slice(1)}`}
        description={`Technical notes and implementation decisions related to ${label}.`}
      />
      <WritingTags tags={getArticleTags()} current={tag} />
      <WritingList
        articles={getPublishedArticles().filter((article) =>
          article.tags.includes(tag),
        )}
      />
    </div>
  );
}
