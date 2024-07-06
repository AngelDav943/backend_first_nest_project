
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CourseState } from "./course-state.entity";
import { Forum } from "src/modules/forum/entities/forum.entity";
import { Evaluation } from "src/modules/evaluation/entities/evaluation.entity";

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

    @OneToMany(() => Forum, (forum) => forum.course)
    forums: Forum[];

    @OneToMany(() => Evaluation, (evaluation) => evaluation.course)
    evaluations: Evaluation[];

    @CreateDateColumn()
    createdday: Date;

    @UpdateDateColumn()
    updateday: Date;
}
