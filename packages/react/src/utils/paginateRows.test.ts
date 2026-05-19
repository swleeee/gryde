import { describe, expect, it } from "vitest";
import { clampPage, getPageCount, paginateRows } from "./paginateRows";

const rows = [1, 2, 3, 4, 5, 6, 7];

describe("paginateRows 유틸", () => {
  it("현재 page에 해당하는 rows를 반환한다", () => {
    expect(paginateRows(rows, { page: 2, pageSize: 3 })).toEqual([4, 5, 6]);
  });

  it("마지막 page의 남은 rows를 반환한다", () => {
    expect(paginateRows(rows, { page: 3, pageSize: 3 })).toEqual([7]);
  });

  it("page가 최소 범위보다 작으면 첫 page를 사용한다", () => {
    expect(paginateRows(rows, { page: 0, pageSize: 3 })).toEqual([1, 2, 3]);
  });

  it("page가 최대 범위보다 크면 마지막 page를 사용한다", () => {
    expect(paginateRows(rows, { page: 99, pageSize: 3 })).toEqual([7]);
  });

  it("pageSize가 유효하지 않으면 최소 pageSize를 사용한다", () => {
    expect(paginateRows(rows, { page: 1, pageSize: 0 })).toEqual([1]);
  });
});

describe("getPageCount 유틸", () => {
  it("전체 row 수와 pageSize로 총 page 수를 계산한다", () => {
    expect(getPageCount(7, 3)).toBe(3);
  });

  it("row가 없어도 최소 1 page를 반환한다", () => {
    expect(getPageCount(0, 10)).toBe(1);
  });

  it("pageSize가 유효하지 않으면 최소 1 page를 반환한다", () => {
    expect(getPageCount(7, 0)).toBe(1);
  });
});

describe("clampPage 유틸", () => {
  it("page를 유효 범위 안으로 제한한다", () => {
    expect(clampPage(0, 3)).toBe(1);
    expect(clampPage(4, 3)).toBe(3);
    expect(clampPage(2, 3)).toBe(2);
  });
});
