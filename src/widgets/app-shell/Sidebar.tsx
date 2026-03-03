"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { cn } from "@/shared/lib/cn";
import { useLocalStorageState } from "@/shared/lib/use-local-storage";
import { Button } from "@/shared/ui/button";
import { NAV } from "@/widgets/app-shell/nav";
import { UserProfile } from "@/widgets/app-shell/UserProfile";

const STORAGE_KEY = "briefly.sidebar.collapsed";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useLocalStorageState<boolean>(STORAGE_KEY, false);

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-dvh shrink-0 flex-col border-r bg-background md:flex",
        collapsed ? "w-[72px]" : "w-[264px]"
      )}
    >
      <div className={cn("flex items-center gap-2 p-4", collapsed ? "justify-center" : "justify-between")}>
        <Link href="/" className={cn("font-semibold tracking-tight", collapsed ? "sr-only" : "text-base")}>
          Briefly
        </Link>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Развернуть меню" : "Свернуть меню"}
        >
          {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 px-2 pb-4">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className={cn("truncate", collapsed && "sr-only")}>{label}</span>
            </Link>
          );
        })}
      </nav>

      <UserProfile collapsed={collapsed} />
    </aside>
  );
}

