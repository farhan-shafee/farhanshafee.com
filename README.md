# farhan-shafee.com

Farhan Shafee's personal engineering portfolio: **Security Engineering × AI Automation × Fintech Systems**. The site presents the work deliberately selected on the current [public GitHub profile](https://github.com/farhan-shafee/farhan-shafee), with reviewed evidence and technical writing. This site repository is private; the deployed pages are public.

## Develop and verify

Use Node.js 22 or later and npm. Read `AGENTS.md` and the relevant installed Next.js guides before changing framework code. From the repository root:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). For a production preview, run `npm run build` followed by `npm start`.

Before publishing changes:

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npm run test:browser
npm audit
npm audit --omit=dev
```

Browser checks use Playwright and axe. Install Chromium once with `npx playwright install chromium`. The suite starts the production build on port 3100. Set `PLAYWRIGHT_BASE_URL` to an existing local or production server when verifying that deployment. Use `npm run format` to apply formatting. Command output supplies current validation results; historical records do not replace a fresh run.

The Next.js lint plugin is a reviewed local security patch that removes an unpatched development dependency chain while preserving its rules. Read [the patch provenance and maintenance procedure](tooling/next-eslint-plugin/README.md) before updating Next lint tooling. The quality workflow runs clean installation, regression tests, audits and browser checks on Node.js 24.

## Architecture

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, and system fonts. Pages use React Server Components; small client components provide navigation, theme switching, and article heading links. Content is local and rendered at build time. There is no database, authentication, CMS, runtime GitHub fetch, or external font request.

| Location                                     | Purpose                                                                            |
| -------------------------------------------- | ---------------------------------------------------------------------------------- |
| `src/app/`                                   | Pages, metadata, RSS, sitemap, robots, and `llms.txt`                              |
| `src/components/`                            | Shared interface and article rendering                                             |
| `src/config/site.ts`                         | Public identity, canonical domain, verified social links, optional contact address |
| `src/data/projects.ts`                       | Project model, AegisGraph case study, public ordering and selectors                |
| `src/data/creditops-project.ts`              | Publicly approved CreditOps AI presentation with private-source boundary           |
| `src/data/tradeflow-project.ts`              | Public-source TradeFlow case study and reviewed screenshots                        |
| `src/data/security-projects-core.ts`         | Supporting DevSecOps and Detection case studies                                    |
| `src/data/security-projects-verification.ts` | Supporting Cloud Security and Vulnerability Management case studies                |
| `src/data/project-evidence.ts`               | Source-only provenance, status rationale, and unresolved evidence requests         |
| `src/data/lab.ts`                            | Public-evidence-backed questions and related implementations                       |
| `src/data/uses.ts`                           | Confirmed tooling; empty categories remain intentional                             |
| `src/data/now.ts`                            | `/now` content and its reviewed date                                               |
| `src/lib/writing.ts`                         | Front matter validation, publication filtering, tags, and reading time             |
| `content/writing/`                           | Trusted local MDX articles and unpublished drafts                                  |
| `tests/portfolio-policy.ts`                  | Independent approved-project, retired-route, asset, and publication expectations   |
| `tests/`                                     | Content and browser verification                                                   |

Public routes include `/`, `/about`, `/work`, approved `/work/[slug]` pages, `/writing`, published article/tag pages, `/lab`, `/uses`, `/now`, `/contact`, `/rss.xml`, `/llms.txt`, `/sitemap.xml`, and `/robots.txt`. Unknown or retired project slugs return 404.

## Maintain the public portfolio

The October 14, 2026 public-profile review at `d49cceae12f60252a6a372cc0b03122fa70babc5` establishes the original seven included projects. The approved October 15 CreditFlow QE integration adds the fourth flagship, for eight included projects:

| Order | Project                  | Presentation                                                                |
| ----- | ------------------------ | --------------------------------------------------------------------------- |
| 1     | AegisGraph               | Primary flagship; public demo and source                                    |
| 2     | CreditOps AI             | Recorded public showcase; source private                                    |
| 3     | TradeFlow                | Local synthetic SDET lab; public source and demo guide                      |
| 4     | CreditFlow QE            | Synthetic banking simulator; public demo, source and executed test evidence |
| 5     | SecurePay / DevSecOps    | Supporting security engineering                                             |
| 6     | Detection Engineering    | Supporting security engineering                                             |
| 7     | Cloud Security           | Supporting security engineering                                             |
| 8     | Vulnerability Management | Supporting security engineering                                             |

The homepage features the four primary projects and a restrained entry to supporting security work. `/work` preserves those groups. Additional public playbook links can provide depth without becoming flagship case studies. Keep the established premium presentation and AegisGraph's strongest emphasis.

Project inclusion follows the deliberately curated public profile, not ownership or authenticated repository access. Do not add unrelated businesses, private applications, or personal experiments. Previously excluded project routes stay retired with 404 responses, without unrelated redirects. Remove their obsolete assets from `public/` as well as their records: deleting a card alone does not stop an image or diagram from being served. `tests/portfolio-policy.ts` records those retirement expectations. Historical documents and unpublished drafts do not authorize renewed public promotion.

Typed records use unique lowercase slugs. `visibility: "public"` permits a case-study route, Work entry, and sitemap URL; `featured: true` includes the project on the homepage. Private presentation records have no public detail route. `sourceVisibility` describes source availability independently: CreditOps has a public presentation with `sourceVisibility: "private"`, a plain **Source private** label, and no `github` URL. Never invent or link a private repository URL, or attach source-code schema to private source. Public-source projects use verified `github` links.

Statuses share one vocabulary: `Active`, `Production`, `Completed`, `Exploring`, and `Archived`. AegisGraph and CreditFlow QE are Active. CreditOps' approved recorded showcase, TradeFlow's local deliverable, and the four supporting labs are Completed within their documented scopes. These statuses do not establish production trading, SOC, cloud, or enterprise operation. A demo URL alone cannot support a Production status.

`projects.ts` assembles the approved order; `getSecurityProjects()` selects the supporting group. Preserve the established Detection slug. Add implementation facts only after reviewing public source, public documentation, or an explicitly approved artifact. For CreditOps, use only the public profile and showcase: do not inspect or copy private implementation into this site.

The optional `caseStudy` sections accept reviewed `paragraphs`, `bullets`, and ordered `steps`, with an optional editorial `title` that preserves the section anchor. Only populated sections render. Omit unanswered sections rather than adding placeholders. `technicalHighlights` and `technologies` contain verified project-specific facts.

`screenshots` and `architectureDiagrams` require existing reviewed local assets, descriptive alt text, intrinsic dimensions, and factual captions. Store them under `public/`, preserve aspect ratios, and exclude secrets or private data. TradeFlow's two images come from its public synthetic workstation captures. CreditFlow QE uses the reviewed actual custom-host payment capture, with synthetic account data and no credentials. Do not generate implementation evidence or imply that local screenshots establish a hosted service.

`website`, `github`, and labeled `links` supply public references. Optional `inspection` data supplies a summary, evidence links, and system facts; `guidedLinks` adds a restrained inspection group. Mark a link `featured: true` for card display. Supporting cards expose source links without preview galleries. These components are server-rendered and fetch no external evidence at runtime.

Keep provenance and unresolved requests in `src/data/project-evidence.ts`. Its exclusive `path`/`url` source records bind claims to inspected artifacts or public revisions. Never import it into application code or serialize its TODOs into pages, metadata, feeds, or bundles. The private site repository still must not contain credentials, confidential source, private contact details, or sensitive infrastructure information.

Edit `lab.ts` for evidence-backed open questions, `uses.ts` for confirmed tools, and `now.ts` for current relevant work. Change the Now date only after reviewing its content. Language experience and project stacks do not establish personal editor, hardware, or service use.

## Evidence boundaries and historical records

AegisGraph's public mode is read-only and deterministic. Saved analyst reviews, rule approval, and optional OpenAI analysis belong to local/interview mode. Its eight-scenario corpus, causal replay, positive/negative correlation receipts, bounded typed claims, regression comparisons, and unsigned hash-verifiable exports remain synthetic demonstration evidence. Authentication, tenant authorization, production ingestion, and independent evidence retention remain future work.

The September 27 refinement at `f616185` has [CI run 36348207961](https://github.com/farhan-shafee/aegisgraph/actions/runs/36348207961), with separate backend, frontend, browser, original-evaluation, and V2-benchmark results. October 14 inspection found public main unchanged and rechecked the existing CI logs, deterministic runtime, guided routes, and receipt behavior. It did not execute new source suites or live-model calls. The [final refinement review](https://github.com/farhan-shafee/aegisgraph/blob/main/docs/FINAL_EXCELLENCE_REVIEW.md) retains its initial pending API-rollout note; the site's later September 27 deployment record and current public reads are separate evidence.

Keep dated AegisGraph history attached to its original revisions. September 17 [source CI 35179396463](https://github.com/farhan-shafee/aegisgraph/actions/runs/35179396463) covers `534679eac4a04ee0298fe6f35d1422fa63a4fe90`; [hosted-demo CI 35251887304](https://github.com/farhan-shafee/aegisgraph/actions/runs/35251887304) covers `1670ca4b09e7000019401d852ab98e140bd137e7`. The [original evidence review](docs/aegisgraph-evidence-review.md) and [historical proof inspection](docs/proof-density-audit.md) remain archival records. Historical OpenAI observations do not extend into current deterministic benchmark accuracy or general model-safety claims.

CreditOps' public showcase plays recorded model-assisted investigations using synthetic data. Playback makes no fresh model or MCP diagnostic calls. Fresh diagnostics are a separate mode; recordings do not demonstrate model-directed follow-ups. Initiating causes remain unconfirmed and human review remains required. Source stays private.

TradeFlow's public source demonstrates a locally run synthetic workstation and reproducible test engineering. Its exact-head October 13 [CI run 38339620878](https://github.com/farhan-shafee/institutional-trading-sdet-lab/actions/runs/38339620878) covers `dc8ac09`, with 34 unit checks and 205 Playwright executions counted separately. It establishes no live brokerage, exchange execution, matching engine, real P&L, employer integration, or production trading suitability.

## Writing

Create `content/writing/your-article-slug.mdx`; its filename and `slug` must match. Start unpublished:

```mdx
---
title: "An evidence-based article title"
description: "A concise account of what this article covers."
date: "2026-10-14"
slug: "your-article-slug"
tags: ["security-engineering"]
draft: true
featured: false
---

