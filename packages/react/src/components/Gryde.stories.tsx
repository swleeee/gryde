import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Gryde } from "./Gryde";
import type { GrydeColumn, SortingState } from "../models";

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
