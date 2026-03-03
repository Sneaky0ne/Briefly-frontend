"use client";

import { useLocalStorageState } from "@/shared/lib/use-local-storage";
import type { UserRole } from "@/shared/model/role";

const STORAGE_KEY = "briefly.role";

export function useRole() {
  const [role, setRole] = useLocalStorageState<UserRole>(STORAGE_KEY, "brand_manager");
  return { role, setRole } as const;
}

