import { Forum } from "../entities/forum.entity";

export type CreateForumDto = Omit<Forum, "createddate" | "updateddate">
