import { describe, expect, it } from "vitest";
import { act, renderHook } from "@/test-utils";
import { useCrop } from "./use-crop";

describe("use-crop", () => {
  it("should update crop", () => {
    const { result } = renderHook(() => useCrop({ width: 600, height: 400 }));

    act(() => result.current.changeCrop({ unit: "px", x: 0, y: 100, width: 300, height: 200 }));
    expect(result.current.crop).toEqual({ unit: "px", x: 0, y: 100, width: 300, height: 200 });

    act(() => result.current.changeCrop({ ...result.current.crop, height: 400 }));
    expect(result.current.crop.height).toBe(300);

    act(() => result.current.changeCrop({ ...result.current.crop, y: 350 }));
    expect(result.current.crop.y).toBe(350);
    expect(result.current.crop.height).toBe(50);

    act(() => result.current.changeCrop({ ...result.current.crop, x: 600 }));
    expect(result.current.crop.x).toBe(599);
    expect(result.current.crop.width).toBe(1);
  });

  it("should sync percent crop and pixel crop", () => {
    const { result } = renderHook(() => useCrop({ width: 600, height: 400 }));

    act(() => result.current.changeCrop({ unit: "px", x: 0, y: 100, width: 300, height: 200 }));

    expect(result.current.percentCrop).toBeDefined();
    if (!result.current.percentCrop) return; // Add this check to satisfy TypeScript
    expect(result.current.percentCrop.x).toBeCloseTo(0);
    expect(result.current.percentCrop.y).toBeCloseTo(25);
    expect(result.current.percentCrop.width).toBeCloseTo(50);
    expect(result.current.percentCrop.height).toBeCloseTo(50);

    act(() => result.current.changePercentCrop({ unit: "%", x: 10, y: 10, width: 20, height: 25 }));

    expect(result.current.crop).toEqual({ unit: "px", x: 60, y: 40, width: 120, height: 100 });
  });
});
