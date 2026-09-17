# farhan-shafee.com

Farhan Shafee's personal authority hub for security engineering, AI automation, and fintech systems. Built around factual project records and reviewed technical writing, with no fabricated metrics or filler articles.

## Develop and verify

Use Node.js 22 or later and npm. Run commands from the repository root:

```sh
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). For a production build and local preview:

```sh
npm run build
npm start
```

Before publishing changes:

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

Browser checks use Playwright and axe. Install Chromium once, then run the suite:

```sh
npx playwright install chromium
npm run test:browser
```

The browser suite starts the production build on port 3100. To use a production server you have already started, set `PLAYWRIGHT_BASE_URL` to its local URL before running it.

Use `npm run format:check` to check formatting or `npm run format` to apply it. These commands describe the verification workflow; consult their output for current results.

## Architecture

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, and system fonts. Pages use React Server Components; small client components provide navigation, theme switching, and copyable article heading links. Content is local and rendered at build time. There is no database, authentication, CMS, or external font request.

| Location                       | Purpose                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `src/app/`                     | Pages, metadata, RSS, sitemap, robots, and `llms.txt`                            |
| `src/components/`              | Shared interface and article rendering                                           |
| `src/config/site.ts`           | Public identity, canonical domain, social links, contact address                 |
| `src/data/projects.ts`         | Projects and case study records                                                  |
| `src/data/project-evidence.ts` | Source-only evidence requests and status rationale; never imported into the site |
| `src/data/lab.ts`              | Lab notebook entries                                                             |
| `src/data/uses.ts`             | Confirmed tooling and empty categories                                           |
| `src/data/now.ts`              | All `/now` content and its reviewed date                                         |
| `src/lib/writing.ts`           | Front matter validation, publication filtering, tags, and reading time           |
| `content/writing/`             | Trusted local MDX articles and draft outlines                                    |
| `tests/`                       | Automated content and browser checks                                             |

Public routes: `/`, `/about`, `/work`, `/work/[slug]`, `/writing`, `/writing/[slug]`, `/writing/tag/[tag]`, `/lab`, `/uses`, `/now`, `/contact`, `/rss.xml`, `/llms.txt`, `/sitemap.xml`, and `/robots.txt`. Article and tag routes exist only for published content.

## Maintain content

### Projects, lab, uses, and now

Add a typed record in `src/data/projects.ts` with a unique lowercase slug. Set `kind` to `business`, `personal`, or `lab`, choose an honest `status`, and set `visibility: "public"` to include it in `/work`, its detail route, and the sitemap. `featured: true` also includes it on the homepage. Private records have no public detail route.

Project statuses use one vocabulary: `Active` (ongoing work, without a deployment claim), `Production` (verified operation), `Completed` (a finished scope), `Exploring` (investigation), and `Archived` (no longer current). AegisGraph, CyberBit, and the personal Job Engine are Active, supported by owner context and inspected implementation. The detection and infrastructure labs remain Exploring. A website URL, a draft article title, or a project name is not proof that every implementation is operating in production.

The public hierarchy is AegisGraph as the primary flagship, CyberBit Solutions as the second flagship, then Job Intelligence Engine, Detection & Security Engineering Lab, and Secure Infrastructure & Homelab as supporting work. Homepage and Work entries use the existing project presentation variants to express that hierarchy; adding a project does not mean making every entry visually equal.

The optional `caseStudy` object supports `overview`, `problem`, `system`, `demoScenario`, `architecture`, `detectionCorrelation`, `whatIBuilt`, `aiGrounding`, `engineeringDecisions`, `securityPrivacy`, `validation`, `lessonsConstraints`, and `currentState`. Each section accepts `paragraphs` and/or `bullets`. Only populated sections render; omit unanswered sections rather than adding placeholder prose. The previous flat overview/problem/approach/outcome fields have been replaced by this structured object. Describe outcomes and limitations under the relevant verified section.

`technicalHighlights` and `technologies` accept verified project-specific lists. `screenshots` and `architectureDiagrams` accept reviewed local image records with `src`, meaningful `alt`, intrinsic `width`/`height`, and a factual `caption`. Store assets under `public/`, redact sensitive information, and only add a record after the file exists. Empty evidence arrays render nothing. The detail page uses the existing typography and layout; adding evidence does not require a new page template. `website`, `github`, and labeled `links` provide public references, with the primary website link also shown beside the page introduction.

Maintain unanswered questions in `src/data/project-evidence.ts`. It contains structured TODOs and evidence references for the projects, separate from renderable data. It must not be imported by app routes, components, or public content loaders. After Farhan verifies a detail against code, configuration, or an approved artifact, write the factual account into `projects.ts` and resolve its evidence task. Keep unresolved TODOs out of public fields, metadata, and image captions.

AegisGraph is a synthetic fintech security investigation environment, not a production SOC deployment. Deterministic detection and correlation establish case evidence before bounded AI analysis; the application validates citations and typed claim support outside the model. [The AegisGraph evidence review](docs/aegisgraph-evidence-review.md) maps implementation claims, recorded validation, limitations, and four reviewed synthetic-data screenshots under `public/projects/aegisgraph/`. The source repository was inspected read-only. Keep live-provider results separate from deterministic evaluations, and retain production authentication, tenant isolation, streaming ingestion, and stronger evidence/audit protections as future work.

The CyberBit and Job Intelligence Engine case studies contain source-validated capabilities, project-specific stacks, and authored conceptual diagrams. [Their evidence review](docs/flagship-evidence-review.md) inventories the claims added in that earlier pass, their basis, corrections to supplied terminology, runtime/provider limitations, and recommended screenshots. That source review was read-only; it did not exercise sibling applications or live integrations. CyberBit's source includes separate free, reviewed-report, and paid-Brief workflows. The Job Intelligence Engine uses vinext/Vite with Next.js-style routes, deterministic requirement scoring, and evidence-backed application templates. Do not infer a standard Next.js runtime or an LLM integration from its name.

Use **Job Intelligence Engine** as the public project name and **Workflow automation / Systems engineering** as its category. Preserve `/work/ai-job-intelligence-engine` for URL stability; the historical slug does not describe a current AI capability. The project remains Active. Metadata, cards, and breadcrumb JSON-LD derive their wording from the shared project record. Keep broader personal AI Automation positioning separate from claims about this project's implemented functionality. Its related unpublished article uses the filename and slug `building-a-job-intelligence-engine`, removing unsupported AI branding while preserving its title, body, and draft status.

Two real CyberBit interface captures accompany the case study: a completed public check of the owner's domain and the public Snapshot sample-report layout using explicitly fictional data. The sample is not a generated or reviewed client artifact. A third admin/report capture remains blocked; actual reviewed/generated report evidence, a sanitized admin view, and the paid Brief experience are still outstanding. No measured outcomes are published. The diagrams use the existing palette, adapt to the site's light/dark color scheme, and represent conceptual relationships rather than private topology or deployment evidence. General experience and this portfolio's stack must not be used to infer another project's technologies. Use public HTTPS links. Source-only notes and private records are not secret stores; never include credentials or sensitive infrastructure details.

Edit `src/data/lab.ts` for experiments and `src/data/uses.ts` for tools. Empty tooling categories are intentional until products are confirmed. Edit `src/data/now.ts` to update `/now`; change its `updated` date only when reviewing that content. Do not publish private infrastructure details.

### Writing

Create `content/writing/your-article-slug.mdx`. The `slug` must match the filename. Start with a draft:

```mdx
---
title: "An evidence-based article title"
description: "A concise account of what this article covers."
date: "2026-09-16"
slug: "your-article-slug"
tags: ["security-engineering"]
draft: true
featured: false
---

