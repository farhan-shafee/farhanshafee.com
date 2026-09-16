export type UsesItem = {
  name: string;
  description: string;
  url?: string;
};

export type UsesCategory = {
  title: string;
  description: string;
  items: UsesItem[];
};

/**
 * TODO: Populate with Farhan's confirmed current tools. Known language
 * experience does not establish which editors, services, or devices he uses.
 */
export const usesCategories: UsesCategory[] = [
  {
    title: "Development",
    description: "Editors, languages, testing, and delivery workflows.",
    items: [],
  },
  {
    title: "Security",
    description: "Tools for investigation, analysis, and security engineering.",
    items: [],
  },
  {
    title: "Infrastructure",
    description: "The systems and services behind the work.",
    items: [],
  },
  {
    title: "AI",
    description: "Models and tools for assisted engineering and automation.",
    items: [],
  },
  {
    title: "Productivity",
    description: "Notes, planning, and keeping technical work organized.",
    items: [],
  },
  {
    title: "Hardware",
    description:
      "The physical setup, with private infrastructure details omitted.",
    items: [],
  },
];
