"use client";

import * as React from "react";

import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

export function CreateProjectDialog() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const reset = () => {
    setTitle("");
    setDescription("");
  };

  const handleCreate = () => {
    // eslint-disable-next-line no-console
    console.log("Create project (demo)", { title, description });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Создать проект</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Новый проект</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor="project-title">Название</Label>
            <Input
              id="project-title"
              placeholder="5 причин купить (Органика)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-description">Описание</Label>
            <Textarea
              id="project-description"
              placeholder="Опишите цель проекта: формат, продукты, дедлайны..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

