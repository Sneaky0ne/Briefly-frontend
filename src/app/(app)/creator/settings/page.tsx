"use client";

import { CURRENT_CREATOR_ID } from "@/shared/model/current-user";
import { useLocalStorageState } from "@/shared/lib/use-local-storage";
import { DEMO_CREATORS } from "@/shared/mock/demo-data";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

type CreatorProfile = {
  name: string;
  handle: string;
  bio: string;
};

const STORAGE_KEY = "briefly.creator.profile";

export default function CreatorSettingsPage() {
  const base = DEMO_CREATORS.find((c) => c.id === CURRENT_CREATOR_ID);
  const [profile, setProfile] = useLocalStorageState<CreatorProfile>(STORAGE_KEY, {
    name: base?.name ?? "",
    handle: base?.handle ?? "",
    bio: ""
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Профиль креатора</h1>
        <p className="text-sm text-muted-foreground">
          Настройки ЛК: имя, ник, короткое описание и ссылки на соцсети (в демо без сохранения на сервере).
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border p-4">
          <div className="grid gap-2">
            <Label htmlFor="creator-name">Имя</Label>
            <Input
              id="creator-name"
              value={profile.name}
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="creator-handle">Никнейм</Label>
            <Input
              id="creator-handle"
              value={profile.handle}
              onChange={(e) => setProfile((p) => ({ ...p, handle: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="creator-bio">О себе</Label>
            <Textarea
              id="creator-bio"
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
              placeholder="Коротко опишите свой стиль, опыт и предпочтения по форматам."
            />
          </div>
          <Button disabled>Сохранить (demo)</Button>
        </div>

        <div className="space-y-3 rounded-xl border p-4 text-sm text-muted-foreground">
          <div className="font-medium text-foreground">Как это будет работать в реале</div>
          <ul className="list-disc space-y-1 pl-4">
            <li>Профиль креатора подтягивается в базу бренда и в карточку задачи.</li>
            <li>Настройки влияют на то, какие задачи попадают в пул/подборки.</li>
            <li>Можно добавить привязку соцсетей и портфолио.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

