import { describe, expect, it } from "vitest";
import type { GrydeColumn } from "../models";
import { getVisibleColumns } from "./getVisibleColumns";

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: GrydeColumn<User>[] = [
  {
    id: "name",
    header: "Name",
    accessor: (row) => row.name
  },
  {
    id: "email",
    header: "Email",
    accessor: (row) => row.email
  }
];

describe("getVisibleColumns 유틸", () => {
  it("column visibility가 비어 있으면 모든 columns를 반환한다", () => {
    expect(getVisibleColumns(columns, {})).toEqual(columns);
  });

  it("false로 설정된 column을 제외한다", () => {
    expect(getVisibleColumns(columns, { email: false }).map((column) => column.id)).toEqual([
      "name"
    ]);
  });

  it("true로 설정된 column은 표시한다", () => {
    expect(getVisibleColumns(columns, { email: true }).map((column) => column.id)).toEqual([
      "name",
      "email"
    ]);
  });
});
