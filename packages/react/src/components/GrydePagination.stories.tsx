import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { PaginationState } from "../models";
import { UserGryde, grydeArgs } from "./Gryde.story-fixtures";

const meta = {
  title: "Gryde/Pagination",
  component: UserGryde,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: grydeArgs
} satisfies Meta<typeof UserGryde>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Client: Story = {
  args: {
    pagination: {
      defaultValue: { page: 1, pageSize: 3 },
      pageSizeOptions: [2, 3, 5]
    }
  }
};

export const Controlled: Story = {
  render: (args) => {
    const [pagination, setPagination] = useState<PaginationState>({ page: 1, pageSize: 3 });

    return (
      <UserGryde
        {...args}
        pagination={{ value: pagination, onChange: setPagination, pageSizeOptions: [2, 3, 5] }}
      />
    );
  }
};
