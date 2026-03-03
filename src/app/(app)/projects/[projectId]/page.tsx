import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { DEMO_CREATORS, DEMO_PROJECTS, DEMO_TASKS } from "@/shared/mock/demo-data";
import { TASK_STATUS_LABEL } from "@/entities/task/model/types";

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = DEMO_PROJECTS.find((p) => p.id === projectId);
  const tasks = DEMO_TASKS.filter((t) => t.projectId === projectId);
  const members = project
    ? project.memberCreatorIds
        .map((id) => DEMO_CREATORS.find((c) => c.id === id))
        .filter(Boolean)
    : [];
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{project?.title ?? "Проект"}</h1>
        <p className="text-sm text-muted-foreground">
          {project?.description ?? (
            <>
              Проект: <span className="font-medium text-foreground">{projectId}</span>
            </>
          )}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Исполнители</CardTitle>
            <CardDescription>Креаторы, подключённые к проекту.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {members.length ? (
              members.map((c) => (
                <Button key={c!.id} size="sm" variant="outline"  >
                  <Link href={`/creators/${c!.id}`}>{c!.name}</Link>
                </Button>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">Пока нет подключённых креаторов.</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Заметки бренда (Q&A)</CardTitle>
            <CardDescription>Ответы на частые вопросы, вынесенные из чатов задач.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border p-3">
              <div className="font-medium">Хук: сколько секунд?</div>
              <div className="mt-1 text-muted-foreground">1–2 сек. Главное — быстро обозначить боль/обещание.</div>
            </div>
            <div className="rounded-md border p-3">
              <div className="font-medium">Можно ли использовать музыку?</div>
              <div className="mt-1 text-muted-foreground">Да, но только из безопасной библиотеки / без страйков.</div>
            </div>
            <Button size="sm" variant="secondary">
              Добавить заметку
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Связанные задачи</CardTitle>
            <CardDescription>Быстрый доступ без переходов.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {tasks.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm">
                <div className="min-w-0">
                  <div className="truncate font-medium">{t.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {TASK_STATUS_LABEL[t.status]} • дедлайн {t.dueDate}
                  </div>
                </div>
                <Badge variant="secondary">{TASK_STATUS_LABEL[t.status]}</Badge>
              </div>
            ))}
            <Button size="sm"  >
              <Link href={`/tasks?project=${projectId}`}>Открыть все</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button  >
          <Link href={`/tasks?project=${projectId}`}>Открыть задачи проекта</Link>
        </Button>
        <Button variant="secondary">Создать задачу в проекте</Button>
      </div>
    </div>
  );
}

