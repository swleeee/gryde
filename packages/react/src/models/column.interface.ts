import type { ReactNode } from "react";

export interface GrydeColumn<TRow, TValue = unknown> {
  id: string;
  header: ReactNode;
  accessor?: (row: TRow) => TValue;
  format?: (value: TValue, row: TRow) => ReactNode;
  render?: (context: GrydeCellContext<TRow, TValue>) => ReactNode;
  sortable?: boolean;
  width?: number | string;
  align?: "left" | "center" | "right";
}

export interface GrydeCellContext<TRow, TValue = unknown> {
  row: TRow;
  rowIndex: number;
  value: TValue;
  column: GrydeColumn<TRow, TValue>;
}
