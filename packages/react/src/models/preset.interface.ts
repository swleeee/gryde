import type { ColumnVisibilityState } from "./column-visibility.interface";
import type { GrydeDensity } from "./density.type";
import type { GrydeHeightMode } from "./height-mode.interface";
import type { PaginationState } from "./pagination.interface";
import type { SortingState } from "./sorting.interface";

export interface GrydePresetState {
  sorting?: SortingState;
  pagination?: PaginationState;
  columnVisibility?: ColumnVisibilityState;
  density?: GrydeDensity;
}

export interface GrydePresetLayout {
  heightMode?: GrydeHeightMode;
}

export interface GrydePreset {
  id: string;
  label: string;
  state: GrydePresetState;
  layout?: GrydePresetLayout;
}
