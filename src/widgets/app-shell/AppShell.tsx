import { Sidebar } from "@/widgets/app-shell/Sidebar";
import { Topbar } from "@/widgets/app-shell/Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <div className="flex w-full">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Topbar />
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

