# Deployment Documentation Synchronization Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans in this session. Steps use checkbox syntax for tracking.

**Goal:** Synchronize the five migrated projects, the GitHub profile, and the personal portfolio with the verified October 24–25 Railway state.
**Architecture:** Evidence-led documentation and content changes in six isolated repository worktrees. Current runbooks describe current topology; dated evidence retains its original facts with explicit historical labels and links to current runbooks.
**Tech Stack:** Markdown/Mermaid, existing Next.js/TypeScript content and tests, GitHub Actions, Railway.
**Spec:** The user's October 25 request to fully update GitHub README/architecture and personal-site project descriptions for the completed migrations.

## Global constraints

- Cover CreditOps, AegisGraph, TradeFlow, CreditFlow QE, portfolio hosting and GitHub profile.
- Preserve synthetic-data, recorded-versus-live-AI, human-review, account/session and model-quality boundaries.
- No application behavior, dependency, database, credential, DNS, provider setting or unrelated project change.
- Describe actual main-following versus pinned releases accurately; documentation publication does not unpin services.
- Keep CreditFlow's first scheduled daily backup and stabilization/retirement pending.
- Never publish credentials, connection strings, personal data, raw logs or private bucket settings.
- Preserve old receipts and dates; explicitly label superseded hosting guidance.
- Publish authorized documentation/content updates with guarded non-force Git operations after validation.

## Review focus

- Private/public source labels and metadata must agree with GitHub's verified visibility.
- Current topology and diagrams must match actual Railway services; local full stacks stay distinct.
- Current operating instructions must use restricted roles and verified TLS/recovery boundaries.
- Current claims must not reclassify historical tests, live AI, backups or uptime as new guarantees.
- Personal site content, discovery text, metadata and source-policy assertions must agree.

## Tasks

- [ ] 1. Audit all six repository heads, instructions, current docs/content, provider configuration and completion records; record stale claims.
- [ ] 2. Update each app README, architecture/deployment guidance and relevant operator/interview references; mark historical reports/plans and cross-link the current runbook.
- [ ] 3. Update profile README, repository website metadata, portfolio case studies/About/Now/llms.txt/source provenance and the existing public-source policy expectations.
- [ ] 4. Run repository-appropriate documentation checks; execute the TradeFlow instruction-required type/lint/validate/repeated suite; execute the full portfolio content/lint/types/build/browser/audit gates.
- [ ] 5. Review the whole diff independently, resolve findings, publish focused repository changes, verify CI and any triggered deployments, and check live site content/links.
- [ ] 6. Save a concise scope/evidence/limitations report and exact published revisions.

Historical records are audited and labeled; their original proof is not rewritten to imply later deployments or tests.
