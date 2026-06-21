import type { ComplianceStatus, RulePrediction } from "../api/analyzeApi";

export interface ScenarioCheck {
  label: string;
  evaluated: boolean;
  status: ComplianceStatus;
}

export interface AnalysisConfidenceCircleProps {
  score: number;
}

export interface AnalysisSummaryCardProps {
  score: number;
  status: ComplianceStatus;
  scenarioChecks: ScenarioCheck[];
}
export interface AnalysisIssue {
  message: string;
  severity: "high" | "medium";
}

export interface AnalysisResult {
  score: number;
  status: ComplianceStatus;
  uploadedImageUrl: string;
  scenarioChecks: ScenarioCheck[];
  issues: AnalysisIssue[];
  suggestions: string[];
  rules: RulePrediction[];
}

export interface ResultsNavigationState {
  uploadedImageUrl: string;
  analysisResult: AnalysisResult;
}
