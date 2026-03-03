"use client";

import * as React from "react";

import type { Task } from "@/entities/task/model/types";
import { TASK_STATUS_LABEL } from "@/entities/task/model/types";
import { cn } from "@/shared/lib/cn";

function toDate(d: string) {
  const dt = new Date(d);
  dt.setHours(0, 0, 0, 0);
  return dt;
}

function addDays(d: Date, days: number) {
  const n = new Date(d);
  n.setDate(n.getDate() + days);
  return n;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / (24 * 60 * 60 * 1000));
}

export function Gantt(props: { tasks: Task[] }) {
  const tasks = React.useMemo(() => props.tasks.slice().sort((a, b) => a.startDate.localeCompare(b.startDate)), [props.tasks]);

  const minDate = React.useMemo(() => {
    const base = tasks.length ? toDate(tasks[0]!.startDate) : toDate(new Date().toISOString().slice(0, 10));
    return base;
  }, [tasks]);

  const maxDate = React.useMemo(() => {
    const last = tasks.reduce<Date | null>((acc, t) => {
      const d = toDate(t.dueDate);
      if (!acc) return d;
      return d > acc ? d : acc;
    }, null);
    return last ?? addDays(minDate, 14);
  }, [minDate, tasks]);

  // разумный горизонт: до 31 дня, чтобы не перегружать UI
  const totalDays = clamp(daysBetween(minDate, maxDate) + 1, 7, 31);
  const endDate = addDays(minDate, totalDays - 1);
  const days = Array.from({ length: totalDays }, (_, i) => addDays(minDate, i));

  return (
    <div className="overflow-auto rounded-xl border">
      <div className="min-w-[900px]">
        <div className="grid grid-cols-[320px_1fr] border-b bg-background">
          <div className="px-4 py-3 text-sm font-medium">Задача</div>
          <div className="grid" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(28px, 1fr))` }}>
            {days.map((d) => (
              <div key={d.toISOString()} className="border-l px-1 py-3 text-center text-xs text-muted-foreground">
                {new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit" }).format(d)}
              </div>
            ))}
          </div>
        </div>

        <div className="divide-y">
          {tasks.map((t) => {
            const start = toDate(t.startDate);
            const due = toDate(t.dueDate);
            const left = clamp(daysBetween(minDate, start), 0, totalDays - 1);
            const right = clamp(daysBetween(minDate, due), 0, totalDays - 1);
            const span = clamp(right - left + 1, 1, totalDays);

            return (
              <div key={t.id} className="grid grid-cols-[320px_1fr]">
                <div className="px-4 py-3">
                  <div className="truncate text-sm font-medium">{t.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {TASK_STATUS_LABEL[t.status]} • {t.startDate} → {t.dueDate}
                  </div>
                </div>
                <div className="relative grid" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(28px, 1fr))` }}>
                  {days.map((d, i) => (
                    <div key={d.toISOString()} className={cn("border-l", i === 0 && "border-l-0")} />
                  ))}
                  <div
                    className={cn(
                      "pointer-events-none absolute top-1/2 h-3 -translate-y-1/2 rounded-full",
                      t.status === "done" ? "bg-emerald-500/70" : t.status === "review" ? "bg-amber-500/70" : "bg-sky-500/70"
                    )}
                    style={{
                      left: `calc(${left} * (100% / ${days.length}) + 6px)`,
                      width: `calc(${span} * (100% / ${days.length}) - 12px)`
                    }}
                  />
                </div>
              </div>
            );
          })}
          {!tasks.length ? <div className="px-4 py-6 text-sm text-muted-foreground">Нет задач для отображения.</div> : null}
        </div>
      </div>
    </div>
  );
}

