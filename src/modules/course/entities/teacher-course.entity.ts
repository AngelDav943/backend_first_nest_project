import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TeacherCourse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    course: number;
    @Column()
    user: number;
    @Column()
    hours: number;
    @Column()
    day: string;

    @CreateDateColumn()
    createddate: number;
    @CreateDateColumn()
    updateddate: number;
}