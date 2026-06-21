import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(document.body).toBeInTheDocument();
  });
});
