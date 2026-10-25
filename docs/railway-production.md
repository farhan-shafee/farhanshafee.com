# Railway production deployment

The public portfolio is served at https://farhan-shafee.com.
The Railway production service follows this repository's `main` branch.

## Runtime configuration

- Node.js 24 with Railpack.
- Build: `npm run build`.
- Start: `npm run start -- --hostname 0.0.0.0`.
- Health check: `/`.
- Production: `NODE_ENV=production` and `VERCEL_ENV=production`.
- Rehearsal: `NODE_ENV=production` and `VERCEL_ENV=preview`.
- Canonical URLs remain `https://farhan-shafee.com`.
- No application database or persistent volume is required.

## GitHub App access

The Railway GitHub App must include `farhan-shafee/farhanshafee.com` in its
selected-repository list. Public read access alone does not provide the
repository's deployment events.

## Release verification

1. Merge reviewed changes into `main`.
2. Confirm the GitHub **Portfolio quality** workflow succeeds for that commit.
3. Confirm Railway reaches **SUCCESS** at the same commit SHA.
4. Check public pages, articles, assets, feeds and security headers.
5. Check public indexing and the permanent `www` redirect with path/query intact.

Production follows `main` with **Wait for CI** enabled.
Production releases wait for the repository's GitHub Actions checks.
Do not treat source configuration alone as proof of webhook delivery.
If a push produces no deployment, inspect branch settings, watch paths and
Railway GitHub App repository access. A commit with no file changes may be
ignored by path filtering.

## Rollback and fallback

A source connection can apply to production and rehearsal environments.
Verify each environment's indexing settings after changing that connection.

Retain the previous healthy deployment and recorded DNS targets during rollout.
The Vercel copy is retained for stabilization and rollback.
Do not delete either provider's resources as part of a routine release.

If GitHub integration is unavailable, an authenticated Railway CLI upload can
release the verified source. Record its exact Git tree and deployment receipt;
CLI uploads may not expose a Git commit SHA in provider deployment metadata.
