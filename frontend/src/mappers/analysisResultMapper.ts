import type { PredictionResponse } from "../api/analyzeApi";
import type { AnalysisResult } from "../types/analysisResult";

export const mapPredictionToAnalysisResult = (
  predictionResult: PredictionResponse,
  previewUrl: string,
): AnalysisResult => {
  return {
    uploadedImageUrl: previewUrl,
    status: predictionResult.label_name,
    score: predictionResult.score,
    scenarioChecks: predictionResult.scenario_checks,
    issues: predictionResult.issues,
    suggestions: predictionResult.suggestions,
  };
};
