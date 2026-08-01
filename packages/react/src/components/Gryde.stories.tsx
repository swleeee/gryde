import type { Meta, StoryObj } from "@storybook/react-vite";
import { UserGryde, grydeArgs } from "./Gryde.story-fixtures";

const meta = {
  title: "Gryde/Basic",
  component: UserGryde,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: grydeArgs
} satisfies Meta<typeof UserGryde>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: {} };

export const Empty: Story = {
  args: {
    rows: [],
    emptyMessage: "No users"
  }
};
