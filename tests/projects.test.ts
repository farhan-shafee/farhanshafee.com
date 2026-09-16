import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { projectEvidenceBacklog } from "../src/data/project-evidence";
import {
  getPublicProjects,
  projects,
  projectStatuses,
  type Project,
  type ProjectImage,
} from "../src/data/projects";

// Next's bundler unwraps this CommonJS default export; native Node/tsx does not.
// Expose the real forwardRef on the test process's wrapper; do not mock image markup.
const loadCommonJs = createRequire(import.meta.url);
const imageModule = loadCommonJs("next/image");
if (imageModule.default) {
  Object.assign(imageModule, imageModule.default);
}
const {
  default: ProjectPage,
  generateMetadata,
  generateStaticParams,
} = await import("../src/app/work/[slug]/page");
const { ProjectCaseStudy } =
  await import("../src/components/project-case-study");

function fixture(overrides: Partial<Project> = {}): Project {
  return {
    title: "Test-only project",
    slug: "test-only-project",
    status: "Exploring",
    category: "Test",
    kind: "personal",
    description: "Renderer fixture, never a public project record.",
    technologies: [],
    featured: false,
    visibility: "private",
    ...overrides,
  };
}

function render(project: Project): string {
  return renderToStaticMarkup(createElement(ProjectCaseStudy, { project }));
}

// Asset fixtures exercise markup only. They are never added to public/ or projects.
const imageFixture: ProjectImage = {
  src: "/test-only-interface.png",
  alt: "Test-only interface description",
  width: 960,
  height: 640,
  caption: "Test-only caption.",
};

const flagshipSlugs = [
  "cyberbit-solutions",
  "ai-job-intelligence-engine",
] as const;

const exploringLabSlugs = [
  "detection-security-lab",
  "secure-infrastructure-homelab",
] as const;

const oldJobEngineTitle = /AI\s+Job\s+Intelligence\s+Engine/i;

test("Job Intelligence Engine retains its established URL and accurate public positioning", () => {
  const project = getPublicProjects().find(
    ({ slug }) => slug === "ai-job-intelligence-engine",
  );
  assert.ok(project, "The established project slug must remain public");
  assert.equal(project.title, "Job Intelligence Engine");
  assert.equal(project.category, "Workflow automation / Systems engineering");
  assert.equal(project.status, "Active");
  assert.equal(project.kind, "personal");
  assert.equal(project.featured, true);
  assert.doesNotMatch(JSON.stringify(getPublicProjects()), oldJobEngineTitle);
});

test("absent or whitespace-only content creates no empty case-study modules", () => {
  const empty = { paragraphs: [" ", "\n"], bullets: [""] };
  for (const project of [
    fixture(),
    fixture({
      caseStudy: {
        overview: empty,
        problem: empty,
        system: empty,
        architecture: empty,
        whatIBuilt: empty,
        engineeringDecisions: empty,
        securityPrivacy: empty,
        lessonsConstraints: empty,
        currentState: empty,
      },
      technicalHighlights: [" "],
      screenshots: [],
      architectureDiagrams: [],
      links: [{ label: " ", href: " " }],
    }),
    fixture({
      screenshots: [{ ...imageFixture, alt: " " }],
      architectureDiagrams: [{ ...imageFixture, caption: " " }],
    }),
    fixture({
      screenshots: [{ ...imageFixture, width: 0 }],
      architectureDiagrams: [
        { ...imageFixture, src: "//example.com/image.png" },
      ],
    }),
  ]) {
    assert.doesNotMatch(render(project), /<h2|<p>|<ul|<figure|<img|<a\s/);
  }
});

