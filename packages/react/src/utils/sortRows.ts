import type { GrydeColumn, SortingState } from "../models";

const compareValues = (leftValue: unknown, rightValue: unknown) => {
  if (leftValue === rightValue) {
    return 0;
  }

  if (leftValue === null || leftValue === undefined) {
    return 1;
  }

  if (rightValue === null || rightValue === undefined) {
    return -1;
  }

  if (typeof leftValue === "number" && typeof rightValue === "number") {
    return leftValue - rightValue;
  }

  if (leftValue instanceof Date && rightValue instanceof Date) {
    return leftValue.getTime() - rightValue.getTime();
  }

  if (typeof leftValue === "boolean" && typeof rightValue === "boolean") {
    return Number(leftValue) - Number(rightValue);
  }

  return String(leftValue).localeCompare(String(rightValue), undefined, {
    numeric: true,
    sensitivity: "base"
  });
};

export const sortRows = <TRow>(
  rows: readonly TRow[],
  columns: readonly GrydeColumn<TRow>[],
  sorting: SortingState
) => {
  const activeSorting = sorting[0];

  if (!activeSorting) {
    return [...rows];
  }

  const column = columns.find((candidate) => candidate.id === activeSorting.columnId);

  if (!column?.accessor) {
    return [...rows];
  }

  const directionMultiplier = activeSorting.direction === "asc" ? 1 : -1;

  return rows
    .map((row, index) => ({ row, index }))
    .sort((left, right) => {
      const comparison =
        compareValues(column.accessor?.(left.row), column.accessor?.(right.row)) *
        directionMultiplier;

      return comparison === 0 ? left.index - right.index : comparison;
    })
    .map(({ row }) => row);
};
