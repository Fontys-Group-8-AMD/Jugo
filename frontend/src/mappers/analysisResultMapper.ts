import type { PredictionResponse } from "../api/analyzeApi";
import type { AnalysisResult } from "../types/analysisResult";

export const mapPredictionToAnalysisResult = (
  predictionResult: PredictionResponse,
  previewUrl: string,
): AnalysisResult => {
  const confidence =
    predictionResult.label_name === "compliant"
      ? predictionResult.probability_compliant
      : predictionResult.probability_non_compliant;

  return {
    uploadedImageUrl: previewUrl,
    status: predictionResult.label_name,
    score: Math.round(confidence * 100),
    scenarioChecks: [],
    issues:
      predictionResult.label_name === "non-compliant"
        ? [
            {
              message: "The uploaded dashboard appears to be non-compliant.",
              severity: "high",
            },
          ]
        : [],
    suggestions:
      predictionResult.label_name === "non-compliant"
        ? ["Review the dashboard against the IBCS compliance rules."]
        : ["The dashboard appears compliant based on the model prediction."],
  };
};
