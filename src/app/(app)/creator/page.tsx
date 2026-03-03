"use client";

import Link from "next/link";

import { CURRENT_CREATOR_ID } from "@/shared/model/current-user";
import { useRole } from "@/shared/model/use-role";
import { DEMO_CREATORS, DEMO_TASKS } from "@/shared/mock/demo-data";
import { TaskDialog } from "@/features/task/ui/TaskDialog";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

type CreatorView = "mine" | "pool";

export default function CreatorDashboardPage() {
  const { role } = useRole();
  const [view, setView] = useState<CreatorView>("mine");

  const creator = DEMO_CREATORS.find((c) => c.id === CURRENT_CREATOR_ID);

  const myTasks = DEMO_TASKS.filter((t) => t.creatorId === CURRENT_CREATOR_ID);
  const poolTasks = DEMO_TASKS.filter((t) => t.claimMode === "open" && !t.creatorId);

  if (role !== "creator") {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Мои задачи (вид креатора)</h1>
        <p className="text-sm text-muted-foreground">
          Этот экран показывает, как выглядит Briefly для креатора. Переключите роль в шапке на «Креатор», чтобы увидеть
          поведение.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Мои задачи</h1>
          <p className="text-sm text-muted-foreground">
            {creator?.name} {creator?.handle ? `• ${creator.handle}` : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>
            Всего задач: <span className="font-medium text-foreground">{myTasks.length}</span>
          </span>
          <span>•</span>
          <span>
            Доступно в пуле: <span className="font-medium text-foreground">{poolTasks.length}</span>
          </span>
          <Button size="sm" variant="outline">
            <Link href="/creator/settings">Настройки профиля</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={view === "mine" ? "default" : "outline"} onClick={() => setView("mine")}>
          Мои задачи
        </Button>
        <Button size="sm" variant={view === "pool" ? "default" : "outline"} onClick={() => setView("pool")}>
          Доступные задачи
        </Button>
      </div>

      {view === "mine" ? (
        <section className="space-y-2">
          {myTasks.length ? (
            myTasks.map((t) => (
              <TaskDialog key={t.id} task={t} creators={DEMO_CREATORS} onChange={() => {}} />
            ))
          ) : (
            <div className="rounded-xl border px-4 py-6 text-sm text-muted-foreground">
              У вас пока нет задач. Посмотрите доступные задачи в пуле.
            </div>
          )}
        </section>
      ) : (
        <section className="space-y-2">
          {poolTasks.length ? (
            poolTasks.map((t) => (
              <TaskDialog key={t.id} task={t} creators={DEMO_CREATORS} onChange={() => {}} />
            ))
          ) : (
            <div className="rounded-xl border px-4 py-6 text-sm text-muted-foreground">
              Сейчас в пуле нет задач. Загляните позже.
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            В пуле отображаются задачи, где бренд включил режим «кто успел — тот взял».
          </p>
        </section>
      )}
    </div>
  );
}

