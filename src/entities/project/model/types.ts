import type { ProjectId } from "@/entities/task/model/types";

export type Project = {
  id: ProjectId;
  title: string;
  description: string;
  managerId?: string;
  creatorSlots: number;
  memberCreatorIds: string[];
};

