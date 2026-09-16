import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getPublicProjects } from "../../src/data/projects";
import { readdirSync, readFileSync } from "node:fs";
import {
  getPublishedArticles,
  getArticleTags,
  parseArticle,
} from "../../src/lib/writing";
import sitemap from "../../src/app/sitemap";

const coreRoutes = [
  "/",
  "/about",
  "/work",
  "/writing",
  "/lab",
  "/uses",
  "/now",
  "/contact",
];
const routes = [
  ...coreRoutes,
  ...getPublicProjects().map(({ slug }) => `/work/${slug}`),
];

for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
  test(`all pages render without overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1"), route).toHaveCount(1);
      await expect(page.locator("main")).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        document: document.documentElement.scrollWidth,
        viewport: innerWidth,
      }));
      expect(
        dimensions.document,
        `${route} overflow at ${width}px`,
      ).toBeLessThanOrEqual(dimensions.viewport);
      if (route === "/")
        await page.screenshot({
          path: `.artifacts/home-${width}.png`,
          fullPage: true,
        });
    }
    expect(errors).toEqual([]);
  });
}

for (const theme of ["light", "dark"] as const) {
  test(`core routes pass axe in ${theme} theme`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    for (const route of coreRoutes) {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(
        result.violations,
        `${route}: ${JSON.stringify(result.violations.map(({ id, nodes }) => ({ id, nodes: nodes.map((n) => n.target) })))}`,
      ).toEqual([]);
    }
    await page.goto("/");
    await page.screenshot({
      path: `.artifacts/home-${theme}.png`,
      fullPage: true,
    });
  });
}

test("keyboard navigation, persisted theme, and mobile links work", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/work$/);
  await page
    .getByRole("link", { name: "CyberBit Solutions", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/work\/cyberbit-solutions$/);
  await expect(page.locator("h1")).toHaveText("CyberBit Solutions");
});

test("metadata, internal links, security headers and feeds are valid", async ({
  page,
  request,
}) => {
  const links = new Set<string>();
  const titles = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    const headers = response!.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["content-security-policy"]).toContain(
      "frame-ancestors 'none'",
    );
    expect(headers["content-security-policy"]).not.toContain("unsafe-eval");
    expect(headers["x-powered-by"]).toBeUndefined();
    const title = await page.title();
    expect(titles.has(title), `unique title for ${route}`).toBe(false);
    titles.add(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /\S.{30}/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://farhanshafee.com${route === "/" ? "" : route}`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /https:\/\/farhanshafee.com\/opengraph-image/,
    );
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")!)))
      if (href.startsWith("/")) links.add(href);
    await expect(
      page.locator('a[target="_blank"]:not([rel~="noopener"])'),
    ).toHaveCount(0);
  }
  for (const href of links)
    expect((await request.get(href)).status(), href).toBe(200);
  for (const path of [
    "/rss.xml",
    "/sitemap.xml",
    "/robots.txt",
    "/llms.txt",
    "/opengraph-image",
  ])
    expect((await request.get(path)).status(), path).toBe(200);
  const articles = getPublishedArticles();
  const rss = await (await request.get("/rss.xml")).text();
  expect(rss.match(/<item>/g)?.length ?? 0).toBe(articles.length);
  const sitemapXml = await (await request.get("/sitemap.xml")).text();
  expect(sitemapXml.match(/<loc>/g)?.length).toBe(sitemap().length);
  for (const file of readdirSync("content/writing").filter((f) =>
    f.endsWith(".mdx"),
  )) {
    const article = parseArticle(
      readFileSync(`content/writing/${file}`, "utf8"),
      file,
    );
    if (articles.some((published) => published.slug === article.slug)) continue;
    const slug = article.slug;
    expect(sitemapXml).not.toContain(`/writing/${slug}`);
    const response = await request.get(`/writing/${slug}`);
    expect(response.status(), slug).toBe(404);
    expect(await response.text()).toContain('name="robots" content="noindex"');
  }
  if (!getArticleTags().includes("verification-unpublished"))
    expect(
      (await request.get("/writing/tag/verification-unpublished")).status(),
    ).toBe(404);
  expect((await request.get("/work/unpublished-project")).status()).toBe(404);
  expect((await request.get("/not-a-page")).status()).toBe(404);
});
