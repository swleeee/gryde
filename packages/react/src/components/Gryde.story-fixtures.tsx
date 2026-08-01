import type { GrydeColumn } from "../models";
import { Gryde } from "./Gryde";

export interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  amount: number;
}

export const users: User[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com", status: "active", amount: 128000 },
  { id: 2, name: "Grace Hopper", email: "grace@example.com", status: "active", amount: 96000 },
  { id: 3, name: "Evelyn Boyd", email: "evelyn@example.com", status: "inactive", amount: 74000 },
  {
    id: 4,
    name: "Katherine Johnson",
    email: "katherine@example.com",
    status: "active",
    amount: 112000
  },
  { id: 5, name: "Mary Jackson", email: "mary@example.com", status: "inactive", amount: 88000 },
  {
    id: 6,
    name: "Dorothy Vaughan",
    email: "dorothy@example.com",
    status: "active",
    amount: 104000
  },
  { id: 7, name: "Joan Clarke", email: "joan@example.com", status: "active", amount: 91000 }
];

export const manyUsers = Array.from(
  { length: 100 },
  (_, index): User => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    status: index % 3 === 0 ? "inactive" : "active",
    amount: 50000 + index * 1000
  })
);

export const columns: GrydeColumn<User>[] = [
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

export const UserGryde = Gryde<User>;

export const grydeArgs = {
  rows: users,
  columns,
  getRowId: (row: User) => row.id
};
