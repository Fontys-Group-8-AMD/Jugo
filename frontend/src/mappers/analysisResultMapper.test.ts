import { describe, expect, it } from "vitest";
import { mapPredictionToAnalysisResult } from "./analysisResultMapper";
import type { PredictionResponse } from "../api/analyzeApi";

describe("mapPredictionToAnalysisResult", () => {
  it("maps a compliant prediction to a compliant analysis result", () => {
    const prediction: PredictionResponse = {
      prediction: 1,
      label_name: "compliant",
      score: 92,
      probability_compliant: 0.92,
      probability_non_compliant: 0.08,
      rules: [
        {
          rule: "AC",
          label: "Actual",
          prediction: 1,
          status: "compliant",
          confidence: 0.95,
          probability_compliant: 0.95,
          probability_non_compliant: 0.05,
          explanation: "Actual is correct because the dashboard uses a dark solid color, which follows IBCS standards for actual values.",
        },
        {
          rule: "PY",
          label: "Previous Year",
          prediction: 1,
          status: "compliant",
          confidence: 0.93,
          probability_compliant: 0.93,
          probability_non_compliant: 0.07,
          explanation: "Previous Year is correct because the visual style is lighter than Actual values, making historical comparisons easier.",
        },
        {
          rule: "PL",
          label: "Plan",
          prediction: 1,
          status: "compliant",
          confidence: 0.9,
          probability_compliant: 0.9,
          probability_non_compliant: 0.1,
          explanation: "Plan is correct because the dashboard uses outlined shapes, which is the recommended IBCS style for planned values.",
        },
        {
          rule: "FC",
          label: "Forecast",
          prediction: 1,
          status: "compliant",
          confidence: 0.9,
          probability_compliant: 0.9,
          probability_non_compliant: 0.1,
          explanation: "Forecast is correct because the dashboard uses a hatched or patterned style, which follows IBCS standards for forecast values.",
        },
      ],
      filename: "dashboard.png",
    };

    const result = mapPredictionToAnalysisResult(
      prediction,
      "blob:mock-preview-url",
    );

    expect(result.status).toBe("compliant");
    expect(result.score).toBe(92);
    expect(result.uploadedImageUrl).toBe("blob:mock-preview-url");
    expect(result.scenarioChecks).toHaveLength(4);
    expect(result.issues).toHaveLength(0);
    expect(result.suggestions.length).toBeGreaterThan(0);
  });

  it("maps a non-compliant prediction to a non-compliant analysis result with issues", () => {
    const prediction: PredictionResponse = {
      prediction: 0,
      label_name: "non-compliant",
      score: 79,
      probability_compliant: 0.21,
      probability_non_compliant: 0.79,
      rules: [
        {
          rule: "AC",
          label: "Actual",
          prediction: 1,
          status: "compliant",
          confidence: 0.84,
          probability_compliant: 0.84,
          probability_non_compliant: 0.16,
          explanation: "Actual is correct because the dashboard uses a dark solid color, which follows IBCS standards for actual values.",
        },
        {
          rule: "PY",
          label: "Previous Year",
          prediction: 0,
          status: "non-compliant",
          confidence: 0.79,
          probability_compliant: 0.21,
          probability_non_compliant: 0.79,
          explanation: "Previous Year is incorrect because the color is not lighter than Actual values. IBCS recommends lighter colors for historical data.",
        },
        {
          rule: "PL",
          label: "Plan",
          prediction: 0,
          status: "non-compliant",
          confidence: 0.65,
          probability_compliant: 0.35,
          probability_non_compliant: 0.65,
          explanation: "Plan is incorrect because the dashboard uses filled shapes instead of outlined shapes. IBCS standards recommend outlined visuals for planned values.",
        },
        {
          rule: "FC",
          label: "Forecast",
          prediction: 1,
          status: "compliant",
          confidence: 0.81,
          probability_compliant: 0.81,
          probability_non_compliant: 0.19,
          explanation: "Forecast is correct because the dashboard uses a hatched or patterned style, which follows IBCS standards for forecast values.",
        },
      ],
      filename: "dashboard.png",
    };

    const result = mapPredictionToAnalysisResult(
      prediction,
      "blob:mock-preview-url",
    );

    expect(result.status).toBe("non-compliant");
    expect(result.score).toBe(79);
    expect(result.scenarioChecks).toHaveLength(4);
    expect(result.issues).toHaveLength(2);
    expect(result.suggestions).toContain(
      "Review the non-compliant rules in the uploaded dashboard and align their visual notation with the notebook model feedback.",
    );
  });
});
