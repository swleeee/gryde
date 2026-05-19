import { describe, expect, it } from "vitest";
import type { GrydeColumn, SortingState } from "../models";
import { sortRows } from "./sortRows";

interface User {
  id: number;
  name: string;
  amount: number | null;
  active: boolean;
}

const rows: User[] = [
  { id: 1, name: "Grace", amount: 300, active: true },
  { id: 2, name: "ada", amount: 100, active: false },
  { id: 3, name: "Evelyn", amount: null, active: true },
  { id: 4, name: "Ada", amount: 100, active: false }
];

const columns: GrydeColumn<User>[] = [
  {
    id: "name",
    header: "Name",
    accessor: (row) => row.name
  },
  {
    id: "amount",
    header: "Amount",
    accessor: (row) => row.amount
  },
  {
    id: "active",
    header: "Active",
    accessor: (row) => row.active
  }
];

describe("sortRows", () => {
  it("정렬 상태가 비어 있으면 원본 순서를 유지한다", () => {
    expect(sortRows(rows, columns, [])).toEqual(rows);
  });

  it("오름차순으로 rows를 정렬한다", () => {
    const sorting: SortingState = [{ columnId: "amount", direction: "asc" }];

    expect(sortRows(rows, columns, sorting).map((row) => row.id)).toEqual([2, 4, 1, 3]);
  });

  it("내림차순으로 rows를 정렬한다", () => {
    const sorting: SortingState = [{ columnId: "name", direction: "desc" }];

    expect(sortRows(rows, columns, sorting).map((row) => row.id)).toEqual([1, 3, 2, 4]);
  });

  it("같은 값끼리는 기존 상대 순서를 유지한다", () => {
    const sorting: SortingState = [{ columnId: "active", direction: "asc" }];

    expect(sortRows(rows, columns, sorting).map((row) => row.id)).toEqual([2, 4, 1, 3]);
  });

  it("정렬 대상 column에 accessor가 없으면 원본 순서를 유지한다", () => {
    const sorting: SortingState = [{ columnId: "missing", direction: "asc" }];

    expect(sortRows(rows, columns, sorting)).toEqual(rows);
  });
});
