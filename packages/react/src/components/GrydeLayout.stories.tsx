import type { Meta, StoryObj } from "@storybook/react-vite";
import { manyUsers, UserGryde, users, grydeArgs } from "./Gryde.story-fixtures";

const meta = {
  title: "Gryde/Layout",
  component: UserGryde,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: grydeArgs
} satisfies Meta<typeof UserGryde>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Density: Story = {
  args: {
    density: "compact",
    pagination: {
      defaultValue: { page: 1, pageSize: 5 },
      pageSizeOptions: [3, 5]
    }
  }
};

export const AdaptiveHeightEmpty: Story = {
  args: {
    rows: [],
    heightMode: { type: "adaptive", minRows: 3, maxRows: 10, rowHeight: 44 }
  }
};

export const AdaptiveHeightFewRows: Story = {
  args: {
    rows: users.slice(0, 3),
    heightMode: { type: "adaptive", minRows: 3, maxRows: 10, rowHeight: 44 }
  }
};

export const AdaptiveHeightManyRows: Story = {
  args: {
    rows: manyUsers,
    heightMode: { type: "adaptive", minRows: 3, maxRows: 10, rowHeight: 44 }
  }
};
