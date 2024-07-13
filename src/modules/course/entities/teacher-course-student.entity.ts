import { TaskStudent } from "src/modules/task/entities/task-student.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TeacherCourse } from "./teacher-course.entity";

@Entity()
export class TeacherCourseStudent {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TeacherCourse)
    @JoinColumn({name:'teacherCourse', foreignKeyConstraintName:'id'})
    teacherCourse: TeacherCourse;

    @ManyToOne(() => User)
    @JoinColumn({name:'student', foreignKeyConstraintName:'id'})
    user: User;

    @CreateDateColumn()
    createddate: Date;
    @UpdateDateColumn()
    updateddate: Date;
}