# CreditFlow QE portfolio integration — 2026-10-15

Source validation completed against base 562d534160d7aee07e200dcb49fe77ec994551e9. Production deployment provenance and public postflight results are recorded in the associated pull request after release.

## Approved change

- Add CreditFlow QE as the fourth flagship, after AegisGraph, CreditOps AI and TradeFlow. Preserve the four supporting security projects and existing project content.
- Reuse the shared card, inspection, metadata, sitemap and case-study routes. Add the required source-only evidence review and public llms.txt index.
- Copy the actual reviewed custom-host payment capture without image editing. SHA-256: 8ebe78c28fa161da2737c0c5a97eae410ee3d4a63eef29c3eae1b078a41aba4d.
- Link the real demo, inspected source branch, verified source CI and release evidence. Keep synthetic-data, AI-assistance, session-expiry and unverified-Jenkins/load boundaries visible.

## Executed checks

- Baseline unit suite: 37 passed. Updated four-flagship expectations failed before implementation as intended.
- Final unit/rendering/metadata suite: 37 passed, zero failures, errors or skips.
- Existing full Playwright suite: 26 passed, covering 320–1920px, both themes, route rendering, asset loading, axe, keyboard use, metadata, feeds, security headers and redirects. No assertions were disabled.
- Build, TypeScript, ESLint and Prettier passed.
- Reviewed desktop/light and mobile/dark screenshots of the actual new case-study route.
- The initial browser setup found occupied port 3100 and ran zero tests. The existing process was left untouched; the complete suite passed against an owned server on an isolated local port.
- Initial missing evidence-registry and llms-index failures are retained locally and were corrected at their source.

## Dependency review — REVIEW, not a clean audit

The following inventory records integration commit `9867fd2`. The [frontmatter dependency follow-up](./2026-10-15-frontmatter-dependencies.md) records the later runtime remediation and remaining development finding.

The initial unchanged dependency inventory reported 1 critical, 7 high and 4 moderate affected-package entries. Project-local compatible patches update Next.js/eslint-config-next 16.3.5 → 16.3.8, Sharp 0.35.4 → 0.35.5 and source-map-js 1.2.1 → 1.2.2, with matching native packages in the lockfile. No system software, global configuration or dependency in the original checkout was changed.

The critical Next.js ImageResponse advisory requires attacker-controlled SVG values. The inspected static Open Graph image uses repository-owned site configuration rather than request content; the supported patch was applied regardless. No remote image allowlist is configured. These source observations do not constitute an exploitability guarantee.

After patches, full npm audit still exits 1 with 5 high and 4 moderate affected-package entries. Production-only audit exits 1 with 4 moderate entries and zero high or critical entries. The full and production audits remain REVIEW; they are not described as passed and no audit rule was suppressed.

- Five high development entries share the braces → micromatch/fast-glob → Next ESLint dependency chain. npm explain confirms braces is development-only. Inputs are reviewed repository lint globs rather than public requests.
- Four moderate production-dependency entries share the gray-matter → js-yaml → argparse → sprintf-js chain. The application reads article content from repository-owned content/writing files; it has no public article editor or upload path. The affected formatting use is in argparse help handling. Package presence remains a finding even though no public format-string input was identified.
- At review time, braces 3.0.3 and sprintf-js 1.1.3 were their latest published releases and their advisories listed no patched versions. Automatic major downgrades and parser/linter replacements were not bundled into this content integration.
- Reassess before introducing visitor-controlled article content, glob patterns, format strings or uploaded images. A future dependency-maintenance change should retain current article and lint behavior and rerun these checks.

Official advisories:

- https://github.com/advisories/GHSA-vcvr-r3jv-pc5j
- https://github.com/advisories/GHSA-cjq9-62q9-8jv4
- https://github.com/advisories/GHSA-vfj7-8cjw-p6xm
- https://github.com/advisories/GHSA-hp3w-g68c-fv3c

No scanner result establishes production security or regulatory compliance. This release changes portfolio content and compatible dependency patches; it does not alter the CreditFlow services, DNS, billing, credentials or other deployed projects.