## Context

TODO: Add reviewed observations and supporting evidence.
```

Front matter also supports `updated`, `canonical` (an HTTPS URL), and `ogImage` (an HTTPS URL or root-relative path). Both `date` and `updated` require quoted `YYYY-MM-DD` strings so invalid dates cannot be silently normalized by YAML. Tags use lowercase words separated by hyphens. The default canonical URL is the production article URL; use an override only for a deliberate canonical source. An article that declares a different canonical URL is omitted from this site's sitemap. Relative image paths refer to files under `public/`.

Use one page title from front matter, then `##` and `###` headings in the body. Fenced code blocks support syntax highlighting. Headings receive copy-link anchors. Longer articles receive a table of contents, and related writing is derived from published content. Reading time is an estimate based on prose words and non-empty code lines.

Publishing checklist:

1. Replace TODOs, validate claims, and add real evidence where needed. Obtain permission for anything confidential.
2. Check links, accessible image descriptions, code formatting, metadata, and mobile layout.
3. Set the actual publication date, and set `draft: false` explicitly. Update `updated` only after a substantive review or revision.
4. Run the verification commands, inspect the article, and rebuild or redeploy.

Draft status defaults to true when omitted. Drafts and articles whose publication date has not arrived are excluded from every public article query, index, tag route, sitemap, RSS feed, and article route, including local development and Vercel previews. There is no public draft-preview bypass. Review drafts in your editor; to inspect the final page locally, temporarily set `draft: false` with a current date, then restore draft status before committing if it is not ready. Dates use UTC. Pages are statically rendered, including on-demand paths; rebuild on the publication date to refresh indexes, feeds, and sitemap together. A directly requested article path may become available on or after its date, so a future date is not a private draft mechanism: keep unreviewed writing `draft: true`.

