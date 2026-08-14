import { randomFillSync } from "node:crypto";
import { mockIPC } from "@tauri-apps/api/mocks";
import { beforeAll, describe, it } from "vitest";
import { render } from "@/test-utils";
import App from "./app";

beforeAll(() => {
  Object.defineProperty(window, "crypto", {
    value: {
      // biome-ignore  lint/suspicious/noExplicitAny: boilerplate
      getRandomValues: (buffer: any) => {
        return randomFillSync(buffer);
      },
    },
  });
});

describe("App", () => {
  it("renders without crashing", () => {
    mockIPC(() => {});
    render(<App />);
  });
});
