import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CourseState } from "./course-state.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    description: string;

    @ManyToOne(() => CourseState, (courseState) => courseState.courses)
    @JoinColumn({ referencedColumnName: 'id', name: 'state' })
    state: CourseState;

    @CreateDateColumn()
    createddate: Date;
    @CreateDateColumn()
    updateddate: Date;
}