All five MDX files remain unpublished drafts. `content/writing/building-a-job-intelligence-engine.mdx` now contains the first full technical draft, “Building a Job Intelligence Engine for Multi-Source Job Discovery and Application Workflows.” Its filename and slug use `building-a-job-intelligence-engine`, and `draft: true` keeps it out of routes, indexes, tags, feeds, and the sitemap. [Article evidence notes](docs/article-evidence-review.md) map its implementation claims to the reviewed project evidence. The other four files remain outlines with evidence TODOs and claims to validate.

[The AegisGraph article plan](docs/aegisgraph-article-plan.md) prepares “Building an Evidence-Grounded AI Security Investigation System” with a proposed slug and source map. It is an internal document, not a sixth MDX file or public article. Any future substantive draft must start with `draft: true`; publishing requires a separate editorial review and explicit authorization.

### Social and contact links

Edit `src/config/site.ts`. GitHub, CyberBit Solutions, the production domain, and shared metadata live here. `linkedin` is centrally configured with Farhan's owner-provided verified profile, `https://www.linkedin.com/in/farhanshafee/`. `email` remains empty and is not rendered; add a public professional contact address when available. Never add a private email address or secret to this file. No contact form or email service is required.

The existing header, footer, About, Contact, `llms.txt`, and Person/ProfilePage `sameAs` references use the central `linkedin` value. [Post-launch integration notes](docs/post-launch-integration.md) record the configured profiles, screenshot capture paths, and Search Console steps.

## SEO, privacy, and deployment

Pages have distinct metadata and production canonical URLs, with OpenGraph/Twitter cards, Person/ProfilePage and article structured data where applicable, breadcrumbs, RSS, sitemap, and a factual `llms.txt`. Sitemap modification dates come only from article dates and the reviewed `/now` date. Published content supplies tags; drafts cannot create public tag pages.

`siteConfig.googleSiteVerification` is an optional, empty configuration point for the exact Google Search Console HTML-tag token supplied by Farhan. The root metadata emits `google-site-verification` only when that value is set. Supply the tag's content value, not the whole HTML tag or a DNS record. Rebuild and deploy after setting it, then complete verification in Search Console. HTML-tag verification applies to a URL-prefix property; a Domain property requires DNS verification. No ownership verification or sitemap submission is performed by this repository.

Security headers live in `next.config.ts`: CSP, content-type protection, framing protection, referrer and permissions policies, and production HSTS. The static App Router rendering and initial theme script require inline scripts, so CSP permits `unsafe-inline` for scripts and styles. This is a deliberate limitation: it is not a strict nonce-based CSP. Production does not allow `unsafe-eval`; development permits it for tooling. MDX is executable content and must come only from trusted, reviewed repository files, never user submissions or remote input. JSON-LD is safely serialized.

There are no analytics, tracking cookies, third-party scripts, or runtime service credentials. The theme follows the system preference until changed; only the chosen theme is stored in the browser under `fs-theme`. Do not commit secrets, private contact information, or sensitive network configuration.

The repository is ready for Vercel's Next.js preset with this repository as the root directory. Use `npm run build`; no secrets or service setup are required. The canonical production domain is `https://farhan-shafee.com`, defined in `src/config/site.ts`. All site URLs in metadata, structured data, feeds, and discovery files derive from that setting.

When deploying, associate both `farhan-shafee.com` and `www.farhan-shafee.com` with the hosting project and configure their DNS and HTTPS certificates. The host-specific rule in `next.config.ts` permanently redirects `https://www.farhan-shafee.com` to `https://farhan-shafee.com` with HTTP 308, preserving the path and query string. Other hosts, including local and preview hosts, do not match this rule. Repository configuration alone does not configure DNS or bind domains to a hosting project.

Vercel preview deployments receive `noindex, nofollow` metadata and an `X-Robots-Tag` header, and their `robots.txt` disallows crawling. These are indexing controls, not access restrictions. A protected preview should use Vercel's deployment protection.

No deployment is part of this initial implementation. Headers require a Next.js-capable host; a generic static file host will not apply `next.config.ts` headers automatically.
