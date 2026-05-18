import type { PredictionResponse } from "../api/analyzeApi";
import type { AnalysisResult } from "../types/analysisResult";

const RULE_LABEL_MAP: Record<PredictionResponse["rules"][number]["rule"], "Previous" | "Actual" | "Plan / Budget" | "Forecast"> = {
  AC: "Actual",
  PY: "Previous",
  PL: "Plan / Budget",
  FC: "Forecast",
};

export const mapPredictionToAnalysisResult = (
  predictionResult: PredictionResponse,
  previewUrl: string,
): AnalysisResult => {
  const scenarioChecks = predictionResult.rules.map((rule) => ({
    label: RULE_LABEL_MAP[rule.rule],
    present: true,
    status: rule.status,
  }));

  const issues = predictionResult.rules
    .filter((rule) => rule.status === "non-compliant")
    .map((rule) => ({
      message: `${rule.label} is non-compliant. ${rule.explanation}`,
      severity: "high" as const,
    }));

  const suggestions =
    issues.length > 0
      ? [
          ...predictionResult.rules.map((rule) =>
            rule.status === "non-compliant"
              ? rule.explanation
              : `${rule.label} looks correct and follows the notebook model's prediction.`,
          ),
          "Review the non-compliant rules in the uploaded dashboard and align their visual notation with the notebook model feedback.",
        ]
      : [
          "All four IBCS rules look compliant according to the notebook model.",
          "Keep the visual notation consistent for Actual, Previous Year, Plan, and Forecast values.",
          "Use the per-rule confidence values if you want to highlight weaker predictions.",
        ];

  return {
    uploadedImageUrl: previewUrl,
    status: predictionResult.label_name,
    score: predictionResult.score,
    scenarioChecks,
    issues,
    suggestions,
  };
};
