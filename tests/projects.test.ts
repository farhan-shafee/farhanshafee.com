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
        demoScenario: empty,
        detectionCorrelation: empty,
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
    assert.doesNotMatch(render(project), /<h2|<p>|<ul|<figure|<img|<a\s/);
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
  assert.doesNotMatch(flagship, /A reviewed technical statement\./);
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
    assert.doesNotMatch(html, /evidence-links|https:\/\/example.com\/source/);
  }
});

test("Work puts AegisGraph and CyberBit previews before the supporting engineering work", () => {
  const html = renderToStaticMarkup(WorkPage());
  const order = [
    "aegisgraph",
    "cyberbit-solutions",
    "ai-job-intelligence-engine",
    ...exploringLabSlugs,
  ];
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
  for (const slug of order.slice(0, 2)) {
    const project = getPublicProjects().find((entry) => entry.slug === slug);
    assert.ok(project?.screenshots?.[0]);
    assert.ok(html.includes(project.screenshots[0].src.replace(/\//g, "%2F")));
  }
});

test("flagship inspection separates public evidence from local capabilities and reviewed samples", () => {
  const aegisgraph = getPublicProjects().find(
    ({ slug }) => slug === "aegisgraph",
  );
  const cyberbit = getPublicProjects().find(
    ({ slug }) => slug === "cyberbit-solutions",
  );
  assert.ok(aegisgraph?.inspection);
  assert.ok(cyberbit?.inspection);
  const source = "https://github.com/farhan-shafee/aegisgraph";
  const aegisLinks = aegisgraph.inspection.links.map(({ href }) => href);
  for (const href of [
    "https://aegisgraph.farhan-shafee.com",
    source,
    `${source}/blob/main/docs/architecture/SYSTEM.md`,
    `${source}/blob/main/docs/threat-model/THREAT_MODEL.md`,
    `${source}/tree/main/docs/adr`,
    `${source}/blob/main/docs/evaluations/README.md`,
    `${source}/actions/runs/35251887304`,
    "/writing/building-an-evidence-grounded-ai-security-investigation-system",
  ])
    assert.ok(
      aegisLinks.includes(href),
      `Missing reviewed AegisGraph evidence: ${href}`,
    );
  const modes = new Map(
    aegisgraph.inspection.facts.map(({ label, value }) => [label, value]),
  );
  assert.match(modes.get("Public demo") ?? "", /read-only/i);
  assert.match(modes.get("Public demo") ?? "", /deterministic/i);
  assert.match(modes.get("Public demo") ?? "", /no live OpenAI/i);
  assert.match(modes.get("Local/interview mode") ?? "", /optional OpenAI/i);
  assert.match(modes.get("Hosting") ?? "", /Vercel.*Railway/i);

  assert.deepEqual(
    new Set(cyberbit.inspection.links.map(({ href }) => href)),
    new Set([
      "https://cyberbitsolutions.com",
      "https://cyberbitsolutions.com/free-scan",
      "https://cyberbitsolutions.com/methodology",
      "https://cyberbitsolutions.com/sample-report",
    ]),
  );
  assert.match(cyberbit.inspection.summary, /fictional/i);
  assert.match(cyberbit.inspection.summary, /not a client assessment/i);
  const workflows = new Map(
    cyberbit.inspection.facts.map(({ label, value }) => [label, value]),
  );
  assert.match(workflows.get("Snapshot") ?? "", /human review/i);
  assert.match(workflows.get("Paid Brief") ?? "", /automated.*Stripe/i);
  for (const project of [aegisgraph, cyberbit]) {
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
      assert.ok(fs.existsSync(path.resolve(source.path)));
    }
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
      assert.equal(project.screenshots.length, 4);
      assert.ok(
        project.screenshots.every((image) =>
          image.src.startsWith("/projects/aegisgraph/"),
        ),
        "AegisGraph uses reviewed portfolio assets from the public image directory",
      );
    } else {
      assert.ok(
        project.architectureDiagrams?.length,
        `${slug} retains its authored conceptual architecture diagram`,
      );
    }
    const html = render(project);
    assert.match(html, /id="architecture">Architecture<\/h2>/);
    assert.match(html, /id="technical-highlights">Technical highlights<\/h2>/);
  }
});

test("AegisGraph retains visible demo limits, evidence grounding, and narrow validation claims", () => {
  const project = getPublicProjects().find(({ slug }) => slug === "aegisgraph");
  assert.ok(project?.caseStudy);
  const prose = (section: keyof NonNullable<Project["caseStudy"]>) => {
    const content = project.caseStudy?.[section];
    return [...(content?.paragraphs ?? []), ...(content?.bullets ?? [])].join(
      " ",
    );
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
  assert.equal(screenshots.length, 4);
  for (const screenshot of screenshots) {
    assert.match(screenshot.alt, /synthetic/i);
    assert.match(screenshot.caption, /synthetic/i);
  }
  const answer = screenshots.find(({ src }) =>
    src.endsWith("grounded-ai-answer.png"),
  );
  assert.ok(answer);
  assert.match(answer.caption, /recorded local OpenAI/i);
  assert.match(answer.caption, /validated findings.*citations/i);
  assert.match(answer.caption, /hosted public demo.*deterministic/i);
  const evaluation = screenshots.find(({ src }) =>
    src.endsWith("evaluation-dashboard.png"),
  );
  assert.ok(evaluation);
  assert.match(evaluation.caption, /deterministic.*not live-model accuracy/i);
  assert.doesNotMatch(
    JSON.stringify(getPublicProjects()),
    /file:\/\/|[A-Za-z]:(?:\\\\|\/)(?:Users|Dev)(?:\\\\|\/)/i,
  );
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
    assert.equal(project.inspection, undefined);
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
