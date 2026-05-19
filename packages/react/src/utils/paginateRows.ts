import type { PaginationState } from "../models";

export const getPageCount = (totalCount: number, pageSize: number) => {
  if (pageSize <= 0) {
    return 1;
  }

  if (totalCount <= 0) {
    return 1;
  }

  return Math.max(1, Math.ceil(totalCount / pageSize));
};

export const clampPage = (page: number, pageCount: number) => {
  return Math.min(Math.max(page, 1), pageCount);
};

export const paginateRows = <TRow>(rows: readonly TRow[], { page, pageSize }: PaginationState) => {
  const safePageSize = Math.max(1, pageSize);
  const pageCount = getPageCount(rows.length, safePageSize);
  const currentPage = clampPage(page, pageCount);
  const startIndex = (currentPage - 1) * safePageSize;

  return rows.slice(startIndex, startIndex + safePageSize);
};
