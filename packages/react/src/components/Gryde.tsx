import styles from "../styles/gryde.module.css";
import "../styles/variables.css";
import type { GrydeProps } from "../models";
import { cx } from "../utils/cx";
import { GrydeBody } from "./GrydeBody";
import { GrydeHeader } from "./GrydeHeader";

export const Gryde = <TRow,>({
  rows,
  columns,
  getRowId,
  emptyMessage = "No rows",
  className,
  "aria-label": ariaLabel
}: GrydeProps<TRow>) => {
  return (
    <div className={cx(styles.root, className)}>
      <table className={styles.table}>
        {ariaLabel ? <caption className={styles.visuallyHidden}>{ariaLabel}</caption> : null}
        <GrydeHeader columns={columns} />
        <GrydeBody rows={rows} columns={columns} getRowId={getRowId} emptyMessage={emptyMessage} />
      </table>
    </div>
  );
};
