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
    "Previous values should use the correct IBCS notation so users can clearly distinguish them from actual values.",
    "Plan or budget values are present, but their notation does not fully match the expected IBCS UN 3.2 standard.",
    "Forecast values should be visually separated from actual values using the correct scenario notation.",
    "Add colored feedback boxes around the detected problem areas so users can immediately see what needs to be corrected.",
    "Include a short explanation of how the confidence score was calculated to make the result more trustworthy.",
  ],
};
