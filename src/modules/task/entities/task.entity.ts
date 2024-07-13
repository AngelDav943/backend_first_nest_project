import { TeacherCourse } from "src/modules/course/entities/teacher-course.entity";
import { FileEnt } from "src/modules/file/entities/file.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStudent } from "./task-student.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TeacherCourse)
    teacherCourse: TeacherCourse;

    @OneToMany(() => TaskStudent, (file) => file.task)
    answers: TaskStudent[];

    @Column()
    description: string;

    @CreateDateColumn()
    deadline: Date;

    @CreateDateColumn()
    createddate: Date;
    @UpdateDateColumn()
    updateddate: Date;
}