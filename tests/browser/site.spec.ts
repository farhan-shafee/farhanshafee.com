import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getPublicProjects, type Project } from "../../src/data/projects";
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
const publicProjects = getPublicProjects();
const projectsByRoute = new Map(
  publicProjects.map((project) => [`/work/${project.slug}`, project]),
);
const routes = [...coreRoutes, ...projectsByRoute.keys()];
const flagshipSlugs = ["cyberbit-solutions", "ai-job-intelligence-engine"];
const jobEngineTitle = "Job Intelligence Engine";
const jobEngineRoute = "/work/ai-job-intelligence-engine";
const oldJobEngineTitle = /AI\s+Job\s+Intelligence\s+Engine/i;
const canonicalOrigin = "https://farhan-shafee.com";
const oldOrigin = /https?:\/\/(?:www\.)?farhanshafee\.com\b/i;

async function expectProjectImages(page: Page, project: Project) {
  const assets = [
    ...(project.architectureDiagrams ?? []),
    ...(project.screenshots ?? []),
  ];
  await expect(page.locator("main img")).toHaveCount(assets.length);
  for (const asset of assets) {
    const image = page.getByRole("img", { name: asset.alt, exact: true });
    await expect(image).toHaveCount(1);
    await expect(image).toHaveAttribute("alt", /\S/);
    const source = new URL((await image.getAttribute("src")) ?? "", page.url());
    expect(source.searchParams.get("url") ?? source.pathname).toBe(asset.src);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect(image).toHaveJSProperty("complete", true);
    await expect
      .poll(() =>
        image.evaluate((node) => (node as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }
}

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
      const project = projectsByRoute.get(route);
      if (project) await expectProjectImages(page, project);
      // Capture fixed elements from their normal viewport position after lazy images load.
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
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
      if (
        (route === "/work" || route.startsWith("/work/")) &&
        [375, 1440].includes(width)
      )
        await page.screenshot({
          path: `.artifacts/evidence-${route === "/work" ? "work-index" : route.split("/").at(-1)}-${width}.png`,
          fullPage: true,
        });
    }
    expect(errors).toEqual([]);
  });
}

