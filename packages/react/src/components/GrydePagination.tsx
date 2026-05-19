import type { Dispatch, SetStateAction } from "react";
import type { PaginationState } from "../models";
import { clampPage, getPageCount } from "../utils";
import styles from "../styles/gryde.module.css";

interface GrydePaginationProps {
  pagination: PaginationState;
  totalCount: number;
  pageSizeOptions: readonly number[];
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>;
}

export const GrydePagination = ({
  pagination,
  totalCount,
  pageSizeOptions,
  onPaginationChange
}: GrydePaginationProps) => {
  const pageCount = getPageCount(totalCount, pagination.pageSize);
  const currentPage = clampPage(pagination.page, pageCount);
  const startRow = totalCount === 0 ? 0 : (currentPage - 1) * pagination.pageSize + 1;
  const endRow = Math.min(currentPage * pagination.pageSize, totalCount);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <div className={styles.paginationSummary}>
        {startRow}-{endRow} of {totalCount}
      </div>

      <label className={styles.pageSizeControl}>
        <span>Rows</span>
        <span className={styles.pageSizeSelectWrap}>
          <select
            className={styles.pageSizeSelect}
            value={pagination.pageSize}
            onChange={(event) =>
              onPaginationChange({
                page: 1,
                pageSize: Number(event.target.value)
              })
            }
          >
            {pageSizeOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </span>
      </label>

      <div className={styles.paginationControls}>
        <button
          className={styles.paginationButton}
          type="button"
          disabled={currentPage <= 1}
          onClick={() =>
            onPaginationChange((previousPagination) => ({
              ...previousPagination,
              page: clampPage(currentPage - 1, pageCount)
            }))
          }
        >
          Prev
        </button>
        <span className={styles.pageIndicator}>
          {currentPage} / {pageCount}
        </span>
        <button
          className={styles.paginationButton}
          type="button"
          disabled={currentPage >= pageCount}
          onClick={() =>
            onPaginationChange((previousPagination) => ({
              ...previousPagination,
              page: clampPage(currentPage + 1, pageCount)
            }))
          }
        >
          Next
        </button>
      </div>
    </nav>
  );
};
