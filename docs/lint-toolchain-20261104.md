# Lint dependency refresh — November 4, 2026

The full dependency audit on portfolio card revision `501ebbf` found ten moderate affected-package entries from two development-tool advisories. The original failing [CI run](https://github.com/farhan-shafee/farhanshafee.com/actions/runs/41903678475) remains preserved. The owner separately approved this project-local remediation; no security gate was disabled.

## Change and boundaries

- Keep the maintained Next 16.4.3 lint helper and all authenticated upstream rule/declaration bytes unchanged.
- Update the private adapter to `16.4.3-farhan.2`, pinning `glob 14.0.2` and `minimatch 11.0.1`.
- Scope the same minimatch pin to `@typescript-eslint/typescript-estree`; regenerate the real project lock with `install-links=true`.
- Preserve all runtime dependency entries, lint rules/configuration baselines, CI gates and application source.
- Leave the historical October remediation records intact. This record supersedes their dependency pins, not their dated execution evidence.

Advisories: [glob GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4) and [minimatch GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249).

## Actual local execution

| Check                                                           | Result                              |
| --------------------------------------------------------------- | ----------------------------------- |
| Fresh npm ci                                                    | Passed; lock unchanged              |
| Focused lint compatibility/provenance checks                    | 24 passed; zero failed/skipped      |
| Full unit suite                                                 | 69 passed; zero failed/skipped      |
| Full browser/axe suite                                          | 26 passed; zero failed/skipped      |
| ESLint, type generation, TypeScript, Prettier, production build | Passed                              |
| Full npm audit / production-only npm audit                      | 0 / 0 findings                      |
| Installed dependency graph                                      | Passed; local adapter copy selected |

The focused checks execute real page-link violations, complex root discovery, bounded deep-brace behavior, effective rule configuration comparison and upstream-file hash verification. No test assertions, fixtures or test cases changed. [Machine-readable local receipt](lint-toolchain-20261104.json) retains command timestamps, actual exits, log hashes and source hashes. Latest hosted CI and exact resulting commit are recorded separately in PR #4.

## Rejected resolution attempts

The isolated proposal lacked `.npmrc` and produced a symlink lock entry. A preservation guard rejected it before any copy. Generating a lock against the existing installed tree then retained stale `16.3.8-farhan.1` metadata for the local package. The prior module tree and lock were preserved outside the source checkout; fresh npm resolution evicted only that stale package entry and produced a real `16.4.3-farhan.2` copied package. All application dependency entries matched the original lock. These were dependency-resolution failures, not test failures; the successful suites were not retried to hide failures.

## Limits

The existing ESLint 9.39.5 end-of-support warning remains visible. Zero audit findings describe this execution and do not establish comprehensive security. Keep the local Next plugin patch until an official release satisfies the documented removal criteria and the same behavioral/provenance checks. No system software, DNS, billing, provider configuration or public portfolio release changed.
