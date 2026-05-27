export interface ScenarioCheck {
  label: string;
  present: boolean;
  status: "compliant" | "non-compliant";
}

export interface AnalysisConfidenceCircleProps {
  score: number;
}
export interface AnalysisSummaryCardProps {
  score: number;
  status: "compliant" | "non-compliant";
  scenarioChecks: ScenarioCheck[];
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
