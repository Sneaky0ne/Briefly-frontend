import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col gap-8 p-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Briefly</h1>
        <p className="text-muted-foreground">
          Единое пространство для бренда и креаторов: проекты, задачи, аналитика и коммуникация.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Быстрый старт</CardTitle>
            <CardDescription>Демо-навигация по ключевым разделам.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button>
              <Link href="/auth/sign-up">Регистрация бренда</Link>
            </Button>
            <Button variant="secondary">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="secondary">
              <Link href="/projects">Проекты</Link>
            </Button>
            <Button variant="secondary">
              <Link href="/tasks">Задачи</Link>
            </Button>
            <Button variant="secondary">
              <Link href="/creators">База креаторов</Link>
            </Button>
            <Button variant="secondary">
              <Link href="/analytics">Аналитика</Link>
            </Button>
            <Button variant="secondary">
              <Link href="/settings">Настройки</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Роли</CardTitle>
            <CardDescription>
              В демо роль выбирается в шапке приложения и влияет на доступные действия.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Бренд/сотрудник: управление проектами и задачами, приглашения, аналитика, настройки типов и тегов.
            Креатор: просмотр и взятие задач, статусы, файлы и чат внутри задачи.
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

