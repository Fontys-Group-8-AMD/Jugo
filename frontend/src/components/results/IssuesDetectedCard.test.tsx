import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import IssuesDetectedCard from "./IssuesDetectedCard";
import type { AnalysisIssue } from "../../types/analysisResult";

describe("IssuesDetectedCard", () => {
  it("renders detected issues with their severity labels", () => {
    const issues: AnalysisIssue[] = [
      {
        message: "Actual values do not use the correct dark solid fill.",
        severity: "high",
      },
      {
        message: "Forecast values should use a hatched pattern.",
        severity: "medium",
      },
    ];

    render(<IssuesDetectedCard issues={issues} />);

    expect(
      screen.getByRole("heading", { name: /issues detected/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /1\. actual values do not use the correct dark solid fill/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/2\. forecast values should use a hatched pattern/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/^high$/i)).toBeInTheDocument();
    expect(screen.getByText(/^medium$/i)).toBeInTheDocument();
  });

  it("renders only the title when there are no issues", () => {
    render(<IssuesDetectedCard issues={[]} />);

    expect(
      screen.getByRole("heading", { name: /issues detected/i }),
    ).toBeInTheDocument();
  });
});
