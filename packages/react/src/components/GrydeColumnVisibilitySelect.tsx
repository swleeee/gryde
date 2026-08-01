import type { ChangeEvent } from "react";
import type { ColumnVisibilityState, GrydeColumn } from "../models";
import styles from "../styles/gryde.module.css";
import { cx } from "../utils";

export interface GrydeColumnVisibilitySelectProps<TRow> {
  columns: readonly GrydeColumn<TRow>[];
  value: ColumnVisibilityState;
  onChange: (nextColumnVisibility: ColumnVisibilityState) => void;
  label?: string;
  className?: string;
}

export const GrydeColumnVisibilitySelect = <TRow,>({
  columns,
  value,
  onChange,
  label = "Columns",
  className
}: GrydeColumnVisibilitySelectProps<TRow>) => {
  const visibleColumnCount = columns.filter((column) => value[column.id] !== false).length;
  const handleChange = (columnId: string, event: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      [columnId]: event.target.checked
    });
  };

  return (
    <details className={cx(styles.columnVisibilitySelect, className)}>
      <summary className={styles.columnVisibilitySummary}>
        <span>{label}</span>
        <span className={styles.columnVisibilityCount} aria-hidden="true">
          {visibleColumnCount}/{columns.length}
        </span>
      </summary>
      <div className={styles.columnVisibilityOptions} role="group" aria-label={label}>
        {columns.map((column) => (
          <label key={column.id} className={styles.columnVisibilityOption}>
            <input
              checked={value[column.id] !== false}
              className={styles.columnVisibilityCheckbox}
              type="checkbox"
              onChange={(event) => handleChange(column.id, event)}
            />
            <span>{column.header}</span>
          </label>
        ))}
      </div>
    </details>
  );
};
