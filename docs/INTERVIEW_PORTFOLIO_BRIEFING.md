# Portfolio interview and reviewer briefing

> Updated October 25, 2026: the portfolio and all four flagship demos run on Railway. CreditOps source is public. See [the current deployment/source matrix](PROJECT_DEPLOYMENTS.md) for actual release pins, TLS/backup boundaries and remaining closeout; earlier test counts retain their dated source scope.

Reviewed: October 20, 2026 (America/New_York). This is a rehearsal and external-review aid, not evidence that an actual interviewer has reviewed or endorsed the portfolio.

## Sixty-second professional introduction

My professional background is in fintech software and test automation, including APIs and financial-system workflows. I apply that engineering background to security investigation and reliable automation. AegisGraph is my principal security-engineering proof; CreditOps AI is a recorded synthetic trading-incident investigation showcase with public source; TradeFlow demonstrates reproducible trading-workflow SDET practices; and CreditFlow QE demonstrates transactional Java/PostgreSQL correctness with independent API/UI tests. Across them I emphasize observed evidence, explicit failure states, human review, and bounded claims rather than unexplained automation.

Do not claim these portfolio systems are employer deployments. State clearly what AI-assisted implementation contributed and what code, decisions, and failures you can personally reproduce and defend.

## A fast inspection path for a hiring manager

| Project       | Public first click                               | Technical evidence                                                                                       | Limitation to state                                                      |
| ------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| AegisGraph    | https://aegisgraph.farhan-shafee.com             | https://github.com/farhan-shafee/aegisgraph/blob/main/docs/DEMO.md                                       | Synthetic; public mode read-only/deterministic, not a production SOC     |
| CreditOps AI  | https://creditops.farhan-shafee.com/investigator | https://farhan-shafee.com/work/creditops-ai                                                              | Public source; recorded showcase playback; initiating causes unconfirmed |
| TradeFlow     | https://tradeflow.farhan-shafee.com              | https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/INTERVIEW_DEMO.md         | Synthetic order book; no matching, real trades, exchange, or persistence |
| CreditFlow QE | https://creditflow.farhan-shafee.com             | https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/interview-guide/five-minute-walkthrough.md | Synthetic ledger, no funds/settlement; idle demo may take time to wake   |

When a demo is unavailable, use the exact linked guide, source, and dated CI evidence. Say which execution was witnessed live and which is a historical artifact. Never silently substitute an older result for current execution.

## AegisGraph: seven-minute story

1. **0:00–1:30 | What becomes a case.** Open Atlas replay. Explain arrived observations, deterministic rules, the anchored thirty-minute window, and the positive correlation receipt.
2. **1:30–2:30 | What does not.** Open approved-administration replay. Point to unmet distinct-rule and family thresholds. Explain that the approval observation is independent counterevidence, not a correlation veto.
3. **2:30–4:30 | Evidence and reasoning.** Follow an observation to its source ID, then open hypotheses and show supported, incomplete, and missing evidence. Show deterministic AI answers with exact bounded citations and the insufficient-evidence response.
4. **4:30–6:00 | Regression.** Open APP-002 fixed comparison at the blocked 2,200-record threshold. Explain how reducing a benign signal can also lose a required correlated incident.
5. **6:00–7:00 | Production boundary.** Explain relational persistence, immutable source observation vs human review, replaceable unsigned export hashes, and what real identity/tenant/ingestion controls would require.

Challenge to prepare: Why does citing a real evidence row not prove any arbitrary claim? Why was relational storage sufficient? What happens at multiple instances?

## CreditOps AI: two-minute public-recorded showcase

1. **0:00–0:30 | Scope.** State that the public investigator plays recorded model-assisted scenarios using fictional RFQ/order data; the source is public and playback makes no fresh MCP or model calls.
2. **0:30–1:20 | Follow evidence.** Choose a pricing/Kafka, FIX, or database-pool scenario and trace symptoms, affected synthetic orders/RFQs, evidence links, and the distinction between original and validated assessment.
3. **1:20–2:00 | Why review matters.** State what the recorded evidence supports, what remains unconfirmed about initiating causes, and why operational actions and stakeholder handoffs require human review.

