import { Course } from "src/modules/course/entities/course.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Evaluation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Course, (course) => course.evaluations)
    course: Course;

    @Column()
    description: string;

    @CreateDateColumn()
    createddate: Date;
    @UpdateDateColumn()
    updateddate: Date;
}