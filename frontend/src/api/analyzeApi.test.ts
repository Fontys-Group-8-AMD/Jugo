import { afterEach, describe, expect, it, vi } from "vitest";
import { analyzeImage } from "./analyzeApi";

const createMockFile = () =>
  new File(["mock image content"], "dashboard.png", {
    type: "image/png",
  });

describe("analyzeImage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("sends the selected file to the prediction endpoint and returns the result", async () => {
    const mockResponse = {
      prediction: 1,
      label_name: "compliant",
      score: 91,
      probability_compliant: 0.91,
      probability_non_compliant: 0.09,
      rules: [
        {
          rule: "AC",
          label: "Actual",
          prediction: 1,
          status: "compliant",
          confidence: 0.93,
          probability_compliant: 0.93,
          probability_non_compliant: 0.07,
          explanation: "Actual is correct because the dashboard uses a dark solid color, which follows IBCS standards for actual values.",
        },
        {
          rule: "PY",
          label: "Previous Year",
          prediction: 1,
          status: "compliant",
          confidence: 0.9,
          probability_compliant: 0.9,
          probability_non_compliant: 0.1,
          explanation: "Previous Year is correct because the visual style is lighter than Actual values, making historical comparisons easier.",
        },
        {
          rule: "PL",
          label: "Plan",
          prediction: 1,
          status: "compliant",
          confidence: 0.89,
          probability_compliant: 0.89,
          probability_non_compliant: 0.11,
          explanation: "Plan is correct because the dashboard uses outlined shapes, which is the recommended IBCS style for planned values.",
        },
        {
          rule: "FC",
          label: "Forecast",
          prediction: 1,
          status: "compliant",
          confidence: 0.92,
          probability_compliant: 0.92,
          probability_non_compliant: 0.08,
          explanation: "Forecast is correct because the dashboard uses a hatched or patterned style, which follows IBCS standards for forecast values.",
        },
      ],
      filename: "dashboard.png",
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await analyzeImage(createMockFile());

    expect(fetchMock).toHaveBeenCalledWith("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: expect.any(FormData),
    });

    expect(result).toEqual(mockResponse);
  });

  it("throws a readable backend error when the prediction endpoint fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({
        detail: "Only image files are allowed.",
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(analyzeImage(createMockFile())).rejects.toThrow(
      "Only image files are allowed.",
    );
  });

  it("throws a fallback error when the backend error response cannot be parsed", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(analyzeImage(createMockFile())).rejects.toThrow(
      "Failed to analyze image.",
    );
  });
});
