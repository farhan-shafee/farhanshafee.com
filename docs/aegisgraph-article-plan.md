# AegisGraph technical article plan

This is an internal editorial plan, not an article or a publication announcement.
No MDX article, public route, feed item, or publication date was created.

- Working title: **Building an Evidence-Grounded AI Security Investigation System**
- Proposed slug: `building-an-evidence-grounded-ai-security-investigation-system`
- Intended source file, when a substantive draft is ready: `content/writing/building-an-evidence-grounded-ai-security-investigation-system.mdx`
- Initial publication state must be `draft: true` and `featured: false`.
- The article should explain the engineering boundary between model suggestions,
  validated evidence, and analyst authority. It should complement the case study
  rather than repeat its feature list.

## Existing publication architecture

`src/lib/writing.ts` already requires filename/slug agreement and valid frontmatter.
Publication requires explicit `draft: false` and a non-future date. The shared
published-article reader controls article lookup and the writing index; sitemap,
RSS, and `llms.txt` also use that reader. No architecture change or placeholder
article is needed to reserve this topic.

## Evidence-led outline

Source paths in the table are relative to the AegisGraph repository. They are
editorial references, not public links. Recheck the source revision and validation
record before drafting or publishing.

| Proposed section                             | Argument and source material                                                                                                                                                                                                                                                                                            |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Start with the investigation                 | Introduce the simulated Atlas account sequence without asserting malware, exfiltration, actor identity, or confirmed compromise. Sources: `README.md` (Primary scenario), `docs/PORTFOLIO_SUMMARY.md`.                                                                                                                  |
| Establish evidence before asking a model     | Trace four adapters, canonical events, explicit detections, deterministic correlation, and incident evidence. Explain principal/time/rule-diversity grouping separately from entity relationships. Sources: `README.md` (Detection and correlation; Data model), `docs/adr/ADR-007.md`.                                 |
| Choose the smallest sufficient storage model | Explain transactional PostgreSQL storage, SQLite demo support, and relational entity relationships. Avoid unmeasured scaling claims. Sources: `docs/adr/ADR-001.md`, `docs/INTERVIEW_NOTES.md` (Why not a graph database?).                                                                                             |
| Keep the provider replaceable and bounded    | Distinguish the credential-free deterministic provider from the OpenAI provider. Describe projection, incident scope, context limits, and the absence of retrieval or mutation tools. Sources: `docs/adr/ADR-003.md`, `docs/evaluations/README.md`, `README.md` (Evidence and AI boundaries).                           |
| Validate claims outside the model            | Explain schema checks, citation existence, case membership, exact context membership, typed support predicates, whole-answer rejection, and server-rendered accepted statements. A real citation alone cannot establish an arbitrary claim. Sources: `docs/adr/ADR-004.md`, `docs/evaluations/README.md`.               |
| Treat insufficient evidence as a result      | Use the tested malware-family question to show missing-evidence behavior. Preserve the limits of phrase recognition and the narrow supported claim vocabulary. Sources: `docs/evaluations/LIVE_VALIDATION.md`, `docs/INTERVIEW_NOTES.md`.                                                                               |
| Separate evaluation modes and failures       | Distinguish deterministic boundary fixtures, live scenarios, and browser confirmations. Keep earlier HTTP 429 failures in the account; report sample scope and execution date rather than accuracy or robustness percentages. Sources: `docs/VALIDATION.md`, `docs/evaluations/LIVE_VALIDATION.md`.                     |
| Keep decisions with the analyst              | Explain separate findings, annotations, explicit report approval, stale-report invalidation, and the limits of ordinary event/audit mutation guards. Sources: `README.md` (Report review; Data model), `docs/INTERVIEW_NOTES.md`.                                                                                       |
| State the production gap                     | Cover real authentication, case entitlements, tenant isolation, ingestion and operational controls, stronger independent evidence/audit retention, and repeated live-model evaluation. Sources: `docs/PORTFOLIO_SUMMARY.md` (Implemented versus future work), `docs/INTERVIEW_NOTES.md` (What changes for production?). |

## Publication review

- Use only reviewed synthetic-data images. Identify the provider shown in each
  screenshot; deterministic output is not evidence of live-model success.
- Explain the telemetry-injection fixture precisely: free text was excluded before
  the model call. Its outcome supports the tested projection/output boundaries,
  not universal prompt-injection resistance.
- Keep case scoping distinct from authenticated user or tenant authorization.
- Describe test counts as coverage at a recorded revision and date, not security
  certification, production readiness, or a guarantee of future behavior.
- Verify any public repository link and hosted CI claim against the corresponding
  revision before including it. Do not expose workstation paths or configuration.
- Keep the draft excluded from public routes, feeds, sitemap, and `llms.txt` until
  the user explicitly authorizes publication after substantive editorial review.
