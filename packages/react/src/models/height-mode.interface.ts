export interface AdaptiveHeightOptions {
  type: "adaptive";
  minRows?: number;
  maxRows: number;
  rowHeight: number;
  headerHeight?: number;
  footerHeight?: number;
}

export type GrydeHeightMode = AdaptiveHeightOptions;
