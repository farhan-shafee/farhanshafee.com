# Current project deployments and public documentation

Reviewed October 25, 2026 against GitHub repository metadata, Railway production configuration and the completed cutover/recovery records. This is a dated source review, not an uptime guarantee.

| Project                                               | Current hosting                                                          | Source/release                                                                                                                           | Recovery / closeout                                                                                                                                        |
| ----------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AegisGraph](https://aegisgraph.farhan-shafee.com)    | Railway Next.js, FastAPI and PostgreSQL; Cloudflare DNS                  | [Public source](https://github.com/farhan-shafee/aegisgraph); reviewed main release 8c24a12                                              | Required TLS, SELECT-only API database role, off-volume pgBackRest/WAL backups; actual production full restored in isolation; Vercel retained              |
| [CreditOps AI](https://creditops.farhan-shafee.com)   | Railway Next.js, FastAPI, PostgreSQL and backup storage                  | [Public source](https://github.com/farhan-shafee/creditops-ai); web/API follow main; observed Railway CI wait gate off                   | TLS and restricted application role; actual production full restored; frozen Neon/Vercel/rehearsals retained                                               |
| [TradeFlow](https://tradeflow.farhan-shafee.com)      | Railway Node app and separate cloudflared tunnel behind Cloudflare HTTPS | [Public source](https://github.com/farhan-shafee/institutional-trading-sdet-lab); app pinned to7b125f6                                   | No database/volume; synthetic sessions/orders reset on app restart                                                                                         |
| [CreditFlow QE](https://creditflow.farhan-shafee.com) | Railway Next.js BFF, Spring Boot API and PostgreSQL; Cloudflare DNS      | [Public source](https://github.com/farhan-shafee/creditflow-qe); API pinned20c91f5, web pinned7a16b50                                    | Private verify-full TLS/CA, restricted runtime, off-volume backups/WAL and isolated recovery; first scheduled daily-backup closeout and retirement pending |
| [Personal portfolio](https://farhan-shafee.com)       | Railway Next.js; Cloudflare DNS; apex/www HTTPS                          | [Public source](https://github.com/farhan-shafee/farhanshafee.com); main → successful CI → automatic Railway production release verified | No database; Vercel and rehearsal retained                                                                                                                 |

## Current runbooks

- [AegisGraph deployment, database authority and recovery](https://github.com/farhan-shafee/aegisgraph/blob/main/docs/DEPLOYMENT.md)
- [CreditOps deployment, source trigger and recovery](https://github.com/farhan-shafee/creditops-ai/blob/main/docs/DEPLOYMENT.md)
- [TradeFlow tunnel topology and ephemeral state](https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/RAILWAY_PRODUCTION.md)
- [CreditFlow deployment pins, verified TLS and pending closeout](https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/railway-production.md)
- [Portfolio production and indexing](railway-production.md)

## Evidence boundaries

- Current hosting does not make these synthetic projects production financial/security services.
- CreditOps publicly replays selected recorded model-assisted investigations; no fresh model/MCP calls occur during playback and initiating causes remain unconfirmed.
- AegisGraph public exploration remains read-only/deterministic; saved analyst workflows and live AI belong to separate local/interview mode.
- Historical tests, screenshots, model receipts and provider cost observations retain their original dates/revisions; they are not relabeled as new executions.
- A configured schedule, fresh initial backup or one recovery drill does not prove every future differential/full cycle, all archive objects, uptime, alert delivery or RPO/RTO.
- Pinned application services are not silently unpinned by documentation changes.
- Retained resources are not automatically synchronized database standbys. After Railway writes, a database rollback requires preserving/reconciling new state.
- Retiring rollback/rehearsal resources remains a separate destructive decision.

The site's curated four flagship/four supporting-project hierarchy is unchanged. Unpublished articles and unrelated businesses/labs are not newly promoted by this synchronization.
