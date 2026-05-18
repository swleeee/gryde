import type { ReactNode } from "react";
import type { GrydeColumn } from "../models";
import styles from "../styles/gryde.module.css";

interface GrydeCellProps<TRow> {
  row: TRow;
  rowIndex: number;
  column: GrydeColumn<TRow>;
}

const renderFallbackValue = (value: unknown): ReactNode => {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return JSON.stringify(value);
};

export const GrydeCell = <TRow,>({ row, rowIndex, column }: GrydeCellProps<TRow>) => {
  const value = column.accessor?.(row);
  const content =
    column.render?.({ row, rowIndex, value, column }) ??
    column.format?.(value, row) ??
    renderFallbackValue(value);

  return (
    <td className={styles.cell} style={{ width: column.width, textAlign: column.align }}>
      {content}
    </td>
  );
};
