import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { projectEvidenceBacklog } from "../src/data/project-evidence";
import { labEntries } from "../src/data/lab";
import {
  getPublicProjects,
  getFeaturedProjects,
  getSecurityProjects,
  getProjectBySlug,
  projects,
  projectStatuses,
  type Project,
  type ProjectImage,
} from "../src/data/projects";
import {
  approvedProjectSlugs,
  excludedPublicContent,
  retiredProjectRoutes,
  retiredPublicAssets,
} from "./portfolio-policy";

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
const { ProjectCard } = await import("../src/components/project-card");
const { ProjectInspection } =
  await import("../src/components/project-inspection");
const { default: WorkPage } = await import("../src/app/work/page");

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

const engineeringCaseSlugs = [
  "aegisgraph",
  "creditops-ai",
  "tradeflow",
] as const;

const oldJobEngineTitle = /AI\s+Job\s+Intelligence\s+Engine/i;

test("public portfolio follows the deliberately selected GitHub hierarchy", () => {
  assert.deepEqual(
    getPublicProjects().map(({ slug }) => slug),
    [...approvedProjectSlugs],
  );
  assert.deepEqual(
    getFeaturedProjects().map(({ slug }) => slug),
    approvedProjectSlugs.slice(0, 3),
  );
  assert.deepEqual(
    getSecurityProjects().map(({ slug }) => slug),
    approvedProjectSlugs.slice(3),
  );
  assert.doesNotMatch(
    JSON.stringify(getPublicProjects()),
    excludedPublicContent,
  );
});

test("CreditOps exposes its recorded public showcase while keeping source private", async () => {
  const project = getProjectBySlug("creditops-ai");
  assert.ok(project);
  assert.equal(project.website, "https://creditops-ai-showcase.vercel.app");
  assert.equal(project.sourceVisibility, "private");
  assert.equal(project.github, undefined);
  const props = { params: Promise.resolve({ slug: project.slug }) };
  const html = renderToStaticMarkup(await ProjectPage(props));
  assert.match(html, /Source private/);
  assert.match(html, /recorded/i);
  assert.match(html, /synthetic/i);
  assert.match(html, /no (?:fresh|new) model or MCP/i);
  assert.match(html, /unconfirmed/i);
  assert.match(html, /human review/i);
  assert.doesNotMatch(
    html,
    /SoftwareSourceCode|codeRepository|github\.com\/farhan-shafee\/creditops/i,
  );
});

test("retired projects reject routes and metadata and remove publicly served assets", async () => {
  const isNotFound = (error: unknown) =>
    error instanceof Error &&
    "digest" in error &&
    String(error.digest).includes("404");
  for (const route of retiredProjectRoutes) {
    const slug = route.split("/").at(-1)!;
    assert.equal(getProjectBySlug(slug), undefined);
    assert.ok(!generateStaticParams().some((entry) => entry.slug === slug));
    const props = { params: Promise.resolve({ slug }) };
    await assert.rejects(ProjectPage(props), isNotFound);
    await assert.rejects(generateMetadata(props), isNotFound);
  }
  for (const asset of retiredPublicAssets)
    assert.ok(
      !fs.existsSync(path.resolve("public", `.${asset}`)),
      `${asset} must leave public/`,
    );
});

