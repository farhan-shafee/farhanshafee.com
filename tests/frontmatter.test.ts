import assert from "node:assert/strict";
import test from "node:test";
import { parseArticle } from "../src/lib/writing";

const metadata = `title: "An example"
description: >-
  A multiline description
  with YAML punctuation: preserved.
date: "2026-01-02"
slug: "an-example"
tags:
  - engineering
  - security
draft: true
featured: false`;
const body =
  "## First section\n\nA paragraph.\n\n---\n\nA body separator stays.";

function article(frontmatter = metadata, content = body) {
  return `---\n${frontmatter}\n---\n${content}`;
}

test("YAML frontmatter preserves multiline values, lists, booleans, and body separators", () => {
  const parsed = parseArticle(article(), "an-example.mdx");
  assert.equal(parsed.title, "An example");
  assert.equal(
    parsed.description,
    "A multiline description with YAML punctuation: preserved.",
  );
  assert.equal(parsed.date, "2026-01-02");
  assert.deepEqual(parsed.tags, ["engineering", "security"]);
  assert.equal(parsed.draft, true);
  assert.equal(parsed.featured, false);
  assert.equal(parsed.body, body);
});

test("BOM and CRLF input retain the same article metadata and body text", () => {
  const parsed = parseArticle(
    "\uFEFF" + article().replaceAll("\n", "\r\n"),
    "an-example.mdx",
  );
  assert.equal(
    parsed.description,
    "A multiline description with YAML punctuation: preserved.",
  );
  assert.equal(parsed.body, body.replaceAll("\n", "\r\n"));
});

test("frontmatter requires a closing delimiter before article content", () => {
  assert.throws(
    () => parseArticle(`---\n${metadata}`, "an-example.mdx"),
    /an-example\.mdx: frontmatter requires a closing --- delimiter/,
  );
});

test("missing YAML, duplicate keys, and executable YAML tags are rejected", () => {
  assert.throws(
    () => parseArticle(body, "an-example.mdx"),
    /title must be a non-empty string/,
  );
  assert.throws(
    () =>
      parseArticle(
        article(metadata + '\ntitle: "Duplicate"'),
        "an-example.mdx",
      ),
    /duplicated mapping key/,
  );
  assert.throws(
    () =>
      parseArticle(
        article(
          metadata.replace(
            'title: "An example"',
            'title: !!js/function "function () { return 1; }"',
          ),
        ),
        "an-example.mdx",
      ),
    /unknown tag/,
  );
});

test("unquoted dates and quoted boolean flags retain their validation errors", () => {
  assert.throws(
    () =>
      parseArticle(
        article(metadata.replace('date: "2026-01-02"', "date: 2026-01-02")),
        "an-example.mdx",
      ),
    /quoted YYYY-MM-DD/,
  );
  assert.throws(
    () =>
      parseArticle(
        article(metadata.replace("draft: true", 'draft: "true"')),
        "an-example.mdx",
      ),
    /draft must be an unquoted boolean/,
  );
});
