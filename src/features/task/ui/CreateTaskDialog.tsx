"use client";

import * as React from "react";

import { TASK_CHANNEL_LABEL, TASK_TYPE_LABEL, type TaskTypeKey, type ContentChannel } from "@/entities/task/model/types";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

export function CreateTaskDialog() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [type, setType] = React.useState<TaskTypeKey>("ugc_organic");
  const [channel, setChannel] = React.useState<ContentChannel>("organic");

  const reset = () => {
    setTitle("");
    setProduct("");
    setType("ugc_organic");
    setChannel("organic");
  };

  const handleCreate = () => {
    // demo: просто логируем
    // eslint-disable-next-line no-console
    console.log("Create task (demo)", { title, product, type, channel });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Создать задачу</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Новая задача</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor="task-title">Название</Label>
            <Input
              id="task-title"
              placeholder="5 причин купить продукт X"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="task-product">Продукт</Label>
            <Input
              id="task-product"
              placeholder="Продукт X"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-1.5">
              <Label>Тип</Label>
              <select
                className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none"
                value={type}
                onChange={(e) => setType(e.target.value as TaskTypeKey)}
              >
                {Object.entries(TASK_TYPE_LABEL).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-1.5">
              <Label>Канал</Label>
              <select
                className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none"
                value={channel}
                onChange={(e) => setChannel(e.target.value as ContentChannel)}
              >
                {Object.entries(TASK_CHANNEL_LABEL).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="task-brief">Описание</Label>
            <Textarea
              id="task-brief"
              placeholder="Коротко опишите задачу и формат контента..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button type="button" onClick={handleCreate} disabled={!title.trim()}>
              Создать (demo)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

