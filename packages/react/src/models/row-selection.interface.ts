import type { RowKey } from "./row-key.type";

export interface RowSelectionConfig {
  selectedRowKeys?: RowKey[];
  defaultSelectedRowKeys?: RowKey[];
  onChange?: (selectedRowKeys: RowKey[]) => void;
}
