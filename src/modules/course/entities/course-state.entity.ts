import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity()
export class CourseState {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Course, (course) => course.state)
    @JoinColumn({referencedColumnName: 'id', name: 'courses'})
    courses: Course[];

    @CreateDateColumn()
    createddate: number;
    @CreateDateColumn()
    updateddate: number;
}