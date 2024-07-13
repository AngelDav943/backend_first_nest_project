import { FileEnt } from "src/modules/file/entities/file.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./task.entity";

import { TeacherCourseStudent } from "src/modules/course/entities/teacher-course-student.entity";

// Task Answer Student

@Entity()
export class TaskStudent {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TeacherCourseStudent)
    teacherCourseStudent: TeacherCourseStudent;

    @OneToMany(() => FileEnt, (file) => file.taskStudent)
    files: FileEnt[];

    @ManyToOne(() => Task, (task) => task.answers)
    task: Task;

    @Column()
    grade: number;

    @CreateDateColumn()
    createddate: Date;
    @UpdateDateColumn()
    updateddate: Date;
}