import { describe, it } from "vitest";
import { render } from "@/test-utils";
import App from "./app";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
