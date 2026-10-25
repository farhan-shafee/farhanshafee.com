# AegisGraph flagship integration

> **Historical deployment context** - This record retains its original milestone, source revisions, measured results and approval boundaries. Earlier hosting/source-visibility/pending-release statements are dated history. Use [the current production documentation](PROJECT_DEPLOYMENTS.md) for the October 24-25 Railway topology, release state and remaining closeout.

## Positioning and hierarchy

AegisGraph is the primary flagship: a security investigation platform for synthetic fintech telemetry, deterministic detection and correlation, bounded AI analysis, and validated evidence citations. Its category is Security engineering / AI systems. The case study states at the outset that this is a synthetic/demo environment, not a production SOC deployment.

The homepage now presents AegisGraph first with the largest existing project treatment, an incident-workspace preview, and the central evidence-validation distinction. CyberBit Solutions follows immediately with a substantial screenshot-led block. Job Intelligence Engine remains third as a compact supporting systems project, followed by the Detection & Security Engineering Lab and Secure Infrastructure & Homelab.

Work groups AegisGraph and CyberBit as the two selected systems; Job Intelligence Engine and the labs follow under supporting engineering. About adds a concise explanation of AegisGraph as proof of the existing Security Engineering × AI Automation × Fintech Systems positioning. The approved typography, colors, themes, navigation, and editorial design remain intact.

## Case-study structure and evidence

The existing reusable case-study renderer now supports four optional sections: Demo scenario, Detection & correlation, Evidence-grounded AI, and Validation. Existing case studies continue using their original content. AegisGraph includes Overview, Problem, System, Demo scenario, Selected interfaces, Technical highlights, Architecture, Detection & correlation, What I built, Evidence-grounded AI, Engineering decisions, Security / privacy considerations, Validation, Lessons / constraints, and Links.

The initial source review covers the README, portfolio summary, demo guide, interview notes, validation record, UX audit, threat model, architecture decisions, source implementation, live-validation records, and screenshot documentation. The inspected AegisGraph revision was `7293c515d47178405df6fcf93feeeadac067cf64`. That repository was read only and remained clean and unchanged. The claim-by-claim map and subsequent public-source verification are in [the evidence review](aegisgraph-evidence-review.md).

The story follows telemetry → normalization → detection → correlation → incident → evidence → bounded AI analysis → schema and citation validation → analyst review. It surfaces the four adapters, canonical event model, reproducible 4,026-event dataset, ten rules, deterministic correlation predicates, relational entity view, human workflow, and PostgreSQL/SQLite architecture. The Atlas scenario describes observed activity without asserting a known attacker, malware, exfiltration, or financial loss.

## Selected screenshots

All four images are reviewed synthetic-data captures at 1600 × 1050. Each original and copied PNG was inspected. No visible secrets, credentials, private personal records, browser chrome, or workstation paths were found.

| Source screenshot        | Public copy                                           | Evidence                                                            |
| ------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------- |
| `02-incident.png`        | `public/projects/aegisgraph/incident-workspace.png`   | Correlation explanation, timeline, and analyst workspace            |
| `05-grounded-answer.png` | `public/projects/aegisgraph/grounded-ai-answer.png`   | Actual OpenAI response rendered as validated findings and citations |
| `04-entity-graph.png`    | `public/projects/aegisgraph/entity-relationships.png` | Evidence-backed entity relationships                                |
| `07-evaluations.png`     | `public/projects/aegisgraph/evaluation-dashboard.png` | Executed deterministic application-boundary evaluations             |

Captions qualify the synthetic content and distinguish deterministic evaluation from live-model behavior. Images preserve aspect ratio, use Next.js responsive optimization and lazy loading, and include descriptive alternatives and full-size links for detailed inspection. Only the incident workspace is used in the homepage preview.

## AI grounding, security, and limitations

The model is not the system of record. The provider receives bounded incident evidence and proposes typed claims and evidence references. The application checks schema, evidence existence, incident membership, bounded-context membership, and claim support outside the model. Fixed templates render accepted findings; an invalid claim rejects the entire answer. The provider cannot change case state.

The case study distinguishes credential-free deterministic and real OpenAI providers. Recorded live validation returned ten supported findings with 13 citation references. The malware-family question returned insufficient evidence. The telemetry-injection fixture excluded untrusted free text before the model call; it does not establish universal prompt-injection resistance. Foreign-case, nonexistent, cross-incident, and omitted-context citations are described as specific application-boundary checks.

The initial integration used the source project's historical hardening coverage: 146 backend tests, 23 frontend tests, 13 browser tests, and 28 deterministic evaluations in its September 17, 2026 UTC record. The later release review raises frontend coverage to 25 tests, as recorded in the dated follow-up below. Dependency audit results are dated. The small live-model sample retains its earlier HTTP 429 failures and is not presented as a broad reliability or security guarantee.

