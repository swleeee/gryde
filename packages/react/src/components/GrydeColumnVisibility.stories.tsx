import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnVisibilityState } from "../models";
import { GrydeColumnVisibilitySelect } from "./GrydeColumnVisibilitySelect";
import { columns, UserGryde, grydeArgs } from "./Gryde.story-fixtures";

const meta = {
  title: "Gryde/Column Visibility",
  component: UserGryde,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: grydeArgs
} satisfies Meta<typeof UserGryde>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Client: Story = {
  args: {
    columnVisibility: {
      defaultValue: { email: false, status: false }
    }
  }
};

export const Controlled: Story = {
  render: (args) => {
    const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({
      email: false
    });

    return (
      <UserGryde
        {...args}
        columnVisibility={{ value: columnVisibility, onChange: setColumnVisibility }}
      />
    );
  }
};

export const Selector: Story = {
  render: (args) => {
    const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({
      email: false
    });

    return (
      <div style={{ display: "grid", gap: 12 }}>
        <GrydeColumnVisibilitySelect
          columns={columns}
          value={columnVisibility}
          onChange={setColumnVisibility}
        />
        <UserGryde
          {...args}
          columnVisibility={{ value: columnVisibility, onChange: setColumnVisibility }}
        />
      </div>
    );
  }
};
