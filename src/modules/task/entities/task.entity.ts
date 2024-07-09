import { TeacherCourse } from "src/modules/course/entities/teacher-course.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TeacherCourse)
    teacherCourse: TeacherCourse;

    description: string;

    @CreateDateColumn()
    deadline: Date;

    @CreateDateColumn()
    createddate: Date;
    @UpdateDateColumn()
    updateddate: Date;
}