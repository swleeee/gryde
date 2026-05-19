import type { GrydeColumn } from "./column.interface";
import type { PaginationConfig } from "./pagination.interface";
import type { RowKey } from "./row-key.type";
import type { SortingConfig } from "./sorting.interface";

export interface GrydeProps<TRow> {
  rows: readonly TRow[];
  columns: readonly GrydeColumn<TRow>[];
  getRowId: (row: TRow, index: number) => RowKey;
  sorting?: SortingConfig;
  pagination?: PaginationConfig;
  emptyMessage?: string;
  className?: string;
  "aria-label"?: string;
}
