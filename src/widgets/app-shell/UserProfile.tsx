"use client";

import { cn } from "@/shared/lib/cn";
import { ROLE_LABEL } from "@/shared/model/role";
import { useRole } from "@/shared/model/use-role";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
}

export function UserProfile({ collapsed }: { collapsed: boolean }) {
  const { role } = useRole();

  // demo-user (потом заменим на реальный профиль из auth)
  const name = "Марина";
  const title = ROLE_LABEL[role];

  return (
    <div className={cn("border-t p-3", collapsed && "px-2")}>
      <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold">
          {initials(name)}
        </div>
        <div className={cn("min-w-0", collapsed && "sr-only")}>
          <div className="truncate text-sm font-medium">{name}</div>
          <div className="truncate text-xs text-muted-foreground">{title}</div>
        </div>
      </div>
    </div>
  );
}

