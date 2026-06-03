export interface ColumnVisibilityState {
  [columnId: string]: boolean;
}

export interface ColumnVisibilityConfig {
  value?: ColumnVisibilityState;
  defaultValue?: ColumnVisibilityState;
  onChange?: (nextColumnVisibility: ColumnVisibilityState) => void;
}
