import { TeacherCourse } from 'src/modules/course/entities/teacher-course.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { TaskStudent } from './task-student.entity';
import { CommonEntity } from 'src/common/entity/common.entity';

/**
 *
 */
@Entity()
export class Task extends CommonEntity {
    @ManyToOne(() => TeacherCourse)
    teacherCourse: TeacherCourse;

    @OneToMany(() => TaskStudent, (file) => file.task)
    answers: TaskStudent[];

    @Column()
    description: string;

    @CreateDateColumn()
    deadline: Date;
}
