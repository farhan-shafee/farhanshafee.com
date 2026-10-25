# Portfolio Security and Railway Pilot Implementation Plan

> **Historical deployment context** - This record retains its original milestone, source revisions, measured results and approval boundaries. Earlier hosting/source-visibility/pending-release statements are dated history. Use [the current production documentation](../../PROJECT_DEPLOYMENTS.md) for the October 24-25 Railway topology, release state and remaining closeout.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clear the dependency findings and verify an independent Railway pilot while preserving Vercel production.
**Architecture:** Existing Next.js Node server and repository MDX/assets, with a rebased local lint-plugin security adapter; temporary Railway preview only.
**Tech Stack:** Node 24, npm lockfile, Next.js 16.4.3, React 19.3.0, existing TypeScript/Playwright tests, Railway Railpack.
**Spec:** docs/superpowers/specs/2026-10-25-portfolio-railway-design.md

## Global Constraints

- No main merge, production deployment, DNS/custom-domain cutover or deletion.
- Preserve existing source content, application behavior, React versions, headers and canonical URLs.
- Required audit result: zero known vulnerabilities in both full and production dependency trees.
- Preserve the custom lint helper and every unrelated compiled plugin file; regenerate upstream identity only against the authenticated official 16.4.3 tarball.
- Pilot: Node 24, production runtime, explicit preview noindex, one replica, 0.5 CPU / 0.5 GB, temporary URL.
- Read installed Next documentation before writing code. Keep credentials outside evidence.

## Review Focus

- Official package integrity and adapter rebase must preserve the real lint rule inventory and behavior.
- Odd literal/glob roots and symlinks must keep working on native Windows and Linux.
- Preview indexing must be blocked by headers, metadata and robots; production-mode canonical behavior must remain intact.
- Articles/case studies, MDX content and assets must survive provider packaging.
- Actual deployment source must match the reviewed candidate; Vercel production and canonical domains must remain unchanged.

### Task 1: Dependency security update

**Files:** package.json, package-lock.json, tooling/next-eslint-plugin/package.json, README.md and upstream.json within that adapter; tests/lint-toolchain.test.ts for exact installed-resolver path normalization.
**Tests:** unchanged tests/lint-toolchain.test.ts and full existing suites; npm audit before/after.
**Interfaces:** consumes approved base b927dbe; produces a clean audited candidate and unchanged product behavior.

- [x] Observe baseline: npm ci succeeds, npm test passes 66/66, both audits fail for the reported findings.
- [ ] Rebase adapter identity to 16.4.3-farhan.1 using verified npm tarball metadata; keep its custom helper and compiled rules untouched.
- [ ] Pin Next/eslint-config-next 16.4.3, refresh the compatible transitive Zod lock entry, and perform a clean npm ci.
- [ ] Run npm test, lint, typecheck, format:check, both audits, build and browser suite. Expected: all pass; audits zero.
- [ ] Inspect exact diff and upstream hashes; no unexplained source, configuration baseline or lint weakening.
- [ ] Publish the tested tree to the isolated task branch and create a draft PR. Never push/merge main.

### Task 2: Independent Railway pilot

**Files:** no application feature code expected; settings and safe operational receipts.
**Interfaces:** consumes verified branch/tree from Task 1; produces a terminal successful pilot at the same source.

- [ ] Verify account/project scope, create a separate private portfolio pilot project/environment and empty service.
- [ ] Set Node 24, preview noindex, production runtime and telemetry-off variables; standard build/start, health path /, one replica and limits.
- [ ] Connect the exact candidate commit or upload its verified source and observe terminal SUCCESS.
- [ ] Verify actual deployment identity and settings, healthy running replica, and generated temporary domain.

### Task 3: Acceptance and final review

**Files:** targeted operational acceptance script/receipts and completion notes; no product redesign.
**Interfaces:** consumes live pilot and candidate; produces a reviewable accepted result and production continuity evidence.

- [ ] Run hosted functional/browser checks and bounded HTTP checks for pages, articles/case studies, assets, feeds, metadata, 404 and security/noindex.
- [ ] Verify www path/query redirects and production indexing in the local production-mode build.
- [ ] Inspect bounded error logs/capacity; read Vercel production identity and canonical-domain state again.
- [ ] Dispatch one fresh whole-branch reviewer against the spec, plan, diff and operational evidence. Resolve important findings with focused regression evidence.
- [ ] Save the completion report, source/PR/pilot links, checks and limits. Production cutover remains separately approvable.
