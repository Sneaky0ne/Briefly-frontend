"use client";

import * as React from "react";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = React.useState<T>(initialValue);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return;
      setState(JSON.parse(raw) as T);
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set: React.Dispatch<React.SetStateAction<T>> = React.useCallback(
    (next) => {
      setState((prev) => {
        const resolved = typeof next === "function" ? (next as (v: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // ignore
        }
        return resolved;
      });
    },
    [key]
  );

  return [state, set] as const;
}

