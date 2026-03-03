import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Настройки</h1>
        <p className="text-sm text-muted-foreground">
          Управление рабочим пространством: роли, права, типы задач, теги, форматы контента, импорт/экспорт и архив.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Типы задач и теги</CardTitle>
            <CardDescription>
              Менеджер/админ настраивает варианты (продукт, органика/промо, формат, теги), которые затем используются в
              карточке задачи.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button  >
              <Link href="/settings/task-config">Открыть</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Роли и доступы</CardTitle>
            <CardDescription>Админка: права сотрудников, приглашения, управление участниками.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Здесь будет UI управления ролями (админ/менеджер/аналитик) и доступами.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

