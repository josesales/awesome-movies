import { useRef } from "react";

export const useDebounce = (delay: number) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = <T extends (...args: any[]) => void>(func: T) => {
    return (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  return debouncedFunction;
};
