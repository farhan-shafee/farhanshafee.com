import { test, expect, type Locator, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getPublicProjects, type ProjectImage } from "../../src/data/projects";
import { readdirSync, readFileSync } from "node:fs";
import {
  getPublishedArticles,
  getArticleTags,
  getTableOfContents,
  parseArticle,
} from "../../src/lib/writing";
import sitemap from "../../src/app/sitemap";
import {
  approvedProjectSlugs,
  excludedPublicContent,
  retiredProjectRoutes,
  retiredPublicAssets,
} from "../portfolio-policy";
import { siteConfig } from "../../src/config/site";

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
const publishedArticles = getPublishedArticles();
const articlesByRoute = new Map(
  publishedArticles.map((article) => [`/writing/${article.slug}`, article]),
);
const routes = [
  ...coreRoutes,
  ...projectsByRoute.keys(),
  ...articlesByRoute.keys(),
];
const engineeringCaseSlugs = ["aegisgraph", "creditops-ai", "tradeflow"];
const aegisgraphRoute = "/work/aegisgraph";
const aegisgraphRepository = "https://github.com/farhan-shafee/aegisgraph";
const aegisgraphCiWorkflow = `${aegisgraphRepository}/actions/workflows/ci.yml`;
const aegisgraphDemo = "https://aegisgraph.farhan-shafee.com";
const aegisgraphArticleRoute =
  "/writing/building-an-evidence-grounded-ai-security-investigation-system";
const tradeflowTitle = "TradeFlow";
const tradeflowRoute = "/work/tradeflow";
const oldJobEngineTitle = /AI\s+Job\s+Intelligence\s+Engine/i;
const canonicalOrigin = "https://farhan-shafee.com";
const oldOrigin = /https?:\/\/(?:www\.)?farhanshafee\.com\b/i;
const projectOrder = [
  "AegisGraph",
  "CreditOps AI",
  "TradeFlow",
  "SecurePay / DevSecOps Pipeline",
  "Detection Engineering Lab",
  "Cloud Security",
  "Vulnerability Management",
];

async function expectEvidenceLink(link: Locator, href: string) {
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", href);
  if (href.startsWith("https://")) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /\bnoopener\b/);
    await expect(link).toHaveAttribute("rel", /\bnoreferrer\b/);
  } else await expect(link).not.toHaveAttribute("target", "_blank");
}

function imagesForRoute(route: string): ProjectImage[] | undefined {
  if (articlesByRoute.has(route)) return undefined;
  if (route === "/" || route === "/work") {
    return [aegisgraphRoute, tradeflowRoute].map((projectRoute) => {
      const preview = projectsByRoute.get(projectRoute)?.screenshots?.[0];
      if (!preview)
        throw new Error(`${projectRoute} needs its reviewed preview image`);
      return preview;
    });
  }
  const project = projectsByRoute.get(route);
  return [
    ...(project?.architectureDiagrams ?? []),
    ...(project?.screenshots ?? []),
  ];
}

type ImageEvidence = Pick<ProjectImage, "alt" | "width" | "height"> & {
  src: string;
};

async function expectImages(page: Page, assets: ImageEvidence[] | undefined) {
  // Article figures are authored in MDX. Verify their declared dimensions against
  // actual loaded images without copying editorial alt text into the test.
  assets ??= await page.locator("main img").evaluateAll((nodes) =>
    nodes.map((node) => {
      const image = node as HTMLImageElement;
      return {
        src: image.getAttribute("src") ?? "",
        alt: image.alt,
        width: Number(image.getAttribute("width")),
        height: Number(image.getAttribute("height")),
      };
    }),
  );
  await expect(page.locator("main img")).toHaveCount(assets.length);
  for (const asset of assets) {
    const image = page.getByRole("img", { name: asset.alt, exact: true });
    await expect(image).toHaveCount(1);
    await expect(image).toHaveAttribute("alt", /\S/);
    await expect(image).toHaveAttribute("width", String(asset.width));
    await expect(image).toHaveAttribute("height", String(asset.height));
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
    const dimensions = await image.evaluate((node) => {
      const image = node as HTMLImageElement;
      const bounds = image.getBoundingClientRect();
      return {
        width: bounds.width,
        height: bounds.height,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      };
    });
    expect(dimensions.width).toBeGreaterThan(0);
    expect(dimensions.height).toBeGreaterThan(0);
    expect(dimensions.naturalHeight).toBeGreaterThan(0);
    const declaredRatio = asset.width / asset.height;
    for (const [kind, ratio] of [
      ["intrinsic", dimensions.naturalWidth / dimensions.naturalHeight],
      ["rendered", dimensions.width / dimensions.height],
    ] as const)
      expect(
        Math.abs(ratio / declaredRatio - 1),
        `${asset.src} preserves its ${kind} aspect ratio`,
      ).toBeLessThan(0.01);
  }
}

