import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getPublicProjects, type ProjectImage } from "../../src/data/projects";
import { readdirSync, readFileSync } from "node:fs";
import {
  getPublishedArticles,
  getArticleTags,
  parseArticle,
} from "../../src/lib/writing";
import sitemap from "../../src/app/sitemap";
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
const routes = [...coreRoutes, ...projectsByRoute.keys()];
const engineeringCaseSlugs = [
  "aegisgraph",
  "cyberbit-solutions",
  "ai-job-intelligence-engine",
];
const aegisgraphRoute = "/work/aegisgraph";
const jobEngineTitle = "Job Intelligence Engine";
const jobEngineRoute = "/work/ai-job-intelligence-engine";
const oldJobEngineTitle = /AI\s+Job\s+Intelligence\s+Engine/i;
const canonicalOrigin = "https://farhan-shafee.com";
const oldOrigin = /https?:\/\/(?:www\.)?farhanshafee\.com\b/i;
const projectOrder = [
  "AegisGraph",
  "CyberBit Solutions",
  jobEngineTitle,
  "Detection & Security Engineering Lab",
  "Secure Infrastructure & Homelab",
];

function imagesForRoute(route: string): ProjectImage[] {
  if (route === "/" || route === "/work") {
    return [aegisgraphRoute, "/work/cyberbit-solutions"].map((projectRoute) => {
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

async function expectImages(page: Page, assets: ProjectImage[]) {
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
  test(`core and project routes pass axe in ${theme} theme`, async ({
    page,
  }) => {
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
      "/work/cyberbit-solutions",
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
    if (route === "/") {
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
        `${route} presents AegisGraph, CyberBit, Job Engine, then the two labs`,
      ).toEqual(projectOrder);
      await expect(
        page.getByRole("heading", { name: jobEngineTitle, exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: jobEngineTitle, exact: true }),
      ).toHaveAttribute("href", jobEngineRoute);
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
    }
    if (route === aegisgraphRoute) {
      expect(response?.status()).toBe(200);
      expect(title).toBe("AegisGraph | Farhan Shafee");
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
      await expect(
        page.getByRole("heading", {
          name: "Evidence-grounded AI",
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Validation", exact: true }),
      ).toBeVisible();
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
        if (siteConfig.linkedin)
          expect(body).toContain(`[LinkedIn](${siteConfig.linkedin})`);
        expect(body).toContain(`](${canonicalOrigin}/about)`);
        expect(body).toContain(`](${canonicalOrigin}/rss.xml)`);
        expect(body).toContain(`](${canonicalOrigin}/sitemap.xml)`);
        expect(body).toContain(
          `[AegisGraph](${canonicalOrigin}${aegisgraphRoute})`,
        );
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
  for (const route of [aegisgraphRoute, jobEngineRoute])
    expect(sitemapXml).toContain(`<loc>${canonicalOrigin}${route}</loc>`);
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
