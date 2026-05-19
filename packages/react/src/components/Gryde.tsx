import { useMemo } from "react";
import styles from "../styles/gryde.module.css";
import "../styles/variables.css";
import type { GrydeProps, SortingState } from "../models";
import { useControlledState } from "../hooks";
import { cx, sortRows } from "../utils";
import { GrydeBody } from "./GrydeBody";
import { GrydeHeader } from "./GrydeHeader";

export const Gryde = <TRow,>({
  rows,
  columns,
  getRowId,
  sorting,
  emptyMessage = "No rows",
  className,
  "aria-label": ariaLabel
}: GrydeProps<TRow>) => {
  const [sortingState, setSortingState] = useControlledState<SortingState>({
    value: sorting?.value,
    defaultValue: sorting?.defaultValue ?? [],
    onChange: sorting?.onChange
  });
  const sortedRows = useMemo(
    () => sortRows(rows, columns, sortingState),
    [rows, columns, sortingState]
  );

  return (
    <div className={cx(styles.root, className)}>
      <table className={styles.table}>
        {ariaLabel ? <caption className={styles.visuallyHidden}>{ariaLabel}</caption> : null}
        <GrydeHeader columns={columns} sorting={sortingState} onSortingChange={setSortingState} />
        <GrydeBody
          rows={sortedRows}
          columns={columns}
          getRowId={getRowId}
          emptyMessage={emptyMessage}
        />
      </table>
    </div>
  );
};