for (const theme of ["light", "dark"] as const) {
  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    test(`all pages render without overflow in ${theme} theme at ${width}px`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: 1000 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      for (const route of routes) {
        const response = await page.goto(route);
        expect(response?.status(), route).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        await expect(page.locator("h1"), route).toHaveCount(1);
        await expect(page.locator("main")).toBeVisible();
        await expectImages(page, imagesForRoute(route));
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
          `${route} overflow in ${theme} theme at ${width}px`,
        ).toBeLessThanOrEqual(dimensions.viewport);
        if (route === "/")
          await page.screenshot({
            path: `.artifacts/home-${theme}-${width}.png`,
            fullPage: true,
          });
        if (
          (route === "/work" || route.startsWith("/work/")) &&
          [375, 1440].includes(width)
        )
          await page.screenshot({
            path: `.artifacts/evidence-${route === "/work" ? "work-index" : route.split("/").at(-1)}-${theme}-${width}.png`,
            fullPage: true,
          });
      }
      expect(errors).toEqual([]);
    });
  }
}

for (const theme of ["light", "dark"] as const) {
  test(`public routes pass axe in ${theme} theme`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await expectImages(page, imagesForRoute(route));
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
    test(`engineering evidence loads in ${theme} theme at ${width}px`, async ({
      page,
    }) => {
      const screenshotRscRequests: string[] = [];
      page.on("request", (request) => {
        const url = new URL(request.url());
        if (
          /^\/projects\/.+\.(?:png|jpe?g)$/i.test(url.pathname) &&
          url.searchParams.has("_rsc")
        )
          screenshotRscRequests.push(request.url());
      });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: width === 375 ? 812 : 1000 });
      for (const slug of engineeringCaseSlugs) {
        const route = `/work/${slug}`;
        const project = projectsByRoute.get(route);
        expect(
          project,
          `${slug} is a public engineering case study`,
        ).toBeDefined();
        const response = await page.goto(route);
        expect(response?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        await expectImages(page, imagesForRoute(route));
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: "instant" }),
        );
        await page.screenshot({
          path: `.artifacts/flagship-${slug}-${theme}-${width}.png`,
          fullPage: true,
        });
        const firstScreenshot = project?.screenshots?.[0];
        if (firstScreenshot) {
          const original = page
            .getByRole("link", {
              name: "View full-size screenshot",
              exact: true,
            })
            .first();
          await expect(original).toHaveAttribute("href", firstScreenshot.src);
          const imageUrl = new URL(firstScreenshot.src, page.url()).href;
          const [imageResponse] = await Promise.all([
            page.waitForResponse(
              (response) =>
                response.url() === imageUrl &&
                response.request().isNavigationRequest(),
            ),
            original.click(),
          ]);
          await expect(page).toHaveURL(imageUrl);
          expect(imageResponse.status()).toBe(200);
          expect(imageResponse.headers()["content-type"]).toMatch(
            /\.jpe?g$/i.test(firstScreenshot.src)
              ? /^image\/jpeg\b/i
              : /^image\/png\b/i,
          );
          await expect(page.locator("img")).toHaveJSProperty("complete", true);
          await expect(page.locator("img")).toHaveJSProperty(
            "naturalWidth",
            firstScreenshot.width,
          );
          await expect(page.locator("img")).toHaveJSProperty(
            "naturalHeight",
            firstScreenshot.height,
          );
        }
        expect(
          screenshotRscRequests,
          "Original screenshots must load as images without App Router prefetch requests",
        ).toEqual([]);
      }
    });
  }
}

