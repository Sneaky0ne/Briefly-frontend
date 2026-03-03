import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

const DEMO_TASK_TYPES = ["UGC (органика)", "UGC (промо)", "Обзор продукта", "Сравнение", "Распаковка"];
const DEMO_PRODUCTS = ["Продукт X", "Продукт Y", "Продукт Z"];
const DEMO_TAGS = ["beauty", "tech", "lifestyle", "voiceover", "ugc-style"];

export default function TaskConfigPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Типы задач, продукты и теги</h1>
        <p className="text-sm text-muted-foreground">
          Эти справочники используются при создании/редактировании задач и проектов. В демо пока статично.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Типы</CardTitle>
            <CardDescription>Что это за задача.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {DEMO_TASK_TYPES.map((t) => (
              <div key={t} className="flex items-center justify-between gap-2 text-sm">
                <span>{t}</span>
                <Button size="sm" variant="outline">
                  Удалить
                </Button>
              </div>
            ))}
            <Button className="w-full" variant="secondary">
              Добавить тип
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Продукты</CardTitle>
            <CardDescription>На что снимаем ролик.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {DEMO_PRODUCTS.map((p) => (
              <div key={p} className="flex items-center justify-between gap-2 text-sm">
                <span>{p}</span>
                <Button size="sm" variant="outline">
                  Удалить
                </Button>
              </div>
            ))}
            <Button className="w-full" variant="secondary">
              Добавить продукт
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Теги</CardTitle>
            <CardDescription>Свободные ярлыки.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {DEMO_TAGS.map((t) => (
              <div key={t} className="flex items-center justify-between gap-2 text-sm">
                <span>{t}</span>
                <Button size="sm" variant="outline">
                  Удалить
                </Button>
              </div>
            ))}
            <Button className="w-full" variant="secondary">
              Добавить тег
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

