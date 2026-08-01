import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GrydePresetSelect } from "./GrydePresetSelect";
import type { GrydePreset } from "../models";

const presets: GrydePreset[] = [
  { id: "default", label: "Default view", state: {} },
  { id: "compact", label: "Compact view", state: {} }
];

describe("GrydePresetSelect", () => {
  it("선택한 preset id를 onChange로 전달한다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<GrydePresetSelect presets={presets} value="default" onChange={onChange} />);

    await user.selectOptions(screen.getByLabelText("View preset"), "compact");

    expect(onChange).toHaveBeenCalledWith("compact");
  });
});
