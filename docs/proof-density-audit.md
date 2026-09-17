# Proof-density audit — September 17, 2026

Recorded before implementation, against the current production site and current source.

## Live review

Reviewed Home, Work, AegisGraph, CyberBit, Job Intelligence Engine, Writing, the published AegisGraph article, Lab, About, Contact, Now, and Uses. Desktop dark-theme captures cover all twelve routes; mobile light-theme AegisGraph and tablet light-theme About check the existing responsive language. Current-run screenshots and DOM snapshots are held in ignored local review artifacts, not shipped with the site.

The visual system is already coherent: editorial dividers, restrained type, clear flagship hierarchy, factual captions, and separate exploratory work. Preserve the hero, images, themes, and server-rendered architecture.

| Finding                                          | Evidence and consequence                                                                                                                                                          | Smallest useful change                                                                                                                          |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Proof requires extra navigation                  | Home/Work project titles open case studies; direct source, demo, and article paths are absent from flagship blocks.                                                               | Add a compact proof row after the hero and reviewed secondary links on flagship cards.                                                          |
| Inspection material is buried                    | AegisGraph has source/demo actions, but its architecture, threat model, decisions, evaluations, and CI are much deeper. On mobile, a long technology list precedes the narrative. | Put an inspection section and mode-aware system summary before project details.                                                                 |
| Current deployment language is stale             | Article and About say local demonstration; case-study limitations describe the current system as local.                                                                           | Describe the hosted read-only demo separately from local/interview capabilities; preserve dated historical validation.                          |
| CyberBit's implementation is difficult to sample | Public methodology and explicitly fictional report sample are not directly linked near the case-study introduction.                                                               | Add a smaller inspection section with public product/tool/methodology/sample paths and distinct human-reviewed versus automated paid workflows. |
| Supporting pages do not connect the evidence     | About repeats broad direction; Lab's AI question omits AegisGraph; Now predates its launch; Contact routes technical readers only to a profile.                                   | Add specific first-person decisions, related evidence, current direction, and clearer inquiry routing.                                          |
| Publication structure is sound but sparse        | Writing has one substantial featured article, with tags/date/reading time. Uses promises tooling but has no confirmed entries.                                                    | Keep one honest featured article, tighten the editorial introduction, and de-emphasize unpopulated personal tooling.                            |

## Evidence boundaries

- AegisGraph source reviewed read-only at `1670ca4b09e7000019401d852ab98e140bd137e7`. Public demo and `/api/runtime` returned 200. Runtime reports public demo, read-only, deterministic analyst; source selects the deterministic provider before persistence. No live model request or mutation was performed.
- Vercel frontend is observable. Railway FastAPI and Railway PostgreSQL topology is supplied by the owner and supported by deployment documentation; the public proxy does not independently identify the backend host.
- Successful CI run `35251887304` corresponds to that source revision. Recorded test/evaluation results remain validation coverage, not production-security claims.
- Historical OpenAI findings/screenshots describe local live-provider validation, not public-demo behavior. Production authentication, tenant authorization, broader live-model evaluation, ingestion scale, and stronger evidence/audit protections remain future work.
- CyberBit evidence supports public checks, a human-reviewed Snapshot, a separate automated paid Brief, Stripe, transactional email, and admin/report tooling. Only public product, tools, methodology, and fictional sample destinations should be exposed. No payment, scan, admin, or customer workflow is executed for this review.
- Job Engine remains supporting deterministic workflow engineering. Lab status stays exploratory. No personal tools, employment details, outcomes, or availability are inferred.

## Implementation and acceptance scope

Use static reviewed data and reusable server components. Keep evidence links keyboard-accessible, generously spaced, and correctly marked when opening external tabs. Do not add dependencies, runtime repository requests, statistics, or new imagery. Preserve canonical URLs, schema, feeds, and all other draft exclusions.

Validate the complete changed site through formatting, lint, type checking, unit/content tests, browser tests, and a production build. Review 320/375/430px, tablet, desktop, and both themes; check public links and deployed production after the authorized main-branch push.

## Implementation review and local validation

The completed changes preserve the hero and flagship order. Static evidence links now connect Home/Work, near-top project inspection summaries, the article, and reviewed public references. AegisGraph's hosted and local modes are explicit; CyberBit's fictional sample and distinct reporting workflows remain clear. About adds first-person failure/review decisions, Lab separates questions/evidence/unknowns, Now reflects the launch, Contact routes visitors, and Uses shows verified project stacks without inferring personal tooling. Redundant flagship technology lists and the single-article archive filter were reduced.

Formatting, lint, type checking, all 30 unit/content tests, all 24 browser tests, and the production build passed. Browser coverage includes 320, 375, 430, 768, 1024, 1440, and 1920px in both themes; accessibility, keyboard navigation, image loading/aspect ratios, canonical metadata, structured data, internal links, feeds, and five remaining draft exclusions passed. Cold-load CLS was 0 in the eight tested flagship/index viewport combinations. No new dependencies, client components, runtime data fetches, or image assets were added.

Of 24 unique external public destinations, 23 returned HTTP 200. LinkedIn returned HTTP 999, an automated-access rejection; its owner-verified URL is retained, without claiming a successful availability check. The AegisGraph source repository was not modified. Post-push production checks are reported separately from these local results.

## Production follow-up

The first live check identified an existing file-navigation issue that the local server did not expose: full-size screenshot links used Next.js routing, which prefetched PNG paths as RSC pages and received Vercel 404s. The PNG assets themselves returned 200 and displayed correctly. Those links now use ordinary anchors, preserving their presentation and native image viewing without application-route prefetch. Browser coverage checks both the absence of PNG RSC requests and actual full-size image navigation. An unrelated smoke-check label assertion was corrected to account for CSS uppercase rendering; no page change was needed for it.
