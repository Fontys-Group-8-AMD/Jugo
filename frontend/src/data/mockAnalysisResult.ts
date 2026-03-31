import type { AnalysisResult } from "../types/analysisResult";
import sampleDashboard from "../assets/sample-dashboard.png";

export const mockAnalysisResult: AnalysisResult = {
  score: 62,
  status: "non-compliant",
  uploadedImageUrl: sampleDashboard,
  scenarioChecks: [
    { label: "Actual", status: "compliant" },
    { label: "Plan", status: "non-compliant" },
    { label: "Forecast", status: "non-compliant" },
  ],
  issues: [
    {
      message: "Forecast data uses solid fill instead of hatched fill.",
      severity: "high",
    },
    {
      message: "Plan/Budget data uses solid fill instead of outlined bars.",
      severity: "high",
    },
    {
      message: "No legend distinguishes scenario types.",
      severity: "medium",
    },
  ],
  suggestions: [
    "Replace solid bars for planned data with outlined (hollow) bars.",
    "Apply hatched fill pattern to all forecast data series.",
    "Add a scenario legend referencing IBCS notation standards.",
  ],
};
