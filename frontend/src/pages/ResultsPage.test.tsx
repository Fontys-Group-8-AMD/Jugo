import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ResultsPage from "./ResultsPage";
import type { ResultsNavigationState } from "../types/analysisResult";

const renderResultsPage = (state?: ResultsNavigationState) => {
  return render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/results",
          state,
        },
      ]}
    >
      <Routes>
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("ResultsPage", () => {
  it("shows a fallback message when no analysis state is available", () => {
    renderResultsPage();

    expect(
      screen.getByRole("heading", { name: /no analysis available yet/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/upload a dashboard and run an ai analysis first/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /go to analyze/i }),
    ).toHaveAttribute("href", "/analyze");
  });

  it("renders the analysis result when navigation state is available", () => {
    const state: ResultsNavigationState = {
      uploadedImageUrl: "blob:mock-preview-url",
      analysisResult: {
        uploadedImageUrl: "blob:mock-preview-url",
        score: 88,
        status: "compliant",
        scenarioChecks: [
          { label: "Previous", evaluated: true, status: "compliant" },
          { label: "Actual", evaluated: true, status: "compliant" },
          { label: "Plan / Budget", evaluated: true, status: "compliant" },
          { label: "Forecast", evaluated: true, status: "compliant" },
        ],
        issues: [],
        suggestions: [
          "All four IBCS rules look compliant according to the notebook model.",
        ],
      },
    };

    renderResultsPage(state);

    expect(
      screen.getByText((content) => content.replace(/\s/g, "") === "88%"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /^compliant$/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /all four ibcs rules look compliant according to the notebook model/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByAltText(/uploaded dashboard/i)).toHaveAttribute(
      "src",
      "blob:mock-preview-url",
    );
  });

  it("renders a non-compliant analysis result", () => {
    const state: ResultsNavigationState = {
      uploadedImageUrl: "blob:mock-preview-url",
      analysisResult: {
        uploadedImageUrl: "blob:mock-preview-url",
        score: 72,
        status: "non-compliant",
        scenarioChecks: [
          { label: "Previous", evaluated: true, status: "non-compliant" },
          { label: "Actual", evaluated: true, status: "compliant" },
          { label: "Plan / Budget", evaluated: true, status: "non-compliant" },
          { label: "Forecast", evaluated: true, status: "compliant" },
        ],
        issues: [
          {
            message:
              "Previous is non-compliant. Previous Year is incorrect because the color is not lighter than Actual values. IBCS recommends lighter colors for historical data.",
            severity: "high",
          },
        ],
        suggestions: [
          "Review the non-compliant rules in the uploaded dashboard and align their visual notation with the notebook model feedback.",
        ],
      },
    };

    renderResultsPage(state);

    expect(
      screen.getByText((content) => content.replace(/\s/g, "") === "72%"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /^non-compliant$/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /review the non-compliant rules in the uploaded dashboard and align their visual notation with the notebook model feedback/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByAltText(/uploaded dashboard/i)).toHaveAttribute(
      "src",
      "blob:mock-preview-url",
    );
  });
});
