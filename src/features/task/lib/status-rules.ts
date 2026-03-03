import type { TaskClaimMode, TaskStatus } from "@/entities/task/model/types";
import type { UserRole } from "@/shared/model/role";

export type TaskAction =
  | { kind: "take" }
  | { kind: "open_claim" }
  | { kind: "close_claim" }
  | { kind: "request_unassign" }
  | { kind: "approve_unassign" }
  | { kind: "set_status"; to: TaskStatus }
  | { kind: "archive" };

export function getAllowedTaskActions(params: {
  role: UserRole;
  status: TaskStatus;
  isAssignee: boolean;
  hasAssignee: boolean;
  claimMode: TaskClaimMode;
  unassignRequested: boolean;
}) {
  const { role, status, isAssignee, hasAssignee, claimMode, unassignRequested } = params;

  if (status === "archived") return [];

  if (role === "creator") {
    if (status === "new" && claimMode === "open" && !hasAssignee)
      return [{ kind: "take" } satisfies TaskAction];
    if (!isAssignee) return [];
    if (status === "new") return [{ kind: "set_status", to: "in_progress" } satisfies TaskAction];
    if (status === "in_progress") return [{ kind: "set_status", to: "review" } satisfies TaskAction];
    if (status === "review") return [];
    if (status === "done") return [{ kind: "archive" } satisfies TaskAction];

    // снять задачу — только запрос (по соглашению)
    if ((status === "new" || status === "in_progress") && !unassignRequested)
      return [{ kind: "request_unassign" } satisfies TaskAction];
  }

  if (role === "brand_analyst") {
    return [];
  }

  // brand_admin / brand_manager
  if (!hasAssignee && status === "new" && claimMode === "direct")
    return [{ kind: "open_claim" } satisfies TaskAction];
  if (!hasAssignee && status === "new" && claimMode === "open")
    return [{ kind: "close_claim" } satisfies TaskAction];
  if (unassignRequested && hasAssignee)
    return [{ kind: "approve_unassign" } satisfies TaskAction];

  if (status === "new") return [{ kind: "set_status", to: "in_progress" } satisfies TaskAction];
  if (status === "in_progress")
    return [{ kind: "set_status", to: "review" } satisfies TaskAction];
  if (status === "review")
    return [
      { kind: "set_status", to: "done" } satisfies TaskAction,
      { kind: "set_status", to: "in_progress" } satisfies TaskAction
    ];
  if (status === "done") return [{ kind: "archive" } satisfies TaskAction];

  return [];
}

