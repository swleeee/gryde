import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useControlledState } from "./useControlledState";

describe("useControlledState", () => {
  it("uses defaultValue and updates internal state when uncontrolled", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControlledState({
        defaultValue: "normal",
        onChange
      })
    );

    expect(result.current[0]).toBe("normal");

    act(() => {
      result.current[1]("compact");
    });

    expect(result.current[0]).toBe("compact");
    expect(onChange).toHaveBeenCalledWith("compact");
  });

  it("uses value and does not update internal state when controlled", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) =>
        useControlledState({
          value,
          defaultValue: "normal",
          onChange
        }),
      {
        initialProps: {
          value: "compact"
        }
      }
    );

    expect(result.current[0]).toBe("compact");

    act(() => {
      result.current[1]("comfortable");
    });

    expect(result.current[0]).toBe("compact");
    expect(onChange).toHaveBeenCalledWith("comfortable");

    rerender({ value: "comfortable" });

    expect(result.current[0]).toBe("comfortable");
  });

  it("supports updater functions", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControlledState({
        defaultValue: 1,
        onChange
      })
    );

    act(() => {
      result.current[1]((previousValue) => previousValue + 1);
    });

    expect(result.current[0]).toBe(2);
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
