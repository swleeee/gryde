import type { GrydeColumn, RowKey } from "../models";
import styles from "../styles/gryde.module.css";
import { GrydeRow } from "./GrydeRow";

interface GrydeBodyProps<TRow> {
  rows: readonly TRow[];
  columns: readonly GrydeColumn<TRow>[];
  getRowId: (row: TRow, index: number) => RowKey;
  emptyMessage: string;
}

export const GrydeBody = <TRow,>({
  rows,
  columns,
  getRowId,
  emptyMessage
}: GrydeBodyProps<TRow>) => {
  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td className={styles.emptyCell} colSpan={columns.length}>
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {rows.map((row, rowIndex) => (
        <GrydeRow key={getRowId(row, rowIndex)} row={row} rowIndex={rowIndex} columns={columns} />
      ))}
    </tbody>
  );
};
