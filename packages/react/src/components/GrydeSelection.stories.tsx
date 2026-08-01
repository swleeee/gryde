import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { RowKey } from "../models";
import { UserGryde, grydeArgs } from "./Gryde.story-fixtures";

const meta = {
  title: "Gryde/Selection",
  component: UserGryde,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: grydeArgs
} satisfies Meta<typeof UserGryde>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Client: Story = {
  args: {
    rowSelection: { defaultSelectedRowKeys: [2] },
    pagination: {
      defaultValue: { page: 1, pageSize: 3 },
      pageSizeOptions: [3, 5]
    }
  }
};

export const Controlled: Story = {
  render: (args) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<RowKey[]>([1, 3]);

    return <UserGryde {...args} rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }} />;
  }
};
