import type { GrydeColumn } from "./column.interface";
import type { ColumnVisibilityConfig } from "./column-visibility.interface";
import type { GrydeDensity } from "./density.type";
import type { GrydeHeightMode } from "./height-mode.interface";
import type { PaginationConfig } from "./pagination.interface";
import type { GrydePreset } from "./preset.interface";
import type { RowSelectionConfig } from "./row-selection.interface";
import type { RowKey } from "./row-key.type";
import type { SortingConfig } from "./sorting.interface";

export interface GrydeProps<TRow> {
  rows: readonly TRow[];
  columns: readonly GrydeColumn<TRow>[];
  getRowId: (row: TRow, index: number) => RowKey;
  sorting?: SortingConfig;
  pagination?: PaginationConfig;
  rowSelection?: RowSelectionConfig;
  columnVisibility?: ColumnVisibilityConfig;
  density?: GrydeDensity;
  heightMode?: GrydeHeightMode;
  preset?: GrydePreset;
  emptyMessage?: string;
  className?: string;
  "aria-label"?: string;
}
