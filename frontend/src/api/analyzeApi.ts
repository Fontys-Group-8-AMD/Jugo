export type ComplianceStatus = "compliant" | "non-compliant";

export type RuleCode =
  | "AC-graph"
  | "PY-graph"
  | "PL-graph"
  | "FC-graph"
  | "AC-abr"
  | "PY-abr"
  | "BU-abr"
  | "PL-abr"
  | "FC-abr"
  | "Axis";

export type RulePrediction = {
  rule: RuleCode;
  label: string;
  prediction: number;
  status: ComplianceStatus;
  confidence: number;
  probability_compliant: number;
  probability_non_compliant: number;
  explanation: string;
};

export type ScenarioCheckResponse = {
  label: string;
  evaluated: boolean;
  status: ComplianceStatus;
};

export type AnalysisIssueResponse = {
  message: string;
  severity: "high" | "medium";
};

export type PredictionResponse = {
  prediction: number;
  label_name: ComplianceStatus;
  score: number;
  probability_compliant: number;
  probability_non_compliant: number;
  rules: RulePrediction[];
  scenario_checks: ScenarioCheckResponse[];
  issues: AnalysisIssueResponse[];
  suggestions: string[];
  filename?: string;
};

const PREDICTION_API_URL = "http://127.0.0.1:8000/predict";

export const analyzeImage = async (file: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(PREDICTION_API_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = "Failed to analyze image.";

    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch {
      // Keep default error message when response body cannot be parsed.
    }

    throw new Error(errorMessage);
  }

  return response.json();
};
