import "@testing-library/jest-dom/vitest";
import { beforeAll, vi } from "vitest";

beforeAll(() => {
  Object.defineProperty(globalThis.URL, "createObjectURL", {
    writable: true,
    value: vi.fn(() => "blob:mock-preview-url"),
  });

  Object.defineProperty(globalThis.URL, "revokeObjectURL", {
    writable: true,
    value: vi.fn(),
  });
});
