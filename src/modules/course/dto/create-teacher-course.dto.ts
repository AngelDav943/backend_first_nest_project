import { TeacherCourse } from '../entities/teacher-course.entity';

export type CreateTeacherCourseDto = Omit<
    TeacherCourse,
    'createddate' | 'updateddate'
>;
