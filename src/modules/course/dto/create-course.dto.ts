import { PickType } from "@nestjs/mapped-types";
import { Course } from "../entities/course.entity";

export class CreateCourseDto extends PickType(Course, ['name', 'description']) {}
