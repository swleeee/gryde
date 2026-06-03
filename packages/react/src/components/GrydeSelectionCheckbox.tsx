import { useEffect, useRef } from "react";
import styles from "../styles/gryde.module.css";

interface GrydeSelectionCheckboxProps {
  checked: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  label: string;
  onChange: () => void;
}

export const GrydeSelectionCheckbox = ({
  checked,
  disabled = false,
  indeterminate = false,
  label,
  onChange
}: GrydeSelectionCheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={inputRef}
      aria-label={label}
      checked={checked}
      className={styles.selectionCheckbox}
      disabled={disabled}
      type="checkbox"
      onChange={onChange}
    />
  );
};
