import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Обзор</h1>
          <p className="text-sm text-muted-foreground">Коротко о главном: что горит и куда идти дальше.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/tasks">Новая задача</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/projects">Новый проект</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Проекты</CardTitle>
            <CardDescription>Активные и в работе</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/projects">Открыть</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Задачи</CardTitle>
            <CardDescription>Список / Канбан / Гант</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/tasks">Открыть</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Аналитика</CardTitle>
            <CardDescription>Сроки, качество, KPI</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" asChild>
              <Link href="/analytics">Открыть</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

