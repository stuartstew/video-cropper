import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@/test-utils";
import { useDraftInput } from "./use-draft-input";

describe("use-draft-input", () => {
  it("should display saved value if not focused", () => {
    const { result } = renderHook(() => useDraftInput(42, () => {}));
    expect(result.current.displayValue).toBe(42);
  });

  it("should display draft if focused", () => {
    const { result } = renderHook(() => useDraftInput(42, () => {}));
    act(() => result.current.focus());
    expect(result.current.displayValue).toBe(42);
    act(() => result.current.setDraft(123));
    expect(result.current.displayValue).toBe(123);
  });

  it("should call `onBlur` function with draft if blurred", () => {
    const handleBlur = vi.fn();
    const { result } = renderHook(() => useDraftInput(42 as number, handleBlur));
    act(() => result.current.focus());
    act(() => result.current.setDraft(123));
    act(() => result.current.blur());
    expect(handleBlur).toHaveBeenCalledExactlyOnceWith(123);
  });
});
