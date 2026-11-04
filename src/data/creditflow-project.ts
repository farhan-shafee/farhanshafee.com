import type { Project } from "./projects";

export const creditflowProject: Project = {
  title: "CreditFlow QE",
  slug: "creditflow-qe",
  status: "Active",
  year: "2026",
  category: "Financial systems / Quality engineering",
  kind: "personal",
  description:
    "A Java/PostgreSQL credit-card simulator with independent Cucumber and REST Assured automation, inspectable transaction receipts and four real correctness demos.",
  technologies: [
    "Java 21",
    "Spring Boot",
    "Cucumber",
    "REST Assured",
    "PostgreSQL",
    "Maven",
    "Playwright",
    "GitHub Actions",
    "Next.js",
  ],
  github: "https://github.com/farhan-shafee/creditflow-qe",
  website: "https://creditflow.farhan-shafee.com",
  sourceVisibility: "public",
  featured: true,
  visibility: "public",
  inspection: {
    summary:
      "Post a synthetic purchase or payment, inspect its receipt, and run four isolated correctness demonstrations backed by real HTTP responses and the saved ledger.",
    links: [
      {
        label: "Live demo",
        href: "https://creditflow.farhan-shafee.com",
        featured: true,
      },
      {
        label: "View source",
        href: "https://github.com/farhan-shafee/creditflow-qe",
        featured: true,
      },
      {
        label: "Five-minute walkthrough",
        href: "https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/interview-guide/five-minute-walkthrough.md",
      },
      {
        label: "CI history",
        href: "https://github.com/farhan-shafee/creditflow-qe/actions/workflows/verify.yml",
      },
      {
        label: "Workspace CI (November 4)",
        href: "https://github.com/farhan-shafee/creditflow-qe/actions/runs/41886196621",
      },
      {
        label: "Workspace acceptance (November 4)",
        href: "https://github.com/farhan-shafee/creditflow-qe/blob/4fac13ac84565296281fed72ae6e1b1dd9b3be55/docs/evidence/financial-workspace-20261104.md",
      },
      {
        label: "Evidence release CI (November 4)",
        href: "https://github.com/farhan-shafee/creditflow-qe/actions/runs/41899735083",
      },
      {
        label: "Current release index",
        href: "https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/current-state.md",
      },
      {
        label: "Validation history",
        href: "https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/evidence/STATUS.md",
      },
      {
        label: "Deployment and recovery",
        href: "https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/railway-production.md",
      },
      {
        label: "Local Jenkins execution",
        href: "https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/evidence/jenkins-execution.md",
      },
    ],
    facts: [
      {
        label: "Backend",
        value:
          "Java 21, Spring Boot, PostgreSQL and Flyway; exact money, atomic ledger updates and original receipt replay.",
      },
      {
        label: "API automation",
        value:
          "Independent Cucumber/REST Assured HTTP tests, JUnit Jupiter and a separate TestNG module.",
      },
      {
        label: "UI and CI",
        value:
          "Java Selenium/Playwright, Bruno and GitHub Actions; Jenkins pipeline executed on an isolated local controller.",
      },
    ],
  },
  technicalHighlights: [
    "Independent Java/Cucumber automation validates a synthetic transactional credit-card API.",
    "Real PostgreSQL rollback, ownership, idempotency and concurrency checks.",
    "Custom-host HTTPS, isolated synthetic sessions and genuine test evidence.",
  ],
  caseStudy: {
    overview: {
      paragraphs: [
        "A synthetic banking application and independent automation framework built with AI-assisted development and human-reviewed validation for reproducible engineering and interview practice.",
      ],
    },
    problem: {
      paragraphs: [
        "A successful HTTP response does not prove a correct financial ledger. Duplicate requests, concurrent updates, and database failures can change balances twice or leave a receipt inconsistent with account state. This project tests those failures instead of relying only on happy-path purchases and payments.",
      ],
    },
    system: {
      title: "From transaction to verification",
      steps: [
        "Create a short-lived synthetic account",
        "Validate ownership, exact USD input, and available balance",
        "Lock account state and atomically post a ledger entry",
        "Return the original receipt or an explicit error",
        "Recheck API behavior, PostgreSQL state, and browser workflow",
      ],
      paragraphs: [
        "The sandbox models purchases and payments against a fixed synthetic credit limit. Account-scoped idempotency checks the operation and normalized amount. An identical retry returns its original receipt, even when later activity has changed the current balance; conflicting key reuse returns HTTP 409.",
      ],
    },
    architecture: {
      paragraphs: [
        "Railway hosts the Next.js command center, Java 21 / Spring Boot API and PostgreSQL ledger. The API uses private verify-full TLS, a dedicated CA and a restricted runtime role; Flyway migrations run separately with administrative authority. Reviewed web/API releases remain pinned. A Next.js command center mediates selected synthetic visitor workflows. Cucumber/REST Assured and TestNG modules exercise the running HTTP API independently of application source; Java Selenium and Playwright cover selected UI journeys.",
      ],
    },
    whatIBuilt: {
      paragraphs: [
        "Recorded tests exercise per-account row locking, original-receipt replay after intervening activity, and rollback when a deliberately injected database insert failure occurs in an isolated integration database. Browser tests cover ambiguous response handling and safe retry/reconciliation. These checks prove specified scenarios, not every possible concurrency interleaving.",
      ],
    },
    engineeringDecisions: {
      bullets: [
        "Use actual PostgreSQL rather than an in-memory substitute so integration checks exercise locks, uniqueness constraints, and transaction rollback.",
        "Use one transactional API instead of unneeded microservices; make the external HTTP test clients independent of application implementation classes.",
        "Keep dated, source-bound reports and hashes so historical CI and Jenkins evidence cannot be mistaken for validation of later changes.",
      ],
    },
    validation: {
      paragraphs: [
        "November 4 GitHub Actions run 41886196621 passed at main revision b286242: 31 Java unit tests, 18 PostgreSQL integration tests, and 31 Cucumber scenarios, 154 steps and 6 TestNG cases in each private/public mode. Separate scopes passed 37 Java UI/BFF cases, 57 frontend tests and 7 Bruno requests / 11 checks. All 192 report and 22 command-log hashes matched.",
        "Separate November 4 public acceptance of frontend b286242 passed using five synthetic accounts and 44 HTTP requests, including a read-only mobile-navigation follow-up. Purchases, payments, replay/conflict responses and the complete saved ledger reconciled. This is bounded correctness evidence, not a capacity or availability assurance.",
        "The subsequent November 4 evidence refresh is deployed at d7658be. Its full main CI run 41899735083 passed, followed by a separate read-only public check using 10 requests, zero accounts and zero page errors. It preserves the earlier b286242 financial acceptance as a dated snapshot; the application does not poll providers or claim continuous current-health verification.",
        "An October 15 isolated local Jenkins build published 123 passing cases and 32 separate evidence-framework tests from an earlier pinned source. It was not rerun for the November 4 revision; that historical execution does not establish current production banking operation.",
      ],
    },
    lessonsConstraints: {
      paragraphs: [
        "Synthetic data only; no real cards, funds, settlement or regulatory-compliance claim. Sessions expire after 30 minutes and public quotas are conservative. API sleep is disabled; the Railway frontend may wake from idle. Local Jenkins execution is recorded; sustained-load behavior and availability/SLA remain unverified. Off-volume backups and WAL recovery are verified within the documented scope. The first scheduled daily-backup/stabilization gate passed October 26; five rehearsal service instances were retired October 29 with protected volumes/archive storage retained. The reviewed archive-monitor recovery was deployed October 31 with two scheduled executions verified. Retained old-provider resources are not synchronized database standbys; further retirement and future recovery assurances are separate operational questions.",
      ],
    },
  },
  screenshots: [
    {
      src: "/projects/creditflow-qe/payment-20261104.png",
      alt: "CreditFlow QE hosted simulator after a synthetic purchase and payment",
      width: 1440,
      height: 1000,
      caption:
        "Actual November 4 public journey: 100 USD purchase, 50 USD payment, 300 USD outstanding, 700 USD available and two persisted receipts.",
    },
  ],
};
