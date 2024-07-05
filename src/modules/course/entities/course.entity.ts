
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CourseState } from "./course-state.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => CourseState, (state) => state.courses)
    @JoinColumn({ referencedColumnName: 'id', name: 'state' })
    state: CourseState;

    @CreateDateColumn()
    createdday: Date;

    @UpdateDateColumn()
    updateday: Date;
}
