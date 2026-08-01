import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { GrydePreset } from "../models";
import { GrydePresetSelect } from "./GrydePresetSelect";
import { UserGryde, grydeArgs } from "./Gryde.story-fixtures";

const presets: GrydePreset[] = [
  {
    id: "default",
    label: "Default view",
    state: {
      sorting: [{ columnId: "amount", direction: "desc" }],
      pagination: { page: 1, pageSize: 3 },
      columnVisibility: { status: false },
      density: "normal"
    }
  },
  {
    id: "compact",
    label: "Compact view",
    state: {
      sorting: [{ columnId: "name", direction: "asc" }],
      pagination: { page: 1, pageSize: 5 },
      columnVisibility: { email: false, status: false },
      density: "compact"
    },
    layout: {
      heightMode: { type: "adaptive", minRows: 3, maxRows: 6, rowHeight: 36 }
    }
  },
  {
    id: "comfortable",
    label: "Comfortable view",
    state: {
      sorting: [{ columnId: "amount", direction: "desc" }],
      pagination: { page: 1, pageSize: 5 },
      columnVisibility: {},
      density: "comfortable"
    },
    layout: {
      heightMode: { type: "adaptive", minRows: 3, maxRows: 6, rowHeight: 52 }
    }
  }
];

const meta = {
  title: "Gryde/View Preset",
  component: UserGryde,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: grydeArgs
} satisfies Meta<typeof UserGryde>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selector: Story = {
  render: (args) => {
    const [activePresetId, setActivePresetId] = useState(presets[0].id);
    const activePreset = presets.find((preset) => preset.id === activePresetId);

    return (
      <div style={{ display: "grid", gap: 12 }}>
        <GrydePresetSelect presets={presets} value={activePresetId} onChange={setActivePresetId} />
        <UserGryde {...args} preset={activePreset} />
      </div>
    );
  },
  args: {
    pagination: { pageSizeOptions: [3, 5] }
  }
};
