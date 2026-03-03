export type TaskId = string;
export type ProjectId = string;
export type CreatorId = string;

export type ContentChannel = "organic" | "promo";

export type TaskStatus = "new" | "in_progress" | "review" | "done" | "archived";

export type TaskClaimMode = "direct" | "open";

export type TaskTypeKey =
  | "ugc_organic"
  | "ugc_promo"
  | "product_review"
  | "comparison"
  | "unboxing";

export type Task = {
  id: TaskId;
  projectId: ProjectId;
  title: string;
  product: string;
  channel: ContentChannel;
  type: TaskTypeKey;
  tags: string[];
  status: TaskStatus;
  startDate: string; // ISO date
  dueDate: string; // ISO date
  claimMode: TaskClaimMode; // direct assignment vs "whoever takes first"
  creatorId?: CreatorId;
  managerId?: string;
  unassignRequested?: boolean;
  brief: string;
  scenario: string;
  attachments: { id: string; name: string; addedAt: string }[];
};

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  review: "На проверке",
  done: "Выполнена",
  archived: "Архив"
};

export const TASK_CHANNEL_LABEL: Record<ContentChannel, string> = {
  organic: "Органика",
  promo: "Промо"
};

export const TASK_TYPE_LABEL: Record<TaskTypeKey, string> = {
  ugc_organic: "UGC (органика)",
  ugc_promo: "UGC (промо)",
  product_review: "Обзор продукта",
  comparison: "Сравнение",
  unboxing: "Распаковка"
};