## Context

TODO: Add reviewed observations and supporting evidence.
```

Front matter also supports `updated`, HTTPS `canonical`, and HTTPS or root-relative `ogImage`. Quote `date` and `updated` as `YYYY-MM-DD` strings. Tags use lowercase hyphenated words. The default canonical is the production article URL; a deliberately different canonical excludes the article from this sitemap. Relative image paths refer to `public/`.

Use front matter for the page title and `##`/`###` headings in the body. Code fences support syntax highlighting; headings receive copy-link anchors. Longer articles receive a table of contents. Related writing derives only from published content. Reading time estimates prose words and non-empty code lines.

Before publication, review every claim and artifact, check links and mobile rendering, obtain approval for publication and any confidential material, set the actual publication date and `draft: false`, then run all validation. Change `updated` only after a substantive review or revision.

Draft status defaults to true. Drafts and future-dated articles are excluded from public indexes, tags, sitemap, RSS, and article routes, including development and previews. There is no public draft bypass. Review trusted drafts in the editor or an ignored local rendering artifact. Dates use UTC; rebuild on publication day to refresh static indexes and feeds. A future date alone is not a privacy control: retain `draft: true` until approved.

The collection retains one published article and five unpublished drafts. No draft was published by the October 14 synchronization; excluded-project drafts and older outlines remain private editorial material. Do not expose them through Work, related-writing links, feeds, or metadata.

