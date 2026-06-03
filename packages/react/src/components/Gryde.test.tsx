import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Gryde } from "./Gryde";
import type { GrydeColumn } from "../models";

interface User {
  id: number;
  name: string;
}

const rows: User[] = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Grace" },
  { id: 3, name: "Evelyn" }
];

const columns: GrydeColumn<User>[] = [
  {
    id: "name",
    header: "Name",
    accessor: (row) => row.name
  }
];

describe("Gryde row selection", () => {
  it("row checkbox를 클릭하면 해당 row key를 선택한다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Gryde rows={rows} columns={columns} getRowId={(row) => row.id} rowSelection={{ onChange }} />
    );

    await user.click(screen.getByLabelText("Select row 2"));

    expect(onChange).toHaveBeenCalledWith([2]);
  });

  it("header checkbox를 클릭하면 현재 page의 row key를 모두 선택한다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Gryde
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pagination={{
          defaultValue: { page: 1, pageSize: 2 }
        }}
        rowSelection={{ onChange }}
      />
    );

    await user.click(screen.getByLabelText("Select all visible rows"));

    expect(onChange).toHaveBeenCalledWith([1, 2]);
  });

  it("controlled selectedRowKeys를 checked 상태로 반영한다", () => {
    render(
      <Gryde
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        rowSelection={{ selectedRowKeys: [1, 3] }}
      />
    );

    expect(screen.getByLabelText("Select row 1")).toBeChecked();
    expect(screen.getByLabelText("Select row 2")).not.toBeChecked();
    expect(screen.getByLabelText("Select row 3")).toBeChecked();
  });
});
