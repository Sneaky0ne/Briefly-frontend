import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { DEMO_CREATORS, DEMO_PROJECTS, DEMO_TASKS } from "@/shared/mock/demo-data";
import { TASK_STATUS_LABEL } from "@/entities/task/model/types";
import { CreateProjectDialog } from "@/features/project/ui/CreateProjectDialog";
import { CreateTaskDialog } from "@/features/task/ui/CreateTaskDialog";

export default function ProjectsPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Проекты</h1>
        <p className="text-sm text-muted-foreground">
          Проект объединяет задачи, участников (креаторы/менеджеры) и коммуникацию, как в Jira.
        </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CreateProjectDialog />
          <CreateTaskDialog />
        </div>
      </div>

      <div className="rounded-xl border">
        <div className="grid grid-cols-[1fr_auto] gap-2 border-b px-4 py-3 text-sm text-muted-foreground">
          <div>Проект</div>
          <div>Действия</div>
        </div>
        <div className="divide-y">
          {DEMO_PROJECTS.map((p) => (
            <div key={p.id} className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3">
              <div className="min-w-0">
                <div className="truncate font-medium">{p.title}</div>
                <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">Исполнители:</span>
                  {p.memberCreatorIds.length ? (
                    p.memberCreatorIds.slice(0, 4).map((id) => {
                      const c = DEMO_CREATORS.find((x) => x.id === id);
                      if (!c) return null;
                      return (
                        <Badge key={id} variant="outline">
                          {c.name}
                        </Badge>
                      );
                    })
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                  {p.memberCreatorIds.length > 4 ? (
                    <span className="text-xs text-muted-foreground">+{p.memberCreatorIds.length - 4}</span>
                  ) : null}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">Задачи:</span>
                  {DEMO_TASKS.filter((t) => t.projectId === p.id)
                    .slice(0, 3)
                    .map((t) => (
                      <Badge key={t.id} variant="secondary">
                        {TASK_STATUS_LABEL[t.status]} • {t.title}
                      </Badge>
                    ))}
                  <Button size="sm" variant="ghost"  >
                    <Link href={`/tasks?project=${p.id}`}>Все задачи</Link>
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <Button size="sm"  >
                  <Link href={`/projects/${p.id}`}>Открыть</Link>
                </Button>
                <Button size="sm" variant="outline"  >
                  <Link href={`/tasks?project=${p.id}`}>Задачи</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

