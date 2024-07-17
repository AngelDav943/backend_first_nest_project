import { Task } from "../entities/task.entity";

export type CreateTaskDto = Omit<Task, "createddate" | "updateddate">