for (const theme of ["light", "dark"] as const) {
  test(`core and project routes pass axe in ${theme} theme`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: theme });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      const project = projectsByRoute.get(route);
      if (project) await expectProjectImages(page, project);
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

  for (const width of [375, 1440]) {
    test(`flagship evidence loads in ${theme} theme at ${width}px`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: width === 375 ? 812 : 1000 });
      for (const slug of flagshipSlugs) {
        const route = `/work/${slug}`;
        const project = projectsByRoute.get(route);
        expect(project, `${slug} is a public flagship`).toBeDefined();
        const response = await page.goto(route);
        expect(response?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        await expectProjectImages(page, project!);
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: "instant" }),
        );
        await page.screenshot({
          path: `.artifacts/flagship-${slug}-${theme}-${width}.png`,
          fullPage: true,
        });
      }
    });
  }
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
  const publicHtmlRoutes = new Set([
    ...routes,
    ...sitemap().map(({ url }) => new URL(url).pathname),
  ]);
  for (const route of publicHtmlRoutes) {
    const response = await page.goto(route);
    // Check the full response, including metadata and React's serialized output.
    const html = await response!.text();
    expect(html, `No editorial TODOs on ${route}`).not.toMatch(
      /\bTODO\b|projectEvidenceBacklog/,
    );
    expect(html, `No stale project name on ${route}`).not.toMatch(
      oldJobEngineTitle,
    );
    expect(html, `No links to the unowned old domain on ${route}`).not.toMatch(
      oldOrigin,
    );
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
      `${canonicalOrigin}${route === "/" ? "" : route}`,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `${canonicalOrigin}${route === "/" ? "" : route}`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      `${canonicalOrigin}/opengraph-image`,
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      "content",
      `${canonicalOrigin}/opengraph-image`,
    );
    await expect(
      page.locator('link[type="application/rss+xml"]'),
    ).toHaveAttribute("href", `${canonicalOrigin}/rss.xml`);
    const structuredData = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) =>
        scripts.flatMap((script) => {
          const schema = JSON.parse(script.textContent ?? "{}");
          return schema["@graph"] ?? [schema];
        }),
      );
    if (route === "/") {
      const person = structuredData.find(
        (schema) => schema["@type"] === "Person",
      );
      expect(person).toMatchObject({
        "@id": `${canonicalOrigin}/#person`,
        url: canonicalOrigin,
      });
    }
    if (route === "/about") {
      const profile = structuredData.find(
        (schema) => schema["@type"] === "ProfilePage",
      );
      expect(profile).toMatchObject({
        "@id": `${canonicalOrigin}/about#profile`,
        url: `${canonicalOrigin}/about`,
        mainEntity: {
          "@id": `${canonicalOrigin}/#person`,
          url: canonicalOrigin,
        },
      });
    }
    if (route === "/" || route === "/work") {
      await expect(
        page.getByRole("heading", { name: jobEngineTitle, exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: jobEngineTitle, exact: true }),
      ).toHaveAttribute("href", jobEngineRoute);
    }
    if (route === jobEngineRoute) {
      expect(response?.status()).toBe(200);
      await expect(page).toHaveURL(new RegExp(`${jobEngineRoute}$`));
      await expect(page.locator("h1")).toHaveText(jobEngineTitle);
      expect(title).toBe(`${jobEngineTitle} | Farhan Shafee`);
      const project = projectsByRoute.get(jobEngineRoute)!;
      for (const selector of [
        'meta[property="og:title"]',
        'meta[name="twitter:title"]',
      ])
        await expect(page.locator(selector)).toHaveAttribute(
          "content",
          `${jobEngineTitle} | Farhan Shafee`,
        );
      for (const selector of [
        'meta[name="description"]',
        'meta[property="og:description"]',
        'meta[name="twitter:description"]',
      ])
        await expect(page.locator(selector)).toHaveAttribute(
          "content",
          project.description,
        );
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        "content",
        `${canonicalOrigin}${jobEngineRoute}`,
      );
      const breadcrumbs = structuredData.find(
        (schema) => schema["@type"] === "BreadcrumbList",
      );
      expect(breadcrumbs).toBeDefined();
      expect(breadcrumbs.itemListElement).toContainEqual({
        "@type": "ListItem",
        position: 2,
        name: jobEngineTitle,
        item: `${canonicalOrigin}${jobEngineRoute}`,
      });
    }
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
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    if (path !== "/opengraph-image") {
      const body = await response.text();
      expect(body, `No editorial TODOs in ${path}`).not.toMatch(/\bTODO\b/);
      expect(body, `No stale project name in ${path}`).not.toMatch(
        oldJobEngineTitle,
      );
      expect(body, `No old canonical domain in ${path}`).not.toMatch(oldOrigin);
      if (path === "/robots.txt")
        expect(body).toContain(`Sitemap: ${canonicalOrigin}/sitemap.xml`);
      if (path === "/llms.txt") {
        expect(body).toContain(`](${canonicalOrigin}/about)`);
        expect(body).toContain(`](${canonicalOrigin}/rss.xml)`);
        expect(body).toContain(`](${canonicalOrigin}/sitemap.xml)`);
      }
    }
  }
  const articles = getPublishedArticles();
  const rss = await (await request.get("/rss.xml")).text();
  expect(rss.match(/<item>/g)?.length ?? 0).toBe(articles.length);
  expect(rss).toContain(`<link>${canonicalOrigin}/writing</link>`);
  expect(rss).toContain(`href="${canonicalOrigin}/rss.xml"`);
  const sitemapXml = await (await request.get("/sitemap.xml")).text();
  expect(sitemapXml.match(/<loc>/g)?.length).toBe(sitemap().length);
  for (const [, url] of sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g))
    expect(new URL(url).origin).toBe(canonicalOrigin);
  expect(sitemapXml).toContain(
    `<loc>${canonicalOrigin}${jobEngineRoute}</loc>`,
  );
  expect(sitemapXml).not.toContain(
    `<loc>${canonicalOrigin}/work/job-intelligence-engine</loc>`,
  );
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

test("www redirects permanently while preserving paths and queries without redirecting local or other hosts", async ({
  request,
}) => {
  const paths = [
    "/",
    `${jobEngineRoute}?source=domain-check&return=%2Fwork%3Fview%3Dall`,
  ];
  for (const route of paths) {
    const response = await request.get(route, {
      headers: { host: "www.farhan-shafee.com" },
      maxRedirects: 0,
    });
    expect(response.status()).toBe(308);
    const destination = new URL(response.headers().location);
    const expected = new URL(route, canonicalOrigin);
    expect(destination.origin).toBe(canonicalOrigin);
    expect(destination.pathname).toBe(expected.pathname);
    expect([...destination.searchParams]).toEqual([...expected.searchParams]);

    const localResponse = await request.get(route, { maxRedirects: 0 });
    expect(localResponse.status()).toBe(200);
    expect(localResponse.headers().location).toBeUndefined();
  }
  for (const host of [
    "farhan-shafee.com",
    "farhanshafee.com",
    "www.farhanshafee.com",
    "preview.example",
    "wwwXfarhan-shafeeXcom",
  ]) {
    const response = await request.get("/", {
      headers: { host },
      maxRedirects: 0,
    });
    expect(response.status(), host).toBe(200);
    expect(response.headers().location, host).toBeUndefined();
  }
});
