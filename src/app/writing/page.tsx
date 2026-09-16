import { EmptyState, PageIntro, TextLink } from "@/components/ui";
import { WritingList, WritingTags } from "@/components/writing-list";
import { pageMetadata } from "@/lib/seo";
import { getArticleTags, getPublishedArticles } from "@/lib/writing";

export const metadata = pageMetadata(
  "Writing",
  "Technical notes on security engineering, automation, and financial systems. Evidence, implementation decisions, and lessons from building.",
  "/writing",
);

export default function WritingPage() {
  const articles = getPublishedArticles();
  return (
    <div className="page-shell narrow">
      <PageIntro
        eyebrow="Writing"
        title="Notes from the work."
        description="Security engineering, automation, and financial systems. Implementation decisions and the reasoning behind them."
      >
        <TextLink href="/rss.xml">Subscribe via RSS</TextLink>
      </PageIntro>
      <WritingTags tags={getArticleTags()} />
      {articles.length > 0 ? (
        <WritingList articles={articles} />
      ) : (
        <EmptyState title="Good notes take real work.">
          <p>
            Technical articles will appear here as they are ready. In the
            meantime, explore the systems and experiments behind the writing.
          </p>
          <TextLink href="/work">Explore the work</TextLink>
        </EmptyState>
      )}
    </div>
  );
}
