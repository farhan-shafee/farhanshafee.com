/** Independent expectations from the reviewed October 14 brief and approved October 15 CreditFlow addition. */
export const approvedProjectSlugs = [
  "aegisgraph",
  "creditops-ai",
  "tradeflow",
  "creditflow-qe",
  "devsecops-pipeline",
  "detection-security-lab",
  "cloud-security",
  "vulnerability-management",
] as const;

export const retiredProjectRoutes = [
  "/work/cyberbit-solutions",
  "/work/ai-job-intelligence-engine",
  "/work/secure-infrastructure-homelab",
] as const;

export const retiredPublicAssets = [
  "/projects/cyberbit-solutions/free-security-check.png",
  "/projects/cyberbit-solutions/risk-snapshot-report.png",
  "/diagrams/cyberbit-workflows.svg",
  "/diagrams/job-engine-workflows.svg",
] as const;

export const excludedPublicContent =
  /CyberBit|Job Intelligence Engine|homelab|cyberbitsolutions\.com|Rollsites|systematic investing|github\.com\/farhan-shafee\/creditops/i;
