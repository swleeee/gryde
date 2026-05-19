export type SortingDirection = "asc" | "desc";

export interface SortingItem {
  columnId: string;
  direction: SortingDirection;
}

export interface SortingConfig {
  value?: SortingState;
  defaultValue?: SortingState;
  onChange?: (nextSorting: SortingState) => void;
}

export type SortingState = SortingItem[];
