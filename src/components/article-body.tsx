import { evaluate } from "@mdx-js/mdx";
import type { ComponentPropsWithoutRef } from "react";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings, {
  type Options as HeadingOptions,
} from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { HeadingLinks } from "@/components/heading-links";

interface TextNode {
  type: string;
  value?: string;
  children?: readonly TextNode[];
}

function headingText(node: TextNode): string {
  if (node.type === "text") return node.value ?? "";
  return node.children?.map(headingText).join("") ?? "";
}

const headingOptions: HeadingOptions = {
  behavior: "append",
  headingProperties: (heading) => ({ ariaLabel: headingText(heading) }),
  properties: (heading) => ({
    className: ["heading-anchor"],
    ariaLabel: `Copy link to section: ${headingText(heading)}`,
    title: `Copy link to section: ${headingText(heading)}`,
  }),
  content: { type: "text", value: "#" },
};

function CodeBlock(props: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre {...props} tabIndex={0} role="region" aria-label="Code example" />
  );
}

export async function ArticleBody({ body }: { body: string }) {
  // MDX is executable content. This body only comes from reviewed local files.
  const { default: Content } = await evaluate(body, {
    ...runtime,
    development: false,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, headingOptions],
      [
        rehypePrettyCode,
        {
          theme: { light: "github-light", dark: "github-dark" },
          keepBackground: false,
        },
      ],
    ],
  });
  return (
    <HeadingLinks>
      <Content components={{ pre: CodeBlock }} />
    </HeadingLinks>
  );
}
