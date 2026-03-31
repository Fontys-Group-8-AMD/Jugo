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

export interface ResultsNavigationState {
  uploadedImageUrl: string;
  analysisResult: AnalysisResult;
}
