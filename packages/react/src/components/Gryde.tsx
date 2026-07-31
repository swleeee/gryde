import { useMemo, type CSSProperties } from "react";
import styles from "../styles/gryde.module.css";
import "../styles/variables.css";
import type {
  ColumnVisibilityState,
  GrydeProps,
  GrydeHeightMode,
  PaginationState,
  RowKey,
  SortingState
} from "../models";
import { useControlledState } from "../hooks";
import {
  clampPage,
  cx,
  getAdaptiveHeight,
  getPageCount,
  getVisibleColumns,
  paginateRows,
  sortRows
} from "../utils";
import { GrydeBody } from "./GrydeBody";
import { GrydeHeader } from "./GrydeHeader";
import { GrydePagination } from "./GrydePagination";

const PAGINATION_HEIGHT = 40;

const getAdaptiveHeightOptions = (
  heightMode: GrydeHeightMode | undefined,
  rowCount: number,
  hasPagination: boolean
) => {
  if (heightMode?.type !== "adaptive") {
    return undefined;
  }

  return {
    ...heightMode,
    rowCount,
    headerHeight: heightMode.headerHeight ?? heightMode.rowHeight,
    footerHeight: heightMode.footerHeight ?? (hasPagination ? PAGINATION_HEIGHT : 0)
  };
};

export const Gryde = <TRow,>({
  rows,
  columns,
  getRowId,
  sorting,
  pagination,
  rowSelection,
  columnVisibility,
  density = "normal",
  heightMode,
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
  const [columnVisibilityState] = useControlledState<ColumnVisibilityState>({
    value: columnVisibility?.value,
    defaultValue: columnVisibility?.defaultValue ?? {},
    onChange: columnVisibility?.onChange
  });
  const [selectedRowKeys, setSelectedRowKeys] = useControlledState<RowKey[]>({
    value: rowSelection?.selectedRowKeys,
    defaultValue: rowSelection?.defaultSelectedRowKeys ?? [],
    onChange: rowSelection?.onChange
  });
  const visibleColumns = useMemo(
    () => getVisibleColumns(columns, columnVisibilityState),
    [columns, columnVisibilityState]
  );
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
  const adaptiveHeight = useMemo(() => {
    const options = getAdaptiveHeightOptions(heightMode, visibleRows.length, Boolean(pagination));

    return options ? getAdaptiveHeight(options) : undefined;
  }, [heightMode, pagination, visibleRows.length]);
  const rootStyle: CSSProperties | undefined = adaptiveHeight
    ? {
        minHeight: adaptiveHeight.minHeight,
        maxHeight: adaptiveHeight.maxHeight
      }
    : undefined;
  const visibleRowKeys = useMemo(
    () => visibleRows.map((row, rowIndex) => getRowId(row, rowIndex)),
    [getRowId, visibleRows]
  );
  const selectedRowKeySet = useMemo(() => new Set(selectedRowKeys), [selectedRowKeys]);
  const selectedVisibleRowCount = visibleRowKeys.filter((rowKey) =>
    selectedRowKeySet.has(rowKey)
  ).length;
  const areAllVisibleRowsSelected =
    visibleRowKeys.length > 0 && selectedVisibleRowCount === visibleRowKeys.length;
  const areSomeVisibleRowsSelected =
    selectedVisibleRowCount > 0 && selectedVisibleRowCount < visibleRowKeys.length;

  const toggleVisibleRows = () => {
    setSelectedRowKeys((previousSelectedRowKeys) => {
      const nextSelectedRowKeySet = new Set(previousSelectedRowKeys);

      if (areAllVisibleRowsSelected) {
        visibleRowKeys.forEach((rowKey) => nextSelectedRowKeySet.delete(rowKey));
      } else {
        visibleRowKeys.forEach((rowKey) => nextSelectedRowKeySet.add(rowKey));
      }

      return Array.from(nextSelectedRowKeySet);
    });
  };

  const toggleRow = (rowKey: RowKey) => {
    setSelectedRowKeys((previousSelectedRowKeys) => {
      const nextSelectedRowKeySet = new Set(previousSelectedRowKeys);

      if (nextSelectedRowKeySet.has(rowKey)) {
        nextSelectedRowKeySet.delete(rowKey);
      } else {
        nextSelectedRowKeySet.add(rowKey);
      }

      return Array.from(nextSelectedRowKeySet);
    });
  };

  return (
    <div
      className={cx(
        styles.root,
        density === "compact" && styles.densityCompact,
        density === "comfortable" && styles.densityComfortable,
        className
      )}
      style={rootStyle}
    >
      <div className={styles.scrollArea}>
        <table className={styles.table}>
          {ariaLabel ? <caption className={styles.visuallyHidden}>{ariaLabel}</caption> : null}
          <GrydeHeader
            columns={visibleColumns}
            sorting={sortingState}
            onSortingChange={setSortingState}
            rowSelection={
              rowSelection
                ? {
                    checked: areAllVisibleRowsSelected,
                    indeterminate: areSomeVisibleRowsSelected,
                    disabled: visibleRowKeys.length === 0,
                    onToggle: toggleVisibleRows
                  }
                : undefined
            }
          />
          <GrydeBody
            rows={visibleRows}
            columns={visibleColumns}
            getRowId={getRowId}
            emptyMessage={emptyMessage}
            selectedRowKeySet={selectedRowKeySet}
            selectionEnabled={Boolean(rowSelection)}
            onRowToggle={toggleRow}
          />
        </table>
      </div>
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
