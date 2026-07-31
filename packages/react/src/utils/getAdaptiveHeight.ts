import type { AdaptiveHeightOptions } from "../models";

export interface GetAdaptiveHeightOptions extends AdaptiveHeightOptions {
  rowCount: number;
}

export interface AdaptiveHeightResult {
  height: number;
  minHeight: number;
  maxHeight: number;
  visibleRowCount: number;
}

/**
 * 데이터 row 수에 따라 grid가 차지할 adaptive height 범위를 계산합니다.
 *
 * - `minRows`보다 row가 적으면 빈 공간을 포함한 최소 높이를 유지합니다.
 * - `maxRows`보다 row가 많으면 최대 높이를 유지해 내부 스크롤을 유도합니다.
 * - header/footer는 row 영역과 별도로 항상 높이에 포함됩니다.
 */
export const getAdaptiveHeight = ({
  rowCount,
  minRows = 0,
  maxRows,
  rowHeight,
  headerHeight = 0,
  footerHeight = 0
}: GetAdaptiveHeightOptions): AdaptiveHeightResult => {
  const safeMaxRows = Math.max(maxRows, 1);
  const safeMinRows = Math.min(Math.max(minRows, 0), safeMaxRows);
  const safeRowCount = Math.max(rowCount, 0);
  const safeRowHeight = Math.max(rowHeight, 0);
  const visibleRowCount = Math.min(Math.max(safeRowCount, safeMinRows), safeMaxRows);
  const fixedHeight = headerHeight + footerHeight;

  return {
    height: fixedHeight + visibleRowCount * safeRowHeight,
    minHeight: fixedHeight + safeMinRows * safeRowHeight,
    maxHeight: fixedHeight + safeMaxRows * safeRowHeight,
    visibleRowCount
  };
};