`content/writing/building-an-evidence-grounded-ai-security-investigation-system.mdx` remains the featured published article, **Building an Evidence-Grounded AI Security Investigation System**, dated September 17, 2026, with its existing September 27 update note. Preserve its original narrative and dates. The [article evidence review](docs/aegisgraph-article-evidence-review.md) maps its claims, synthetic screenshots, and simplified diagram; the [article plan](docs/aegisgraph-article-plan.md) remains historical. Earlier draft checks are distinct from publication validation.

## Identity, SEO, privacy, and deployment

`src/config/site.ts` centralizes Farhan's identity, `https://farhan-shafee.com`, GitHub, verified LinkedIn, optional email, and Search Console configuration. Social links and Person/ProfilePage `sameAs` use GitHub and LinkedIn. There is no business website entry or business affiliation in identity metadata. The optional email remains empty until a public professional address is supplied; no contact form or email service is required.

Pages have distinct canonical metadata, OpenGraph/Twitter cards, relevant project/article structured data, breadcrumbs, RSS, sitemap, and `llms.txt`. Only approved project records and published writing supply discovery content. Sitemap modification dates derive from article dates and the reviewed Now date. Private source must not receive a repository URL or `SoftwareSourceCode` reference.

`siteConfig.googleSiteVerification` is empty until Farhan supplies the exact HTML-tag token. Root metadata emits verification only for a real configured value. Supply the tag's content value, rebuild/deploy, and complete ownership verification in Search Console. URL-prefix HTML verification and Domain-property DNS verification are separate; the repository performs neither ownership verification nor sitemap submission.

Security headers live in `next.config.ts`. Static rendering and the initial theme script require inline scripts/styles, so CSP permits `unsafe-inline`; this is not a strict nonce-based CSP. Production excludes `unsafe-eval`, while development permits it for tooling. MDX is executable trusted repository content, never a remote or user-submission format. JSON-LD is safely serialized.

There are no analytics, tracking cookies, third-party scripts, or runtime service credentials. Theme preference is stored locally under `fs-theme`. Do not commit secrets or confidential data, including to source-only notes.

Deploy with Vercel's Next.js preset and this repository as the root directory. `npm run build` requires no service credentials. All production URLs derive from `siteConfig.url`. Bind both apex and www domains, configure DNS and HTTPS, and preserve the existing host-specific HTTP 308 www-to-apex redirect with path/query retention. Repository settings do not provision DNS or bind domains.

Vercel previews emit `noindex, nofollow`, an `X-Robots-Tag` header, and disallowing robots rules. These are indexing controls; use deployment protection for access restrictions. Headers and redirects require a Next.js-capable host. After publication, verify the exact deployment commit and production routes, discovery files, retired 404s/assets, both themes, and narrow layouts.
