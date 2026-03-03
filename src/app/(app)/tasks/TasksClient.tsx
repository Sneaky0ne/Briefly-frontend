"use client";

import * as React from "react";

import type { Creator } from "@/entities/creator/model/types";
import type { Task, TaskStatus } from "@/entities/task/model/types";
import { TASK_STATUS_LABEL } from "@/entities/task/model/types";
import { Gantt } from "@/features/task/ui/Gantt";
import { TaskDialog } from "@/features/task/ui/TaskDialog";
import { Badge } from "@/shared/ui/badge";

const KANBAN_COLUMNS: { status: TaskStatus; title: string }[] = [
  { status: "new", title: "Новые" },
  { status: "in_progress", title: "В работе" },
  { status: "review", title: "На проверке" },
  { status: "done", title: "Выполнено" }
];

function byDueDateAsc(a: Task, b: Task) {
  return a.dueDate.localeCompare(b.dueDate);
}

export function TasksClient(props: {
  initialTasks: Task[];
  creators: Creator[];
  view: "list" | "kanban" | "gantt";
  projectId?: string;
}) {
  const { creators, view, projectId } = props;
  const [tasks, setTasks] = React.useState<Task[]>(props.initialTasks);

  const visible = React.useMemo(() => {
    const base = projectId ? tasks.filter((t) => t.projectId === projectId) : tasks;
    return base.filter((t) => t.status !== "archived");
  }, [projectId, tasks]);

  const updateTask = (next: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === next.id ? next : t)));
  };

  if (view === "kanban") {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {KANBAN_COLUMNS.map((col) => {
          const items = visible.filter((t) => t.status === col.status).sort(byDueDateAsc);
          return (
            <section key={col.status} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{col.title}</div>
                <Badge variant="secondary">{items.length}</Badge>
              </div>
              <div className="space-y-2">
                {items.map((t) => (
                  <TaskDialog key={t.id} task={t} creators={creators} onChange={updateTask} />
                ))}
                {!items.length ? <div className="text-sm text-muted-foreground">Пусто</div> : null}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  if (view === "gantt") {
    return <Gantt tasks={visible} />;
  }

  const grouped = visible
    .slice()
    .sort((a, b) => {
      const byStatus = a.status.localeCompare(b.status);
      if (byStatus !== 0) return byStatus;
      return byDueDateAsc(a, b);
    });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {KANBAN_COLUMNS.map((c) => (
          <Badge key={c.status} variant="outline">
            {TASK_STATUS_LABEL[c.status]}
          </Badge>
        ))}
      </div>
      <div className="space-y-2">
        {grouped.map((t) => (
          <TaskDialog key={t.id} task={t} creators={creators} onChange={updateTask} />
        ))}
      </div>
    </div>
  );
}

