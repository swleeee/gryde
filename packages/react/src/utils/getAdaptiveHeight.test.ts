import { describe, expect, it } from "vitest";
import { getAdaptiveHeight } from "./getAdaptiveHeight";

describe("getAdaptiveHeight 유틸", () => {
  it("minRows보다 적은 row가 있으면 최소 높이를 반환한다", () => {
    expect(
      getAdaptiveHeight({
        type: "adaptive",
        rowCount: 1,
        minRows: 3,
        maxRows: 10,
        rowHeight: 44,
        headerHeight: 44
      })
    ).toMatchObject({
      height: 176,
      minHeight: 176,
      maxHeight: 484,
      visibleRowCount: 3
    });
  });

  it("minRows와 maxRows 사이에서는 row 수에 맞는 높이를 반환한다", () => {
    expect(
      getAdaptiveHeight({
        type: "adaptive",
        rowCount: 5,
        minRows: 3,
        maxRows: 10,
        rowHeight: 44,
        headerHeight: 44,
        footerHeight: 40
      })
    ).toMatchObject({
      height: 304,
      minHeight: 216,
      maxHeight: 524,
      visibleRowCount: 5
    });
  });

  it("maxRows보다 많은 row가 있으면 최대 높이를 반환한다", () => {
    expect(
      getAdaptiveHeight({
        type: "adaptive",
        rowCount: 100,
        minRows: 3,
        maxRows: 10,
        rowHeight: 44,
        headerHeight: 44
      })
    ).toMatchObject({
      height: 484,
      maxHeight: 484,
      visibleRowCount: 10
    });
  });
});
