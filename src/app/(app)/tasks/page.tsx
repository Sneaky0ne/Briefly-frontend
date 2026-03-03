import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { DEMO_CREATORS, DEMO_TASKS } from "@/shared/mock/demo-data";
import { TasksClient } from "@/app/(app)/tasks/TasksClient";
import { CreateTaskDialog } from "@/features/task/ui/CreateTaskDialog";

export default function TasksPage({
  searchParams
}: {
  searchParams: { view?: "list" | "kanban" | "gantt"; project?: string };
}) {
  const view = searchParams.view ?? "list";
  const projectId = searchParams.project;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Задачи</h1>
        <p className="text-sm text-muted-foreground">
          Режим: <span className="font-medium text-foreground">{view}</span>
          {projectId ? (
            <>
              {" "}
              • проект: <span className="font-medium text-foreground">{projectId}</span>
            </>
          ) : null}
        </p>
        </div>
        <CreateTaskDialog />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant={view === "list" ? "default" : "outline"} asChild>
          <Link href={{ pathname: "/tasks", query: { ...searchParams, view: "list" } }}>Список</Link>
        </Button>
        <Button variant={view === "kanban" ? "default" : "outline"} asChild>
          <Link href={{ pathname: "/tasks", query: { ...searchParams, view: "kanban" } }}>Канбан</Link>
        </Button>
        <Button variant={view === "gantt" ? "default" : "outline"} asChild>
          <Link href={{ pathname: "/tasks", query: { ...searchParams, view: "gantt" } }}>Гант</Link>
        </Button>
      </div>

      <TasksClient initialTasks={DEMO_TASKS} creators={DEMO_CREATORS} view={view} projectId={projectId} />
    </div>
  );
}

