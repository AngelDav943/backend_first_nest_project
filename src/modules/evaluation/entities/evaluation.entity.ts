import { Course } from "src/modules/course/entities/course.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Evaluation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Course, (course) => course.evaluations)
    course: Course;

    @Column()
    description: string;

    @CreateDateColumn()
    createddate: number;
    @CreateDateColumn()
    updateddate: number;
}