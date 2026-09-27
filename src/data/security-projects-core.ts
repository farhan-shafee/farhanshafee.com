import type { Project } from "./projects";

export const applicationSecurityProjects: Project[] = [
  {
    title: "SecurePay / DevSecOps Pipeline",
    slug: "devsecops-pipeline",
    status: "Completed",
    year: "2026",
    category: "Application security / DevSecOps",
    kind: "personal",
    description:
      "A synthetic payments API with tested security gates that distinguish scanner findings from failed or missing evidence.",
    inspection: {
      summary:
        "Inspect the policy, fixture replay, and retained scanner reports. The real scanner outcome is WARN/REVIEW; PASS belongs to the remediated demonstration fixture.",
      links: [
        {
          label: "View source",
          href: "https://github.com/farhan-shafee/devsecops-pipeline",
          featured: true,
        },
        {
          label: "Pipeline contract",
          href: "https://github.com/farhan-shafee/devsecops-pipeline/blob/main/docs/pipeline-overview.md",
        },
        {
          label: "Retained scanner evidence",
          href: "https://github.com/farhan-shafee/devsecops-pipeline/blob/main/reports/real-ci/34161489096/README.md",
        },
        {
          label: "CI",
          href: "https://github.com/farhan-shafee/devsecops-pipeline/actions/workflows/ci.yml",
        },
        {
          label: "Security pipeline CI",
          href: "https://github.com/farhan-shafee/devsecops-pipeline/actions/workflows/security.yml",
        },
        {
          label: "September 7 CI",
          href: "https://github.com/farhan-shafee/devsecops-pipeline/actions/runs/34161990404",
        },
      ],
      facts: [
        { label: "Stack", value: "Python, Flask, Docker, and GitHub Actions." },
        {
          label: "Workflow",
          value: "Raw evidence → validation → policy → remediation and review.",
        },
        {
          label: "Evidence scope",
          value: "Fixture replay and separately retained real scanner runs.",
        },
      ],
    },
    caseStudy: {
      overview: {
        paragraphs: [
          "I built SecurePay to test the security gate itself: whether it detects a regression, recognizes remediation, and blocks when a required scanner fails. A small synthetic Flask payments API gives the delivery workflow a concrete application boundary.",
        ],
      },
      problem: {
        paragraphs: [
          "A scanner returning no findings is useful only when its execution and coverage are valid. Missing artifacts, stale reports, and malformed output need explicit failure handling before a pipeline can make a review decision.",
        ],
      },
      system: {
        title: "From change to review",
        steps: [
          "Application change",
          "Tests and scanners",
          "Raw evidence",
          "Validation and normalization",
          "Policy decision",
          "Remediation",
          "Human review",
        ],
        paragraphs: [
          "The offline CLI replays three committed states: a regression fixture returns BLOCK, its remediated fixture returns PASS, and missing scanner evidence returns BLOCK. It verifies these transitions without running scanners or installing vulnerable dependencies.",
        ],
      },
      architecture: {
        paragraphs: [
          "Independent test, SAST, dependency, secrets, and configuration jobs run in parallel. The application image then supplies vulnerability, CycloneDX inventory, and local passive ZAP evidence. A Python policy layer checks reports and execution manifests before producing JSON, Markdown, and SARIF decisions. Missing, malformed, tampered, or failed required evidence blocks the gate.",
        ],
      },
      engineeringDecisions: {
        bullets: [
          "Separate scanner execution status from finding severity; an unavailable scanner cannot reuse a stale clean report.",
          "Keep scoped, justified, expiring exceptions visible for review. WARN/REVIEW remains an advisory successful check, with human approval and repository merge rules outside the evaluator.",
        ],
      },
      validation: {
        paragraphs: [
          "September 7, 2026 CI at f6864cf passed 141 tests in each of three Ubuntu/Windows jobs. All eight security workflow jobs succeeded with a WARN/REVIEW decision. These are dated executions, not continuously renewed security results.",
          "Separately retained scanner evidence at b8ccf34 records real image remediation that removed two blocking HIGH findings: BLOCK became WARN/REVIEW. The retained reports and SBOM keep remaining vulnerabilities and observed inventory inspectable.",
        ],
      },
      lessonsConstraints: {
        paragraphs: [
          "The API has no real payment processing, database, or authenticated identity. Passive ZAP covers local health-endpoint responses, not authenticated business flows. An SBOM describes observed inventory without proving completeness or exploitability. The completed lab demonstrates reproducible gate behavior; it does not establish production release approval, compliance, or absence of vulnerabilities.",
        ],
      },
    },
    technologies: [
      "Python",
      "Flask",
      "GitHub Actions",
      "Docker",
      "Semgrep",
      "pip-audit",
      "Gitleaks",
      "Trivy",
      "CycloneDX",
      "OWASP ZAP",
      "pytest",
    ],
    github: "https://github.com/farhan-shafee/devsecops-pipeline",
    featured: false,
    visibility: "public",
  },
  {
    title: "Detection Engineering Lab",
    slug: "detection-security-lab",
    status: "Completed",
    year: "2026",
    category: "Detection engineering",
    kind: "personal",
    description:
      "Windows behavior detections with executable Sigma rules, evidence-linked investigations, and a fixture-tested tuning lifecycle.",
    inspection: {
      summary:
        "Inspect reproducible rules, correlation, and analyst reasoning. Telemetry is synthetic, dispositions are simulated, and the optional Wazuh path has no live captures.",
      links: [
        {
          label: "View source",
          href: "https://github.com/farhan-shafee/detection-engineering-lab",
          featured: true,
        },
        {
          label: "Generated investigation report",
          href: "https://github.com/farhan-shafee/detection-engineering-lab/blob/main/reports/demo.md",
        },
        {
          label: "Detection model",
          href: "https://github.com/farhan-shafee/detection-engineering-lab/blob/main/docs/detection-model.md",
        },
        {
          label: "Tuning evidence",
          href: "https://github.com/farhan-shafee/detection-engineering-lab/blob/main/evidence/tuning/README.md",
        },
        {
          label: "CI",
          href: "https://github.com/farhan-shafee/detection-engineering-lab/actions/workflows/ci.yml",
        },
        {
          label: "September 7 CI",
          href: "https://github.com/farhan-shafee/detection-engineering-lab/actions/runs/34150107552",
        },
      ],
      facts: [
        {
          label: "Stack",
          value: "Python, Sigma, Windows event fixtures, and GitHub Actions.",
        },
        {
          label: "Workflow",
          value: "Rule → fixture alert → triage → disposition → tuning.",
        },
        {
          label: "Evidence scope",
          value:
            "Deterministic fixtures and simulated investigations; no live SIEM evidence.",
        },
      ],
    },
    caseStudy: {
      overview: {
        paragraphs: [
          "I built a detection-as-code lab that connects a rule match to its source records, analyst questions, and tuning history. Its five Windows behaviors cover encoded PowerShell, privileged group membership, authentication sequences, scheduled-task content, and Office-parent PowerShell execution.",
        ],
      },
      problem: {
        paragraphs: [
          "A matching rule establishes a signal, not an incident. Detection engineering also needs negative cases, timing boundaries, missing context, and a way to check whether a noise-reduction change suppresses useful observations.",
        ],
      },
      system: {
        title: "From rule to regression",
        steps: [
          "Detection contract",
          "Sigma and fixtures",
          "Matching and correlation",
          "Alert evidence",
          "Analyst disposition",
          "Scoped tuning",
          "Regression validation",
        ],
        paragraphs: [
          "The offline CLI validates contracts, evaluates fixtures, verifies source hashes, and generates an alert queue with JSON and Markdown investigations. Six worked cases separate observations from simulated approval, proposed actions, and unresolved questions. The authentication investigation deliberately retains uncertainty about the cause of repeated failures.",
        ],
      },
      architecture: {
        paragraphs: [
          "Six Sigma rules supply predicates to a deliberately bounded Python evaluator. Python separately correlates at least five failures strictly before success within 300 seconds for the same host, account, domain, and source IP. Tests cover identity isolation, duplicates, success resets, exact window boundaries, and tied timestamps. This is batch evaluation of normalized fixtures.",
        ],
      },
      engineeringDecisions: {
        bullets: [
          "Reject unsupported Sigma conditions and modifiers instead of silently approximating their meaning.",
          "Preserve the original PowerShell rule and compare it with an exception scoped to the exact command, parent, and user. Changed context remains visible in regression cases.",
          "Keep fixture integrity checks separate from analyst interpretation. Matching source hashes does not authenticate telemetry or prove a disposition.",
        ],
      },
      validation: {
        paragraphs: [
          "September 7, 2026 CI at 222bc7a passed 28 tests and all 51 fixture assertions in four Ubuntu/Windows jobs. The cases include 23 expected matches and 28 expected nonmatches, including malformed records. Generated reports matched the reviewed outputs.",
          "Sixteen before/after tuning comparisons changed PowerShell matches from ten to nine, removing one authored noise case while retaining all nine intended positives. These counts measure the listed fixtures, not production precision or false-positive reduction.",
        ],
      },
      lessonsConstraints: {
        paragraphs: [
          "The completed deliverable is the reproducible offline lab. Hand-authored telemetry and simulated decisions establish no real attack or response. The optional pinned Wazuh setup has static configuration checks but no demonstrated deployment, enrollment, decoder parity, or captured alert. Live adapters, representative telemetry, streaming semantics, and operational quality measurements remain future work.",
        ],
      },
    },
    technologies: [
      "Python",
      "Sigma",
      "pySigma",
      "PyYAML",
      "PowerShell",
      "GitHub Actions",
    ],
    github: "https://github.com/farhan-shafee/detection-engineering-lab",
    featured: false,
    visibility: "public",
  },
];
