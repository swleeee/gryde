import type { GrydeColumn, RowKey } from "../models";
import styles from "../styles/gryde.module.css";
import { GrydeRow } from "./GrydeRow";

interface GrydeBodyProps<TRow> {
  rows: readonly TRow[];
  columns: readonly GrydeColumn<TRow>[];
  getRowId: (row: TRow, index: number) => RowKey;
  emptyMessage: string;
  selectedRowKeySet: ReadonlySet<RowKey>;
  selectionEnabled: boolean;
  onRowToggle: (rowKey: RowKey) => void;
}

export const GrydeBody = <TRow,>({
  rows,
  columns,
  getRowId,
  emptyMessage,
  selectedRowKeySet,
  selectionEnabled,
  onRowToggle
}: GrydeBodyProps<TRow>) => {
  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td className={styles.emptyCell} colSpan={columns.length + (selectionEnabled ? 1 : 0)}>
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {rows.map((row, rowIndex) => {
        const rowKey = getRowId(row, rowIndex);

        return (
          <GrydeRow
            key={rowKey}
            row={row}
            rowIndex={rowIndex}
            rowKey={rowKey}
            columns={columns}
            selected={selectedRowKeySet.has(rowKey)}
            selectionEnabled={selectionEnabled}
            onRowToggle={onRowToggle}
          />
        );
      })}
    </tbody>
  );
};
