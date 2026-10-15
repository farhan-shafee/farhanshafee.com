# Lint dependency remediation — 2026-10-15

The full portfolio npm audit previously reported five high-severity affected-package entries from one Next ESLint → fast-glob → micromatch → braces chain (GHSA-vfj7-8cjw-p6xm). Production-only audit already reported zero. The current tested dependency tree removes that chain and both audits report zero. These are dated audit results, not a security certification.

## Implementation

The private local package `@next/eslint-plugin-next@16.3.8-farhan.1` starts from the authenticated upstream 16.3.8 tarball. Only its root-directory discovery helper changes; every other compiled rule/configuration/declaration file keeps the upstream SHA-256 hash. All 22 Next rules and three effective Next/React/accessibility/TypeScript configurations remain intact. No application source, article, project data or public image changed.

The replacement pins glob 13.0.6 and minimatch 10.2.6, using the documented unbundled `glob/raw` export. The full lock graph contains no fast-glob, micromatch or braces. The local package is explicitly declared and selected by npm's dependency-reference override; project-local `install-links=true` makes a clean install copy the reviewed package. See [provenance and maintenance](../tooling/next-eslint-plugin/README.md).

## Executed local validation

- Fresh `npm ci`; 63 unit tests passed, including 21 focused lint-toolchain regressions.
- 26 full Playwright/axe browser tests passed on an owned loopback server with one worker, no failures or skips.
- Production build, ESLint, Next type generation, TypeScript and Prettier passed.
- Full and production-only npm audits: zero findings.
- Gitleaks 8.30.1: zero findings in the 161-file reviewed source snapshot.
- Independent review: 54 upstream/fork path comparisons matched; the three discovered lint-weakening cases now detect the same actual page-link violations as upstream. No blocking findings remained.
- CI workflow YAML parsed; immutable action pins, read-only contents permission and failure propagation reviewed. Actual GitHub Actions/release results are recorded separately after execution.

[Local receipt](lint-toolchain-local.json) records inputs, results and log hashes. Raw transcripts and rejected candidate evidence remain in the project's ignored work area. The preserved upstream `node-attributes.js` comment contains one trailing space; changed-code whitespace checks passed while authenticated upstream bytes were retained.

## Failures retained and corrected

The dependency-removal regression first failed against the original installed tree (13 passed, one failed). An initial npm install retained the old registry package; clean resolution and installation proved that the actual local package was selected. A first glob candidate using its default minified bundle failed the bounded deep-brace check with a stack overflow. The explicit raw export uses the updated external parser and passed.

Review then exposed missing roots in bracket-containing checkouts, singleton character classes and terminal globstars. Six new regressions failed before repair (14 passed, six failed). Matching now uses literal traversal bases, handles zero-segment globstars and computes bases per brace-expanded alternative. The final 21 focused checks passed. Assertions were retained; no test was disabled or retried.

## Maintenance boundary

This is a maintained local fork, not an official Next release. Rebase and review it when upgrading the upstream plugin; remove it when a tested official release removes the vulnerable chain. Audit results do not cover every possible denial-of-service pattern, external CLI or platform dependency. Existing ESLint deprecation/install-script warnings remain visible. No system installation, DNS, resource, billing or unrelated project change was required.
