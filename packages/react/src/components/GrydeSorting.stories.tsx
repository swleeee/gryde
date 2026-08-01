import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SortingState } from "../models";
import { UserGryde, grydeArgs } from "./Gryde.story-fixtures";

const meta = {
  title: "Gryde/Sorting",
  component: UserGryde,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: grydeArgs
} satisfies Meta<typeof UserGryde>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Client: Story = {
  args: {
    sorting: {
      defaultValue: [{ columnId: "amount", direction: "desc" }]
    }
  }
};

export const Controlled: Story = {
  render: (args) => {
    const [sorting, setSorting] = useState<SortingState>([{ columnId: "name", direction: "asc" }]);

    return <UserGryde {...args} sorting={{ value: sorting, onChange: setSorting }} />;
  }
};
