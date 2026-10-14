import { JsonLd } from "@/components/json-ld";
import { PageIntro, TextLink } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { absoluteUrl, pageMetadata, personSchema } from "@/lib/seo";

export const metadata = pageMetadata(
  "About",
  "Farhan Shafee's work connects fintech software engineering, evidence-driven security systems, human-reviewed AI, and trading-workflow test engineering.",
  "/about",
);

export default function AboutPage() {
  return (
    <div className="page-shell editorial-page editorial-about">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": absoluteUrl("/about#profile"),
          url: absoluteUrl("/about"),
          mainEntity: personSchema(),
        }}
      />
      <PageIntro
        eyebrow="About / Farhan Shafee"
        title="Financial systems. Security tooling."
        description="My background is in financial software. My projects bring security signals, evidence, and human review into working systems."
      />
      <div className="editorial-narrative">
        <section
          className="editorial-narrative-section"
          aria-labelledby="engineering-background"
        >
          <p className="editorial-label">01 / Background</p>
          <div>
            <h2 id="engineering-background">Financial systems & automation</h2>
            <p>
              My professional background is in fintech software engineering,
              test automation, and backend financial systems. That work spans
              APIs, FIX-related systems, CI/CD, and software delivery. My
              technical experience includes Python, Java, and SQL.
            </p>
          </div>
        </section>
        <section
          className="editorial-narrative-section"
          aria-labelledby="engineering-quality"
        >
          <p className="editorial-label">02 / Engineering quality</p>
          <div>
            <h2 id="engineering-quality">
              Trading workflows &amp; test evidence
            </h2>
            <p>
              TradeFlow makes my approach to quality engineering inspectable:
              each test owns its authenticated session and order records,
              independent contracts validate responses, and cross-layer checks
              follow the exact record through a workflow. Its trading
              workstation and data are synthetic. The source, test strategy, and
              failure evidence show the engineering decisions without claiming
              employer infrastructure or live trading.
            </p>
            <TextLink href="/work/tradeflow">Inside TradeFlow</TextLink>
          </div>
        </section>
        <section
          className="editorial-narrative-section"
          aria-labelledby="technical-direction"
        >
          <p className="editorial-label">03 / How I build</p>
          <div>
            <h2 id="technical-direction">Evidence before automation</h2>
            <p>
              I keep observations, automated suggestions, and human decisions
              separate. In AegisGraph, deterministic detection and correlation
              establish case evidence. Replay exposes why an incident forms or
              which correlation conditions remain unmet. Rule comparisons show a
              proposed change across eight synthetic scenarios. Server-side
              checks validate AI claims and citations. Its hosted demo is
              read-only and uses a deterministic provider; live OpenAI analysis
              was validated in the local workflow. The fintech data is
              synthetic. The case study and article explain these boundaries,
              their tests, and the remaining production work.
            </p>
            <p>
              I make failure explicit: a single invalid claim rejects the whole
              AI answer. An accepted answer still cannot change case state; that
              remains an analyst decision in the local workflow.
            </p>
            <p>
              CreditOps AI explores the same need for review in trading-incident
              investigation. Its public showcase plays recorded model-assisted
              assessments using synthetic evidence, with no fresh model or MCP
              diagnostic calls during playback. Original proposals and recorded
              advisories remain inspectable; initiating causes remain
              unconfirmed. Its source is private.
            </p>
            <p>
              The supporting security work applies the same discipline at other
              points in the lifecycle: validate scanner evidence before a CI
              decision, test detection changes against known cases, and require
              a matching rescan or reassessment before closing a finding. Those
              projects make their synthetic inputs and operational limits
              explicit.
            </p>
            <div className="editorial-context-links">
              <TextLink href="/work/aegisgraph">Inside AegisGraph</TextLink>
              <TextLink href="/work/creditops-ai">Inside CreditOps AI</TextLink>
              <TextLink href="/work#security-engineering">
                Supporting security engineering
              </TextLink>
              <TextLink href="/writing/building-an-evidence-grounded-ai-security-investigation-system">
                Read the engineering decisions
              </TextLink>
              <TextLink href="/now">Current focus</TextLink>
            </div>
          </div>
        </section>
      </div>
      <div className="editorial-profile-links">
        <span className="editorial-label">Elsewhere</span>
        {siteConfig.linkedin && (
          <TextLink href={siteConfig.linkedin} external>
            LinkedIn
          </TextLink>
        )}
        <TextLink href={siteConfig.github} external>
          GitHub
        </TextLink>
      </div>
    </div>
  );
}
