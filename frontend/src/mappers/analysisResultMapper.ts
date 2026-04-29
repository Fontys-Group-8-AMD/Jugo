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
        ? [
            "Review the dashboard against the IBCS compliance rules.",
            "Check whether actual, plan, and forecast values use the correct scenario notation.",
            "Add clear visual markers around non-compliant areas so users can immediately see what needs attention.",
            "Make sure all scenario labels are consistent and easy to compare.",
            "Include a short explanation of how the confidence score was calculated to improve trust in the result.",
          ]
        : [
            "The dashboard appears compliant based on the model prediction.",
            "The visible scenario notation seems clear and consistent.",
            "Consider adding visual confirmation markers around compliant areas for easier interpretation.",
            "Keep the suggested improvements visible on the same screen as the uploaded dashboard.",
            "Add a short explanation of how the prediction confidence was calculated to make the result more transparent.",
          ],
  };
};
