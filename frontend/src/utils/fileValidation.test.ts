import { describe, expect, it } from "vitest";
import { getFileValidationError } from "./fileValidation";

const createMockFile = (
  name: string,
  type: string,
  sizeInBytes: number,
): File => {
  const content = new Uint8Array(sizeInBytes);

  return new File([content], name, {
    type,
  });
};

describe("getFileValidationError", () => {
  it("accepts a valid PNG file under 10MB", () => {
    const file = createMockFile("dashboard.png", "image/png", 1024);

    const result = getFileValidationError(file);

    expect(result).toBeNull();
  });

  it("accepts a valid JPG or JPEG file under 10MB", () => {
    const file = createMockFile("dashboard.jpg", "image/jpeg", 1024);

    const result = getFileValidationError(file);

    expect(result).toBeNull();
  });

  it("rejects unsupported file types", () => {
    const file = createMockFile("notes.txt", "text/plain", 1024);

    const result = getFileValidationError(file);

    expect(result).toBe("Only PNG, JPG, and JPEG files are allowed.");
  });

  it("rejects image files larger than 10MB", () => {
    const file = createMockFile(
      "large-dashboard.png",
      "image/png",
      10 * 1024 * 1024 + 1,
    );

    const result = getFileValidationError(file);

    expect(result).toBe("File size must be 10MB or less.");
  });

  it("accepts an image exactly 10MB", () => {
    const file = createMockFile(
      "exact-size-dashboard.png",
      "image/png",
      10 * 1024 * 1024,
    );

    const result = getFileValidationError(file);

    expect(result).toBeNull();
  });
});
