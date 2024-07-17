import { FileEnt } from "../entities/file.entity";

export type CreateFileDto = Omit<FileEnt, "createddate" | "updateddate">
