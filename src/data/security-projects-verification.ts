import type { Project } from "./projects";

export const verificationSecurityProjects: Project[] = [
  {
    title: "Vulnerability Management",
    slug: "vulnerability-management",
    status: "Completed",
    category: "Security engineering / Vulnerability management",
    kind: "personal",
    description:
      "A Python workflow for scanner normalization, explainable remediation priority, and closure verified against matching rescans, with reproducible synthetic and local Trivy evidence.",
    inspection: {
      summary:
        "A completed local lab with an offline workflow demo and a captured Trivy dependency scan. The business processes are simulated.",
      links: [
        {
          label: "View source",
          href: "https://github.com/farhan-shafee/vulnerability-management-project",
          featured: true,
        },
        {
          label: "Methodology",
          href: "https://github.com/farhan-shafee/vulnerability-management-project/blob/main/docs/methodology.md",
        },
        {
          label: "Real scan evidence",
          href: "https://github.com/farhan-shafee/vulnerability-management-project/blob/main/lab/evidence/manifest.json",
        },
        {
          label: "Local demo guide",
          href: "https://github.com/farhan-shafee/vulnerability-management-project/blob/main/docs/interview-demo.md",
        },
        {
          label: "Validation record",
          href: "https://github.com/farhan-shafee/vulnerability-management-project/blob/main/docs/validation.md",
        },
        {
          label: "CI workflow",
          href: "https://github.com/farhan-shafee/vulnerability-management-project/actions/workflows/ci.yml",
        },
        {
          label: "September 7 CI result",
          href: "https://github.com/farhan-shafee/vulnerability-management-project/actions/runs/34147859541",
        },
      ],
      facts: [
        {
          label: "Inputs",
          value: "CSV, Trivy JSON v2, and Nessus v2 XML exports.",
        },
        {
          label: "Workflow",
          value:
            "Risk and SLA, reviewed dispositions, remediation, and rescan verification.",
        },
        {
          label: "Scope",
          value:
            "Local files and an inert dependency manifest; no production integrations.",
        },
      ],
    },
    caseStudy: {
      overview: {
        paragraphs: [
          "I built this lab to make vulnerability decisions inspectable: where a finding came from, why it deserves attention, what remediation was recorded, and which later evidence supports closure.",
        ],
      },
      problem: {
        paragraphs: [
          "Severity alone misses asset context. A lower risk score does not establish remediation, and a finding missing from an incomplete export does not prove it was fixed.",
        ],
      },
      system: {
        title: "From observation to closure",
        steps: [
          "Normalize scanner exports",
          "Enrich asset context",
          "Calculate priority and SLA",
          "Record reviewed work",
          "Compare a matching rescan",
          "Report closure or continued work",
        ],
        paragraphs: [
          "Stable identities and provenance survive normalization. A transparent custom score combines technical severity, asset importance, exposure, threat context, age, and evidenced controls. Calendar-day SLAs retain the original first-seen date; accepting risk does not pause the clock.",
        ],
      },
      engineeringDecisions: {
        paragraphs: [
          "Scanner observations and workflow decisions stay separate. Closure requires recorded remediation and a strictly later complete scan with matching scanner, scope, and asset coverage. Reappearing findings reopen. Time-bound exceptions and validated false positives remain visible with review dates.",
        ],
      },
      validation: {
        paragraphs: [
          "The six-finding synthetic demo ends with two verified closures, one accepted risk, one validated false positive, and two actionable open findings. A separate real Trivy capture on September 7, 2026 found five vulnerabilities before a Requests manifest update and zero afterward; matching package coverage, timestamps, and hashes support five closures.",
          "September 7, 2026 CI passed 212 tests in each Windows/Ubuntu and Python 3.11/3.14 matrix job, plus lint, configuration checks, and byte-for-byte comparisons of 13 synthetic-demo and 11 captured-scan artifacts.",
        ],
      },
      lessonsConstraints: {
        paragraphs: [
          "The real scan analyzes a direct-dependency manifest; it does not install packages, prove exploitability, or assess a running system. Nessus support is export parsing. Ownership and approvals are simulated, scoring is custom, and local JSON has no authenticated roles, concurrent transactions, or signed evidence.",
        ],
      },
    },
    technologies: ["Python", "Trivy", "pytest", "GitHub Actions"],
    github: "https://github.com/farhan-shafee/vulnerability-management-project",
    featured: false,
    visibility: "public",
  },
  {
    title: "Cloud Security",
    slug: "cloud-security",
    status: "Completed",
    category: "Security engineering / Cloud security",
    kind: "personal",
    description:
      "A deterministic Python lab for AWS-style posture assessment, audit-event detection, and remediation verification, tested against versioned synthetic fixtures and reproducible reports.",
    inspection: {
      summary:
        "A completed, credential-free local lab. Synthetic snapshots and events drive assessment, triage, and closure verification; no AWS services are connected.",
      links: [
        {
          label: "View source",
          href: "https://github.com/farhan-shafee/cloud-security-lab",
          featured: true,
        },
        {
          label: "Control catalog",
          href: "https://github.com/farhan-shafee/cloud-security-lab/blob/main/docs/controls.md",
        },
        {
          label: "Generated evidence",
          href: "https://github.com/farhan-shafee/cloud-security-lab/tree/main/reports/generated",
        },
        {
          label: "Local demo guide",
          href: "https://github.com/farhan-shafee/cloud-security-lab/blob/main/docs/DEMO.md",
        },
        {
          label: "Validation record",
          href: "https://github.com/farhan-shafee/cloud-security-lab/blob/main/docs/VALIDATION.md",
        },
        {
          label: "CI workflow",
          href: "https://github.com/farhan-shafee/cloud-security-lab/actions/workflows/ci.yml",
        },
        {
          label: "September 23 CI result",
          href: "https://github.com/farhan-shafee/cloud-security-lab/actions/runs/35914497691",
        },
      ],
      facts: [
        {
          label: "System",
          value:
            "Typed Python with versioned JSON fixtures and no third-party runtime packages.",
        },
        {
          label: "Coverage",
          value:
            "14 posture controls, six event detections, and one bounded correlation.",
        },
        {
          label: "Evidence",
          value:
            "Later resource/control reassessment and reproducible JSON/Markdown reports.",
        },
      ],
    },
    caseStudy: {
      overview: {
        paragraphs: [
          "I built an offline cloud-security workflow that turns explicit configuration and event observations into findings, analyst triage, and verifiable remediation outcomes. Every input is labeled synthetic and runs without an AWS account.",
        ],
      },
      problem: {
        paragraphs: [
          "A configuration flag, a suspicious event, and a verified fix require different evidence. The lab makes those boundaries executable and tests when an input should fail, a signal should request review, or a finding should remain open.",
        ],
      },
      system: {
        title: "Assessment and event review",
        steps: [
          "Validate typed fixtures",
          "Assess posture or detect events",
          "Attach evidence and triage",
          "Reassess later configuration",
          "Export reproducible reports",
        ],
        paragraphs: [
          "Fourteen posture controls cover selected IAM grants and trust, bucket guardrails, administrative ingress, and logging. Six event detections feed review. One correlation escalates an ordered policy change followed by logging disablement within 15 minutes, only for the same account and exact principal/session.",
        ],
      },
      engineeringDecisions: {
        paragraphs: [
          "Versioned input contracts reject malformed or unsupported data. Expected fixture outcomes are separate from evaluator code. Closure re-evaluates a later compatible snapshot and requires PASS for the same resource/control; status edits, removed resources, changed scope, or reclassified sensitivity cannot manufacture closure. Newly introduced findings remain visible.",
        ],
      },
      validation: {
        paragraphs: [
          "The corpus contains 41 source scenarios: four valid snapshots, four invalid snapshots, and 33 event fixtures. The synthetic demo produces 17 findings and verifies all 17 closed after reassessment, alongside six alerts and one correlation. Ten JSON/Markdown artifacts reproduce byte-for-byte.",
          "September 23, 2026 CI passed all six jobs, including 190 tests on each Windows/Ubuntu and Python 3.11/3.14 combination. The remaining jobs passed lint, typing, static security checks, dependency and secret scans, and package builds. Those dated checks do not certify security.",
        ],
      },
      lessonsConstraints: {
        paragraphs: [
          "This is bounded static IAM review and synthetic configuration verification, not a complete IAM authorization engine or an AWS compliance assessment. It cannot establish effective permissions, actual public exposure, network reachability, log delivery, or deployed remediation. Alerts request investigation; correlation does not prove malicious intent. There are no live cloud integrations or production detection-quality claims.",
        ],
      },
    },
    technologies: ["Python", "pytest", "mypy", "GitHub Actions"],
    github: "https://github.com/farhan-shafee/cloud-security-lab",
    featured: false,
    visibility: "public",
  },
];
