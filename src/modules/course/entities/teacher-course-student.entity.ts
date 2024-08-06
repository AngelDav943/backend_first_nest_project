import { CommonEntity } from 'src/common/entity/common.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TeacherCourse } from './teacher-course.entity';

@Entity()
export class TeacherCourseStudent extends CommonEntity {
    @ManyToOne(() => TeacherCourse)
    @JoinColumn({ name: 'teacherCourse', foreignKeyConstraintName: 'id' })
    teacherCourse: TeacherCourse;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'student', foreignKeyConstraintName: 'id' })
    student: User;
}
