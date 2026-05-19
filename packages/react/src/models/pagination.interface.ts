export interface PaginationState {
  page: number;
  pageSize: number;
}

export interface PaginationConfig {
  value?: PaginationState;
  defaultValue?: PaginationState;
  onChange?: (nextPagination: PaginationState) => void;
  pageSizeOptions?: readonly number[];
}
