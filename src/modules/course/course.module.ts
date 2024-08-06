import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseState } from './entities/course-state.entity';
import { Course } from './entities/course.entity';
import { TeacherCourseStudent } from './entities/teacher-course-student.entity';
import { TeacherCourse } from './entities/teacher-course.entity';

/**
 *
 */
@Module({
    imports: [
        TypeOrmModule.forFeature([
            Course,
            CourseState,
            TeacherCourse,
            TeacherCourseStudent,
        ]),
    ],
    controllers: [CourseController],
    providers: [CourseService],
})
export class CourseModule {}
