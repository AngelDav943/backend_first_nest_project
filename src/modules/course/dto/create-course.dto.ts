import { Course } from "../entities/course.entity";

export type CreateCourseDto = Omit<Course, "createddate" | "updateddate">
