import type { Dispatch, SetStateAction } from "react";
import type { GrydeColumn, SortingState } from "../models";
import styles from "../styles/gryde.module.css";

interface GrydeHeaderProps<TRow> {
  columns: readonly GrydeColumn<TRow>[];
  sorting: SortingState;
  onSortingChange: Dispatch<SetStateAction<SortingState>>;
}

const getAriaSort = (columnId: string, sorting: SortingState) => {
  const activeSorting = sorting[0];

  if (activeSorting?.columnId !== columnId) {
    return "none";
  }

  return activeSorting.direction === "asc" ? "ascending" : "descending";
};

const getSortIndicator = (columnId: string, sorting: SortingState) => {
  const activeSorting = sorting[0];

  if (activeSorting?.columnId !== columnId) {
    return null;
  }

  return activeSorting.direction === "asc" ? "↑" : "↓";
};

const getNextSorting = (columnId: string, sorting: SortingState): SortingState => {
  const activeSorting = sorting[0];

  if (activeSorting?.columnId !== columnId) {
    return [{ columnId, direction: "asc" }];
  }

  if (activeSorting.direction === "asc") {
    return [{ columnId, direction: "desc" }];
  }

  return [];
};

export const GrydeHeader = <TRow,>({
  columns,
  sorting,
  onSortingChange
}: GrydeHeaderProps<TRow>) => {
  return (
    <thead className={styles.header}>
      <tr>
        {columns.map((column) => {
          const ariaSort = column.sortable ? getAriaSort(column.id, sorting) : undefined;
          const sortIndicator = getSortIndicator(column.id, sorting);

          return (
            <th
              key={column.id}
              className={styles.headerCell}
              style={{ width: column.width, textAlign: column.align }}
              scope="col"
              aria-sort={ariaSort}
            >
              {column.sortable ? (
                <button
                  className={styles.sortButton}
                  type="button"
                  onClick={() => onSortingChange(getNextSorting(column.id, sorting))}
                >
                  <span>{column.header}</span>
                  {sortIndicator ? (
                    <span className={styles.sortIndicator} aria-hidden="true">
                      {sortIndicator}
                    </span>
                  ) : null}
                </button>
              ) : (
                column.header
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
