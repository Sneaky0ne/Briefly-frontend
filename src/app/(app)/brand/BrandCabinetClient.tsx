"use client";

import * as React from "react";
import { Copy, Link2, RotateCcw, ShieldCheck, UserCog } from "lucide-react";

import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Badge } from "@/shared/ui/badge";

type InviteRole = "brand_manager" | "brand_analyst" | "creator";

const ROLE_LABEL: Record<InviteRole, string> = {
  brand_manager: "Сотрудник: менеджер",
  brand_analyst: "Сотрудник: аналитик",
  creator: "Креатор"
};

function randomCode() {
  const part = () => Math.random().toString(36).slice(2, 8);
  return `${part()}-${part()}`.toUpperCase();
}

export function BrandCabinetClient() {
  const [inviteRole, setInviteRole] = React.useState<InviteRole>("creator");
  const [code, setCode] = React.useState<string>(() => randomCode());
  const [copied, setCopied] = React.useState(false);

  const link = React.useMemo(() => {
    const origin = typeof window === "undefined" ? "" : window.location.origin;
    const url = new URL("/auth/sign-in", origin || "http://localhost:3000");
    url.searchParams.set("invite", code);
    url.searchParams.set("role", inviteRole);
    return origin ? url.toString() : url.pathname + "?" + url.searchParams.toString();
  }, [code, inviteRole]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Кабинет бренда</h1>
          <p className="text-sm text-muted-foreground">Приглашения, команда и базовые настройки рабочего пространства.</p>
        </div>
        <Badge variant="secondary">Demo</Badge>
      </div>

      <section className="rounded-xl border p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="text-sm font-medium">Ссылка-приглашение</div>
            <div className="text-sm text-muted-foreground">
              1 клик — сгенерировать и отправить. Роль задаёт доступ к разделам.
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setCode(randomCode())}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Новая
            </Button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Роль</Label>
            <select
              className={cn(
                "h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as InviteRole)}
            >
              {Object.entries(ROLE_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label>Ссылка</Label>
            <div className="flex gap-2">
              <Input readOnly value={link} />
              <Button onClick={copy} variant={copied ? "default" : "outline"}>
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "Скопировано" : "Копировать"}
              </Button>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link2 className="h-3.5 w-3.5" />
              Код: <span className="font-medium text-foreground">{code}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border p-4">
          <div className="text-sm font-medium">Команда</div>
          <div className="mt-1 text-sm text-muted-foreground">Сотрудники бренда и их роли.</div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between gap-2 rounded-md border px-3 py-2">
              <div>
                <div className="font-medium">Марина</div>
                <div className="text-xs text-muted-foreground">Realm администратор</div>
              </div>
              <Badge variant="secondary">
                <ShieldCheck className="mr-1 h-3 w-3" />
                Admin
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-2 rounded-md border px-3 py-2">
              <div>
                <div className="font-medium">Артём</div>
                <div className="text-xs text-muted-foreground">Менеджер</div>
              </div>
              <Badge variant="outline">Manager</Badge>
            </div>
            <div className="flex items-center justify-between gap-2 rounded-md border px-3 py-2">
              <div>
                <div className="font-medium">Лена</div>
                <div className="text-xs text-muted-foreground">Аналитик</div>
              </div>
              <Badge variant="outline">Analyst</Badge>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Button size="sm">
              <UserCog className="mr-2 h-4 w-4" />
              Управление доступами
            </Button>
            <Button size="sm" variant="secondary">
              Добавить сотрудника
            </Button>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="text-sm font-medium">Креаторы</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Приглашённые креаторы и параметры сотрудничества (слоты/проекты).
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="secondary">
              Открыть базу
            </Button>
            <Button size="sm" variant="outline">
              Массовая рассылка
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-sm font-medium">История подключений по ссылкам</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Кто и когда заходил в кабинет/проекты по инвайт‑линкам.
            </div>
          </div>
        </div>
        <div className="mt-3 divide-y text-sm">
          <div className="flex items-center justify-between gap-3 py-2">
            <div className="min-w-0">
              <div className="font-medium">@alina.ugc</div>
              <div className="text-xs text-muted-foreground">Креатор • Проект «5 причин купить продукт X»</div>
            </div>
            <div className="text-xs text-muted-foreground">01.03.2026 10:21</div>
          </div>
          <div className="flex items-center justify-between gap-3 py-2">
            <div className="min-w-0">
              <div className="font-medium">artem@agency.io</div>
              <div className="text-xs text-muted-foreground">Менеджер • Кабинет бренда</div>
            </div>
            <div className="text-xs text-muted-foreground">28.02.2026 18:05</div>
          </div>
          <div className="flex items-center justify-between gap-3 py-2">
            <div className="min-w-0">
              <div className="font-medium">@maria.story</div>
              <div className="text-xs text-muted-foreground">Креатор • Проект «Сравнение продуктов за 30 секунд»</div>
            </div>
            <div className="text-xs text-muted-foreground">27.02.2026 13:42</div>
          </div>
        </div>
      </section>
    </div>
  );
}