test("reviewed prose, lists, evidence, and links render in the reusable case study", () => {
  const project = fixture({
    caseStudy: {
      overview: { paragraphs: ["A test overview.", "A second paragraph."] },
      problem: { paragraphs: ["A test problem."] },
      system: { bullets: ["A test component."] },
      architecture: { paragraphs: ["A test architecture."] },
      whatIBuilt: { paragraphs: ["A test contribution."] },
      engineeringDecisions: { bullets: ["A test decision."] },
      securityPrivacy: { paragraphs: ["A test boundary."] },
      lessonsConstraints: { paragraphs: ["A test constraint."] },
      currentState: { paragraphs: ["A test state."] },
    },
    technicalHighlights: ["A test highlight."],
    screenshots: [imageFixture],
    architectureDiagrams: [
      {
        ...imageFixture,
        src: "/test-only-architecture.png",
        alt: "Test-only architecture description",
        caption: "Test-only architecture caption.",
      },
    ],
    website: "https://example.com/",
    github: "https://github.com/example/example",
    links: [{ label: "Related note", href: "/writing" }],
  });
  const html = render(project);
  for (const heading of [
    "Overview",
    "Problem",
    "System",
    "Technical highlights",
    "Architecture",
    "What I built",
    "Engineering decisions",
    "Security / privacy considerations",
    "Selected interfaces",
    "Lessons / constraints",
    "Current state",
    "Links",
  ]) {
    assert.ok(html.includes(`>${heading}</h2>`), `Missing ${heading}`);
  }
  for (const section of Object.values(project.caseStudy!)) {
    for (const paragraph of section.paragraphs ?? []) {
      assert.ok(html.includes(`<p>${paragraph}</p>`));
    }
    for (const bullet of section.bullets ?? []) {
      assert.ok(html.includes(`<li>${bullet}</li>`));
    }
  }
  assert.match(html, /<li>A test highlight\.<\/li>/);
  assert.match(html, /alt="Test-only interface description"/);
  assert.match(html, /alt="Test-only architecture description"/);
  assert.match(html, /width="960" height="640"/);
  assert.match(html, /<figcaption[^>]*>Test-only caption\.<\/figcaption>/);
  assert.match(
    html,
    /<figcaption[^>]*>Test-only architecture caption\.<\/figcaption>/,
  );
  const websiteLink = html.match(
    /<a\s[^>]*href="https:\/\/example.com\/"[^>]*>/,
  )?.[0];
  assert.ok(websiteLink);
  assert.match(websiteLink, /rel="noopener noreferrer"/);
  assert.match(websiteLink, /target="_blank"/);
  assert.match(html, /href="https:\/\/github.com\/example\/example"/);
  assert.match(html, /href="\/writing"/);
});

test("an architecture diagram can provide evidence without filler prose", () => {
  const html = render(fixture({ architectureDiagrams: [imageFixture] }));
  assert.match(html, /id="architecture">Architecture<\/h2>/);
  assert.match(html, /<figure/);
  assert.doesNotMatch(html, /<p>|Overview|Selected interfaces/);
});

test("project statuses match the reviewed evidence boundary", () => {
  for (const project of projects) {
    assert.ok(projectStatuses.includes(project.status));
    const review = projectEvidenceBacklog[project.slug];
    assert.ok(review, `Missing evidence review for ${project.slug}`);
    assert.equal(project.status, review.statusReview.status);
    assert.ok(review.statusReview.reason.trim());
    for (const source of review.sources) {
      assert.ok(fs.existsSync(path.resolve(source.path)));
    }
  }
});

test("the two flagships contain reviewed engineering content and architecture evidence", () => {
  for (const slug of flagshipSlugs) {
    const project = getPublicProjects().find((entry) => entry.slug === slug);
    assert.ok(project, `${slug} must have a public project record`);
    assert.equal(project.featured, true);
    assert.ok(
      project.technologies.length > 0,
      `${slug} needs a verified stack`,
    );
    assert.ok(
      project.technologies.every((technology) => technology.trim()),
      `${slug} cannot contain blank technology names`,
    );
    assert.ok(
      project.technicalHighlights?.some((highlight) => highlight.trim()),
      `${slug} needs reviewed technical highlights`,
    );
    for (const section of ["overview", "problem", "system"] as const) {
      const content = project.caseStudy?.[section];
      assert.ok(
        [...(content?.paragraphs ?? []), ...(content?.bullets ?? [])].some(
          (item) => item.trim(),
        ),
        `${slug} needs a substantive ${section} section`,
      );
    }
    assert.ok(
      project.architectureDiagrams?.length,
      `${slug} needs its authored conceptual architecture diagram`,
    );
    const html = render(project);
    assert.match(html, /id="architecture">Architecture<\/h2>/);
    assert.match(html, /id="technical-highlights">Technical highlights<\/h2>/);
  }
});

test("unverified labs retain their conservative scope", () => {
  for (const slug of exploringLabSlugs) {
    const project = projects.find((entry) => entry.slug === slug);
    assert.ok(project, `Missing lab record ${slug}`);
    assert.equal(project.status, "Exploring");
    assert.deepEqual(project.technologies, []);
    assert.equal(project.screenshots, undefined);
    assert.equal(project.architectureDiagrams, undefined);
    assert.equal(project.technicalHighlights, undefined);
    assert.deepEqual(Object.keys(project.caseStudy ?? {}), ["overview"]);
  }
});

test("every declared project image names a real public asset with full context", () => {
  const publicRoot = path.resolve("public");
  for (const project of projects) {
    for (const image of [
      ...(project.screenshots ?? []),
      ...(project.architectureDiagrams ?? []),
    ]) {
      assert.match(image.src, /^\/[^/]/);
      const absolute = path.resolve(publicRoot, `.${image.src}`);
      const relative = path.relative(publicRoot, absolute);
      assert.ok(!relative.startsWith("..") && !path.isAbsolute(relative));
      assert.ok(fs.statSync(absolute).isFile(), `${image.src} must exist`);
      assert.ok(image.alt.trim() && image.caption.trim());
      assert.ok(Number.isInteger(image.width) && image.width > 0);
      assert.ok(Number.isInteger(image.height) && image.height > 0);
      assert.doesNotMatch(
        `${image.alt} ${image.caption}`,
        /\bTODO\b|projectEvidenceBacklog/,
      );
      if (path.extname(absolute).toLowerCase() === ".svg") {
        const svg = fs.readFileSync(absolute, "utf8");
        assert.match(svg, /<svg\b/, `${image.src} must be an SVG asset`);
        assert.doesNotMatch(svg, /\bTODO\b|projectEvidenceBacklog/);
      }
    }
  }
});

