import { describe, expect, it } from "vitest";
import { applyPresetState } from "./applyPresetState";

describe("applyPresetState", () => {
  it("preset에 정의된 grid 상태를 적용한다", () => {
    const currentState = {
      sorting: [{ columnId: "name", direction: "asc" as const }],
      pagination: { page: 1, pageSize: 10 },
      columnVisibility: { email: true },
      density: "normal" as const
    };
    const presetState = {
      sorting: [{ columnId: "amount", direction: "desc" as const }],
      pagination: { page: 2, pageSize: 20 },
      columnVisibility: { email: false },
      density: "compact" as const
    };

    expect(applyPresetState(currentState, presetState)).toEqual(presetState);
  });

  it("preset에 없는 상태는 현재 grid 상태를 유지한다", () => {
    const currentState = {
      sorting: [{ columnId: "name", direction: "asc" as const }],
      pagination: { page: 1, pageSize: 10 },
      columnVisibility: { email: true },
      density: "normal" as const
    };

    expect(
      applyPresetState(currentState, {
        density: "comfortable"
      })
    ).toEqual({
      ...currentState,
      density: "comfortable"
    });
  });

  it("입력 상태 객체를 변경하지 않는다", () => {
    const currentState = {
      pagination: { page: 1, pageSize: 10 }
    };
    const presetState = {
      pagination: { page: 2, pageSize: 20 }
    };

    applyPresetState(currentState, presetState);

    expect(currentState).toEqual({ pagination: { page: 1, pageSize: 10 } });
    expect(presetState).toEqual({ pagination: { page: 2, pageSize: 20 } });
  });
});
