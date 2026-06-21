import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders the home page content", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(document.body).toBeInTheDocument();
  });
});
