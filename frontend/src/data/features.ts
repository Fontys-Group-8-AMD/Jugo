export type Feature = {
  title: string;
  description: string;
  icon: "upload" | "shield" | "check";
};

export const features: Feature[] = [
  {
    title: "Upload Dashboards",
    description:
      "Easily upload dashboard screenshots for automated compliance analysis.",
    icon: "upload",
  },
  {
    title: "IBCS UN 3.2 Compliance",
    description:
      "Check whether your dashboard follows the Unify Scenarios rule from the IBCS standard.",
    icon: "shield",
  },
  {
    title: "Actionable Feedback",
    description:
      "Receive clear suggestions and practical improvements for better dashboard compliance.",
    icon: "check",
  },
];
