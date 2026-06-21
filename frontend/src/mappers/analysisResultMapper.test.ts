import { describe, expect, it } from "vitest";
import { mapPredictionToAnalysisResult } from "./analysisResultMapper";
import type { PredictionResponse } from "../api/analyzeApi";

describe("mapPredictionToAnalysisResult", () => {
  it("maps a compliant prediction to a compliant analysis result", () => {
    const prediction: PredictionResponse = {
      prediction: 0,
      label_name: "compliant",
      score: 92,
      probability_compliant: 0.92,
      probability_non_compliant: 0.08,
      rules: [],
      scenario_checks: [],
      issues: [],
      suggestions: [
        "All IBCS rule groups look compliant according to the model.",
      ],
    };

    const result = mapPredictionToAnalysisResult(
      prediction,
      "blob:mock-preview-url",
    );

    expect(result).toEqual({
      uploadedImageUrl: "blob:mock-preview-url",
      status: "compliant",
      score: 92,
      scenarioChecks: [],
      issues: [],
      suggestions: [
        "All IBCS rule groups look compliant according to the model.",
      ],
      rules: [],
    });
  });

  it("maps a non-compliant prediction to a non-compliant analysis result with issues", () => {
    const prediction: PredictionResponse = {
      prediction: 1,
      label_name: "non-compliant",
      score: 79,
      probability_compliant: 0.21,
      probability_non_compliant: 0.79,
      rules: [
        {
          rule: "AC-graph",
          label: "Actual Graph",
          prediction: 1,
          status: "non-compliant",
          confidence: 0.79,
          probability_compliant: 0.21,
          probability_non_compliant: 0.79,
          explanation:
            "Actual values should use a dark solid visual style so they are clearly distinguishable from other scenarios.",
        },
      ],
      scenario_checks: [
        {
          label: "Actual",
          evaluated: true,
          status: "non-compliant",
        },
      ],
      issues: [
        {
          message: "Actual Graph is non-compliant.",
          severity: "high",
        },
      ],
      suggestions: ["Actual values should use a dark solid visual style."],
    };

    const result = mapPredictionToAnalysisResult(
      prediction,
      "blob:mock-preview-url",
    );

    expect(result.status).toBe("non-compliant");
    expect(result.score).toBe(79);
    expect(result.scenarioChecks).toHaveLength(1);
    expect(result.issues).toHaveLength(1);
    expect(result.suggestions).toContain(
      "Actual values should use a dark solid visual style.",
    );
    expect(result.rules).toHaveLength(1);
    expect(result.rules[0].rule).toBe("AC-graph");
    expect(result.rules[0].status).toBe("non-compliant");
  });
});
