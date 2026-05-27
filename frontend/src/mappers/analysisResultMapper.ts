import type { PredictionResponse } from "../api/analyzeApi";
import type { AnalysisResult } from "../types/analysisResult";

const GROUPS = [
  {
    label: "Actual",
    rules: ["AC-graph", "AC-abr"],
  },
  {
    label: "Previous Year",
    rules: ["PY-graph", "PY-abr"],
  },
  {
    label: "Plan / Budget",
    rules: ["PL-graph", "PL-abr", "BU-abr"],
  },
  {
    label: "Forecast",
    rules: ["FC-graph", "FC-abr"],
  },
  {
    label: "Axis",
    rules: ["Axis"],
  },
] as const;

export const mapPredictionToAnalysisResult = (
  predictionResult: PredictionResponse,
  previewUrl: string,
): AnalysisResult => {
  const scenarioChecks = GROUPS.map((group) => {
    const groupRules = predictionResult.rules.filter((rule) =>
      group.rules.includes(rule.rule as never),
    );

    const hasNonCompliantRule = groupRules.some(
      (rule) => rule.status === "non-compliant",
    );

    return {
      label: group.label,
      present: true,
      status: hasNonCompliantRule ? "non-compliant" : "compliant",
    };
  });

  const issues = predictionResult.rules
    .filter((rule) => rule.status === "non-compliant")
    .map((rule) => ({
      message: `${rule.label} is non-compliant. ${rule.explanation}`,
      severity: "high" as const,
    }));

  const suggestions =
    issues.length > 0
      ? [
          ...predictionResult.rules
            .filter((rule) => rule.status === "non-compliant")
            .map((rule) => rule.explanation),
          "Review the non-compliant rule groups and align their visual notation with IBCS standards.",
        ]
      : [
          "All IBCS rule groups look compliant according to the model.",
          "Keep the visual notation consistent for Actual, Previous Year, Plan / Budget, Forecast, and Axis values.",
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
