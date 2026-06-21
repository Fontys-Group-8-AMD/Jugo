import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders without crashing", () => {
    render(<Footer />);

    expect(document.body).toBeInTheDocument();
  });
});
