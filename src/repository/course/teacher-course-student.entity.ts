import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TeacherCourseStudent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teacherCourse: number;
    @Column()
    user: number;

    @CreateDateColumn()
    createddate: number;
    @CreateDateColumn()
    updateddate: number;
}