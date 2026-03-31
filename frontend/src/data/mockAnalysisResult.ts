import sampleDashboard from "../assets/sample-dashboard.png";

export interface ScenarioCheck {
  label: string;
  status: "compliant" | "non-compliant";
}

export interface AnalysisIssue {
  message: string;
  severity: "high" | "medium";
}

export interface AnalysisResult {
  score: number;
  status: "compliant" | "non-compliant";
  uploadedImageUrl: string;
  scenarioChecks: ScenarioCheck[];
  issues: AnalysisIssue[];
  suggestions: string[];
}

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
