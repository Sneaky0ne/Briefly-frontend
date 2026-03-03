import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { TASK_STATUS_LABEL } from "@/entities/task/model/types";
import { DEMO_CREATORS, DEMO_TASKS } from "@/shared/mock/demo-data";

export default function CreatorPage({ params }: { params: { creatorId: string } }) {
  const creator = DEMO_CREATORS.find((c) => c.id === params.creatorId);
  const tasks = DEMO_TASKS.filter((t) => t.creatorId === params.creatorId);

  if (!creator) {
    return (
      <div className="space-y-3">
        <div className="text-lg font-medium">Креатор не найден</div>
        <Button asChild variant="secondary">
          <Link href="/creators">Назад</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{creator.name}</h1>
          <p className="text-sm text-muted-foreground">
            {creator.handle} • {creator.socials.join(" / ")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button>Написать</Button>
          <Button variant="secondary">Пригласить в проект</Button>
          <Button variant="outline" asChild>
            <Link href="/creators">К списку</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border p-4">
          <div className="text-sm text-muted-foreground">Рейтинг</div>
          <div className="mt-1 text-2xl font-semibold">{creator.rating.toFixed(1)}</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-muted-foreground">Выполнено задач</div>
          <div className="mt-1 text-2xl font-semibold">{creator.completedTasks}</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-sm text-muted-foreground">Просрочки</div>
          <div className="mt-1 text-2xl font-semibold">{Math.round(creator.lateRate * 100)}%</div>
        </div>
      </div>

      <div className="rounded-xl border">
        <div className="border-b px-4 py-3 text-sm font-medium">Задачи креатора</div>
        <div className="divide-y">
          {tasks.length ? (
            tasks.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <div className="truncate font-medium">{t.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">Дедлайн: {t.dueDate}</div>
                </div>
                <Badge variant="secondary">{TASK_STATUS_LABEL[t.status]}</Badge>
              </div>
            ))
          ) : (
            <div className="px-4 py-4 text-sm text-muted-foreground">Пока нет задач.</div>
          )}
        </div>
      </div>
    </div>
  );
}

