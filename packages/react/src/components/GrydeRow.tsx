import type { GrydeColumn, RowKey } from "../models";
import styles from "../styles/gryde.module.css";
import { cx } from "../utils";
import { GrydeCell } from "./GrydeCell";
import { GrydeSelectionCheckbox } from "./GrydeSelectionCheckbox";

interface GrydeRowProps<TRow> {
  row: TRow;
  rowIndex: number;
  rowKey: RowKey;
  columns: readonly GrydeColumn<TRow>[];
  selected: boolean;
  selectionEnabled: boolean;
  onRowToggle: (rowKey: RowKey) => void;
}

export const GrydeRow = <TRow,>({
  row,
  rowIndex,
  rowKey,
  columns,
  selected,
  selectionEnabled,
  onRowToggle
}: GrydeRowProps<TRow>) => {
  return (
    <tr className={cx(styles.row, selected && styles.rowSelected)}>
      {selectionEnabled ? (
        <td className={styles.selectionCell}>
          <GrydeSelectionCheckbox
            checked={selected}
            label={`Select row ${String(rowKey)}`}
            onChange={() => onRowToggle(rowKey)}
          />
        </td>
      ) : null}
      {columns.map((column) => (
        <GrydeCell key={column.id} row={row} rowIndex={rowIndex} column={column} />
      ))}
    </tr>
  );
};