test("absent or whitespace-only content creates no empty case-study modules", () => {
  const empty = {
    title: "A heading alone is not a section",
    paragraphs: [" ", "\n"],
    bullets: [""],
    steps: [" ", "\n"],
  };
  for (const project of [
    fixture(),
    fixture({
      caseStudy: {
        overview: empty,
        problem: empty,
        system: empty,
        demoScenario: empty,
        detectionCorrelation: empty,
        detectionRegression: empty,
        evidenceExport: empty,
        aiGrounding: empty,
        validation: empty,
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
    assert.doesNotMatch(render(project), /<h2|<p>|<ul|<ol|<figure|<img|<a\s/);
  }
});

test("reviewed prose, lists, evidence, and links render in the reusable case study", () => {
  const project = fixture({
    caseStudy: {
      overview: { paragraphs: ["A test overview.", "A second paragraph."] },
      problem: { paragraphs: ["A test problem."] },
      system: { bullets: ["A test component."] },
      demoScenario: { paragraphs: ["A test scenario."] },
      detectionCorrelation: { bullets: ["A test correlation boundary."] },
      detectionRegression: { paragraphs: ["A test regression comparison."] },
      evidenceExport: { paragraphs: ["A test integrity boundary."] },
      aiGrounding: { paragraphs: ["A test evidence boundary."] },
      validation: { paragraphs: ["A test validation record."] },
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
    "Demo scenario",
    "Detection &amp; correlation",
    "Detection regression",
    "Evidence export",
    "Evidence-grounded AI",
    "Validation",
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
  assert.match(
    html,
    /<figcaption[^>]*>Test-only caption\. <a[^>]*href="\/test-only-interface\.png"[^>]*>View full-size screenshot/,
  );
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

test("section titles preserve anchors and ordered workflow steps stay meaningful", () => {
  const html = render(
    fixture({
      caseStudy: {
        overview: { title: "  ", paragraphs: ["A reviewed overview."] },
        system: {
          title: "  Investigation <workflow>  ",
          steps: [
            "  Replay observations.  ",
            " ",
            "Inspect <evidence>.",
            "Review findings.",
          ],
        },
        evidenceExport: { title: "Title without content" },
      },
    }),
  );
  assert.match(html, /id="overview">Overview<\/h2>/);
  assert.match(html, /id="system">Investigation &lt;workflow&gt;<\/h2>/);
  const process = html.match(/<ol class="case-process"[^>]*>(.*?)<\/ol>/s);
  assert.ok(process, "Ordered steps must retain native list semantics");
  assert.deepEqual(
    [...process[1].matchAll(/<li[^>]*>(.*?)<\/li>/gs)].map(([, item]) =>
      item.replace(/<span[^>]*aria-hidden="true"[^>]*>.*?<\/span>/gs, ""),
    ),
    ["Replay observations.", "Inspect &lt;evidence&gt;.", "Review findings."],
  );
  assert.doesNotMatch(
    html,
    /<li>\s*<\/li>|<workflow>|<evidence>|Title without content/,
  );
  assert.doesNotMatch(html, /id="evidence-export"/);
});

test("an architecture diagram can provide evidence without filler prose", () => {
  const html = render(fixture({ architectureDiagrams: [imageFixture] }));
  assert.match(html, /id="architecture">Architecture<\/h2>/);
  assert.match(html, /<figure/);
  assert.doesNotMatch(html, /<p>|Overview|Selected interfaces/);
});

test("project inspection renders reviewed facts and links without empty modules", () => {
  for (const project of [
    fixture(),
    fixture({
      inspection: {
        summary: " ",
        links: [
          { label: " ", href: " " },
          { label: "Unsupported scheme", href: "javascript:void(0)" },
          { label: "Protocol-relative URL", href: "//example.com" },
        ],
        facts: [{ label: " ", value: " " }],
      },
    }),
  ])
    assert.equal(
      renderToStaticMarkup(createElement(ProjectInspection, { project })),
      "",
    );

  const project = fixture({
    inspection: {
      summary: "A reviewed system summary.",
      links: [
        { label: "Source", href: "https://example.com/source" },
        { label: "Technical article", href: "/writing" },
      ],
      facts: [{ label: "Mode", value: "Read-only example" }],
    },
  });
  const html = renderToStaticMarkup(
    createElement(ProjectInspection, { project }),
  );
  assert.match(html, /Inspect the system/);
  assert.match(html, /A reviewed system summary\./);
  assert.match(html, /<dt[^>]*>Mode<\/dt>/);
  assert.match(html, /<dd[^>]*>Read-only example<\/dd>/);
  for (const { href } of project.inspection!.links) {
    const anchor = [...html.matchAll(/<a\s[^>]*>/g)].find(([tag]) =>
      tag.includes(`href="${href}"`),
    )?.[0];
    assert.ok(anchor, `${href} must be inspectable`);
    if (href.startsWith("https://")) {
      assert.match(anchor, /target="_blank"/);
      assert.match(anchor, /rel="noopener noreferrer"/);
    } else assert.doesNotMatch(anchor, /target="_blank"/);
  }
});

test("project presentation distinguishes primary and second flagships from supporting work", () => {
  const project = fixture({
    screenshots: [imageFixture],
    technicalHighlights: ["A reviewed technical statement."],
    inspection: {
      summary: "Reviewed inspection summary.",
      links: [
        {
          label: "Featured evidence",
          href: "https://example.com/source",
          featured: true,
        },
        { label: "Further evidence", href: "https://example.com/details" },
      ],
      facts: [{ label: "Mode", value: "Test-only" }],
    },
  });
  const primary = renderToStaticMarkup(
    createElement(ProjectCard, {
      project,
      variant: "primary",
      index: 0,
    }),
  );
  assert.equal(primary.match(/<img\b/g)?.length, 1);
  assert.match(primary, /alt="Test-only interface description"/);
  assert.match(primary, /<figcaption>Test-only caption\.<\/figcaption>/);
  assert.match(primary, /A reviewed technical statement\./);
  assert.match(primary, /href="\/work\/test-only-project"/);
  assert.match(primary, /<h3\b/);
  const flagship = renderToStaticMarkup(
    createElement(ProjectCard, { project, variant: "flagship", index: 1 }),
  );
  assert.equal(flagship.match(/<img\b/g)?.length, 1);
  assert.match(flagship, /alt="Test-only interface description"/);
  assert.match(flagship, /<figcaption>Test-only caption\.<\/figcaption>/);
  assert.match(flagship, /A reviewed technical statement\./);
  for (const html of [primary, flagship]) {
    assert.match(html, /href="https:\/\/example.com\/source"/);
    assert.doesNotMatch(html, /href="https:\/\/example.com\/details"/);
    assert.match(html, /href="\/work\/test-only-project"/);
  }
  for (const variant of ["secondary", "supporting"] as const) {
    const html = renderToStaticMarkup(
      createElement(ProjectCard, {
        project,
        variant,
        headingLevel: 2,
      }),
    );
    assert.doesNotMatch(html, /<img\b|<figure\b/);
    assert.match(html, /<h2\b/);
    assert.match(html, /Exploring/);
    assert.match(html, /href="https:\/\/example.com\/source"/);
    assert.doesNotMatch(html, /href="https:\/\/example.com\/details"/);
  }
});

test("Work prioritizes three selected systems before four supporting security projects", () => {
  const html = renderToStaticMarkup(WorkPage());
  const order = [...approvedProjectSlugs];
  assert.deepEqual(
    getPublicProjects().map(({ slug }) => slug),
    order,
  );
  for (const [index, slug] of order.entries()) {
    const position = html.indexOf(`href="/work/${slug}"`);
    assert.ok(position >= 0, `${slug} must remain discoverable`);
    if (index > 0)
      assert.ok(position > html.indexOf(`href="/work/${order[index - 1]}"`));
  }
  assert.equal(html.match(/<img\b/g)?.length, 2);
  assert.deepEqual(
    getFeaturedProjects().map(({ slug }) => slug),
    order.slice(0, 3),
    "Homepage selection preserves the three primary projects; Work carries the complete set",
  );
  assert.match(html, /id="security-engineering"/);
  for (const slug of ["aegisgraph", "tradeflow"]) {
    const project = getPublicProjects().find((entry) => entry.slug === slug);
    assert.ok(project?.screenshots?.[0]);
    assert.ok(html.includes(project.screenshots[0].src.replace(/\//g, "%2F")));
  }
});

test("flagship inspection separates live demo, recorded playback, and local test capabilities", () => {
  const aegisgraph = getPublicProjects().find(
    ({ slug }) => slug === "aegisgraph",
  );
  const creditops = getProjectBySlug("creditops-ai");
  const tradeflow = getProjectBySlug("tradeflow");
  assert.ok(aegisgraph?.inspection);
  assert.ok(creditops?.inspection);
  assert.ok(tradeflow?.inspection);
  const source = "https://github.com/farhan-shafee/aegisgraph";
  const aegisLinks = aegisgraph.inspection.links.map(({ href }) => href);
  for (const href of [
    "https://aegisgraph.farhan-shafee.com",
    source,
    `${source}/blob/main/docs/architecture/SYSTEM.md`,
    `${source}/blob/main/docs/threat-model/THREAT_MODEL.md`,
    `${source}/tree/main/docs/adr`,
    `${source}/blob/main/docs/evaluations/BENCHMARK.md`,
    `${source}/blob/main/docs/FINAL_EXCELLENCE_REVIEW.md`,
    `${source}/actions/workflows/ci.yml`,
    "/writing/building-an-evidence-grounded-ai-security-investigation-system",
  ])
    assert.ok(
      aegisLinks.includes(href),
      `Missing reviewed AegisGraph evidence: ${href}`,
    );
  const modes = new Map(
    aegisgraph.inspection.facts.map(({ label, value }) => [label, value]),
  );
  assert.deepEqual(
    [...modes.keys()],
    [
      "System",
      "Investigation",
      "Validation",
      "AI boundary",
      "Public demo",
      "Local/interview mode",
      "Hosting",
    ],
  );
  assert.match(modes.get("Public demo") ?? "", /read-only/i);
  assert.match(modes.get("Public demo") ?? "", /deterministic/i);
  assert.match(modes.get("Public demo") ?? "", /no live OpenAI/i);
  assert.match(modes.get("Local/interview mode") ?? "", /optional OpenAI/i);
  assert.match(modes.get("Hosting") ?? "", /Vercel.*Railway/i);

  assert.match(creditops.inspection.summary, /recorded/i);
  assert.match(creditops.inspection.summary, /no fresh model or MCP/i);
  assert.equal(
    tradeflow.website,
    undefined,
    "A local demonstration must not imply a hosted trading app",
  );
  assert.ok(
    tradeflow.inspection.links.some(({ href }) =>
      href.endsWith("docs/INTERVIEW_DEMO.md"),
    ),
  );
  for (const project of [aegisgraph, creditops, tradeflow]) {
    const links = project.inspection!.links;
    assert.equal(new Set(links.map(({ href }) => href)).size, links.length);
    assert.ok(
      links.every(
        ({ label, href }) =>
          label.trim() && /^(?:https:\/\/|\/(?!\/))/.test(href),
      ),
    );
    assert.ok(
      project.inspection!.facts.every(
        ({ label, value }) => label.trim() && value.trim(),
      ),
    );
  }
});

test("project statuses match the reviewed evidence boundary", () => {
  for (const project of projects) {
    assert.ok(projectStatuses.includes(project.status));
    const review = projectEvidenceBacklog[project.slug];
    assert.ok(review, `Missing evidence review for ${project.slug}`);
    assert.equal(project.status, review.statusReview.status);
    assert.ok(review.statusReview.reason.trim());
    for (const source of review.sources) {
      if (source.path) assert.ok(fs.existsSync(path.resolve(source.path)));
      else {
        assert.ok(source.url);
        assert.equal(new URL(source.url).protocol, "https:");
      }
    }
  }
});

test("guided inspection exposes the incident, near-miss, and blocked-revision examples", () => {
  const project = getPublicProjects().find(({ slug }) => slug === "aegisgraph");
  assert.ok(project?.inspection);
  assert.deepEqual(
    project.inspection.guidedLinks?.map(({ href }) => href),
    [
      "https://aegisgraph.farhan-shafee.com/replay?scenario=atlas-compromise",
      "https://aegisgraph.farhan-shafee.com/replay?scenario=approved-admin",
      "https://aegisgraph.farhan-shafee.com/detections/APP-002?comparison=miss-service-access",
    ],
  );
  const html = renderToStaticMarkup(
    createElement(ProjectInspection, { project }),
  );
  assert.match(html, /<h3>Guided inspection<\/h3>/);
  for (const { href } of project.inspection.guidedLinks!) {
    const anchor = [...html.matchAll(/<a\s[^>]*>/g)].find(([tag]) =>
      tag.includes(`href="${href}"`),
    )?.[0];
    assert.ok(anchor, `Missing guided entry: ${href}`);
    assert.match(anchor, /target="_blank"/);
    assert.match(anchor, /rel="noopener noreferrer"/);
  }
});

test("supporting security cases have comparable evidence paths and public source metadata", async () => {
  const projects = getSecurityProjects();
  assert.equal(projects.length, 4);
  for (const project of projects) {
    assert.equal(project.featured, false);
    assert.equal(project.status, "Completed");
    assert.ok(project.github);
    assert.ok(
      project.inspection?.links.some(
        ({ href, featured }) => href === project.github && featured,
      ),
    );
    for (const key of [
      "problem",
      "system",
      "validation",
      "lessonsConstraints",
    ] as const) {
      assert.ok(
        project.caseStudy?.[key]?.paragraphs?.some((text) => text.trim()),
        `${project.slug} needs ${key}`,
      );
    }
    const html = renderToStaticMarkup(
      createElement(ProjectCard, { project, variant: "secondary" }),
    );
    assert.ok(html.includes(`href="${project.github}"`));
    assert.doesNotMatch(html, /<img\b|<figure\b/);
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: project.slug }),
    });
    assert.equal(
      metadata.alternates?.canonical,
      `https://farhan-shafee.com/work/${project.slug}`,
    );
    assert.equal(metadata.openGraph?.url, metadata.alternates?.canonical);
  }
});

test("engineering case studies contain reviewed content and architecture evidence", () => {
  for (const slug of engineeringCaseSlugs) {
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
    for (const section of [
      "overview",
      "problem",
      "system",
      "architecture",
    ] as const) {
      const content = project.caseStudy?.[section];
      assert.ok(
        [...(content?.paragraphs ?? []), ...(content?.bullets ?? [])].some(
          (item) => item.trim(),
        ),
        `${slug} needs a substantive ${section} section`,
      );
    }
    if (slug === "aegisgraph") {
      assert.ok(project.screenshots);
      assert.equal(project.screenshots.length, 5);
      assert.ok(
        project.screenshots.every((image) =>
          image.src.startsWith("/projects/aegisgraph/"),
        ),
        "AegisGraph uses reviewed portfolio assets from the public image directory",
      );
    } else if (slug === "tradeflow") {
      assert.equal(project.screenshots?.length, 2);
    } else {
      assert.equal(
        project.screenshots,
        undefined,
        "Recorded CreditOps evidence is linked without fabricated images",
      );
    }
    const html = render(project);
    assert.match(html, /id="architecture">[^<]+<\/h2>/);
    assert.match(html, /id="technical-highlights">Technical highlights<\/h2>/);
  }
});

test("AegisGraph retains visible demo limits, evidence grounding, and narrow validation claims", () => {
  const project = getPublicProjects().find(({ slug }) => slug === "aegisgraph");
  assert.ok(project?.caseStudy);
  const prose = (section: keyof NonNullable<Project["caseStudy"]>) => {
    const content = project.caseStudy?.[section];
    return [
      ...(content?.paragraphs ?? []),
      ...(content?.bullets ?? []),
      ...(content?.steps ?? []),
    ].join(" ");
  };
  assert.match(prose("overview"), /synthetic\/demo/i);
  assert.match(prose("overview"), /not a production SOC deployment/i);
  for (const boundary of [
    /authenticated identities/i,
    /tenant authorization/i,
    /multi-tenancy/i,
    /streaming-scale ingestion/i,
    /repeated live-model evaluation/i,
    /evidence and audit protections/i,
  ])
    assert.match(prose("lessonsConstraints"), boundary);

  for (const distinction of [
    /deterministic testing/i,
    /optional OpenAI analysis in local\/interview mode/i,
    /output schema/i,
    /evidence existence/i,
    /incident membership/i,
    /actual bounded context/i,
    /support for the proposed claim/i,
    /invalid claim rejects the entire answer/i,
    /insufficient evidence and no invented malware/i,
    /no database connection, retrieval tools, or incident-mutation authority/i,
  ])
    assert.match(prose("aiGrounding"), distinction);
  assert.match(
    prose("securityPrivacy"),
    /free text was excluded before the live model call/i,
  );
  assert.match(
    prose("securityPrivacy"),
    /not universal prompt-injection resistance/i,
  );
  assert.match(prose("securityPrivacy"), /cross-incident citations/i);
  assert.match(
    prose("validation"),
    /146 backend tests, 25 frontend tests, 13 browser tests, and 28 deterministic evaluation cases/i,
  );
  assert.match(prose("validation"), /historical|V1/i);
  for (const check of [
    /695 backend/i,
    /129 frontend/i,
    /27 browser/i,
    /20 local/i,
    /(?:7|seven) public/i,
    /145/i,
    /28/i,
  ])
    assert.match(prose("validation"), check);
  assert.match(
    prose("validation"),
    /coverage, not proof of production security/i,
  );
  assert.doesNotMatch(
    JSON.stringify(project),
    /autonomous SOC|enterprise SIEM|AI SOC replacement|immune to prompt injection|prompt-injection proof|fully secure against prompt injection/i,
  );
  assert.doesNotMatch(
    JSON.stringify(project),
    /It is a local engineering demonstration|The synchronous system remains a local engineering demonstration/i,
  );

  const screenshots = project.screenshots ?? [];
  assert.deepEqual(
    screenshots.map(({ src }) => path.posix.basename(src)),
    [
      "v2-replay.png",
      "v2-detection-regression.png",
      "v2-hypotheses.png",
      "v2-bundle-verification.png",
      "v2-evaluations.png",
    ],
  );
  for (const screenshot of screenshots) {
    assert.equal(screenshot.width, 1440);
    assert.equal(screenshot.height, 1100);
    assert.match(screenshot.alt, /synthetic/i);
    assert.match(screenshot.caption, /synthetic/i);
  }
  const bundle = screenshots.find(({ src }) =>
    src.endsWith("v2-bundle-verification.png"),
  );
  assert.ok(bundle);
  assert.match(bundle.caption, /unsigned/i);
  assert.match(
    bundle.caption,
    /does not authenticate|not authenticity|not.*authentic/i,
  );
  const evaluation = screenshots.find(({ src }) =>
    src.endsWith("v2-evaluations.png"),
  );
  assert.ok(evaluation);
  assert.match(evaluation.caption, /deterministic/i);
  assert.match(evaluation.caption, /not.*accuracy/i);
  assert.doesNotMatch(
    JSON.stringify(getPublicProjects()),
    /file:\/\/|[A-Za-z]:(?:\\\\|\/)(?:Users|Dev)(?:\\\\|\/)/i,
  );
});

test("AegisGraph V2 exposes the investigation workflow with separate review and integrity boundaries", () => {
  const project = getPublicProjects().find(({ slug }) => slug === "aegisgraph");
  assert.ok(project?.caseStudy);
  const prose = (section: keyof NonNullable<Project["caseStudy"]>) => {
    const content = project.caseStudy?.[section];
    return [
      ...(content?.paragraphs ?? []),
      ...(content?.bullets ?? []),
      ...(content?.steps ?? []),
    ].join(" ");
  };
  assert.deepEqual(project.caseStudy.system?.steps, [
    "Scenario",
    "Telemetry",
    "Normalization",
    "Detection",
    "Correlation",
    "Incident",
    "Evidence",
    "Hypothesis",
    "Bounded AI analysis",
    "Analyst decision",
    "Detection tuning",
    "Replay",
    "Regression validation",
  ]);
  assert.match(prose("demoScenario"), /eight|8/i);
  assert.match(prose("demoScenario"), /4,098/);
  assert.match(prose("detectionRegression"), /APP-002/);
  for (const gate of [/PASS/, /WARN/, /BLOCK/])
    assert.match(prose("detectionRegression"), gate);
  assert.match(prose("detectionRegression"), /synthetic|fixture/i);
  assert.match(prose("evidenceExport"), /SHA-256/);
  assert.match(prose("evidenceExport"), /unsigned/i);
  assert.match(prose("evidenceExport"), /replace/i);
  assert.match(prose("evidenceExport"), /authentic/i);
  assert.match(prose("evidenceExport"), /source (?:telemetry )?truth/i);
  const html = render(project);
  for (const id of ["system", "detection-regression", "evidence-export"])
    assert.match(html, new RegExp(`aria-labelledby="${id}"`));
  assert.match(html, /<ol class="case-process"[^>]*>/);
});

test("exploratory notebook topics remain questions tied to approved public work", () => {
  for (const entry of labEntries) {
    assert.equal(entry.status, "Exploring");
    assert.deepEqual(entry.technologies, []);
    assert.equal(entry.date, undefined);
    assert.doesNotMatch(JSON.stringify(entry), excludedPublicContent);
    for (const href of [
      entry.writeup,
      ...(entry.related?.map(({ href }) => href) ?? []),
    ]) {
      if (href?.startsWith("/work/"))
        assert.ok(getProjectBySlug(href.slice(6)));
    }
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
      if (path.extname(absolute).toLowerCase() === ".png") {
        const bytes = fs.readFileSync(absolute);
        assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
        assert.equal(
          bytes.readUInt32BE(16),
          image.width,
          `${image.src} width matches its PNG`,
        );
        assert.equal(
          bytes.readUInt32BE(20),
          image.height,
          `${image.src} height matches its PNG`,
        );
      }
      if (/^\.jpe?g$/.test(path.extname(absolute).toLowerCase())) {
        const { imageSize } = loadCommonJs("next/dist/compiled/image-size");
        const dimensions = imageSize(fs.readFileSync(absolute));
        assert.equal(dimensions.type, "jpg");
        assert.equal(dimensions.width, image.width, `${image.src} JPEG width`);
        assert.equal(
          dimensions.height,
          image.height,
          `${image.src} JPEG height`,
        );
      }
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
    const work = structuredData.find(
      (schema) => schema["@type"] === "CreativeWork",
    );
    if (project.github) {
      assert.ok(work);
      assert.equal(work.url, `https://farhan-shafee.com/work/${project.slug}`);
      assert.equal(work.author["@id"], "https://farhan-shafee.com/#person");
      assert.equal(work.about["@type"], "SoftwareSourceCode");
      assert.equal(work.about.codeRepository, project.github);
      assert.equal(work.about.url, project.website);
    } else if (project.sourceVisibility === "private") {
      assert.ok(work);
      assert.equal(work.url, `https://farhan-shafee.com/work/${project.slug}`);
      assert.equal(work.about, undefined);
      assert.doesNotMatch(
        JSON.stringify(work),
        /SoftwareSourceCode|codeRepository/,
      );
    } else assert.equal(work, undefined);
    assert.match(html, /<dl[^>]*aria-label="Project details"/);
    const inspectionPosition = html.indexOf("Inspect the system");
    if (project.inspection) {
      assert.ok(
        inspectionPosition >= 0,
        `${project.slug} exposes its inspection block`,
      );
      assert.ok(
        inspectionPosition < html.indexOf('aria-label="Project details"'),
        "Evidence is available before the long project metadata on mobile",
      );
      for (const { href } of project.inspection.links)
        assert.ok(html.includes(`href="${href}"`));
    } else assert.equal(inspectionPosition, -1);
    assert.match(html, /id="overview">[^<]+<\/h2>/);
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
