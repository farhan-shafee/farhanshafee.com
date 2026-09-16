# Post-launch integration

Reviewed on 2026-09-16 for `https://farhan-shafee.com`. This is a maintenance record, not a public application route.

## Profiles

GitHub and CyberBit Solutions remain the verified public links already configured. Both destinations returned HTTP 200 during this pass. LinkedIn is unset because the owner has not supplied an exact verified profile URL. No profile was inferred from a name or search result.

Set `siteConfig.linkedin` in `src/config/site.ts` only after Farhan supplies that URL. The existing header, footer, About, Contact, `llms.txt`, homepage Person schema, and About ProfilePage schema already consume the central setting. An empty value produces no link or `sameAs` entry.

## Real screenshot evidence

`public/projects/` does not yet exist. The only project visuals are the two authored conceptual workflow diagrams under `public/diagrams/`; they are not interface screenshots. No screenshot records or placeholder assets were added.

Add reviewed captures at these exact repository-relative paths. Start with the first two for each project and add up to two more only if they show distinct technical evidence.

| Project                 | Capture                             | File to add                                                        |
| ----------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| CyberBit Solutions      | Free security check result          | `public/projects/cyberbit-solutions/free-security-check.png`       |
| CyberBit Solutions      | Generated, reviewed Snapshot report | `public/projects/cyberbit-solutions/risk-snapshot-report.png`      |
| CyberBit Solutions      | Sanitized admin/report builder      | `public/projects/cyberbit-solutions/admin-report-workflow.png`     |
| CyberBit Solutions      | Paid Brief workflow                 | `public/projects/cyberbit-solutions/instant-signal-brief-flow.png` |
| Job Intelligence Engine | Top Matches                         | `public/projects/job-intelligence-engine/top-matches.png`          |
| Job Intelligence Engine | Job scoring and evidence detail     | `public/projects/job-intelligence-engine/job-detail-scoring.png`   |
| Job Intelligence Engine | Resume Lab review/export            | `public/projects/job-intelligence-engine/resume-lab-review.png`    |
| Job Intelligence Engine | Application tracker/workflow        | `public/projects/job-intelligence-engine/application-tracker.png`  |

Use real captures, with customer records, career history, correspondence, payment/account details, private URLs, and tokens removed. Crop to a focused workflow while preserving the image's aspect ratio and enough context to explain it. Captions must describe the inspected screen; do not infer outcomes or production success from an interface.

After inspection, add only the strongest two to four images to each project's `screenshots` array in `src/data/projects.ts`. Use the corresponding `/projects/...` public URL, actual intrinsic width/height, descriptive alt text, and a concise factual caption. The existing Next.js Image component supplies responsive sizing and optimization for raster captures. Check legibility at mobile widths in both themes; keep the existing case-study layout.

## Search Console readiness

The live sitemap and robots endpoints returned HTTP 200:

- `https://farhan-shafee.com/sitemap.xml` contains 12 canonical public page URLs, including all four work details. No draft article or draft-only tag is included.
- `https://farhan-shafee.com/robots.txt` allows production crawling and references the sitemap above.
- Canonical, OpenGraph, Twitter, RSS, llms.txt, Person/ProfilePage, and work breadcrumb URLs use the production domain. The live `www` hostname redirects to the apex with HTTP 308 and preserves paths and queries.

No Search Console token was supplied, and account ownership/verification status has not been confirmed. The empty `googleSiteVerification` field in `src/config/site.ts` is ready for the exact HTML-tag content value. Root metadata omits the tag while the field is empty; there is no sample or invented token.

For a URL-prefix property, use `https://farhan-shafee.com`, add the supplied HTML-tag token, rebuild/deploy, inspect the live homepage tag, then complete verification in Search Console. For a Domain property, use Google's DNS verification flow instead. Google documents the [supported ownership-verification methods](https://support.google.com/webmasters/answer/9008080). Once ownership is verified, submit the [production sitemap](https://farhan-shafee.com/sitemap.xml) in Search Console and inspect representative work URLs. A sitemap advertises preferred URLs; submission does not guarantee indexing. See Google's [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

No Search Console account action, DNS change, or sitemap submission was made during this pass.

## First technical draft

`content/writing/how-i-built-an-ai-job-intelligence-engine.mdx` contains “Building a Job Intelligence Engine for Multi-Source Job Discovery and Application Workflows.” The existing filename and slug are retained. `draft: true` and `featured: false` keep it unpublished.

The draft uses the previously reviewed Job Engine implementation findings, including vinext/Vite, source adapters, normalization/provenance, Career Truth Vault, deterministic scoring/templates, Microsoft Graph scope boundaries, résumé review, and user-confirmed tracking. [Article evidence notes](article-evidence-review.md) map claims to that evidence. Proposed evaluation work is explicitly prospective. No metrics, users, successful provider operations, or model-backed functionality are invented.

## Validation and live QA

The live-site browser pass completed 15 tests across all 12 core/project routes and seven widths (320–1920 px). It checked both themes, automated accessibility, image loading, keyboard navigation, theme persistence, metadata, structured data, internal links, feeds, security headers, draft exclusion, and normal 404 behavior. No old-domain URLs, editorial TODOs, empty LinkedIn links, console errors, or horizontal overflow were found. Separate normal-TLS requests confirmed both public external destinations and actual `www` redirect behavior.

The browser run uses read-only page requests and interface navigation. It does not exercise forms, scans, payments, authentication, or external application workflows. Search Console verification and indexing status remain outside this evidence.

Repository validation passed: formatter and format check, lint, typecheck, 24 unit tests, the production build, and all 16 browser tests against the local production build. The local suite also checks exact-host redirect matching and the absence of empty verification/profile output. The new draft was separately parsed and rendered as MDX without publishing it; the publication filter excludes it, its direct route returns 404, and its title is absent from generated public pages and feeds.
