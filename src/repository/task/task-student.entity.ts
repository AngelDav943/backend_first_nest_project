import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskStudent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    file: number;
    @Column()
    task: number;
    @Column()
    teacherCourseStudent: number;
    @Column()
    grade: number;

    @CreateDateColumn()
    createddate: number;
    @CreateDateColumn()
    updateddate: number;
}