import Link from "next/link";

import { RoleSwitcher } from "@/widgets/app-shell/RoleSwitcher";

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="flex h-14 items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-sm font-semibold tracking-tight md:hidden">
            Briefly
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <RoleSwitcher />
        </div>
      </div>
    </header>
  );
}

