import { AppShell } from "@/widgets/app-shell/AppShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

