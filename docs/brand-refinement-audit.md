# Personal brand refinement — pre-edit audit

> **Historical deployment context** - This record retains its original milestone, source revisions, measured results and approval boundaries. Earlier hosting/source-visibility/pending-release statements are dated history. Use [the current production documentation](PROJECT_DEPLOYMENTS.md) for the October 24-25 Railway topology, release state and remaining closeout.

Reviewed 2026-09-16, against production `https://farhan-shafee.com` and the local production build at commit `42e394a`. This audit was written before implementation changes.

## Scope and evidence

The browser review covered Home, About, Work, CyberBit, Job Intelligence Engine, Writing, Lab, Uses, Now, and Contact. Desktop production captures and local mobile captures are under `.artifacts/brand-refinement/before/`. The seven comparison pages have 1440px dark and 375px light baselines; Home also has 320, 430, 768, and 1920px light captures. Case-study captures were repeated after scrolling to load the lazy images. Source review covered shared styles, components, page content, project evidence, publication filtering, and metadata.

## Findings, in visitor order

1. **Home — sound content, weak priority.** The small name and similarly weighted technical index understate the introduction. Four identical project cards make exploratory work look as important as the implemented business system. Technology chips dominate mobile listings. The separate bottom CyberBit promotion repeats the project rather than providing evidence. Three lab questions lead to the same destination. The dashed writing box makes absence too prominent. Evidence: `home-dark-1440.jpg`, `home-light-375.jpg`, and responsive Home captures.
2. **Work — wasted space.** Kind-based groups leave the single CyberBit and Job Engine cards in half-width columns. All four projects share the same boxed treatment. Evidence: `work-dark-1440.jpg`, `work-light-375.jpg`.
3. **CyberBit — evidence arrives too late.** The real result and clearly qualified fictional sample are buried after the text and diagram. A long empty metadata rail reduces the available reading width. Sections have limited visual separation. Evidence: `cyberbit-dark-1440.jpg`, `cyberbit-light-375.jpg`.
4. **Job Intelligence Engine — useful supporting depth.** Its deterministic-workflow qualifications and conceptual diagram are credible. It has the same long metadata rail and uniform prose rhythm as CyberBit; improve structure without implying model-backed AI. Evidence: `job-engine-dark-1440.jpg`, `job-engine-light-375.jpg`.
5. **About — repetitive professional narrative.** The opening background claim appears twice, followed by another broad technical-background section. The side label occupies space without adding context. Evidence: `about-dark-1440.jpg`, `about-light-375.jpg`.
6. **Writing — oversized absence.** The large dashed empty-state card feels unfinished. Keep a short publication note and the working RSS link. Preserve the archive architecture and all draft exclusions. Evidence: `writing-dark-1440.jpg`, `writing-light-375.jpg`.
7. **Lab — appropriate structure, repetitive caveats.** The notebook rows work better than project cards. Tighten them, retain one clear unpublished-results qualification, and preserve Exploring statuses. Evidence: `lab-dark-1440.jpg`, `lab-light-375.jpg`.
8. **Uses — no confirmed inventory.** Six empty categories add no technical signal. Render only populated categories, keep one concise note until facts are available, and remove prominent footer placement. Evidence: `uses-dark-1440.jpg`.
9. **Now — useful but over-spaced.** Three brief, factual focus items do not need an expansive hero. Retain the reviewed date and compress the page. Evidence: `now-dark-1440.jpg`.
10. **Contact — unclear priority.** Three equal cards obscure LinkedIn as the professional contact path; GitHub occupies an orphan third card. Use a lead contact row and quieter business/source links. Evidence: `contact-dark-1440.jpg`.

## Direction

Keep the restrained purple accent, fine rules, system fonts, and static rendering. Establish a larger editorial name, stronger heading scale, consistent spacing tokens, and a bounded wide-desktop measure. Give CyberBit a full-width evidence-led feature, Job Engine a smaller text-led presentation, and labs compact rows. Move real evidence earlier in the reusable case study, with semantic sections, compact metadata, and clear conceptual-diagram captions. Remove duplicate promotions and empty framing. The main navigation remains Work / Writing / Lab / About; the compact footer emphasizes these and Contact. Now and Uses remain reachable contextually.

No new projects, employers, metrics, customers, credentials, certifications, technology claims, or model-backed capabilities will be introduced. The future project named in the brief is excluded from all public site content.

## Accessibility and performance boundaries

The captures show intact reflow, readable theme contrast, and visible navigation; they do not establish WCAG compliance. Verify keyboard use, focus, contrast, reduced motion, links, console errors, image loading, aspect ratios, and overflow with the production build and browser suite after refinement. Preserve intrinsic image dimensions and native lazy loading. No animation library, new client component, remote font, or decorative asset is needed. SEO routes, canonical origin, schemas, feeds, draft gates, and verified profile links must remain unchanged.
