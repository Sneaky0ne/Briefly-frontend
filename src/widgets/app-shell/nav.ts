import type { LucideIcon } from "lucide-react";
import { BarChart3, FolderKanban, Home, Settings, Users, ClipboardList, Building2 } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  Icon: LucideIcon;
};

export const NAV: NavItem[] = [
  { href: "/dashboard", label: "Обзор", Icon: Home },
  { href: "/brand", label: "Кабинет бренда", Icon: Building2 },
  { href: "/projects", label: "Проекты", Icon: FolderKanban },
  { href: "/tasks", label: "Задачи", Icon: ClipboardList },
  { href: "/creators", label: "Креаторы", Icon: Users },
  { href: "/analytics", label: "Аналитика", Icon: BarChart3 },
  { href: "/settings", label: "Настройки", Icon: Settings }
];

