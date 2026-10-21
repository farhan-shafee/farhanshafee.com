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
