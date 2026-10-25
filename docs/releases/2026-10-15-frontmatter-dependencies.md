# Frontmatter dependency follow-up — 2026-10-15

> **Historical deployment context** - This record retains its original milestone, source revisions, measured results and approval boundaries. Earlier hosting/source-visibility/pending-release statements are dated history. Use [the current production documentation](../PROJECT_DEPLOYMENTS.md) for the October 24-25 Railway topology, release state and remaining closeout.

Based on portfolio integration commit `9867fd2ccab55441165760ed67602e89bce76b3d`. This follow-up changes the repository-owned article parser and dependencies; it does not publish or deploy the site.

## Runtime chain removed

`gray-matter@4.0.3` required `js-yaml@3.15.2`, which required `argparse@1.0.10` and `sprintf-js@1.0.3`. The sprintf-js advisory [GHSA-hp3w-g68c-fv3c](https://github.com/advisories/GHSA-hp3w-g68c-fv3c) covers all published sprintf-js versions through 1.1.3 and lists no patched version. Updating sprintf-js within this chain cannot resolve it.

The article reader now extracts an opening and closing YAML delimiter and calls `js-yaml@4.3.2` directly. Version 4 was already installed for ESLint and is now an explicit runtime dependency. Its `argparse@2.0.1` has no sprintf-js dependency. The old chain and ten unnecessary packages are removed, with no dependency overrides or audit exclusions.

The content contract remains trusted, repository-authored YAML and MDX. Existing metadata validation, publication policy, tags, quoted dates, boolean flags, article body, and reading estimates remain in place. Frontmatter without a closing delimiter now fails with a filename-specific error instead of silently consuming the article. BOM and CRLF sources, multiline YAML values and lists, duplicate-key rejection, missing metadata, and rejection of executable YAML tags have regression coverage. This is a YAML frontmatter reader, not an interface for remote content or executable frontmatter engines.

## Remaining development chain — REVIEW

The full audit still exits **1**, with **5 high**, **0 moderate**, **0 critical** affected-package entries. The production-only audit (`npm audit --omit=dev`) exits **0**, with **0 findings**. A clean production audit does not make the full audit pass.

The remaining chain is `eslint-config-next@16.3.8` → `@next/eslint-plugin-next@16.3.8` → `fast-glob@3.3.1` → `micromatch@4.0.8` → `braces@3.0.3`. [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) lists braces through 3.0.3 as affected, with no patched version. Registry checks on 2026-10-15 confirmed braces 3.0.3 remains latest. Official Next ESLint plugin releases 16.4.1 and 16.5.0-canary.14 still depend on fast-glob 3.3.1, so neither removes this chain. Fast-glob 3.3.3 still depends on micromatch and braces.

The installed plugin's only fast-glob consumer is `dist/utils/get-root-dirs.js`, which calls `globSync(rootDir, { onlyDirectories: true })`. These are repository lint configuration inputs. The finding remains unresolved REVIEW, not an accepted-risk waiver or a clean full audit. All existing Next, React, TypeScript, accessibility, and Core Web Vitals rules remain unchanged.

A direct tinyglobby alias was investigated and rejected before any dependency change: default directory expansion, path representations, empty patterns, and symlink roots differ. No custom compatibility package was introduced. Revisit when an official compatible Next/plugin/globbing release removes the affected chain. Do not downgrade framework lint support, remove rules, or suppress the audit to obtain a passing result.

## Verification

- Baseline: 37 unit tests passed; full audit had 5 high and 4 moderate entries.
- The new missing-delimiter regression failed against the old reader, then passed with the new parser.
- Unit suite: 42 passed, zero failures or skips.
- A before/after deep comparison of all six repository article objects found identical metadata, bodies, and reading estimates.
- Production build, TypeScript, ESLint, and Prettier passed.
- Full existing Playwright suite: 26 passed using one worker against an owned loopback-only server; no tests or assertions were disabled. The server was stopped afterward.
- Changed-file credential-pattern scan: zero findings; this is a scoped pattern check, not an exhaustive security guarantee. `git diff --check` passed.
- Full audit: exit 1, five high development entries. Production-only audit: exit 0, zero findings.

Supporting official sources: [js-yaml v4 API](https://github.com/nodeca/js-yaml/tree/v4.3.2), [Next ESLint plugin](https://github.com/vercel/next.js/tree/v16.3.8/packages/eslint-plugin-next), [fast-glob](https://github.com/mrmlnc/fast-glob), [tinyglobby migration notes](https://superchupu.dev/tinyglobby/documentation).
