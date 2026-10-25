# Portfolio security update and Railway pilot

> **Historical deployment context** - This record retains its original milestone, source revisions, measured results and approval boundaries. Earlier hosting/source-visibility/pending-release statements are dated history. Use [the current production documentation](../../PROJECT_DEPLOYMENTS.md) for the October 24-25 Railway topology, release state and remaining closeout.

Approved scope: execute the patch/test/isolated-pilot sequence in Portfolio_Railway_Readiness_2026-10-25.txt, approved by the user on October 25, 2026. Preserve the existing site and production Vercel hosting.

## Goal and architecture

Upgrade the existing Next.js application to a patched release, retain the reviewed lint security behavior, and run an independent Node 24 Railway pilot. No application database is needed. No redesign, canonical-domain cutover, production deployment, credential changes, old-provider deletion or unrelated project migration is included.

## Decisions

- Use Next.js and eslint-config-next 16.4.3, refreshing the vulnerable transitive Zod dependency through its existing compatible parent range.
- Preserve the custom glob helper in the locally packaged ESLint plugin. Official 16.4.3 tarball integrity was verified; all compiled plugin files match 16.3.8, so only package/version/upstream metadata need rebasing.
- Keep existing React versions, content, URLs and security headers.
- Prefer Railpack with normal next build/next start. Do not add standalone output unless packaging diagnostics require it.
- Build the pilot with VERCEL_ENV=preview so existing noindex headers, metadata and robots protection remain effective. Keep NODE_ENV=production and Node 24.
- Use a temporary Railway domain, one replica, CPU 0.5 / memory 0.5 GB, no database or volume. Keep the public apex and www domains on Vercel.
- Record source identity, dependency/audit results, tests and acceptance evidence. Keep all credentials and raw private provider responses out of deliverables.

## Acceptance

Full and production audit exits zero. Existing unit/toolchain, lint, type, format, production build and browser gates pass. Candidate rules and content behavior remain intact.
The pilot reaches terminal SUCCESS with the verified source, has healthy replicas, serves all existing content/assets/feeds/metadata, preserves security and preview noindex, and passes hosted acceptance.
A separate production-mode build verifies canonical redirects and public indexing behavior; the pilot intentionally disallows indexing.
