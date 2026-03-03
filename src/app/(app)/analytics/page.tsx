import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Аналитика</h1>
        <p className="text-sm text-muted-foreground">
          Статистика по креаторам: выполненные задачи, сроки, качество, фильтры по периодам и форматам.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>По креаторам</CardTitle>
            <CardDescription>Соблюдение дедлайнов и объём выполненных задач.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Здесь будет таблица + фильтры + экспорт отчётов.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Связь с базой креаторов</CardTitle>
            <CardDescription>Опционально: аналитика прямо в карточке креатора.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Можно отказаться от отдельной страницы, если метрики показываются в `Creators`.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

