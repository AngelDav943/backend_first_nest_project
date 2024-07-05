import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity()
export class CourseState {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Course, (course) => course.state)
    @JoinColumn({ referencedColumnName: 'id', name: 'state' })
    courses: Course[];

    @CreateDateColumn()
    createdday: Date;

    @UpdateDateColumn()
    updatedday: Date;
}