import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RuleInfoCard from "./RuleInfoCard";

describe("RuleInfoCard", () => {
  it("renders the IBCS rule title and scenario notation", () => {
    render(<RuleInfoCard />);

    expect(
      screen.getByRole("heading", { name: /ibcs rule un 3.2/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/scenario notation/i)).toBeInTheDocument();
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/actual/i)).toBeInTheDocument();
    expect(screen.getByText(/plan \/ budget/i)).toBeInTheDocument();
    expect(screen.getByText(/forecast/i)).toBeInTheDocument();
  });

  it("toggles the rule explanation when the info button is clicked", async () => {
    const user = userEvent.setup();

    render(<RuleInfoCard />);

    expect(
      screen.queryByText(/the "unify scenarios" rule requires/i),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /toggle rule explanation/i }),
    );

    expect(
      screen.getByText(/the "unify scenarios" rule requires/i),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /toggle rule explanation/i }),
    );

    expect(
      screen.queryByText(/the "unify scenarios" rule requires/i),
    ).not.toBeInTheDocument();
  });
});