Visible future work includes production identity and authorization, tenant isolation, multi-tenancy, authenticated streaming-scale ingestion, repeated live-model evaluation, and stronger independent evidence/audit retention. The limitations also acknowledge bounded-context omissions, unverified telemetry truthfulness, a narrow claim vocabulary, human review, and privileged database-owner powers.

## SEO and writing

The public route is `/work/aegisgraph`. Shared project metadata produces its title, description, canonical URL, OpenGraph, Twitter metadata, and breadcrumbs. The dynamic sitemap includes the route; `llms.txt` leads with AegisGraph and preserves its demo boundaries. Production URLs continue to use `https://farhan-shafee.com`. Robots, RSS, existing schema, and draft exclusion remain intact.

No article was published or added to the public article collection. [The internal article plan](aegisgraph-article-plan.md) prepares “Building an Evidence-Grounded AI Security Investigation System” using the existing writing architecture; any future MDX draft must retain `draft: true`.

At the initial integration, source documentation established an earlier GitHub CI success but did not establish the latest hardening revision's hosted result, and the public repository endpoint returned 404. That pass therefore linked to Contact without exposing an unverified repository link or claiming current hosted CI success. The following public-source pass resolves those specific gaps.

## Public source follow-up — September 17, 2026 UTC

Unauthenticated GitHub API inspection verified [the public AegisGraph repository](https://github.com/farhan-shafee/aegisgraph). Its inspected `main` revision was `c95afa6`, with the owner-selected MIT license. Repository and documentation links are now supported; source publication does not imply a hosted demo or production SOC deployment.

[Run 35179396463](https://github.com/farhan-shafee/aegisgraph/actions/runs/35179396463) passed the backend, frontend, and browser jobs between 03:46 and 03:49 UTC on September 17, 2026, at revision `534679eac4a04ee0298fe6f35d1422fa63a4fe90`. The site can cite this named successful run without claiming success for a different `main` revision. CI uses deterministic providers and makes no live OpenAI calls.

The [public release review](https://github.com/farhan-shafee/aegisgraph/blob/main/docs/PUBLIC_RELEASE_REVIEW.md) records 146 backend tests, 25 frontend tests, 13 browser tests, and 28 deterministic evaluations passing. Its two added frontend regression tests cover actor attribution and separately labeled AI-assisted findings. Public coverage wording now uses 25; the original count of 23 above remains historical. The recorded live OpenAI results and their limitations are unchanged. This portfolio update did not modify AegisGraph or rerun its tests or live evaluations.

## Performance

Lossless PNG compression preserves identical decoded image scanlines and reduces the four source files from 536,175 to 525,374 bytes in total. These source bytes are not all loaded on the homepage.

Compared with the previous production build, direct JavaScript chunks remain unchanged at 592,883 raw bytes / 184,181 summed gzip bytes. CSS increases from 32,729 to 33,281 raw bytes and from 7,408 to 7,483 gzip bytes: 552 raw bytes / 75 gzip bytes. No new client component, package, or runtime script was added.

The production image optimizer serves the incident preview as WebP at 15,354 bytes for 640 pixels, 23,018 bytes for 828 pixels, and 45,144 bytes for 1200 pixels. These are measured response sizes, not a claim about every device's total page transfer. Fixed dimensions and responsive image sizes preserve layout stability; the cold-load CLS checks pass their 0.1 threshold.

## Validation and visual review

- Formatter, lint, TypeScript checking, and production build: passed.
- Personal-site unit tests: 27 passed.
- Personal-site browser tests: 24 passed, no failed tests in the last-run record.
- Browser coverage: all 13 public page routes at 320, 375, 430, 768, 1024, 1440, and 1920 pixels in both themes; image loading/aspect ratio, no horizontal overflow, no console/page errors, keyboard navigation, persistent theme, and axe accessibility checks.
- SEO/behavior coverage: internal links, unique metadata, canonical/OG URLs, structured data, breadcrumbs, sitemap, robots, RSS, `llms.txt`, security headers, permanent www redirect, and unpublished/unknown route exclusion.
- Visual review: Home, Work, AegisGraph, CyberBit, Job Intelligence Engine, and About at 320, 375, 430, 768, 1440, and 1920 pixels in both themes. All 72 review captures were saved locally. No clipping, overlap, missing images, or broken stacking was found. Fine application UI text remains available through full-size screenshot links.

Review captures and measurement artifacts remain ignored local artifacts. No local repository paths or secrets are included in public content. Historical review documents remain historical rather than being rewritten to imply they covered this integration.

## Remaining opportunities

- Keep public source links and dated CI references tied to verified repository visibility and the specific tested revision as AegisGraph evolves.
- Develop the internal article plan into a reviewed technical draft; publish only when explicitly requested.
- Refresh portfolio screenshots and evidence as production authentication, authorization, ingestion, and audit protections evolve in the separate AegisGraph project.
- Gather broader repeated live-provider evaluation before making stronger reliability claims.
