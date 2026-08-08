import { describe, it, vi } from "vitest";
import { render } from "@/test-utils";
import App from "./app";

vi.mock("./hooks/use-menu", () => ({
  useMenu: vi.fn(),
}));

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
