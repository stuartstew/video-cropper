import { describe, expect, it } from "vitest";
import { act, renderHook } from "@/test-utils";
import { useCrop } from "./use-crop";

describe("use-crop", () => {
  it("should update crop", () => {
    const { result } = renderHook(() => useCrop(600, 400));

    act(() => result.current.changeX(0));
    act(() => result.current.changeY(100));
    act(() => result.current.changeWidth(300));
    act(() => result.current.changeHeight(200));
    expect(result.current.x).toBe(0);
    expect(result.current.y).toBe(100);
    expect(result.current.width).toBe(300);
    expect(result.current.height).toBe(200);

    act(() => result.current.changeHeight(400));
    expect(result.current.height).toBe(300);

    act(() => result.current.changeY(350));
    expect(result.current.y).toBe(350);
    expect(result.current.height).toBe(50);

    act(() => result.current.changeX(600));
    expect(result.current.x).toBe(599);
    expect(result.current.width).toBe(1);
  });
});
