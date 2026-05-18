import type { GrydeColumn } from "./column.interface";
import type { RowKey } from "./row-key.type";

export interface GrydeProps<TRow> {
  rows: readonly TRow[];
  columns: readonly GrydeColumn<TRow>[];
  getRowId: (row: TRow, index: number) => RowKey;
  emptyMessage?: string;
  className?: string;
  "aria-label"?: string;
}