test("cold page loads keep image-led layouts stable", async ({
  browser,
  baseURL,
}, testInfo) => {
  const measurements: { route: string; width: number; cls: number }[] = [];
  for (const width of [375, 1440]) {
    for (const route of [
      "/",
      "/work",
      aegisgraphRoute,
      "/work/creditops-ai",
      tradeflowRoute,
    ]) {
      // A fresh browser context gives each route an empty browser cache.
      const context = await browser.newContext({
        baseURL,
        viewport: { width, height: 1000 },
        colorScheme: "light",
        reducedMotion: "reduce",
      });
      try {
        const page = await context.newPage();
        await page.addInitScript(() => {
          const entries: { value: number; startTime: number }[] = [];
          const record = (records: PerformanceEntry[]) => {
            for (const record of records) {
              const entry = record as PerformanceEntry & {
                value: number;
                hadRecentInput: boolean;
              };
              if (!entry.hadRecentInput)
                entries.push({
                  value: entry.value,
                  startTime: entry.startTime,
                });
            }
          };
          const observer = new PerformanceObserver((list) =>
            record(list.getEntries()),
          );
          observer.observe({ type: "layout-shift", buffered: true });
          Object.assign(window, {
            readLayoutShifts: () => {
              record(observer.takeRecords());
              return entries;
            },
          });
        });
        const response = await page.goto(route);
        expect(response?.status(), route).toBe(200);
        expect(
          await page.evaluate(() =>
            PerformanceObserver.supportedEntryTypes.includes("layout-shift"),
          ),
          "The browser must expose layout-shift entries for CLS measurement",
        ).toBe(true);
        await expectImages(page, imagesForRoute(route));
        await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          );
        });
        const shifts = await page.evaluate(() => {
          const measuredWindow: Window & {
            readLayoutShifts?: () => { value: number; startTime: number }[];
          } = window;
          if (!measuredWindow.readLayoutShifts)
            throw new Error("The CLS observer was not initialized");
          return measuredWindow.readLayoutShifts();
        });
        let cls = 0;
        let sessionValue = 0;
        let sessionStart = -Infinity;
        let previousShift = -Infinity;
        for (const shift of shifts) {
          if (
            shift.startTime - previousShift >= 1000 ||
            shift.startTime - sessionStart >= 5000
          ) {
            sessionValue = 0;
            sessionStart = shift.startTime;
          }
          sessionValue += shift.value;
          previousShift = shift.startTime;
          cls = Math.max(cls, sessionValue);
        }
        measurements.push({ route, width, cls });
        console.log(`Cold-load CLS ${route} at ${width}px: ${cls.toFixed(4)}`);
        expect(cls, `${route} CLS at ${width}px`).toBeLessThanOrEqual(0.1);
      } finally {
        await context.close();
      }
    }
  }
  await testInfo.attach("cold-load-cls", {
    body: JSON.stringify(measurements, null, 2),
    contentType: "application/json",
  });
});

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
    .getByRole("link", { name: tradeflowTitle, exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/work\/tradeflow$/);
  await expect(page.locator("h1")).toHaveText(tradeflowTitle);

  for (const route of [tradeflowRoute, "/work/creditops-ai", aegisgraphRoute]) {
    await page.goto(route);
    const links = page
      .getByRole("region", { name: "Inspect the system", exact: true })
      .locator(".evidence-links a");
    expect(await links.count()).toBeGreaterThan(0);
    await links.first().focus();
    for (let index = 0; index < (await links.count()); index++) {
      await expect(links.nth(index)).toBeFocused();
      if (index + 1 < (await links.count())) await page.keyboard.press("Tab");
    }
  }

  await page.goto(aegisgraphArticleRoute);
  await page.setViewportSize({ width: 320, height: 812 });
  const codeBlocks = page.getByRole("region", {
    name: "Code example",
    exact: true,
  });
  expect(await codeBlocks.count()).toBeGreaterThanOrEqual(2);
  for (const block of await codeBlocks.all()) {
    await expect(block).toHaveAttribute("tabindex", "0");
    await block.focus();
    await expect(block).toBeFocused();
    const dimensions = await block.evaluate((node) => ({
      content: node.scrollWidth,
      container: node.clientWidth,
      document: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
    if (dimensions.content > dimensions.container) {
      await block.press("ArrowRight");
      await expect
        .poll(() => block.evaluate((node) => node.scrollLeft))
        .toBeGreaterThan(0);
    }
  }

  const tocLink = page
    .getByRole("navigation", { name: "On this page" })
    .getByRole("link")
    .first();
  const fragment = await tocLink.getAttribute("href");
  expect(fragment).toMatch(/^#.+/);
  const sectionUrl = new URL(fragment!, page.url()).href;
  await tocLink.click();
  await expect(page).toHaveURL(sectionUrl);
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"], {
    origin: new URL(page.url()).origin,
  });
  const headingLink = page.locator(".prose a.heading-anchor").first();
  await headingLink.focus();
  await expect(headingLink).toBeFocused();
  await headingLink.press("Enter");
  await expect(page.locator(".prose").getByRole("status")).toHaveText(
    "Section link copied to clipboard.",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    sectionUrl,
  );
});

for (const theme of ["light", "dark"] as const) {
  test(`AegisGraph V2 supports visible keyboard focus, reduced motion, and zoom-equivalent reflow in ${theme} theme`, async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    await page.goto(aegisgraphRoute);
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    const workflow = page.locator('[aria-labelledby="system"] ol.case-process');
    await expect(workflow).toBeVisible();
    await expect(workflow.getByRole("listitem")).toHaveCount(13);
    for (const id of ["detection-regression", "evidence-export"])
      await expect(page.locator(`[aria-labelledby="${id}"]`)).toBeVisible();
    await expectImages(page, imagesForRoute(aegisgraphRoute));

    // Keyboard modality makes :focus-visible observable even when starting a
    // long page's evidence-link sequence without tabbing through the header.
    await page.keyboard.press("Tab");
    const links = page
      .getByRole("region", { name: "Inspect the system", exact: true })
      .locator(".evidence-links a");
    await links.first().focus();
    for (let index = 0; index < (await links.count()); index++) {
      const link = links.nth(index);
      await expect(link).toBeFocused();
      const outline = await link.evaluate((node) => {
        const style = getComputedStyle(node);
        return {
          visible: node.matches(":focus-visible"),
          width: parseFloat(style.outlineWidth),
          style: style.outlineStyle,
          color: style.outlineColor,
        };
      });
      expect(outline.visible).toBe(true);
      expect(outline.width).toBeGreaterThanOrEqual(2);
      expect(outline.style).not.toBe("none");
      expect(outline.color).not.toBe("rgba(0, 0, 0, 0)");
      if (index + 1 < (await links.count())) await page.keyboard.press("Tab");
    }
    const motion = await page.evaluate(() => ({
      reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      durations: [...document.querySelectorAll("a, button")].flatMap((node) => {
        const style = getComputedStyle(node);
        return [style.animationDuration, style.transitionDuration].flatMap(
          (value) => value.split(",").map((duration) => parseFloat(duration)),
        );
      }),
    }));
    expect(motion.reduced).toBe(true);
    expect(motion.scrollBehavior).toBe("auto");
    expect(Math.max(...motion.durations)).toBeLessThanOrEqual(0.00002);

    // These CSS viewports reproduce the available layout space at 200% and
    // 400% desktop zoom. They test reflow, not browser-chrome zoom behavior.
    for (const { zoom, width, height } of [
      { zoom: 200, width: 640, height: 512 },
      { zoom: 400, width: 320, height: 256 },
    ]) {
      await page.setViewportSize({ width, height });
      await expect(workflow).toBeVisible();
      for (const region of [workflow, links, page.locator("main figure")])
        for (const element of await region.all()) {
          await element.scrollIntoViewIfNeeded();
          const bounds = await element.boundingBox();
          expect(bounds).not.toBeNull();
          expect(bounds!.x).toBeGreaterThanOrEqual(0);
          expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
        }
      const dimensions = await page.evaluate(() => ({
        document: document.documentElement.scrollWidth,
        viewport: innerWidth,
      }));
      expect(
        dimensions.document,
        `${zoom}% equivalent reflow`,
      ).toBeLessThanOrEqual(dimensions.viewport);
      await page.screenshot({
        path: `.artifacts/aegisgraph-reflow-${zoom}-${theme}.png`,
        fullPage: true,
      });
    }
  });
}

