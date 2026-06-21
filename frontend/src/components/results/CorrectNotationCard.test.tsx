import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CorrectNotationCard from "./CorrectNotationCard";

describe("CorrectNotationCard", () => {
  it("renders the correct IBCS notation explanation", () => {
    render(<CorrectNotationCard />);

    expect(
      screen.getByRole("heading", { name: /correct ibcs notation/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/according to ibcs un 3.2/i)).toBeInTheDocument();

    expect(screen.getAllByText(/previous/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/actual/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/plan \/ budget/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/forecast/i).length).toBeGreaterThan(0);

    expect(screen.getByText(/light solid fill/i)).toBeInTheDocument();
    expect(screen.getByText(/dark solid fill/i)).toBeInTheDocument();
    expect(screen.getByText(/outlined bars/i)).toBeInTheDocument();
    expect(screen.getByText(/hatched fill/i)).toBeInTheDocument();
  });
});
