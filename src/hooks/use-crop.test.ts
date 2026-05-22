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

  it("should sync percent crop and pixel crop", () => {
    const { result } = renderHook(() => useCrop(600, 400));

    act(() => result.current.changeX(0));
    act(() => result.current.changeY(100));
    act(() => result.current.changeWidth(300));
    act(() => result.current.changeHeight(200));

    expect(result.current.percentCrop).toBeDefined();
    if (!result.current.percentCrop) return; // Add this check to satisfy TypeScript
    expect(result.current.percentCrop.x).toBeCloseTo(0);
    expect(result.current.percentCrop.y).toBeCloseTo(25);
    expect(result.current.percentCrop.width).toBeCloseTo(50);
    expect(result.current.percentCrop.height).toBeCloseTo(50);

    act(() => result.current.changePercentCrop({ unit: "%", x: 10, y: 10, width: 20, height: 25 }));

    expect(result.current.x).toBe(60);
    expect(result.current.y).toBe(40);
    expect(result.current.width).toBe(120);
    expect(result.current.height).toBe(100);
  });
});
