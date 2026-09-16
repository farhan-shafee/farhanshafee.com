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

test("project statuses and unverified details match the reviewed evidence boundary", () => {
  assert.equal(
    projects.find((project) => project.slug === "cyberbit-solutions")?.status,
    "Active",
  );
  for (const project of projects) {
    assert.ok(projectStatuses.includes(project.status));
    const review = projectEvidenceBacklog[project.slug];
    assert.ok(review, `Missing evidence review for ${project.slug}`);
    assert.equal(project.status, review.statusReview.status);
    assert.ok(review.statusReview.reason.trim());
    for (const source of review.sources) {
      assert.ok(fs.existsSync(path.resolve(source.path)));
    }
    // The current repository does not establish any per-project stack or assets.
    assert.deepEqual(project.technologies, []);
    assert.equal(project.screenshots, undefined);
    assert.equal(project.architectureDiagrams, undefined);
    assert.equal(project.technicalHighlights, undefined);
    assert.notEqual(project.status, "Production");
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
    /TODO:|statusReview|todos/,
  );
  for (const project of getPublicProjects()) {
    const props = { params: Promise.resolve({ slug: project.slug }) };
    const html = renderToStaticMarkup(await ProjectPage(props));
    assert.doesNotMatch(html, /TODO:|statusReview|projectEvidenceBacklog/);
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
    assert.equal(
      metadata.alternates?.canonical,
      `https://farhanshafee.com/work/${project.slug}`,
    );
    const html = renderToStaticMarkup(await ProjectPage(props));
    assert.match(html, /class="split-layout section"/);
    assert.match(html, /id="overview">Overview<\/h2>/);
    assert.doesNotMatch(
      html,
      /<img|id="architecture"|id="selected-interfaces"/,
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
