import type { Project } from "./projects";

export const creditflowProject: Project = {
  title: "CreditFlow QE",
  slug: "creditflow-qe",
  status: "Active",
  year: "2026",
  category: "Financial systems / Quality engineering",
  kind: "personal",
  description:
    "A transactional credit-card simulator with independent Java, Cucumber and REST Assured automation, plus executed CI and browser-test evidence.",
  technologies: [
    "Java 21",
    "Spring Boot",
    "Cucumber",
    "REST Assured",
    "PostgreSQL",
    "Maven",
    "Playwright",
    "GitHub Actions",
  ],
  github: "https://github.com/farhan-shafee/creditflow-qe",
  website: "https://creditflow.farhan-shafee.com",
  sourceVisibility: "public",
  featured: true,
  visibility: "public",
  inspection: {
    summary:
      "Explore synthetic accounts, post purchases and payments, and inspect the source, test framework and verified execution evidence.",
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
        label: "Verified CI",
        href: "https://github.com/farhan-shafee/creditflow-qe/actions/runs/38820309474",
      },
      {
        label: "Validation history",
        href: "https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/evidence/STATUS.md",
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
        "A Java 21 / Spring Boot service implements exact BigDecimal money rules and stores the ledger in PostgreSQL with Flyway migrations. A Next.js command center mediates selected synthetic visitor workflows. Cucumber/REST Assured and TestNG modules exercise the running HTTP API independently of application source; Java Selenium and Playwright cover selected UI journeys.",
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
        "Recorded October 15 source verification passed 31 application unit tests, 18 PostgreSQL integration tests, and 31 Cucumber scenarios in each private/public mode. The hosted release separately passed ten banking checks and eleven Java UI/BFF tests. These are distinct dated executions, not one aggregate current test total.",
        "GitHub Actions run 38820309474 passed core and browser jobs at main revision 631948a. A separate isolated local Jenkins build published 123 passing cases, with 32 separate evidence-framework tests, from an earlier pinned source revision. Neither the Jenkins record nor historical hosted checks establish current production banking operation or availability guarantees.",
      ],
    },
    lessonsConstraints: {
      paragraphs: [
        "Synthetic data only; no real cards, funds, settlement or regulatory-compliance claim. Sessions expire after 30 minutes, public quotas are conservative and idle services can take time to wake. Local Jenkins execution is recorded; sustained-load behavior and availability/SLA remain unverified.",
      ],
    },
  },
  screenshots: [
    {
      src: "/projects/creditflow-qe/payment.png",
      alt: "CreditFlow QE hosted simulator after a synthetic $50 payment",
      width: 1440,
      height: 3318,
      caption:
        "Actual Playwright journey: $200 outstanding, $800 available and one committed payment.",
    },
  ],
};
