import { useMemo } from "react";
import styles from "../styles/gryde.module.css";
import "../styles/variables.css";
import type { GrydeProps, PaginationState, SortingState } from "../models";
import { useControlledState } from "../hooks";
import { clampPage, cx, getPageCount, paginateRows, sortRows } from "../utils";
import { GrydeBody } from "./GrydeBody";
import { GrydeHeader } from "./GrydeHeader";
import { GrydePagination } from "./GrydePagination";

export const Gryde = <TRow,>({
  rows,
  columns,
  getRowId,
  sorting,
  pagination,
  emptyMessage = "No rows",
  className,
  "aria-label": ariaLabel
}: GrydeProps<TRow>) => {
  const [sortingState, setSortingState] = useControlledState<SortingState>({
    value: sorting?.value,
    defaultValue: sorting?.defaultValue ?? [],
    onChange: sorting?.onChange
  });
  const [paginationState, setPaginationState] = useControlledState<PaginationState>({
    value: pagination?.value,
    defaultValue: pagination?.defaultValue ?? { page: 1, pageSize: 10 },
    onChange: pagination?.onChange
  });
  const sortedRows = useMemo(
    () => sortRows(rows, columns, sortingState),
    [rows, columns, sortingState]
  );
  const pageCount = getPageCount(sortedRows.length, paginationState.pageSize);
  const clampedPagination = {
    ...paginationState,
    page: clampPage(paginationState.page, pageCount)
  };
  const visibleRows = pagination ? paginateRows(sortedRows, clampedPagination) : sortedRows;

  return (
    <div className={cx(styles.root, className)}>
      <table className={styles.table}>
        {ariaLabel ? <caption className={styles.visuallyHidden}>{ariaLabel}</caption> : null}
        <GrydeHeader columns={columns} sorting={sortingState} onSortingChange={setSortingState} />
        <GrydeBody
          rows={visibleRows}
          columns={columns}
          getRowId={getRowId}
          emptyMessage={emptyMessage}
        />
      </table>
      {pagination ? (
        <GrydePagination
          pagination={clampedPagination}
          totalCount={sortedRows.length}
          pageSizeOptions={pagination.pageSizeOptions ?? [5, 10, 20, 50]}
          onPaginationChange={setPaginationState}
        />
      ) : null}
    </div>
  );
};