test("evidence TODOs stay outside all application imports and public serialization", async () => {
  const sourceRoot = path.resolve("src");
  const backlogPath = path.resolve("src/data/project-evidence.ts");
  const files = fs.readdirSync(sourceRoot, { recursive: true });
  for (const relative of files) {
    if (typeof relative !== "string" || !/\.tsx?$/.test(relative)) continue;
    const filename = path.join(sourceRoot, relative);
    if (filename === backlogPath) continue;
    const source = fs.readFileSync(filename, "utf8");
    assert.doesNotMatch(
      source,
      /(?:from|import|require)[^;\n]*["'][^"']*project-evidence(?:\.ts)?["']/,
      `${relative} must not import the editorial backlog`,
    );
  }
  assert.doesNotMatch(
    JSON.stringify(getPublicProjects()),
    /\bTODO\b|statusReview|todos/,
  );
  for (const project of getPublicProjects()) {
    const props = { params: Promise.resolve({ slug: project.slug }) };
    const html = renderToStaticMarkup(await ProjectPage(props));
    assert.doesNotMatch(html, /\bTODO\b|statusReview|projectEvidenceBacklog/);
    for (const todo of projectEvidenceBacklog[project.slug].todos) {
      assert.ok(!html.includes(todo.prompt));
    }
  }
});

test("public case-study routes retain titles, canonical metadata, and unknown-path 404s", async () => {
  assert.deepEqual(
    generateStaticParams(),
    getPublicProjects().map(({ slug }) => ({ slug })),
  );
  for (const project of getPublicProjects()) {
    const props = { params: Promise.resolve({ slug: project.slug }) };
    const metadata = await generateMetadata(props);
    assert.equal(metadata.title, project.title);
    assert.equal(metadata.description, project.description);
    const fullTitle = `${project.title} | Farhan Shafee`;
    assert.equal(metadata.openGraph?.title, fullTitle);
    assert.equal(metadata.openGraph?.description, project.description);
    assert.equal(metadata.twitter?.title, fullTitle);
    assert.equal(metadata.twitter?.description, project.description);
    assert.equal(
      metadata.alternates?.canonical,
      `https://farhan-shafee.com/work/${project.slug}`,
    );
    assert.equal(
      metadata.openGraph?.url,
      `https://farhan-shafee.com/work/${project.slug}`,
    );
    assert.doesNotMatch(JSON.stringify(metadata), oldJobEngineTitle);
    assert.doesNotMatch(
      JSON.stringify(metadata),
      /https?:\/\/farhanshafee\.com\b/i,
    );
    const html = renderToStaticMarkup(await ProjectPage(props));
    assert.doesNotMatch(html, oldJobEngineTitle);
    assert.doesNotMatch(html, /https?:\/\/farhanshafee\.com\b/i);
    const structuredData = [
      ...html.matchAll(
        /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
      ),
    ].map((match) => JSON.parse(match[1]));
    const breadcrumbs = structuredData.find(
      (schema) => schema["@type"] === "BreadcrumbList",
    );
    assert.ok(breadcrumbs, `${project.slug} must include breadcrumbs`);
    assert.deepEqual(breadcrumbs.itemListElement.at(-1), {
      "@type": "ListItem",
      position: 2,
      name: project.title,
      item: `https://farhan-shafee.com/work/${project.slug}`,
    });
    assert.match(html, /class="split-layout section"/);
    assert.match(html, /id="overview">Overview<\/h2>/);
    const imageCount =
      (project.screenshots?.length ?? 0) +
      (project.architectureDiagrams?.length ?? 0);
    assert.equal(
      html.match(/<img\b/g)?.length ?? 0,
      imageCount,
      `${project.slug} must render each declared asset`,
    );
    assert.equal(
      html.includes('id="selected-interfaces"'),
      Boolean(project.screenshots?.length),
      "Selected interfaces appears only when real screenshots are supplied",
    );
  }
  const props = {
    params: Promise.resolve({ slug: "unknown-test-only-project" }),
  };
  const isNotFound = (error: unknown) =>
    error instanceof Error &&
    "digest" in error &&
    error.digest === "NEXT_HTTP_ERROR_FALLBACK;404";
  await assert.rejects(() => ProjectPage(props), isNotFound);
  await assert.rejects(() => generateMetadata(props), isNotFound);
});
