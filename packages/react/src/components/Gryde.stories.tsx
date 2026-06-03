import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Gryde } from "./Gryde";
import type {
  ColumnVisibilityState,
  GrydeColumn,
  PaginationState,
  RowKey,
  SortingState
} from "../models";

interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  amount: number;
}

const users: User[] = [
  {
    id: 1,
    name: "Ada Lovelace",
    email: "ada@example.com",
    status: "active",
    amount: 128000
  },
  {
    id: 2,
    name: "Grace Hopper",
    email: "grace@example.com",
    status: "active",
    amount: 96000
  },
  {
    id: 3,
    name: "Evelyn Boyd",
    email: "evelyn@example.com",
    status: "inactive",
    amount: 74000
  },
  {
    id: 4,
    name: "Katherine Johnson",
    email: "katherine@example.com",
    status: "active",
    amount: 112000
  },
  {
    id: 5,
    name: "Mary Jackson",
    email: "mary@example.com",
    status: "inactive",
    amount: 88000
  },
  {
    id: 6,
    name: "Dorothy Vaughan",
    email: "dorothy@example.com",
    status: "active",
    amount: 104000
  },
  {
    id: 7,
    name: "Joan Clarke",
    email: "joan@example.com",
    status: "active",
    amount: 91000
  }
];

const columns: GrydeColumn<User>[] = [
  {
    id: "name",
    header: "Name",
    accessor: (row) => row.name,
    sortable: true,
    width: "24%"
  },
  {
    id: "email",
    header: "Email",
    accessor: (row) => row.email,
    sortable: true,
    width: "34%"
  },
  {
    id: "status",
    header: "Status",
    render: ({ row }) => (
      <span
        style={{
          color: row.status === "active" ? "#067647" : "#667085",
          fontWeight: 600,
          textTransform: "capitalize"
        }}
      >
        {row.status}
      </span>
    ),
    width: "18%"
  },
  {
    id: "amount",
    header: "Amount",
    accessor: (row) => row.amount,
    format: (value) => (typeof value === "number" ? `$${value.toLocaleString()}` : null),
    sortable: true,
    align: "right",
    width: "24%"
  }
];

const UserGryde = Gryde<User>;

const meta = {
  title: "Gryde/Basic",
  component: UserGryde,
  parameters: {
    layout: "padded"
  },
  tags: ["autodocs"],
  args: {
    rows: users,
    columns,
    getRowId: (row) => row.id
  }
} satisfies Meta<typeof UserGryde>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {}
};

export const Empty: Story = {
  args: {
    rows: [],
    emptyMessage: "No users"
  }
};

export const ClientSorting: Story = {
  args: {
    sorting: {
      defaultValue: [{ columnId: "amount", direction: "desc" }]
    }
  }
};

export const ControlledSorting: Story = {
  render: (args) => {
    const [sorting, setSorting] = useState<SortingState>([{ columnId: "name", direction: "asc" }]);

    return (
      <Gryde
        {...args}
        sorting={{
          value: sorting,
          onChange: setSorting
        }}
      />
    );
  }
};

export const ClientPagination: Story = {
  args: {
    pagination: {
      defaultValue: {
        page: 1,
        pageSize: 3
      },
      pageSizeOptions: [2, 3, 5]
    }
  }
};

export const ControlledPagination: Story = {
  render: (args) => {
    const [pagination, setPagination] = useState<PaginationState>({
      page: 1,
      pageSize: 3
    });

    return (
      <Gryde
        {...args}
        pagination={{
          value: pagination,
          onChange: setPagination,
          pageSizeOptions: [2, 3, 5]
        }}
      />
    );
  }
};

export const RowSelection: Story = {
  args: {
    rowSelection: {
      defaultSelectedRowKeys: [2]
    },
    pagination: {
      defaultValue: {
        page: 1,
        pageSize: 3
      },
      pageSizeOptions: [3, 5]
    }
  }
};

export const ControlledRowSelection: Story = {
  render: (args) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<RowKey[]>([1, 3]);

    return (
      <Gryde
        {...args}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys
        }}
      />
    );
  }
};

export const ColumnVisibility: Story = {
  args: {
    columnVisibility: {
      defaultValue: {
        email: false,
        status: false
      }
    }
  }
};

export const ControlledColumnVisibility: Story = {
  render: (args) => {
    const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({
      email: false
    });

    return (
      <div style={{ display: "grid", gap: 12 }}>
        <label>
          <input
            checked={columnVisibility.email !== false}
            type="checkbox"
            onChange={(event) =>
              setColumnVisibility((previousVisibility) => ({
                ...previousVisibility,
                email: event.target.checked
              }))
            }
          />{" "}
          Show email
        </label>
        <Gryde
          {...args}
          columnVisibility={{
            value: columnVisibility,
            onChange: setColumnVisibility
          }}
        />
      </div>
    );
  }
};