test("metadata, internal links, security headers and feeds are valid", async ({
  page,
  request,
}) => {
  const links = new Set<string>();
  const titles = new Set<string>();
  const publicHtml = new Map<string, string>();
  const publicHtmlRoutes = new Set([
    ...routes,
    ...sitemap().map(({ url }) => new URL(url).pathname),
  ]);
  for (const route of publicHtmlRoutes) {
    const response = await page.goto(route);
    // Check the full response, including metadata and React's serialized output.
    const html = await response!.text();
    publicHtml.set(route, html);
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
    const verificationTag = page.locator(
      'meta[name="google-site-verification"]',
    );
    if (siteConfig.googleSiteVerification)
      await expect(verificationTag).toHaveAttribute(
        "content",
        siteConfig.googleSiteVerification,
      );
    else await expect(verificationTag).toHaveCount(0);
    const linkedInLinks = page.locator('a[href*="linkedin.com"]');
    if (siteConfig.linkedin) {
      for (const scope of ["header", "footer"])
        await expect(
          page.locator(`${scope} a[href*="linkedin.com"]`),
        ).toHaveAttribute("href", siteConfig.linkedin);
      if (route === "/about" || route === "/contact")
        await expect(
          page.locator('main a[href*="linkedin.com"]'),
        ).toHaveAttribute("href", siteConfig.linkedin);
      for (const link of await linkedInLinks.all())
        await expect(link).toHaveAttribute("href", siteConfig.linkedin);
    } else await expect(linkedInLinks).toHaveCount(0);
    const structuredData = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) =>
        scripts.flatMap((script) => {
          const schema = JSON.parse(script.textContent ?? "{}");
          return schema["@graph"] ?? [schema];
        }),
      );
    if (route === "/" || route === "/writing") {
      const article = articlesByRoute.get(aegisgraphArticleRoute);
      expect(
        article,
        "The reviewed AegisGraph article is public",
      ).toBeDefined();
      await expect(
        page
          .locator("main")
          .getByRole("link", { name: article!.title, exact: true }),
      ).toHaveAttribute("href", aegisgraphArticleRoute);
      if (route === "/writing")
        await expect(
          page.getByRole("article", { name: article!.title, exact: true }),
        ).toBeVisible();
    }
    const article = articlesByRoute.get(route);
    if (article) {
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveText(article.title);
      await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute(
        "content",
        /noindex/,
      );
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
        "content",
        "article",
      );
      await expect(
        page.locator('meta[property="article:published_time"]'),
      ).toHaveAttribute("content", article.date);
      for (const selector of [
        'meta[name="description"]',
        'meta[property="og:description"]',
        'meta[name="twitter:description"]',
      ])
        await expect(page.locator(selector)).toHaveAttribute(
          "content",
          article.description,
        );
      const schema = structuredData.find(
        (entry) => entry["@type"] === "BlogPosting",
      );
      expect(schema).toMatchObject({
        "@id": `${canonicalOrigin}${route}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        dateModified: article.updated ?? article.date,
        url: `${canonicalOrigin}${route}`,
        mainEntityOfPage: `${canonicalOrigin}${route}`,
        author: { "@id": `${canonicalOrigin}/#person`, name: siteConfig.name },
      });
      if (article.ogImage)
        expect(schema.image).toBe(
          new URL(article.ogImage, canonicalOrigin).toString(),
        );
      const breadcrumbs = structuredData.find(
        (entry) => entry["@type"] === "BreadcrumbList",
      );
      expect(
        breadcrumbs.itemListElement.map(
          (entry: { item: string }) => entry.item,
        ),
      ).toEqual([
        canonicalOrigin,
        `${canonicalOrigin}/writing`,
        `${canonicalOrigin}${route}`,
      ]);
      const headings = getTableOfContents(article.body);
      const toc = page.getByRole("navigation", { name: "On this page" });
      await expect(toc.getByRole("link")).toHaveCount(headings.length);
      for (const heading of headings) {
        await expect(
          toc.getByRole("link", { name: heading.title, exact: true }),
        ).toHaveAttribute("href", `#${heading.id}`);
        await expect(page.locator(`[id="${heading.id}"]`)).toHaveCount(1);
      }
      if (route === aegisgraphArticleRoute) {
        await expect(page.locator("main figure img")).toHaveCount(2);
        for (const caption of await page
          .locator("main figure figcaption")
          .all())
          await expect(caption).toContainText(/\S/);
        for (const href of [
          aegisgraphDemo,
          aegisgraphRepository,
          aegisgraphRoute,
        ])
          await expect(
            page.locator(`main a[href="${href}"]`).first(),
          ).toBeVisible();
        expect(await page.locator("main").innerText()).not.toContain(
          "It is a local engineering demonstration",
        );
      }
    }
    if (route === "/") {
      const proof = page.getByRole("navigation", {
        name: "Selected evidence",
        exact: true,
      });
      await expect(proof).toBeVisible();
      for (const href of [
        `${aegisgraphRepository}/blob/main/docs/threat-model/THREAT_MODEL.md`,
        "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/TEST_STRATEGY.md",
        aegisgraphArticleRoute,
      ])
        await expectEvidenceLink(proof.locator(`a[href="${href}"]`), href);
      const person = structuredData.find(
        (schema) => schema["@type"] === "Person",
      );
      expect(person).toMatchObject({
        "@id": `${canonicalOrigin}/#person`,
        url: canonicalOrigin,
        sameAs: [siteConfig.github, siteConfig.linkedin].filter(Boolean),
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
          sameAs: [siteConfig.github, siteConfig.linkedin].filter(Boolean),
        },
      });
    }
    if (route === "/" || route === "/work") {
      const headings = await page
        .locator("main")
        .getByRole("heading")
        .allTextContents();
      expect(
        headings
          .map((heading) => heading.trim())
          .filter((heading) => projectOrder.includes(heading)),
        `${route} preserves three selected systems and four supporting security projects`,
      ).toEqual(route === "/" ? projectOrder.slice(0, 3) : projectOrder);
      if (route === "/work") {
        await expect(
          page.getByRole("heading", { name: tradeflowTitle, exact: true }),
        ).toBeVisible();
        await expect(
          page.getByRole("link", { name: tradeflowTitle, exact: true }),
        ).toHaveAttribute("href", tradeflowRoute);
        await expect(
          page.locator("#security-engineering .project-entry"),
        ).toHaveCount(4);
      } else {
        await expect(
          page.locator('a[href="/work#security-engineering"]'),
        ).toBeVisible();
      }
      for (const project of publicProjects.filter(
        (project) => route === "/work" || project.featured,
      )) {
        const card = page.locator(".project-entry").filter({
          has: page.getByRole("heading", { name: project.title, exact: true }),
        });
        const featuredLinks =
          project.inspection?.links.filter(({ featured }) => featured) ?? [];
        await expect(card.locator(".evidence-links a")).toHaveCount(
          featuredLinks.length,
        );
        for (const { href } of featuredLinks)
          await expectEvidenceLink(
            card.locator(`.evidence-links a[href="${href}"]`),
            href,
          );
      }
    }
    const project = projectsByRoute.get(route);
    if (project) {
      await expect(page.locator("h1")).toHaveText(project.title);
      const breadcrumbs = structuredData.find(
        (schema) => schema["@type"] === "BreadcrumbList",
      );
      expect(breadcrumbs, `${route} has project breadcrumbs`).toBeDefined();
      expect(breadcrumbs.itemListElement).toContainEqual({
        "@type": "ListItem",
        position: 2,
        name: project.title,
        item: `${canonicalOrigin}${route}`,
      });
      const work = structuredData.find(
        (schema) => schema["@type"] === "CreativeWork",
      );
      if (project.github) {
        expect(work).toMatchObject({
          url: `${canonicalOrigin}${route}`,
          author: { "@id": `${canonicalOrigin}/#person` },
          about: {
            "@type": "SoftwareSourceCode",
            codeRepository: project.github,
            ...(project.website ? { url: project.website } : {}),
          },
        });
      } else if (project.sourceVisibility === "private") {
        expect(work).toMatchObject({
          url: `${canonicalOrigin}${route}`,
          author: { "@id": `${canonicalOrigin}/#person` },
        });
        expect(work.about).toBeUndefined();
        await expect(
          page.getByText("Source private", { exact: true }),
        ).toBeVisible();
        expect(JSON.stringify(structuredData)).not.toMatch(
          /SoftwareSourceCode|codeRepository|github\.com\/farhan-shafee\/creditops/i,
        );
      } else expect(work).toBeUndefined();
      const inspection = page.getByRole("region", {
        name: "Inspect the system",
        exact: true,
      });
      if (project.inspection) {
        await expect(inspection).toBeVisible();
        await expect(inspection.locator(".evidence-links a")).toHaveCount(
          project.inspection.links.length +
            (project.inspection.guidedLinks?.length ?? 0),
        );
        for (const { href } of [
          ...project.inspection.links,
          ...(project.inspection.guidedLinks ?? []),
        ])
          await expectEvidenceLink(
            inspection.locator(`a[href="${href}"]`),
            href,
          );
        for (const { label, value } of project.inspection.facts) {
          await expect(
            inspection.locator("dt").filter({ hasText: label }),
          ).toHaveCount(1);
          await expect(
            inspection.locator("dd").filter({ hasText: value }),
          ).toHaveCount(1);
        }
        expect(
          await inspection.evaluate((node) => {
            const details = document.querySelector(
              '[aria-label="Project details"]',
            );
            return Boolean(
              details &&
              node.compareDocumentPosition(details) &
                Node.DOCUMENT_POSITION_FOLLOWING,
            );
          }),
        ).toBe(true);
      } else await expect(inspection).toHaveCount(0);
    }
    if (route === aegisgraphRoute) {
      expect(response?.status()).toBe(200);
      expect(title).toBe("AegisGraph | Farhan Shafee");
      const inspection = page.getByRole("region", {
        name: "Inspect the system",
        exact: true,
      });
      for (const href of [
        aegisgraphRepository,
        aegisgraphDemo,
        aegisgraphCiWorkflow,
        `${aegisgraphRepository}/blob/main/docs/evaluations/BENCHMARK.md`,
        `${aegisgraphRepository}/blob/main/docs/FINAL_EXCELLENCE_REVIEW.md`,
        aegisgraphArticleRoute,
      ])
        await expectEvidenceLink(inspection.locator(`a[href="${href}"]`), href);
      await expect(inspection).toContainText(/read-only/i);
      await expect(inspection).toContainText(/deterministic/i);
      await expect(inspection).toContainText(/no live OpenAI/i);
      expect(await page.locator("main").innerText()).not.toContain(
        "It is a local engineering demonstration",
      );
      for (const selector of [
        'meta[name="description"]',
        'meta[property="og:description"]',
        'meta[name="twitter:description"]',
      ])
        await expect(page.locator(selector)).toHaveAttribute(
          "content",
          project!.description,
        );
      for (const selector of [
        'meta[property="og:title"]',
        'meta[name="twitter:title"]',
      ])
        await expect(page.locator(selector)).toHaveAttribute(
          "content",
          "AegisGraph | Farhan Shafee",
        );
      for (const id of [
        "ai-grounding",
        "validation",
        "detection-regression",
        "evidence-export",
      ])
        await expect(page.locator(`h2#${id}`)).toBeVisible();
    }
    if (route === tradeflowRoute) {
      expect(response?.status()).toBe(200);
      await expect(page).toHaveURL(new RegExp(`${tradeflowRoute}$`));
      await expect(page.locator("h1")).toHaveText(tradeflowTitle);
      expect(title).toBe(`${tradeflowTitle} | Farhan Shafee`);
      const project = projectsByRoute.get(tradeflowRoute)!;
      for (const selector of [
        'meta[property="og:title"]',
        'meta[name="twitter:title"]',
      ])
        await expect(page.locator(selector)).toHaveAttribute(
          "content",
          `${tradeflowTitle} | Farhan Shafee`,
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
        `${canonicalOrigin}${tradeflowRoute}`,
      );
      const breadcrumbs = structuredData.find(
        (schema) => schema["@type"] === "BreadcrumbList",
      );
      expect(breadcrumbs).toBeDefined();
      expect(breadcrumbs.itemListElement).toContainEqual({
        "@type": "ListItem",
        position: 2,
        name: tradeflowTitle,
        item: `${canonicalOrigin}${tradeflowRoute}`,
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
        if (siteConfig.linkedin)
          expect(body).toContain(`[LinkedIn](${siteConfig.linkedin})`);
        expect(body).toContain(`](${canonicalOrigin}/about)`);
        expect(body).toContain(`](${canonicalOrigin}/rss.xml)`);
        expect(body).toContain(`](${canonicalOrigin}/sitemap.xml)`);
        expect(body).toContain(
          `[AegisGraph](${canonicalOrigin}${aegisgraphRoute})`,
        );
        expect(body).toContain(`](${aegisgraphRepository})`);
        for (const { href } of projectsByRoute.get(aegisgraphRoute)!.inspection!
          .links)
          expect(body).toContain(
            `](${new URL(href, canonicalOrigin).toString()})`,
          );
        expect(body).toContain(aegisgraphDemo);
        expect(body).toMatch(/read-only/i);
        expect(body).toMatch(/deterministic/i);
        expect(body).not.toContain("It is a local engineering demonstration");
      }
    }
  }
  const articles = getPublishedArticles();
  const rss = await (await request.get("/rss.xml")).text();
  const llms = await (await request.get("/llms.txt")).text();
  expect(rss.match(/<item>/g)?.length ?? 0).toBe(articles.length);
  expect(rss).toContain(`<link>${canonicalOrigin}/writing</link>`);
  expect(rss).toContain(`href="${canonicalOrigin}/rss.xml"`);
  const sitemapXml = await (await request.get("/sitemap.xml")).text();
  expect(sitemapXml.match(/<loc>/g)?.length).toBe(sitemap().length);
  for (const [, url] of sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g))
    expect(new URL(url).origin).toBe(canonicalOrigin);
  for (const article of articles) {
    const url = `${canonicalOrigin}/writing/${article.slug}`;
    expect(rss).toContain(`<guid isPermaLink="true">${url}</guid>`);
    expect(sitemapXml).toContain(`<loc>${url}</loc>`);
    expect(llms).toContain(`](${url})`);
    for (const tag of article.tags) {
      const tagPage = await request.get(`/writing/tag/${tag}`);
      expect(tagPage.status()).toBe(200);
      expect(await tagPage.text()).toContain(`href="/writing/${article.slug}"`);
    }
  }
  for (const slug of approvedProjectSlugs) {
    expect(sitemapXml).toContain(`<loc>${canonicalOrigin}/work/${slug}</loc>`);
    expect(llms).toContain(`${canonicalOrigin}/work/${slug}`);
  }
  for (const route of retiredProjectRoutes) {
    expect(sitemapXml).not.toContain(route);
    expect(llms).not.toContain(route);
    expect(rss).not.toContain(route);
    const response = await request.get(route);
    expect(response.status(), route).toBe(404);
    const html = await response.text();
    expect(html).toContain('name="robots" content="noindex"');
    // Next's router bootstrap includes the requested URL even for a 404. The
    // retired route must expose no project content, metadata, or project schema.
    expect(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")).not.toMatch(
      excludedPublicContent,
    );
    expect(html).not.toMatch(/CreativeWork|SoftwareSourceCode|BreadcrumbList/);
  }
  for (const asset of retiredPublicAssets)
    expect((await request.get(asset)).status(), asset).toBe(404);
  for (const [route, html] of publicHtml)
    expect(html, route).not.toMatch(excludedPublicContent);
  expect(llms).not.toMatch(excludedPublicContent);
  expect(llms).toContain("Source private");
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
    expect(rss).not.toContain(`/writing/${slug}`);
    expect(llms).not.toContain(`/writing/${slug}`);
    for (const [route, html] of publicHtml)
      expect(html, `No draft link on ${route}`).not.toContain(
        `/writing/${slug}`,
      );
    const response = await request.get(`/writing/${slug}`);
    expect(response.status(), slug).toBe(404);
    expect(await response.text()).toContain('name="robots" content="noindex"');
  }
  if (!getArticleTags().includes("verification-unpublished"))
    expect(
      (await request.get("/writing/tag/verification-unpublished")).status(),
    ).toBe(404);
  expect((await request.get("/work/unpublished-project")).status()).toBe(404);
  const unknownResponse = await request.get("/work/unknown-test-only-project");
  expect(unknownResponse.status()).toBe(404);
  expect(await unknownResponse.text()).toContain(
    'name="robots" content="noindex"',
  );
  expect((await request.get("/not-a-page")).status()).toBe(404);
});

test("www redirects permanently while preserving paths and queries without redirecting local or other hosts", async ({
  request,
}) => {
  const paths = [
    "/",
    `${tradeflowRoute}?source=domain-check&return=%2Fwork%3Fview%3Dall`,
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
