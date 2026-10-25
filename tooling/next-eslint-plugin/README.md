# Local Next.js lint plugin security patch

This private package starts from the authenticated npm tarball for `@next/eslint-plugin-next@16.4.3`. Its local version is `16.4.3-farhan.1`; it is maintained in this repository and is not an official Next.js release.

The upstream `fast-glob` dependency pulls in `micromatch` and the unpatched `braces` package flagged by GHSA-vfj7-8cjw-p6xm. The only upstream `fast-glob` consumer is `dist/utils/get-root-dirs.js`. This patch replaces that helper's implementation with `glob@13.0.6` and `minimatch@10.2.6`, preserving directory-only matching, symlink traversal, original relative/absolute root representations, explicit trailing separators, input-array order and empty/missing input behavior.

Regression cases also cover literal brackets in checkout names, singleton character classes, zero-segment terminal globstars and static bases after brace expansion. Matching is relative to a literal traversal base so checkout names cannot accidentally become glob syntax.

The helper uses the documented **`glob/raw`** export. The default minified entry point embeds parser code that failed the deep-brace regression even though the resolved external dependencies passed npm audit. The unbundled entry point uses the updated dependencies from the lockfile. The failing candidate's evidence is retained separately.

All other upstream compiled JavaScript and declaration files remain byte-for-byte unchanged. The test suite checks their SHA-256 hashes against `upstream.json`, the 22-rule inventory, three observed effective ESLint configurations and actual page-link lint violations across four root configurations. Twenty-one tests cover the patch and its supply-chain invariants. The deep-brace case is a bounded subprocess check, not a claim that all denial-of-service patterns have been eliminated.

`upstream.json` records the original tarball URL, SHA-512 registry integrity and per-file SHA-256 values. `LICENSE.md` preserves the upstream MIT license. The root `package.json` declares this file dependency explicitly and uses npm's dependency-reference override so the existing `eslint-config-next` consumes the same reviewed plugin. `.npmrc` uses `install-links=true` so clean installs package the local source rather than depending on a development symlink.

Vendored compiled files are excluded from repository ESLint/Prettier rewriting; their hashes and real behavior are checked by tests. Existing application lint rules remain enabled. The root-directory helper is the only changed upstream code file. npm audit remains enabled for the full tree and production-only tree.

When updating Next's ESLint configuration, review the corresponding upstream plugin, rebase this patch, regenerate the upstream manifest and configuration baseline intentionally, and rerun every check. Remove the local package and override when a tested official release eliminates the vulnerable chain. Never update the recorded upstream hashes merely to accept unexplained rule changes.
