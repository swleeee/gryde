import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Gryde } from "./Gryde";
import type { GrydeColumn, GrydePreset } from "../models";

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

describe("Gryde column visibility", () => {
  it("false로 설정된 column은 렌더링하지 않는다", () => {
    render(
      <Gryde
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        columnVisibility={{ defaultValue: { name: false } }}
      />
    );

    expect(screen.queryByText("Name")).not.toBeInTheDocument();
    expect(screen.queryByText("Ada")).not.toBeInTheDocument();
  });
});

describe("Gryde density", () => {
  it("compact density class를 root에 적용한다", () => {
    const { container } = render(
      <Gryde rows={rows} columns={columns} getRowId={(row) => row.id} density="compact" />
    );

    expect(container.firstChild).toHaveClass("densityCompact");
  });

  it("comfortable density class를 root에 적용한다", () => {
    const { container } = render(
      <Gryde rows={rows} columns={columns} getRowId={(row) => row.id} density="comfortable" />
    );

    expect(container.firstChild).toHaveClass("densityComfortable");
  });
});

describe("Gryde adaptive height", () => {
  it("minRows와 maxRows 기준의 높이를 root에 적용한다", () => {
    const { container } = render(
      <Gryde
        rows={rows.slice(0, 1)}
        columns={columns}
        getRowId={(row) => row.id}
        heightMode={{
          type: "adaptive",
          minRows: 3,
          maxRows: 10,
          rowHeight: 44
        }}
      />
    );

    expect(container.firstChild).toHaveStyle({
      minHeight: "176px",
      maxHeight: "484px"
    });
  });
});

describe("Gryde view preset", () => {
  it("preset의 초기 grid 상태를 적용한다", () => {
    const preset: GrydePreset = {
      id: "compact",
      label: "Compact view",
      state: {
        columnVisibility: { name: false },
        density: "compact"
      },
      layout: {
        heightMode: {
          type: "adaptive",
          minRows: 3,
          maxRows: 10,
          rowHeight: 36
        }
      }
    };
    const { container } = render(
      <Gryde rows={rows.slice(0, 1)} columns={columns} getRowId={(row) => row.id} preset={preset} />
    );

    expect(screen.queryByText("Name")).not.toBeInTheDocument();
    expect(container.firstChild).toHaveClass("densityCompact");
    expect(container.firstChild).toHaveStyle({
      minHeight: "144px",
      maxHeight: "396px"
    });
  });

  it("preset id가 바뀌면 정의된 상태를 적용한다", async () => {
    const defaultPreset: GrydePreset = {
      id: "default",
      label: "Default view",
      state: {
        columnVisibility: { name: false }
      }
    };
    const detailedPreset: GrydePreset = {
      id: "detailed",
      label: "Detailed view",
      state: {
        columnVisibility: { name: true }
      }
    };
    const { rerender } = render(
      <Gryde rows={rows} columns={columns} getRowId={(row) => row.id} preset={defaultPreset} />
    );

    expect(screen.queryByText("Name")).not.toBeInTheDocument();

    rerender(
      <Gryde rows={rows} columns={columns} getRowId={(row) => row.id} preset={detailedPreset} />
    );

    await waitFor(() => expect(screen.getByText("Name")).toBeInTheDocument());
  });
});
