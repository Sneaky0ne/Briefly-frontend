"use client";

import * as React from "react";
import { Paperclip, Send } from "lucide-react";

import type { Creator } from "@/entities/creator/model/types";
import type { Task } from "@/entities/task/model/types";
import { TASK_CHANNEL_LABEL, TASK_STATUS_LABEL, TASK_TYPE_LABEL } from "@/entities/task/model/types";
import { getAllowedTaskActions } from "@/features/task/lib/status-rules";
import { cn } from "@/shared/lib/cn";
import { useRole } from "@/shared/model/use-role";
import { CURRENT_CREATOR_ID } from "@/shared/model/current-user";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";
import { Textarea } from "@/shared/ui/textarea";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium" }).format(new Date(iso));
}

type ChatMessage = {
  id: string;
  by: "manager" | "creator";
  text: string;
  at: string;
};

export function TaskDialog(props: {
  task: Task;
  creators: Creator[];
  onChange: (next: Task) => void;
  triggerClassName?: string;
}) {
  const { task, creators, onChange, triggerClassName } = props;
  const { role } = useRole();
  const [showScenario, setShowScenario] = React.useState(false);

  const [messages, setMessages] = React.useState<ChatMessage[]>(() => [
    {
      id: "m-1",
      by: "manager",
      text: "Привет! Если будут вопросы по сценарию — пиши прямо сюда.",
      at: "2026-03-01T10:00:00Z"
    },
    {
      id: "m-2",
      by: "creator",
      text: "Ок, понял. Уточню по длительности хука — 1-2 секунды?",
      at: "2026-03-01T10:03:00Z"
    }
  ]);
  const [draft, setDraft] = React.useState("");
  const chatEndRef = React.useRef<HTMLDivElement | null>(null);
  const [assignedCreatorId, setAssignedCreatorId] = React.useState(task.creatorId ?? "");

  const isAssignee = role === "creator" && task.creatorId === CURRENT_CREATOR_ID;
  const hasAssignee = Boolean(task.creatorId);
  const actions = getAllowedTaskActions({
    role,
    status: task.status,
    isAssignee,
    hasAssignee,
    claimMode: task.claimMode,
    unassignRequested: Boolean(task.unassignRequested)
  });

  const creatorName = task.creatorId
    ? creators.find((c) => c.id === task.creatorId)?.name ?? task.creatorId
    : "—";

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const addedAt = new Date().toISOString();
    const newItems = Array.from(files).map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      addedAt
    }));
    onChange({ ...task, attachments: [...task.attachments, ...newItems] });
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    const by: ChatMessage["by"] =
      role === "creator" ? "creator" : role === "brand_admin" || role === "brand_manager" ? "manager" : "manager";
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), by, text, at: new Date().toISOString() }
    ]);
    setDraft("");
  };

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full rounded-lg border bg-card p-4 text-left text-card-foreground shadow-sm transition-colors hover:bg-accent/40",
            triggerClassName
          )}
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate font-medium">{task.title}</div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>{TASK_TYPE_LABEL[task.type]}</span>
                <span>•</span>
                <span>{TASK_CHANNEL_LABEL[task.channel]}</span>
                {task.claimMode === "open" && !task.creatorId ? (
                  <>
                    <span>•</span>
                    <span className="font-medium text-foreground">Пул</span>
                  </>
                ) : null}
                <span>•</span>
                <span>Дедлайн: {formatDate(task.dueDate)}</span>
              </div>
            </div>
            <Badge variant="secondary">{TASK_STATUS_LABEL[task.status]}</Badge>
          </div>
          {task.tags.length ? (
            <div className="mt-3 flex flex-wrap gap-1">
              {task.tags.slice(0, 4).map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
              {task.tags.length > 4 ? (
                <span className="text-xs text-muted-foreground">+{task.tags.length - 4}</span>
              ) : null}
            </div>
          ) : null}
        </button>
      </DialogTrigger>

      <DialogContent className="h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-none overflow-hidden p-4 md:p-6">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>
            {task.product} • {TASK_CHANNEL_LABEL[task.channel]} • дедлайн {formatDate(task.dueDate)}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{TASK_STATUS_LABEL[task.status]}</Badge>
          <Badge variant="outline">{TASK_TYPE_LABEL[task.type]}</Badge>
          {task.creatorId ? (
            <Badge variant="outline">Креатор: {creatorName}</Badge>
          ) : (
            <Badge variant="outline">{task.claimMode === "open" ? "Пул: без креатора" : "Без креатора"}</Badge>
          )}
          {task.unassignRequested ? <Badge variant="destructive">Запрос на снятие</Badge> : null}
        </div>

        <Separator />

        <div className="grid h-full min-h-0 gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <section className="min-h-0 space-y-4 overflow-auto pr-1">
            <div className="rounded-lg border p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="text-sm font-medium">Описание задачи</div>
                <Button size="sm" variant="ghost" onClick={() => setShowScenario((v) => !v)}>
                  {showScenario ? "Скрыть сценарий" : "Показать сценарий"}
                </Button>
              </div>
              <div className="mt-2">
                <Textarea value={task.brief} readOnly className="min-h-[140px]" />
              </div>
              {showScenario ? (
                <div className="mt-3">
                  <div className="text-sm font-medium">Сценарий (детали)</div>
                  <Textarea value={task.scenario} readOnly className="mt-2 min-h-[120px]" />
                </div>
              ) : null}
            </div>

            <div className="rounded-lg border p-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-medium">Статус / прогресс</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    В демо: креатор доводит до «На проверке», менеджер/админ принимает или возвращает в работу.
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {actions.map((a) => {
                  if (a.kind === "take") {
                    return (
                      <Button
                        key="take"
                        onClick={() =>
                          onChange({ ...task, creatorId: CURRENT_CREATOR_ID, status: "in_progress", claimMode: "direct" })
                        }
                      >
                        Взять задачу
                      </Button>
                    );
                  }
                  if (a.kind === "open_claim") {
                    return (
                      <Button
                        key="open-claim"
                        variant="secondary"
                        onClick={() => onChange({ ...task, claimMode: "open" })}
                      >
                        Отправить в пул (кто успел — тот взял)
                      </Button>
                    );
                  }
                  if (a.kind === "close_claim") {
                    return (
                      <Button
                        key="close-claim"
                        variant="secondary"
                        onClick={() => onChange({ ...task, claimMode: "direct" })}
                      >
                        Закрыть набор
                      </Button>
                    );
                  }
                  if (a.kind === "request_unassign") {
                    return (
                      <Button
                        key="request-unassign"
                        variant="secondary"
                        onClick={() => onChange({ ...task, unassignRequested: true })}
                      >
                        Запросить снятие
                      </Button>
                    );
                  }
                  if (a.kind === "approve_unassign") {
                    return (
                      <Button
                        key="approve-unassign"
                        variant="secondary"
                        onClick={() =>
                          onChange({
                            ...task,
                            creatorId: undefined,
                            unassignRequested: false,
                            claimMode: "direct",
                            status: "new"
                          })
                        }
                      >
                        Подтвердить снятие
                      </Button>
                    );
                  }
                  if (a.kind === "archive") {
                    return (
                      <Button key="archive" variant="secondary" onClick={() => onChange({ ...task, status: "archived" })}>
                        Архивировать
                      </Button>
                    );
                  }
                  return (
                    <Button key={a.to} variant="secondary" onClick={() => onChange({ ...task, status: a.to })}>
                      {a.to === "in_progress"
                        ? "В работу"
                        : a.to === "review"
                          ? "На проверку"
                          : a.to === "done"
                            ? "Принять" : ""}
                    </Button>
                  );
                })}
                {!actions.length ? <span className="text-sm text-muted-foreground">Нет доступных действий.</span> : null}
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="text-sm font-medium">Файлы</div>
              <div className="mt-2 space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{TASK_TYPE_LABEL[task.type]}</span>
                  <span>•</span>
                  <span>{TASK_CHANNEL_LABEL[task.channel]}</span>
                  <span>•</span>
                  <span>{task.product}</span>
                  {task.tags.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
                {task.attachments.length ? (
                  <div className="space-y-2">
                    {task.attachments.map((a) => (
                      <div
                        key={a.id}
                        className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">{a.name}</span>
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {new Intl.DateTimeFormat("ru-RU", {
                            dateStyle: "short",
                            timeStyle: "short"
                          }).format(new Date(a.addedAt))}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">Файлов пока нет.</div>
                )}

                <div className="grid gap-2 pt-2">
                  <Label htmlFor={`files-${task.id}`}>Добавить файлы</Label>
                  <Input id={`files-${task.id}`} type="file" multiple onChange={(e) => handleFiles(e.target.files)} />
                  <div className="text-xs text-muted-foreground">
                    В демо файлы не загружаются на сервер — сохраняются только названия.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="text-sm font-medium">Назначение креатора</div>
              <div className="mt-2 grid gap-2 md:grid-cols-[minmax(0,1fr)_auto]">
                <select
                  className={cn(
                    "h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  value={assignedCreatorId}
                  onChange={(e) => setAssignedCreatorId(e.target.value)}
                  disabled={role === "creator"}
                >
                  <option value="">— не назначен —</option>
                  {creators.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.handle})
                    </option>
                  ))}
                </select>
                {role !== "creator" && (
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={!assignedCreatorId}
                    onClick={() =>
                      onChange({
                        ...task,
                        creatorId: assignedCreatorId || undefined,
                        awaitingCreatorApproval: Boolean(assignedCreatorId),
                        unassignRequested: false
                      })
                    }
                  >
                    Назначить
                  </Button>
                )}
              </div>
              {role === "creator" &&
                task.creatorId === CURRENT_CREATOR_ID &&
                task.awaitingCreatorApproval && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Бренд предлагает вам эту задачу. Подтвердите участие или откажитесь.
                    </span>
                    <Button
                      size="sm"
                      onClick={() =>
                        onChange({
                          ...task,
                          awaitingCreatorApproval: false,
                          status: task.status === "new" ? "in_progress" : task.status
                        })
                      }
                    >
                      Принять задачу
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        onChange({
                          ...task,
                          awaitingCreatorApproval: false,
                          creatorId: undefined
                        })
                      }
                    >
                      Отказаться
                    </Button>
                  </div>
                )}
            </div>
          </section>

          <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border">
            <div className="border-b px-3 py-2">
              <div className="text-sm font-medium">Чат по задаче</div>
              <div className="text-xs text-muted-foreground">Контекстно: всё обсуждение — внутри задачи.</div>
            </div>

            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
              {messages.map((m) => {
                const mine = (m.by === "creator" && role === "creator") || (m.by === "manager" && role !== "creator");
                return (
                  <div key={m.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                        mine ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      )}
                    >
                      <div>{m.text}</div>
                      <div className={cn("mt-1 text-[11px] opacity-70")}>
                        {new Intl.DateTimeFormat("ru-RU", { timeStyle: "short" }).format(new Date(m.at))}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            <div className="border-t p-3">
              <div className="flex gap-2">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Сообщение…"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button onClick={sendMessage} disabled={!draft.trim()} size="icon" aria-label="Отправить">
                  <Send />
                </Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">Enter — отправить • Shift+Enter — новая строка</div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

