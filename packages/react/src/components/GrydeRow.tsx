import type { GrydeColumn } from "../models";
import styles from "../styles/gryde.module.css";
import { GrydeCell } from "./GrydeCell";

interface GrydeRowProps<TRow> {
  row: TRow;
  rowIndex: number;
  columns: readonly GrydeColumn<TRow>[];
}

export const GrydeRow = <TRow,>({ row, rowIndex, columns }: GrydeRowProps<TRow>) => {
  return (
    <tr className={styles.row}>
      {columns.map((column) => (
        <GrydeCell key={column.id} row={row} rowIndex={rowIndex} column={column} />
      ))}
    </tr>
  );
};