Challenge to prepare: How do you distinguish an observed failure condition from a confirmed initiating cause? What would fresh, authorized diagnostics need to establish? Never claim observed model-directed follow-up from these recordings.

## TradeFlow: five-minute engineering demonstration

1. **0:00–0:45 | Workstation.** Show synthetic login, orders, a specific order identity, and deliberately limited UI state. In-memory order books reset; positions are static.
2. **0:45–2:00 | Test ownership.** Open the per-test fixture and server session model. Explain how test-scoped data and in-memory storage state isolate order records and session credentials.
3. **2:00–3:15 | Real contract failure.** Explain why a malformed HTTP 200 body fails runtime Zod and independent OpenAPI/AJV checks. Show one precise 409 cancellation invariant.
4. **3:15–4:15 | Failure triage.** Use prepared traces/reports to identify which assertion actually failed. Distinguish service, environment, test, data, and timing faults.
5. **4:15–5:00 | Evidence.** Describe three-browser CI and separate source revisions for the October 13 baseline (34 unit, 205 Playwright) and October 15 deployment-readiness additions (54 unit, 211 Playwright). The October 25 patch 265c9e0 passed hosted CI 40214510996 with 54 units and 211 Playwright executions; 422 local repeated executions and 20 public release checks are separate evidence. No live exchange, brokerage, or trading-capacity claim.

Current maintenance: the [October 25 TradeFlow dependency record](https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/SECURITY_MAINTENANCE_2026-10-25.md) explains the three compatible package patches, full/production audit gates and their dated evidence. Distinguish a clean advisory scan from proof of generalized security.

Challenge to prepare: Why must the test own the exact record? What happens to state on restart? How do projects differ from workers? What would make the real trading integration materially different?

## CreditFlow QE: five-minute engineering demonstration

1. **0:00–0:50 | Transaction.** Inspect synthetic opening balance, purchase, payment, and receipts; do not imply real money flow.
2. **0:50–1:40 | Exact money.** Explain BigDecimal, strict decimal input, purchase and payment limits, and why rounding is rejected.
3. **1:40–2:45 | Ledger correctness.** Trace PostgreSQL row locking, account ownership, unique account/idempotency key, replay of the original receipt, and rollback after a real isolated database insert failure.
4. **2:45–4:00 | Independent test oracles.** Show Cucumber/REST Assured modules using HTTP rather than application source imports, then the separate TestNG and UI journey boundaries.
5. **4:00–5:00 | Evidence and honesty.** Use the current main CI, dated local Jenkins run, and source-pinned hosted checks as distinct evidence. Explain the process-local quotas, idle wake, and lack of production banking/SLA guarantees.

Challenge to prepare: Why SELECT FOR UPDATE? What if the same idempotency key is replayed after another transaction? What would happen if the ledger insert fails after a balance update? Where can browser and API oracles disagree?

## External review exercise (still requires real people)

Send a reviewer only https://farhan-shafee.com and https://github.com/farhan-shafee, without explaining the projects first. Ask them to spend 60 seconds on the site and then answer:

1. Which two or three engineering job families does this portfolio actually support?
2. What are the three strongest independently inspectable proofs and where are their links?
3. Can you distinguish real employment background from synthetic projects?
4. Which claim is confusing, overstated, or difficult to verify?
5. Which project would you choose to ask a deep technical question about, and what question?

Record dated, verbatim feedback from actual reviewers before claiming independent hiring-manager validation. Do not invent positive reviews, endorsements, or recruiter results.

## Completion boundary

A successful automated source/site review and a polished technical briefing can improve hiring-readiness, but they cannot certify interview performance or a numerical 10/10 rating. Practice without the guide, reproduce one source-level test, and improve only when a real reviewer identifies a specific, material problem.
