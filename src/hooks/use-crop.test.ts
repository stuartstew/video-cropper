import { describe, expect, it } from "vitest";
import { act, renderHook } from "@/test-utils";
import { useCrop } from "./use-crop";

describe("use-crop", () => {
  it("should update pixel crop", () => {
    const { result } = renderHook(() => useCrop({ width: 600, height: 400 }));

    act(() => result.current.changePixelCrop({ unit: "px", x: 0, y: 100, width: 300, height: 200 }));
    expect(result.current.pixelCrop).toEqual({ unit: "px", x: 0, y: 100, width: 300, height: 200 });
  });

  it("should clamp x of pixel crop", () => {
    const { result } = renderHook(() => useCrop({ width: 600, height: 400 }));

    act(() => result.current.changePixelCrop({ unit: "px", x: 600, y: 100, width: 300, height: 200 }));
    expect(result.current.pixelCrop).toEqual({ unit: "px", x: 599, y: 100, width: 1, height: 200 });
  });

  it("should clamp y of pixel crop", () => {
    const { result } = renderHook(() => useCrop({ width: 600, height: 400 }));

    act(() => result.current.changePixelCrop({ unit: "px", x: 0, y: 400, width: 300, height: 200 }));
    expect(result.current.pixelCrop).toEqual({ unit: "px", x: 0, y: 399, width: 300, height: 1 });
  });

  it("should clamp width of pixel crop", () => {
    const { result } = renderHook(() => useCrop({ width: 600, height: 400 }));

    act(() => result.current.changePixelCrop({ unit: "px", x: 0, y: 100, width: 700, height: 200 }));
    expect(result.current.pixelCrop).toEqual({ unit: "px", x: 0, y: 100, width: 600, height: 200 });
  });

  it("should clamp height of pixel crop", () => {
    const { result } = renderHook(() => useCrop({ width: 600, height: 400 }));

    act(() => result.current.changePixelCrop({ unit: "px", x: 0, y: 100, width: 300, height: 400 }));
    expect(result.current.pixelCrop).toEqual({ unit: "px", x: 0, y: 100, width: 300, height: 300 });
  });

  it("should update percent crop", () => {
    const { result } = renderHook(() => useCrop({ width: 600, height: 400 }));

    act(() => result.current.changePercentCrop({ unit: "%", x: 0, y: 25, width: 50, height: 50 }));
    expect(result.current.percentCrop).toEqual({ unit: "%", x: 0, y: 25, width: 50, height: 50 });
  });

  it("should update percent crop if pixel crop is changed", () => {
    const { result } = renderHook(() => useCrop({ width: 600, height: 400 }));

    act(() => result.current.changePixelCrop({ unit: "px", x: 0, y: 100, width: 300, height: 200 }));

    expect(result.current.percentCrop).toBeDefined();
    if (!result.current.percentCrop) return; // Add this check to satisfy TypeScript
    expect(result.current.percentCrop.x).toBeCloseTo(0);
    expect(result.current.percentCrop.y).toBeCloseTo(25);
    expect(result.current.percentCrop.width).toBeCloseTo(50);
    expect(result.current.percentCrop.height).toBeCloseTo(50);
  });

  it("should update pixel crop if percent crop is changed", () => {
    const { result } = renderHook(() => useCrop({ width: 600, height: 400 }));

    act(() => result.current.changePercentCrop({ unit: "%", x: 10, y: 10, width: 20, height: 25 }));
    expect(result.current.pixelCrop).toEqual({ unit: "px", x: 60, y: 40, width: 120, height: 100 });
  });

  it("should reset pixel crop if both width and height of percent crop are changed to 0", () => {
    const { result } = renderHook(() => useCrop({ width: 600, height: 400 }));

    act(() => result.current.changePercentCrop({ unit: "%", x: 0, y: 0, width: 0, height: 0 }));
    expect(result.current.pixelCrop).toEqual({ unit: "px", x: 0, y: 0, width: 600, height: 400 });
  });
});
