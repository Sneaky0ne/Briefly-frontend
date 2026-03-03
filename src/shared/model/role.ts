export type UserRole = "brand_admin" | "brand_manager" | "brand_analyst" | "creator";

export const ROLE_LABEL: Record<UserRole, string> = {
  brand_admin: "Админ бренда",
  brand_manager: "Менеджер",
  brand_analyst: "Аналитик",
  creator: "Креатор"
};

export const ROLE_ORDER: UserRole[] = ["brand_admin", "brand_manager", "brand_analyst", "creator"];

