import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { DEMO_CREATORS } from "@/shared/mock/demo-data";

export default function CreatorsPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Креаторы</h1>
          <p className="text-sm text-muted-foreground">База креаторов бренда. Нажмите, чтобы открыть карточку.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button>Пригласить</Button>
          <Button variant="secondary">Экспорт</Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {DEMO_CREATORS.map((c) => (
          <Link
            key={c.id}
            href={`/creators/${c.id}`}
            className="rounded-xl border p-4 transition-colors hover:bg-accent/40"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate font-medium">{c.name}</div>
                <div className="mt-1 truncate text-sm text-muted-foreground">
                  {c.handle} • {c.socials.join(" / ")}
                </div>
              </div>
              <Badge variant="secondary">{c.rating.toFixed(1)}</Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span>Задач: {c.completedTasks}</span>
              <span>•</span>
              <span>Просрочки: {Math.round(c.lateRate * 100)}%</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

