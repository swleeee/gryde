import { useCallback, useState, type Dispatch, type SetStateAction } from "react";

export interface UseControlledStateOptions<TValue> {
  value?: TValue;
  defaultValue: TValue;
  onChange?: (nextValue: TValue) => void;
}

export type UseControlledStateReturn<TValue> = readonly [
  value: TValue,
  setValue: Dispatch<SetStateAction<TValue>>
];

export const useControlledState = <TValue>({
  value,
  defaultValue,
  onChange
}: UseControlledStateOptions<TValue>): UseControlledStateReturn<TValue> => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  const setValue: Dispatch<SetStateAction<TValue>> = useCallback(
    (nextValueOrUpdater) => {
      const nextValue =
        typeof nextValueOrUpdater === "function"
          ? (nextValueOrUpdater as (previousValue: TValue) => TValue)(currentValue)
          : nextValueOrUpdater;

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onChange?.(nextValue);
    },
    [currentValue, isControlled, onChange]
  );

  return [currentValue, setValue] as const;
};
