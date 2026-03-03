"use client";

import { cn } from "@/shared/lib/cn";
import { useLocalStorageState } from "@/shared/lib/use-local-storage";
import { ROLE_LABEL, ROLE_ORDER, type UserRole } from "@/shared/model/role";

const STORAGE_KEY = "briefly.role";

export function RoleSwitcher() {
  const [role, setRole] = useLocalStorageState<UserRole>(STORAGE_KEY, "brand_manager");

  return (
    <select
      className={cn(
        "h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      value={role}
      onChange={(e) => setRole(e.target.value as UserRole)}
      aria-label="Роль"
    >
      {ROLE_ORDER.map((r) => (
        <option key={r} value={r}>
          {ROLE_LABEL[r]}
        </option>
      ))}
    </select>
  );
}

