import type { ColumnVisibilityState, GrydeColumn } from "../models";

export const getVisibleColumns = <TRow>(
  columns: readonly GrydeColumn<TRow>[],
  columnVisibility: ColumnVisibilityState
) => {
  return columns.filter((column) => columnVisibility[column.id] !== false);
};
