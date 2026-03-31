export type Feature = {
  title: string;
  description: string;
  icon: "upload" | "shield" | "check";
};

export const features: Feature[] = [
  {
    title: "Upload Dashboards",
    description: "Drag & drop your dashboard screenshots for instant analysis.",
    icon: "upload",
  },
  {
    title: "IBCS UN 3.2 Compliance",
    description:
      "Verify scenario notation against the Unify Scenarios standard.",
    icon: "shield",
  },
  {
    title: "Actionable Feedback",
    description:
      "Get specific issues and visual suggestions to fix compliance gaps.",
    icon: "check",
  },
];
