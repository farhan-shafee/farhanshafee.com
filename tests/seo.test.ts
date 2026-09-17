import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import nextConfig from "../next.config";
import AboutPage from "../src/app/about/page";
import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";
import { GET as getRss } from "../src/app/rss.xml/route";
import { GET as getLlms } from "../src/app/llms.txt/route";
import { siteConfig } from "../src/config/site";
import { absoluteUrl, pageMetadata } from "../src/lib/seo";

// Match Next's CommonJS interop while rendering its real Image component in Node.
const loadCommonJs = createRequire(import.meta.url);
const imageModule = loadCommonJs("next/image");
if (imageModule.default) Object.assign(imageModule, imageModule.default);
const { default: HomePage } = await import("../src/app/page");

const origin = "https://farhan-shafee.com";
const oldOrigin = /https?:\/\/(?:www\.)?farhanshafee\.com\b/i;

function structuredData(html: string) {
  return [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
    ),
  ].map((match) => JSON.parse(match[1]));
}

test("canonical metadata and public profile identities use the new origin", () => {
  assert.equal(siteConfig.url, origin);
  assert.equal(absoluteUrl("/about"), `${origin}/about`);
  const metadata = pageMetadata("About", "A professional profile.", "/about");
  assert.equal(metadata.alternates?.canonical, `${origin}/about`);
  assert.equal(metadata.openGraph?.url, `${origin}/about`);
  assert.deepEqual(metadata.twitter?.images, [`${origin}/opengraph-image`]);
  assert.ok(
    JSON.stringify(metadata.openGraph?.images).includes(
      `${origin}/opengraph-image`,
    ),
  );

  const homeHtml = renderToStaticMarkup(HomePage());
  const person = structuredData(homeHtml).find(
    (schema) => schema["@type"] === "Person",
  );
  assert.equal(person["@id"], `${origin}/#person`);
  assert.equal(person.url, origin);
  assert.ok(person.sameAs.includes("https://github.com/farhan-shafee"));

  const aboutHtml = renderToStaticMarkup(AboutPage());
  const profile = structuredData(aboutHtml).find(
    (schema) => schema["@type"] === "ProfilePage",
  );
  assert.equal(profile["@id"], `${origin}/about#profile`);
  assert.equal(profile.url, `${origin}/about`);
  assert.equal(profile.mainEntity["@id"], person["@id"]);
  assert.equal(profile.mainEntity.url, origin);
  for (const output of [JSON.stringify(metadata), homeHtml, aboutHtml])
    assert.doesNotMatch(output, oldOrigin);
});

test("sitemap, RSS, and machine-readable resources advertise the canonical origin", async () => {
  const entries = sitemap();
  assert.ok(entries.length > 0);
  for (const entry of entries) assert.equal(new URL(entry.url).origin, origin);
  const rss = await getRss().text();
  assert.ok(rss.includes(`<link>${origin}/writing</link>`));
  assert.ok(rss.includes(`href="${origin}/rss.xml"`));
  const llms = await getLlms().text();
  for (const route of [
    "about",
    "work",
    "writing",
    "lab",
    "now",
    "uses",
    "contact",
    "rss.xml",
    "sitemap.xml",
  ])
    assert.ok(
      llms.includes(`](${origin}/${route})`),
      `${route} must use the canonical origin`,
    );
  for (const output of [JSON.stringify(entries), rss, llms])
    assert.doesNotMatch(output, oldOrigin);
});

test("production robots uses the new sitemap while preview crawling stays disabled", async () => {
  const originalEnvironment = process.env.VERCEL_ENV;
  try {
    process.env.VERCEL_ENV = "production";
    assert.deepEqual(robots(), {
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${origin}/sitemap.xml`,
    });
    process.env.VERCEL_ENV = "preview";
    assert.deepEqual(robots(), { rules: { userAgent: "*", disallow: "/" } });
    const headers = await nextConfig.headers?.();
    assert.ok(
      headers?.some((rule) =>
        rule.headers.some(
          (header) =>
            header.key.toLowerCase() === "x-robots-tag" &&
            header.value === "noindex, nofollow",
        ),
      ),
    );
  } finally {
    if (originalEnvironment === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = originalEnvironment;
  }
});
