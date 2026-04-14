import type { AnalysisResult } from "../types/analysisResult";
import sampleDashboard from "../assets/sample-dashboard.png";

export const mockAnalysisResult: AnalysisResult = {
  score: 100,
  status: "compliant",
  uploadedImageUrl: sampleDashboard,
  scenarioChecks: [
    {
      label: "Previous",
      present: false,
      status: "non-compliant",
    },
    {
      label: "Actual",
      present: true,
      status: "compliant",
    },
    {
      label: "Plan / Budget",
      present: false,
      status: "non-compliant",
    },
    {
      label: "Forecast",
      present: true,
      status: "compliant",
    },
  ],
  issues: [],
  suggestions: [
    "The dashboard appears to follow IBCS UN 3.2 scenario notation for the visible scenarios.",
  ],
};
