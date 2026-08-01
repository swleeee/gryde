import type { GrydePresetState } from "../models";

export const applyPresetState = (
  currentState: GrydePresetState,
  presetState: GrydePresetState
): GrydePresetState => ({
  sorting: presetState.sorting ?? currentState.sorting,
  pagination: presetState.pagination ?? currentState.pagination,
  columnVisibility: presetState.columnVisibility ?? currentState.columnVisibility,
  density: presetState.density ?? currentState.density
});
