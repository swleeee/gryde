import type { ChangeEvent } from "react";
import type { GrydePreset } from "../models";
import styles from "../styles/gryde.module.css";
import { cx } from "../utils";

export interface GrydePresetSelectProps {
  presets: readonly GrydePreset[];
  value: string;
  onChange: (presetId: string) => void;
  className?: string;
  "aria-label"?: string;
}

export const GrydePresetSelect = ({
  presets,
  value,
  onChange,
  className,
  "aria-label": ariaLabel = "View preset"
}: GrydePresetSelectProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select
      aria-label={ariaLabel}
      className={cx(styles.presetSelect, className)}
      value={value}
      onChange={handleChange}
    >
      {presets.map((preset) => (
        <option key={preset.id} value={preset.id}>
          {preset.label}
        </option>
      ))}
    </select>
  );
};
