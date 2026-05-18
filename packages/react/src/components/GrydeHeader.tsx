import type { GrydeColumn } from "../models";
import styles from "../styles/gryde.module.css";

interface GrydeHeaderProps<TRow> {
  columns: readonly GrydeColumn<TRow>[];
}

export const GrydeHeader = <TRow,>({ columns }: GrydeHeaderProps<TRow>) => {
  return (
    <thead className={styles.header}>
      <tr>
        {columns.map((column) => (
          <th
            key={column.id}
            className={styles.headerCell}
            style={{ width: column.width, textAlign: column.align }}
            scope="col"
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};
