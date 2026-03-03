import type { Creator } from "@/entities/creator/model/types";
import type { Project } from "@/entities/project/model/types";
import type { Task } from "@/entities/task/model/types";

export const DEMO_CREATORS: Creator[] = [
  {
    id: "c-01",
    name: "Алина",
    handle: "@alina.ugc",
    socials: ["TikTok", "Reels"],
    rating: 4.7,
    completedTasks: 12,
    lateRate: 0.08
  },
  {
    id: "c-02",
    name: "Денис",
    handle: "@denis.content",
    socials: ["YouTube Shorts"],
    rating: 4.3,
    completedTasks: 7,
    lateRate: 0.14
  },
  {
    id: "c-03",
    name: "Мария",
    handle: "@maria.story",
    socials: ["Reels"],
    rating: 4.9,
    completedTasks: 19,
    lateRate: 0.04
  }
];

export const DEMO_PROJECTS: Project[] = [
  {
    id: "p-ug-01",
    title: "5 причин купить продукт X (Органика)",
    description:
      "UGC-ролики для органического охвата. Набор задач с разными продуктами, сценариями и дедлайнами.",
    managerId: "u-mgr-01",
    creatorSlots: 3,
    memberCreatorIds: ["c-01", "c-03"]
  },
  {
    id: "p-pr-02",
    title: "Сравнение продуктов за 30 секунд (Промо)",
    description: "Короткие промо-ролики. Строгое ТЗ, обязательный CTA и финальные правки от менеджера.",
    managerId: "u-mgr-02",
    creatorSlots: 2,
    memberCreatorIds: ["c-02"]
  }
];

export const DEMO_TASKS: Task[] = [
  {
    id: "t-001",
    projectId: "p-ug-01",
    title: "5 причин купить Продукт X (Органика)",
    product: "Продукт X",
    channel: "organic",
    type: "ugc_organic",
    tags: ["ugc-style", "voiceover", "lifestyle"],
    status: "new",
    startDate: "2026-03-03",
    dueDate: "2026-03-12",
    claimMode: "open",
    brief: "Снять нативный ролик без явной рекламы. Упор на боль/решение и личный опыт.",
    scenario:
      "Хук (0-2с) → 5 причин (2-20с) → мини-демо (20-25с) → мягкий CTA (25-30с).",
    attachments: []
  },
  {
    id: "t-002",
    projectId: "p-ug-01",
    title: "5 причин купить Продукт Y (Органика)",
    product: "Продукт Y",
    channel: "organic",
    type: "product_review",
    tags: ["beauty", "ugc-style"],
    status: "in_progress",
    startDate: "2026-03-02",
    dueDate: "2026-03-10",
    claimMode: "direct",
    creatorId: "c-01",
    managerId: "u-mgr-01",
    brief: "Обзор с акцентом на результат. Показать до/после или ожидание/реальность.",
    scenario: "Хук → 3 тезиса → короткий б-ролл → вывод.",
    attachments: [{ id: "a-01", name: "brief.pdf", addedAt: "2026-03-01T10:20:00Z" }]
  },
  {
    id: "t-003",
    projectId: "p-ug-01",
    title: "5 причин купить Продукт Z (Органика)",
    product: "Продукт Z",
    channel: "organic",
    type: "unboxing",
    tags: ["tech", "ugc-style"],
    status: "review",
    startDate: "2026-03-01",
    dueDate: "2026-03-08",
    claimMode: "direct",
    creatorId: "c-03",
    managerId: "u-mgr-01",
    brief: "Распаковка + первые впечатления. Главное — эмоции и детали комплектации.",
    scenario: "Распаковка → детали → 1 вывод → CTA.",
    attachments: [{ id: "a-02", name: "reference_link.txt", addedAt: "2026-03-01T12:00:00Z" }]
  },
  {
    id: "t-004",
    projectId: "p-pr-02",
    title: "Сравнение X vs Y (Промо)",
    product: "Продукт X",
    channel: "promo",
    type: "comparison",
    tags: ["promo", "cta", "fast-cut"],
    status: "new",
    startDate: "2026-03-05",
    dueDate: "2026-03-14",
    claimMode: "open",
    brief: "Платный ролик. Нельзя упоминать конкурента напрямую, только по признакам.",
    scenario: "Хук → 3 сравнения → CTA на скидку.",
    attachments: []
  }
];

